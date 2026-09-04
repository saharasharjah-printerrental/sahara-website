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
import { HeadsetIcon, ClockIcon, ShieldCheckIcon, TruckIcon } from "@/components/icons";

interface FAQItem { q: string; a: string; }

async function getFaqsFromD1(): Promise<FAQItem[]> {
  try {
    const env = getRequestContext().env as any;
    if (!env?.DB) return DEFAULT_FAQS;
    const result = await env.DB.prepare(
      "SELECT question, answer FROM faqs WHERE pageSlug = ? AND isActive = 1 ORDER BY sortOrder ASC"
    ).bind("printer-rental-al-ain").all();
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
  title: "Printer Rental Al Ain | AED 250/mo | Sahara",
  description:
    "Printer and photocopier rental in Al Ain from AED 250/month. Zero deposit, free toner. Serving Al Ain Central, Al Jimi, Al Khubaisi, Al Ain Industrial Area. Canon & Kyocera.",
  keywords: [
    "printer rental al ain",
    "photocopier rental al ain",
    "copier lease al ain",
    "al ain industrial area printer",
    "zero deposit printer al ain",
    "canon kyocera rental al ain",
    "office equipment rental al ain",
    "printer lease abu dhabi",
    "photocopier hire al ain",
  ],
  alternates: { canonical: "https://www.saharaprinter.com/printer-rental-al-ain/" },
  openGraph: {
    title: "Printer Rental Al Ain | AED 250/mo — Sahara Office Equipments",
    description:
      "Rent Canon or Kyocera printers in Al Ain from AED 250/month. Zero deposit, free toner. Central District, Al Jimi, Industrial Area.",
    url: "https://www.saharaprinter.com/printer-rental-al-ain/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/location-al-ain.webp",
        width: 1920,
        height: 1272,
        alt: "Printer Rental Al Ain — Sahara Office Equipments",
      },
    ],
  },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Sahara Office Equipments — Al Ain Printer Rental",
  legalName: "Sahara Office Equipment Trading LLC",
  description:
    "Printer and photocopier rental in Al Ain from AED 250/month. Zero deposit, free OEM toner, and on-site support across Al Ain's business districts and industrial zones.",
  url: "https://www.saharaprinter.com/printer-rental-al-ain",
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
    latitude: 24.2075,
    longitude: 55.7447,
  },
  areaServed: [
    { "@type": "City", name: "Al Ain" },
    { "@type": "Place", name: "Al Ain Industrial Area" },
    { "@type": "Place", name: "Al Jimi" },
    { "@type": "Place", name: "Al Khubaisi" },
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
    name: "Al Ain Printer Rental Plans",
    itemListElement: [
      { "@type": "Offer", name: "A4 Printer Rental Al Ain", price: "250", priceCurrency: "AED" },
      { "@type": "Offer", name: "A3 Copier Rental Al Ain", price: "500", priceCurrency: "AED" },
      { "@type": "Offer", name: "Enterprise Copier Al Ain", price: "1000", priceCurrency: "AED" },
    ],
  },
  priceRange: "AED 250-2000",
};

