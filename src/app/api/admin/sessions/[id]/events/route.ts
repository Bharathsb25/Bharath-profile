import { NextResponse } from "next/server";
import { getSessionEvents } from "@/lib/db/queries/analytics";
import { isUuid } from "@/lib/analytics/validate";

// Auth is enforced by src/proxy.ts for every /api/admin/* route.
// Always re-run against current data — a session's event timeline changes
// as new events come in.
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id)) {
    return NextResponse.json({ error: "Invalid session id" }, { status: 400 });
  }
  try {
    const events = await getSessionEvents(id);
    return NextResponse.json(
      { events },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } },
    );
  } catch (err) {
    console.error("admin session events: query failed", err);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }
}
