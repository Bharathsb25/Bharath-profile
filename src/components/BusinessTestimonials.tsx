"use client";

import { useCopy } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

/**
 * Placeholder social proof — every quote/name/role is bracketed TODO text
 * from businessCopy.ts, not real client feedback. The banner above the
 * cards is deliberately impossible to miss so this never gets mistaken for
 * finished copy. Swap in real testimonials in businessCopy.ts (both `en`
 * and `ta`) before treating this section as done — see testimonials.todoNote.
 */
export default function BusinessTestimonials() {
  const { testimonials } = useCopy();

  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading
          index="05"
          kicker={testimonials.kicker}
          title={testimonials.title}
        />
      </Reveal>

      <Reveal>
        <p className="-mt-4 mb-6 max-w-2xl text-sm leading-7 text-muted">
          {testimonials.intro}
        </p>
      </Reveal>

      <Reveal>
        <div className="mb-8 rounded-xl border border-highlight/40 bg-highlight/10 px-4 py-3">
          <p className="text-xs font-semibold text-highlight">
            {testimonials.todoNote}
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.items.map((item, i) => (
          <Reveal key={i} delay={i * 90}>
            <div className="card flex h-full flex-col p-6">
              <svg
                className="h-6 w-6 text-accent/40"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7.5 6C4.5 6 2 8.5 2 11.5c0 3 2.2 5 5 5 .3 2.2-1 3.7-3 4.5v2c4-1 6.5-4 6.5-8.5V11.5C10.5 8.5 10 6 7.5 6Zm10 0c-3 0-5.5 2.5-5.5 5.5 0 3 2.2 5 5 5 .3 2.2-1 3.7-3 4.5v2c4-1 6.5-4 6.5-8.5V11.5c0-3-.5-5.5-3-5.5Z" />
              </svg>
              <p className="mt-3 flex-1 text-sm italic leading-6 text-muted">
                {item.quote}
              </p>
              <div className="mt-4 border-t border-line pt-3">
                <p className="text-sm font-semibold text-foreground">
                  {item.name}
                </p>
                <p className="text-xs text-muted">{item.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
