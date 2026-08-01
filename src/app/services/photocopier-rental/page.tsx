export const runtime = 'edge';
import type { Metadata } from "next";
import { getRequestContext } from "@cloudflare/next-on-pages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

interface FAQItem { q: string; a: string; }

async function getFaqsFromD1(): Promise<FAQItem[]> {
  try {
    const env = getRequestContext().env as any;
    if (!env?.DB) return DEFAULT_FAQS;
    const result = await env.DB.prepare(
      "SELECT question, answer FROM faqs WHERE pageSlug = ? AND isActive = 1 ORDER BY sortOrder ASC"
    ).bind("services/photocopier-rental").all();
    if (result?.results?.length > 0) {
      return result.results.map((r: any) => ({ q: r.question, a: r.answer }));
    }
    return DEFAULT_FAQS;
  } catch {
    return DEFAULT_FAQS;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: "Photocopier Rental UAE | A3 Copier Lease Dubai Sharjah | Sahara",
  description: "Rent A3 multifunction photocopiers in Dubai, Sharjah, Abu Dhabi. Canon imageRUNNER, Kyocera TASKalfa — print, copy, scan, fax in one device. From AED 500/month. Zero deposit. Call +971503823969.",
  keywords: "photocopier rental dubai, copier rental sharjah, A3 photocopier lease uae, multifunction copier rental dubai, canon imagerunner rental uae, kyocera copier rental dubai, photocopier lease abu dhabi",
  openGraph: {
    title: "Photocopier Rental UAE | A3 Copier Lease Dubai Sharjah | Sahara Office Equipments",
    description: "Rent A3 multifunction photocopiers with print, copy, scan and fax. Canon & Kyocera. From AED 500/month, zero deposit, free toner. Serving all UAE.",
    images: [{ url: "https://www.saharaprinter.com/images/heroPrntr1.webp", width: 1200, height: 630, alt: "Photocopier Rental UAE" }],
    url: "https://www.saharaprinter.com/services/photocopier-rental/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
    alternates: { canonical: "https://www.saharaprinter.com/services/photocopier-rental/" },
  };
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Photocopier Rental UAE",
  "alternateName": ["Copier Lease Dubai", "A3 Multifunction Printer Rental UAE", "Photocopier Lease Sharjah"],
  "description": "Lease A3 multifunction photocopiers in Dubai, Sharjah, Abu Dhabi and all UAE. Devices include print, copy, scan, fax and cloud connectivity. Canon imageRUNNER ADVANCE and Kyocera TASKalfa available from AED 500/month with zero deposit, unlimited toner, and full maintenance included.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments",
    "legalName": "Sahara Office Equipment Trading LLC",
    "telephone": "+971503823969",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Arabi Building, Industrial Area 11",
      "addressLocality": "Sharjah",
      "addressCountry": "AE",
      "postalCode": "47373"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 25.2942534, "longitude": 55.4260483 }
  },
  "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah", "Fujairah", "Al Ain"],
  "serviceType": "Photocopier Rental",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "500",
    "highPrice": "2000",
    "priceCurrency": "AED",
    "offerCount": "3"
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Rent a Photocopier in UAE",
  "totalTime": "PT2D",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Tell Us Your Copy Volume", "text": "Share your monthly copy volume, number of users, and whether you need color or monochrome. We match you to the right device." },
    { "@type": "HowToStep", "position": 2, "name": "Receive a Tailored Quote", "text": "Our team provides a cost-per-page breakdown and monthly lease quote within 2 hours — no obligation." },
    { "@type": "HowToStep", "position": 3, "name": "Same-Day Delivery & Network Setup", "text": "Our engineers deliver and connect the photocopier to your office network, email server, and document management system." },
    { "@type": "HowToStep", "position": 4, "name": "Ongoing Managed Support", "text": "Toner auto-replenished, maintenance scheduled, repairs covered — we manage the machine so you focus on your work." }
  ]
};

