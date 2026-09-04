export const runtime = 'edge';
import type { Metadata } from "next";
import { getRequestContext } from "@cloudflare/next-on-pages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import AnswerBlock from "@/components/AnswerBlock";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FeatureCard from "@/components/ui/FeatureCard";
import ComparisonTable from "@/components/ui/ComparisonTable";
import CtaBand from "@/components/ui/CtaBand";
import { TruckIcon, ClockIcon, HeadsetIcon, AwardIcon, SettingsIcon, ShieldCheckIcon } from "@/components/icons";

interface FAQItem { q: string; a: string; }

// New page targeting a query cluster GSC showed zero-click despite strong
// impressions and position (Aug 2026 export): "printer rental in sharjah"
// (326 imps, pos 19.8), "rental printer sharjah" (152, pos 13.6), "printer
// rental sharjah" (119, pos 13.9), "copier rental services in sharjah" (102,
// pos 19.0), "printer lease in sharjah" (81, pos 5.1 — already page 1),
// "office equipment rental sharjah" (75, pos 6.9), "copier sale sharjah"
// (44, pos 14.3). Every other emirate Sahara serves (Dubai, Abu Dhabi, Al
// Ain, Fujairah, RAK) already has a dedicated page — Sharjah, where the
// company is actually headquartered, did not.
const DEFAULT_FAQS: FAQItem[] = [
  { q: "How much does printer rental cost in Sharjah?", a: "Printer rental in Sharjah starts from AED 250/month for an A4 desktop printer. A3 multifunction photocopiers start from AED 500/month, and enterprise-grade colour MFPs range AED 1,000–2,000/month. All plans include zero deposit, unlimited OEM toner, maintenance, and free delivery." },
  { q: "Is printer lease and printer rental the same thing in Sharjah?", a: "Yes — \"printer lease,\" \"printer rental,\" and \"copier rental\" describe the same all-inclusive monthly service from Sahara: the machine, unlimited toner, maintenance, and repairs bundled into one predictable fee, with no ownership transfer." },
  { q: "Do you offer same-day printer delivery in Sharjah?", a: "Yes — as our head office is based in Sharjah Industrial Area, same-day delivery and setup is available across Sharjah city, including Al Nahda, Al Majaz, Al Qasimia, Muweilah, and the industrial areas, subject to stock and order time." },
  { q: "Can I rent printers for a SAIF Zone or Hamriyah Free Zone business?", a: "Yes. We regularly supply and service printers and photocopiers for businesses in SAIF Zone, Hamriyah Free Zone, and Sharjah Publishing City, with the same zero-deposit, all-inclusive rental terms as mainland Sharjah." },
  { q: "Do you sell copiers outright in Sharjah, or only rent?", a: "Both. Most Sharjah businesses choose rental for the included maintenance and toner, but outright purchase is available for Canon, Kyocera, HP, Ricoh, and other brands — ask for a sales quote alongside your rental options." },
  { q: "What is the response time for printer repairs in Sharjah?", a: "As our headquarters and main technician base are in Sharjah, response times here are typically the fastest in our coverage area — under 4 hours for standard call-outs, often same-day." },
];

