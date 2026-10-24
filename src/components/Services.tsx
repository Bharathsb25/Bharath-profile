import { services } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";

/**
 * A service catalogue, set as one. Eight ruled entries in two columns,
 * then the three routes a reader can take out of this page — each
 * stated as what they came for, not as a decorated card.
 */
export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading kicker="What I deliver" title="Services I offer" />

      <div className="grid gap-x-14 sm:grid-cols-2">
        {services.map((service) => (
          <article key={service.title} className="border-t border-line py-6">
            <h3 className="font-display text-base font-bold tracking-tight text-foreground">
              {service.title}
            </h3>
            <p className="mt-2 max-w-[56ch] text-[0.9375rem] leading-relaxed text-muted">
              {service.desc}
            </p>
          </article>
        ))}
      </div>

      {/* Three audiences: small business → /services, project → /freelance,
          hiring → stays on this page. The business route is the filled one,
          since it's the reader this page otherwise doesn't serve. */}
      <div className="mt-14 border-t-2 border-foreground pt-8">
        <h3 className="font-display text-sm font-bold tracking-tight text-foreground">
          Which one are you?
        </h3>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          <a
            href="/services"
            data-track-event="nav_click"
            data-track-label="For Business (services band)"
            className="accent-bar rounded-sm px-5 py-5 text-on-accent transition-colors hover:brightness-110"
          >
            <p className="font-display text-base font-bold tracking-tight">
              Running a shop, clinic, school or small firm
            </p>
            <p className="mt-1.5 text-sm opacity-90">
              Websites, automation and branding, from ₹500.
            </p>
          </a>

          <a
            href="/freelance"
            data-track-event="nav_click"
            data-track-label="Freelance (services band)"
            className="rounded-sm border border-line bg-card px-5 py-5 transition-colors hover:border-accent"
          >
            <p className="font-display text-base font-bold tracking-tight text-foreground">
              Mid-rollout and stuck
            </p>
            <p className="mt-1.5 text-sm text-muted">
              Freelance packages, process, and how I quote.
            </p>
          </a>

          <a
            href="#experience"
            className="rounded-sm border border-line bg-card px-5 py-5 transition-colors hover:border-accent"
          >
            <p className="font-display text-base font-bold tracking-tight text-foreground">
              Hiring for a full-time role
            </p>
            <p className="mt-1.5 text-sm text-muted">
              Experience, projects and education, below.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
