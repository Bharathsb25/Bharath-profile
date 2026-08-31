"use client";

import { useState } from "react";

/**
 * A plain `<a href="/api/admin/export">` link is at the mercy of the
 * browser's HTTP cache — even with Cache-Control: no-store on the response,
 * a copy fetched *before* that header existed can keep being served for the
 * same URL indefinitely. fetch() with cache: "no-store" always hits the
 * network, so this can never silently hand back a stale (e.g. pre-traffic,
 * empty) export again.
 */
export default function ExportCsvButton({ query }: { query: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleClick() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/admin/export?${query}`, { cache: "no-store" });
      if (!res.ok) throw new Error("export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analytics-sessions-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-60"
      >
        {loading ? "Exporting…" : "Export CSV"}
      </button>
      {error && (
        <span className="text-xs text-red-600 dark:text-red-400">Export failed — try again.</span>
      )}
    </div>
  );
}
