"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import LeadFormModal from "@/components/LeadFormModal";

export default function DownloadCVButton({
  variant = "ghost",
}: {
  variant?: "ghost" | "light";
}) {
  const [open, setOpen] = useState(false);

  function download() {
    const a = document.createElement("a");
    a.href = profile.resume;
    a.download = "Bharath-Sathiskumar-CV.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  const buttonClass =
    variant === "light"
      ? "rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
      : "inline-flex items-center gap-2 rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={buttonClass}
      >
        {variant === "light" ? (
          "↓ Download CV"
        ) : (
          <>
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
            </svg>
            Download CV
          </>
        )}
      </button>

      <LeadFormModal
        open={open}
        onClose={() => setOpen(false)}
        title="Download my CV"
        description="Share your details and the download will start right away."
        subject="📄 Someone downloaded your CV"
        submitLabel="Download CV"
        onSuccess={download}
        proceedOnError
        requirePhone
      />
    </>
  );
}
