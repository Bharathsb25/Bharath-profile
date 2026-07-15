import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-slate-200 bg-teal-700 px-6 py-16 text-white dark:border-slate-800"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Let&apos;s work together
        </h2>
        <p className="mt-3 text-teal-100">
          Open to full-time roles, contract work, and freelance CRM /
          implementation projects.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
          >
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            className="rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {profile.phone}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
    </section>
  );
}
