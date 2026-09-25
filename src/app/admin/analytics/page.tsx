import type { Metadata } from "next";
import Link from "next/link";
import {
  getSummary,
  getTopPages,
  getTopSections,
  getTopProjects,
  getTopButtons,
  getTopLinks,
  getSocialClicks,
  getButtonCTR,
  getTrafficSources,
  getGeoBreakdown,
  getDeviceBreakdown,
  getScrollDepthStats,
  getRecentSessions,
  type DashboardFilters,
} from "@/lib/db/queries/analytics";
import {
  getKpisWithComparison,
  pctChange,
  getLiveVisitors,
  getDailyTrend,
  getHourOfDay,
  getLeadFunnel,
  getChatStats,
  getReferrerDomains,
  getLeadsBySource,
  getChatQuestionTopics,
  getChatQuestions,
} from "@/lib/db/queries/insights";
import QuestionsCard from "./QuestionsCard";
import TrendChart from "./TrendChart";
import HourChart from "./HourChart";
import FunnelCard from "./FunnelCard";
import ChatCard from "./ChatCard";
import StatCard from "./StatCard";
import TopListCard from "./TopListCard";
import GeoCard from "./GeoCard";
import DeviceCard from "./DeviceCard";
import SessionsTable from "./SessionsTable";
import FilterBar from "./FilterBar";
import LogoutButton from "./LogoutButton";
import ExportCsvButton from "./ExportCsvButton";

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
    socialClicks,
    ctr,
    trafficSources,
    geo,
    device,
    scrollStats,
    sessions,
    kpis,
    live,
    trend,
    hours,
    funnel,
    chat,
    referrers,
    leadsBySource,
    questionTopics,
    unansweredQuestions,
    recentQuestions,
  ] = await Promise.all([
    getSummary(filters),
    getTopPages(filters),
    getTopSections(filters),
    getTopProjects(filters),
    getTopButtons(filters),
    getTopLinks(filters),
    getSocialClicks(filters),
    getButtonCTR(filters),
    getTrafficSources(filters),
    getGeoBreakdown(filters),
    getDeviceBreakdown(filters),
    getScrollDepthStats(filters),
    getRecentSessions(filters, SESSIONS_PER_PAGE, offset),
    getKpisWithComparison(filters),
    getLiveVisitors(),
    getDailyTrend(filters),
    getHourOfDay(filters),
    getLeadFunnel(filters),
    getChatStats(filters),
    getReferrerDomains(filters),
    getLeadsBySource(filters),
    getChatQuestionTopics(filters),
    getChatQuestions(filters, { unansweredOnly: true, limit: 25 }),
    getChatQuestions(filters, { limit: 25 }),
  ]);
  const { current: k, previous: kp } = kpis;

  // Quick range links (keep device/country/page/event filters).
  const rangeHref = (days: number) => {
    const params = new URLSearchParams(
      Object.entries(filters).filter(([key, v]) => v && key !== "from" && key !== "to") as [string, string][],
    );
    params.set("from", new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10));
    return `/admin/analytics?${params.toString()}`;
  };

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
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-foreground"
              title="Visitors active in the last 5 minutes"
            >
              <span className={`h-2 w-2 rounded-full ${live > 0 ? "animate-pulse bg-emerald-500" : "bg-muted/50"}`} />
              {live} live now
            </span>
            {[7, 30, 90].map((d) => (
              <Link
                key={d}
                href={rangeHref(d)}
                className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {d}d
              </Link>
            ))}
            <Link
              href="/admin/questions"
              className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Visitor questions →
            </Link>
            <ExportCsvButton query={exportQuery} />
            <LogoutButton />
          </div>
        </div>

        <div className="mt-6">
          <FilterBar />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <StatCard label="Unique visitors" value={k.visitors.toLocaleString()} delta={pctChange(k.visitors, kp.visitors)} />
          <StatCard label="Sessions" value={k.sessions.toLocaleString()} delta={pctChange(k.sessions, kp.sessions)} />
          <StatCard label="Page views" value={k.pageViews.toLocaleString()} delta={pctChange(k.pageViews, kp.pageViews)} />
          <StatCard
            label="Leads"
            value={k.leads.toLocaleString()}
            delta={pctChange(k.leads, kp.leads)}
            hint={k.sessions ? `${Math.round((k.leads / k.sessions) * 1000) / 10}% of sessions` : undefined}
          />
          <StatCard
            label="Engaged sessions"
            value={`${k.engagedRate}%`}
            delta={pctChange(k.engagedRate, kp.engagedRate)}
            hint="10s+ active, 2+ pages or 50%+ scroll"
          />
          <StatCard
            label="Avg active time"
            value={formatDuration(k.avgActiveSeconds)}
            delta={pctChange(k.avgActiveSeconds, kp.avgActiveSeconds)}
            hint="per session"
          />
          <StatCard
            label="New vs returning"
            value={`${summary.newVisitors} / ${summary.returningVisitors}`}
            hint={`Button CTR ${ctr}% · ${formatDuration(summary.totalActiveSeconds)} total active`}
          />
          <StatCard
            label="Avg scroll depth"
            value={`${scrollStats.avgScrollDepth}%`}
            hint={`${scrollStats.sessionsPast75}/${scrollStats.totalSessions} sessions past 75%`}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TrendChart points={trend} />
          </div>
          <HourChart hours={hours} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FunnelCard steps={funnel.steps} failures={funnel.failures} leadsBySource={leadsBySource} />
          <ChatCard stats={chat} sessions={k.sessions} />
        </div>

        <div className="mt-6">
          <QuestionsCard topics={questionTopics} unanswered={unansweredQuestions} recent={recentQuestions} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <TopListCard title="Top pages" rows={topPages} />
          <TopListCard title="Top sections" rows={topSections} />
          <TopListCard title="Projects" rows={topProjects} />
          <TopListCard title="Top buttons" rows={topButtons} />
          <TopListCard title="Top links" rows={topLinks} />
          <TopListCard title="Referring sites" rows={referrers} />
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
