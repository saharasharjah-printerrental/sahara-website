export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import FaqSection from "@/components/FaqSection";
import AnswerBlock from "@/components/AnswerBlock";
import type { FaqItem } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Paper Shredder Rental & Sales Dubai UAE | Fellowes Shredders | Sahara",
  description: "Rent or buy a paper shredder in Dubai, Sharjah & Abu Dhabi — Fellowes Powershred LX65 & 325Ci cross-cut models. UAE PDPL compliant document destruction. Free delivery, setup & maintenance. ☎ +971503823969",
  keywords: "paper shredder rental dubai, shredder rental uae, buy paper shredder dubai, paper shredder machine dubai, document shredding services uae, confidential document destruction dubai, fellowes shredder dubai, shredder for rent dubai, din p-4 shredder uae, office paper shredder uae",
  openGraph: {
    title: "Paper Shredder Rental & Sales Dubai & UAE | Sahara Office Equipments",
    description: "Fellowes Powershred cross-cut paper shredders for rent or purchase in Dubai, Sharjah & Abu Dhabi. UAE PDPL compliant document destruction. Free delivery & setup. ☎ +971503823969",
    url: "https://www.saharaprinter.com/services/paper-shredder-rental/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/images/shredder-fellowes-325ci.webp", width: 1200, height: 630, alt: "Fellowes Powershred 325Ci commercial paper shredder available for rent in Dubai and UAE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paper Shredder Rental & Sales Dubai & UAE | Sahara Office Equipments",
    description: "Fellowes Powershred cross-cut paper shredders for rent or purchase in Dubai, Sharjah & Abu Dhabi. UAE PDPL compliant document destruction.",
    images: ["https://www.saharaprinter.com/images/shredder-fellowes-325ci.webp"],
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/paper-shredder-rental/" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Paper Shredder Rental & Sales UAE",
  "description": "Paper shredder rental and sales in Dubai, Sharjah, and Abu Dhabi. Fellowes Powershred DIN P-4 cross-cut models. UAE PDPL compliant document destruction for offices, events, and audits.",
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
    "priceSpecification": { "@type": "UnitPriceSpecification", "price": "150", "priceCurrency": "AED" },
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

// Default FAQ set for /services/paper-shredder-rental/. These are only the
// fallback: FaqSection reads pageSlug 'services/paper-shredder-rental' from D1
// first (migration 018) and emits the FAQPage JSON-LD itself, so the Q&A text
// lives in exactly one place. The old hand-rolled faqSchema literal + the
// schema-less ShredderFaqClient duplicate have both been removed.
const SHREDDER_FAQS: FaqItem[] = [
  { q: "How much does paper shredder rental cost in Dubai?", a: "Paper shredder rental in Dubai starts from AED 150 for the Fellowes Powershred LX65 cross-cut model. Higher-capacity departmental shredders like the Fellowes 325Ci start from AED 400. Rental terms are customised to your document volume and contract length — request a quote for exact pricing. All rentals include free delivery, setup, and maintenance." },
  { q: "Can I rent a paper shredder for a single day or event in UAE?", a: "Yes. Sahara Office Equipments offers short-term paper shredder rental in Dubai, Sharjah, and Abu Dhabi with flexible, customised contract lengths — ideal for office clear-outs, events, and compliance audits. Tell us your dates and we'll confirm availability." },
  { q: "What types of shredders are available for rent in UAE?", a: "We supply Fellowes Powershred cross-cut shredders (DIN P-4 security level) in both personal/light-office and departmental capacities, plus heavy-duty industrial models for bulk destruction on request. All are compliant with UAE data protection and GDPR standards." },
  { q: "Is paper shredder rental better than buying in UAE?", a: "For occasional or seasonal use, rental is significantly cheaper than buying. A good office shredder costs AED 800–3,000 to buy. Renting from AED 150 gives you the same quality with maintenance included and no capital expenditure. For daily, high-volume shredding, buying can be the better long-term option." },
  { q: "Do you deliver paper shredders to JAFZA, SAIF Zone, and free zones?", a: "Yes. We deliver paper shredders to all UAE free zones including JAFZA (Dubai), SAIF Zone (Sharjah), DAFZA, DIFC, and Abu Dhabi free zones. Same-day delivery available for Dubai and Sharjah." },
  { q: "Are your shredders compliant with UAE data protection laws?", a: "Yes. All shredders we supply meet the UAE Personal Data Protection Law (PDPL Federal Decree-Law No. 45 of 2021) requirements for secure document destruction. Our Fellowes cross-cut models meet DIN P-4 — the recommended standard for confidential documents — with higher security levels available on request." },
  { q: "Where can I get a paper shredder machine in Dubai?", a: "Sahara Office Equipments supplies and delivers paper shredder machines throughout Dubai — for rent from AED 150 or as a one-off purchase. Free delivery and on-site setup are included across all Dubai districts, with same-day availability in most areas." },
  { q: "Can I buy a paper shredder instead of renting one?", a: "Yes — Sahara sells paper shredders outright as well as renting them. For offices that shred only occasionally, renting from AED 150 (with maintenance and repairs included) usually works out cheaper than buying outright at AED 800–3,000+. For daily, high-volume shredding, buying can make sense — ask us for a side-by-side quote and we'll recommend whichever is cheaper for your actual usage." },
  { q: "What's the difference between the paper shredders Sahara offers in the UAE?", a: "Sahara's UAE shredder range covers the Fellowes Powershred LX65 (10 sheets/pass, personal or light-office use) and the Fellowes Powershred 325Ci (24 sheets/pass, departmental/commercial use), both DIN P-4 cross-cut, plus heavy-duty models for high-volume clear-outs on request. All are available to rent or buy, with free delivery across Dubai, Sharjah, and Abu Dhabi." },
  { q: "Does Sahara supply paper shredders across Dubai and the wider UAE?", a: "Yes. Sahara delivers and services paper shredders across Dubai, Sharjah, Abu Dhabi, Ajman, and Ras Al Khaimah, including free zones like JAFZA, SAIF Zone, and DIFC. Rental plans start from AED 150; outright purchase is also available on request." },
];

const models = [
  {
    name: "Fellowes Powershred LX65",
    image: "/images/shredder-fellowes-lx65.webp",
    alt: "Fellowes Powershred LX65 cross-cut paper shredder available for rent in Dubai and Sharjah",
    level: "DIN P-4 Cross-Cut",
    capacity: "10 sheets/pass",
    bin: "22.7L bin (300+ sheets)",
    bestFor: "Personal & light office use, general documents, credit cards",
    price: "From AED 150",
    badge: "Most Popular",
  },
  {
    name: "Fellowes Powershred 325Ci",
    image: "/images/shredder-fellowes-325ci.webp",
    alt: "Fellowes Powershred 325Ci commercial cross-cut paper shredder available for rent in Dubai and Sharjah",
    level: "DIN P-4 Cross-Cut",
    capacity: "24 sheets/pass",
    bin: "83L bin, 100% Jam Proof",
    bestFor: "Departmental & commercial use, multi-user offices, high-volume clear-outs",
    price: "From AED 400",
    badge: "High Volume",
  },
];

export default function PaperShredderRentalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* FAQPage JSON-LD is emitted by <FaqSection> alongside the accordion it renders,
          so the questions can never drift apart from the schema that declares them. */}
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
              <a href="/services/printer-rental/" className="hover:text-[#f5be53] transition-colors">Services</a>
              <span className="mx-2">/</span>
              <span className="text-[#f5be53]">Paper Shredder Rental</span>
            </nav>

            <div className="max-w-3xl">
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-xs">Dubai · Sharjah · Abu Dhabi</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Paper Shredder Rental &amp; Sales<br /><span className="text-[#f5be53]">Dubai & UAE</span>
              </h1>

              <AnswerBlock
                question="What is paper shredder rental in the UAE?"
                answer="Paper shredder rental lets UAE offices destroy confidential documents without buying a machine. Sahara supplies Fellowes Powershred DIN P-4 cross-cut shredders from AED 150, with free delivery, on-site setup, and maintenance included across Dubai, Sharjah, and Abu Dhabi. Terms run from a single event to a long-term contract."
                supportingPoints={[
                  "Fellowes Powershred LX65: 10 sheets per pass, 22.7L bin — from AED 150",
                  "Fellowes Powershred 325Ci: 24 sheets per pass, 83L bin — from AED 400",
                  "DIN P-4 cross-cut meets UAE PDPL (Federal Decree-Law No. 45 of 2021) destruction requirements",
                  "Free delivery to JAFZA, SAIF Zone, DAFZA and DIFC; outright purchase also available",
                ]}
              />

              <div className="flex flex-wrap gap-3 mb-8">
                {["Rent or Buy", "Free Delivery", "Same-Day Available", "Custom Contract Terms", "UAE PDPL Compliant"].map((t) => (
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
            <h2 className="text-3xl font-bold text-white mb-3">Fellowes Shredder Models for Rent or Purchase in UAE</h2>
            <p className="text-[#8fa3bc] mb-10">DIN P-4 cross-cut Fellowes Powershred shredders, sized for personal, office, and departmental use. Pricing and contract terms are customised to your requirements.</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              {models.map((m, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 relative">
                  <span className="absolute top-4 right-4 text-[10px] font-bold text-[#412d00] bg-[#f5be53] px-2 py-0.5 rounded-full">{m.badge}</span>
                  <img
                    src={m.image}
                    alt={m.alt}
                    width={280}
                    height={280}
                    loading="lazy"
                    className="w-full h-48 object-contain bg-white/5 rounded-xl mb-4"
                  />
                  <h3 className="text-xl font-bold text-white mb-1">{m.name}</h3>
                  <p className="text-[#f5be53] text-sm font-semibold mb-3">{m.price} — custom quote for your requirement</p>
                  <ul className="text-[#d3c5b0] text-sm space-y-1 mb-4">
                    <li>Security Level: <span className="text-white font-medium">{m.level}</span></li>
                    <li>Sheet Capacity: <span className="text-white font-medium">{m.capacity}</span></li>
                    <li>Bin: <span className="text-white font-medium">{m.bin}</span></li>
                    <li>Best For: <span className="text-white font-medium">{m.bestFor}</span></li>
                  </ul>
                  <a href="/rental-calculator/" className="block text-center bg-[#f5be53]/10 border border-[#f5be53]/30 text-[#f5be53] font-semibold py-2 rounded-full text-sm hover:bg-[#f5be53]/20 transition-colors">
                    Enquire Now
                  </a>
                </div>
              ))}
            </div>
            <p className="text-[#8fa3bc] text-xs mt-6 max-w-2xl">
              Need a higher-security or industrial model? DIN 66399 defines 7 security levels (P-1 to P-7) for paper shredding — for UAE PDPL compliance with personally identifiable information, DIN P-4 or higher is recommended. Ask us about micro-cut and heavy-duty options.
            </p>
          </div>
        </section>

        {/* UAE PDPL Compliance */}
        <section className="py-16 px-8 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3">UAE Data Protection Compliance — Document Destruction & PDPL</h2>
            <p className="text-[#8fa3bc] mb-8 max-w-2xl">
              The UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021, effective September 2022) requires organisations to securely dispose of personal data in physical form. Failure to comply can result in fines up to AED 5 million. Confidential document destruction via a DIN P-4 cross-cut shredder meets this requirement for most office records.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "⚖️", title: "PDPL Compliant", desc: "All rental shredders meet UAE PDPL requirements for secure physical data destruction." },
                { icon: "🔒", title: "GDPR-Ready", desc: "DIN P-4 cross-cut models suit most confidential document destruction needs; higher security levels available on request for multi-national organisations." },
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
                    ["Rental Cost", "From AED 150, customised to your term", "Depreciation + maintenance"],
                    ["Maintenance", "Included — no extra cost", "Your responsibility"],
                    ["Repairs", "Included", "AED 200–800 per repair"],
                    ["Flexibility", "Contract length customised to your needs", "Committed purchase"],
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
          </div>
        </section>

        {/* Buy a Paper Shredder Instead */}
        <section className="py-20 px-8 lg:px-24" style={{ background: '#050d1a' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3">Prefer to Buy a Paper Shredder in Dubai?</h2>
            <p className="text-[#8fa3bc] leading-relaxed mb-6">
              Sahara sells Fellowes Powershred paper shredders outright too — not just rental. A good office shredder costs <strong className="text-white">AED 800–3,000+</strong> to buy, versus renting from <strong className="text-white">AED 150</strong> with maintenance included. If you shred daily at high volume, buying can be the cheaper option long-term; if usage is occasional or seasonal, rental usually wins. We'll recommend whichever works out cheaper for your actual usage.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+971503823969" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_4px_24px_rgba(245,190,83,0.35)]">
                Call for a Rent-vs-Buy Comparison
              </a>
              <a href="/rental-calculator/" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                Get a Purchase Quote
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-8 lg:px-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10">Paper Shredder Rental & Sales — FAQ</h2>
            <FaqSection
              pageSlug="services/paper-shredder-rental"
              defaultFaqs={SHREDDER_FAQS}
              pageId="https://www.saharaprinter.com/services/paper-shredder-rental/#faq"
            />
          </div>
        </section>

        {/* Related */}
        <section className="py-12 px-8 lg:px-24 border-t border-[#f5be53]/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">Related Services</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/services/printer-rental/", label: "Printer Rental UAE" },
                { href: "/printer-rental-dubai", label: "Printer Rental Dubai" },
                { href: "/services/repair/", label: "Printer Repair Dubai" },
                { href: "/services/amc/", label: "Annual Maintenance (AMC)" },
                { href: "/services/papercut-print-management/", label: "PaperCut Print Management" },
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
