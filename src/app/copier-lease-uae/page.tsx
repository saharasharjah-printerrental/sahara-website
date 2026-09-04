export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import FaqSection from "@/components/FaqSection";
import AnswerBlock from "@/components/AnswerBlock";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FeatureCard from "@/components/ui/FeatureCard";
import ComparisonTable from "@/components/ui/ComparisonTable";
import CtaBand from "@/components/ui/CtaBand";
import { AwardIcon, ClockIcon, SettingsIcon, LayersIcon, ShieldCheckIcon, TruckIcon } from "@/components/icons";
import type { FaqItem } from "@/lib/faqs";

// Rebuilt from a client-only page that had NO metadata export at all — no
// title, description, canonical, or OG tags — and whose FAQPage JSON-LD
// shipped with an empty mainEntity array until client-side hydration
// populated it from a fetch. That fully explains its GSC performance (Aug
// 2026 export: 383 impressions, 0 clicks, position 47.8) despite reasonable
// content underneath. Now a proper server component: real metadata, schema
// rendered server-side, and FaqSection (D1-backed, static fallback) instead
// of the broken client fetch. Also the anchor page for Finding B — the
// "lease/leasing" query cluster (163 imps "printer leasing uae" @ 18.8, 141
// "printer leasing dubai" @ 24.6, 79 "printer lease" @ 15.6, 93 "printer for
// lease" @ 19.6, 53 "copier leasing dubai" @ 18.7, 39 "leasing photocopiers
// uae" @ 19.0, 38 "office printer lease" @ 13.1 — all zero-click) that had no
// dedicated, properly indexable page before this fix.
export const metadata: Metadata = {
  title: "Copier & Printer Lease UAE | Zero Deposit Leasing | Sahara",
  description: "Copier and printer leasing in UAE from AED 250/month — zero deposit, unlimited toner, full maintenance, tax-deductible operating expense. Canon, Kyocera, HP, Xerox. Dubai, Sharjah & Abu Dhabi. ☎ +971503823969",
  keywords: "copier lease uae, printer leasing uae, printer leasing dubai, printer lease, printer for lease, copier leasing dubai, leasing photocopiers uae, office printer lease, lease a copier dubai, photocopier leasing uae",
  openGraph: {
    title: "Copier & Printer Lease UAE | Sahara Office Equipments",
    description: "Copier and printer leasing across the UAE from AED 250/month — zero deposit, unlimited toner, full maintenance included.",
    url: "https://www.saharaprinter.com/copier-lease-uae/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/images/heroPrntr1.webp", width: 1200, height: 630, alt: "Copier & Printer Lease UAE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Copier & Printer Lease UAE | Sahara Office Equipments",
    description: "Copier and printer leasing across the UAE from AED 250/month — zero deposit, unlimited toner, full maintenance included.",
    images: ["https://www.saharaprinter.com/images/heroPrntr1.webp"],
  },
  alternates: { canonical: "https://www.saharaprinter.com/copier-lease-uae/" },
};

const DEFAULT_FAQS: FaqItem[] = [
  { q: "What is the difference between copier lease and rental in the UAE?", a: "Both are operating expenses with no ownership transfer at Sahara — the difference is term length. A lease typically runs 12–60 months for a lower monthly rate and stable long-term budgeting; a rental runs 3–36 months with more flexibility to return or upgrade sooner. Both include toner, maintenance, and repairs." },
  { q: "What are the tax advantages of leasing a copier in the UAE?", a: "Lease payments are treated as an operating expense (OPEX) rather than a capital purchase, which is deductible under UAE Corporate Tax. This improves cash flow compared to an outright purchase, which is capitalised and depreciated instead." },
  { q: "Can I upgrade my leased copier during the term?", a: "Yes. Sahara's lease agreements include upgrade options — you can move to a newer model during the lease period, typically without penalty, as equipment needs change." },
  { q: "What happens at the end of a copier lease term?", a: "You can renew the same plan, upgrade to newer equipment, or return the machine — Sahara collects it at no charge. There are no disposal costs and no exit fees on standard terms." },
  { q: "Do you offer zero deposit leasing in the UAE?", a: "Yes — zero or minimal deposit leasing is available for qualified businesses, on the same terms as our rental plans." },
  { q: "Which brands are available for lease?", a: "All major brands: Canon, Kyocera, HP, Xerox, Ricoh, Sharp, Brother, and Konica Minolta — the same fleet available for rental or purchase." },
  { q: "How long are typical lease agreements in the UAE?", a: "Lease terms typically run 12–60 months (1–5 years), longer than our 3–36 month rental terms, in exchange for a lower monthly rate." },
  { q: "Is maintenance included in a copier lease?", a: "Yes — every lease includes comprehensive maintenance, unlimited genuine toner, and technical support at no additional cost, identical to our rental plans." },
];

const comparison: [string, string, string, string][] = [
  ["Upfront Cost", "Zero deposit", "AED 15,000–50,000", "First month only"],
  ["Term Length", "12–60 months", "N/A — ownership", "3–36 months"],
  ["Maintenance", "Included", "Pay per repair", "Included"],
  ["Toner", "Free & unlimited", "Self-pay", "Free & unlimited"],
  ["Upgrades", "Any time", "Buy new machine", "Any time"],
  ["Tax Treatment", "Operating expense", "Capital expenditure", "Operating expense"],
  ["End of Term", "Renew, upgrade, or return", "Own asset", "Return machine"],
];