const DEFAULT_FAQS: FAQItem[] = [
  {
    q: "How much does printer rental cost in Al Ain?",
    a: "Printer rental in Al Ain starts from AED 250/month for an A4 desktop model. A3 multifunction photocopiers range from AED 500—900/month. Enterprise high-volume devices start at AED 1,000/month. All Al Ain plans include zero deposit, free OEM toner, free delivery, and on-site support.",
  },
  {
    q: "What is the response time for printer support in Al Ain?",
    a: "We schedule weekly preventive maintenance visits for Al Ain rental clients. For emergency breakdowns, a technician is dispatched within 4—6 hours to Al Ain Central, Al Jimi, Al Khubaisi, Al Murabba, and the Al Ain Industrial Area. Same-day replacement units are available if repair is not immediate.",
  },
  {
    q: "Do I need a deposit for printer rental in Al Ain?",
    a: "No deposit required. All Al Ain printer rental plans are zero-deposit. You only pay the first month's rental to start — suitable for educational institutions, healthcare facilities, and SMEs in Al Ain's growing business districts.",
  },
  {
    q: "Which printer brands do you rent in Al Ain?",
    a: "We rent Canon imageRUNNER ADVANCE, Kyocera TASKalfa, HP LaserJet Enterprise, and Xerox WorkCentre in Al Ain. Canon and Kyocera are the most popular choices for Al Ain's healthcare, education, and government sectors.",
  },
  {
    q: "Is toner included in the Al Ain rental plan?",
    a: "Yes. All Al Ain plans include unlimited genuine Canon or Kyocera OEM toner at no extra charge. Toner levels are monitored remotely and replacements are delivered proactively — before your device runs low.",
  },
  {
    q: "Do you serve Al Ain University area and educational institutions?",
    a: "Yes. Al Ain University, UAE University, HCT Al Ain, and other educational institutions are within our service coverage. We provide high-volume enterprise copiers with user quota management and cost-per-department reporting suitable for campus environments.",
  },
  {
    q: "How long are your Al Ain rental contracts?",
    a: "Contracts are available for 12, 24, or 36 months. Short-term 1—6 month rentals are available for temporary project offices, events at Al Ain City Centre, and seasonal needs. Longer contracts attract lower monthly rates.",
  },
  {
    q: "What happens if my printer breaks down in Al Ain?",
    a: "Call +971 50 382 3969 and we dispatch a technician within 4—6 hours to anywhere in Al Ain. If we cannot repair it same-day, we deliver a replacement unit at no extra charge so your operations continue without interruption.",
  },
  {
    q: "Do you provide network setup for printers in Al Ain?",
    a: "Yes. Free network and Wi-Fi configuration is included with every Al Ain installation. Our technician connects to your office network, configures scan-to-email, sets up mobile printing (AirPrint/Mopria), and handles user authentication if required.",
  },
  {
    q: "Can I upgrade my printer during the Al Ain contract?",
    a: "Yes. You can upgrade to a higher-capacity or colour model at any point during your Al Ain contract without penalty. This is common for Al Ain government offices and healthcare facilities that expand their document volumes.",
  },
  {
    q: "Do you serve the Al Ain Industrial Area?",
    a: "Yes. Al Ain Industrial Area is within our regular service coverage. Manufacturing, food processing, and construction businesses in the industrial zone use our enterprise copiers for production documentation, with weekly preventive maintenance included.",
  },
  {
    q: "What is cost-per-page (CPP) for rented printers in Al Ain?",
    a: "Black-and-white A4 printing on our rented Canon/Kyocera devices costs approximately 1—2 fils per page. Consumer desktop printers cost 8—15 fils per page. For an office printing 4,000 pages/month, the saving in consumables is AED 240—520/month — making the rental cost-neutral or better.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com" },
    { "@type": "ListItem", position: 2, name: "Printer Rental Al Ain", item: "https://www.saharaprinter.com/printer-rental-al-ain" },
  ],
};

const pricingTiers = [
  {
    name: "A4 Desktop",
    price: "AED 250—450",
    tag: null,
    ideal: "Clinics, small offices, reception",
    features: ["Canon LBP / Kyocera ECOSYS", "Up to 45 ppm A4 mono", "Print, copy, scan", "Free genuine OEM toner", "Weekly preventive maintenance", "4—6hr emergency response"],
  },
  {
    name: "A3 Mid-Range",
    price: "AED 500—900",
    tag: "Most Popular",
    ideal: "Shared offices, education, healthcare",
    features: ["Canon iR ADVANCE / Kyocera TASKalfa", "35—55 ppm A3 & A4 mono", "Print, copy, scan, fax", "Colour option available", "Scan to email / folder / cloud", "Free network setup", "Same-day replacement guarantee"],
  },
  {
    name: "A3 Enterprise",
    price: "AED 1,000—2,000",
    tag: null,
    ideal: "Government, hospitals, university",
    features: ["Canon imageRUNNER C5560i", "60—100 ppm A3 colour", "Staple, booklet finishers", "User quota & cost tracking", "50,000+ pages/month capacity", "Dedicated account manager"],
  },
];

