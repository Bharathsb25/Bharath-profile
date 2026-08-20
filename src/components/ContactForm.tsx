"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Every field has an independent default matching today's English copy, so
 * existing callers (/freelance, the homepage) are byte-for-byte unaffected.
 * Only /services (via BusinessClosing) passes a full `labels` override, for
 * the Tamil translation — a partial override is fine too, unset fields keep
 * their English default.
 */
type FieldLabels = {
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  phoneOptional: string;
  companyLabel: string;
  companyOptional: string;
  sendingLabel: string;
  successTitle: string;
  successText: string;
  resendLabel: string;
  errorText: string;
  privacyText: string;
  privacyLinkText: string;
};

const defaultLabels: FieldLabels = {
  nameLabel: "Name",
  emailLabel: "Email",
  phoneLabel: "Phone",
  phoneOptional: "(optional)",
  companyLabel: "Company",
  companyOptional: "(optional)",
  sendingLabel: "Sending…",
  successTitle: "Message sent — thank you!",
  successText: "I'll get back to you as soon as possible.",
  resendLabel: "Send another message",
  errorText: "Something went wrong. Please email me directly at",
  privacyText:
    "Your details are only used so I can get back to you — never shared or used for marketing.",
  privacyLinkText: "Privacy policy",
};

export default function ContactForm({
  /** Email subject line, so I can tell which page the enquiry came from. */
  subject = "💼 New enquiry from your portfolio",
  formName = "Portfolio — Contact Form",
  messageLabel = "Message",
  messagePlaceholder = "Tell me about the role or project…",
  submitLabel = "Send Message",
  labels,
}: {
  subject?: string;
  formName?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  labels?: Partial<FieldLabels>;
} = {}) {
  const l = { ...defaultLabels, ...labels };
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json().catch(() => null);
      // Web3Forms returns HTTP 200 even on some failures — trust its `success` flag.
      if (!res.ok || !json?.success) {
        throw new Error(json?.message || "submit failed");
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full accent-bar text-on-accent">
          ✓
        </div>
        <h3 className="mt-4 font-display text-lg font-bold text-foreground">
          {l.successTitle}
        </h3>
        <p className="mt-1.5 text-sm text-muted">{l.successText}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-accent hover:underline"
        >
          {l.resendLabel}
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-line bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="card p-6 text-left">
      <input type="hidden" name="access_key" value={profile.web3formsKey} />
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="from_name" value={formName} />
      {/* Honeypot spam filter */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor="c-name"
            className="mb-1 block text-xs font-medium text-muted"
          >
            {l.nameLabel} <span className="text-accent">*</span>
          </label>
          <input
            id="c-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label
            htmlFor="c-email"
            className="mb-1 block text-xs font-medium text-muted"
          >
            {l.emailLabel} <span className="text-accent">*</span>
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className={field}
          />
        </div>
        <div>
          <label
            htmlFor="c-phone"
            className="mb-1 block text-xs font-medium text-muted"
          >
            {l.phoneLabel} <span className="text-muted/70">{l.phoneOptional}</span>
          </label>
          <input
            id="c-phone"
            name="phone"
            type="tel"
            placeholder="+91 …"
            className={field}
          />
        </div>
        <div>
          <label
            htmlFor="c-company"
            className="mb-1 block text-xs font-medium text-muted"
          >
            {l.companyLabel} <span className="text-muted/70">{l.companyOptional}</span>
          </label>
          <input
            id="c-company"
            name="company"
            type="text"
            placeholder="Company name"
            className={field}
          />
        </div>
      </div>

      <div className="mt-3">
        <label
          htmlFor="c-message"
          className="mb-1 block text-xs font-medium text-muted"
        >
          {messageLabel} <span className="text-accent">*</span>
        </label>
        <textarea
          id="c-message"
          name="message"
          required
          rows={4}
          placeholder={messagePlaceholder}
          className={`${field} resize-y`}
        />
      </div>

      {status === "error" && (
        <p className="mt-3 text-xs text-red-600 dark:text-red-400">
          {l.errorText} {profile.email}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 w-full rounded-full accent-bar px-6 py-3 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "sending" ? l.sendingLabel : submitLabel}
      </button>

      <p className="mt-3 text-center text-[11px] leading-4 text-muted">
        {l.privacyText}{" "}
        <a
          href="/privacy"
          target="_blank"
          className="font-medium text-accent hover:underline"
        >
          {l.privacyLinkText}
        </a>
      </p>
    </form>
  );
}
