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

// Sep 2026: new page. The Aug 2026 dissection report cited "kyocera printer
// repair in dubai" at position 2.4 on 7 impressions from /services/repair/ —
// too thin a sample (7 impressions/mo) to trust, and it does not reappear in
// the current 28-day GSC export at all, so that specific claim is NOT the
// basis for this page (never invent/repeat unverified data). What IS
// verified: a live SERP check for "kyocera printer repair dubai" (2026-09-07)
// shows Sahara absent from page one entirely, while at least 8 competitors —
// including sosauh.com, already tracked as a competitor in
// docs/seo/backlink-gap-2026-08.md — run dedicated pages for this exact
// query. That is the real gap this page fills. /brands/kyocera/ is
// separately the site's strongest non-home page (13 clicks, 3.88% CTR,
// position 9.8), so Kyocera brand authority is real even if this specific
// repair query wasn't previously ranked as claimed.
//
// One UAE-wide page (Dubai + Abu Dhabi + Sharjah city sections), not three
// separate geo pages — matching the Sharjah-consolidation lesson from this
// same session's Track A work: thin demand split across near-duplicate URLs
// converts at 0%, one authoritative page with real depth converts better.
export const metadata: Metadata = {
  title: "Kyocera Printer Repair UAE | Dubai, Abu Dhabi & Sharjah | Sahara",
  description: "Kyocera printer & copier repair across Dubai, Abu Dhabi and Sharjah from AED 150. ECOSYS, TASKalfa, FS series. Factory-certified technicians, genuine OEM parts, 4-hr response. ☎ +971503823969",
  keywords: "kyocera printer repair dubai, kyocera printer repair abu dhabi, kyocera service center dubai, kyocera taskalfa repair, kyocera ecosys repair, kyocera copier repair uae, kyocera printer technician dubai, kyocera drum unit replacement",
  openGraph: {
    title: "Kyocera Printer Repair UAE | Sahara Office Equipments",
    description: "Factory-certified Kyocera repair across the UAE. ECOSYS, TASKalfa, FS series. Genuine OEM parts, 4-hour response, 30-day warranty.",
    images: [{ url: "https://www.saharaprinter.com/images/printer-kyocera.webp", width: 1200, height: 630, alt: "Kyocera Printer Repair UAE" }],
    url: "https://www.saharaprinter.com/kyocera-printer-repair/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/kyocera-printer-repair/" },
};

const DEFAULT_FAQS: FaqItem[] = [
  { q: "Do you repair Kyocera printers and copiers in the UAE?", a: "Yes — Sahara is a factory-certified Kyocera service provider covering Dubai, Abu Dhabi, Sharjah and all seven emirates. We repair the full ECOSYS, TASKalfa and FS ranges, from A4 desktop printers to A3 enterprise MFPs." },
  { q: "What is the response time for Kyocera repair in Dubai and Abu Dhabi?", a: "Dubai: 4-hour standard response, 2-hour priority for Business Bay, DIFC and Downtown. Abu Dhabi: same-day service, typically within 4-6 hours. Sharjah, our head office location, has the fastest average response time in our coverage area." },
  { q: "How much does Kyocera printer repair cost?", a: "Kyocera repair callouts start from AED 150, covering diagnosis and labour. Genuine OEM Kyocera parts (drum units, developer units, fuser assemblies) are quoted separately before any work begins. Machines under a Sahara AMC or rental plan pay nothing per callout." },
  { q: "What are the most common Kyocera printer faults you fix?", a: "Streaking or lines on printed pages (usually a worn OPC drum or failing developer unit), paper feed and jam issues, network/scan-to-email configuration faults, and end-of-life toner or drum replacements. Kyocera's long-life amorphous silicon drums mean most units need parts far less often than competing brands." },
  { q: "Do you use genuine Kyocera parts?", a: "Yes, exclusively. We install genuine OEM Kyocera drum units, developer units, fuser assemblies and toner — never third-party compatibles — which protects your warranty and the long-term print quality Kyocera machines are known for." },
  { q: "Can you repair a Kyocera TASKalfa or ECOSYS machine we didn't buy or rent from Sahara?", a: "Yes. We service Kyocera equipment regardless of where it was purchased or leased, including machines bought outright, inherited from a previous tenant, or under another vendor's expired contract." },
  { q: "Do you offer an AMC for Kyocera printers?", a: "Yes — our Annual Maintenance Contract covers unlimited Kyocera repairs, preventive maintenance visits, and priority dispatch, from AED 299/month per machine." },
];

const kyoceraFaults = [
  { icon: LayersIcon, title: "Streaks & Lines", body: "Usually a worn OPC drum or failing developer unit on TASKalfa/ECOSYS models — cleaned or replaced with genuine parts." },
  { icon: SettingsIcon, title: "Paper Jams & Feed Faults", body: "Roller wear or misaligned feed trays. Cleared on-site with feed rollers replaced where worn." },
  { icon: HeadsetIcon, title: "Network & Scan Faults", body: "Scan-to-email, SMB, and network configuration reset and re-verified against your office network." },
  { icon: ClockIcon, title: "Drum & Developer End-of-Life", body: "Kyocera's long-life amorphous silicon drums last far longer than competing brands, but still need eventual genuine OEM replacement." },
];