async function getFaqsFromD1(): Promise<FAQItem[]> {
  try {
    const env = getRequestContext().env as any;
    if (!env?.DB) return DEFAULT_FAQS;
    const result = await env.DB.prepare(
      "SELECT question, answer FROM faqs WHERE pageSlug = ? AND isActive = 1 ORDER BY sortOrder ASC"
    ).bind("printer-rental-sharjah").all();
    if (result?.results?.length > 0) {
      return result.results.map((r: any) => ({ q: r.question, a: r.answer }));
    }
    return DEFAULT_FAQS;
  } catch {
    return DEFAULT_FAQS;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Printer Rental Sharjah | AED 250/mo | Zero Deposit | Sahara",
    description: "Printer & copier rental in Sharjah from AED 250/month — zero deposit, free toner & maintenance, same-day delivery from our Sharjah HQ. SAIF Zone, Al Nahda, Muweilah & all areas. ☎ +971503823969",
    keywords: "printer rental sharjah, printer rental in sharjah, rental printer sharjah, copier rental services in sharjah, printer lease in sharjah, office equipment rental sharjah, copier sale sharjah, photocopier rental sharjah",
    openGraph: {
      title: "Printer Rental Sharjah | Sahara Office Equipments",
      description: "Printer & copier rental in Sharjah from AED 250/month. Zero deposit, free toner, same-day delivery from our Sharjah head office.",
      images: [{ url: "https://www.saharaprinter.com/images/heroPrntr1.webp", width: 1200, height: 630, alt: "Printer Rental Sharjah" }],
      url: "https://www.saharaprinter.com/printer-rental-sharjah/",
      siteName: "Sahara Office Equipments",
      locale: "en_AE",
      type: "website",
    },
    alternates: { canonical: "https://www.saharaprinter.com/printer-rental-sharjah/" },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "name": "Sahara Office Equipments — Sharjah Printer Rental (Head Office)",
  "legalName": "Sahara Office Equipment Trading LLC",
  "description": "Printer rental, copier leasing, and sales in Sharjah from Sahara's UAE head office. Zero deposit, unlimited free toner, same-day delivery, and the fastest response times in our coverage area. Plans from AED 250/month.",
  "url": "https://www.saharaprinter.com/printer-rental-sharjah/",
  "telephone": "+971503823969",
  "email": "info@saharaprinter.com",
  "image": "https://www.saharaprinter.com/images/heroPrntr1.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Al Arabi Building, Industrial Center Road, Industrial Area 11",
    "addressLocality": "Sharjah",
    "addressRegion": "Sharjah",
    "addressCountry": "AE",
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 25.2942534, "longitude": 55.4260483 },
  "areaServed": [
    { "@type": "City", "name": "Sharjah", "sameAs": "https://www.wikidata.org/wiki/Q42043" },
    "Al Nahda", "Al Majaz", "Al Qasimia", "Muweilah", "Industrial Area",
    "SAIF Zone", "Hamriyah Free Zone", "Sharjah Publishing City", "Al Khan", "Al Taawun",
  ],
  "priceRange": "AED 250—2000",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], "opens": "08:00", "closes": "20:00" },
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Sharjah Printer Rental Plans",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "A4 Desktop Printer Rental Sharjah",
        "price": "250",
        "priceCurrency": "AED",
        "priceSpecification": { "@type": "UnitPriceSpecification", "unitText": "MONTH", "minPrice": "250", "maxPrice": "400" },
        "description": "A4 print, unlimited toner, quarterly maintenance, and same-day response from our Sharjah HQ.",
      },
      {
        "@type": "Offer",
        "name": "A3 Multifunction Photocopier Rental Sharjah",
        "price": "500",
        "priceCurrency": "AED",
        "priceSpecification": { "@type": "UnitPriceSpecification", "unitText": "MONTH", "minPrice": "500", "maxPrice": "900" },
        "description": "A3 and A4 print, copy, and scan with unlimited toner, monthly maintenance, and network setup.",
      },
      {
        "@type": "Offer",
        "name": "Enterprise Copier Rental Sharjah",
        "price": "1000",
        "priceCurrency": "AED",
        "priceSpecification": { "@type": "UnitPriceSpecification", "unitText": "MONTH", "minPrice": "1000", "maxPrice": "2000" },
        "description": "High-speed A3 colour MFP with unlimited toner, weekly maintenance, and priority response.",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Printer Rental Sharjah", "item": "https://www.saharaprinter.com/printer-rental-sharjah/" },
  ],
};

const rentVsLease = [
  ["Deposit", "Zero deposit", "N/A — outright purchase"],
  ["Toner", "Unlimited OEM toner included", "Purchased separately"],
  ["Maintenance", "Included in monthly fee", "Optional AMC extra"],
  ["Upfront cost", "None", "Full purchase price"],
  ["Best for", "Predictable monthly budgeting", "Long-term, high-volume use"],
];

const trail = [{ label: "Home", href: "/" }, { label: "Printer Rental Sharjah" }];

