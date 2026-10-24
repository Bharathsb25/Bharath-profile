import { publications, blogUrl } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";

/**
 * Writing, as a dated index. Five posts in a three-up card grid left
 * two orphans on the last row; a ruled index with the date in the rail
 * takes any number of entries and reads the way an archive should.
 */
export default function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading kicker="Writing" title="From my blog" />

      <ul>
        {publications.map((post) => (
          <li key={post.url} className="border-t border-line">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="blog_click"
              data-track-label={post.title}
              className="group grid gap-y-1.5 py-6 md:grid-cols-[8rem_1fr] md:gap-x-10"
            >
              <span className="tnum text-sm text-muted">{post.date}</span>
              <span>
                <span className="block max-w-[58ch] font-display text-lg font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {post.title}
                </span>
                <span className="mt-1.5 block max-w-[64ch] leading-relaxed text-muted">
                  {post.excerpt}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="border-t border-line pt-6">
        <a
          href={blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track-event="blog_click"
          data-track-label="Visit blog"
          className="inline-block rounded-sm border border-line bg-card px-5 py-2.5 font-display text-sm font-bold tracking-tight text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Visit my blog
        </a>
      </div>
    </section>
  );
}
