import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Privacy Policy — Bharath Sathiskumar",
  description:
    "How personal data submitted through this portfolio site is collected, used, and stored.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-lg font-bold text-foreground">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-muted">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Privacy
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted">Last updated: July 2026</p>

          <p className="mt-8 text-sm leading-7 text-muted">
            This is my personal portfolio site. I try to collect as little
            information as possible — only what I need to reply to you. This
            page explains exactly what is collected and why.
          </p>

          <Section title="1. Information you choose to give me">
            <p>
              If you fill in the contact form, request my phone number, or
              download my CV, I receive the details you enter: your{" "}
              <strong className="text-foreground">name</strong> and{" "}
              <strong className="text-foreground">email</strong> (required),
              and optionally your{" "}
              <strong className="text-foreground">phone number</strong>,{" "}
              <strong className="text-foreground">company/role</strong>, and{" "}
              <strong className="text-foreground">message</strong>.
            </p>
            <p>
              I use this <em>only</em> to respond to you about the role, project,
              or enquiry. I do not send marketing emails, and I never sell or
              share your details with third parties.
            </p>
          </Section>

          <Section title="2. Anonymous usage analytics">
            <p>
              I use Vercel Web Analytics to see how many people visit, which
              pages they view, roughly which country or city they are in, and
              how they found the site (for example, LinkedIn or Google).
            </p>
            <p>
              This is aggregated and anonymous. It does not use tracking
              cookies, does not build a profile of you, and does not identify
              you personally.
            </p>
          </Section>

          <Section title="3. Who else handles your data">
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Web3Forms</strong> — passes
                your form submission on to my email inbox.
              </li>
              <li>
                <strong className="text-foreground">Vercel</strong> — hosts this
                site and provides the anonymous analytics described above.
              </li>
            </ul>
            <p>
              Both are used purely to operate this site. No one else receives
              your information.
            </p>
          </Section>

          <Section title="4. How long I keep it">
            <p>
              Form submissions arrive as emails in my personal inbox and are
              kept only as long as they are relevant to our conversation. You
              can ask me to delete them at any time.
            </p>
          </Section>

          <Section title="5. Your rights">
            <p>
              You can ask me to show you what I hold about you, correct it, or
              delete it entirely — just email me and I will action it. If you
              are in the EU/UK (GDPR) or India (DPDP Act), these rights apply to
              you by law, but I am happy to honour them for anyone who asks.
            </p>
          </Section>

          <Section title="6. Contact">
            <p>
              Questions about anything on this page? Email me at{" "}
              <a
                href={`mailto:${profile.email}`}
                className="font-medium text-accent hover:underline"
              >
                {profile.email}
              </a>
              .
            </p>
          </Section>

          <div className="mt-12">
            <a
              href="/"
              className="text-sm font-semibold text-accent hover:underline"
            >
              ← Back to homepage
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
