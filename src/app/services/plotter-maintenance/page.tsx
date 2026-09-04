export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import AnswerBlock from "@/components/AnswerBlock";

export const metadata: Metadata = {
  title: "Plotter Repair & Maintenance Dubai | Wide-Format Printer AMC | Sahara",
  description: "Plotter repair and AMC for wide-format printers across Dubai, Sharjah & Abu Dhabi. Canon imagePROGRAF, HP DesignJet, Epson SureColor. Printhead, media-feed & colour calibration. ☎ +971503823969",
  keywords: "plotter repair dubai, wide format printer maintenance uae, hp designjet service dubai, canon imageprograf amc, plotter amc sharjah, plotter maintenance uae, wide format plotter repair, plotter printhead cleaning dubai",
  openGraph: {
    title: "Plotter Maintenance & Repair UAE | Sahara Office Equipments",
    description: "Wide-format plotter repair and AMC across UAE — Canon imagePROGRAF, HP DesignJet, Epson SureColor. Printhead servicing, media-feed repair, colour calibration.",
    images: [{ url: "https://www.saharaprinter.com/images/service-maintanence.webp", width: 1200, height: 630, alt: "Plotter Maintenance and Repair UAE" }],
    url: "https://www.saharaprinter.com/services/plotter-maintenance/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/plotter-maintenance/" },
};

const plotterServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Plotter Maintenance & Repair Service UAE",
  "alternateName": "Wide-Format Printer AMC Dubai",
  "description": "Professional maintenance and repair for wide-format plotters across UAE — Canon imagePROGRAF, HP DesignJet, and Epson SureColor. Printhead servicing, media-feed and cutter repair, colour calibration, and encoder-strip cleaning by factory-trained technicians.",
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
  "serviceType": "Plotter Maintenance and Repair",
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
  "name": "How to Book Plotter Maintenance Service in Dubai UAE",
  "description": "Steps to book wide-format plotter repair or AMC service from Sahara Office Equipments in UAE",
  "totalTime": "PT4H",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "AED", "value": "Contact for quote" },
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Call or WhatsApp Us", "text": "Contact our support line at +971503823969. Describe the fault — banding, feed jam, printhead clog — and your plotter model." },
    { "@type": "HowToStep", "position": 2, "name": "Technician Dispatched", "text": "A technician trained on Canon imagePROGRAF, HP DesignJet, and Epson SureColor is dispatched from the nearest service hub." },
    { "@type": "HowToStep", "position": 3, "name": "On-Site Diagnosis & Repair", "text": "Full diagnostic covering printhead, ink lines, media feed, cutter, and encoder strip. OEM parts sourced from our mobile inventory." },
    { "@type": "HowToStep", "position": 4, "name": "Calibration & Test Plot", "text": "A colour calibration and full-size test plot confirms the fix. You receive a service report and 30-day workmanship warranty." }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@id": "https://www.saharaprinter.com/services/plotter-maintenance/#faq",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/plotter-maintenance/#faq-1",
      "name": "What is plotter maintenance and why does my wide-format printer need it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plotter maintenance is scheduled cleaning and calibration of a wide-format printer's printhead, ink lines, media-feed rollers, cutter, and encoder strip. Unlike standard office printers, plotters run large-format ink systems that clog or drift out of calibration if left unserviced — leading to banding, misaligned lines, and wasted media. Regular AMC servicing catches this before it affects output."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/plotter-maintenance/#faq-2",
      "name": "Which plotter brands do you service in UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We service Canon imagePROGRAF, HP DesignJet, and Epson SureColor wide-format plotters across Dubai, Sharjah, and Abu Dhabi — covering CAD, engineering, and large-format graphics models."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/plotter-maintenance/#faq-3",
      "name": "How much does plotter AMC cost in Dubai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plotter AMC pricing depends on model, print volume, and service frequency. We provide a transparent quote after a short site assessment — contact us for a plan tailored to your roll-width and monthly output."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/plotter-maintenance/#faq-4",
      "name": "What causes banding or misaligned lines on my plotter prints?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Banding is most often a clogged printhead nozzle or a contaminated encoder strip — the thin sensor strip that tracks carriage position. Misaligned lines usually point to a printhead alignment drift or a bowed media-feed roller. Both are corrected during a standard maintenance visit."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/plotter-maintenance/#faq-5",
      "name": "How often should a wide-format plotter be serviced?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For daily-use plotters in architecture, engineering, or print-shop environments, we recommend quarterly servicing. Lower-volume machines can run on a bi-annual schedule. AMC contract holders get their frequency set during onboarding based on actual print volume."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/plotter-maintenance/#faq-6",
      "name": "Do you offer emergency plotter repair for architecture and printing firms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We understand a plotter going down mid-deadline stops a project. AMC and rental clients receive priority dispatch, and we offer 24/7 emergency support for critical failures ahead of submission deadlines."
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
    { "@type": "ListItem", "position": 3, "name": "Plotter Maintenance", "item": "https://www.saharaprinter.com/services/plotter-maintenance" }
  ]
};

