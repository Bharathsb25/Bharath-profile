import { awards, languages, publications } from "@/data/profile";

export default function Achievements() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl grid gap-10 sm:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
            Awards
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {awards.map((award) => (
              <li key={award} className="flex gap-2">
                <span className="text-teal-500">•</span>
                <span>{award}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
            Languages
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
            Publications
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {publications.map((pub) => (
              <li key={pub.url}>
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline-offset-2 hover:underline dark:text-teal-400"
                >
                  {pub.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
