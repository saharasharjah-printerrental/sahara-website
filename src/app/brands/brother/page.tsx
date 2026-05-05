"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";
import Image from "next/image";

export default function BrotherBrandPage() {
  const products = [
    { name: "HL-L2350DW", specs: ["32 PPM", "Auto Duplex"], img: "/images/Printer-brother.webp" },
    { name: "MFC-L8900CDW", specs: ["32 PPM", "Color"], img: "/images/Printer-brother.webp" },
    { name: "HL-L6400DW", specs: ["50 PPM", "Enterprise"], img: "/images/Printer-brother.webp" },
  ];

  const features = [
    { icon: "support_agent", title: "Award-Winning Support", desc: "Brother's US-based support team rated #1 in customer satisfaction." },
    { icon: "VerifiedIcon", title: "Industry-Leading Warranty", desc: "Free lifetime PhoneIcon support and industry-best limited warranty." },
    { icon: "local_shipping", title: "Fast Delivery", desc: "Same-day shipping on orders placed before 3pm EST." },
    { icon: "Inventory_2", title: "Extensive Supplies Stock", desc: "Wide range of Brother consumables in stock with same-day shipping." },
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
                <span className="text-xs uppercase tracking-widest text-[#f5be53] font-medium">#1 in Customer Satisfaction</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Brother Authorized <span className="text-[#f5be53]">Partner</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl leading-relaxed">
                Trusted by millions of businesses worldwide. Brother delivers reliable, award-winning printing solutions with industry-leading support.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/get-quote?brand=brother" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform inline-block shadow-xl shadow-[#f5be53]/20">
                  Enquire for Brother Models
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
                  src="/images/Printer-brother.webp"
                  alt="Brother MFC-L8900CDW"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Brother */}
      <section className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Brother</h2>
            <p className="text-[#d3c5b0] max-w-2xl mx-auto">Reliable, award-winning printing solutions backed by industry-leading customer support.</p>
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
            <h2 className="text-3xl font-bold text-white mb-4">Popular Models</h2>
            <div className="h-1 w-20 bg-[#f5be53] rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <div key={i} className="glass-card rounded-[32px] p-8 group hover:-translate-y-2 transition-transform duration-500">
                <div className="relative aspect-square mb-8 rounded-2xl overflow-hidden bg-[#101c2e]">
                  <Image src={p.img} alt={p.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                <p className="text-[#d3c5b0] text-sm mb-6">Reliable performance for home office and small business.</p>
                <div className="flex justify-between items-center py-4 border-t border-white/5">
                  {p.specs.map((s, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#f5be53] text-sm">SpeedIcon</span>
                      <span className="text-xs text-[#d3c5b0]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Brother Advantages</h2>
            <p className="text-[#d3c5b0] max-w-2xl mx-auto">Why businesses choose Brother for their printing needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card rounded-[32px] p-8">
              <div className="text-4xl font-bold text-[#f5be53] mb-4">#1</div>
              <h3 className="text-xl font-bold text-white mb-2">Customer Satisfaction</h3>
              <p className="text-[#d3c5b0]">Rated #1 in customer satisfaction by PCMag for 12 consecutive years.</p>
            </div>
            <div className="glass-card rounded-[32px] p-8">
              <div className="text-4xl font-bold text-[#f5be53] mb-4">Lifetime</div>
              <h3 className="text-xl font-bold text-white mb-2">PhoneIcon Support</h3>
              <p className="text-[#d3c5b0]">Free lifetime PhoneIcon support included with every Brother product.</p>
            </div>
            <div className="glass-card rounded-[32px] p-8">
              <div className="text-4xl font-bold text-[#f5be53] mb-4">Same Day</div>
              <h3 className="text-xl font-bold text-white mb-2">Shipping</h3>
              <p className="text-[#d3c5b0]">Orders placed before 3pm ship same day from our warehouse.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto glass-card rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#f5be53]/5 -z-10"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Choose <span className="text-[#f5be53]">Brother</span></h2>
          <p className="text-[#d3c5b0] mb-10 max-w-2xl mx-auto text-lg">Get the reliability and support your business deserves. Contact us for a Brother solution.</p>
          <a href="/get-quote?brand=brother" className="px-12 py-5 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-[#f5be53]/30 inline-block">
            Get Brother Quote
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