const brands = ["Canon", "Kyocera", "HP", "Xerox", "Ricoh", "Sharp", "Brother", "Konica Minolta"];

const trail = [{ label: "Home", href: "/" }, { label: "Copier Lease UAE" }];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Copier & Printer Lease UAE",
  "description": "Commercial photocopier and printer leasing in the UAE — zero deposit, unlimited toner, full maintenance, tax-deductible operating expense.",
  "provider": {
    "@type": "Organization",
    "name": "Sahara Office Equipments",
    "url": "https://www.saharaprinter.com",
    "telephone": "+971503823969",
  },
  "areaServed": "UAE",
  "serviceType": "Copier Lease",
  "url": "https://www.saharaprinter.com/copier-lease-uae/",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Copier Lease UAE", "item": "https://www.saharaprinter.com/copier-lease-uae/" },
  ],
};

export default function CopierLeaseUAE() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-surface">
        <Header />

        <section className="relative overflow-hidden px-6 pb-16 pt-32 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-content">
            <div className="text-left">
              <Breadcrumbs trail={trail} />
            </div>
            <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary mb-4">Copier &amp; Printer Lease UAE</p>
            <h1 className="font-sora text-display-xl font-extrabold text-white">
              Commercial Copier &amp; Printer Lease
            </h1>
            <div className="mt-8 max-w-2xl mx-auto text-left">
              <AnswerBlock
                id="copier-lease-uae"
                question="What is the difference between leasing and renting a copier in the UAE?"
                answer="Leasing runs longer than rental, but neither transfers ownership at Sahara. A lease typically commits 12 to 60 months for a lower monthly rate and stable budgeting; a rental runs 3 to 36 months with more flexibility. Both are operating expenses, and both include toner, maintenance, and repairs."
                supportingPoints={[
                  "Lease term 12–60 months; rental term 3–36 months — the machine returns to Sahara either way.",
                  "Lease payments are an operating expense, deductible under UAE Corporate Tax.",
                  "At end of term: renew, upgrade, or return at no collection or disposal cost.",
                  "Canon, Kyocera and Xerox copiers from AED 250/month, zero deposit, toner and maintenance included.",
                ]}
              />
            </div>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a href="/rental-calculator/" className="btn-primary">Get a Lease Quote</a>
              <a href="tel:+971503823969" className="btn-secondary">Call Now</a>
            </div>
          </div>
        </section>

        <Section flush eyebrow="Why Lease" title="Benefits of copier &amp; printer leasing">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={AwardIcon} title="Tax Advantages" body="Lease payments are operating expenses, offering tax benefits over a capital purchase." />
            <FeatureCard icon={ClockIcon} title="Flexible Terms" body="Choose lease terms from 12–60 months with a payment structure that fits your budget." delay={0.05} />
            <FeatureCard icon={LayersIcon} title="Upgrade Included" body="Stay current with technology through easy upgrades during the lease." delay={0.1} />
            <FeatureCard icon={SettingsIcon} title="Zero Maintenance Costs" body="All repairs, parts, and servicing included throughout the lease period." delay={0.15} />
            <FeatureCard icon={TruckIcon} title="Free Toner" body="Unlimited genuine toner included for the entire lease duration." delay={0.2} />
            <FeatureCard icon={ShieldCheckIcon} title="No Exit Fees" body="Flexible return or upgrade options at the end of your lease term." delay={0.25} />
          </div>
        </Section>

        <Section eyebrow="Compare Your Options" title="Lease vs Buy vs Rent" tone="raised">
          <ComparisonTable columns={["Feature", "Lease", "Buy", "Rent"]} highlightColumn={1} rows={comparison} />
        </Section>

        <Section eyebrow="Brands" title="Available for lease">
          <div className="flex flex-wrap justify-center gap-3">
            {brands.map((brand) => (
              <span key={brand} className="rounded-pill bg-surface-max px-6 py-3 font-medium text-white">
                {brand}
              </span>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Ready to Lease a Copier?"
          body="Get a customised lease proposal within 24 hours — zero deposit options available for qualified businesses."
          primary={{ label: "Get a Lease Quote", href: "/rental-calculator/" }}
          secondary={{ label: "Call Now", href: "tel:+971503823969" }}
        />

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-muted">Common questions about copier and printer leasing in the UAE.</p>
          </div>
          <FaqSection
            pageSlug="copier-lease-uae"
            defaultFaqs={DEFAULT_FAQS}
            pageId="https://www.saharaprinter.com/copier-lease-uae/#faq"
          />
        </Section>

        <Section flush tone="ink">
          <h2 className="text-headline font-bold text-white mb-6">Related</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/services/printer-rental/", label: "Printer Rental UAE" },
              { href: "/printer-rental-dubai/", label: "Printer Rental Dubai" },
              { href: "/printer-rental-sharjah/", label: "Printer Rental Sharjah" },
              { href: "/services/amc/", label: "Printer AMC" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="text-caption text-primary bg-primary/10 border border-primary/20 px-4 py-2 rounded-pill hover:bg-primary/20 transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </Section>

        <Footer />
        <WhatsAppCTA />
        <JumpToTop />
      </main>
    </>
  );
}
