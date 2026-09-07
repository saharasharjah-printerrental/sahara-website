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
import FeatureCard from "@/components/ui/FeatureCard";
import CtaBand from "@/components/ui/CtaBand";
import { getFaqsForPage, buildFaqSchema } from "@/lib/faqs";
import type { FaqItem } from "@/lib/faqs";
import { SettingsIcon, LayersIcon, HeadsetIcon, ClockIcon } from "@/components/icons";

// Sep 2026: new page, built on the Kyocera repair page's pattern
// (src/app/kyocera-printer-repair/page.tsx), which already ranks 1-2.7 for
// its brand-repair terms. GSC (90 days) shows real HP repair demand with no
// dedicated destination — "hp printer repair near me" 46 impressions @ pos
// 24.8, "hp printer repair abu dhabi" 22 @ 17.5, "hp printer repair dubai"
// 18 @ 34.5, "hp printer repair" 20 @ 27.6 — all zero clicks. /brands/hp/
// exists but is a rental/sales catalogue, not a repair-intent page.
export const metadata: Metadata = {
  title: "HP Printer Repair UAE | Dubai, Abu Dhabi & Sharjah | Sahara",
  description: "HP printer & copier repair across Dubai, Abu Dhabi and Sharjah from AED 150. LaserJet, OfficeJet, DesignJet. Certified technicians, genuine OEM parts, 4-hr response. ☎ +971503823969",
  keywords: "hp printer repair dubai, hp printer repair abu dhabi, hp printer repair near me, hp printer repair, hp service center dubai, hp laserjet repair uae, hp officejet repair, hp printer maintenance near me, authorized hp printer repair",
  openGraph: {
    title: "HP Printer Repair UAE | Sahara Office Equipments",
    description: "Certified HP repair across the UAE. LaserJet, OfficeJet, DesignJet. Genuine OEM parts, 4-hour response, 30-day warranty.",
    images: [{ url: "https://www.saharaprinter.com/images/printer-hp.svg", width: 1200, height: 630, alt: "HP Printer Repair UAE" }],
    url: "https://www.saharaprinter.com/hp-printer-repair/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/hp-printer-repair/" },
};

const DEFAULT_FAQS: FaqItem[] = [
  { q: "Do you repair HP printers and copiers in the UAE?", a: "Yes — Sahara services the full HP range across Dubai, Abu Dhabi, Sharjah and all seven emirates, including LaserJet, LaserJet Enterprise, OfficeJet Pro, and DesignJet wide-format plotters." },
  { q: "What is the response time for HP repair in Dubai and Abu Dhabi?", a: "Dubai: 4-hour standard response, 2-hour priority for Business Bay, DIFC and Downtown. Abu Dhabi: same-day service, typically within 4-6 hours. Sharjah, our head office location, has the fastest average response time in our coverage area." },
  { q: "How much does HP printer repair cost?", a: "HP repair callouts start from AED 150, covering diagnosis and labour. Genuine OEM HP parts (fusers, drums, formatter boards, print heads) are quoted separately before any work begins. Machines under a Sahara AMC or rental plan pay nothing per callout." },
  { q: "What are the most common HP printer faults you fix?", a: "Fuser assembly failures causing smearing or blank pages, paper jams from worn feed rollers, network and Wi-Fi connectivity faults, and formatter board errors on LaserJet Enterprise units. DesignJet plotters most often need print-head cleaning or replacement and media-feed calibration." },
  { q: "Do you use genuine HP parts?", a: "Yes, exclusively. We install genuine OEM HP fusers, drums, rollers and print heads — never third-party compatibles — which protects your warranty and long-term print quality." },
  { q: "Can you repair an HP printer we didn't buy or rent from Sahara?", a: "Yes. We service HP equipment regardless of where it was purchased or leased, including machines inherited from a previous tenant or under another vendor's expired contract." },
  { q: "Do you offer an AMC for HP printers?", a: "Yes — our Annual Maintenance Contract covers unlimited HP repairs, preventive maintenance visits, and priority dispatch, from AED 299/month per machine." },
];

const hpFaults = [
  { icon: LayersIcon, title: "Fuser Failures", body: "Smearing, powdery toner, or blank pages usually mean a worn fuser assembly — replaced with a genuine OEM unit." },
  { icon: SettingsIcon, title: "Paper Jams & Feed Faults", body: "Worn feed rollers or misaligned trays. Cleared on-site with rollers replaced where needed." },
  { icon: HeadsetIcon, title: "Network & Wi-Fi Faults", body: "Connectivity, driver, and print-queue issues reset and re-verified against your office network." },
  { icon: ClockIcon, title: "DesignJet Print-Head Service", body: "Wide-format plotters need periodic print-head cleaning, alignment, and media-feed calibration for consistent output." },
];

