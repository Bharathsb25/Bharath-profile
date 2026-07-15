import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section
      id="top"
      className="border-b border-slate-200 bg-gradient-to-b from-teal-50 to-white px-6 py-20 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6">
        <span className="rounded-full bg-teal-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
          Available for new opportunities & freelance projects
        </span>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          {profile.name}
        </h1>

        <p className="text-lg font-medium text-teal-700 dark:text-teal-400">
          {profile.title}
        </p>

        <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {profile.tagline}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="#contact"
            className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Get in touch
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-400"
          >
            Email Me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-400"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