const commonProblems = [
  { code: "Printhead Clogging", brand: "Canon / HP / Epson", desc: "Dried ink blocks nozzles, causing banding or missing lines. We run nozzle checks and deep-clean cycles on-site.", icon: "🖋️" },
  { code: "Media Feed Jams", brand: "All Wide-Format", desc: "Roll media skews or jams on worn feed rollers. Rollers cleaned or replaced and roll-tension recalibrated.", icon: "📜" },
  { code: "Cutter Misalignment", brand: "Canon / HP", desc: "Auto-cutter drifts off-line or fails to cut cleanly. Blade realigned or replaced with an OEM unit.", icon: "✂️" },
  { code: "Colour Calibration Drift", brand: "All Brands", desc: "Output colour shifts from proof. Full ICC colour calibration restores print-to-screen accuracy.", icon: "🎨" },
  { code: "Encoder Strip Contamination", brand: "Canon / Epson", desc: "Dust on the carriage encoder strip causes banding and stepping errors. Cleaned and inspected for scratches.", icon: "📏" },
  { code: "Ink Line Leaks", brand: "HP DesignJet", desc: "Ink supply tube wear causes leaks or air bubbles in the line. Lines purged, resealed, or replaced.", icon: "💧" },
  { code: "RIP / Driver Errors", brand: "All Brands", desc: "Print jobs fail to reach the plotter from CAD or RIP software. Driver and network path reconfigured.", icon: "🖥️" },
  { code: "Roll-Feed Motor Faults", brand: "Epson / HP", desc: "Motor strain from oversized rolls or heavy media. Motor and gear train inspected and serviced.", icon: "⚙️" },
];

const brandExpertise = [
  { name: "Canon imagePROGRAF", models: "PRO series, TX series, iPF series", certLevel: "Authorized Service" },
  { name: "HP DesignJet", models: "Z series, T series, PostScript models", certLevel: "Authorized Service" },
  { name: "Epson SureColor", models: "P series, T series, wide-format range", certLevel: "Authorized Service" },
];

const processSteps = [
  { step: "01", title: "Call or WhatsApp", desc: "Describe the fault and your plotter model. We triage remotely and dispatch the right technician.", time: "< 5 min" },
  { step: "02", title: "Technician Dispatched", desc: "An engineer trained on wide-format hardware leaves from the nearest hub.", time: "< 60 min" },
  { step: "03", title: "On-Site Diagnosis", desc: "Printhead, ink lines, feed rollers, cutter, and encoder strip checked. Transparent quote before work starts.", time: "20–40 min" },
  { step: "04", title: "Repair, Calibrate & Test Plot", desc: "OEM parts installed, colour calibrated, and a full-size test plot confirms the fix.", time: "45–150 min" },
];

const industryUseCases = [
  { industry: "Architecture & Engineering", useCase: "CAD drawing sets and blueprints demand crisp lines at full scale. We keep plotters calibrated for submission deadlines.", icon: "📐" },
  { industry: "Construction & Contracting", useCase: "Site drawings and revision sets print daily on-site or in the project office. Priority AMC response minimizes downtime.", icon: "🏗️" },
  { industry: "Advertising & Signage", useCase: "Large-format proofs and banners need accurate, repeatable colour. Calibration service keeps client-facing output consistent.", icon: "🖼️" },
  { industry: "Retail & Interior Design", useCase: "POS graphics and mood boards run on tight production windows. Fast turnaround servicing keeps campaigns on schedule.", icon: "🛍️" },
];

