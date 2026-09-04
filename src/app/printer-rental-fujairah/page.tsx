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
import CtaBand from "@/components/ui/CtaBand";

interface FAQItem { q: string; a: string; }

async function getFaqsFromD1(): Promise<FAQItem[]> {
  try {
    const env = getRequestContext().env as any;
    if (!env?.DB) return DEFAULT_FAQS;
    const result = await env.DB.prepare(
      "SELECT question, answer FROM faqs WHERE pageSlug = ? AND isActive = 1 ORDER BY sortOrder ASC"
    ).bind("printer-rental-fujairah").all();
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
  title: "Printer Rental Fujairah | AED 250/mo | Sahara",
  description:
    "Printer and photocopier rental in Fujairah from AED 250/month. Zero deposit, free toner. Serving Fujairah City, Dibba, Kalba, Fujairah Free Trade Zone. Canon & Kyocera.",
  keywords: [
    "printer rental fujairah",
    "photocopier rental fujairah",
    "copier lease fujairah",
    "fujairah free zone printer rental",
    "dibba copier rental",
    "zero deposit printer fujairah",
    "canon kyocera rental fujairah",
    "office equipment rental fujairah",
    "printer lease eastern emirates",
  ],
  alternates: { canonical: "https://www.saharaprinter.com/printer-rental-fujairah/" },
  openGraph: {
    title: "Printer Rental Fujairah | AED 250/mo — Sahara Office Equipments",
    description:
      "Rent Canon or Kyocera printers in Fujairah from AED 250/month. Zero deposit, free toner. Fujairah City, Dibba, Kalba, Free Trade Zone.",
    url: "https://www.saharaprinter.com/printer-rental-fujairah/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/location-fujairah.webp",
        width: 1920,
        height: 1440,
        alt: "Printer Rental Fujairah — Sahara Office Equipments",
      },
    ],
  },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Sahara Office Equipments — Fujairah Printer Rental",
  legalName: "Sahara Office Equipment Trading LLC",
  description:
    "Printer and photocopier rental in Fujairah from AED 250/month. Zero deposit, free OEM toner, and on-site support across Fujairah City, Dibba, Kalba, and Free Trade Zone.",
  url: "https://www.saharaprinter.com/printer-rental-fujairah",
  telephone: "+971503823969",
  email: "info@saharaprinter.com",
  foundingDate: "2012",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Industrial Area 11",
    addressLocality: "Sharjah",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.1288,
    longitude: 56.3265,
  },
  areaServed: [
    { "@type": "City", name: "Fujairah" },
    { "@type": "Place", name: "Fujairah Free Trade Zone" },
    { "@type": "Place", name: "Dibba Al Fujairah" },
    { "@type": "Place", name: "Kalba" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Fujairah Printer Rental Plans",
    itemListElement: [
      { "@type": "Offer", name: "A4 Printer Rental Fujairah", price: "250", priceCurrency: "AED" },
      { "@type": "Offer", name: "A3 Copier Rental Fujairah", price: "500", priceCurrency: "AED" },
      { "@type": "Offer", name: "Enterprise Copier Fujairah", price: "1000", priceCurrency: "AED" },
    ],
  },
  priceRange: "AED 250-2000",
};

