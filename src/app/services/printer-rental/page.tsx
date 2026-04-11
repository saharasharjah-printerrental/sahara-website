"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";
import CountUp from "@/components/CountUp";
import { Savings, Inventory2, BuildCircle, Emergency, Upgrade, Cancel, SupportAgent, Sync, Build, Verified, ExpandMore, Print, CheckCircle, LocationOn, HeadsetMic } from "@mui/icons-material";

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
    { icon: Savings, title: "Zero Deposit Option", desc: "No upfront security deposit required. Start renting with minimal initial investment." },
    { icon: Inventory2, title: "Unlimited Free Toner", desc: "All plans include genuine OEM toner at no extra cost. Never worry about consumables again." },
    { icon: BuildCircle, title: "Full Maintenance Included", desc: "Comprehensive servicing, repairs, and preventive maintenance covered in your rental." },
    { icon: Emergency, title: "4-Hour Emergency Response", desc: "Critical issues get resolved within 4 hours. Keep your business running without downtime." },
    { icon: Upgrade, title: "Upgrade Anytime Policy", desc: "Scale up your equipment as your business grows. Upgrade without heavy termination fees." },
    { icon: Cancel, title: "No Exit Fees", desc: "Flexible contracts with no hidden termination fees. Return or upgrade easily." },
    { icon: SupportAgent, title: "24/7 Technical Support", desc: "Round-the-clock assistance from certified technicians across all UAE locations." },
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

      {/* What is Printer Rental — Feature Grid */}
      <section className="relative py-28 px-8 lg:px-24 overflow-hidden" style={{ background: '#050d1a' }}>

        {/* Circuit board grid texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(245,190,83,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,190,83,0.04) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        {/* Dot intersections overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, rgba(245,190,83,0.12) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        {/* Center ambient depth */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 75% 60% at 50% 50%, rgba(7,19,37,0.7) 0%, transparent 75%)' }} />

        <div className="max-w-5xl mx-auto relative z-10">

          {/* ── Centered heading ── */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-4">
              What is <span className="text-[#f5be53]">Printer Rental</span> in the UAE?
            </h2>
            <p className="text-[#7a94ad] text-base max-w-lg mx-auto leading-relaxed">
              Flexible leasing options to access top-tier multifunction printers (MFPs) and
              photocopiers with low monthly operational costs.
            </p>
          </div>

          {/* ── 4-card grid — outer cards normal, inner two elevated ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:items-end">
            {([
              {
                Icon: Build,
                title: 'All-Inclusive Leasing',
                body: 'A simple monthly fee that covers your machine, unlimited toner, maintenance, repairs, and full technical support.',
                elevated: false,
              },
              {
                Icon: Savings,
                title: 'Smart Financials',
                body: 'Healthy cash flow with zero upfront capital investment, zero deposit, and absolutely no exit fees.',
                elevated: true,
              },
              {
                Icon: Verified,
                title: 'Premium Equipment',
                body: 'Enjoy access to high-performance, industry-leading devices from trusted brands like Canon and Kyocera.',
                elevated: true,
              },
              {
                Icon: LocationOn,
                title: 'Seamless UAE Coverage',
                body: 'Popular and fully supported across major business centers: Dubai, Sharjah, and Abu Dhabi.',
                elevated: false,
              },
            ] as const).map(({ Icon, title, body, elevated }, i) => (
              <div key={i}
                className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${elevated ? 'lg:-translate-y-5' : ''}`}
                style={{
                  background: 'linear-gradient(170deg, rgba(8,18,36,0.97) 0%, rgba(5,11,22,0.99) 100%)',
                  border: '1px solid rgba(245,190,83,0.22)',
                  boxShadow: elevated
                    ? '0 0 0 1px rgba(245,190,83,0.15), 0 0 40px rgba(245,190,83,0.12), 0 20px 60px rgba(0,0,0,0.5)'
                    : '0 0 0 1px rgba(245,190,83,0.08), 0 0 20px rgba(245,190,83,0.06), 0 8px 32px rgba(0,0,0,0.4)',
                }}>

                {/* Corner circuit node — top-left */}
                <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none">
                  <div className="absolute top-2 left-0 w-3 h-px" style={{ background: 'rgba(245,190,83,0.35)' }} />
                  <div className="absolute top-0 left-2 w-px h-3" style={{ background: 'rgba(245,190,83,0.35)' }} />
                </div>
                {/* Corner circuit node — bottom-right */}
                <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none">
                  <div className="absolute bottom-2 right-0 w-3 h-px" style={{ background: 'rgba(245,190,83,0.35)' }} />
                  <div className="absolute bottom-0 right-2 w-px h-3" style={{ background: 'rgba(245,190,83,0.35)' }} />
                </div>

                {/* Glow intensifies on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 30px rgba(245,190,83,0.06)' }} />

                {/* ── Icon illustration area ── */}
                <div className="relative flex items-center justify-center pt-8 pb-6 px-6">
                  {/* Radial backdrop behind icon */}
                  <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 60%, rgba(245,190,83,0.07) 0%, transparent 70%)' }} />
                  <div className="relative w-20 h-20 rounded-[1.25rem] flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(145deg, rgba(245,190,83,0.16) 0%, rgba(245,190,83,0.04) 100%)',
                      border: '1px solid rgba(245,190,83,0.32)',
                      boxShadow: '0 0 0 6px rgba(245,190,83,0.05), 0 0 30px rgba(245,190,83,0.14)',
                    }}>
                    <Icon style={{ fontSize: 38, color: '#f5be53' }} />
                  </div>
                </div>

                {/* ── Text area ── */}
                <div className="px-6 pb-7 flex flex-col flex-1"
                  style={{ borderTop: '1px solid rgba(245,190,83,0.08)' }}>
                  <h3 className="text-white font-bold text-[0.95rem] mt-5 mb-2 leading-snug">{title}</h3>
                  <p className="text-[#6a87a4] text-[0.8rem] leading-relaxed">{body}</p>
                </div>

                {/* Bottom glow bar — appears on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(90deg, transparent, #f5be53, transparent)' }} />
              </div>
            ))}
          </div>

          {/* Sparkle decoration — bottom right */}
          <div className="flex justify-end mt-8 pr-2">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 0L12.5 9.5L22 11L12.5 12.5L11 22L9.5 12.5L0 11L9.5 9.5L11 0Z" fill="#f5be53" fillOpacity="0.5" />
            </svg>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-8 lg:px-24 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Sync, title: "Flexible Terms", desc: "Rent from 3-36 months with easy upgrade options" },
              { icon: Build, title: "Full Maintenance", desc: "All repairs and servicing included at no extra cost" },
              { icon: Verified, title: "Premium Brands", desc: "HP, Canon, Ricoh, Xerox and more" },
            ].map((f, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl text-center">
                <f.icon className="text-4xl text-[#f5be53] mb-4" />
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
                <b.icon className="text-3xl text-[#f5be53] mb-3" />
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
              { number: 2500, suffix: "+", label: "Printers Deployed" },
              { number: 1500, suffix: "+", label: "Happy Clients" },
              { number: 13, suffix: "+", label: "Years Experience" },
              { number: 2, suffix: "hr", label: "Response Time" },
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
                <ExpandMore className="text-[#f5be53] group-open:rotate-180 transition-transform" />
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
