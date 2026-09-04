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
import {
  SettingsIcon,
  TruckIcon,
  LayersIcon,
  AwardIcon,
  ShieldCheckIcon,
  ClockIcon,
} from "@/components/icons";

interface FAQItem { q: string; a: string; }

async function getFaqsFromD1(): Promise<FAQItem[]> {
  try {
    const env = getRequestContext().env as any;
    if (!env?.DB) return DEFAULT_FAQS;
    const result = await env.DB.prepare(
      "SELECT question, answer FROM faqs WHERE pageSlug = ? AND isActive = 1 ORDER BY sortOrder ASC"
    ).bind("photocopier-rental-sharjah").all();
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
  title: "Photocopier Rental Sharjah | Copier Lease from AED 250/mo",
  description:
    "Photocopier & copier rental in Sharjah from AED 250/month. Based in Industrial Area 11 — same-day delivery to SAIF Zone, Hamriyah, Al Majaz and Industrial Areas 1-18. Zero deposit, free toner, 4-hour response. Canon & Kyocera. ☎ +971503823969",
  keywords: [
    "photocopier rental sharjah",
    "printer rental sharjah",
    "copier lease sharjah",
    "SAIF Zone printer rental",
    "industrial area sharjah copier",
    "canon kyocera rental sharjah",
    "zero deposit copier sharjah",
    "printer lease uae",
    "photocopier hire sharjah",
    "office equipment rental sharjah",
    "copier rental services in sharjah",
    "photocopier for rent sharjah",
    "copier leasing in sharjah",
    "leasing printer in sharjah",
    "copier lease in sharjah",
    "hamriyah free zone printer rental",
  ],
  alternates: { canonical: "https://www.saharaprinter.com/photocopier-rental-sharjah/" },
  openGraph: {
    title: "Photocopier Rental Sharjah | AED 250/mo — Sahara Office Equipments",
    description:
      "Rent a Canon or Kyocera photocopier in Sharjah from AED 250/month. Zero deposit, free toner, 60-min response. Serving SAIF Zone, Industrial Area & all Sharjah areas.",
    url: "https://www.saharaprinter.com/photocopier-rental-sharjah/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/location-sharjah.webp",
        width: 1920,
        height: 1440,
        alt: "Photocopier Rental Sharjah — Sahara Office Equipments",
      },
    ],
  },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Sahara Office Equipments — Sharjah Photocopier Rental",
  legalName: "Sahara Office Equipment Trading LLC",
  description:
    "Photocopier and printer rental in Sharjah from AED 250/month. Zero deposit, free toner, 60-minute emergency response. Canon, Kyocera, Xerox, HP authorized service.",
  url: "https://www.saharaprinter.com/photocopier-rental-sharjah",
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
    latitude: 25.2942534,
    longitude: 55.4260483,
  },
  areaServed: [
    { "@type": "City", name: "Sharjah" },
    { "@type": "Place", name: "SAIF Zone" },
    { "@type": "Place", name: "Sharjah Industrial Area" },
    { "@type": "Place", name: "Sharjah Media City" },
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
    name: "Sharjah Photocopier Rental Plans",
    itemListElement: [
      {
        "@type": "Offer",
        name: "A4 Desktop Copier Rental Sharjah",
        price: "250",
        priceCurrency: "AED",
        description: "Canon/Kyocera A4 copier — includes toner, delivery, installation",
      },
      {
        "@type": "Offer",
        name: "A3 Mid-Range Copier Rental Sharjah",
        price: "500",
        priceCurrency: "AED",
        description: "A3 multifunction — print, scan, copy, fax — for shared offices",
      },
      {
        "@type": "Offer",
        name: "A3 Enterprise Copier Rental Sharjah",
        price: "1000",
        priceCurrency: "AED",
        description: "High-volume enterprise copier for large organisations & free zones",
      },
    ],
  },
  priceRange: "AED 250-2000",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Photocopier Rental Sharjah",
  provider: { "@type": "LocalBusiness", name: "Sahara Office Equipment Trading LLC" },
  areaServed: { "@type": "City", name: "Sharjah" },
  description:
    "Canon and Kyocera photocopier rental in Sharjah with zero deposit, unlimited toner, and 60-minute on-site support.",
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
      name: "Photocopier Rental Sharjah",
      item: "https://www.saharaprinter.com/photocopier-rental-sharjah",
    },
  ],
};

