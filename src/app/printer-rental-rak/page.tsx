export const runtime = 'edge';
import type { Metadata } from "next";
import { getRequestContext } from "@cloudflare/next-on-pages";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";

interface FAQItem { q: string; a: string; }

async function getFaqsFromD1(): Promise<FAQItem[]> {
  try {
    const env = getRequestContext().env as any;
    if (!env?.DB) return DEFAULT_FAQS;
    const result = await env.DB.prepare(
      "SELECT question, answer FROM faqs WHERE pageSlug = ? AND isActive = 1 ORDER BY sortOrder ASC"
    ).bind("printer-rental-rak").all();
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
  title: "Printer Rental RAK | Ras Al Khaimah | Sahara",
  description:
    "Printer and photocopier rental in Ras Al Khaimah (RAK) from AED 250/month. Zero deposit, free toner. Serving Al Hamra, RAK Free Trade Zone, Al Marjan Island. Canon & Kyocera.",
  keywords: [
    "printer rental ras al khaimah",
    "photocopier rental rak",
    "copier lease rak",
    "rak free zone printer rental",
    "al hamra printer lease",
    "zero deposit printer rak",
    "canon kyocera rental rak",
    "office equipment rental rak",
    "printer rental northern emirates",
  ],
  alternates: { canonical: "https://www.saharaprinter.com/printer-rental-rak/" },
  openGraph: {
    title: "Printer Rental RAK | AED 250/mo — Sahara Office Equipments",
    description:
      "Rent Canon or Kyocera printers in Ras Al Khaimah from AED 250/month. Zero deposit, free toner. Al Hamra, RAK FTZ, Al Marjan Island.",
    url: "https://www.saharaprinter.com/printer-rental-rak/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/location-rak.webp",
        width: 1920,
        height: 1181,
        alt: "Printer Rental Ras Al Khaimah — Sahara Office Equipments",
      },
    ],
  },
  };
}

const DEFAULT_FAQS: FAQItem[] = [
  { q: "How much does printer rental cost in Ras Al Khaimah?", a: "Printer rental in RAK starts from AED 250/month for an A4 desktop model. A3 multifunction photocopiers range from AED 500–900/month. Enterprise devices start at AED 1,000/month. All RAK plans include zero deposit, free toner, free delivery, and on-site support." },
  { q: "What is your response time in Ras Al Khaimah?", a: "We provide next-business-day service visits for RAK clients. Emergency breakdown response is within 4–6 hours across Ras Al Khaimah City, Al Hamra, RAK Free Trade Zone, and Al Marjan Island. If we cannot repair same-day, a replacement unit is delivered." },
  { q: "Do you serve RAK Free Trade Zone businesses?", a: "Yes. RAK FTZ is a key service area. We handle all free zone documentation for equipment lease agreements, and can invoice in USD or AED as required by RAK FTZ companies." },
  { q: "Is there a deposit for printer rental in RAK?", a: "No deposit. All RAK printer rental plans are zero-deposit — pay only your first month's rental to start. This makes it easy for new RAK Free Zone setups and growing businesses." },
  { q: "Which brands do you rent in Ras Al Khaimah?", a: "We rent Canon imageRUNNER ADVANCE, Kyocera TASKalfa, HP LaserJet Enterprise, and Xerox WorkCentre in RAK. Canon and Kyocera are the most popular choices for RAK's manufacturing and hospitality sectors." },
  { q: "Is toner included in the RAK rental plan?", a: "Yes. All RAK plans include unlimited genuine Canon or Kyocera OEM toner. We monitor toner levels remotely and deliver proactively before you run out — no waiting, no emergency orders." },
  { q: "How long are your RAK rental contracts?", a: "Contracts are available for 12, 24, or 36 months. Short-term 1–6 month rentals are available for events, construction site offices, and seasonal business spikes. Longer contracts attract lower monthly rates." },
  { q: "Do you provide network setup in Ras Al Khaimah?", a: "Yes. Free network and Wi-Fi configuration is included with all RAK installations. Our technician connects the printer to your network, sets up scan-to-email, and configures mobile printing (AirPrint/Mopria) — all at no extra charge." },
  { q: "Can I upgrade my printer during the RAK contract?", a: "Yes. You can upgrade to a higher-capacity model at any time during your RAK rental contract without penalty. This is common for RAK FTZ businesses that grow from 1 to multiple office locations." },
  { q: "Do you offer photocopier rental for events in RAK?", a: "Yes. Short-term event rental is available for trade shows, exhibitions, and construction site offices in RAK. Minimum 1 month. Delivery, setup, and collection all included." },
  { q: "Do you service Al Marjan Island and Al Hamra Village?", a: "Yes. Al Marjan Island and Al Hamra Village (including the RAK hospitality and residential developments) are within our regular RAK service coverage. Hotels, resorts, and property management offices in these areas are active Sahara clients." },
  { q: "What is the cost-per-page for rented printers in RAK?", a: "Black-and-white A4 printing on our rented Canon/Kyocera devices in RAK costs approximately 1–2 fils per page. Desktop inkjet and consumer laser printers cost 8–15 fils per page. For an office printing 3,000 pages/month, that saves AED 180–390/month." },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Sahara Office Equipments — RAK Printer Rental",
  legalName: "Sahara Office Equipment Trading LLC",
  description:
    "Printer and photocopier rental in Ras Al Khaimah (RAK) from AED 250/month. Zero deposit, free OEM toner, on-site support.",
  url: "https://www.saharaprinter.com/printer-rental-rak",
  telephone: "+971503823969",
  email: "info@saharaprinter.com",
  foundingDate: "2012",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Industrial Area 11",
    addressLocality: "Sharjah",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.7895,
    longitude: 55.9432,
  },
  areaServed: [
    { "@type": "City", name: "Ras Al Khaimah" },
    { "@type": "Place", name: "RAK Free Trade Zone" },
    { "@type": "Place", name: "Al Hamra" },
    { "@type": "Place", name: "Al Marjan Island" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "RAK Printer Rental Plans",
    itemListElement: [
      { "@type": "Offer", name: "A4 Printer Rental RAK", price: "250", priceCurrency: "AED" },
      { "@type": "Offer", name: "A3 Copier Rental RAK", price: "500", priceCurrency: "AED" },
      { "@type": "Offer", name: "Enterprise Copier RAK", price: "1000", priceCurrency: "AED" },
    ],
  },
  priceRange: "AED 250-2000",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com" },
    { "@type": "ListItem", position: 2, name: "Printer Rental RAK", item: "https://www.saharaprinter.com/printer-rental-rak" },
  ],
};

