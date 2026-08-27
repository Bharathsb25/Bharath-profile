"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import LeadFormModal from "@/components/LeadFormModal";
import { trackEvent } from "@/lib/analytics/track";

export default function RevealPhoneButton() {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyPhone() {
    try {
      await navigator.clipboard.writeText(profile.phone);
      setCopied(true);
      trackEvent("copy_phone", { label: "Copy phone number" });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can be unavailable/denied — the tel: link still works.
    }
  }

  if (revealed) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <a
          href={`tel:${profile.phone.replace(/\s+/g, "")}`}
          data-track-event="cta_click"
          data-track-label="Call phone"
          className="rounded-full border border-on-accent/40 px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-on-accent/10"
        >
          ☎ {profile.phone}
        </a>
        <button
          type="button"
          onClick={copyPhone}
          aria-label="Copy phone number"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-on-accent/40 text-on-accent transition-colors hover:bg-on-accent/10"
        >
          {copied ? (
            "✓"
          ) : (
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </svg>
          )}
        </button>
      </span>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-track-event="cta_click"
        data-track-label="Reveal phone"
        className="group inline-flex items-center gap-2 rounded-full border border-on-accent/40 px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-on-accent/10"
        aria-label="Reveal phone number"
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="11" width="16" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        <span className="select-none blur-[5px]" aria-hidden="true">
          +91 98765 43210
        </span>
        <span className="text-xs font-semibold underline-offset-2 group-hover:underline">
          Reveal
        </span>
      </button>

      <LeadFormModal
        open={open}
        onClose={() => setOpen(false)}
        title="Get my phone number"
        description="Share your details and my number will appear right away."
        subject="📞 Someone requested your phone number"
        submitLabel="Reveal number"
        onSuccess={() => setRevealed(true)}
      />
    </>
  );
}
