import type { Metadata } from "next";
import "./globals.css";
import { Sora, Manrope } from "next/font/google";

export const runtime = 'edge';

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-sora",
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-manrope",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.saharaprinter.com'),
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
  "url": "https://www.saharaprinter.com",
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
  return {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    googleAnalytics4Id: process.env.GOOGLE_ANALYTICS_4_ID,
    googleTagManagerId: process.env.GOOGLE_TAG_MANAGER_ID,
    microsoftClarityId: process.env.MICROSOFT_CLARITY_ID,
    metaPixelId: process.env.META_PIXEL_ID,
    metaPixelAdvancedMatching: process.env.META_PIXEL_ADVANCED_MATCHING === 'true',
    hotjarId: process.env.HOTJAR_ID,
    customHeadScripts: process.env.CUSTOM_HEAD_SCRIPTS,
    customBodyScripts: process.env.CUSTOM_BODY_SCRIPTS,
    schemaMarkup: process.env.SCHEMA_MARKUP,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cfg = await getSEOConfig();

  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script suppressHydrationWarning type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

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
      <body className={`${manrope.className} bg-[#071325] text-[#d7e3fc]`} suppressHydrationWarning>
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
        {children}
      </body>
    </html>
  );
}
