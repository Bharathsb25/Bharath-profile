import { dbQuery } from "../db/client.ts";

interface WindowState {
  count: number;
  window_start: string | Date;
}

export interface RateLimitDecision {
  allowed: boolean;
  count: number;
  windowStart: Date;
}

/**
 * Pure fixed-window decision, factored out so it's testable without a DB.
 * A new window starts once `windowSeconds` have elapsed since window_start;
 * otherwise the existing window's count is incremented and compared to `limit`.
 */
export function computeRateLimitDecision(
  existing: WindowState | null,
  now: Date,
  windowSeconds: number,
  limit: number,
): RateLimitDecision {
  if (!existing) {
    return { allowed: true, count: 1, windowStart: now };
  }
  const windowStart = new Date(existing.window_start);
  const elapsedSeconds = (now.getTime() - windowStart.getTime()) / 1000;
  if (elapsedSeconds >= windowSeconds) {
    return { allowed: true, count: 1, windowStart: now };
  }
  const nextCount = existing.count + 1;
  return { allowed: nextCount <= limit, count: nextCount, windowStart };
}

/**
 * DB-backed fixed-window rate limiter, keyed by an arbitrary string (e.g.
 * `collect:<ip_hash>` or `login:<ip_hash>`). No new dependency — reuses the
 * `rate_limits` table already provisioned for this.
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const now = new Date();
  const rows = await dbQuery<WindowState>(
    "SELECT count, window_start FROM rate_limits WHERE key = $1",
    [key],
  );
  const decision = computeRateLimitDecision(rows[0] ?? null, now, windowSeconds, limit);

  await dbQuery(
    `INSERT INTO rate_limits (key, count, window_start)
     VALUES ($1, $2, $3)
     ON CONFLICT (key) DO UPDATE SET count = $2, window_start = $3`,
    [key, decision.count, decision.windowStart.toISOString()],
  );

  return decision.allowed;
}
