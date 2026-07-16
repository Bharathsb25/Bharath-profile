"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
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
      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full accent-bar text-white">
          ✓
        </div>
        <h3 className="mt-4 font-display text-lg font-bold text-foreground">
          Message sent — thank you!
        </h3>
        <p className="mt-1.5 text-sm text-muted">
          I&apos;ll get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-line bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="card p-6 text-left">
      <input type="hidden" name="access_key" value={profile.web3formsKey} />
      <input
        type="hidden"
        name="subject"
        value="💼 New enquiry from your portfolio"
      />
      <input type="hidden" name="from_name" value="Portfolio — Contact Form" />
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
            Name <span className="text-accent">*</span>
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
            Email <span className="text-accent">*</span>
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
            Phone <span className="text-muted/70">(optional)</span>
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
            Company <span className="text-muted/70">(optional)</span>
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
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="c-message"
          name="message"
          required
          rows={4}
          placeholder="Tell me about the role or project…"
          className={`${field} resize-y`}
        />
      </div>

      {status === "error" && (
        <p className="mt-3 text-xs text-red-600 dark:text-red-400">
          Something went wrong. Please email me directly at {profile.email}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 w-full rounded-full accent-bar px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
