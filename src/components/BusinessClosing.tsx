"use client";

import { useCopy } from "@/components/LanguageProvider";
import { profile } from "@/data/profile";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import RevealPhoneButton from "@/components/RevealPhoneButton";

/**
 * The closing section — repeats the primary CTA (brief section 8) and is
 * also the actual booking mechanism (brief's "book a free consultation
 * call" resolves to this form, per the plan's decision not to add Calendly).
 */
export default function BusinessClosing() {
  const { closing } = useCopy();

  return (
    <section id="start" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line accent-bar px-6 py-12 sm:px-10 sm:py-14">
          <div className="glow pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-30" />
          <div className="glow pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 opacity-20" />

          <div className="relative grid items-start gap-10 md:grid-cols-2">
            <div className="text-on-accent">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-on-accent">
                {closing.kicker}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {closing.title}
              </h2>
              <p className="mt-4 max-w-md text-on-accent">{closing.text}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}?subject=Business%20services%20enquiry`}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  ✉ {closing.emailPrefix} {profile.email}
                </a>
                <RevealPhoneButton />
              </div>

              <p className="mt-6 text-xs text-on-accent">{closing.note}</p>
            </div>

            <ContactForm
              subject="🏢 New BUSINESS SERVICES enquiry"
              formName="Portfolio — Business Services"
              messageLabel={closing.form.messageLabel}
              messagePlaceholder={closing.form.messagePlaceholder}
              submitLabel={closing.form.submitLabel}
              labels={closing.form}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
