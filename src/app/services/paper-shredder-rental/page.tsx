export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

export const metadata: Metadata = {
  title: "Paper Shredder Rental Dubai UAE | Short & Long Term | Sahara",
  description: "Rent a paper shredder in Dubai, Sharjah & Abu Dhabi from AED 150/month. Cross-cut & micro-cut models. Free delivery, on-site setup, GDPR-compliant shredding for UAE offices. ☎ +971503823969",
  keywords: "paper shredder rental dubai, shredder rental uae, shredding machine rental dubai, paper shredder uae, document shredding service dubai, shredder for rent dubai, paper shredder near me",
  openGraph: {
    title: "Paper Shredder Rental Dubai & UAE | Sahara Office Equipments",
    description: "Cross-cut and micro-cut paper shredder rental in Dubai, Sharjah & Abu Dhabi. Free delivery, on-site setup. AED 150/month. Call +971503823969.",
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
  "description": "Short-term and long-term paper shredder rental in Dubai, Sharjah, and Abu Dhabi. Cross-cut and micro-cut models for offices, events, and secure document destruction.",
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
    {
      "@type": "Question",
      "name": "How much does paper shredder rental cost in Dubai?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paper shredder rental in Dubai starts from AED 150/month for cross-cut models. Micro-cut and high-capacity shredders for larger offices start from AED 300/month. All rentals include free delivery, setup, and maintenance." },
    },
    {
      "@type": "Question",
      "name": "Can I rent a paper shredder for a single day or event in UAE?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Sahara Office Equipments offers short-term paper shredder rental from 1 day to 3 months in Dubai, Sharjah, and Abu Dhabi — ideal for office clear-outs, events, and compliance audits." },
    },
    {
      "@type": "Question",
      "name": "What types of shredders are available for rent in UAE?",
      "acceptedAnswer": { "@type": "Answer", "text": "We offer cross-cut shredders (DIN P-4 level for general office use), micro-cut shredders (DIN P-5 for confidential documents), and industrial strip-cut shredders for bulk destruction. All are compliant with UAE data protection and GDPR standards." },
    },
    {
      "@type": "Question",
      "name": "Is paper shredder rental better than buying in UAE?",
      "acceptedAnswer": { "@type": "Answer", "text": "For occasional or seasonal use, rental is significantly cheaper than buying. A good office shredder costs AED 800–3,000 to buy. Renting at AED 150/month gives you the same quality with maintenance included and no capital expenditure." },
    },
    {
      "@type": "Question",
      "name": "Do you deliver paper shredders to JAFZA, SAIF Zone, and free zones?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. We deliver paper shredders to all UAE free zones including JAFZA (Dubai), SAIF Zone (Sharjah), DAFZA, DIFC, and Abu Dhabi free zones. Same-day delivery available for Dubai and Sharjah." },
    },
  ],
};

const models = [
  { name: "Cross-Cut Office Shredder", level: "DIN P-4", capacity: "12 sheets/pass", bestFor: "General office documents, A4 paper, credit cards", price: "From AED 150/mo" },
  { name: "Micro-Cut Secure Shredder", level: "DIN P-5", capacity: "8 sheets/pass", bestFor: "Confidential files, HR documents, legal papers", price: "From AED 250/mo" },
  { name: "Heavy-Duty Shredder", level: "DIN P-4", capacity: "30 sheets/pass", bestFor: "High-volume offices, document clear-outs, accounting", price: "From AED 400/mo" },
];

export default function PaperShredderRentalPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
                  Paper shredder rental in UAE lets offices securely destroy confidential documents without the capital cost of
                  buying. Sahara provides cross-cut and micro-cut shredders in Dubai, Sharjah, and Abu Dhabi from AED 150/month —
                  with free delivery, setup, and maintenance. Available for 1-day events or long-term monthly contracts.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {["From AED 150/mo", "Free Delivery", "Same-Day Available", "1 Day to 12 Months", "DIN P-4 & P-5"].map((t) => (
                  <span key={t} className="text-xs font-bold text-white bg-[#f5be53]/10 border border-[#f5be53]/25 px-3 py-1.5 rounded-full">✓ {t}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/get-quote" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_4px_24px_rgba(245,190,83,0.35)]">
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
            <h2 className="text-3xl font-bold text-white mb-10">Shredder Models Available for Rent in UAE</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {models.map((m, i) => (
                <div key={i} className="glass-card rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{m.name}</h3>
                  <p className="text-[#f5be53] text-sm font-semibold mb-3">{m.price}</p>
                  <ul className="text-[#d3c5b0] text-sm space-y-1">
                    <li>Security Level: <span className="text-white font-medium">{m.level}</span></li>
                    <li>Capacity: <span className="text-white font-medium">{m.capacity}</span></li>
                    <li>Best For: <span className="text-white font-medium">{m.bestFor}</span></li>
                  </ul>
                  <a href="/get-quote" className="mt-4 block text-center bg-[#f5be53]/10 border border-[#f5be53]/30 text-[#f5be53] font-semibold py-2 rounded-full text-sm hover:bg-[#f5be53]/20 transition-colors">
                    Enquire Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-8 lg:px-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10">Paper Shredder Rental — FAQ</h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, i) => (
                <div key={i} className="glass-card rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-2">{faq.name}</h3>
                  <p className="text-[#d3c5b0] text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
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
                { href: "/copier-lease-uae", label: "Copier Lease UAE" },
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
