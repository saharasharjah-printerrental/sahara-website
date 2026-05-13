import type { Metadata } from "next";
import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "Printer Rental UAE | AED 250/mo | Free Toner & Maintenance",
  description: "UAE printer & photocopier rental from AED 250/mo. Zero deposit, free toner. 4-hr emergency response. 4.9★ · 1,500+ clients · Since 2012. Canon, Kyocera, HP. ☎ +971503823969",
  keywords: "printer rental dubai, photocopier rental sharjah, copier lease uae, printer amc dubai, printer rental from AED 250, zero deposit printer rental uae, free toner printer rental, printer repair uae, photocopier rental abu dhabi, corporate printer rental uae",
  alternates: { canonical: "https://www.saharaprinter.com/" },
  icons: {
    icon: "/images/sahara-navbar-logo.webp",
    shortcut: "/images/sahara-navbar-logo.webp",
    apple: "/images/sahara-navbar-logo.webp",
  },
  openGraph: {
    title: "Printer Rental UAE | AED 250/mo | Free Toner | Sahara",
    description: "Zero deposit printer & photocopier rental across UAE. Free toner & maintenance, 4-hr emergency response. 4.9★ · 1,500+ clients. Since 2012.",
    url: "https://www.saharaprinter.com/",
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
  "legalName": "Sahara Office Equip Tr LLC",
  "alternateName": ["Sahara Printer", "Sahara Printers UAE", "Sahara Office Equipment Trading LLC"],
  "slogan": "Rent, Buy, or Repair — All Under One Roof",
  "disambiguatingDescription": "Sahara Office Equipment Trading LLC (saharaprinter.com) is a printer rental and copier leasing company in Sharjah, UAE — not to be confused with Sahara Gulf Printing Press LLC (saharagulf.com), a commercial print shop in Al Quoz, Dubai.",
  "url": "https://saharaprinter.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.saharaprinter.com/images/sahara-navbar-logo.webp",
    "width": 200,
    "height": 60
  },
  "image": [
    "https://www.saharaprinter.com/images/heroPrntr1.webp",
    "https://www.saharaprinter.com/images/homement.webp",
    "https://www.saharaprinter.com/images/unsplash-office.webp"
  ],
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
    "latitude": 25.3187,
    "longitude": 55.4196
  },
  "hasMap": "https://www.google.com/maps/place/SAHARA+office+equipments/@25.3187,55.4196,17z",
  "telephone": "+971503823969",
  "email": "info@saharaprinter.com",
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
      "telephone": "+971503802095",
      "contactType": "customer support",
      "availableLanguage": ["English", "Arabic", "Hindi"],
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
  "paymentAccepted": "Cash, Cheque, Bank Transfer",
  "areaServed": [
    { "@type": "City", "name": "Dubai" },
    { "@type": "City", "name": "Sharjah" },
    { "@type": "City", "name": "Abu Dhabi" },
    { "@type": "City", "name": "Ajman" },
    { "@type": "City", "name": "Ras Al Khaimah" },
    { "@type": "City", "name": "Fujairah" },
    { "@type": "City", "name": "Al Ain" },
    { "@type": "Place", "name": "JAFZA" },
    { "@type": "Place", "name": "JLT" },
    { "@type": "Place", "name": "DIP" },
    { "@type": "Place", "name": "Al Quoz" },
    { "@type": "Place", "name": "Dubai Media City" },
    { "@type": "Place", "name": "Mussafah" },
    { "@type": "Place", "name": "ICAD" },
    { "@type": "Place", "name": "Hamriyah Free Zone" },
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
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.9,
    "reviewCount": 1500,
    "bestRating": 5,
    "worstRating": 1
  },
  "brand": [
    { "@type": "Brand", "name": "Canon" },
    { "@type": "Brand", "name": "Kyocera" },
    { "@type": "Brand", "name": "HP" },
    { "@type": "Brand", "name": "Konica Minolta" },
    { "@type": "Brand", "name": "Xerox" },
    { "@type": "Brand", "name": "Ricoh" },
    { "@type": "Brand", "name": "Brother" },
    { "@type": "Brand", "name": "Epson" },
    { "@type": "Brand", "name": "Toshiba" }
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "name": "Daily Printer Rental",
      "description": "Flexible short-term printer rental starting at AED 10 per day — ideal for events, exhibitions, and project-based needs.",
      "price": "10",
      "priceCurrency": "AED",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "10",
        "priceCurrency": "AED",
        "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitText": "day" }
      }
    },
    {
      "@type": "Offer",
      "name": "Hassle-Free Monthly Payment Terms",
      "description": "Zero deposit, flexible monthly payment plans with free toner and maintenance included."
    }
  ],
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
    "https://www.wikidata.org/wiki/Q137021158",
    "https://www.facebook.com/saharaedoc",
    "https://www.instagram.com/sahara_office_equipments/",
    "https://www.linkedin.com/company/sahara-office-equipment-trading-llc--sharjah/",
    "https://www.youtube.com/@saharaprinter",
    "https://www.reddit.com/user/Weekly_Drawing_8562/",
    "https://www.quora.com/profile/Sahara-Printer-Printer-Rental-Expert-for-Businesses-UAE"
  ],
  "dateEstablished": "2012-01-01",
  "dateModified": "2026-05-07",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".aeo-block"]
  }
};

