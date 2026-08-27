import { dbQuery } from "../client.ts";

export interface DashboardFilters {
  from?: string; // ISO date (inclusive)
  to?: string; // ISO date (inclusive)
  event?: string;
  page?: string;
  country?: string;
  device?: string;
}

const DEFAULT_RANGE_DAYS = 30;

function rangeOrDefault(filters: DashboardFilters): { from: string; to: string } {
  const to = filters.to ? new Date(filters.to) : new Date();
  const from = filters.from
    ? new Date(filters.from)
    : new Date(to.getTime() - DEFAULT_RANGE_DAYS * 24 * 60 * 60 * 1000);
  return { from: from.toISOString(), to: to.toISOString() };
}

/** Builds a `sessions s` WHERE clause (date range, bot exclusion, device/country) shared by every query below. */
function sessionWhere(filters: DashboardFilters, startIndex: number) {
  const { from, to } = rangeOrDefault(filters);
  const clauses = ["s.is_bot = false", `s.started_at >= $${startIndex}`, `s.started_at <= $${startIndex + 1}`];
  const params: unknown[] = [from, to];
  let i = startIndex + 2;

  if (filters.device) {
    clauses.push(`s.device_type = $${i}`);
    params.push(filters.device);
    i += 1;
  }
  if (filters.country) {
    clauses.push(`v.country = $${i}`);
    params.push(filters.country);
    i += 1;
  }
  return { sql: clauses.join(" AND "), params, nextIndex: i };
}

export interface SummaryStats {
  totalVisitors: number;
  uniqueVisitors: number;
  totalSessions: number;
  totalPageViews: number;
  newVisitors: number;
  returningVisitors: number;
  avgActiveSeconds: number;
  totalActiveSeconds: number;
}

export async function getSummary(filters: DashboardFilters): Promise<SummaryStats> {
  const where = sessionWhere(filters, 1);
  const rows = await dbQuery<{
    total_visitors: string;
    unique_visitors: string;
    total_sessions: string;
    total_page_views: string;
    new_visitors: string;
    returning_visitors: string;
    avg_active_seconds: string | null;
    total_active_seconds: string | null;
  }>(
    `SELECT
       COUNT(DISTINCT s.visitor_id) AS total_visitors,
       COUNT(DISTINCT s.visitor_id) AS unique_visitors,
       COUNT(*) AS total_sessions,
       COALESCE(SUM(s.page_view_count), 0) AS total_page_views,
       COUNT(DISTINCT s.visitor_id) FILTER (WHERE v.is_returning = false) AS new_visitors,
       COUNT(DISTINCT s.visitor_id) FILTER (WHERE v.is_returning = true) AS returning_visitors,
       AVG(s.active_seconds) AS avg_active_seconds,
       SUM(s.active_seconds) AS total_active_seconds
     FROM sessions s
     JOIN visitors v ON v.id = s.visitor_id
     WHERE ${where.sql}`,
    where.params,
  );
  const r = rows[0];
  return {
    totalVisitors: Number(r?.total_visitors ?? 0),
    uniqueVisitors: Number(r?.unique_visitors ?? 0),
    totalSessions: Number(r?.total_sessions ?? 0),
    totalPageViews: Number(r?.total_page_views ?? 0),
    newVisitors: Number(r?.new_visitors ?? 0),
    returningVisitors: Number(r?.returning_visitors ?? 0),
    avgActiveSeconds: Math.round(Number(r?.avg_active_seconds ?? 0)),
    totalActiveSeconds: Number(r?.total_active_seconds ?? 0),
  };
}

export interface CountRow {
  label: string;
  count: number;
}

async function topEventLabels(
  filters: DashboardFilters,
  eventNames: string[],
  groupExpr: string,
  limit: number,
): Promise<CountRow[]> {
  const where = sessionWhere(filters, 2);
  const params: unknown[] = [eventNames, ...where.params];
  let extraSql = "";
  let i = where.nextIndex;
  if (filters.page) {
    extraSql += ` AND e.page = $${i}`;
    params.push(filters.page);
    i += 1;
  }
  params.push(limit);
  const limitIndex = i;
  const rows = await dbQuery<{ label: string | null; count: string }>(
    `SELECT ${groupExpr} AS label, COUNT(*) AS count
     FROM events e
     JOIN sessions s ON s.id = e.session_id
     JOIN visitors v ON v.id = s.visitor_id
     WHERE e.event_name = ANY($1) AND ${where.sql}${extraSql}
     GROUP BY ${groupExpr}
     ORDER BY count DESC
     LIMIT $${limitIndex}`,
    params,
  );
  return rows
    .filter((r) => r.label)
    .map((r) => ({ label: r.label as string, count: Number(r.count) }));
}

export function getTopPages(filters: DashboardFilters, limit = 10) {
  return topEventLabels(filters, ["page_view"], "e.page", limit);
}