const cityResponse = [
  { city: "Dubai", detail: "4-hour standard response UAE-wide; 2-hour priority for Business Bay, DIFC and Downtown Dubai." },
  { city: "Abu Dhabi", detail: "Same-day service, typically 4-6 hours — Mussafah, Al Reem Island, Khalifa City and Masdar City covered." },
  { city: "Sharjah", detail: "Our head office and technician base — the fastest average response time in our coverage area, often same-day." },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sahara Office Equipments — HP Repair Specialists",
  "description": "Certified HP printer and copier repair across Dubai, Abu Dhabi and Sharjah. LaserJet, OfficeJet, DesignJet. Genuine OEM parts, 4-hour response.",
  "url": "https://www.saharaprinter.com/hp-printer-repair/",
  "telephone": "+971503823969",
  "email": "info@saharaprinter.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Al Arabi Building, Industrial Center Road, Industrial Area 11",
    "addressLocality": "Sharjah",
    "addressCountry": "AE",
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 25.2942534, "longitude": 55.4260483 },
  "areaServed": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Al Ain"],
  "priceRange": "AED 150-2000",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "HP Printer Repair Service",
  "description": "Certified repair for HP LaserJet, OfficeJet and DesignJet printers and copiers across the UAE. Genuine OEM parts, 4-hour response, 30-day workmanship warranty.",
  "provider": { "@type": "LocalBusiness", "name": "Sahara Office Equipments", "telephone": "+971503823969" },
  "areaServed": ["Dubai", "Abu Dhabi", "Sharjah"],
  "serviceType": "Printer Repair",
  "offers": { "@type": "Offer", "priceCurrency": "AED", "price": "150", "availability": "https://schema.org/InStock" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Repair Services", "item": "https://www.saharaprinter.com/services/repair/" },
    { "@type": "ListItem", "position": 3, "name": "HP Printer Repair", "item": "https://www.saharaprinter.com/hp-printer-repair/" },
  ],
};

const trail = [
  { label: "Home", href: "/" },
  { label: "Repair Services", href: "/services/repair/" },
  { label: "HP Printer Repair" },
];

export default async function HpPrinterRepair() {
  const faqs = await getFaqsForPage("hp-printer-repair", DEFAULT_FAQS);
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
              src="/images/unsplash-office.webp"
              alt="HP Printer Repair UAE"
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/90 to-surface-low" />
          </div>

          <div className="relative mx-auto max-w-content">
            <Breadcrumbs trail={trail} />
            <div className="grid items-center gap-14 md:grid-cols-2">
              <Reveal>
                <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Certified HP Service</p>
                <h1 className="font-sora text-display-xl font-extrabold text-white">
                  HP Printer Repair <span className="text-primary">UAE</span>
                </h1>
                <p className="mt-6 max-w-xl text-body text-muted">
                  Dubai, Abu Dhabi &amp; Sharjah. LaserJet, OfficeJet and DesignJet serviced by certified technicians with
                  genuine OEM parts — repairs from AED 150.
                </p>
                <div className="mt-6">
                  <AnswerBlock
                    question="How much does HP printer repair cost in the UAE?"
                    answer="HP repair callouts start from AED 150, covering an on-site visit, full diagnosis, and labour. Genuine OEM HP parts — fusers, drums, formatter boards, print heads — are quoted separately before any work begins. Every repair carries a 30-day workmanship warranty, and machines under a Sahara AMC pay nothing per callout."
                    supportingPoints={[
                      "Certified for the full HP LaserJet, OfficeJet and DesignJet range",
                      "Genuine OEM parts only — fusers, drums, formatter boards, print heads",
                      "4-hour standard response in Dubai, same-day in Abu Dhabi, fastest in Sharjah (our HQ)",
                      "AMC coverage from AED 299/month per machine includes unlimited callouts",
                    ]}
                  />
                </div>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a href="/contact/" className="btn-primary">Book a Technician</a>
                  <a href="tel:+971503823969" className="btn-secondary">Call: +971503823969</a>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="relative hidden lg:block">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-[120px]" />
                <div className="glass-card relative z-10 overflow-hidden rounded-panel p-8">
                  <img
                    src="/images/printer-hp.svg"
                    alt="HP LaserJet repair UAE"
                    className="h-full w-full rounded-card object-contain bg-white/5 p-8"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Section flush>
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { value: "AED 150", label: "Repair Callout From" },
              { value: "4 Hrs", label: "Dubai Standard Response" },
              { value: "OEM Only", label: "Genuine HP Parts" },
              { value: "30 Days", label: "Workmanship Warranty" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-caption uppercase tracking-widest text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Common HP Faults We Fix" subtitle="From daily office LaserJets to wide-format DesignJet plotters." align="center">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {hpFaults.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} />
            ))}
          </div>
        </Section>

        <Section title="HP Repair Coverage by City" align="center" tone="raised">
          <div className="mx-auto max-w-3xl space-y-4">
            {cityResponse.map((c) => (
              <div key={c.city} className="rounded-card border border-white/[0.08] bg-surface-low p-6">
                <h3 className="mb-1 text-lg font-bold text-white">{c.city}</h3>
                <p className="text-on-surface-variant">{c.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="HP Ranges We Service" align="center">
          <div className="flex flex-wrap justify-center gap-4">
            {["LaserJet", "LaserJet Enterprise", "LaserJet Pro MFP", "OfficeJet Pro", "DesignJet", "PageWide"].map((model) => (
              <span key={model} className="rounded-pill bg-surface-max px-6 py-3 text-lg font-semibold text-on-surface-variant">
                {model}
              </span>
            ))}
          </div>
        </Section>

        <CtaBand
          title="HP Printer Down?"
          body="Get a certified technician dispatched with genuine OEM parts. Free diagnosis for AMC and rental clients."
          primary={{ label: "Book a Technician", href: "/contact/" }}
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
            <h2 className="mb-4 text-2xl font-bold text-white">Looking to rent an HP printer instead?</h2>
            <p className="text-muted">
              This page covers HP repair, parts and service. For the rental lineup and pricing, see our{" "}
              <a href="/brands/hp/" className="font-semibold text-primary hover:underline">HP printer catalog</a>{" "}
              or our{" "}
              <a href="/services/repair/" className="font-semibold text-primary hover:underline">full repair service page</a>{" "}
              for other brands and UAE-wide coverage.
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
