export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import ComparisonTable from "@/components/ui/ComparisonTable";
import CtaBand from "@/components/ui/CtaBand";
import {
  AwardIcon,
  HeadsetIcon,
  ClockIcon,
  TruckIcon,
} from "@/components/icons";

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
    highlight: false,
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
  },
  {
    name: "Professional",
    price: "AED 499",
    period: "/month",
    tag: "Most Popular",
    highlight: true,
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
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: " pricing",
    tag: "Multi-Location",
    highlight: false,
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
  },
];

const comparisonRows: [string, string, string, string][] = [
  ["Regular Maintenance", "When breakdown occurs", "Scheduled preventively", "Included, managed by Sahara"],
  ["Repair Cost", "Full cost per incident", "Included (Professional+)", "Fully included, always"],
  ["OEM Parts", "Purchased separately", "Included (Professional+)", "Always included"],
  ["Response Time", "Standard (no priority)", "Priority queue, 4-hr avg", "Priority queue, 4-hr avg"],
  ["Toner Supply", "You purchase separately", "Add-on available", "Unlimited, fully included"],
  ["Machine Ownership", "You own the machine", "You own the machine", "Sahara owns — zero capex"],
  ["Monthly Cost Predictability", "Unpredictable", "Fixed monthly fee", "Fixed monthly fee"],
];

const industryUseCases = [
  {
    industry: "Real Estate Agencies",
    challenge: "High-volume contract printing spikes with property launches. Unexpected breakdowns disrupt deals.",
    solution: "Monthly AMC ensures machines are serviced before busy periods. Priority callout keeps workflows running.",
    icon: AwardIcon,
    stat: "70% fewer unplanned breakdowns"
  },
  {
    industry: "Medical Clinics & Hospitals",
    challenge: "Patient records, prescriptions, and lab reports cannot wait for a repair team to arrive.",
    solution: "Enterprise AMC with 2-hr SLA and loaner machine guarantees zero document workflow interruption.",
    icon: HeadsetIcon,
    stat: "24/7 emergency coverage"
  },
  {
    industry: "Schools & Universities",
    challenge: "Exam periods bring peak printing demand. Breakdowns during exams are catastrophic.",
    solution: "Preventive servicing scheduled before exam season. Emergency response covers the entire campus fleet.",
    icon: ClockIcon,
    stat: "100% uptime during exams"
  },
  {
    industry: "Logistics & Shipping",
    challenge: "Label and manifest printers run 24/7. Any downtime stops shipment processing.",
    solution: "Enterprise AMC with dedicated technician on weekly rotation. Parts kept on-site for zero-delay repair.",
    icon: TruckIcon,
    stat: "< 2-hour repair response"
  },
];

const whatIsAMC = [
  { q: "Preventive, not reactive", a: "AMC schedules maintenance before breakdowns happen — not after your office is paralyzed." },
  { q: "Fixed cost, no surprises", a: "One monthly fee replaces unpredictable repair invoices. Budget with confidence." },
  { q: "Priority over walk-ins", a: "AMC clients jump the service queue. Emergency callouts are treated as critical." },
  { q: "Compliance documentation", a: "Receive service records every visit — required for ISO and industry compliance audits." },
];

const brandLinks: [string, string][] = [
  ["Canon", "/brands/canon/"], ["Kyocera", "/brands/kyocera/"], ["HP", "/brands/hp/"],
  ["Xerox", "/brands/xerox/"], ["Ricoh", "/brands/ricoh/"], ["Sharp", "/brands/sharp/"],
  ["Brother", "/brands/brother/"], ["Epson", "/brands/epson/"], ["Lexmark", "/brands/lexmark/"],
  ["Konica Minolta", "/brands/konica-minolta/"],
];