const DEFAULT_FAQS: FAQItem[] = [
  {
    q: "What is the difference between photocopier rental and printer rental?",
    a: "A photocopier (multifunction device / MFP) combines high-volume copying, printing, scanning, and faxing in a single A3-capable device — designed for shared office use by 10–50+ people. A desktop printer is typically A4-only and serves 1–5 users. Photocopiers process thousands of pages daily at a lower cost-per-page (CPP) than desktop printers, making them more cost-effective for document-intensive offices."
  },
  {
    q: "How much does photocopier rental cost in UAE?",
    a: "Photocopier rental in UAE starts from AED 500/month for a monochrome A3 multifunction device (e.g., Kyocera ECOSYS M8124cidn). Color A3 photocopiers start from AED 700/month. Enterprise high-speed devices (60+ ppm) range from AED 1,200–2,000/month. All plans include zero deposit, unlimited OEM toner, maintenance, and repairs. Contact us for a cost-per-page quote based on your volume."
  },
  {
    q: "Which photocopier brands do you rent in Dubai and Sharjah?",
    a: "Sahara rents Canon imageRUNNER ADVANCE (C5540i, C5250, 4551i) and Kyocera TASKalfa (2553ci, 3553ci, 5053ci) as primary lines. We also rent Ricoh MP C3004, Xerox AltaLink C8055, and Sharp MX-4071 on request. Canon and Kyocera are our most popular because of their reliability in UAE heat and humidity conditions."
  },
  {
    q: "Is toner included in the photocopier rental?",
    a: "Yes — all Sahara photocopier rental plans include unlimited genuine OEM toner at no additional charge. We pro-actively monitor toner levels remotely and replenish before you run out. There are no monthly copy caps or surprise consumable invoices."
  },
  {
    q: "How long is the minimum rental period for a photocopier?",
    a: "Standard photocopier rental contracts run 12–36 months. For events, exhibitions, or temporary office setups, we offer short-term rentals from 1 day to 3 months. Short-term rates apply; contact us for current event rental pricing."
  },
  {
    q: "Can the rented photocopier connect to our office network and email?",
    a: "Yes. Our engineers configure full network integration including: LAN/Wi-Fi connectivity, scan-to-email via your SMTP server, scan-to-folder on your server or NAS, cloud integration (Google Drive, OneDrive, SharePoint), and user authentication. Setup is included in the delivery fee at no additional charge."
  },
  {
    q: "What happens if the photocopier breaks down?",
    a: "All rental photocopiers are covered by our full service agreement. We target a 4-hour on-site response for Dubai and Sharjah. If a repair cannot be completed within 24 hours, we deliver a loaner machine at no cost so your office is never without a working device."
  },
  {
    q: "Can I upgrade to a faster or color photocopier mid-contract?",
    a: "Yes. Our 'Growth Guard' policy allows you to upgrade your photocopier at any point during the contract — for example, moving from a 35 ppm monochrome to a 45 ppm color device as your business grows. Upgrades are processed without termination fees."
  },
  {
    q: "Do you offer photocopier rental for SAIF Zone and JAFZA companies?",
    a: "Yes. We regularly supply and service photocopiers in SAIF Zone (Sharjah), JAFZA (Jebel Ali Free Zone), DAFZA, DMCC, and DIFC. Free zone delivery and setup is included. Billing can be arranged in USD or AED for free zone entities."
  },
  {
    q: "Is maintenance included in photocopier rental?",
    a: "Fully included. All rental photocopiers receive preventive maintenance on a scheduled basis. This includes internal cleaning, roller replacement, calibration, firmware updates, and drum inspection. Emergency repairs are covered at no additional cost under the full service agreement."
  },
  {
    q: "Can we rent multiple photocopiers for different office locations?",
    a: "Yes. Sahara specializes in multi-site corporate fleet deployments across UAE. We consolidate billing into a single monthly invoice, provide a centralized service contact, and ensure uniform equipment standards across all your locations. Fleet discounts apply for 3+ machines."
  },
  {
    q: "What is cost-per-page (CPP) and how does it apply to copier rental?",
    a: "Cost-per-page (CPP) is the total monthly cost divided by your print/copy volume. With Sahara's all-inclusive rental, your effective CPP includes the machine, toner, maintenance, and parts — typically AED 0.02–0.05 per black-and-white page and AED 0.15–0.25 per color page, depending on volume and model. This is 30–50% lower than the total cost of owning and maintaining your own copier."
  }
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Photocopier Rental UAE", "item": "https://www.saharaprinter.com/services/photocopier-rental" }
  ]
};

