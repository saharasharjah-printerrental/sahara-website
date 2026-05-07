"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import { AccountBalance, Schedule, Upgrade, Build, Inventory2, Cancel, ExpandMore } from "@mui/icons-material";

export default function CopierLeaseUAE() {
  const [settings, setSettings] = useState<any>(null);
  const [faqs, setFaqs] = useState<{q: string; a: string}[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("sahara_settings");
    if (stored) {
      setSettings(JSON.parse(stored));
    }
    
    const faqStored = localStorage.getItem("sahara_faqs");
    if (faqStored) {
      const allFaqs = JSON.parse(faqStored);
      const pageFaqs = allFaqs.filter((f: any) => f.pageSlug === "copier-lease-uae" && f.isActive)
        .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
        .map((f: any) => ({ q: f.question, a: f.answer }));
      setFaqs(pageFaqs.length > 0 ? pageFaqs : defaultFaqs);
    } else {
      setFaqs(defaultFaqs);
    }
  }, []);

  const defaultFaqs = [
    { q: "What is the difference between copier lease and rental?", a: "Copier lease is a long-term financing option (typically 2-5 years) where you essentially finance the machine with the option to own it at the end. Rental is a shorter-term commitment with more flexibility to return or upgrade." },
    { q: "What are the tax advantages of leasing in UAE?", a: "Lease payments are treated as operating expenses, which can be deducted from taxable income. This provides better cash flow and tax benefits compared to capital expenditure." },
    { q: "Can I upgrade my leased copier?", a: "Yes! Our lease agreements include upgrade options. You can upgrade to a newer model during the lease period, often without additional costs." },
    { q: "What happens at the end of the lease term?", a: "At the end of your lease term, you can either return the equipment, purchase it at a residual value, or upgrade to a newer model." },
    { q: "Do you offer zero deposit leases?", a: "Yes! We offer competitive lease options with zero or minimal deposits for qualified businesses." },
    { q: "Which brands are available for lease?", a: "We lease all major brands including Canon, Kyocera, HP, Xerox, Ricoh, Sharp, Brother, and Konica Minolta." },
    { q: "How long are your typical lease agreements?", a: "Our lease terms typically range from 2-5 years. We offer flexible terms to match your business requirements." },
    { q: "Is maintenance included in the lease?", a: "Yes! All our lease agreements include comprehensive maintenance, unlimited toner, and technical support at no additional cost." },
  ];

  const comparison = [
    { feature: "Upfront Cost", lease: "Zero deposit", buy: "AED 15,000-50,000", rental: "First month only" },
    { feature: "Maintenance", lease: "Included", buy: "Pay per repair", rental: "Included" },
    { feature: "Toner", lease: "Free & unlimited", buy: "Self-pay", rental: "Free & unlimited" },
    { feature: "Upgrades", lease: "Any time", buy: "Buy new machine", rental: "Any time" },
    { feature: "Tax Benefits", lease: "Operating expense", buy: "Capital expenditure", rental: "Operating expense" },
    { feature: "End of Term", lease: "Return or buy", buy: "Own asset", rental: "Return machine" },
  ];

  const brands = ["Canon", "Kyocera", "HP", "Xerox", "Ricoh", "Sharp", "Brother", "Konica Minolta"];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Copier Lease UAE",
    "description": "Commercial photocopier leasing services in UAE. Tax advantages, flexible terms, and full maintenance included.",
    "provider": {
      "@type": "Organization",
      "name": "Sahara Office Equipments"
    },
    "areaServed": "UAE",
    "serviceType": "Copier Lease"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <link rel="canonical" href="https://www.saharaprinter.com/copier-lease-uae/" />
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5be53]/10 rounded-full blur-[150px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Copier Lease UAE</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
            Commercial Photocopier <span className="text-[#f5be53]">Lease</span>
          </h1>

          {/* AEO Quick Answer Block */}
          <div className="aeo-block bg-[#0d1b2e] border border-[#f5be53]/20 rounded-2xl p-5 mb-6 max-w-2xl mx-auto text-left">
            <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">Copier Lease UAE — Quick Answer</p>
            <p className="text-[#d3c5b0] text-sm leading-relaxed">
              Copier leasing in the UAE is a long-term financial arrangement (12–60 months) where businesses access
              enterprise Canon, Kyocera, and Xerox photocopiers with <strong className="text-white">zero upfront capital</strong>.
              Lease payments qualify as OPEX — reducing taxable income under UAE Corporate Tax. Sahara offers
              copier leases from <strong className="text-white">AED 250/month</strong> with full maintenance and toner included.
            </p>
          </div>

          <p className="text-lg text-[#d3c5b0] max-w-2xl mx-auto mb-8">
            Flexible copier lease solutions with tax advantages, flexible terms, and full maintenance included. Zero deposit options available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/get-quote" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
              Get Free Quote
            </a>
            <a href="tel:+971503823969" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 border-l-4 border-[#f5be53]">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">What is Copier Lease in UAE?</h2>
            <p className="text-lg text-[#d3c5b0] leading-relaxed mb-4">
              Copier lease in UAE is a financial arrangement where businesses lease photocopiers and multifunction devices for extended periods (typically 2-5 years). Unlike rental, lease agreements often include an option to purchase the equipment at the end of the term.
            </p>
            <p className="text-lg text-[#d3c5b0] leading-relaxed">
              In the UAE, copier leasing provides significant tax advantages as lease payments are treated as operating expenses. This helps businesses maintain better cash flow while accessing enterprise-grade Canon, Kyocera, and Xerox equipment.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Benefits of Copier Lease</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: AccountBalance, title: "Tax Advantages", desc: "Lease payments are operating expenses, offering tax benefits over capital purchase." },
              { icon: Schedule, title: "Flexible Terms", desc: "Choose lease terms from 2-5 years with customizable payment structures." },
              { icon: Upgrade, title: "Upgrade Included", desc: "Stay current with technology through easy upgrades during the lease." },
              { icon: Build, title: "Zero Maintenance Costs", desc: "All repairs, parts, and servicing included throughout the lease period." },
              { icon: Inventory2, title: "Free Toner", desc: "Unlimited genuine toner included for the entire lease duration." },
              { icon: Cancel, title: "No Exit Fees", desc: "Flexible return or upgrade options at the end of your lease term." },
            ].map((b, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl">
                <b.icon className="text-4xl text-[#f5be53] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
                <p className="text-[#d3c5b0]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Lease vs Buy vs Rent</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a3548]">
                  <th className="text-left py-4 px-6 text-white font-bold">Feature</th>
                  <th className="text-center py-4 px-6 text-[#f5be53] font-bold">Lease</th>
                  <th className="text-center py-4 px-6 text-slate-400 font-bold">Buy</th>
                  <th className="text-center py-4 px-6 text-slate-400 font-bold">Rent</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-b border-[#2a3548]/50">
                    <td className="py-4 px-6 text-[#d3c5b0]">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-[#f5be53] font-bold">{row.lease}</td>
                    <td className="py-4 px-6 text-center text-slate-400">{row.buy}</td>
                    <td className="py-4 px-6 text-center text-slate-400">{row.rental}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Brands Available</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {brands.map((brand, i) => (
              <span key={i} className="bg-[#2a3548] px-6 py-3 rounded-full text-white font-medium">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f5be53] to-[#c8962e] p-12 md:p-16 text-center">
          <h2 className="text-4xl font-bold text-[#412d00] mb-6">Ready to Lease a Copier?</h2>
          <p className="text-[#483200] text-lg mb-8">Get a customized lease proposal within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/get-quote" className="bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
              Get Free Quote
            </a>
            <a href="tel:+971503823969" className="bg-[#c8962e]/20 border border-[#483200]/30 text-[#412d00] px-10 py-5 rounded-full font-bold text-lg">
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details 
              key={i} 
              className="rounded-2xl p-6 group cursor-pointer"
              style={{
                background: 'linear-gradient(145deg, #0f1a2a 0%, #0a121c 100%)',
                boxShadow: '6px 6px 16px rgba(0,0,0,0.4), -3px -3px 10px rgba(255,255,255,0.03)',
              }}
              open={i === 0}
            >
              <summary className="flex justify-between items-center list-none font-bold text-lg text-white">
                {f.q}
                <ExpandMore className="text-[#f5be53] group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-[#d3c5b0] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
    </>
  );
}
