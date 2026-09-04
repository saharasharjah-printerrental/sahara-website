export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import AnswerBlock from "@/components/AnswerBlock";

export const metadata: Metadata = {
  // Position 9.5 with 0.99% CTR — top-10 and barely clicked, the largest
  // CTR-versus-position gap on the site. Old title led with the formal term
  // rather than the searched one and ran to 69 characters, so it truncated
  // before reaching any differentiator.
  title: "Printer AMC Dubai & UAE | From AED 299/mo, Parts Included",
  description: "Printer & photocopier AMC across Dubai, Sharjah and Abu Dhabi from AED 299/month. All parts, labour and preventive servicing included — no per-visit charges. 4-hour response, OEM parts only, Canon/HP/Kyocera/Ricoh certified. ☎ +971503823969",
  keywords: "printer amc dubai, annual maintenance contract printer uae, photocopier amc sharjah, printer service contract uae, printer maintenance plan dubai, copier amc abu dhabi",
  openGraph: {
    title: "Annual Maintenance Contract (AMC) for Printers UAE | Sahara Office Equipments",
    description: "Comprehensive printer AMC plans from AED 299/month. All parts, priority response, and dedicated technician options across UAE.",
    images: [{ url: "https://www.saharaprinter.com/images/heroPrntr1.webp", width: 1200, height: 630, alt: "Printer AMC UAE" }],
    url: "https://www.saharaprinter.com/services/amc/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/amc/" },
};

const amcServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Annual Maintenance Contract (AMC) for Printers UAE",
  "alternateName": "Printer AMC Dubai",
  "description": "Comprehensive annual maintenance contracts for office printers and photocopiers in UAE. Plans include quarterly to weekly servicing, all OEM parts, priority technical response, and optional dedicated technician. Serving Dubai, Sharjah, Abu Dhabi, and all UAE emirates.",
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
  "serviceType": "Annual Maintenance Contract",
  "offers": [
    {
      "@type": "Offer",
      "name": "Basic AMC Plan",
      "description": "Quarterly maintenance visits with priority support. Labour included, parts extra.",
      "price": "299",
      "priceCurrency": "AED",
      "priceSpecification": { "@type": "UnitPriceSpecification", "price": "299", "priceCurrency": "AED", "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitText": "month" } }
    },
    {
      "@type": "Offer",
      "name": "Professional AMC Plan",
      "description": "Monthly maintenance, all OEM parts included, 24/7 support, loaner device during extended repairs.",
      "price": "499",
      "priceCurrency": "AED"
    },
    {
      "@type": "Offer",
      "name": "Enterprise AMC Plan",
      "description": "Weekly maintenance, dedicated on-site technician, SLA guarantees, multi-location coverage. Custom pricing — contact for quote.",
      "price": "0",
      "priceCurrency": "AED"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@id": "https://www.saharaprinter.com/services/amc/#faq",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/amc/#faq-exclusions",
      "name": "What does a printer AMC cover, and what is excluded?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Sahara AMC includes scheduled preventive servicing at manufacturer intervals, all labour for corrective repairs with unlimited call-outs, genuine OEM replacement parts such as rollers, fusers and drums, priority emergency response with a four-hour UAE-wide target, firmware updates, network reconfiguration, an annual deep clean and calibration, and remote diagnostic support. Excluded and quoted separately are: toner and ink consumables (these are included free on rental contracts but not on AMC), paper and media, damage from misuse or unauthorised third-party repair, relocation between premises, devices past manufacturer end-of-support where parts are unobtainable, and complete device replacement — an AMC maintains equipment you already own."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/amc/#faq-copier",
      "name": "Do you offer AMC for photocopiers as well as printers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Sahara maintains Canon imageRUNNER ADVANCE, Kyocera TASKalfa, Ricoh MP, Xerox AltaLink and Sharp MX series photocopiers under annual maintenance contracts, including devices purchased elsewhere. Photocopier AMC is priced on monthly page volume and colour split rather than a flat device fee, because servicing intervals scale with usage — a copier running 20,000 pages a month needs a different schedule to one running 3,000."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/amc/#faq-1",
      "name": "What is an Annual Maintenance Contract (AMC) for printers in UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Printer Annual Maintenance Contract (AMC) is a service agreement where Sahara's certified technicians perform scheduled preventive maintenance visits on your office printers and photocopiers throughout the year. It includes regular servicing, cleaning, calibration, and priority emergency response — at a fixed monthly or annual fee. AMC clients avoid unpredictable repair bills and get priority over non-contract clients."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/amc/#faq-2",
      "name": "How is a Printer AMC different from a rental plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With a printer rental from Sahara, you pay a monthly fee that includes the machine, toner, maintenance, and repairs — you never own the equipment. A Printer AMC is for equipment you already own: you pay a service contract fee covering maintenance and repairs, but continue owning the machine. If you own your printers and want to protect them, choose AMC. If you need equipment too, choose rental."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/amc/#faq-3",
      "name": "What does the Sahara Professional AMC plan include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Professional AMC plan (AED 499/month per machine) includes: monthly preventive maintenance visits, all OEM replacement parts at no extra cost, 24/7 emergency support, a loaner device if repair exceeds 24 hours, priority scheduling, and a quarterly performance report for your fleet."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/amc/#faq-4",
      "name": "How many printers can be covered under one AMC contract?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There is no minimum or maximum. Sahara covers single machines and multi-site enterprise fleets of 100+ devices under consolidated AMC contracts. Multi-machine contracts receive volume pricing discounts — contact our team for a fleet assessment and customized quote."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/amc/#faq-5",
      "name": "Is toner included in the printer AMC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Toner is not included in the Basic AMC plan but is included in our printer rental plans. The Professional and Enterprise AMC plans can be upgraded to include toner supply at an additional per-page or monthly rate. This is recommended for high-volume offices printing more than 3,000 pages per month."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/amc/#faq-6",
      "name": "Do you offer AMC for all printer brands?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Sahara's AMC covers all major printer and photocopier brands: Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp, Epson, Konica Minolta, and Toshiba. Our technicians hold brand-specific certifications for Canon and Kyocera, and are authorized service partners for HP and Xerox."
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
    { "@type": "ListItem", "position": 3, "name": "Annual Maintenance Contract", "item": "https://www.saharaprinter.com/services/amc" }
  ]
};

