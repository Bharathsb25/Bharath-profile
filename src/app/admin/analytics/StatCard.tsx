export default function StatCard({
  label,
  value,
  hint,
  delta,
}: {
  label: string;
  value: string | number;
  hint?: string;
  /** % change vs the previous period of equal length; null = no baseline. */
  delta?: number | null;
}) {
  return (
    <div className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-bold text-foreground">
        {value}
      </p>
      {delta !== undefined && (
        <p className="mt-1 text-xs text-muted">
          {delta === null ? (
            "no previous data"
          ) : (
            <>
              <span
                className={
                  delta > 0
                    ? "font-semibold text-emerald-600 dark:text-emerald-400"
                    : delta < 0
                      ? "font-semibold text-red-600 dark:text-red-400"
                      : "font-semibold"
                }
              >
                {delta > 0 ? "▲" : delta < 0 ? "▼" : "■"} {Math.abs(delta)}%
              </span>{" "}
              vs previous period
            </>
          )}
        </p>
      )}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
