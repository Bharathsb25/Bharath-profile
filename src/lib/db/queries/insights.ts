/* ---------------------------------------------------------------
   Higher-level dashboard insights built on the same tables as
   analytics.ts (no schema change): period-over-period KPIs, daily
   trend, time-of-day, lead funnel, chat assistant usage, referrers.

   Every query reuses sessionWhere() so the dashboard filters (date
   range, device, country) and bot exclusion apply consistently.
   Day/hour buckets are in IST.
---------------------------------------------------------------- */
import { dbQuery } from "../client.ts";
import { rangeOrDefault, sessionWhere, type DashboardFilters } from "./analytics.ts";

const TZ = "Asia/Kolkata";
/** Must match FORM_NAME in src/components/chat/ChatWidget.tsx. */
export const CHAT_FORM_LABEL = "Portfolio — Chat Assistant";
export const CHAT_OPEN_LABEL = "Chat — open";

/** Same-length window immediately before the selected range. */
export function previousPeriod(filters: DashboardFilters): DashboardFilters {
  const { from, to } = rangeOrDefault(filters);
  const f = new Date(from).getTime();
  const len = new Date(to).getTime() - f;
  return { ...filters, from: new Date(f - len).toISOString(), to: new Date(f).toISOString() };
}

export interface Kpis {
  visitors: number;
  sessions: number;
  pageViews: number;
  avgActiveSeconds: number;
  engagedRate: number; // % of sessions
  leads: number; // sessions with a successful form/chat submission
}

async function kpisFor(filters: DashboardFilters): Promise<Kpis> {
  const where = sessionWhere(filters, 1);
  const rows = await dbQuery<{
    visitors: string;
    sessions: string;
    page_views: string;
    avg_active: string | null;
    engaged: string;
    leads: string;
  }>(
    `SELECT
       COUNT(DISTINCT s.visitor_id) AS visitors,
       COUNT(*) AS sessions,
       COALESCE(SUM(s.page_view_count), 0) AS page_views,
       AVG(s.active_seconds) AS avg_active,
       COUNT(*) FILTER (WHERE s.active_seconds >= 10 OR s.page_view_count >= 2 OR s.max_scroll_depth >= 50) AS engaged,
       COUNT(*) FILTER (WHERE EXISTS (
         SELECT 1 FROM events e WHERE e.session_id = s.id AND e.event_name = 'form_success'
       )) AS leads
     FROM sessions s
     JOIN visitors v ON v.id = s.visitor_id
     WHERE ${where.sql}`,
    where.params,
  );
  const r = rows[0];
  const sessions = Number(r?.sessions ?? 0);
  return {
    visitors: Number(r?.visitors ?? 0),
    sessions,
    pageViews: Number(r?.page_views ?? 0),
    avgActiveSeconds: Math.round(Number(r?.avg_active ?? 0)),
    engagedRate: sessions ? Math.round((Number(r?.engaged ?? 0) / sessions) * 100) : 0,
    leads: Number(r?.leads ?? 0),
  };
}

export async function getKpisWithComparison(filters: DashboardFilters) {
  const [current, previous] = await Promise.all([kpisFor(filters), kpisFor(previousPeriod(filters))]);
  return { current, previous };
}

/** % change, or null when there's no baseline to compare against. */
export function pctChange(current: number, previous: number): number | null {
  if (!previous) return null;
  return Math.round(((current - previous) / previous) * 100);
}

/** Sessions active in the last 5 minutes — ignores the date filter on purpose. */
export async function getLiveVisitors(): Promise<number> {
  const rows = await dbQuery<{ n: string }>(
    `SELECT COUNT(DISTINCT visitor_id) AS n FROM sessions
     WHERE is_bot = false AND last_activity_at > now() - interval '5 minutes'`,
  );
  return Number(rows[0]?.n ?? 0);
}

export interface DayPoint {
  day: string; // YYYY-MM-DD (IST)
  sessions: number;
  visitors: number;
}

