"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";

export default function LexmarkBrandPage() {
  const products = [
    { name: "Lexmark MS821dn", specs: ["55 PPM", "1200 DPI"], img: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&h=400&fit=crop" },
    { name: "Lexmark CX825dte", specs: ["55 PPM", "Color"], img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop" },
    { name: "Lexmark B3442dw", specs: ["42 PPM", "Wireless"], img: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&h=400&fit=crop" },
  ];

  const features = [
    { icon: "factory", title: "American Heritage", desc: "Proudly designed and manufactured in the USA with 30+ years of innovation." },
    { icon: "recycling", title: "Lexmark Circle", desc: "Free recycling program for used toner cartridges and imaging units." },
    { icon: "print", title: "Precision Printing", desc: "Lexmark's exclusive Unison toner delivers consistent, high-quality output." },
    { icon: "enterprise", title: "Enterprise Ready", desc: "Robust security features and enterprise integration capabilities." },
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
                <span className="text-xs uppercase tracking-widest text-[#f5be53] font-medium">American Innovation</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Lexmark Authorized <span className="text-[#f5be53]">Partner</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl leading-relaxed">
                Precision printing solutions designed in the USA. Lexmark combines American craftsmanship with cutting-edge technology for enterprise-grade performance.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/get-quote?brand=lexmark" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform inline-block shadow-xl shadow-[#f5be53]/20">
                  Enquire for Lexmark Models
                </a>
                <a href="#products" className="glass-card text-white px-8 py-4 rounded-full font-bold hover:bg-[#2a3548] transition-all border border-[#f5be53]/20 inline-block">
                  View Products
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-[#f5be53]/10 blur-[120px] rounded-full"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#030e20]">
                <img 
                  src="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&h=600&fit=crop"
                  alt="Lexmark Printer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Lexmark */}
      <section className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Lexmark</h2>
            <p className="text-[#d3c5b0] max-w-2xl mx-auto">American innovation meeting enterprise needs since 1991.</p>
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
            <h2 className="text-3xl font-bold text-white mb-4">Enterprise Solutions</h2>
            <div className="h-1 w-20 bg-[#f5be53] rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <div key={i} className="glass-card rounded-[32px] p-8 group hover:-translate-y-2 transition-transform duration-500">
                <div className="aspect-square mb-8 rounded-2xl overflow-hidden bg-[#101c2e]">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                <p className="text-[#d3c5b0] text-sm mb-6">Enterprise-grade performance for demanding workloads.</p>
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

      {/* Lexmark Advantage */}
      <section className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Lexmark Advantages</h2>
            <p className="text-[#d3c5b0] max-w-2xl mx-auto">Why enterprises trust Lexmark for their printing infrastructure</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card rounded-[32px] p-8">
              <div className="text-4xl font-bold text-[#f5be53] mb-4">30+</div>
              <h3 className="text-xl font-bold text-white mb-2">Years of Innovation</h3>
              <p className="text-[#d3c5b0]">American-designed printing solutions with decades of expertise.</p>
            </div>
            <div className="glass-card rounded-[32px] p-8">
              <div className="text-4xl font-bold text-[#f5be53] mb-4">Free</div>
              <h3 className="text-xl font-bold text-white mb-2">Cartridge Recycling</h3>
              <p className="text-[#d3c5b0]">Lexmark Circle program recycles your cartridges at no cost.</p>
            </div>
            <div className="glass-card rounded-[32px] p-8">
              <div className="text-4xl font-bold text-[#f5be53] mb-4">Unison</div>
              <h3 className="text-xl font-bold text-white mb-2">Toner Technology</h3>
              <p className="text-[#d3c5b0]">Exclusive formula for consistent, high-quality prints every time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto glass-card rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#f5be53]/5 -z-10"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Choose <span className="text-[#f5be53]">Lexmark</span> Quality</h2>
          <p className="text-[#d3c5b0] mb-10 max-w-2xl mx-auto text-lg">Get enterprise-grade printing with American innovation. Contact us for a Lexmark solution.</p>
          <a href="/get-quote?brand=lexmark" className="px-12 py-5 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-[#f5be53]/30 inline-block">
            Get Lexmark Quote
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
