import type { Metadata } from "next";
import Link from "next/link";
import {
  getQuestionGroups,
  getQuestionLog,
  getQuestionSummary,
  getQuestionTopicCounts,
  parseQuestionFilters,
} from "@/lib/db/queries/insights";
import { INTENTS } from "@/lib/chat/knowledge";
import StatCard from "../analytics/StatCard";
import LogoutButton from "../analytics/LogoutButton";

export const metadata: Metadata = { title: "Visitor questions — Admin" };
export const dynamic = "force-dynamic";

const PER_PAGE = 50;
const field =
  "rounded-lg border border-line bg-background px-3 py-2 text-xs text-foreground outline-none transition-colors focus:border-accent";
const pill =
  "rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent";

const topicName = (id: string) =>
  id === "unanswered" ? "Unanswered" : id.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
const when = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const one = (k: string) => {
    const v = sp[k];
    return (Array.isArray(v) ? v[0] : v) ?? null;
  };
  const filters = parseQuestionFilters(one);
  const page = Math.max(1, Number(one("p")) || 1);
  const view = one("view") === "grouped" ? "grouped" : "all";

  const [summary, topics, log, groups] = await Promise.all([
    getQuestionSummary(filters),
    getQuestionTopicCounts(filters),
    view === "all" ? getQuestionLog(filters, PER_PAGE, (page - 1) * PER_PAGE) : Promise.resolve(null),
    view === "grouped" ? getQuestionGroups(filters, 200) : Promise.resolve(null),
  ]);

  // Rebuild links while keeping the raw form values (not the IST-expanded dates).
  const raw: Record<string, string> = {};
  for (const k of ["from", "to", "topic", "q", "unanswered", "chips", "view", "device", "country"]) {
    const v = one(k);
    if (v) raw[k] = v;
  }
  const href = (patch: Record<string, string | null>, base = "/admin/questions") => {
    const params = new URLSearchParams(raw);
    for (const [k, v] of Object.entries(patch)) {
      if (v === null) params.delete(k);
      else params.set(k, v);
    }
    const q = params.toString();
    return q ? `${base}?${q}` : base;
  };
  const exportHref = href({ p: null, view: null }, "/api/admin/questions/export");
  const totalPages = log ? Math.max(1, Math.ceil(log.total / PER_PAGE)) : 1;
  const topicOptions = ["unanswered", ...INTENTS.map((i) => i.id)];

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Admin</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-foreground">Visitor questions</h1>
            <p className="mt-1 text-xs text-muted">
              What visitors ask the chat assistant. Emails, phone numbers and links are removed before saving.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/analytics" className={pill}>← Analytics</Link>
            <a
              href={exportHref}
              className="inline-flex items-center gap-1.5 rounded-full accent-bar px-4 py-2 text-xs font-semibold text-on-accent"
            >
              ⬇ Download Excel
            </a>
            <LogoutButton />
          </div>
        </div>

        {/* Filters — plain GET form, so every view is a shareable URL. */}
        <form method="get" className="card mt-6 flex flex-wrap items-end gap-3 p-4">
          <div>
            <label htmlFor="f-from" className="mb-1 block text-[11px] font-medium text-muted">From</label>
            <input id="f-from" type="date" name="from" defaultValue={raw.from ?? ""} className={field} />
          </div>
          <div>
            <label htmlFor="f-to" className="mb-1 block text-[11px] font-medium text-muted">To</label>
            <input id="f-to" type="date" name="to" defaultValue={raw.to ?? ""} className={field} />
          </div>
          <div>
            <label htmlFor="f-topic" className="mb-1 block text-[11px] font-medium text-muted">Topic</label>
            <select id="f-topic" name="topic" defaultValue={raw.topic ?? ""} className={field}>
              <option value="">All topics</option>
              {topicOptions.map((t) => (
                <option key={t} value={t}>{topicName(t)}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-q" className="mb-1 block text-[11px] font-medium text-muted">Search</label>
            <input id="f-q" type="search" name="q" placeholder="e.g. shopify" defaultValue={raw.q ?? ""} className={`${field} w-44`} />
          </div>
          <label className="flex items-center gap-2 pb-2 text-xs text-foreground">
            <input type="checkbox" name="unanswered" value="1" defaultChecked={raw.unanswered === "1"} />
            Unanswered only
          </label>
          <label className="flex items-center gap-2 pb-2 text-xs text-foreground" title="Include quick-reply button taps, not just typed questions">
            <input type="checkbox" name="chips" value="1" defaultChecked={raw.chips === "1"} />
            Include button taps
          </label>
          {view === "grouped" && <input type="hidden" name="view" value="grouped" />}
          <div className="flex gap-2">
            <button type="submit" className="rounded-full accent-bar px-4 py-2 text-xs font-semibold text-on-accent">Apply</button>
            <Link href="/admin/questions" className={pill}>Reset</Link>
          </div>
        </form>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label="Questions" value={summary.total.toLocaleString()} hint={`${summary.distinct} different questions`} />
          <StatCard label="Answered by assistant" value={`${summary.answeredRate}%`} />
          <StatCard label="Unanswered" value={summary.unanswered.toLocaleString()} hint="content or service gaps" />
          <StatCard label="Visitors who asked" value={summary.sessions.toLocaleString()} hint="sessions" />
        </div>

        {/* Topic chips — click to filter */}
        {topics.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {topics.map((t) => {
              const active = raw.topic === t.label || (t.label === "unanswered" && raw.unanswered === "1");
              return (
                <Link
                  key={t.label}
                  href={href({ topic: active ? null : t.label, unanswered: null, p: null })}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "border-accent bg-accent/15 text-accent"
                      : t.label === "unanswered"
                        ? "border-red-400/60 text-red-600 hover:bg-red-500/10 dark:text-red-400"
                        : "border-line text-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {t.label === "unanswered" ? "⚠ " : ""}
                  {topicName(t.label)} · {t.count}
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex items-center gap-2 text-xs">
          <Link href={href({ view: null, p: null })} className={view === "all" ? `${pill} border-accent text-accent` : pill}>
            Every question
          </Link>
          <Link href={href({ view: "grouped", p: null })} className={view === "grouped" ? `${pill} border-accent text-accent` : pill}>
            Grouped by question
          </Link>
        </div>

        <div className="card mt-3 overflow-x-auto p-0">
          {view === "all" && log && (
            log.rows.length === 0 ? (
              <p className="p-6 text-sm text-muted">No questions match these filters yet.</p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="border-b border-line text-[11px] uppercase tracking-[0.1em] text-muted">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Asked (IST)</th>
                    <th className="px-4 py-3 font-semibold">Question</th>
                    <th className="px-4 py-3 font-semibold">Topic</th>
                    <th className="px-4 py-3 font-semibold">Page</th>
                    <th className="px-4 py-3 font-semibold">Where</th>
                    <th className="px-4 py-3 font-semibold">Device</th>
                  </tr>
                </thead>
                <tbody>
                  {log.rows.map((r, i) => (
                    <tr key={`${r.sessionId}-${r.askedAt}-${i}`} className="border-b border-line/60 last:border-0">
                      <td className="whitespace-nowrap px-4 py-2.5 text-xs text-muted">{when(r.askedAt)}</td>
                      <td className="px-4 py-2.5 text-foreground">
                        {r.question}
                        {r.viaButton && <span className="ml-2 rounded bg-line/60 px-1.5 py-0.5 text-[10px] text-muted">button</span>}
                      </td>
                      <td className={`whitespace-nowrap px-4 py-2.5 text-xs ${r.answered ? "text-foreground/80" : "font-semibold text-red-600 dark:text-red-400"}`}>
                        {r.answered ? "" : "⚠ "}{topicName(r.topic)}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted">{r.page ?? "—"}</td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-xs text-muted">{[r.city, r.country].filter(Boolean).join(", ") || "—"}</td>
                      <td className="px-4 py-2.5 text-xs text-muted">{r.device ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {view === "grouped" && groups && (
            groups.length === 0 ? (
              <p className="p-6 text-sm text-muted">No questions match these filters yet.</p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="border-b border-line text-[11px] uppercase tracking-[0.1em] text-muted">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Question</th>
                    <th className="px-4 py-3 font-semibold">Times asked</th>
                    <th className="px-4 py-3 font-semibold">Topic</th>
                    <th className="px-4 py-3 font-semibold">Last asked (IST)</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((g) => (
                    <tr key={g.question} className="border-b border-line/60 last:border-0">
                      <td className="px-4 py-2.5 text-foreground">{g.question}</td>
                      <td className="px-4 py-2.5 font-display font-semibold text-accent">{g.count}</td>
                      <td className={`whitespace-nowrap px-4 py-2.5 text-xs ${g.topic === "unanswered" ? "font-semibold text-red-600 dark:text-red-400" : "text-foreground/80"}`}>
                        {g.topic === "unanswered" ? "⚠ " : ""}{topicName(g.topic)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-xs text-muted">{when(g.lastAsked)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>

        {view === "all" && log && totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs">
            {page > 1 && <Link href={href({ p: String(page - 1) })} className={pill}>← Previous</Link>}
            <span className="px-2 text-muted">Page {page} of {totalPages} · {log.total.toLocaleString()} questions</span>
            {page < totalPages && <Link href={href({ p: String(page + 1) })} className={pill}>Next →</Link>}
          </div>
        )}
      </div>
    </div>
  );
}
