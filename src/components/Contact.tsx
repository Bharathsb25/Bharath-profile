import { profile } from "@/data/profile";
import Reveal from "@/components/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line accent-bar px-6 py-16 text-center text-white sm:px-12">
          <div className="glow pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-30" />
          <div className="glow pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 opacity-20" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Let&apos;s work together
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Open to full-time roles & freelance projects
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              Have a CRM rollout, implementation, or delivery challenge? Let&apos;s
              talk about how I can help your team ship it smoothly and on time.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                ✉ {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                ☎ {profile.phone}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                in LinkedIn
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
