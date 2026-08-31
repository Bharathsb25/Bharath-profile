import type { DeviceBreakdown } from "@/lib/db/queries/analytics";

function MiniList({ title, rows }: { title: string; rows: { label: string; count: number }[] }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
        {title}
      </p>
      {rows.length === 0 ? (
        <p className="mt-2 text-xs text-muted">No data</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {rows.slice(0, 6).map((row) => (
            <li key={row.label} className="flex items-center justify-between text-xs">
              <span className="min-w-0 truncate text-foreground/85" title={row.label}>{row.label}</span>
              <span className="shrink-0 font-semibold text-accent">{row.count.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function DeviceCard({ data }: { data: DeviceBreakdown }) {
  return (
    <div className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Device, browser &amp; OS
      </p>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MiniList title="Device" rows={data.deviceTypes} />
        <MiniList title="Browser" rows={data.browsers} />
        <MiniList title="OS" rows={data.operatingSystems} />
      </div>
    </div>
  );
}
