/* ---------------------------------------------------------------
   Bilingual content for /services — the small-business sales page.

   English and Tamil are two full, independent trees of the SAME
   `BusinessCopy` type. TypeScript is the only thing enforcing parity:
   if a field exists in one language and not the other, the build
   fails. That's deliberate — there is no "fallback to English" path,
   so a missing translation can never silently ship.

   TAMIL IS A FIRST DRAFT. Written by Claude, not proofread by a
   native speaker — review before treating it as final customer-facing
   copy. Technical/brand terms (CRM, WhatsApp, SMS, DLT, UPI, Zoho,
   HubSpot, Razorpay, Basic/Standard/Premium as plan names) are kept
   in English inside Tamil sentences on purpose — that's how these
   terms are actually written in Tamil business content; translating
   "CRM" to Tamil would read as stranger, not clearer.

   Icons and hrefs are duplicated across both trees rather than
   factored into a shared "structure" object. They're identical,
   static SVG path strings — splitting them into a separate
   id-matched table would add a layer of indirection to save a few
   duplicated lines, which is the wrong trade here.
---------------------------------------------------------------- */

export type Lang = "en" | "ta";

export type WebsiteTier = {
  name: string;
  ideal: string;
  price: string;
  priceNote: string;
  timeline: string;
  pages: string;
  revisions: string;
  featured?: boolean;
  includes: string[];
};

export type BusinessOffering = {
  /** The big, outcome-first headline — what changes for the buyer. */
  outcome: string;
  /** The technical/service name — smaller subline, also used as the schema.org service name. */
  title: string;
  tagline?: string;
  href?: string;
  linkLabel?: string;
  icon: string;
};

export type BusinessCategory = {
  id: string;
  letter: string;
  title: string;
  intro: string;
  cols: 3 | 4;
  items: BusinessOffering[];
};

export type ProcessStep = { title: string; desc: string };
export type Testimonial = { quote: string; name: string; role: string };
export type Faq = { q: string; a: string };

export type ContactFormLabels = {
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  phoneOptional: string;
  companyLabel: string;
  companyOptional: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  successTitle: string;
  successText: string;
  resendLabel: string;
  errorText: string;
  privacyText: string;
  privacyLinkText: string;
};

export type BusinessCopy = {
  hero: {
    kicker: string;
    availabilityBadge: string;
    headline: string;
    headlineAccent: string;
    subhead: string;
    primaryCta: string;
    pricingCta: string;
    responseTime: string;
    availability: string;
    audience: string[];
    facts: { value: string; label: string }[];
  };
  bundle: {
    kicker: string;
    headline: string;
    intro: string;
    price: string;
    priceNote: string;
    items: { title: string; desc: string; icon: string }[];
    note: string;
    cta: string;
  };
  websites: {
    kicker: string;
    title: string;
    intro: string;
    tiers: WebsiteTier[];
    note: string;
    guarantee: string;
    tierCta: string;
  };
  categories: BusinessCategory[];
  catalogue: {
    kicker: string;
    title: string;
    intro: string;
    helpTitle: string;
    helpText: string;
    helpCta: string;
  };
  process: {
    kicker: string;
    title: string;
    steps: ProcessStep[];
  };
  testimonials: {
    kicker: string;
    title: string;
    intro: string;
    todoNote: string;
    items: Testimonial[];
  };
  faq: {
    kicker: string;
    title: string;
    items: Faq[];
    footerText: string;
    footerCta: string;
  };
  closing: {
    kicker: string;
    title: string;
    text: string;
    note: string;
    emailPrefix: string;
    form: ContactFormLabels;
  };
};

