export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

export const metadata: Metadata = {
  title: "Printer Rental Al Ain | Photocopier Lease UAE â€“ AED 250/mo | Sahara",
  description:
    "Printer and photocopier rental in Al Ain from AED 250/month. Zero deposit, free toner. Serving Al Ain Central, Al Jimi, Al Khubaisi, Al Ain Industrial Area. Canon & Kyocera.",
  keywords: [
    "printer rental al ain",
    "photocopier rental al ain",
    "copier lease al ain",
    "al ain industrial area printer",
    "zero deposit printer al ain",
    "canon kyocera rental al ain",
    "office equipment rental al ain",
    "printer lease abu dhabi",
    "photocopier hire al ain",
  ],
  alternates: { canonical: "https://www.saharaprinter.com/printer-rental-al-ain/" },
  openGraph: {
    title: "Printer Rental Al Ain | AED 250/mo â€“ Sahara Office Equipments",
    description:
      "Rent Canon or Kyocera printers in Al Ain from AED 250/month. Zero deposit, free toner. Central District, Al Jimi, Industrial Area.",
    url: "https://www.saharaprinter.com/printer-rental-al-ain/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Sahara Office Equipments â€“ Al Ain Printer Rental",
  legalName: "Sahara Office Equipment Trading LLC",
  description:
    "Printer and photocopier rental in Al Ain from AED 250/month. Zero deposit, free OEM toner, and on-site support across Al Ain's business districts and industrial zones.",
  url: "https://saharaprinter.com/printer-rental-al-ain",
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
    latitude: 24.2075,
    longitude: 55.7447,
  },
  areaServed: [
    { "@type": "City", name: "Al Ain" },
    { "@type": "Place", name: "Al Ain Industrial Area" },
    { "@type": "Place", name: "Al Jimi" },
    { "@type": "Place", name: "Al Khubaisi" },
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
    name: "Al Ain Printer Rental Plans",
    itemListElement: [
      { "@type": "Offer", name: "A4 Printer Rental Al Ain", price: "250", priceCurrency: "AED" },
      { "@type": "Offer", name: "A3 Copier Rental Al Ain", price: "500", priceCurrency: "AED" },
      { "@type": "Offer", name: "Enterprise Copier Al Ain", price: "1000", priceCurrency: "AED" },
    ],
  },
  priceRange: "AED 250-2000",
};

const faqsData = [
  {
    q: "How much does printer rental cost in Al Ain?",
    a: "Printer rental in Al Ain starts from AED 250/month for an A4 desktop model. A3 multifunction photocopiers range from AED 500â€“900/month. Enterprise high-volume devices start at AED 1,000/month. All Al Ain plans include zero deposit, free OEM toner, free delivery, and on-site support.",
  },
  {
    q: "What is the response time for printer support in Al Ain?",
    a: "We schedule weekly preventive maintenance visits for Al Ain rental clients. For emergency breakdowns, a technician is dispatched within 4â€“6 hours to Al Ain Central, Al Jimi, Al Khubaisi, Al Murabba, and the Al Ain Industrial Area. Same-day replacement units are available if repair is not immediate.",
  },
  {
    q: "Do I need a deposit for printer rental in Al Ain?",
    a: "No deposit required. All Al Ain printer rental plans are zero-deposit. You only pay the first month's rental to start â€” suitable for educational institutions, healthcare facilities, and SMEs in Al Ain's growing business districts.",
  },
  {
    q: "Which printer brands do you rent in Al Ain?",
    a: "We rent Canon imageRUNNER ADVANCE, Kyocera TASKalfa, HP LaserJet Enterprise, and Xerox WorkCentre in Al Ain. Canon and Kyocera are the most popular choices for Al Ain's healthcare, education, and government sectors.",
  },
  {
    q: "Is toner included in the Al Ain rental plan?",
    a: "Yes. All Al Ain plans include unlimited genuine Canon or Kyocera OEM toner at no extra charge. Toner levels are monitored remotely and replacements are delivered proactively â€” before your device runs low.",
  },
  {
    q: "Do you serve Al Ain University area and educational institutions?",
    a: "Yes. Al Ain University, UAE University, HCT Al Ain, and other educational institutions are within our service coverage. We provide high-volume enterprise copiers with user quota management and cost-per-department reporting suitable for campus environments.",
  },
  {
    q: "How long are your Al Ain rental contracts?",
    a: "Contracts are available for 12, 24, or 36 months. Short-term 1â€“6 month rentals are available for temporary project offices, events at Al Ain City Centre, and seasonal needs. Longer contracts attract lower monthly rates.",
  },
  {
    q: "What happens if my printer breaks down in Al Ain?",
    a: "Call +971 50 382 3969 and we dispatch a technician within 4â€“6 hours to anywhere in Al Ain. If we cannot repair it same-day, we deliver a replacement unit at no extra charge so your operations continue without interruption.",
  },
  {
    q: "Do you provide network setup for printers in Al Ain?",
    a: "Yes. Free network and Wi-Fi configuration is included with every Al Ain installation. Our technician connects to your office network, configures scan-to-email, sets up mobile printing (AirPrint/Mopria), and handles user authentication if required.",
  },
  {
    q: "Can I upgrade my printer during the Al Ain contract?",
    a: "Yes. You can upgrade to a higher-capacity or colour model at any point during your Al Ain contract without penalty. This is common for Al Ain government offices and healthcare facilities that expand their document volumes.",
  },
  {
    q: "Do you serve the Al Ain Industrial Area?",
    a: "Yes. Al Ain Industrial Area is within our regular service coverage. Manufacturing, food processing, and construction businesses in the industrial zone use our enterprise copiers for production documentation, with weekly preventive maintenance included.",
  },
  {
    q: "What is cost-per-page (CPP) for rented printers in Al Ain?",
    a: "Black-and-white A4 printing on our rented Canon/Kyocera devices costs approximately 1â€“2 fils per page. Consumer desktop printers cost 8â€“15 fils per page. For an office printing 4,000 pages/month, the saving in consumables is AED 240â€“520/month â€” making the rental cost-neutral or better.",
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
    { "@type": "ListItem", position: 1, name: "Home", item: "https://saharaprinter.com" },
    { "@type": "ListItem", position: 2, name: "Printer Rental Al Ain", item: "https://saharaprinter.com/printer-rental-al-ain" },
  ],
};

