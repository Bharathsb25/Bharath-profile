import { awards, languages } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CertificateGallery from "@/components/CertificateGallery";

export default function Achievements() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <SectionHeading
          index="08"
          kicker="More"
          title="Awards & Languages"
        />
      </Reveal>

      <div className="grid items-start gap-6 sm:grid-cols-2">
        <Reveal>
          <div>
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-sm font-semibold text-foreground">
                Awards
              </h3>
              <span className="text-xs text-muted">Click to view full size</span>
            </div>
            <CertificateGallery items={awards} />
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div>
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-sm font-semibold text-foreground">
                Languages
              </h3>
              <span className="text-xs text-transparent select-none" aria-hidden="true">
                Click to view full size
              </span>
            </div>
            <div className="card inline-flex w-fit max-w-full flex-wrap gap-2 p-6">
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
      </div>
    </section>
  );
}
