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
import { SettingsIcon, HeadsetIcon, LayerStackIcon, ClockIcon } from "@/components/icons";

// Sep 2026: new page, built on the printer-repair-dubai pattern (district
// response table + Service + HowTo schema). GSC (90 days): "printer repair
// sharjah" 52 impressions @ pos 26.9, "printer repair in sharja" [sic] 8 @
// 33.1 — zero clicks despite this being the ONE emirate where Sahara is
// actually headquartered (Industrial Area 11). Every other Sharjah-branded
// page on this site already ranks 2-7 for its terms once given a dedicated
// URL (see printer-rental-sharjah, photocopier-rental-sharjah). Repair had
// no Sharjah-specific page before this — the only repair geo page was
// Dubai.
export const metadata: Metadata = {
  title: "Printer Repair Sharjah | 4-Hr Response | Sahara Office",
  description: "Fast printer & photocopier repair in Sharjah — our head office location. Same-day response, genuine OEM parts, all major brands serviced. ☎ +971503823969",
  keywords: "printer repair sharjah, printer repair in sharjah, photocopier repair sharjah, printer service sharjah, printer technician sharjah, printer fixing sharjah",
  openGraph: {
    title: "Printer Repair Sharjah | Sahara Office Equipments",
    description: "Same-day printer and photocopier repair in Sharjah — our head office. Canon, HP, Kyocera, Xerox, Ricoh, Brother specialists.",
    images: [{ url: "https://www.saharaprinter.com/images/heroPrntr1.webp", width: 1200, height: 630, alt: "Printer Repair Sharjah — Sahara Office Equipments" }],
    url: "https://www.saharaprinter.com/printer-repair-sharjah/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/printer-repair-sharjah/" },
};

const DEFAULT_FAQS: FaqItem[] = [
  { q: "Do you offer printer repair services in Sharjah?", a: "Yes — Sharjah is our head office location (Industrial Area 11), so response times here are typically the fastest in our entire coverage area, often same-day." },
  { q: "What is your printer repair response time in Sharjah?", a: "As our technician base is in Sharjah, most callouts are handled same-day, with a 4-hour target for standard service and faster for AMC/rental clients." },
  { q: "Do you repair all printer brands in Sharjah?", a: "Yes — we repair Canon, HP, Kyocera, Xerox, Ricoh, Sharp, Brother, Samsung and Lexmark printers and photocopiers in Sharjah." },
  { q: "How much does printer repair cost in Sharjah?", a: "Repairs start from AED 150 for standard callouts, covering diagnosis and labour. Genuine OEM parts are quoted separately. Machines under a Sahara AMC or rental plan pay nothing per callout." },
  { q: "Do you provide on-site printer repair in Sharjah?", a: "Yes — our technicians come to your office anywhere in Sharjah, including SAIF Zone, Hamriyah Free Zone, Al Nahda, Al Majaz, Muweilah and the industrial areas." },
  { q: "Do you offer printer repair contracts (AMC) in Sharjah?", a: "Yes — our Annual Maintenance Contract includes unlimited repairs, preventive maintenance, and priority response, from AED 299/month per machine." },
];

const repairServices = [
  { icon: SettingsIcon, title: "Hardware Repair", body: "Mechanical repairs, component replacement, roller changes, fuser unit repairs" },
  { icon: HeadsetIcon, title: "Software & Network", body: "Driver installation, network configuration, firmware updates, troubleshooting" },
  { icon: LayerStackIcon, title: "Deep Cleaning", body: "Interior cleaning, roller cleaning, belt replacement, printhead maintenance" },
  { icon: ClockIcon, title: "Same-Day Response", body: "Fastest average response time in our coverage area — we're based here" },
];