const cityResponse = [
  { city: "Dubai", detail: "4-hour standard response UAE-wide; 2-hour priority for Business Bay, DIFC and Downtown Dubai." },
  { city: "Abu Dhabi", detail: "Same-day service, typically 4-6 hours — Mussafah, Al Reem Island, Khalifa City and Masdar City covered." },
  { city: "Sharjah", detail: "Our head office and technician base — the fastest average response time in our coverage area, often same-day." },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sahara Office Equipments — Kyocera Repair Specialists",
  "description": "Factory-certified Kyocera printer and copier repair across Dubai, Abu Dhabi and Sharjah. ECOSYS, TASKalfa, FS series. Genuine OEM parts, 4-hour response.",
  "url": "https://www.saharaprinter.com/kyocera-printer-repair/",
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
  "name": "Kyocera Printer Repair Service",
  "description": "Factory-certified repair for Kyocera ECOSYS, TASKalfa and FS series printers and copiers across the UAE. Genuine OEM parts, 4-hour response, 30-day workmanship warranty.",
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
    { "@type": "ListItem", "position": 3, "name": "Kyocera Printer Repair", "item": "https://www.saharaprinter.com/kyocera-printer-repair/" },
  ],
};

const trail = [
  { label: "Home", href: "/" },
  { label: "Repair Services", href: "/services/repair/" },
  { label: "Kyocera Printer Repair" },
];

export default async function KyoceraPrinterRepair() {
  const faqs = await getFaqsForPage("kyocera-printer-repair", DEFAULT_FAQS);
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
              src="/images/printer-kyocera.webp"
              alt="Kyocera Printer Repair UAE"
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/90 to-surface-low" />
          </div>

          <div className="relative mx-auto max-w-content">
            <Breadcrumbs trail={trail} />
            <div className="grid items-center gap-14 md:grid-cols-2">
              <Reveal>
                <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Factory-Certified Kyocera Service</p>
                <h1 className="font-sora text-display-xl font-extrabold text-white">
                  Kyocera Printer Repair <span className="text-primary">UAE</span>
                </h1>
                <p className="mt-6 max-w-xl text-body text-muted">
                  Dubai, Abu Dhabi &amp; Sharjah. ECOSYS, TASKalfa and FS series serviced by certified technicians with
                  genuine OEM parts — repairs from AED 150.
                </p>
                <div className="mt-6">
                  <AnswerBlock
                    question="How much does Kyocera printer repair cost in the UAE?"
                    answer="Kyocera repair callouts start from AED 150, covering an on-site visit, full diagnosis, and labour. Genuine OEM Kyocera parts — drum units, developer units, fuser assemblies — are quoted separately before any work begins. Every repair carries a 30-day workmanship warranty, and machines under a Sahara AMC pay nothing per callout."
                    supportingPoints={[
                      "Factory-certified for the full Kyocera ECOSYS, TASKalfa and FS range",
                      "Genuine OEM parts only — drum units, developer units, fuser assemblies",
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
                    src="/images/printer-kyocera.webp"
                    alt="Kyocera TASKalfa copier repair UAE"
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
              { value: "OEM Only", label: "Genuine Kyocera Parts" },
              { value: "30 Days", label: "Workmanship Warranty" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-caption uppercase tracking-widest text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Common Kyocera Faults We Fix" subtitle="Kyocera's amorphous silicon drums last longer than most competing brands, but every machine eventually needs service." align="center">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {kyoceraFaults.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} />
            ))}
          </div>
        </Section>

        <Section title="Kyocera Repair Coverage by City" align="center" tone="raised">
          <div className="mx-auto max-w-3xl space-y-4">
            {cityResponse.map((c) => (
              <div key={c.city} className="rounded-card border border-white/[0.08] bg-surface-low p-6">
                <h3 className="mb-1 text-lg font-bold text-white">{c.city}</h3>
                <p className="text-on-surface-variant">{c.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Kyocera Models We Service" align="center">
          <div className="flex flex-wrap justify-center gap-4">
            {["ECOSYS P-series", "ECOSYS M-series MFP", "TASKalfa 2554ci", "TASKalfa 4054ci", "TASKalfa 5054ci", "TASKalfa 6003i", "FS series"].map((model) => (
              <span key={model} className="rounded-pill bg-surface-max px-6 py-3 text-lg font-semibold text-on-surface-variant">
                {model}
              </span>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Kyocera Printer Down?"
          body="Get a factory-certified technician dispatched with genuine OEM parts. Free diagnosis for AMC and rental clients."
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

        {/* Related — cross-link to the UAE-wide repair hub and Kyocera brand catalog */}
        <Section flush tone="raised">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">Looking to rent a Kyocera printer instead?</h2>
            <p className="text-muted">
              This page covers Kyocera repair, parts and service. For the full ECOSYS and TASKalfa rental lineup
              and pricing, see our{" "}
              <a href="/brands/kyocera/" className="font-semibold text-primary hover:underline">Kyocera printer catalog</a>{" "}
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
