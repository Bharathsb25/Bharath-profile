import { test } from "node:test";
import assert from "node:assert/strict";
import { isBotUserAgent } from "../../src/lib/analytics/botDetect.ts";

test("flags missing or empty user agents as bots", () => {
  assert.equal(isBotUserAgent(null), true);
  assert.equal(isBotUserAgent(undefined), true);
  assert.equal(isBotUserAgent(""), true);
  assert.equal(isBotUserAgent("   "), true);
});

test("flags known bot/crawler/tooling signatures", () => {
  assert.equal(isBotUserAgent("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"), true);
  assert.equal(isBotUserAgent("curl/8.4.0"), true);
  assert.equal(isBotUserAgent("python-requests/2.31.0"), true);
  assert.equal(isBotUserAgent("Mozilla/5.0 (compatible; AhrefsBot/7.0)"), true);
  assert.equal(isBotUserAgent("PostmanRuntime/7.32.3"), true);
  assert.equal(isBotUserAgent("Mozilla/5.0 HeadlessChrome/120.0"), true);
});

test("allows real browser user agents", () => {
  const chrome =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
  const safari =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
  assert.equal(isBotUserAgent(chrome), false);
  assert.equal(isBotUserAgent(safari), false);
});
