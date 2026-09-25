"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { profile } from "@/data/profile";
import { trackEvent } from "@/lib/analytics/track";
import {
  advanceLead,
  LEAD_PROMPTS,
  matchIntent,
  redactQuestion,
  type BotReply,
  type ChatLink,
  type LeadDraft,
  type LeadStep,
} from "@/lib/chat/engine";
import { FALLBACK, INTENTS, WELCOME } from "@/lib/chat/knowledge";

type Msg = BotReply & { id: number; from: "bot" | "user" };

const FORM_NAME = "Portfolio — Chat Assistant";
let nextId = 1;

export default function ChatWidget() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [leadStep, setLeadStep] = useState<LeadStep | null>(null);
  const [draft, setDraft] = useState<LeadDraft>({});
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(true);
  const topics = useRef<Set<string>>(new Set());
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pushBot = useCallback((reply: BotReply) => {
    setMessages((m) => [...m, { ...reply, id: nextId++, from: "bot" }]);
  }, []);

  // Focus the input whenever the panel opens.
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  function toggle() {
    if (!open) {
      trackEvent("cta_click", { label: "Chat — open" });
      setUnread(false);
      if (messages.length === 0) pushBot(WELCOME); // first open → greeting
    }
    setOpen((o) => !o);
  }

  // Keep the newest message in view.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // Esc closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function submitLead(d: LeadDraft, history: Msg[]) {
    trackEvent("form_submit", { label: FORM_NAME });
    const transcript = history
      .filter((m) => m.from === "user")
      .slice(-15)
      .map((m) => `• ${m.text}`)
      .join("\n");
    const data = new FormData();
    data.append("access_key", profile.web3formsKey);
    data.append("subject", "💬 New lead from your portfolio chat assistant");
    data.append("from_name", FORM_NAME);
    data.append("name", d.name ?? "");
    data.append("email", d.email ?? "");
    if (d.phone) data.append("phone", d.phone);
    if (d.company) data.append("company", d.company);
    data.append(
      "message",
      `${d.need ?? ""}\n\n— Topics asked about: ${[...topics.current].join(", ") || "none"}\n— Page: ${pathname}\n\nVisitor's chat messages:\n${transcript}`,
    );
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) throw new Error(json?.message || "submit failed");
      trackEvent("form_success", { label: FORM_NAME });
      pushBot({
        text: `Sent ✅ Thanks, ${d.name?.split(" ")[0] ?? "there"}! ${profile.name.split(" ")[0]} will reply to ${d.email} within 24 hours.`,
        chips: ["What services do you offer?"],
      });
    } catch {
      trackEvent("form_failure", { label: FORM_NAME });
      pushBot({
        text: `Sorry — that didn't go through. Please email ${profile.email} directly, or use the contact form.`,
        links: [
          { label: "Email instead", href: `mailto:${profile.email}` },
          { label: "Contact form", href: "/#contact" },
        ],
      });
    }
  }

  function handle(raw: string, fromChip = false) {
    const text = raw.trim();
    if (!text || typing) return;
    const userMsg: Msg = { id: nextId++, from: "user", text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setTyping(true);

    // Short delay so replies feel conversational rather than instant.
    setTimeout(() => {
      setTyping(false);
      if (leadStep) {
        const r = advanceLead(leadStep, text, draft);
        setDraft(r.draft);
        setLeadStep(r.next);
        if (r.submit) {
          pushBot(r.reply);
          void submitLead(r.draft, history);
        } else {
          pushBot(r.reply);
        }
        return;
      }

      const hit = matchIntent(text, INTENTS);
      const reply = hit?.intent.reply ?? FALLBACK;
      if (hit) topics.current.add(hit.intent.id);
      // Anonymous "what do visitors ask?" analytics (consent-gated inside trackEvent).
      trackEvent("chat_question", {
        label: redactQuestion(text),
        page: pathname,
        metadata: { intent: hit?.intent.id ?? "unanswered", chip: fromChip },
      });
      pushBot(reply);
      if (reply.startLead) {
        trackEvent("form_start", { label: FORM_NAME });
        setDraft({});
        setLeadStep("name");
        pushBot(LEAD_PROMPTS.name);
      }
    }, 350);
  }

  function go(link: ChatLink) {
    trackEvent("nav_click", { label: `Chat — ${link.label}` });
    const [path, hash] = link.href.split("#");
    const samePage = (path || "/") === pathname;
    if (samePage && hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${hash}`);
    } else {
      router.push(link.href);
    }
    // Small screens: get the panel out of the way so they see where they landed.
    if (window.innerWidth < 640) setOpen(false);
  }

  if (pathname.startsWith("/admin")) return null;

  const last = messages[messages.length - 1];
  const chips = last?.from === "bot" && !typing ? last.chips : undefined;

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label={`Chat with ${profile.name.split(" ")[0]}'s assistant`}
          className="card fixed inset-x-3 bottom-20 z-[58] flex max-h-[calc(100dvh-6.5rem)] flex-col overflow-hidden p-0 shadow-2xl sm:inset-x-auto sm:right-5 sm:bottom-24 sm:h-[560px] sm:w-[380px]"
        >
          <header className="accent-bar flex items-center gap-3 px-4 py-3 text-on-accent">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 font-display text-sm font-bold">
              {profile.name.split(" ").map((w) => w[0]).join("")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-bold leading-tight">Ask about my work</p>
              <p className="text-[11px] opacity-85">Instant answers · replies to messages within 24h</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1.5 text-lg leading-none hover:bg-white/15"
            >
              ✕
            </button>
          </header>

          <div ref={listRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div key={m.id} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.from === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-sm accent-bar px-3.5 py-2 text-sm text-on-accent"
                      : "max-w-[90%] rounded-2xl rounded-bl-sm border border-line bg-background px-3.5 py-2.5 text-sm text-foreground"
                  }
                >
                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                  {m.links && m.links.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {m.links.map((l) =>
                        /^(https?:|mailto:)/.test(l.href) || l.href.endsWith(".pdf") ? (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent("link_click", { label: `Chat — ${l.label}` })}
                            className="rounded-full border border-accent/40 px-2.5 py-1 text-xs font-semibold text-accent hover:bg-accent/10"
                          >
                            {l.label} ↗
                          </a>
                        ) : (
                          <button
                            key={l.href}
                            type="button"
                            onClick={() => go(l)}
                            className="rounded-full border border-accent/40 px-2.5 py-1 text-xs font-semibold text-accent hover:bg-accent/10"
                          >
                            {l.label} →
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start" aria-label="Assistant is typing">
                <div className="flex gap-1 rounded-2xl border border-line bg-background px-3.5 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
                      style={{ animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {chips && chips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 border-t border-line px-3 pt-2.5">
              {chips.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handle(c, true)}
                  className="rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/20"
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handle(input);
            }}
            className="flex items-center gap-2 px-3 pt-2.5 pb-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1500}
              type={leadStep === "email" ? "email" : leadStep === "phone" ? "tel" : "text"}
              autoComplete={leadStep === "email" ? "email" : leadStep === "name" ? "name" : leadStep === "phone" ? "tel" : "off"}
              placeholder={leadStep ? "Type your answer…" : "Ask a question…"}
              aria-label="Your message"
              className="min-w-0 flex-1 rounded-full border border-line bg-background px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted/60 focus:border-accent"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full accent-bar text-on-accent disabled:opacity-40"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        aria-expanded={open}
        className="fixed right-4 bottom-4 z-[58] flex h-14 w-14 items-center justify-center rounded-full accent-bar text-on-accent shadow-xl transition-transform hover:-translate-y-0.5 sm:right-5 sm:bottom-5"
      >
        {open ? (
          <span className="text-xl leading-none">✕</span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
            <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" />
          </svg>
        )}
        {unread && !open && (
          <span className="absolute top-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-red-500" aria-hidden="true" />
        )}
      </button>
    </>
  );
}