/* =================================================================
   ENGLISH
================================================================= */
const en: BusinessCopy = {
  hero: {
    kicker: "For Small & Local Business",
    availabilityBadge: "Taking on new work",
    headline: "Tech that fits a business your size.",
    headlineAccent: "No jargon, no lock-in.",
    subhead:
      "Websites, software, automation and branding for shops, clinics, schools, small firms and individual professionals. You describe the problem in your own words — I handle the technical part, and you get the price in writing before anything starts.",
    primaryCta: "Book a free consultation call",
    pricingCta: "See pricing",
    responseTime: "24-hour reply SLA",
    availability:
      "Four years building and fixing business systems for companies. Now available to businesses your size.",
    audience: [
      "Shops & retail",
      "Clinics & doctors",
      "Schools & coaching centres",
      "Lawyers & consultants",
      "Trainers & freelancers",
      "Small manufacturers",
      "Local service businesses",
    ],
    facts: [
      { value: "Fixed price", label: "Agreed in writing before any work starts" },
      { value: "Plain English", label: "No jargon and no tech lectures" },
      { value: "You own it", label: "Full access and handover, never locked in" },
      { value: "24 hrs", label: "Reply SLA on every enquiry" },
    ],
  },

  bundle: {
    kicker: "Starting from scratch",
    headline: "Start your business right",
    intro:
      "Logo design, package design and website design in one bundle — so your brand looks like one business everywhere, instead of three different ones stitched together.",
    price: "Quoted as one job",
    priceNote:
      "Reach out and we'll scope the three pieces together, then give you a single fixed price in writing.",
    items: [
      {
        title: "Logo Design",
        desc: "A custom logo built around your brand identity — not a template with your name dropped into it.",
        icon: "M12 3 14.1 8.5 20 9.2l-4.4 4.1 1.2 5.9L12 16.4 7.2 19.2l1.2-5.9L4 9.2l5.9-.7L12 3Z",
      },
      {
        title: "Package Design",
        desc: "Product and packaging design that carries the same brand through to the shelf.",
        icon: "M3 8h18v3H3V8Zm1 3v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9M12 8v13M12 8S10.5 4 8.5 4a2 2 0 0 0 0 4M12 8s1.5-4 3.5-4a2 2 0 0 1 0 4",
      },
      {
        title: "Website Design",
        desc: "A professional website for your practice or your company, matching the logo and packaging.",
        icon: "M3 6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Zm0 3.5h18M6 7.2h.01M8.4 7.2h.01",
      },
    ],
    note: "One consistent brand, delivered end-to-end. Prefer to start with just one piece? Branding, packaging and websites are each available on their own too.",
    cta: "Reach us for a quote",
  },

  websites: {
    kicker: "Websites & Pricing",
    title: "A website for your practice or your company",
    intro:
      "For doctors, lawyers, consultants, trainers and freelancers — and for shops, clinics, schools and small firms. Three sizes, so you only pay for what you actually need.",
    tiers: [
      {
        name: "Basic",
        ideal: "One clear page that says who you are, what you do, and how to reach you.",
        price: "From ₹500",
        priceNote: "Single page, using content you provide. Confirmed once I see it.",
        timeline: "3–5 days",
        pages: "1 page",
        revisions: "1 round of revisions included",
        includes: [
          "Single-page site — about, services and contact in one scroll",
          "Works properly on a phone, not just a laptop",
          "One-tap call and one-tap WhatsApp buttons",
          "Your logo, photos and text put in for you",
          "Live on a free address to start; your own domain if you have one",
        ],
      },
      {
        name: "Standard",
        featured: true,
        ideal:
          "Businesses and professionals who need separate pages for what they do, not everything on one.",
        price: "Scoped, then quoted",
        priceNote: "Depends on how many pages there are and how much content needs writing.",
        timeline: "1–2 weeks",
        pages: "Up to 5 pages",
        revisions: "2 rounds of revisions included",
        includes: [
          "Multi-page site — home, about, services, gallery, contact",
          "Enquiry form that lands straight in your inbox",
          "A gallery or photo section to show your work",
          "Your phone, WhatsApp and address on every page",
          "A short walkthrough of how to update it yourself",
        ],
      },
      {
        name: "Premium",
        ideal:
          "Companies that need the site to actually do something — bookings, payments, logins or a catalogue.",
        price: "Scoped, then quoted",
        priceNote: "Priced feature by feature, then fixed in writing.",
        timeline: "3–6 weeks",
        pages: "6+ pages, scoped to what you need",
        revisions: "Revisions included through the build, not just at the end",
        includes: [
          "Everything in Standard, plus features built for your business",
          "Online booking and appointments, or a product catalogue",
          "Online payments with receipts sent out automatically",
          "Admin panel so your team can update content and see enquiries",
          "Written handover — you own everything, no lock-in",
        ],
      },
    ],
    note: "Only the starter tier carries a fixed number, because it's the only one where the scope is fixed. The other two are quoted after a short call, so you never end up paying for pages or features you don't need.",
    guarantee: "Every project gets a fixed quote in writing before we start — no hourly surprises.",
    tierCta: "Ask about this plan →",
  },

  categories: [
    {
      id: "build",
      letter: "A",
      title: "Build & Automate",
      intro: "Something that doesn't exist yet — or something you're still doing by hand.",
      cols: 3,
      items: [
        {
          outcome: "A website that brings in enquiries while you sleep",
          title: "Website Design",
          href: "#websites",
          linkLabel: "See the plans",
          icon: "M3 6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Zm0 3.5h18M6 7.2h.01M8.4 7.2h.01",
        },
        {
          outcome: "Stop working around software that doesn't fit your business",
          title: "Custom Software Development",
          icon: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm5.5 5L7 12.5l2.5 2.5m5-5 2.5 2.5-2.5 2.5",
        },
        {
          outcome: "Get back the hours you lose to repetitive admin work",
          title: "Business Automation Solutions",
          tagline: "Share your problem, we build the fix",
          icon: "M12 4.5a7.5 7.5 0 0 1 7.1 5M19.5 4v5.5H14M12 19.5a7.5 7.5 0 0 1-7.1-5M4.5 20v-5.5H10",
        },
      ],
    },
    {
      id: "systems",
      letter: "B",
      title: "Systems & Integrations",
      intro: "Getting the tools you already pay for to talk to each other — and to hold clean data.",
      cols: 4,
      items: [
        {
          outcome: "Never lose a lead again — every enquiry and follow-up in one place",
          title: "CRM Setup & Migration (Zoho, HubSpot, Freshsales, LeadSquared) — lead capture, pipeline setup, and your old spreadsheets moved in",
          icon: "M3 6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Zm6 4.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-2.6 6.2c.4-1.3 1.4-2 2.6-2s2.2.7 2.6 2M14.5 9.5h4m-4 3h4m-4 3h2.5",
        },
        {
          outcome: "Always know what's in stock, what it cost, and what's about to run out",
          title: "ERP & Inventory Setup",
          icon: "M12 3 4 6.8v10.4L12 21l8-3.8V6.8L12 3Zm0 7.6L4 6.8m8 3.8 8-3.8m-8 3.8V21",
        },
        {
          outcome: "Turn years of messy spreadsheets into data your new system will actually accept",
          title: "Data Cleanup & Migration",
          icon: "M4 5h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm-1 4.5h11M8.5 5v14M17 12h5m0 0-2.5-2.5M22 12l-2.5 2.5",
        },
        {
          outcome: "Get paid faster — card, UPI and netbanking, with receipts sent automatically",
          title: "Payment Gateway Integration (Razorpay, PayU, Stripe) — payment links, invoicing and reconciliation",
          icon: "M3 7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Zm0 3.5h18M6.5 14.5h3",
        },
        {
          outcome: "Never miss a booking — automatic SMS reminders sent before every appointment",
          title: "SMS Integration — transactional & promotional SMS. I handle the DLT registration paperwork for you",
          icon: "M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1Zm4 5.5h.01M12 10.5h.01M16 10.5h.01",
        },
        {
          outcome: "Answer common questions instantly, even when you're not online",
          title: "WhatsApp Business API & Chatbot — order updates, reminders, catalog and auto-replies",
          icon: "M12 3a9 9 0 0 0-7.7 13.7L3 21l4.4-1.3A9 9 0 1 0 12 3Zm-2.5 8.5h.01M14.5 11.5h.01M9.2 14.5c1.6 1.2 4 1.2 5.6 0",
        },
        {
          outcome: "Follow up with every enquiry automatically, so nobody falls through the cracks",
          title: "Email Automation — welcome sequences, reminders and follow-ups that send themselves",
          icon: "M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 0 8 7 8-7",
        },
      ],
    },
    {
      id: "insight",
      letter: "C",
      title: "Numbers, Reports & Research",
      intro: "Knowing what the business is actually doing — the money, the reports, and the research behind a decision.",
      cols: 4,
      items: [
        {
          outcome: "See how the business is doing at a glance, without rebuilding a sheet every month",
          title: "Dashboard Creation",
          icon: "M3 5h7v6H3V5Zm11 0h7v4h-7V5ZM3 15h7v4H3v-4Zm11-2h7v6h-7v-6Z",
        },
        {
          outcome: "Get the same report every week without anyone typing it out by hand",
          title: "Report Building & MIS",
          icon: "M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 0v4h4M9 16v-3m3 3v-5m3 5v-2",
        },
        {
          outcome: "Understand exactly where your money is going, in plain language",
          title: "Financial Statement Analysis",
          icon: "M5 20V9m4.5 11V4m4.5 16v-7m4.5 7V7M3 20h18",
        },
        {
          outcome: "See a cash shortfall coming months before it hits the bank",
          title: "Budgeting & Forecasting",
          icon: "M3 17.5 8.5 12l3.5 3.5L20.5 7M20.5 7h-4.8m4.8 0v4.8M3 20.5h18",
        },
        {
          outcome: "Know exactly what to charge — and how much you need to sell to profit",
          title: "Cost, Pricing & Break-even",
          icon: "M12 2v20m4.5-15.5c-.8-1.4-2.5-2.2-4.5-2.2-2.5 0-4.5 1.2-4.5 3.2 0 4.5 9 2.5 9 7 0 2-2 3.3-4.5 3.3-2.1 0-3.9-.9-4.6-2.4",
        },
        {
          outcome: "A plain-language read on whether the numbers support the price",
          title: "IPO & Investment Analysis",
          href: "/samples",
          linkLabel: "View sample reports",
          icon: "M4 19h16M6.5 16V9.5M11 16V5.5m4.5 10.5V11M20 16v-3.5",
        },
        {
          outcome: "Train someone new in days, not months",
          title: "Process Documentation & SOPs",
          icon: "M9 4h6v3H9V4Zm-2 1H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-1m-8.5 6.5 1.5 1.5 3-3M8.5 16l1.5 1.5 3-3",
        },
        {
          outcome: "Make the call with real research behind it, not guesswork",
          title: "Business R&D",
          icon: "M12 3a5.5 5.5 0 0 0-3.2 10c.6.5.9 1.1.9 1.8V16h4.6v-1.2c0-.7.3-1.3.9-1.8A5.5 5.5 0 0 0 12 3Zm-2.3 16h4.6M10.5 21h3",
        },
      ],
    },
    {
      id: "brand",
      letter: "D",
      title: "Brand & Presence",
      intro: "Looking like a business people trust, before they've even called you.",
      cols: 4,
      items: [
        {
          outcome: "Look like a real business the moment someone sees your logo",
          title: "Brand Identity Kit",
          icon: "M12 3a9 9 0 0 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1 .8-1.5 1.8-1.5H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7Zm-4.5 8h.01M9.5 7.5h.01m4 0h.01M16.5 11h.01",
        },
        {
          outcome: "Make your product stand out on the shelf, not just in the warehouse",
          title: "Package Design",
          icon: "M3 8h18v3H3V8Zm1 3v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9M12 8v13M12 8S10.5 4 8.5 4a2 2 0 0 0 0 4M12 8s1.5-4 3.5-4a2 2 0 0 1 0 4",
        },
        {
          outcome: "Make every page you post on look like it belongs to the same business",
          title: "Social Media Kit Design",
          icon: "M6 4h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm2 14v1a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1M5.5 12.5 8.5 10l2.5 2 2-1.5 3 3",
        },
        {
          outcome: "Walk into any client, bank or investor meeting with something that looks the part",
          title: "Pitch Deck & Company Profile",
          icon: "M4 4h16v10H4V4Zm8 10v4m-3.5 2 3.5-2 3.5 2M3 4h18",
        },
      ],
    },
  ],

  catalogue: {
    kicker: "Everything I do",
    title: "Pick the piece you actually need",
    intro:
      "Nothing here is a bundle you have to buy whole. Most businesses start with one thing that's hurting, and add later only if it's worth it.",
    helpTitle: "Not sure which of these you need?",
    helpText:
      "That's normal — most people describe the problem, not the solution. Tell me what's taking too much time and I'll tell you which of these fixes it, or whether it needs fixing at all.",
    helpCta: "Describe your problem →",
  },

  process: {
    kicker: "How it works",
    title: "Four steps, no surprises",
    steps: [
      {
        title: "A free call",
        desc: "15–20 minutes on the phone or WhatsApp. You tell me what's slowing you down. If it isn't worth spending money on, I'll say so on the call.",
      },
      {
        title: "A price in writing",
        desc: "You get what's included, how long it takes, and the exact price — before you pay anything. No hourly meter, no surprise invoice at the end.",
      },
      {
        title: "I build it, you watch it happen",
        desc: "You see progress as it goes, not only at the end. Changes inside what we agreed are free.",
      },
      {
        title: "Handover and support",
        desc: "Your team gets shown how to use it in plain language, and you get a support window afterwards for the things real use always throws up.",
      },
    ],
  },

  testimonials: {
    kicker: "Client results",
    title: "What clients say",
    intro: "Real feedback from real projects, as they wrap up.",
    todoNote:
      "TODO — placeholders below, waiting on real client quotes. Replace before this section is treated as finished.",
    items: [
      { quote: "[Client name, business type] — result achieved", name: "[Client name]", role: "[Business type]" },
      { quote: "[Client name, business type] — result achieved", name: "[Client name]", role: "[Business type]" },
      { quote: "[Client name, business type] — result achieved", name: "[Client name]", role: "[Business type]" },
      { quote: "[Client name, business type] — result achieved", name: "[Client name]", role: "[Business type]" },
      { quote: "[Client name, business type] — result achieved", name: "[Client name]", role: "[Business type]" },
    ],
  },

  faq: {
    kicker: "Before you ask",
    title: "The questions I get most",
    items: [
      {
        q: "Do I need to know anything technical?",
        a: "No. You describe the problem in your own words — I handle the technical part and explain everything in plain language, never jargon.",
      },
      {
        q: "What if I already have a website or CRM?",
        a: "That's fine — most projects start with what you already have. I'll tell you honestly whether it's worth fixing what's there or starting fresh, and quote for whichever is true.",
      },
      {
        q: "How long does it take?",
        a: "Depends on the job — a starter website is 3–5 days, a CRM setup or automation is usually 1–3 weeks. You get a timeline in writing with your quote, before anything starts.",
      },
      {
        q: "What happens if I need changes after handover?",
        a: "You're never stuck. Small changes are usually quick and low-cost; bigger changes get a fixed quote just like the original project. Nothing is built so only I can touch it.",
      },
      {
        q: "Do you offer ongoing support?",
        a: "Yes. Every project includes a support window after handover, and ongoing support plans are available if you'd rather not think about it again.",
      },
      {
        q: "Is there a contract?",
        a: "You get a written scope and price before any work starts, and a simple written agreement for anything above a small job. No long lock-in contracts — you can stop after any project.",
      },
    ],
    footerText: "Running a bigger rollout that has gone off the rails?",
    footerCta: "See freelance packages →",
  },

  closing: {
    kicker: "Start here",
    title: "Book your free consultation call",
    text: "Two or three lines is enough — what you do, what's taking too much time, and how soon you need it. I'll reply within 24 hours with either a couple of questions or a time to talk.",
    note: "Free consultation, no pressure, no obligation.",
    emailPrefix: "Email me:",
    form: {
      nameLabel: "Name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      phoneOptional: "(optional)",
      companyLabel: "Company",
      companyOptional: "(optional)",
      messageLabel: "What's slowing you down?",
      messagePlaceholder: "What your business does, what's taking too much time, and when you need it…",
      submitLabel: "Send my enquiry",
      sendingLabel: "Sending…",
      successTitle: "Message sent — thank you!",
      successText: "I'll get back to you as soon as possible.",
      resendLabel: "Send another message",
      errorText: "Something went wrong. Please email me directly.",
      privacyText: "Your details are only used so I can get back to you — never shared or used for marketing.",
      privacyLinkText: "Privacy policy",
    },
  },
};

