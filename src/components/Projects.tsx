import { featuredProject as p } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

// One line-icon per workflow stage
const stepIcons = [
  "M9 12l2 2 4-4M7.5 3.5h6l5 5v10a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2z", // doc-check
  "M9 3.5h6a1 1 0 0 1 1 1v1H8v-1a1 1 0 0 1 1-1zM8 5.5H6a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5a2 2 0 0 0-2-2h-2M9 12h6M9 16h4", // clipboard-list
  "M13 2 4 14h7l-1 8 9-12h-7l1-8z", // zap
  "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.5 21a2 2 0 0 1-3 0", // bell
  "M5 13c0-5 4-9 9-11 1 6-1 10-5 12l-4-1zM5 13l-2 5 5-2M14 2c3 .5 5.5 3 6 6", // rocket
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading index="05" kicker="Featured Work" title="Projects" />
      </Reveal>

      <Reveal delay={80}>
        <div className="card relative overflow-hidden p-6 sm:p-8">
          {/* top accent bar */}
          <div className="accent-bar absolute inset-x-0 top-0 h-1" />
          <div className="glow pointer-events-none absolute -right-24 -top-24 h-64 w-64 opacity-20" />

          {/* Header */}
          <div className="relative flex flex-wrap items-center gap-2">
            <span className="rounded-full accent-bar px-3 py-1 text-xs font-semibold text-white">
              {p.type}
            </span>
            <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
              {p.role}
            </span>
          </div>

          <h3 className="relative mt-4 font-display text-xl font-bold text-foreground sm:text-2xl">
            {p.title}
          </h3>
          <p className="relative mt-3 max-w-3xl text-sm leading-7 text-muted">
            {p.summary}
          </p>

          {/* Flow chart */}
          <div className="relative mt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              How the workflow runs
            </p>
            <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
              {p.flow.map((step, i) => (
                <div
                  key={step.title}
                  className="flex flex-col md:flex-1 md:flex-row md:items-stretch"
                >
                  <div className="group relative flex-1 rounded-xl border border-line bg-background p-5 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-accent/10">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl accent-bar text-white">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={stepIcons[i % stepIcons.length]} />
                        </svg>
                      </span>
                      <span className="font-display text-2xl font-extrabold text-line">
                        {i + 1}
                      </span>
                    </div>
                    <h4 className="mt-4 font-display text-sm font-semibold text-foreground">
                      {step.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-5 text-muted">
                      {step.desc}
                    </p>
                  </div>
                  {i < p.flow.length - 1 && (
                    <div
                      className="flex items-center justify-center py-1 text-accent md:px-1.5 md:py-0"
                      aria-hidden="true"
                    >
                      <span className="text-lg md:hidden">↓</span>
                      <span className="hidden text-lg md:inline">→</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="relative mt-8 grid gap-2.5 sm:grid-cols-2">
            {p.highlights.map((h) => (
              <div
                key={h}
                className="flex items-start gap-2.5 text-sm text-muted"
              >
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
          <div className="relative mt-6 flex flex-wrap gap-2">
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
          <div className="accent-bar relative mt-8 overflow-hidden rounded-2xl p-6 text-white sm:p-8">
            <div className="glow pointer-events-none absolute -right-10 -top-10 h-44 w-44 opacity-30" />
            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="font-display text-lg font-bold sm:text-xl">
                  {p.businessCta.title}
                </h4>
                <p className="mt-1.5 max-w-xl text-sm leading-6 text-white/90">
                  {p.businessCta.text}
                </p>
              </div>
              <a
                href="#contact"
                className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-700 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                {p.businessCta.button}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
