import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createSessionToken,
  verifySessionToken,
  passwordsMatch,
  SESSION_TTL_SECONDS,
} from "../../src/lib/auth/session.ts";

test("a freshly created token verifies successfully", () => {
  const token = createSessionToken("secret");
  assert.equal(verifySessionToken(token, "secret"), true);
});

test("a token fails verification with the wrong secret", () => {
  const token = createSessionToken("secret-a");
  assert.equal(verifySessionToken(token, "secret-b"), false);
});

test("rejects a tampered payload even if the signature format looks right", () => {
  const token = createSessionToken("secret");
  const [, signature] = token.split(".");
  const forgedPayload = Buffer.from(JSON.stringify({ admin: true, iat: 0 })).toString("base64url");
  assert.equal(verifySessionToken(`${forgedPayload}.${signature}`, "secret"), false);
});

test("rejects malformed tokens", () => {
  assert.equal(verifySessionToken(undefined, "secret"), false);
  assert.equal(verifySessionToken("", "secret"), false);
  assert.equal(verifySessionToken("not-a-valid-token", "secret"), false);
  assert.equal(verifySessionToken("a.b.c", "secret"), false);
});

test("expires after the session TTL", () => {
  const issuedAt = Date.now();
  const token = createSessionToken("secret", issuedAt);
  const justBeforeExpiry = issuedAt + SESSION_TTL_SECONDS * 1000 - 1000;
  const justAfterExpiry = issuedAt + SESSION_TTL_SECONDS * 1000 + 1000;
  assert.equal(verifySessionToken(token, "secret", justBeforeExpiry), true);
  assert.equal(verifySessionToken(token, "secret", justAfterExpiry), false);
});

test("passwordsMatch compares correctly regardless of length differences", () => {
  assert.equal(passwordsMatch("correct-horse", "correct-horse"), true);
  assert.equal(passwordsMatch("wrong", "correct-horse"), false);
  assert.equal(passwordsMatch("", "correct-horse"), false);
});
