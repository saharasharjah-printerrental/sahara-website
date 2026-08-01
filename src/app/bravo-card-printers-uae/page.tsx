export const runtime = 'edge';
import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import BravoFaqClient from "@/components/BravoFaqClient";

export const metadata: Metadata = {
  title: "Bravo Card Printers UAE | RTAI & DC 3300 | Sahara Office Equipments",
  description: "Buy the Bravo RTAI retransfer printer & Bravo DC 3300 direct-to-card printer in UAE. Authorised retail partner. 600 DPI, holographic film, 3-year warranty. Dubai, Sharjah & Abu Dhabi. ☎ +971503823969",
  keywords: "bravo card printer uae, bravo rtai uae, bravo dc 3300 uae, id card printer dubai, card printer sharjah, retransfer card printer uae, bravo global uae, id printer dubai",
  openGraph: {
    title: "Bravo Card Printers UAE | RTAI & DC 3300 | Sahara",
    description: "Authorised UAE retail partner for the Bravo RTAI retransfer printer and Bravo DC 3300. 600 DPI, holographic film, 3-year warranty. Dubai & Sharjah.",
    url: "https://www.saharaprinter.com/bravo-card-printers-uae/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/brands/bravo/bravo-rtai-page1.webp", width: 600, height: 848 }],
  },
  alternates: { canonical: "https://www.saharaprinter.com/bravo-card-printers-uae/" },
};

const rtaiSpecs = [
  { label: "Printing Method", value: "Colour dye sublimation retransfer" },
  { label: "Resolution", value: "600 DPI — over-the-edge printing" },
  { label: "Print Speed", value: "Single side: 25 sec | Double side: 55 sec" },
  { label: "Input Hopper", value: "250 cards — add cards while printing" },
  { label: "Card Thickness", value: "0.5 – 1.0 mm" },
  { label: "Card Formats", value: "PVC, ABSS, PET, PET-G, PC, Wooden, Translucent (ISO ID-1/CR-80)" },
  { label: "Security Features", value: "SOC technology, RFID ribbon, Card Feeder Lock" },
  { label: "Interface", value: "USB 2.0, Ethernet 10/100 Duplex" },
  { label: "Certifications", value: "UL, FCC, CE, KCC, CCC" },
  { label: "Power Supply", value: "Auto 100–240 V, 50/60 Hz" },
  { label: "Dimensions", value: "12.25″ (L) × 13.25″ (W) × 17″ (H) — 22 kg" },
  { label: "Warranty", value: "3 years | Lifetime print head" },
];

const dc3300Specs = [
  { label: "Printing Method", value: "Colour dye sublimation — direct to card" },
  { label: "Resolution", value: "300×300 & 300×600 dpi (colour); 300×1200 dpi (mono)" },
  { label: "Print Speed", value: "Up to 280 cards/hr (YMCKO single) | 170 cards/hr (duplex)" },
  { label: "Feeder Capacity", value: "100 cards (0.76 mm / 30 mil)" },
  { label: "Card Types", value: "PVC, composite PVC, PET, ABS, rewritable" },
  { label: "Interface", value: "USB (included) + Ethernet" },
  { label: "Security", value: "Kensington® lock, print-head protection, memory wipe" },
  { label: "Lamination", value: "Optional module — varnish, patch, generic or custom holograms" },
  { label: "Encoding", value: "Magnetic stripe ISO 7811, contact & contactless smartcard" },
  { label: "Software", value: "Bravo Premium Suite (Windows, Mac, Linux) + Designer XXS bundled" },
  { label: "Origin", value: "Made in France" },
  { label: "Warranty", value: "3 years | Extended warranty available" },
];

