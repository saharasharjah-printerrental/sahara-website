"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";
import { Savings, Speed, Engineering, Inventory, CheckCircle } from "@mui/icons-material";

export default function AMCPage() {
  const plans = [
    { name: "Basic", price: "AED 299/mo", features: ["Quarterly maintenance", "Priority support", "Parts excluded"], popular: false },
    { name: "Professional", price: "AED 499/mo", features: ["Monthly maintenance", "All parts included", "24/7 support", "Loaner device"], popular: true },
    { name: "Enterprise", price: "Custom", features: ["Weekly maintenance", "Dedicated technician", "SLA guarantees", "Multi-location"], popular: false },
  ];

  const benefits = [
    { icon: Savings, title: "Cost Predictability", desc: "Fixed monthly costs with no surprise repair bills" },
    { icon: Speed, title: "Priority Service", desc: "AMC clients get priority scheduling and faster response" },
    { icon: Engineering, title: "Prevention Focus", desc: "Regular maintenance prevents costly downtime" },
    { icon: Inventory, title: "Parts Coverage", desc: "All replacement parts included in Professional plan" },
  ];

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#f5be53]/10 rounded-full blur-[150px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Peace of Mind</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
              Annual Maintenance <span className="text-[#f5be53]">Contract</span>
            </h1>
            <p className="text-lg text-[#d3c5b0] max-w-2xl mx-auto">
              Protect your investment with comprehensive AMC coverage. Regular servicing, priority support, and parts replacement all included.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-24 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl">
                <b.icon className="text-4xl text-[#f5be53] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
                <p className="text-[#d3c5b0]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div key={i} className={`glass-card rounded-3xl p-8 ${plan.popular ? 'border-2 border-[#f5be53]' : ''}`}>
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-[#f5be53] text-[#412d00] px-4 py-1 rounded-full text-xs font-bold uppercase">Most Popular</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white text-center mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-[#f5be53] text-center mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-[#d3c5b0]">
                      <CheckCircle className="text-[#f5be53] text-sm" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/get-quote" className={`block text-center py-4 rounded-full font-bold transition-all ${plan.popular ? 'bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00]' : 'glass-card text-white hover:bg-[#2a3548]'}`}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] gold-gradient p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">Protect Your Fleet</h2>
          <p className="text-[#483200] text-lg mb-8">Get a customized AMC quote for your organization</p>
          <a href="/get-quote" className="inline-block bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
            Request Quote
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