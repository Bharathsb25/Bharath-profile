"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { EVENT_NAMES } from "@/lib/analytics/types";

const fieldClass =
  "rounded-lg border border-line bg-background px-3 py-2 text-xs text-foreground outline-none transition-colors focus:border-accent";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [from, setFrom] = useState(searchParams.get("from") ?? "");
  const [to, setTo] = useState(searchParams.get("to") ?? "");
  const [event, setEvent] = useState(searchParams.get("event") ?? "");
  const [page, setPage] = useState(searchParams.get("page") ?? "");
  const [device, setDevice] = useState(searchParams.get("device") ?? "");
  const [country, setCountry] = useState(searchParams.get("country") ?? "");

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (event) params.set("event", event);
    if (page) params.set("page", page);
    if (device) params.set("device", device);
    if (country) params.set("country", country);
    router.push(`/admin/analytics?${params.toString()}`);
  }

  function reset() {
    setFrom("");
    setTo("");
    setEvent("");
    setPage("");
    setDevice("");
    setCountry("");
    router.push("/admin/analytics");
  }

  return (
    <form onSubmit={apply} className="card flex flex-wrap items-end gap-3 p-4">
      <div>
        <label className="mb-1 block text-[11px] font-medium text-muted">From</label>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={fieldClass} />
      </div>
      <div>
        <label className="mb-1 block text-[11px] font-medium text-muted">To</label>
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={fieldClass} />
      </div>
      <div>
        <label className="mb-1 block text-[11px] font-medium text-muted">Event</label>
        <select value={event} onChange={(e) => setEvent(e.target.value)} className={fieldClass}>
          <option value="">All events</option>
          {EVENT_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-[11px] font-medium text-muted">Page</label>
        <input
          type="text"
          placeholder="/services"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          className={`${fieldClass} w-32`}
        />
      </div>
      <div>
        <label className="mb-1 block text-[11px] font-medium text-muted">Device</label>
        <select value={device} onChange={(e) => setDevice(e.target.value)} className={fieldClass}>
          <option value="">All devices</option>
          <option value="desktop">Desktop</option>
          <option value="tablet">Tablet</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-[11px] font-medium text-muted">Country</label>
        <input
          type="text"
          placeholder="IN"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={`${fieldClass} w-20`}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-full accent-bar px-4 py-2 text-xs font-semibold text-on-accent"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
