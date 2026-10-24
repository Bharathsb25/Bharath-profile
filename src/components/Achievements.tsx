import { awards, languages } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";
import CertificateGallery from "@/components/CertificateGallery";

export default function Achievements() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading kicker="More" title="Awards & languages" />

      <div className="grid items-start gap-10 sm:grid-cols-2 sm:gap-14">
        <div>
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
            <h3 className="font-display text-sm font-bold tracking-tight text-foreground">
              Awards
            </h3>
            <span className="text-xs text-muted">Select to view full size</span>
          </div>
          <div className="mt-5">
            <CertificateGallery items={awards} />
          </div>
        </div>

        <div>
          <h3 className="border-b border-line pb-2 font-display text-sm font-bold tracking-tight text-foreground">
            Languages
          </h3>
          <ul className="text-sm">
            {languages.map((lang) => (
              <li
                key={lang}
                className="border-b border-line py-2.5 text-foreground/90"
              >
                {lang}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