const sharjahAreas = [
  { area: "Industrial Area 1-18, SAIF Zone", response: "Same-day — we're based in Industrial Area 11" },
  { area: "Al Nahda, Al Majaz, Al Qasimia", response: "Same-day to 4-hour standard response" },
  { area: "Muweilah, Sharjah Airport Free Zone", response: "4-hour standard response" },
  { area: "Hamriyah Free Zone, Sharjah Publishing City", response: "4-hour standard response" },
];

const repairProcessSteps = [
  { step: "01", title: "Call or WhatsApp", desc: "Describe the fault and printer model. Because we're based in Sharjah, dispatch is usually immediate.", time: "< 5 min" },
  { step: "02", title: "Technician En Route", desc: "A certified engineer leaves from our Industrial Area 11 head office — the shortest average travel time in our coverage area.", time: "< 1 hr typical" },
  { step: "03", title: "On-Site Diagnosis", desc: "Full fault diagnosis with a transparent, itemised quote before any part is touched.", time: "15–30 min" },
  { step: "04", title: "Repair & Sign-Off", desc: "Genuine OEM parts installed, a test print run confirms the fix, and you receive a service report with a 30-day workmanship warranty.", time: "30–120 min" },
];

const repairServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Printer Repair Service Sharjah",
  "description": "On-site printer and photocopier repair in Sharjah, from Sahara's own head office in Industrial Area 11. Same-day response typical, genuine OEM parts, certified technicians, 30-day workmanship warranty.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments",
    "legalName": "Sahara Office Equipment Trading LLC",
    "telephone": "+971503823969",
  },
  "areaServed": { "@type": "City", "name": "Sharjah" },
  "serviceType": "Printer Repair",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AED",
    "price": "150",
    "availability": "https://schema.org/InStock",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Book Printer Repair in Sharjah",
  "description": "Steps to get an on-site printer or photocopier repair technician dispatched in Sharjah from Sahara Office Equipments — our own head office location.",
  "totalTime": "PT1H",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "AED", "value": "150" },
  "step": repairProcessSteps.map((s, i) => ({
    "@type": "HowToStep",
    "position": i + 1,
    "name": s.title,
    "text": s.desc,
  })),
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sahara Office Equipments — Sharjah Printer Repair (Head Office)",
  "description": "Printer and photocopier repair in Sharjah from Sahara's UAE head office. Same-day response typical, all brands serviced, genuine OEM parts.",
  "url": "https://www.saharaprinter.com/printer-repair-sharjah/",
  "telephone": "+971503823969",
  "email": "info@saharaprinter.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Al Arabi Building, Industrial Center Road, Industrial Area 11",
    "addressLocality": "Sharjah",
    "addressCountry": "AE",
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 25.2942534, "longitude": 55.4260483 },
  "areaServed": { "@type": "City", "name": "Sharjah" },
  "priceRange": "AED 150-2000",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Repair Services", "item": "https://www.saharaprinter.com/services/repair/" },
    { "@type": "ListItem", "position": 3, "name": "Printer Repair Sharjah", "item": "https://www.saharaprinter.com/printer-repair-sharjah/" },
  ],
};

const trail = [
  { label: "Home", href: "/" },
  { label: "Repair Services", href: "/services/repair/" },
  { label: "Printer Repair Sharjah" },
];