export async function getDailyTrend(filters: DashboardFilters): Promise<DayPoint[]> {
  const where = sessionWhere(filters, 1);
  const rows = await dbQuery<{ day: string; sessions: string; visitors: string }>(
    `SELECT to_char(s.started_at AT TIME ZONE '${TZ}', 'YYYY-MM-DD') AS day,
            COUNT(*) AS sessions,
            COUNT(DISTINCT s.visitor_id) AS visitors
     FROM sessions s
     JOIN visitors v ON v.id = s.visitor_id
     WHERE ${where.sql}
     GROUP BY 1
     ORDER BY 1`,
    where.params,
  );
  const byDay = new Map(rows.map((r) => [r.day, r]));
  // Fill empty days so the chart's x-axis is continuous.
  const { from, to } = rangeOrDefault(filters);
  const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
  const out: DayPoint[] = [];
  const end = new Date(to).getTime();
  for (let t = new Date(from).getTime(); t <= end && out.length < 400; t += 86_400_000) {
    const day = fmt.format(new Date(t));
    if (out.length && out[out.length - 1].day === day) continue;
    const r = byDay.get(day);
    out.push({ day, sessions: Number(r?.sessions ?? 0), visitors: Number(r?.visitors ?? 0) });
  }
  return out;
}

export async function getHourOfDay(filters: DashboardFilters): Promise<number[]> {
  const where = sessionWhere(filters, 1);
  const rows = await dbQuery<{ h: number; n: string }>(
    `SELECT EXTRACT(HOUR FROM s.started_at AT TIME ZONE '${TZ}')::int AS h, COUNT(*) AS n
     FROM sessions s
     JOIN visitors v ON v.id = s.visitor_id
     WHERE ${where.sql}
     GROUP BY 1`,
    where.params,
  );
  const hours = Array<number>(24).fill(0);
  for (const r of rows) hours[Number(r.h)] = Number(r.n);
  return hours;
}

export interface FunnelStep {
  label: string;
  count: number;
}

/** Distinct sessions reaching each step: visit → saw a way to contact → started → submitted → delivered. */
export async function getLeadFunnel(filters: DashboardFilters): Promise<{ steps: FunnelStep[]; failures: number }> {
  const where = sessionWhere(filters, 1);
  const has = (cond: string) =>
    `COUNT(*) FILTER (WHERE EXISTS (SELECT 1 FROM events e WHERE e.session_id = s.id AND (${cond})))`;
  // Each step counts sessions that reached it OR any later step, so the funnel
  // never widens (e.g. someone can start the form without the section firing).
  const stepConds = [
    `(e.event_name = 'section_view' AND e.section IN ('contact', 'start')) OR (e.event_name = 'cta_click' AND e.label = '${CHAT_OPEN_LABEL}')`,
    `e.event_name = 'form_start'`,
    `e.event_name = 'form_submit'`,
    `e.event_name = 'form_success'`,
  ];
  const cumulative = (i: number) => stepConds.slice(i).map((c) => `(${c})`).join(" OR ");
  const rows = await dbQuery<Record<string, string>>(
    `SELECT
       COUNT(*) AS visits,
       ${has(cumulative(0))} AS reached,
       ${has(cumulative(1))} AS started,
       ${has(cumulative(2))} AS submitted,
       ${has(cumulative(3))} AS succeeded,
       ${has(`e.event_name = 'form_failure'`)} AS failed
     FROM sessions s
     JOIN visitors v ON v.id = s.visitor_id
     WHERE ${where.sql}`,
    where.params,
  );
  const r = rows[0] ?? {};
  const n = (k: string) => Number(r[k] ?? 0);
  return {
    steps: [
      { label: "Visited the site", count: n("visits") },
      { label: "Saw contact form or opened chat", count: n("reached") },
      { label: "Started a form / chat enquiry", count: n("started") },
      { label: "Submitted", count: n("submitted") },
      { label: "Delivered to your inbox", count: n("succeeded") },
    ],
    failures: n("failed"),
  };
}

export interface ChatStats {
  opens: number;
  leadStarts: number;
  leads: number;
  destinations: { label: string; count: number }[];
}

