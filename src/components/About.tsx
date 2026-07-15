import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
          About
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-300">
          {profile.summary}
        </p>
      </div>
    </section>
  );
}
