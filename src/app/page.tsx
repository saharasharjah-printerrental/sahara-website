export const runtime = 'edge';
export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getGoogleReviewsData, getGooglePlaceId } from "@/lib/google-reviews";
import HomepageClient from "@/components/HomepageClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

export const metadata: Metadata = {
  title: "Printer Rental UAE | AED 250/mo | Free Toner & Maintenance | Sahara",
  description: "UAE printer & photocopier rental from AED 250/month. Zero deposit, free toner, maintenance, delivery, and 4-hour emergency response across all 7 emirates.",
  openGraph: {
    title: "Printer Rental UAE | AED 250/mo | Free Toner | Sahara",
    description: "Zero deposit printer & photocopier rental across UAE. Free toner & maintenance, 4-hour emergency response, and delivery across all 7 emirates.",
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

  const googleReviews = await getGoogleReviewsData();
  const googlePlaceId = getGooglePlaceId();

  const faqsForSchema = initialFaqs.length > 0 ? initialFaqs : [
    { q: "How much does printer rental cost in the UAE?", a: "Printer rental in the UAE starts from AED 250/month for A4 desktop printers. A3 multifunction photocopiers start from AED 500/month. All plans include zero deposit, unlimited toner, maintenance, and free delivery." },
    { q: "What are the benefits of printer rental in UAE?", a: "Printer rental in UAE offers zero upfront costs, predictable monthly payments, included maintenance and toner, latest technology access, and flexible upgrade options." },
    { q: "Do you offer printer rental in Abu Dhabi?", a: "Yes, we provide comprehensive printer rental services across Abu Dhabi, including Al Ain, Mussafah, and ICAD with same-day delivery and 24/7 support." },
    { q: "What printer brands do you rent?", a: "We rent premium brands including Canon imageRUNNER, HP LaserJet Enterprise, Kyocera TASKalfa, Ricoh MP series, Xerox AltaLink, and Brother." },
    { q: "Is toner included in printer rental?", a: "Yes — unlimited genuine OEM toner is included in all rental plans. We monitor levels remotely and replenish proactively." },
    { q: "Do you provide on-site repair services?", a: "Yes, our factory-certified technicians provide on-site repairs across all major service areas with a 4-hour response time for critical failures." },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@id": "https://www.saharaprinter.com/#faq",
    "@type": "FAQPage",
    mainEntity: faqsForSchema.map((f, i) => ({
      "@type": "Question",
      "@id": `https://www.saharaprinter.com/#faq-${i + 1}`,
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-[#071325]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />


      <Header />
      <HomepageClient
        initialLogos={initialLogos}
        initialTestimonials={initialTestimonials}
        initialFaqs={initialFaqs}
        googleReviews={googleReviews}
        googlePlaceId={googlePlaceId}
      />
      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
