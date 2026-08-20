"use client";

import { useCopy } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

/**
 * The three website tiers — doubles as the site's pricing table (brief
 * section 4). A separate, near-identical Basic/Standard/Premium table
 * right below this one would just be the same information twice; the
 * `guarantee` line below does the job a standalone pricing block would.
 *
 * The price block is structurally identical on all three cards (amount →
 * priceNote → timeline chip) so "Scoped, then quoted" lands in the same slot,
 * font and weight as "From ₹500". A quoted tier carries MORE explanation than
 * the priced one, which is what stops it reading as an omission.
 */
export default function BusinessWebsites() {
  const { websites } = useCopy();

  return (
    <section id="websites" className="border-y border-line bg-card/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading index="02" kicker={websites.kicker} title={websites.title} />
        </Reveal>

        <Reveal>
          <p className="-mt-4 mb-8 max-w-2xl text-sm leading-7 text-muted">
            {websites.intro}
          </p>
        </Reveal>

        {/* Three tiers: stack, then straight to 3-up. A 2-col breakpoint
            would orphan the third card. */}
        <div className="grid gap-5 lg:grid-cols-3">
          {websites.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 90}>
              <TiltCard
                className={`card h-full p-6 ${tier.featured ? "border-accent/60" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {tier.name}
                  </h3>
                  {tier.featured && (
                    <span className="tilt-raise shrink-0 rounded-full bg-highlight px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-on-accent">
                      Most chosen
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm leading-6 text-muted">
                  <span className="font-semibold text-foreground">Best for: </span>
                  {tier.ideal}
                </p>

                {/* Fixed price block — identical structure on every tier. */}
                <div className="mt-5 border-t border-line pt-5">
                  <p className="font-display text-xl font-bold text-gradient">
                    {tier.price}
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-muted">
                    {tier.priceNote}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-block rounded-md border border-line bg-background px-2.5 py-1 text-xs font-medium text-muted">
                      ⏱ {tier.timeline}
                    </span>
                    <span className="inline-block rounded-md border border-line bg-background px-2.5 py-1 text-xs font-medium text-muted">
                      {tier.pages}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    {tier.revisions}
                  </p>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-muted">
                      <svg
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-accent"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="leading-6">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#start"
                  className="mt-6 inline-block text-sm font-semibold text-accent transition-colors hover:underline"
                >
                  {websites.tierCta}
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={110}>
          <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/5 p-5 text-center">
            <p className="text-sm font-semibold text-foreground">
              {websites.guarantee}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="card mt-4 p-6">
            <p className="text-sm leading-7 text-muted">{websites.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
