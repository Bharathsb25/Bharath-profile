import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db/client";
import { validatePayload } from "@/lib/analytics/validate";
import { deriveSessionUpdate } from "@/lib/analytics/sessionAggregate";
import { isBotUserAgent } from "@/lib/analytics/botDetect";
import { geoFromHeaders } from "@/lib/analytics/geo";
import { extractClientIp, hashIp, encryptIp } from "@/lib/analytics/ip";
import { checkRateLimit } from "@/lib/analytics/rateLimit";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";
import type { AnalyticsEvent } from "@/lib/analytics/types";

// Never let a thrown error here surface — analytics must not affect the site.
function noContent() {
  return new NextResponse(null, { status: 204 });
}

function isInternalIp(ip: string | null): boolean {
  const list = (process.env.ANALYTICS_INTERNAL_IPS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return !!ip && list.includes(ip);
}

export async function POST(req: Request) {
  try {
    const ipHashSecret = process.env.ANALYTICS_IP_HASH_SECRET;
    if (!ipHashSecret) {
      console.error("collect: missing ANALYTICS_IP_HASH_SECRET");
      return noContent();
    }

    // Never track the site owner's own logged-in admin session, or
    // explicitly allowlisted internal IPs.
    const sessionSecret = process.env.SESSION_SECRET;
    const adminToken = req.headers
      .get("cookie")
      ?.split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${ADMIN_SESSION_COOKIE}=`))
      ?.slice(ADMIN_SESSION_COOKIE.length + 1);
    if (sessionSecret && verifySessionToken(adminToken, sessionSecret)) {
      return noContent();
    }

    const ip = extractClientIp(req.headers);
    if (isInternalIp(ip)) return noContent();

    const ipHash = ip ? hashIp(ip, ipHashSecret) : null;

    const allowed = await checkRateLimit(`collect:${ipHash ?? "unknown"}`, 60, 60);
    if (!allowed) {
      return new NextResponse(null, { status: 429 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    const payload = validatePayload(body);
    if (!payload) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const userAgent = req.headers.get("user-agent");
    const isBot = isBotUserAgent(userAgent);
    const geo = geoFromHeaders(req.headers);

    let ipEncrypted: string | null = null;
    if (ip && process.env.ANALYTICS_STORE_RAW_IP === "true") {
      const encKey = process.env.ANALYTICS_IP_ENCRYPTION_KEY;
      if (encKey) {
        try {
          ipEncrypted = encryptIp(ip, encKey);
        } catch (err) {
          console.error("collect: IP encryption failed", err);
        }
      }
    }

    await dbQuery(
      `INSERT INTO visitors (id, ip_hash, ip_encrypted, country, region, city, timezone, is_returning)
       VALUES ($1, $2, $3, $4, $5, $6, $7, false)
       ON CONFLICT (id) DO UPDATE SET
         last_seen = now(),
         ip_hash = COALESCE($2, visitors.ip_hash),
         ip_encrypted = COALESCE($3, visitors.ip_encrypted),
         country = COALESCE($4, visitors.country),
         region = COALESCE($5, visitors.region),
         city = COALESCE($6, visitors.city),
         timezone = COALESCE($7, visitors.timezone),
         is_returning = true`,
      [payload.visitor_id, ipHash, ipEncrypted, geo.country, geo.region, geo.city, geo.timezone],
    );

    const isNewSession = !!payload.session;
    if (isNewSession) {
      await dbQuery("UPDATE visitors SET visit_count = visit_count + 1 WHERE id = $1", [
        payload.visitor_id,
      ]);
    }

    const s = payload.session;
    await dbQuery(
      `INSERT INTO sessions (
         id, visitor_id, referrer, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
         browser, os, device_type, screen_width, screen_height, language, entry_page, is_bot
       )
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
       ON CONFLICT (id) DO UPDATE SET last_activity_at = now()`,
      [
        payload.session_id,
        payload.visitor_id,
        s?.referrer ?? "",
        s?.utm_source ?? null,
        s?.utm_medium ?? null,
        s?.utm_campaign ?? null,
        s?.utm_term ?? null,
        s?.utm_content ?? null,
        s?.browser ?? "unknown",
        s?.os ?? "unknown",
        s?.device_type ?? "desktop",
        s?.screen_width ?? 0,
        s?.screen_height ?? 0,
        s?.language ?? "unknown",
        s?.entry_page ?? payload.events[0]?.page ?? "/",
        isBot,
      ],
    );

    const update = deriveSessionUpdate(payload.events);
    await dbQuery(
      `UPDATE sessions SET
         last_activity_at = now(),
         page_view_count = page_view_count + $2,
         active_seconds = GREATEST(active_seconds, COALESCE($3, active_seconds)),
         max_scroll_depth = GREATEST(max_scroll_depth, COALESCE($4, max_scroll_depth)),
         last_section_viewed = COALESCE($5, last_section_viewed),
         ended_at = CASE WHEN $6 THEN now() ELSE ended_at END
       WHERE id = $1`,
      [
        payload.session_id,
        update.pageViewIncrement,
        update.activeSeconds,
        update.maxScrollDepth,
        update.lastSection,
        update.ended,
      ],
    );

    await insertEvents(payload.session_id, payload.visitor_id, payload.events);

    return noContent();
  } catch (err) {
    console.error("collect: unexpected error", err);
    return noContent();
  }
}

async function insertEvents(sessionId: string, visitorId: string, events: AnalyticsEvent[]) {
  const cols = [
    "session_id",
    "visitor_id",
    "event_name",
    "page",
    "section",
    "element_id",
    "label",
    "destination_url",
    "metadata",
  ];
  const values: unknown[] = [];
  const rowPlaceholders = events.map((event, i) => {
    const base = i * cols.length;
    values.push(
      sessionId,
      visitorId,
      event.event_name,
      event.page,
      event.section ?? null,
      event.element_id ?? null,
      event.label ?? null,
      event.destination_url ?? null,
      event.metadata ? JSON.stringify(event.metadata) : null,
    );
    return `(${cols.map((_, j) => `$${base + j + 1}`).join(",")})`;
  });

  await dbQuery(
    `INSERT INTO events (${cols.join(",")}) VALUES ${rowPlaceholders.join(",")}`,
    values,
  );
}
