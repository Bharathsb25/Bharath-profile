import { disclaimer } from "@/data/samples";

/**
 * Required on every page that shows an IPO report, rendered OUTSIDE the report
 * frame and above it. These reports state Subscribe / Apply / Avoid on named
 * Indian IPOs; this is the only thing making clear they aren't advice.
 * Don't shrink it, don't move it to a footer, don't make it dismissible.
 */
export default function SampleDisclaimer() {
  return (
    <aside
      role="note"
      className="rounded-2xl border border-accent/50 bg-card p-5 sm:p-6"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/60 text-xs font-bold text-accent">
          !
        </span>
        <div>
          <p className="font-display text-sm font-bold text-foreground">
            {disclaimer.title}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">{disclaimer.body}</p>
        </div>
      </div>
    </aside>
  );
}
