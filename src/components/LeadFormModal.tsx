"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

type Status = "idle" | "sending" | "error";

export default function LeadFormModal({
  open,
  onClose,
  title,
  description,
  subject,
  submitLabel,
  onSuccess,
  /** When true, the action still completes even if the form service fails. */
  proceedOnError = false,
  /** When true, the phone field is required. */
  requirePhone = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  subject: string;
  submitLabel: string;
  onSuccess: () => void;
  proceedOnError?: boolean;
  requirePhone?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

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
      if (!res.ok) throw new Error("submit failed");
      form.reset();
      setStatus("idle");
      onSuccess();
      onClose();
    } catch {
      setStatus("error");
      if (proceedOnError) onSuccess();
    }
  }

  const field =
    "w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="card relative w-full max-w-md p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-muted transition-colors hover:text-foreground"
          aria-label="Close"
        >
          ✕
        </button>

        <h3
          id="lead-modal-title"
          className="font-display text-lg font-bold text-foreground"
        >
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-muted">{description}</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <input type="hidden" name="access_key" value={profile.web3formsKey} />
          <input type="hidden" name="subject" value={subject} />
          <input type="hidden" name="from_name" value="Portfolio Website" />
          {/* Honeypot spam filter */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <label
              htmlFor="lead-name"
              className="mb-1 block text-xs font-medium text-muted"
            >
              Name <span className="text-accent">*</span>
            </label>
            <input
              id="lead-name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className={field}
            />
          </div>

          <div>
            <label
              htmlFor="lead-email"
              className="mb-1 block text-xs font-medium text-muted"
            >
              Email <span className="text-accent">*</span>
            </label>
            <input
              id="lead-email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className={field}
            />
          </div>

          <div>
            <label
              htmlFor="lead-phone"
              className="mb-1 block text-xs font-medium text-muted"
            >
              Phone{" "}
              {requirePhone ? (
                <span className="text-accent">*</span>
              ) : (
                <span className="text-muted/70">(optional)</span>
              )}
            </label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              required={requirePhone}
              placeholder="+91 …"
              className={field}
            />
          </div>

          <div>
            <label
              htmlFor="lead-company"
              className="mb-1 block text-xs font-medium text-muted"
            >
              Company / Role <span className="text-muted/70">(optional)</span>
            </label>
            <input
              id="lead-company"
              name="company"
              type="text"
              placeholder="e.g. Recruiter at Acme"
              className={field}
            />
          </div>

          {status === "error" && (
            <p className="text-xs text-amber-600 dark:text-amber-400">
              {proceedOnError
                ? "Done — but the notification didn't send. No action needed."
                : `Something went wrong. Please email me at ${profile.email}.`}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full accent-bar px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === "sending" ? "Please wait…" : submitLabel}
          </button>

          <p className="text-center text-[11px] leading-4 text-muted">
            Your details are only used so I can get back to you — never shared
            or used for marketing.{" "}
            <a
              href="/privacy"
              target="_blank"
              className="font-medium text-accent hover:underline"
            >
              Privacy policy
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
