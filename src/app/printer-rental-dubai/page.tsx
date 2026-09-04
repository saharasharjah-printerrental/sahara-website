export const runtime = 'edge';
import type { Metadata } from "next";
import { getRequestContext } from "@cloudflare/next-on-pages";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import CtaBand from "@/components/ui/CtaBand";
import { ShieldCheckIcon, AwardIcon, HeadsetIcon, TruckIcon } from "@/components/icons";

interface FAQItem { q: string; a: string; }

async function getFaqsFromD1(): Promise<FAQItem[]> {
  try {
    const env = getRequestContext().env as any;
    if (!env?.DB) return DEFAULT_FAQS;
    const result = await env.DB.prepare(
      "SELECT question, answer FROM faqs WHERE pageSlug = ? AND isActive = 1 ORDER BY sortOrder ASC"
    ).bind("printer-rental-dubai").all();
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
  title: "Printer Rental Dubai | AED 250/mo | Zero Deposit | Sahara",
  description: "Printer rental Dubai from AED 250/month. Zero deposit, free toner & maintenance. 4-hr emergency response. Business Bay, JLT, DIFC, Marina, Deira & all areas. Call +971503823969",
  keywords: "printer rental dubai, photocopier rental dubai, copier lease dubai, printer rental business bay, printer rental DIFC, printer rental JLT, canon printer rental dubai, kyocera printer dubai, zero deposit printer rental dubai",
  openGraph: {
    title: "Printer Rental Dubai | Sahara Office Equipments",
    description: "Canon & Kyocera printer rental in Dubai from AED 250/month. Zero deposit, free toner, 4-hour response. Serving Business Bay, JLT, DIFC, Marina, Deira and all Dubai districts.",
    images: [{ url: "https://www.saharaprinter.com/images/heroPrntr1.webp", width: 1200, height: 630, alt: "Printer Rental Dubai" }],
    url: "https://www.saharaprinter.com/printer-rental-dubai/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
    alternates: { canonical: "https://www.saharaprinter.com/printer-rental-dubai/" },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "name": "Sahara Office Equipments — Dubai Printer Rental",
  "legalName": "Sahara Office Equipment Trading LLC",
  "description": "Printer rental and photocopier lease services in Dubai. Zero deposit, unlimited free toner, 4-hour emergency response. Serving Business Bay, JLT, DIFC, Deira, Marina and all Dubai districts. Plans from AED 250/month.",
  "url": "https://www.saharaprinter.com/printer-rental-dubai/",
  "telephone": "+971503823969",
  "email": "info@saharaprinter.com",
  "image": "https://www.saharaprinter.com/images/heroPrntr1.webp",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressCountry": "AE"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 25.2048, "longitude": 55.2708 },
  "areaServed": [
    { "@type": "City", "name": "Dubai", "sameAs": "https://www.wikidata.org/wiki/Q612" },
    "Business Bay", "DIFC", "JLT", "Dubai Marina", "Downtown Dubai", "Deira",
    "Al Quoz", "Dubai Internet City", "Dubai Silicon Oasis", "Jebel Ali",
    "Al Barsha", "Bur Dubai"
  ],
  "priceRange": "AED 250—2000",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"], "opens": "08:00", "closes": "20:00" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Dubai Printer Rental Plans",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "A4 Desktop Printer Rental Dubai",
        "price": "250",
        "priceCurrency": "AED",
        "priceSpecification": { "@type": "UnitPriceSpecification", "unitText": "MONTH", "minPrice": "250", "maxPrice": "400" },
        "description": "A4 print, unlimited toner, quarterly maintenance, and 4-hour emergency response."
      },
      {
        "@type": "Offer",
        "name": "A3 Multifunction Photocopier Rental Dubai",
        "price": "500",
        "priceCurrency": "AED",
        "priceSpecification": { "@type": "UnitPriceSpecification", "unitText": "MONTH", "minPrice": "500", "maxPrice": "900" },
        "description": "A3 and A4 print, copy, and scan with unlimited toner, monthly maintenance, and network setup."
      },
      {
        "@type": "Offer",
        "name": "Enterprise Copier Rental Dubai",
        "price": "1000",
        "priceCurrency": "AED",
        "priceSpecification": { "@type": "UnitPriceSpecification", "unitText": "MONTH", "minPrice": "1000", "maxPrice": "2000" },
        "description": "High-speed A3 color MFP with unlimited toner, weekly maintenance, 2-hour priority response, and loaner guarantee."
      }
    ]
  }
};

