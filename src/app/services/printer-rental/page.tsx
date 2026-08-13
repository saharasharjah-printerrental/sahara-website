import type { Metadata } from "next";

export const runtime = 'edge';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import CountUp from "@/components/CountUp";
import FaqSection from "@/components/FaqSection";
import { Savings, Inventory2, BuildCircle, Emergency, Upgrade, Cancel, SupportAgent, Sync, Build, Verified, Print, CheckCircle, LocationOn, HeadsetMic } from "@mui/icons-material";
import Link from "next/link";

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
    title: "Printer Rental UAE | A4 & A3 Printers from AED 250/mo | Sahara",
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

const rentVsBuyRows = [
  { factor: "Upfront Investment", renting: "AED 0 — zero deposit", buying: "AED 8,000–25,000+ per machine" },
  { factor: "Monthly Cost", renting: "AED 250–2,000 all-inclusive", buying: "Unpredictable: parts + toner + AMC" },
  { factor: "Toner & Consumables", renting: "Unlimited OEM toner included", buying: "You pay per cartridge (~AED 200–800)" },
  { factor: "Maintenance & Repairs", renting: "Free — covered in rental", buying: "Paid AMC or break-fix costs" },
  { factor: "Technology Upgrades", renting: "Upgrade anytime, no penalty", buying: "Resell & repurchase at full cost" },
  { factor: "Cash Flow Impact", renting: "Operational expense (OPEX)", buying: "Capital expense (CAPEX) — balance sheet" },
  { factor: "Response to Breakdown", renting: "4-hr on-site + loaner machine", buying: "Depends on AMC or your IT team" },
  { factor: "End of Life Disposal", renting: "Sahara handles it — eco-friendly", buying: "E-waste disposal cost is yours" },
];

