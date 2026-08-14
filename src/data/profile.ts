export const profile = {
  name: "Bharath Sathiskumar",
  title: "Implementation Specialist — Delivery & Testing",
  tagline:
    "I help SaaS and enterprise teams turn complex product rollouts into smooth, on-time deliveries — and I use AI to strip the busywork out of the workflows that slow businesses down.",
  availability:
    "Open to full-time opportunities and available for freelance / contract projects.",
  photo: "/profile.jpg",
  resume: "/Bharath-Sathiskumar-CV.pdf",
  // Web3Forms access key. Public by design (used in client-side forms).
  // Rotate at https://web3forms.com if you start receiving spam.
  web3formsKey: "4eb5794c-8a0c-457f-a698-026a90552d07",
  email: "Sbharath23@outlook.com",
  phone: "+91 9944979507",
  linkedin: "https://www.linkedin.com/in/bharath-sb-4a9834146",
  location: "India",
  summary:
    "Results-driven Product Analyst and Implementation Specialist with experience in SaaS implementations, CRM delivery, functional testing, and client onboarding. Skilled in requirement gathering, cross-functional coordination, API integrations, workflow optimization, and enterprise application support. Proven ability to manage multiple projects, ensure timely delivery, and enhance customer experience through strong problem-solving and stakeholder management skills. Experienced in client interactions, process improvement initiatives, and delivering business-focused solutions aligned with organizational goals.",
};

export const highlights = [
  { value: "4+ yrs", label: "SaaS Implementation & Delivery" },
  { value: "Multi-region", label: "Concurrent Project Delivery" },
  { value: "MBA-IB", label: "International Business" },
  { value: "Power BI", label: "Certified Analyst" },
];

export type SkillGroup = {
  title: string;
  skills: string[];
  featured?: boolean;
};

export const skillGroups: SkillGroup[] = [
  {
    title: "AI & Intelligent Automation",
    featured: true,
    skills: [
      "AI-Assisted Solution Design & Delivery (Claude, ChatGPT)",
      "Prompt Engineering for Business Workflows",
      "LLM-Powered Automation & Integrations",
      "AI-Driven Documentation & Requirement Drafting",
      "AI-Assisted Testing & Data Validation",
      "Building AI Chat & Support Assistants",
    ],
  },
  {
    title: "Project & Delivery",
    skills: [
      "Project Planning & Execution",
      "End-to-End Implementation",
      "Agile, Scrum & PMP Methodologies",
      "Risk & Issue Management",
      "Release & Deployment Coordination",
      "Go-Live Support & Hypercare",
    ],
  },
  {
    title: "Client & Stakeholder Management",
    skills: [
      "Client Relationship Management",
      "Cross-Functional Team Coordination",
      "Stakeholder Communication",
      "Customer Onboarding & Training",
      "CSAT / NPS & Voice of Customer",
      "Support & SLA Management",
    ],
  },
  {
    title: "Analysis & Quality",
    skills: [
      "Requirement Analysis & Documentation",
      "Functional & Regression Testing",
      "UAT & Quality Assurance",
      "Data Validation & Migration",
      "Root Cause Analysis",
      "A/B Testing",
    ],
  },
  {
    title: "Systems & Integration",
    skills: [
      "API & Software Integration (REST, Webhooks)",
      "CRM Platforms & Configuration",
      "ERP / HRMS Systems",
      "Workflow Automation & Rules Engines",
      "AI-Assisted Workflows (Claude)",
      "Data Analysis & Reporting (Power BI)",
      "Postman API Testing",
    ],
  },
];

export const toolsAndTech = [
  "Power BI",
  "Claude AI",
  "ChatGPT",
  "MS Excel",
  "Jaspersoft",
  "Postman",
  "Freshdesk",
  "Jira",
  "LeadSquared",
  "HRMS Platforms",
  "SMS Gateways (Dai4SMS, Netyfish)",
];

