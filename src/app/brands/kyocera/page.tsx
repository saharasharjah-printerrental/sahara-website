"use client";

export const runtime = 'edge';

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";
import Image from "next/image";

export default function KyoceraBrandPage() {
  const products = [
    { name: "TASKalfa 2554ci", specs: ["25 PPM", "Color A3"], img: "/images/printer-kyocera.webp" },
    { name: "TASKalfa 4054ci", specs: ["40 PPM", "Color A3"], img: "/images/printer-kyocera.webp" },
    { name: "TASKalfa 5054ci", specs: ["50 PPM", "Color A3"], img: "/images/printer-kyocera.webp" },
  ];

  const features = [
    { icon: "savings", title: "Lowest TCO", desc: "Industry's lowest cost per page with long-life components and ECOSYS technology." },
    { icon: "eco", title: "Eco-Friendly", desc: "Free from toxic chemicals, using reusable amorphous silicon drums." },
    { icon: "trusted", title: "Japanese Quality", desc: "Decades of precision engineering from Kyocera's Japanese manufacturing." },
    { icon: "hardware", title: "Durable Design", desc: "Built to last 100,000+ pages with minimal maintenance requirements." },
  ];

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#f5be53]/10 blur-[120px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#142032]/60 border border-[#f5be53]/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#f5be53] animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest text-[#f5be53] font-medium">ECOSYS Technology</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Kyocera Authorized <span className="text-[#f5be53]">Partner</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl leading-relaxed">
                Experience the lowest total cost of ownership in the industry. Kyocera's ECOSYS technology delivers exceptional reliability and eco-friendly printing solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/get-quote?brand=kyocera" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform inline-block shadow-xl shadow-[#f5be53]/20">
                  Enquire for Kyocera Models
                </a>
                <a href="#products" className="glass-card text-white px-8 py-4 rounded-full font-bold hover:bg-[#2a3548] transition-all border border-[#f5be53]/20 inline-block">
                  View Products
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-[#f5be53]/10 blur-[120px] rounded-full"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#030e20]">
                <Image
                  src="/images/printer-kyocera.webp"
                  alt="Kyocera TASKalfa Printer"
                  width={540}
                  height={540}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Kyocera */}
      <section className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Kyocera</h2>
            <p className="text-[#d3c5b0] max-w-2xl mx-auto">The smart choice for businesses focused on minimizing operating costs while maximizing reliability.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#142032]/60 flex items-center justify-center border border-[#f5be53]/20 mb-4">
                  <span className="material-symbols-outlined text-3xl text-[#f5be53]">{f.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-[#d3c5b0]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">TASKalfa Series</h2>
            <div className="h-1 w-20 bg-[#f5be53] rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <div key={i} className="glass-card rounded-[32px] p-8 group hover:-translate-y-2 transition-transform duration-500">
                <div className="relative aspect-square mb-8 rounded-2xl overflow-hidden bg-[#101c2e]">
                  <Image src={p.img} alt={p.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                <p className="text-[#d3c5b0] text-sm mb-6">Lowest cost per page in its class with legendary Kyocera reliability.</p>
                <div className="flex justify-between items-center py-4 border-t border-white/5">
                  {p.specs.map((s, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#f5be53] text-sm">speed</span>
                      <span className="text-xs text-[#d3c5b0]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TCO Comparison */}
      <section className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Total Cost of Ownership</h2>
            <p className="text-[#d3c5b0] max-w-2xl mx-auto">Kyocera saves you money over the lifetime of your printer</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card rounded-[32px] p-8 text-center">
              <div className="text-5xl font-bold text-[#f5be53] mb-2">70%</div>
              <p className="text-white font-medium">Lower Cost Per Page</p>
              <p className="text-sm text-[#d3c5b0] mt-2">Compared to traditional laser printers</p>
            </div>
            <div className="glass-card rounded-[32px] p-8 text-center">
              <div className="text-5xl font-bold text-[#f5be53] mb-2">100K</div>
              <p className="text-white font-medium">Page Drum Life</p>
              <p className="text-sm text-[#d3c5b0] mt-2">Long-life amorphous silicon drums</p>
            </div>
            <div className="glass-card rounded-[32px] p-8 text-center">
              <div className="text-5xl font-bold text-[#f5be53] mb-2">0</div>
              <p className="text-white font-medium">Waste Toner</p>
              <p className="text-sm text-[#d3c5b0] mt-2">No waste toner container needed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto glass-card rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#f5be53]/5 -z-10"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Save More with <span className="text-[#f5be53]">Kyocera</span></h2>
          <p className="text-[#d3c5b0] mb-10 max-w-2xl mx-auto text-lg">Get a custom TCO analysis for your office and see how much Kyocera can save you.</p>
          <a href="/get-quote?brand=kyocera" className="px-12 py-5 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-[#f5be53]/30 inline-block">
            Get Kyocera Quote
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