/* =================================================================
   TAMIL — first draft, needs native-speaker review before it ships
   as final. English/brand terms kept in Roman script deliberately.
================================================================= */
const ta: BusinessCopy = {
  hero: {
    kicker: "சிறு & உள்ளூர் தொழில்களுக்காக",
    availabilityBadge: "புதிய வேலைகளை ஏற்கிறோம்",
    headline: "உங்கள் தொழிலின் அளவுக்கு ஏற்ற டெக்னாலஜி.",
    headlineAccent: "ஜார்கன் இல்லை, லாக்-இன் இல்லை.",
    subhead:
      "கடைகள், கிளினிக்குகள், பள்ளிகள், சிறு நிறுவனங்கள் மற்றும் தனிநபர் தொழில்முனைவோருக்கான வெப்சைட், சாஃப்ட்வேர், ஆட்டோமேஷன் மற்றும் பிராண்டிங். உங்கள் பிரச்சனையை உங்கள் சொந்த வார்த்தைகளில் சொல்லுங்கள் — டெக்னிக்கல் பகுதியை நான் பார்த்துக்கொள்கிறேன், வேலை தொடங்குவதற்கு முன்பே விலையை எழுத்துப்பூர்வமாக தருகிறேன்.",
    primaryCta: "இலவச ஆலோசனை அழைப்பை பதிவு செய்யுங்கள்",
    pricingCta: "விலைகளை பாருங்கள்",
    responseTime: "24 மணி நேரத்தில் பதில்",
    availability:
      "நான்கு ஆண்டுகளாக நிறுவனங்களுக்கான பிசினஸ் சிஸ்டம்களை உருவாக்கி, சரி செய்து வருகிறேன். இப்போது உங்கள் அளவிலான தொழில்களுக்கும் கிடைக்கிறது.",
    audience: [
      "கடைகள் & சில்லறை வணிகம்",
      "கிளினிக்குகள் & மருத்துவர்கள்",
      "பள்ளிகள் & பயிற்சி மையங்கள்",
      "வழக்கறிஞர்கள் & ஆலோசகர்கள்",
      "பயிற்சியாளர்கள் & ஃப்ரீலான்சர்கள்",
      "சிறு உற்பத்தியாளர்கள்",
      "உள்ளூர் சேவை நிறுவனங்கள்",
    ],
    facts: [
      { value: "நிலையான விலை", label: "வேலை தொடங்கும் முன் எழுத்துப்பூர்வமாக ஒப்புக்கொள்ளப்படும்" },
      { value: "எளிய தமிழ்/ஆங்கிலம்", label: "ஜார்கன் இல்லை, டெக் லெக்சர் இல்லை" },
      { value: "உங்களுக்கே சொந்தம்", label: "முழு அணுகல் மற்றும் ஹேண்ட்-ஓவர், லாக்-இன் இல்லை" },
      { value: "24 மணி நேரம்", label: "ஒவ்வொரு விசாரணைக்கும் பதிலளிக்கும் காலம்" },
    ],
  },

  bundle: {
    kicker: "புதிதாக தொடங்குகிறீர்களா",
    headline: "உங்கள் தொழிலை சரியாக தொடங்குங்கள்",
    intro:
      "லோகோ டிசைன், பேக்கேஜ் டிசைன் மற்றும் வெப்சைட் டிசைன் — மூன்றும் ஒரே பண்டிலில். உங்கள் பிராண்ட் எங்கும் ஒரே தொழிலாக தெரியும், தனித்தனியாக இணைக்கப்பட்ட மூன்று வெவ்வேறு பிராண்ட்களாக அல்ல.",
    price: "ஒரே வேலையாக விலை நிர்ணயிக்கப்படும்",
    priceNote: "தொடர்பு கொள்ளுங்கள் — மூன்று பகுதிகளையும் சேர்த்து ஸ்கோப் செய்து, ஒரே நிலையான விலையை எழுத்துப்பூர்வமாக தருவோம்.",
    items: [
      {
        title: "லோகோ டிசைன்",
        desc: "உங்கள் பிராண்ட் அடையாளத்தை மையமாக வைத்து உருவாக்கப்படும் கஸ்டம் லோகோ — உங்கள் பெயரை மட்டும் மாற்றிய டெம்ப்ளேட் அல்ல.",
        icon: "M12 3 14.1 8.5 20 9.2l-4.4 4.1 1.2 5.9L12 16.4 7.2 19.2l1.2-5.9L4 9.2l5.9-.7L12 3Z",
      },
      {
        title: "பேக்கேஜ் டிசைன்",
        desc: "ஷெல்ஃப் வரை உங்கள் பிராண்ட் தொடர்ச்சியாக தெரியும் வகையில் தயாரிக்கப்படும் பேக்கேஜிங் டிசைன்.",
        icon: "M3 8h18v3H3V8Zm1 3v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9M12 8v13M12 8S10.5 4 8.5 4a2 2 0 0 0 0 4M12 8s1.5-4 3.5-4a2 2 0 0 1 0 4",
      },
      {
        title: "வெப்சைட் டிசைன்",
        desc: "லோகோவும் பேக்கேஜிங்கும் பொருந்தும் வகையில் உங்கள் தொழிலுக்கான ப்ரொஃபஷனல் வெப்சைட்.",
        icon: "M3 6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Zm0 3.5h18M6 7.2h.01M8.4 7.2h.01",
      },
    ],
    note: "ஒரே சீரான பிராண்ட், தொடக்கம் முதல் முடிவு வரை. ஒரு பகுதியில் மட்டும் தொடங்க விரும்புகிறீர்களா? பிராண்டிங், பேக்கேஜிங், வெப்சைட் — மூன்றும் தனித்தனியாகவும் கிடைக்கும்.",
    cta: "விலை விவரத்திற்கு தொடர்பு கொள்ளுங்கள்",
  },

  websites: {
    kicker: "வெப்சைட்டுகள் & விலைகள்",
    title: "உங்கள் நிறுவனத்திற்கான வெப்சைட்",
    intro:
      "மருத்துவர்கள், வழக்கறிஞர்கள், ஆலோசகர்கள், பயிற்சியாளர்கள், ஃப்ரீலான்சர்கள் — மற்றும் கடைகள், கிளினிக்குகள், பள்ளிகள், சிறு நிறுவனங்களுக்கும். மூன்று அளவுகள், உங்களுக்கு தேவையானதற்கு மட்டும் பணம் செலுத்துங்கள்.",
    tiers: [
      {
        name: "Basic",
        ideal: "நீங்கள் யார், என்ன செய்கிறீர்கள், எப்படி தொடர்பு கொள்வது என்பதை தெளிவாக சொல்லும் ஒரே பக்கம்.",
        price: "₹500 முதல்",
        priceNote: "ஒரே பக்கம், நீங்கள் தரும் கன்டெண்ட் வைத்து. பார்த்த பிறகு உறுதி செய்யப்படும்.",
        timeline: "3–5 நாட்கள்",
        pages: "1 பக்கம்",
        revisions: "1 சுற்று மாற்றங்கள் அடங்கும்",
        includes: [
          "ஒரே பக்க வெப்சைட் — அபவுட், சேவைகள், தொடர்பு எல்லாம் ஒரே ஸ்க்ரோலில்",
          "மொபைலில் சரியாக வேலை செய்யும், லேப்டாப்பில் மட்டும் இல்லை",
          "ஒரே தொடுதலில் கால் மற்றும் வாட்ஸ்அப் பட்டன்கள்",
          "உங்கள் லோகோ, புகைப்படங்கள், டெக்ஸ்ட் — எல்லாம் நானே சேர்த்து தருகிறேன்",
          "தொடக்கத்தில் இலவச முகவரியில் லைவ்; உங்களிடம் சொந்த டொமைன் இருந்தால் அதிலும்",
        ],
      },
      {
        name: "Standard",
        featured: true,
        ideal: "தங்கள் சேவைகளுக்கு தனித்தனி பக்கங்கள் தேவைப்படும் தொழில் நிறுவனங்கள் மற்றும் நிபுணர்கள்.",
        price: "ஸ்கோப் செய்த பின் விலை",
        priceNote: "எத்தனை பக்கங்கள், எவ்வளவு கன்டெண்ட் எழுத வேண்டும் என்பதைப் பொறுத்தது.",
        timeline: "1–2 வாரங்கள்",
        pages: "5 பக்கங்கள் வரை",
        revisions: "2 சுற்று மாற்றங்கள் அடங்கும்",
        includes: [
          "பல பக்க வெப்சைட் — ஹோம், அபவுட், சேவைகள், கேலரி, தொடர்பு",
          "நேரடியாக உங்கள் இன்பாக்ஸுக்கு வரும் விசாரணை படிவம்",
          "உங்கள் வேலையை காட்ட ஒரு கேலரி/புகைப்பட பகுதி",
          "ஒவ்வொரு பக்கத்திலும் உங்கள் போன், வாட்ஸ்அப், முகவரி",
          "நீங்களே எப்படி புதுப்பிப்பது என்பதற்கான சிறு வழிகாட்டி",
        ],
      },
      {
        name: "Premium",
        ideal: "பதிவு, பேமெண்ட், லாகின், கேட்டலாக் போன்று வெப்சைட் நிஜமாக ஏதாவது செய்ய வேண்டிய நிறுவனங்கள்.",
        price: "ஸ்கோப் செய்த பின் விலை",
        priceNote: "ஒவ்வொரு ஃபீச்சருக்கும் தனி விலை, பின் எழுத்துப்பூர்வமாக உறுதி.",
        timeline: "3–6 வாரங்கள்",
        pages: "6+ பக்கங்கள், உங்கள் தேவைக்கேற்ப ஸ்கோப் செய்யப்படும்",
        revisions: "கட்டுமானம் முழுவதும் மாற்றங்கள் அடங்கும், முடிவில் மட்டும் இல்லை",
        includes: [
          "Standard-இல் உள்ள அனைத்தும், கூடுதலாக உங்கள் தொழிலுக்கான ஃபீச்சர்கள்",
          "ஆன்லைன் பதிவு & அப்பாய்ன்ட்மென்ட், அல்லது ப்ராடக்ட் கேட்டலாக்",
          "ஆன்லைன் பேமெண்ட், ரசீது தானாக அனுப்பப்படும்",
          "உங்கள் டீம் கன்டெண்ட் மற்றும் விசாரணைகளை பார்க்க அட்மின் பேனல்",
          "எழுத்துப்பூர்வ ஹேண்ட்-ஓவர் — எல்லாம் உங்களுக்கே சொந்தம், லாக்-இன் இல்லை",
        ],
      },
    ],
    note: "தொடக்க தளத்தில் மட்டுமே நிலையான விலை உள்ளது, ஏனெனில் அதன் ஸ்கோப் மட்டுமே நிலையானது. மற்ற இரண்டும் ஒரு சிறு அழைப்புக்குப் பிறகு விலை நிர்ணயிக்கப்படும் — தேவையில்லாத பக்கங்கள்/ஃபீச்சர்களுக்கு நீங்கள் பணம் செலுத்த வேண்டியதில்லை.",
    guarantee: "ஒவ்வொரு ப்ராஜெக்ட்டும் தொடங்கும் முன் நிலையான விலை எழுத்துப்பூர்வமாக தரப்படும் — மணி நேர கணக்கில் ஆச்சரியம் இல்லை.",
    tierCta: "இந்த திட்டத்தைப் பற்றி கேளுங்கள் →",
  },

  categories: [
    {
      id: "build",
      letter: "A",
      title: "உருவாக்கு & ஆட்டோமேட் செய்",
      intro: "இன்னும் இல்லாத ஒன்று — அல்லது நீங்கள் இன்னும் கையால் செய்யும் ஒன்று.",
      cols: 3,
      items: [
        {
          outcome: "நீங்கள் தூங்கும் போதும் விசாரணைகளை கொண்டு வரும் வெப்சைட்",
          title: "வெப்சைட் டிசைன்",
          href: "#websites",
          linkLabel: "திட்டங்களை பாருங்கள்",
          icon: "M3 6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Zm0 3.5h18M6 7.2h.01M8.4 7.2h.01",
        },
        {
          outcome: "உங்கள் தொழிலுக்கு பொருந்தாத சாஃப்ட்வேரை சுற்றி வேலை செய்வதை நிறுத்துங்கள்",
          title: "கஸ்டம் சாஃப்ட்வேர் டெவலப்மென்ட்",
          icon: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm5.5 5L7 12.5l2.5 2.5m5-5 2.5 2.5-2.5 2.5",
        },
        {
          outcome: "மீண்டும் மீண்டும் செய்யும் அட்மின் வேலையில் தொலையும் நேரத்தை மீட்டெடுங்கள்",
          title: "பிசினஸ் ஆட்டோமேஷன் சொல்யூஷன்ஸ்",
          tagline: "உங்கள் பிரச்சனையை சொல்லுங்கள், சரிசெய்யும் வழியை நாங்கள் உருவாக்குகிறோம்",
          icon: "M12 4.5a7.5 7.5 0 0 1 7.1 5M19.5 4v5.5H14M12 19.5a7.5 7.5 0 0 1-7.1-5M4.5 20v-5.5H10",
        },
      ],
    },
    {
      id: "systems",
      letter: "B",
      title: "சிஸ்டம்ஸ் & இன்டகிரேஷன்ஸ்",
      intro: "நீங்கள் ஏற்கனவே பணம் செலுத்தும் டூல்கள் ஒன்றுடன் ஒன்று பேச வைத்து, தரவு சுத்தமாக இருக்க செய்தல்.",
      cols: 4,
      items: [
        {
          outcome: "இனி ஒரு லீட்கூட தவறாது — ஒவ்வொரு விசாரணையும் ஃபாலோ-அப்பும் ஒரே இடத்தில்",
          title: "CRM செட்அப் & மைக்ரேஷன் (Zoho, HubSpot, Freshsales, LeadSquared) — லீட் கேப்சர், பைப்லைன் செட்அப், உங்கள் பழைய ஸ்பிரெட்ஷீட்கள் மாற்றப்படும்",
          icon: "M3 6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Zm6 4.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-2.6 6.2c.4-1.3 1.4-2 2.6-2s2.2.7 2.6 2M14.5 9.5h4m-4 3h4m-4 3h2.5",
        },
        {
          outcome: "உங்களிடம் என்ன ஸ்டாக் உள்ளது, அதன் விலை என்ன, என்ன தீர்ந்து போகிறது என்பதை எப்போதும் அறியுங்கள்",
          title: "ERP & இன்வென்டரி செட்அப்",
          icon: "M12 3 4 6.8v10.4L12 21l8-3.8V6.8L12 3Zm0 7.6L4 6.8m8 3.8 8-3.8m-8 3.8V21",
        },
        {
          outcome: "பல வருட குழப்பமான ஸ்பிரெட்ஷீட்களை உங்கள் புதிய சிஸ்டம் ஏற்றுக்கொள்ளும் தரவாக மாற்றுங்கள்",
          title: "டேட்டா க்ளீன்அப் & மைக்ரேஷன்",
          icon: "M4 5h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm-1 4.5h11M8.5 5v14M17 12h5m0 0-2.5-2.5M22 12l-2.5 2.5",
        },
        {
          outcome: "வேகமாக பணம் பெறுங்கள் — கார்டு, UPI, நெட்பேங்கிங், ரசீது தானாக அனுப்பப்படும்",
          title: "பேமெண்ட் கேட்வே இன்டகிரேஷன் (Razorpay, PayU, Stripe) — பேமெண்ட் லிங்க்குகள், இன்வாய்சிங், ரிகன்சிலியேஷன்",
          icon: "M3 7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Zm0 3.5h18M6.5 14.5h3",
        },
        {
          outcome: "இனி ஒரு அப்பாய்ன்ட்மென்ட்கூட தவறாது — ஒவ்வொரு அப்பாய்ன்ட்மென்டுக்கும் முன் தானாக SMS நினைவூட்டல்",
          title: "SMS இன்டகிரேஷன் — ட்ரான்சாக்ஷனல் & ப்ரோமோஷனல் SMS. DLT பதிவு காகித வேலைகளை நான் பார்த்துக்கொள்கிறேன்",
          icon: "M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1Zm4 5.5h.01M12 10.5h.01M16 10.5h.01",
        },
        {
          outcome: "நீங்கள் ஆஃப்லைனில் இருந்தாலும் பொதுவான கேள்விகளுக்கு உடனே பதில் தரும்",
          title: "வாட்ஸ்அப் பிசினஸ் API & சாட்பாட் — ஆர்டர் அப்டேட், நினைவூட்டல், கேட்டலாக், தானியங்கி பதில்கள்",
          icon: "M12 3a9 9 0 0 0-7.7 13.7L3 21l4.4-1.3A9 9 0 1 0 12 3Zm-2.5 8.5h.01M14.5 11.5h.01M9.2 14.5c1.6 1.2 4 1.2 5.6 0",
        },
        {
          outcome: "ஒவ்வொரு விசாரணையையும் தானாக ஃபாலோ-அப் செய்யுங்கள், யாரும் தவறவிடாமல்",
          title: "ஈமெயில் ஆட்டோமேஷன் — வெல்கம் சீக்வென்ஸ், நினைவூட்டல், தானாக அனுப்பப்படும் ஃபாலோ-அப்",
          icon: "M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 0 8 7 8-7",
        },
      ],
    },
    {
      id: "insight",
      letter: "C",
      title: "எண்கள், ரிப்போர்ட்கள் & ஆராய்ச்சி",
      intro: "தொழில் உண்மையில் எப்படி இயங்குகிறது என்பதை அறிதல் — பணம், ரிப்போர்ட்கள், முடிவுக்குப் பின்னால் உள்ள ஆராய்ச்சி.",
      cols: 4,
      items: [
        {
          outcome: "ஒரு பார்வையில் தொழில் எப்படி செயல்படுகிறது என்பதை பாருங்கள், ஒவ்வொரு மாதமும் ஷீட் உருவாக்காமல்",
          title: "டாஷ்போர்டு உருவாக்கம்",
          icon: "M3 5h7v6H3V5Zm11 0h7v4h-7V5ZM3 15h7v4H3v-4Zm11-2h7v6h-7v-6Z",
        },
        {
          outcome: "யாரும் தட்டச்சு செய்யாமல் ஒவ்வொரு வாரமும் அதே ரிப்போர்ட் பெறுங்கள்",
          title: "ரிப்போர்ட் & MIS உருவாக்கம்",
          icon: "M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 0v4h4M9 16v-3m3 3v-5m3 5v-2",
        },
        {
          outcome: "உங்கள் பணம் எங்கு செல்கிறது என்பதை எளிய மொழியில் புரிந்து கொள்ளுங்கள்",
          title: "நிதி அறிக்கை பகுப்பாய்வு",
          icon: "M5 20V9m4.5 11V4m4.5 16v-7m4.5 7V7M3 20h18",
        },
        {
          outcome: "பணப்பற்றாக்குறை வங்கியை தொடும் முன்பே மாதங்களுக்கு முன் பாருங்கள்",
          title: "பட்ஜெட்டிங் & ஃபோர்கேஸ்டிங்",
          icon: "M3 17.5 8.5 12l3.5 3.5L20.5 7M20.5 7h-4.8m4.8 0v4.8M3 20.5h18",
        },
        {
          outcome: "என்ன விலை நிர்ணயிப்பது, லாபம் அடைய எவ்வளவு விற்க வேண்டும் என்பதை துல்லியமாக அறியுங்கள்",
          title: "செலவு, விலை & பிரேக்-ஈவன் பகுப்பாய்வு",
          icon: "M12 2v20m4.5-15.5c-.8-1.4-2.5-2.2-4.5-2.2-2.5 0-4.5 1.2-4.5 3.2 0 4.5 9 2.5 9 7 0 2-2 3.3-4.5 3.3-2.1 0-3.9-.9-4.6-2.4",
        },
        {
          outcome: "எண்கள் விலையை ஆதரிக்கின்றனவா என்பதற்கான எளிய மொழி பகுப்பாய்வு",
          title: "IPO & முதலீட்டு பகுப்பாய்வு",
          href: "/samples",
          linkLabel: "மாதிரி அறிக்கைகளை பாருங்கள்",
          icon: "M4 19h16M6.5 16V9.5M11 16V5.5m4.5 10.5V11M20 16v-3.5",
        },
        {
          outcome: "மாதங்களுக்குப் பதிலாக நாட்களில் ஒரு புதியவரை பயிற்றுவியுங்கள்",
          title: "செயல்முறை ஆவணமாக்கல் & SOP",
          icon: "M9 4h6v3H9V4Zm-2 1H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-1m-8.5 6.5 1.5 1.5 3-3M8.5 16l1.5 1.5 3-3",
        },
        {
          outcome: "யூகத்தில் அல்ல, உண்மையான ஆராய்ச்சியுடன் முடிவெடுங்கள்",
          title: "பிசினஸ் R&D",
          icon: "M12 3a5.5 5.5 0 0 0-3.2 10c.6.5.9 1.1.9 1.8V16h4.6v-1.2c0-.7.3-1.3.9-1.8A5.5 5.5 0 0 0 12 3Zm-2.3 16h4.6M10.5 21h3",
        },
      ],
    },
    {
      id: "brand",
      letter: "D",
      title: "பிராண்ட் & பிரசென்ஸ்",
      intro: "நீங்கள் தொடர்பு கொள்வதற்கு முன்பே மக்கள் நம்பும் தொழிலாக தெரியுங்கள்.",
      cols: 4,
      items: [
        {
          outcome: "உங்கள் லோகோவை பார்த்த உடனேயே ஒரு உண்மையான தொழிலாக தெரியுங்கள்",
          title: "பிராண்ட் அடையாள கிட்",
          icon: "M12 3a9 9 0 0 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1 .8-1.5 1.8-1.5H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7Zm-4.5 8h.01M9.5 7.5h.01m4 0h.01M16.5 11h.01",
        },
        {
          outcome: "உங்கள் தயாரிப்பு கிடங்கில் மட்டுமல்ல, ஷெல்ஃபிலும் தனித்து தெரியட்டும்",
          title: "பேக்கேஜ் டிசைன்",
          icon: "M3 8h18v3H3V8Zm1 3v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9M12 8v13M12 8S10.5 4 8.5 4a2 2 0 0 0 0 4M12 8s1.5-4 3.5-4a2 2 0 0 1 0 4",
        },
        {
          outcome: "நீங்கள் போஸ்ட் செய்யும் ஒவ்வொரு பக்கமும் ஒரே தொழிலாக தெரியட்டும்",
          title: "சோஷியல் மீடியா கிட் டிசைன்",
          icon: "M6 4h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm2 14v1a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1M5.5 12.5 8.5 10l2.5 2 2-1.5 3 3",
        },
        {
          outcome: "எந்த கிளையண்ட், வங்கி, முதலீட்டாளர் மீட்டிங்கிலும் தகுதியாக தோன்றுங்கள்",
          title: "பிட்ச் டெக் & கம்பெனி ப்ரொஃபைல்",
          icon: "M4 4h16v10H4V4Zm8 10v4m-3.5 2 3.5-2 3.5 2M3 4h18",
        },
      ],
    },
  ],

  catalogue: {
    kicker: "நான் செய்யும் அனைத்தும்",
    title: "உங்களுக்கு தேவையான பகுதியை தேர்ந்தெடுங்கள்",
    intro:
      "இதில் எதுவும் முழுவதுமாக வாங்க வேண்டிய பண்டில் இல்லை. பெரும்பாலான தொழில்கள் தொல்லை தரும் ஒன்றில் தொடங்கி, தேவைப்பட்டால் மட்டும் சேர்த்துக்கொள்கின்றன.",
    helpTitle: "இதில் எது உங்களுக்கு தேவை என்று தெரியவில்லையா?",
    helpText:
      "அது சகஜம் தான் — பெரும்பாலானோர் தீர்வை அல்ல, பிரச்சனையை தான் சொல்வார்கள். எது அதிக நேரம் எடுக்கிறது என்று சொல்லுங்கள் — எது சரிசெய்யும் என்று நான் சொல்கிறேன், அல்லது அது சரிசெய்ய வேண்டியதே இல்லை என்றால் அதையும் சொல்கிறேன்.",
    helpCta: "உங்கள் பிரச்சனையை விவரிக்கவும் →",
  },

  process: {
    kicker: "இது எப்படி வேலை செய்கிறது",
    title: "நான்கு படிகள், ஆச்சரியங்கள் இல்லை",
    steps: [
      {
        title: "இலவச அழைப்பு",
        desc: "போன் அல்லது வாட்ஸ்அப்பில் 15–20 நிமிடங்கள். உங்களை என்ன தொல்லைப்படுத்துகிறது என்று சொல்லுங்கள். பணம் செலவழிக்க தகுதியில்லை என்றால், அதையும் அழைப்பிலேயே சொல்கிறேன்.",
      },
      {
        title: "எழுத்துப்பூர்வ விலை",
        desc: "என்ன அடங்கும், எவ்வளவு நேரம் ஆகும், சரியான விலை என்ன — பணம் செலுத்தும் முன்பே எல்லாம் தெரியும். மணி நேர கணக்கு இல்லை, முடிவில் ஆச்சரிய பில் இல்லை.",
      },
      {
        title: "நான் உருவாக்குகிறேன், நீங்கள் பார்க்கிறீர்கள்",
        desc: "முடிவில் மட்டுமல்ல, நடந்துகொண்டிருக்கும்போதே முன்னேற்றத்தை பார்க்கிறீர்கள். நாங்கள் ஒப்புக்கொண்டதற்குள் உள்ள மாற்றங்கள் இலவசம்.",
      },
      {
        title: "ஹேண்ட்-ஓவர் & சப்போர்ட்",
        desc: "உங்கள் டீமுக்கு எளிய மொழியில் பயன்படுத்த கற்றுக்கொடுக்கப்படும், பின் நிஜ பயன்பாட்டில் வரும் பிரச்சனைகளுக்கு ஒரு சப்போர்ட் காலமும் தரப்படும்.",
      },
    ],
  },

  testimonials: {
    kicker: "கிளையண்ட் முடிவுகள்",
    title: "கிளையண்ட்கள் என்ன சொல்கிறார்கள்",
    intro: "நிஜமான ப்ராஜெக்ட்களில் இருந்து நிஜமான கருத்துக்கள், முடிந்தவுடன்.",
    todoNote: "TODO — கீழே உள்ளவை ப்ளேஸ்ஹோல்டர்கள், நிஜ கிளையண்ட் கருத்துக்களுக்காக காத்திருக்கிறோம். இந்த பகுதி முடிந்தது என்று கருதும் முன் மாற்றவும்.",
    items: [
      { quote: "[கிளையண்ட் பெயர், தொழில் வகை] — அடைந்த முடிவு", name: "[கிளையண்ட் பெயர்]", role: "[தொழில் வகை]" },
      { quote: "[கிளையண்ட் பெயர், தொழில் வகை] — அடைந்த முடிவு", name: "[கிளையண்ட் பெயர்]", role: "[தொழில் வகை]" },
      { quote: "[கிளையண்ட் பெயர், தொழில் வகை] — அடைந்த முடிவு", name: "[கிளையண்ட் பெயர்]", role: "[தொழில் வகை]" },
      { quote: "[கிளையண்ட் பெயர், தொழில் வகை] — அடைந்த முடிவு", name: "[கிளையண்ட் பெயர்]", role: "[தொழில் வகை]" },
      { quote: "[கிளையண்ட் பெயர், தொழில் வகை] — அடைந்த முடிவு", name: "[கிளையண்ட் பெயர்]", role: "[தொழில் வகை]" },
    ],
  },

  faq: {
    kicker: "கேட்பதற்கு முன்",
    title: "நான் அதிகம் கேட்கும் கேள்விகள்",
    items: [
      {
        q: "எனக்கு டெக்னிக்கல் தெரிய வேண்டுமா?",
        a: "தேவையில்லை. உங்கள் பிரச்சனையை உங்கள் சொந்த வார்த்தைகளில் சொல்லுங்கள் — டெக்னிக்கல் பகுதியை நான் பார்த்துக்கொள்கிறேன், எல்லாவற்றையும் எளிய மொழியில் விளக்குகிறேன், ஜார்கன் இல்லாமல்.",
      },
      {
        q: "எனக்கு ஏற்கனவே வெப்சைட் அல்லது CRM இருந்தால்?",
        a: "பரவாயில்லை — பெரும்பாலான ப்ராஜெக்ட்கள் ஏற்கனவே இருப்பதில் இருந்தே தொடங்குகின்றன. இருப்பதை சரிசெய்வது நல்லதா, புதிதாக தொடங்குவது நல்லதா என்பதை நேர்மையாக சொல்கிறேன், எது உண்மையோ அதற்கு விலை தருகிறேன்.",
      },
      {
        q: "எவ்வளவு நேரம் ஆகும்?",
        a: "வேலையைப் பொறுத்தது — ஒரு தொடக்க வெப்சைட் 3–5 நாட்கள், CRM செட்அப் அல்லது ஆட்டோமேஷன் பொதுவாக 1–3 வாரங்கள். வேலை தொடங்கும் முன்பே உங்கள் விலையுடன் எழுத்துப்பூர்வ காலஅட்டவணை தருகிறேன்.",
      },
      {
        q: "ஹேண்ட்-ஓவருக்குப் பிறகு மாற்றங்கள் தேவைப்பட்டால்?",
        a: "நீங்கள் ஒருபோதும் மாட்டிக்கொள்ள மாட்டீர்கள். சிறு மாற்றங்கள் பொதுவாக வேகமாகவும் குறைந்த செலவிலும்; பெரிய மாற்றங்களுக்கு அசல் ப்ராஜெக்ட் போலவே நிலையான விலை தரப்படும். என்னால் மட்டுமே தொட முடியும் வகையில் எதுவும் உருவாக்கப்படாது.",
      },
      {
        q: "தொடர்ந்து சப்போர்ட் தருவீர்களா?",
        a: "ஆம். ஒவ்வொரு ப்ராஜெக்ட்டிலும் ஹேண்ட்-ஓவருக்குப் பிறகு ஒரு சப்போர்ட் காலம் அடங்கும், மேலும் நீங்கள் மீண்டும் யோசிக்க விரும்பவில்லை என்றால் தொடர்ச்சியான சப்போர்ட் திட்டங்களும் உள்ளன.",
      },
      {
        q: "ஒப்பந்தம் ஏதேனும் உள்ளதா?",
        a: "வேலை தொடங்கும் முன்பே எழுத்துப்பூர்வ ஸ்கோப்பும் விலையும் தருகிறேன், சிறு வேலைக்கு மேல் உள்ளதற்கு எளிய எழுத்துப்பூர்வ ஒப்பந்தமும் தருகிறேன். நீண்ட லாக்-இன் ஒப்பந்தங்கள் இல்லை — எந்த ப்ராஜெக்ட்டுக்குப் பிறகும் நிறுத்திக்கொள்ளலாம்.",
      },
    ],
    footerText: "பெரிய ரோல்அவுட் ஒன்று தடம்புரண்டு போச்சா?",
    footerCta: "ஃப்ரீலான்ஸ் திட்டங்களை பாருங்கள் →",
  },

  closing: {
    kicker: "இங்கே தொடங்குங்கள்",
    title: "உங்கள் இலவச ஆலோசனை அழைப்பை பதிவு செய்யுங்கள்",
    text: "இரண்டு மூன்று வரிகள் போதும் — நீங்கள் என்ன செய்கிறீர்கள், எது அதிக நேரம் எடுக்கிறது, எவ்வளவு விரைவில் தேவை. 24 மணி நேரத்திற்குள் ஒரு கேள்வியுடனோ அல்லது பேச ஒரு நேரத்துடனோ பதிலளிக்கிறேன்.",
    note: "இலவச ஆலோசனை, அழுத்தம் இல்லை, கடமை இல்லை.",
    emailPrefix: "ஈமெயில்:",
    form: {
      nameLabel: "பெயர்",
      emailLabel: "ஈமெயில்",
      phoneLabel: "போன்",
      phoneOptional: "(விருப்பம்)",
      companyLabel: "நிறுவனம்",
      companyOptional: "(விருப்பம்)",
      messageLabel: "உங்களை என்ன தொல்லைப்படுத்துகிறது?",
      messagePlaceholder: "உங்கள் தொழில் என்ன, எது அதிக நேரம் எடுக்கிறது, எப்போது தேவை…",
      submitLabel: "எனது விசாரணையை அனுப்பு",
      sendingLabel: "அனுப்புகிறது…",
      successTitle: "செய்தி அனுப்பப்பட்டது — நன்றி!",
      successText: "விரைவில் உங்களை தொடர்பு கொள்கிறேன்.",
      resendLabel: "மற்றொரு செய்தி அனுப்பு",
      errorText: "ஏதோ தவறு நடந்தது. தயவுசெய்து நேரடியாக எனக்கு ஈமெயில் அனுப்புங்கள்.",
      privacyText: "உங்கள் விவரங்கள் உங்களை தொடர்பு கொள்ள மட்டுமே பயன்படுத்தப்படும் — மார்க்கெட்டிங்கிற்கு பகிரப்படாது.",
      privacyLinkText: "தனியுரிமைக் கொள்கை",
    },
  },
};

export const businessCopy: Record<Lang, BusinessCopy> = { en, ta };
