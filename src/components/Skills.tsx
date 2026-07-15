import { skillGroups, toolsAndTech } from "@/data/profile";

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-y border-slate-200 bg-slate-50 px-6 py-16 dark:border-slate-800 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
          Skills
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950"
            >
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {group.title}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex gap-2">
                    <span className="text-teal-500">•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Tools & Platforms
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {toolsAndTech.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
