export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";
import { getFaqsForPage, buildFaqSchema } from "@/lib/faqs";
import type { FaqItem } from "@/lib/faqs";

// Sep 2026: new page. GSC (90 days): "affordable amc package in dubai" 24
// impressions @ pos 25.8 — worse than /services/amc/'s own UAE-wide
// positions (4.8-9.4 for generic AMC terms) despite carrying explicit Dubai
// intent. The live blog post printer-amc-dubai-whats-included already
// ranks at position 9.4 with a title implying a Dubai AMC landing page
// exists — it didn't. Pricing below is the same 3-tier structure already
// on /services/amc/ (Basic AED 299, Professional AED 499, Enterprise
// custom), not new numbers.
export const metadata: Metadata = {
  title: "Printer AMC Dubai | From AED 299/mo | Sahara",
  description: "Printer & photocopier AMC in Dubai from AED 299/month. All parts, labour and preventive servicing included. 4-hour response, OEM parts only. ☎ +971503823969",
  keywords: "printer amc dubai, amc package dubai, affordable amc package in dubai, printer maintenance contract dubai, photocopier amc dubai, annual maintenance contract dubai",
  openGraph: {
    title: "Printer AMC Dubai | Sahara Office Equipments",
    description: "Annual Maintenance Contracts for printers and copiers in Dubai from AED 299/month. All parts and labour included, 4-hour response.",
    images: [{ url: "https://www.saharaprinter.com/images/heroPrntr1.webp", width: 1200, height: 630, alt: "Printer AMC Dubai" }],
    url: "https://www.saharaprinter.com/printer-amc-dubai/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/printer-amc-dubai/" },
};

const DEFAULT_FAQS: FaqItem[] = [
  { q: "How much does a printer AMC cost in Dubai?", a: "Sahara's AMC plans in Dubai start from AED 299/month per machine (Basic tier — quarterly visits, labour and call-outs included). The Professional tier is AED 499/month with monthly visits, all OEM parts, and 24/7 emergency support. Enterprise multi-location plans are custom-quoted." },
  { q: "What does a printer AMC in Dubai actually cover?", a: "Preventive maintenance visits, labour, and call-out charges are included in every tier. The Professional and Enterprise tiers also include OEM replacement parts and 24/7 emergency support. Consumables (toner, ink, paper) are billed separately, as are repairs from misuse or power surges." },
  { q: "How fast is AMC emergency response in Dubai?", a: "Standard response is 4 hours across Dubai, with a 2-hour SLA on the Enterprise tier. AMC clients are prioritised ahead of walk-in/one-off repair requests." },
  { q: "Can I get an AMC for multiple Dubai office locations?", a: "Yes — our Enterprise tier is built for multi-location Dubai businesses, with a dedicated assigned technician, weekly on-site maintenance, and monthly reporting across all sites." },
  { q: "Which printer and copier brands does the Dubai AMC cover?", a: "Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp and Epson — all major brands serviced, regardless of where the machine was purchased or leased." },
  { q: "Is there a difference between AMC in Dubai and other emirates?", a: "The plans and pricing are the same UAE-wide. Dubai response times are 4-hour standard, with 2-hour priority for Business Bay, DIFC and Downtown under the Professional and Enterprise tiers." },
];

const amcPlans = [
  { name: "Basic", price: "AED 299/mo", detail: "Quarterly visits, labour & call-outs included" },
  { name: "Professional", price: "AED 499/mo", detail: "Monthly visits, all OEM parts, 24/7 emergency support" },
  { name: "Enterprise", price: "Custom", detail: "Weekly visits, dedicated technician, 2-hr SLA, multi-site" },
];

const dubaiDistricts = [
  { area: "Business Bay, DIFC, Downtown Dubai", response: "2-hour priority (Professional/Enterprise)" },
  { area: "JLT, Dubai Marina, Al Sufouh", response: "4-hour standard response" },
  { area: "Deira, Bur Dubai, Al Karama", response: "4-hour standard response" },
  { area: "Jebel Ali, Dubai South, DIP", response: "Same-day, scheduled dispatch" },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Printer AMC Dubai",
  "description": "Annual Maintenance Contracts for printers and photocopiers in Dubai. Preventive maintenance, labour, and OEM parts included depending on tier. 4-hour response.",
  "provider": { "@type": "LocalBusiness", "name": "Sahara Office Equipments", "telephone": "+971503823969" },
  "areaServed": { "@type": "City", "name": "Dubai" },
  "serviceType": "Printer Maintenance Contract",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "AED",
    "lowPrice": 299,
    "highPrice": 499,
    "offerCount": 2,
    "availability": "https://schema.org/InStock",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sahara Office Equipments — Dubai AMC",
  "description": "Printer and photocopier Annual Maintenance Contracts in Dubai from AED 299/month.",
  "url": "https://www.saharaprinter.com/printer-amc-dubai/",
  "telephone": "+971503823969",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Al Arabi Building, Industrial Center Road, Industrial Area 11",
    "addressLocality": "Sharjah",
    "addressCountry": "AE",
  },
  "areaServed": { "@type": "City", "name": "Dubai" },
  "priceRange": "AED 299-499",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "AMC Services", "item": "https://www.saharaprinter.com/services/amc/" },
    { "@type": "ListItem", "position": 3, "name": "Printer AMC Dubai", "item": "https://www.saharaprinter.com/printer-amc-dubai/" },
  ],
};