const DEFAULT_FAQS: FAQItem[] = [
  {
    q: "How much does photocopier rental cost in Sharjah?",
    a: "Photocopier rental in Sharjah starts from AED 250/month for an A4 desktop copier. A3 multifunction devices for shared offices range from AED 500—900/month. Enterprise high-volume copiers start at AED 1,000/month. All plans include zero deposit, free toner, free delivery, and on-site support.",
  },
  {
    q: "What is your emergency response time in Sharjah?",
    a: "We guarantee a 60-minute on-site response time for emergency breakdowns across Sharjah, including SAIF Zone, Industrial Area, Al Majaz, and Muweilah. Our Sharjah-based technicians are dispatched immediately upon your call to +971 50 382 3969.",
  },
  {
    q: "Do I need to pay a deposit for photocopier rental in Sharjah?",
    a: "No deposit required. Sahara offers zero-deposit photocopier rental across all Sharjah plans. You only pay your first month's rental to get started. This eliminates capital expenditure for businesses in Sharjah's Industrial Area and free zones.",
  },
  {
    q: "Which photocopier brands do you rent in Sharjah?",
    a: "We rent Canon imageRUNNER ADVANCE, Kyocera TASKalfa, Xerox WorkCentre, HP LaserJet, and Ricoh MP series in Sharjah. Canon and Kyocera are our most popular devices for Sharjah Industrial Area businesses and SAIF Zone companies.",
  },
  {
    q: "Is toner included in the Sharjah rental plan?",
    a: "Yes. All our Sharjah photocopier rental plans include genuine OEM toner at no extra charge. You never need to buy or order toner separately — we monitor usage and deliver proactively before you run out.",
  },
  {
    q: "Can SAIF Zone companies rent copiers from Sahara?",
    a: "Absolutely. We serve all SAIF Zone (Sharjah Airport International Free Zone) businesses with the same zero-deposit, free-toner plans. Invoicing can be in UAE dirham or US dollar as required. We handle all free zone documentation for equipment lease agreements.",
  },
  {
    q: "How long are your Sharjah photocopier rental contracts?",
    a: "Contracts are available for 12, 24, or 36 months. Shorter-term rentals (1—6 months) are available for exhibitions, project offices, and seasonal business peaks — ideal for companies around Expo Centre Sharjah. Longer contracts attract lower monthly rates.",
  },
  {
    q: "What happens if the photocopier breaks down in Sharjah?",
    a: "Call us and our Sharjah-based technician will be on-site within 60 minutes. If the machine cannot be repaired same day, we provide a replacement unit at no extra cost. You will never be left without a working device under our Sharjah rental agreement.",
  },
  {
    q: "Do you provide network and Wi-Fi setup for rented copiers in Sharjah?",
    a: "Yes. Free network configuration is included with every Sharjah rental installation. Our technicians connect the copier to your office network, configure scan-to-email, scan-to-folder, and set up user authentication if required — all at no extra charge.",
  },
  {
    q: "Can I upgrade my copier during the Sharjah rental contract?",
    a: "Yes. You can upgrade to a higher-capacity model at any point during your Sharjah rental contract without penalty. This is especially useful for fast-growing businesses in Sharjah Industrial Area and Sharjah Media City.",
  },
  {
    q: "Do you service Sharjah Industrial Area specifically?",
    a: "Sharjah Industrial Area (Areas 1—18) is one of our highest-density service zones. We have dedicated technicians for Industrial Area and can reach any location there in under 45 minutes. Over 200 businesses in the Industrial Area use Sahara copier rentals.",
  },
  {
    q: "What is the cost-per-page for rented copiers in Sharjah?",
    a: "Cost-per-page (CPP) for A4 black-and-white printing on our rented copiers in Sharjah is approximately 1—2 fils per page — significantly lower than desktop inkjet or laser cartridge printers which cost 5—15 fils per page. Colour CPP ranges from 8—15 fils depending on coverage.",
  },
];

