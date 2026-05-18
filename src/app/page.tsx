export const runtime = 'edge';
export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { getRequestContext } from "@cloudflare/next-on-pages";
import HomepageClient from "@/components/HomepageClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

export const metadata: Metadata = {
  title: "Printer Rental Dubai & UAE | Sahara Office Equipments",
  description: "Premium printer rental in Dubai, Abu Dhabi & UAE. Canon, HP, Kyocera photocopiers from AED 250/month. Zero deposit, free delivery, unlimited toner, 24/7 support.",
  keywords: "printer rental dubai, photocopier rental uae, printer lease abu dhabi, office printing solutions, canon printer rental, hp printer lease",
  openGraph: {
    title: "Printer Rental Dubai & UAE | Photocopier Leasing | Sahara",
    description: "Premium printer rental in Dubai, Abu Dhabi & UAE. Canon, HP, Kyocera photocopiers from AED 250/month. Zero deposit, free delivery, unlimited toner.",
    url: "https://www.saharaprinter.com/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: {
    canonical: "https://www.saharaprinter.com/",
  },
};

export default async function HomePage() {
  let initialLogos: any[] = [];
  let initialTestimonials: any[] = [];
  let initialFaqs: { q: string; a: string }[] = [];
  try {
    const db = (getRequestContext().env as any).DB;
    if (db) {
      const [lr, tr, fr] = await Promise.all([
        db.prepare('SELECT * FROM logos WHERE isActive = 1 ORDER BY sortOrder ASC').all(),
        db.prepare('SELECT * FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC').all(),
        db.prepare("SELECT question, answer FROM faqs WHERE pageSlug = 'homepage' AND isActive = 1 ORDER BY sortOrder ASC").all(),
      ]);
      if (lr?.results?.length > 0) initialLogos = lr.results;
      if (tr?.results?.length > 0) initialTestimonials = tr.results;
      if (fr?.results?.length > 0) initialFaqs = (fr.results as any[]).map((f) => ({ q: f.question, a: f.answer }));
    }
  } catch { /* D1 unavailable in dev — components fall back to hardcoded defaults */ }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sahara Office Equipments - Printer Rental Dubai",
    url: "https://www.saharaprinter.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.saharaprinter.com/products?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };


  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does printer rental cost in Dubai?",
        "acceptedAnswer": { "@type": "Answer", "text": "Printer rental in Dubai starts from AED 250/month for A4 color printers. A3 photocopiers range from AED 500–1,000/month. All plans include zero deposit, unlimited toner, maintenance, and free delivery." }
      },
      {
        "@type": "Question",
        "name": "What are the benefits of printer rental in UAE?",
        "acceptedAnswer": { "@type": "Answer", "text": "Printer rental in UAE offers zero upfront costs, predictable monthly payments, included maintenance and toner, latest technology access, and flexible upgrade options." }
      },
      {
        "@type": "Question",
        "name": "Do you offer printer rental in Abu Dhabi?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide comprehensive printer rental services across Abu Dhabi, including Al Ain, Mussafah, and ICAD with same-day delivery and 24/7 support." }
      },
      {
        "@type": "Question",
        "name": "What printer brands do you rent?",
        "acceptedAnswer": { "@type": "Answer", "text": "We rent premium brands including Canon imageRUNNER, HP LaserJet Enterprise, Kyocera TASKalfa, Ricoh MP series, Xerox AltaLink, and Brother." }
      },
      {
        "@type": "Question",
        "name": "Is toner included in printer rental?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes — unlimited genuine OEM toner is included in all rental plans. We monitor levels remotely and replenish proactively." }
      },
      {
        "@type": "Question",
        "name": "Do you provide on-site repair services?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, our factory-certified technicians provide on-site repairs across all major service areas with a 4-hour response time for critical failures." }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#071325]">
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>


      <Header />
      <HomepageClient initialLogos={initialLogos} initialTestimonials={initialTestimonials} initialFaqs={initialFaqs} />
      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}