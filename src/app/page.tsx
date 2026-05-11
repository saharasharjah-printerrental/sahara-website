import type { Metadata } from "next";
import { CipherText } from "@/components/CipherText";
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
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does printer rental cost in Dubai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Printer rental in Dubai starts from AED 250/month for A4 color printers. A3 photocopiers range from AED 500–1,000/month. All plans include zero deposit, unlimited toner, maintenance, and free delivery.",
        },
      },
      {
        "@type": "Question",
        name: "What are the benefits of printer rental in UAE?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Printer rental in UAE offers zero upfront costs, predictable monthly payments, included maintenance and toner, latest technology access, and flexible upgrade options.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer printer rental in Abu Dhabi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide comprehensive printer rental services across Abu Dhabi, including Al Ain, Mussafah, and ICAD. Our Abu Dhabi fleet includes Canon, HP, and Kyocera equipment with same-day delivery and 24/7 support.",
        },
      },
      {
        "@type": "Question",
        name: "What printer brands do you rent?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We rent premium brands including Canon imageRUNNER, HP LaserJet Enterprise, Kyocera TASKalfa, Ricoh MP series, Xerox AltaLink, and Brother. All equipment is brand new with full manufacturer warranty.",
        },
      },
      {
        "@type": "Question",
        name: "Is toner included in printer rental?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — unlimited genuine OEM toner is included in all rental plans. We monitor levels remotely and replenish proactively, ensuring you never run out of toner during critical printing periods.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#071325]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Preload LCP hero image */}
      <link rel="preload" as="image" href="/images/hero-bg.webp" fetchPriority="high" />

      <Header />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center pt-20 px-8 lg:px-24 overflow-hidden"
        style={{
          backgroundImage: "url('/images/hero-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
          contentVisibility: "auto",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071325]/95 via-[#071325]/75 to-[#071325]/30 z-0" />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#071325] to-transparent z-0" />

        <div className="w-full max-w-3xl relative z-10 space-y-8">
          <h1 className="sr-only">Printer Rental Dubai & UAE | Photocopier Leasing Services</h1>
          <CipherText
            text="Rent, Buy, or Repair"
            textSize="text-2xl sm:text-3xl md:text-7xl"
            className="mb-2 drop-shadow-[0_2px_24px_rgba(0,0,0,0.8)]"
            textColor="#ffffff"
            delay={500}
          />
          <CipherText
            text="All Under One Roof"
            textSize="text-xl sm:text-2xl md:text-6xl"
            className="mb-4 drop-shadow-[0_2px_24px_rgba(0,0,0,0.8)]"
            delay={1500}
          />
          <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
            Premium office equipment solutions for the modern executive. From high-speed printing to expert technical support, we power your productivity with precision.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="/get-quote"
              className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_4px_24px_rgba(245,190,83,0.4)]"
            >
              Get a Quote
            </a>
            <a
              href="/services"
              className="px-8 py-4 rounded-full font-bold text-lg text-white border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* All interactive sections in client component */}
      <HomepageClient />

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}