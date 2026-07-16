import { services } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

// One line-icon per service, in display order
const serviceIcons = [
  "M5 13c0-5 4-9 9-11 1 6-1 10-5 12l-4-1zM5 13l-2 5 5-2M14 2c3 .5 5.5 3 6 6", // rocket
  "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm8.5 4a8.5 8.5 0 0 1-.1 1.2l2 1.6-2 3.4-2.4-1a8.6 8.6 0 0 1-2 1.2l-.4 2.6h-4l-.4-2.6a8.6 8.6 0 0 1-2-1.2l-2.4 1-2-3.4 2-1.6a8.5 8.5 0 0 1 0-2.4l-2-1.6 2-3.4 2.4 1a8.6 8.6 0 0 1 2-1.2L10 3h4l.4 2.6a8.6 8.6 0 0 1 2 1.2l2.4-1 2 3.4-2 1.6c.1.4.1.8.1 1.2z", // gear
  "M12 2 4 5v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V5l-8-3Zm-1 12-3-3 1.4-1.4L11 11.2l3.6-3.6L16 9l-5 5Z", // shield-check
  "M4 20V10m5.5 10V4m5.5 16v-7M20.5 20V8M2 20h20", // bar chart
  "M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1zm4 5h8M8 13h5", // message
  "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-9 10h18M12 2c2.5 2.5 4 6 4 10s-1.5 7.5-4 10c-2.5-2.5-4-6-4-10s1.5-7.5 4-10z", // globe
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
            kicker="For Businesses"
            title="Services I Offer"
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 90}>
              <div className="card card-hover h-full p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl accent-bar text-white">
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
              </div>
            </Reveal>
          ))}
        </div>

        {/* Dual-audience CTA */}
        <Reveal delay={120}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <a
              href="#contact"
              className="group flex items-center justify-between rounded-2xl accent-bar p-6 text-white transition-transform hover:-translate-y-1"
            >
              <div>
                <p className="font-display text-base font-bold">
                  Business owner with a project in mind?
                </p>
                <p className="mt-1 text-sm text-white/85">
                  Tell me what's slowing you down — I'll propose a fix.
                </p>
              </div>
              <span className="ml-4 shrink-0 text-xl transition-transform group-hover:translate-x-1">
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