// Validation function to ensure FAQ schema quality
function createValidFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  // Filter and validate FAQs per Google's requirements
  const validFaqs = faqs
    .filter(faq => {
      // Must have non-empty question and answer
      if (!faq.question?.trim() || !faq.answer?.trim()) return false;
      // Answer must be at least 10 characters and not just a URL
      if (faq.answer.trim().length < 10) return false;
      if (/^https?:\/\//.test(faq.answer.trim())) return false;
      return true;
    })
    .map(faq => ({
      "@type": "Question",
      "name": faq.question.trim(),
      "acceptedAnswer": {
        "@type": "Answer",
        // Strip HTML tags from answer text (Google requires plain text)
        "text": faq.answer
          .replace(/<[^>]*>/g, '')
          .trim()
      }
    }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": validFaqs
  };
}

// FAQ data source
const faqData = [
  {
    question: "How much does printer rental cost in Dubai?",
    answer: "Printer rental in Dubai starts from AED 250/month for A4 color printers. A3 photocopiers range from AED 500–1,000/month. All plans include zero deposit, unlimited toner, maintenance, and free delivery."
  },
  {
    question: "What are the benefits of printer rental in UAE?",
    answer: "Printer rental in UAE offers zero upfront costs, predictable monthly payments, included maintenance and toner, latest technology access, and flexible upgrade options."
  },
  {
    question: "Do you offer printer rental in Abu Dhabi?",
    answer: "Yes, we provide comprehensive printer rental services across Abu Dhabi, including Al Ain, Mussafah, and ICAD with same-day delivery and 24/7 support."
  },
  {
    question: "What printer brands do you rent?",
    answer: "We rent premium brands including Canon imageRUNNER, HP LaserJet Enterprise, Kyocera TASKalfa, Ricoh MP series, Xerox AltaLink, and Brother."
  },
  {
    question: "Is toner included in printer rental?",
    answer: "Yes — unlimited genuine OEM toner is included in all rental plans. We monitor levels remotely and replenish proactively."
  },
  {
    question: "Do you provide on-site repair services?",
    answer: "Yes, our factory-certified technicians provide on-site repairs across all major service areas with a 4-hour response time for critical failures."
  }
];

// Generate validated FAQ schema
const faqSchema = createValidFAQSchema(faqData);

interface ServerSEOConfig {
  googleAnalyticsId?: string;
  googleAnalytics4Id?: string;
  googleTagManagerId?: string;
  microsoftClarityId?: string;
  metaPixelId?: string;
  metaPixelAdvancedMatching?: boolean;
  hotjarId?: string;
  customHeadScripts?: string;
  customBodyScripts?: string;
  schemaMarkup?: string;
}

type ParsedScript = { src: string; isAsync: boolean } | { inline: string };

function parseScripts(html: string): ParsedScript[] {
  if (!html?.trim()) return [];
  const out: ParsedScript[] = [];
  const re = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  let hasTag = false;
  while ((m = re.exec(html)) !== null) {
    hasTag = true;
    const srcMatch = m[1].match(/src=["']([^"']+)["']/i);
    const body = m[2].trim();
    if (srcMatch) out.push({ src: srcMatch[1], isAsync: /\basync\b/i.test(m[1]) });
    else if (body) out.push({ inline: body });
  }
  if (!hasTag && html.trim()) out.push({ inline: html.trim() });
  return out;
}

async function getSEOConfig(): Promise<ServerSEOConfig | null> {
  try {
    const db = (getRequestContext().env as any).DB;
    if (!db) return null;
    const row: any = await db.prepare("SELECT value FROM settings WHERE key = ?").bind("seo_config").first();
    if (row?.value) return JSON.parse(row.value);
  } catch {}
  return null;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cfg = await getSEOConfig();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@400;600;700&family=Material+Symbols+Outlined:wght,FILL@400,0..1&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        {/* Google Tag Manager */}
        {cfg?.googleTagManagerId && (
          <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${cfg.googleTagManagerId}');` }} />
        )}

        {/* Google Analytics (UA + GA4) */}
        {cfg?.googleAnalyticsId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${cfg.googleAnalyticsId}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${cfg.googleAnalyticsId}');${cfg.googleAnalytics4Id ? `gtag('config','${cfg.googleAnalytics4Id}');` : ""}` }} />
          </>
        )}
        {/* GA4 standalone — only when no UA ID is set */}
        {cfg?.googleAnalytics4Id && !cfg?.googleAnalyticsId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${cfg.googleAnalytics4Id}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${cfg.googleAnalytics4Id}');` }} />
          </>
        )}

        {/* Meta Pixel */}
        {cfg?.metaPixelId && (
          <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${cfg.metaPixelId}'${cfg.metaPixelAdvancedMatching ? ",{'advanced_matching':true}" : ""});fbq('track','PageView');` }} />
        )}

        {/* Microsoft Clarity */}
        {cfg?.microsoftClarityId && (
          <script dangerouslySetInnerHTML={{ __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${cfg.microsoftClarityId}");` }} />
        )}

        {/* Hotjar */}
        {cfg?.hotjarId && (
          <script dangerouslySetInnerHTML={{ __html: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${cfg.hotjarId},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');` }} />
        )}

        {/* Custom schema markup */}
        {cfg?.schemaMarkup && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: cfg.schemaMarkup }} />
        )}

        {/* Custom head scripts — handles raw JS or full <script> HTML snippets */}
        {cfg?.customHeadScripts &&
          parseScripts(cfg.customHeadScripts).map((s, i) =>
            "src" in s
              ? <script key={i} async={s.isAsync} src={s.src} />
              : <script key={i} dangerouslySetInnerHTML={{ __html: s.inline }} />
          )}
      </head>
      <body className="bg-[#071325] text-[#d7e3fc]" suppressHydrationWarning>
        {/* GTM noscript — must be immediately after opening body tag */}
        {cfg?.googleTagManagerId && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${cfg.googleTagManagerId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
          </noscript>
        )}
        {/* Custom body scripts — handles raw JS or full <script> HTML snippets */}
        {cfg?.customBodyScripts &&
          parseScripts(cfg.customBodyScripts).map((s, i) =>
            "src" in s
              ? <script key={i} async={s.isAsync} src={s.src} />
              : <script key={i} dangerouslySetInnerHTML={{ __html: s.inline }} />
          )}
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
