import { publications, blogUrl } from "@/data/profile";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <SectionHeading index="06" kicker="Writing" title="From My Blog" />
        </Reveal>
        <Reveal delay={80}>
          <a
            href={blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Visit my blog ↗
          </a>
        </Reveal>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {publications.map((post, i) => (
          <Reveal key={post.url} delay={i * 90}>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover group flex h-full flex-col p-6"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-muted">
                <span className="rounded-full accent-bar px-2.5 py-0.5 text-white">
                  Article
                </span>
                <span>{post.date}</span>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                Read article
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
