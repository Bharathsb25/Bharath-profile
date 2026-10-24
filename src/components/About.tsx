import { profile } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";

const brings = [
  "End-to-end CRM & SaaS implementation",
  "Functional & regression testing",
  "Client onboarding & stakeholder management",
  "API integrations & workflow optimization",
  "AI-assisted delivery — certified in AI tools, applied daily",
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading kicker="Who I am" title="About me" />

      <div className="grid gap-10 md:grid-cols-[1.7fr_1fr] md:gap-14">
        <p className="max-w-[62ch] text-lg leading-relaxed text-foreground/90">
          {profile.summary}
        </p>

        {/* A ruled list, the way a scope sheet lists what is covered. */}
        <div>
          <h3 className="border-b border-line pb-2 font-display text-sm font-bold tracking-tight text-foreground">
            What I bring
          </h3>
          <ul className="text-sm">
            {brings.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-b border-line py-3 leading-snug text-muted"
              >
                <span aria-hidden className="pt-0.5 font-display text-accent">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
