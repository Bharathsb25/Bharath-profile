import { aiEdge } from "@/data/profile";

/**
 * A band between About and Services, not a numbered section. The three
 * points are ruled entries rather than icon cards: each one is a claim
 * about where the week goes, and a glyph beside it would add nothing.
 */
export default function AIEdge() {
  return (
    <section id="ai" className="border-y border-line bg-card py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <span className="stamp">{aiEdge.kicker}</span>

            <h2 className="mt-5 max-w-[22ch] font-display text-2xl font-extrabold tracking-[-0.02em] text-foreground sm:text-[2rem] sm:leading-[1.1]">
              {aiEdge.headline}
            </h2>

            <p className="mt-5 max-w-[48ch] leading-relaxed text-muted">
              {aiEdge.intro}
            </p>

            <div className="mt-8">
              <h3 className="border-b border-line pb-2 font-display text-sm font-bold tracking-tight text-foreground">
                Where it actually goes
              </h3>
              <ul className="text-sm">
                {aiEdge.usedFor.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line py-2.5 text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={aiEdge.credential.href}
              className="mt-7 inline-block max-w-sm rounded-sm border border-line bg-background px-4 py-3 transition-colors hover:border-accent"
            >
              <span className="block font-display text-sm font-bold tracking-tight text-foreground">
                {aiEdge.credential.text}
              </span>
              <span className="tnum mt-0.5 block text-xs text-muted">
                {aiEdge.credential.date} — view certificate
              </span>
            </a>
          </div>

          <div className="lg:pt-2">
            {aiEdge.points.map((point) => (
              <article
                key={point.title}
                className="border-t border-line py-6 first:border-t-2 first:border-foreground"
              >
                <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                  {point.title}
                </h3>
                <p className="mt-2 max-w-[60ch] leading-relaxed text-muted">
                  {point.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
