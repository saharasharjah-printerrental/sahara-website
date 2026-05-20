export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import PaperCutFaqClient from "@/components/PaperCutFaqClient";

export const metadata: Metadata = {
  title: "PaperCut Print Management UAE | Setup & Support | Sahara",
  description: "PaperCut MF & NG setup, licensing, and support for UAE offices. Reduce print costs by up to 30%, enforce print policies, track usage by department. Dubai, Sharjah, Abu Dhabi. ☎ +971503823969",
  keywords: "papercut uae, papercut print management uae, print management software uae, papercut mf dubai, papercut ng uae, print tracking uae, printer usage monitoring dubai, managed print services uae",
  openGraph: {
    title: "PaperCut Print Management UAE | Sahara Office Equipments",
    description: "PaperCut MF & NG implementation, licensing and support for UAE offices. Track, control and reduce print costs. Dubai, Sharjah, Abu Dhabi.",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is PaperCut print management software?",
      "acceptedAnswer": { "@type": "Answer", "text": "PaperCut is the world's leading print management software used by 100+ million users across 200 countries. It tracks, controls, and reduces print costs by enforcing print policies, enabling secure print release, and reporting on usage by user, department, or project. Sahara provides PaperCut MF and NG setup, licensing, and support for UAE offices." },
    },
    {
      "@type": "Question",
      "name": "How much does PaperCut cost for a UAE office?",
      "acceptedAnswer": { "@type": "Answer", "text": "PaperCut NG (for SMEs) starts from approximately AED 1,800 per year for 10 users. PaperCut MF (for enterprise with MFP integration) is licensed per device. Sahara provides competitive UAE pricing with installation, configuration, and 1-year support included." },
    },
    {
      "@type": "Question",
      "name": "Which printers does PaperCut work with in UAE?",
      "acceptedAnswer": { "@type": "Answer", "text": "PaperCut MF works natively with Canon, Kyocera, Ricoh, Xerox, HP, Brother, and Sharp MFPs — all brands Sahara dealers in UAE. Installation integrates directly into the printer's touch panel for secure print release and copy/scan tracking." },
    },
    {
      "@type": "Question",
      "name": "Can PaperCut reduce our office printing costs in Dubai?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Dubai and UAE businesses that implement PaperCut typically see 20–30% reduction in print volume within 3 months — driven by duplex enforcement, colour restrictions, secure print release (reduces uncollected prints), and department quota management." },
    },
    {
      "@type": "Question",
      "name": "Does Sahara provide PaperCut training and support in UAE?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Sahara's PaperCut implementation service includes on-site installation, Active Directory/LDAP integration, user training, and 12-month remote + on-site support across Dubai, Sharjah, and Abu Dhabi." },
    },
  ],
};

const features = [
  { icon: "📊", title: "Usage Tracking", desc: "Report on print, copy, and scan activity by user, department, or project — across all your office printers." },
  { icon: "🔒", title: "Secure Print Release", desc: "Jobs held at server until user authenticates at the printer — eliminates uncollected prints and sensitive document exposure." },
  { icon: "⚙️", title: "Policy Enforcement", desc: "Automatically enforce duplex, B&W, and page limits by user group. Reduce colour printing waste by up to 40%." },
  { icon: "💰", title: "Cost Allocation", desc: "Charge print costs back to departments, clients, or projects. Full integration with your billing or ERP system." },
  { icon: "🖨️", title: "MFP Integration", desc: "Embedded apps on Canon, Kyocera, Ricoh, Xerox, HP, and Sharp MFPs — no separate hardware needed." },
  { icon: "☁️", title: "Cloud & Mobility", desc: "Print from mobile, cloud (Google Drive, OneDrive), and remote workers. Full BYOD support." },
];

export default function PaperCutPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
              <a href="/services/printer-rental" className="hover:text-[#f5be53] transition-colors">Services</a>
              <span className="mx-2">/</span>
              <span className="text-[#f5be53]">PaperCut Print Management</span>
            </nav>

            <div className="max-w-3xl">
              <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-xs">Print Management Software · UAE</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
                PaperCut Print<br /><span className="text-[#f5be53]">Management UAE</span>
              </h1>

              {/* AEO Answer Block */}
              <div className="bg-[#0d1b2e] border border-[#f5be53]/20 rounded-2xl p-5 mb-8">
                <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-2">What is PaperCut Print Management in UAE?</p>
                <p className="text-[#d3c5b0] text-sm leading-relaxed">
                  PaperCut is print management software that tracks, controls, and reduces printing costs for UAE offices.
                  Sahara Office Equipments provides PaperCut MF and NG setup, licensing, and ongoing support in Dubai, Sharjah,
                  and Abu Dhabi — helping businesses cut print volumes by 20–30% and enforce corporate print policies.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {["20–30% Cost Reduction", "Secure Print Release", "All Major Brands", "On-Site Setup", "12-Month Support"].map((t) => (
                  <span key={t} className="text-xs font-bold text-white bg-[#f5be53]/10 border border-[#f5be53]/25 px-3 py-1.5 rounded-full">✓ {t}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/get-quote" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_4px_24px_rgba(245,190,83,0.35)]">
                  Get PaperCut Quote
                </a>
                <a href="tel:+971503823969" className="glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                  📞 +971 50 382 3969
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-8 lg:px-24" style={{ background: '#050d1a' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10">PaperCut Features for UAE Offices</h2>
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

        {/* How it works */}
        <section className="py-20 px-8 lg:px-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">How Sahara Implements PaperCut in Your UAE Office</h2>
            <ol className="space-y-4">
              {[
                { step: "01", title: "Print Audit", desc: "We assess your current print environment — number of devices, usage volumes, network topology, and Active Directory structure." },
                { step: "02", title: "PaperCut Installation", desc: "PaperCut MF or NG server installed on your on-premises server or cloud VM. Integrated with AD/LDAP for automatic user provisioning." },
                { step: "03", title: "Printer MFP Embedding", desc: "PaperCut embedded app deployed on each Canon, Kyocera, Ricoh, Xerox, or HP MFP. Secure print release activated." },
                { step: "04", title: "Policy Configuration", desc: "Duplex defaults, colour restrictions, department quotas, and cost centres configured to your company policy." },
                { step: "05", title: "Training & Go-Live", desc: "User and admin training delivered on-site. Reporting dashboard configured for management visibility." },
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
        <section className="py-20 px-8 lg:px-24" style={{ background: '#050d1a' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10">PaperCut UAE — FAQ</h2>
            <PaperCutFaqClient />
          </div>
        </section>

        {/* Related */}
        <section className="py-12 px-8 lg:px-24 border-t border-[#f5be53]/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">Related Services</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/services/printer-rental", label: "Printer Rental UAE" },
                { href: "/services/amc", label: "Annual Maintenance (AMC)" },
                { href: "/services/repair", label: "Printer Repair Dubai" },
                { href: "/printer-rental-dubai", label: "Printer Rental Dubai" },
                { href: "/brands/kyocera", label: "Kyocera Printers" },
                { href: "/brands/canon", label: "Canon Printers" },
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