const devices = [
  {
    name: "Canon imageRUNNER ADVANCE C5540i",
    type: "A3 Color MFP",
    speed: "40 ppm color / 40 ppm mono",
    users: "15–40 users",
    functions: ["Print", "Copy", "Scan", "Fax", "Cloud"],
    price: "From AED 750/mo",
    highlight: true
  },
  {
    name: "Kyocera TASKalfa 3553ci",
    type: "A3 Color MFP",
    speed: "35 ppm color / 35 ppm mono",
    users: "10–30 users",
    functions: ["Print", "Copy", "Scan", "Fax"],
    price: "From AED 650/mo",
    highlight: false
  },
  {
    name: "Canon imageRUNNER ADVANCE 4551i",
    type: "A3 Mono MFP",
    speed: "51 ppm mono",
    users: "20–50 users",
    functions: ["Print", "Copy", "Scan", "Fax"],
    price: "From AED 500/mo",
    highlight: false
  },
  {
    name: "Kyocera TASKalfa 5053ci",
    type: "A3 Color MFP",
    speed: "50 ppm color / 50 ppm mono",
    users: "30–80 users",
    functions: ["Print", "Copy", "Scan", "Fax", "Cloud"],
    price: "From AED 1,000/mo",
    highlight: false
  },
];

const printerVsCopier = [
  { feature: "Page Format", copier: "A3 + A4 (both)", printer: "A4 only (mostly)" },
  { feature: "Monthly Volume", copier: "5,000–100,000+ pages", printer: "200–3,000 pages" },
  { feature: "Concurrent Users", copier: "10–80 users", printer: "1–5 users" },
  { feature: "Functions", copier: "Print + Copy + Scan + Fax + Cloud", printer: "Print (+ basic scan)" },
  { feature: "Cost-Per-Page", copier: "AED 0.02–0.05 (mono)", printer: "AED 0.08–0.15 (mono)" },
  { feature: "Monthly Rental", copier: "AED 500–2,000", printer: "AED 250–400" },
  { feature: "Best For", copier: "Shared office, legal, real estate, HR, accounts", printer: "Individual workstation, reception desk" },
];

const industries = [
  { name: "Legal & Accounting Firms", need: "High-volume contract, report and agreement printing. Secure print release keeps confidential documents private.", icon: "⚖️", volume: "10,000–50,000 pages/month" },
  { name: "Real Estate Agencies", need: "Large-format property brochures, A3 floor plans, and high-volume contract duplication during sales periods.", icon: "🏢", volume: "5,000–20,000 pages/month" },
  { name: "Medical & Dental Clinics", need: "Patient file printing, prescription reproduction, and HIPAA-compliant secure scanning to EMR systems.", icon: "🏥", volume: "3,000–10,000 pages/month" },
  { name: "Construction & Engineering", need: "A3 technical drawings, site plans, and report reproduction. Durable devices that handle dusty environments.", icon: "🏗️", volume: "8,000–30,000 pages/month" },
  { name: "Education & Training", need: "Exam paper reproduction, course material printing, and administrative document workflows at scale.", icon: "🎓", volume: "20,000–100,000 pages/month" },
  { name: "Logistics & Shipping", need: "Manifest printing, label reproduction, and 24/7 document processing workflows without downtime.", icon: "🚚", volume: "15,000–60,000 pages/month" },
];

const workflowFeatures = [
  { title: "Scan to Email", desc: "Direct scan-to-email via your office SMTP server. No third-party apps. Configured on delivery day." },
  { title: "Scan to Shared Folder", desc: "Scans go straight to your server or NAS. Works with Windows, Samba, FTP, and SMB shares." },
  { title: "Cloud Integration", desc: "Native connectors for Google Drive, OneDrive, SharePoint, and Dropbox on supported models." },
  { title: "Secure Print Release", desc: "PIN or card-authenticated release prevents confidential documents from sitting in the output tray." },
  { title: "User Authentication", desc: "Department-level cost tracking. Know exactly which team prints how much every month." },
  { title: "Mobile Printing", desc: "AirPrint, Google Cloud Print, and manufacturer apps for printing directly from phones and tablets." },
];

