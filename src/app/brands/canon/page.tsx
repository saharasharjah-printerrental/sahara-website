"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import MobileNav from "@/components/MobileNav";

export default function CanonBrandPage() {
  const products = [
    { name: "imageRUNNER ADVANCE DX", type: "Cloud-connected A3 Color MFP", speed: "High-speed scanning", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAERWQK3qqk13Z7BoPNtyd_ahfswNo3cAHfP8il3OnqNIb-H8xbY5wpLN73pZv1w7I-LUqgbSwU8pAdWtG0-U83-NA3lFUz4CR-JKj7OKbtGhqlBpw--P2zyDDtyOxUCIiFUoEch3GjRdAmb29wh-PAKsRTplPdT_InvjdUFTgZMD0Sjq4nhfHwwapSvedZp6Vr2A5B7MvVA5AXgNwff2zgGdCrBQbKxcL4wWnNGmPfICBq6St7tcvtFPButWk7Ah7dOicVLcHDEsx" },
    { name: "C3800 Series", type: "Compact powerhouses", speed: "Medium workgroups", img: "" },
    { name: "C5800 Series", type: "Enterprise security", speed: "360° document protection", img: "" },
  ];

  const features = [
    { icon: "hub", title: "uniFLOW Online", desc: "Single cloud solution to manage all printing and scanning workflows. Increase security by requiring user authentication." },
    { icon: "developer_board", title: "MEAP Integration", desc: "Custom-built software to run directly on the device, bridging physical documents and digital systems." },
    { icon: "eco", title: "Sustainable Precision", desc: "Low-energy consumption modes and long-life components reduce waste without sacrificing performance." },
    { icon: "palette", title: "V² Color Technology", desc: "Exceptional color accuracy and consistency for professional results." },
  ];

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWvXIh2VyIbrIMD9ldlDfwWj4lgAJpV92LY_-99IcoebURGeizggpsiOt0l8pGjCKYzLbvWKZiVc39gzU2oHqoMIspEMQN9gawfwf_iijc7vF95MWetWncVBw0FUSCm8McSllCj_q8oytlxfC81O04SVJj0io6PXtOpBjIjU2QsJaLAdZTWIrDV95fob9JTBIrhPyA3nDcSno9jhnr7bZkVpL-swqIYBABCMM-PkiZ4_IW1xE7QiT-tuu0Nl1oFGll8NrPNaSS_OR_"
            alt="Canon Office"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071325] via-[#071325]/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#142032]/60 border border-[#f5be53]/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#f5be53] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#f5be53]">Official Canon Partner</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-none tracking-tight">
            Canon <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5be53] to-[#c8962e]">Elite</span> <br/>Business Imaging
          </h1>
          <p className="text-xl text-[#d3c5b0] max-w-2xl mb-10 leading-relaxed">
            Sahara is a premier Canon partner in the UAE, delivering unparalleled document workflows and precision engineering for the modern executive landscape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/get-quote?brand=canon" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-[#f5be53]/30 hover:scale-105 transition-transform inline-block">
              Enquire about Canon Solutions
            </a>
            <a href="#products" className="glass-card text-white px-10 py-5 rounded-full font-semibold border border-[#9c8f7c]/20 hover:bg-[#2a3548] transition-all inline-block">
              View Product Guide
            </a>
          </div>
        </div>
      </section>

      {/* Featured Hardware */}
      <section id="products" className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">imageRUNNER Series</h2>
              <p className="text-[#d3c5b0] text-lg">Engineered for high-volume productivity and uncompromising security, the imageRUNNER ADVANCE series sets the gold standard for office efficiency.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 group relative h-[500px] rounded-lg overflow-hidden glass-card">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAERWQK3qqk13Z7BoPNtyd_ahfswNo3cAHfP8il3OnqNIb-H8xbY5wpLN73pZv1w7I-LUqgbSwU8pAdWtG0-U83-NA3lFUz4CR-JKj7OKbtGhqlBpw--P2zyDDtyOxUCIiFUoEch3GjRdAmb29wh-PAKsRTplPdT_InvjdUFTgZMD0Sjq4nhfHwwapSvedZp6Vr2A5B7MvVA5AXgNwff2zgGdCrBQbKxcL4wWnNGmPfICBq6St7tcvtFPButWk7Ah7dOicVLcHDEsx" 
                alt="Canon imageRUNNER"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-[#071325] to-transparent">
                <h3 className="text-3xl font-bold text-white mb-2">imageRUNNER ADVANCE DX</h3>
                <p className="text-[#d3c5b0] max-w-md">Cloud-connected A3 color multifunction devices with high-speed scanning and integrated uniFLOW software.</p>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-8">
              <div className="glass-card rounded-lg p-8 flex flex-col justify-between border-l-4 border-l-[#f5be53] group">
                <div>
                  <span className="material-symbols-outlined text-[#f5be53] text-4xl mb-4 group-hover:rotate-12 transition-transform">print</span>
                  <h4 className="text-xl font-bold text-white mb-2">C3800 Series</h4>
                  <p className="text-[#d3c5b0] text-sm">Compact powerhouses for medium workgroups with intelligent scanning.</p>
                </div>
              </div>
              <div className="glass-card rounded-lg p-8 flex flex-col justify-between border-l-4 border-l-[#f5be53] group">
                <div>
                  <span className="material-symbols-outlined text-[#f5be53] text-4xl mb-4 group-hover:rotate-12 transition-transform">security</span>
                  <h4 className="text-xl font-bold text-white mb-2">C5800 Series</h4>
                  <p className="text-[#d3c5b0] text-sm">Enterprise-grade security with 360-degree document protection.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f5be53]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Technological Superiority</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#f5be53] to-[#c8962e] mx-auto"></div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            {features.map((f, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#142032]/60 border border-[#f5be53]/30 flex items-center justify-center text-[#f5be53] group-hover:bg-[#f5be53] group-hover:text-[#071325] transition-all duration-500">
                  <span className="material-symbols-outlined text-3xl">{f.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#f5be53] mb-3">{f.title}</h3>
                  <p className="text-[#d3c5b0] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxo3PQ8cfvBblhLYAZ0KNdemzd9BEx3tyZ9fJyr7x-wvwlAGHOzaPr85-CtcKyog1tdeSfDUDrVGmDXNtgHvD0eIH-Viliz_HvnaULD3X2--pyqZYMbZoHSBHHbLJoyk1oNmYWHms-zMvQeLZQy947Y_WzbjW4XsoU5EqpXfJzdp0Lg-f-O68CjkTYM6hCltzcLOt0XXnpQdNc5j779phyarGqSkJYmi12Zv66NLLAUnkP6OanE68Rl5n6Y41qHas0tXIVZaiVJJ0d"
              alt="Canon Technology"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#f5be53]/10 mix-blend-overlay"></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center bg-[#071325] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[600px] h-[600px] border border-[#f5be53] rounded-full animate-pulse"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">Ready for the <span className="text-[#f5be53] italic">next</span> standard?</h2>
          <p className="text-xl text-[#d3c5b0] mb-12">Consult with our executive imaging specialists to design a Canon solution tailored to your operational demands.</p>
          <a href="/get-quote?brand=canon" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-12 py-5 rounded-full font-bold text-lg shadow-2xl shadow-[#f5be53]/30 hover:scale-105 transition-transform inline-block">
            Send Inquiry
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <MobileNav />
    </main>
  );
}