"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setError(json?.error ?? "Login failed");
        setLoading(false);
        return;
      }
      const next = searchParams.get("next") || "/admin/analytics";
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm p-8">
        <h1 className="font-display text-lg font-bold text-foreground">
          Admin sign in
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          Visitor analytics dashboard — authorized access only.
        </p>

        <label
          htmlFor="admin-password"
          className="mb-1 mt-6 block text-xs font-medium text-muted"
        >
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-line bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
        />

        {error && (
          <p className="mt-3 text-xs text-red-600 dark:text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || password.length === 0}
          className="mt-5 w-full rounded-full accent-bar px-6 py-2.5 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