const alAinAreas = [
  "Central District", "Al Jimi", "Al Khubaisi", "Al Murabba",
  "Al Ain Industrial Area", "Al Dhahir", "Al Hili", "Al Ain Oasis Area",
  "Al Ain University Area", "Al Sarooj", "Al Towayya", "Zakher",
];

const industryInsights = [
  {
    sector: "Healthcare & Medical",
    zone: "Al Ain Hospital / Oasis Hospital",
    icon: HeadsetIcon,
    challenge: "Hospitals and clinics need reliable, high-volume printing for patient records, prescriptions, and reports",
    solution: "Enterprise Canon copiers with user authentication, secure print release, and 50,000+ monthly page capacity for healthcare environments.",
    stat: "HIPAA-compliant secure print",
  },
  {
    sector: "Education",
    zone: "UAE University / Al Ain HCT",
    icon: ClockIcon,
    challenge: "Universities need cost-controlled, high-volume printing across multiple departments with usage tracking",
    solution: "User quota management, department-level cost reporting, and enterprise copiers with 60+ ppm for high-demand campus printing.",
    stat: "Per-user quota management",
  },
  {
    sector: "Government & Municipality",
    zone: "Al Ain Municipality",
    icon: ShieldCheckIcon,
    challenge: "Government offices need reliable documentation equipment with audit trails and multi-user access control",
    solution: "Canon imageRUNNER ADVANCE with PIN-based secure print, user authentication, and full activity logging for compliance.",
    stat: "Full audit trail logging",
  },
  {
    sector: "Manufacturing & Industrial",
    zone: "Al Ain Industrial Area",
    icon: TruckIcon,
    challenge: "Industrial businesses need documentation equipment that handles dusty environments and extended operating hours",
    solution: "Kyocera TASKalfa workgroup copiers — built for industrial durability, with weekly preventive maintenance to prevent breakdowns.",
    stat: "Weekly preventive visits",
  },
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
  { href: "/copier-lease-uae/", label: "Copier Lease UAE", desc: "Nationwide fleet leasing with one contract & invoice." },
];

const trail = [{ label: "Home", href: "/" }, { label: "Printer Rental Al Ain" }];