export async function getChatStats(filters: DashboardFilters): Promise<ChatStats> {
  const where = sessionWhere(filters, 1);
  const base = `FROM events e
     JOIN sessions s ON s.id = e.session_id
     JOIN visitors v ON v.id = s.visitor_id
     WHERE ${where.sql}`;
  const [counts, dest] = await Promise.all([
    dbQuery<{ opens: string; lead_starts: string; leads: string }>(
      `SELECT
         COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'cta_click' AND e.label = '${CHAT_OPEN_LABEL}') AS opens,
         COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'form_start' AND e.label = '${CHAT_FORM_LABEL}') AS lead_starts,
         COUNT(DISTINCT e.session_id) FILTER (WHERE e.event_name = 'form_success' AND e.label = '${CHAT_FORM_LABEL}') AS leads
       ${base}`,
      where.params,
    ),
    dbQuery<{ label: string; count: string }>(
      `SELECT regexp_replace(e.label, '^Chat — ', '') AS label, COUNT(*) AS count
       ${base} AND e.event_name IN ('nav_click', 'link_click') AND e.label LIKE 'Chat — %'
       GROUP BY 1 ORDER BY count DESC LIMIT 8`,
      where.params,
    ),
  ]);
  const c = counts[0];
  return {
    opens: Number(c?.opens ?? 0),
    leadStarts: Number(c?.lead_starts ?? 0),
    leads: Number(c?.leads ?? 0),
    destinations: dest.map((d) => ({ label: d.label, count: Number(d.count) })),
  };
}

/** Where visitors came from, by referring domain ("direct" when none). */
export async function getReferrerDomains(filters: DashboardFilters, limit = 10) {
  const where = sessionWhere(filters, 1);
  const rows = await dbQuery<{ label: string; count: string }>(
    `SELECT COALESCE(
              NULLIF(regexp_replace(substring(lower(s.referrer) from '^[a-z]+://([^/:?#]+)'), '^(www|m|l|lm)\\.', ''), ''),
              'direct'
            ) AS label,
            COUNT(*) AS count
     FROM sessions s
     JOIN visitors v ON v.id = s.visitor_id
     WHERE ${where.sql}
     GROUP BY 1
     ORDER BY count DESC
     LIMIT ${Math.max(1, Math.min(50, Math.floor(limit)))}`,
    where.params,
  );
  return rows.map((r) => ({ label: r.label, count: Number(r.count) }));
}

/** Which form/entry point produced delivered leads. */
export async function getLeadsBySource(filters: DashboardFilters) {
  const where = sessionWhere(filters, 1);
  const rows = await dbQuery<{ label: string | null; count: string }>(
    `SELECT e.label, COUNT(DISTINCT e.session_id) AS count
     FROM events e
     JOIN sessions s ON s.id = e.session_id
     JOIN visitors v ON v.id = s.visitor_id
     WHERE e.event_name = 'form_success' AND ${where.sql}
     GROUP BY 1 ORDER BY count DESC LIMIT 10`,
    where.params,
  );
  return rows.map((r) => ({ label: r.label ?? "Unlabelled form", count: Number(r.count) }));
}

/* ---------------- Chat questions (what visitors ask) ---------------- */

export interface QuestionRow {
  question: string;
  count: number;
  lastAsked: string;
  intent: string;
}

/** Which topics visitors ask the chat about (typed + quick-reply chips). */
export async function getChatQuestionTopics(filters: DashboardFilters) {
  const where = sessionWhere(filters, 1);
  const rows = await dbQuery<{ label: string; count: string; typed: string }>(
    `SELECT COALESCE(e.metadata->>'intent', 'unanswered') AS label,
            COUNT(*) AS count,
            COUNT(*) FILTER (WHERE COALESCE(e.metadata->>'chip', 'false') = 'false') AS typed
     FROM events e
     JOIN sessions s ON s.id = e.session_id
     JOIN visitors v ON v.id = s.visitor_id
     WHERE e.event_name = 'chat_question' AND ${where.sql}
     GROUP BY 1 ORDER BY count DESC LIMIT 15`,
    where.params,
  );
  return rows.map((r) => ({ label: r.label, count: Number(r.count), typed: Number(r.typed) }));
}

/**
 * Questions visitors typed (quick-reply chips excluded), grouped
 * case-insensitively. `unansweredOnly` = the bot fell back → content gaps.
 */
