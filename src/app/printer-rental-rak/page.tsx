import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

export const metadata: Metadata = {
  title: "Printer Rental Ras Al Khaimah | Photocopier Lease RAK – AED 250/mo | Sahara",
  description:
    "Printer and photocopier rental in Ras Al Khaimah (RAK) from AED 250/month. Zero deposit, free toner. Serving Al Hamra, RAK Free Trade Zone, Al Marjan Island. Canon & Kyocera.",
  keywords: [
    "Printer rental ras al khaimah",
    "photocopier rental rak",
    "copier lease rak",
    "rak free zone Printer rental",
    "al hamra Printer lease",
    "zero deposit Printer rak",
    "canon kyocera rental rak",
    "office equipment rental rak",
    "Printer rental northern emirates",
  ],
  alternates: { canonical: "https://saharaPrinter.com/Printer-rental-rak" },
  openGraph: {
    title: "Printer Rental RAK | AED 250/mo – Sahara Office Equipments",
    description:
      "Rent Canon or Kyocera Printers in Ras Al Khaimah from AED 250/month. Zero deposit, free toner. Al Hamra, RAK FTZ, Al Marjan Island.",
    url: "https://saharaPrinter.com/Printer-rental-rak",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Sahara Office Equipments – RAK Printer Rental",
  legalName: "Sahara Office Equipment Trading LLC",
  description:
    "Printer and photocopier rental in Ras Al Khaimah (RAK) from AED 250/month. Zero deposit, free OEM toner, on-site support.",
  url: "https://saharaPrinter.com/Printer-rental-rak",
  telePhoneIcon: "+971503823969",
  EmailIcon: "info@saharaPrinter.com",
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
      CloseIcons: "20:00",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does Printer rental cost in Ras Al Khaimah?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Printer rental in RAK StarIconts from AED 250/month for an A4 desktop model. A3 multifunction photocopiers range from AED 500–900/month. Enterprise devices StarIcont at AED 1,000/month. All RAK plans include zero deposit, free toner, free delivery, and on-site support.",
      },
    },
    {
      "@type": "Question",
      name: "What is your response time in Ras Al Khaimah?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide next-business-day service visits for RAK clients. Emergency breakdown response is within 4–6 hours across Ras Al Khaimah City, Al Hamra, RAK Free Trade Zone, and Al Marjan Island. If we cannot repair same-day, a replacement unit is delivered.",
      },
    },
    {
      "@type": "Question",
      name: "Do you serve RAK Free Trade Zone businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. RAK FTZ is a key service area. We handle all free zone documentation for equipment lease agreements, and can invoice in USD or AED as required by RAK FTZ companies.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a deposit for Printer rental in RAK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No deposit. All RAK Printer rental plans are zero-deposit — pay only your first month's rental to StarIcont. This makes it easy for new RAK Free Zone setups and growing businesses.",
      },
    },
    {
      "@type": "Question",
      name: "Which brands do you rent in Ras Al Khaimah?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We rent Canon imageRUNNER ADVANCE, Kyocera TASKalfa, HP LaserJet Enterprise, and Xerox WorkCentre in RAK. Canon and Kyocera are the most popular choices for RAK's manufacturing and hospitality sectors.",
      },
    },
    {
      "@type": "Question",
      name: "Is toner included in the RAK rental plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All RAK plans include unlimited genuine Canon or Kyocera OEM toner. We monitor toner levels remotely and deliver proactively before you run out — no waiting, no Emergency orders.",
      },
    },
    {
      "@type": "Question",
      name: "How long are your RAK rental contracts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Contracts are available for 12, 24, or 36 months. Short-term 1–6 month rentals are available for events, construction site offices, and seasonal business spikes. Longer contracts attract lower monthly rates.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide network setup in Ras Al Khaimah?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Free network and Wi-Fi configuration is included with all RAK installations. Our technician connects the Printer to your network, sets up scan-to-EmailIcon, and configures mobile printing (AirPrint/Mopria) — all at no extra charge.",
      },
    },
    {
      "@type": "Question",
      name: "Can I Upgrade my Printer during the RAK contract?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can Upgrade to a higher-capacity model at any time during your RAK rental contract without penalty. This is common for RAK FTZ businesses that grow from 1 to multiple office locations.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer photocopier rental for events in RAK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Short-term event rental is available for trade shows, exhibitions, and construction site offices in RAK. Minimum 1 month. Delivery, setup, and collection all included.",
      },
    },
    {
      "@type": "Question",
      name: "Do you service Al Marjan Island and Al Hamra Village?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Al Marjan Island and Al Hamra Village (including the RAK hospitality and residential developments) are within our regular RAK service coverage. Hotels, resorts, and property management offices in these areas are active Sahara clients.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cost-per-page for rented Printers in RAK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Black-and-white A4 printing on our rented Canon/Kyocera devices in RAK costs approximately 1–2 fils per page. Desktop inkjet and consumer laser Printers cost 8–15 fils per page. For an office printing 3,000 pages/month, that saves AED 180–390/month.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://saharaPrinter.com" },
    { "@type": "ListItem", position: 2, name: "Printer Rental RAK", item: "https://saharaPrinter.com/Printer-rental-rak" },
  ],
};

