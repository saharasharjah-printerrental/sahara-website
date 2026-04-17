import type { Metadata } from "next";
import "./globals.css";
import SEOInjector from "@/components/SEOInjector";
import VisitorTracker from "@/components/VisitorTracker";

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "Printer Rental UAE | AED 250/mo | Free Toner & Maintenance",
  description: "UAE printer & photocopier rental from AED 250/mo. Zero deposit, free toner. 4-hr emergency response. 4.9★ · 1,500+ clients · Since 2012. Canon, Kyocera, HP. ☎ +971503823969",
  keywords: "printer rental dubai, photocopier rental sharjah, copier lease uae, printer amc dubai, printer rental from AED 250, zero deposit printer rental uae, free toner printer rental, printer repair uae, photocopier rental abu dhabi, corporate printer rental uae",
  openGraph: {
    title: "Printer Rental UAE | AED 250/mo | Free Toner | Sahara",
    description: "Zero deposit printer & photocopier rental across UAE. Free toner & maintenance, 4-hr emergency response. 4.9★ · 1,500+ clients. Since 2012.",
    type: "website",
    locale: "en_AE",
    alternateLocale: "ar_AE",
    siteName: "Sahara Office Equipments",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "name": "Sahara Office Equipments",
  "legalName": "Sahara Office Equipment Trading LLC",
  "alternateName": ["Sahara Printer", "Sahara Printers UAE"],
  "disambiguatingDescription": "Sahara Office Equipment Trading LLC (saharaprinter.com) is a printer rental and copier leasing company in Sharjah, UAE — not to be confused with Sahara Gulf Printing Press LLC (saharagulf.com), a commercial print shop in Al Quoz, Dubai.",
  "url": "https://saharaprinter.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.saharaprinter.com/assets/Home/sahara-navbar-logo.webp",
    "width": 200,
    "height": 60
  },
  "image": "https://www.saharaprinter.com/assets/Home/heroPrntr1.webp",
  "description": "UAE's trusted partner for printer rental, photocopier leasing, repair services, and managed print solutions since 2012. Serving Dubai, Sharjah, Abu Dhabi, Ajman, RAK and all free zones.",
  "foundingDate": "2012",
  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 15, "maxValue": 50 },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Al Arabi Building, Industrial Center Road, Industrial Area 11",
    "addressLocality": "Sharjah",
    "addressCountry": "AE",
    "addressRegion": "Sharjah",
    "postalCode": "47373"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.2942534,
    "longitude": 55.4260483
  },
  "hasMap": "https://maps.google.com/?q=25.2942534,55.4260483",
  "telephone": "+971503823969",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+971503823969",
      "contactType": "sales",
      "availableLanguage": ["English", "Arabic"],
      "areaServed": "AE"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+97165426169",
      "contactType": "customer service",
      "availableLanguage": ["English", "Arabic"],
      "areaServed": "AE"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+97165276444",
      "contactType": "technical support",
      "contactOption": "TollFree",
      "availableLanguage": ["English", "Arabic"],
      "areaServed": "AE"
    }
  ],
  "email": "info@saharaedoc.com",
  "areaServed": [
    { "@type": "City", "name": "Dubai" },
    { "@type": "City", "name": "Sharjah" },
    { "@type": "City", "name": "Abu Dhabi" },
    { "@type": "City", "name": "Ajman" },
    { "@type": "City", "name": "Ras Al Khaimah" },
    { "@type": "City", "name": "Fujairah" },
    { "@type": "City", "name": "Al Ain" },
    { "@type": "Place", "name": "JAFZA" },
    { "@type": "Place", "name": "SAIF Zone" },
    { "@type": "Place", "name": "DAFZA" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  ],
  "priceRange": "AED 250–2000",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Printer Rental & Office Equipment Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "A4 Desktop Printer Rental",
          "description": "Monthly rental of A4 monochrome or color desktop printers for small offices."
        },
        "price": "250",
        "priceCurrency": "AED",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "250", "priceCurrency": "AED", "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitText": "month" } }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "A3 Multifunction Photocopier Rental",
          "description": "Monthly rental of A3 multifunction printers for medium to large offices."
        },
        "price": "500",
        "priceCurrency": "AED"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Printer Repair Service UAE",
          "description": "On-site printer and photocopier repair with 4-hour emergency response across UAE."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Annual Maintenance Contract (AMC)",
          "description": "Comprehensive annual maintenance contracts for office printers and copiers."
        },
        "price": "299",
        "priceCurrency": "AED"
      }
    ]
  },
  "knowsAbout": [
    "Printer Rental UAE",
    "Photocopier Leasing Dubai",
    "Managed Print Services",
    "Canon Printer Service",
    "Kyocera Printer Service",
    "Annual Maintenance Contract Printers",
    "Office Equipment Leasing"
  ],
  "sameAs": [
    "https://www.facebook.com/share/1GM5UxFLTq/",
    "https://www.instagram.com/sahara_office_equipments",
    "https://www.linkedin.com/company/sahara-office-equipment-trading-llc--sharjah/",
    "https://www.youtube.com/@saharaprinter"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "66",
    "bestRating": "5",
    "worstRating": "1"
  },
  "dateEstablished": "2012-01-01",
  "dateModified": "2026-04-15",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".aeo-block"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts — swap prevents FOIT, trim to used weights */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@400;600;700&family=Material+Symbols+Outlined:wght,FILL@400,0..1&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </head>
      <body className="bg-[#071325] text-[#d7e3fc]" suppressHydrationWarning>
        <SEOInjector />
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