export function getTopSections(filters: DashboardFilters, limit = 10) {
  return topEventLabels(filters, ["section_view"], "e.section", limit);
}

export function getTopProjects(filters: DashboardFilters, limit = 10) {
  return topEventLabels(filters, ["project_view", "project_click"], "COALESCE(e.label, e.section)", limit);
}

export function getTopButtons(filters: DashboardFilters, limit = 10) {
  return topEventLabels(filters, ["cta_click"], "COALESCE(e.label, e.element_id)", limit);
}

export function getTopLinks(filters: DashboardFilters, limit = 10) {
  return topEventLabels(
    filters,
    ["link_click", "external_link_click"],
    "COALESCE(e.destination_url, e.label)",
    limit,
  );
}

export function getTopDownloads(filters: DashboardFilters, limit = 10) {
  return topEventLabels(
    filters,
    ["download"],
    "COALESCE(e.metadata->>'filename', e.label)",
    limit,
  );
}

export function getSocialClicks(filters: DashboardFilters, limit = 10) {
  return topEventLabels(filters, ["social_click"], "COALESCE(e.label, e.destination_url)", limit);
}

export async function getButtonCTR(filters: DashboardFilters): Promise<number> {
  const where = sessionWhere(filters, 1);
  const rows = await dbQuery<{ sessions: string; clicks: string }>(
    `SELECT
       (SELECT COUNT(*) FROM sessions s JOIN visitors v ON v.id = s.visitor_id WHERE ${where.sql}) AS sessions,
       (SELECT COUNT(*) FROM events e JOIN sessions s ON s.id = e.session_id JOIN visitors v ON v.id = s.visitor_id
          WHERE e.event_name = 'cta_click' AND ${where.sql}) AS clicks`,
    where.params,
  );
  const r = rows[0];
  const sessions = Number(r?.sessions ?? 0);
  const clicks = Number(r?.clicks ?? 0);
  return sessions === 0 ? 0 : Math.round((clicks / sessions) * 1000) / 10;
}

export interface UtmRow {
  source: string;
  medium: string;
  campaign: string;
  count: number;
}

export async function getTrafficSources(filters: DashboardFilters): Promise<UtmRow[]> {
  const where = sessionWhere(filters, 1);
  const rows = await dbQuery<{
    source: string | null;
    medium: string | null;
    campaign: string | null;
    count: string;
  }>(
    `SELECT
       COALESCE(s.utm_source, CASE WHEN s.referrer = '' OR s.referrer IS NULL THEN 'direct' ELSE 'referral' END) AS source,
       COALESCE(s.utm_medium, '') AS medium,
       COALESCE(s.utm_campaign, '') AS campaign,
       COUNT(*) AS count
     FROM sessions s
     JOIN visitors v ON v.id = s.visitor_id
     WHERE ${where.sql}
     GROUP BY 1, 2, 3
     ORDER BY count DESC
     LIMIT 20`,
    where.params,
  );
  return rows.map((r) => ({
    source: r.source ?? "direct",
    medium: r.medium ?? "",
    campaign: r.campaign ?? "",
    count: Number(r.count),
  }));
}

export interface GeoRow {
  country: string;
  region: string | null;
  city: string | null;
  count: number;
}

export async function getGeoBreakdown(filters: DashboardFilters): Promise<GeoRow[]> {
  const where = sessionWhere(filters, 1);
  const rows = await dbQuery<{
    country: string | null;
    region: string | null;
    city: string | null;
    count: string;
  }>(
    `SELECT v.country, v.region, v.city, COUNT(DISTINCT s.id) AS count
     FROM sessions s
     JOIN visitors v ON v.id = s.visitor_id
     WHERE ${where.sql}
     GROUP BY v.country, v.region, v.city
     ORDER BY count DESC
     LIMIT 30`,
    where.params,
  );
  return rows.map((r) => ({
    country: r.country ?? "Unknown",
    region: r.region,
    city: r.city,
    count: Number(r.count),
  }));
}

export interface DeviceBreakdown {
  deviceTypes: CountRow[];
  browsers: CountRow[];
  operatingSystems: CountRow[];
}

export async function getDeviceBreakdown(filters: DashboardFilters): Promise<DeviceBreakdown> {
  const where = sessionWhere(filters, 1);
  async function group(column: string): Promise<CountRow[]> {
    const rows = await dbQuery<{ label: string | null; count: string }>(
      `SELECT ${column} AS label, COUNT(*) AS count
       FROM sessions s
       JOIN visitors v ON v.id = s.visitor_id
       WHERE ${where.sql}
       GROUP BY ${column}
       ORDER BY count DESC`,
      where.params,
    );
    return rows.map((r) => ({ label: r.label ?? "Unknown", count: Number(r.count) }));
  }
  const [deviceTypes, browsers, operatingSystems] = await Promise.all([
    group("s.device_type"),
    group("s.browser"),
    group("s.os"),
  ]);
  return { deviceTypes, browsers, operatingSystems };
}

