import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

export const metadata: Metadata = {
  title: "Printer Rental Fujairah | Photocopier Lease UAE – AED 250/mo | Sahara",
  description:
    "Printer and photocopier rental in Fujairah from AED 250/month. Zero deposit, free toner. Serving Fujairah City, Dibba, Kalba, Fujairah Free Trade Zone. Canon & Kyocera.",
  keywords: [
    "Printer rental fujairah",
    "photocopier rental fujairah",
    "copier lease fujairah",
    "fujairah free zone Printer rental",
    "dibba copier rental",
    "zero deposit Printer fujairah",
    "canon kyocera rental fujairah",
    "office equipment rental fujairah",
    "Printer lease Eastern emirates",
  ],
  alternates: { canonical: "https://saharaPrinter.com/Printer-rental-fujairah" },
  openGraph: {
    title: "Printer Rental Fujairah | AED 250/mo – Sahara Office Equipments",
    description:
      "Rent Canon or Kyocera Printers in Fujairah from AED 250/month. Zero deposit, free toner. Fujairah City, Dibba, Kalba, Free Trade Zone.",
    url: "https://saharaPrinter.com/Printer-rental-fujairah",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Sahara Office Equipments – Fujairah Printer Rental",
  legalName: "Sahara Office Equipment Trading LLC",
  description:
    "Printer and photocopier rental in Fujairah from AED 250/month. Zero deposit, free OEM toner, and on-site support across Fujairah City, Dibba, Kalba, and Free Trade Zone.",
  url: "https://saharaPrinter.com/Printer-rental-fujairah",
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
    latitude: 25.1288,
    longitude: 56.3265,
  },
  areaServed: [
    { "@type": "City", name: "Fujairah" },
    { "@type": "Place", name: "Fujairah Free Trade Zone" },
    { "@type": "Place", name: "Dibba Al Fujairah" },
    { "@type": "Place", name: "Kalba" },
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
    name: "Fujairah Printer Rental Plans",
    itemListElement: [
      { "@type": "Offer", name: "A4 Printer Rental Fujairah", price: "250", priceCurrency: "AED" },
      { "@type": "Offer", name: "A3 Copier Rental Fujairah", price: "500", priceCurrency: "AED" },
      { "@type": "Offer", name: "Enterprise Copier Fujairah", price: "1000", priceCurrency: "AED" },
    ],
  },
  priceRange: "AED 250-2000",
};

const faqsData = [
  {
    q: "How much does Printer rental cost in Fujairah?",
    a: "Printer rental in Fujairah StarIconts from AED 250/month for an A4 desktop model. A3 multifunction photocopiers range from AED 500–900/month. Enterprise high-volume devices StarIcont at AED 1,000/month. All Fujairah plans include zero deposit, free toner, free delivery, and on-site support.",
  },
  {
    q: "What is your response time for Fujairah clients?",
    a: "We provide weekly Scheduled service visits for Fujairah rental clients. For Emergency breakdowns, we dispatch a technician within 4–6 hours to Fujairah City, Dibba, Kalba, and the Fujairah Free Trade Zone. If same-day repair is not possible, a replacement unit is delivered.",
  },
  {
    q: "Do you serve the Fujairah Free Trade Zone?",
    a: "Yes. Fujairah Free Trade Zone (FFTZ) clients are served with the same zero-deposit, free-toner plans. We handle free zone documentation for equipment leases and can invoice in USD or AED as preferred.",
  },
  {
    q: "Is there a deposit for Printer rental in Fujairah?",
    a: "No deposit required. All Fujairah Printer rental plans are zero-deposit. You only pay your first month to StarIcont — ideal for new businesses in Fujairah's growing industrial and free zone sectors.",
  },
  {
    q: "Which brands do you rent in Fujairah?",
    a: "We rent Canon imageRUNNER ADVANCE, Kyocera TASKalfa, HP LaserJet Enterprise, and Xerox WorkCentre in Fujairah. Canon and Kyocera are the most popular for Fujairah Port area businesses and oil storage companies.",
  },
  {
    q: "Is toner included in the Fujairah rental plan?",
    a: "Yes. All Fujairah plans include unlimited genuine Canon or Kyocera OEM toner at no extra charge. We monitor toner remotely and deliver replacements proactively — no Emergency orders needed.",
  },
  {
    q: "Do you serve Dibba and Kalba?",
    a: "Yes. Dibba Al Fujairah and Kalba are within our regular Fujairah service coverage. These East Coast areas receive weekly Scheduled maintenance and are included in our Emergency response coverage.",
  },
  {
    q: "How long are your Fujairah rental contracts?",
    a: "Contracts are available for 12, 24, or 36 months. Short-term 1–6 month rentals are available for construction site offices, temporary events, and seasonal businesses near Fujairah Port. Longer contracts attract lower monthly rates.",
  },
  {
    q: "Do you provide network setup in Fujairah?",
    a: "Yes. Free network and Wi-Fi configuration is included with every Fujairah installation. Our technician connects the Printer to your office network and sets up scan-to-EmailIcon, mobile printing, and user authentication — all included.",
  },
  {
    q: "Can I Upgrade my Printer during the Fujairah contract?",
    a: "Yes. Upgrade to a higher-capacity or colour model at any time during your Fujairah contract without penalty. Useful for growing businesses near Fujairah Port and the industrial zone.",
  },
  {
    q: "Do you offer short-term Printer rental in Fujairah for construction sites?",
    a: "Yes. Construction site offices and project-based businesses near Fujairah can rent Printers from 1 month upward. We deliver, install, and collect — making it suitable for time-limited projects. All equipment includes free toner.",
  },
  {
    q: "What is the cost-per-page for rented Printers in Fujairah?",
    a: "Black-and-white A4 printing on our rented Kyocera/Canon devices in Fujairah costs approximately 1–2 fils per page. Desktop consumer Printers cost 8–15 fils per page. For an office printing 3,000 pages/month, that saves AED 180–390/month in consumables.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqsData.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://saharaPrinter.com" },
    { "@type": "ListItem", position: 2, name: "Printer Rental Fujairah", item: "https://saharaPrinter.com/Printer-rental-fujairah" },
  ],
};

