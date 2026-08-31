import { NextResponse } from "next/server";
import { getRecentSessions, getSummary, rangeOrDefault, type DashboardFilters } from "@/lib/db/queries/analytics";

const MAX_ROWS = 5000;

const COLUMNS = [
  "session_id",
  "visitor_id",
  "started_at",
  "type",
  "entry_page",
  "device_type",
  "browser",
  "country",
  "ip_address",
  "active_seconds",
  "page_view_count",
  "max_scroll_depth",
] as const;

function csvEscape(value: unknown): string {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

// Auth is enforced by src/proxy.ts for every /api/admin/* route.
// Always re-run against current data — never serve a cached (possibly
// stale/empty) response for what's meant to be a live export.
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const filters: DashboardFilters = {
    from: url.searchParams.get("from") ?? undefined,
    to: url.searchParams.get("to") ?? undefined,
    event: url.searchParams.get("event") ?? undefined,
    page: url.searchParams.get("page") ?? undefined,
    country: url.searchParams.get("country") ?? undefined,
    device: url.searchParams.get("device") ?? undefined,
  };

  // One-time diagnostic mode: /api/admin/export?debug=1 — returns JSON
  // showing exactly what filters/counts this request computed, instead of
  // a CSV, so a blank-export report can be root-caused without guessing.
  // TODO: remove once the blank-CSV report is resolved.
  if (url.searchParams.get("debug") === "1") {
    try {
      const [{ rows, total }, summary] = await Promise.all([
        getRecentSessions(filters, MAX_ROWS, 0),
        getSummary(filters),
      ]);
      return NextResponse.json(
        {
          rawSearchParams: Object.fromEntries(url.searchParams),
          resolvedFilters: filters,
          resolvedDateRange: rangeOrDefault(filters),
          recentSessions: { total, rowsReturned: rows.length, firstRow: rows[0] ?? null },
          summary,
          serverNow: new Date().toISOString(),
        },
        { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } },
      );
    } catch (err) {
      return NextResponse.json(
        { debugError: err instanceof Error ? err.message : String(err) },
        { status: 500 },
      );
    }
  }

  try {
    const { rows } = await getRecentSessions(filters, MAX_ROWS, 0);
    const lines = [COLUMNS.join(",")];
    for (const r of rows) {
      lines.push(
        [
          r.id,
          r.visitorId,
          r.startedAt,
          r.isReturning ? "returning" : "new",
          r.entryPage ?? "",
          r.deviceType ?? "",
          r.browser ?? "",
          r.country ?? "",
          r.ip ?? "",
          r.activeSeconds,
          r.pageViewCount,
          r.maxScrollDepth,
        ]
          .map(csvEscape)
          .join(","),
      );
    }

    return new NextResponse(lines.join("\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="analytics-sessions-${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (err) {
    console.error("admin export: query failed", err);
    return NextResponse.json(
      { error: "Export failed" },
      { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } },
    );
  }
}
