import type { Metadata } from "next";
import "./globals.css";
import SEOInjector from "@/components/SEOInjector";

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "Printer Rental Dubai | Photocopier Lease UAE | Sahara Office Equipments",
  description: "Best printer rental in Dubai, Sharjah, Abu Dhabi. Zero deposit, free toner, 4hr response. Canon, Kyocera, HP. Call +971503823969 for quote.",
  keywords: "printer rental dubai, photocopier rental sharjah, copier lease uae, printer amc dubai, toner suppliers, printer repair uae, photocopier rental abu dhabi, printer lease sharjah, corporate printer rental uae",
  openGraph: {
    title: "Printer Rental Dubai | Sahara Office Equipments",
    description: "Best printer rental in Dubai, Sharjah, Abu Dhabi. Zero deposit, free toner, 4hr response.",
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
  "@type": "Organization",
  "name": "Sahara Office Equipments",
  "alternateName": "Sahara Printer",
  "url": "https://saharaprinter.com",
  "logo": "https://www.saharaprinter.com/assets/Home/sahara-navbar-logo.webp",
  "description": "UAE's trusted partner for printer rental, sales, repair, and managed print solutions since 2012.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Industrial Area 11",
    "addressLocality": "Sharjah",
    "addressCountry": "AE",
    "addressRegion": "Sharjah"
  },
  "telephone": "+971503823969",
  "email": "info@saharaedoc.com",
  "areaServed": {
    "@type": "State",
    "name": "UAE"
  },
  "serviceType": ["Printer Rental", "Photocopier Leasing", "Printer Repair", "AMC Services", "Toner Supplies"],
  "priceRange": "AED 250-2000",
  "openingHours": "24/7",
  "sameAs": [
    "https://www.facebook.com/saharaofficeequipments",
    "https://www.instagram.com/sahara_office_equipments",
    "https://www.linkedin.com/company/sahara-office-equipment-trading-llc"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "66",
    "bestRating": "5"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </head>
      <body className="bg-[#071325] text-[#d7e3fc]" suppressHydrationWarning>
        <SEOInjector />
        {children}
      </body>
    </html>
  );
}
