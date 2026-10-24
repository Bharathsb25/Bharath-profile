import { skillGroups, toolsAndTech } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";

/**
 * Capabilities as a ruled schedule. The AI group is the one Bharath
 * leads with, so it gets the full measure and a stamp; the rest sit in
 * two ruled columns. No icons — a glyph per group here would be
 * decoration standing in for information.
 */
export default function Skills() {
  const featured = skillGroups.find((g) => g.featured);
  const rest = skillGroups.filter((g) => !g.featured);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading kicker="Capabilities" title="Skills & expertise" />

      {featured && (
        <div className="mb-10 border-y-2 border-foreground py-6">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h3 className="font-display text-xl font-extrabold tracking-[-0.02em] text-foreground">
              {featured.title}
            </h3>
            <span className="stamp">Core focus</span>
          </div>
          <ul className="mt-5 grid gap-x-10 gap-y-2.5 text-[0.9375rem] leading-snug text-foreground/90 sm:grid-cols-2">
            {featured.skills.map((skill) => (
              <li key={skill} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-[0.6em] h-px w-3 shrink-0 bg-accent"
                />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-x-12 sm:grid-cols-2">
        {rest.map((group) => (
          <div key={group.title} className="border-t border-line py-6">
            <h3 className="font-display text-base font-bold tracking-tight text-foreground">
              {group.title}
            </h3>
            <ul className="mt-3.5 grid gap-2 text-[0.9375rem] leading-snug text-muted">
              {group.skills.map((skill) => (
                <li key={skill} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.6em] h-px w-3 shrink-0 bg-accent"
                  />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-line pt-6">
        <h3 className="font-display text-sm font-bold tracking-tight text-foreground">
          Tools &amp; platforms
        </h3>
        <ul className="mt-4 flex flex-wrap gap-x-2.5 gap-y-2.5">
          {toolsAndTech.map((tool) => (
            <li
              key={tool}
              className="rounded-sm border border-line bg-card px-3 py-1.5 text-sm text-foreground/85"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
