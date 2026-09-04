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
import FeatureCard from "@/components/ui/FeatureCard";
import CtaBand from "@/components/ui/CtaBand";
import { ShieldCheckIcon, AwardIcon, TruckIcon, HeadsetIcon } from "@/components/icons";

interface FAQItem { q: string; a: string; }

async function getFaqsFromD1(): Promise<FAQItem[]> {
  try {
    const env = getRequestContext().env as any;
    if (!env?.DB) return DEFAULT_FAQS;
    const result = await env.DB.prepare(
      "SELECT question, answer FROM faqs WHERE pageSlug = ? AND isActive = 1 ORDER BY sortOrder ASC"
    ).bind("printer-rental-abu-dhabi").all();
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
  title: "Printer Rental Abu Dhabi | AED 250/mo | Sahara",
  description:
    "Printer rental in Abu Dhabi from AED 250/month. Zero deposit, free toner, weekly service visits. Serving Mussafah, Al Reem Island, Khalifa City, Masdar City. Canon & Kyocera. Call now.",
  keywords: [
    "printer rental abu dhabi",
    "photocopier rental abu dhabi",
    "copier lease abu dhabi",
    "mussafah printer rental",
    "al reem island copier rental",
    "zero deposit printer abu dhabi",
    "canon kyocera rental abu dhabi",
    "office equipment rental abu dhabi",
    "printer lease uae",
    "masdar city printer rental",
  ],
  alternates: { canonical: "https://www.saharaprinter.com/printer-rental-abu-dhabi/" },
  openGraph: {
    title: "Printer Rental Abu Dhabi | AED 250/mo — Sahara Office Equipments",
    description:
      "Rent Canon or Kyocera printers and copiers in Abu Dhabi from AED 250/month. Zero deposit, free toner, weekly maintenance. Mussafah, Khalifa City, Al Reem Island.",
    url: "https://www.saharaprinter.com/printer-rental-abu-dhabi/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/location-abu-dhabi.webp",
        width: 1920,
        height: 2880,
        alt: "Printer Rental Abu Dhabi — Sahara Office Equipments",
      },
    ],
  },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Sahara Office Equipments — Abu Dhabi Printer Rental",
  legalName: "Sahara Office Equipment Trading LLC",
  description:
    "Printer and photocopier rental in Abu Dhabi from AED 250/month. Zero deposit, free OEM toner, weekly preventive maintenance, and emergency response.",
  url: "https://www.saharaprinter.com/printer-rental-abu-dhabi",
  telephone: "+971503823969",
  email: "info@saharaprinter.com",
  foundingDate: "2012",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Industrial Area 11",
    addressLocality: "Sharjah",
    addressRegion: "Sharjah",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.4539,
    longitude: 54.3773,
  },
  areaServed: [
    { "@type": "City", name: "Abu Dhabi" },
    { "@type": "Place", name: "Mussafah Industrial Area" },
    { "@type": "Place", name: "Al Reem Island" },
    { "@type": "Place", name: "Masdar City" },
    { "@type": "Place", name: "Khalifa City" },
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
    name: "Abu Dhabi Printer Rental Plans",
    itemListElement: [
      {
        "@type": "Offer",
        name: "A4 Desktop Printer Rental Abu Dhabi",
        price: "250",
        priceCurrency: "AED",
        description: "Canon/Kyocera A4 printer — includes toner, delivery, weekly maintenance",
      },
      {
        "@type": "Offer",
        name: "A3 Mid-Range Copier Rental Abu Dhabi",
        price: "500",
        priceCurrency: "AED",
        description: "A3 multifunction — print, copy, scan — for shared Abu Dhabi offices",
      },
      {
        "@type": "Offer",
        name: "A3 Enterprise Copier Rental Abu Dhabi",
        price: "1000",
        priceCurrency: "AED",
        description: "High-volume enterprise copier for large Abu Dhabi organisations",
      },
    ],
  },
  priceRange: "AED 250-2000",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Printer Rental Abu Dhabi",
  provider: { "@type": "LocalBusiness", name: "Sahara Office Equipment Trading LLC" },
  areaServed: { "@type": "City", name: "Abu Dhabi" },
  description:
    "Canon and Kyocera printer and photocopier rental in Abu Dhabi with zero deposit, unlimited toner, and weekly preventive maintenance.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "250",
    highPrice: "2000",
    priceCurrency: "AED",
    offerCount: "12",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Printer Rental Abu Dhabi",
      item: "https://www.saharaprinter.com/printer-rental-abu-dhabi",
    },
  ],
};

