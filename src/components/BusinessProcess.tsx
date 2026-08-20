"use client";

import { useCopy } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

/**
 * A step tracker, not a plain numbered list: a connecting rail runs behind
 * every node. Vertical on mobile (the rail runs down the left edge, matching
 * how a phone screen reads top-to-bottom); at lg+ it turns horizontal, since
 * there's enough width for four nodes in a row and a left-edge rail would
 * waste most of that width as empty margin.
 */
export default function BusinessProcess() {
  const { process } = useCopy();
  const { steps } = process;

  return (
    <section id="process" className="border-y border-line bg-card/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading index="04" kicker={process.kicker} title={process.title} />
        </Reveal>

        {/* Mobile / tablet: vertical rail down the left edge. */}
        <div className="relative max-w-3xl lg:hidden">
          <span
            className="absolute left-[15px] top-2 bottom-2 w-px bg-line"
            aria-hidden="true"
          />
          <ol className="space-y-7">
            {steps.map((step, i) => (
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

        {/* Desktop: horizontal rail, four nodes in a row. */}
        <ol className="relative hidden lg:grid lg:grid-cols-4 lg:gap-6">
          <span
            className="absolute left-0 right-0 top-5 h-px bg-line"
            aria-hidden="true"
          />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <li className="relative flex flex-col">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full accent-bar font-display text-sm font-bold text-on-accent">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {step.desc}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
