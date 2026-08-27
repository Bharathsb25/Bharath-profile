"use client";

import { useState } from "react";
import type { SessionRow } from "@/lib/db/queries/analytics";

interface TimelineEvent {
  eventName: string;
  page: string;
  section: string | null;
  label: string | null;
  destinationUrl: string | null;
  createdAt: string;
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;
  return `${hours}h ${remMinutes}m`;
}

function Row({ session }: { session: SessionRow }) {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<TimelineEvent[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function toggle() {
    const next = !open;
    setOpen(next);
    if (next && events === null) {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/admin/sessions/${session.id}/events`);
        if (!res.ok) throw new Error("failed");
        const json = await res.json();
        setEvents(json.events);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <tr
        onClick={toggle}
        className="cursor-pointer border-t border-line text-sm transition-colors hover:bg-accent/5"
      >
        <td className="px-3 py-2.5 text-muted">
          {new Date(session.startedAt).toLocaleString()}
        </td>
        <td className="px-3 py-2.5">{session.isReturning ? "Returning" : "New"}</td>
        <td className="px-3 py-2.5">{session.entryPage ?? "—"}</td>
        <td className="px-3 py-2.5">{session.deviceType ?? "—"}</td>
        <td className="px-3 py-2.5">{session.browser ?? "—"}</td>
        <td className="px-3 py-2.5">{session.country ?? "—"}</td>
        <td className="px-3 py-2.5">{formatDuration(session.activeSeconds)}</td>
        <td className="px-3 py-2.5">{session.pageViewCount}</td>
        <td className="px-3 py-2.5">{session.maxScrollDepth}%</td>
      </tr>
      {open && (
        <tr className="border-t border-line bg-background/60">
          <td colSpan={9} className="px-3 py-3">
            {loading && <p className="text-xs text-muted">Loading timeline…</p>}
            {error && <p className="text-xs text-red-600 dark:text-red-400">Failed to load events.</p>}
            {events && events.length === 0 && (
              <p className="text-xs text-muted">No events recorded for this session.</p>
            )}
            {events && events.length > 0 && (
              <ol className="space-y-1.5">
                {events.map((e, i) => (
                  <li key={i} className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-foreground">
                      {e.eventName}
                    </span>
                    <span>{e.page}</span>
                    {e.section && <span>· {e.section}</span>}
                    {e.label && <span>· {e.label}</span>}
                    <span className="ml-auto text-[10px]">
                      {new Date(e.createdAt).toLocaleTimeString()}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

export default function SessionsTable({ rows }: { rows: SessionRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="card p-8 text-center text-sm text-muted">
        No sessions match the current filters.
      </div>
    );
  }

  return (
    <div className="card overflow-x-auto p-0">
      <table className="w-full min-w-[720px] text-left">
        <thead>
          <tr className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
            <th className="px-3 py-2.5">Started</th>
            <th className="px-3 py-2.5">Type</th>
            <th className="px-3 py-2.5">Entry page</th>
            <th className="px-3 py-2.5">Device</th>
            <th className="px-3 py-2.5">Browser</th>
            <th className="px-3 py-2.5">Country</th>
            <th className="px-3 py-2.5">Active time</th>
            <th className="px-3 py-2.5">Views</th>
            <th className="px-3 py-2.5">Scroll</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((session) => (
            <Row key={session.id} session={session} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
