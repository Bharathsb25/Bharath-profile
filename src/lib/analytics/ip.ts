import { createCipheriv, createDecipheriv, createHmac, randomBytes } from "node:crypto";

/** HMAC-SHA256 of the raw IP — always computed, never reversible. Used as the join key for geo/rate-limit without storing the IP itself. */
export function hashIp(ip: string, secret: string): string {
  return createHmac("sha256", secret).update(ip).digest("hex");
}

/**
 * AES-256-GCM encrypt the raw IP. Only ever called when
 * ANALYTICS_STORE_RAW_IP=true — the result is stored in the admin-only
 * `ip_encrypted` column and purged by the retention job like everything else.
 * Returns base64(iv[12] + authTag[16] + ciphertext).
 */
export function encryptIp(ip: string, keyHex: string): string {
  const key = Buffer.from(keyHex, "hex");
  if (key.length !== 32) {
    throw new Error("ANALYTICS_IP_ENCRYPTION_KEY must be 32 bytes (64 hex chars)");
  }
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(ip, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, ciphertext]).toString("base64");
}

/** Reverses encryptIp — for admin-only tooling, never used in a request path that returns data to visitors. */
export function decryptIp(encrypted: string, keyHex: string): string {
  const key = Buffer.from(keyHex, "hex");
  const raw = Buffer.from(encrypted, "base64");
  const iv = raw.subarray(0, 12);
  const authTag = raw.subarray(12, 28);
  const ciphertext = raw.subarray(28);
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
}

/** Reads the real client IP from Vercel's forwarding headers. Server-only — never trust a client-supplied IP field. */
export function extractClientIp(headers: Headers): string | null {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return null;
}