const pricingTiers = [
  {
    name: "A4 Desktop",
    price: "AED 250â€“450",
    tag: null,
    ideal: "Clinics, small offices, reception",
    features: [
      "Canon LBP / Kyocera ECOSYS",
      "Up to 45 ppm A4 mono",
      "Print, copy, scan",
      "Free genuine OEM toner",
      "Weekly preventive maintenance",
      "4â€“6hr emergency response",
    ],
  },
  {
    name: "A3 Mid-Range",
    price: "AED 500â€“900",
    tag: "Most Popular",
    ideal: "Shared offices, education, healthcare",
    features: [
      "Canon iR ADVANCE / Kyocera TASKalfa",
      "35â€“55 ppm A3 & A4 mono",
      "Print, copy, scan, fax",
      "Colour option available",
      "Scan to email / folder / cloud",
      "Free network setup",
      "Same-day replacement guarantee",
    ],
  },
  {
    name: "A3 Enterprise",
    price: "AED 1,000â€“2,000",
    tag: null,
    ideal: "Government, hospitals, university",
    features: [
      "Canon imageRUNNER C5560i",
      "60â€“100 ppm A3 colour",
      "Staple, booklet finishers",
      "User quota & cost tracking",
      "50,000+ pages/month capacity",
      "Dedicated account manager",
    ],
  },
];

const alAinAreas = [
  "Central District", "Al Jimi", "Al Khubaisi", "Al Murabba",
  "Al Ain Industrial Area", "Al Dhahir", "Al Hili", "Al Ain Oasis Area",
  "Al Ain University Area", "Al Sarooj", "Al Towayya", "Zakher",
];

const industryInsights = [
  {
    sector: "Healthcare & Medical",
    zone: "Al Ain Hospital / Oasis Hospital",
    icon: "ðŸ¥",
    challenge: "Hospitals and clinics need reliable, high-volume printing for patient records, prescriptions, and reports",
    solution: "Enterprise Canon copiers with user authentication, secure print release, and 50,000+ monthly page capacity for healthcare environments.",
    stat: "HIPAA-compliant secure print",
  },
  {
    sector: "Education",
    zone: "UAE University / Al Ain HCT",
    icon: "ðŸŽ“",
    challenge: "Universities need cost-controlled, high-volume printing across multiple departments with usage tracking",
    solution: "User quota management, department-level cost reporting, and enterprise copiers with 60+ ppm for high-demand campus printing.",
    stat: "Per-user quota management",
  },
  {
    sector: "Government & Municipality",
    zone: "Al Ain Municipality",
    icon: "ðŸ›ï¸",
    challenge: "Government offices need reliable documentation equipment with audit trails and multi-user access control",
    solution: "Canon imageRUNNER ADVANCE with PIN-based secure print, user authentication, and full activity logging for compliance.",
    stat: "Full audit trail logging",
  },
  {
    sector: "Manufacturing & Industrial",
    zone: "Al Ain Industrial Area",
    icon: "ðŸ­",
    challenge: "Industrial businesses need documentation equipment that handles dusty environments and extended operating hours",
    solution: "Kyocera TASKalfa workgroup copiers â€” built for industrial durability, with weekly preventive maintenance to prevent breakdowns.",
    stat: "Weekly preventive visits",
  },
];

