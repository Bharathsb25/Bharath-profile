import { experience } from "@/data/profile";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
          Experience
        </h2>

        <div className="mt-6 space-y-8">
          {experience.map((job) => (
            <div
              key={`${job.company}-${job.period}`}
              className="border-l-2 border-teal-200 pl-6 dark:border-teal-900"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {job.role}
                </h3>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {job.period}
                </span>
              </div>
              <p className="text-sm font-medium text-teal-700 dark:text-teal-400">
                {job.company}
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {job.points.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-teal-500">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
