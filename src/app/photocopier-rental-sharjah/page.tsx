export const runtime = 'edge';
import type { Metadata } from "next";
import { getRequestContext } from "@cloudflare/next-on-pages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import AnswerBlock from "@/components/AnswerBlock";

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
  // Strongest geographic cluster on the site (Sharjah outranks Dubai equivalents
  // by 15-30 positions, backed by the verified Sharjah GBP) but only 0.38% CTR
  // at position 19.7. Title now names copier rental explicitly — the actual
  // query set is "copier rental services in sharjah" and "photocopier for rent
  // sharjah" — and the description leads with local proof rather than generic terms.
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
    // Exact phrasings this page already ranks for in GSC but did not target:
    // copier rental services in sharjah (104 impr, pos 19.6),
    // photocopier for rent sharjah (88, 22.1), copier leasing in sharjah (9, 2.6),
    // leasing printer in sharjah (8, 6.2), copier lease in sharjah (7, 6.7).
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
    features: [
      "Canon LBP / Kyocera ECOSYS",
      "Up to 45 ppm A4 mono",
      "Print, copy, scan",
      "Free genuine toner",
      "Next-day delivery",
      "60-min emergency support",
    ],
    cta: "Get Quote",
  },
  {
    name: "A3 Mid-Range",
    price: "AED 500—900",
    tag: "Most Popular",
    ideal: "Shared offices, SAIF Zone companies",
    features: [
      "Canon iR ADVANCE / Kyocera TASKalfa",
      "35—55 ppm A3 & A4",
      "Print, copy, scan, fax",
      "Colour option available",
      "Scan to email / folder / cloud",
      "Free network setup",
      "Same-day replacement guarantee",
    ],
    cta: "Get Quote",
  },
  {
    name: "A3 Enterprise",
    price: "AED 1,000—2,000",
    tag: null,
    ideal: "High-volume industries, large free zones",
    features: [
      "Canon imageRUNNER C5560i / Kyocera 5053ci",
      "60—100 ppm A3 colour",
      "Staple, booklet, hole-punch finishers",
      "Secure print, user authentication",
      "Monthly 50,000+ page capacity",
      "Dedicated account manager",
      "Multi-site billing available",
    ],
    cta: "Get Quote",
  },
];

const industryInsights = [
  {
    sector: "Manufacturing & Industrial",
    zone: "Sharjah Industrial Area",
    icon: "ðŸ­",
    challenge: "Multi-shift operations need equipment that runs 24/7 without failure",
    solution:
      "Our Enterprise copiers handle 50,000+ pages/month. 60-min on-site response keeps production documentation flowing.",
    stat: "200+ Industrial Area businesses",
  },
  {
    sector: "Free Zone Companies",
    zone: "SAIF Zone",
    icon: "âœˆï¸",
    challenge: "Free zone companies need flexible billing and quick equipment setup for new offices",
    solution:
      "Zero deposit, USD/AED invoicing available, setup within 24 hours. All SAIF Zone documentation handled.",
    stat: "60+ SAIF Zone clients",
  },
  {
    sector: "Media & Creative",
    zone: "Sharjah Media City (Shams)",
    icon: "📺",
    challenge: "Creative agencies need high-quality colour output with consistent colour accuracy",
    solution:
      "Canon imageRUNNER ADVANCE colour copiers with ICC profile calibration for accurate colour reproduction on all media.",
    stat: "Colour accuracy to ΔE < 2",
  },
  {
    sector: "Education & Government",
    zone: "University City Sharjah",
    icon: "🎓",
    challenge: "Universities and government entities need high-volume, cost-controlled printing for thousands of users",
    solution:
      "User authentication, quota management, and cost-per-department reporting built into our Enterprise rental plans.",
    stat: "1 fil/page at 50K vol",
  },
];