const DEFAULT_FAQS: FAQItem[] = [
  {
    q: "How much does printer rental cost in Abu Dhabi?",
    a: "Printer rental in Abu Dhabi starts from AED 250/month for an A4 desktop model. A3 multifunction photocopiers for shared offices range from AED 500—900/month. High-volume enterprise devices start at AED 1,000/month. All plans include zero deposit, free OEM toner, free delivery, and weekly preventive maintenance.",
  },
  {
    q: "What is the response time for Abu Dhabi printer repair?",
    a: "We schedule weekly preventive maintenance visits for all Abu Dhabi rental units. For emergency breakdowns, we dispatch a technician within 4—6 hours to anywhere in Abu Dhabi — including Mussafah, Khalifa City, Al Reem Island, and Yas Island. Same-day replacement units are available if the repair takes longer.",
  },
  {
    q: "Do I need a deposit for printer rental in Abu Dhabi?",
    a: "No deposit required. Sahara's Abu Dhabi printer rental plans are all zero-deposit. You only pay your first month to start. This is particularly valuable for businesses in Abu Dhabi's ADGM and free zones where capital preservation is a priority.",
  },
  {
    q: "Which printer brands do you rent in Abu Dhabi?",
    a: "We rent Canon imageRUNNER ADVANCE, Kyocera TASKalfa, HP LaserJet Enterprise, Xerox WorkCentre, and Ricoh MP series in Abu Dhabi. Canon and Kyocera are most popular among Mussafah industrial clients and Al Reem Island offices.",
  },
  {
    q: "Is toner included in the Abu Dhabi rental plan?",
    a: "Yes. All Abu Dhabi printer rental plans include genuine Canon or Kyocera OEM toner at no extra cost. We proactively monitor toner levels remotely and deliver replacements before you run out — typically within 24 hours of detection.",
  },
  {
    q: "Do you serve Mussafah Industrial Area and free zones?",
    a: "Yes. Mussafah is one of our primary Abu Dhabi service zones. We also serve KEZAD (Khalifa Economic Zones), Abu Dhabi Global Market (ADGM), twofour54, and all Abu Dhabi free zones. Free zone billing and documentation are handled by our team.",
  },
  {
    q: "How long are your Abu Dhabi printer rental contracts?",
    a: "Contracts are offered for 12, 24, or 36 months. Shorter rentals from 1—6 months are available for project offices, exhibitions at ADNEC, and seasonal setups. Longer contracts have lower monthly rates. All contracts include upgrade rights.",
  },
  {
    q: "What happens if my printer breaks down in Abu Dhabi?",
    a: "Call +971 50 382 3969 and we dispatch a technician within 4—6 hours. If we cannot repair it same day, we deliver a replacement unit at no extra charge. You are never left without a working printer under our Abu Dhabi rental agreement.",
  },
  {
    q: "Do you provide network setup for rented printers in Abu Dhabi?",
    a: "Yes. Free network configuration is part of every Abu Dhabi installation. We connect the printer to your office LAN or Wi-Fi, set up scan-to-email, configure mobile printing (AirPrint/Mopria), and handle secure print release if needed — all included.",
  },
  {
    q: "Can I upgrade my printer during the Abu Dhabi rental contract?",
    a: "Yes. Upgrade to a higher-speed or colour model at any point during your Abu Dhabi contract without penalty. This is useful for Abu Dhabi businesses that grow quickly — especially in sectors like real estate, construction, and government contracting.",
  },
  {
    q: "Do you serve Saadiyat Island and Yas Island?",
    a: "Yes. Our Abu Dhabi coverage includes Saadiyat Island (particularly Louvre Abu Dhabi area and cultural district offices), Yas Island (gaming, entertainment, and hospitality businesses), Al Maryah Island/ADGM, and all other Abu Dhabi islands and districts.",
  },
  {
    q: "What is cost-per-page (CPP) for rented printers in Abu Dhabi?",
    a: "Black-and-white A4 printing on our rented Kyocera and Canon devices costs approximately 1—2 fils per page in Abu Dhabi — vs 8—15 fils for desktop inkjet or consumer laser printers. For an office printing 5,000 pages/month, that is a saving of AED 300—650/month in consumables alone.",
  },
];