export const services = [
  {
    title: "Education CRM & Admissions Funnel",
    desc: "End-to-end admissions setup for schools, colleges & ed-tech — enquiry capture, lead scoring, counselor routing, application-to-enrollment tracking, fee workflows, and SMS / WhatsApp / email journeys. Built on LeadSquared and other leading education CRM platforms.",
  },
  {
    title: "Onboarding Process Design",
    desc: "A self-service client intake wizard, section-level auto-task activation, and a tiered SLA escalation ladder (assignee → PM → senior) — replacing manual status-chasing with real-time visibility for every stakeholder.",
  },
  {
    title: "Implementation Rescue",
    desc: "Stalled, slipping, or over-budget rollout? I step in, diagnose where delivery broke down, re-baseline scope and timeline, and drive it to go-live — built for urgent, at-risk projects.",
  },
  {
    title: "Fractional Implementation Manager",
    desc: "Implementation leadership for small SaaS teams without a full-time hire — a few days a month owning delivery process, onboarding quality, and go-live readiness. Available on retainer.",
  },
  {
    title: "Business Process Automation",
    desc: "I map your manual workflows and rebuild them to run themselves — auto-routing, reminders, SLA escalations, and real-time visibility — designed and shipped faster with AI tools like Claude.",
  },
  {
    title: "Functional & UAT Testing",
    desc: "Functional and regression testing, UAT coordination, and go-live quality gates that catch issues before your customers do.",
  },
  {
    title: "Dashboards & Reporting",
    desc: "Power BI dashboards and MIS reporting that turn scattered data into decisions your team can act on.",
  },
  {
    title: "Messaging Compliance — DLT & SMS/WhatsApp",
    desc: "End-to-end DLT registration, template approvals, and SMS/WhatsApp gateway configuration — fully TRAI-compliant.",
  },
];

/* ---------------------------------------------------------------
   Freelance page (/freelance) — hire-me-for-a-project content.
   NOTE: no rupee/dollar figures anywhere on purpose. Every package
   quotes after a scoping call. Swap `price` for real numbers once
   you've settled on rates.
---------------------------------------------------------------- */
export const freelance = {
  kicker: "Freelance & Contract",
  headline: "Your rollout is stuck. I get it live.",
  subhead:
    "I'm an Implementation Specialist who does this full-time for a SaaS company — and takes on a small number of freelance projects on the side. Education CRM & admissions funnels, client onboarding, workflow automation, and rescuing implementations that have stalled.",
  availability:
    "Taking on a limited number of projects at a time, so each one gets real attention.",
  responseTime: "Replies within 24 hours",
  facts: [
    { value: "4+ yrs", label: "SaaS implementation & delivery" },
    { value: "Multi-region", label: "Concurrent rollouts delivered" },
    { value: "Fixed scope", label: "Quoted in writing before we start" },
    { value: "IST", label: "Overlaps EMEA & APAC hours" },
  ],
  packages: [
    {
      name: "Admissions Funnel Sprint",
      ideal: "Schools, colleges & ed-tech with a leaky enquiry-to-enrollment process",
      price: "Fixed quote after scoping call",
      timeline: "2–4 weeks",
      featured: true,
      includes: [
        "Enquiry capture across every source — forms, calls, walk-ins, campaigns",
        "Lead scoring and counselor routing rules that match how your team actually works",
        "Application-to-enrollment stage tracking with drop-off visibility",
        "Fee workflows plus SMS / WhatsApp / email journeys",
        "Counselor training and a written handover doc",
      ],
    },
    {
      name: "Implementation Rescue",
      ideal: "A rollout that has slipped its date, blown its budget, or gone quiet",
      price: "Diagnostic first, then a fixed quote",
      timeline: "1 week diagnostic",
      includes: [
        "Diagnostic on where delivery actually broke down — scope, data, ownership or comms",
        "Honest re-baselined scope and timeline you can show your stakeholders",
        "A prioritised path to go-live, with what to cut and what to keep",
        "Optional: I stay on and drive it to go-live myself",
      ],
    },
    {
      name: "Automation Build",
      ideal: "Teams still running a core process on spreadsheets, email and chasing",
      price: "Fixed quote after scoping call",
      timeline: "2–5 weeks",
      includes: [
        "Current-state process map — every handoff, wait and manual step, written down",
        "Rebuilt flow with auto-routing, reminders and tiered SLA escalation",
        "Real-time status visibility for everyone involved, internal and client-side",
        "Built and shipped faster with AI tooling (Claude) — you keep the documentation",
      ],
    },
    {
      name: "Fractional Implementation Manager",
      ideal: "Small SaaS teams that need delivery leadership but not a full-time hire",
      price: "Monthly retainer",
      timeline: "A few days a month, ongoing",
      includes: [
        "I own your delivery process, onboarding quality and go-live readiness",
        "Templates, checklists and SLA structure your team keeps for good",
        "Weekly checkpoint plus a written status your founders can read",
        "Escalation cover when a client rollout starts wobbling",
      ],
    },
  ],
  addOns: [
    "Functional & regression testing pass",
    "UAT coordination and go-live quality gate",
    "Power BI dashboards & MIS reporting",
    "DLT registration + SMS/WhatsApp gateway setup (TRAI-compliant)",
    "API & webhook integration testing (Postman)",
    "Data validation & migration checks",
  ],
  process: [
    {
      title: "Discovery call",
      desc: "30 minutes, free. You tell me what's broken and what 'done' looks like. If I'm not the right person, I'll say so on the call.",
    },
    {
      title: "Scope & fixed quote",
      desc: "You get deliverables, timeline, dependencies and price in writing — before any money or work changes hands.",
    },
    {
      title: "Build in checkpoints",
      desc: "Weekly demo and a written update. No month-long silences, and no nasty surprise at the end.",
    },
    {
      title: "UAT & handover",
      desc: "We test against the scope, your team gets trained, and you get the documentation. No black boxes only I can operate.",
    },
    {
      title: "Post-go-live support",
      desc: "An agreed support window after launch to catch the things real usage always surfaces.",
    },
  ],
  principles: [
    {
      title: "A specialist, not a generalist",
      desc: "This is my day job, not a side skill I picked up. CRM delivery, onboarding and go-live are what I do all week.",
    },
    {
      title: "Fixed scope, fixed price",
      desc: "You know the number before we start. If scope genuinely changes, we re-quote in writing — no creeping invoices.",
    },
    {
      title: "You own everything",
      desc: "Process maps, configuration notes, training material and admin access are all handed over. You are never locked in to me.",
    },
    {
      title: "I'll tell you when it's not worth it",
      desc: "If the fix is smaller than the project you asked for, I'll say that — and quote the smaller thing.",
    },
  ],
  faqs: [
    {
      q: "How do we start?",
      a: "Send the form at the bottom of this page with a couple of lines on what's stuck. I reply within 24 hours and we set up a 30-minute call. You get a written scope and quote after that call.",
    },
    {
      q: "How do you charge?",
      a: "Fixed price per project for defined scope, or a monthly retainer for fractional work. I share the number after the scoping call, once I actually know what the work involves — never a blind rate card.",
    },
    {
      q: "Which platforms do you work in?",
      a: "LeadSquared and other leading education CRM and admissions platforms; Freshdesk and Jira for support and delivery tracking; Power BI and Jaspersoft for reporting; Postman for API and webhook testing; DLT portals and SMS/WhatsApp gateways for messaging compliance. If you're on a platform I haven't named, the delivery process transfers — say which one and I'll tell you honestly how much ramp-up it needs.",
    },
    {
      q: "Can you work alongside my existing team or vendor?",
      a: "Yes — a lot of the work is exactly that. I plug into your delivery team or coordinate with your implementation vendor, and I'm comfortable being the one who chases the dependencies.",
    },
    {
      q: "What about NDAs and access to our data?",
      a: "Happy to sign an NDA before we discuss specifics. I work with the least access that gets the job done, prefer masked or sample data for testing, and hand back or drop credentials at the end of the engagement.",
    },
    {
      q: "Do you also take full-time roles?",
      a: "Yes. If you're hiring rather than contracting, the main site has my experience, case study and CV.",
    },
  ],
  cta: {
    title: "Tell me what's stuck",
    text: "A couple of lines is enough to start — the platform you're on, what's not working, and when you need it live. I'll reply within 24 hours with either questions or a call slot.",
  },
};

