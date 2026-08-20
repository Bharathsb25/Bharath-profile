/* ---------------------------------------------------------------
   Sample work published at /samples — IPO validation reports.

   The report HTML lives in src/content/samples/*.html, deliberately
   NOT in public/. A file under public/ gets its own URL that anyone
   can hit and save directly; outside public/ there is no standalone
   URL at all, and the viewer renders it into an iframe srcDoc.

   These reports state Subscribe / Apply / Avoid on named Indian IPOs.
   `disclaimer` below MUST be rendered outside the report frame on
   every page that shows one. Do not move it into a footer, do not
   shrink it to grey micro-copy, and do not add a download or print
   control anywhere on these pages.
---------------------------------------------------------------- */

export type WorkSample = {
  slug: string;
  title: string;
  company: string;
  /** Filename inside src/content/samples/ */
  file: string;
  date: string;
  kind: string;
  summary: string;
  /** Method bullets shown on the index card. */
  covers: string[];
};

export const samplesIntro = {
  kicker: "Sample work",
  headline: "IPO validation reports",
  subhead:
    "Worked examples of the research I do — pulling apart a company's filings, financials and risk disclosures, and turning several hundred pages into something you can read in ten minutes and act on.",
  note: "Published to show the method, not to sell a tip. Read the note below before the reports.",
};

/** Rendered above every report and on the index. Required — see header. */
export const disclaimer = {
  title: "Please read before you open these",
  body: "These are my own personal analyses, published as samples of research work. They are not investment advice and not a recommendation to buy, sell or subscribe to any security. I am not a SEBI-registered research analyst or investment adviser. Every figure was accurate as at the report date and will have moved since. Markets carry risk — do your own research, read the official RHP, and speak to a SEBI-registered adviser before investing.",
};

export const samples: WorkSample[] = [
  {
    slug: "shiprocket",
    title: "Shiprocket Ltd — IPO Validation Report",
    company: "Shiprocket Ltd",
    file: "shiprocket.html",
    date: "August 2026",
    kind: "E-commerce logistics · Mainboard IPO",
    summary:
      "A logistics-tech platform coming to market with strong revenue growth but a thin profit history. The report separates what the business actually earns from what the narrative claims.",
    covers: [
      "Revenue quality and path to profit",
      "Promoter and pre-IPO shareholding",
      "Valuation against listed peers",
      "Risk disclosures worth reading twice",
    ],
  },
  {
    slug: "milky-mist",
    title: "Milky Mist Dairy Food Ltd — IPO Validation Report",
    company: "Milky Mist Dairy Food Ltd",
    file: "milky-mist.html",
    date: "August 2026",
    kind: "Dairy & FMCG · Mainboard IPO",
    summary:
      "A value-added dairy business with genuine category share in paneer and cheese, carrying heavy debt and a capex cycle. Cross-checked against eight independent sources.",
    covers: [
      "Category share in paneer, cheese and curd",
      "Debt load and capex commitments",
      "Working-capital cycle",
      "Independent source cross-check",
    ],
  },
  {
    slug: "dhoot-transmission",
    title: "Dhoot Transmission Limited — IPO Validation Report",
    company: "Dhoot Transmission Limited",
    file: "dhoot-transmission.html",
    date: "August 2026",
    kind: "Auto components · Mainboard IPO",
    summary:
      "An auto-component maker with the highest return on net worth in its peer set, but a short filing history. The report flags exactly which figures could not be independently confirmed.",
    covers: [
      "Return on net worth vs peer set",
      "Gaps in the filing history",
      "Customer concentration",
      "Lock-in and selling-shareholder detail",
    ],
  },
  {
    slug: "lalithaa-jewellery-mart",
    title: "Lalithaa Jewellery Mart Limited — IPO Validation Report",
    company: "Lalithaa Jewellery Mart Limited",
    file: "lalithaa-jewellery-mart.html",
    date: "August 2026",
    kind: "Jewellery Retail · Mainboard IPO",
    summary:
      "A 40-year jewellery retailer priced at a steep discount to listed peers, with a record profit year that hasn't yet converted to cash. The RHP's own numbers pulled apart line by line.",
    covers: [
      "Valuation vs Titan, Kalyan and Thangamayil",
      "Cash-flow quality behind the FY26 profit spike",
      "Promoter background and a related-party disclosure gap",
      "Lock-in schedule and anchor book quality",
    ],
  },
  {
    slug: "seven-ipo-comparison",
    title: "7 Live / Upcoming IPO Comparison — August 2026",
    company: "Gaja AMC, Tempsens, Shankesh, Lalithaa, Horizon, Sunshine Pictures, Fascinate",
    file: "seven-ipo-comparison.html",
    date: "August 2026",
    kind: "Cross-IPO comparison · 7 issues",
    summary:
      "The same fixed 8-module, 100-point rubric applied to seven live and upcoming IPOs across completely different sectors, ranked on one leaderboard so the scores are directly comparable.",
    covers: [
      "Ranked leaderboard across all seven issues",
      "Risk-vs-score positioning",
      "Module-by-module scorecard breakdown",
      "Where each source figure came from, and where they disagreed",
    ],
  },
];

export function getSample(slug: string): WorkSample | undefined {
  return samples.find((sample) => sample.slug === slug);
}