const pricingTiers = [
  {
    name: "A4 Desktop",
    price: "AED 250–450",
    tag: null,
    ideal: "Small offices, reception, remote sites",
    features: [
      "Canon LBP / Kyocera ECOSYS",
      "Up to 45 ppm A4 mono",
      "Print, copy, scan",
      "Free genuine OEM toner",
      "On-site support included",
      "4–6hr Emergency response",
    ],
  },
  {
    name: "A3 Mid-Range",
    price: "AED 500–900",
    tag: "Most Popular",
    ideal: "Shared RAK offices & free zone companies",
    features: [
      "Canon iR ADVANCE / Kyocera TASKalfa",
      "35–55 ppm A3 & A4 mono",
      "Print, copy, scan, fax",
      "Colour option available",
      "Scan to EmailIcon / folder",
      "Free network setup",
      "Same-day replacement guarantee",
    ],
  },
  {
    name: "A3 Enterprise",
    price: "AED 1,000–2,000",
    tag: null,
    ideal: "Manufacturing, large hospitality",
    features: [
      "Canon imageRUNNER C5560i",
      "60–100 ppm A3 colour",
      "Staple, booklet finishers",
      "Secure Print, user auth",
      "50,000+ pages/month",
      "Dedicated account manager",
    ],
  },
];

const rakAreas = [
  "Ras Al Khaimah City", "Al Hamra", "Al Marjan Island", "RAK Free Trade Zone",
  "Al Jazeera", "Al Dhaith", "Khuzam", "Al Nakheel",
  "Al Dhait", "Dafan Al Khor",
];

