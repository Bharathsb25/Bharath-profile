import { profile } from "@/data/profile";
import ContactForm from "@/components/ContactForm";
import RevealPhoneButton from "@/components/RevealPhoneButton";

/**
 * The one place the accent is used as a full fill — the page's closing
 * block, where a stamped panel is the right note to end a record on.
 */
export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="accent-bar rounded-sm px-6 py-11 sm:px-10 sm:py-14">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
          <div className="text-on-accent">
            <h2 className="max-w-[20ch] font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-[2.5rem]">
              Open to full-time roles and freelance projects
            </h2>
            <p className="mt-5 max-w-[42ch] leading-relaxed opacity-90">
              Have a CRM rollout, implementation, or delivery challenge? Send
              me a message and I&apos;ll get back to you quickly.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <a
                href={`mailto:${profile.email}`}
                data-track-event="cta_click"
                data-track-label="Email (contact)"
                className="rounded-sm bg-on-accent px-5 py-3 font-display text-sm font-bold tracking-tight text-accent transition-opacity hover:opacity-90"
              >
                {profile.email}
              </a>
              <RevealPhoneButton />
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-track-event="social_click"
                data-track-label="LinkedIn (contact)"
                className="rounded-sm border border-on-accent/50 px-5 py-3 font-display text-sm font-bold tracking-tight text-on-accent transition-colors hover:bg-on-accent/10"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
