export const runtime = 'edge';
import type { Metadata } from "next";
import { getRequestContext } from "@cloudflare/next-on-pages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import AnswerBlock from "@/components/AnswerBlock";
import ProductHero from "@/components/ui/ProductHero";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import ComparisonTable from "@/components/ui/ComparisonTable";
import CtaBand from "@/components/ui/CtaBand";
import {
  ShieldCheckIcon,
  AwardIcon,
  HeadsetIcon,
  SettingsIcon,
  ClockIcon,
  TruckIcon,
} from "@/components/icons";

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
  // This page owns every copier / photocopier / MFP query. /services/printer-rental/
  // was previously competing for the same terms and winning, leaving this page at
  // position 48 on 1,863 impressions and 1 click. Keep copier vocabulary here.
  title: "Photocopier Rental in Dubai | Copier Lease from AED 500/mo",
  description: "Photocopier rental in Dubai, Sharjah & Abu Dhabi from AED 500/month. A3 multifunction copiers — print, copy, scan, fax. Canon imageRUNNER, Kyocera TASKalfa. Zero deposit, free toner, 4-hour response. ☎ +971503823969",
  keywords: "photocopier rental in dubai, photocopier rental, photocopier rental dubai, copier rental dubai, copier rental uae, photocopier leasing, copier on rent, photocopier for rent, copier lease dubai, copier rental services in sharjah, photocopier rental in uae, a3 photocopier rental dubai, multifunction copier rental dubai, canon imagerunner rental uae, kyocera copier rental dubai, photocopier lease abu dhabi",
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

const printerVsCopier: [string, string, string][] = [
  ["Page Format", "A3 + A4 (both)", "A4 only (mostly)"],
  ["Monthly Volume", "5,000–100,000+ pages", "200–3,000 pages"],
  ["Concurrent Users", "10–80 users", "1–5 users"],
  ["Functions", "Print + Copy + Scan + Fax + Cloud", "Print (+ basic scan)"],
  ["Cost-Per-Page", "AED 0.02–0.05 (mono)", "AED 0.08–0.15 (mono)"],
  ["Monthly Rental", "AED 500–2,000", "AED 250–400"],
  ["Best For", "Shared office, legal, real estate, HR, accounts", "Individual workstation, reception desk"],
];

const industries = [
  { name: "Legal & Accounting Firms", need: "High-volume contract, report and agreement printing. Secure print release keeps confidential documents private.", icon: ShieldCheckIcon, volume: "10,000–50,000 pages/month" },
  { name: "Real Estate Agencies", need: "Large-format property brochures, A3 floor plans, and high-volume contract duplication during sales periods.", icon: AwardIcon, volume: "5,000–20,000 pages/month" },
  { name: "Medical & Dental Clinics", need: "Patient file printing, prescription reproduction, and HIPAA-compliant secure scanning to EMR systems.", icon: HeadsetIcon, volume: "3,000–10,000 pages/month" },
  { name: "Construction & Engineering", need: "A3 technical drawings, site plans, and report reproduction. Durable devices that handle dusty environments.", icon: SettingsIcon, volume: "8,000–30,000 pages/month" },
  { name: "Education & Training", need: "Exam paper reproduction, course material printing, and administrative document workflows at scale.", icon: ClockIcon, volume: "20,000–100,000 pages/month" },
  { name: "Logistics & Shipping", need: "Manifest printing, label reproduction, and 24/7 document processing workflows without downtime.", icon: TruckIcon, volume: "15,000–60,000 pages/month" },
];

const workflowFeatures = [
  { title: "Scan to Email", desc: "Direct scan-to-email via your office SMTP server. No third-party apps. Configured on delivery day." },
  { title: "Scan to Shared Folder", desc: "Scans go straight to your server or NAS. Works with Windows, Samba, FTP, and SMB shares." },
  { title: "Cloud Integration", desc: "Native connectors for Google Drive, OneDrive, SharePoint, and Dropbox on supported models." },
  { title: "Secure Print Release", desc: "PIN or card-authenticated release prevents confidential documents from sitting in the output tray." },
  { title: "User Authentication", desc: "Department-level cost tracking. Know exactly which team prints how much every month." },
  { title: "Mobile Printing", desc: "AirPrint, Google Cloud Print, and manufacturer apps for printing directly from phones and tablets." },
];

