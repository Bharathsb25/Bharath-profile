import { profile } from "@/data/profile";
import CopyEmailButton from "@/components/CopyEmailButton";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto mb-8 max-w-2xl px-6 text-center">
        <p lang="ta" className="font-display text-sm italic leading-relaxed text-foreground/80">
          &ldquo;எல்லாரும் எல்லாமும் பெற வேண்டும், இங்கு இல்லாமை இல்லாத நிலை வேண்டும்&rdquo;
        </p>
        <p className="mt-1.5 text-xs text-muted">
          &ldquo;Everyone should get everything — there should be no state of want here.&rdquo; — Vallalar
        </p>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="font-display text-sm font-semibold text-foreground">
          Bharath<span className="text-gradient"> Sathiskumar</span>
        </p>
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-muted">
          <a
            href="/services"
            data-track-event="nav_click"
            data-track-label="For Business (footer)"
            className="transition-colors hover:text-accent"
          >
            For Business
          </a>
          <a
            href="/freelance"
            data-track-event="nav_click"
            data-track-label="Freelance (footer)"
            className="transition-colors hover:text-accent"
          >
            Freelance
          </a>
          <a
            href="/samples"
            data-track-event="nav_click"
            data-track-label="IPO Analysis (footer)"
            className="transition-colors hover:text-accent"
          >
            IPO Analysis
          </a>
          <a
            href="/#blog"
            data-track-event="nav_click"
            data-track-label="Blog (footer)"
            className="transition-colors hover:text-accent"
          >
            Blog
          </a>
          <a
            href="/privacy"
            data-track-event="nav_click"
            data-track-label="Privacy (footer)"
            className="transition-colors hover:text-accent"
          >
            Privacy
          </a>
          <span className="inline-flex items-center gap-1.5">
            <a
              href={`mailto:${profile.email}`}
              data-track-event="cta_click"
              data-track-label="Email (footer)"
              className="transition-colors hover:text-accent"
            >
              Email
            </a>
            <span className="text-line">·</span>
            <CopyEmailButton email={profile.email} />
          </span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-track-event="social_click"
            data-track-label="LinkedIn"
            className="transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
