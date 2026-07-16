import Image from "next/image";
import { profile, highlights } from "@/data/profile";
import Reveal from "@/components/Reveal";
import DownloadCVButton from "@/components/DownloadCVButton";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="glow animate-floaty pointer-events-none absolute -right-24 -top-24 h-96 w-96 opacity-40" />
      <div className="glow pointer-events-none absolute -left-32 top-40 h-80 w-80 opacity-20" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-16 pt-16 md:grid-cols-[1.35fr_1fr] md:pt-24">
        {/* Text */}
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Open to Full-Time Roles
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                <span className="h-2 w-2 rounded-full accent-bar" />
                Available for Freelance
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              Bharath
              <br />
              <span className="text-gradient">Sathiskumar</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="font-display text-lg font-semibold text-foreground/80">
              {profile.title}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="max-w-xl text-base leading-7 text-muted">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#contact"
                className="rounded-full accent-bar px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-transform hover:-translate-y-0.5"
              >
                Hire / Work With Me
              </a>
              <DownloadCVButton />
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>

        {/* Photo */}
        <Reveal delay={160} className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="glow animate-floaty absolute -inset-6 opacity-60" />
            <div className="accent-bar absolute -inset-1 rounded-[1.75rem] opacity-70 blur-[2px]" />
            <div className="relative h-64 w-64 overflow-hidden rounded-[1.6rem] border border-white/20 shadow-2xl sm:h-72 sm:w-72">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                priority
                sizes="288px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Highlights strip */}
      <Reveal delay={120}>
        <div className="relative mx-auto max-w-6xl px-6 pb-16">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="card card-hover px-5 py-5 text-center"
              >
                <div className="font-display text-2xl font-bold text-gradient">
                  {item.value}
                </div>
                <div className="mt-1 text-xs font-medium text-muted">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
