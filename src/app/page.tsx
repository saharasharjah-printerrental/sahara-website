export const runtime = 'edge';
import type { Metadata } from "next";
import HomepageClient from "@/components/HomepageClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

export const metadata: Metadata = {
  title: "Printer Rental Dubai & UAE | Photocopier Leasing | Sahara Office Equipments",
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

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sahara Office Equipments",
    url: "https://www.saharaprinter.com",
    logo: "https://www.saharaprinter.com/images/sahara-navbar-logo.webp",
    description: "Premium printer rental and office equipment services in Dubai and across the UAE.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Industrial Area 13, Near National Paint roundabout",
      addressLocality: "Sharjah",
      addressCountry: "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971503823969",
      contactType: "sales",
      availableHours: "24/7",
    },
    areaServed: {
      "@type": "State",
      name: "UAE",
    },
    sameAs: [
      "https://www.facebook.com/saharaoffice",
      "https://www.instagram.com/saharaoffice",
      "https://www.linkedin.com/company/saharaoffice",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sahara Office Equipments",
    image: "https://www.saharaprinter.com/images/hero-bg.webp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Industrial Area 13, Near National Paint roundabout",
      addressLocality: "Sharjah",
      addressRegion: "SH",
      postalCode: "",
      addressCountry: "AE",
    },
    telephone: "+971503823969",
    priceRange: "AED",
    openingHours: "Mo-Su 00:00-24:00",
    serviceType: ["Printer Rental", "Photocopier Leasing", "Printer Repair", "Toner Supplies"],
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <link rel="preload" as="image" href="/images/hero-bg.webp" fetchPriority="high" />

      <Header />
      <HomepageClient />
      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}