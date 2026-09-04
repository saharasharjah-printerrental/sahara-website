import type { Metadata } from "next";

export const runtime = 'edge';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import CountUp from "@/components/CountUp";
import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import AnswerBlock from "@/components/AnswerBlock";
import ProductHero from "@/components/ui/ProductHero";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import ComparisonTable from "@/components/ui/ComparisonTable";
import CtaBand from "@/components/ui/CtaBand";
import {
  AwardIcon,
  ShieldCheckIcon,
  TruckIcon,
  SettingsIcon,
  ClockIcon,
  LayersIcon,
  LayerStackIcon,
  HeadsetIcon,
} from "@/components/icons";

interface FAQItem { q: string; a: string; }

const DEFAULT_FAQS: FAQItem[] = [
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
  { q: "Is a printer rental the same as a copier lease?", a: "Yes — in the UAE market, \"printer rental,\" \"copier rental,\" and \"copier lease\" all describe the same service from Sahara. Most of our fleet are multifunction devices that print, copy, scan, and fax, so whether you search for copier leasing, copier on rent, or printer rental, you'll get the same all-inclusive monthly plan: zero deposit, unlimited toner, and full maintenance." },
  { q: "Why rent a printer instead of buying one in the UAE?", a: "Buying ties up capital in hardware that depreciates and becomes obsolete within 3-4 years, and toner, maintenance contracts, spare parts, and repair callouts typically add 40-60% to the total cost of ownership. Renting from Sahara bundles all of that into one predictable AED 250/month starting fee — zero deposit, unlimited OEM toner, and maintenance included — so there's no capital outlay and no surprise repair bills." },
  { q: "Is it cheaper to lease or buy a photocopier in the UAE?", a: "For most UAE offices, leasing is cheaper over a typical 2-4 year cycle once toner, maintenance, and repair costs are factored in. Buying only becomes cost-competitive for businesses with very high, stable print volumes over 5+ years who can self-manage servicing. Sahara's rental plans include toner and maintenance in the monthly fee, removing that variable entirely." },
  { q: "What is printer leasing and how does it work?", a: "Printer leasing is a fixed monthly service: you pay one predictable fee that covers the printer or photocopier hardware, unlimited OEM toner, scheduled maintenance, and repairs — without ever owning the machine. Sahara's leasing plans start from AED 250/month with zero deposit, and the contract can run from 3 to 36 months depending on your needs." },
  { q: "What are the main benefits of leasing a copier over buying one?", a: "Leasing eliminates upfront capital cost, bundles maintenance and toner into one predictable invoice, includes free upgrades as your office grows (our 'Growth Guard' policy), and removes any resale or disposal hassle at end of contract — Sahara collects the machine at no charge when you're done." },
  { q: "Is printer leasing tied to a specific brand like HP?", a: "No — leasing is a service model, not a brand. Sahara leases Canon, Kyocera, HP, Ricoh, Xerox, Brother, Sharp, and Epson equipment under the exact same zero-deposit, all-inclusive terms, so you choose the brand that fits your office, not the other way around." },
  { q: "What happens when a printer lease ends in the UAE?", a: "At the end of your Sahara rental contract, we collect the equipment at no charge. You can renew the same plan, upgrade to newer equipment, or simply return the machine — there are no exit fees and no disposal costs. We handle the full lifecycle of every device we lease." },
  { q: "How do I get out of a printer lease early?", a: "Our 'Growth Guard' policy lets you upgrade to different equipment at any point in the contract with no termination penalty. If you need to end a lease early rather than upgrade, contact your account manager — Sahara's contracts are built around flexible terms and transparent exit conditions, not lock-in fees." },
  { q: "What's included in the monthly printer leasing payment?", a: "One fixed AED fee covers the machine, unlimited genuine OEM toner, scheduled preventive maintenance, all repairs and parts, and free delivery — there are no metered per-page charges or hidden add-ons on Sahara's standard plans." },
  { q: "Do I need to negotiate my printer lease rate in the UAE?", a: "No — Sahara publishes transparent tiered pricing from AED 250 to AED 2,000/month based on device class and volume, with automatic discounts for multi-machine fleet contracts (3+ units). Every business at the same tier gets the same rate, so there's nothing to haggle over." },
  { q: "Does printer or copier leasing work the same way as computer/IT leasing?", a: "The underlying principle is similar — a fixed monthly fee instead of a capital purchase — but Sahara specializes specifically in printers, photocopiers, and multifunction devices rather than general IT hardware, so our plans bundle toner and print-specific maintenance that a generic computer lease wouldn't include." },
  { q: "What is a managed print program and does Sahara offer one?", a: "A managed print program (sometimes called a 'printing enterprise' setup) consolidates multiple devices across an office or multiple sites under one contract, with unified billing, proactive toner monitoring, and quarterly usage reporting. Sahara offers this for corporate clients with 3+ machines or multi-location fleets — see our Dubai-specific coverage at /printer-rental-dubai for district-by-district delivery detail." },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    // Deliberately scoped to PRINTERS only. This page previously targeted
    // copier and photocopier keywords as well, which caused Google to rank it
    // for "photocopier rental in dubai" ahead of /services/photocopier-rental/
    // — the purpose-built page, left stranded at position 48 on 1,863
    // impressions and 1 click. Copier terms belong to that page, not this one.
    title: "Printer Rental UAE | A4 & A3 Printers from AED 250/mo",
    description: "Office printer rental across the UAE from AED 250/month. Zero deposit, unlimited OEM toner, full maintenance, 4-hour response. Canon, Kyocera, HP, Brother. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "printer rental uae, office printer rental dubai, printer rental sharjah, printer rental abu dhabi, a4 printer rental uae, laser printer rental dubai, zero deposit printer rental uae, canon printer rental uae, hp printer rental dubai, brother printer rental uae, monthly printer rental uae",
    openGraph: {
      title: "Printer Rental UAE | From AED 250/mo | Sahara Office Equipments",
      description: "Office printer rental across the UAE from AED 250/month. Zero deposit, free toner, full maintenance, 4-hour response. Canon, Kyocera, HP, Brother.",
      images: [{ url: "https://www.saharaprinter.com/images/og-sahara-printer-rental-dubai-uae.jpg", width: 1200, height: 630, alt: "Printer Rental UAE Dubai — Sahara Office Equipments. Canon, Kyocera and HP office printers on flexible monthly rental with zero deposit and free toner." }],
      url: "https://www.saharaprinter.com/services/printer-rental/",
      siteName: "Sahara Office Equipments",
      locale: "en_AE",
      type: "website",
    },
    alternates: { canonical: "https://www.saharaprinter.com/services/printer-rental/" },
};
}

