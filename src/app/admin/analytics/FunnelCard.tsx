import type { FunnelStep } from "@/lib/db/queries/insights";

/** Distinct sessions reaching each step, with step-to-step conversion. */
export default function FunnelCard({
  steps,
  failures,
  leadsBySource,
}: {
  steps: FunnelStep[];
  failures: number;
  leadsBySource: { label: string; count: number }[];
}) {
  const top = Math.max(1, steps[0]?.count ?? 0);
  return (
    <div className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Lead funnel (sessions)</p>
      <ol className="mt-4 space-y-3">
        {steps.map((s, i) => {
          const prev = i > 0 ? steps[i - 1].count : 0;
          const conv = i > 0 && prev > 0 ? Math.round((s.count / prev) * 100) : null;
          return (
            <li key={s.label}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-foreground/85">{s.label}</span>
                <span className="shrink-0">
                  <span className="font-display font-semibold text-foreground">{s.count.toLocaleString()}</span>
                  {conv !== null && <span className="ml-2 text-xs text-muted">{conv}% of previous</span>}
                </span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-line/60">
                <div
                  className="h-2 rounded-full bg-accent"
                  style={{ width: `${(s.count / top) * 100}%`, minWidth: s.count ? 4 : 0 }}
                />
              </div>
            </li>
          );
        })}
      </ol>
      {failures > 0 && (
        <p className="mt-4 text-xs text-red-600 dark:text-red-400">
          ⚠ {failures} session{failures === 1 ? "" : "s"} hit a form error — the message may not have reached you.
        </p>
      )}
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Leads by form</p>
      {leadsBySource.length === 0 ? (
        <p className="mt-2 text-xs text-muted">No leads in this range yet</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {leadsBySource.map((l) => (
            <li key={l.label} className="flex items-center justify-between gap-3 text-xs">
              <span className="truncate text-foreground/85">{l.label}</span>
              <span className="shrink-0 font-semibold text-accent">{l.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
