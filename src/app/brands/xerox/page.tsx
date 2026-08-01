"use client";

export const runtime = 'edge';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import Image from "next/image";

export default function XeroxBrandPage() {
  const products = [
    { name: "VersaLink C235", type: "Color Multifunction", speed: "33 ppm", img: "/images/printer-xerox.webp" },
    { name: "VersaLink C405", type: "Color Multifunction", speed: "45 ppm", img: "/images/printer-xerox.webp" },
  ];

  const features = [
    { icon: "cloud_sync", title: "ConnectKey Technology", desc: "Embedded apps and cloud connectivity for modern workflows" },
    { icon: "fingerprint", title: "Security Excellence", desc: "Comprehensive protection and compliance features" },
    { icon: "integration_instructions", title: "Easy Integration", desc: "Seamless connection to business workflows" },
    { icon: "auto_awesome", title: "Premium Print Quality", desc: "Industry-leading color accuracy and finishing options" },
  ];

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5be53]/10 rounded-full blur-[150px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#142032]/60 border border-[#f5be53]/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#f5be53] animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#f5be53]">Authorized Partner</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-none tracking-tight">
                Smart Workplace <span className="text-[#f5be53]">Solutions</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl leading-relaxed">
                Xerox authorized partner offering VersaLink and Altalink series with revolutionary ConnectKey technology. Transform your workplace with intelligent document solutions.
              </p>
              <a href="/rental-calculator/?brand=xerox" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform inline-block shadow-xl shadow-[#f5be53]/20">
                Enquire Now
              </a>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-[#f5be53]/10 blur-[120px] rounded-full"></div>
              <Image
                src="/images/printer-xerox.webp"
                alt="Xerox VersaLink Printer"
                width={600}
                height={600}
                className="w-full h-auto rounded-3xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Xerox?</h2>
            <p className="text-[#d3c5b0] max-w-2xl mx-auto">Pioneering innovation in workplace technology for over a century. Experience the future of printing.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl text-center">
                <span className="material-symbols-outlined text-4xl text-[#f5be53] mb-4">{f.icon}</span>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[#d3c5b0] text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Featured Solutions</h2>
            <div className="h-1 w-20 bg-[#f5be53] rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((p, i) => (
              <div key={i} className="glass-card rounded-[32px] overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                <div className="relative aspect-video bg-[#101c2e] overflow-hidden">
                  <Image src={p.img} alt={p.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{p.name}</h3>
                  <div className="flex justify-between text-sm text-[#d3c5b0]">
                    <span>{p.type}</span>
                    <span className="text-[#f5be53]">{p.speed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto glass-card rounded-[3rem] p-12 md:p-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Transform Your Workplace</h2>
          <p className="text-[#d3c5b0] mb-8">Get a customized quote for Xerox printers tailored to your business needs.</p>
          <a href="/rental-calculator/?brand=xerox" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform inline-block">
            Enquire for Xerox Models
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}