const plans = [
  {
    name: "Basic",
    price: "AED 299",
    period: "/month",
    tag: null,
    color: "border-white/10",
    features: [
      { text: "Quarterly maintenance visits", included: true },
      { text: "Priority scheduling over walk-ins", included: true },
      { text: "Labour & call-out charges included", included: true },
      { text: "OEM replacement parts", included: false },
      { text: "24/7 emergency support", included: false },
      { text: "Loaner device during repair", included: false },
      { text: "Quarterly performance report", included: false },
    ],
    cta: "Get Started",
    ctaStyle: "glass-card text-white"
  },
  {
    name: "Professional",
    price: "AED 499",
    period: "/month",
    tag: "Most Popular",
    color: "border-[#f5be53]",
    features: [
      { text: "Monthly maintenance visits", included: true },
      { text: "Priority scheduling over walk-ins", included: true },
      { text: "Labour & call-out charges included", included: true },
      { text: "All OEM replacement parts included", included: true },
      { text: "24/7 emergency support", included: true },
      { text: "Loaner device during extended repair", included: true },
      { text: "Quarterly performance report", included: true },
    ],
    cta: "Get Quote",
    ctaStyle: "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00]"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: " pricing",
    tag: "Multi-Location",
    color: "border-white/10",
    features: [
      { text: "Weekly on-site maintenance", included: true },
      { text: "Dedicated assigned technician", included: true },
      { text: "Labour & call-out charges included", included: true },
      { text: "All OEM replacement parts included", included: true },
      { text: "24/7 emergency with 2-hr SLA", included: true },
      { text: "Loaner device guaranteed", included: true },
      { text: "Monthly reporting & analytics", included: true },
    ],
    cta: "Contact Us",
    ctaStyle: "glass-card text-white"
  },
];

const comparisonRows = [
  { label: "Regular Maintenance", noAmc: "When breakdown occurs", withAmc: "Scheduled preventively", rental: "Included, managed by Sahara" },
  { label: "Repair Cost", noAmc: "Full cost per incident", withAmc: "Included (Professional+)", rental: "Fully included, always" },
  { label: "OEM Parts", noAmc: "Purchased separately", withAmc: "Included (Professional+)", rental: "Always included" },
  { label: "Response Time", noAmc: "Standard (no priority)", withAmc: "Priority queue, 4-hr avg", rental: "Priority queue, 4-hr avg" },
  { label: "Toner Supply", noAmc: "You purchase separately", withAmc: "Add-on available", rental: "Unlimited, fully included" },
  { label: "Machine Ownership", noAmc: "You own the machine", withAmc: "You own the machine", rental: "Sahara owns — zero capex" },
  { label: "Monthly Cost Predictability", noAmc: "Unpredictable", withAmc: "Fixed monthly fee", rental: "Fixed monthly fee" },
];