const pricingTiers = [
  {
    name: "A4 Desktop",
    price: "AED 250—450",
    tag: null,
    ideal: "Small offices, reception desks",
    features: ["Canon LBP / Kyocera ECOSYS", "Up to 45 ppm A4 mono", "Print, copy, scan", "Free genuine toner", "Next-day delivery", "60-min emergency support"],
    cta: "Get Quote",
  },
  {
    name: "A3 Mid-Range",
    price: "AED 500—900",
    tag: "Most Popular",
    ideal: "Shared offices, SAIF Zone companies",
    features: ["Canon iR ADVANCE / Kyocera TASKalfa", "35—55 ppm A3 & A4", "Print, copy, scan, fax", "Colour option available", "Scan to email / folder / cloud", "Free network setup", "Same-day replacement guarantee"],
    cta: "Get Quote",
  },
  {
    name: "A3 Enterprise",
    price: "AED 1,000—2,000",
    tag: null,
    ideal: "High-volume industries, large free zones",
    features: ["Canon imageRUNNER C5560i / Kyocera 5053ci", "60—100 ppm A3 colour", "Staple, booklet, hole-punch finishers", "Secure print, user authentication", "Monthly 50,000+ page capacity", "Dedicated account manager", "Multi-site billing available"],
    cta: "Get Quote",
  },
];

const industryInsights = [
  {
    sector: "Manufacturing & Industrial",
    zone: "Sharjah Industrial Area",
    challenge: "Multi-shift operations need equipment that runs 24/7 without failure",
    solution: "Our Enterprise copiers handle 50,000+ pages/month. 60-min on-site response keeps production documentation flowing.",
    stat: "200+ Industrial Area businesses",
  },
  {
    sector: "Free Zone Companies",
    zone: "SAIF Zone",
    challenge: "Free zone companies need flexible billing and quick equipment setup for new offices",
    solution: "Zero deposit, USD/AED invoicing available, setup within 24 hours. All SAIF Zone documentation handled.",
    stat: "60+ SAIF Zone clients",
  },
  {
    sector: "Media & Creative",
    zone: "Sharjah Media City (Shams)",
    challenge: "Creative agencies need high-quality colour output with consistent colour accuracy",
    solution: "Canon imageRUNNER ADVANCE colour copiers with ICC profile calibration for accurate colour reproduction on all media.",
    stat: "Colour accuracy to ΔE < 2",
  },
  {
    sector: "Education & Government",
    zone: "University City Sharjah",
    challenge: "Universities and government entities need high-volume, cost-controlled printing for thousands of users",
    solution: "User authentication, quota management, and cost-per-department reporting built into our Enterprise rental plans.",
    stat: "1 fil/page at 50K vol",
  },
];

const sharjahAreas = [
  "Industrial Area 1–18", "SAIF Zone", "Hamriyah Free Zone", "Al Majaz",
  "Muweilah", "Al Nahda", "Al Qasba", "Al Qasimia", "Sharjah Airport",
  "King Faisal Rd", "Al Khan", "Muwailih Commercial", "Al Taawun",
  "Rolla Square", "Sharjah Media City", "University City", "Al Layyah", "Sajaa",
];

const whyChoose = [
  { icon: ShieldCheckIcon, title: "Zero Deposit", body: "No upfront security deposit — pay only first month's rental to start." },
  { icon: ClockIcon, title: "60-Min Response", body: "Dedicated Sharjah-based technicians dispatched within minutes of your call." },
  { icon: AwardIcon, title: "Free OEM Toner", body: "Genuine Canon/Kyocera toner proactively delivered before you run out." },
  { icon: SettingsIcon, title: "Network Setup Included", body: "Full LAN/Wi-Fi, scan-to-email, and user authentication — no extra charge." },
  { icon: TruckIcon, title: "Replacement Guarantee", body: "If your copier can't be fixed same-day, we install a replacement unit." },
  { icon: LayersIcon, title: "SAIF Zone Billing", body: "USD or AED invoicing with free zone documentation support." },
];

