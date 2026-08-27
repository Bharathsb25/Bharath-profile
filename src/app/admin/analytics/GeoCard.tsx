import type { GeoRow } from "@/lib/db/queries/analytics";

export default function GeoCard({ rows }: { rows: GeoRow[] }) {
  return (
    <div className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Visitors by location
      </p>
      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-muted">No data for this range</p>
      ) : (
        <ul className="mt-3 max-h-72 space-y-2 overflow-y-auto">
          {rows.map((row, i) => (
            <li key={i} className="flex items-center justify-between gap-3 text-sm">
              <span className="truncate text-foreground/85">
                {[row.city, row.region, row.country].filter(Boolean).join(", ") || "Unknown"}
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
