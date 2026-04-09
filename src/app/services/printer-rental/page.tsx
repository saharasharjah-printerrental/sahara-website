"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";

export default function PrinterRentalPage() {
  const [faqs, setFaqs] = useState<{q: string; a: string}[]>([]);

  useEffect(() => {
    const faqStored = localStorage.getItem("sahara_faqs");
    if (faqStored) {
      const allFaqs = JSON.parse(faqStored);
      const pageFaqs = allFaqs.filter((f: any) => f.pageSlug === "services/printer-rental" && f.isActive)
        .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
        .map((f: any) => ({ q: f.question, a: f.answer }));
      setFaqs(pageFaqs.length > 0 ? pageFaqs : defaultFaqs);
    } else {
      setFaqs(defaultFaqs);
    }
  }, []);

  const defaultFaqs = [
    { q: "What is the minimum rental duration?", a: "We offer flexible rental periods starting from 3 months to 36 months. Short-term rentals are available for events and temporary needs." },
    { q: "Is maintenance included in the rental?", a: "Yes, all our rental plans include comprehensive maintenance coverage. Our technicians perform regular servicing and emergency repairs at no additional cost." },
    { q: "Can I upgrade my rented printer?", a: "Absolutely! Our 'Growth Guard' policy allows you to upgrade your equipment anytime during the contract based on your business needs." },
    { q: "What brands do you offer for rental?", a: "We offer all major brands including HP, Canon, Brother, Ricoh, Xerox, Sharp, Kyocera, and Epson. Our fleet includes enterprise, mid-range, and budget options." },
    { q: "Do you require a deposit?", a: "We offer zero deposit options for qualified businesses. Contact us to learn more about our deposit-free plans." },
    { q: "What happens if the printer breaks down?", a: "All rentals include full maintenance and repair coverage. We aim for 4-hour emergency response for critical issues." },
    { q: "Can I cancel my rental contract?", a: "Yes, we offer flexible terms with no exit fees. You can return or upgrade equipment at any time." },
    { q: "Is toner included in the rental price?", a: "Yes! All our rental plans include unlimited genuine toner. No hidden costs for consumables." },
    { q: "Do you offer short-term rentals?", a: "Yes, we offer short-term rentals for events, conferences, and temporary office needs. Contact us for daily and weekly rates." },
    { q: "What areas do you serve?", a: "We serve all across UAE including Dubai, Sharjah, Abu Dhabi, Ajman, RAK, Fujairah, and Al Ain." },
  ];

  const benefits = [
    { icon: "savings", title: "Zero Deposit Option", desc: "No upfront security deposit required. Start renting with minimal initial investment." },
    { icon: "inventory_2", title: "Unlimited Free Toner", desc: "All plans include genuine OEM toner at no extra cost. Never worry about consumables again." },
    { icon: "build_circle", title: "Full Maintenance Included", desc: "Comprehensive servicing, repairs, and preventive maintenance covered in your rental." },
    { icon: "emergency", title: "4-Hour Emergency Response", desc: "Critical issues get resolved within 4 hours. Keep your business running without downtime." },
    { icon: "upgrade", title: "Upgrade Anytime Policy", desc: "Scale up your equipment as your business grows. Upgrade without heavy termination fees." },
    { icon: "cancel", title: "No Exit Fees", desc: "Flexible contracts with no hidden termination fees. Return or upgrade easily." },
    { icon: "support_agent", title: "24/7 Technical Support", desc: "Round-the-clock assistance from certified technicians across all UAE locations." },
  ];

  const pricingTiers = [
    { tier: "A4 Desktop", range: "AED 250-400/mo", desc: "Ideal for small offices, 1-10 users" },
    { tier: "A3 Mid-Range", range: "AED 500-800/mo", desc: "Perfect for medium offices, 10-30 users" },
    { tier: "A3 Enterprise", range: "AED 1000-2000/mo", desc: "High-volume for large organizations" },
  ];

  const process = [
    { step: "1", title: "Choose Your Machine", desc: "Select from our wide range of printers and photocopiers based on your needs." },
    { step: "2", title: "Get Quote Within 2 Hours", desc: "Our team provides a detailed quote tailored to your requirements." },
    { step: "3", title: "Same-Day Delivery & Setup", desc: "We deliver and install your equipment at no extra cost." },
    { step: "4", title: "Ongoing Support", desc: "Enjoy unlimited toner, maintenance, and 24/7 technical support." },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Printer Rental Services UAE",
    "description": "Flexible printer and photocopier rental services in Dubai, Sharjah, Abu Dhabi and across UAE with full maintenance included.",
    "provider": {
      "@type": "Organization",
      "name": "Sahara Office Equipments",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sharjah",
        "addressCountry": "AE"
      },
      "telephone": "+971503823969"
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "RAK"],
    "serviceType": "Printer Rental",
    "offers": {
      "@type": "Offer",
      "priceRange": "AED 250-2000",
      "priceCurrency": "AED"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Rent a Printer",
    "step": [
      { "@type": "HowToStep", "name": "Choose Your Machine", "text": "Select from our wide range of printers and photocopiers based on your needs." },
      { "@type": "HowToStep", "name": "Get Quote Within 2 Hours", "text": "Our team provides a detailed quote tailored to your requirements." },
      { "@type": "HowToStep", "name": "Same-Day Delivery & Setup", "text": "We deliver and install your equipment at no extra cost." },
      { "@type": "HowToStep", "name": "Ongoing Support", "text": "Enjoy unlimited toner, maintenance, and 24/7 technical support." }
    ]
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
    <main className="min-h-screen bg-[#071325]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5be53]/10 rounded-full blur-[150px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Professional Solutions</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                Printer <span className="text-[#f5be53]">Rental</span> Services
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl">
                Flexible leasing solutions for businesses of all sizes. Scale your printing infrastructure without capital investment. Full maintenance included.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/get-quote" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                  Get a Quote
                </a>
                <a href="/rental-calculator" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                  Calculate Price
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="glass-card rounded-3xl p-8">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF9Q2bdCblu-mAfUZQCEzTJ4XJCOn4QroTen8yX2meulXzvcuk3dFy_KrDu7FlutILG20R1k6a6mDK4xa6ARFoUb4pXqb33cZOulst0RdE3iIlzryRqUAQzVbCPbLhlAyFzTnY0YGXxdwD-j7t7mYOW47vlbwJPKovjqROhM6oeKlMKsrWkPwGTtO16FJAqLpfn0OyLG_xrPXAlfqNMyWUO2ofvy8UpEYB7WpO1VK_ggqIaejuoH0xay0WF7P66Kwg8NDzqKnAF_Nq"
                  alt="Canon imageRUNNER ADVANCE multifunction printer for office rental"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Definition Block */}
      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 border-l-4 border-[#f5be53]">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">What is Printer Rental?</h2>
            <p className="text-lg text-[#d3c5b0] leading-relaxed mb-4">
              Printer rental (or photocopier leasing) is a business solution where companies lease multifunction printers (MFPs) instead of purchasing them outright. The rental agreement includes the equipment, unlimited toner, maintenance, repairs, and technical support for a fixed monthly fee.
            </p>
            <p className="text-lg text-[#d3c5b0] leading-relaxed">
              In the UAE, printer rental is particularly popular in Dubai and Sharjah because it eliminates upfront capital costs while providing access to enterprise-grade Canon and Kyocera machines with zero deposit and no exit fees.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-8 lg:px-24 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "sync", title: "Flexible Terms", desc: "Rent from 3-36 months with easy upgrade options" },
              { icon: "build", title: "Full Maintenance", desc: "All repairs and servicing included at no extra cost" },
              { icon: "verified", title: "Premium Brands", desc: "HP, Canon, Ricoh, Xerox and more" },
            ].map((f, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl text-center">
                <span className="material-symbols-outlined text-4xl text-[#f5be53] mb-4">{f.icon}</span>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[#d3c5b0]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Benefits of Our Printer Rental</h2>
            <p className="text-[#d3c5b0] mt-4">Everything you need for seamless printing</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <span className="material-symbols-outlined text-3xl text-[#f5be53] mb-3">{b.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                <p className="text-[#d3c5b0] text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Rental Pricing</h2>
            <p className="text-[#d3c5b0] mt-4">Flexible plans for every business size</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((p, i) => (
              <div key={i} className={`glass-card p-8 rounded-3xl text-center ${i === 1 ? 'border-2 border-[#f5be53]' : ''}`}>
                {i === 1 && <span className="bg-[#f5be53] text-[#412d00] px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">Most Popular</span>}
                <h3 className="text-xl font-bold text-white mb-2">{p.tier}</h3>
                <p className="text-3xl font-bold text-[#f5be53] mb-2">{p.range}</p>
                <p className="text-[#d3c5b0] text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#d3c5b0] text-sm mt-8">*Prices may vary based on specific requirements. Contact us for a customized quote.</p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">How It Works</h2>
            <p className="text-[#d3c5b0] mt-4">Get started in 4 simple steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl text-center relative">
                <div className="w-10 h-10 rounded-full bg-[#f5be53] text-[#412d00] font-bold text-xl flex items-center justify-center mx-auto mb-4">{p.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-[#d3c5b0] text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-8 bg-[#071325]">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-10 flex flex-wrap justify-center gap-12 md:gap-20">
            {[
              { value: "2500+", label: "Printers Deployed" },
              { value: "1500+", label: "Happy Clients" },
              { value: "13+", label: "Years Experience" },
              { value: "2hr", label: "Response Time" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-[#f5be53]">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
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
                {faq.q}
                <span className="material-symbols-outlined text-[#f5be53] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="mt-4 text-[#d3c5b0] leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] gold-gradient p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">Ready to Rent?</h2>
          <p className="text-[#483200] text-lg mb-8">Get a customized quote within 2 hours</p>
          <a href="/get-quote" className="inline-block bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
            Get Your Quote
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
      <MobileNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
