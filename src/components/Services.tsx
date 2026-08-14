import { services } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

// One line-icon per service, in display order
const serviceIcons = [
  "M2 9l10-5 10 5-10 5L2 9Zm4 3.2V16c0 1.2 2.7 2.6 6 2.6s6-1.4 6-2.6v-3.8", // graduation cap — Education CRM
  "M6 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm12 11a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM8.5 6.5H14a3.5 3.5 0 0 1 3.5 3.5v5", // process route — Onboarding Design
  "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM5.6 5.6l3.2 3.2m6.4 6.4 3.2 3.2m0-12.8-3.2 3.2M8.8 15.2l-3.2 3.2", // lifebuoy — Rescue
  "M8 3v3M16 3v3M4 8.5h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm4.5 9 2 2 3.5-3.5", // calendar-check — Fractional
  "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm8.5 4a8.5 8.5 0 0 1-.1 1.2l2 1.6-2 3.4-2.4-1a8.6 8.6 0 0 1-2 1.2l-.4 2.6h-4l-.4-2.6a8.6 8.6 0 0 1-2-1.2l-2.4 1-2-3.4 2-1.6a8.5 8.5 0 0 1 0-2.4l-2-1.6 2-3.4 2.4 1a8.6 8.6 0 0 1 2-1.2L10 3h4l.4 2.6a8.6 8.6 0 0 1 2 1.2l2.4-1 2 3.4-2 1.6c.1.4.1.8.1 1.2z", // gear — Automation
  "M12 2 4 5v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V5l-8-3Zm-1 12-3-3 1.4-1.4L11 11.2l3.6-3.6L16 9l-5 5Z", // shield-check — Testing
  "M4 20V10m5.5 10V4m5.5 16v-7M20.5 20V8M2 20h20", // bar chart — Dashboards
  "M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1zm4 5h8M8 13h5", // message — Compliance
];

export default function Services() {
  return (
    <section
      id="services"
      className="border-y border-line bg-card/40 py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            index="02"
            kicker="What I Deliver"
            title="Services I Offer"
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 90}>
              <TiltCard className="card h-full p-6">
                <span className="tilt-raise flex h-11 w-11 items-center justify-center rounded-xl accent-bar text-on-accent">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={serviceIcons[i % serviceIcons.length]} />
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {service.desc}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Three audiences: small business → /services, project → /freelance,
            hiring → stay on this page. The gradient card is the small-business
            route, since that's the one the rest of this page doesn't serve. */}
        <Reveal delay={120}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/services"
              className="group flex items-center justify-between rounded-2xl accent-bar p-6 text-on-accent transition-transform hover:-translate-y-1"
            >
              <div>
                <p className="font-display text-base font-bold">
                  Running a shop, clinic, school or small firm?
                </p>
                <p className="mt-1 text-sm text-on-accent">
                  Websites, automation and branding — from ₹500.
                </p>
              </div>
              <span className="ml-4 shrink-0 text-xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="/freelance"
              className="group flex items-center justify-between rounded-2xl border border-line bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent"
            >
              <div>
                <p className="font-display text-base font-bold text-foreground">
                  Mid-rollout and stuck?
                </p>
                <p className="mt-1 text-sm text-muted">
                  Freelance packages, process and how I quote.
                </p>
              </div>
              <span className="ml-4 shrink-0 text-xl text-accent transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#experience"
              className="group flex items-center justify-between rounded-2xl border border-line bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent"
            >
              <div>
                <p className="font-display text-base font-bold text-foreground">
                  Hiring for a full-time role?
                </p>
                <p className="mt-1 text-sm text-muted">
                  See my experience, projects, and education below.
                </p>
              </div>
              <span className="ml-4 shrink-0 text-xl text-accent transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
