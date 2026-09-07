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

// Sep 2026: new page, same pattern as kyocera-printer-repair and
// hp-printer-repair. GSC (90 days): "canon printer repair near me" 4
// impressions @ pos 23.8, "canon laser printer repair near me" 3 @ 10.3,
// "canon printer repair" 5 @ 49.4, "canon pixma repair near me" 2 @ 11,
// "canon inkjet printer service center near me" 1 @ 1, "canon photocopier
// repairs" 1 @ 1 — all zero clicks. Lower absolute volume than HP/Kyocera
// but the same pattern: brand-qualified queries already sit near page one
// with no dedicated destination. /canon-printer-dubai/ exists but is a
// rental/sales page, not repair-led.
export const metadata: Metadata = {
  title: "Canon Printer Repair UAE | Dubai, Abu Dhabi & Sharjah | Sahara",
  description: "Canon printer & photocopier repair across Dubai, Abu Dhabi and Sharjah from AED 150. imageRUNNER, PIXMA, i-SENSYS. Certified technicians, genuine OEM parts, 4-hr response. ☎ +971503823969",
  keywords: "canon printer repair dubai, canon printer repair near me, canon printer repair, canon laser printer repair, canon pixma repair near me, canon photocopier repairs, canon service center near me, canon imagerunner repair uae",
  openGraph: {
    title: "Canon Printer Repair UAE | Sahara Office Equipments",
    description: "Certified Canon repair across the UAE. imageRUNNER, PIXMA, i-SENSYS. Genuine OEM parts, 4-hour response, 30-day warranty.",
    images: [{ url: "https://www.saharaprinter.com/images/printer-canon-1.webp", width: 1200, height: 630, alt: "Canon Printer Repair UAE" }],
    url: "https://www.saharaprinter.com/canon-printer-repair/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/canon-printer-repair/" },
};

const DEFAULT_FAQS: FaqItem[] = [
  { q: "Do you repair Canon printers and photocopiers in the UAE?", a: "Yes — Sahara services the full Canon range across Dubai, Abu Dhabi, Sharjah and all seven emirates, including imageRUNNER ADVANCE copiers, i-SENSYS office printers, and PIXMA inkjets." },
  { q: "What is the response time for Canon repair in Dubai and Abu Dhabi?", a: "Dubai: 4-hour standard response, 2-hour priority for Business Bay, DIFC and Downtown. Abu Dhabi: same-day service, typically within 4-6 hours. Sharjah, our head office location, has the fastest average response time in our coverage area." },
  { q: "How much does Canon printer repair cost?", a: "Canon repair callouts start from AED 150, covering diagnosis and labour. Genuine OEM Canon parts (drums, fusers, transfer belts) are quoted separately before any work begins. Machines under a Sahara AMC or rental plan pay nothing per callout." },
  { q: "What are the most common Canon printer faults you fix?", a: "Drum unit end-of-life causing faded or streaked output on imageRUNNER models, fuser failures, paper feed jams, and network/scan-to-email configuration faults. PIXMA inkjets most often need print-head cleaning or ink system service." },
  { q: "Do you use genuine Canon parts?", a: "Yes, exclusively. We install genuine OEM Canon drums, fusers and transfer belts — never third-party compatibles — which protects your warranty and long-term print quality." },
  { q: "Can you repair a Canon machine we didn't buy or rent from Sahara?", a: "Yes. We service Canon equipment regardless of where it was purchased or leased, including machines inherited from a previous tenant or under another vendor's expired contract." },
  { q: "Do you offer an AMC for Canon printers?", a: "Yes — our Annual Maintenance Contract covers unlimited Canon repairs, preventive maintenance visits, and priority dispatch, from AED 299/month per machine." },
];

const canonFaults = [
  { icon: LayersIcon, title: "Drum & Transfer Belt Wear", body: "Faded, streaked, or uneven output on imageRUNNER models usually means an end-of-life drum unit or transfer belt — replaced with genuine parts." },
  { icon: SettingsIcon, title: "Paper Jams & Feed Faults", body: "Worn feed rollers or misaligned trays. Cleared on-site with rollers replaced where needed." },
  { icon: HeadsetIcon, title: "Network & Scan Faults", body: "Scan-to-email, network, and print-queue issues reset and re-verified against your office network." },
  { icon: ClockIcon, title: "PIXMA Print-Head Service", body: "Inkjet print-head clogs and ink system faults cleared with genuine Canon cleaning and calibration." },
];