const freeZones = [
  "JAFZA (Dubai)", "SAIF Zone (Sharjah)", "DAFZA (Dubai Airport)", "DMCC (JLT)",
  "DIFC", "Dubai Silicon Oasis", "ICAD I (Abu Dhabi)", "Al Reem Island",
  "Mussafah Industrial", "Dubai Media City", "Dubai Internet City", "KEZAD"
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

export default function PrinterRentalPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5be53]/10 rounded-full blur-[150px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[#f5be53] transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/services/printer-rental/" className="hover:text-[#f5be53] transition-colors">Services</a>
            <span className="mx-2">/</span>
            <span className="text-[#f5be53]">Printer Rental UAE</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-xs">All 7 Emirates · Free Toner · Cancel Anytime</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Printer Rental Plans<br /><span className="text-[#f5be53]">Across the UAE</span>
              </h1>

              {/* AEO Answer Block */}
              <div className="bg-[#0d1b2e] border border-[#f5be53]/20 rounded-2xl p-5 mb-8">
                <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">What is Printer Rental in UAE?</p>
                <p className="text-[#d3c5b0] text-sm leading-relaxed">
                  Printer rental in the UAE is a monthly leasing model where businesses access enterprise-grade
                  Canon, Kyocera, HP, and Ricoh printers with <strong className="text-white">zero deposit</strong>,
                  unlimited OEM toner, and full maintenance included — starting from{" "}
                  <strong className="text-white">AED 250/month</strong>. Over 1,500 UAE businesses use this model
                  to eliminate printing capital costs and unpredictable repair bills.
                </p>
              </div>

              {/* Trust Pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                {["AED 250/mo Starting", "Zero Deposit", "Unlimited Toner", "Same-Day Delivery", "Cancel Anytime"].map((t) => (
                  <span key={t} className="text-xs font-bold text-white bg-[#f5be53]/10 border border-[#f5be53]/25 px-3 py-1.5 rounded-full">
                    ✓ {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/rental-calculator/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_4px_24px_rgba(245,190,83,0.35)]">
                  Get a Quote
                </a>
                <a href="/rental-calculator/" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                  Calculate Price
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#f5be53]/8 rounded-3xl blur-xl" />
              <div className="relative rounded-3xl overflow-hidden border border-[#f5be53]/15"
                style={{ boxShadow: '0 0 60px rgba(245,190,83,0.10), 0 24px 80px rgba(0,0,0,0.5)' }}>
                <img
                  src="/images/service-maintanence.webp"
                  alt="Sahara printer technician servicing photocopier in Dubai UAE"
                  className="w-full h-[440px] object-contain bg-[#0a1628]"
                  loading="eager"
                  fetchPriority="high"
                  width={800}
                  height={440}
                />
                {/* COP28 badge */}
                <div className="absolute top-4 left-4 bg-[#071325]/90 backdrop-blur-sm border border-[#f5be53]/30 rounded-xl px-3 py-2">
                  <p className="text-[#f5be53] text-xs font-bold">🏆 COP28 Proud Supplier</p>
                  <p className="text-slate-400 text-[10px]">Official Event Equipment Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Printer Rental = Copier Rental — Synonym Clarification ── */}
      <section className="py-14 px-8 lg:px-24 bg-[#101c2e] border-y border-[#f5be53]/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Also Searching For a Copier?</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-4">
            Printer Rental, Copier Rental, Copier Lease — One Service
          </h2>
          <p className="text-[#d3c5b0] text-sm leading-relaxed max-w-2xl mx-auto">
            Most of our fleet are multifunction devices, so a <strong className="text-white">printer rental</strong>{" "}
            from Sahara is the same as a <strong className="text-white">copier rental</strong> or{" "}
            <strong className="text-white">copier lease</strong> — one monthly plan covers print, copy, scan, and
            fax. Whether your team searched for copier leasing, a copier on rent, or a printer lease, you land on
            the same zero-deposit, all-inclusive plans below.
          </p>
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
      <section className="py-16 px-4 lg:px-12 bg-[#101c2e]">
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

      {/* ── Rent vs Buy Comparison ── */}
      <section className="py-16 px-4 lg:px-12 bg-[#050d1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Decision Guide</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">Rent vs. Buy — The True Cost Breakdown</h2>
            <p className="text-[#7a94ad] max-w-lg mx-auto text-sm">
              Most businesses underestimate the total cost of owning printers. This table shows the real comparison.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(245,190,83,0.15)' }}>
            <table className="w-full min-w-[540px]">
              <thead>
                <tr style={{ background: 'rgba(245,190,83,0.08)', borderBottom: '1px solid rgba(245,190,83,0.15)' }}>
                  <th className="text-left text-white font-bold py-4 px-6 text-sm">Cost Factor</th>
                  <th className="text-center text-[#f5be53] font-bold py-4 px-4 text-sm border-x border-[#f5be53]/20">Rent with Sahara</th>
                  <th className="text-center text-slate-400 font-bold py-4 px-4 text-sm">Buy Your Own</th>
                </tr>
              </thead>
              <tbody>
                {rentVsBuyRows.map((row, i) => (
                  <tr key={i}
                    className="border-t"
                    style={{
                      background: i % 2 === 0 ? 'rgba(10,20,38,0.6)' : 'rgba(7,15,30,0.6)',
                      borderColor: 'rgba(255,255,255,0.04)'
                    }}>
                    <td className="py-4 px-6 text-white text-sm font-medium">{row.factor}</td>
                    <td className="py-4 px-4 text-center text-[#f5be53] text-xs font-semibold border-x border-[#f5be53]/10">{row.renting}</td>
                    <td className="py-4 px-4 text-center text-slate-500 text-xs">{row.buying}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-8">
            <a href="/rental-calculator/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
              Get a Rental Quote — No Commitment
            </a>
          </div>
        </div>
      </section>

      {/* ── Eco-Print / Sustainability ── */}
      <section className="py-20 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, rgba(10,26,18,0.98) 0%, rgba(5,16,12,0.99) 100%)',
              border: '1px solid rgba(52,168,83,0.2)',
              boxShadow: '0 0 60px rgba(52,168,83,0.06)',
            }}>
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-10 lg:p-14">
                <span className="text-green-400 font-bold tracking-[0.2em] uppercase text-xs">🌱 Eco-Print Initiative</span>
                <h2 className="text-3xl font-bold text-white mt-3 mb-5">
                  Rent a Printer.<br />Reduce UAE's E-Waste.
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  When you rent instead of buy, retired machines are returned to Sahara for refurbishment or
                  responsible recycling — not landfill. Our circular equipment model has prevented over
                  <strong className="text-white"> 2,000 printers</strong> from entering UAE waste streams since 2012.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { stat: "2,000+", label: "Machines Recycled" },
                    { stat: "0 AED", label: "E-Waste Cost to You" },
                    { stat: "COP28", label: "Official Supplier" },
                    { stat: "ISO", label: "Aligned Practices" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-green-400 font-bold text-lg">{s.stat}</p>
                      <p className="text-slate-400 text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>
                <a href="/rental-calculator/" className="inline-block bg-green-500/20 border border-green-400/30 text-green-400 px-6 py-3 rounded-full font-bold text-sm hover:bg-green-500/30 transition-colors">
                  Learn About Our Green Plan →
                </a>
              </div>
              <div className="relative hidden lg:block">
                <img
                  src="/images/sustain1.webp"
                  alt="Eco-friendly printer rental UAE sustainability circular economy"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,26,18,0.95)] via-[rgba(10,26,18,0.3)] to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Free Zone Coverage ── */}
      <section className="py-16 px-8 lg:px-24 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Coverage</span>
            <h2 className="text-3xl font-bold text-white mt-3 mb-3">We Deliver to Every UAE Free Zone</h2>
            <p className="text-[#7a94ad] text-sm max-w-md mx-auto">Free delivery and same-day setup across all major free zones and business districts.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {freeZones.map((zone, i) => (
              <span key={i}
                className="px-4 py-2 rounded-full text-sm text-[#d3c5b0] font-medium border border-white/8 bg-white/3 hover:border-[#f5be53]/30 hover:text-white transition-all">
                📍 {zone}
              </span>
            ))}
          </div>
          <p className="text-center text-slate-500 text-xs mt-6">
            + All 7 emirates: Dubai · Sharjah · Abu Dhabi · Ajman · RAK · Fujairah · Al Ain
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8 max-w-4xl mx-auto">
        <FaqSection pageSlug="services/printer-rental" defaultFaqs={DEFAULT_FAQS} />
      </section>

      {/* From Our Blog — Internal Link Cluster */}
      <section className="py-16 px-4 lg:px-12 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Resource Hub</span>
            <h2 className="text-3xl font-bold text-white mt-3 mb-3">Learn Before You Rent</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">Expert guides to help UAE businesses make smarter printer decisions.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
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
            ].map((post) => (
              <Link key={post.slug} href={`/blogs/${post.slug}`} className="group">
                <div className="rounded-2xl border border-white/8 bg-[#0d1b2e] overflow-hidden hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
                  <img src={post.img} alt={post.title} className="w-full h-36 object-cover" loading="lazy" />
                  <div className="p-4 flex flex-col flex-1">
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-[#142032] border border-[#f5be53]/20 text-[#f5be53] text-xs font-medium mb-2 self-start">
                      {post.category}
                    </span>
                    <h4 className="text-white text-sm font-semibold leading-snug group-hover:text-[#f5be53] transition-colors flex-1 line-clamp-3">
                      {post.title}
                    </h4>
                    <span className="text-[#f5be53] text-xs mt-3 flex items-center gap-1">
                      Read Article
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blogs/" className="px-6 py-3 border border-[#f5be53]/30 text-[#f5be53] rounded-full text-sm font-medium hover:bg-[#f5be53]/10 transition-colors inline-block">
              View All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Location Cross-Links */}
      <section className="py-12 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Printer Rental by Location</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/printer-rental-dubai", label: "Printer Rental Dubai" },
              { href: "/printer-rental-abu-dhabi", label: "Printer Rental Abu Dhabi" },
              { href: "/photocopier-rental-sharjah", label: "Photocopier Sharjah" },
              { href: "/printer-rental-rak", label: "Printer Rental RAK" },
              { href: "/printer-rental-fujairah", label: "Printer Rental Fujairah" },
              { href: "/printer-rental-al-ain", label: "Printer Rental Al Ain" },
              { href: "/copier-lease-uae", label: "Copier Lease UAE" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full border border-[#f5be53]/20 text-slate-400 text-xs hover:text-white hover:border-[#f5be53]/40 transition-all"
              >
                📍 {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 px-8 lg:px-24 bg-[#050d1a]">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Related Services</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/services/photocopier-rental/", label: "Photocopier Rental" },
              { href: "/services/paper-shredder-rental/", label: "Paper Shredder Rental" },
              { href: "/services/amc/", label: "Annual Maintenance (AMC)" },
              { href: "/services/repair/", label: "Printer Repair" },
              { href: "/services/printer-spare-parts/", label: "Toner & Spare Parts" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full border border-[#f5be53]/20 text-slate-400 text-xs hover:text-white hover:border-[#f5be53]/40 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto rounded-[3rem] gold-gradient p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">Ready to Rent?</h2>
          <p className="text-[#483200] text-lg mb-8">Get a customized quote within 2 hours</p>
          <a href="/rental-calculator/" className="inline-block bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
            Get Your Quote
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
    </>
  );
}
