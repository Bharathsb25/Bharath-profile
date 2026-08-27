"use client";

import { useEffect } from "react";

export default function AnalyticsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin analytics dashboard failed to load:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="card max-w-md p-8 text-center">
        <h1 className="font-display text-lg font-bold text-foreground">
          Couldn&apos;t load analytics
        </h1>
        <p className="mt-2 text-sm text-muted">
          Usually this means the database isn&apos;t reachable — check
          <code className="mx-1 rounded bg-line/40 px-1.5 py-0.5 text-xs">DATABASE_URL</code>
          and that migrations have run.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 rounded-full accent-bar px-5 py-2.5 text-sm font-semibold text-on-accent"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