export default async function PrinterRepairSharjah() {
  const faqs = await getFaqsForPage("printer-repair-sharjah", DEFAULT_FAQS);
  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(repairServiceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>

      <main className="min-h-screen bg-surface">
        <Header />

        <section className="relative overflow-hidden px-6 pb-20 pt-32">
          <div className="absolute inset-0">
            <img
              src="/images/heroPrntr1.webp"
              alt="Printer Repair Sharjah"
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/90 to-surface-low" />
          </div>

          <div className="relative mx-auto max-w-content">
            <Breadcrumbs trail={trail} />
            <div className="grid items-center gap-14 md:grid-cols-2">
              <Reveal>
                <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Our Head Office Location</p>
                <h1 className="font-sora text-display-xl font-extrabold text-white">
                  Printer &amp; Photocopier Repair <span className="text-primary">Sharjah</span>
                </h1>
                <p className="mt-6 max-w-xl text-body text-muted">
                  Sharjah is where Sahara is based — Industrial Area 11 — so response times here are typically the
                  fastest in our entire coverage area, often same-day.
                </p>
                <div className="mt-6">
                  <AnswerBlock
                    question="How fast can a printer technician reach my Sharjah office?"
                    answer="Because our head office and technician base are in Sharjah Industrial Area 11, most Sharjah callouts are handled same-day — the fastest average response time anywhere in our coverage area. Repairs start from AED 150 with genuine OEM parts and a 30-day workmanship warranty."
                    supportingPoints={[
                      "Same-day response typical — we're based in Sharjah Industrial Area 11",
                      "Covers SAIF Zone, Hamriyah Free Zone, Al Nahda, Al Majaz and all Sharjah areas",
                      "Repairs from AED 150, genuine OEM parts only, 30-day workmanship warranty",
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
                    src="/images/service-maintanence.webp"
                    alt="Printer Repair Service Sharjah"
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
              { value: "Same-Day", label: "Typical Response (Our HQ)" },
              { value: "AED 150", label: "Callout From" },
              { value: "OEM Only", label: "Genuine Parts" },
              { value: "30 Days", label: "Workmanship Warranty" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-caption uppercase tracking-widest text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Our Printer Repair Services in Sharjah" align="center">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {repairServices.map((s) => (
              <FeatureCard key={s.title} icon={s.icon} title={s.title} body={s.body} />
            ))}
          </div>
        </Section>

        <Section title="Response Time by Sharjah Area" subtitle="We're headquartered in Sharjah Industrial Area 11 — the shortest average travel time in our entire coverage area." align="center" tone="raised">
          <div className="mx-auto max-w-3xl overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-caption uppercase tracking-widest text-muted">
                  <th className="py-3 pr-4">Area</th>
                  <th className="py-3">Response Target</th>
                </tr>
              </thead>
              <tbody>
                {sharjahAreas.map((d) => (
                  <tr key={d.area} className="border-b border-white/5">
                    <td className="py-3 pr-4 font-semibold text-white">{d.area}</td>
                    <td className="py-3 text-on-surface-variant">{d.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="How a Sharjah Repair Call Works" subtitle="From your call to a working printer — usually same-day, since we're based here." align="center">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {repairProcessSteps.map((s) => (
              <div key={s.step} className="rounded-card border border-white/[0.08] bg-surface-low p-6">
                <p className="mb-2 text-3xl font-bold text-primary/40">{s.step}</p>
                <h3 className="mb-2 text-lg font-bold text-white">{s.title}</h3>
                <p className="mb-3 text-sm text-on-surface-variant">{s.desc}</p>
                <p className="text-caption font-semibold uppercase tracking-widest text-primary">{s.time}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Printer Brands We Repair in Sharjah" align="center" tone="raised">
          <div className="flex flex-wrap justify-center gap-4">
            {["Canon", "HP", "Kyocera", "Xerox", "Ricoh", "Sharp", "Brother", "Samsung", "Lexmark", "Epson"].map((brand) => (
              <span key={brand} className="rounded-pill bg-surface-max px-6 py-3 text-lg font-semibold text-on-surface-variant">
                {brand}
              </span>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Need Printer Repair in Sharjah?"
          body="We're based here — same-day response is typical. Free diagnosis for AMC clients."
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
            <h2 className="mb-4 text-2xl font-bold text-white">Outside Sharjah?</h2>
            <p className="text-muted">
              We repair printers and copiers across all seven emirates. See our{" "}
              <a href="/services/repair/" className="font-semibold text-primary hover:underline">full repair service page</a>{" "}
              for brands serviced, AMC options, and UAE-wide coverage, or our{" "}
              <a href="/printer-repair-dubai/" className="font-semibold text-primary hover:underline">Dubai repair page</a>.
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
