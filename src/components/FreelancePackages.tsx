import { freelance } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

export default function FreelancePackages() {
  return (
    <section
      id="packages"
      className="border-y border-line bg-card/40 py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            index="01"
            kicker="Engagements"
            title="Four ways to work with me"
          />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {freelance.packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={(i % 2) * 90}>
              <TiltCard
                className={`card h-full p-6 ${
                  pkg.featured ? "border-accent/60" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {pkg.name}
                  </h3>
                  {pkg.featured && (
                    <span className="tilt-raise shrink-0 rounded-full bg-highlight px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-on-accent">
                      Most asked for
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm leading-6 text-muted">
                  <span className="font-medium text-foreground">Best for:</span>{" "}
                  {pkg.ideal}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md border border-line bg-background px-2.5 py-1 text-xs font-medium text-muted">
                    ⏱ {pkg.timeline}
                  </span>
                  <span className="rounded-md border border-line bg-background px-2.5 py-1 text-xs font-medium text-accent">
                    {pkg.price}
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-6 text-muted">
                      <svg
                        className="mt-1.5 h-3.5 w-3.5 shrink-0 text-accent"
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
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#start"
                  className="mt-6 inline-block text-sm font-semibold text-accent hover:underline"
                >
                  Enquire about this →
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Smaller pieces of work, priced per task */}
        <Reveal delay={120}>
          <div className="card mt-6 p-6">
            <h3 className="font-display text-base font-semibold text-foreground">
              Also available as standalone pieces
            </h3>
            <p className="mt-1.5 text-sm text-muted">
              Smaller, well-defined jobs I can take on their own or bolt onto
              any engagement above.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {freelance.addOns.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-background px-3 py-1.5 text-xs font-medium text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
