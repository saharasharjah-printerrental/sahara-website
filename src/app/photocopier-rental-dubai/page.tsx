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
import ComparisonTable from "@/components/ui/ComparisonTable";
import CtaBand from "@/components/ui/CtaBand";
import {
  SettingsIcon,
  TruckIcon,
  LayersIcon,
  AwardIcon,
  ShieldCheckIcon,
  ClockIcon,
} from "@/components/icons";

interface FAQItem { q: string; a: string; }

// Sep 2026: new page. GSC (90 days): "photocopier rental in dubai" 303
// impressions @ pos 23.3, "photocopier rental dubai" 57 @ 21.0 — both zero
// clicks, with no dedicated Dubai photocopier page (only Sharjah existed).
// /services/photocopier-rental/ is the UAE-wide hub; /printer-rental-dubai/
// exists but targets printers, not photocopiers specifically. Built on the
// same pattern as photocopier-rental-sharjah, using the district/area data
// already established on printer-rental-dubai (not invented for this page).
//
// Sep 2026 (later): /services/photocopier-rental/ was 301'd here — it had
// decayed to position 66 UAE-wide, beaten by this page and by the homepage on
// its own terms. Before the redirect, its real assets were migrated in: the
// photocopier-vs-desktop-printer comparison table, the 4-device fleet block,
// and its FAQ set (merged with this page's, duplicates removed) — see the
// "Photocopier vs. Desktop Printer" and "Our Fleet" sections below, and a
// short UAE-wide framing section so this page still serves non-Dubai readers
// who land here from the old hub's inbound links.
//
// Pricing reconciled per business confirmation: refurbished/short-term units
// start at AED 250/month; new A3 photocopiers start at AED 500/month. Every
// price on this page states which applies — do not collapse back to a single
// "from AED 250" claim, that is refurb/short-term pricing only.
async function getFaqsFromD1(): Promise<FAQItem[]> {
  try {
    const env = getRequestContext().env as any;
    if (!env?.DB) return DEFAULT_FAQS;
    const result = await env.DB.prepare(
      "SELECT question, answer FROM faqs WHERE pageSlug = ? AND isActive = 1 ORDER BY sortOrder ASC"
    ).bind("photocopier-rental-dubai").all();
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
    title: "Photocopier Rental Dubai | New A3 from AED 500/mo",
    description:
      "Photocopier rental Dubai — refurbished from AED 250/mo, new A3 copiers from AED 500/mo. Zero deposit, free toner, 4-hour response. Canon & Kyocera.",
    keywords: [
      "photocopier rental dubai",
      "photocopier rental in dubai",
      "copier lease dubai",
      "photocopier for rent dubai",
      "photocopier leasing dubai",
      "office copier rental dubai",
      "a3 copier rental dubai",
      "canon kyocera copier rental dubai",
    ],
    alternates: { canonical: "https://www.saharaprinter.com/photocopier-rental-dubai/" },
    openGraph: {
      title: "Photocopier Rental Dubai | New A3 from AED 500/mo — Sahara Office Equipments",
      description:
        "Rent a Canon or Kyocera photocopier in Dubai — refurbished from AED 250/month, new A3 from AED 500/month. Zero deposit, free toner, 4-hour response.",
      url: "https://www.saharaprinter.com/photocopier-rental-dubai/",
      siteName: "Sahara Office Equipments",
      locale: "en_AE",
      type: "website",
      images: [
        {
          url: "/images/heroPrntr1.webp",
          width: 1200,
          height: 630,
          alt: "Photocopier Rental Dubai — Sahara Office Equipments",
        },
      ],
    },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Sahara Office Equipments — Dubai Photocopier Rental",
  legalName: "Sahara Office Equipment Trading LLC",
  description:
    "Photocopier rental in Dubai — refurbished units from AED 250/month, new A3 photocopiers from AED 500/month. Zero deposit, free toner, 4-hour emergency response. Canon, Kyocera, Xerox, HP authorized service.",
  url: "https://www.saharaprinter.com/photocopier-rental-dubai/",
  telephone: "+971503823969",
  email: "info@saharaprinter.com",
  foundingDate: "2012",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Arabi Building, Industrial Center Road, Industrial Area 11",
    addressLocality: "Sharjah",
    addressRegion: "Sharjah",
    addressCountry: "AE",
  },
  areaServed: [
    { "@type": "City", name: "Dubai" },
    { "@type": "Place", name: "Business Bay" },
    { "@type": "Place", name: "DIFC" },
    { "@type": "Place", name: "Jumeirah Lake Towers" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dubai Photocopier Rental Plans",
    itemListElement: [
      { "@type": "Offer", name: "Refurbished A4 Copier Rental Dubai", price: "250", priceCurrency: "AED", itemCondition: "https://schema.org/RefurbishedCondition", description: "Refurbished/short-term Canon/Kyocera A4 copier — includes toner, delivery, installation" },
      { "@type": "Offer", name: "New A3 Mid-Range Copier Rental Dubai", price: "500", priceCurrency: "AED", itemCondition: "https://schema.org/NewCondition", description: "New A3 multifunction — print, scan, copy, fax — for shared offices" },
      { "@type": "Offer", name: "New A3 Enterprise Copier Rental Dubai", price: "1000", priceCurrency: "AED", itemCondition: "https://schema.org/NewCondition", description: "High-volume enterprise copier for large organisations" },
    ],
  },
  priceRange: "AED 250-2000",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Photocopier Rental Dubai",
  provider: { "@type": "LocalBusiness", name: "Sahara Office Equipment Trading LLC" },
  areaServed: { "@type": "City", name: "Dubai" },
  description: "Canon and Kyocera photocopier rental in Dubai with zero deposit, unlimited toner, and 4-hour on-site support.",
  offers: { "@type": "AggregateOffer", lowPrice: "250", highPrice: "2000", priceCurrency: "AED", offerCount: "12" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com/" },
    { "@type": "ListItem", position: 2, name: "Photocopier Rental Dubai", item: "https://www.saharaprinter.com/photocopier-rental-dubai/" },
  ],
};

// Merged with /services/photocopier-rental/'s FAQ set before that page was
// 301'd here — duplicates removed, Dubai-specific answers kept as-is, the
// UAE-wide questions (brands roster, CPP, multi-site, upgrades) folded in
// so the page still answers non-Dubai-specific queries.
const DEFAULT_FAQS: FAQItem[] = [
  { q: "How much does photocopier rental cost in Dubai?", a: "A refurbished or short-term A4 desktop copier in Dubai rents from AED 250/month. A new A3 multifunction device for shared offices ranges from AED 500–900/month. Enterprise high-volume copiers start at AED 1,000/month. All plans include zero deposit, free toner, free delivery, and on-site support." },
  { q: "What is the difference between photocopier rental and printer rental?", a: "A photocopier (multifunction device / MFP) combines high-volume copying, printing, scanning, and faxing in a single A3-capable device — designed for shared office use by 10–50+ people. A desktop printer is typically A4-only and serves 1–5 users. Photocopiers process thousands of pages daily at a lower cost-per-page (CPP) than desktop printers, making them more cost-effective for document-intensive offices." },
  { q: "What is your emergency response time in Dubai?", a: "We target a 4-hour on-site response anywhere in Dubai, with a 2-hour priority queue for Business Bay, DIFC and Downtown Dubai. If a repair exceeds 24 hours, we deliver a loaner machine at no charge." },
  { q: "Do I need to pay a deposit for photocopier rental in Dubai?", a: "No deposit required. Sahara offers zero-deposit photocopier rental across all Dubai plans — you only pay your first month's rental to start." },
  { q: "Which photocopier brands do you rent in Dubai?", a: "We rent Canon imageRUNNER ADVANCE (C5540i, C5250, 4551i) and Kyocera TASKalfa (2553ci, 3553ci, 5053ci) as primary lines, plus Xerox WorkCentre, HP LaserJet, and Ricoh MP series in Dubai and across the UAE. Canon and Kyocera are our most popular because of their reliability in UAE heat and humidity conditions." },
  { q: "Is toner included in the Dubai rental plan?", a: "Yes. All Dubai photocopier rental plans include genuine OEM toner at no extra charge, delivered proactively before you run out — no monthly copy caps or surprise consumable invoices." },
  { q: "How long are your Dubai photocopier rental contracts?", a: "Standard contracts run 12, 24, or 36 months. Shorter-term rentals (1–6 months) are available for exhibitions, project offices, and seasonal peaks." },
  { q: "What happens if the photocopier breaks down in Dubai?", a: "Call us and a technician is dispatched within our response target. If the machine cannot be repaired same day, we provide a replacement unit at no extra cost under the full service agreement." },
  { q: "Do you provide network and Wi-Fi setup for rented copiers in Dubai?", a: "Yes — free network configuration is included with every Dubai rental installation, including LAN/Wi-Fi, scan-to-email, scan-to-folder, cloud integration (Google Drive, OneDrive, SharePoint), and user authentication." },
  { q: "Can I upgrade my copier during the Dubai rental contract?", a: "Yes. Our 'Growth Guard' policy lets you upgrade to a higher-capacity or colour model at any point during your Dubai rental contract without termination fees." },
  { q: "Do you serve free zones like DIFC and JAFZA?", a: "Yes — DIFC, JAFZA, Dubai South and other Dubai free zones are covered, with free zone documentation and USD/AED invoicing handled by our team." },
  { q: "Can we rent multiple photocopiers for different office locations across the UAE?", a: "Yes. Sahara specializes in multi-site corporate fleet deployments across the UAE. We consolidate billing into a single monthly invoice, provide a centralized service contact, and ensure uniform equipment standards across all your locations. Fleet discounts apply for 3+ machines." },
  { q: "What is cost-per-page (CPP) and how does it apply to copier rental?", a: "Cost-per-page (CPP) is the total monthly cost divided by your print/copy volume. With Sahara's all-inclusive rental, your effective CPP includes the machine, toner, maintenance, and parts — typically AED 0.02–0.05 per black-and-white page and AED 0.15–0.25 per colour page, depending on volume and model. This is 30–50% lower than the total cost of owning and maintaining your own copier." },
];

const pricingTiers = [
  { name: "A4 Desktop (Refurbished)", price: "AED 250–450", tag: null, ideal: "Small offices, reception desks — refurbished or short-term", features: ["Canon LBP / Kyocera ECOSYS", "Up to 45 ppm A4 mono", "Print, copy, scan", "Free genuine toner", "Next-day delivery", "4-hour emergency support"], cta: "Get Quote" },
  { name: "A3 Mid-Range (New)", price: "AED 500–900", tag: "Most Popular", ideal: "Shared offices, DIFC & Business Bay companies", features: ["Canon iR ADVANCE / Kyocera TASKalfa", "35–55 ppm A3 & A4", "Print, copy, scan, fax", "Colour option available", "Scan to email / folder / cloud", "Free network setup"], cta: "Get Quote" },
  { name: "A3 Enterprise (New)", price: "AED 1,000–2,000", tag: null, ideal: "High-volume industries, large offices", features: ["Canon imageRUNNER C5560i / Kyocera 5053ci", "60–100 ppm A3 colour", "Staple, booklet, hole-punch finishers", "Secure print, user authentication", "Dedicated account manager", "Multi-site billing available"], cta: "Get Quote" },
];

// Migrated from /services/photocopier-rental/ before it was 301'd here — see
// the note above the metadata export.
const printerVsCopier: [string, string, string][] = [
  ["Page Format", "A3 + A4 (both)", "A4 only (mostly)"],
  ["Monthly Volume", "5,000–100,000+ pages", "200–3,000 pages"],
  ["Concurrent Users", "10–80 users", "1–5 users"],
  ["Functions", "Print + Copy + Scan + Fax + Cloud", "Print (+ basic scan)"],
  ["Cost-Per-Page", "AED 0.02–0.05 (mono)", "AED 0.08–0.15 (mono)"],
  ["Monthly Rental", "AED 500–2,000 (new)", "AED 250–400"],
  ["Best For", "Shared office, legal, real estate, HR, accounts", "Individual workstation, reception desk"],
];

const uaeDeviceFleet = [
  { name: "Canon imageRUNNER ADVANCE C5540i", type: "A3 Color MFP", speed: "40 ppm color / 40 ppm mono", users: "15–40 users", price: "From AED 750/mo", highlight: true },
  { name: "Kyocera TASKalfa 3553ci", type: "A3 Color MFP", speed: "35 ppm color / 35 ppm mono", users: "10–30 users", price: "From AED 650/mo", highlight: false },
  { name: "Canon imageRUNNER ADVANCE 4551i", type: "A3 Mono MFP", speed: "51 ppm mono", users: "20–50 users", price: "From AED 500/mo", highlight: false },
  { name: "Kyocera TASKalfa 5053ci", type: "A3 Color MFP", speed: "50 ppm color / 50 ppm mono", users: "30–80 users", price: "From AED 1,000/mo", highlight: false },
];

const dubaiAreas = [
  "Business Bay", "DIFC", "JLT (Jumeirah Lake Towers)", "Dubai Marina", "Downtown Dubai", "Deira",
  "Sheikh Zayed Road", "Al Quoz", "Jebel Ali", "Dubai South", "Al Barsha", "Bur Dubai", "Karama", "Dubai Investment Park",
];

const whyChoose = [
  { icon: ShieldCheckIcon, title: "Zero Deposit", body: "No upfront security deposit — pay only first month's rental to start." },
  { icon: ClockIcon, title: "4-Hour Response", body: "2-hour priority queue for Business Bay, DIFC and Downtown Dubai." },
  { icon: AwardIcon, title: "Free OEM Toner", body: "Genuine Canon/Kyocera toner proactively delivered before you run out." },
  { icon: SettingsIcon, title: "Network Setup Included", body: "Full LAN/Wi-Fi, scan-to-email, and user authentication — no extra charge." },
  { icon: TruckIcon, title: "Replacement Guarantee", body: "If your copier can't be fixed same-day, we install a replacement unit." },
  { icon: LayersIcon, title: "Free Zone Billing", body: "USD or AED invoicing with DIFC/JAFZA documentation support." },
];

const relatedLinks = [
  { href: "/printer-rental-dubai/", label: "Printer Rental Dubai" },
  { href: "/printer-repair-dubai/", label: "Printer Repair Dubai" },
  { href: "/services/printer-rental/", label: "Printer Rental UAE" },
  { href: "/services/amc/", label: "Printer AMC" },
];

const trail = [{ label: "Home", href: "/" }, { label: "Photocopier Rental Dubai" }];

export default async function PhotocopierRentalDubai() {
  const faqs = await getFaqsFromD1();
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } : null;
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <main className="min-h-screen bg-surface">
        <Header />

        <section className="relative overflow-hidden px-6 pb-20 pt-32">
          <div className="absolute inset-0">
            <img
              src="/images/heroPrntr1.webp"
              alt="Dubai corporate office"
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
              <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Dubai — 4-Hour Response</p>
              <h1 className="font-sora text-display-xl font-extrabold text-white">
                Photocopier Rental <span className="text-primary">Dubai</span>
              </h1>
              <div className="mt-6">
                <AnswerBlock
                  question="How much does photocopier rental cost in Dubai?"
                  answer="A refurbished or short-term A4 copier in Dubai rents from AED 250/month; a new A3 multifunction photocopier starts from AED 500/month, up to AED 2,000/month for enterprise colour devices. Sahara delivers same-day to most Dubai districts, with zero deposit, free toner, and a 4-hour emergency response target — 2 hours priority for Business Bay, DIFC and Downtown."
                  supportingPoints={[
                    "Refurbished/short-term A4 from AED 250/month; new A3 Mid-Range AED 500–900; new A3 Enterprise AED 1,000–2,000",
                    "Covers Business Bay, DIFC, JLT, Dubai Marina, Downtown Dubai, Deira and all districts",
                    "4-hour emergency response target, 2-hour priority for Business Bay, DIFC and Downtown",
                    "Zero deposit, unlimited genuine toner and free network setup on every plan",
                  ]}
                />
              </div>
              <p className="mt-6 max-w-xl text-body text-muted">
                Canon &amp; Kyocera photocopiers — refurbished from AED 250/month, new A3 from AED 500/month. Zero
                deposit, free toner, and 4-hour emergency response across all Dubai districts.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Zero Deposit", "Free Toner", "4-Hr Response", "Free Network Setup", "Replacement Guarantee"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-caption text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="/rental-calculator/" className="btn-primary">Get Free Quote</a>
                <a href="tel:+971503823969" className="btn-secondary">Call: +971 50 382 3969</a>
              </div>
            </Reveal>
          </div>
        </section>

        <Section flush>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 rounded-panel border border-white/[0.08] bg-surface-low px-6 py-8 text-center md:grid-cols-4">
            {[
              { number: "4", suffix: " hrs", label: "Response Time" },
              { number: "1,500", suffix: "+", label: "Happy Clients" },
              { number: "13", suffix: "+", label: "Years Serving UAE" },
              { number: "AED 250", suffix: "/mo", label: "Starting Price" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-primary">{s.number}<span className="text-xl">{s.suffix}</span></p>
                <p className="mt-1 text-caption uppercase tracking-widest text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section flush tone="raised">
          <div className="mx-auto max-w-4xl space-y-6">
            <h2 className="font-sora text-title font-bold text-white">
              Why Dubai Businesses Choose Photocopier Rental Over Buying
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              For most Dubai SMEs — particularly in professional services, real estate, and trading — purchasing a
              commercial photocopier outright means a capital outlay of AED 8,000 to AED 45,000, plus ongoing toner
              and maintenance costs. Rental eliminates this entirely.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              With Sahara&rsquo;s photocopier rental in Dubai, businesses pay a fixed monthly fee that covers the
              machine, all genuine OEM toner cartridges, preventive maintenance visits, and unlimited on-site
              repairs. The priority 2-hour response for Business Bay, DIFC, and Downtown Dubai is uniquely valuable
              for businesses where a copier outage can halt client-facing document workflows.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              DIFC and JAFZA companies benefit from Sahara&rsquo;s flexible billing — USD or AED invoicing is
              available, and equipment can be added or upgraded mid-contract without renegotiation.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Unlike desktop laser printers which cost 5–15 fils per A4 page, our rented photocopiers deliver
              black-and-white output at approximately <strong className="text-white">1–2 fils per page</strong> —
              a significant saving for businesses printing more than 3,000 pages per month.
            </p>
          </div>
        </Section>

        <Section title="Dubai Rental Plans" subtitle="All plans: zero deposit · free toner · free delivery · 4-hour support" align="center">
          <div className="grid gap-8 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col overflow-hidden rounded-panel p-8 ${tier.tag ? "border border-primary/60 bg-surface-mid" : "border border-white/[0.08] bg-surface-low"}`}
              >
                {tier.tag && (
                  <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r from-primary to-primary-deep px-4 py-1 text-xs font-bold text-on-primary">
                    {tier.tag}
                  </div>
                )}
                <h3 className="mb-1 text-xl font-bold text-white">{tier.name}</h3>
                <p className="mb-1 text-2xl font-bold text-primary">{tier.price}<span className="text-sm font-normal text-muted">/month</span></p>
                <p className="mb-6 text-[0.9rem] italic text-muted">{tier.ideal}</p>
                <ul className="flex-1 space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <span className="mt-0.5 shrink-0 text-primary">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/rental-calculator/"
                  className={`mt-8 block rounded-pill py-3 text-center text-sm font-bold transition-all ${tier.tag ? "bg-gradient-to-r from-primary to-primary-deep text-on-primary" : "border border-primary/30 bg-primary/10 text-primary"}`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Which Do You Need?" title="Photocopier vs. Desktop Printer" subtitle="Many businesses waste money renting desktop printers when a single A3 photocopier would handle the same workload at half the cost-per-page." align="center" tone="raised">
          <ComparisonTable columns={["Feature", "A3 Photocopier", "Desktop Printer"]} highlightColumn={1} rows={printerVsCopier} />
        </Section>

        <Section eyebrow="Our Fleet · Available UAE-Wide" title="A3 Photocopiers Available to Rent" subtitle="All devices include delivery, network setup, and full service — included in the monthly rate. Same fleet available in Dubai, Sharjah, and Abu Dhabi." align="center">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {uaeDeviceFleet.map((d) => (
              <div
                key={d.name}
                className={`relative flex flex-col rounded-panel border p-6 ${d.highlight ? "border-primary bg-surface-mid" : "border-white/[0.08] bg-surface-low"}`}
              >
                {d.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-primary px-3 py-0.5 text-[10px] font-black uppercase text-on-primary">Most Popular</span>
                )}
                <p className="mb-1 text-caption font-bold uppercase tracking-wider text-primary">{d.type}</p>
                <h3 className="mb-4 text-[0.9rem] font-bold leading-snug text-white">{d.name}</h3>
                <div className="mb-4 flex-1 space-y-2">
                  <p className="text-caption text-muted">{d.speed}</p>
                  <p className="text-caption text-muted">{d.users}</p>
                </div>
                <div className="border-t border-white/[0.08] pt-4">
                  <p className="text-[0.9rem] font-bold text-primary">{d.price}</p>
                  <p className="text-[10px] text-slate-500">Incl. toner, maintenance &amp; setup</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-caption text-muted">Other brands (Ricoh, Xerox, Sharp, Konica Minolta) available on request across all seven emirates.</p>
        </Section>

        <Section title="Areas We Serve in Dubai" subtitle="4-hour emergency response, 2-hour priority for Business Bay, DIFC and Downtown. Same-day delivery for new rentals." align="center">
          <div className="flex flex-wrap justify-center gap-3">
            {dubaiAreas.map((area) => (
              <span key={area} className="rounded-pill border border-primary/20 bg-surface-max px-4 py-2 text-[0.9rem] text-on-surface-variant transition-colors hover:border-primary/50">
                {area}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Why Choose Sahara in Dubai?" align="center" tone="raised">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((b) => (
              <FeatureCard key={b.title} icon={b.icon} title={b.title} body={b.body} />
            ))}
          </div>
        </Section>

        <CtaBand
          title="Need a Photocopier in Dubai?"
          body="Quote within 2 hours. Free site visit. Same-day setup available across most Dubai districts."
          primary={{ label: "Get Free Quote", href: "/rental-calculator/" }}
          secondary={{ label: "Call +971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white mb-3">Photocopier Rental Dubai — FAQ</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={f.q} className="glass-card rounded-card p-6 group cursor-pointer" open={i === 0}>
                <summary className="flex list-none items-start justify-between gap-4 font-bold text-[1rem] text-white">
                  <span>{f.q}</span>
                  <span className="mt-1 shrink-0 text-lg leading-none text-primary transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-on-surface-variant">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section flush tone="raised">
          <p className="text-center text-caption font-bold uppercase tracking-widest text-muted mb-6">Photocopier Rental Elsewhere in the UAE</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/photocopier-rental-sharjah/", label: "Sharjah" },
              { href: "/photocopier-rental-abu-dhabi/", label: "Abu Dhabi" },
            ].map((c) => (
              <a key={c.href} href={c.href} className="rounded-pill border border-white/[0.08] px-4 py-2 text-caption text-muted transition-all hover:text-white hover:border-primary/40">
                {c.label}
              </a>
            ))}
          </div>
        </Section>

        <Section flush tone="raised">
          <p className="text-center text-caption font-bold uppercase tracking-widest text-muted mb-6">Related</p>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-pill border border-white/[0.08] px-4 py-2 text-caption text-muted transition-all hover:text-white hover:border-primary/40">
                {link.label}
              </Link>
            ))}
          </div>
        </Section>

        <Footer />
        <WhatsAppCTA />
        <JumpToTop />
      </main>
    </>
  );
}