const pricingTiers = [
  {
    name: "A4 Desktop",
    price: "AED 250–450",
    tag: null,
    ideal: "Small offices, site offices, reception",
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
    ideal: "Shared offices & FFTZ companies",
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
    ideal: "Port logistics, large organisations",
    features: [
      "Canon imageRUNNER C5560i",
      "60–100 ppm A3 colour",
      "Staple, booklet finishers",
      "Secure Print, user auth",
      "50,000+ pages/month capacity",
      "Dedicated account manager",
    ],
  },
];

const fujairahAreas = [
  "Fujairah City", "Dibba Al Fujairah", "Kalba", "Fujairah Free Trade Zone",
  "Fujairah Port Area", "Al Faseel", "Al Gurfa", "Mirbah",
  "Khor Fakkan", "Al Bidya",
];

export default function PrinterRentalFujairah() {
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
          <li className="text-white font-medium">Printer Rental Fujairah</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative pt-8 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/location-fujairah.webp"
            alt="Fujairah corporate office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#071325]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325]/80 via-[#071325]/60 to-[#101c2e]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-1 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">
                Fujairah — Eastern Emirates
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Printer Rental{" "}
                <span className="text-[#f5be53]">Fujairah</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-6 max-w-xl">
                Canon &amp; Kyocera Printer and photocopier rental in Fujairah from AED 250/month. Zero deposit,
                free toner, and on-site support across Fujairah City, Dibba, Kalba, and FFTZ.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Zero Deposit", "Free Toner", "FFTZ Billing", "Free Network Setup", "Replacement Guarantee"].map(
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
              AI Answer — What is Printer Rental in Fujairah?
            </p>
            <p className="text-white text-lg leading-relaxed">
              Printer rental in Fujairah is a monthly service from{" "}
              <strong className="text-[#f5be53]">AED 250/month</strong> providing Canon or Kyocera Printers
              with toner, maintenance, and repairs included. Sahara Office Equipment Trading LLC has served UAE
              businesses since 2012 and covers Fujairah City, Dibba, Kalba, and FFTZ with{" "}
              <strong className="text-[#f5be53]">zero deposit</strong>, weekly maintenance visits, and free
              network setup.
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
            Printer Rental in Fujairah — Serving the East Coast
          </h2>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Fujairah's economy is centred around Fujairah Port — one of the world's largest bunkering HubIcons —
            along with oil storage, logistics, fishing, and a growing tourism sector in Dibba and Khor Fakkan.
            These industries generate significant documentation requirements: shipping manifests, logistics forms,
            compliance certificates, and administrative paperwork.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Sahara's Printer rental in Fujairah provides these businesses with reliable Canon and Kyocera equipment
            delivered and installed within 24–48 hours. The zero-deposit model is particularly valuable for new
            Fujairah Free Trade Zone setups and construction project offices that need documentation infrastructure
            immediately without capital commitment.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Dibba Al Fujairah and Kalba — on the East Coast — are included in our weekly Scheduled service
            coverage. Emergency response to these more remote locations is within 4–6 hours. For businesses in
            these areas that previously had no local service provider, Sahara fills an important gap.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Our rented devices deliver A4 black-and-white output at{" "}
            <strong className="text-white">1–2 fils per page</strong> — compared to 8–15 fils for desktop consumer
            Printers. For Fujairah logistics businesses printing shipping and port documentation daily, this
            difference is substantial over a 12-month contract.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white">Fujairah Rental Plans</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Areas We Serve in Fujairah</h2>
          <p className="text-[#d3c5b0] mb-8">
            Weekly Scheduled visits. Emergency response within 4–6 hours across the Emirate.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {fujairahAreas.map((area, i) => (
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#412d00] mb-4">Need a Printer in Fujairah?</h2>
            <p className="text-[#483200] text-lg mb-8">
              Quote in 2 hours. Free site visit. Setup within 24–48 hours.
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
            <h2 className="text-4xl font-bold text-white">Printer Rental Fujairah — FAQ</h2>
            <p className="text-[#d3c5b0] mt-3">12 questions answered</p>
          </div>
          <div className="space-y-4">
            {faqsData.map((f, i) => (
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

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}

