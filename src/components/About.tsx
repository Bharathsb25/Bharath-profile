import { profile } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading index="01" kicker="Who I Am" title="About Me" />
      </Reveal>
      <div className="grid gap-8 md:grid-cols-[1.6fr_1fr]">
        <Reveal delay={80}>
          <p className="text-lg leading-8 text-muted">{profile.summary}</p>
        </Reveal>
        <Reveal delay={160}>
          <div className="card p-6">
            <h3 className="font-display text-sm font-semibold text-foreground">
              What I bring
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {[
                "End-to-end CRM & SaaS implementation",
                "Functional & regression testing",
                "Client onboarding & stakeholder management",
                "API integrations & workflow optimization",
                "AI-assisted delivery using tools like Claude",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.29 6.8-6.79a1 1 0 0 1 1.4 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
