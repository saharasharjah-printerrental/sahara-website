export const runtime = 'edge';
import type { Metadata } from "next";
import PvcCardQuoteClient from "./PvcCardQuoteClient";
import { SITE_URL } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "PVC Card Printer Quote UAE | Bravo RTAI & DC 3300 | Sahara",
  description: "Get a priced quote for a PVC / ID card printer in the UAE — Bravo RTAI retransfer or DC 3300 direct-to-card. Tell us your card volume, encoding and security needs; we confirm pricing the same working day. ☎ +971503823969",
  keywords: "pvc card printer quote uae, id card printer price dubai, bravo rtai quote, bravo dc 3300 quote, card printer quotation uae",
  openGraph: {
    title: "PVC Card Printer Quote UAE | Bravo RTAI & DC 3300 | Sahara",
    description: "Configure your PVC card printer requirements — model, card volume, encoding, security — and get a tailored UAE quote from Sahara Office Equipments.",
    url: `${SITE_URL}/pvc-card-printer-quote/`,
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: `${SITE_URL}/brands/bravo/bravo-rtai-page1.webp`, width: 600, height: 848 }],
  },
  alternates: { canonical: `${SITE_URL}/pvc-card-printer-quote/` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast will I get a PVC card printer quote?",
      acceptedAnswer: { "@type": "Answer", text: "Sahara Office Equipments confirms pricing and availability for Bravo card printers the same working day, usually within 2 working hours." },
    },
    {
      "@type": "Question",
      name: "What information do I need to get an accurate quote?",
      acceptedAnswer: { "@type": "Answer", text: "Your monthly card volume, whether you need magnetic stripe / smart card encoding, and whether you need lamination or holographic security features — all covered in this form." },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Bravo Card Printers UAE", item: `${SITE_URL}/bravo-card-printers-uae/` },
    { "@type": "ListItem", position: 3, name: "PVC Card Printer Quote", item: `${SITE_URL}/pvc-card-printer-quote/` },
  ],
};

export default function PvcCardPrinterQuotePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PvcCardQuoteClient />
    </>
  );
}
