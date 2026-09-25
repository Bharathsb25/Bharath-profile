import type { QuestionRow } from "@/lib/db/queries/insights";

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

const topicName = (id: string) =>
  id === "unanswered" ? "Unanswered" : id.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

function QuestionList({ rows, empty, showTopic }: { rows: QuestionRow[]; empty: string; showTopic?: boolean }) {
  if (rows.length === 0) return <p className="mt-2 text-xs text-muted">{empty}</p>;
  return (
    <ul className="mt-2 max-h-80 space-y-2 overflow-y-auto pr-1">
      {rows.map((q) => (
        <li key={`${q.question}-${q.lastAsked}`} className="rounded-lg border border-line px-3 py-2">
          <p className="text-sm text-foreground">“{q.question}”</p>
          <p className="mt-1 text-[11px] text-muted">
            {q.count > 1 && <span className="font-semibold text-accent">×{q.count} · </span>}
            {showTopic && <span>{topicName(q.intent)} · </span>}
            last asked {when(q.lastAsked)} IST
          </p>
        </li>
      ))}
    </ul>
  );
}

/** What visitors ask the chat assistant — topics, gaps to fix, and the raw questions. */
export default function QuestionsCard({
  topics,
  unanswered,
  recent,
}: {
  topics: { label: string; count: number; typed: number }[];
  unanswered: QuestionRow[];
  recent: QuestionRow[];
}) {
  const total = topics.reduce((a, t) => a + t.count, 0);
  const max = Math.max(1, ...topics.map((t) => t.count));
  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Visitor questions (chat)</p>
        <p className="text-xs text-muted">
          {total.toLocaleString()} question{total === 1 ? "" : "s"} in this range ·{" "}
          <a href="/admin/questions" className="font-semibold text-accent hover:underline">
            See all &amp; download Excel →
          </a>
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Most asked topics</p>
          {topics.length === 0 ? (
            <p className="mt-2 text-xs text-muted">No chat questions yet</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {topics.map((t) => (
                <li key={t.label} title={`${t.typed} typed, ${t.count - t.typed} via quick-reply buttons`}>
                  <div className="flex items-baseline justify-between gap-3 text-xs">
                    <span className={t.label === "unanswered" ? "font-semibold text-red-600 dark:text-red-400" : "text-foreground/85"}>
                      {t.label === "unanswered" ? "⚠ " : ""}
                      {topicName(t.label)}
                    </span>
                    <span className="shrink-0 font-semibold text-foreground">{t.count}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-line/60">
                    <div className="h-1.5 rounded-full bg-accent" style={{ width: `${(t.count / max) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-red-600 dark:text-red-400">
            ⚠ Unanswered — improve these
          </p>
          <p className="mt-0.5 text-[11px] text-muted">The assistant had no answer. Add content or a new service for these.</p>
          <QuestionList rows={unanswered} empty="Nothing unanswered — nice." />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Recent typed questions</p>
          <p className="mt-0.5 text-[11px] text-muted">Newest first, with the topic the assistant matched.</p>
          <QuestionList rows={recent} empty="No typed questions yet" showTopic />
        </div>
      </div>
    </div>
  );
}