const DEFAULT_FAQS: FAQItem[] = [
  {
    q: "How much does printer rental cost in Fujairah?",
    a: "Printer rental in Fujairah starts from AED 250/month for an A4 desktop model. A3 multifunction photocopiers range from AED 500—900/month. Enterprise high-volume devices start at AED 1,000/month. All Fujairah plans include zero deposit, free toner, free delivery, and on-site support.",
  },
  {
    q: "What is your response time for Fujairah clients?",
    a: "We provide weekly scheduled service visits for Fujairah rental clients. For emergency breakdowns, we dispatch a technician within 4—6 hours to Fujairah City, Dibba, Kalba, and the Fujairah Free Trade Zone. If same-day repair is not possible, a replacement unit is delivered.",
  },
  {
    q: "Do you serve the Fujairah Free Trade Zone?",
    a: "Yes. Fujairah Free Trade Zone (FFTZ) clients are served with the same zero-deposit, free-toner plans. We handle free zone documentation for equipment leases and can invoice in USD or AED as preferred.",
  },
  {
    q: "Is there a deposit for printer rental in Fujairah?",
    a: "No deposit required. All Fujairah printer rental plans are zero-deposit. You only pay your first month to start — ideal for new businesses in Fujairah's growing industrial and free zone sectors.",
  },
  {
    q: "Which brands do you rent in Fujairah?",
    a: "We rent Canon imageRUNNER ADVANCE, Kyocera TASKalfa, HP LaserJet Enterprise, and Xerox WorkCentre in Fujairah. Canon and Kyocera are the most popular for Fujairah Port area businesses and oil storage companies.",
  },
  {
    q: "Is toner included in the Fujairah rental plan?",
    a: "Yes. All Fujairah plans include unlimited genuine Canon or Kyocera OEM toner at no extra charge. We monitor toner remotely and deliver replacements proactively — no emergency orders needed.",
  },
  {
    q: "Do you serve Dibba and Kalba?",
    a: "Yes. Dibba Al Fujairah and Kalba are within our regular Fujairah service coverage. These East Coast areas receive weekly scheduled maintenance and are included in our emergency response coverage.",
  },
  {
    q: "How long are your Fujairah rental contracts?",
    a: "Contracts are available for 12, 24, or 36 months. Short-term 1—6 month rentals are available for construction site offices, temporary events, and seasonal businesses near Fujairah Port. Longer contracts attract lower monthly rates.",
  },
  {
    q: "Do you provide network setup in Fujairah?",
    a: "Yes. Free network and Wi-Fi configuration is included with every Fujairah installation. Our technician connects the printer to your office network and sets up scan-to-email, mobile printing, and user authentication — all included.",
  },
  {
    q: "Can I upgrade my printer during the Fujairah contract?",
    a: "Yes. Upgrade to a higher-capacity or colour model at any time during your Fujairah contract without penalty. Useful for growing businesses near Fujairah Port and the industrial zone.",
  },
  {
    q: "Do you offer short-term printer rental in Fujairah for construction sites?",
    a: "Yes. Construction site offices and project-based businesses near Fujairah can rent printers from 1 month upward. We deliver, install, and collect — making it suitable for time-limited projects. All equipment includes free toner.",
  },
  {
    q: "What is the cost-per-page for rented printers in Fujairah?",
    a: "Black-and-white A4 printing on our rented Kyocera/Canon devices in Fujairah costs approximately 1—2 fils per page. Desktop consumer printers cost 8—15 fils per page. For an office printing 3,000 pages/month, that saves AED 180—390/month in consumables.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com" },
    { "@type": "ListItem", position: 2, name: "Printer Rental Fujairah", item: "https://www.saharaprinter.com/printer-rental-fujairah" },
  ],
};

const pricingTiers = [
  {
    name: "A4 Desktop",
    price: "AED 250—450",
    tag: null,
    ideal: "Small offices, site offices, reception",
    features: ["Canon LBP / Kyocera ECOSYS", "Up to 45 ppm A4 mono", "Print, copy, scan", "Free genuine OEM toner", "On-site support included", "4—6hr emergency response"],
  },
  {
    name: "A3 Mid-Range",
    price: "AED 500—900",
    tag: "Most Popular",
    ideal: "Shared offices & FFTZ companies",
    features: ["Canon iR ADVANCE / Kyocera TASKalfa", "35—55 ppm A3 & A4 mono", "Print, copy, scan, fax", "Colour option available", "Scan to email / folder", "Free network setup", "Same-day replacement guarantee"],
  },
  {
    name: "A3 Enterprise",
    price: "AED 1,000—2,000",
    tag: null,
    ideal: "Port logistics, large organisations",
    features: ["Canon imageRUNNER C5560i", "60—100 ppm A3 colour", "Staple, booklet finishers", "Secure print, user auth", "50,000+ pages/month capacity", "Dedicated account manager"],
  },
];

const fujairahAreas = [
  "Fujairah City", "Dibba Al Fujairah", "Kalba", "Fujairah Free Trade Zone",
  "Fujairah Port Area", "Al Faseel", "Al Gurfa", "Mirbah",
  "Khor Fakkan", "Al Bidya",
];

const relatedServices = [
  { href: "/services/printer-rental/", label: "Printer Rental UAE" },
  { href: "/services/photocopier-rental/", label: "Photocopier Rental" },
  { href: "/services/amc/", label: "Annual Maintenance (AMC)" },
  { href: "/services/repair/", label: "Printer Repair" },
  { href: "/brands/canon/", label: "Canon Printers" },
  { href: "/brands/kyocera/", label: "Kyocera Printers" },
];

const otherLocations = [
  { href: "/printer-rental-dubai/", label: "Printer Rental Dubai", desc: "Same-day delivery across all Dubai districts." },
  { href: "/printer-rental-abu-dhabi/", label: "Printer Rental Abu Dhabi", desc: "Weekly maintenance. Mussafah, Al Reem, Khalifa City." },
  { href: "/printer-rental-sharjah/", label: "Printer Rental Sharjah", desc: "Our HQ. Fastest service in Sharjah & Northern Emirates." },
  { href: "/printer-rental-rak/", label: "Printer Rental RAK", desc: "Ras Al Khaimah businesses & free zones." },
];

const trail = [{ label: "Home", href: "/" }, { label: "Printer Rental Fujairah" }];

