import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="font-display text-sm font-semibold text-foreground">
          Bharath<span className="text-gradient"> Sathiskumar</span>
        </p>
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-muted">
          <a href="/services" className="transition-colors hover:text-accent">
            For Business
          </a>
          <a href="/freelance" className="transition-colors hover:text-accent">
            Freelance
          </a>
          <a href="/samples" className="transition-colors hover:text-accent">
            Samples
          </a>
          <a href="/#blog" className="transition-colors hover:text-accent">
            Blog
          </a>
          <a href="/privacy" className="transition-colors hover:text-accent">
            Privacy
          </a>
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
