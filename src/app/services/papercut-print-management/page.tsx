export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import FaqSection from "@/components/FaqSection";
import type { FaqItem } from "@/lib/faqs";
import AnswerBlock from "@/components/AnswerBlock";
import ProductHero from "@/components/ui/ProductHero";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import ComparisonTable from "@/components/ui/ComparisonTable";
import CtaBand from "@/components/ui/CtaBand";
import { ClockIcon, ShieldCheckIcon, SettingsIcon, AwardIcon, LayersIcon, TruckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "PaperCut Print Management UAE | MF & NG Setup | Sahara Office Equipments",
  description: "PaperCut MF & NG setup, licensing, and support for UAE offices. Cut printing costs by 20–30%. Secure print release, department tracking, policy enforcement. Dubai, Sharjah, Abu Dhabi. ☎ +971503823969",
  keywords: "papercut uae, papercut print management uae, print management software uae, papercut mf dubai, papercut ng uae, print tracking uae, printer usage monitoring dubai, managed print services uae, secure print release uae",
  openGraph: {
    title: "PaperCut Print Management UAE | MF & NG | Sahara Office Equipments",
    description: "PaperCut MF & NG implementation, licensing and support for UAE offices. Cut print costs 20–30%, enforce policies, track by department. Dubai, Sharjah, Abu Dhabi.",
    url: "https://www.saharaprinter.com/services/papercut-print-management/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/images/heroPrntr1.webp", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/papercut-print-management/" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "PaperCut Print Management UAE",
  "description": "PaperCut MF and NG implementation, licensing, configuration, and support for UAE offices. Enforce print policies, track usage per department, reduce print costs by up to 30%.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments",
    "telephone": "+971503823969",
    "url": "https://www.saharaprinter.com/",
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  },
  "serviceType": "Print Management Software UAE",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services/printer-rental/" },
    { "@type": "ListItem", "position": 3, "name": "PaperCut Print Management", "item": "https://www.saharaprinter.com/services/papercut-print-management/" },
  ],
};

// Default FAQ set for /services/papercut-print-management/. Fallback only:
// FaqSection reads pageSlug 'papercut-print-management' from D1 (seeded in
// migrations 005 and 018) and emits the FAQPage JSON-LD next to the accordion
// it renders. Replaces both the hand-rolled faqSchema literal and the
// client-side /api/faqs fetch in PaperCutFaqClient, which emitted no schema.
const PAPERCUT_FAQS: FaqItem[] = [
  { q: "What is PaperCut print management software?", a: "PaperCut is the world's leading print management software used by 100+ million users across 200 countries. It tracks, controls, and reduces print costs by enforcing print policies, enabling secure print release, and reporting on usage by user, department, or project. Sahara provides PaperCut MF and NG setup, licensing, and support for UAE offices." },
  { q: "How much does PaperCut cost for a UAE office?", a: "PaperCut NG (for SMEs) starts from approximately AED 1,800 per year for 10 users. PaperCut MF (for enterprise with MFP integration) is licensed per device. Sahara provides competitive UAE pricing with installation, configuration, and 1-year support included." },
  { q: "Which printers does PaperCut work with in UAE?", a: "PaperCut MF works natively with Canon, Kyocera, Ricoh, Xerox, HP, Brother, and Sharp MFPs — all brands Sahara dealers in UAE. Installation integrates directly into the printer's touch panel for secure print release and copy/scan tracking." },
  { q: "Can PaperCut reduce our office printing costs in Dubai?", a: "Yes. Dubai and UAE businesses that implement PaperCut typically see 20–30% reduction in print volume within 3 months — driven by duplex enforcement, colour restrictions, secure print release (reduces uncollected prints), and department quota management." },
  { q: "Does Sahara provide PaperCut training and support in UAE?", a: "Yes. Sahara's PaperCut implementation service includes on-site installation, Active Directory/LDAP integration, user training, and 12-month remote + on-site support across Dubai, Sharjah, and Abu Dhabi." },
];

const features = [
  { icon: ClockIcon, title: "Usage Tracking", desc: "Report on print, copy, and scan activity by user, department, or project — across all your office printers and MFPs." },
  { icon: ShieldCheckIcon, title: "Secure Print Release", desc: "Jobs held at server until user authenticates at the printer — eliminates uncollected prints and sensitive document exposure." },
  { icon: SettingsIcon, title: "Policy Enforcement", desc: "Automatically enforce duplex, B&W, and page limits by user group. Reduce colour printing waste by up to 40%." },
  { icon: AwardIcon, title: "Cost Allocation", desc: "Charge print costs back to departments, clients, or projects. Full integration with your billing or ERP system." },
  { icon: LayersIcon, title: "MFP Integration", desc: "Embedded apps on Canon, Kyocera, Ricoh, Xerox, HP, and Sharp MFPs — no separate hardware needed." },
  { icon: TruckIcon, title: "Cloud & Mobility", desc: "Print from mobile, cloud (Google Drive, OneDrive), and remote workers. Full BYOD support for UAE offices." },
];

