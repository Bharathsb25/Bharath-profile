import { skillGroups, toolsAndTech } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

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

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-y border-line bg-card/40 py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            index="02"
            kicker="Capabilities"
            title="Skills & Expertise"
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 90}>
              <div className="card card-hover h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl accent-bar text-white">
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
              </div>
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
