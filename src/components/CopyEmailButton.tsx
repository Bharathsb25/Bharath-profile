"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics/track";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      trackEvent("copy_email", { label: "Copy email" });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can be unavailable/denied — the mailto: link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className="inline-flex items-center transition-colors hover:text-accent"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
