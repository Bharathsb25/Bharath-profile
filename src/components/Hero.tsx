import Image from "next/image";
import { profile, highlights, featuredProject } from "@/data/profile";

/**
 * The hero reads as the first page of a delivery record: a ruled header
 * line stating who and where, the claim, and then the page's one piece
 * of motion — a go-live rail that draws once, on load, through the five
 * real stages of the onboarding automation in `featuredProject.flow`.
 *
 * The rail is content, not decoration: those are the actual stages, in
 * order, which is why marks and a sequence are justified here and
 * nowhere else on the page.
 */
/**
 * Short glosses for the rail. The full descriptions live in
 * `featuredProject.flow` and are shown in the project section — at rail
 * width they would set as five dense paragraphs, so each stage gets a
 * faithful one-line compression instead.
 */
const glosses = [
  "Tenant setup, invoicing and a secure intake email fire on their own.",
  "A wizard showing only the modules bought, with locks and versioning.",
  "A finished section flips the internal task live and routes its owner.",
  "A three-level SLA ladder fires before the client notices a slip.",
  "Single-shot or phased, each phase tracked as its own milestone.",
];

export default function Hero() {
  const stages = featuredProject.flow;
  const last = stages.length - 1;

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Record header — what and where. The name sits in the h1 below,
            and in the masthead above; a third copy here would just be
            repetition. Stacked on small screens so no separator dangles
            at the end of a wrapped line. */}
        <div className="flex flex-col items-start gap-y-0.5 border-b border-line pb-3 pt-10 text-sm text-muted sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
          <span>{profile.title}</span>
          <span aria-hidden className="hidden text-line sm:inline">
            /
          </span>
          <span>Chennai, India</span>
        </div>

        <div className="grid gap-12 pt-10 md:grid-cols-[1.5fr_1fr] md:gap-14 md:pt-14">
          <div>
            <h1 className="text-foreground">
              <span className="block font-display text-sm font-bold tracking-tight">
                {profile.name}
              </span>
              <span className="mt-3 block font-display text-[2.75rem] font-extrabold leading-[0.95] tracking-[-0.035em] sm:text-[4.25rem]">
                I get stalled
                <br />
                rollouts live.
              </span>
            </h1>

            <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-muted">
              {profile.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                data-track-event="cta_click"
                data-track-label="Hire / Work With Me (hero)"
                className="accent-bar rounded-sm px-6 py-3 font-display text-sm font-bold tracking-tight text-on-accent transition-colors hover:brightness-110"
              >
                Hire / work with me
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-track-event="social_click"
                data-track-label="LinkedIn (hero)"
                className="rounded-sm border border-line bg-card px-6 py-3 font-display text-sm font-bold tracking-tight text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                LinkedIn
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <span className="stamp">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="accent-bar absolute inline-flex h-full w-full rounded-full opacity-60" />
                  <span className="accent-bar relative inline-flex h-1.5 w-1.5 rounded-full" />
                </span>
                Open to full-time roles
              </span>
              <span className="stamp">Available for freelance</span>
              <a
                href="#ai"
                className="stamp transition-colors hover:bg-accent hover:text-on-accent"
              >
                AI tools certified, be10x
              </a>
            </div>
          </div>

          {/* The photograph, mounted: flat, hairline edge, no ring or tilt. */}
          <div className="md:justify-self-end">
            {/* Explicit width, not w-full: justify-self-end shrinks the
                grid item to its content, which collapses a percentage
                width to nothing. */}
            <figure className="w-[17rem] max-w-full">
              <div className="relative aspect-square overflow-hidden rounded-sm border border-line bg-card">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  priority
                  sizes="272px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2.5 flex items-baseline justify-between border-t border-line pt-2 text-xs text-muted">
                <span>{profile.name}</span>
                <span className="tnum">MBA-IB</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* ---- The go-live rail: the page's single motion moment ---- */}
        <div className="mt-16 border-t border-line pt-8 sm:mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="font-display text-sm font-bold tracking-tight text-foreground">
              How a rollout I run reaches go-live
            </h2>
            <p className="text-sm text-muted">
              The onboarding automation I designed, stage by stage
            </p>
          </div>

          <div className="rail mt-8">
            {/* The line only spans the single-row layout — below lg the
                stages wrap, and a continuous line would then lie. */}
            <span aria-hidden className="rail-line hidden lg:block" />
            <span aria-hidden className="rail-progress hidden lg:block" />

            <ol className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
              {stages.map((stage, i) => (
                <li key={stage.title}>
                  <span
                    className="rail-mark"
                    data-final={i === last ? "true" : undefined}
                    style={{ ["--at" as string]: `${i / last}` }}
                  />
                  <h3 className="mt-3.5 font-display text-sm font-bold tracking-tight text-foreground">
                    {stage.title}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-muted">
                    {glosses[i]}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ---- Facts, as a ruled row of a record ---- */}
        <dl className="mt-14 grid grid-cols-2 border-t border-line sm:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="border-b border-line px-1 py-5 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:pr-5 sm:[&:not(:first-child)]:pl-5"
            >
              <dt className="tnum text-2xl font-bold leading-none tracking-tight text-accent">
                {item.value}
              </dt>
              <dd className="mt-2 text-sm leading-snug text-muted">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