export default function PrinterRentalRAK() {
  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav className="pt-28 pb-2 px-8 lg:px-24 max-w-7xl mx-auto" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-[#d3c5b0]">
          <li><a href="/" className="hover:text-[#f5be53] transition-colors">Home</a></li>
          <li className="text-[#f5be53]">/</li>
          <li className="text-white font-medium">Printer Rental Ras Al Khaimah</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative pt-8 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/location-rak.webp"
            alt="Ras Al Khaimah corporate office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#071325]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325]/80 via-[#071325]/60 to-[#101c2e]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-1 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">
                Ras Al Khaimah — Zero Deposit
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Printer Rental{" "}
                <span className="text-[#f5be53]">RAK</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-6 max-w-xl">
                Canon &amp; Kyocera Printer rental in Ras Al Khaimah from AED 250/month. Zero deposit, free toner,
                and on-site support across RAK Free Trade Zone, Al Hamra, and Al Marjan Island.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Zero Deposit", "Free Toner", "RAK FTZ Billing", "Free Network Setup", "Replacement Guarantee"].map(
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
              AI Answer — What is Printer Rental in Ras Al Khaimah?
            </p>
            <p className="text-white text-lg leading-relaxed">
              Printer rental in Ras Al Khaimah is a monthly service from{" "}
              <strong className="text-[#f5be53]">AED 250/month</strong> providing Canon or Kyocera Printers
              and photocopiers with toner, maintenance, and repairs included. Sahara Office Equipment Trading LLC
              serves RAK businesses including RAK Free Trade Zone, Al Hamra, and Al Marjan Island with{" "}
              <strong className="text-[#f5be53]">zero deposit</strong> plans and 4–6hr Emergency response.
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
              { number: "1,500", suffix: "+", label: "UAE Clients" },
              { number: "13", suffix: "+", label: "Years in UAE" },
              { number: "AED 250", suffix: "/mo", label: "Starting Price" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-[#f5be53]">
                  {s.number}<span className="text-xl">{s.suffix}</span>
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
            Why RAK Businesses Choose Printer Rental Over Buying
          </h2>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Ras Al Khaimah's diverse economy — from manufacturing and ceramics in the industrial zones to luxury
            hospitality at Al Hamra and Al Marjan Island — creates varied printing requirements. RAK Free Trade
            Zone alone hosts over 14,000 registered companies, many of which need document infrastructure from day
            one of operations.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Printer rental in RAK from Sahara provides RAK FTZ companies with immediate access to Canon and
            Kyocera equipment, no deposit, and USD or AED invoicing options — eliminating the administrative
            friction of sourcing equipment when setting up a new RAK free zone office. Setup within 24 hours of
            order, including full network configuration.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            For manufacturing businesses in RAK's industrial zones — producing ceramics, building materials, and
            pharmaceuticals — our enterprise copiers handle 50,000+ pages per month of production documentation
            without degradation. Backed by on-site support within 4–6 hours, downtime that stops documentation
            from flowing is avoided.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Cost-per-page on our rented devices is{" "}
            <strong className="text-white">1–2 fils per A4 page</strong> — compared to 8–15 fils for consumer
            desktop Printers. For a RAK office printing 3,000 pages/month, the saving in consumables alone
            offsets a large portion of the monthly rental fee.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white">RAK Rental Plans</h2>
            <p className="text-[#d3c5b0] mt-3 text-lg">Zero deposit · free toner · free delivery · on-site support</p>
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
                  {tier.price}<span className="text-sm font-normal text-[#d3c5b0]">/month</span>
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
                      : { background: "rgba(245,190,83,0.1)", border: "1px solid rgba(245,190,83,0.3)", color: "#f5be53" }
                  }
                >
                  Get Quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Areas We Serve in Ras Al Khaimah</h2>
          <p className="text-[#d3c5b0] mb-8">
            On-site support across all RAK districts. Emergency response within 4–6 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {rakAreas.map((area, i) => (
              <span
                key={i}
                className="bg-[#2a3548] border border-[#f5be53]/20 px-4 py-2 rounded-full text-[#d3c5b0] text-sm"
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#412d00] mb-4">Need a Printer in RAK?</h2>
            <p className="text-[#483200] text-lg mb-8">
              Quote within 2 hours. Free site visit. Setup within 24 hours across RAK.
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
            <h2 className="text-4xl font-bold text-white">Printer Rental RAK — FAQ</h2>
            <p className="text-[#d3c5b0] mt-3">12 questions answered</p>
          </div>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((f: any, i: number) => (
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
                  <span>{f.name}</span>
                  <span className="text-[#f5be53] shrink-0 mt-1 group-open:rotate-180 transition-transform text-lg leading-none">
                    ▾
                  </span>
                </summary>
                <p className="mt-4 text-[#d3c5b0] leading-relaxed text-sm">{f.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}