const trail = [
  { label: "Home", href: "/" },
  { label: "AMC Services", href: "/services/amc/" },
  { label: "Printer AMC Dubai" },
];

export default async function PrinterAmcDubai() {
  const faqs = await getFaqsForPage("printer-amc-dubai", DEFAULT_FAQS);
  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>

      <main className="min-h-screen bg-surface">
        <Header />

        <section className="relative overflow-hidden px-6 pb-20 pt-32">
          <div className="absolute inset-0">
            <img
              src="/images/heroPrntr1.webp"
              alt="Printer AMC Dubai"
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/90 to-surface-low" />
          </div>

          <div className="relative mx-auto max-w-content">
            <Breadcrumbs trail={trail} />
            <div className="grid items-center gap-14 md:grid-cols-2">
              <Reveal>
                <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Annual Maintenance Contract</p>
                <h1 className="font-sora text-display-xl font-extrabold text-white">
                  Printer AMC <span className="text-primary">Dubai</span>
                </h1>
                <p className="mt-6 max-w-xl text-body text-muted">
                  Preventive maintenance, labour and parts for printers and copiers across Dubai — from AED 299/month
                  per machine.
                </p>
                <div className="mt-6">
                  <AnswerBlock
                    question="How much does a printer AMC cost in Dubai?"
                    answer="Sahara's AMC plans in Dubai start from AED 299/month per machine, covering quarterly maintenance visits, labour and call-out charges. The Professional tier (AED 499/month) adds monthly visits, all OEM parts, and 24/7 emergency support. Enterprise multi-location plans are custom-quoted."
                    supportingPoints={[
                      "Basic: AED 299/month — quarterly visits, labour & call-outs included",
                      "Professional: AED 499/month — monthly visits, all OEM parts, 24/7 support",
                      "Enterprise: custom pricing — weekly visits, dedicated technician, 2-hr SLA",
                      "4-hour standard response in Dubai; 2-hour priority for Business Bay, DIFC, Downtown",
                    ]}
                  />
                </div>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a href="/contact/" className="btn-primary">Get AMC Quote</a>
                  <a href="tel:+971503823969" className="btn-secondary">Call: +971503823969</a>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="relative hidden lg:block">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-[120px]" />
                <div className="glass-card relative z-10 overflow-hidden rounded-panel p-8">
                  <img
                    src="/images/heroPrntr1.webp"
                    alt="Printer AMC service Dubai"
                    className="h-full w-full rounded-card object-cover mix-blend-screen opacity-90"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Section title="AMC Plans for Dubai Offices" align="center">
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {amcPlans.map((p) => (
              <div key={p.name} className="rounded-card border border-white/[0.08] bg-surface-low p-6 text-center">
                <h3 className="mb-1 text-lg font-bold text-white">{p.name}</h3>
                <p className="mb-3 text-2xl font-bold text-primary">{p.price}</p>
                <p className="text-sm text-on-surface-variant">{p.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center">
            <a href="/services/amc/" className="font-semibold text-primary hover:underline">See full plan comparison and features →</a>
          </p>
        </Section>

        <Section title="AMC Response Time by Dubai District" subtitle="Dispatch is scheduled by district and technician location." align="center" tone="raised">
          <div className="mx-auto max-w-3xl overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-caption uppercase tracking-widest text-muted">
                  <th className="py-3 pr-4">District</th>
                  <th className="py-3">Response Target</th>
                </tr>
              </thead>
              <tbody>
                {dubaiDistricts.map((d) => (
                  <tr key={d.area} className="border-b border-white/5">
                    <td className="py-3 pr-4 font-semibold text-white">{d.area}</td>
                    <td className="py-3 text-on-surface-variant">{d.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Brands Covered" align="center">
          <div className="flex flex-wrap justify-center gap-4">
            {["Canon", "HP", "Kyocera", "Ricoh", "Xerox", "Brother", "Sharp", "Epson"].map((brand) => (
              <span key={brand} className="rounded-pill bg-surface-max px-6 py-3 text-lg font-semibold text-on-surface-variant">
                {brand}
              </span>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Protect Your Printer Fleet in Dubai"
          body="Get a tailored AMC quote for your Dubai office — single machine or multi-location."
          primary={{ label: "Get AMC Quote", href: "/contact/" }}
          secondary={{ label: "Call Now", href: "tel:+971503823969" }}
        />

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={f.q} className="glass-card rounded-card p-6 group cursor-pointer" open={i === 0}>
                <summary className="flex list-none items-center justify-between gap-4 font-bold text-[1.05rem] text-white">
                  {f.q}
                  <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <p className="mt-4 leading-relaxed text-on-surface-variant">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section flush tone="raised">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">Outside Dubai?</h2>
            <p className="text-muted">
              We offer AMC plans across all seven emirates. See our{" "}
              <a href="/services/amc/" className="font-semibold text-primary hover:underline">full AMC service page</a>{" "}
              for the complete plan comparison and UAE-wide coverage.
            </p>
          </div>
        </Section>

        <Footer />
        <WhatsAppCTA />
        <JumpToTop />
      </main>
    </>
  );
}
