import { featuredProject as p } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading
          index="04"
          kicker="Featured Work"
          title="Projects"
        />
      </Reveal>

      <Reveal delay={80}>
        <div className="card p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full accent-bar px-3 py-1 text-xs font-semibold text-white">
              {p.type}
            </span>
            <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
              {p.role}
            </span>
          </div>

          <h3 className="mt-4 font-display text-xl font-bold text-foreground sm:text-2xl">
            {p.title}
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            {p.summary}
          </p>

          {/* Flow chart */}
          <div className="mt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              How the workflow runs
            </p>
            <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
              {p.flow.map((step, i) => (
                <div key={step.title} className="flex flex-col md:flex-1 md:flex-row md:items-stretch">
                  <div className="group relative flex-1 rounded-xl border border-line bg-background p-4 transition-colors hover:border-accent">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full accent-bar text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <h4 className="mt-3 font-display text-sm font-semibold text-foreground">
                      {step.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-5 text-muted">
                      {step.desc}
                    </p>
                  </div>
                  {i < p.flow.length - 1 && (
                    <div
                      className="flex items-center justify-center py-1 text-accent md:px-1 md:py-0"
                      aria-hidden="true"
                    >
                      <span className="md:hidden">↓</span>
                      <span className="hidden md:inline">→</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
            {p.highlights.map((h) => (
              <div key={h} className="flex items-start gap-2.5 text-sm text-muted">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.29 6.8-6.79a1 1 0 0 1 1.4 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-3 py-1 text-xs font-medium text-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Business CTA */}
          <div className="mt-8 flex flex-col items-start gap-4 rounded-xl border border-accent/30 bg-accent/5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-foreground/85">{p.businessCta}</p>
            <a
              href="#contact"
              className="shrink-0 rounded-full accent-bar px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Ping me →
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
