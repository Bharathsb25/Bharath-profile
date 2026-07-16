import { experience } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading
          index="04"
          kicker="Career"
          title="Professional Experience"
        />
      </Reveal>

      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-[9px]" />

        <div className="space-y-8">
          {experience.map((job, i) => (
            <Reveal key={`${job.company}-${job.period}`} delay={i * 70}>
              <div className="relative pl-10 md:pl-12">
                {/* dot */}
                <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center md:h-5 md:w-5">
                  <span className="h-4 w-4 rounded-full accent-bar ring-4 ring-background md:h-5 md:w-5" />
                </span>

                <div className="card card-hover p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {job.role}
                    </h3>
                    <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm font-semibold text-accent">
                    {job.company}
                  </p>
                  <ul className="mt-4 grid gap-2.5 text-sm leading-6 text-muted">
                    {job.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full accent-bar" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
