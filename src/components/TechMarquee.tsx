const items = [
  "CRM",
  "ERP",
  "LeadSquared",
  "Power BI",
  "Jira",
  "Postman",
  "Freshdesk",
  "Claude AI",
  "ChatGPT",
  "REST APIs & Webhooks",
  "SMS / WhatsApp (DLT)",
  "MS Excel",
];

/**
 * Was a scrolling marquee. A list of platforms is reference
 * information — a reader scans it for the one they run — so it now
 * sits still and stays readable, set as a ruled band.
 */
export default function TechMarquee() {
  return (
    <section
      aria-label="Platforms and tools I work with"
      className="border-y border-line bg-card"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-6 gap-y-2 px-6 py-4 text-sm">
        <h2 className="font-display text-xs font-bold tracking-tight text-foreground">
          On record
        </h2>
        <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5 text-muted">
          {items.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
