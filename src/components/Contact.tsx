import { profile } from "@/data/profile";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import RevealPhoneButton from "@/components/RevealPhoneButton";
import DownloadCVButton from "@/components/DownloadCVButton";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line accent-bar px-6 py-12 sm:px-10 sm:py-14">
          <div className="glow pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-30" />
          <div className="glow pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 opacity-20" />

          <div className="relative grid items-start gap-10 md:grid-cols-2">
            {/* Left: pitch + direct actions */}
            <div className="text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Let&apos;s work together
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Open to full-time roles &amp; freelance projects
              </h2>
              <p className="mt-4 max-w-md text-white/85">
                Have a CRM rollout, implementation, or delivery challenge?
                Send me a message and I&apos;ll get back to you quickly.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  ✉ {profile.email}
                </a>
                <RevealPhoneButton />
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  in LinkedIn
                </a>
                <DownloadCVButton variant="light" />
              </div>
            </div>

            {/* Right: enquiry form */}
            <ContactForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
