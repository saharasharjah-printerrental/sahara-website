import type { Metadata } from "next";
import "./globals.css";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { Sora, Manrope } from "next/font/google";
import { getGoogleReviewsData } from "@/lib/google-reviews";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

export const runtime = 'edge';

export const metadata: Metadata = {
  metadataBase: new URL("https://www.saharaprinter.com"),
  title: "Printer Rental UAE | AED 250/mo | Free Toner & Maintenance",
  description: "UAE printer & photocopier rental from AED 250/mo. Zero deposit, free toner. 4-hr emergency response. 5.0★ · 1,500+ clients · Since 2012. Canon, Kyocera, HP. ☎ +971503823969",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "70x70", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Printer Rental UAE | AED 250/mo | Free Toner | Sahara",
    description: "Zero deposit printer & photocopier rental across UAE. Free toner & maintenance, 4-hr emergency response. 5.0★ · 1,500+ clients. Since 2012.",
    url: "https://www.saharaprinter.com/",
    type: "website",
    locale: "en_AE",
    alternateLocale: "ar_AE",
    siteName: "Sahara Office Equipments",
    images: [
      {
        url: "/images/heroPrntr1.webp",
        width: 1200,
        height: 630,
        alt: "Sahara Office Equipments — Printer & Photocopier Rental UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Printer Rental UAE | AED 250/mo | Free Toner | Sahara",
    description: "Zero deposit printer & photocopier rental across UAE. Free toner & maintenance, 4-hr emergency response.",
    images: ["/images/heroPrntr1.webp"],
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
  "@id": "https://www.saharaprinter.com/#organization",
  "name": "Sahara Office Equipments",
  "legalName": "Sahara Office Equip Tr LLC",
  "alternateName": ["Sahara Printer", "Sahara Printers UAE", "Sahara Office Equipment Trading LLC"],
  "slogan": "Rent, Buy, or Repair — All Under One Roof",
  "disambiguatingDescription": "Sahara Office Equipment Trading LLC (saharaprinter.com) is a printer rental and copier leasing company in Sharjah, UAE — not to be confused with Sahara Gulf Printing Press LLC (saharagulf.com), a commercial print shop in Al Quoz, Dubai.",
  "url": "https://www.saharaprinter.com",
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
    "latitude": 25.2942534,
    "longitude": 55.4260483
  },
  "hasMap": "https://maps.google.com/?cid=11820725793384191512",
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
    "https://www.facebook.com/share/1GM5UxFLTq/",
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.saharaprinter.com/#website",
  "url": "https://www.saharaprinter.com",
  "name": "Sahara Office Equipments",
  "publisher": { "@id": "https://www.saharaprinter.com/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.saharaprinter.com/blogs/?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
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
  organizationSchema?: string;
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
    if (srcMatch) out.push({ src: srcMatch[1].trim(), isAsync: /\basync\b/i.test(m[1]) });
    else if (body) out.push({ inline: body });
  }
  if (!hasTag && html.trim()) out.push({ inline: html.trim() });
  return out;
}

function isManagedAnalyticsScript(script: ParsedScript): boolean {
  if ("src" in script) {
    return /googletagmanager\.com\/(gtag\/js|gtm\.js)/i.test(script.src);
  }
  return /gtag\s*\(\s*['"]config['"]|googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]+/i.test(script.inline);
}

// Every page render goes through this (root layout), so a warm-isolate
// in-memory cache avoids a blocking D1 round trip on every single request.
// Config is admin-edited and infrequent, so a short TTL is safe.
let seoConfigCache: { data: ServerSEOConfig | null; expires: number } | null = null;
const SEO_CONFIG_TTL_MS = 5 * 60 * 1000;

async function getSEOConfig(): Promise<ServerSEOConfig | null> {
  if (seoConfigCache && seoConfigCache.expires > Date.now()) return seoConfigCache.data;
  try {
    const db = (getRequestContext().env as any).DB;
    if (!db) return null;
    const row: any = await db.prepare("SELECT value FROM settings WHERE key = ?").bind("seo_config").first();
    if (row?.value) {
      const parsed: ServerSEOConfig = JSON.parse(row.value);
      // Stored analytics IDs can carry stray whitespace — sanitize at the boundary
      // so every consumer (inline script + noscript iframe) gets a clean value.
      for (const k of ["googleAnalyticsId", "googleAnalytics4Id", "googleTagManagerId", "microsoftClarityId", "metaPixelId", "hotjarId"] as const) {
        if (typeof parsed[k] === "string") (parsed as any)[k] = (parsed[k] as string).trim();
      }
      seoConfigCache = { data: parsed, expires: Date.now() + SEO_CONFIG_TTL_MS };
      return parsed;
    }
    seoConfigCache = { data: null, expires: Date.now() + SEO_CONFIG_TTL_MS };
  } catch {}
  return null;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cfg = await getSEOConfig();
  const uaId = cfg?.googleAnalyticsId?.startsWith('UA-') ? cfg.googleAnalyticsId : '';
  const ga4Id = cfg?.googleAnalytics4Id || (cfg?.googleAnalyticsId?.startsWith('G-') ? cfg.googleAnalyticsId : '');
  const customHeadScripts = cfg?.customHeadScripts
    ? parseScripts(cfg.customHeadScripts).filter((s) => !isManagedAnalyticsScript(s))
    : [];

  // Live Google rating — sourced from D1 cache (see src/lib/google-reviews.ts),
  // refreshed by /api/google-reviews. Falls back to the seeded 5.0/69 if D1
  // is unreachable. Only applies when no admin-stored organizationSchema
  // override is set (cfg.organizationSchema), same as every other field here.
  const googleReviews = await getGoogleReviewsData();

  // Google treats site-wide review-rating markup (a business rating itself, injected on
  // every page) as self-serving and structured-data-policy-ineligible. The global
  // Organization/LocalBusiness block therefore carries NO aggregateRating/review; the
  // homepage and /about attach it themselves via <OrganizationRating />, which references
  // this same @id so the two nodes merge.
  //
  // This guard MUST apply to the admin-stored override too (cfg.organizationSchema), not
  // just the static fallback constant below — an override saved via Admin → SEO &
  // Analytics previously bypassed the destructure entirely, which is how a stale
  // "4.9 / 1500 reviews" rating ended up shipping on every single page and produced GSC's
  // "Review snippets — Invalid object type" report (root cause: the merge-target rating
  // node in OrganizationRating.tsx had no `name`, and this override created a second,
  // conflicting, un-@id'd rating node alongside it).
  //
  // Do NOT reintroduce headers() here. Calling it in the root layout makes Next render
  // the internal /_not-found route dynamically under the nodejs runtime, which
  // @cloudflare/next-on-pages rejects — it broke every Pages build from 2026-08-07
  // (commit 5381646) until 2026-08-13.
  function stripRatingFromOrgSchema(schema: Record<string, unknown>): Record<string, unknown> {
    const { aggregateRating: _r, review: _rev, ...rest } = schema as Record<string, unknown> & { aggregateRating?: unknown; review?: unknown };
    return rest;
  }

  let organizationSchemaOutput: string;
  if (cfg?.organizationSchema?.trim()) {
    try {
      const parsedOverride = JSON.parse(cfg.organizationSchema);
      organizationSchemaOutput = JSON.stringify(stripRatingFromOrgSchema(parsedOverride));
    } catch {
      // Not valid JSON — pass through unchanged rather than risk breaking
      // whatever the admin has stored (better a manual review than a build error).
      organizationSchemaOutput = cfg.organizationSchema.trim();
    }
  } else {
    organizationSchemaOutput = JSON.stringify(stripRatingFromOrgSchema(organizationSchema));
  }

  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Sora & Manrope are now self-hosted via next/font/google — no external request */}
        {/* Material Symbols — stylesheet required for icon ligature rendering; no display=swap to avoid raw-text flash */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <script type="application/ld+json">{organizationSchemaOutput}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>

        {/* Google Tag Manager */}
        {cfg?.googleTagManagerId && (
          <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${cfg.googleTagManagerId.trim()}');`}</script>
        )}

        {/* Google Analytics (UA + GA4) */}
        {uaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${uaId}`} />
            <script>{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${uaId}');${ga4Id ? `gtag('config','${ga4Id}',{send_page_view:true,debug_mode:false});` : ""}`}</script>
          </>
        )}
        {/* GA4 standalone — only when no UA ID is set */}
        {ga4Id && !uaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} />
            <script>{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}',{send_page_view:true,debug_mode:false});`}</script>
          </>
        )}

        {/* Meta Pixel */}
        {cfg?.metaPixelId && (
          <script>{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${cfg.metaPixelId}'${cfg.metaPixelAdvancedMatching ? ",{'advanced_matching':true}" : ""});fbq('track','PageView');`}</script>
        )}

        {/* Microsoft Clarity */}
        {cfg?.microsoftClarityId && (
          <script>{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${cfg.microsoftClarityId}");`}</script>
        )}

        {/* Hotjar */}
        {cfg?.hotjarId && (
          <script>{`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${cfg.hotjarId},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}</script>
        )}

        {/* Custom schema markup */}
        {cfg?.schemaMarkup && (
          <script type="application/ld+json">{cfg.schemaMarkup}</script>
        )}

        {/* Custom head scripts — handles raw JS or full <script> HTML snippets */}
        {customHeadScripts.map((s, i) =>
            "src" in s
              ? <script key={i} async={s.isAsync} src={s.src} />
              : <script key={i}>{s.inline}</script>
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
              : <script key={i}>{s.inline}</script>
          )}
        {children}
      </body>
    </html>
  );
}
