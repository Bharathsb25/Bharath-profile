import { education, certifications, training } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Education() {
  return (
    <section
      id="education"
      className="border-y border-line bg-card/40 py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            index="06"
            kicker="Background"
            title="Education & Certifications"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-6">
              <h3 className="font-display text-sm font-semibold text-foreground">
                Education
              </h3>
              <div className="mt-5 space-y-5">
                {education.map((edu) => (
                  <div key={edu.degree}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h4 className="text-sm font-semibold text-foreground">
                        {edu.degree}
                      </h4>
                      <span className="text-xs font-medium text-muted">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{edu.school}</p>
                    <p className="mt-0.5 text-xs font-medium text-accent">
                      {edu.detail}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="mt-8 font-display text-sm font-semibold text-foreground">
                {training.title}
              </h3>
              <ul className="mt-4 grid gap-2 text-sm text-muted">
                {training.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full accent-bar" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card h-full p-6">
              <h3 className="font-display text-sm font-semibold text-foreground">
                Certifications
              </h3>
              <ul className="mt-5 space-y-4">
                {certifications.map((cert) => (
                  <li
                    key={cert.name}
                    className="flex items-baseline justify-between gap-4 border-b border-line pb-4 last:border-0"
                  >
                    <span className="text-sm text-foreground/85">
                      {cert.name}
                    </span>
                    <span className="shrink-0 text-xs font-medium text-muted">
                      {cert.date}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
