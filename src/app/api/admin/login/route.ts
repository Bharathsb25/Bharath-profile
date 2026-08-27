import { NextResponse } from "next/server";
import { createSessionToken, passwordsMatch, ADMIN_SESSION_COOKIE, SESSION_TTL_SECONDS } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/analytics/rateLimit";
import { extractClientIp, hashIp } from "@/lib/analytics/ip";

export async function POST(req: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET;
  const ipHashSecret = process.env.ANALYTICS_IP_HASH_SECRET;

  if (!adminPassword || !sessionSecret || !ipHashSecret) {
    console.error("admin login: missing ADMIN_PASSWORD/SESSION_SECRET/ANALYTICS_IP_HASH_SECRET");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const ip = extractClientIp(req.headers) ?? "unknown";
  const rateLimitKey = `login:${hashIp(ip, ipHashSecret)}`;
  try {
    const allowed = await checkRateLimit(rateLimitKey, 5, 300);
    if (!allowed) {
      return NextResponse.json({ error: "Too many attempts, try again later" }, { status: 429 });
    }
  } catch (err) {
    // If the DB is unreachable, fail closed on rate limiting but don't block login entirely.
    console.error("admin login: rate limit check failed", err);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const password = (body as { password?: unknown })?.password;
  if (typeof password !== "string" || !passwordsMatch(password, adminPassword)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = createSessionToken(sessionSecret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
