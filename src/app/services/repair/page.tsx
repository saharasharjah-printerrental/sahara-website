export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

export const metadata: Metadata = {
  title: "Printer Repair Dubai | Fix Printer Near Me | HP Service Center | Sahara",
  description: "On-site printer repair near you in Dubai, Sharjah & Abu Dhabi. Fix printer fast — 4-hr emergency response, OEM parts. Canon, HP, Kyocera, Xerox, Ricoh. HP Service Center Dubai. ☎ +971503823969",
  keywords: "printer repair dubai, printer services near me, fix printer near me, printer repairing near me, hp service center dubai, hp service center in dubai, printer fixing near me, printer fix services, photocopier repair sharjah, canon printer repair uae, kyocera service uae, printer technician dubai, printer service and repair",
  openGraph: {
    title: "Printer Repair Service Dubai & UAE | Sahara Office Equipments",
    description: "On-site printer repair with 4-hour emergency response across UAE. Certified technicians for Canon, HP, Kyocera, Xerox, Ricoh and all major brands.",
    images: [{ url: "https://www.saharaprinter.com/images/homement.webp", width: 1200, height: 630, alt: "Printer Repair Dubai UAE" }],
    url: "https://www.saharaprinter.com/services/repair/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/repair/" },
};

const repairServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Printer Repair Service UAE",
  "alternateName": "On-Site Photocopier Repair Dubai",
  "description": "Professional on-site printer and photocopier repair service across UAE. Factory-certified technicians service all major brands including Canon, HP, Kyocera, Ricoh, and Xerox. 4-hour emergency response, OEM parts, 98% first-visit fix rate.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments",
    "legalName": "Sahara Office Equipment Trading LLC",
    "telephone": "+971503823969",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Arabi Building, Industrial Area 11",
      "addressLocality": "Sharjah",
      "addressCountry": "AE"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 25.2942534, "longitude": 55.4260483 }
  },
  "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah", "Fujairah", "Al Ain"],
  "serviceType": "Printer Repair",
  "availableChannel": {
    "@type": "ServiceChannel",
    "servicePhone": { "@type": "ContactPoint", "telephone": "+971503823969" },
    "availableLanguage": ["English", "Arabic"]
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "availableAtOrFrom": { "@type": "Place", "name": "UAE — On-Site" }
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get Printer Repair Service in Dubai UAE",
  "description": "Steps to book on-site printer repair service from Sahara Office Equipments in UAE",
  "totalTime": "PT4H",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "AED", "value": "Contact for quote" },
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Call or WhatsApp Us", "text": "Contact our support line at +971503823969 or WhatsApp. Describe your printer issue and model." },
    { "@type": "HowToStep", "position": 2, "name": "Technician Dispatched Within 1 Hour", "text": "A factory-certified technician is dispatched from the nearest service hub to your location." },
    { "@type": "HowToStep", "position": 3, "name": "On-Site Diagnosis & Repair", "text": "The technician performs a full diagnostic, sources OEM parts from our mobile parts inventory, and completes the repair." },
    { "@type": "HowToStep", "position": 4, "name": "Quality Check & Sign-Off", "text": "A test print run confirms the fix. You receive a service report with parts used and 30-day workmanship warranty." }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@id": "https://www.saharaprinter.com/services/repair/#faq",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/repair/#faq-1",
      "name": "How quickly can a printer repair technician reach my office in Dubai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For Dubai and Sharjah locations, our average response time is 4 hours for standard service and under 2 hours for emergency callouts. Abu Dhabi locations typically receive same-day service. We dispatch technicians from the nearest service hub to minimize travel time."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/repair/#faq-2",
      "name": "Do you use original OEM parts for printer repairs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — exclusively. Sahara only installs genuine OEM (Original Equipment Manufacturer) replacement parts for all brands including Canon, HP, Kyocera, Ricoh, and Xerox. We do not use compatible or third-party parts, which preserves your warranty and ensures long-term performance."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/repair/#faq-3",
      "name": "Which printer brands do you repair in UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our certified technicians repair all major printer and photocopier brands: Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp, Epson, Konica Minolta, and Toshiba. We carry mobile parts inventory for the most common models."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/repair/#faq-4",
      "name": "What is the cost of printer repair service in Dubai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Repair costs vary depending on the fault and parts required. We provide a transparent, itemized quote before any work begins — no surprise charges. Clients on our AMC (Annual Maintenance Contract) or printer rental plans receive repairs at no additional cost."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/repair/#faq-5",
      "name": "Do you offer emergency printer repair service on weekends?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We operate Saturday through Thursday, 8:00 AM – 8:00 PM, with 24/7 emergency support for critical failures. For rental clients and AMC contract holders, emergency response is guaranteed around the clock."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/repair/#faq-6",
      "name": "What warranty do you provide on printer repairs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All repair work carries a 30-day workmanship warranty. If the same fault recurs within 30 days of a completed repair, we return and fix it at no additional charge. OEM parts carry the manufacturer's standard warranty."
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Printer Repair UAE", "item": "https://www.saharaprinter.com/services/repair" }
  ]
};

