import { awards, languages, publications } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Achievements() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading
          index="05"
          kicker="More"
          title="Awards, Languages & Publications"
        />
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        <Reveal>
          <div className="card h-full p-6">
            <h3 className="font-display text-sm font-semibold text-foreground">
              Awards
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {awards.map((award) => (
                <li key={award} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full accent-bar" />
                  <span>{award}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="card h-full p-6">
            <h3 className="font-display text-sm font-semibold text-foreground">
              Languages
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-line px-3 py-1 text-xs font-medium text-foreground/80"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="card h-full p-6">
            <h3 className="font-display text-sm font-semibold text-foreground">
              Publications
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {publications.map((pub) => (
                <li key={pub.url}>
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-2 text-muted transition-colors hover:text-accent"
                  >
                    <span className="mt-0.5 text-accent">↗</span>
                    <span className="group-hover:underline">{pub.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