export default function PrinterRentalAlAin() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    <main className="min-h-screen bg-[#071325]">
      <Header />

      {/* Breadcrumb */}
      <nav className="pt-28 pb-2 px-8 lg:px-24 max-w-7xl mx-auto" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-[#d3c5b0]">
          <li><a href="/" className="hover:text-[#f5be53] transition-colors">Home</a></li>
          <li className="text-[#f5be53]">/</li>
          <li className="text-white font-medium">Printer Rental Al Ain</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative pt-8 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/location-al-ain.webp"
            alt="Al Ain corporate office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#071325]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325]/80 via-[#071325]/60 to-[#101c2e]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-1 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">
                Al Ain â€” The Garden City
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Printer Rental{" "}
                <span className="text-[#f5be53]">Al Ain</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-6 max-w-xl">
                Canon &amp; Kyocera printer and photocopier rental in Al Ain from AED 250/month. Zero deposit,
                free toner, and weekly maintenance for healthcare, education, government, and industry.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Zero Deposit", "Free OEM Toner", "Weekly Service", "User Quota Control", "Free Network Setup"].map(
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
              AI Answer â€” What is Printer Rental in Al Ain?
            </p>
            <p className="text-white text-lg leading-relaxed">
              Printer rental in Al Ain is a monthly subscription from{" "}
              <strong className="text-[#f5be53]">AED 250/month</strong> providing Canon or Kyocera printers
              with toner, maintenance, and repairs included. Sahara Office Equipment Trading LLC has served UAE
              businesses since 2012, offering Al Ain clients{" "}
              <strong className="text-[#f5be53]">zero deposit</strong>, weekly preventive maintenance, and
              4â€“6hr emergency response across all Al Ain districts including the Industrial Area and university zone.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl py-8 px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "4â€“6", suffix: " hrs", label: "Emergency Response" },
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
            Printer Rental in Al Ain â€” Serving Education, Healthcare &amp; Industry
          </h2>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Al Ain â€” the UAE's Garden City â€” is home to UAE University, Al Ain University, Tawam Hospital, Al Ain
            Hospital, and a significant government and municipal sector. These institutions share a common need:
            reliable, high-volume document output with cost control and accountability.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Sahara's printer rental in Al Ain provides healthcare facilities with Canon imageRUNNER enterprise
            copiers equipped with secure print release and user authentication â€” ensuring patient document
            confidentiality while reducing paper waste. For universities, our user quota management systems
            track printing by department, enabling cost allocation to individual faculties.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            Al Ain's Industrial Area â€” home to food processing, building materials, and manufacturing â€” has
            different demands: durability, high monthly page volumes, and minimal downtime. Kyocera TASKalfa
            devices are built for these environments, and our weekly preventive maintenance visits catch
            issues before they cause production documentation outages.
          </p>
          <p className="text-[#d3c5b0] text-lg leading-relaxed">
            For an Al Ain healthcare clinic printing 4,000 pages/month, our rental devices deliver
            A4 black-and-white output at{" "}
            <strong className="text-white">1â€“2 fils per page</strong> versus 8â€“15 fils for consumer alternatives.
            That saving of AED 240â€“520/month in consumables alone offsets a significant portion of the rental fee.
          </p>
        </div>
      </section>

      {/* Industry Insights */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white">Al Ain Industry Use Cases</h2>
            <p className="text-[#d3c5b0] mt-3">How Al Ain's key sectors use printer rental</p>
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

      {/* Pricing */}
      <section className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white">Al Ain Rental Plans</h2>
            <p className="text-[#d3c5b0] mt-3 text-lg">Zero deposit Â· free toner Â· free delivery Â· weekly maintenance</p>
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
                      <span className="text-[#f5be53] mt-0.5 shrink-0">âœ“</span>
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
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Areas We Serve in Al Ain</h2>
          <p className="text-[#d3c5b0] mb-8">
            Weekly scheduled maintenance. Emergency response within 4â€“6 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {alAinAreas.map((area, i) => (
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#412d00] mb-4">Need a Printer in Al Ain?</h2>
            <p className="text-[#483200] text-lg mb-8">
              Quote in 2 hours. Free site visit. Same-week setup across Al Ain.
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
            <h2 className="text-4xl font-bold text-white">Printer Rental Al Ain â€” FAQ</h2>
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
