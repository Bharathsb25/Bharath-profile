const label = (h: number) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? "am" : "pm"}`;

/** Sessions by hour of day (IST) — when to post on LinkedIn / expect replies. */
export default function HourChart({ hours }: { hours: number[] }) {
  const max = Math.max(1, ...hours);
  const total = hours.reduce((a, b) => a + b, 0);
  const peak = hours.indexOf(Math.max(...hours));

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Visits by hour (IST)</p>
        {total > 0 && (
          <p className="text-xs text-muted">
            Peak: <span className="font-semibold text-foreground">{label(peak)}–{label((peak + 1) % 24)}</span>
          </p>
        )}
      </div>
      {total === 0 ? (
        <p className="mt-4 text-sm text-muted">No data for this range</p>
      ) : (
        <>
          <ul className="mt-4 flex h-28 items-end gap-[2px] border-b border-line" aria-label="Sessions by hour of day">
            {hours.map((n, h) => (
              <li key={h} className="group relative flex h-full flex-1 items-end">
                <div
                  className="w-full rounded-t-[4px] bg-accent/80 transition-colors group-hover:bg-accent"
                  style={{ height: `${(n / max) * 100}%`, minHeight: n ? 2 : 0 }}
                />
                <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-background px-2 py-1 text-[11px] text-foreground shadow group-hover:block">
                  {label(h)}–{label((h + 1) % 24)} · {n} session{n === 1 ? "" : "s"}
                </span>
                <span className="sr-only">{label(h)}: {n} sessions</span>
              </li>
            ))}
          </ul>
          <div className="mt-1.5 flex justify-between text-[10px] text-muted" aria-hidden="true">
            <span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>11pm</span>
          </div>
        </>
      )}
    </div>
  );
}
