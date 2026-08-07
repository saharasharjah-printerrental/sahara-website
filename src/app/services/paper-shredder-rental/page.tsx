export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import ShredderFaqClient from "@/components/ShredderFaqClient";

export const metadata: Metadata = {
  title: "Paper Shredder Rental Dubai UAE | AED 150/mo | Sahara Office Equipments",
  description: "Rent a paper shredder in Dubai, Sharjah & Abu Dhabi from AED 150/month. DIN P-4 cross-cut & P-5 micro-cut models. UAE PDPL compliant. Free delivery, setup & maintenance. ☎ +971503823969",
  keywords: "paper shredder rental dubai, shredder rental uae, shredding machine rental dubai, paper shredder uae, document shredding service dubai, shredder for rent dubai, paper shredder near me, micro cut shredder dubai, din p-5 shredder uae",
  openGraph: {
    title: "Paper Shredder Rental Dubai & UAE | From AED 150/mo | Sahara",
    description: "Cross-cut (DIN P-4) and micro-cut (DIN P-5) paper shredder rental in Dubai, Sharjah & Abu Dhabi. UAE PDPL compliant. Free delivery. From AED 150/month. ☎ +971503823969",
    url: "https://www.saharaprinter.com/services/paper-shredder-rental/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/images/heroPrntr1.webp", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/paper-shredder-rental/" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Paper Shredder Rental UAE",
  "description": "Short-term and long-term paper shredder rental in Dubai, Sharjah, and Abu Dhabi. DIN P-4 cross-cut and DIN P-5 micro-cut models. UAE PDPL compliant document destruction for offices, events, and audits.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments",
    "telephone": "+971503823969",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Arabi Building, Industrial Area 11",
      "addressLocality": "Sharjah",
      "addressCountry": "AE",
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AED",
    "price": "150",
    "priceSpecification": { "@type": "UnitPriceSpecification", "price": "150", "priceCurrency": "AED", "unitText": "month" },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services/printer-rental/" },
    { "@type": "ListItem", "position": 3, "name": "Paper Shredder Rental", "item": "https://www.saharaprinter.com/services/paper-shredder-rental/" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How much does paper shredder rental cost in Dubai?", "acceptedAnswer": { "@type": "Answer", "text": "Paper shredder rental in Dubai starts from AED 150/month for cross-cut models. Micro-cut and high-capacity shredders for larger offices start from AED 300/month. All rentals include free delivery, setup, and maintenance." } },
    { "@type": "Question", "name": "Can I rent a paper shredder for a single day or event in UAE?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Sahara Office Equipments offers short-term paper shredder rental from 1 day to 3 months in Dubai, Sharjah, and Abu Dhabi — ideal for office clear-outs, events, and compliance audits." } },
    { "@type": "Question", "name": "What types of shredders are available for rent in UAE?", "acceptedAnswer": { "@type": "Answer", "text": "We offer cross-cut shredders (DIN P-4 level for general office use), micro-cut shredders (DIN P-5 for confidential documents), and industrial strip-cut shredders for bulk destruction. All are compliant with UAE data protection and GDPR standards." } },
    { "@type": "Question", "name": "Is paper shredder rental better than buying in UAE?", "acceptedAnswer": { "@type": "Answer", "text": "For occasional or seasonal use, rental is significantly cheaper than buying. A good office shredder costs AED 800–3,000 to buy. Renting at AED 150/month gives you the same quality with maintenance included and no capital expenditure." } },
    { "@type": "Question", "name": "Do you deliver paper shredders to JAFZA, SAIF Zone, and free zones?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We deliver paper shredders to all UAE free zones including JAFZA (Dubai), SAIF Zone (Sharjah), DAFZA, DIFC, and Abu Dhabi free zones. Same-day delivery available for Dubai and Sharjah." } },
    { "@type": "Question", "name": "Are your shredders compliant with UAE data protection laws?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All shredders we supply meet the UAE Personal Data Protection Law (PDPL Federal Decree-Law No. 45 of 2021) requirements for secure document destruction. Cross-cut models meet DIN P-4 and micro-cut models meet DIN P-5 — the recommended standard for confidential documents." } },
    { "@type": "Question", "name": "Where can I get a paper shredder machine in Dubai?", "acceptedAnswer": { "@type": "Answer", "text": "Sahara Office Equipments supplies and delivers paper shredder machines throughout Dubai — for rent from AED 150/month or as a one-off purchase. Free delivery and on-site setup are included across all Dubai districts, with same-day availability in most areas." } },
    { "@type": "Question", "name": "Can I buy a paper shredder instead of renting one?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — Sahara sells paper shredders outright as well as renting them. For offices that shred only occasionally, renting from AED 150/month (with maintenance and repairs included) usually works out cheaper than buying outright at AED 800–3,000+. For daily, high-volume shredding, buying can make sense — ask us for a side-by-side quote and we'll recommend whichever is cheaper for your actual usage." } },
    { "@type": "Question", "name": "What's the difference between the paper shredders Sahara offers in the UAE?", "acceptedAnswer": { "@type": "Answer", "text": "Sahara's UAE shredder range covers three tiers: DIN P-4 cross-cut for general office documents, DIN P-5 micro-cut for confidential or HR files, and heavy-duty 30-sheet models for high-volume clear-outs. All are available to rent or buy, with free delivery across Dubai, Sharjah, and Abu Dhabi." } },
    { "@type": "Question", "name": "Does Sahara supply paper shredders across Dubai and the wider UAE?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Sahara delivers and services paper shredders across Dubai, Sharjah, Abu Dhabi, Ajman, and Ras Al Khaimah, including free zones like JAFZA, SAIF Zone, and DIFC. Rental plans start from AED 150/month; outright purchase is also available on request." } },
  ],
};

