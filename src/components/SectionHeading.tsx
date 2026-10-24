/**
 * A record's section header: a weighted rule, the title, and the
 * section's own tag sitting opposite it.
 *
 * `index` is still accepted so the ten existing call sites keep
 * compiling, but it is no longer rendered — 01 / 02 / 03 markers claim
 * these sections are a sequence to work through, and they are not.
 */
export default function SectionHeading({
  kicker,
  title,
}: {
  index?: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-9">
      <div className="h-[2px] w-full bg-foreground" />
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-foreground sm:text-[2rem]">
          {title}
        </h2>
        <p className="text-sm text-muted">{kicker}</p>
      </div>
    </div>
  );
}