export default async function PrinterRentalSharjahPage() {
  const faqs = await getFaqsFromD1();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.saharaprinter.com/printer-rental-sharjah/#faq",
    "mainEntity": faqs.map((f, i) => ({
      "@type": "Question",
      "@id": `https://www.saharaprinter.com/printer-rental-sharjah/#faq-${i + 1}`,
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-surface">
        <Header />

        <section className="relative overflow-hidden px-6 pb-16 pt-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-[32rem] w-[32rem] -translate-y-1/3 translate-x-1/4 rounded-full bg-primary/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-content">
            <Breadcrumbs trail={trail} />
            <p className="mb-5 inline-flex items-center gap-2 rounded-pill border border-primary/30 bg-primary/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-[0.14em] text-primary">
              Head Office — Sharjah
            </p>
            <h1 className="font-sora text-display-xl font-extrabold text-white">
              Printer Rental Sharjah
            </h1>
            <div className="mt-6 max-w-2xl">
              <AnswerBlock
                id="printer-rental-sharjah"
                question="How much does printer rental cost in Sharjah, and how fast is delivery?"
                answer="Printer and copier rental in Sharjah starts from AED 250/month with zero deposit, unlimited OEM toner, and maintenance included. As our head office is based in Sharjah Industrial Area, same-day delivery and the fastest response times in our coverage area are available across the city and its free zones."
                supportingPoints={[
                  "Zero deposit, unlimited toner, and maintenance bundled into one monthly fee — from AED 250 for A4, AED 500 for A3 MFPs.",
                  "Same-day delivery and setup across Al Nahda, Al Majaz, Muweilah, and the Industrial Areas — we're based here.",
                  "Full coverage for SAIF Zone, Hamriyah Free Zone, and Sharjah Publishing City businesses.",
                  "Outright purchase also available for Canon, Kyocera, HP, and Ricoh — not rental-only.",
                ]}
              />
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="/rental-calculator/" className="btn-primary">Get a Sharjah Quote</a>
              <a href="tel:+971503823969" className="btn-secondary">Call: +971 50 382 3969</a>
            </div>
          </div>
        </section>

        <Section flush eyebrow="Why Sahara in Sharjah" title="Head office advantage">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={TruckIcon} title="Same-Day Delivery" body="Sharjah city and Industrial Area orders placed before midday typically ship same day." />
            <FeatureCard icon={ClockIcon} title="Fastest Response" body="Our technician base is in Sharjah — the shortest call-out times in our UAE coverage area." delay={0.05} />
            <FeatureCard icon={ShieldCheckIcon} title="Zero Deposit" body="Qualified Sharjah businesses rent with no upfront security deposit." delay={0.1} />
            <FeatureCard icon={SettingsIcon} title="Free Zone Coverage" body="SAIF Zone, Hamriyah Free Zone, and Sharjah Publishing City — full sales and service support." delay={0.15} />
          </div>
        </Section>

        <Section eyebrow="Rent vs Buy" title="Rental or outright purchase in Sharjah" tone="raised">
          <ComparisonTable columns={["", "Rental", "Purchase"]} highlightColumn={1} rows={rentVsLease} />
        </Section>

        <Section eyebrow="Areas We Cover" title="Sharjah delivery & service area">
          <div className="flex flex-wrap gap-3">
            {[
              "Al Nahda", "Al Majaz", "Al Qasimia", "Muweilah", "Industrial Area 1-17",
              "Al Khan", "Al Taawun", "Al Nasserya", "University City",
              "SAIF Zone", "Hamriyah Free Zone", "Sharjah Publishing City",
            ].map((area) => (
              <span key={area} className="rounded-pill border border-white/[0.08] bg-surface-low px-4 py-2 text-caption text-on-surface-variant">
                {area}
              </span>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Rent or Buy a Printer in Sharjah Today"
          body="Same-day delivery from our Sharjah head office — zero deposit, unlimited toner, and maintenance included."
          primary={{ label: "Get a Quote", href: "/rental-calculator/" }}
          secondary={{ label: "Call: +971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-muted">Common questions about printer rental in Sharjah.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="glass-card rounded-card p-5" open={i === 0}>
                <summary className="cursor-pointer font-sora font-bold text-white">{f.q}</summary>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section flush tone="ink">
          <h2 className="text-headline font-bold text-white mb-6">Related</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/photocopier-rental-sharjah/", label: "Photocopier Rental Sharjah" },
              { href: "/printer-rental-dubai/", label: "Printer Rental Dubai" },
              { href: "/printer-rental-abu-dhabi/", label: "Printer Rental Abu Dhabi" },
              { href: "/copier-lease-uae/", label: "Copier Lease UAE" },
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
