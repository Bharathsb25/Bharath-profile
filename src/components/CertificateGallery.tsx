"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { certifications } from "@/data/profile";

// Only certificates with a scan/screenshot get a tile.
const certificates = certifications.filter((cert) => cert.image);

export default function CertificateGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex === null ? null : certificates[openIndex];

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) =>
        i === null ? i : (i + delta + certificates.length) % certificates.length
      ),
    []
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    // Stop the page scrolling behind the lightbox.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [openIndex, close, step]);

  if (certificates.length === 0) return null;

  // One certificate on a 3-up grid leaves a dead row, so a lone cert gets a
  // wide side-by-side card instead.
  const solo = certificates.length === 1;

  return (
    <>
      <div className={solo ? "" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
        {certificates.map((cert, i) => (
          <button
            key={cert.name}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={`card card-hover group p-3 text-left ${
              solo ? "flex w-full flex-col gap-5 sm:flex-row sm:p-4" : ""
            }`}
            aria-label={`View ${cert.name} certificate`}
          >
            {/* White mat — the certificates are white artwork, so they need to
                stay light even in dark mode. */}
            <span
              className={`relative block aspect-[1136/762] overflow-hidden rounded-lg bg-white ring-1 ring-line ${
                solo ? "w-full shrink-0 sm:w-[58%]" : "w-full"
              }`}
            >
              <Image
                src={cert.image!}
                alt={`${cert.name} certificate issued by ${cert.issuer ?? "issuer"}`}
                fill
                sizes={
                  solo
                    ? "(max-width: 640px) 92vw, 640px"
                    : "(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                }
                className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/45 group-hover:opacity-100">
                <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-ink">
                  View certificate
                </span>
              </span>
            </span>

            <span className={solo ? "flex flex-col justify-center px-1 sm:py-2" : "block"}>
              <span
                className={`flex items-baseline justify-between gap-3 px-1 ${
                  solo ? "" : "mt-3"
                }`}
              >
                <span
                  className={`font-display font-semibold text-foreground ${
                    solo ? "text-base" : "text-sm"
                  }`}
                >
                  {cert.name}
                </span>
                <span className="shrink-0 text-xs font-medium text-muted">
                  {cert.date}
                </span>
              </span>
              {cert.issuer && (
                <span className="mt-0.5 block px-1 text-xs font-medium text-accent">
                  {cert.issuer}
                  {cert.credentialId && (
                    <span className="font-mono font-normal text-muted">
                      {" "}
                      · No. {cert.credentialId}
                    </span>
                  )}
                </span>
              )}
              {cert.detail && (
                <span
                  className={`mt-2 block px-1 leading-6 text-muted ${
                    solo ? "text-sm" : "text-xs leading-5"
                  }`}
                >
                  {cert.detail}
                </span>
              )}
              {cert.skills && (
                <span className="mt-3 flex flex-wrap gap-1.5 px-1">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-accent/30 bg-accent/10 px-2 py-1 text-[11px] font-medium text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </span>
              )}

              <span className="mt-3 block px-1 text-xs font-semibold text-accent">
                View certificate →
              </span>
            </span>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${open.name} certificate`}
        >
          <div
            className="scrim-strong absolute inset-0 backdrop-blur-sm"
            onClick={close}
          />

          <div className="relative flex max-h-full w-full max-w-4xl flex-col">
            <div className="flex items-start justify-between gap-4 pb-3 text-white">
              <div>
                <p className="font-display text-base font-bold">{open.name}</p>
                <p className="text-xs text-white/70">
                  {open.issuer ? `${open.issuer} · ` : ""}
                  {open.date}
                  {open.credentialId && (
                    <span className="font-mono"> · No. {open.credentialId}</span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="shrink-0 rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
              >
                Close ✕
              </button>
            </div>

            <div className="overflow-auto rounded-xl bg-white p-2 shadow-2xl">
              <Image
                src={open.image!}
                alt={`${open.name} certificate`}
                width={open.width ?? 1136}
                height={open.height ?? 762}
                sizes="(max-width: 1024px) 92vw, 900px"
                className="h-auto w-full rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-3">
              <a
                href={open.image}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                Open full size ↗
              </a>
              {certificates.length > 1 && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
