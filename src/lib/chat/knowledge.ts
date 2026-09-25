/* ---------------------------------------------------------------
   What the chat assistant knows. Answers are built from the same
   data files the pages render (profile.ts, businessCopy.ts), so
   editing site content updates the bot too.

   To teach it something new: add an Intent below — a few keywords
   and a reply. Multi-word keywords outrank single words; a trailing
   "*" matches word prefixes (automat* → automate / automation).
---------------------------------------------------------------- */
import {
  profile,
  services,
  freelance,
  experience,
  education,
  certifications,
} from "../../data/profile.ts";
import { businessCopy } from "../../data/businessCopy.ts";
import type { BotReply, ChatLink, Intent } from "./engine.ts";

const biz = businessCopy.en;
const firstName = profile.name.split(" ")[0];

const L = {
  home: { label: "Home", href: "/#top" },
  about: { label: "About", href: "/#about" },
  services: { label: "Services", href: "/#services" },
  skills: { label: "Skills", href: "/#skills" },
  experience: { label: "Experience", href: "/#experience" },
  projects: { label: "Case study", href: "/#projects" },
  education: { label: "Education & certs", href: "/#education" },
  blog: { label: "Blog", href: "/#blog" },
  contact: { label: "Contact form", href: "/#contact" },
  freelance: { label: "Freelance packages", href: "/freelance#packages" },
  freelanceFaq: { label: "Freelance FAQ", href: "/freelance#faq" },
  freelanceProcess: { label: "How we work", href: "/freelance#process" },
  business: { label: "Small-business services", href: "/services" },
  websites: { label: "Website plans & pricing", href: "/services#websites" },
  catalogue: { label: "Full service catalogue", href: "/services#catalogue" },
  samples: { label: "Sample research reports", href: "/samples" },
  linkedin: { label: "LinkedIn", href: profile.linkedin },
  email: { label: `Email ${firstName}`, href: `mailto:${profile.email}` },
} satisfies Record<string, ChatLink>;

const bullets = (items: string[]) => items.map((s) => `• ${s}`).join("\n");
const findService = (needle: string) =>
  services.find((s) => s.title.toLowerCase().includes(needle.toLowerCase()));
const svc = (needle: string, extra = ""): string => {
  const s = findService(needle);
  return s ? `${s.title}\n${s.desc}${extra ? `\n\n${extra}` : ""}` : extra;
};

export const DEFAULT_CHIPS = [
  "What services do you offer?",
  "Pricing",
  "I'm hiring — experience?",
  "Get a quote",
];

export const WELCOME: BotReply = {
  text: `Hi! I'm ${firstName}'s assistant 👋\nAsk me about services, pricing, experience or availability — or I can take your details so ${firstName} gets back to you within 24 hours.`,
  chips: DEFAULT_CHIPS,
};

export const FALLBACK: BotReply = {
  text: `I'm not sure I understood that. I can help with services, pricing, experience, skills, the case study, or passing your message to ${firstName}.`,
  chips: ["What services do you offer?", "Show me around", "Talk to Bharath"],
};

const websiteTiers = biz.websites.tiers
  .map((t) => `• ${t.name} — ${t.price} · ${t.timeline}`)
  .join("\n");

