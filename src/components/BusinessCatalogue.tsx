"use client";

import { useCopy } from "@/components/LanguageProvider";
import type { BusinessCategory } from "@/data/businessCopy";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

/**
 * Tailwind v4 scans source text, so `lg:grid-cols-${n}` would compile fine and
 * emit no CSS. The column count has to resolve to a literal class string.
 */
const gridFor: Record<3 | 4, string> = {
  3: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
};

function CategoryBlock({ category }: { category: BusinessCategory }) {
  return (
    <div
      id={category.id}
      className="mt-14 border-t border-line pt-12 first:mt-0 first:border-0 first:pt-0"
    >
      <Reveal>
        <div className="mb-7 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-bold text-accent">
              {category.letter}
            </span>
            <span className="h-px w-6 accent-bar" />
            <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
              {category.title}
            </h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted">{category.intro}</p>
        </div>
      </Reveal>

      <div className={gridFor[category.cols]}>
        {category.items.map((item, i) => (
          <Reveal key={item.title} delay={(i % category.cols) * 90}>
            {/* Pure-CSS hover rather than TiltCard — up to 21 cards of pointer
                handlers is a lot of JS for the phones this page targets. */}
            <div className="card card-hover flex h-full flex-col p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl accent-bar text-on-accent">
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

              {/* Outcome-first: this is the headline. The old plain service
                  name becomes a small subline underneath, not the title. */}
              <h4 className="mt-4 font-display text-base font-semibold leading-snug text-foreground">
                {item.outcome}
              </h4>

              <p className="mt-1.5 text-xs font-medium leading-5 text-muted">
                {item.title}
              </p>

              {item.tagline && (
                <p className="mt-2 text-xs font-semibold text-accent">
                  {item.tagline}
                </p>
              )}

              {item.href && (
                <a
                  href={item.href}
                  className="mt-3 text-sm font-semibold text-accent transition-colors hover:underline"
                >
                  {item.linkLabel ?? "Learn more"} →
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function BusinessCatalogue() {
  const { catalogue, categories } = useCopy();

  return (
    <section id="catalogue" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading index="03" kicker={catalogue.kicker} title={catalogue.title} />
      </Reveal>

      <Reveal>
        <p className="-mt-4 mb-10 max-w-2xl text-sm leading-7 text-muted">
          {catalogue.intro}
        </p>
      </Reveal>

      {categories.map((category) => (
        <CategoryBlock key={category.id} category={category} />
      ))}

      <Reveal delay={120}>
        <div className="mt-12 rounded-2xl border border-line bg-card p-6 text-center">
          <p className="font-display text-base font-bold text-foreground">
            {catalogue.helpTitle}
          </p>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">
            {catalogue.helpText}
          </p>
          <a
            href="#start"
            className="mt-5 inline-block rounded-full accent-bar px-6 py-3 text-sm font-semibold text-on-accent shadow-sm transition-transform hover:-translate-y-0.5"
          >
            {catalogue.helpCta}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
