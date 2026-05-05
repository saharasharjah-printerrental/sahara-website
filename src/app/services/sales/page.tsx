"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";
import { Inventory2, Verified, SupportAgent, Calculate, Print } from "@mui/icons-material";

export default function SalesPage() {
  const products = [
    { name: "HP LaserJet Enterprise M608", type: "Monochrome Laser", speed: "65 ppm", brand: "HP" },
    { name: "Canon imageRUNNER ADVANCE C5735", type: "Color Multifunction", speed: "35 ppm", brand: "Canon" },
    { name: "Ricoh MP C6004", type: "Color Multifunction", speed: "60 ppm", brand: "Ricoh" },
    { name: "Xerox VersaLink C405", type: "Color Laser", speed: "45 ppm", brand: "Xerox" },
    { name: "Brother MFC-L8900CDW", type: "Color Laser", speed: "32 ppm", brand: "Brother" },
    { name: "Sharp MX-6070N", type: "Color Multifunction", speed: "60 ppm", brand: "Sharp" },
  ];

  const features = [
    { icon: Inventory2, title: "In Stock", desc: "Ready-to-ship inventory with next-day delivery across UAE" },
    { icon: Verified, title: "Warranty", desc: "Comprehensive manufacturer warranty on all equipment" },
    { icon: SupportAgent, title: "Installation", desc: "Professional on-site setup and network configuration" },
    { icon: Calculate, title: "Trade-In", desc: "Old device trade-in program with competitive valuations" },
  ];

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#f5be53]/10 rounded-full blur-[150px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Premium Equipment</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                Buy <span className="text-[#f5be53]">Printers</span> & Copiers
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl">
                Direct from authorized distributors. Full warranty, installation support, and after-sales service. Enterprise-grade solutions for every budget.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/get-quote" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                  Request Pricing
                </a>
                <a href="/products" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                  View Catalog
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="glass-card rounded-3xl p-8">
                <img
                  src="/images/printer-hp.svg"
                  alt="HP LaserJet enterprise printer for sale UAE Dubai"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-24 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl">
                <f.icon className="text-4xl text-[#f5be53] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[#d3c5b0]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Equipment</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <div key={i} className="glass-card rounded-3xl overflow-hidden group">
                <div className="h-48 bg-[#142032] flex items-center justify-center">
                  <Print className="text-[60px] text-slate-500" />
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">{p.brand}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.name}</h3>
                  <div className="flex justify-between text-sm text-[#d3c5b0]">
                    <span>{p.type}</span>
                    <span>{p.speed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] gold-gradient p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">Need a Custom Solution?</h2>
          <p className="text-[#483200] text-lg mb-8">Our team will help you find the perfect equipment for your needs</p>
          <a href="/get-quote" className="inline-block bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
            Get Expert Advice
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
      <MobileNav />
    </main>
  );
}