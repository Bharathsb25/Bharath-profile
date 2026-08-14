import { skillGroups, toolsAndTech } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

const icons = [
  // Project & Delivery — rocket / target
  "M12 2c3 1 5 4 5 8l-2 2-4 1-4-1-2-2c0-4 2-7 5-8Zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
  // Client & Stakeholder — users
  "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 19c0-3 3-5 6-5s6 2 6 5H2Zm12-4c3 0 6 2 6 4h-4c0-1.5-.8-3-2-4Z",
  // Analysis & Quality — check-shield
  "M12 2 4 5v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V5l-8-3Zm-1 12-3-3 1.4-1.4L11 11.2l3.6-3.6L16 9l-5 5Z",
  // Systems & Integration — plug / nodes
  "M5 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm14 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM12 21a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM6.5 6.5l4 9m3-9-4 9",
];

// Sparkle / AI glyph for the featured group
const aiIcon =
  "M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Zm6 9l.8 2.2 2.2.8-2.2.8L18 18l-.8-2.2-2.2-.8 2.2-.8L18 12ZM6 13l.7 1.9 1.9.7-1.9.7L6 18l-.7-1.8-1.9-.7 1.9-.7L6 13Z";

export default function Skills() {
  const featured = skillGroups.find((g) => g.featured);
  const rest = skillGroups.filter((g) => !g.featured);

  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            index="03"
            kicker="Capabilities"
            title="Skills & Expertise"
          />
        </Reveal>

        {/* Featured AI skill group */}
        {featured && (
          <Reveal>
            <TiltCard
              max={5}
              className="card mb-5 overflow-hidden p-7 sm:p-8"
            >
              {/* ambient accent glow */}
              <div className="glow pointer-events-none absolute -right-16 -top-16 h-56 w-56 opacity-30" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
                <div className="flex items-center gap-4 md:w-64 md:shrink-0 md:flex-col md:items-start">
                  <span className="tilt-raise flex h-14 w-14 items-center justify-center rounded-2xl accent-bar text-on-accent shadow-lg shadow-accent/30">
                    <svg
                      className="h-7 w-7"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={aiIcon} />
                    </svg>
                  </span>
                  <div>
                    <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent">
                      Core Focus
                    </span>
                    <h3 className="mt-2 font-display text-lg font-bold text-foreground">
                      {featured.title}
                    </h3>
                  </div>
                </div>

                <ul className="grid flex-1 gap-2.5 text-sm text-foreground/80 sm:grid-cols-2">
                  {featured.skills.map((skill) => (
                    <li key={skill} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full accent-bar" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {rest.map((group, i) => (
            <Reveal key={group.title} delay={i * 90}>
              <TiltCard className="card h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl accent-bar text-on-accent">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={icons[i % icons.length]} />
                    </svg>
                  </span>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {group.title}
                  </h3>
                </div>
                <ul className="mt-5 grid gap-2.5 text-sm text-muted">
                  {group.skills.map((skill) => (
                    <li key={skill} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full accent-bar" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Tools & Platforms
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {toolsAndTech.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-line bg-card px-4 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:border-accent hover:text-accent"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
