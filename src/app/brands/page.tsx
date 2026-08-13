export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

export const metadata: Metadata = {
  title: "Printer Brands UAE | Canon, HP, Kyocera, Ricoh, Xerox | Sahara",
  description: "Authorized dealer for all major printer & photocopier brands in UAE: Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp, Epson, Samsung, Lexmark. Sales, rental & AMC. ☎ +971503823969",
  keywords: "printer brands uae, canon printer dealer uae, hp printer uae, kyocera printer uae, ricoh photocopier uae, xerox dealer uae, brother printer uae, konica minolta uae, photocopier brands dubai",
  openGraph: {
    title: "Printer Brands UAE | Authorized Dealer | Sahara Office Equipments",
    description: "Authorized dealer for Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp & more in UAE. Sales, rental, repair & AMC.",
    url: "https://www.saharaprinter.com/brands/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/images/heroPrntr1.webp", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.saharaprinter.com/brands/" },
};

const brands = [
  { slug: "canon", name: "Canon", tagline: "imageRUNNER ADVANCE & imageCLASS", desc: "Authorized Canon dealer in UAE. Reliable A3/A4 MFPs for enterprise offices.", icon: "🖨️" },
  { slug: "hp", name: "HP", tagline: "LaserJet Enterprise & PageWide", desc: "HP Service Center in Dubai. LaserJet and PageWide solutions for all business sizes.", icon: "🖨️" },
  { slug: "kyocera", name: "Kyocera", tagline: "ECOSYS & TASKalfa", desc: "ECOSYS technology for lowest total cost of ownership in UAE.", icon: "🖨️" },
  { slug: "ricoh", name: "Ricoh", tagline: "IM C Series & MP Series", desc: "Authorized Ricoh dealer. Aficio and IM C series color MFPs for UAE businesses.", icon: "🖨️" },
  { slug: "xerox", name: "Xerox", tagline: "VersaLink & AltaLink", desc: "Enterprise-grade Xerox MFPs for high-volume printing in Dubai offices.", icon: "🖨️" },
  { slug: "brother", name: "Brother", tagline: "MFC & DCP Series", desc: "Wireless, cloud-ready Brother printers for SMEs across UAE.", icon: "🖨️" },
  { slug: "sharp", name: "Sharp", tagline: "Sharp MFPs & Display Systems", desc: "Smart Sharp MFPs with OSA integration for connected offices.", icon: "🖨️" },
  { slug: "epson", name: "Epson", tagline: "PrecisionCore & Wide-Format", desc: "Epson EcoTank and wide-format solutions for print-intensive environments.", icon: "🖨️" },
  { slug: "samsung", name: "Samsung", tagline: "ProXpress & MultiXpress", desc: "Samsung enterprise printers with smart printing apps for UAE businesses.", icon: "🖨️" },
  { slug: "lexmark", name: "Lexmark", tagline: "Managed Print Services", desc: "Lexmark enterprise laser solutions and MPS programs for UAE offices.", icon: "🖨️" },
  { slug: "konica-minolta", name: "Konica Minolta", tagline: "bizhub A3 & A4 Series", desc: "Authorized Konica Minolta dealer in UAE. bizhub MFPs for high-volume corporate offices.", icon: "🖨️" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.saharaprinter.com/products/" },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Printer Brands Available at Sahara UAE",
  "description": "Authorized printer and photocopier brands for sales, rental, and AMC in UAE",
  "numberOfItems": brands.length,
  "itemListElement": brands.map((b, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": `${b.name} Printers UAE`,
    "url": `https://www.saharaprinter.com/brands/${b.slug}/`,
    "description": b.desc,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which printer brands does Sahara Office Equipments deal in UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sahara is an authorized dealer for Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp, Epson, Samsung, Lexmark, and Konica Minolta in UAE. We provide sales, rental, AMC, and repair services for all these brands across Dubai, Sharjah, Abu Dhabi, and other emirates.",
      },
    },
    {
      "@type": "Question",
      "name": "Does Sahara offer rental for all printer brands?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We offer monthly printer rental from AED 250/month for Canon, HP, Kyocera, Ricoh, Xerox, and Brother models. Zero deposit, free toner, and full maintenance included.",
      },
    },
    {
      "@type": "Question",
      "name": "Is Sahara an HP Service Center in Dubai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sahara Office Equipments is an authorized HP service partner in Dubai and UAE, providing warranty repairs, HP toner supplies, and enterprise LaserJet support.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I get AMC for Kyocera and Ricoh printers in UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We provide comprehensive AMC (Annual Maintenance Contract) plans for Kyocera ECOSYS, TASKalfa, Ricoh IM C series, and MP series printers across UAE at competitive rates.",
      },
    },
  ],
};

export default function BrandsPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <main className="min-h-screen bg-[#071325]">
        <Header />

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-8 lg:px-24 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#f5be53]/6 rounded-full blur-[160px] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <nav className="text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
              <a href="/" className="hover:text-[#f5be53] transition-colors">Home</a>
              <span className="mx-2">/</span>
              <span className="text-[#f5be53]">Printer Brands</span>
            </nav>

            <div className="text-center max-w-3xl mx-auto">
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-xs">Authorized Dealer · UAE</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Printer Brands<br /><span className="text-[#f5be53]">We Deal In UAE</span>
              </h1>

              {/* AEO Answer Block */}
              <div className="bg-[#0d1b2e] border border-[#f5be53]/20 rounded-2xl p-5 mb-8 text-left">
                <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">Which Printer Brands Are Available in UAE?</p>
                <p className="text-[#d3c5b0] text-sm leading-relaxed">
                  Sahara Office Equipments is an authorized dealer for 11 major printer and photocopier brands in UAE —
                  Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp, Epson, Samsung, Lexmark, and Konica Minolta. We offer
                  sales, rental from AED 250/month, AMC contracts, and on-site repair across Dubai, Sharjah, and Abu Dhabi.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {["11 Brands", "Sales & Rental", "AMC & Repair", "Free Toner", "Since 2012"].map((t) => (
                  <span key={t} className="text-xs font-bold text-white bg-[#f5be53]/10 border border-[#f5be53]/25 px-3 py-1.5 rounded-full">
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Brand Grid */}
        <section className="py-16 px-8 lg:px-24" style={{ background: '#050d1a' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">All Printer Brands — UAE Authorized Dealer</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {brands.map((brand) => (
                <a
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="glass-card rounded-2xl p-6 hover:border-[#f5be53]/40 transition-all group"
                >
                  <div className="text-4xl mb-3">{brand.icon}</div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#f5be53] transition-colors mb-1">
                    {brand.name}
                  </h3>
                  <p className="text-[#f5be53] text-xs font-semibold mb-2">{brand.tagline}</p>
                  <p className="text-[#d3c5b0] text-sm leading-relaxed">{brand.desc}</p>
                  <div className="mt-4 text-[#f5be53] text-sm font-semibold flex items-center gap-1">
                    View {brand.name} Products →
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-8 lg:px-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
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

        {/* CTA */}
        <section className="py-16 px-8 lg:px-24 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Need Help Choosing a Printer Brand?</h2>
            <p className="text-[#d3c5b0] mb-8">Our experts will recommend the right brand and model for your office volume, budget, and workflow.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/rental-calculator/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                Get a Free Quote
              </a>
              <a href="/contact/" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                Talk to an Expert
              </a>
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