const trail = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Photocopier Rental UAE" },
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

      <main className="min-h-screen bg-surface">
        <Header />

        <ProductHero
          trail={trail}
          eyebrow="A3 Multifunction · Print · Copy · Scan · Fax"
          title={
            <>
              Photocopier Rental
              <br />
              <span className="text-primary">Dubai &amp; UAE</span>
            </>
          }
          answer={
            <AnswerBlock
              question="What is A3 photocopier rental and how does it differ from A4?"
              answer="A3 photocopier rental covers machines printing sheets twice the size of A4. These multifunction devices print, copy, scan, and fax from one shared unit, handle far higher monthly volumes than a desktop A4 printer, and rent from AED 500 per month with toner, maintenance, and network setup included."
              supportingPoints={[
                "An A3 sheet is 297 × 420 mm — double A4, used for plans, spreads and two-up booklets",
                "Canon imageRUNNER ADVANCE and Kyocera TASKalfa are the two most-rented A3 ranges",
                "A3 machines also print A4, so one copier replaces several separate desktop printers",
                "Zero deposit, unlimited genuine OEM toner, and a 4-hour emergency response target",
              ]}
            />
          }
          badges={["From AED 500/mo", "A3 + A4 Capable", "Zero Deposit", "Unlimited Toner", "Network Setup Included", "Sharjah HQ Since 2012"]}
          image={{ src: "/images/heroPrntr1.webp", alt: "Canon imageRUNNER A3 multifunction photocopier rental Dubai UAE Sharjah", width: 800, height: 440 }}
          primaryCta={{ label: "Get Copier Quote", href: "/rental-calculator/" }}
          secondaryCta={{ label: "+971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush>
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { value: "1,500+", label: "Active Copiers Deployed" },
              { value: "AED 500", label: "Starting Monthly Rate" },
              { value: "4 Hours", label: "Emergency Response" },
              { value: "13+ Years", label: "UAE Market Experience" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-caption uppercase tracking-widest text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Which Do You Need?" title="Photocopier vs. Desktop Printer" subtitle="Many businesses waste money renting desktop printers when a single A3 photocopier would handle the same workload at half the cost-per-page." align="center" tone="raised">
          <ComparisonTable columns={["Feature", "A3 Photocopier", "Desktop Printer"]} highlightColumn={1} rows={printerVsCopier} />
        </Section>

        <Section eyebrow="Our Fleet" title="A3 Photocopiers Available to Rent" subtitle="All devices include delivery, network setup, and full service — included in the monthly rate." align="center">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {devices.map((d) => (
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
                  <div className="mt-2 flex flex-wrap gap-1">
                    {d.functions.map((fn) => (
                      <span key={fn} className="rounded-pill border border-white/[0.08] bg-white/5 px-2 py-0.5 text-[9px] font-bold text-on-surface-variant">{fn}</span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/[0.08] pt-4">
                  <p className="text-[0.9rem] font-bold text-primary">{d.price}</p>
                  <p className="text-[10px] text-slate-500">Incl. toner, maintenance &amp; setup</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-caption text-muted">Other brands (Ricoh, Xerox, Sharp, Konica Minolta) available on request. Contact us for current fleet availability.</p>
        </Section>

        <Section eyebrow="Document Workflows" title="Beyond Copying — Full Office Integration" subtitle="Modern A3 photocopiers are document workflow hubs. Our engineers configure every feature on delivery day." align="center" tone="raised">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workflowFeatures.map((w, i) => (
              <FeatureCard key={w.title} title={w.title} body={w.desc} delay={(i % 3) * 0.05} />
            ))}
          </div>
        </Section>

        <Section eyebrow="Process" title="How to Rent a Photocopier in UAE" align="center">
          <div className="relative">
            <div className="absolute left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />
            <div className="grid gap-8 lg:grid-cols-4">
              {howToSchema.step.map((s) => (
                <div key={s.name} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-deep text-base font-black text-on-primary">
                    {String(s.position).padStart(2, "0")}
                  </div>
                  <h3 className="mb-2 mt-3 text-[0.9rem] font-bold text-white">{s.name}</h3>
                  <p className="text-[0.8rem] leading-relaxed text-muted">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section eyebrow="Industry Solutions" title="Photocopier Rental for Every Sector" align="center" tone="raised">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <FeatureCard
                key={ind.name}
                icon={ind.icon}
                title={ind.name}
                delay={(i % 3) * 0.05}
                body={
                  <>
                    <p className="mb-2 text-caption font-semibold text-primary">{ind.volume}</p>
                    {ind.need}
                  </>
                }
              />
            ))}
          </div>
        </Section>

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary mb-4">Questions</p>
            <h2 className="font-sora text-title font-bold text-white mb-3">Photocopier Rental FAQ</h2>
            <p className="mx-auto max-w-md text-[0.9rem] text-muted">12 questions covering cost, contracts, connectivity, and everything in between.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="glass-card rounded-card p-6 group cursor-pointer" open={i === 0}>
                <summary className="flex items-center justify-between gap-4 pr-2 list-none font-bold text-[1rem] text-white">
                  {faq.q}
                  <span className="shrink-0 text-xl text-primary transition-transform duration-200 group-open:rotate-180">›</span>
                </summary>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-on-surface-variant">{faq.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Ready to Rent a Photocopier?"
          body="Tell us your monthly copy volume and office size. We'll match you to the right device and deliver a cost-per-page quote within 2 hours."
          primary={{ label: "Get Copier Quote", href: "/rental-calculator/" }}
          secondary={{ label: "+971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Footer />
        <WhatsAppCTA />
        <JumpToTop />
      </main>
    </>
  );
}
