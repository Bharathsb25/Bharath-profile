export const profile = {
  name: "Bharath Sathiskumar",
  title: "CRM Implementation Specialist — Delivery & Testing",
  tagline:
    "I help SaaS and enterprise teams turn complex CRM rollouts into smooth, on-time deliveries — from requirement gathering and integrations to testing, onboarding, and client success.",
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
    "Results-driven Product Analyst and CRM Implementation Specialist with experience in SaaS implementations, CRM delivery, functional testing, and client onboarding. Skilled in requirement gathering, cross-functional coordination, API integrations, workflow optimization, and enterprise application support. Proven ability to manage multiple projects, ensure timely delivery, and enhance customer experience through strong problem-solving and stakeholder management skills. Experienced in client interactions, process improvement initiatives, and delivering business-focused solutions aligned with organizational goals.",
};

export const highlights = [
  { value: "4+ yrs", label: "CRM & SaaS Implementation" },
  { value: "Multi-region", label: "Concurrent Project Delivery" },
  { value: "MBA-IB", label: "International Business" },
  { value: "Power BI", label: "Certified Analyst" },
];

export const skillGroups = [
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
      "Data Analysis & Reporting (Power BI)",
      "Postman API Testing",
    ],
  },
];

export const toolsAndTech = [
  "Power BI",
  "MS Excel",
  "Jaspersoft",
  "Postman",
  "Freshdesk",
  "Jira",
  "LeadSquared",
  "HRMS Platforms",
  "SMS Gateways (Dai4SMS, Netyfish)",
];

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
  businessCta:
    "Need this for your business? I've handled DLT registration and SMS/WhatsApp configuration end-to-end — happy to set it up for you.",
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

export const certifications = [
  { name: "Power BI Certification", date: "Jul 2023" },
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

export const publications = [
  {
    title: "The Secret to Product Success — Playing the Long Game",
    url: "https://learnmoregrowmore0.blogspot.com/2025/06/the-secret-to-product-successplaying.html",
  },
  {
    title: "Why Business Management Fails — The Missing Piece",
    url: "https://learnmoregrowmore0.blogspot.com/2025/12/why-business-management-failsmissing.html",
  },
];