/* ---------------------------------------------------------------
   Business Solutions page — route /services (NOT the homepage
   "#services" anchor, which is the implementation-services section).

   DIFFERENT AUDIENCE from the rest of the site: small & local
   businesses — shops, clinics, schools, small firms and individual
   professionals. Write in plain English here. No "implementation",
   "stakeholder", "SLA", "hypercare", "enterprise", "SaaS".

   PRICING RULE: only the Basic website tier carries a number.
   Everything else is quoted after a call — same rule as /freelance.
   If you add a price anywhere else, you are breaking the rule that
   the `websites.note` caption promises the reader.
---------------------------------------------------------------- */

export type WebsiteTier = {
  name: string;
  /** The "Best for:" line. */
  ideal: string;
  /** Amount slot — same visual weight on every tier, never left blank. */
  price: string;
  /** Always present. This is what stops a quoted tier looking unfinished. */
  priceNote: string;
  timeline: string;
  featured?: boolean;
  includes: string[];
};

export type BusinessOffering = {
  title: string;
  desc: string;
  /**
   * One SVG path `d`, 24x24 viewBox, stroke style. Multi-part glyphs use
   * m/M continuations inside this single string — never two <path> elements.
   */
  icon: string;
  /** Optional accent line under the title. */
  tagline?: string;
  /** Optional link — an in-page anchor or a route. */
  href?: string;
  /** Link text. Defaults to "Learn more" if href is set without one. */
  linkLabel?: string;
};

export type BusinessCategory = {
  id: string;
  /** A letter, not a number — so it can't be read as a section index. */
  letter: string;
  title: string;
  intro: string;
  /** Resolved through a literal class map in BusinessCatalogue.tsx. */
  cols: 3 | 4;
  items: BusinessOffering[];
};