const pricingTiers = [
  {
    name: "A4 Desktop",
    price: "AED 250—450",
    tag: null,
    ideal: "Small offices, reception, remote sites",
    features: ["Canon LBP / Kyocera ECOSYS", "Up to 45 ppm A4 mono", "Print, copy, scan", "Free genuine OEM toner", "On-site support included", "4—6hr emergency response"],
  },
  {
    name: "A3 Mid-Range",
    price: "AED 500—900",
    tag: "Most Popular",
    ideal: "Shared RAK offices & free zone companies",
    features: ["Canon iR ADVANCE / Kyocera TASKalfa", "35—55 ppm A3 & A4 mono", "Print, copy, scan, fax", "Colour option available", "Scan to email / folder", "Free network setup", "Same-day replacement guarantee"],
  },
  {
    name: "A3 Enterprise",
    price: "AED 1,000—2,000",
    tag: null,
    ideal: "Manufacturing, large hospitality",
    features: ["Canon imageRUNNER C5560i", "60—100 ppm A3 colour", "Staple, booklet finishers", "Secure print, user auth", "50,000+ pages/month", "Dedicated account manager"],
  },
];

const rakAreas = [
  "Ras Al Khaimah City", "Al Hamra", "Al Marjan Island", "RAK Free Trade Zone",
  "Al Jazeera", "Al Dhaith", "Khuzam", "Al Nakheel",
  "Al Dhait", "Dafan Al Khor",
];

const relatedServices = [
  { href: "/services/printer-rental/", label: "Printer Rental UAE" },
  { href: "/services/photocopier-rental/", label: "Photocopier Rental" },
  { href: "/services/amc/", label: "Annual Maintenance (AMC)" },
  { href: "/services/repair/", label: "Printer Repair" },
  { href: "/brands/canon/", label: "Canon Printers" },
  { href: "/brands/kyocera/", label: "Kyocera Printers" },
];

const otherLocations = [
  { href: "/printer-rental-dubai/", label: "Printer Rental Dubai", desc: "Same-day delivery across all Dubai districts." },
  { href: "/printer-rental-abu-dhabi/", label: "Printer Rental Abu Dhabi", desc: "Weekly maintenance. Mussafah, Al Reem, Khalifa City." },
  { href: "/printer-rental-sharjah/", label: "Printer Rental Sharjah", desc: "Our HQ. Fastest service in Sharjah & Northern Emirates." },
  { href: "/printer-rental-fujairah/", label: "Printer Rental Fujairah", desc: "East Coast coverage — Dibba, Kalba, FFTZ." },
];