const comparison = [
  { feature: "Technology", rtai: "Retransfer (reverse transfer)", dc3300: "Direct to card" },
  { feature: "Resolution", rtai: "600 DPI", dc3300: "Up to 300×1200 DPI (mono)" },
  { feature: "Over-the-edge print", rtai: "Yes — borderless", dc3300: "Standard border" },
  { feature: "Holographic film", rtai: "Yes — standard & custom", dc3300: "Via lamination module" },
  { feature: "Card media", rtai: "PVC, PET, PET-G, PC, Wood, Translucent", dc3300: "PVC, PET, ABS, Rewritable" },
  { feature: "Input hopper", rtai: "250 cards", dc3300: "100 cards" },
  { feature: "Duplex", rtai: "Built-in", dc3300: "Simplex or Duplex model / upgrade key" },
  { feature: "Lamination (built-in)", rtai: "Yes — retransfer film acts as lam", dc3300: "Optional add-on module" },
  { feature: "Origin", rtai: "Bravo Global", dc3300: "Made in France" },
  { feature: "Best for", rtai: "High-security & specialty cards", dc3300: "High-volume standard ID printing" },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sahara Office Equipments — Bravo UAE Retail Partner",
  "description": "Authorised UAE retail partner for the Bravo RTAI retransfer printer and Bravo DC 3300 direct-to-card printer. Sales, genuine consumables, and on-site service across all UAE emirates.",
  "url": "https://www.saharaprinter.com/bravo-card-printers-uae/",
  "telephone": "+971503823969",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sahara Centre, Al Nahda",
    "addressLocality": "Sharjah",
    "addressRegion": "Sharjah",
    "addressCountry": "AE"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 25.2942534, "longitude": 55.4260483 },
  "areaServed": [
    { "@type": "City", "name": "Dubai" },
    { "@type": "City", "name": "Sharjah" },
    { "@type": "City", "name": "Abu Dhabi" }
  ],
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": ["https://www.bravoglobal.com"]
};

const rtaiProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Bravo RTAI Colour Reverse Transfer Card Printer",
  "description": "600 DPI retransfer card printer with holographic film capability, 250-card hopper, and HOLO-MET™ technology. Available in UAE through authorised retail partner Sahara Office Equipments.",
  "brand": { "@type": "Brand", "name": "Bravo Global" },
  "manufacturer": { "@type": "Organization", "name": "Bravo Global", "url": "https://www.bravoglobal.com" },
  "category": "ID Card Printer",
  "image": "https://www.saharaprinter.com/brands/bravo/bravo-rtai-page1.webp",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
    "seller": { "@type": "Organization", "name": "Sahara Office Equipments", "url": "https://www.saharaprinter.com" }
  }
};

const dc3300ProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Bravo DC 3300 Direct to Card Printer",
  "description": "Direct-to-card ID printer, Made in France, 280 cards/hr, simplex and duplex models. Available in UAE through authorised retail partner Sahara Office Equipments.",
  "brand": { "@type": "Brand", "name": "Bravo Global" },
  "manufacturer": { "@type": "Organization", "name": "Bravo Global", "url": "https://www.bravoglobal.com" },
  "category": "ID Card Printer",
  "image": "https://www.saharaprinter.com/brands/bravo/bravo-dc3300-page1.webp",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
    "seller": { "@type": "Organization", "name": "Sahara Office Equipments", "url": "https://www.saharaprinter.com" }
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.saharaprinter.com/products/" },
    { "@type": "ListItem", "position": 3, "name": "Bravo Card Printers UAE", "item": "https://www.saharaprinter.com/bravo-card-printers-uae/" }
  ]
};

