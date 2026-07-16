"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import LeadFormModal from "@/components/LeadFormModal";

export default function RevealPhoneButton() {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return (
      <a
        href={`tel:${profile.phone.replace(/\s+/g, "")}`}
        className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
      >
        ☎ {profile.phone}
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
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
