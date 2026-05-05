import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "Printer Rental Abu Dhabi | Photocopier Lease UAE – AED 250/mo | Sahara",
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
  alternates: { canonical: "https://saharaprinter.com/printer-rental-abu-dhabi" },
  openGraph: {
    title: "Printer Rental Abu Dhabi | AED 250/mo – Sahara Office Equipments",
    description:
      "Rent Canon or Kyocera printers and copiers in Abu Dhabi from AED 250/month. Zero deposit, free toner, weekly maintenance. Mussafah, Khalifa City, Al Reem Island.",
    url: "https://saharaprinter.com/printer-rental-abu-dhabi",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Sahara Office Equipments – Abu Dhabi Printer Rental",
  legalName: "Sahara Office Equipment Trading LLC",
  description:
    "Printer and photocopier rental in Abu Dhabi from AED 250/month. Zero deposit, free OEM toner, weekly preventive maintenance, and emergency response.",
  url: "https://saharaprinter.com/printer-rental-abu-dhabi",
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
    { "@type": "ListItem", position: 1, name: "Home", item: "https://saharaprinter.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Printer Rental Abu Dhabi",
      item: "https://saharaprinter.com/printer-rental-abu-dhabi",
    },
  ],
};

const faqs = [
  {
    q: "How much does printer rental cost in Abu Dhabi?",
    a: "Printer rental in Abu Dhabi starts from AED 250/month for an A4 desktop model. A3 multifunction photocopiers for shared offices range from AED 500–900/month. High-volume enterprise devices start at AED 1,000/month. All plans include zero deposit, free OEM toner, free delivery, and weekly preventive maintenance.",
  },
  {
    q: "What is the response time for Abu Dhabi printer repair?",
    a: "We schedule weekly preventive maintenance visits for all Abu Dhabi rental units. For emergency breakdowns, we dispatch a technician within 4–6 hours to anywhere in Abu Dhabi — including Mussafah, Khalifa City, Al Reem Island, and Yas Island. Same-day replacement units are available if the repair takes longer.",
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
    a: "Contracts are offered for 12, 24, or 36 months. Shorter rentals from 1–6 months are available for project offices, exhibitions at ADNEC, and seasonal setups. Longer contracts have lower monthly rates. All contracts include upgrade rights.",
  },
  {
    q: "What happens if my printer breaks down in Abu Dhabi?",
    a: "Call +971 50 382 3969 and we dispatch a technician within 4–6 hours. If we cannot repair it same day, we deliver a replacement unit at no extra charge. You are never left without a working printer under our Abu Dhabi rental agreement.",
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
    a: "Black-and-white A4 printing on our rented Kyocera and Canon devices costs approximately 1–2 fils per page in Abu Dhabi — vs 8–15 fils for desktop inkjet or consumer laser printers. For an office printing 5,000 pages/month, that is a saving of AED 300–650/month in consumables alone.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const pricingTiers = [
  {
    name: "A4 Desktop",
    price: "AED 250–450",
    tag: null,
    ideal: "Small offices, reception desks, individual use",
    features: [
      "Canon LBP / Kyocera ECOSYS",
      "Up to 45 ppm A4 mono",
      "Print, copy, scan",
      "Free genuine OEM toner",
      "Weekly preventive maintenance",
      "Emergency 4–6hr response",
    ],
    cta: "Get Quote",
  },
  {
    name: "A3 Mid-Range",
    price: "AED 500–900",
    tag: "Most Popular",
    ideal: "Shared offices, Mussafah businesses",
    features: [
      "Canon iR ADVANCE / Kyocera TASKalfa",
      "35–55 ppm A3 & A4 mono",
      "Print, copy, scan, fax",
      "Colour option available",
      "Scan to email / folder / cloud",
      "Free network & Wi-Fi setup",
      "Same-day replacement guarantee",
    ],
    cta: "Get Quote",
  },
  {
    name: "A3 Enterprise",
    price: "AED 1,000–2,000",
    tag: null,
    ideal: "Large organisations, government, ADGM",
    features: [
      "Canon imageRUNNER C5560i / Kyocera 5053ci",
      "60–100 ppm A3 colour",
      "Staple, booklet, hole-punch finishing",
      "Secure print, user authentication",
      "50,000+ page monthly capacity",
      "Dedicated account manager",
      "Multi-site billing available",
    ],
    cta: "Get Quote",
  },
];

const industryInsights = [
  {
    sector: "Oil & Gas / Government",
    zone: "ADNOC / ADGM",
    icon: "🛢️",
    challenge:
      "Large government and energy sector offices need high-volume, secure document handling with audit trails",
    solution:
      "Enterprise Canon copiers with secure print release, user authentication, and document tracking — compliant with government data policies.",
    stat: "50,000+ pages/month capacity",
  },
  {
    sector: "Real Estate & Construction",
    zone: "Yas Island / Al Reem",
    icon: "🏗️",
    challenge: "Real estate offices produce large volumes of A3 blueprints, contracts, and marketing material",
    solution:
      "A3 colour copiers with 55 ppm output handle design documents, contracts, and brochure printing with same-day setup.",
    stat: "A3 colour from AED 900/mo",
  },
  {
    sector: "Manufacturing & Logistics",
    zone: "Mussafah Industrial",
    icon: "🏭",
    challenge:
      "Industrial businesses in Mussafah need reliable documentation equipment with quick breakdown recovery",
    solution:
      "Weekly preventive maintenance with 4–6hr emergency response ensures production documentation never stops.",
    stat: "4–6hr emergency response",
  },
  {
    sector: "Hospitality & Tourism",
    zone: "Saadiyat / Yas Island",
    icon: "🏨",
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

export default function PrinterRentalAbuDhabi() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <main className="min-h-screen bg-[#071325]">
      <Header />

      {/* Breadcrumb */}
      <nav className="pt-28 pb-2 px-8 lg:px-24 max-w-7xl mx-auto" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-[#d3c5b0]">
          <li><a href="/" className="hover:text-[#f5be53] transition-colors">Home</a></li>
          <li className="text-[#f5be53]">/</li>
          <li className="text-white font-medium">Printer Rental Abu Dhabi</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative pt-8 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/location-abu-dhabi.webp"
            alt="Abu Dhabi corporate office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#071325]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325]/80 via-[#071325]/60 to-[#101c2e]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-1 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">
                Abu Dhabi — Weekly Maintenance
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Printer Rental{" "}
                <span className="text-[#f5be53]">Abu Dhabi</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-6 max-w-xl">
                Canon &amp; Kyocera printer and photocopier rental from AED 250/month. Zero deposit, free OEM
                toner, and weekly preventive maintenance across all Abu Dhabi areas.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Zero Deposit", "Free OEM Toner", "Weekly Service", "4–6hr Emergency", "Free Network Setup"].map(
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
                  href="/get-quote"
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

      {/* AEO Block */}
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
              AI Answer — What is Printer Rental in Abu Dhabi?
            </p>
            <p className="text-white text-lg leading-relaxed">
              Printer rental in Abu Dhabi is a monthly subscription from{" "}
              <strong className="text-[#f5be53]">AED 250/month</strong> where businesses use Canon or Kyocera
              printers and photocopiers — with toner, maintenance, and repairs included. Sahara Office Equipment
              Trading LLC, founded in 2012, serves Abu Dhabi businesses with{" "}
              <strong className="text-[#f5be53]">weekly preventive maintenance</strong>, 4–6hr emergency response,
              and zero deposit plans across Mussafah, Al Reem Island, Khalifa City, and ADGM.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl py-8 px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "4–6", suffix: " hrs", label: "Emergency Response" },
              { number: "1,500", suffix: "+", label: "UAE Clients Served" },
              { number: "13", suffix: "+", label: "Years in UAE" },
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
            Printer Rental in Abu Dhabi — Why Businesses Choose Leasing Over Buying
          </h2>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Abu Dhabi's business environment — spanning government entities, oil and gas firms, real estate
            developers, and a growing SME sector — demands reliable document infrastructure. Purchasing a commercial
            printer or photocopier outright costs AED 8,000 to AED 45,000, and that's before toner, maintenance
            parts, and the cost of downtime when equipment fails.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Sahara's printer rental in Abu Dhabi converts those unpredictable capital and operating expenses into a
            single fixed monthly payment. Our plans cover the machine, all genuine Canon or Kyocera toner, weekly
            preventive maintenance, unlimited repairs, and emergency support within 4–6 hours. For Abu Dhabi
            businesses in ADGM (Al Maryah Island), this means predictable IT spend that aligns with free zone
            financial reporting requirements.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Mussafah Industrial Area clients benefit from our on-site technical knowledge of industrial
            environments — dusty conditions, extended operating hours, and multi-shift demands. We configure
            enterprise-grade Canon and Kyocera devices to handle 50,000+ pages/month without degradation, backed
            by weekly preventive maintenance that catches issues before they cause downtime.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            For Abu Dhabi businesses printing more than 2,000 pages per month, our rental copiers deliver
            black-and-white output at approximately{" "}
            <strong className="text-white">1–2 fils per A4 page</strong> — compared to 8–15 fils for consumer
            cartridge printers. At 5,000 pages/month, that difference saves AED 300–650/month in consumables alone,
            making the rental effectively self-funding.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white">Abu Dhabi Rental Plans</h2>
            <p className="text-[#d3c5b0] mt-3 text-lg">
              All plans: zero deposit · free toner · free delivery · weekly maintenance
            </p>
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
                <p className="text-[#f5be53] text-2xl font-bold mb-1">
                  {tier.price}
                  <span className="text-sm font-normal text-[#d3c5b0]">/month</span>
                </p>
                <p className="text-[#d3c5b0] text-sm mb-6 italic">{tier.ideal}</p>
                <ul className="space-y-2 flex-1">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-[#d3c5b0]">
                      <span className="text-[#f5be53] mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/get-quote"
                  className="mt-8 block text-center py-3 rounded-full font-bold text-sm transition-all"
                  style={
                    tier.tag
                      ? { background: "linear-gradient(to right, #f5be53, #c8962e)", color: "#412d00" }
                      : {
                          background: "rgba(245,190,83,0.1)",
                          border: "1px solid rgba(245,190,83,0.3)",
                          color: "#f5be53",
                        }
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
            <h2 className="text-4xl font-bold text-white">Abu Dhabi Industry Use Cases</h2>
            <p className="text-[#d3c5b0] mt-3">How different Abu Dhabi sectors use printer rental</p>
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

      {/* Areas */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Areas We Serve in Abu Dhabi</h2>
          <p className="text-[#d3c5b0] mb-8">
            Weekly scheduled maintenance visits. Emergency response within 4–6 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {abuDhabiAreas.map((area, i) => (
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

      {/* CTA */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f5be53] to-[#c8962e] p-12 md:p-16 relative overflow-hidden text-center">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-[#412d00] mb-4">Need a Printer in Abu Dhabi?</h2>
            <p className="text-[#483200] text-lg mb-8">
              Quote within 2 hours. Free site visit. Same-week delivery across Abu Dhabi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/get-quote"
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
            <h2 className="text-4xl font-bold text-white">Printer Rental Abu Dhabi — FAQ</h2>
            <p className="text-[#d3c5b0] mt-3">12 questions answered by our team</p>
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
                    ▾
                  </span>
                </summary>
                <p className="mt-4 text-[#d3c5b0] leading-relaxed text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Services — Internal Cross-Links ── */}
      <section className="py-12 px-8 lg:px-24 bg-[#050d1a]">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 text-center">Related Services</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/services/printer-rental", label: "Printer Rental UAE" },
              { href: "/services/photocopier-rental", label: "Photocopier Rental" },
              { href: "/services/amc", label: "Annual Maintenance (AMC)" },
              { href: "/services/repair", label: "Printer Repair" },
              { href: "/services/toner", label: "Toner & Spare Parts" },
              { href: "/hp-printer-abu-dhabi", label: "HP Printer Abu Dhabi" },
              { href: "/brands/canon", label: "Canon Printers" },
              { href: "/brands/kyocera", label: "Kyocera Printers" },
              { href: "/copier-lease-uae", label: "Copier Lease UAE" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full border border-[#f5be53]/20 text-slate-400 text-xs hover:text-white hover:border-[#f5be53]/40 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other UAE Locations ── */}
      <section className="py-12 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 text-center">Printer Rental in Other Emirates</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/printer-rental-dubai", label: "Printer Rental Dubai", desc: "Same-day delivery. Business Bay, DIFC, JLT, Marina & all Dubai areas." },
              { href: "/photocopier-rental-sharjah", label: "Photocopier Rental Sharjah", desc: "Our HQ. Fastest service in Sharjah & Northern Emirates." },
              { href: "/printer-rental-al-ain", label: "Printer Rental Al Ain", desc: "Serving Al Ain businesses, universities & clinics." },
              { href: "/copier-lease-uae", label: "Copier Lease UAE", desc: "Nationwide fleet leasing with one contract & invoice." },
            ].map((loc) => (
              <Link
                key={loc.href}
                href={loc.href}
                className="group rounded-2xl p-5 border border-white/6 bg-[#0d1b2e] hover:-translate-y-0.5 transition-all duration-300"
              >
                <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-[#f5be53] transition-colors">{loc.label}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{loc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── From Our Blog ── */}
      <section className="py-16 px-8 lg:px-24 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">Resource Hub</p>
              <h2 className="text-2xl font-bold text-white">Abu Dhabi Printer Rental Guides</h2>
            </div>
            <Link href="/blogs" className="text-[#f5be53] text-sm hover:underline hidden sm:block">View All →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
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
            ].map((post) => (
              <Link key={post.slug} href={`/blogs/${post.slug}`} className="group">
                <div className="rounded-2xl border border-white/8 bg-[#0d1b2e] overflow-hidden hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
                  <img src={post.img} alt={post.title} className="w-full h-32 object-cover" loading="lazy" />
                  <div className="p-4 flex flex-col flex-1">
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-[#142032] border border-[#f5be53]/20 text-[#f5be53] text-[10px] font-medium mb-2 self-start">
                      {post.category}
                    </span>
                    <h4 className="text-white text-xs font-semibold leading-snug group-hover:text-[#f5be53] transition-colors flex-1 line-clamp-3">
                      {post.title}
                    </h4>
                    <span className="text-[#f5be53] text-xs mt-3 flex items-center gap-1">
                      Read
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
      <MobileNav />
    </main>
    </>
  );
}