const industryUseCases = [
  {
    industry: "Real Estate Agencies",
    challenge: "High-volume contract printing spikes with property launches. Unexpected breakdowns disrupt deals.",
    solution: "Monthly AMC ensures machines are serviced before busy periods. Priority callout keeps workflows running.",
    icon: "🏢",
    stat: "70% fewer unplanned breakdowns"
  },
  {
    industry: "Medical Clinics & Hospitals",
    challenge: "Patient records, prescriptions, and lab reports cannot wait for a repair team to arrive.",
    solution: "Enterprise AMC with 2-hr SLA and loaner machine guarantees zero document workflow interruption.",
    icon: "🏥",
    stat: "24/7 emergency coverage"
  },
  {
    industry: "Schools & Universities",
    challenge: "Exam periods bring peak printing demand. Breakdowns during exams are catastrophic.",
    solution: "Preventive servicing scheduled before exam season. Emergency response covers the entire campus fleet.",
    icon: "🎓",
    stat: "100% uptime during exams"
  },
  {
    industry: "Logistics & Shipping",
    challenge: "Label and manifest printers run 24/7. Any downtime stops shipment processing.",
    solution: "Enterprise AMC with dedicated technician on weekly rotation. Parts kept on-site for zero-delay repair.",
    icon: "🚚",
    stat: "< 2-hour repair response"
  },
];

const whatIsAMC = [
  { q: "Preventive, not reactive", a: "AMC schedules maintenance before breakdowns happen — not after your office is paralyzed." },
  { q: "Fixed cost, no surprises", a: "One monthly fee replaces unpredictable repair invoices. Budget with confidence." },
  { q: "Priority over walk-ins", a: "AMC clients jump the service queue. Emergency callouts are treated as critical." },
  { q: "Compliance documentation", a: "Receive service records every visit — required for ISO and industry compliance audits." },
];