// Hamriyah Free Zone was missing entirely despite being one of Sharjah's two
// major free zones. Industrial Areas are now enumerated because businesses
// there search by their own area number, and our workshop sits in Area 11.
const sharjahAreas = [
  "Industrial Area 1–18", "SAIF Zone", "Hamriyah Free Zone", "Al Majaz",
  "Muweilah", "Al Nahda", "Al Qasba", "Al Qasimia", "Sharjah Airport",
  "King Faisal Rd", "Al Khan", "Muwailih Commercial", "Al Taawun",
  "Rolla Square", "Sharjah Media City", "University City", "Al Layyah", "Sajaa",
];

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
    <main className="min-h-screen bg-[#071325]">
      <Header />

      {/* Breadcrumb */}
      <nav className="pt-28 pb-2 px-8 lg:px-24 max-w-7xl mx-auto" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-[#d3c5b0]">
          <li><a href="/" className="hover:text-[#f5be53] transition-colors">Home</a></li>
          <li className="text-[#f5be53]">/</li>
          <li className="text-white font-medium">Photocopier Rental Sharjah</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative pt-8 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/location-sharjah.webp"
            alt="Sharjah corporate office"
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-[#071325]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325]/80 via-[#071325]/60 to-[#101c2e]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-1 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">
                Sharjah — 60-Min Response
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Photocopier Rental{" "}
                <span className="text-[#f5be53]">Sharjah</span>
              </h1>

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

              <p className="text-lg text-[#d3c5b0] mb-6 max-w-xl">
                Canon &amp; Kyocera photocopiers from AED 250/month. Zero deposit, free toner, and 60-minute
                on-site emergency response across all Sharjah areas including SAIF Zone and Industrial Area.
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Zero Deposit", "Free Toner", "60-Min Response", "Free Network Setup", "Replacement Guarantee"].map(
                  (p) => (
                    <span
                      key={p}
                      className="text-xs font-semibold px-3 py-1 rounded-full border border-[#f5be53]/40 text-[#f5be53] bg-[#f5be53]/10"
                    >
                      {p}
                    </span>
                  )
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/rental-calculator/"
                  className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
                >
                  Get Free Quote
                </a>
                <a
                  href="tel:+971503823969"
                  className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors"
                >
                  Call: +971 50 382 3969
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AEO Answer Block */}
      <section className="py-10 px-8 bg-[#101c2e]">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: "linear-gradient(135deg, #0f1e33 0%, #0a1420 100%)",
              border: "1px solid rgba(245, 190, 83, 0.35)",
              boxShadow: "0 0 40px rgba(245, 190, 83, 0.08)",
            }}
          >
            <p className="text-[#f5be53] text-xs font-bold tracking-[0.25em] uppercase mb-3">
              AI Answer — What is Photocopier Rental in Sharjah?
            </p>
            <p className="text-white text-lg leading-relaxed">
              Photocopier rental in Sharjah is a monthly subscription service where businesses pay from{" "}
              <strong className="text-[#f5be53]">AED 250/month</strong> to use a Canon or Kyocera multifunction
              copier — with toner, maintenance, and repairs all included. Sahara Office Equipment Trading LLC has
              served Sharjah businesses since 2012, offering{" "}
              <strong className="text-[#f5be53]">60-minute emergency response</strong>, zero deposit, and free
              installation across SAIF Zone, Industrial Area, and all Sharjah districts.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl py-8 px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "60", suffix: " min", label: "Response Time" },
              { number: "1,500", suffix: "+", label: "Happy Clients" },
              { number: "13", suffix: "+", label: "Years Serving UAE" },
              { number: "AED 250", suffix: "/mo", label: "Starting Price" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-[#f5be53]">
                  {s.number}
                  <span className="text-xl">{s.suffix}</span>
                </p>
                <p className="text-xs uppercase tracking-widest text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-form Content */}
      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Why Sharjah Businesses Choose Photocopier Rental Over Buying
          </h2>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Sharjah is home to over 30,000 registered businesses across its Industrial Areas, SAIF Zone, Sharjah
            Media City, and University City. For many of these businesses — particularly SMEs in manufacturing,
            logistics, and professional services — purchasing a commercial photocopier outright means a capital
            outlay of AED 8,000 to AED 45,000, plus ongoing toner and maintenance costs. Rental eliminates this
            entirely.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            With Sahara's photocopier rental in Sharjah, businesses pay a fixed monthly fee that covers the machine,
            all genuine OEM toner cartridges, preventive maintenance visits, and unlimited on-site repairs. The
            60-minute emergency response time is uniquely valuable for Sharjah Industrial Area businesses where a
            copier outage can halt production documentation, delivery orders, and compliance paperwork.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            SAIF Zone and Sharjah Media City companies benefit from Sahara's flexible billing — USD or AED invoicing
            is available, and equipment can be added or upgraded mid-contract without renegotiation. New office
            setups in SAIF Zone are completed within 24 hours of order, including full network configuration and
            user account setup.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Unlike desktop laser printers which cost 5—15 fils per A4 page, our rented photocopiers deliver
            black-and-white output at approximately <strong className="text-white">1—2 fils per page</strong> — a
            saving of up to 87% on per-page costs for businesses printing more than 3,000 pages per month.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white">Sharjah Rental Plans</h2>
            <p className="text-[#d3c5b0] mt-3 text-lg">All plans: zero deposit Â· free toner Â· free delivery Â· 60-min support</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, i) => (
              <div
                key={i}
                className="glass-card rounded-3xl p-8 flex flex-col relative overflow-hidden"
                style={
                  tier.tag
                    ? { border: "1px solid rgba(245,190,83,0.6)", boxShadow: "0 0 40px rgba(245,190,83,0.12)" }
                    : {}
                }
              >
                {tier.tag && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] text-xs font-bold px-4 py-1 rounded-bl-2xl">
                    {tier.tag}
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-[#f5be53] text-2xl font-bold mb-1">{tier.price}<span className="text-sm font-normal text-[#d3c5b0]">/month</span></p>
                <p className="text-[#d3c5b0] text-sm mb-6 italic">{tier.ideal}</p>
                <ul className="space-y-2 flex-1">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-[#d3c5b0]">
                      <span className="text-[#f5be53] mt-0.5 shrink-0">âœ"</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/rental-calculator/"
                  className="mt-8 block text-center py-3 rounded-full font-bold text-sm transition-all"
                  style={
                    tier.tag
                      ? { background: "linear-gradient(to right, #f5be53, #c8962e)", color: "#412d00" }
                      : { background: "rgba(245,190,83,0.1)", border: "1px solid rgba(245,190,83,0.3)", color: "#f5be53" }
                  }
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Insights */}
      <section className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white">Sharjah Industry Use Cases</h2>
            <p className="text-[#d3c5b0] mt-3">How different Sharjah sectors benefit from copier rental</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {industryInsights.map((ins, i) => (
              <div key={i} className="glass-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{ins.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{ins.sector}</h3>
                    <p className="text-[#f5be53] text-sm">{ins.zone}</p>
                  </div>
                </div>
                <p className="text-[#d3c5b0] text-sm mb-3">
                  <strong className="text-white">Challenge:</strong> {ins.challenge}
                </p>
                <p className="text-[#d3c5b0] text-sm mb-4">
                  <strong className="text-white">Solution:</strong> {ins.solution}
                </p>
                <div className="bg-[#f5be53]/10 rounded-xl px-4 py-2 inline-block">
                  <span className="text-[#f5be53] text-sm font-bold">{ins.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Areas We Serve in Sharjah</h2>
          <p className="text-[#d3c5b0] mb-8">
            60-minute emergency response across all Sharjah districts. Same-day delivery for new rentals.
          </p>
          {/* The local-base advantage is the one thing no Dubai-headquartered
              competitor can claim, and it is why Sharjah queries outrank their
              Dubai equivalents by 15-30 positions. Stated explicitly. */}
          <p className="text-[#d3c5b0] mb-8 text-sm leading-relaxed max-w-3xl mx-auto">
            Our workshop and parts inventory are in <strong className="text-white">Sharjah Industrial Area 11</strong>,
            not a Dubai head office serving Sharjah as an afterthought. For businesses in the Industrial Areas, SAIF
            Zone and Hamriyah Free Zone that usually means an engineer on site within the hour and the part already on
            the van — rather than a next-day slot and a parts order. It is also why we can swap a failed machine the
            same day instead of leaving a floor without a copier.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {sharjahAreas.map((area, i) => (
              <span
                key={i}
                className="bg-[#2a3548] border border-[#f5be53]/20 px-4 py-2 rounded-full text-[#d3c5b0] text-sm hover:border-[#f5be53]/50 transition-colors"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sahara for Sharjah */}
      <section className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white">Why Choose Sahara in Sharjah?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Zero Deposit", desc: "No upfront security deposit — pay only first month's rental to start." },
              { title: "60-Min Response", desc: "Dedicated Sharjah-based technicians dispatched within minutes of your call." },
              { title: "Free OEM Toner", desc: "Genuine Canon/Kyocera toner proactively delivered before you run out." },
              { title: "Network Setup Included", desc: "Full LAN/Wi-Fi, scan-to-email, and user authentication — no extra charge." },
              { title: "Replacement Guarantee", desc: "If your copier can't be fixed same-day, we install a replacement unit." },
              { title: "SAIF Zone Billing", desc: "USD or AED invoicing with free zone documentation support." },
            ].map((b, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-[#f5be53]/20 flex items-center justify-center mb-4">
                  <span className="text-[#f5be53] text-xl">âœ"</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                <p className="text-[#d3c5b0] text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f5be53] to-[#c8962e] p-12 md:p-16 relative overflow-hidden text-center">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-[#412d00] mb-4">
              Need a Photocopier in Sharjah?
            </h2>
            <p className="text-[#483200] text-lg mb-8">
              Quote within 2 hours. Free site visit. Same-day setup available across Sharjah.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/rental-calculator/"
                className="bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform"
              >
                Get Free Quote
              </a>
              <a
                href="tel:+971503823969"
                className="bg-[#c8962e]/20 border border-[#483200]/30 text-[#412d00] px-10 py-5 rounded-full font-bold text-lg backdrop-blur-sm"
              >
                Call +971 50 382 3969
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white">Photocopier Rental Sharjah — FAQ</h2>
            <p className="text-[#d3c5b0] mt-3">12 questions answered by our Sharjah team</p>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="rounded-2xl p-6 group cursor-pointer"
                style={{
                  background: "linear-gradient(145deg, #0f1a2a 0%, #0a121c 100%)",
                  boxShadow: "6px 6px 16px rgba(0,0,0,0.4), -3px -3px 10px rgba(255,255,255,0.03)",
                }}
                open={i === 0}
              >
                <summary className="flex justify-between items-start gap-4 list-none font-bold text-base text-white">
                  <span>{f.q}</span>
                  <span className="text-[#f5be53] shrink-0 mt-1 group-open:rotate-180 transition-transform text-lg leading-none">
                    â–¾
                  </span>
                </summary>
                <p className="mt-4 text-[#d3c5b0] leading-relaxed text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
    </>
  );
}