const DEFAULT_FAQS: FAQItem[] = [
  { q: "How much does printer rental cost in Dubai?", a: "Printer rental in Dubai starts from AED 250/month for an A4 desktop printer. A3 multifunction photocopiers (print, copy, scan) start from AED 500/month. High-speed enterprise copiers for large offices range from AED 1,000—2,000/month. All plans include zero deposit, unlimited OEM toner, maintenance, and free delivery across Dubai." },
  { q: "Do you offer zero deposit printer rental in Dubai?", a: "Yes. Sahara offers zero deposit printer rental for qualified Dubai businesses. There is no upfront security deposit — you pay only the monthly rental. This applies to standard 12—36 month contracts for established businesses." },
  { q: "How fast can you deliver a rented printer to my Dubai office?", a: "We offer same-day delivery to most Dubai districts including Business Bay, DIFC, JLT, Marina, Sheikh Zayed Road, and Deira. Next-day delivery is standard for all other Dubai locations. Our engineers handle the full network setup on delivery day at no extra charge." },
  { q: "What printer brands do you rent in Dubai?", a: "We rent Canon imageRUNNER ADVANCE, Kyocera TASKalfa, HP LaserJet Enterprise, Ricoh MP series, and Xerox AltaLink in Dubai. Canon and Kyocera are our most popular brands due to their proven reliability in UAE climate conditions." },
  { q: "What is your emergency repair response time in Dubai?", a: "Our average emergency repair response time in Dubai is 4 hours. For critical rental clients in Business Bay, DIFC, and Downtown Dubai, we maintain a priority dispatch queue with 2-hour target response. If a repair exceeds 24 hours, we deliver a loaner machine at no charge." },
  { q: "Is toner included in the Dubai printer rental price?", a: "Yes — unlimited genuine OEM toner is included in all Sahara rental plans across Dubai. We remotely monitor toner levels and replenish proactively — you never need to order consumables or worry about running out mid-print." },
  { q: "Can I rent a printer for a short-term event or exhibition in Dubai?", a: "Yes. We supply printers and photocopiers for Dubai exhibitions, DWTC events, trade shows, hotel functions, and temporary office setups. Short-term rentals are available from 1 day to 3 months. We have supplied equipment for COP28 and major exhibitions at Dubai World Trade Centre." },
  { q: "Do you serve free zones like JAFZA, DMCC, and DIFC?", a: "Yes. We regularly supply and service rental printers in JAFZA (Jebel Ali Free Zone), DMCC (JLT), DIFC, Dubai Internet City, Dubai Media City, Dubai Silicon Oasis, and DAFZA (Dubai Airport Free Zone). Billing can be arranged in AED or USD for free zone entities." },
  { q: "Can I upgrade my rented printer during the contract in Dubai?", a: "Absolutely. Our 'Growth Guard' policy allows you to upgrade your printer or photocopier at any point during the rental contract — scaling from a small desktop unit to a high-volume A3 copier as your business grows. No termination fees apply for upgrades." },
  { q: "Do you offer multi-location printer rental for companies with multiple Dubai offices?", a: "Yes. We manage corporate fleet deployments across multiple Dubai locations under one contract with consolidated billing. This is ideal for businesses with branches in Business Bay, Deira, and Jebel Ali, for example. Fleet discount pricing applies for 3+ machines." },
  { q: "What happens to the printer at the end of the Dubai rental contract?", a: "At the end of the rental term, we collect the equipment at no charge. You can renew, upgrade to newer equipment, or simply return the machine. There are no exit fees and no disposal costs — Sahara handles the full lifecycle of every machine we rent." },
  { q: "Can the rented printer connect to our Dubai office Wi-Fi and email system?", a: "Yes. Our technicians configure full network integration including: LAN and Wi-Fi connectivity, scan-to-email via your office SMTP server, scan-to-folder for your server or NAS, cloud integration (Google Drive, OneDrive, SharePoint), and secure print release. Full setup is included in delivery." },
  { q: "Which is better for a Dubai office — laser or inkjet?", a: "Laser is the standard choice for Dubai offices: it handles heat, humidity, and dust far more reliably than inkjet, and its cost-per-page drops sharply at business print volumes. Inkjet only makes sense for very low-volume, home-style use. Every device on Sahara's Dubai rental fleet is laser-based for this reason." },
  { q: "Is laser or inkjet cheaper for a Dubai business?", a: "Laser has a slightly higher machine cost but roughly 60-70% lower cost-per-page than inkjet at typical office volumes. For a Dubai office printing 2,000+ pages a month, a rented laser MFP from AED 250/month with unlimited toner included works out cheaper than running an owned inkjet on replacement cartridges." },
  { q: "Which printer brand is best for offices in Dubai?", a: "Canon and Kyocera are the most requested brands among Sahara's Dubai clients, thanks to proven reliability in UAE heat and dust conditions. HP LaserJet Enterprise and Ricoh MP series are close behind for larger enterprise print environments." },
  { q: "Desktop or multifunction printer — which is best for a Dubai office?", a: "For small Dubai teams (1-5 users), an A4 desktop laser printer is usually enough. Offices with 10+ users get better value from an A3 multifunction device (print, copy, scan) — see our A3 Mid-Range plan above, which is our most popular tier for Dubai businesses." },
  { q: "Is an ink tank printer better than a standard inkjet for a Dubai office?", a: "Ink tank printers reduce cost-per-page versus cartridge inkjets, but neither is built for sustained office volumes or Dubai's dusty conditions the way a laser MFP is. We don't recommend ink tank devices for business use — laser rental is the standard for every Dubai office we service." },
  { q: "Which printer is best for a Dubai home office with Wi-Fi?", a: "A compact A4 wireless laser printer covers most Dubai home-office needs. Sahara's smallest rental tier (from AED 250/month) includes free Wi-Fi and network setup, so the printer is ready to use with any laptop or phone on delivery day." },
  { q: "Do you rent or service Epson printers in Dubai?", a: "Sahara's core Dubai rental fleet centers on Canon and Kyocera laser devices for high-volume office reliability, but our repair and AMC teams service Epson equipment too if your office already runs it — see our Repair and AMC services for details." },
  { q: "What are the 4 toner colors used in a Dubai office color copier?", a: "Cyan, magenta, yellow, and black (CMYK) — the standard four-color toner set used across every color laser multifunction device Sahara rents in Dubai, from entry A4 models to enterprise A3 copiers." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services/printer-rental/" },
    { "@type": "ListItem", "position": 3, "name": "Printer Rental Dubai", "item": "https://www.saharaprinter.com/printer-rental-dubai/" }
  ]
};

