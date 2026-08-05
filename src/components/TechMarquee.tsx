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

export default function TechMarquee() {
  // Duplicate the row so the -50% translate loops seamlessly.
  const row = [...items, ...items];

  return (
    <section
      aria-label="Platforms and tools I work with"
      className="border-y border-line bg-card/40 py-5"
    >
      <div className="marquee overflow-hidden">
        <div className="marquee-track">
          {row.map((tool, i) => (
            <span
              key={i}
              className="mx-5 inline-flex items-center gap-5 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.12em] text-muted"
              aria-hidden={i >= items.length ? true : undefined}
            >
              <span className="transition-colors hover:text-accent">{tool}</span>
              <span className="h-1 w-1 rounded-full accent-bar" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