const mfVsNg: [string, string, string][] = [
  ["Best for", "Enterprises with MFPs (10+ devices)", "SMEs and workgroups (1–50 users)"],
  ["MFP Embedded App", "Yes — native touch panel integration", "No (network print only)"],
  ["Secure Print Release", "At the MFP touch panel", "Via PIN or card swipe"],
  ["Scan & Copy Tracking", "Yes — full MFP activity", "Print only"],
  ["Licensing Model", "Per device (MFP)", "Per user/year"],
  ["Starting Price (UAE)", "AED 800+ per device/year", "AED 1,800/year (10 users)"],
  ["Cloud Deployment", "On-premise + cloud", "On-premise (NG+) or cloud"],
  ["Active Directory Integration", "Yes — full AD/LDAP sync", "Yes"],
  ["Mobile Print", "Yes — Mobility Print included", "Yes — Mobility Print included"],
  ["Sahara Setup Time", "1–2 days (multi-device)", "Half day (server install)"],
];

const compatibleBrands = [
  { brand: "Canon", href: "/brands/canon/" },
  { brand: "Kyocera", href: "/brands/kyocera/" },
  { brand: "Ricoh", href: "/brands/ricoh/" },
  { brand: "Xerox", href: "/brands/xerox/" },
  { brand: "HP", href: "/brands/hp/" },
  { brand: "Sharp", href: "/brands/sharp/" },
];

const implementationSteps = [
  { step: "01", title: "Print Environment Audit", desc: "We assess your current print fleet — number of devices, usage volumes, network topology, and Active Directory / LDAP structure across your UAE office locations." },
  { step: "02", title: "PaperCut Server Installation", desc: "PaperCut MF or NG server installed on your on-premises server or cloud VM. Integrated with AD/LDAP for automatic user provisioning and group policy mapping." },
  { step: "03", title: "MFP Embedded App Deployment", desc: "PaperCut embedded app installed on each Canon, Kyocera, Ricoh, Xerox, HP, or Sharp MFP touch panel. Secure print release and ID card authentication activated." },
  { step: "04", title: "Policy & Cost Centre Configuration", desc: "Duplex defaults, colour restrictions, department quotas, client billing codes, and printer quotas configured to match your company policy and UAE cost structure." },
  { step: "05", title: "Staff Training & Go-Live", desc: "User training delivered on-site in Dubai, Sharjah, or Abu Dhabi. Management reporting dashboard configured. Ongoing 12-month remote + on-site support included." },
];

const relatedLinks = [
  { href: "/services/printer-rental/", label: "Printer Rental UAE" },
  { href: "/services/amc/", label: "Annual Maintenance (AMC)" },
  { href: "/services/repair/", label: "Printer Repair Dubai" },
  { href: "/brands/kyocera/", label: "Kyocera Printers UAE" },
  { href: "/brands/canon/", label: "Canon Printers UAE" },
  { href: "/brands/ricoh/", label: "Ricoh Printers UAE" },
  { href: "/services/paper-shredder-rental/", label: "Paper Shredder Rental" },
];

const trail = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "PaperCut Print Management" },
];

