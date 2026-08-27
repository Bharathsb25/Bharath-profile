import {
  EVENT_NAMES,
  MAX_EVENTS_PER_BATCH,
  MAX_METADATA_KEYS,
  MAX_STRING_LENGTH,
  type AnalyticsEvent,
  type CollectPayload,
  type EventName,
  type SessionMeta,
} from "./types.ts";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_RE.test(value);
}

/** Trims, caps length, and strips control characters. Returns undefined for anything that isn't a non-empty string. */
export function sanitizeString(
  value: unknown,
  maxLen = MAX_STRING_LENGTH,
): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, "").trim();
  if (cleaned.length === 0) return undefined;
  return cleaned.slice(0, maxLen);
}

function sanitizeMetadata(
  value: unknown,
): Record<string, string | number | boolean> | undefined {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return undefined;
  }
  const entries = Object.entries(value as Record<string, unknown>).slice(
    0,
    MAX_METADATA_KEYS,
  );
  const out: Record<string, string | number | boolean> = {};
  for (const [key, v] of entries) {
    const safeKey = sanitizeString(key, 64);
    if (!safeKey) continue;
    if (typeof v === "number" && Number.isFinite(v)) {
      out[safeKey] = v;
    } else if (typeof v === "boolean") {
      out[safeKey] = v;
    } else if (typeof v === "string") {
      const s = sanitizeString(v, 128);
      if (s !== undefined) out[safeKey] = s;
    }
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

export function validateEvent(raw: unknown): AnalyticsEvent | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;

  const eventName = r.event_name;
  if (
    typeof eventName !== "string" ||
    !(EVENT_NAMES as readonly string[]).includes(eventName)
  ) {
    return null;
  }
  const page = sanitizeString(r.page, 256);
  if (!page) return null;

  const ts = typeof r.ts === "number" && Number.isFinite(r.ts) ? r.ts : Date.now();

  return {
    event_name: eventName as EventName,
    page,
    section: sanitizeString(r.section, 128),
    element_id: sanitizeString(r.element_id, 128),
    label: sanitizeString(r.label, 256),
    destination_url: sanitizeString(r.destination_url, 1024),
    metadata: sanitizeMetadata(r.metadata),
    ts,
  };
}

export function validateSessionMeta(raw: unknown): SessionMeta | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  const entryPage = sanitizeString(r.entry_page, 256);
  if (!entryPage) return null;

  const deviceType =
    r.device_type === "mobile" || r.device_type === "tablet" || r.device_type === "desktop"
      ? r.device_type
      : "desktop";

  return {
    referrer: sanitizeString(r.referrer, 512) ?? "",
    utm_source: sanitizeString(r.utm_source, 128),
    utm_medium: sanitizeString(r.utm_medium, 128),
    utm_campaign: sanitizeString(r.utm_campaign, 128),
    utm_term: sanitizeString(r.utm_term, 128),
    utm_content: sanitizeString(r.utm_content, 128),
    browser: sanitizeString(r.browser, 64) ?? "unknown",
    os: sanitizeString(r.os, 64) ?? "unknown",
    device_type: deviceType,
    screen_width: typeof r.screen_width === "number" ? Math.round(r.screen_width) : 0,
    screen_height: typeof r.screen_height === "number" ? Math.round(r.screen_height) : 0,
    language: sanitizeString(r.language, 32) ?? "unknown",
    entry_page: entryPage,
  };
}

/** Validates and sanitizes a full collect request body. Returns null for anything malformed — the caller responds 400 without touching the DB. */
export function validatePayload(raw: unknown): CollectPayload | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;

  if (!isUuid(r.visitor_id) || !isUuid(r.session_id)) return null;
  if (!Array.isArray(r.events) || r.events.length === 0) return null;
  if (r.events.length > MAX_EVENTS_PER_BATCH) return null;

  const events: AnalyticsEvent[] = [];
  for (const rawEvent of r.events) {
    const event = validateEvent(rawEvent);
    if (!event) return null;
    events.push(event);
  }

  const session = r.session !== undefined ? validateSessionMeta(r.session) : undefined;
  if (r.session !== undefined && !session) return null;

  return {
    visitor_id: r.visitor_id,
    session_id: r.session_id,
    session: session ?? undefined,
    events,
  };
}
