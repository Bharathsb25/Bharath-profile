import { experience } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";

/**
 * Career history as dated record entries. The left rail carries the
 * period — real information, which is what earns a rail — and the
 * current role is the only one stamped.
 */
export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading kicker="Career" title="Professional experience" />

      <div>
        {experience.map((job) => {
          const current = /current|present/i.test(job.period);

          return (
            <article
              key={`${job.company}-${job.period}`}
              className="grid gap-y-3 border-t border-line py-7 first:border-t-0 first:pt-0 md:grid-cols-[11rem_1fr] md:gap-x-10"
            >
              <div className="md:pt-0.5">
                <p className="tnum text-sm font-semibold text-foreground">
                  {job.period}
                </p>
                {current && (
                  <span className="stamp mt-2">Current</span>
                )}
              </div>

              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                  {job.role}
                </h3>
                <p className="mt-0.5 font-display text-sm font-semibold text-accent">
                  {job.company}
                </p>
                <ul className="mt-4 grid max-w-[68ch] gap-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  {job.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-[0.6em] h-px w-3 shrink-0 bg-accent"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
