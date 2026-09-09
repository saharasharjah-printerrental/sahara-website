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
import {
  SettingsIcon,
  TruckIcon,
  LayersIcon,
  AwardIcon,
  ShieldCheckIcon,
  ClockIcon,
} from "@/components/icons";

interface FAQItem { q: string; a: string; }

// Sep 2026: new page. GSC (90 days): "photocopier rental in abu dhabi" 135
// impressions @ pos 21.3, zero clicks, with no dedicated Abu Dhabi
// photocopier page (only Sharjah existed before this wave).
// /printer-rental-abu-dhabi/ exists but targets printers, not photocopiers
// specifically. District/area data reused from printer-rental-abu-dhabi
// (Mussafah, Khalifa City, Al Reem Island, Yas Island, KEZAD), not invented.
async function getFaqsFromD1(): Promise<FAQItem[]> {
  try {
    const env = getRequestContext().env as any;
    if (!env?.DB) return DEFAULT_FAQS;
    const result = await env.DB.prepare(
      "SELECT question, answer FROM faqs WHERE pageSlug = ? AND isActive = 1 ORDER BY sortOrder ASC"
    ).bind("photocopier-rental-abu-dhabi").all();
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
    title: "Photocopier Rental Abu Dhabi | New A3 from AED 500/mo",
    description:
      "Photocopier rental Abu Dhabi — refurbished from AED 250/mo, new A3 copiers from AED 500/mo. Mussafah, Khalifa City, Al Reem Island & Yas Island.",
    keywords: [
      "photocopier rental abu dhabi",
      "photocopier rental in abu dhabi",
      "copier lease abu dhabi",
      "photocopier for rent abu dhabi",
      "office copier rental abu dhabi",
      "a3 copier rental abu dhabi",
      "canon kyocera copier rental abu dhabi",
    ],
    alternates: { canonical: "https://www.saharaprinter.com/photocopier-rental-abu-dhabi/" },
    openGraph: {
      title: "Photocopier Rental Abu Dhabi | New A3 from AED 500/mo — Sahara Office Equipments",
      description:
        "Rent a Canon or Kyocera photocopier in Abu Dhabi — refurbished from AED 250/month, new A3 from AED 500/month. Zero deposit, free toner, weekly maintenance.",
      url: "https://www.saharaprinter.com/photocopier-rental-abu-dhabi/",
      siteName: "Sahara Office Equipments",
      locale: "en_AE",
      type: "website",
      images: [
        {
          url: "/images/heroPrntr1.webp",
          width: 1200,
          height: 630,
          alt: "Photocopier Rental Abu Dhabi — Sahara Office Equipments",
        },
      ],
    },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Sahara Office Equipments — Abu Dhabi Photocopier Rental",
  legalName: "Sahara Office Equipment Trading LLC",
  description:
    "Photocopier rental in Abu Dhabi — refurbished units from AED 250/month, new A3 photocopiers from AED 500/month. Zero deposit, free toner, weekly maintenance. Canon, Kyocera, Xerox, HP authorized service.",
  url: "https://www.saharaprinter.com/photocopier-rental-abu-dhabi/",
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
    { "@type": "City", name: "Abu Dhabi" },
    { "@type": "Place", name: "Mussafah Industrial Area" },
    { "@type": "Place", name: "Khalifa City" },
    { "@type": "Place", name: "Al Reem Island" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Abu Dhabi Photocopier Rental Plans",
    itemListElement: [
      { "@type": "Offer", name: "Refurbished A4 Copier Rental Abu Dhabi", price: "250", priceCurrency: "AED", itemCondition: "https://schema.org/RefurbishedCondition", description: "Refurbished/short-term Canon/Kyocera A4 copier — includes toner, delivery, installation" },
      { "@type": "Offer", name: "New A3 Mid-Range Copier Rental Abu Dhabi", price: "500", priceCurrency: "AED", itemCondition: "https://schema.org/NewCondition", description: "New A3 multifunction — print, scan, copy, fax — for shared offices" },
      { "@type": "Offer", name: "New A3 Enterprise Copier Rental Abu Dhabi", price: "1000", priceCurrency: "AED", itemCondition: "https://schema.org/NewCondition", description: "High-volume enterprise copier for large organisations" },
    ],
  },
  priceRange: "AED 250-2000",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Photocopier Rental Abu Dhabi",
  provider: { "@type": "LocalBusiness", name: "Sahara Office Equipment Trading LLC" },
  areaServed: { "@type": "City", name: "Abu Dhabi" },
  description: "Canon and Kyocera photocopier rental in Abu Dhabi with zero deposit, unlimited toner, and weekly on-site support.",
  offers: { "@type": "AggregateOffer", lowPrice: "250", highPrice: "2000", priceCurrency: "AED", offerCount: "12" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com" },
    { "@type": "ListItem", position: 2, name: "Photocopier Rental Abu Dhabi", item: "https://www.saharaprinter.com/photocopier-rental-abu-dhabi" },
  ],
};

const DEFAULT_FAQS: FAQItem[] = [
  { q: "How much does photocopier rental cost in Abu Dhabi?", a: "A refurbished or short-term A4 desktop copier in Abu Dhabi rents from AED 250/month. A new A3 multifunction device for shared offices ranges from AED 500–900/month. Enterprise high-volume copiers start at AED 1,000/month. All plans include zero deposit, free toner, free delivery, and on-site support." },
  { q: "What is your emergency response time in Abu Dhabi?", a: "We dispatch a technician within 4–6 hours to anywhere in Abu Dhabi, including Mussafah, Khalifa City, Al Reem Island and Yas Island. Same-day replacement units are available if a repair takes longer." },
  { q: "Do I need to pay a deposit for photocopier rental in Abu Dhabi?", a: "No deposit required. Sahara offers zero-deposit photocopier rental across all Abu Dhabi plans — you only pay your first month's rental to start." },
  { q: "Which photocopier brands do you rent in Abu Dhabi?", a: "We rent Canon imageRUNNER ADVANCE, Kyocera TASKalfa, HP LaserJet Enterprise, Xerox WorkCentre, and Ricoh MP series in Abu Dhabi." },
  { q: "Do you serve Mussafah Industrial Area and free zones?", a: "Yes. Mussafah is one of our primary Abu Dhabi service zones. We also serve KEZAD (Khalifa Economic Zones), Abu Dhabi Global Market (ADGM), twofour54, and all Abu Dhabi free zones." },
  { q: "Do you cover Saadiyat Island and Yas Island?", a: "Yes — our Abu Dhabi coverage includes Saadiyat Island, Yas Island, Al Maryah Island/ADGM, and all other Abu Dhabi islands and districts." },
  { q: "Is toner included in the Abu Dhabi rental plan?", a: "Yes. All Abu Dhabi photocopier rental plans include genuine OEM toner at no extra charge, delivered proactively before you run out." },
  { q: "How often is preventive maintenance scheduled in Abu Dhabi?", a: "We schedule weekly preventive maintenance visits for all Abu Dhabi rental units to minimise unplanned downtime." },
  { q: "How long are your Abu Dhabi photocopier rental contracts?", a: "Contracts run 12, 24, or 36 months. Shorter-term rentals are available for exhibitions, project offices, and seasonal peaks." },
  { q: "Can I upgrade my copier during the Abu Dhabi rental contract?", a: "Yes. You can upgrade to a higher-capacity model at any point during your Abu Dhabi rental contract without penalty." },
];

const pricingTiers = [
  { name: "A4 Desktop (Refurbished)", price: "AED 250–450", tag: null, ideal: "Small offices, reception desks — refurbished or short-term", features: ["Canon LBP / Kyocera ECOSYS", "Up to 45 ppm A4 mono", "Print, copy, scan", "Free genuine toner", "Next-day delivery", "Weekly maintenance visits"], cta: "Get Quote" },
  { name: "A3 Mid-Range (New)", price: "AED 500–900", tag: "Most Popular", ideal: "Shared offices, Mussafah businesses", features: ["Canon iR ADVANCE / Kyocera TASKalfa", "35–55 ppm A3 & A4", "Print, copy, scan, fax", "Colour option available", "Scan to email / folder / cloud", "Free network setup"], cta: "Get Quote" },
  { name: "A3 Enterprise", price: "AED 1,000–2,000", tag: null, ideal: "High-volume industries, government & large offices", features: ["Canon imageRUNNER C5560i / Kyocera 5053ci", "60–100 ppm A3 colour", "Staple, booklet, hole-punch finishers", "Secure print, user authentication", "Dedicated account manager", "Multi-site billing available"], cta: "Get Quote" },
];

const abuDhabiAreas = [
  "Mussafah Industrial Area", "Khalifa City", "Al Reem Island", "Yas Island", "Saadiyat Island",
  "Al Maryah Island / ADGM", "KEZAD", "twofour54", "Al Bateen", "Corniche", "Musaffah M-Sector", "Al Shamkha",
];

const whyChoose = [
  { icon: ShieldCheckIcon, title: "Zero Deposit", body: "No upfront security deposit — pay only first month's rental to start." },
  { icon: ClockIcon, title: "Weekly Maintenance", body: "Scheduled preventive visits plus 4–6 hour emergency dispatch." },
  { icon: AwardIcon, title: "Free OEM Toner", body: "Genuine Canon/Kyocera toner proactively delivered before you run out." },
  { icon: SettingsIcon, title: "Network Setup Included", body: "Full LAN/Wi-Fi, scan-to-email, and user authentication — no extra charge." },
  { icon: TruckIcon, title: "Replacement Guarantee", body: "If your copier can't be fixed same-day, we install a replacement unit." },
  { icon: LayersIcon, title: "Free Zone Billing", body: "USD or AED invoicing with KEZAD/ADGM documentation support." },
];

const relatedLinks = [
  { href: "/printer-rental-abu-dhabi/", label: "Printer Rental Abu Dhabi" },
  { href: "/hp-printer-repair/", label: "HP Printer Repair" },
  { href: "/photocopier-rental-dubai/", label: "Photocopier Rental Service" },
  { href: "/services/amc/", label: "Printer AMC" },
];

const trail = [{ label: "Home", href: "/" }, { label: "Photocopier Rental Abu Dhabi" }];

export default async function PhotocopierRentalAbuDhabi() {
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
              alt="Abu Dhabi corporate office"
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
              <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Abu Dhabi — Weekly Maintenance</p>
              <h1 className="font-sora text-display-xl font-extrabold text-white">
                Photocopier Rental <span className="text-primary">Abu Dhabi</span>
              </h1>
              <div className="mt-6">
                <AnswerBlock
                  question="How much does photocopier rental cost in Abu Dhabi?"
                  answer="A refurbished or short-term A4 copier in Abu Dhabi rents from AED 250/month; a new A3 multifunction photocopier starts from AED 500/month, up to AED 2,000/month for enterprise colour devices. Sahara covers Mussafah, Khalifa City, Al Reem Island and Yas Island with zero deposit, free toner, weekly preventive maintenance, and 4–6 hour emergency dispatch."
                  supportingPoints={[
                    "Refurbished/short-term A4 from AED 250/month; new A3 Mid-Range AED 500–900; new A3 Enterprise AED 1,000–2,000",
                    "Covers Mussafah, Khalifa City, Al Reem Island, Yas Island, Saadiyat Island and KEZAD",
                    "Weekly scheduled maintenance plus 4–6 hour emergency response",
                    "Zero deposit, unlimited genuine toner and free network setup on every plan",
                  ]}
                />
              </div>
              <p className="mt-6 max-w-xl text-body text-muted">
                Canon &amp; Kyocera photocopiers — refurbished from AED 250/month, new A3 from AED 500/month. Zero
                deposit, free toner, and weekly maintenance across all Abu Dhabi districts.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Zero Deposit", "Free Toner", "Weekly Maintenance", "Free Network Setup", "Replacement Guarantee"].map((t) => (
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
              { number: "4-6", suffix: " hrs", label: "Emergency Response" },
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
              Why Abu Dhabi Businesses Choose Photocopier Rental Over Buying
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              For Abu Dhabi SMEs — particularly in Mussafah Industrial Area, government-adjacent offices, and
              free zone companies — purchasing a commercial photocopier outright means a capital outlay of AED
              8,000 to AED 45,000, plus ongoing toner and maintenance costs. Rental eliminates this entirely.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              With Sahara&rsquo;s photocopier rental in Abu Dhabi, businesses pay a fixed monthly fee that covers
              the machine, all genuine OEM toner cartridges, scheduled weekly maintenance visits, and unlimited
              on-site repairs. This is especially valuable for Mussafah manufacturing and logistics businesses
              where equipment downtime affects production documentation.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              KEZAD and ADGM companies benefit from Sahara&rsquo;s flexible billing — USD or AED invoicing is
              available, and equipment can be added or upgraded mid-contract without renegotiation.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Unlike desktop laser printers which cost 5–15 fils per A4 page, our rented photocopiers deliver
              black-and-white output at approximately <strong className="text-white">1–2 fils per page</strong>.
            </p>
          </div>
        </Section>

        <Section title="Abu Dhabi Rental Plans" subtitle="All plans: zero deposit · free toner · free delivery · weekly maintenance" align="center">
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

        <Section title="Areas We Serve in Abu Dhabi" subtitle="Weekly scheduled maintenance and 4–6 hour emergency dispatch across all districts." align="center">
          <div className="flex flex-wrap justify-center gap-3">
            {abuDhabiAreas.map((area) => (
              <span key={area} className="rounded-pill border border-primary/20 bg-surface-max px-4 py-2 text-[0.9rem] text-on-surface-variant transition-colors hover:border-primary/50">
                {area}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Why Choose Sahara in Abu Dhabi?" align="center" tone="raised">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((b) => (
              <FeatureCard key={b.title} icon={b.icon} title={b.title} body={b.body} />
            ))}
          </div>
        </Section>

        <CtaBand
          title="Need a Photocopier in Abu Dhabi?"
          body="Quote within 2 hours. Free site visit. Weekly maintenance included on every plan."
          primary={{ label: "Get Free Quote", href: "/rental-calculator/" }}
          secondary={{ label: "Call +971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white mb-3">Photocopier Rental Abu Dhabi — FAQ</h2>
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