export const INTENTS: Intent[] = [
  /* ---------- lead capture triggers (highest priority phrases) ---------- */
  {
    id: "lead",
    keywords: [
      "get a quote", "quote", "talk to bharath", "talk to you", "book a call", "book",
      "consultation", "call back", "callback", "contact me", "reach me", "leave my details",
      "leave details", "hire you", "work with you", "get in touch",
      "schedule", "meeting", "enquiry", "inquiry",
    ],
    reply: {
      text: `Happy to connect you. A few quick questions (* = required) and they go straight to ${firstName} — he replies within 24 hours.\nYour details are only used to get back to you — never shared or used for marketing.`,
      links: [{ label: "Privacy policy", href: "/privacy" }],
      startLead: true,
    },
  },

  /* ---------- greetings & small talk ---------- */
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "hii", "vanakkam", "good morning", "good afternoon", "good evening", "namaste"],
    reply: WELCOME,
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "thx", "great", "cool", "awesome", "bye", "goodbye"],
    reply: {
      text: `You're welcome! If you'd like ${firstName} to follow up, just say "get a quote" or "talk to Bharath".`,
      chips: ["Talk to Bharath", "What services do you offer?"],
    },
  },
  {
    id: "bot",
    keywords: ["are you a bot", "are you human", "who are you", "real person", "chatbot"],
    reply: {
      text: `I'm a simple assistant that answers from this site's content. For anything specific, I can pass your message to ${firstName} himself.`,
      chips: ["Talk to Bharath"],
    },
  },

  /* ---------- navigation ---------- */
  {
    id: "navigate",
    keywords: ["show me around", "navigate", "menu", "sections", "pages", "site map", "sitemap", "where can i", "go to", "take me", "where is"],
    reply: {
      text: "Here's where everything lives — tap to jump there:",
      links: [L.about, L.services, L.experience, L.projects, L.skills, L.education, L.blog, L.freelance, L.business, L.samples, L.contact],
    },
  },

  /* ---------- services overview ---------- */
  {
    id: "services",
    keywords: ["services", "service", "offer", "offering", "what do you do", "what can you do", "provide", "solutions", "capabilities"],
    reply: {
      text: `${firstName} offers two tracks:\n\nFor SaaS & education teams\n${bullets(services.map((s) => s.title))}\n\nFor small & local businesses\n${bullets(biz.categories.map((c) => `${c.title} — ${c.items.slice(0, 3).map((i) => i.title.split(" — ")[0].split(" (")[0]).join(", ")}…`))}\n\nAsk about any one of these for details.`,
      links: [L.services, L.freelance, L.business],
      chips: ["Education CRM", "Implementation rescue", "Website pricing", "Get a quote"],
    },
  },

  /* ---------- individual services ---------- */
  {
    id: "education-crm",
    keywords: ["education crm", "admission*", "school", "schools", "college", "colleges", "university", "edtech", "ed-tech", "enquiry to enrollment", "counselor", "counsellor", "leadsquared", "enrollment", "enrolment", "students"],
    reply: {
      text: svc("Education CRM", `Packaged as the "${freelance.packages[0].name}" — ${freelance.packages[0].timeline}, ${freelance.packages[0].price.toLowerCase()}.`),
      links: [L.freelance, L.services],
      chips: ["Get a quote", "Pricing"],
    },
  },
  {
    id: "rescue",
    keywords: ["rescue", "stuck", "stalled", "delayed", "slipping", "failing", "failed", "over budget", "go-live", "go live", "behind schedule", "gone quiet"],
    reply: {
      text: svc("Implementation Rescue", "Starts with a 1-week diagnostic, then a fixed quote to get you to go-live."),
      links: [L.freelance],
      chips: ["Get a quote", "How does it work?"],
    },
  },
  {
    id: "fractional",
    keywords: ["fractional", "retainer", "part time", "part-time", "monthly", "few days a month", "implementation manager"],
    reply: { text: svc("Fractional"), links: [L.freelance], chips: ["Pricing", "Get a quote"] },
  },
  {
    id: "onboarding",
    keywords: ["onboarding", "client onboarding", "intake", "sla", "escalation"],
    reply: { text: svc("Onboarding"), links: [L.projects, L.services], chips: ["See the case study", "Get a quote"] },
  },
  {
    id: "automation",
    keywords: ["automat*", "workflow*", "manual work", "spreadsheet*", "repetitive", "chasing", "reminders", "zapier", "email automation", "ai", "claude", "chatgpt"],
    reply: {
      text: svc("Business Process Automation", `Packaged as "${freelance.packages[2].name}" — ${freelance.packages[2].timeline}.`),
      links: [L.freelance, L.catalogue],
      chips: ["Get a quote", "See the case study"],
    },
  },
  {
    id: "testing",
    keywords: ["testing", "test", "uat", "qa", "quality", "regression", "bugs", "defects", "postman", "api testing"],
    reply: { text: svc("Testing"), links: [L.services, L.experience], chips: ["Get a quote"] },
  },
  {
    id: "dashboards",
    keywords: ["power bi", "powerbi", "dashboard*", "report", "reports", "reporting", "mis", "analytics", "data analysis", "excel", "forecast*", "budgeting"],
    reply: { text: svc("Dashboards"), links: [L.services, L.catalogue], chips: ["Get a quote"] },
  },
  {
    id: "dlt",
    keywords: ["dlt", "trai", "sms", "whatsapp", "template approval", "sender id", "gateway"],
    reply: { text: svc("DLT"), links: [L.services, L.catalogue], chips: ["Get a quote"] },
  },
  {
    id: "crm-setup",
    keywords: ["crm", "zoho", "hubspot", "freshsales", "erp", "inventory", "migration", "migrate", "payment gateway", "razorpay", "payu", "stripe"],
    reply: {
      text: `Yes — CRM setup & migration (Zoho, HubSpot, Freshsales, LeadSquared), ERP & inventory setup, data migration and payment-gateway integration (Razorpay, PayU, Stripe) are all on the menu.\n\nFor education institutions there's a dedicated admissions-CRM package.`,
      links: [L.catalogue, L.freelance],
      chips: ["Education CRM", "Get a quote"],
    },
  },
  {
    id: "website",
    keywords: ["website", "web site", "webpage", "landing page", "web design", "site for", "online presence", "domain", "hosting"],
    reply: {
      text: `Website plans:\n${websiteTiers}\n\n${biz.websites.guarantee}`,
      links: [L.websites],
      chips: ["Get a quote", "Other small-business services"],
    },
  },
  {
    id: "small-business",
    keywords: ["small business", "shop", "clinic", "local business", "startup", "logo", "branding", "brand", "custom software", "app", "pitch deck", "social media", "package design", "other small-business services"],
    reply: {
      text: `${biz.hero.headline} ${biz.hero.headlineAccent}\n\n${biz.categories.map((c) => `${c.title}\n${bullets(c.items.map((i) => i.title.split(" — ")[0]))}`).join("\n\n")}`,
      links: [L.business, L.catalogue],
      chips: ["Website pricing", "Get a quote"],
    },
  },

  /* ---------- commercial ---------- */
  {
    id: "pricing",
    keywords: ["price", "prices", "pricing", "cost", "costs", "rate", "rates", "charge", "charges", "budget", "how much", "fees", "expensive", "cheap", "₹", "inr", "usd"],
    reply: {
      text: `Everything is fixed-price, agreed in writing before work starts — no hourly surprises.\n\n• Websites: ${biz.websites.tiers.map((t) => `${t.name} ${t.price}`).join(" · ")}\n• Freelance projects: ${freelance.packages.map((p) => `${p.name} (${p.price.toLowerCase()})`).join("; ")}\n\nThe fastest way to a number is a free 30-min scoping call.`,
      links: [L.websites, L.freelance],
      chips: ["Get a quote", "How long does it take?"],
    },
  },
  {
    id: "timeline",
    keywords: ["how long", "timeline", "duration", "turnaround", "deadline", "how soon", "how fast", "urgent", "asap", "how long does it take"],
    reply: {
      text: `Typical timelines:\n${bullets([
        ...biz.websites.tiers.map((t) => `${t.name} website: ${t.timeline}`),
        ...freelance.packages.map((p) => `${p.name}: ${p.timeline}`),
      ])}\n\nYou get the timeline in writing with the quote.`,
      chips: ["Get a quote", "Pricing"],
    },
  },
  {
    id: "process",
    keywords: ["process", "how does it work", "how do we start", "steps", "get started", "next steps", "engagement", "how do you work"],
    reply: {
      text: bullets(freelance.process.map((p, i) => `${i + 1}. ${p.title} — ${p.desc}`)),
      links: [L.freelanceProcess],
      chips: ["Get a quote", "Pricing"],
    },
  },
  {
    id: "nda",
    keywords: ["nda", "confidential", "confidentiality", "security", "data access", "privacy", "gdpr"],
    reply: {
      text: freelance.faqs.find((f) => /nda/i.test(f.q))?.a ?? "Happy to sign an NDA before we discuss specifics.",
      links: [{ label: "Privacy policy", href: "/privacy" }],
      chips: ["Get a quote"],
    },
  },
  {
    id: "support",
    keywords: ["support", "maintenance", "after handover", "changes later", "ongoing", "warranty"],
    reply: {
      text: biz.faq.items.find((f) => /ongoing support/i.test(f.q))?.a ?? "Every project includes a support window after handover.",
      chips: ["Get a quote"],
    },
  },

  /* ---------- hiring / career ---------- */
  {
    id: "hiring",
    keywords: ["hiring", "hire", "full time", "full-time", "job", "role", "position", "opening", "recruiter", "recruiting", "vacancy", "notice period", "joining", "join", "available", "availability", "ctc", "salary", "relocate", "relocation"],
    reply: {
      text: `${profile.availability}\n\n${firstName} is an ${profile.title} with 4+ years in SaaS implementation, CRM delivery, testing and client onboarding — based in ${profile.location}.`,
      links: [L.experience, L.projects, L.linkedin],
      chips: ["Experience", "Skills", "Talk to Bharath"],
    },
  },
  {
    id: "experience",
    keywords: ["experience", "background", "career", "worked", "work history", "companies", "previous", "meritto", "octoze", "years"],
    reply: {
      text: `${bullets(experience.map((e) => `${e.role} — ${e.company} (${e.period})`))}`,
      links: [L.experience, L.projects],
      chips: ["Skills", "Case study", "Talk to Bharath"],
    },
  },
  {
    id: "cv",
    keywords: ["cv", "resume", "résumé", "download", "pdf"],
    reply: {
      text: `The CV isn't published on the site — ${firstName} shares it directly. Leave your details and he'll send it over, or see his experience and LinkedIn below.`,
      links: [L.experience, L.linkedin],
      chips: ["Talk to Bharath", "Experience"],
    },
  },
  {
    id: "skills",
    keywords: ["skills", "skill", "tools", "tech", "stack", "technologies", "platforms", "software", "jira", "freshdesk", "sql", "expertise"],
    reply: {
      text: `Core areas: SaaS implementation, education CRM & admissions, client onboarding, functional & UAT testing, API/webhook validation (Postman), workflow automation with AI tools, and Power BI reporting.\nTools include Jira, Freshdesk, LeadSquared, Postman, Power BI and SMS/WhatsApp gateways.`,
      links: [L.skills],
      chips: ["Experience", "Case study"],
    },
  },
  {
    id: "projects",
    keywords: ["project", "projects", "case study", "portfolio", "work samples", "examples", "previous work"],
    reply: {
      text: `Featured case study: Automated Client Onboarding & Implementation Workflow — a self-service intake wizard, auto-task activation and a tiered SLA escalation ladder replacing manual status-chasing.\nThere are also sample IPO research reports.`,
      links: [L.projects, L.samples],
      chips: ["Get a quote", "Experience"],
    },
  },
  {
    id: "samples",
    keywords: ["ipo", "research", "stock", "stocks", "investment", "sample reports", "financial analysis", "shiprocket"],
    reply: {
      text: "Sample IPO validation reports are published as worked examples of research and financial analysis (educational only — not investment advice).",
      links: [L.samples],
    },
  },
  {
    id: "education",
    keywords: ["education", "degree", "mba", "qualification", "studied", "certification", "certifications", "certificate", "certificates", "certified"],
    reply: {
      text: `${bullets(education.map((e) => `${e.degree} — ${e.school} (${e.period})`))}\n\nCertifications: ${certifications.map((c) => c.name).join(", ")}`,
      links: [L.education],
    },
  },
  {
    id: "blog",
    keywords: ["blog", "article", "articles", "posts", "writing"],
    reply: { text: `${firstName} writes about business growth, automation and AI for business owners.`, links: [L.blog] },
  },
  {
    id: "about",
    keywords: ["about bharath", "about you", "about him", "who is", "who is bharath", "introduce", "summary"],
    reply: { text: profile.tagline, links: [L.about, L.experience], chips: ["What services do you offer?", "Experience"] },
  },

  /* ---------- contact basics ---------- */
  {
    id: "contact",
    keywords: ["contact", "email", "mail", "phone", "number", "call", "linkedin", "reach", "whatsapp number"],
    reply: {
      text: `Email: ${profile.email}\nLinkedIn is below. Or I can take your details right here and ${firstName} will reply within 24 hours.`,
      links: [L.email, L.linkedin, L.contact],
      chips: ["Talk to Bharath"],
    },
  },
  {
    id: "location",
    keywords: ["where", "location", "located", "based", "city", "remote", "onsite", "on-site", "timezone", "time zone", "ist", "india", "chennai", "bangalore", "bengaluru"],
    reply: {
      text: `Based in ${profile.location} (IST). Works remotely with clients across regions — IST overlaps EMEA & APAC hours, and on-site visits are possible.`,
      chips: ["Get a quote", "I'm hiring — experience?"],
    },
  },
  {
    id: "language",
    keywords: ["tamil", "language", "languages", "hindi", "english"],
    reply: { text: "Works in English and Tamil — the small-business page is available in Tamil too.", links: [L.business] },
  },
];