const dubaiAreas = [
  "Business Bay", "DIFC", "JLT (Jumeirah Lake Towers)", "Dubai Marina",
  "Downtown Dubai", "Sheikh Zayed Road", "Deira", "Al Quoz",
  "Dubai Internet City", "Dubai Media City", "Dubai Silicon Oasis", "Jebel Ali",
  "DWTC Area", "Al Barsha", "Bur Dubai", "Festival City"
];

const pricingTiers = [
  { name: "A4 Desktop", price: "AED 250—400", period: "/month", users: "1—5 users", volume: "Up to 2,000 pages", includes: ["A4 print only", "Unlimited toner", "Quarterly maintenance", "4-hr emergency response"], popular: false },
  { name: "A3 Mid-Range", price: "AED 500—900", period: "/month", users: "10—30 users", volume: "Up to 15,000 pages", includes: ["A3 + A4 print, copy, scan", "Unlimited toner", "Monthly maintenance", "4-hr emergency response", "Network setup included"], popular: true },
  { name: "A3 Enterprise", price: "AED 1,000—2,000", period: "/month", users: "30—80 users", volume: "Unlimited pages", includes: ["High-speed A3 color MFP", "Unlimited toner", "Weekly maintenance", "2-hr priority response", "Loaner machine guarantee", "Multi-site billing"], popular: false },
];