export default function AMCPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(amcServiceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    <main className="min-h-screen bg-[#071325]">
      <Header />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f5be53]/6 rounded-full blur-[200px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[#f5be53] transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/services/printer-rental/" className="hover:text-[#f5be53] transition-colors">Services</a>
            <span className="mx-2">/</span>
            <span className="text-[#f5be53]">Annual Maintenance Contract</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-xs">Protect Your Fleet</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Printer AMC<br /><span className="text-[#f5be53]">Dubai & UAE</span>
              </h1>

              <AnswerBlock
                question="What does a printer AMC cover, and what is excluded?"
                answer="A printer AMC covers preventive servicing, labour, and priority emergency callouts. Sahara's plans start from AED 299 per month per machine and include scheduled visits, unlimited breakdown calls, and OEM spare parts. Consumables — toner, ink, and paper — are billed separately, as are machines damaged by misuse or power surges."
                supportingPoints={[
                  "From AED 299/month per machine, covering labour, spare parts and unlimited breakdown calls",
                  "Excluded: toner, ink, paper, and damage from misuse, power surges or unauthorised servicing",
                  "Covers Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp and Epson, including out-of-warranty units",
                  "4-hour emergency response target across all seven emirates; multi-site fleet plans available",
                ]}
              />

              {/* Trust Pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                {["From AED 299/mo", "All Brands Covered", "Priority Response", "OEM Parts Included", "Multi-Site Plans"].map((t) => (
                  <span key={t} className="text-xs font-bold text-white bg-[#f5be53]/10 border border-[#f5be53]/25 px-3 py-1.5 rounded-full">
                    ✓ {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/rental-calculator/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_4px_24px_rgba(245,190,83,0.35)]">
                  Get AMC Quote
                </a>
                <a href="tel:+971503823969" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors flex items-center gap-2">
                  <span>📞</span> +971 50 382 3969
                </a>
              </div>
            </div>

            {/* What AMC Does */}
            <div className="space-y-4">
              <h2 className="text-white font-bold text-xl mb-6">Why AMC instead of break-fix repairs?</h2>
              {whatIsAMC.map((item, i) => (
                <div key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{
                    background: 'linear-gradient(145deg, #0d1b2e 0%, #091422 100%)',
                    border: '1px solid rgba(245,190,83,0.12)',
                  }}>
                  <div className="w-8 h-8 rounded-lg bg-[#f5be53]/15 border border-[#f5be53]/25 flex items-center justify-center text-[#f5be53] font-black text-sm shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">{item.q}</p>
                    <p className="text-[#6a87a4] text-xs leading-relaxed">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison Table: No AMC vs AMC vs Rental ── */}
      <section className="py-16 px-4 lg:px-12 bg-[#050d1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Decision Guide</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">AMC vs. No Contract vs. Rental</h2>
            <p className="text-[#7a94ad] max-w-lg mx-auto text-sm">
              Choose the right model for your business — not what costs least today, but what costs least overall.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(245,190,83,0.15)' }}>
            <table className="w-full min-w-[640px]">
              <thead>
                <tr style={{ background: 'rgba(245,190,83,0.08)', borderBottom: '1px solid rgba(245,190,83,0.15)' }}>
                  <th className="text-left text-white font-bold py-4 px-6 text-sm">Factor</th>
                  <th className="text-center text-slate-400 font-bold py-4 px-4 text-sm">Own Printer<br /><span className="text-xs font-normal">No Contract</span></th>
                  <th className="text-center text-[#f5be53] font-bold py-4 px-4 text-sm border-x border-[#f5be53]/20">Own Printer<br /><span className="text-xs font-normal">With AMC</span></th>
                  <th className="text-center text-white font-bold py-4 px-4 text-sm">Sahara Rental<br /><span className="text-xs font-normal">All-Inclusive</span></th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i}
                    className="border-t"
                    style={{
                      background: i % 2 === 0 ? 'rgba(10,20,38,0.6)' : 'rgba(7,15,30,0.6)',
                      borderColor: 'rgba(255,255,255,0.04)'
                    }}>
                    <td className="py-4 px-6 text-white text-sm font-medium">{row.label}</td>
                    <td className="py-4 px-4 text-center text-slate-500 text-xs">{row.noAmc}</td>
                    <td className="py-4 px-4 text-center text-[#d3c5b0] text-xs border-x border-[#f5be53]/10">{row.withAmc}</td>
                    <td className="py-4 px-4 text-center text-[#f5be53] text-xs font-medium">{row.rental}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-slate-600 text-xs mt-4">
            * OEM parts included from Professional AMC tier. Rental plans always include parts, toner, and machine.
          </p>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="py-16 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">AMC Plans</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">Choose Your Coverage Level</h2>
            <p className="text-[#7a94ad] max-w-md mx-auto text-sm">All plans include a dedicated account manager and monthly service reports.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div key={i}
                className={`relative rounded-3xl p-8 border-2 ${plan.color} flex flex-col`}
                style={{
                  background: 'linear-gradient(160deg, rgba(10,20,36,0.97) 0%, rgba(5,12,24,0.99) 100%)',
                  boxShadow: plan.tag === "Most Popular"
                    ? '0 0 0 1px rgba(245,190,83,0.2), 0 0 40px rgba(245,190,83,0.1), 0 20px 60px rgba(0,0,0,0.5)'
                    : '0 8px 32px rgba(0,0,0,0.4)',
                }}>
                {plan.tag && (
                  <div className="text-center mb-4 -mt-2">
                    <span className="bg-[#f5be53] text-[#412d00] px-4 py-1 rounded-full text-xs font-black uppercase">
                      {plan.tag}
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white text-center mb-1">{plan.name}</h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-black text-[#f5be53]">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <span className={f.included ? "text-[#f5be53]" : "text-slate-600"}>
                        {f.included ? "✓" : "✗"}
                      </span>
                      <span className={f.included ? "text-[#d3c5b0]" : "text-slate-600"}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <a href="/rental-calculator/"
                  className={`block text-center py-4 rounded-full font-bold transition-all hover:scale-[1.02] ${plan.ctaStyle}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-xs mt-8">
            Prices are per machine per month. Multi-machine fleet discounts available. Contact us for a fleet assessment.
          </p>
        </div>
      </section>

      {/* ── Industry Use Cases ── */}
      <section className="py-16 px-4 lg:px-12 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Industry Coverage</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">AMC for Your Industry</h2>
            <p className="text-[#7a94ad] max-w-md mx-auto text-sm">Different businesses face different printing pressures. Our AMC plans adapt to your workload.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {industryUseCases.map((u, i) => (
              <div key={i}
                className="rounded-2xl p-8 group hover:-translate-y-1 transition-all duration-300"
                style={{
                  background: 'linear-gradient(150deg, rgba(15,26,42,0.97) 0%, rgba(8,14,28,0.98) 100%)',
                  border: '1px solid rgba(245,190,83,0.13)',
                }}>
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{u.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-bold">{u.industry}</h3>
                      <span className="text-[10px] text-[#f5be53] font-bold bg-[#f5be53]/10 px-2 py-0.5 rounded-full">{u.stat}</span>
                    </div>
                    <p className="text-slate-500 text-xs mb-3"><strong className="text-slate-400">Challenge:</strong> {u.challenge}</p>
                    <p className="text-[#6a87a4] text-xs"><strong className="text-slate-300">Solution:</strong> {u.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's covered vs excluded ──
           "What does a printer AMC cover" is a definitional query and the exact
           shape answer engines lift. Stating exclusions plainly is also the single
           most common pre-sales question. */}
      <section className="py-24 px-8 lg:px-24 bg-[#0a1524]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">No Surprises</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">What a Sahara AMC Covers — and What It Does Not</h2>
            <p className="text-[#7a94ad] max-w-2xl mx-auto text-sm">
              Most AMC disputes in the UAE come from unclear scope. Ours is stated in full before you sign.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-7 border border-[#f5be53]/20">
              <h3 className="text-white font-bold text-lg mb-5">Included in every contract</h3>
              <ul className="space-y-3">
                {[
                  "Scheduled preventive servicing at manufacturer-specified intervals",
                  "All labour for corrective repairs, unlimited call-outs",
                  "Genuine OEM replacement parts — rollers, fusers, drums, feed assemblies",
                  "Priority emergency response, four-hour target across the UAE",
                  "Firmware updates and network reconfiguration",
                  "Annual deep clean and calibration",
                  "Telephone and remote diagnostic support during working hours",
                ].map((s) => (
                  <li key={s} className="flex gap-3 text-[#d3c5b0] text-sm leading-relaxed">
                    <span className="text-[#f5be53] font-bold mt-0.5">✓</span><span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-2xl p-7 border border-[#4f4536]/40">
              <h3 className="text-white font-bold text-lg mb-5">Not included — quoted separately</h3>
              <ul className="space-y-3">
                {[
                  "Toner and ink consumables (included free on rental contracts, not on AMC)",
                  "Paper and media",
                  "Damage from misuse, liquid ingress, or unauthorised third-party repair",
                  "Relocation of equipment between premises",
                  "Devices beyond manufacturer end-of-support where parts are unobtainable",
                  "Complete device replacement — an AMC maintains equipment you own",
                ].map((s) => (
                  <li key={s} className="flex gap-3 text-[#8fa3bc] text-sm leading-relaxed">
                    <span className="text-[#8fa3bc] font-bold mt-0.5">−</span><span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-[#d3c5b0] text-sm leading-relaxed mt-8 max-w-3xl mx-auto text-center">
            If you would rather not manage consumables or exclusions at all, a{" "}
            <a href="/services/printer-rental/" className="text-[#f5be53] hover:underline">printer rental</a> or{" "}
            <a href="/services/photocopier-rental/" className="text-[#f5be53] hover:underline">photocopier rental</a>{" "}
            contract folds toner, maintenance and the device itself into one monthly figure.
          </p>
        </div>
      </section>

      {/* ── Photocopier AMC + brands + emirate coverage ──
           GSC shows this page at position 35.7 for "photocopier maintenance uae"
           and 44.4 for "affordable photocopier maintenance company in uae" — copier
           AMC demand exists and the page was printer-shaped. */}
      <section className="py-24 px-8 lg:px-24">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Photocopier and Copier AMC</h2>
            <p className="text-[#d3c5b0] leading-relaxed mb-4">
              A photocopier AMC works the same way as a printer AMC but matters more, because an A3 multifunction
              device is usually shared across a whole floor — when it stops, so does everyone's work. Copier contracts
              are priced on monthly page volume and colour split rather than a flat device fee, because a machine
              running 20,000 pages a month needs a different servicing interval to one running 3,000.
            </p>
            <p className="text-[#d3c5b0] leading-relaxed">
              We maintain Canon imageRUNNER ADVANCE, Kyocera TASKalfa, Ricoh MP, Xerox AltaLink and Sharp MX series
              copiers, including devices bought elsewhere. If you own the equipment outright, an AMC is normally
              cheaper than paying per call-out; if you would rather not own it at all,{" "}
              <a href="/services/photocopier-rental/" className="text-[#f5be53] hover:underline">photocopier rental</a>{" "}
              includes the same cover plus the device and toner.
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Brands we hold parts for</h2>
            <p className="text-[#d3c5b0] leading-relaxed mb-5">
              Our technicians are certified on Canon and Kyocera and are authorised service partners for HP and Xerox.
              We stock consumables and wear parts for the models we service at our Sharjah workshop, which is why most
              common faults are resolved on the first visit rather than after a parts order.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                ["Canon", "/brands/canon/"], ["Kyocera", "/brands/kyocera/"], ["HP", "/brands/hp/"],
                ["Xerox", "/brands/xerox/"], ["Ricoh", "/brands/ricoh/"], ["Sharp", "/brands/sharp/"],
                ["Brother", "/brands/brother/"], ["Epson", "/brands/epson/"], ["Lexmark", "/brands/lexmark/"],
                ["Konica Minolta", "/brands/konica-minolta/"],
              ].map(([n, href]) => (
                <a key={n} href={href} className="px-4 py-2 rounded-full bg-[#142032] border border-[#f5be53]/20 text-sm text-[#d3c5b0] hover:text-[#f5be53] hover:border-[#f5be53]/50 transition-colors">
                  {n}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white mb-4">AMC coverage across the UAE</h2>
            <p className="text-[#d3c5b0] leading-relaxed">
              Contracts are serviced from our Sharjah Industrial Area 11 workshop, with engineers covering{" "}
              <a href="/printer-rental-dubai/" className="text-[#f5be53] hover:underline">Dubai</a>,{" "}
              <a href="/photocopier-rental-sharjah/" className="text-[#f5be53] hover:underline">Sharjah</a>,{" "}
              <a href="/printer-rental-abu-dhabi/" className="text-[#f5be53] hover:underline">Abu Dhabi</a>,{" "}
              <a href="/printer-rental-al-ain/" className="text-[#f5be53] hover:underline">Al Ain</a>,{" "}
              <a href="/printer-rental-fujairah/" className="text-[#f5be53] hover:underline">Fujairah</a>,{" "}
              <a href="/printer-rental-rak/" className="text-[#f5be53] hover:underline">Ras Al Khaimah</a>, Ajman and
              Umm Al Quwain — including the free zones at JAFZA, SAIF Zone, Hamriyah and Dubai Airport Free Zone.
              Multi-site organisations are covered under a single contract with one consolidated invoice rather than
              a separate agreement per location. Our four-hour response target applies UAE-wide; devices in Sharjah
              and northern Dubai are typically reached faster given the workshop's location.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-8 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Questions</span>
          <h2 className="text-4xl font-bold text-white mt-3">Printer AMC FAQ</h2>
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

      {/* ── Related Services ── */}
      <section className="py-12 px-8 lg:px-24 bg-[#050d1a]">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Related Services</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/services/printer-rental/", label: "Printer Rental" },
              { href: "/services/repair/", label: "Printer Repair" },
              { href: "/services/printer-spare-parts/", label: "Toner & Spare Parts" },
              { href: "/services/pvc-card-printer-sales/", label: "PVC Card Printer Sales" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full border border-[#f5be53]/20 text-slate-400 text-xs hover:text-white hover:border-[#f5be53]/40 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #f5be53 0%, #c8962e 100%)' }}>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-black/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">Protect Your Entire Fleet</h2>
            <p className="text-[#483200] text-lg mb-8 max-w-xl mx-auto">
              Get a customized AMC proposal for your organization within 24 hours. Fleet assessments are free and non-obligatory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/rental-calculator/" className="bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                Request AMC Quote
              </a>
              <a href="tel:+971503823969" className="bg-white/20 border border-[#412d00]/30 text-[#412d00] px-10 py-5 rounded-full font-bold text-lg backdrop-blur-sm hover:bg-white/30 transition-colors">
                📞 Call Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
    </>
  );
}
