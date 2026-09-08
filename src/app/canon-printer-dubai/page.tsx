export const runtime = 'edge';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";
import { getFaqsForPage, buildFaqSchema } from "@/lib/faqs";
import type { FaqItem } from "@/lib/faqs";

// Sep 2026: converted from a client component whose FAQPage JSON-LD shipped
// as `"mainEntity": []` in SSR HTML (state initialised to [], only
// populated from localStorage in useEffect, which never runs server-side —
// verified live via curl before this fix). Same bug class as the Aug 2026
// brand-page Loading... bug and the copier-lease-uae fix. hp-printer-abu-dhabi
// and printer-repair-dubai were checked at the same time and do NOT have
// this bug (their state already initialises from defaultFaqs), so only this
// page needed the conversion. Also adds the BreadcrumbList schema this page
// was missing relative to its two siblings, and aligns the AED 300 price
// quoted in its own FAQ answer to the AED 250 entry price used sitewide.
const trail = [{ label: "Home", href: "/" }, { label: "Brands", href: "/brands/canon/" }, { label: "Canon Printer Dubai" }];

const DEFAULT_FAQS: FaqItem[] = [
  { q: "Do you rent Canon printers in Dubai?", a: "Yes! We offer a wide range of Canon printers and photocopiers for rent in Dubai, including imageRUNNER, i-SENSYS, and imageCLASS series." },
  { q: "What Canon models are available for rental in Dubai?", a: "We rent Canon imageRUNNER ADVANCE, i-SENSYS MF, imageCLASS, and MAXIFY series. From compact A4 printers to heavy-duty A3 copiers." },
  { q: "How much does Canon printer rental cost in Dubai?", a: "Canon printer rental in Dubai starts from AED 250/month for A4 models, with A3 enterprise copiers from AED 500-2000/month. All include free toner." },
  { q: "Do you provide Canon printer repair in Dubai?", a: "Yes, our certified technicians provide on-site Canon printer repair in Dubai with 4-hour emergency response time." },
  { q: "Is Canon toner included in the rental price?", a: "Yes! All our Canon printer rentals in Dubai include unlimited genuine Canon toner at no extra cost." },
  { q: "Can I upgrade my Canon printer during the rental period?", a: "Absolutely! Our 'Growth Guard' policy allows you to upgrade your Canon printer anytime during the contract." },
  { q: "Do you offer Canon printer AMC in Dubai?", a: "Yes, we offer Annual Maintenance Contracts for Canon printers covering all repairs, toner, and preventive maintenance." },
  { q: "What areas in Dubai do you serve for Canon rentals?", a: "We serve all Dubai areas including Business Bay, JLT, Deira, Marina, DIFC, Sheikh Zayed Road, and all other districts." },
];

const canonModels = [
  { name: "Canon imageRUNNER ADVANCE C356i", type: "A4 Color MFP", speed: "35 ppm", features: "Print, Copy, Scan, Send" },
  { name: "Canon imageRUNNER ADVANCE 5540i", type: "A3 B&W", speed: "40 ppm", features: "High-speed, Security" },
  { name: "Canon imageRUNNER ADVANCE C5250", type: "A3 Color", speed: "50 ppm", features: "Full Color, Professional" },
  { name: "Canon i-SENSYS MF655Cdn", type: "A4 Color", speed: "21 ppm", features: "Compact, Network" },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sahara Office Equipments - Canon Dubai",
  "description": "Canon printer rental in Dubai. imageRUNNER, i-SENSYS, imageCLASS series with zero deposit and free toner.",
  "url": "https://www.saharaprinter.com/canon-printer-dubai/",
  "telephone": "+971503823969",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Business Bay",
    "addressLocality": "Dubai",
    "addressCountry": "AE"
  },
  "areaServed": {
    "@type": "State",
    "name": "Dubai"
  },
  "priceRange": "AED 250-2000",
  "openingHours": "24/7"
};