export default function PlotterMaintenancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(plotterServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
            <span className="text-[#f5be53]">Plotter Maintenance</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center pb-16">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-xs">Wide-Format Specialists</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Plotter Maintenance<br /><span className="text-[#f5be53]">Dubai & UAE</span>
              </h1>

              <AnswerBlock
                question="How often should a wide-format plotter be serviced?"
                answer="Most wide-format plotters need a full service every three to six months. High-volume production units in Dubai print shops benefit from quarterly visits, while occasional-use office plotters can run six-monthly. A Sahara service covers printhead cleaning, ink-line checks, media-feed calibration, and colour accuracy testing on Canon imagePROGRAF, HP DesignJet, and Epson SureColor."
                supportingPoints={[
                  "Quarterly for production and reprographics use; six-monthly for low-volume office plotters",
                  "Each visit: printhead clean, ink-line check, media-feed calibration, colour accuracy test",
                  "Canon imagePROGRAF, HP DesignJet and Epson SureColor serviced with OEM parts only",
                  "Available on callout or under an AMC plan — current rates confirmed same working day by phone",
                ]}
              />

              {/* Trust Pill Row */}
              <div className="flex flex-wrap gap-3 mb-8">
                {["Canon · HP · Epson", "OEM Parts Only", "30-Day Warranty", "Colour Calibration", "AMC Plans Available"].map((t) => (
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

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#f5be53]/10 rounded-3xl blur-xl" />
              <div className="relative rounded-3xl overflow-hidden border border-[#f5be53]/15"
                style={{ boxShadow: '0 0 60px rgba(245,190,83,0.12), 0 24px 80px rgba(0,0,0,0.5)' }}>
                <img
                  src="/images/service-maintanence.webp"
                  alt="Sahara technician servicing a wide-format plotter printer in Dubai UAE"
                  className="w-full h-[480px] object-contain bg-[#0a1628]"
                  loading="eager"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#071325]/95 to-transparent p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="/images/seal-opt.webp"
                      alt="Sahara trusted service certification seal"
                      className="w-14 h-14 object-contain"
                    />
                    <div>
                      <p className="text-white font-bold text-sm">Wide-Format Certified Engineers</p>
                      <p className="text-[#f5be53] text-xs">Canon · HP · Epson Plotter Specialists</p>
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
              { value: "3 Brands", label: "Canon · HP · Epson" },
              { value: "OEM Only", label: "Genuine Replacement Parts" },
              { value: "30-Day", label: "Workmanship Warranty" },
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
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(245,190,83,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,190,83,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Fault Diagnosis</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">8 Plotter Problems We Fix</h2>
            <p className="text-[#7a94ad] max-w-lg mx-auto text-sm leading-relaxed">
              Wide-format faults differ from standard office printers. Our mobile parts inventory covers printhead,
              ink-line, and media-feed components for the most common plotter models.
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
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">Serviced for Every Major Plotter Line</h2>
            <p className="text-[#7a94ad] max-w-md mx-auto text-sm">
              Wide-format hardware needs technicians who work on it daily — not a generalist printer repair shop.
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
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">How a Plotter Service Call Works</h2>
            <p className="text-[#7a94ad] text-sm">From your call to a calibrated test plot.</p>
          </div>
          <div className="relative">
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
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">Plotter Service for Every Industry</h2>
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
          <h2 className="text-4xl font-bold text-white mt-3">Plotter Maintenance FAQ</h2>
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
        <div className="max-w-4xl mx-auto rounded-panel p-12 md:p-16 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #f5be53 0%, #c8962e 100%)' }}>
          <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">Plotter Down Mid-Deadline?</h2>
            <p className="text-[#483200] text-lg mb-8 max-w-xl mx-auto">
              Call us immediately. A wide-format certified technician will diagnose printhead, feed, and calibration
              faults on-site.
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

      {/* Related — cross-link to neighbouring service pages to signal complementary (not duplicate) intent */}
      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Looking for Standard Printer Service?</h2>
          <p className="text-[#d3c5b0] mb-6">
            This page covers wide-format plotter servicing specifically. For desktop and office MFP repairs, see{" "}
            <a href="/services/repair/" className="text-[#f5be53] font-semibold hover:underline">Printer Repair UAE</a>.
            For fleet-wide contract coverage across both plotters and office printers, see{" "}
            <a href="/services/amc/" className="text-[#f5be53] font-semibold hover:underline">Annual Maintenance Contracts</a>.
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
