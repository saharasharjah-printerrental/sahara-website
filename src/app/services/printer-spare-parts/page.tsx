export const runtime = 'edge';
export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { getRequestContext } from "@cloudflare/next-on-pages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import SparePartsCartClient from "@/components/SparePartsCartClient";
import { VerifiedUser, LocalShipping, Inventory } from "@mui/icons-material";
import { normalizeR2Url } from "@/lib/r2url";
import { resolveSupplyPrice } from "@/lib/price";

export const metadata: Metadata = {
  title: "Printer Toner & Spare Parts UAE | Toner Cartridges Dubai | Sahara",
  description: "Buy genuine toner cartridges, ink cartridges & printer spare parts in UAE. Canon, HP, Ricoh, Kyocera toners and ink. Same-day delivery Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
  keywords: "toner cartridges uae, printer toner ink dubai, toners and ink cartridges, cartridge and toner, toner for printer, ink cartridge near me, printer ink cartridges near me, printer spare parts uae, canon toner uae, hp toner uae, printer consumables dubai, opc drum uae, maintenance kit uae",
  openGraph: {
    title: "Printer Spare Parts & Toner UAE | Sahara Office Equipments",
    description: "Genuine OEM printer supplies: toners, drums, maintenance kits, and spare parts for Canon, HP, Ricoh, Kyocera. Same-day UAE delivery.",
    url: "https://www.saharaprinter.com/services/printer-spare-parts/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/heroPrntr1.webp",
        width: 1200,
        height: 630,
        alt: "Printer Spare Parts & Toner UAE — Sahara Office Equipments",
      },
    ],
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/printer-spare-parts/" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Printer Spare Parts & Toner Supplies UAE",
  "description": "Genuine OEM printer toners, drums, maintenance kits, and spare parts for enterprise printers and photocopiers. Canon, HP, Ricoh, Kyocera.",
  "brand": { "@type": "Brand", "name": "Sahara Office Equipments" },
  "offers": { "@type": "AggregateOffer", "priceCurrency": "AED" },
};

const defaultSupplies = [
  { id: "1", name: "Canon C5045/5051/5250/5255 Toner Premium Black C-EXV 28", brand: "Canon", category: "Toner" as const, compatibleModels: "C5045, C5051, C5250, C5255", color: "Black", yield: "25,000 pages", price: "Contact for Pricing", stock: 50, image: "", isActive: true },
  { id: "2", name: "Canon C5045/5051/5250/5255 Toner Premium Cyan C-EXV 28", brand: "Canon", category: "Toner" as const, compatibleModels: "C5045, C5051, C5250, C5255", color: "Cyan", yield: "25,000 pages", price: "Contact for Pricing", stock: 50, image: "", isActive: true },
  { id: "3", name: "Canon C5045/5051/5250/5255 Toner Premium Yellow C-EXV 28", brand: "Canon", category: "Toner" as const, compatibleModels: "C5045, C5051, C5250, C5255", color: "Yellow", yield: "25,000 pages", price: "Contact for Pricing", stock: 50, image: "", isActive: true },
  { id: "4", name: "Canon C5045/5051/5250/5255 Toner Premium Magenta C-EXV 28", brand: "Canon", category: "Toner" as const, compatibleModels: "C5045, C5051, C5250, C5255", color: "Magenta", yield: "25,000 pages", price: "Contact for Pricing", stock: 50, image: "", isActive: true },
  { id: "5", name: "Canon C5035/5040/5235/5240 Toner Premium Black C-EXV 29", brand: "Canon", category: "Toner" as const, compatibleModels: "C5035, C5040, C5235, C5240", color: "Black", yield: "23,000 pages", price: "Contact for Pricing", stock: 30, image: "", isActive: true },
  { id: "6", name: "Canon C5035/5040/5235/5240 Toner Premium Cyan C-EXV 29", brand: "Canon", category: "Toner" as const, compatibleModels: "C5035, C5040, C5235, C5240", color: "Cyan", yield: "23,000 pages", price: "Contact for Pricing", stock: 30, image: "", isActive: true },
  { id: "7", name: "Canon C5035/5040/5235/5240 Toner Premium Yellow C-EXV 29", brand: "Canon", category: "Toner" as const, compatibleModels: "C5035, C5040, C5235, C5240", color: "Yellow", yield: "23,000 pages", price: "Contact for Pricing", stock: 30, image: "", isActive: true },
  { id: "8", name: "Canon C5035/5040/5235/5240 Toner Premium Magenta C-EXV 29", brand: "Canon", category: "Toner" as const, compatibleModels: "C5035, C5040, C5235, C5240", color: "Magenta", yield: "23,000 pages", price: "Contact for Pricing", stock: 30, image: "", isActive: true },
  { id: "9", name: "Compatible C-EXV51 Toner Cartridge for imageRUNNER Advance C5535/C5540/C5550/C5560", brand: "Canon", category: "Toner" as const, compatibleModels: "C5535, C5540, C5550, C5560", color: "Black", yield: "36,000 pages", price: "Contact for Pricing", stock: 25, image: "", isActive: true },
  { id: "10", name: "Long Life OPC Drum for Canon IR ADVANCE C5535 C5540 C5550 C5560", brand: "Canon", category: "Drum" as const, compatibleModels: "C5535, C5540, C5550, C5560, IRC 5535, 5540, 5550", yield: "150,000 pages", price: "Contact for Pricing", stock: 15, image: "", isActive: true },
  { id: "11", name: "Long Life OPC Drum for Canon IR ADVANCE C5235 C5240 C5250 C5255", brand: "Canon", category: "Drum" as const, compatibleModels: "C5235, C5240, C5250, C5255", yield: "120,000 pages", price: "Contact for Pricing", stock: 15, image: "", isActive: true },
  { id: "12", name: "Canon C5045/5250/5550 Paper Pickup Rollers", brand: "Canon", category: "Spare Part" as const, compatibleModels: "C5045, C5250, C5550", yield: "N/A", price: "Contact for Pricing", stock: 20, image: "", isActive: true },
  { id: "13", name: "Canon iR ADVANCE Maintenance Kit", brand: "Canon", category: "Maintenance Kit" as const, compatibleModels: "C5030, C5035, C5045, C5051, C5235, C5240, C5250, C5255", yield: "300,000 pages", price: "Contact for Pricing", stock: 10, image: "", isActive: true },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services/printer-rental/" },
    { "@type": "ListItem", "position": 3, "name": "Printer Spare Parts", "item": "https://www.saharaprinter.com/services/printer-spare-parts/" },
  ],
};

