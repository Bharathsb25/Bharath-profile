import { freelance } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function FreelanceProcess() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading
          index="02"
          kicker="How it works"
          title="From first call to go-live"
        />
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        {/* Numbered timeline */}
        <div className="relative">
          <span
            className="absolute left-[15px] top-2 bottom-2 w-px bg-line"
            aria-hidden="true"
          />
          <ol className="space-y-7">
            {freelance.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <li className="relative flex gap-5">
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full accent-bar font-display text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted">
                      {step.desc}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* How I work — trust points */}
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              What you can count on
            </p>
          </Reveal>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {freelance.principles.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="card card-hover p-5">
                  <h3 className="font-display text-sm font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
