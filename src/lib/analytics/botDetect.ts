// Common bot/crawler/tooling signatures in the User-Agent string. Not
// exhaustive (no UA sniffing ever is) — good enough to keep obvious
// non-human traffic out of the dashboard's totals.
const BOT_PATTERNS = [
  /bot/i,
  /crawl/i,
  /spider/i,
  /slurp/i,
  /headless/i,
  /phantom/i,
  /puppeteer/i,
  /playwright/i,
  /selenium/i,
  /curl\//i,
  /wget\//i,
  /python-requests/i,
  /python-urllib/i,
  /axios\//i,
  /node-fetch/i,
  /go-http-client/i,
  /java\//i,
  /postman/i,
  /insomnia/i,
  /facebookexternalhit/i,
  /whatsapp/i,
  /telegrambot/i,
  /discordbot/i,
  /slackbot/i,
  /linkedinbot/i,
  /twitterbot/i,
  /pingdom/i,
  /uptimerobot/i,
  /ahrefsbot/i,
  /semrushbot/i,
  /mj12bot/i,
  /dotbot/i,
  /petalbot/i,
  /bytespider/i,
  /gptbot/i,
  /ccbot/i,
  /anthropic/i,
  /claudebot/i,
];

/** True for a missing/empty UA, or one matching a known bot/tooling signature. */
export function isBotUserAgent(userAgent: string | null | undefined): boolean {
  if (!userAgent || userAgent.trim().length === 0) return true;
  return BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}