export interface ScrollStats {
  avgScrollDepth: number;
  sessionsPast75: number;
  totalSessions: number;
}

export async function getScrollDepthStats(filters: DashboardFilters): Promise<ScrollStats> {
  const where = sessionWhere(filters, 1);
  const rows = await dbQuery<{ avg_depth: string | null; past75: string; total: string }>(
    `SELECT
       AVG(s.max_scroll_depth) AS avg_depth,
       COUNT(*) FILTER (WHERE s.max_scroll_depth >= 75) AS past75,
       COUNT(*) AS total
     FROM sessions s
     JOIN visitors v ON v.id = s.visitor_id
     WHERE ${where.sql}`,
    where.params,
  );
  const r = rows[0];
  return {
    avgScrollDepth: Math.round(Number(r?.avg_depth ?? 0)),
    sessionsPast75: Number(r?.past75 ?? 0),
    totalSessions: Number(r?.total ?? 0),
  };
}

export interface SessionRow {
  id: string;
  visitorId: string;
  startedAt: string;
  activeSeconds: number;
  pageViewCount: number;
  maxScrollDepth: number;
  country: string | null;
  deviceType: string | null;
  browser: string | null;
  entryPage: string | null;
  isReturning: boolean;
}

/** Optional `EXISTS (... events ...)` fragment narrowing sessions by event name and/or page — reused by the main query and its count query with independently-numbered placeholders. */
function eventExistsClause(filters: DashboardFilters, startIndex: number) {
  if (!filters.event && !filters.page) return { sql: "", params: [] as unknown[], nextIndex: startIndex };
  const conditions = ["e.session_id = s.id"];
  const params: unknown[] = [];
  let i = startIndex;
  if (filters.event) {
    conditions.push(`e.event_name = $${i}`);
    params.push(filters.event);
    i += 1;
  }
  if (filters.page) {
    conditions.push(`e.page = $${i}`);
    params.push(filters.page);
    i += 1;
  }
  return {
    sql: ` AND EXISTS (SELECT 1 FROM events e WHERE ${conditions.join(" AND ")})`,
    params,
    nextIndex: i,
  };
}

export async function getRecentSessions(
  filters: DashboardFilters,
  limit: number,
  offset: number,
): Promise<{ rows: SessionRow[]; total: number }> {
  const where = sessionWhere(filters, 3);
  const exists = eventExistsClause(filters, where.nextIndex);
  const rows = await dbQuery<{
    id: string;
    visitor_id: string;
    started_at: string;
    active_seconds: number;
    page_view_count: number;
    max_scroll_depth: number;
    country: string | null;
    device_type: string | null;
    browser: string | null;
    entry_page: string | null;
    is_returning: boolean;
  }>(
    `SELECT s.id, s.visitor_id, s.started_at, s.active_seconds, s.page_view_count,
            s.max_scroll_depth, v.country, s.device_type, s.browser, s.entry_page, v.is_returning
     FROM sessions s
     JOIN visitors v ON v.id = s.visitor_id
     WHERE ${where.sql}${exists.sql}
     ORDER BY s.started_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset, ...where.params, ...exists.params],
  );
  const countWhere = sessionWhere(filters, 1);
  const countExists = eventExistsClause(filters, countWhere.nextIndex);
  const countRows = await dbQuery<{ count: string }>(
    `SELECT COUNT(*) AS count FROM sessions s JOIN visitors v ON v.id = s.visitor_id WHERE ${countWhere.sql}${countExists.sql}`,
    [...countWhere.params, ...countExists.params],
  );
  return {
    rows: rows.map((r) => ({
      id: r.id,
      visitorId: r.visitor_id,
      startedAt: r.started_at,
      activeSeconds: Number(r.active_seconds),
      pageViewCount: Number(r.page_view_count),
      maxScrollDepth: Number(r.max_scroll_depth),
      country: r.country,
      deviceType: r.device_type,
      browser: r.browser,
      entryPage: r.entry_page,
      isReturning: r.is_returning,
    })),
    total: Number(countRows[0]?.count ?? 0),
  };
}

export interface EventTimelineRow {
  eventName: string;
  page: string;
  section: string | null;
  label: string | null;
  destinationUrl: string | null;
  createdAt: string;
}

export async function getSessionEvents(sessionId: string): Promise<EventTimelineRow[]> {
  const rows = await dbQuery<{
    event_name: string;
    page: string;
    section: string | null;
    label: string | null;
    destination_url: string | null;
    created_at: string;
  }>(
    `SELECT event_name, page, section, label, destination_url, created_at
     FROM events WHERE session_id = $1 ORDER BY created_at ASC LIMIT 200`,
    [sessionId],
  );
  return rows.map((r) => ({
    eventName: r.event_name,
    page: r.page,
    section: r.section,
    label: r.label,
    destinationUrl: r.destination_url,
    createdAt: r.created_at,
  }));
}

export { rangeOrDefault };