// Server-render the live D1 catalog so Googlebot (and first paint) sees real
// prices/stock instead of the static "Contact for Pricing" fallback below.
// SparePartsCartClient still re-fetches client-side for realtime updates;
// this is only the pre-hydration value.
async function getLiveSupplies() {
  try {
    const db = (getRequestContext().env as any)?.DB;
    if (!db) return defaultSupplies;
    const result = await db.prepare(
      "SELECT * FROM supplies WHERE isActive = 1 ORDER BY name ASC"
    ).all();
    const rows = result?.results ?? [];
    if (!rows.length) return defaultSupplies;
    return rows.map((s: any) => {
      const resolved = resolveSupplyPrice(s);
      return {
        id: String(s.id),
        name: s.name,
        brand: s.brand || "",
        category: s.category,
        compatibleModels: s.compatibleModels || "",
        color: s.color || "",
        yield: s.yield || "",
        price: resolved.display,
        stock: s.stock ?? 0,
        image: normalizeR2Url(s.image || ""),
        alt_text: s.alt_text || "",
        image_width: s.image_width || 800,
        image_height: s.image_height || 800,
        isActive: true,
        slug: s.slug || "",
      };
    });
  } catch {
    return defaultSupplies;
  }
}

export default async function PrinterSparePartsPage() {
  const supplies = await getLiveSupplies();
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <main className="min-h-screen bg-[#071325]">
        <Header />

        <section className="relative pt-32 pb-16 px-8 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5be53]/10 rounded-full blur-[150px]" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Genuine Supplies</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
                Printer <span className="text-[#f5be53]">Spare Parts</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] max-w-xl">
                Browse our complete inventory of OEM toners, drums, maintenance kits, and spare parts. Same-day delivery across UAE.
              </p>
            </div>
          </div>
        </section>

        <SparePartsCartClient defaultSupplies={supplies} />

        <section className="py-16 px-8 lg:px-24 bg-[#101c2e]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: VerifiedUser, title: "Genuine OEM", desc: "Only original manufacturer supplies for optimal performance" },
                { icon: LocalShipping, title: "Same-Day Delivery", desc: "Express delivery across Dubai, Abu Dhabi, and Sharjah" },
                { icon: Inventory, title: "Bulk Pricing", desc: "Volume discounts for businesses with multiple devices" },
                { icon: Inventory, title: "Auto-Replenishment", desc: "Automatic toner delivery based on usage tracking" },
              ].map((b, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl text-center">
                  <b.icon className="text-3xl text-[#f5be53] mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                  <p className="text-slate-400 text-sm">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-8 lg:px-24">
          <div className="max-w-4xl mx-auto space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Genuine toner and parts for UAE offices</h2>
              <p className="text-[#d3c5b0] leading-relaxed mb-4">
                Sahara supplies original manufacturer toner cartridges, drums, maintenance kits and replacement parts
                for Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp and Epson equipment. We stock the consumables for
                the models we place on rental and AMC, which means the part you need is usually already on our shelf in
                Sharjah rather than on a two-week order from abroad.
              </p>
              <p className="text-[#d3c5b0] leading-relaxed">
                We supply OEM consumables only. Compatible and refilled cartridges are cheaper per unit, but in UAE
                office conditions they are the most common cause of drum damage, streaking and fuser failure — and
                they void manufacturer warranty cover. The saving rarely survives the first service call.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">What we stock</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  ["Toner cartridges", "Black and full colour sets for Canon imageRUNNER, Kyocera TASKalfa, HP LaserJet, Ricoh MP and Xerox AltaLink series."],
                  ["OPC drums", "Long-life drum units, including high-yield options rated well beyond standard cartridge life."],
                  ["Maintenance kits", "Fuser, transfer and roller kits for scheduled preventive servicing at manufacturer-specified intervals."],
                  ["Spare parts", "Pickup rollers, separation pads, fusers and feed assemblies for the models we service."],
                ].map(([title, desc]) => (
                  <div key={title} className="glass-card rounded-2xl p-5">
                    <h3 className="text-white font-bold mb-2">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Delivery across the UAE</h2>
              <p className="text-[#d3c5b0] leading-relaxed">
                Same-day delivery is available across{" "}
                <a href="/photocopier-rental-sharjah/" className="text-[#f5be53] hover:underline">Sharjah</a>,{" "}
                <a href="/printer-rental-dubai/" className="text-[#f5be53] hover:underline">Dubai</a> and{" "}
                <a href="/printer-rental-abu-dhabi/" className="text-[#f5be53] hover:underline">Abu Dhabi</a> for orders
                placed during working hours, and next-day to{" "}
                <a href="/printer-rental-al-ain/" className="text-[#f5be53] hover:underline">Al Ain</a>,{" "}
                <a href="/printer-rental-fujairah/" className="text-[#f5be53] hover:underline">Fujairah</a>,{" "}
                <a href="/printer-rental-rak/" className="text-[#f5be53] hover:underline">Ras Al Khaimah</a>, Ajman and
                Umm Al Quwain. Bulk pricing applies to volume orders and to businesses running several devices.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">You may not need to buy toner at all</h2>
              <p className="text-[#d3c5b0] leading-relaxed">
                Toner is included at no extra cost on every Sahara{" "}
                <a href="/services/printer-rental/" className="text-[#f5be53] hover:underline">printer rental</a> and{" "}
                <a href="/services/photocopier-rental/" className="text-[#f5be53] hover:underline">photocopier rental</a>{" "}
                contract, with usage monitored remotely so replacements arrive before you run out. Buying consumables
                separately makes sense if you own your equipment outright — in which case an{" "}
                <a href="/services/amc/" className="text-[#f5be53] hover:underline">annual maintenance contract</a>{" "}
                usually works out cheaper than purchasing toner and paying for{" "}
                <a href="/services/repair/" className="text-[#f5be53] hover:underline">repairs</a> ad hoc.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Pricing</h2>
              <p className="text-[#d3c5b0] leading-relaxed">
                Consumables pricing in the UAE moves with supply and exchange rates, so we quote current rates rather
                than publishing fixed ones. Send us your device model or the part number from the cartridge you are
                replacing and we will confirm availability and price, usually the same working day. Call{" "}
                <a href="tel:+971503823969" className="text-[#f5be53] hover:underline">+971 50 382 3969</a> or use the
                enquiry form.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto rounded-panel gold-gradient p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">Need Supplies?</h2>
            <p className="text-[#483200] text-lg mb-8">Same-day delivery across the UAE</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/rental-calculator/" className="bg-[#071325] text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">Request Quote</a>
              <a href="/contact/" className="bg-[#c8962e]/20 border border-[#483200]/30 text-[#412d00] px-10 py-4 rounded-full font-bold text-lg backdrop-blur-sm">Contact Support</a>
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