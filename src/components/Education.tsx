import { education, certifications, training } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";
import CertificateGallery from "@/components/CertificateGallery";

export default function Education() {
  return (
    <section id="education" className="border-y border-line bg-card py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Background"
          title="Education & certifications"
        />

        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h3 className="border-b-2 border-foreground pb-2 font-display text-sm font-bold tracking-tight text-foreground">
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.degree} className="border-b border-line py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h4 className="font-display text-base font-bold tracking-tight text-foreground">
                    {edu.degree}
                  </h4>
                  <span className="tnum text-sm text-muted">{edu.period}</span>
                </div>
                <p className="mt-0.5 text-[0.9375rem] text-muted">
                  {edu.school}
                </p>
                <p className="tnum mt-1 text-sm font-semibold text-accent">
                  {edu.detail}
                </p>
              </div>
            ))}

            <h3 className="mt-10 border-b-2 border-foreground pb-2 font-display text-sm font-bold tracking-tight text-foreground">
              {training.title}
            </h3>
            <ul className="text-[0.9375rem]">
              {training.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 border-b border-line py-2.5 leading-snug text-muted"
                >
                  <span
                    aria-hidden
                    className="mt-[0.6em] h-px w-3 shrink-0 bg-accent"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="border-b-2 border-foreground pb-2 font-display text-sm font-bold tracking-tight text-foreground">
              Certifications
            </h3>
            <ul>
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="flex items-baseline justify-between gap-5 border-b border-line py-4"
                >
                  <span className="text-[0.9375rem] leading-snug text-foreground/90">
                    {cert.name}
                    {cert.issuer && (
                      <span className="text-muted"> — {cert.issuer}</span>
                    )}
                    {cert.credentialId && (
                      <span className="tnum mt-1 block text-xs text-muted">
                        No. {cert.credentialId}
                      </span>
                    )}
                  </span>
                  <span className="tnum shrink-0 text-sm text-muted">
                    {cert.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certificate wall — select any tile to read the full certificate */}
        <div className="mt-14">
          <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-line pb-2">
            <h3 className="font-display text-sm font-bold tracking-tight text-foreground">
              Certificates
            </h3>
            <span className="text-xs text-muted">Select to view full size</span>
          </div>
          <CertificateGallery />
        </div>
      </div>
    </section>
  );
}