export default function PaperCutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* FAQPage JSON-LD is emitted by <FaqSection> alongside the accordion it renders,
          so the questions can never drift apart from the schema that declares them. */}
      <main className="min-h-screen bg-surface">
        <Header />

        <ProductHero
          trail={trail}
          eyebrow="Print Management Software · UAE"
          title={
            <>
              PaperCut Print
              <br />
              <span className="text-primary">Management UAE</span>
            </>
          }
          answer={
            <AnswerBlock
              question="What is PaperCut print management and what does it do for a UAE office?"
              answer="PaperCut is software that tracks, controls, and reduces office printing costs. Sahara installs PaperCut MF for enterprises running multifunction devices and PaperCut NG for smaller workgroups, covering licensing, Active Directory integration, and twelve months of support across Dubai, Sharjah, and Abu Dhabi. Print volumes typically fall 20–30% within three months."
              supportingPoints={[
                "PaperCut MF is licensed per device; PaperCut NG is licensed per user, per year",
                "Embedded touch-panel apps on Canon, Kyocera, Ricoh, Xerox, HP and Sharp MFPs",
                "Secure print release holds jobs at the server until the user authenticates at the printer",
                "Setup takes half a day for NG, one to two days for a multi-device MF rollout",
              ]}
            />
          }
          badges={["20–30% Cost Reduction", "Secure Print Release", "Canon, Kyocera, HP, Xerox", "On-Site Setup UAE", "12-Month Support"]}
          primaryCta={{ label: "Get PaperCut Quote", href: "/rental-calculator/" }}
          secondaryCta={{ label: "+971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush title="What UAE Offices Achieve with PaperCut" align="center">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { stat: "20–30%", label: "Average print volume reduction in UAE offices within 90 days" },
              { stat: "40%", label: "Reduction in colour printing waste through policy enforcement" },
              { stat: "100M+", label: "Users worldwide trust PaperCut across 200+ countries" },
              { stat: "< 1 day", label: "Sahara setup time for PaperCut NG in a UAE SME office" },
            ].map((s) => (
              <div key={s.label} className="rounded-card border border-white/[0.08] bg-surface-low p-6 text-center">
                <p className="mb-2 text-4xl font-bold text-primary">{s.stat}</p>
                <p className="text-[0.9rem] leading-relaxed text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="PaperCut Features for UAE Offices" subtitle="Whether you manage 5 printers or 50 MFPs, PaperCut gives your IT team complete visibility and control." tone="raised">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.desc} delay={(i % 3) * 0.05} />
            ))}
          </div>
        </Section>

        <Section title="PaperCut MF vs PaperCut NG — Which Is Right for Your UAE Office?" subtitle={<>The main difference: <strong className="text-white">PaperCut MF</strong> embeds directly into your MFP&rsquo;s touchscreen for full control. <strong className="text-white">PaperCut NG</strong> manages network printing for smaller setups without MFP embedding.</>}>
          <ComparisonTable columns={["Feature", "PaperCut MF", "PaperCut NG"]} rows={mfVsNg} />
          <p className="mt-4 text-caption text-muted">
            Sahara supplies and implements both PaperCut MF and NG across Dubai, Sharjah, and Abu Dhabi.{" "}
            <a href="/rental-calculator/" className="text-primary hover:underline">Contact us</a> for a recommendation based on your printer fleet size.
          </p>
        </Section>

        <Section title="PaperCut Compatible Printer Brands in UAE" subtitle="PaperCut MF embeds natively into the touch panels of all major MFP brands. Sahara supplies and services all of them in the UAE." align="center" tone="raised">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {compatibleBrands.map((b) => (
              <a key={b.brand} href={b.href} className="rounded-card border border-transparent bg-surface-mid p-4 text-center transition-colors hover:border-primary/30">
                <p className="text-[0.9rem] font-bold text-white">{b.brand}</p>
                <p className="mt-1 text-caption text-muted">PaperCut MF Ready</p>
              </a>
            ))}
          </div>
        </Section>

        <Section title="How Sahara Implements PaperCut in Your UAE Office" subtitle="Typical deployment time: 1 day for NG, 1–2 days for MF across a multi-device fleet." className="max-w-3xl mx-auto">
          <ol className="space-y-4">
            {implementationSteps.map((s) => (
              <li key={s.step} className="flex gap-4 rounded-card border border-white/[0.08] bg-surface-low p-5">
                <span className="min-w-[2.5rem] text-2xl font-bold text-primary">{s.step}</span>
                <div>
                  <h3 className="mb-1 font-semibold text-white">{s.title}</h3>
                  <p className="text-[0.9rem] text-muted">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="PaperCut UAE — Frequently Asked Questions" className="max-w-3xl mx-auto" tone="raised">
          <FaqSection
            pageSlug="papercut-print-management"
            defaultFaqs={PAPERCUT_FAQS}
            pageId="https://www.saharaprinter.com/services/papercut-print-management/#faq"
          />
        </Section>

        <CtaBand
          title="Start Cutting Your Print Costs"
          body="Get a free print audit and PaperCut recommendation for your Dubai, Sharjah, or Abu Dhabi office. Most UAE implementations pay back within 6 months."
          primary={{ label: "Get Free Print Audit", href: "/rental-calculator/" }}
          secondary={{ label: "+971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush tone="ink">
          <h2 className="text-headline font-bold text-white mb-6">Related Services &amp; Products</h2>
          <div className="flex flex-wrap gap-3">
            {relatedLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-caption text-primary bg-primary/10 border border-primary/20 px-4 py-2 rounded-pill hover:bg-primary/20 transition-colors">
                {l.label}
              </a>
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