const trail = [{ label: "Home", href: "/" }, { label: "Printer Rental Ras Al Khaimah" }];

export default async function PrinterRentalRAK() {
  const faqs = await getFaqsFromD1();
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } : null;
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <main className="min-h-screen bg-surface">
        <Header />

        <section className="relative overflow-hidden px-6 pb-20 pt-32">
          <div className="absolute inset-0">
            <img
              src="/images/location-rak.webp"
              alt="Ras Al Khaimah corporate office"
              className="h-full w-full object-cover"
              fetchPriority="high"
              loading="eager"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-surface/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/60 to-surface-low" />
          </div>

          <div className="relative mx-auto max-w-content">
            <Breadcrumbs trail={trail} />
            <Reveal className="max-w-2xl">
              <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Ras Al Khaimah — Zero Deposit</p>
              <h1 className="font-sora text-display-xl font-extrabold text-white">
                Printer Rental <span className="text-primary">RAK</span>
              </h1>
              <div className="mt-6">
                <AnswerBlock
                  question="Can a RAK free-zone company rent a printer from Sahara?"
                  answer="Yes — Sahara bills RAK free-zone entities directly. Rental printers and copiers are delivered to RAK Free Trade Zone, Al Hamra, Al Marjan Island, Al Nakheel, and RAK Industrial Area, with invoicing arranged to suit free-zone accounting. Plans start at AED 250 per month, zero deposit, toner included."
                  supportingPoints={[
                    "RAK FTZ, Al Hamra, Al Marjan Island, Al Nakheel and RAK Industrial Area covered",
                    "Free-zone entity invoicing supported alongside mainland LLC billing",
                    "Zero deposit, unlimited genuine OEM toner, free delivery and free network setup",
                    "Canon and Kyocera multifunction devices from AED 250/month",
                  ]}
                />
              </div>
              <p className="mt-6 max-w-xl text-body text-muted">
                Canon &amp; Kyocera printer rental in Ras Al Khaimah from AED 250/month. Zero deposit, free toner,
                and on-site support across RAK Free Trade Zone, Al Hamra, and Al Marjan Island.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Zero Deposit", "Free Toner", "RAK FTZ Billing", "Free Network Setup", "Replacement Guarantee"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-caption text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="/rental-calculator/" className="btn-primary">Get Free Quote</a>
                <a href="tel:+971503823969" className="btn-secondary">Call: +971 50 382 3969</a>
              </div>
            </Reveal>
          </div>
        </section>

        <Section flush>
          <div className="mx-auto max-w-4xl rounded-panel border border-primary/[0.35] bg-surface-low p-8 md:p-10">
            <p className="mb-3 text-caption font-bold uppercase tracking-[0.25em] text-primary">
              AI Answer — What is Printer Rental in Ras Al Khaimah?
            </p>
            <p className="text-[1.05rem] leading-relaxed text-white">
              Printer rental in Ras Al Khaimah is a monthly service from{" "}
              <strong className="text-primary">AED 250/month</strong> providing Canon or Kyocera printers and
              photocopiers with toner, maintenance, and repairs included. Sahara Office Equipment Trading LLC serves
              RAK businesses including RAK Free Trade Zone, Al Hamra, and Al Marjan Island with{" "}
              <strong className="text-primary">zero deposit</strong> plans and 4—6hr emergency response.
            </p>
          </div>
        </Section>

        <Section flush>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 rounded-panel border border-white/[0.08] bg-surface-low px-6 py-8 text-center md:grid-cols-4">
            {[
              { number: "4—6", suffix: " hrs", label: "Emergency Response" },
              { number: "1,500", suffix: "+", label: "UAE Clients" },
              { number: "13", suffix: "+", label: "Years in UAE" },
              { number: "AED 250", suffix: "/mo", label: "Starting Price" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-primary">{s.number}<span className="text-xl">{s.suffix}</span></p>
                <p className="mt-1 text-caption uppercase tracking-widest text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section flush tone="raised">
          <div className="mx-auto max-w-4xl space-y-6">
            <h2 className="font-sora text-title font-bold text-white">
              Why RAK Businesses Choose Printer Rental Over Buying
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Ras Al Khaimah&rsquo;s diverse economy — from manufacturing and ceramics in the industrial zones to
              luxury hospitality at Al Hamra and Al Marjan Island — creates varied printing requirements. RAK Free
              Trade Zone alone hosts over 14,000 registered companies, many of which need document infrastructure
              from day one of operations.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Printer rental in RAK from Sahara provides RAK FTZ companies with immediate access to Canon and
              Kyocera equipment, no deposit, and USD or AED invoicing options — eliminating the administrative
              friction of sourcing equipment when setting up a new RAK free zone office. Setup within 24 hours of
              order, including full network configuration.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              For manufacturing businesses in RAK&rsquo;s industrial zones — producing ceramics, building materials,
              and pharmaceuticals — our enterprise copiers handle 50,000+ pages per month of production
              documentation without degradation. Backed by on-site support within 4—6 hours, downtime that stops
              documentation from flowing is avoided.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Cost-per-page on our rented devices is <strong className="text-white">1—2 fils per A4 page</strong> —
              compared to 8—15 fils for consumer desktop printers. For a RAK office printing 3,000 pages/month, the
              saving in consumables alone offsets a large portion of the monthly rental fee.
            </p>
          </div>
        </Section>

        <Section title="RAK Rental Plans" subtitle="Zero deposit · free toner · free delivery · on-site support" align="center">
          <div className="grid gap-8 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col overflow-hidden rounded-panel p-8 ${tier.tag ? "border border-primary/60 bg-surface-mid" : "border border-white/[0.08] bg-surface-low"}`}
              >
                {tier.tag && (
                  <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r from-primary to-primary-deep px-4 py-1 text-xs font-bold text-on-primary">
                    {tier.tag}
                  </div>
                )}
                <h3 className="mb-1 text-xl font-bold text-white">{tier.name}</h3>
                <p className="mb-1 text-2xl font-bold text-primary">{tier.price}<span className="text-sm font-normal text-muted">/month</span></p>
                <p className="mb-6 text-[0.9rem] italic text-muted">{tier.ideal}</p>
                <ul className="flex-1 space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <span className="mt-0.5 shrink-0 text-primary">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/rental-calculator/"
                  className={`mt-8 block rounded-pill py-3 text-center text-sm font-bold transition-all ${tier.tag ? "bg-gradient-to-r from-primary to-primary-deep text-on-primary" : "border border-primary/30 bg-primary/10 text-primary"}`}
                >
                  Get Quote
                </a>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Areas We Serve in Ras Al Khaimah" subtitle="On-site support across all RAK districts. Emergency response within 4—6 hours." align="center" tone="raised">
          <div className="flex flex-wrap justify-center gap-3">
            {rakAreas.map((area) => (
              <span key={area} className="rounded-pill border border-primary/20 bg-surface-max px-4 py-2 text-[0.9rem] text-on-surface-variant">
                {area}
              </span>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Need a Printer in RAK?"
          body="Quote within 2 hours. Free site visit. Setup within 24 hours across RAK."
          primary={{ label: "Get Free Quote", href: "/rental-calculator/" }}
          secondary={{ label: "Call +971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white mb-3">Printer Rental RAK — FAQ</h2>
            <p className="text-muted">12 questions answered</p>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={f.q} className="glass-card rounded-card p-6 group cursor-pointer" open={i === 0}>
                <summary className="flex list-none items-start justify-between gap-4 font-bold text-[1rem] text-white">
                  <span>{f.q}</span>
                  <span className="mt-1 shrink-0 text-lg leading-none text-primary transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-on-surface-variant">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section flush tone="raised">
          <p className="text-center text-caption font-bold uppercase tracking-widest text-muted mb-6">Related Services</p>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedServices.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-pill border border-white/[0.08] px-4 py-2 text-caption text-muted transition-all hover:text-white hover:border-primary/40">
                {link.label}
              </Link>
            ))}
          </div>
        </Section>

        <Section flush>
          <p className="text-center text-caption font-bold uppercase tracking-widest text-muted mb-6">Printer Rental in Other Emirates</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherLocations.map((loc) => (
              <Link key={loc.href} href={loc.href} className="group rounded-card border border-white/[0.06] bg-surface-low p-5 transition-all duration-300 hover:-translate-y-0.5">
                <h4 className="mb-1 text-[0.9rem] font-semibold text-white transition-colors group-hover:text-primary">{loc.label}</h4>
                <p className="text-caption leading-relaxed text-slate-500">{loc.desc}</p>
              </Link>
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
