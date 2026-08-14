import { aiEdge } from "@/data/profile";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

// Deliberately un-numbered: it's a band between About and Services, not a
// section, so the 01 / 02 / 03 heading sequence stays intact.
export default function AIEdge() {
  return (
    <section id="ai" className="relative overflow-hidden border-y border-line bg-card/40 py-20">
      <div className="glow pointer-events-none absolute -left-24 top-10 h-72 w-72 opacity-15" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          {/* Pitch */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
                </svg>
                {aiEdge.kicker}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {aiEdge.headline}
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-4 max-w-lg text-base leading-7 text-muted">
                {aiEdge.intro}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-7">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
                  Where it actually goes
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {aiEdge.usedFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-line bg-card px-3 py-1 text-xs font-medium text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <a
                href={aiEdge.credential.href}
                className="mt-7 inline-flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-accent"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full accent-bar text-on-accent">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
                    <path d="m8.5 14-1 7 4.5-2.5L16.5 21l-1-7" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs font-semibold text-foreground">
                    {aiEdge.credential.text}
                  </span>
                  <span className="block text-[11px] text-muted">
                    {aiEdge.credential.date} · view certificate →
                  </span>
                </span>
              </a>
            </Reveal>
          </div>

          {/* The three speed claims */}
          <div className="grid gap-4">
            {aiEdge.points.map((point, i) => (
              <Reveal key={point.title} delay={i * 90}>
                <TiltCard max={5} className="card h-full p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="tilt-raise flex h-10 w-10 shrink-0 items-center justify-center rounded-xl accent-bar text-on-accent">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d={point.icon} />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
