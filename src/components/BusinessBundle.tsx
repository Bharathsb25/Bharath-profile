"use client";

import { useCopy } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

/**
 * The launch bundle — logo + packaging + website sold as one job.
 * Sits above the website tiers because it's the entry point for a business
 * that doesn't have anything yet. Accent-framed so it reads as the featured
 * offer rather than a fourth category.
 */
export default function BusinessBundle() {
  const { bundle } = useCopy();

  return (
    <section id="bundle" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading index="01" kicker={bundle.kicker} title={bundle.headline} />
      </Reveal>

      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-accent/40 bg-card p-6 sm:p-8">
          <div className="glow pointer-events-none absolute -right-20 -top-20 h-56 w-56 opacity-20" />

          <div className="relative">
            <p className="max-w-2xl text-sm leading-7 text-muted">
              {bundle.intro}
            </p>

            {/* The three pieces — a quiet, tonal icon treatment (not a solid
                accent fill) so three cards don't compete for attention with
                each other or with the CTA below. Identical card shape for
                all three keeps the hierarchy to headings + icon only. */}
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {bundle.items.map((item, i) => (
                <li key={item.title}>
                  <div className="card h-full p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d={item.icon} />
                        </svg>
                      </span>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {item.desc}
                    </p>
                  </div>
                  {/* Reading order cue: these three add up to one brand. */}
                  {i < bundle.items.length - 1 && (
                    <span
                      className="mx-auto mt-3 hidden h-5 w-5 items-center justify-center text-lg font-bold text-muted sm:flex lg:hidden"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {/* Price stays neutral on purpose — the CTA below is the only
                accent-filled element in this section, so it's unmissable. */}
            <div className="mt-8 border-t border-line pt-6">
              <p className="font-display text-lg font-bold text-foreground">
                {bundle.price}
              </p>
              <p className="mt-1.5 max-w-md text-xs leading-5 text-muted">
                {bundle.priceNote}
              </p>

              <a
                href="#start"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full accent-bar px-8 py-4 text-base font-bold text-on-accent shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5 sm:w-auto"
              >
                {bundle.cta}
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <p className="mt-5 text-xs leading-5 text-muted">{bundle.note}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