const definitionPoints = [
  { icon: SettingsIcon, title: "All-Inclusive Leasing", body: "A simple monthly fee that covers your machine, unlimited toner, maintenance, repairs, and full technical support." },
  { icon: AwardIcon, title: "Smart Financials", body: "Healthy cash flow with zero upfront capital investment, zero deposit, and absolutely no exit fees." },
  { icon: ShieldCheckIcon, title: "Premium Equipment", body: "Enjoy access to high-performance, industry-leading devices from trusted brands like Canon and Kyocera." },
  { icon: TruckIcon, title: "Seamless UAE Coverage", body: "Popular and fully supported across major business centers: Dubai, Sharjah, and Abu Dhabi." },
];

const features = [
  { icon: ClockIcon, title: "Flexible Terms", desc: "Rent from 3-36 months with easy upgrade options" },
  { icon: SettingsIcon, title: "Full Maintenance", desc: "All repairs and servicing included at no extra cost" },
  { icon: ShieldCheckIcon, title: "Premium Brands", desc: "HP, Canon, Ricoh, Xerox and more" },
];

const benefits = [
  { icon: AwardIcon, title: "Zero Deposit Option", desc: "No upfront security deposit required. Start renting with minimal initial investment." },
  { icon: LayersIcon, title: "Unlimited Free Toner", desc: "All plans include genuine OEM toner at no extra cost. Never worry about consumables again." },
  { icon: SettingsIcon, title: "Full Maintenance Included", desc: "Comprehensive servicing, repairs, and preventive maintenance covered in your rental." },
  { icon: ClockIcon, title: "4-Hour Emergency Response", desc: "Critical issues get resolved within 4 hours. Keep your business running without downtime." },
  { icon: LayerStackIcon, title: "Upgrade Anytime Policy", desc: "Scale up your equipment as your business grows. Upgrade without heavy termination fees." },
  { icon: ShieldCheckIcon, title: "No Exit Fees", desc: "Flexible contracts with no hidden termination fees. Return or upgrade easily." },
  { icon: HeadsetIcon, title: "24/7 Technical Support", desc: "Round-the-clock assistance from certified technicians across all UAE locations." },
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

const rentVsBuyRows: [string, string, string][] = [
  ["Upfront Investment", "AED 0 — zero deposit", "AED 8,000–25,000+ per machine"],
  ["Monthly Cost", "AED 250–2,000 all-inclusive", "Unpredictable: parts + toner + AMC"],
  ["Toner & Consumables", "Unlimited OEM toner included", "You pay per cartridge (~AED 200–800)"],
  ["Maintenance & Repairs", "Free — covered in rental", "Paid AMC or break-fix costs"],
  ["Technology Upgrades", "Upgrade anytime, no penalty", "Resell & repurchase at full cost"],
  ["Cash Flow Impact", "Operational expense (OPEX)", "Capital expense (CAPEX) — balance sheet"],
  ["Response to Breakdown", "4-hr on-site + loaner machine", "Depends on AMC or your IT team"],
  ["End of Life Disposal", "Sahara handles it — eco-friendly", "E-waste disposal cost is yours"],
];

const freeZones = [
  "JAFZA (Dubai)", "SAIF Zone (Sharjah)", "DAFZA (Dubai Airport)", "DMCC (JLT)",
  "DIFC", "Dubai Silicon Oasis", "ICAD I (Abu Dhabi)", "Al Reem Island",
  "Mussafah Industrial", "Dubai Media City", "Dubai Internet City", "KEZAD"
];

const blogPosts = [
  {
    slug: "how-to-choose-the-best-printer-rental-dubai-service",
    title: "How to Choose the Best Printer Rental Dubai Service?",
    category: "Guide",
    img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1771224373/blogs/ai73xmapai8rb1z1u7qg.webp",
  },
  {
    slug: "why-a-company-chooses-copier-rental-service-over-buying-a-copier",
    title: "Why a Company Chooses Copier Rental Over Buying",
    category: "Guide",
    img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758617392/blogs/icz06yszynxpk624dmox.jpg",
  },
  {
    slug: "total-cost-of-printer-ownership",
    title: "Total Cost of Printer Ownership",
    category: "Finance",
    img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758623726/blogs/rm2ptjektgnlq5hyoeyl.jpg",
  },
  {
    slug: "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025",
    title: "Why Every UAE Business is Renting Printers in 2025",
    category: "Trends",
    img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1751102332/blogs/dqusdi9d0tonfoa0ggx6.jpg",
  },
];

const locationLinks = [
  { href: "/printer-rental-dubai/", label: "Printer Rental Dubai" },
  { href: "/printer-rental-abu-dhabi/", label: "Printer Rental Abu Dhabi" },
  { href: "/printer-rental-sharjah/", label: "Printer Rental Sharjah" },
  { href: "/photocopier-rental-sharjah/", label: "Photocopier Sharjah" },
  { href: "/printer-rental-rak/", label: "Printer Rental RAK" },
  { href: "/printer-rental-fujairah/", label: "Printer Rental Fujairah" },
  { href: "/printer-rental-al-ain/", label: "Printer Rental Al Ain" },
  { href: "/copier-lease-uae/", label: "Copier Lease UAE" },
];

const relatedServices = [
  { href: "/services/photocopier-rental/", label: "Photocopier Rental" },
  { href: "/services/paper-shredder-rental/", label: "Paper Shredder Rental" },
  { href: "/services/amc/", label: "Annual Maintenance (AMC)" },
  { href: "/services/repair/", label: "Printer Repair" },
  { href: "/services/printer-spare-parts/", label: "Toner & Spare Parts" },
  { href: "/services/pvc-card-printer-rental/", label: "PVC Card Printer Rental" },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Printer Rental Services UAE",
  // alternateName previously claimed "Photocopier Rental Dubai", "Copier Rental UAE"
  // and "Copier Leasing Dubai". That is an explicit machine-readable claim on the
  // terms /services/photocopier-rental/ is built for, and contributed to Google
  // ranking this page for "photocopier rental in dubai" while that one sat at
  // position 48. Copier naming now belongs solely to the photocopier page.
  "alternateName": ["Office Printer Rental UAE", "Printer Leasing Dubai", "Printer Hire Sharjah"],
  "description": "Flexible printer and photocopier rental services in Dubai, Sharjah, Abu Dhabi and across UAE. Zero deposit, unlimited toner, full maintenance included. Plans from AED 250/month.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments",
    "legalName": "Sahara Office Equipment Trading LLC",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Arabi Building, Industrial Area 11",
      "addressLocality": "Sharjah",
      "addressCountry": "AE",
      "postalCode": "47373"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 25.2942534, "longitude": 55.4260483 },
    "telephone": "+971503823969"
  },
  "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah", "Fujairah", "Al Ain", "JAFZA", "SAIF Zone", "DAFZA"],
  "serviceType": "Printer Rental",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "250",
    "highPrice": "2000",
    "priceCurrency": "AED",
    "offerCount": "3"
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services/printer-rental/" },
    { "@type": "ListItem", "position": 3, "name": "Printer Rental", "item": "https://www.saharaprinter.com/services/printer-rental/" },
  ],
};