export async function getChatQuestions(
  filters: DashboardFilters,
  opts: { unansweredOnly?: boolean; limit?: number } = {},
): Promise<QuestionRow[]> {
  const where = sessionWhere(filters, 1);
  const limit = Math.max(1, Math.min(100, Math.floor(opts.limit ?? 25)));
  const rows = await dbQuery<{ question: string; count: string; last_asked: string; intent: string }>(
    `SELECT MIN(e.label) AS question,
            COUNT(*) AS count,
            MAX(e.created_at) AS last_asked,
            MIN(COALESCE(e.metadata->>'intent', 'unanswered')) AS intent
     FROM events e
     JOIN sessions s ON s.id = e.session_id
     JOIN visitors v ON v.id = s.visitor_id
     WHERE e.event_name = 'chat_question'
       AND e.label IS NOT NULL
       AND COALESCE(e.metadata->>'chip', 'false') = 'false'
       ${opts.unansweredOnly ? `AND COALESCE(e.metadata->>'intent', 'unanswered') = 'unanswered'` : ""}
       AND ${where.sql}
     GROUP BY lower(e.label)
     ORDER BY ${opts.unansweredOnly ? "count DESC, last_asked DESC" : "last_asked DESC"}
     LIMIT ${limit}`,
    where.params,
  );
  return rows.map((r) => ({
    question: r.question,
    count: Number(r.count),
    lastAsked: new Date(r.last_asked).toISOString(),
    intent: r.intent,
  }));
}

/* ---------------- Questions page + Excel export ---------------- */

export interface QuestionFilters extends DashboardFilters {
  topic?: string; // intent id, or "unanswered"
  unanswered?: boolean;
  q?: string; // text search
  chips?: boolean; // include quick-reply button taps
}

function questionWhere(f: QuestionFilters, startIndex: number) {
  const where = sessionWhere(f, startIndex);
  const clauses = [`e.event_name = 'chat_question'`, where.sql];
  const params = [...where.params];
  let i = where.nextIndex;
  if (!f.chips) clauses.push(`COALESCE(e.metadata->>'chip', 'false') = 'false'`);
  if (f.unanswered) {
    clauses.push(`COALESCE(e.metadata->>'intent', 'unanswered') = 'unanswered'`);
  } else if (f.topic) {
    clauses.push(`COALESCE(e.metadata->>'intent', 'unanswered') = $${i}`);
    params.push(f.topic);
    i += 1;
  }
  if (f.q) {
    clauses.push(`e.label ILIKE $${i}`);
    params.push(`%${f.q.slice(0, 100).replace(/[\\%_]/g, (m) => `\\${m}`)}%`);
    i += 1;
  }
  return { sql: clauses.join(" AND "), params, nextIndex: i };
}

const QUESTION_FROM = `FROM events e
  JOIN sessions s ON s.id = e.session_id
  JOIN visitors v ON v.id = s.visitor_id`;

export interface QuestionLogRow {
  askedAt: string;
  question: string;
  topic: string;
  answered: boolean;
  viaButton: boolean;
  page: string | null;
  country: string | null;
  city: string | null;
  device: string | null;
  sessionId: string;
}

export async function getQuestionLog(
  f: QuestionFilters,
  limit: number,
  offset: number,
): Promise<{ rows: QuestionLogRow[]; total: number }> {
  const w = questionWhere(f, 3);
  const [rows, count] = await Promise.all([
    dbQuery<{
      created_at: string;
      label: string | null;
      intent: string | null;
      chip: string | null;
      page: string | null;
      country: string | null;
      city: string | null;
      device_type: string | null;
      session_id: string;
    }>(
      `SELECT e.created_at, e.label, e.metadata->>'intent' AS intent, e.metadata->>'chip' AS chip,
              e.page, v.country, v.city, s.device_type, e.session_id
       ${QUESTION_FROM}
       WHERE ${w.sql}
       ORDER BY e.created_at DESC
       LIMIT $1 OFFSET $2`,
      [Math.max(1, Math.floor(limit)), Math.max(0, Math.floor(offset)), ...w.params],
    ),
    (async () => {
      const c = questionWhere(f, 1);
      return dbQuery<{ n: string }>(`SELECT COUNT(*) AS n ${QUESTION_FROM} WHERE ${c.sql}`, c.params);
    })(),
  ]);
  return {
    rows: rows.map((r) => {
      const topic = r.intent ?? "unanswered";
      return {
        askedAt: new Date(r.created_at).toISOString(),
        question: r.label ?? "",
        topic,
        answered: topic !== "unanswered",
        viaButton: r.chip === "true",
        page: r.page,
        country: r.country,
        city: r.city,
        device: r.device_type,
        sessionId: r.session_id,
      };
    }),
    total: Number(count[0]?.n ?? 0),
  };
}

