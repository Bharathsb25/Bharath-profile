import type { Metadata } from "next";
import Link from "next/link";
import {
  getSummary,
  getTopPages,
  getTopSections,
  getTopProjects,
  getTopButtons,
  getTopLinks,
  getTopDownloads,
  getSocialClicks,
  getButtonCTR,
  getTrafficSources,
  getGeoBreakdown,
  getDeviceBreakdown,
  getScrollDepthStats,
  getRecentSessions,
  type DashboardFilters,
} from "@/lib/db/queries/analytics";
import StatCard from "./StatCard";
import TopListCard from "./TopListCard";
import GeoCard from "./GeoCard";
import DeviceCard from "./DeviceCard";
import SessionsTable from "./SessionsTable";
import FilterBar from "./FilterBar";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = { title: "Analytics — Admin" };
export const dynamic = "force-dynamic";

const SESSIONS_PER_PAGE = 20;

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

function parseFilters(sp: Record<string, string | string[] | undefined>): DashboardFilters {
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  return {
    from: one(sp.from) || undefined,
    to: one(sp.to) || undefined,
    event: one(sp.event) || undefined,
    page: one(sp.page) || undefined,
    country: one(sp.country) || undefined,
    device: one(sp.device) || undefined,
  };
}

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const sessionPage = Math.max(1, Number(sp.sessionPage) || 1);
  const offset = (sessionPage - 1) * SESSIONS_PER_PAGE;

  const [
    summary,
    topPages,
    topSections,
    topProjects,
    topButtons,
    topLinks,
    topDownloads,
    socialClicks,
    ctr,
    trafficSources,
    geo,
    device,
    scrollStats,
    sessions,
  ] = await Promise.all([
    getSummary(filters),
    getTopPages(filters),
    getTopSections(filters),
    getTopProjects(filters),
    getTopButtons(filters),
    getTopLinks(filters),
    getTopDownloads(filters),
    getSocialClicks(filters),
    getButtonCTR(filters),
    getTrafficSources(filters),
    getGeoBreakdown(filters),
    getDeviceBreakdown(filters),
    getScrollDepthStats(filters),
    getRecentSessions(filters, SESSIONS_PER_PAGE, offset),
  ]);

  const exportQuery = new URLSearchParams(
    Object.entries(filters).filter(([, v]) => v) as [string, string][],
  ).toString();

  const totalSessionPages = Math.max(1, Math.ceil(sessions.total / SESSIONS_PER_PAGE));
  const pageQuery = (p: number) => {
    const params = new URLSearchParams(
      Object.entries(filters).filter(([, v]) => v) as [string, string][],
    );
    params.set("sessionPage", String(p));
    return `/admin/analytics?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Admin
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-foreground">
              Visitor analytics
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/api/admin/export?${exportQuery}`}
              className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Export CSV
            </a>
            <LogoutButton />
          </div>
        </div>

        <div className="mt-6">
          <FilterBar />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard label="Unique visitors" value={summary.uniqueVisitors.toLocaleString()} />
          <StatCard label="Sessions" value={summary.totalSessions.toLocaleString()} />
          <StatCard label="Page views" value={summary.totalPageViews.toLocaleString()} />
          <StatCard
            label="New vs returning"
            value={`${summary.newVisitors} / ${summary.returningVisitors}`}
          />
          <StatCard label="Button CTR" value={`${ctr}%`} hint="clicks per session" />
          <StatCard
            label="Avg active time"
            value={formatDuration(summary.avgActiveSeconds)}
            hint="per session"
          />
          <StatCard
            label="Total active time"
            value={formatDuration(summary.totalActiveSeconds)}
          />
          <StatCard
            label="Avg scroll depth"
            value={`${scrollStats.avgScrollDepth}%`}
            hint={`${scrollStats.sessionsPast75}/${scrollStats.totalSessions} sessions past 75%`}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <TopListCard title="Top pages" rows={topPages} />
          <TopListCard title="Top sections" rows={topSections} />
          <TopListCard title="Projects" rows={topProjects} />
          <TopListCard title="Top buttons" rows={topButtons} />
          <TopListCard title="Top links" rows={topLinks} />
          <TopListCard title="Downloads" rows={topDownloads} />
          <TopListCard title="Social clicks" rows={socialClicks} />
          <TopListCard
            title="Traffic sources"
            rows={trafficSources.map((t) => ({
              label: [t.source, t.medium, t.campaign].filter(Boolean).join(" / "),
              count: t.count,
            }))}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <GeoCard rows={geo} />
          <DeviceCard data={device} />
        </div>

        <div className="mt-8">
          <h2 className="font-display text-lg font-bold text-foreground">
            Recent sessions
          </h2>
          <p className="mt-1 text-xs text-muted">
            Click a row to see its event timeline. {sessions.total.toLocaleString()} session
            {sessions.total === 1 ? "" : "s"} match the current filters.
          </p>
          <div className="mt-3">
            <SessionsTable rows={sessions.rows} />
          </div>
          {totalSessionPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs">
              {sessionPage > 1 && (
                <Link
                  href={pageQuery(sessionPage - 1)}
                  className="rounded-full border border-line px-3 py-1.5 font-semibold text-foreground hover:border-accent hover:text-accent"
                >
                  ← Previous
                </Link>
              )}
              <span className="px-2 text-muted">
                Page {sessionPage} of {totalSessionPages}
              </span>
              {sessionPage < totalSessionPages && (
                <Link
                  href={pageQuery(sessionPage + 1)}
                  className="rounded-full border border-line px-3 py-1.5 font-semibold text-foreground hover:border-accent hover:text-accent"
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
