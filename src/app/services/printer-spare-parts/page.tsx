export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import SparePartsCartClient from "@/components/SparePartsCartClient";
import { VerifiedUser, LocalShipping, Inventory } from "@mui/icons-material";

export const metadata: Metadata = {
  title: "Printer Spare Parts & Toner UAE | OEM Supplies | Sahara",
  description: "Buy genuine printer spare parts, toners, and consumables in UAE. Canon, HP, Ricoh toners, OPC drums, maintenance kits. Same-day delivery across Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
  keywords: "printer spare parts uae, toner cartridge uae, canon toner uae, hp toner uae, printer consumables dubai, opc drum uae, maintenance kit uae",
  openGraph: {
    title: "Printer Spare Parts & Toner UAE | Sahara Office Equipments",
    description: "Genuine OEM printer supplies: toners, drums, maintenance kits, and spare parts for Canon, HP, Ricoh, Kyocera. Same-day UAE delivery.",
    url: "https://www.saharaprinter.com/services/printer-spare-parts/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
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

export default function PrinterSparePartsPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <link rel="canonical" href="https://www.saharaprinter.com/services/printer-spare-parts/" />
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

        <SparePartsCartClient defaultSupplies={defaultSupplies} />

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

        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto rounded-[3rem] gold-gradient p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">Need Supplies?</h2>
            <p className="text-[#483200] text-lg mb-8">Same-day delivery across the UAE</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/get-quote" className="bg-[#071325] text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">Request Quote</a>
              <a href="/contact" className="bg-[#c8962e]/20 border border-[#483200]/30 text-[#412d00] px-10 py-4 rounded-full font-bold text-lg backdrop-blur-sm">Contact Support</a>
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