const cityResponse = [
  { city: "Dubai", detail: "4-hour standard response UAE-wide; 2-hour priority for Business Bay, DIFC and Downtown Dubai." },
  { city: "Abu Dhabi", detail: "Same-day service, typically 4-6 hours — Mussafah, Al Reem Island, Khalifa City and Masdar City covered." },
  { city: "Sharjah", detail: "Our head office and technician base — the fastest average response time in our coverage area, often same-day." },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sahara Office Equipments — Canon Repair Specialists",
  "description": "Certified Canon printer and photocopier repair across Dubai, Abu Dhabi and Sharjah. imageRUNNER, PIXMA, i-SENSYS. Genuine OEM parts, 4-hour response.",
  "url": "https://www.saharaprinter.com/canon-printer-repair/",
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
  "name": "Canon Printer Repair Service",
  "description": "Certified repair for Canon imageRUNNER, PIXMA and i-SENSYS printers and copiers across the UAE. Genuine OEM parts, 4-hour response, 30-day workmanship warranty.",
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
    { "@type": "ListItem", "position": 3, "name": "Canon Printer Repair", "item": "https://www.saharaprinter.com/canon-printer-repair/" },
  ],
};

const trail = [
  { label: "Home", href: "/" },
  { label: "Repair Services", href: "/services/repair/" },
  { label: "Canon Printer Repair" },
];

export default async function CanonPrinterRepair() {
  const faqs = await getFaqsForPage("canon-printer-repair", DEFAULT_FAQS);
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
              src="/images/printer-canon-1.webp"
              alt="Canon Printer Repair UAE"
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/90 to-surface-low" />
          </div>

          <div className="relative mx-auto max-w-content">
            <Breadcrumbs trail={trail} />
            <div className="grid items-center gap-14 md:grid-cols-2">
              <Reveal>
                <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Certified Canon Service</p>
                <h1 className="font-sora text-display-xl font-extrabold text-white">
                  Canon Printer Repair <span className="text-primary">UAE</span>
                </h1>
                <p className="mt-6 max-w-xl text-body text-muted">
                  Dubai, Abu Dhabi &amp; Sharjah. imageRUNNER, PIXMA and i-SENSYS serviced by certified technicians with
                  genuine OEM parts — repairs from AED 150.
                </p>
                <div className="mt-6">
                  <AnswerBlock
                    question="How much does Canon printer repair cost in the UAE?"
                    answer="Canon repair callouts start from AED 150, covering an on-site visit, full diagnosis, and labour. Genuine OEM Canon parts — drums, fusers, transfer belts — are quoted separately before any work begins. Every repair carries a 30-day workmanship warranty, and machines under a Sahara AMC pay nothing per callout."
                    supportingPoints={[
                      "Certified for imageRUNNER ADVANCE copiers, i-SENSYS printers and PIXMA inkjets",
                      "Genuine OEM parts only — drums, fusers, transfer belts",
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
                    src="/images/printer-canon-2.webp"
                    alt="Canon imageRUNNER repair UAE"
                    className="h-full w-full rounded-card object-cover mix-blend-screen opacity-90"
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
              { value: "OEM Only", label: "Genuine Canon Parts" },
              { value: "30 Days", label: "Workmanship Warranty" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-caption uppercase tracking-widest text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Common Canon Faults We Fix" subtitle="From office imageRUNNER copiers to PIXMA inkjets." align="center">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {canonFaults.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} />
            ))}
          </div>
        </Section>

        <Section title="Canon Repair Coverage by City" align="center" tone="raised">
          <div className="mx-auto max-w-3xl space-y-4">
            {cityResponse.map((c) => (
              <div key={c.city} className="rounded-card border border-white/[0.08] bg-surface-low p-6">
                <h3 className="mb-1 text-lg font-bold text-white">{c.city}</h3>
                <p className="text-on-surface-variant">{c.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Canon Ranges We Service" align="center">
          <div className="flex flex-wrap justify-center gap-4">
            {["imageRUNNER ADVANCE", "i-SENSYS MF", "imageCLASS", "PIXMA", "MAXIFY"].map((model) => (
              <span key={model} className="rounded-pill bg-surface-max px-6 py-3 text-lg font-semibold text-on-surface-variant">
                {model}
              </span>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Canon Printer Down?"
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
            <h2 className="mb-4 text-2xl font-bold text-white">Looking to rent a Canon printer instead?</h2>
            <p className="text-muted">
              This page covers Canon repair, parts and service. For the rental lineup and pricing, see our{" "}
              <a href="/brands/canon/" className="font-semibold text-primary hover:underline">Canon printer catalog</a>{" "}
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