const relatedLinks = [
  { href: "/printer-rental-sharjah/", label: "Printer Rental Sharjah" },
  { href: "/printer-rental-dubai/", label: "Printer Rental Dubai" },
  { href: "/services/photocopier-rental/", label: "Photocopier Rental Service" },
  { href: "/services/amc/", label: "Printer AMC" },
];

const trail = [{ label: "Home", href: "/" }, { label: "Photocopier Rental Sharjah" }];

export default async function PhotocopierRentalSharjah() {
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

        <section className="relative overflow-hidden px-6 pb-20 pt-32">
          <div className="absolute inset-0">
            <img
              src="/images/location-sharjah.webp"
              alt="Sharjah corporate office"
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
              <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Sharjah — 60-Min Response</p>
              <h1 className="font-sora text-display-xl font-extrabold text-white">
                Photocopier Rental <span className="text-primary">Sharjah</span>
              </h1>
              <div className="mt-6">
                <AnswerBlock
                  question="How fast can a technician reach a Sharjah office?"
                  answer="Sahara targets a 60-minute on-site response anywhere in Sharjah. The company is headquartered at Al Arabi Building, Industrial Area 11, Sharjah, so engineers reach SAIF Zone, the Industrial Areas, Al Majaz, Al Nahda, and Muwaileh faster than Dubai-based providers. Photocopier rental starts from AED 250 per month."
                  supportingPoints={[
                    "HQ at Al Arabi Building, Industrial Area 11, Sharjah — no cross-emirate travel time",
                    "Covers SAIF Zone, Industrial Areas 1–18, Al Majaz, Al Nahda, Muwaileh and Al Khan",
                    "60-minute emergency response target, with a replacement machine if a fix runs long",
                    "Zero deposit, unlimited genuine toner and free network setup, from AED 250/month",
                  ]}
                />
              </div>
              <p className="mt-6 max-w-xl text-body text-muted">
                Canon &amp; Kyocera photocopiers from AED 250/month. Zero deposit, free toner, and 60-minute
                on-site emergency response across all Sharjah areas including SAIF Zone and Industrial Area.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Zero Deposit", "Free Toner", "60-Min Response", "Free Network Setup", "Replacement Guarantee"].map((t) => (
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
              AI Answer — What is Photocopier Rental in Sharjah?
            </p>
            <p className="text-[1.05rem] leading-relaxed text-white">
              Photocopier rental in Sharjah is a monthly subscription service where businesses pay from{" "}
              <strong className="text-primary">AED 250/month</strong> to use a Canon or Kyocera multifunction
              copier — with toner, maintenance, and repairs all included. Sahara Office Equipment Trading LLC has
              served Sharjah businesses since 2012, offering{" "}
              <strong className="text-primary">60-minute emergency response</strong>, zero deposit, and free
              installation across SAIF Zone, Industrial Area, and all Sharjah districts.
            </p>
          </div>
        </Section>

        <Section flush>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 rounded-panel border border-white/[0.08] bg-surface-low px-6 py-8 text-center md:grid-cols-4">
            {[
              { number: "60", suffix: " min", label: "Response Time" },
              { number: "1,500", suffix: "+", label: "Happy Clients" },
              { number: "13", suffix: "+", label: "Years Serving UAE" },
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
              Why Sharjah Businesses Choose Photocopier Rental Over Buying
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Sharjah is home to over 30,000 registered businesses across its Industrial Areas, SAIF Zone, Sharjah
              Media City, and University City. For many of these businesses — particularly SMEs in manufacturing,
              logistics, and professional services — purchasing a commercial photocopier outright means a capital
              outlay of AED 8,000 to AED 45,000, plus ongoing toner and maintenance costs. Rental eliminates this
              entirely.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              With Sahara&rsquo;s photocopier rental in Sharjah, businesses pay a fixed monthly fee that covers the
              machine, all genuine OEM toner cartridges, preventive maintenance visits, and unlimited on-site
              repairs. The 60-minute emergency response time is uniquely valuable for Sharjah Industrial Area
              businesses where a copier outage can halt production documentation, delivery orders, and compliance
              paperwork.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              SAIF Zone and Sharjah Media City companies benefit from Sahara&rsquo;s flexible billing — USD or AED
              invoicing is available, and equipment can be added or upgraded mid-contract without renegotiation. New
              office setups in SAIF Zone are completed within 24 hours of order, including full network
              configuration and user account setup.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Unlike desktop laser printers which cost 5—15 fils per A4 page, our rented photocopiers deliver
              black-and-white output at approximately <strong className="text-white">1—2 fils per page</strong> — a
              saving of up to 87% on per-page costs for businesses printing more than 3,000 pages per month.
            </p>
          </div>
        </Section>

        <Section title="Sharjah Rental Plans" subtitle="All plans: zero deposit · free toner · free delivery · 60-min support" align="center">
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
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Sharjah Industry Use Cases" subtitle="How different Sharjah sectors benefit from copier rental" align="center" tone="raised">
          <div className="grid gap-6 md:grid-cols-2">
            {industryInsights.map((ins) => (
              <div key={ins.sector} className="glass-card rounded-panel p-8">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white">{ins.sector}</h3>
                  <p className="text-sm text-primary">{ins.zone}</p>
                </div>
                <p className="mb-3 text-sm text-on-surface-variant">
                  <strong className="text-white">Challenge:</strong> {ins.challenge}
                </p>
                <p className="mb-4 text-sm text-on-surface-variant">
                  <strong className="text-white">Solution:</strong> {ins.solution}
                </p>
                <div className="inline-block rounded-xl bg-primary/10 px-4 py-2">
                  <span className="text-sm font-bold text-primary">{ins.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Areas We Serve in Sharjah" subtitle="60-minute emergency response across all Sharjah districts. Same-day delivery for new rentals." align="center">
          <p className="mx-auto mb-8 max-w-3xl text-center text-sm leading-relaxed text-on-surface-variant">
            Our workshop and parts inventory are in <strong className="text-white">Sharjah Industrial Area 11</strong>,
            not a Dubai head office serving Sharjah as an afterthought. For businesses in the Industrial Areas, SAIF
            Zone and Hamriyah Free Zone that usually means an engineer on site within the hour and the part already
            on the van — rather than a next-day slot and a parts order. It is also why we can swap a failed machine
            the same day instead of leaving a floor without a copier.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {sharjahAreas.map((area) => (
              <span key={area} className="rounded-pill border border-primary/20 bg-surface-max px-4 py-2 text-[0.9rem] text-on-surface-variant transition-colors hover:border-primary/50">
                {area}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Why Choose Sahara in Sharjah?" align="center" tone="raised">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((b) => (
              <FeatureCard key={b.title} icon={b.icon} title={b.title} body={b.body} />
            ))}
          </div>
        </Section>

        <CtaBand
          title="Need a Photocopier in Sharjah?"
          body="Quote within 2 hours. Free site visit. Same-day setup available across Sharjah."
          primary={{ label: "Get Free Quote", href: "/rental-calculator/" }}
          secondary={{ label: "Call +971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white mb-3">Photocopier Rental Sharjah — FAQ</h2>
            <p className="text-muted">12 questions answered by our Sharjah team</p>
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
          <p className="text-center text-caption font-bold uppercase tracking-widest text-muted mb-6">Related</p>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-pill border border-white/[0.08] px-4 py-2 text-caption text-muted transition-all hover:text-white hover:border-primary/40">
                {link.label}
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
