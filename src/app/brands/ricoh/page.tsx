"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";
import Image from "next/image";

export default function RicohBrandPage() {
  const products = [
    { name: "MP 4055", type: "B&W Multifunction", SpeedIcon: "55 ppm", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ricoh_5055_MFP.jpg/500px-Ricoh_5055_MFP.jpg" },
    { name: "IM C2000", type: "Color Smart MFP", SpeedIcon: "20 ppm", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/RICOH_Aficio_MP_C3002_Color_Laser_Multifunction_Printer.jpg/500px-RICOH_Aficio_MP_C3002_Color_Laser_Multifunction_Printer.jpg" },
  ];

  const features = [
    { icon: "bolt", title: "High SpeedIcon", desc: "Industry-leading Print SpeedIcons up to 135 ppm for production environments" },
    { icon: "touch_app", title: "Smart Operation", desc: "10.1\" tablet-like interface with intuitive controls and customization" },
    { icon: "eco", title: "Eco-Friendly", desc: "Lowest power consumption in its class with sustainable design" },
    { icon: "precision_manufacturing", title: "Precision Engineering", desc: "Japanese quality built for demanding high-volume workflows" },
  ];

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#f5be53]/10 rounded-full blur-[150px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#142032]/60 border border-[#f5be53]/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#f5be53] animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#f5be53]">Authorized Partner</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-none tracking-tight">
                High-Performance <span className="text-[#f5be53]">Printing</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl leading-relaxed">
                Ricoh's authorized partner delivering production-ready Printers and smart MFPs for high-volume UAE enterprises. Experience Japanese precision engineered for demanding workflows.
              </p>
              <a href="/get-quote?brand=ricoh" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform inline-block shadow-xl shadow-[#f5be53]/20">
                Enquire Now
              </a>
            </div>
            <div className="relative" data-scene="brand-hero">
              <div className="absolute -inset-10 bg-[#f5be53]/10 blur-[120px] rounded-full" aria-hidden="true"></div>
              <div className="absolute -inset-4 bg-[#f5be53]/5 blur-[60px] rounded-full" aria-hidden="true"></div>
              <Image
                src="/images/Printer-ricoh.webp"
                alt="Ricoh Printer — Authorized Partner"
                width={700}
                height={525}
                className="w-full h-auto rounded-3xl shadow-2xl float-loop"
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
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Ricoh?</h2>
            <p className="text-[#d3c5b0] max-w-2xl mx-auto">Built for high-volume environments where reliability and SpeedIcon are critical to your business operations.</p>
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
            <h2 className="text-3xl font-bold text-white mb-4">Production Solutions</h2>
            <div className="h-1 w-20 bg-[#f5be53] rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((p, i) => (
              <div key={i} className="glass-card rounded-[32px] overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                <div className="relative aspect-video bg-[#101c2e] overflow-hidden">
                  <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{p.name}</h3>
                  <div className="flex justify-between text-sm text-[#d3c5b0]">
                    <span>{p.type}</span>
                    <span className="text-[#f5be53]">{p.SpeedIcon}</span>
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Boost Productivity?</h2>
          <p className="text-[#d3c5b0] mb-8">Get a customized quote for Ricoh Printers tailored to your business needs.</p>
          <a href="/get-quote?brand=ricoh" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform inline-block">
            Enquire for Ricoh Models
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
