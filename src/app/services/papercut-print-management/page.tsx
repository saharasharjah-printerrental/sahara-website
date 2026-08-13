export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import FaqSection from "@/components/FaqSection";
import type { FaqItem } from "@/lib/faqs";
import AnswerBlock from "@/components/AnswerBlock";

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
  { icon: "📊", title: "Usage Tracking", desc: "Report on print, copy, and scan activity by user, department, or project — across all your office printers and MFPs." },
  { icon: "🔒", title: "Secure Print Release", desc: "Jobs held at server until user authenticates at the printer — eliminates uncollected prints and sensitive document exposure." },
  { icon: "⚙️", title: "Policy Enforcement", desc: "Automatically enforce duplex, B&W, and page limits by user group. Reduce colour printing waste by up to 40%." },
  { icon: "💰", title: "Cost Allocation", desc: "Charge print costs back to departments, clients, or projects. Full integration with your billing or ERP system." },
  { icon: "🖨️", title: "MFP Integration", desc: "Embedded apps on Canon, Kyocera, Ricoh, Xerox, HP, and Sharp MFPs — no separate hardware needed." },
  { icon: "☁️", title: "Cloud & Mobility", desc: "Print from mobile, cloud (Google Drive, OneDrive), and remote workers. Full BYOD support for UAE offices." },
];

const mfVsNg = [
  { feature: "Best for", mf: "Enterprises with MFPs (10+ devices)", ng: "SMEs and workgroups (1–50 users)" },
  { feature: "MFP Embedded App", mf: "Yes — native touch panel integration", ng: "No (network print only)" },
  { feature: "Secure Print Release", mf: "At the MFP touch panel", ng: "Via PIN or card swipe" },
  { feature: "Scan & Copy Tracking", mf: "Yes — full MFP activity", ng: "Print only" },
  { feature: "Licensing Model", mf: "Per device (MFP)", ng: "Per user/year" },
  { feature: "Starting Price (UAE)", mf: "AED 800+ per device/year", ng: "AED 1,800/year (10 users)" },
  { feature: "Cloud Deployment", mf: "On-premise + cloud", ng: "On-premise (NG+) or cloud" },
  { feature: "Active Directory Integration", mf: "Yes — full AD/LDAP sync", ng: "Yes" },
  { feature: "Mobile Print", mf: "Yes — Mobility Print included", ng: "Yes — Mobility Print included" },
  { feature: "Sahara Setup Time", mf: "1–2 days (multi-device)", ng: "Half day (server install)" },
];