const dubaiIndustries = [
  { name: "Financial Services & DIFC Firms", insight: "DIFC-based banks and financial firms trust Sahara for compliance-grade secure printing with PIN release and audit trails.", icon: ShieldCheckIcon },
  { name: "Real Estate & Property", insight: "Dubai real estate agencies rely on A3 photocopiers for large-format floor plans, listing brochures, and high-volume contract duplication.", icon: AwardIcon },
  { name: "Hospitality & Hotels", insight: "Dubai hotels use our event rental service for conferences, banquets, and temporary office setups — with same-day delivery to any hotel district.", icon: HeadsetIcon },
  { name: "Logistics & Free Zone Companies", insight: "JAFZA and Jebel Ali logistics operators require 24/7 manifest and label printing. We provide priority AMC coverage for operations that never stop.", icon: TruckIcon },
];

const blogPosts = [
  {
    slug: "how-to-choose-the-best-printer-rental-dubai-service",
    title: "How to Choose the Best Printer Rental Dubai Service?",
    category: "Guide",
    img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1771224373/blogs/ai73xmapai8rb1z1u7qg.webp",
  },
  {
    slug: "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental",
    title: "How Dubai Companies Save Budget with Printer Rental",
    category: "Finance",
    img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1752651510/blogs/l3byyc7o8a8f1lddujis.jpg",
  },
  {
    slug: "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025",
    title: "Why Every UAE Business is Renting Printers in 2025",
    category: "Trends",
    img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1751102332/blogs/dqusdi9d0tonfoa0ggx6.jpg",
  },
  {
    slug: "total-cost-of-printer-ownership",
    title: "Total Cost of Printer Ownership vs. Rental",
    category: "Finance",
    img: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758623726/blogs/rm2ptjektgnlq5hyoeyl.jpg",
  },
];

const relatedServices = [
  { href: "/services/printer-rental/", label: "Printer Rental UAE" },
  { href: "/services/photocopier-rental/", label: "Photocopier Rental" },
  { href: "/services/amc/", label: "Annual Maintenance (AMC)" },
  { href: "/services/repair/", label: "Printer Repair" },
  { href: "/services/printer-spare-parts/", label: "Toner & Spare Parts" },
  { href: "/printer-repair-dubai/", label: "Printer Repair Dubai" },
  { href: "/canon-printer-dubai/", label: "Canon Printer Dubai" },
  { href: "/brands/canon/", label: "Canon Printers" },
  { href: "/brands/kyocera/", label: "Kyocera Printers" },
];

const otherLocations = [
  { href: "/printer-rental-abu-dhabi/", label: "Printer Rental Abu Dhabi", desc: "Weekly maintenance. Mussafah, Al Reem, Khalifa City." },
  { href: "/printer-rental-sharjah/", label: "Printer Rental Sharjah", desc: "Our HQ. Fastest response in Sharjah & Northern Emirates." },
  { href: "/printer-rental-rak/", label: "Printer Rental RAK", desc: "Ras Al Khaimah businesses & free zones." },
  { href: "/copier-lease-uae/", label: "Copier Lease UAE", desc: "Nationwide fleet leasing with one contract." },
];

const trail = [{ label: "Home", href: "/" }, { label: "Printer Rental Dubai" }];