const trail = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Printer Rental UAE" },
];

export default function PrinterRentalPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <main className="min-h-screen bg-surface">
        <Header />

        <ProductHero
          trail={trail}
          eyebrow="All 7 Emirates · Free Toner · Cancel Anytime"
          title={
            <>
              Printer Rental Plans
              <br />
              <span className="text-primary">Across the UAE</span>
            </>
          }
          answer={
            <AnswerBlock
              question="What is included in a printer rental plan in the UAE?"
              answer="Every Sahara rental plan includes the machine, toner, maintenance, and repairs. One fixed monthly fee from AED 250 covers unlimited genuine OEM toner, scheduled preventive servicing, all parts and labour, and free delivery with network setup. There is no deposit, no metered page charge, and no exit fee."
              supportingPoints={[
                "A4 desktop from AED 250/month; A3 mid-range AED 500–800; A3 enterprise AED 1,000–2,000",
                "Canon, Kyocera, HP, Ricoh, Xerox, Brother, Sharp and Epson available under identical terms",
                "Contracts run 3 to 36 months, with upgrades permitted mid-contract at no penalty",
                "4-hour emergency response target across Dubai, Sharjah, Abu Dhabi, Ajman, RAK, Fujairah and Al Ain",
              ]}
            />
          }
          badges={["AED 250/mo Starting", "Zero Deposit", "Unlimited Toner", "Same-Day Delivery", "Cancel Anytime", "COP28 Proud Supplier"]}
          image={{ src: "/images/service-maintanence.webp", alt: "Sahara printer technician servicing photocopier in Dubai UAE", width: 800, height: 440 }}
          primaryCta={{ label: "Get a Quote", href: "/rental-calculator/" }}
          secondaryCta={{ label: "Calculate Price", href: "/rental-calculator/" }}
        />

        {/* Printer Rental = Copier Rental — Synonym Clarification */}
        <Section flush align="center">
          <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary mb-4">Also Searching For a Copier?</p>
          <h2 className="font-sora text-headline font-bold text-white mb-4">
            Printer Rental, Copier Rental, Copier Lease — One Service
          </h2>
          <p className="mx-auto max-w-2xl text-[0.9rem] leading-relaxed text-muted">
            Most of our fleet are multifunction devices, so a <strong className="text-white">printer rental</strong>{" "}
            from Sahara is the same as a <strong className="text-white">copier rental</strong> or{" "}
            <strong className="text-white">copier lease</strong> — one monthly plan covers print, copy, scan, and
            fax. Whether your team searched for copier leasing, a copier on rent, or a printer lease, you land on
            the same zero-deposit, all-inclusive plans below.
          </p>
        </Section>

        <Section
          eyebrow="What We Offer"
          title={<>What is <span className="text-primary">Printer Rental</span> in the UAE?</>}
          subtitle="Flexible leasing options to access top-tier multifunction printers (MFPs) and photocopiers with low monthly operational costs."
          align="center"
          tone="ink"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {definitionPoints.map((p, i) => (
              <FeatureCard key={p.title} icon={p.icon} title={p.title} body={p.body} delay={(i % 4) * 0.05} />
            ))}
          </div>
        </Section>

        <Section flush>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.desc} delay={(i % 3) * 0.05} />
            ))}
          </div>
        </Section>

        <Section eyebrow="Why Sahara" title="Benefits of Our Printer Rental" subtitle="Everything you need for seamless printing" align="center" tone="raised">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <FeatureCard key={b.title} icon={b.icon} title={b.title} body={b.desc} delay={(i % 3) * 0.05} />
            ))}
          </div>
        </Section>

        <Section eyebrow="Pricing" title="Rental Pricing" subtitle="Flexible plans for every business size" align="center">
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {pricingTiers.map((p, i) => (
              <div
                key={p.tier}
                className={`rounded-panel border p-8 text-center ${i === 1 ? "border-2 border-primary bg-surface-mid" : "border-white/[0.08] bg-surface-low"}`}
              >
                {i === 1 && (
                  <span className="mb-4 inline-block rounded-pill bg-primary px-3 py-1 text-caption font-bold text-on-primary">Most Popular</span>
                )}
                <h3 className="mb-2 font-sora text-headline font-bold text-white">{p.tier}</h3>
                <p className="mb-2 text-[1.6rem] font-bold text-primary">{p.range}</p>
                <p className="text-[0.9rem] text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-caption text-muted">*Prices may vary based on specific requirements. Contact us for a customized quote.</p>
        </Section>

        <Section eyebrow="Getting Started" title="How It Works" subtitle="Get started in 4 simple steps" align="center" tone="raised">
          <div className="grid gap-6 md:grid-cols-4">
            {process.map((p) => (
              <div key={p.step} className="rounded-panel border border-white/[0.08] bg-surface-mid p-6 text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xl font-bold text-on-primary">{p.step}</div>
                <h3 className="mb-2 text-[1.05rem] font-bold text-white">{p.title}</h3>
                <p className="text-[0.85rem] text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section flush>
          <div className="mx-auto max-w-4xl rounded-panel border border-white/[0.08] bg-surface-low p-10 flex flex-wrap justify-center gap-12 md:gap-20">
            {[
              { number: 2500, suffix: "+", label: "Printers Deployed" },
              { number: 1500, suffix: "+", label: "Happy Clients" },
              { number: 13, suffix: "+", label: "Years Experience" },
              { number: 2, suffix: "hr", label: "Response Time" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-primary">
                  <CountUp to={s.number} duration={2} separator="," />
                  {s.suffix}
                </p>
                <p className="mt-2 text-caption uppercase tracking-widest text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Decision Guide" title="Rent vs. Buy — The True Cost Breakdown" subtitle="Most businesses underestimate the total cost of owning printers. This table shows the real comparison." align="center" tone="ink">
          <ComparisonTable columns={["Cost Factor", "Rent with Sahara", "Buy Your Own"]} highlightColumn={1} rows={rentVsBuyRows} />
          <div className="mt-8 flex justify-center">
            <a href="/rental-calculator/" className="btn-primary">Get a Rental Quote — No Commitment</a>
          </div>
        </Section>

        {/* Eco-Print / Sustainability — kept visually distinct (green accent) from the rest of the page's gold accent, since it's a different message */}
        <Section flush>
          <div className="overflow-hidden rounded-panel border border-emerald-500/20 bg-gradient-to-br from-[rgba(10,26,18,0.98)] to-[rgba(5,16,12,0.99)]">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-10 lg:p-14">
                <span className="text-caption font-bold uppercase tracking-[0.2em] text-emerald-400">🌱 Eco-Print Initiative</span>
                <h2 className="mt-3 mb-5 font-sora text-title font-bold text-white">
                  Rent a Printer.<br />Reduce UAE&rsquo;s E-Waste.
                </h2>
                <p className="mb-6 text-[0.9rem] leading-relaxed text-slate-300">
                  When you rent instead of buy, retired machines are returned to Sahara for refurbishment or
                  responsible recycling — not landfill. Our circular equipment model has prevented over
                  <strong className="text-white"> 2,000 printers</strong> from entering UAE waste streams since 2012.
                </p>
                <div className="mb-6 grid grid-cols-2 gap-4">
                  {[
                    { stat: "2,000+", label: "Machines Recycled" },
                    { stat: "0 AED", label: "E-Waste Cost to You" },
                    { stat: "COP28", label: "Official Supplier" },
                    { stat: "ISO", label: "Aligned Practices" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-card bg-white/5 p-3 text-center">
                      <p className="text-lg font-bold text-emerald-400">{s.stat}</p>
                      <p className="text-caption text-slate-400">{s.label}</p>
                    </div>
                  ))}
                </div>
                <a href="/rental-calculator/" className="inline-block rounded-pill border border-emerald-400/30 bg-emerald-500/20 px-6 py-3 text-[0.9rem] font-bold text-emerald-400 transition-colors hover:bg-emerald-500/30">
                  Learn About Our Green Plan →
                </a>
              </div>
              <div className="relative hidden lg:block">
                <img
                  src="/images/sustain1.webp"
                  alt="Eco-friendly printer rental UAE sustainability circular economy"
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,26,18,0.95)] via-[rgba(10,26,18,0.3)] to-transparent" />
              </div>
            </div>
          </div>
        </Section>

        <Section eyebrow="Coverage" title="We Deliver to Every UAE Free Zone" subtitle="Free delivery and same-day setup across all major free zones and business districts." align="center" tone="raised">
          <div className="flex flex-wrap justify-center gap-3">
            {freeZones.map((zone) => (
              <span key={zone} className="rounded-pill border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[0.9rem] font-medium text-on-surface-variant transition-all hover:border-primary/30 hover:text-white">
                {zone}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-caption text-muted">
            + All 7 emirates: Dubai · Sharjah · Abu Dhabi · Ajman · RAK · Fujairah · Al Ain
          </p>
        </Section>

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-muted">Common questions about printer rental in the UAE.</p>
          </div>
          <FaqSection pageSlug="services/printer-rental" defaultFaqs={DEFAULT_FAQS} />
        </Section>

        <Section eyebrow="Resource Hub" title="Learn Before You Rent" subtitle="Expert guides to help UAE businesses make smarter printer decisions." align="center" tone="ink">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blogs/${post.slug}`} className="group">
                <div className="flex h-full flex-col overflow-hidden rounded-card border border-white/[0.08] bg-surface-mid transition-transform duration-300 hover:-translate-y-1">
                  <img src={post.img} alt={post.title} className="h-36 w-full object-cover" loading="lazy" />
                  <div className="flex flex-1 flex-col p-4">
                    <span className="mb-2 inline-flex self-start rounded-pill border border-primary/20 bg-surface-max px-2 py-0.5 text-caption font-medium text-primary">
                      {post.category}
                    </span>
                    <h4 className="line-clamp-3 flex-1 text-[0.9rem] font-semibold leading-snug text-white transition-colors group-hover:text-primary">
                      {post.title}
                    </h4>
                    <span className="mt-3 flex items-center gap-1 text-caption text-primary">
                      Read Article
                      <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/blogs/" className="inline-block rounded-pill border border-primary/30 px-6 py-3 text-[0.9rem] font-medium text-primary transition-colors hover:bg-primary/10">
              View All Articles →
            </Link>
          </div>
        </Section>

        <Section flush>
          <p className="text-center text-caption font-bold uppercase tracking-widest text-muted mb-6">Printer Rental by Location</p>
          <div className="flex flex-wrap justify-center gap-3">
            {locationLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-pill border border-white/[0.08] px-4 py-2 text-caption text-muted transition-all hover:text-white hover:border-primary/40">
                {link.label}
              </Link>
            ))}
          </div>
        </Section>

        <Section flush tone="ink">
          <p className="text-center text-caption font-bold uppercase tracking-widest text-muted mb-6">Related Services</p>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedServices.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-pill border border-white/[0.08] px-4 py-2 text-caption text-muted transition-all hover:text-white hover:border-primary/40">
                {link.label}
              </Link>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Ready to Rent?"
          body="Get a customized quote within 2 hours"
          primary={{ label: "Get Your Quote", href: "/rental-calculator/" }}
        />

        <Footer />
        <WhatsAppCTA />
        <JumpToTop />
      </main>
    </>
  );
}
