"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";

export default function RicohBrandPage() {
  const products = [
    { name: "MP 4055", type: "B&W Multifunction", speed: "55 ppm", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl0HeaYTgPWp8BHHjkVn_bgpq4C3T8UyisNdrWv6GwUBnV5nQcHPgH-5ZPannjczIBf2ISDeuWlb34tpC_chs-7hAF1WpQNhFvxpWdVbe-DDU5iSl279EaarLOfFf4-aYna8Wmpzejnnvd4rmv8VWeOfugBkrs6Z4vp4RdFbiqEgimB27WnRUwU2qC7R7sxC_hulkiR_F-8-rWaxGCPETYSS24TBPqLBXdXUAXHquIRIt1vfHdr13IftQYA1dqDmg8T0aYI92h6Mze" },
    { name: "IM C2000", type: "Color Smart MFP", speed: "20 ppm", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCy2kF6oyv-1YEqg-QhHgAHnF-oToFJdQdZ3mYOM6uQNZQycVbH-64xTIwL12lPlfAvdHKYot--6d9cGZ7faTrzsFo7rU2fDnrvh43AgpyVO4mbLz7_9dd-TFQjEqhslXYXEL0-uQxPS22jqWcYbz9tNZKUj8UiuYzPW_1j5vupYWlxE-jjQYGhDn3_38b3EYKTg7XzgjSFMKXT8BxiSKURLamYss3B1xQYYb8TxYAPdbL9A3trLs-nvm6gYb4EYBmRc2OdLYF_Kqfs" },
  ];

  const features = [
    { icon: "bolt", title: "High Speed", desc: "Industry-leading print speeds up to 135 ppm for production environments" },
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
                Ricoh's authorized partner delivering production-ready printers and smart MFPs for high-volume UAE enterprises. Experience Japanese precision engineered for demanding workflows.
              </p>
              <a href="/get-quote?brand=ricoh" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform inline-block shadow-xl shadow-[#f5be53]/20">
                Enquire Now
              </a>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-[#f5be53]/10 blur-[120px] rounded-full"></div>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAERWQK3qqk13Z7BoPNtyd_ahfswNo3cAHfP8il3OnqNIb-H8xbY5wpLN73pZv1w7I-LUqgbSwU8pAdWtG0-U83-NA3lFUz4CR-JKj7OKbtGhqlBpw--P2zyDDtyOxUCIiFUoEch3GjRdAmb29wh-PAKsRTplPdT_InvjdUFTgZMD0Sjq4nhfHwwapSvedZp6Vr2A5B7MvVA5AXgNwff2zgGdCrBQbKxcL4wWnNGmPfICBq6St7tcvtFPButWk7Ah7dOicVLcHDEsx"
                alt="Ricoh Printer"
                className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
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
            <p className="text-[#d3c5b0] max-w-2xl mx-auto">Built for high-volume environments where reliability and speed are critical to your business operations.</p>
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
                <div className="aspect-video bg-[#101c2e] overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Boost Productivity?</h2>
          <p className="text-[#d3c5b0] mb-8">Get a customized quote for Ricoh printers tailored to your business needs.</p>
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