export default async function PrinterRentalDubai() {
  const faqs = await getFaqsFromD1();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.saharaprinter.com/printer-rental-dubai/#faq",
    mainEntity: faqs.map((f, i) => ({
      "@type": "Question",
      "@id": `https://www.saharaprinter.com/printer-rental-dubai/#faq-${i + 1}`,
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <main className="min-h-screen bg-surface">
        <Header />

        {/* Hero — full-bleed skyline photo, distinct per city page by design */}
        <section className="relative overflow-hidden px-6 pb-20 pt-32">
          <div className="absolute inset-0">
            <img
              src="/images/location-dubai.webp"
              alt="Dubai skyline corporate office"
              className="h-full w-full object-cover"
              fetchPriority="high"
              loading="eager"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-surface/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/60 to-surface-low" />
          </div>

          <div className="relative mx-auto max-w-content">
            <Breadcrumbs trail={trail} />
            <Reveal className="max-w-2xl">
              <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Dubai · Zero Deposit · Same-Day Delivery</p>
              <h1 className="font-sora text-display-xl font-extrabold text-white">
                Printer Rental
                <br />
                <span className="text-primary">Dubai</span>
              </h1>
              <div className="mt-6">
                <AnswerBlock
                  question="How quickly can a rented printer be delivered in Dubai?"
                  answer="Same-day delivery is available across most Dubai districts. Business Bay, DIFC, JLT, Dubai Marina, Sheikh Zayed Road, and Deira are usually covered the same working day; everywhere else in Dubai is next-day. Sahara engineers handle network configuration on the delivery visit at no extra charge."
                  supportingPoints={[
                    "Same-day: Business Bay, DIFC, JLT, Marina, Sheikh Zayed Road, Deira. Next-day: rest of Dubai",
                    "Free zones served directly: JAFZA, DMCC, DAFZA, Dubai Internet City, Media City, Silicon Oasis",
                    "Network setup and driver installation are included in the delivery visit",
                    "4-hour emergency response target, 2-hour priority for Business Bay, DIFC and Downtown Dubai",
                  ]}
                />
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["AED 250/mo Starting", "Zero Deposit", "Same-Day Delivery", "Free Toner", "4-hr Response"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-caption text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="/rental-calculator/" className="btn-primary">Get Dubai Quote</a>
                <a href="tel:+971503823969" className="btn-secondary">+971 50 382 3969</a>
              </div>
            </Reveal>
          </div>
        </section>

        <Section eyebrow="Dubai Pricing" title="Printer Rental Plans for Dubai Businesses" subtitle="All prices are per machine per month. Includes delivery, network setup, toner, and maintenance." align="center" tone="raised">
          <div className="grid gap-8 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-panel border-2 p-8 ${tier.popular ? "border-primary bg-surface-mid" : "border-white/[0.08] bg-surface-low"}`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-primary px-4 py-0.5 text-[10px] font-black uppercase text-on-primary">Most Popular</span>
                )}
                <h3 className="mb-1 text-center text-2xl font-bold text-white">{tier.name}</h3>
                <div className="mb-2 text-center">
                  <span className="text-3xl font-black text-primary">{tier.price}</span>
                  <span className="text-sm text-slate-400">{tier.period}</span>
                </div>
                <div className="mb-6 space-y-1 text-center">
                  <p className="text-caption text-muted">{tier.users}</p>
                  <p className="text-caption text-muted">{tier.volume}</p>
                </div>
                <ul className="mb-8 flex-1 space-y-2">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <span className="mt-0.5 shrink-0 text-primary">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/rental-calculator/" className={`block rounded-pill py-4 text-center font-bold transition-all hover:scale-[1.02] ${tier.popular ? "bg-gradient-to-r from-primary to-primary-deep text-on-primary" : "glass-card text-white"}`}>
                  Get Dubai Quote
                </a>
              </div>
            ))}
          </div>
        </Section>

        <Section flush>
          <div className="rounded-panel border-l-4 border-primary bg-surface-low p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="mb-6 font-sora text-title font-bold text-white">What is Printer Rental in Dubai?</h2>
            <div className="space-y-4 leading-relaxed text-on-surface-variant">
              <p>
                Printer rental in Dubai is a managed equipment leasing model where businesses access enterprise-grade
                Canon, Kyocera, HP, or Ricoh printers and photocopiers through a fixed monthly contract — without
                purchasing the equipment outright. The monthly fee covers the machine, unlimited OEM toner, all maintenance
                and repairs, and technical support.
              </p>
              <p>
                In Dubai&rsquo;s fast-moving business environment — from the towers of Business Bay and DIFC to the warehouses
                of Jebel Ali and Al Quoz — printing needs change rapidly. Printer rental eliminates the risk of owning
                depreciating assets. Instead of tying up capital in hardware that becomes obsolete in 3—4 years, companies
                pay a predictable monthly operational expense and upgrade seamlessly.
              </p>
              <p>
                Sahara Office Equipments has operated in Dubai since 2012, deploying over 2,500 devices across the
                emirate. Our Dubai clients include multinationals in DIFC, logistics operators in JAFZA, healthcare
                providers, real estate agencies, and government-adjacent organizations in Business Bay. The 4-hour
                emergency response and free replacement machine guarantee make our service the benchmark in the market.
              </p>
              <p>
                Unlike buying — where toner, maintenance contracts, spare parts, and technician callouts add 40—60%
                to the total cost of ownership — our rental model bundles everything into one monthly invoice with
                no hidden fees and no exit penalties.
              </p>
            </div>
          </div>
        </Section>

        <Section eyebrow="Coverage" title="All Dubai Districts — Same-Day Delivery" subtitle="Our technicians operate from a Dubai service hub for fast response across all areas." align="center" tone="raised">
          <div className="flex flex-wrap justify-center gap-3">
            {dubaiAreas.map((area) => (
              <span key={area} className="rounded-pill border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[0.9rem] font-medium text-on-surface-variant transition-all hover:border-primary/30 hover:text-white">
                {area}
              </span>
            ))}
          </div>
        </Section>

        <Section eyebrow="Who We Serve in Dubai" title="Printer Rental Trusted Across Dubai Sectors" align="center">
          <div className="grid gap-6 sm:grid-cols-2">
            {dubaiIndustries.map((ind, i) => (
              <FeatureCard key={ind.name} icon={ind.icon} title={ind.name} body={ind.insight} delay={(i % 2) * 0.05} />
            ))}
          </div>
        </Section>

        <Section flush>
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { value: "1,500+", label: "Happy Clients UAE" },
              { value: "AED 250", label: "Starting Price/Month" },
              { value: "4 Hours", label: "Emergency Response Dubai" },
              { value: "13+ Years", label: "Serving UAE" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-caption uppercase tracking-widest text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary mb-4">Questions</p>
            <h2 className="font-sora text-title font-bold text-white mb-3">Printer Rental Dubai — FAQ</h2>
            <p className="mx-auto max-w-md text-[0.9rem] text-muted">20 questions covering pricing, delivery, brands, printer types, and contracts — everything Dubai businesses ask.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={faq.q} className="glass-card rounded-card p-6 group cursor-pointer" open={i === 0}>
                <summary className="flex items-center justify-between gap-4 pr-2 list-none font-bold text-[1rem] text-white">
                  {faq.q}
                  <span className="shrink-0 text-xl text-primary transition-transform duration-200 group-open:rotate-180">›</span>
                </summary>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-on-surface-variant">{faq.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section flush tone="raised">
          <p className="text-center text-caption font-bold uppercase tracking-widest text-muted mb-6">Related Services</p>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedServices.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-pill border border-white/[0.08] px-4 py-2 text-caption text-muted transition-all hover:text-white hover:border-primary/40">
                {link.label}
              </Link>
            ))}
          </div>
        </Section>

        <Section flush>
          <p className="text-center text-caption font-bold uppercase tracking-widest text-muted mb-6">Printer Rental in Other Emirates</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherLocations.map((loc) => (
              <Link key={loc.href} href={loc.href} className="group rounded-card border border-white/[0.06] bg-surface-low p-5 transition-all duration-300 hover:-translate-y-0.5">
                <h4 className="mb-1 text-[0.9rem] font-semibold text-white transition-colors group-hover:text-primary">{loc.label}</h4>
                <p className="text-caption leading-relaxed text-slate-500">{loc.desc}</p>
              </Link>
            ))}
          </div>
        </Section>

        <Section eyebrow="Resource Hub" title="Dubai Printer Rental Guides" tone="raised">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blogs/${post.slug}`} className="group">
                <div className="flex h-full flex-col overflow-hidden rounded-card border border-white/[0.08] bg-surface-mid transition-transform duration-300 hover:-translate-y-1">
                  <img src={post.img} alt={post.title} className="h-32 w-full object-cover" loading="lazy" />
                  <div className="flex flex-1 flex-col p-4">
                    <span className="mb-2 inline-flex self-start rounded-pill border border-primary/20 bg-surface-max px-2 py-0.5 text-[10px] font-medium text-primary">
                      {post.category}
                    </span>
                    <h4 className="line-clamp-3 flex-1 text-[0.8rem] font-semibold leading-snug text-white transition-colors group-hover:text-primary">
                      {post.title}
                    </h4>
                    <span className="mt-3 flex items-center gap-1 text-caption text-primary">
                      Read
                      <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-right">
            <Link href="/blogs/" className="text-[0.9rem] text-primary hover:underline">View All →</Link>
          </div>
        </Section>

        <CtaBand
          title="Need Printer Rental in Dubai?"
          body="Get a customized Dubai quote within 2 hours. Free consultation and same-day delivery available for most Dubai districts."
          primary={{ label: "Get Free Dubai Quote", href: "/rental-calculator/" }}
          secondary={{ label: "Call Now", href: "tel:+971503823969" }}
        />

        <Footer />
        <WhatsAppCTA />
        <JumpToTop />
      </main>
    </>
  );
}