export const businessServices = {
  kicker: "For Small & Local Business",
  headline: "Tech that fits a business your size.",
  headlineAccent: "No jargon, no lock-in.",
  subhead:
    "Websites, software, automation and branding for shops, clinics, schools, small firms and individual professionals. You describe the problem in your own words — I handle the technical part, and you get the price in writing before anything starts.",
  availability:
    "Four years building and fixing business systems for companies. Now available to businesses your size.",
  responseTime: "24-hour reply SLA",
  audience: [
    "Shops & retail",
    "Clinics & doctors",
    "Schools & coaching centres",
    "Lawyers & consultants",
    "Trainers & freelancers",
    "Small manufacturers",
    "Local service businesses",
  ],
  // Deliberately no price here — see the pricing rule above.
  facts: [
    { value: "Fixed price", label: "Agreed in writing before any work starts" },
    { value: "Plain English", label: "No jargon and no tech lectures" },
    { value: "You own it", label: "Full access and handover, never locked in" },
    { value: "24 hrs", label: "Reply SLA on every enquiry" },
  ],

  websites: {
    kicker: "Websites",
    title: "A website for your practice or your company",
    intro:
      "For doctors, lawyers, consultants, trainers and freelancers — and for shops, clinics, schools and small firms. Three sizes, so you only pay for what you actually need.",
    tiers: [
      {
        name: "Basic",
        ideal:
          "One clear page that says who you are, what you do, and how to reach you.",
        price: "From ₹500",
        priceNote:
          "Single page, using content you provide. Confirmed once I see it.",
        timeline: "3–5 days",
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
        priceNote:
          "Depends on how many pages there are and how much content needs writing.",
        timeline: "1–2 weeks",
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
        includes: [
          "Everything in Standard, plus features built for your business",
          "Online booking and appointments, or a product catalogue",
          "Online payments with receipts sent out automatically",
          "Admin panel so your team can update content and see enquiries",
          "Written handover — you own everything, no lock-in",
        ],
      },
    ] as WebsiteTier[],
    note: "Only the starter tier carries a fixed number, because it's the only one where the scope is fixed. The other two are quoted after a short call, so you never end up paying for pages or features you don't need.",
  },

  /**
   * The launch bundle — logo + packaging + website bought together.
   * Quoted as one job, no number here (see the pricing rule above).
   */
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

  categories: [
    {
      id: "build",
      letter: "A",
      title: "Build & Automate",
      intro:
        "Something that doesn't exist yet — or something you're still doing by hand.",
      cols: 3,
      items: [
        {
          title: "Websites",
          desc: "A site that looks right on a phone, tells people what you do, and makes it one tap to call or message you. Three sizes to choose from.",
          href: "#websites",
          linkLabel: "See the plans",
          icon: "M3 6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Zm0 3.5h18M6 7.2h.01M8.4 7.2h.01",
        },
        {
          title: "Custom Software Development",
          desc: "Software built around how your business actually works, for when the ready-made tools don't fit — billing, records, scheduling, whatever you're doing by hand today.",
          icon: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm5.5 5L7 12.5l2.5 2.5m5-5 2.5 2.5-2.5 2.5",
        },
        {
          title: "Business Automation Solutions",
          tagline: "Share your problem, we build the fix",
          desc: "Tell me the job that eats your week — reminders, follow-ups, reports, re-typing the same data — and I'll build something that does it for you, using tools you already pay for.",
          icon: "M12 4.5a7.5 7.5 0 0 1 7.1 5M19.5 4v5.5H14M12 19.5a7.5 7.5 0 0 1-7.1-5M4.5 20v-5.5H10",
        },
      ],
    },
    {
      id: "systems",
      letter: "B",
      title: "Systems & Integrations",
      intro:
        "Getting the tools you already pay for to talk to each other — and to hold clean data.",
      cols: 3,
      items: [
        {
          title: "CRM Setup & Migration",
          desc: "Every enquiry, customer and follow-up in one place instead of a WhatsApp group and a notebook. Set up on Zoho, HubSpot or Freshsales, with your old records moved in.",
          icon: "M3 6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Zm6 4.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-2.6 6.2c.4-1.3 1.4-2 2.6-2s2.2.7 2.6 2M14.5 9.5h4m-4 3h4m-4 3h2.5",
        },
        {
          title: "ERP & Inventory Setup",
          desc: "Know what stock you have, what it cost and what's running out — with purchases, sales and billing joined up instead of tracked in three different places.",
          icon: "M12 3 4 6.8v10.4L12 21l8-3.8V6.8L12 3Zm0 7.6L4 6.8m8 3.8 8-3.8m-8 3.8V21",
        },
        {
          title: "Data Cleanup & Migration",
          desc: "Years of messy Excel sheets turned into clean, duplicate-free data that your new system will actually accept.",
          icon: "M4 5h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm-1 4.5h11M8.5 5v14M17 12h5m0 0-2.5-2.5M22 12l-2.5 2.5",
        },
        {
          title: "Payment Gateway Integration",
          desc: "Take card, UPI and netbanking payments on your site or your invoices, with receipts going out automatically.",
          icon: "M3 7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Zm0 3.5h18M6.5 14.5h3",
        },
        {
          title: "SMS Integration",
          desc: "Order updates, appointment reminders and OTPs sent automatically — including the DLT registration and template approvals India requires.",
          icon: "M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1Zm4 5.5h.01M12 10.5h.01M16 10.5h.01",
        },
        {
          title: "WhatsApp Business API & Chatbot",
          desc: "A proper WhatsApp business number that answers the common questions on its own, sends confirmations, and passes real conversations to your team.",
          icon: "M12 3a9 9 0 0 0-7.7 13.7L3 21l4.4-1.3A9 9 0 1 0 12 3Zm-2.5 8.5h.01M14.5 11.5h.01M9.2 14.5c1.6 1.2 4 1.2 5.6 0",
        },
      ],
    },
    {
      id: "insight",
      letter: "C",
      title: "Numbers, Reports & Research",
      intro:
        "Knowing what the business is actually doing — the money, the reports, and the research behind a decision.",
      // 8 items at 4 columns = two clean rows.
      cols: 4,
      items: [
        {
          title: "Dashboard Creation",
          desc: "One screen showing sales, enquiries, stock or staff performance — updated on its own, so you stop rebuilding the same sheet every month.",
          icon: "M3 5h7v6H3V5Zm11 0h7v4h-7V5ZM3 15h7v4H3v-4Zm11-2h7v6h-7v-6Z",
        },
        {
          title: "Report Building & MIS",
          desc: "The weekly and monthly reports your business runs on, built once and reused — sales, collections, stock and staff, without anyone rebuilding a sheet by hand.",
          icon: "M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 0v4h4M9 16v-3m3 3v-5m3 5v-2",
        },
        {
          // Analysis and interpretation only — never audit, certification or filing.
          title: "Financial Statement Analysis",
          desc: "Your P&L, balance sheet and cash flow read back to you in plain language — where the money actually goes, what's improving, and what needs attention.",
          icon: "M5 20V9m4.5 11V4m4.5 16v-7m4.5 7V7M3 20h18",
        },
        {
          title: "Budgeting & Forecasting",
          desc: "A budget for the year ahead and a projection of revenue, costs and cash — so a shortfall shows up on paper months before it shows up in the bank.",
          icon: "M3 17.5 8.5 12l3.5 3.5L20.5 7M20.5 7h-4.8m4.8 0v4.8M3 20.5h18",
        },
        {
          title: "Cost, Pricing & Break-even",
          desc: "What each product or service really costs you once everything is counted, what to price it at, and how much you need to sell before you're in profit.",
          icon: "M12 2v20m4.5-15.5c-.8-1.4-2.5-2.2-4.5-2.2-2.5 0-4.5 1.2-4.5 3.2 0 4.5 9 2.5 9 7 0 2-2 3.3-4.5 3.3-2.1 0-3.9-.9-4.6-2.4",
        },
        {
          title: "IPO & Investment Analysis",
          desc: "A plain-language read on an upcoming IPO or an investment — what the company actually earns, the risks buried in the fine print, and whether the numbers support the price.",
          href: "/samples",
          linkLabel: "View sample reports",
          icon: "M4 19h16M6.5 16V9.5M11 16V5.5m4.5 10.5V11M20 16v-3.5",
        },
        {
          title: "Process Documentation & SOPs",
          desc: "How your business runs, written down step by step — so training someone new takes days instead of months, and quality doesn't depend on one person.",
          icon: "M9 4h6v3H9V4Zm-2 1H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-1m-8.5 6.5 1.5 1.5 3-3M8.5 16l1.5 1.5 3-3",
        },
        {
          title: "Business R&D",
          desc: "Research before you commit — is there demand, what are competitors charging, which tool is worth paying for — handed to you as a decision, not a pile of links.",
          icon: "M12 3a5.5 5.5 0 0 0-3.2 10c.6.5.9 1.1.9 1.8V16h4.6v-1.2c0-.7.3-1.3.9-1.8A5.5 5.5 0 0 0 12 3Zm-2.3 16h4.6M10.5 21h3",
        },
      ],
    },
    {
      id: "brand",
      letter: "D",
      title: "Brand & Presence",
      intro:
        "Looking like a business people trust, before they've even called you.",
      cols: 4,
      items: [
        {
          title: "Brand Identity Kit",
          desc: "Logo, colours, fonts, business card and letterhead as one matching set, with the right files for both print and online.",
          icon: "M12 3a9 9 0 0 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1 .8-1.5 1.8-1.5H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7Zm-4.5 8h.01M9.5 7.5h.01m4 0h.01M16.5 11h.01",
        },
        {
          title: "Package Design",
          desc: "Product and packaging design that carries your brand onto the shelf — labels, boxes and wrappers, with print-ready files your printer can use.",
          icon: "M3 8h18v3H3V8Zm1 3v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9M12 8v13M12 8S10.5 4 8.5 4a2 2 0 0 0 0 4M12 8s1.5-4 3.5-4a2 2 0 0 1 0 4",
        },
        {
          title: "Social Media Kit Design",
          desc: "Profile pictures, covers and post templates that match your brand, so all your pages look like they belong to the same business.",
          icon: "M6 4h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm2 14v1a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1M5.5 12.5 8.5 10l2.5 2 2-1.5 3 3",
        },
        {
          title: "Pitch Deck & Company Profile",
          desc: "A clean deck or company profile you can send to a client, a bank or an investor without apologising for it first.",
          icon: "M4 4h16v10H4V4Zm8 10v4m-3.5 2 3.5-2 3.5 2M3 4h18",
        },
      ],
    },
  ] as BusinessCategory[],

  process: [
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

  faqs: [
    {
      q: "How much will it cost?",
      a: "Websites start from ₹500 for a single-page starter site. Everything else depends on what's involved, so I give you a fixed price after a short call — never a blind rate card that turns out to be wrong later.",
    },
    {
      q: "I'm not technical. Is that a problem?",
      a: "Not at all. You describe the problem in your own words. I handle the technical part and explain what I'm doing in plain language, not jargon.",
    },
    {
      q: "Do I have to buy a big package?",
      a: "No. Almost everything on this page can be done on its own. If the fix is smaller than what you asked for, I'll tell you and quote the smaller thing.",
    },
    {
      q: "Will I be able to run it myself afterwards?",
      a: "Yes. You get admin access, a short walkthrough and written instructions. Nothing is built so that only I can operate it.",
    },
    {
      q: "Do you work with businesses outside my city?",
      a: "Yes — nearly all of this is done remotely over calls and WhatsApp. Site visits are possible within Tamil Nadu.",
    },
  ],

  cta: {
    title: "Tell me what's slowing your business down",
    text: "Two or three lines is enough — what you do, what's taking too much time, and how soon you need it. I'll reply within 24 hours with either a couple of questions or a time to talk.",
    note: "Free first call · Fixed price before any work starts · No obligation",
  },
};

/* ---------------------------------------------------------------
   The AI band on the homepage. No time/speed claims here on purpose —
   these describe what AI is used for, not how fast it goes.
---------------------------------------------------------------- */
export const aiEdge = {
  kicker: "AI-Accelerated Delivery",
  headline: "Same delivery discipline. Less of the busywork.",
  intro:
    "AI hasn't changed what good implementation looks like — scope, testing, training and go-live still decide whether a rollout lands. What it changes is how much of the week goes into the paperwork around them. That effort goes back into the client.",
  points: [
    {
      title: "Documentation that keeps up with delivery",
      desc: "Kickoff decks, status packs, training material and process documentation drafted with AI — so paperwork is never the reason a review slips.",
      // presentation board
      icon: "M4 4h16v11H4V4Zm8 11v5m-4 0h8M9.5 11.5l2.5-3 2 2.2 2.5-3.2",
    },
    {
      title: "Findings, not spreadsheets",
      desc: "Onboarding data, SLA breaches, CSAT and usage trends analysed with AI — I bring the conclusion to the meeting, not the raw export.",
      // bar chart with magnifier
      icon: "M4 20V10m5 10V6m5 14v-6M20 20V4M2 20h20",
    },
    {
      title: "Automations built and tested, not queued",
      desc: "Workflow rules, integration scripts and validation checks written, tested and fixed with AI in the loop — which is why automation stopped being a big-ticket project.",
      // code brackets
      icon: "m9 8-4 4 4 4m6-8 4 4-4 4M13.5 5.5l-3 13",
    },
  ],
  credential: {
    text: "Certified — AI Tools & ChatGPT Workshop, be10x",
    date: "August 2026",
    href: "#education",
  },
  usedFor: [
    "Requirement drafting & documentation",
    "Test case generation & data validation",
    "Client comms and status reporting",
    "Workflow and integration design",
    "Dashboard and report scaffolding",
  ],
};

export const experience = [
  {
    role: "Implementation Specialist — Delivery & Testing (Level II)",
    company: "Meritto",
    period: "Feb 2026 — Current",
    points: [
      "Own end-to-end CRM delivery — aligning solutions with client requirements and business processes across the full implementation lifecycle.",
      "Coordinate cross-functional teams to manage CRM change requests and development tasks, keeping enhancements on schedule.",
      "Lead functional and regression testing of CRM changes, surfacing defects early to protect application quality and stability.",
      "Manage client coordination and project activities end to end, driving smooth execution, fast issue resolution, and consistent quality standards.",
    ],
  },
  {
    role: 'Product Analyst — "Implementation Team"',
    company: "Octoze Technologies",
    period: "Feb 2024 — Feb 2026",
    points: [
      "Delivered multiple concurrent CRM implementations across regions, driving smooth go-lives and high client satisfaction.",
      "Safeguarded data integrity through rigorous validation and accuracy checks during onboarding and implementation.",
      "Streamlined operational and BA workflows by identifying gaps and driving process enhancements that lifted delivery efficiency.",
      "Oversaw API integrations, testing, and validation to keep systems reliable and well-connected.",
      "Led user onboarding, training sessions, and product walkthroughs that accelerated adoption and reduced support dependency.",
      "Analyzed product usage and market trends to shape feature enhancements and strengthen client success.",
      "Managed client communications, on-site visits, and progress reviews to deepen engagement and trust.",
    ],
  },
  {
    role: 'Product Analyst — "Support Team"',
    company: "Octoze Technologies",
    period: "Jan 2023 — Feb 2024",
    points: [
      "Supported and delivered multiple concurrent projects across states, ensuring smooth delivery and timely issue resolution.",
      "Owned the Customer Satisfaction (CSAT) process end to end — initiating, managing, and following up to raise service quality.",
      "Resolved complex technical and functional issues through structured root-cause analysis, escalating when needed to maintain continuity.",
      "Conducted on-site client visits to strengthen relationships and track support progress.",
      "Partnered with cross-functional teams to prioritize customer feedback and drive continuous process improvements.",
    ],
  },
  {
    role: "Assistant Manager",
    company: "Sri RAK Jewellers",
    period: "Jun 2022 — Nov 2022",
    points: [
      "Managed customer relations, inventory, and customized order fulfillment for the retail operation.",
      "Ensured product quality, supervised cash flow, and led team efficiency improvements.",
      "Contributed to CRM development and product R&D, consistently achieving high customer satisfaction.",
    ],
  },
];

export const featuredProject = {
  title: "Automated Client Onboarding & Implementation Workflow",
  role: "Process Owner & Automation Designer",
  type: "End-to-end process automation",
  summary:
    "Designed and implemented an end-to-end automation for client onboarding — from deal closure to go-live — replacing manual status-chasing with a self-service intake system, automated task routing, and a tiered escalation engine. Cut onboarding friction and gave every stakeholder real-time visibility into progress.",
  client: "B2B SaaS delivery team · multi-region client onboarding",
  problem:
    "Onboarding ran on manual status-chasing across email and spreadsheets — no single source of truth, slow handoffs between client and delivery, and SLA slips that only surfaced after the client complained.",
  // Qualitative outcomes (swap for real figures once confirmed).
  outcomes: [
    { value: "Faster", label: "Onboarding cycle time" },
    { value: "Real-time", label: "Stakeholder visibility" },
    { value: "Fewer", label: "SLA breaches" },
    { value: "Zero", label: "Manual status-chasing" },
  ],
  flow: [
    {
      title: "Deal Close",
      desc: "Auto-triggers tenant setup, invoicing & a secure OTP-gated intake email.",
    },
    {
      title: "Self-Service Intake",
      desc: "Dynamic wizard — shows only purchased modules, with edit-locks, timed reminders & full versioning.",
    },
    {
      title: "Auto Task Activation",
      desc: "A completed section flips the matching internal task live and routes it to the right owner — zero chasing.",
    },
    {
      title: "Tiered Escalation",
      desc: "3-level SLA ladder (assignee → PM → senior) fires across email, chat & internal channels before the client ever notices.",
    },
    {
      title: "Go-Live",
      desc: "Supports single-shot or phased go-live, each phase tracked as its own milestone.",
    },
  ],
  highlights: [
    "OTP-authenticated intake gating for authorized stakeholders only",
    "Section-level concurrent-edit locks with snapshotted versioning",
    "Milestone-based customer updates plus an automated weekly digest",
    "End-to-end DLT registration & SMS/WhatsApp gateway setup (TRAI-compliant)",
  ],
  tags: [
    "Process Automation",
    "Workflow Design",
    "Customer Onboarding",
    "SLA Management",
    "DLT Registration",
    "SMS/WhatsApp Config",
  ],
  businessCta: {
    title: "Want to automate your business?",
    text: "From onboarding to go-live, I design workflows that run themselves — less manual chasing, more visibility for everyone. If that sounds useful, ping me.",
    button: "Ping me →",
  },
};

export const education = [
  {
    degree: "MBA — International Business",
    school: "Vinayaka Missions Kirupananda Variyar Engineering College",
    period: "May 2022",
    detail: "CGPA 7.8",
  },
  {
    degree: "BBA — Computer Applications",
    school: "Avs College of Arts & Science",
    period: "Jul 2019",
    detail: "CGPA 6.3",
  },
];

export type Certification = {
  name: string;
  date: string;
  issuer?: string;
  /** Path under /public. Certs with an image also appear in the certificate wall. */
  image?: string;
  /** Intrinsic pixel size of `image` — required by next/image. */
  width?: number;
  height?: number;
  /** What the certificate actually attests to, shown under the thumbnail. */
  detail?: string;
  /** Capability chips from the certificate itself. */
  skills?: string[];
  /** Certificate / credential number printed on the certificate. */
  credentialId?: string;
};

export const certifications: Certification[] = [
  {
    name: "AI Tools & ChatGPT Workshop",
    issuer: "be10x",
    date: "Aug 2026",
    image: "/certificates/be10x-ai-tools-workshop.png",
    width: 1136,
    height: 762,
    detail:
      "Building presentations, data analysis, and code with AI — applied to delivery and reporting work.",
    skills: ["Presentations with AI", "Data analysis with AI", "Code & debugging with AI"],
  },
  {
    name: "Power BI",
    issuer: "Mind Luster",
    date: "Jul 2023",
    credentialId: "559407733",
    image: "/certificates/mindluster-power-bi.jpg",
    width: 1600,
    height: 1131,
    detail:
      "Certificate of Achievement — dashboard building, data modelling and MIS reporting, used across client delivery.",
    skills: ["Dashboards", "Data modelling", "MIS reporting"],
  },
  {
    name: 'International Conference — "Opportunities and Challenges in Management, Economics and Accounting"',
    date: "Jan 2019",
  },
  { name: "GST Master Class", date: "Jul 2017" },
];

export const training = {
  title: "Business Development Associate (BDA) — BYJU'S",
  points: [
    "Effective customer communication",
    "Building a strong rapport",
    "Understanding and addressing customer queries",
    "Delivering compelling product pitches",
    "Attracting and engaging customers",
    "Utilizing various methodologies and techniques",
  ],
};

export const awards = ["Camu Star Award"];

export const languages = ["Tamil", "English", "Telugu", "Hindi"];

export const blogUrl = "https://learnmoregrowmore0.blogspot.com";

export const publications = [
  {
    title:
      "Automation and AI Are Not a Luxury Anymore — They're the Next Stage of Your Business",
    excerpt:
      "Automation and AI have shifted from optional to essential — enabling faster operations and better employee experiences.",
    date: "Jul 2026",
    url: "https://learnmoregrowmore0.blogspot.com/2026/07/automation-and-ai-are-not-luxury.html",
  },
  {
    title: "Beyond Revenue: The Real Metric of Business Success",
    excerpt:
      "Lasting success comes from building customer trust through consistent problem-solving, not short-term profit.",
    date: "Jan 2026",
    url: "https://learnmoregrowmore0.blogspot.com/2026/01/beyond-revenue-real-metric-of-business.html",
  },
  {
    title: "Cost-Cutting Isn't Strategy — It's a Valuation Trap",
    excerpt:
      "Growth through strategic investment beats short-term cost reduction for building sustainable business value.",
    date: "Dec 2025",
    url: "https://learnmoregrowmore0.blogspot.com/2025/12/cost-cutting-isnt-strategy-its.html",
  },
  {
    title: "Why Business Management Fails: The Missing Root Cause Analysis",
    excerpt:
      "Teams should run thorough root-cause analysis on problems instead of applying temporary fixes to recurring issues.",
    date: "Dec 2025",
    url: "https://learnmoregrowmore0.blogspot.com/2025/12/why-business-management-fails-missing.html",
  },
  {
    title: "Unlocking Product Growth: Why Market Focus Makes All the Difference",
    excerpt:
      "Product success hinges on choosing between broad generalist platforms and specialized niche tools.",
    date: "Jun 2025",
    url: "https://learnmoregrowmore0.blogspot.com/2025/06/the-secret-to-product-success-playing.html",
  },
];