const relatedServices = [
  { href: "/services/printer-rental/", label: "Printer Rental" },
  { href: "/services/repair/", label: "Printer Repair" },
  { href: "/services/printer-spare-parts/", label: "Toner & Spare Parts" },
  { href: "/services/pvc-card-printer-sales/", label: "PVC Card Printer Sales" },
];

const trail = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Annual Maintenance Contract" },
];

export default function AMCPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(amcServiceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>

      <main className="min-h-screen bg-surface">
        <Header />

        {/* Hero — custom, not ProductHero: the right column is a numbered
            feature list rather than a product photo, so ProductHero's
            image slot doesn't fit this page's content. */}
        <section className="relative overflow-hidden px-6 pb-16 pt-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-[36rem] w-[36rem] -translate-y-1/3 translate-x-1/4 rounded-full bg-primary/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-content">
            <Breadcrumbs trail={trail} />
            <div className="grid items-start gap-14 lg:grid-cols-2">
              <Reveal>
                <p className="mb-5 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Protect Your Fleet</p>
                <h1 className="font-sora text-display-xl font-extrabold text-white">
                  Printer AMC
                  <br />
                  <span className="text-primary">Dubai &amp; UAE</span>
                </h1>
                <div className="mt-6">
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
                </div>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {["From AED 299/mo", "All Brands Covered", "Priority Response", "OEM Parts Included", "Multi-Site Plans"].map((t) => (
                    <li key={t} className="flex items-center gap-2 text-caption text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a href="/rental-calculator/" className="btn-primary">Get AMC Quote</a>
                  <a href="tel:+971503823969" className="btn-secondary">+971 50 382 3969</a>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="mb-6 text-xl font-bold text-white">Why AMC instead of break-fix repairs?</h2>
                <div className="space-y-4">
                  {whatIsAMC.map((item, i) => (
                    <div key={item.q} className="flex items-start gap-4 rounded-card border border-primary/[0.12] bg-surface-low p-5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-primary/25 bg-primary/15 text-sm font-black text-primary">
                        {i + 1}
                      </div>
                      <div>
                        <p className="mb-1 text-[0.9rem] font-bold text-white">{item.q}</p>
                        <p className="text-[0.8rem] leading-relaxed text-muted">{item.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Section eyebrow="Decision Guide" title="AMC vs. No Contract vs. Rental" subtitle="Choose the right model for your business — not what costs least today, but what costs least overall." align="center" tone="ink">
          <ComparisonTable columns={["Factor", "Own Printer — No Contract", "Own Printer — With AMC", "Sahara Rental — All-Inclusive"]} highlightColumn={2} rows={comparisonRows} />
          <p className="mt-4 text-center text-caption text-slate-500">
            * OEM parts included from Professional AMC tier. Rental plans always include parts, toner, and machine.
          </p>
        </Section>

        <Section eyebrow="AMC Plans" title="Choose Your Coverage Level" subtitle="All plans include a dedicated account manager and monthly service reports." align="center">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-panel border-2 p-8 ${plan.highlight ? "border-primary bg-surface-mid" : "border-white/[0.08] bg-surface-low"}`}
              >
                {plan.tag && (
                  <div className="-mt-2 mb-4 text-center">
                    <span className="rounded-pill bg-primary px-4 py-1 text-xs font-black uppercase text-on-primary">{plan.tag}</span>
                  </div>
                )}
                <h3 className="mb-1 text-center text-2xl font-bold text-white">{plan.name}</h3>
                <div className="mb-6 text-center">
                  <span className="text-4xl font-black text-primary">{plan.price}</span>
                  <span className="text-sm text-slate-400">{plan.period}</span>
                </div>
                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3 text-sm">
                      <span className={f.included ? "text-primary" : "text-slate-600"}>{f.included ? "✓" : "✗"}</span>
                      <span className={f.included ? "text-on-surface-variant" : "text-slate-600"}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/rental-calculator/"
                  className={`block rounded-pill py-4 text-center font-bold transition-all hover:scale-[1.02] ${plan.highlight ? "bg-gradient-to-r from-primary to-primary-deep text-on-primary" : "glass-card text-white"}`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-caption text-muted">
            Prices are per machine per month. Multi-machine fleet discounts available. Contact us for a fleet assessment.
          </p>
        </Section>

        <Section eyebrow="Industry Coverage" title="AMC for Your Industry" subtitle="Different businesses face different printing pressures. Our AMC plans adapt to your workload." align="center" tone="raised">
          <div className="grid gap-6 sm:grid-cols-2">
            {industryUseCases.map((u) => (
              <div key={u.industry} className="rounded-card border border-white/[0.08] bg-surface-mid p-8 transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-primary/10 text-primary">
                    <u.icon size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <h3 className="font-bold text-white">{u.industry}</h3>
                      <span className="rounded-pill bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{u.stat}</span>
                    </div>
                    <p className="mb-3 text-caption text-slate-500"><strong className="text-slate-400">Challenge:</strong> {u.challenge}</p>
                    <p className="text-caption text-muted"><strong className="text-slate-300">Solution:</strong> {u.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* What's covered vs excluded — "What does a printer AMC cover" is a
            definitional query and the exact shape answer engines lift. Stating
            exclusions plainly is also the single most common pre-sales question. */}
        <Section eyebrow="No Surprises" title="What a Sahara AMC Covers — and What It Does Not" subtitle="Most AMC disputes in the UAE come from unclear scope. Ours is stated in full before you sign." align="center">
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            <div className="glass-card rounded-card border border-primary/20 p-7">
              <h3 className="mb-5 text-lg font-bold text-white">Included in every contract</h3>
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
                  <li key={s} className="flex gap-3 text-sm leading-relaxed text-on-surface-variant">
                    <span className="mt-0.5 font-bold text-primary">✓</span><span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-card border border-white/[0.1] p-7">
              <h3 className="mb-5 text-lg font-bold text-white">Not included — quoted separately</h3>
              <ul className="space-y-3">
                {[
                  "Toner and ink consumables (included free on rental contracts, not on AMC)",
                  "Paper and media",
                  "Damage from misuse, liquid ingress, or unauthorised third-party repair",
                  "Relocation of equipment between premises",
                  "Devices beyond manufacturer end-of-support where parts are unobtainable",
                  "Complete device replacement — an AMC maintains equipment you own",
                ].map((s) => (
                  <li key={s} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-0.5 font-bold text-muted">−</span><span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-[0.9rem] leading-relaxed text-on-surface-variant">
            If you would rather not manage consumables or exclusions at all, a{" "}
            <a href="/services/printer-rental/" className="text-primary hover:underline">printer rental</a> or{" "}
            <a href="/services/photocopier-rental/" className="text-primary hover:underline">photocopier rental</a>{" "}
            contract folds toner, maintenance and the device itself into one monthly figure.
          </p>
        </Section>

        {/* Photocopier AMC + brands + emirate coverage — GSC shows this page at
            position 35.7 for "photocopier maintenance uae" and 44.4 for
            "affordable photocopier maintenance company in uae" — copier AMC
            demand exists and the page was printer-shaped. */}
        <Section tone="raised">
          <div className="mx-auto max-w-5xl space-y-12">
            <div>
              <h2 className="mb-4 font-sora text-title font-bold text-white">Photocopier and Copier AMC</h2>
              <p className="mb-4 leading-relaxed text-on-surface-variant">
                A photocopier AMC works the same way as a printer AMC but matters more, because an A3 multifunction
                device is usually shared across a whole floor — when it stops, so does everyone&rsquo;s work. Copier
                contracts are priced on monthly page volume and colour split rather than a flat device fee, because a
                machine running 20,000 pages a month needs a different servicing interval to one running 3,000.
              </p>
              <p className="leading-relaxed text-on-surface-variant">
                We maintain Canon imageRUNNER ADVANCE, Kyocera TASKalfa, Ricoh MP, Xerox AltaLink and Sharp MX series
                copiers, including devices bought elsewhere. If you own the equipment outright, an AMC is normally
                cheaper than paying per call-out; if you would rather not own it at all,{" "}
                <a href="/services/photocopier-rental/" className="text-primary hover:underline">photocopier rental</a>{" "}
                includes the same cover plus the device and toner.
              </p>
            </div>

            <div>
              <h2 className="mb-4 font-sora text-title font-bold text-white">Brands we hold parts for</h2>
              <p className="mb-5 leading-relaxed text-on-surface-variant">
                Our technicians are certified on Canon and Kyocera and are authorised service partners for HP and Xerox.
                We stock consumables and wear parts for the models we service at our Sharjah workshop, which is why most
                common faults are resolved on the first visit rather than after a parts order.
              </p>
              <div className="flex flex-wrap gap-3">
                {brandLinks.map(([n, href]) => (
                  <a key={n} href={href} className="rounded-pill border border-primary/20 bg-surface-max px-4 py-2 text-sm text-on-surface-variant transition-colors hover:border-primary/50 hover:text-primary">
                    {n}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 font-sora text-title font-bold text-white">AMC coverage across the UAE</h2>
              <p className="leading-relaxed text-on-surface-variant">
                Contracts are serviced from our Sharjah Industrial Area 11 workshop, with engineers covering{" "}
                <a href="/printer-rental-dubai/" className="text-primary hover:underline">Dubai</a>,{" "}
                <a href="/printer-rental-sharjah/" className="text-primary hover:underline">Sharjah</a>,{" "}
                <a href="/printer-rental-abu-dhabi/" className="text-primary hover:underline">Abu Dhabi</a>,{" "}
                <a href="/printer-rental-al-ain/" className="text-primary hover:underline">Al Ain</a>,{" "}
                <a href="/printer-rental-fujairah/" className="text-primary hover:underline">Fujairah</a>,{" "}
                <a href="/printer-rental-rak/" className="text-primary hover:underline">Ras Al Khaimah</a>, Ajman and
                Umm Al Quwain — including the free zones at JAFZA, SAIF Zone, Hamriyah and Dubai Airport Free Zone.
                Multi-site organisations are covered under a single contract with one consolidated invoice rather than
                a separate agreement per location. Our four-hour response target applies UAE-wide; devices in Sharjah
                and northern Dubai are typically reached faster given the workshop&rsquo;s location.
              </p>
            </div>
          </div>
        </Section>

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary mb-4">Questions</p>
            <h2 className="font-sora text-title font-bold text-white">Printer AMC FAQ</h2>
          </div>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={faq["@id"]} className="glass-card rounded-card p-6 group cursor-pointer" open={i === 0}>
                <summary className="flex items-center justify-between gap-4 pr-2 list-none font-bold text-[1rem] text-white">
                  {faq.name}
                  <span className="shrink-0 text-xl text-primary transition-transform duration-200 group-open:rotate-180">›</span>
                </summary>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-on-surface-variant">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section flush tone="raised">
          <p className="text-center text-caption font-bold uppercase tracking-widest text-muted mb-6">Related Services</p>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedServices.map((link) => (
              <a key={link.href} href={link.href} className="rounded-pill border border-white/[0.08] px-4 py-2 text-caption text-muted transition-all hover:text-white hover:border-primary/40">
                {link.label}
              </a>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Protect Your Entire Fleet"
          body="Get a customized AMC proposal for your organization within 24 hours. Fleet assessments are free and non-obligatory."
          primary={{ label: "Request AMC Quote", href: "/rental-calculator/" }}
          secondary={{ label: "Call Our Team", href: "tel:+971503823969" }}
        />

        <Footer />
        <WhatsAppCTA />
        <JumpToTop />
      </main>
    </>
  );
}