const commonProblems = [
  { code: "Paper Jam", brand: "All Brands", desc: "Roller wear, debris buildup, or incorrect media. We clear jams and replace worn feed rollers on-site.", icon: "⚠️" },
  { code: "No Print Output", brand: "Canon / HP", desc: "Fuser assembly failure, drum unit end-of-life, or formatter board fault. Diagnosed in under 30 minutes.", icon: "🖨️" },
  { code: "Streaks / Lines", brand: "Kyocera / Ricoh", desc: "Dirty drum, scratched OPC drum, or developer unit failure. Cleaned or replaced with OEM components.", icon: "〰️" },
  { code: "Network / Wi-Fi Issues", brand: "All MFPs", desc: "NIC card failure, firmware corruption, or IP conflict. Reconfigured and tested against your network.", icon: "📶" },
  { code: "Error Codes", brand: "Xerox / Sharp", desc: "E-codes, SC codes, and service codes interpreted and resolved. Our technicians carry manufacturer error-code guides.", icon: "🔴" },
  { code: "Toner Not Fusing", brand: "All Brands", desc: "Fuser unit failure causes smearing or powdery output. Fuser replaced with OEM unit, calibrated to spec.", icon: "🔧" },
  { code: "Slow Printing", brand: "HP / Brother", desc: "Driver corruption, memory shortage, or clogged print heads. Firmware updated, memory expanded where possible.", icon: "🐢" },
  { code: "Scan / Copy Failure", brand: "Canon / Kyocera", desc: "ADF feed failure, scanner unit fault, or software error. Full multifunction diagnostic and component repair.", icon: "📄" },
];

const brandExpertise = [
  { name: "Canon", models: "imageRUNNER ADVANCE, i-SENSYS, PIXMA Pro", certLevel: "Factory Certified" },
  { name: "HP", models: "LaserJet Enterprise, OfficeJet Pro, DesignJet", certLevel: "Authorized Service" },
  { name: "Kyocera", models: "ECOSYS, TASKalfa, FS series", certLevel: "Factory Certified" },
  { name: "Ricoh", models: "MP series, IM series, SP series", certLevel: "Authorized Service" },
  { name: "Xerox", models: "VersaLink, AltaLink, WorkCentre", certLevel: "Authorized Service" },
  { name: "Brother", models: "MFC, DCP, HL series", certLevel: "Certified Partner" },
];

const processSteps = [
  { step: "01", title: "Call or WhatsApp", desc: "Describe your issue. Our support team triages the fault remotely and dispatches the right technician.", time: "< 5 min" },
  { step: "02", title: "Technician Dispatched", desc: "A certified engineer leaves from the nearest hub. Real-time tracking available on request.", time: "< 60 min" },
  { step: "03", title: "On-Site Diagnosis", desc: "Full diagnostic on your machine. Transparent cost quote before any part is touched.", time: "15–30 min" },
  { step: "04", title: "Repair & Test Run", desc: "OEM parts installed. 50-page test print run confirms the fix before the technician leaves.", time: "30–120 min" },
];

const industryUseCases = [
  { industry: "Real Estate", useCase: "High-volume contract printing for property agreements and brochures. We keep MFPs running during transaction peaks.", icon: "🏢" },
  { industry: "Healthcare & Clinics", useCase: "Critical patient document workflows must never fail. Priority response contracts for medical facilities.", icon: "🏥" },
  { industry: "Logistics & Shipping", useCase: "24/7 label and manifest printing demands zero downtime. Emergency response SLAs for operations teams.", icon: "🚚" },
  { industry: "Education", useCase: "Exam season and administrative surges covered. AMC plans for universities and training centres.", icon: "🎓" },
];

