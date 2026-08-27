import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12h

interface SessionPayload {
  admin: true;
  iat: number; // issued-at, seconds since epoch
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

function sign(payloadB64: string, secret: string): string {
  return createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

/** Signs a fresh admin session token: base64url(payload) + "." + HMAC-SHA256 signature. */
export function createSessionToken(secret: string, now = Date.now()): string {
  const payload: SessionPayload = { admin: true, iat: Math.floor(now / 1000) };
  const payloadB64 = base64url(JSON.stringify(payload));
  const signature = sign(payloadB64, secret);
  return `${payloadB64}.${signature}`;
}

/**
 * Verifies signature and expiry. Pure function (no cookie/request access) so
 * it's directly unit-testable; callers (middleware, route handlers) read the
 * cookie and pass its value in.
 */
export function verifySessionToken(
  token: string | undefined | null,
  secret: string,
  now = Date.now(),
): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, signature] = parts;

  const expected = sign(payloadB64, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
  } catch {
    return false;
  }
  if (payload.admin !== true || typeof payload.iat !== "number") return false;

  const ageSeconds = now / 1000 - payload.iat;
  return ageSeconds >= 0 && ageSeconds <= SESSION_TTL_SECONDS;
}

/** Constant-time password comparison — avoids leaking length/prefix via timing. */
export function passwordsMatch(candidate: string, expected: string): boolean {
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    // Still run a comparison of equal-length buffers so failure timing
    // doesn't depend on whether the length check itself short-circuited.
    timingSafeEqual(Buffer.alloc(b.length), Buffer.alloc(b.length));
    return false;
  }
  return timingSafeEqual(a, b);
}
