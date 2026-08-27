import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

// Runs in the Node.js runtime (Next.js 16 default for Proxy), which is what
// lets this use node:crypto via lib/auth/session — the deprecated
// `middleware` convention defaults to the Edge runtime and can't bundle it.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login page/endpoint must stay reachable while logged out.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // Vercel Cron calls the retention endpoint with no cookie — it
  // authenticates via the Authorization header Vercel sends automatically
  // when CRON_SECRET is configured, instead of the admin session cookie.
  if (pathname === "/api/admin/retention") {
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret && req.headers.get("authorization") === `Bearer ${cronSecret}`) {
      return NextResponse.next();
    }
  }

  const secret = process.env.SESSION_SECRET;
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const authenticated = !!secret && verifySessionToken(token, secret);

  if (authenticated) return NextResponse.next();

  if (pathname.startsWith("/api/admin/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}