export default async function PrinterRentalFujairah() {
  const faqs = await getFaqsFromD1();
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } : null;
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <main className="min-h-screen bg-surface">
        <Header />

        {/* Hero — full-bleed Fujairah photo, distinct per city page by design */}
        <section className="relative overflow-hidden px-6 pb-20 pt-32">
          <div className="absolute inset-0">
            <img
              src="/images/location-fujairah.webp"
              alt="Fujairah corporate office"
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
              <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Fujairah — Eastern Emirates</p>
              <h1 className="font-sora text-display-xl font-extrabold text-white">
                Printer Rental <span className="text-primary">Fujairah</span>
              </h1>
              <div className="mt-6">
                <AnswerBlock
                  question="Does Sahara deliver rental printers to Fujairah and the east coast?"
                  answer="Yes — Sahara delivers and services rental printers across Fujairah. Coverage reaches Fujairah City, Dibba, Kalba, Khor Fakkan, and the Fujairah Free Trade Zone, with FFTZ entity billing supported. Engineers travel from the Sharjah headquarters for scheduled maintenance and breakdowns. Rental starts at AED 250 per month with free toner."
                  supportingPoints={[
                    "Covers Fujairah City, Dibba, Kalba, Khor Fakkan and the Fujairah Free Trade Zone",
                    "FFTZ free-zone entity billing supported alongside mainland LLC invoicing",
                    "Zero deposit, unlimited genuine OEM toner, free delivery and free network setup",
                    "Canon and Kyocera multifunction devices from AED 250/month",
                  ]}
                />
              </div>
              <p className="mt-6 max-w-xl text-body text-muted">
                Canon &amp; Kyocera printer and photocopier rental in Fujairah from AED 250/month. Zero deposit,
                free toner, and on-site support across Fujairah City, Dibba, Kalba, and FFTZ.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Zero Deposit", "Free Toner", "FFTZ Billing", "Free Network Setup", "Replacement Guarantee"].map((t) => (
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
          <div className="mx-auto max-w-4xl rounded-panel border border-primary/[0.35] bg-surface-low p-8 md:p-10">
            <p className="mb-3 text-caption font-bold uppercase tracking-[0.25em] text-primary">
              AI Answer — What is Printer Rental in Fujairah?
            </p>
            <p className="text-[1.05rem] leading-relaxed text-white">
              Printer rental in Fujairah is a monthly service from{" "}
              <strong className="text-primary">AED 250/month</strong> providing Canon or Kyocera printers
              with toner, maintenance, and repairs included. Sahara Office Equipment Trading LLC has served UAE
              businesses since 2012 and covers Fujairah City, Dibba, Kalba, and FFTZ with{" "}
              <strong className="text-primary">zero deposit</strong>, weekly maintenance visits, and free
              network setup.
            </p>
          </div>
        </Section>

        <Section flush>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 rounded-panel border border-white/[0.08] bg-surface-low px-6 py-8 text-center md:grid-cols-4">
            {[
              { number: "4—6", suffix: " hrs", label: "Emergency Response" },
              { number: "1,500", suffix: "+", label: "UAE Clients" },
              { number: "13", suffix: "+", label: "Years in UAE" },
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
              Printer Rental in Fujairah — Serving the East Coast
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Fujairah&rsquo;s economy is centred around Fujairah Port — one of the world&rsquo;s largest bunkering hubs —
              along with oil storage, logistics, fishing, and a growing tourism sector in Dibba and Khor Fakkan.
              These industries generate significant documentation requirements: shipping manifests, logistics forms,
              compliance certificates, and administrative paperwork.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Sahara&rsquo;s printer rental in Fujairah provides these businesses with reliable Canon and Kyocera equipment
              delivered and installed within 24—48 hours. The zero-deposit model is particularly valuable for new
              Fujairah Free Trade Zone setups and construction project offices that need documentation infrastructure
              immediately without capital commitment.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Dibba Al Fujairah and Kalba — on the East Coast — are included in our weekly scheduled service
              coverage. Emergency response to these more remote locations is within 4—6 hours. For businesses in
              these areas that previously had no local service provider, Sahara fills an important gap.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Our rented devices deliver A4 black-and-white output at{" "}
              <strong className="text-white">1—2 fils per page</strong> — compared to 8—15 fils for desktop consumer
              printers. For Fujairah logistics businesses printing shipping and port documentation daily, this
              difference is substantial over a 12-month contract.
            </p>
          </div>
        </Section>

        <Section title="Fujairah Rental Plans" subtitle="Zero deposit · free toner · free delivery · on-site support" align="center">
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
                  Get Quote
                </a>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Areas We Serve in Fujairah" subtitle="Weekly scheduled visits. Emergency response within 4—6 hours across the Emirate." align="center" tone="raised">
          <div className="flex flex-wrap justify-center gap-3">
            {fujairahAreas.map((area) => (
              <span key={area} className="rounded-pill border border-primary/20 bg-surface-max px-4 py-2 text-[0.9rem] text-on-surface-variant">
                {area}
              </span>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Need a Printer in Fujairah?"
          body="Quote in 2 hours. Free site visit. Setup within 24—48 hours."
          primary={{ label: "Get Free Quote", href: "/rental-calculator/" }}
          secondary={{ label: "Call +971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white mb-3">Printer Rental Fujairah — FAQ</h2>
            <p className="text-muted">12 questions answered</p>
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

        <Footer />
        <WhatsAppCTA />
        <JumpToTop />
      </main>
    </>
  );
}