export default async function PhotocopierRentalPage() {
  const faqs = await getFaqsFromD1();
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } : null;
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    <main className="min-h-screen bg-[#071325]">
      <Header />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]" />
        <div className="absolute top-1/2 right-0 w-[700px] h-[700px] bg-[#f5be53]/6 rounded-full blur-[200px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[#f5be53] transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/services" className="hover:text-[#f5be53] transition-colors">Services</a>
            <span className="mx-2">/</span>
            <span className="text-[#f5be53]">Photocopier Rental UAE</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-xs">A3 Multifunction · Print · Copy · Scan · Fax</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                Photocopier Rental<br /><span className="text-[#f5be53]">Dubai & UAE</span>
              </h1>

              {/* AEO Block */}
              <div className="bg-[#0d1b2e] border border-[#f5be53]/20 rounded-2xl p-5 mb-8">
                <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">What is Photocopier Rental in UAE?</p>
                <p className="text-[#d3c5b0] text-sm leading-relaxed">
                  Photocopier rental in UAE is a monthly lease of an A3 multifunction device (MFD) that combines
                  high-volume copying, printing, scanning, and faxing in one shared office machine. Canon imageRUNNER
                  ADVANCE and Kyocera TASKalfa copiers are available from <strong className="text-white">AED 500/month</strong> — with
                  zero deposit, unlimited toner, and full maintenance. Over 1,500 UAE businesses currently rent from Sahara.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {["From AED 500/mo", "A3 + A4 Capable", "Zero Deposit", "Unlimited Toner", "Network Setup Included"].map((t) => (
                  <span key={t} className="text-xs font-bold text-white bg-[#f5be53]/10 border border-[#f5be53]/25 px-3 py-1.5 rounded-full">
                    ✓ {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/rental-calculator/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_4px_24px_rgba(245,190,83,0.35)]">
                  Get Copier Quote
                </a>
                <a href="tel:+971503823969" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors flex items-center gap-2">
                  📞 +971 50 382 3969
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[#f5be53]/8 rounded-3xl blur-xl" />
              <div className="relative rounded-3xl overflow-hidden border border-[#f5be53]/15"
                style={{ boxShadow: '0 0 60px rgba(245,190,83,0.10), 0 24px 80px rgba(0,0,0,0.5)' }}>
                <img
                  src="/images/heroPrntr1.webp"
                  alt="Canon imageRUNNER A3 multifunction photocopier rental Dubai UAE Sharjah"
                  className="w-full h-[440px] object-contain bg-[#0a1628]"
                  loading="eager"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#071325]/95 to-transparent p-6">
                  <p className="text-white font-bold text-sm">Canon & Kyocera A3 Multifunction Copiers</p>
                  <p className="text-[#f5be53] text-xs">Sharjah Headquarters — Serving All UAE Since 2012</p>
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
              { value: "1,500+", label: "Active Copiers Deployed" },
              { value: "AED 500", label: "Starting Monthly Rate" },
              { value: "4 Hours", label: "Emergency Response" },
              { value: "13+ Years", label: "UAE Market Experience" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-2xl md:text-3xl font-bold text-[#f5be53]">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Copier vs Printer Comparison ── */}
      <section className="py-16 px-4 lg:px-12 bg-[#0a1425]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Which Do You Need?</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">Photocopier vs. Desktop Printer</h2>
            <p className="text-[#7a94ad] max-w-lg mx-auto text-sm">
              Many businesses waste money renting desktop printers when a single A3 photocopier would handle
              the same workload at half the cost-per-page.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(245,190,83,0.15)' }}>
            <table className="w-full min-w-[560px]">
              <thead>
                <tr style={{ background: 'rgba(245,190,83,0.08)', borderBottom: '1px solid rgba(245,190,83,0.15)' }}>
                  <th className="text-left text-white font-bold py-4 px-6 text-sm">Feature</th>
                  <th className="text-center text-[#f5be53] font-bold py-4 px-4 text-sm border-x border-[#f5be53]/20">A3 Photocopier</th>
                  <th className="text-center text-slate-400 font-bold py-4 px-4 text-sm">Desktop Printer</th>
                </tr>
              </thead>
              <tbody>
                {printerVsCopier.map((row, i) => (
                  <tr key={i} className="border-t"
                    style={{ background: i % 2 === 0 ? 'rgba(10,20,38,0.6)' : 'rgba(7,15,30,0.6)', borderColor: 'rgba(255,255,255,0.04)' }}>
                    <td className="py-4 px-6 text-white text-sm font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-[#f5be53] text-xs font-semibold border-x border-[#f5be53]/10">{row.copier}</td>
                    <td className="py-4 px-4 text-center text-slate-500 text-xs">{row.printer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Featured Devices ── */}
      <section className="py-16 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Our Fleet</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">A3 Photocopiers Available to Rent</h2>
            <p className="text-[#7a94ad] max-w-md mx-auto text-sm">All devices include delivery, network setup, and full service — included in the monthly rate.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {devices.map((d, i) => (
              <div key={i}
                className={`relative rounded-2xl p-6 flex flex-col border-2 ${d.highlight ? 'border-[#f5be53]' : 'border-white/8'}`}
                style={{
                  background: 'linear-gradient(160deg, rgba(10,20,36,0.97) 0%, rgba(5,12,24,0.99) 100%)',
                  boxShadow: d.highlight ? '0 0 40px rgba(245,190,83,0.12)' : '0 4px 24px rgba(0,0,0,0.3)',
                }}>
                {d.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f5be53] text-[#412d00] text-[10px] font-black px-3 py-0.5 rounded-full uppercase">Most Popular</span>
                )}
                <div className="mb-4">
                  <p className="text-[#f5be53] text-xs font-bold uppercase tracking-wider mb-1">{d.type}</p>
                  <h3 className="text-white font-bold text-sm leading-snug">{d.name}</h3>
                </div>
                <div className="space-y-2 mb-4 flex-1">
                  <p className="text-[#6a87a4] text-xs">⚡ {d.speed}</p>
                  <p className="text-[#6a87a4] text-xs">👥 {d.users}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {d.functions.map((fn) => (
                      <span key={fn} className="text-[9px] font-bold text-[#d3c5b0] bg-white/5 px-2 py-0.5 rounded-full border border-white/8">{fn}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-white/8">
                  <p className="text-[#f5be53] font-bold text-sm">{d.price}</p>
                  <p className="text-slate-500 text-[10px]">Incl. toner, maintenance & setup</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-xs mt-8">Other brands (Ricoh, Xerox, Sharp, Konica Minolta) available on request. Contact us for current fleet availability.</p>
        </div>
      </section>

      {/* ── Workflow & Connectivity ── */}
      <section className="py-16 px-4 lg:px-12 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Document Workflows</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">Beyond Copying — Full Office Integration</h2>
            <p className="text-[#7a94ad] max-w-lg mx-auto text-sm">
              Modern A3 photocopiers are document workflow hubs. Our engineers configure every feature on delivery day.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowFeatures.map((w, i) => (
              <div key={i}
                className="rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300"
                style={{
                  background: 'linear-gradient(150deg, rgba(15,26,42,0.97) 0%, rgba(8,14,28,0.98) 100%)',
                  border: '1px solid rgba(245,190,83,0.12)',
                }}>
                <h3 className="text-white font-bold mb-2">{w.title}</h3>
                <p className="text-[#6a87a4] text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 px-4 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Process</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">How to Rent a Photocopier in UAE</h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-px bg-gradient-to-r from-transparent via-[#f5be53]/30 to-transparent" />
            <div className="grid lg:grid-cols-4 gap-8">
              {howToSchema.step.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f5be53] to-[#c8962e] text-[#412d00] font-black text-base flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(245,190,83,0.35)]">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-white font-bold mt-3 mb-2 text-sm">{s.name}</h3>
                  <p className="text-[#6a87a4] text-xs leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="py-16 px-4 lg:px-12 bg-[#050d1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Industry Solutions</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">Photocopier Rental for Every Sector</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <div key={i}
                className="rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300"
                style={{
                  background: 'linear-gradient(150deg, rgba(12,22,40,0.97) 0%, rgba(7,15,30,0.98) 100%)',
                  border: '1px solid rgba(245,190,83,0.12)',
                }}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{ind.icon}</span>
                  <div>
                    <h3 className="text-white font-bold text-sm">{ind.name}</h3>
                    <p className="text-[#f5be53] text-[10px] font-semibold mt-0.5">📄 {ind.volume}</p>
                  </div>
                </div>
                <p className="text-[#6a87a4] text-xs leading-relaxed">{ind.need}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-8 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs">Questions</span>
          <h2 className="text-4xl font-bold text-white mt-3">Photocopier Rental FAQ</h2>
          <p className="text-[#7a94ad] text-sm mt-3 max-w-md mx-auto">12 questions covering cost, contracts, connectivity, and everything in between.</p>
        </div>
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
              <summary className="flex justify-between items-center list-none font-bold text-base text-white pr-2">
                {faq.q}
                <span className="text-[#f5be53] text-xl shrink-0 ml-4 group-open:rotate-180 transition-transform duration-200">›</span>
              </summary>
              <p className="mt-4 text-[#d3c5b0] leading-relaxed text-sm">{faq.a}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">Ready to Rent a Photocopier?</h2>
            <p className="text-[#483200] text-lg mb-8 max-w-xl mx-auto">
              Tell us your monthly copy volume and office size. We'll match you to the right device and deliver a cost-per-page quote within 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/rental-calculator/" className="bg-[#071325] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                Get Copier Quote
              </a>
              <a href="tel:+971503823969" className="bg-white/20 border border-[#412d00]/30 text-[#412d00] px-10 py-5 rounded-full font-bold text-lg backdrop-blur-sm hover:bg-white/30 transition-colors">
                📞 +971 50 382 3969
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