export default function RepairPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(repairServiceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    <main className="min-h-screen bg-[#071325]">
      <Header />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-0 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-[#f5be53]/8 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[#f5be53] transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/services/printer-rental/" className="hover:text-[#f5be53] transition-colors">Services</a>
            <span className="mx-2">/</span>
            <span className="text-[#f5be53]">Printer Repair UAE</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center pb-16">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-xs">Factory-Certified Technicians</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Printer Repair<br /><span className="text-[#f5be53]">Dubai & UAE</span>
              </h1>

              {/* AEO Answer Block */}
              <div className="bg-[#0d1b2e] border border-[#f5be53]/20 rounded-2xl p-5 mb-8">
                <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">Fix Printer Near Me — What is Printer Repair Service in UAE?</p>
                <p className="text-[#d3c5b0] text-sm leading-relaxed">
                  On-site printer repair is a professional service where factory-certified technicians visit your office,
                  diagnose the fault, and fix it using genuine OEM parts — with a 4-hour response time across Dubai, Sharjah,
                  Abu Dhabi, and all UAE emirates. As an HP Service Center in Dubai and authorized partner for Canon, Kyocera,
                  Ricoh, and Xerox, Sahara has completed 50,000+ repairs since 2012.
                </p>
              </div>

              {/* Trust Pill Row */}
              <div className="flex flex-wrap gap-3 mb-8">
                {["4-hr Response", "OEM Parts Only", "30-Day Warranty", "98% First-Visit Fix", "24/7 Emergency"].map((t) => (
                  <span key={t} className="text-xs font-bold text-white bg-[#f5be53]/10 border border-[#f5be53]/25 px-3 py-1.5 rounded-full">
                    ✓ {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/contact/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_4px_24px_rgba(245,190,83,0.35)]">
                  Book a Technician
                </a>
                <a href="tel:+971503823969" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors flex items-center gap-2">
                  <span>📞</span> +971 50 382 3969
                </a>
              </div>
            </div>

            {/* Hero Image from live site */}
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-[#f5be53]/10 rounded-3xl blur-xl" />
              <div className="relative rounded-3xl overflow-hidden border border-[#f5be53]/15"
                style={{ boxShadow: '0 0 60px rgba(245,190,83,0.12), 0 24px 80px rgba(0,0,0,0.5)' }}>
                <img
                  src="/images/homement.webp"
                  alt="Sahara certified printer repair technician servicing Canon photocopier in Dubai UAE"
                  className="w-full h-[480px] object-contain bg-[#0a1628]"
                  loading="eager"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#071325]/95 to-transparent p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="/images/seal-opt.webp"
                      alt="Sahara trusted service certification seal"
                      className="w-14 h-14 object-contain"
                    />
                    <div>
                      <p className="text-white font-bold text-sm">Certified Service Engineers</p>
                      <p className="text-[#f5be53] text-xs">13+ Years · 50,000+ Repairs Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="py-10 bg-[#050d1a] border-y border-[#f5be53]/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "50,000+", label: "Repairs Completed" },
              { value: "4 Hours", label: "Avg. Response Time" },
              { value: "98%", label: "First-Visit Fix Rate" },
              { value: "24/7", label: "Emergency Support" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-2xl md:text-3xl font-bold text-[#f5be53]">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Common Problems We Fix ── */}
      <section className="relative py-16 px-4 lg:px-12" style={{ background: '#050d1a' }}>
        {/* Circuit grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(245,190,83,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,190,83,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Fault Diagnosis</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">8 Printer Problems We Fix Daily</h2>
            <p className="text-[#7a94ad] max-w-lg mx-auto text-sm leading-relaxed">
              Our mobile parts inventory covers 95% of common faults — most resolved in a single visit without
              ordering parts from the manufacturer.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {commonProblems.map((p, i) => (
              <div key={i}
                className="relative group rounded-2xl p-6 cursor-default transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, rgba(10,20,38,0.95) 0%, rgba(5,12,24,0.98) 100%)',
                  border: '1px solid rgba(245,190,83,0.15)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}>
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1">{p.code}</h3>
                <p className="text-[#f5be53] text-xs font-semibold mb-2 opacity-70">{p.brand}</p>
                <p className="text-[#6a87a4] text-xs leading-relaxed">{p.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(90deg, transparent, #f5be53, transparent)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Expertise ── */}
      <section className="py-16 px-4 lg:px-12 bg-[#0a1425]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Brand Expertise</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">Certified for Every Major Brand</h2>
            <p className="text-[#7a94ad] max-w-md mx-auto text-sm">
              Unlike generalist repair shops, our engineers hold brand-specific certifications — meaning faster diagnosis and correct repairs the first time.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandExpertise.map((b, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 flex items-start gap-4 group hover:border-[#f5be53]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#f5be53]/10 border border-[#f5be53]/20 flex items-center justify-center shrink-0 text-[#f5be53] font-black text-xs">
                  {b.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold">{b.name}</h3>
                    <span className="text-[10px] font-bold text-[#f5be53] bg-[#f5be53]/10 px-2 py-0.5 rounded-full">{b.certLevel}</span>
                  </div>
                  <p className="text-[#6a87a4] text-xs">{b.models}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works — Process Timeline ── */}
      <section className="py-16 px-4 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Process</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">How a Repair Call Works</h2>
            <p className="text-[#7a94ad] text-sm">From your call to a working printer — typically under 4 hours.</p>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-12 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-px bg-gradient-to-r from-transparent via-[#f5be53]/30 to-transparent" />
            <div className="grid lg:grid-cols-4 gap-8">
              {processSteps.map((p, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f5be53] to-[#c8962e] text-[#412d00] font-black text-base flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(245,190,83,0.35)]">
                    {p.step}
                  </div>
                  <span className="text-[10px] font-bold text-[#f5be53] bg-[#f5be53]/10 px-2 py-0.5 rounded-full">{p.time}</span>
                  <h3 className="text-white font-bold mt-3 mb-2 text-sm">{p.title}</h3>
                  <p className="text-[#6a87a4] text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Industry Use Cases ── */}
      <section className="py-16 px-4 lg:px-12 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Who We Serve</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">Repair Service for Every Industry</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryUseCases.map((u, i) => (
              <div key={i}
                className="rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300"
                style={{
                  background: 'linear-gradient(150deg, rgba(15,26,42,0.95) 0%, rgba(8,14,28,0.98) 100%)',
                  border: '1px solid rgba(245,190,83,0.13)',
                }}>
                <div className="text-3xl mb-4">{u.icon}</div>
                <h3 className="text-white font-bold mb-2">{u.industry}</h3>
                <p className="text-[#6a87a4] text-xs leading-relaxed">{u.useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-8 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Questions</span>
          <h2 className="text-4xl font-bold text-white mt-3">Printer Repair FAQ</h2>
        </div>
        <div className="space-y-4">
          {faqSchema.mainEntity.map((faq, i) => (
            <details
              key={i}
              className="rounded-2xl p-6 group cursor-pointer"
              style={{
                background: 'linear-gradient(145deg, #0f1a2a 0%, #0a121c 100%)',
                boxShadow: '6px 6px 16px rgba(0,0,0,0.4), -3px -3px 10px rgba(255,255,255,0.03)',
              }}
              open={i === 0}
            >
              <summary className="flex justify-between items-center list-none font-bold text-base text-white pr-2">
                {faq.name}
                <span className="text-[#f5be53] text-xl shrink-0 ml-4 group-open:rotate-180 transition-transform duration-200">›</span>
              </summary>
              <p className="mt-4 text-[#d3c5b0] leading-relaxed text-sm">{faq.acceptedAnswer.text}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #f5be53 0%, #c8962e 100%)' }}>
          <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">Printer Down Right Now?</h2>
            <p className="text-[#483200] text-lg mb-8 max-w-xl mx-auto">
              Call us immediately. A certified technician will be at your location within 4 hours — or we dispatch a loaner machine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+971503823969" className="bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                📞 Call Now — +971 50 382 3969
              </a>
              <a href="/contact/" className="bg-white/20 border border-[#412d00]/30 text-[#412d00] px-10 py-5 rounded-full font-bold text-lg backdrop-blur-sm hover:bg-white/30 transition-colors">
                Book Online
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related — cross-link to Dubai-specific repair page to signal complementary (not duplicate) intent */}
      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Based in Dubai?</h2>
          <p className="text-[#d3c5b0] mb-6">
            This page covers our full UAE-wide repair process, brands serviced, and SLA terms. For Dubai
            district coverage, local response times, and area-specific details, see{" "}
            <a href="/printer-repair-dubai/" className="text-[#f5be53] font-semibold hover:underline">Printer Repair Dubai</a>.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
    </>
  );
}
