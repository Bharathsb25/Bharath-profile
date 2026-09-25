import { test } from "node:test";
import assert from "node:assert/strict";
import { advanceLead, LEAD_PROMPTS, matchIntent, normalize, redactQuestion } from "../../src/lib/chat/engine.ts";
import { INTENTS, WELCOME, FALLBACK } from "../../src/lib/chat/knowledge.ts";

const idFor = (q: string) => matchIntent(q, INTENTS)?.intent.id ?? null;

test("normalize lower-cases, strips punctuation and pads with spaces", () => {
  assert.equal(normalize("  What's the PRICE?! "), " whats the price ");
});

test("routes common visitor questions to the right intent", () => {
  const cases: [string, string][] = [
    ["What services do you offer?", "services"],
    ["How much does a website cost?", "pricing"],
    ["Our admissions CRM for the college is a mess", "education-crm"],
    ["our rollout is stuck and behind schedule", "rescue"],
    ["Can you build a Power BI dashboard?", "dashboards"],
    ["DLT registration for SMS", "dlt"],
    ["We are hiring for a full time role", "hiring"],
    ["Can I download your resume", "cv"],
    ["Get a quote", "lead"],
    ["Talk to Bharath", "lead"],
    ["show me around", "navigate"],
    ["how long does it take?", "timeline"],
    ["I need a website for my clinic", "website"],
    ["can you automate our manual workflow", "automation"],
    ["hello", "greeting"],
    ["where are you based", "location"],
  ];
  for (const [q, id] of cases) assert.equal(idFor(q), id, `"${q}"`);
});

test("gibberish returns no match (widget shows fallback)", () => {
  assert.equal(idFor("qwzx plorp"), null);
  assert.ok(FALLBACK.text.length > 0 && WELCOME.chips?.length);
});

test("every intent reply is non-empty and links are relative paths or known schemes", () => {
  for (const i of INTENTS) {
    assert.ok(i.reply.text.trim().length > 0, i.id);
    for (const l of i.reply.links ?? []) assert.match(l.href, /^(\/|mailto:|https:\/\/)/, `${i.id} ${l.href}`);
  }
});

test("lead flow collects, validates and submits after the last answer (no confirm step)", () => {
  let r = advanceLead("name", "Priya", {});
  assert.equal(r.next, "email");
  r = advanceLead("email", "not-an-email", r.draft);
  assert.equal(r.next, "email", "invalid email re-asks");
  r = advanceLead("email", "priya@acme.in", r.draft);
  assert.equal(r.next, "phone");
  r = advanceLead("phone", "Skip", r.draft);
  assert.equal(r.next, "company");
  assert.equal(r.draft.phone, "");
  r = advanceLead("company", "Acme School", r.draft);
  r = advanceLead("need", "Admissions CRM setup before June", r.draft);
  assert.equal(r.submit, true);
  assert.equal(r.next, null);
  assert.deepEqual(r.draft, {
    name: "Priya", email: "priya@acme.in", phone: "", company: "Acme School", need: "Admissions CRM setup before June",
  });
});

test("required prompts carry *, optional ones don't say optional", () => {
  assert.match(LEAD_PROMPTS.name.text, /\*$/);
  assert.match(LEAD_PROMPTS.email.text, /\*$/);
  assert.match(LEAD_PROMPTS.need.text, /\*$/);
  for (const k of ["phone", "company"] as const) {
    assert.doesNotMatch(LEAD_PROMPTS[k].text, /\*|optional/i);
    assert.ok(LEAD_PROMPTS[k].chips?.includes("Skip"));
  }
});

test("lead flow can be cancelled at any step", () => {
  const c = advanceLead("email", "cancel", { name: "A" });
  assert.equal(c.cancelled, true);
  assert.equal(c.next, null);
});

test("phone validation rejects letters", () => {
  assert.equal(advanceLead("phone", "call me", {}).next, "phone");
  assert.equal(advanceLead("phone", "+91 99449 79507", {}).next, "company");
});

test("redactQuestion strips emails, phone numbers and links before storing", () => {
  assert.equal(
    redactQuestion("mail me at priya@acme.in or call +91 99449 79507, see https://acme.in/x"),
    "mail me at [email] or call [number], see [link]",
  );
  assert.equal(redactQuestion("  do   you do   Zoho CRM?  "), "do you do Zoho CRM?");
  assert.equal(redactQuestion("x".repeat(500)).length, 200);
  assert.equal(redactQuestion("price for 3 pages in 2026"), "price for 3 pages in 2026", "short numbers kept");
});
