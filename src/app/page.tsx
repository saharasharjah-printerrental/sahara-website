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


  return (
    <main className="min-h-screen bg-[#071325]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

      <link rel="preload" as="image" href="/images/hero-bg.webp" fetchPriority="high" />

      <Header />
      <HomepageClient />
      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}