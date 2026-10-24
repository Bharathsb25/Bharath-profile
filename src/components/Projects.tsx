import { featuredProject as p } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";

/**
 * The case study, set as a case record: context and problem stated
 * plainly, outcomes as a ruled figure row, then the workflow stage by
 * stage with its full description.
 *
 * The hero shows the same five stages as a one-line rail; this is where
 * they get written out, so the numbering here is a real sequence rather
 * than ornament.
 */
export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading kicker="Featured work" title="Projects" />

      <article>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="stamp">{p.type}</span>
          <span className="text-sm text-muted">{p.role}</span>
        </div>

        <h3 className="mt-5 max-w-[26ch] font-display text-2xl font-extrabold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.25rem]">
          {p.title}
        </h3>

        <p className="mt-5 max-w-[66ch] text-lg leading-relaxed text-foreground/90">
          {p.summary}
        </p>

        {/* Context, as a record's two fields. */}
        <dl className="mt-10 grid gap-y-5 border-y border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-x-10">
          <dt className="font-display text-sm font-bold tracking-tight text-foreground">
            Client
          </dt>
          <dd className="max-w-[60ch] text-[0.9375rem] text-muted">
            {p.client}
          </dd>
          <dt className="font-display text-sm font-bold tracking-tight text-foreground">
            The problem
          </dt>
          <dd className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted">
            {p.problem}
          </dd>
        </dl>

        {/* Outcomes. Qualitative, and set as such — no icon tiles
            dressing four words up as metrics. */}
        <div className="mt-10">
          <h4 className="font-display text-sm font-bold tracking-tight text-foreground">
            The outcome
          </h4>
          <dl className="mt-4 grid grid-cols-2 border-t border-line sm:grid-cols-4">
            {p.outcomes.map((o) => (
              <div
                key={o.label}
                className="border-b border-line px-1 py-5 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:pr-5 sm:[&:not(:first-child)]:pl-5"
              >
                <dt className="font-display text-xl font-bold leading-none tracking-tight text-accent">
                  {o.value}
                </dt>
                <dd className="mt-2 text-sm leading-snug text-muted">
                  {o.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The workflow, stage by stage. */}
        <div className="mt-12">
          <h4 className="font-display text-sm font-bold tracking-tight text-foreground">
            How the workflow runs
          </h4>
          <ol className="mt-4">
            {p.flow.map((step, i) => (
              <li
                key={step.title}
                className="grid gap-y-1 border-t border-line py-5 sm:grid-cols-[2.5rem_1fr] sm:gap-x-6"
              >
                <span className="tnum text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h5 className="font-display text-base font-bold tracking-tight text-foreground">
                    {step.title}
                  </h5>
                  <p className="mt-1 max-w-[62ch] leading-relaxed text-muted">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* What it took to build. */}
        <div className="mt-12 border-t-2 border-foreground pt-6">
          <h4 className="font-display text-sm font-bold tracking-tight text-foreground">
            Built into it
          </h4>
          <ul className="mt-4 grid gap-x-12 sm:grid-cols-2">
            {p.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 border-b border-line py-3 text-[0.9375rem] leading-snug text-muted"
              >
                <span
                  aria-hidden
                  className="mt-[0.6em] h-px w-3 shrink-0 bg-accent"
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-sm border border-line px-2.5 py-1 text-sm text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h4 className="font-display text-lg font-bold tracking-tight text-foreground">
              {p.businessCta.title}
            </h4>
            <p className="mt-1.5 max-w-[56ch] leading-relaxed text-muted">
              {p.businessCta.text}
            </p>
          </div>
          <a
            href="#contact"
            data-track-event="project_click"
            data-track-section="projects"
            data-track-label={p.businessCta.button}
            className="accent-bar shrink-0 self-start rounded-sm px-5 py-3 font-display text-sm font-bold tracking-tight text-on-accent transition-colors hover:brightness-110 sm:self-auto"
          >
            {p.businessCta.button.replace(/\s*→\s*$/, "")}
          </a>
        </div>
      </article>
    </section>
  );
}
