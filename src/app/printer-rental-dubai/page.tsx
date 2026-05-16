export const runtime = 'edge';
import type { Metadata } from "next";
import { getRequestContext } from "@cloudflare/next-on-pages";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";

interface FAQItem { q: string; a: string; }

async function getFaqsFromD1(): Promise<FAQItem[]> {
  try {
    const env = getRequestContext().env as any;
    if (!env?.DB) return DEFAULT_FAQS;
    const result = await env.DB.prepare(
      "SELECT question, answer FROM faqs WHERE pageSlug = ? AND isActive = 1 ORDER BY sortOrder ASC"
    ).bind("printer-rental-dubai").all();
    if (result?.results?.length > 0) {
      return result.results.map((r: any) => ({ q: r.question, a: r.answer }));
    }
    return DEFAULT_FAQS;
  } catch {
    return DEFAULT_FAQS;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const faqs = await getFaqsFromD1();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return {
  title: "Printer Rental Dubai | AED 250/mo | Zero Deposit | Sahara",
  description: "Dubai printer rental from AED 250/mo. Zero deposit, free toner & maintenance. 4-hr emergency response. Business Bay, JLT, DIFC, Marina, Deira & all areas. â˜Ž +971503823969",
  keywords: "printer rental dubai, photocopier rental dubai, copier lease dubai, printer rental business bay, printer rental DIFC, printer rental JLT, canon printer rental dubai, kyocera printer dubai, zero deposit printer rental dubai",
  openGraph: {
    title: "Printer Rental Dubai | Sahara Office Equipments",
    description: "Canon & Kyocera printer rental in Dubai from AED 250/month. Zero deposit, free toner, 4-hour response. Serving Business Bay, JLT, DIFC, Marina, Deira and all Dubai districts.",
    images: [{ url: "https://www.saharaprinter.com/images/heroPrntr1.webp", width: 1200, height: 630, alt: "Printer Rental Dubai" }],
    url: "https://www.saharaprinter.com/printer-rental-dubai",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
    alternates: { canonical: "https://www.saharaprinter.com/printer-rental-dubai/" },
    other: { "script:ld+json": JSON.stringify(faqSchema) },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "name": "Sahara Office Equipments — Dubai Printer Rental",
  "legalName": "Sahara Office Equipment Trading LLC",
  "description": "Printer rental and photocopier lease services in Dubai. Zero deposit, unlimited free toner, 4-hour emergency response. Serving Business Bay, JLT, DIFC, Deira, Marina and all Dubai districts. Plans from AED 250/month.",
  "url": "https://saharaprinter.com/printer-rental-dubai",
  "telephone": "+971503823969",
  "email": "info@saharaedoc.com",
  "image": "/images/heroPrntr1.webp",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressCountry": "AE"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 25.2048, "longitude": 55.2708 },
  "areaServed": {
    "@type": "City",
    "name": "Dubai",
    "sameAs": "https://www.wikidata.org/wiki/Q612"
  },
  "priceRange": "AED 250—2000",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"], "opens": "08:00", "closes": "20:00" }
  ],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "66", "bestRating": "5" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Dubai Printer Rental Plans",
    "itemListElement": [
      { "@type": "Offer", "name": "A4 Desktop Printer Rental Dubai", "price": "250", "priceCurrency": "AED" },
      { "@type": "Offer", "name": "A3 Multifunction Photocopier Rental Dubai", "price": "500", "priceCurrency": "AED" },
      { "@type": "Offer", "name": "Enterprise Copier Rental Dubai", "price": "1000", "priceCurrency": "AED" }
    ]
  }
};

const DEFAULT_FAQS: FAQItem[] = [
  { q: "How much does printer rental cost in Dubai?", a: "Printer rental in Dubai starts from AED 250/month for an A4 desktop printer. A3 multifunction photocopiers (print, copy, scan) start from AED 500/month. High-speed enterprise copiers for large offices range from AED 1,000—2,000/month. All plans include zero deposit, unlimited OEM toner, maintenance, and free delivery across Dubai." },
  { q: "Do you offer zero deposit printer rental in Dubai?", a: "Yes. Sahara offers zero deposit printer rental for qualified Dubai businesses. There is no upfront security deposit — you pay only the monthly rental. This applies to standard 12—36 month contracts for established businesses." },
  { q: "How fast can you deliver a rented printer to my Dubai office?", a: "We offer same-day delivery to most Dubai districts including Business Bay, DIFC, JLT, Marina, Sheikh Zayed Road, and Deira. Next-day delivery is standard for all other Dubai locations. Our engineers handle the full network setup on delivery day at no extra charge." },
  { q: "What printer brands do you rent in Dubai?", a: "We rent Canon imageRUNNER ADVANCE, Kyocera TASKalfa, HP LaserJet Enterprise, Ricoh MP series, and Xerox AltaLink in Dubai. Canon and Kyocera are our most popular brands due to their proven reliability in UAE climate conditions." },
  { q: "What is your emergency repair response time in Dubai?", a: "Our average emergency repair response time in Dubai is 4 hours. For critical rental clients in Business Bay, DIFC, and Downtown Dubai, we maintain a priority dispatch queue with 2-hour target response. If a repair exceeds 24 hours, we deliver a loaner machine at no charge." },
  { q: "Is toner included in the Dubai printer rental price?", a: "Yes — unlimited genuine OEM toner is included in all Sahara rental plans across Dubai. We remotely monitor toner levels and replenish proactively — you never need to order consumables or worry about running out mid-print." },
  { q: "Can I rent a printer for a short-term event or exhibition in Dubai?", a: "Yes. We supply printers and photocopiers for Dubai exhibitions, DWTC events, trade shows, hotel functions, and temporary office setups. Short-term rentals are available from 1 day to 3 months. We have supplied equipment for COP28 and major exhibitions at Dubai World Trade Centre." },
  { q: "Do you serve free zones like JAFZA, DMCC, and DIFC?", a: "Yes. We regularly supply and service rental printers in JAFZA (Jebel Ali Free Zone), DMCC (JLT), DIFC, Dubai Internet City, Dubai Media City, Dubai Silicon Oasis, and DAFZA (Dubai Airport Free Zone). Billing can be arranged in AED or USD for free zone entities." },
  { q: "Can I upgrade my rented printer during the contract in Dubai?", a: "Absolutely. Our 'Growth Guard' policy allows you to upgrade your printer or photocopier at any point during the rental contract — scaling from a small desktop unit to a high-volume A3 copier as your business grows. No termination fees apply for upgrades." },
  { q: "Do you offer multi-location printer rental for companies with multiple Dubai offices?", a: "Yes. We manage corporate fleet deployments across multiple Dubai locations under one contract with consolidated billing. This is ideal for businesses with branches in Business Bay, Deira, and Jebel Ali, for example. Fleet discount pricing applies for 3+ machines." },
  { q: "What happens to the printer at the end of the Dubai rental contract?", a: "At the end of the rental term, we collect the equipment at no charge. You can renew, upgrade to newer equipment, or simply return the machine. There are no exit fees and no disposal costs — Sahara handles the full lifecycle of every machine we rent." },
  { q: "Can the rented printer connect to our Dubai office Wi-Fi and email system?", a: "Yes. Our technicians configure full network integration including: LAN and Wi-Fi connectivity, scan-to-email via your office SMTP server, scan-to-folder for your server or NAS, cloud integration (Google Drive, OneDrive, SharePoint), and secure print release. Full setup is included in delivery." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saharaprinter.com" },
    { "@type": "ListItem", "position": 2, "name": "Printer Rental Dubai", "item": "https://saharaprinter.com/printer-rental-dubai" }
  ]
};

const dubaiAreas = [
  "Business Bay", "DIFC", "JLT (Jumeirah Lake Towers)", "Dubai Marina",
  "Downtown Dubai", "Sheikh Zayed Road", "Deira", "Al Quoz",
  "Dubai Internet City", "Dubai Media City", "Dubai Silicon Oasis", "Jebel Ali",
  "DWTC Area", "Al Barsha", "Bur Dubai", "Festival City"
];

const pricingTiers = [
  { name: "A4 Desktop", price: "AED 250—400", period: "/month", users: "1—5 users", volume: "Up to 2,000 pages", includes: ["A4 print only", "Unlimited toner", "Quarterly maintenance", "4-hr emergency response"], popular: false },
  { name: "A3 Mid-Range", price: "AED 500—900", period: "/month", users: "10—30 users", volume: "Up to 15,000 pages", includes: ["A3 + A4 print, copy, scan", "Unlimited toner", "Monthly maintenance", "4-hr emergency response", "Network setup included"], popular: true },
  { name: "A3 Enterprise", price: "AED 1,000—2,000", period: "/month", users: "30—80 users", volume: "Unlimited pages", includes: ["High-speed A3 color MFP", "Unlimited toner", "Weekly maintenance", "2-hr priority response", "Loaner machine guarantee", "Multi-site billing"], popular: false },
];

const dubaiIndustries = [
  { name: "Financial Services & DIFC Firms", insight: "DIFC-based banks and financial firms trust Sahara for compliance-grade secure printing with PIN release and audit trails.", icon: "ðŸ’¹" },
  { name: "Real Estate & Property", insight: "Dubai real estate agencies rely on A3 photocopiers for large-format floor plans, listing brochures, and high-volume contract duplication.", icon: "ðŸ™ï¸" },
  { name: "Hospitality & Hotels", insight: "Dubai hotels use our event rental service for conferences, banquets, and temporary office setups — with same-day delivery to any hotel district.", icon: "ðŸ¨" },
  { name: "Logistics & Free Zone Companies", insight: "JAFZA and Jebel Ali logistics operators require 24/7 manifest and label printing. We provide priority AMC coverage for operations that never stop.", icon: "ðŸšš" },
];

export default async function PrinterRentalDubai() {
  const faqs = await getFaqsFromD1();
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    <main className="min-h-screen bg-[#071325]">
      <Header />

      {/* â"€â"€ Hero â"€â"€ */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/location-dubai.webp"
            alt="Dubai skyline corporate office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#071325]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325]/80 via-[#071325]/60 to-[#101c2e]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[#f5be53] transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-[#f5be53]">Printer Rental Dubai</span>
          </nav>

          <div className="grid lg:grid-cols-1 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-xs">Dubai Â· Zero Deposit Â· Same-Day Delivery</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Printer Rental<br /><span className="text-[#f5be53]">Dubai</span>
              </h1>

              {/* AEO Block */}
              <div className="bg-[#0d1b2e] border border-[#f5be53]/20 rounded-2xl p-5 mb-8">
                <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">Printer Rental Dubai — Quick Answer</p>
                <p className="text-[#d3c5b0] text-sm leading-relaxed">
                  Sahara Office Equipments provides printer and photocopier rental in Dubai from <strong className="text-white">AED 250/month</strong> with
                  zero deposit, unlimited OEM toner, and a <strong className="text-white">4-hour emergency response</strong> across all Dubai districts.
                  Canon and Kyocera multifunction devices are delivered and network-configured same day.
                  Over 1,500 Dubai businesses have trusted Sahara since 2012.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {["AED 250/mo Starting", "Zero Deposit", "Same-Day Delivery", "Free Toner", "4-hr Response"].map((t) => (
                  <span key={t} className="text-xs font-bold text-white bg-[#f5be53]/10 border border-[#f5be53]/25 px-3 py-1.5 rounded-full">âœ" {t}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/get-quote" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_4px_24px_rgba(245,190,83,0.35)]">
                  Get Dubai Quote
                </a>
                <a href="tel:+971503823969" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors flex items-center gap-2">
                  📞 +971 50 382 3969
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â"€â"€ Pricing Tiers â"€â"€ */}
      <section className="py-16 px-4 lg:px-12 bg-[#0a1425]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Dubai Pricing</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">Printer Rental Plans for Dubai Businesses</h2>
            <p className="text-[#7a94ad] text-sm max-w-md mx-auto">All prices are per machine per month. Includes delivery, network setup, toner, and maintenance.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, i) => (
              <div key={i}
                className={`relative rounded-3xl p-8 border-2 flex flex-col ${tier.popular ? 'border-[#f5be53]' : 'border-white/8'}`}
                style={{
                  background: 'linear-gradient(160deg, rgba(10,20,36,0.97) 0%, rgba(5,12,24,0.99) 100%)',
                  boxShadow: tier.popular ? '0 0 40px rgba(245,190,83,0.12), 0 20px 60px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.4)',
                }}>
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f5be53] text-[#412d00] text-[10px] font-black px-4 py-0.5 rounded-full uppercase">Most Popular</span>
                )}
                <h3 className="text-2xl font-bold text-white text-center mb-1">{tier.name}</h3>
                <div className="text-center mb-2">
                  <span className="text-3xl font-black text-[#f5be53]">{tier.price}</span>
                  <span className="text-slate-400 text-sm">{tier.period}</span>
                </div>
                <div className="text-center mb-6 space-y-1">
                  <p className="text-slate-400 text-xs">ðŸ‘¥ {tier.users}</p>
                  <p className="text-slate-400 text-xs">🔄 {tier.volume}</p>
                </div>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.includes.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[#d3c5b0]">
                      <span className="text-[#f5be53] mt-0.5 shrink-0">âœ"</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/get-quote" className={`block text-center py-4 rounded-full font-bold transition-all hover:scale-[1.02] ${tier.popular ? 'bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00]' : 'glass-card text-white'}`}>
                  Get Dubai Quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â"€â"€ What is Printer Rental in Dubai â"€â"€ (Word count / depth) */}
      <section className="py-16 px-4 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12" style={{ borderLeft: '4px solid #f5be53' }}>
            <h2 className="text-3xl font-bold text-white mb-6">What is Printer Rental in Dubai?</h2>
            <div className="space-y-4 text-[#d3c5b0] leading-relaxed">
              <p>
                Printer rental in Dubai is a managed equipment leasing model where businesses access enterprise-grade
                Canon, Kyocera, HP, or Ricoh printers and photocopiers through a fixed monthly contract — without
                purchasing the equipment outright. The monthly fee covers the machine, unlimited OEM toner, all maintenance
                and repairs, and technical support.
              </p>
              <p>
                In Dubai's fast-moving business environment — from the towers of Business Bay and DIFC to the warehouses
                of Jebel Ali and Al Quoz — printing needs change rapidly. Printer rental eliminates the risk of owning
                depreciating assets. Instead of tying up capital in hardware that becomes obsolete in 3—4 years, companies
                pay a predictable monthly operational expense and upgrade seamlessly.
              </p>
              <p>
                Sahara Office Equipments has operated in Dubai since 2012, deploying over 2,500 devices across the
                emirate. Our Dubai clients include multinationals in DIFC, logistics operators in JAFZA, healthcare
                providers, real estate agencies, and government-adjacent organizations in Business Bay. The 4-hour
                emergency response and free replacement machine guarantee make our service the benchmark in the market.
              </p>
              <p>
                Unlike buying — where toner, maintenance contracts, spare parts, and technician callouts add 40—60%
                to the total cost of ownership — our rental model bundles everything into one monthly invoice with
                no hidden fees and no exit penalties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* â"€â"€ Dubai Areas â"€â"€ */}
      <section className="py-16 px-8 lg:px-24 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Coverage</span>
            <h2 className="text-3xl font-bold text-white mt-3 mb-3">All Dubai Districts — Same-Day Delivery</h2>
            <p className="text-[#7a94ad] text-sm">Our technicians operate from a Dubai service hub for fast response across all areas.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {dubaiAreas.map((area, i) => (
              <span key={i} className="px-4 py-2 rounded-full text-sm text-[#d3c5b0] font-medium border border-white/8 bg-white/3 hover:border-[#f5be53]/30 hover:text-white transition-all">
                📍 {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* â"€â"€ Dubai Industries â"€â"€ */}
      <section className="py-16 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Who We Serve in Dubai</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">Printer Rental Trusted Across Dubai Sectors</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {dubaiIndustries.map((ind, i) => (
              <div key={i}
                className="rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300"
                style={{ background: 'linear-gradient(150deg, rgba(15,26,42,0.97) 0%, rgba(8,14,28,0.98) 100%)', border: '1px solid rgba(245,190,83,0.12)' }}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{ind.icon}</span>
                  <div>
                    <h3 className="text-white font-bold mb-2">{ind.name}</h3>
                    <p className="text-[#6a87a4] text-sm leading-relaxed">{ind.insight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â"€â"€ Stats â"€â"€ */}
      <section className="py-12 px-8 bg-[#050d1a] border-y border-[#f5be53]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "1,500+", label: "Happy Clients UAE" },
              { value: "AED 250", label: "Starting Price/Month" },
              { value: "4 Hours", label: "Emergency Response Dubai" },
              { value: "13+ Years", label: "Serving UAE" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-2xl md:text-3xl font-bold text-[#f5be53]">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â"€â"€ FAQ â"€â"€ */}
      <section className="py-24 px-8 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Questions</span>
          <h2 className="text-4xl font-bold text-white mt-3">Printer Rental Dubai — FAQ</h2>
          <p className="text-[#7a94ad] text-sm mt-3 max-w-md mx-auto">12 questions covering pricing, delivery, brands, contracts and everything Dubai businesses ask.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i}
              className="rounded-2xl p-6 group cursor-pointer"
              style={{ background: 'linear-gradient(145deg, #0f1a2a 0%, #0a121c 100%)', boxShadow: '6px 6px 16px rgba(0,0,0,0.4), -3px -3px 10px rgba(255,255,255,0.03)' }}
              open={i === 0}>
              <summary className="flex justify-between items-center list-none font-bold text-base text-white pr-2">
                {faq.q}
                <span className="text-[#f5be53] text-xl shrink-0 ml-4 group-open:rotate-180 transition-transform duration-200">â€º</span>
              </summary>
              <p className="mt-4 text-[#d3c5b0] leading-relaxed text-sm">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* â"€â"€ Related Services — Internal Cross-Links â"€â"€ */}
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
              { href: "/printer-repair-dubai", label: "Printer Repair Dubai" },
              { href: "/canon-printer-dubai", label: "Canon Printer Dubai" },
              { href: "/brands/canon", label: "Canon Printers" },
              { href: "/brands/kyocera", label: "Kyocera Printers" },
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

      {/* â"€â"€ Other UAE Locations — Cross-Location Links â"€â"€ */}
      <section className="py-12 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 text-center">Printer Rental in Other Emirates</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/printer-rental-abu-dhabi", label: "Printer Rental Abu Dhabi", desc: "Weekly maintenance. Mussafah, Al Reem, Khalifa City." },
              { href: "/photocopier-rental-sharjah", label: "Photocopier Rental Sharjah", desc: "Our HQ. Fastest response in Sharjah & Northern Emirates." },
              { href: "/printer-rental-rak", label: "Printer Rental RAK", desc: "Ras Al Khaimah businesses & free zones." },
              { href: "/copier-lease-uae", label: "Copier Lease UAE", desc: "Nationwide fleet leasing with one contract." },
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

      {/* â"€â"€ From Our Blog — Topical Authority â"€â"€ */}
      <section className="py-16 px-8 lg:px-24 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">Resource Hub</p>
              <h2 className="text-2xl font-bold text-white">Dubai Printer Rental Guides</h2>
            </div>
            <Link href="/blogs" className="text-[#f5be53] text-sm hover:underline hidden sm:block">View All â†’</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                slug: "how-to-choose-the-best-printer-rental-dubai-service",
                title: "How to Choose the Best Printer Rental Dubai Service?",
                category: "Guide",
                img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1771224373/blogs/ai73xmapai8rb1z1u7qg.webp",
              },
              {
                slug: "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental",
                title: "How Dubai Companies Save Budget with Printer Rental",
                category: "Finance",
                img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1752651510/blogs/l3byyc7o8a8f1lddujis.jpg",
              },
              {
                slug: "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025",
                title: "Why Every UAE Business is Renting Printers in 2025",
                category: "Trends",
                img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1751102332/blogs/dqusdi9d0tonfoa0ggx6.jpg",
              },
              {
                slug: "total-cost-of-printer-ownership",
                title: "Total Cost of Printer Ownership vs. Rental",
                category: "Finance",
                img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758623726/blogs/rm2ptjektgnlq5hyoeyl.jpg",
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

      {/* â"€â"€ CTA â"€â"€ */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #f5be53 0%, #c8962e 100%)' }}>
          <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">Need Printer Rental in Dubai?</h2>
            <p className="text-[#483200] text-lg mb-8 max-w-xl mx-auto">
              Get a customized Dubai quote within 2 hours. Free consultation and same-day delivery available for most Dubai districts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/get-quote" className="bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                Get Free Dubai Quote
              </a>
              <a href="tel:+971503823969" className="bg-white/20 border border-[#412d00]/30 text-[#412d00] px-10 py-5 rounded-full font-bold text-lg backdrop-blur-sm hover:bg-white/30 transition-colors">
                📞 Call Now
              </a>
            </div>
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
