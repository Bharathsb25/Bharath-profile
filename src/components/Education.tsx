import { education, certifications, training } from "@/data/profile";

export default function Education() {
  return (
    <section
      id="education"
      className="border-y border-slate-200 bg-slate-50 px-6 py-16 dark:border-slate-800 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-5xl grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
            Education
          </h2>
          <div className="mt-6 space-y-5">
            {education.map((edu) => (
              <div key={edu.degree}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {edu.period}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {edu.school}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {edu.detail}
                </p>
              </div>
            ))}
          </div>

          <h3 className="mt-8 text-sm font-semibold text-slate-900 dark:text-white">
            {training.title}
          </h3>
          <ul className="mt-3 space-y-1.5 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {training.points.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="text-teal-500">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
            Certifications
          </h2>
          <ul className="mt-6 space-y-4">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className="flex items-baseline justify-between gap-4 border-b border-slate-200 pb-3 dark:border-slate-800"
              >
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  {cert.name}
                </span>
                <span className="shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {cert.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