export default function BravoCardPrintersUAE() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(rtaiProductSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dc3300ProductSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-[#071325]">
        <Header />

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325]/95 to-[#0d1a2e]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f5be53]/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
              <a href="/" className="hover:text-[#f5be53] transition-colors">Home</a>
              <span>/</span>
              <a href="/products" className="hover:text-[#f5be53] transition-colors">Products</a>
              <span>/</span>
              <span className="text-[#f5be53]">Bravo Card Printers</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-[#f5be53]/10 border border-[#f5be53]/30 text-[#f5be53] text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#f5be53] rounded-full animate-pulse" />
              Authorised UAE Retail Partner — RTAI &amp; DC 3300
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Bravo Card Printers<br />
              <span className="text-[#f5be53]">— UAE</span>
            </h1>
            <p className="text-xl text-[#d3c5b0] mb-6 max-w-2xl">
              Sahara Office Equipments is the <strong className="text-white">authorised UAE retail partner for the Bravo RTAI and Bravo DC 3300</strong> — supplying, installing, and servicing these two card printer models across Dubai, Sharjah, Abu Dhabi, and all emirates.
            </p>

            {/* AEO Answer Block */}
            <div className="border-l-4 border-[#f5be53] bg-[#f5be53]/6 rounded-r-2xl p-6 mb-10 max-w-3xl">
              <p className="text-xs font-bold text-[#f5be53] uppercase tracking-[0.18em] mb-2">Where can I buy Bravo card printers in the UAE?</p>
              <p className="text-[#d3c5b0] text-base leading-relaxed">
                Sahara Office Equipments (Sharjah) is the authorised UAE retail partner for two Bravo Global card printer models: the <strong className="text-white">Bravo RTAI</strong> (600 dpi retransfer, holographic film, 250-card hopper) and the <strong className="text-white">Bravo DC 3300</strong> (direct-to-card, Made in France, up to 280 cards/hr). Contact us for pricing, live demonstrations, and genuine consumables.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="/rental-calculator/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                Get a Quote
              </a>
              <a href="tel:+971503823969" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                Call: +971 50 382 3969
              </a>
            </div>
          </div>
        </section>

        {/* Partnership Statement */}
        <section className="py-14 px-6 bg-[#0a1422]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Authorised UAE Retail Partner",
                  desc: "Sahara is the authorised UAE retail partner for two specific Bravo Global models — the RTAI and the DC 3300. We stock both, handle all sales, warranty, and service in-country."
                },
                {
                  title: "Genuine Consumables",
                  desc: "We stock original Bravo ribbons, retransfer films, and cleaning kits in-country for fast replenishment with no import delays or counterfeit risk."
                },
                {
                  title: "Manufacturer-Backed Support",
                  desc: "Full 3-year warranty service, preventive maintenance, and trained technicians for the Bravo RTAI and DC 3300 across all UAE emirates."
                }
              ].map((item, i) => (
                <div key={i} className="glass-card p-7 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-[#f5be53]/15 flex items-center justify-center mb-4">
                    <span className="text-[#f5be53] font-bold text-lg">{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[#8fa3bc] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center">
              <a
                href="https://www.bravoglobal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[#f5be53]/30 bg-[#f5be53]/5 px-6 py-3 rounded-full text-sm text-[#f5be53] font-semibold hover:bg-[#f5be53]/10 transition-colors"
              >
                <span className="text-lg">🏅</span>
                Authorised UAE Retail Partner — Bravo RTAI &amp; DC 3300
                <span className="text-xs text-slate-500">(bravoglobal.com)</span>
              </a>
            </div>
          </div>
        </section>

        {/* Which Printer Is Right for You? */}
        <section className="py-16 px-6 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3 text-center">Which Bravo Printer Is Right for You?</h2>
            <p className="text-[#8fa3bc] text-center mb-10 max-w-2xl mx-auto">Both models are available through Sahara in UAE. The right choice depends on your security requirements and print volume.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-8 rounded-2xl border border-[#f5be53]/20">
                <span className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-3 block">Choose the Bravo RTAI if you need…</span>
                <ul className="space-y-2 text-[#d3c5b0] text-sm">
                  {[
                    "Maximum print quality — 600 DPI over-the-edge borderless cards",
                    "Built-in holographic security without a separate laminator",
                    "Specialty media: wooden, translucent, or PET-G cards",
                    "HOLO-MET™ metallic gold/silver ribbon effects",
                    "Government IDs, banking VIP cards, high-security credentials",
                    "Lifetime print head warranty for long-term ROI",
                  ].map((p, i) => <li key={i} className="flex gap-2"><span className="text-[#f5be53] mt-0.5">✓</span>{p}</li>)}
                </ul>
              </div>
              <div className="glass-card p-8 rounded-2xl border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 block">Choose the Bravo DC 3300 if you need…</span>
                <ul className="space-y-2 text-[#d3c5b0] text-sm">
                  {[
                    "High-volume throughput — up to 280 cards/hour",
                    "Lower cost per card for standard employee ID batches",
                    "Cross-platform software (Windows, Mac, Linux)",
                    "Flexible encoding: magnetic stripe, contact & contactless smartcard",
                    "Corporate ID, membership cards, campus credentials",
                    "Simplex-to-Duplex upgrade via software key (no hardware swap)",
                  ].map((p, i) => <li key={i} className="flex gap-2"><span className="text-emerald-400 mt-0.5">✓</span>{p}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bravo RTAI */}
        <section className="py-20 px-6 lg:px-24 bg-[#0a1422]" id="bravo-rtai">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-[#f5be53]/15 text-[#f5be53] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">Colour Reverse Transfer</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">Bravo RTAI</h2>
            <p className="text-[#8fa3bc] max-w-2xl mb-3">
              600 DPI over-the-edge retransfer printing. The only card printer in its class with built-in holographic retransfer, wooden card support, and HOLO-MET™ metallic lustre ribbons — no separate laminator required.
            </p>
            <p className="text-sm text-[#f5be53] font-semibold mb-8 italic">"When exclusivity matters" — Bravo Global</p>

            <div className="grid grid-cols-2 gap-4 mb-10 max-w-2xl">
              <div className="rounded-2xl overflow-hidden bg-[#0d1a2e] border border-white/8">
                <Image src="/brands/bravo/bravo-rtai-page1.webp" alt="Bravo RTAI retransfer card printer — Sahara UAE" width={600} height={848} className="w-full h-auto object-cover" priority />
              </div>
              <div className="rounded-2xl overflow-hidden bg-[#0d1a2e] border border-white/8">
                <Image src="/brands/bravo/bravo-rtai-page2.webp" alt="Bravo RTAI features and specifications" width={600} height={848} className="w-full h-auto object-cover" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {[
                { icon: "✦", title: "HOLO-MET™ Ribbons", desc: "Print metallic Silver and Gold on card — overt visual security, no hot-stamp module needed." },
                { icon: "🌿", title: "Wooden & Transparent Cards", desc: "Specially treated wooden cards supported — sustainable, distinctive, and eco-friendly ID." },
                { icon: "🔒", title: "Holographic Retransfer Film", desc: "Standard or custom holograms applied in-printer without a separate lamination module." },
                { icon: "🃏", title: "250-Card Hopper", desc: "Continuous high-volume operation — add cards mid-run without stopping the printer." },
                { icon: "🛡", title: "SOC Security Technology", desc: "Proprietary Secure On-Card technology with RFID ribbon and card-feeder lock." },
                { icon: "♾️", title: "Lifetime Print Head Warranty", desc: "Industry-leading protection — the print head is covered for the life of the printer." },
              ].map((f, i) => (
                <div key={i} className="glass-card p-5 rounded-xl">
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <h3 className="text-white font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-[#8fa3bc] text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Bravo RTAI Technical Specifications</h3>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <tbody>
                  {rtaiSpecs.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-[#0d1a2e]" : "bg-[#0a1422]"}>
                      <td className="px-5 py-3 text-[#8fa3bc] font-medium w-1/3">{row.label}</td>
                      <td className="px-5 py-3 text-white">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Bravo DC 3300 */}
        <section className="py-20 px-6 lg:px-24" id="bravo-dc3300">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-emerald-500/15 text-emerald-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">Made in France</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">Bravo DC 3300</h2>
            <p className="text-[#8fa3bc] max-w-2xl mb-8">
              High-throughput direct-to-card printer with lamination module, multi-encoding options, and cross-platform software. Available in Simplex (DC 3300 S) and Duplex (DC 3300 D).
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10 max-w-2xl">
              <div className="rounded-2xl overflow-hidden bg-[#0d1a2e] border border-white/8">
                <Image src="/brands/bravo/bravo-dc3300-page1.webp" alt="Bravo DC 3300 direct-to-card printer — UAE" width={600} height={848} className="w-full h-auto object-cover" priority />
              </div>
              <div className="rounded-2xl overflow-hidden bg-[#0d1a2e] border border-white/8">
                <Image src="/brands/bravo/bravo-dc3300-page2.webp" alt="Bravo DC 3300 specifications and features" width={600} height={848} className="w-full h-auto object-cover" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {[
                { icon: "🚀", title: "280 Cards / Hour", desc: "Industry-leading throughput for YMCKO single-sided printing — handles high-volume corporate ID batches." },
                { icon: "🇫🇷", title: "Made in France", desc: "European engineering and quality control — trusted by government, banking, and enterprise clients worldwide." },
                { icon: "📶", title: "Multi-Encoding", desc: "Magnetic stripe (ISO 7811), contact and contactless smartcard encoders — combinable, factory or on-site." },
                { icon: "🧩", title: "Lamination Module", desc: "Optional add-on for varnish, patch, or custom hologram overlaminates — 600 or 1,200 sides per roll." },
                { icon: "💻", title: "Cross-Platform Software", desc: "Bravo Premium Suite for Windows, Mac, and Linux. Bravo SDK available for system integration." },
                { icon: "🔑", title: "Simplex → Duplex Upgrade", desc: "Activate dual-side printing via software key — no hardware replacement needed." },
              ].map((f, i) => (
                <div key={i} className="glass-card p-5 rounded-xl">
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <h3 className="text-white font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-[#8fa3bc] text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Bravo DC 3300 Technical Specifications</h3>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <tbody>
                  {dc3300Specs.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-[#0d1a2e]" : "bg-[#0a1422]"}>
                      <td className="px-5 py-3 text-[#8fa3bc] font-medium w-1/3">{row.label}</td>
                      <td className="px-5 py-3 text-white">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RTAI vs DC 3300 Comparison */}
        <section className="py-20 px-6 lg:px-24 bg-[#0a1422]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-3">RTAI vs DC 3300 — Full Comparison</h2>
            <p className="text-[#8fa3bc] text-center mb-12 max-w-xl mx-auto">
              Both models are available through Sahara in UAE. Choose based on your card security requirements and print volume.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0d1a2e]">
                    <th className="px-5 py-4 text-left text-[#8fa3bc] font-semibold">Feature</th>
                    <th className="px-5 py-4 text-left text-[#f5be53] font-semibold">Bravo RTAI</th>
                    <th className="px-5 py-4 text-left text-emerald-400 font-semibold">Bravo DC 3300</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-[#0a1422]" : "bg-[#071325]"}>
                      <td className="px-5 py-3 text-[#8fa3bc] font-medium">{row.feature}</td>
                      <td className="px-5 py-3 text-white">{row.rtai}</td>
                      <td className="px-5 py-3 text-white">{row.dc3300}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-6 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-3">Who Uses Bravo Card Printers in UAE?</h2>
            <p className="text-[#8fa3bc] text-center mb-12 max-w-xl mx-auto">From Dubai government offices to Sharjah free zone enterprises — Bravo printers serve identity credentialing at every level.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { sector: "Government & Public Sector", uses: "National IDs, employee access cards, resident identity documents with overt security features. Common in Dubai and Abu Dhabi government entities." },
                { sector: "Banking & Finance", uses: "Staff ID cards, VIP client cards, access credentials with RFID/smartcard encoding. Used by UAE banks and DIFC financial institutions." },
                { sector: "Corporate Enterprises", uses: "Employee ID badges with photo, department, and barcode/QR for access control systems across free zones and business parks." },
                { sector: "Healthcare", uses: "Patient ID bands, staff credentials, pharmacy dispensing cards with encoded data. Common in Dubai Health Authority-affiliated facilities." },
                { sector: "Education", uses: "Student and staff cards for UAE universities, schools, and training institutes — including KHDA-registered institutions." },
                { sector: "Hospitality & Events", uses: "Membership cards, loyalty cards, event credentials, RFID room keys — for hotels, exhibition centres, and large events in Dubai and Sharjah." },
              ].map((item, i) => (
                <div key={i} className="glass-card p-7 rounded-2xl">
                  <h3 className="text-white font-bold text-base mb-2">{item.sector}</h3>
                  <p className="text-[#8fa3bc] text-sm leading-relaxed">{item.uses}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consumables Section */}
        <section className="py-16 px-6 bg-[#0a1422]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3 text-center">Genuine Bravo Consumables — In Stock UAE</h2>
            <p className="text-[#8fa3bc] text-center mb-10 max-w-2xl mx-auto">
              As the authorised retail partner for these two Bravo models, Sahara stocks genuine consumables locally — no waiting on international shipments. Avoid uncertified third-party ribbons that can void your warranty.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "YMCKO Colour Ribbons", models: "RTAI & DC 3300", desc: "Full-colour plus overlay for protection and shine." },
                { name: "Retransfer Film", models: "RTAI only", desc: "Genuine Bravo retransfer film including holographic variants." },
                { name: "HOLO-MET™ Ribbons", models: "RTAI only", desc: "Metallic gold and silver ribbon for premium card effects." },
                { name: "Cleaning Kits", models: "RTAI & DC 3300", desc: "Roller and hopper cleaning cards to maintain print quality." },
              ].map((c, i) => (
                <div key={i} className="glass-card p-5 rounded-xl">
                  <h3 className="text-white font-semibold text-sm mb-1">{c.name}</h3>
                  <span className="text-[#f5be53] text-xs font-bold block mb-2">{c.models}</span>
                  <p className="text-[#8fa3bc] text-xs">{c.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href="/rental-calculator/" className="inline-block bg-[#f5be53]/10 border border-[#f5be53]/30 text-[#f5be53] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#f5be53]/20 transition-colors">
                Order Consumables →
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f5be53] to-[#c8962e] p-12 md:p-16 relative overflow-hidden text-center">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-[#5a3d00] text-sm font-bold uppercase tracking-[0.18em] mb-3">Authorised UAE Retail Partner</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#412d00] mb-5">Get a Bravo Printer Demo</h2>
              <p className="text-[#5a3d00] text-lg mb-8 max-w-xl mx-auto">
                As the authorised UAE retail partner for the Bravo RTAI and DC 3300, we offer on-site demonstrations, live card printing samples, and tailored pricing for your organisation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/rental-calculator/" className="bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                  Request a Demo
                </a>
                <a href="tel:+971503823969" className="bg-[#c8962e]/20 border border-[#483200]/30 text-[#412d00] px-10 py-5 rounded-full font-bold text-lg">
                  +971 50 382 3969
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-[#8fa3bc]">Common questions about Bravo card printers in the UAE.</p>
          </div>
          <BravoFaqClient />
        </section>

        {/* Related */}
        <section className="py-12 px-6 lg:px-24 border-t border-[#f5be53]/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">Related Products &amp; Services</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/products", label: "Office Printers UAE" },
                { href: "/services/printer-rental", label: "Printer Rental UAE" },
                { href: "/services/amc", label: "Printer AMC Dubai" },
                { href: "/services/repair", label: "Printer Repair Dubai" },
                { href: "/get-quote", label: "Get a Quote" },
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
