"use client";

import { useCopy } from "@/components/LanguageProvider";

/**
 * Hero for /services. Audience is small & local business, so the copy stays
 * plain — no job title, no "SaaS"/"enterprise". The fact tiles deliberately
 * carry NO price: numbers here would need to be real and verified, and none
 * exist yet (see businessCopy.ts hero.facts — qualitative on purpose).
 */
export default function BusinessHero() {
  const { hero } = useCopy();

  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="glow pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 opacity-20 animate-floaty" />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pt-20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-line bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {hero.kicker}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs font-medium text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.availabilityBadge}
          </span>
        </div>

        <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
          {hero.headline} <span className="text-gradient">{hero.headlineAccent}</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
          {hero.subhead}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#start"
            className="rounded-full accent-bar px-6 py-3 text-sm font-semibold text-on-accent shadow-sm transition-transform hover:-translate-y-0.5"
          >
            {hero.primaryCta} →
          </a>
          <a
            href="#websites"
            className="rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-accent"
          >
            {hero.pricingCta}
          </a>
          <span className="text-xs font-medium text-muted">
            {hero.responseTime}
          </span>
        </div>

        <p className="mt-6 max-w-xl border-l-2 border-accent pl-4 text-sm leading-6 text-muted">
          {hero.availability}
        </p>

        {/* Who this is for */}
        <ul className="mt-8 flex flex-wrap gap-2">
          {hero.audience.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-muted"
            >
              {item}
            </li>
          ))}
        </ul>

        <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hero.facts.map((fact) => (
            <div key={fact.label} className="card p-5">
              <dt className="font-display text-xl font-bold text-gradient">
                {fact.value}
              </dt>
              <dd className="mt-1 text-xs leading-5 text-muted">
                {fact.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