// Sep 2026: added — this page had LocalBusiness + FAQPage + BreadcrumbList
// but no Service schema, unlike its siblings (kyocera-printer-repair,
// printer-repair-dubai, etc.).
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Canon Printer Rental Dubai",
  "description": "Canon imageRUNNER, i-SENSYS and imageCLASS printer rental in Dubai with zero deposit, free toner, and 4-hour emergency response.",
  "provider": { "@type": "LocalBusiness", "name": "Sahara Office Equipments", "telephone": "+971503823969" },
  "areaServed": { "@type": "City", "name": "Dubai" },
  "serviceType": "Printer Rental",
  "offers": { "@type": "AggregateOffer", "priceCurrency": "AED", "lowPrice": 250, "highPrice": 2000, "offerCount": 1, "availability": "https://schema.org/InStock" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Brands", "item": "https://www.saharaprinter.com/brands/canon/" },
    { "@type": "ListItem", "position": 3, "name": "Canon Printer Dubai", "item": "https://www.saharaprinter.com/canon-printer-dubai/" }
  ]
};

export default async function CanonPrinterDubai() {
  const faqs = await getFaqsForPage("canon-dubai", DEFAULT_FAQS);
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
              src="/images/canon-hero.webp"
              alt="Canon Printer Dubai"
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/90 to-surface-low" />
          </div>

          <div className="relative mx-auto max-w-content">
            <Breadcrumbs trail={trail} />
            <div className="grid items-center gap-14 md:grid-cols-2">
              <Reveal>
                <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Canon Printer Rental Dubai</p>
                <h1 className="font-sora text-display-xl font-extrabold text-white">
                  Canon Printer <span className="text-primary">Dubai</span>
                </h1>
                <p className="mt-6 max-w-xl text-body text-muted">
                  Premium Canon printer and photocopier rental in Dubai. imageRUNNER, i-SENSYS, and imageCLASS
                  series with zero deposit and free toner.
                </p>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a href="/rental-calculator/" className="btn-primary">Get Free Quote</a>
                  <a href="tel:+971503823969" className="btn-secondary">Call: +971503823969</a>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="relative hidden lg:block">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-[120px]" />
                <div className="glass-card relative z-10 overflow-hidden rounded-panel p-8">
                  <img
                    src="/images/printer-canon-1.webp"
                    alt="Canon Photocopier Rental Dubai"
                    className="h-full w-full rounded-card object-cover mix-blend-screen opacity-90"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Section title="Canon Printer Models Available in Dubai" align="center">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {canonModels.map((model) => (
              <Reveal key={model.name} className="h-full">
                <div className="h-full rounded-card border border-white/[0.08] bg-surface-low p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">{model.name}</h3>
                  <p className="mb-4 text-sm text-primary">{model.type}</p>
                  <div className="space-y-2 text-sm text-on-surface-variant">
                    <p><span className="font-semibold text-white">Speed:</span> {model.speed}</p>
                    <p><span className="font-semibold text-white">Features:</span> {model.features}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section title="Why Choose Canon Printers in Dubai" align="center" tone="raised">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Vibrant Color", desc: "Canon Color imageRUNNER delivers exceptional color reproduction ideal for marketing materials." },
              { title: "Reliability", desc: "Canon devices are known for legendary durability and low maintenance requirements." },
              { title: "Easy to Use", desc: "Intuitive touch interfaces and seamless integration with office workflows." },
            ].map((feature) => (
              <Reveal key={feature.title} className="h-full">
                <div className="h-full rounded-card border border-white/[0.08] bg-surface-low p-8 text-center">
                  <h3 className="mb-4 text-xl font-bold text-primary">{feature.title}</h3>
                  <p className="text-on-surface-variant">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Need Canon Printer in Dubai?"
          body="Get a customized quote within 2 hours. Free consultation and site visit."
          primary={{ label: "Get Free Quote", href: "/rental-calculator/" }}
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

        {/* Related — cross-link to catalog page to signal complementary (not duplicate) intent */}
        <Section flush tone="raised">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">Looking for full Canon model specs?</h2>
            <p className="text-muted">
              This page covers Canon printer rental, pricing, and service in Dubai. For the complete Canon
              imageRUNNER ADVANCE lineup, technology comparisons, and model specifications across the UAE, see our{" "}
              <a href="/brands/canon/" className="font-semibold text-primary hover:underline">Canon printer catalog</a>.
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
