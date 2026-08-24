import Link from "next/link";
import { profile } from "@/data/profile";

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
        <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-muted">
          <Link href="/services" className="transition-colors hover:text-accent">
            For Business
          </Link>
          <Link href="/freelance" className="transition-colors hover:text-accent">
            Freelance
          </Link>
          <Link href="/samples" className="transition-colors hover:text-accent">
            IPO Analysis
          </Link>
          <Link href="/#blog" className="transition-colors hover:text-accent">
            Blog
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-accent">
            Privacy
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-accent"
          >
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