const models = [
  { name: "Cross-Cut Office Shredder", level: "DIN P-4", capacity: "12 sheets/pass", bestFor: "General office documents, A4 paper, credit cards", price: "From AED 150/mo", badge: "Most Popular" },
  { name: "Micro-Cut Secure Shredder", level: "DIN P-5", capacity: "8 sheets/pass", bestFor: "Confidential files, HR documents, legal papers", price: "From AED 250/mo", badge: "Recommended" },
  { name: "Heavy-Duty Shredder", level: "DIN P-4", capacity: "30 sheets/pass", bestFor: "High-volume offices, document clear-outs, accounting", price: "From AED 400/mo", badge: "High Volume" },
];

const securityLevels = [
  { din: "DIN P-4", type: "Cross-cut", particles: "≤ 160 mm²", use: "General office — invoices, letters, internal memos", color: "text-blue-300" },
  { din: "DIN P-5", type: "Micro-cut", particles: "≤ 30 mm²", use: "Confidential — HR files, legal docs, personal data", color: "text-[#f5be53]" },
  { din: "DIN P-6", type: "Micro-cut", particles: "≤ 10 mm²", use: "Highly confidential — financial, classified records", color: "text-emerald-400" },
];

export default function PaperShredderRentalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen bg-[#071325]">
        <Header />

        {/* Hero */}
        <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5be53]/6 rounded-full blur-[160px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <nav className="text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
              <a href="/" className="hover:text-[#f5be53] transition-colors">Home</a>
              <span className="mx-2">/</span>
              <a href="/services/printer-rental" className="hover:text-[#f5be53] transition-colors">Services</a>
              <span className="mx-2">/</span>
              <span className="text-[#f5be53]">Paper Shredder Rental</span>
            </nav>

            <div className="max-w-3xl">
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-xs">Dubai · Sharjah · Abu Dhabi</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Paper Shredder Rental<br /><span className="text-[#f5be53]">Dubai & UAE</span>
              </h1>

              {/* AEO Answer Block */}
              <div className="bg-[#0d1b2e] border border-[#f5be53]/20 rounded-2xl p-5 mb-8">
                <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">What is Paper Shredder Rental in UAE?</p>
                <p className="text-[#d3c5b0] text-sm leading-relaxed">
                  Paper shredder rental in UAE lets offices securely destroy confidential documents without the capital cost of buying. Sahara provides DIN P-4 cross-cut and DIN P-5 micro-cut shredders in Dubai, Sharjah, and Abu Dhabi from <strong className="text-white">AED 150/month</strong> — with free delivery, on-site setup, and maintenance. Compliant with the UAE Personal Data Protection Law (PDPL). Available for 1-day events or long-term contracts.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {["From AED 150/mo", "Free Delivery", "Same-Day Available", "1 Day to 12 Months", "UAE PDPL Compliant"].map((t) => (
                  <span key={t} className="text-xs font-bold text-white bg-[#f5be53]/10 border border-[#f5be53]/25 px-3 py-1.5 rounded-full">✓ {t}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/rental-calculator/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_4px_24px_rgba(245,190,83,0.35)]">
                  Get Shredder Quote
                </a>
                <a href="tel:+971503823969" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                  📞 +971 50 382 3969
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Models */}
        <section className="py-20 px-8 lg:px-24" style={{ background: '#050d1a' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3">Shredder Models Available for Rent in UAE</h2>
            <p className="text-[#8fa3bc] mb-10">Choose the security level that matches your document sensitivity requirements.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {models.map((m, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 relative">
                  <span className="absolute top-4 right-4 text-[10px] font-bold text-[#412d00] bg-[#f5be53] px-2 py-0.5 rounded-full">{m.badge}</span>
                  <h3 className="text-xl font-bold text-white mb-1">{m.name}</h3>
                  <p className="text-[#f5be53] text-sm font-semibold mb-3">{m.price}</p>
                  <ul className="text-[#d3c5b0] text-sm space-y-1 mb-4">
                    <li>Security Level: <span className="text-white font-medium">{m.level}</span></li>
                    <li>Sheet Capacity: <span className="text-white font-medium">{m.capacity}</span></li>
                    <li>Best For: <span className="text-white font-medium">{m.bestFor}</span></li>
                  </ul>
                  <a href="/rental-calculator/" className="block text-center bg-[#f5be53]/10 border border-[#f5be53]/30 text-[#f5be53] font-semibold py-2 rounded-full text-sm hover:bg-[#f5be53]/20 transition-colors">
                    Enquire Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIN Security Level Guide */}
        <section className="py-20 px-8 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3">DIN Security Level Guide for UAE Offices</h2>
            <p className="text-[#8fa3bc] mb-8 max-w-2xl">
              DIN 66399 defines 7 security levels (P-1 to P-7) for paper shredding. For UAE office compliance with the <strong className="text-white">Personal Data Protection Law (PDPL)</strong>, P-4 or higher is recommended for any personally identifiable information.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0d1a2e]">
                    <th className="px-5 py-4 text-left text-[#8fa3bc] font-semibold">DIN Level</th>
                    <th className="px-5 py-4 text-left text-[#8fa3bc] font-semibold">Cut Type</th>
                    <th className="px-5 py-4 text-left text-[#8fa3bc] font-semibold">Particle Size</th>
                    <th className="px-5 py-4 text-left text-[#8fa3bc] font-semibold">Recommended Use</th>
                  </tr>
                </thead>
                <tbody>
                  {securityLevels.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-[#0a1422]" : "bg-[#071325]"}>
                      <td className={`px-5 py-3 font-bold ${row.color}`}>{row.din}</td>
                      <td className="px-5 py-3 text-white">{row.type}</td>
                      <td className="px-5 py-3 text-[#d3c5b0]">{row.particles}</td>
                      <td className="px-5 py-3 text-[#d3c5b0]">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#8fa3bc] text-xs mt-4">All Sahara rental shredders are DIN P-4 minimum. Micro-cut models are DIN P-5.</p>
          </div>
        </section>

        {/* UAE PDPL Compliance */}
        <section className="py-16 px-8 lg:px-24" style={{ background: '#050d1a' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3">UAE Data Protection Compliance — PDPL</h2>
            <p className="text-[#8fa3bc] mb-8 max-w-2xl">
              The UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021, effective September 2022) requires organisations to securely dispose of personal data in physical form. Failure to comply can result in fines up to AED 5 million.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "⚖️", title: "PDPL Compliant", desc: "All rental shredders meet UAE PDPL requirements for secure physical data destruction." },
                { icon: "🔒", title: "GDPR-Ready", desc: "DIN P-5 micro-cut models are GDPR-compliant for multi-national organisations operating in UAE." },
                { icon: "📋", title: "Audit Trail", desc: "We can provide destruction certificates for compliance audit documentation on request." },
                { icon: "🏢", title: "Free Zone Delivery", desc: "Delivery to JAFZA, SAIF Zone, DAFZA, DIFC — free zone compliance included." },
              ].map((item, i) => (
                <div key={i} className="glass-card p-5 rounded-xl">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-[#8fa3bc] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rent vs Buy */}
        <section className="py-20 px-8 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3 text-center">Shredder Rental vs Buying — UAE Cost Comparison</h2>
            <p className="text-[#8fa3bc] text-center mb-10">For most UAE offices that shred occasionally, rental is significantly cheaper with no maintenance headache.</p>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0d1a2e]">
                    <th className="px-5 py-4 text-left text-[#8fa3bc] font-semibold">Factor</th>
                    <th className="px-5 py-4 text-left text-[#f5be53] font-semibold">Rental (Sahara)</th>
                    <th className="px-5 py-4 text-left text-slate-400 font-semibold">Buying</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Upfront Cost", "AED 0", "AED 800 – 3,000+"],
                    ["Monthly Cost", "From AED 150/mo", "Depreciation + maintenance"],
                    ["Maintenance", "Included — no extra cost", "Your responsibility"],
                    ["Repairs", "Included", "AED 200–800 per repair"],
                    ["Flexibility", "1 day to 12 months", "Committed purchase"],
                    ["Upgrade", "Switch models anytime", "Buy again"],
                    ["Delivery & Setup", "Free across UAE", "Self-arrange"],
                  ].map(([factor, rental, buying], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-[#0a1422]" : "bg-[#071325]"}>
                      <td className="px-5 py-3 text-[#8fa3bc] font-medium">{factor}</td>
                      <td className="px-5 py-3 text-emerald-400 font-medium">{rental}</td>
                      <td className="px-5 py-3 text-slate-400">{buying}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 rounded-xl border border-[#f5be53]/20 bg-[#0d1b2e] p-5">
              <p className="text-white font-semibold text-sm mb-1">Prefer to buy instead?</p>
              <p className="text-[#8fa3bc] text-sm leading-relaxed">
                Sahara sells paper shredders outright too — not just rental. If you shred daily at high volume, buying can be the cheaper option long-term.{" "}
                <a href="tel:+971503823969" className="text-[#f5be53] font-semibold hover:underline">Call us for a quick rent-vs-buy comparison</a> based on your actual usage.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-8 lg:px-24" style={{ background: '#050d1a' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10">Paper Shredder Rental — FAQ</h2>
            <ShredderFaqClient />
          </div>
        </section>

        {/* Related */}
        <section className="py-12 px-8 lg:px-24 border-t border-[#f5be53]/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">Related Services</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/services/printer-rental", label: "Printer Rental UAE" },
                { href: "/printer-rental-dubai", label: "Printer Rental Dubai" },
                { href: "/services/repair", label: "Printer Repair Dubai" },
                { href: "/services/amc", label: "Annual Maintenance (AMC)" },
                { href: "/services/papercut-print-management", label: "PaperCut Print Management" },
              ].map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-[#f5be53] bg-[#f5be53]/10 border border-[#f5be53]/20 px-4 py-2 rounded-full hover:bg-[#f5be53]/20 transition-colors">
                  {l.label}
                </a>
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
