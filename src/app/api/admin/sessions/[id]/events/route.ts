import { NextResponse } from "next/server";
import { getSessionEvents } from "@/lib/db/queries/analytics";
import { isUuid } from "@/lib/analytics/validate";

// Auth is enforced by src/proxy.ts for every /api/admin/* route.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id)) {
    return NextResponse.json({ error: "Invalid session id" }, { status: 400 });
  }
  try {
    const events = await getSessionEvents(id);
    return NextResponse.json({ events });
  } catch (err) {
    console.error("admin session events: query failed", err);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }
}
