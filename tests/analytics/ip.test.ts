import { test } from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { hashIp, encryptIp, decryptIp, extractClientIp } from "../../src/lib/analytics/ip.ts";

test("hashIp is deterministic and irreversible-looking (hex digest, not the IP)", () => {
  const secret = "test-secret";
  const a = hashIp("203.0.113.42", secret);
  const b = hashIp("203.0.113.42", secret);
  assert.equal(a, b);
  assert.equal(/^[0-9a-f]{64}$/.test(a), true);
  assert.notEqual(a, "203.0.113.42");
});

test("hashIp differs for different IPs or different secrets", () => {
  const a = hashIp("203.0.113.42", "secret-1");
  const b = hashIp("203.0.113.99", "secret-1");
  const c = hashIp("203.0.113.42", "secret-2");
  assert.notEqual(a, b);
  assert.notEqual(a, c);
});

test("encryptIp/decryptIp round-trips the original IP", () => {
  const key = randomBytes(32).toString("hex");
  const encrypted = encryptIp("198.51.100.7", key);
  assert.notEqual(encrypted, "198.51.100.7");
  assert.equal(decryptIp(encrypted, key), "198.51.100.7");
});

test("decryptIp fails with the wrong key", () => {
  const key = randomBytes(32).toString("hex");
  const wrongKey = randomBytes(32).toString("hex");
  const encrypted = encryptIp("198.51.100.7", key);
  assert.throws(() => decryptIp(encrypted, wrongKey));
});

test("encryptIp rejects a key of the wrong length", () => {
  assert.throws(() => encryptIp("198.51.100.7", "too-short"));
});

test("extractClientIp reads the first entry of x-forwarded-for", () => {
  const headers = new Headers({ "x-forwarded-for": "203.0.113.5, 70.41.3.18, 150.172.238.178" });
  assert.equal(extractClientIp(headers), "203.0.113.5");
});

test("extractClientIp falls back to x-real-ip", () => {
  const headers = new Headers({ "x-real-ip": "203.0.113.9" });
  assert.equal(extractClientIp(headers), "203.0.113.9");
});

test("extractClientIp returns null when no IP header is present", () => {
  assert.equal(extractClientIp(new Headers()), null);
});