export async function getQuestionSummary(f: QuestionFilters) {
  const w = questionWhere(f, 1);
  const rows = await dbQuery<{ total: string; unanswered: string; sessions: string; distinct_q: string }>(
    `SELECT COUNT(*) AS total,
            COUNT(*) FILTER (WHERE COALESCE(e.metadata->>'intent', 'unanswered') = 'unanswered') AS unanswered,
            COUNT(DISTINCT e.session_id) AS sessions,
            COUNT(DISTINCT lower(e.label)) AS distinct_q
     ${QUESTION_FROM}
     WHERE ${w.sql}`,
    w.params,
  );
  const r = rows[0];
  const total = Number(r?.total ?? 0);
  const unanswered = Number(r?.unanswered ?? 0);
  return {
    total,
    unanswered,
    answeredRate: total ? Math.round(((total - unanswered) / total) * 100) : 0,
    sessions: Number(r?.sessions ?? 0),
    distinct: Number(r?.distinct_q ?? 0),
  };
}

/** Same question asked many times → one row with a count (case-insensitive). */
export async function getQuestionGroups(f: QuestionFilters, limit = 50) {
  const w = questionWhere(f, 1);
  const rows = await dbQuery<{ question: string; count: string; first_asked: string; last_asked: string; intent: string }>(
    `SELECT MIN(e.label) AS question, COUNT(*) AS count,
            MIN(e.created_at) AS first_asked, MAX(e.created_at) AS last_asked,
            MIN(COALESCE(e.metadata->>'intent', 'unanswered')) AS intent
     ${QUESTION_FROM}
     WHERE ${w.sql} AND e.label IS NOT NULL
     GROUP BY lower(e.label)
     ORDER BY count DESC, last_asked DESC
     LIMIT ${Math.max(1, Math.min(5000, Math.floor(limit)))}`,
    w.params,
  );
  return rows.map((r) => ({
    question: r.question,
    count: Number(r.count),
    firstAsked: new Date(r.first_asked).toISOString(),
    lastAsked: new Date(r.last_asked).toISOString(),
    topic: r.intent,
  }));
}

export async function getQuestionTopicCounts(f: QuestionFilters) {
  // Topic breakdown ignores the topic/unanswered filter itself so the chips stay useful.
  const w = questionWhere({ ...f, topic: undefined, unanswered: false }, 1);
  const rows = await dbQuery<{ label: string; count: string }>(
    `SELECT COALESCE(e.metadata->>'intent', 'unanswered') AS label, COUNT(*) AS count
     ${QUESTION_FROM}
     WHERE ${w.sql}
     GROUP BY 1 ORDER BY count DESC`,
    w.params,
  );
  return rows.map((r) => ({ label: r.label, count: Number(r.count) }));
}

/** Reads QuestionFilters from URL search params (page + export share this). */
export function parseQuestionFilters(get: (k: string) => string | null | undefined): QuestionFilters {
  const v = (k: string) => get(k)?.trim() || undefined;
  // Date inputs give YYYY-MM-DD; treat them as whole IST days (inclusive).
  const day = (d: string | undefined, end: boolean) =>
    d && /^\d{4}-\d{2}-\d{2}$/.test(d) ? `${d}T${end ? "23:59:59.999" : "00:00:00"}+05:30` : d;
  return {
    from: day(v("from"), false),
    to: day(v("to"), true),
    device: v("device"),
    country: v("country"),
    topic: v("topic"),
    q: v("q"),
    unanswered: get("unanswered") === "1",
    chips: get("chips") === "1",
  };
}
