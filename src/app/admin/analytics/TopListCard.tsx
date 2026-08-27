import type { CountRow } from "@/lib/db/queries/analytics";

export default function TopListCard({
  title,
  rows,
  emptyLabel = "No data for this range",
}: {
  title: string;
  rows: CountRow[];
  emptyLabel?: string;
}) {
  return (
    <div className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {title}
      </p>
      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-muted">{emptyLabel}</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {rows.map((row) => (
            <li
              key={row.label}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="truncate text-foreground/85" title={row.label}>
                {row.label}
              </span>
              <span className="shrink-0 font-display font-semibold text-accent">
                {row.count.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