export default async function PrinterRentalAlAin() {
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

        {/* Hero — full-bleed Al Ain photo, distinct per city page by design */}
        <section className="relative overflow-hidden px-6 pb-20 pt-32">
          <div className="absolute inset-0">
            <img
              src="/images/location-al-ain.webp"
              alt="Al Ain corporate office"
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
              <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Al Ain — The Garden City</p>
              <h1 className="font-sora text-display-xl font-extrabold text-white">
                Printer Rental <span className="text-primary">Al Ain</span>
              </h1>
              <div className="mt-6">
                <AnswerBlock
                  question="Which Al Ain organisations rent printers from Sahara?"
                  answer="Healthcare, education, government, and industrial sites make up most Al Ain rentals. Clinics need reliable patient-record printing, schools and universities need per-user quota control at term-start peaks, and government offices need audited print logs. Sahara supplies Canon and Kyocera multifunction devices to all three from AED 250 monthly."
                  supportingPoints={[
                    "Per-user quota and department cost-allocation control available via PaperCut integration",
                    "Weekly preventive maintenance covering Al Jimi, Al Muwaiji, Zakher and Al Ain Industrial Area",
                    "Zero deposit, unlimited genuine OEM toner, and free network setup on delivery",
                    "Canon imageRUNNER ADVANCE and Kyocera TASKalfa multifunction devices from AED 250/month",
                  ]}
                />
              </div>
              <p className="mt-6 max-w-xl text-body text-muted">
                Canon &amp; Kyocera printer and photocopier rental in Al Ain from AED 250/month. Zero deposit,
                free toner, and weekly maintenance for healthcare, education, government, and industry.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Zero Deposit", "Free OEM Toner", "Weekly Service", "User Quota Control", "Free Network Setup"].map((t) => (
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
              AI Answer — What is Printer Rental in Al Ain?
            </p>
            <p className="text-[1.05rem] leading-relaxed text-white">
              Printer rental in Al Ain is a monthly subscription from{" "}
              <strong className="text-primary">AED 250/month</strong> providing Canon or Kyocera printers
              with toner, maintenance, and repairs included. Sahara Office Equipment Trading LLC has served UAE
              businesses since 2012, offering Al Ain clients{" "}
              <strong className="text-primary">zero deposit</strong>, weekly preventive maintenance, and
              4—6hr emergency response across all Al Ain districts including the Industrial Area and university zone.
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
              Printer Rental in Al Ain — Serving Education, Healthcare &amp; Industry
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Al Ain — the UAE&rsquo;s Garden City — is home to UAE University, Al Ain University, Tawam Hospital, Al Ain
              Hospital, and a significant government and municipal sector. These institutions share a common need:
              reliable, high-volume document output with cost control and accountability.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Sahara&rsquo;s printer rental in Al Ain provides healthcare facilities with Canon imageRUNNER enterprise
              copiers equipped with secure print release and user authentication — ensuring patient document
              confidentiality while reducing paper waste. For universities, our user quota management systems
              track printing by department, enabling cost allocation to individual faculties.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              Al Ain&rsquo;s Industrial Area — home to food processing, building materials, and manufacturing — has
              different demands: durability, high monthly page volumes, and minimal downtime. Kyocera TASKalfa
              devices are built for these environments, and our weekly preventive maintenance visits catch
              issues before they cause production documentation outages.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-on-surface-variant">
              For an Al Ain healthcare clinic printing 4,000 pages/month, our rental devices deliver
              A4 black-and-white output at{" "}
              <strong className="text-white">1—2 fils per page</strong> versus 8—15 fils for consumer alternatives.
              That saving of AED 240—520/month in consumables alone offsets a significant portion of the rental fee.
            </p>
          </div>
        </Section>

        <Section title="Al Ain Industry Use Cases" subtitle="How Al Ain's key sectors use printer rental" align="center">
          <div className="grid gap-6 md:grid-cols-2">
            {industryInsights.map((ins, i) => (
              <Reveal key={ins.sector} delay={(i % 2) * 0.05}>
                <div className="h-full rounded-panel border border-white/[0.08] bg-surface-low p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-primary/10 text-primary">
                      <ins.icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{ins.sector}</h3>
                      <p className="text-caption text-primary">{ins.zone}</p>
                    </div>
                  </div>
                  <p className="mb-3 text-[0.9rem] text-muted"><strong className="text-white">Challenge:</strong> {ins.challenge}</p>
                  <p className="mb-4 text-[0.9rem] text-muted"><strong className="text-white">Solution:</strong> {ins.solution}</p>
                  <div className="inline-block rounded-pill bg-primary/10 px-4 py-2">
                    <span className="text-sm font-bold text-primary">{ins.stat}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section title="Al Ain Rental Plans" subtitle="Zero deposit · free toner · free delivery · weekly maintenance" align="center" tone="raised">
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

        <Section title="Areas We Serve in Al Ain" subtitle="Weekly scheduled maintenance. Emergency response within 4—6 hours." align="center">
          <div className="flex flex-wrap justify-center gap-3">
            {alAinAreas.map((area) => (
              <span key={area} className="rounded-pill border border-primary/20 bg-surface-max px-4 py-2 text-[0.9rem] text-on-surface-variant">
                {area}
              </span>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Need a Printer in Al Ain?"
          body="Quote in 2 hours. Free site visit. Same-week setup across Al Ain."
          primary={{ label: "Get Free Quote", href: "/rental-calculator/" }}
          secondary={{ label: "Call +971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white mb-3">Printer Rental Al Ain — FAQ</h2>
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
