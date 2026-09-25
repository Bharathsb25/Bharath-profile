/* ---------------------------------------------------------------
   Chat assistant engine — pure functions, no React, no network.

   Rule-based on purpose: it answers from the site's own content
   (see knowledge.ts), costs nothing to run, needs no API key, and
   can't invent facts. Keeping it pure means it's unit-testable
   (tests/chat/engine.test.ts).
---------------------------------------------------------------- */

export type ChatLink = { label: string; href: string };

export type BotReply = {
  text: string;
  links?: ChatLink[];
  chips?: string[];
  /** Kick off the conversational lead form after this reply. */
  startLead?: boolean;
};

export type Intent = {
  id: string;
  /** Lower-case keywords/phrases. Multi-word phrases score higher. */
  keywords: string[];
  reply: BotReply;
};

export function normalize(input: string): string {
  return ` ${input
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9₹+@.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

/** Score = sum of word-count of every keyword found as a whole word/phrase. */
export function scoreIntent(normalized: string, intent: Intent): number {
  let score = 0;
  for (const kw of intent.keywords) {
    const k = kw.trim().toLowerCase();
    if (!k) continue;
    // Keywords ending in "*" match as a prefix (automat* → automate, automation).
    const hit = k.endsWith("*")
      ? normalized.includes(` ${k.slice(0, -1)}`)
      : normalized.includes(` ${k} `);
    if (hit) score += k.replace("*", "").split(" ").length;
  }
  return score;
}

export function matchIntent(
  input: string,
  intents: Intent[],
): { intent: Intent; score: number } | null {
  const n = normalize(input);
  let best: { intent: Intent; score: number } | null = null;
  for (const intent of intents) {
    const score = scoreIntent(n, intent);
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }
  return best;
}

/**
 * Makes a visitor's typed question safe to store for "what do people ask?"
 * analytics: strips emails, phone/long numbers and URLs, collapses whitespace,
 * caps length. Lead-form answers are never passed through here — only
 * questions typed while not in the lead flow.
 */
export function redactQuestion(input: string, maxLen = 200): string {
  return input
    .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, "[email]")
    .replace(/https?:\/\/\S+|www\.\S+/gi, "[link]")
    .replace(/\+?\d[\d\s().-]{6,}\d/g, "[number]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

/* ---------------- Lead capture state machine ---------------- */

export type LeadDraft = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  need?: string;
};

export type LeadStep = "name" | "email" | "phone" | "company" | "need";

export type LeadResult = {
  draft: LeadDraft;
  /** null = flow finished (sent or cancelled). */
  next: LeadStep | null;
  reply: BotReply;
  submit?: boolean;
  cancelled?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;
const SKIP_RE = /^(skip|no|nope|none|na|n\/a|-|later|not now)$/i;
const CANCEL_RE = /^(cancel|stop|exit|quit|never ?mind|forget it)$/i;

/** Required questions end with " *". Optional ones just offer a Skip chip. */
export const LEAD_PROMPTS: Record<LeadStep, BotReply> = {
  name: { text: "Your name (min 2 characters) *", chips: ["Cancel"] },
  email: { text: "Your email address *", chips: ["Cancel"] },
  phone: { text: "Phone / WhatsApp number", chips: ["Skip", "Cancel"] },
  company: { text: "Company / organisation", chips: ["Skip", "Cancel"] },
  need: { text: "What do you need help with, or which role are you hiring for? (min 3 characters) *", chips: ["Cancel"] },
};

export function summarizeLead(d: LeadDraft): string {
  return [
    `Name: ${d.name ?? "—"}`,
    `Email: ${d.email ?? "—"}`,
    `Phone: ${d.phone || "—"}`,
    `Company: ${d.company || "—"}`,
    `Need: ${d.need ?? "—"}`,
  ].join("\n");
}

export function advanceLead(step: LeadStep, raw: string, draft: LeadDraft): LeadResult {
  const input = raw.trim();

  if (CANCEL_RE.test(input)) {
    return {
      draft: {},
      next: null,
      cancelled: true,
      reply: {
        text: "No problem — nothing was sent. Ask me anything else whenever you like.",
        chips: ["What services do you offer?", "Talk to Bharath"],
      },
    };
  }

  switch (step) {
    case "name": {
      if (input.length < 2 || input.length > 80) {
        return { draft, next: "name", reply: { text: "Name must be 2–80 characters. Please try again *", chips: ["Cancel"] } };
      }
      return { draft: { ...draft, name: input }, next: "email", reply: LEAD_PROMPTS.email };
    }
    case "email": {
      if (!EMAIL_RE.test(input)) {
        return {
          draft,
          next: "email",
          reply: { text: "Please enter a valid email, e.g. you@company.com *", chips: ["Cancel"] },
        };
      }
      return { draft: { ...draft, email: input }, next: "phone", reply: LEAD_PROMPTS.phone };
    }
    case "phone": {
      if (SKIP_RE.test(input)) return { draft: { ...draft, phone: "" }, next: "company", reply: LEAD_PROMPTS.company };
      if (!PHONE_RE.test(input)) {
        return {
          draft,
          next: "phone",
          reply: { text: "Please enter digits only (with country code if outside India), or tap Skip.", chips: ["Skip", "Cancel"] },
        };
      }
      return { draft: { ...draft, phone: input }, next: "company", reply: LEAD_PROMPTS.company };
    }
    case "company": {
      const company = SKIP_RE.test(input) ? "" : input.slice(0, 120);
      return { draft: { ...draft, company }, next: "need", reply: LEAD_PROMPTS.need };
    }
    case "need": {
      if (input.length < 3) {
        return { draft, next: "need", reply: { text: "Please write at least 3 characters about what you need *", chips: ["Cancel"] } };
      }
      // Last answer → send straight away, no confirm step.
      return { draft: { ...draft, need: input.slice(0, 1500) }, next: null, submit: true, reply: { text: "Sending…" } };
    }
  }
}
