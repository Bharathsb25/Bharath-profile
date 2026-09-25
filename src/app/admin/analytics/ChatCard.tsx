import type { ChatStats } from "@/lib/db/queries/insights";

function Metric({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div>
      <p className="font-display text-xl font-bold text-foreground">{value}</p>
      <p className="text-[11px] text-muted">{label}</p>
      {hint && <p className="text-[11px] text-muted/80">{hint}</p>}
    </div>
  );
}

export default function ChatCard({ stats, sessions }: { stats: ChatStats; sessions: number }) {
  const openRate = sessions ? Math.round((stats.opens / sessions) * 100) : 0;
  const leadRate = stats.opens ? Math.round((stats.leads / stats.opens) * 100) : 0;
  return (
    <div className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Chat assistant</p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Metric label="Sessions opened chat" value={stats.opens} hint={`${openRate}% of sessions`} />
        <Metric label="Started enquiry" value={stats.leadStarts} />
        <Metric label="Leads sent" value={stats.leads} hint={`${leadRate}% of chat opens`} />
      </div>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Where chat sent visitors</p>
      {stats.destinations.length === 0 ? (
        <p className="mt-2 text-xs text-muted">No chat navigation yet</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {stats.destinations.map((d) => (
            <li key={d.label} className="flex items-center justify-between gap-3 text-xs">
              <span className="truncate text-foreground/85">{d.label}</span>
              <span className="shrink-0 font-semibold text-accent">{d.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