const pricingTiers = [
  {
    name: "A4 Desktop",
    price: "AED 250—450",
    tag: null,
    ideal: "Small offices, reception desks, individual use",
    features: [
      "Canon LBP / Kyocera ECOSYS",
      "Up to 45 ppm A4 mono",
      "Print, copy, scan",
      "Free genuine OEM toner",
      "Weekly preventive maintenance",
      "Emergency 4—6hr response",
    ],
  },
  {
    name: "A3 Mid-Range",
    price: "AED 500—900",
    tag: "Most Popular",
    ideal: "Shared offices, Mussafah businesses",
    features: [
      "Canon iR ADVANCE / Kyocera TASKalfa",
      "35—55 ppm A3 & A4 mono",
      "Print, copy, scan, fax",
      "Colour option available",
      "Scan to email / folder / cloud",
      "Free network & Wi-Fi setup",
      "Same-day replacement guarantee",
    ],
  },
  {
    name: "A3 Enterprise",
    price: "AED 1,000—2,000",
    tag: null,
    ideal: "Large organisations, government, ADGM",
    features: [
      "Canon imageRUNNER C5560i / Kyocera 5053ci",
      "60—100 ppm A3 colour",
      "Staple, booklet, hole-punch finishing",
      "Secure print, user authentication",
      "50,000+ page monthly capacity",
      "Dedicated account manager",
      "Multi-site billing available",
    ],
  },
];

const industryInsights = [
  {
    sector: "Oil & Gas / Government",
    zone: "ADNOC / ADGM",
    icon: ShieldCheckIcon,
    challenge:
      "Large government and energy sector offices need high-volume, secure document handling with audit trails",
    solution:
      "Enterprise Canon copiers with secure print release, user authentication, and document tracking — compliant with government data policies.",
    stat: "50,000+ pages/month capacity",
  },
  {
    sector: "Real Estate & Construction",
    zone: "Yas Island / Al Reem",
    icon: AwardIcon,
    challenge: "Real estate offices produce large volumes of A3 blueprints, contracts, and marketing material",
    solution:
      "A3 colour copiers with 55 ppm output handle design documents, contracts, and brochure printing with same-day setup.",
    stat: "A3 colour from AED 900/mo",
  },
  {
    sector: "Manufacturing & Logistics",
    zone: "Mussafah Industrial",
    icon: TruckIcon,
    challenge:
      "Industrial businesses in Mussafah need reliable documentation equipment with quick breakdown recovery",
    solution:
      "Weekly preventive maintenance with 4—6hr emergency response ensures production documentation never stops.",
    stat: "4—6hr emergency response",
  },
  {
    sector: "Hospitality & Tourism",
    zone: "Saadiyat / Yas Island",
    icon: HeadsetIcon,
    challenge:
      "Hotels and resorts need multi-point printing across front desk, F&B, and events with mobile print capability",
    solution:
      "Network-connected copiers with AirPrint/Mopria mobile printing, scan-to-email for guest services, and event printing packages.",
    stat: "AirPrint & Mopria enabled",
  },
];

const abuDhabiAreas = [
  "Mussafah", "Al Reem Island", "Khalifa City", "Masdar City",
  "Yas Island", "Saadiyat Island", "Corniche", "Al Markaz",
  "Madinat Zayed", "Al Shamkha", "Al Wathba", "Khalifa Port Area",
  "ADGM / Al Maryah", "Mohammed Bin Zayed City",
];

const relatedServices = [
  { href: "/services/printer-rental/", label: "Printer Rental UAE" },
  { href: "/services/photocopier-rental/", label: "Photocopier Rental" },
  { href: "/services/amc/", label: "Annual Maintenance (AMC)" },
  { href: "/services/repair/", label: "Printer Repair" },
  { href: "/services/printer-spare-parts/", label: "Toner & Spare Parts" },
  { href: "/hp-printer-abu-dhabi/", label: "HP Printer Abu Dhabi" },
  { href: "/brands/canon/", label: "Canon Printers" },
  { href: "/brands/kyocera/", label: "Kyocera Printers" },
  { href: "/copier-lease-uae/", label: "Copier Lease UAE" },
];

const otherLocations = [
  { href: "/printer-rental-dubai/", label: "Printer Rental Dubai", desc: "Same-day delivery. Business Bay, DIFC, JLT, Marina & all Dubai areas." },
  { href: "/printer-rental-sharjah/", label: "Printer Rental Sharjah", desc: "Our HQ. Fastest service in Sharjah & Northern Emirates." },
  { href: "/printer-rental-al-ain/", label: "Printer Rental Al Ain", desc: "Serving Al Ain businesses, universities & clinics." },
  { href: "/copier-lease-uae/", label: "Copier Lease UAE", desc: "Nationwide fleet leasing with one contract & invoice." },
];

