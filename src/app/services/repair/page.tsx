"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";
import CountUp from "@/components/CountUp";
import { Hardware, SettingsSuggest, CleaningServices, Emergency } from "@mui/icons-material";

export default function RepairPage() {
  const services = [
    { icon: Hardware, title: "Hardware Repair", desc: "Mechanical and electrical component replacement, board-level diagnostics" },
    { icon: SettingsSuggest, title: "Firmware Updates", desc: "Latest firmware installation and security patches for all major brands" },
    { icon: CleaningServices, title: "Deep Cleaning", desc: "Internal cleaning, roller replacement, and calibration services" },
    { icon: Emergency, title: "Emergency Service", desc: "4-hour response time for critical failures, 24/7 availability" },
  ];

  const brands = ["HP", "Canon", "Brother", "Ricoh", "Xerox", "Sharp", "Kyocera", "Epson"];

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5be53]/10 rounded-full blur-[150px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Expert Technicians</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                Printer <span className="text-[#f5be53]">Repair</span> Services
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl">
                Factory-certified technicians with 13+ years of experience. On-site repairs across all Emirates. Original parts guaranteed.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/contact" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                  Request Service
                </a>
                <a href="/get-quote" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                  Get Quote
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="glass-card rounded-3xl p-8">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF9Q2bdCblu-mAfUZQCEzTJ4XJCOn4QroTen8yX2meulXzvcuk3dFy_KrDu7FlutILG20R1k6a6mDK4xa6ARFoUb4pXqb33cZOulst0RdE3iIlzryRqUAQzVbCPbLhlAyFzTnY0YGXxdwD-j7t7mYOW47vlbwJPKovjqROhM6oeKlMKsrWkPwGTtO16FJAqLpfn0OyLG_xrPXAlfqNMyWUO2ofvy8UpEYB7WpO1VK_ggqIaejuoH0xay0WF7P66Kwg8NDzqKnAF_Nq"
                  alt="Printer repair technician service Dubai Canon Kyocera"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-24 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Repair Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl">
                <s.icon className="text-4xl text-[#f5be53] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-[#d3c5b0]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Supported Brands</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {brands.map((brand, i) => (
              <span key={i} className="glass-card px-6 py-3 rounded-full text-white font-bold">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-[#071325]">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-10 flex flex-wrap justify-center gap-12 md:gap-20">
            {[
              { number: 50000, suffix: "+", label: "Repairs Completed" },
              { number: 4, suffix: "hr", label: "Response Time" },
              { number: 98, suffix: "%", label: "First Visit Fix" },
              { number: 24, suffix: "/7", label: "Emergency" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-[#f5be53]">
                  <CountUp to={s.number} duration={2} separator="," />
                  {s.suffix}
                </p>
                <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] gold-gradient p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">Need Immediate Help?</h2>
          <p className="text-[#483200] text-lg mb-8">Our technicians are ready to assist you</p>
          <a href="/contact" className="inline-block bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
            Contact Now
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