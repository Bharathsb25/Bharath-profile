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
