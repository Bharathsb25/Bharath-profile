import { businessServices } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

/**
 * The three website tiers — the only priced offering on the site.
 *
 * The price block is structurally identical on all three cards (amount →
 * priceNote → timeline chip) so "Scoped, then quoted" lands in the same slot,
 * font and weight as "From ₹500". A quoted tier carries MORE explanation than
 * the priced one, which is what stops it reading as an omission.
 */
export default function BusinessWebsites() {
  return (
    <section id="websites" className="border-y border-line bg-card/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            index="02"
            kicker={businessServices.websites.kicker}
            title={businessServices.websites.title}
          />
        </Reveal>

        <Reveal>
          <p className="-mt-4 mb-8 max-w-2xl text-sm leading-7 text-muted">
            {businessServices.websites.intro}
          </p>
        </Reveal>

        {/* Three tiers: stack, then straight to 3-up. A 2-col breakpoint
            would orphan the third card. */}
        <div className="grid gap-5 lg:grid-cols-3">
          {businessServices.websites.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 90}>
              <TiltCard
                className={`card h-full p-6 ${
                  tier.featured ? "border-accent/60" : ""
                }`}
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
                  <span className="font-semibold text-foreground">
                    Best for:{" "}
                  </span>
                  {tier.ideal}
                </p>

                {/* Fixed 3-row price block — identical structure on every tier. */}
                <div className="mt-5 border-t border-line pt-5">
                  <p className="font-display text-xl font-bold text-gradient">
                    {tier.price}
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-muted">
                    {tier.priceNote}
                  </p>
                  <span className="mt-3 inline-block rounded-md border border-line bg-background px-2.5 py-1 text-xs font-medium text-muted">
                    ⏱ {tier.timeline}
                  </span>
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
                  Ask about the {tier.name} plan →
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="card mt-6 p-6">
            <p className="text-sm leading-7 text-muted">
              {businessServices.websites.note}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
