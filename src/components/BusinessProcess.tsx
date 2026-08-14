import { businessServices } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function BusinessProcess() {
  return (
    <section id="process" className="border-y border-line bg-card/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            index="04"
            kicker="How it works"
            title="Four steps, no surprises"
          />
        </Reveal>

        <div className="relative max-w-3xl">
          <span
            className="absolute left-[15px] top-2 bottom-2 w-px bg-line"
            aria-hidden="true"
          />
          <ol className="space-y-7">
            {businessServices.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <li className="relative flex gap-5">
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full accent-bar font-display text-xs font-bold text-on-accent">
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
      </div>
    </section>
  );
}
