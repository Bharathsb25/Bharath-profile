import { NextResponse } from "next/server";
import {
  getQuestionGroups,
  getQuestionLog,
  getQuestionTopicCounts,
  parseQuestionFilters,
} from "@/lib/db/queries/insights";
import { buildXlsx } from "@/lib/xlsx";

const MAX_ROWS = 10_000;
const topicName = (id: string) => (id === "unanswered" ? "Unanswered" : id.replace(/-/g, " "));

// Auth is enforced by src/proxy.ts for every /api/admin/* route.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const filters = parseQuestionFilters((k) => url.searchParams.get(k));

  try {
    const [log, groups, topics] = await Promise.all([
      getQuestionLog(filters, MAX_ROWS, 0),
      getQuestionGroups(filters, 5000),
      getQuestionTopicCounts(filters),
    ]);
    const total = topics.reduce((a, t) => a + t.count, 0);

    const file = buildXlsx([
      {
        name: "Questions",
        columns: [
          { header: "Asked at (IST)", width: 18 },
          { header: "Question", width: 60 },
          { header: "Topic", width: 18 },
          { header: "Answered", width: 11 },
          { header: "Via button", width: 11 },
          { header: "Page", width: 16 },
          { header: "Country", width: 10 },
          { header: "City", width: 16 },
          { header: "Device", width: 10 },
          { header: "Session", width: 38 },
        ],
        rows: log.rows.map((r) => [
          new Date(r.askedAt),
          r.question,
          topicName(r.topic),
          r.answered ? "Yes" : "No",
          r.viaButton ? "Yes" : "No",
          r.page,
          r.country,
          r.city,
          r.device,
          r.sessionId,
        ]),
      },
      {
        name: "Top questions",
        columns: [
          { header: "Question", width: 60 },
          { header: "Times asked", width: 12 },
          { header: "Topic", width: 18 },
          { header: "Answered", width: 11 },
          { header: "First asked (IST)", width: 18 },
          { header: "Last asked (IST)", width: 18 },
        ],
        rows: groups.map((g) => [
          g.question,
          g.count,
          topicName(g.topic),
          g.topic === "unanswered" ? "No" : "Yes",
          new Date(g.firstAsked),
          new Date(g.lastAsked),
        ]),
      },
      {
        name: "Topics",
        columns: [
          { header: "Topic", width: 22 },
          { header: "Questions", width: 12 },
          { header: "Share %", width: 10 },
        ],
        rows: topics.map((t) => [topicName(t.label), t.count, total ? Math.round((t.count / total) * 1000) / 10 : 0]),
      },
    ]);

    return new NextResponse(file as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="visitor-questions-${new Date().toISOString().slice(0, 10)}.xlsx"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("questions export: failed", err);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
