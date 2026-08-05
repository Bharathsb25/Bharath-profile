import Link from "next/link";
import { freelance } from "@/data/profile";

export default function FreelanceHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="glow pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 opacity-20 animate-floaty" />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pt-20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-line bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {freelance.kicker}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs font-medium text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for projects
          </span>
          <Link
            href="/#ai"
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
            </svg>
            AI Tools Certified
          </Link>
        </div>

        <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
          Your rollout is stuck.{" "}
          <span className="text-gradient">I get it live.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
          {freelance.subhead}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#start"
            className="rounded-full accent-bar px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Start a project →
          </a>
          <a
            href="#packages"
            className="rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-accent"
          >
            See what I build
          </a>
          <span className="text-xs font-medium text-muted">
            {freelance.responseTime}
          </span>
        </div>

        <p className="mt-6 max-w-xl border-l-2 border-accent pl-4 text-sm leading-6 text-muted">
          {freelance.availability}
        </p>

        <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {freelance.facts.map((fact) => (
            <div key={fact.label} className="card p-5">
              <dt className="font-display text-xl font-bold text-gradient">
                {fact.value}
              </dt>
              <dd className="mt-1 text-xs leading-5 text-muted">
                {fact.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
