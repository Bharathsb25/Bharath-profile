import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db/client";

/**
 * Deletes events/sessions/visitors older than ANALYTICS_RETENTION_DAYS
 * (default 400). Intended to be called daily by the Vercel Cron configured
 * in vercel.json — Vercel Cron sends a GET request, authenticated via
 * CRON_SECRET — and is also reachable via POST by an authenticated admin
 * (e.g. a "run now" button). Both paths are enforced by src/middleware.ts
 * before this handler ever runs.
 */
async function runRetention() {
  const days = Number(process.env.ANALYTICS_RETENTION_DAYS) || 400;

  try {
    const deletedSessions = await dbQuery<{ id: string }>(
      `DELETE FROM sessions WHERE started_at < now() - ($1 || ' days')::interval RETURNING id`,
      [days],
    );
    const deletedVisitors = await dbQuery<{ id: string }>(
      `DELETE FROM visitors WHERE last_seen < now() - ($1 || ' days')::interval RETURNING id`,
      [days],
    );
    // events are deleted via ON DELETE CASCADE from sessions.
    return NextResponse.json({
      ok: true,
      deletedSessions: deletedSessions.length,
      deletedVisitors: deletedVisitors.length,
    });
  } catch (err) {
    console.error("retention cleanup failed", err);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}

export const GET = runRetention;
export const POST = runRetention;
