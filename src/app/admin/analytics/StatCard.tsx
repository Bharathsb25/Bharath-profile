export default function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-bold text-foreground">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
