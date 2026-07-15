export default function SectionHeading({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3">
        <span className="font-display text-sm font-semibold text-accent">
          {index}
        </span>
        <span className="h-px w-8 accent-bar" />
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {kicker}
        </span>
      </div>
      <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
