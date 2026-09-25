import type { DayPoint } from "@/lib/db/queries/insights";

const shortDate = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

/** Sessions per day (IST). Plain HTML bars — each bar has a hover tooltip. */
export default function TrendChart({ points }: { points: DayPoint[] }) {
  const max = Math.max(1, ...points.map((p) => p.sessions));
  const total = points.reduce((a, p) => a + p.sessions, 0);
  const best = points.reduce((b, p) => (p.sessions > b.sessions ? p : b), points[0] ?? { day: "", sessions: 0, visitors: 0 });
  const tickEvery = Math.max(1, Math.ceil(points.length / 6));

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Sessions per day</p>
        {total > 0 && (
          <p className="text-xs text-muted">
            Busiest day: <span className="font-semibold text-foreground">{shortDate(best.day)}</span> ({best.sessions})
          </p>
        )}
      </div>
      {total === 0 ? (
        <p className="mt-4 text-sm text-muted">No data for this range</p>
      ) : (
        <>
          <div className="relative mt-4 h-40">
            <span className="absolute -top-1 left-0 text-[10px] text-muted">{max}</span>
            <div className="absolute inset-x-0 top-0 border-t border-dashed border-line" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 border-t border-line" aria-hidden="true" />
            <ul className="absolute inset-0 flex items-end gap-[2px] pl-6" aria-label="Sessions per day">
              {points.map((p) => (
                <li key={p.day} className="group relative flex h-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-[4px] bg-accent/80 transition-colors group-hover:bg-accent"
                    style={{ height: `${(p.sessions / max) * 100}%`, minHeight: p.sessions ? 2 : 0 }}
                  />
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-background px-2 py-1 text-[11px] text-foreground shadow group-hover:block">
                    {shortDate(p.day)} · {p.sessions} session{p.sessions === 1 ? "" : "s"} · {p.visitors} visitor{p.visitors === 1 ? "" : "s"}
                  </span>
                  <span className="sr-only">
                    {p.day}: {p.sessions} sessions, {p.visitors} visitors
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-1.5 flex gap-[2px] pl-6 text-[10px] text-muted" aria-hidden="true">
            {points.map((p, i) => (
              <span key={p.day} className="flex-1 overflow-visible whitespace-nowrap">
                {i % tickEvery === 0 ? shortDate(p.day) : ""}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