export default function PaperCutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* FAQPage JSON-LD is emitted by <FaqSection> alongside the accordion it renders,
          so the questions can never drift apart from the schema that declares them. */}
      <main className="min-h-screen bg-[#071325]">
        <Header />

        {/* Hero */}
        <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5be53]/6 rounded-full blur-[160px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <nav className="text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
              <a href="/" className="hover:text-[#f5be53] transition-colors">Home</a>
              <span className="mx-2">/</span>
              <a href="/services/printer-rental/" className="hover:text-[#f5be53] transition-colors">Services</a>
              <span className="mx-2">/</span>
              <span className="text-[#f5be53]">PaperCut Print Management</span>
            </nav>

            <div className="max-w-3xl">
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-xs">Print Management Software · UAE</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                PaperCut Print<br /><span className="text-[#f5be53]">Management UAE</span>
              </h1>

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

              <div className="flex flex-wrap gap-3 mb-8">
                {["20–30% Cost Reduction", "Secure Print Release", "Canon, Kyocera, HP, Xerox", "On-Site Setup UAE", "12-Month Support"].map((t) => (
                  <span key={t} className="text-xs font-bold text-white bg-[#f5be53]/10 border border-[#f5be53]/25 px-3 py-1.5 rounded-full">✓ {t}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/rental-calculator/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_4px_24px_rgba(245,190,83,0.35)]">
                  Get PaperCut Quote
                </a>
                <a href="tel:+971503823969" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                  📞 +971 50 382 3969
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Stats */}
        <section className="py-14 px-8 lg:px-24" style={{ background: '#050d1a' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">What UAE Offices Achieve with PaperCut</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { stat: "20–30%", label: "Average print volume reduction in UAE offices within 90 days" },
                { stat: "40%", label: "Reduction in colour printing waste through policy enforcement" },
                { stat: "100M+", label: "Users worldwide trust PaperCut across 200+ countries" },
                { stat: "< 1 day", label: "Sahara setup time for PaperCut NG in a UAE SME office" },
              ].map((s, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl text-center">
                  <p className="text-4xl font-bold text-[#f5be53] mb-2">{s.stat}</p>
                  <p className="text-[#8fa3bc] text-sm leading-relaxed">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-8 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3">PaperCut Features for UAE Offices</h2>
            <p className="text-[#8fa3bc] mb-10 max-w-2xl">Whether you manage 5 printers or 50 MFPs, PaperCut gives your IT team complete visibility and control.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={i} className="glass-card rounded-2xl p-6">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="text-white font-bold mb-2">{f.title}</h3>
                  <p className="text-[#d3c5b0] text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MF vs NG Comparison */}
        <section className="py-20 px-8 lg:px-24" style={{ background: '#050d1a' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3">PaperCut MF vs PaperCut NG — Which Is Right for Your UAE Office?</h2>
            <p className="text-[#8fa3bc] mb-10 max-w-2xl">
              The main difference: <strong className="text-white">PaperCut MF</strong> embeds directly into your MFP's touchscreen for full control. <strong className="text-white">PaperCut NG</strong> manages network printing for smaller setups without MFP embedding.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0d1a2e]">
                    <th className="px-5 py-4 text-left text-[#8fa3bc] font-semibold">Feature</th>
                    <th className="px-5 py-4 text-left text-[#f5be53] font-semibold">PaperCut MF</th>
                    <th className="px-5 py-4 text-left text-blue-300 font-semibold">PaperCut NG</th>
                  </tr>
                </thead>
                <tbody>
                  {mfVsNg.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-[#0a1422]" : "bg-[#071325]"}>
                      <td className="px-5 py-3 text-[#8fa3bc] font-medium">{row.feature}</td>
                      <td className="px-5 py-3 text-white">{row.mf}</td>
                      <td className="px-5 py-3 text-white">{row.ng}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#8fa3bc] text-xs mt-4">Sahara supplies and implements both PaperCut MF and NG across Dubai, Sharjah, and Abu Dhabi. <a href="/rental-calculator/" className="text-[#f5be53] hover:underline">Contact us</a> for a recommendation based on your printer fleet size.</p>
          </div>
        </section>

        {/* Compatible Brands */}
        <section className="py-16 px-8 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3 text-center">PaperCut Compatible Printer Brands in UAE</h2>
            <p className="text-[#8fa3bc] text-center mb-10 max-w-2xl mx-auto">PaperCut MF embeds natively into the touch panels of all major MFP brands. Sahara supplies and services all of them in the UAE.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { brand: "Canon", href: "/brands/canon" },
                { brand: "Kyocera", href: "/brands/kyocera" },
                { brand: "Ricoh", href: "/brands/ricoh" },
                { brand: "Xerox", href: "/brands/xerox" },
                { brand: "HP", href: "/brands/hp" },
                { brand: "Sharp", href: "/brands/sharp" },
              ].map((b) => (
                <a key={b.brand} href={b.href} className="glass-card p-4 rounded-xl text-center hover:border-[#f5be53]/30 border border-transparent transition-colors">
                  <p className="text-white font-bold text-sm">{b.brand}</p>
                  <p className="text-[#8fa3bc] text-xs mt-1">PaperCut MF Ready</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-8 lg:px-24" style={{ background: '#050d1a' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3">How Sahara Implements PaperCut in Your UAE Office</h2>
            <p className="text-[#8fa3bc] mb-8">Typical deployment time: 1 day for NG, 1–2 days for MF across a multi-device fleet.</p>
            <ol className="space-y-4">
              {[
                { step: "01", title: "Print Environment Audit", desc: "We assess your current print fleet — number of devices, usage volumes, network topology, and Active Directory / LDAP structure across your UAE office locations." },
                { step: "02", title: "PaperCut Server Installation", desc: "PaperCut MF or NG server installed on your on-premises server or cloud VM. Integrated with AD/LDAP for automatic user provisioning and group policy mapping." },
                { step: "03", title: "MFP Embedded App Deployment", desc: "PaperCut embedded app installed on each Canon, Kyocera, Ricoh, Xerox, HP, or Sharp MFP touch panel. Secure print release and ID card authentication activated." },
                { step: "04", title: "Policy & Cost Centre Configuration", desc: "Duplex defaults, colour restrictions, department quotas, client billing codes, and printer quotas configured to match your company policy and UAE cost structure." },
                { step: "05", title: "Staff Training & Go-Live", desc: "User training delivered on-site in Dubai, Sharjah, or Abu Dhabi. Management reporting dashboard configured. Ongoing 12-month remote + on-site support included." },
              ].map((s, i) => (
                <li key={i} className="flex gap-4 glass-card rounded-2xl p-5">
                  <span className="text-[#f5be53] font-bold text-2xl min-w-[2.5rem]">{s.step}</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{s.title}</h3>
                    <p className="text-[#d3c5b0] text-sm">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-8 lg:px-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10">PaperCut UAE — Frequently Asked Questions</h2>
            <FaqSection
              pageSlug="papercut-print-management"
              defaultFaqs={PAPERCUT_FAQS}
              pageId="https://www.saharaprinter.com/services/papercut-print-management/#faq"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-8 lg:px-24" style={{ background: '#050d1a' }}>
          <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f5be53] to-[#c8962e] p-12 relative overflow-hidden text-center">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-[#5a3d00] text-sm font-bold uppercase tracking-[0.18em] mb-3">PaperCut Certified Partner — UAE</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#412d00] mb-4">Start Cutting Your Print Costs</h2>
              <p className="text-[#5a3d00] mb-6 max-w-xl mx-auto">Get a free print audit and PaperCut recommendation for your Dubai, Sharjah, or Abu Dhabi office. Most UAE implementations pay back within 6 months.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/rental-calculator/" className="bg-[#071325] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                  Get Free Print Audit
                </a>
                <a href="tel:+971503823969" className="bg-[#c8962e]/20 border border-[#483200]/30 text-[#412d00] px-8 py-4 rounded-full font-bold">
                  +971 50 382 3969
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-12 px-8 lg:px-24 border-t border-[#f5be53]/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">Related Services &amp; Products</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/services/printer-rental/", label: "Printer Rental UAE" },
                { href: "/services/amc/", label: "Annual Maintenance (AMC)" },
                { href: "/services/repair/", label: "Printer Repair Dubai" },
                { href: "/brands/kyocera", label: "Kyocera Printers UAE" },
                { href: "/brands/canon", label: "Canon Printers UAE" },
                { href: "/brands/ricoh", label: "Ricoh Printers UAE" },
                { href: "/services/paper-shredder-rental/", label: "Paper Shredder Rental" },
              ].map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-[#f5be53] bg-[#f5be53]/10 border border-[#f5be53]/20 px-4 py-2 rounded-full hover:bg-[#f5be53]/20 transition-colors">
                  {l.label}
                </a>
              ))}
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