const blogPosts = [
  {
    slug: "why-a-company-chooses-copier-rental-service-over-buying-a-copier",
    title: "Why Companies Choose Copier Rental Over Buying",
    category: "Guide",
    img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758617392/blogs/icz06yszynxpk624dmox.jpg",
  },
  {
    slug: "total-cost-of-printer-ownership",
    title: "Total Cost of Printer Ownership",
    category: "Finance",
    img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758623726/blogs/rm2ptjektgnlq5hyoeyl.jpg",
  },
  {
    slug: "what-a-copier-rental-service-must-deliver-to-a-client",
    title: "What a Copier Rental Service Must Deliver",
    category: "Guide",
    img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758723167/blogs/gifymghto0ykchvzrjyt.jpg",
  },
  {
    slug: "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025",
    title: "Why Every UAE Business is Renting Printers in 2025",
    category: "Trends",
    img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1751102332/blogs/dqusdi9d0tonfoa0ggx6.jpg",
  },
];

const trail = [{ label: "Home", href: "/" }, { label: "Printer Rental Abu Dhabi" }];

export default async function PrinterRentalAbuDhabi() {
  const faqs = await getFaqsFromD1();
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } : null;
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <main className="min-h-screen bg-surface">
        <Header />

        {/* Hero — full-bleed Abu Dhabi photo, distinct per city page by design */}
        <section className="relative overflow-hidden px-6 pb-20 pt-32">
          <div className="absolute inset-0">
            <img
              src="/images/location-abu-dhabi.webp"
              alt="Abu Dhabi corporate office"
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
              <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Abu Dhabi — Weekly Maintenance</p>
              <h1 className="font-sora text-display-xl font-extrabold text-white">
                Printer Rental <span className="text-primary">Abu Dhabi</span>
              </h1>
              <div className="mt-6">
                <AnswerBlock
                  question="Which Abu Dhabi areas does Sahara cover, and how often are machines serviced?"
                  answer="Sahara covers all Abu Dhabi areas with weekly preventive maintenance visits. Coverage includes Mussafah, ICAD, Al Reem Island, Khalifa City, Yas Island, and the city centre, plus Al Ain. Rented machines get scheduled weekly checks rather than break-fix-only support, with a 4-to-6-hour emergency response target."
                  supportingPoints={[
                    "Areas covered: Mussafah, ICAD I–III, Al Reem Island, Khalifa City, Yas Island, Corniche, Al Ain",
                    "Weekly preventive maintenance is included, not charged as separate callouts",
                    "Zero deposit, unlimited genuine OEM toner, and free network setup on delivery",
                    "Rental from AED 250/month with a 4–6 hour emergency response target",
                  ]}
                />
              </div>
              <p className="mt-6 max-w-xl text-body text-muted">
                Canon &amp; Kyocera printer and photocopier rental from AED 250/month. Zero deposit, free OEM
                toner, and weekly preventive maintenance across all Abu Dhabi areas.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Zero Deposit", "Free OEM Toner", "Weekly Service", "4—6hr Emergency", "Free Network Setup"].map((t) => (
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
              AI Answer — What is Printer Rental in Abu Dhabi?
            </p>
            <p className="text-[1.05rem] leading-relaxed text-white">
              Printer rental in Abu Dhabi is a monthly subscription from{" "}
              <strong className="text-primary">AED 250/month</strong> where businesses use Canon or Kyocera
              printers and photocopiers — with toner, maintenance, and repairs included. Sahara Office Equipment
              Trading LLC, founded in 2012, serves Abu Dhabi businesses with{" "}
              <strong className="text-primary">weekly preventive maintenance</strong>, 4—6hr emergency response,
              and zero deposit plans across Mussafah, Al Reem Island, Khalifa City, and ADGM.
            </p>
          </div>
        </Section>

        <Section flush>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 rounded-panel border border-white/[0.08] bg-surface-low px-6 py-8 text-center md:grid-cols-4">
            {[
              { number: "4—6", suffix: " hrs", label: "Emergency Response" },
              { number: "1,500", suffix: "+", label: "UAE Clients Served" },
              { number: "13", suffix: "+", label: "Years in UAE" },
              { number: "AED 250", suffix: "/mo", label: "Starting Price" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-primary">
                  {s.number}
                  <span className="text-xl">{s.suffix}</span>
                </p>
                <p className="mt-1 text-caption uppercase tracking-widest text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section flush tone="raised">
          <div className="mx-auto max-w-4xl space-y-6">
            <h2 className="font-sora text-title font-bold text-white">
              Printer Rental in Abu Dhabi — Why Businesses Choose Leasing Over Buying
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Abu Dhabi&rsquo;s business environment — spanning government entities, oil and gas firms, real estate
              developers, and a growing SME sector — demands reliable document infrastructure. Purchasing a commercial
              printer or photocopier outright costs AED 8,000 to AED 45,000, and that&rsquo;s before toner, maintenance
              parts, and the cost of downtime when equipment fails.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Sahara&rsquo;s printer rental in Abu Dhabi converts those unpredictable capital and operating expenses into a
              single fixed monthly payment. Our plans cover the machine, all genuine Canon or Kyocera toner, weekly
              preventive maintenance, unlimited repairs, and emergency support within 4—6 hours. For Abu Dhabi
              businesses in ADGM (Al Maryah Island), this means predictable IT spend that aligns with free zone
              financial reporting requirements.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Mussafah Industrial Area clients benefit from our on-site technical knowledge of industrial
              environments — dusty conditions, extended operating hours, and multi-shift demands. We configure
              enterprise-grade Canon and Kyocera devices to handle 50,000+ pages/month without degradation, backed
              by weekly preventive maintenance that catches issues before they cause downtime.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              For Abu Dhabi businesses printing more than 2,000 pages per month, our rental copiers deliver
              black-and-white output at approximately{" "}
              <strong className="text-white">1—2 fils per A4 page</strong> — compared to 8—15 fils for consumer
              cartridge printers. At 5,000 pages/month, that difference saves AED 300—650/month in consumables alone,
              making the rental effectively self-funding.
            </p>
          </div>
        </Section>

        <Section title="Abu Dhabi Rental Plans" subtitle="All plans: zero deposit · free toner · free delivery · weekly maintenance" align="center">
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
                <p className="mb-1 text-2xl font-bold text-primary">
                  {tier.price}
                  <span className="text-sm font-normal text-muted">/month</span>
                </p>
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

        <Section title="Abu Dhabi Industry Use Cases" subtitle="How different Abu Dhabi sectors use printer rental" align="center" tone="raised">
          <div className="grid gap-6 md:grid-cols-2">
            {industryInsights.map((ins, i) => (
              <Reveal key={ins.sector} delay={(i % 2) * 0.05}>
                <div className="h-full rounded-panel border border-white/[0.08] bg-surface-low p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-primary/10 text-primary">
                      <ins.icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{ins.sector}</h3>
                      <p className="text-caption text-primary">{ins.zone}</p>
                    </div>
                  </div>
                  <p className="mb-3 text-[0.9rem] text-muted"><strong className="text-white">Challenge:</strong> {ins.challenge}</p>
                  <p className="mb-4 text-[0.9rem] text-muted"><strong className="text-white">Solution:</strong> {ins.solution}</p>
                  <div className="inline-block rounded-pill bg-primary/10 px-4 py-2">
                    <span className="text-sm font-bold text-primary">{ins.stat}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section title="Areas We Serve in Abu Dhabi" subtitle="Weekly scheduled maintenance visits. Emergency response within 4—6 hours." align="center">
          <div className="flex flex-wrap justify-center gap-3">
            {abuDhabiAreas.map((area) => (
              <span key={area} className="rounded-pill border border-primary/20 bg-surface-max px-4 py-2 text-[0.9rem] text-on-surface-variant transition-colors hover:border-primary/50">
                {area}
              </span>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Need a Printer in Abu Dhabi?"
          body="Quote within 2 hours. Free site visit. Same-week delivery across Abu Dhabi."
          primary={{ label: "Get Free Quote", href: "/rental-calculator/" }}
          secondary={{ label: "Call +971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white mb-3">Printer Rental Abu Dhabi — FAQ</h2>
            <p className="text-muted">12 questions answered by our team</p>
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

        <Section eyebrow="Resource Hub" title="Abu Dhabi Printer Rental Guides" tone="raised">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blogs/${post.slug}`} className="group">
                <div className="flex h-full flex-col overflow-hidden rounded-card border border-white/[0.08] bg-surface-mid transition-transform duration-300 hover:-translate-y-1">
                  <img src={post.img} alt={post.title} className="h-32 w-full object-cover" loading="lazy" />
                  <div className="flex flex-1 flex-col p-4">
                    <span className="mb-2 inline-flex self-start rounded-pill border border-primary/20 bg-surface-max px-2 py-0.5 text-[10px] font-medium text-primary">
                      {post.category}
                    </span>
                    <h4 className="line-clamp-3 flex-1 text-[0.8rem] font-semibold leading-snug text-white transition-colors group-hover:text-primary">
                      {post.title}
                    </h4>
                    <span className="mt-3 flex items-center gap-1 text-caption text-primary">
                      Read
                      <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-right">
            <Link href="/blogs/" className="text-[0.9rem] text-primary hover:underline">View All →</Link>
          </div>
        </Section>

        <Footer />
        <WhatsAppCTA />
        <JumpToTop />
      </main>
    </>
  );
}
