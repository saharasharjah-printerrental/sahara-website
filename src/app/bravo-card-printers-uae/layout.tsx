import type { Metadata } from "next";

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "Bravo RTAI & DC 3300 Card Printers UAE | Sole Authorized Dealer — Sahara",
  description: "Sahara Office Equipments is the exclusive Bravo Global distributor in UAE. RTAI 600 dpi retransfer & DC 3300 direct-to-card printers for ID card printing in Dubai, Sharjah & Abu Dhabi.",
  keywords: "bravo card printer UAE, bravo RTAI UAE, bravo DC 3300 UAE, ID card printer Dubai, card printer authorized dealer UAE, bravo global UAE distributor, retransfer card printer Dubai",
  openGraph: {
    title: "Bravo Card Printers UAE | Exclusive Authorized Distributor — Sahara",
    description: "Sole authorized Bravo Global dealer in UAE. RTAI retransfer (600 dpi, holographic film) & DC 3300 direct-to-card printer (Made in France). Sales, service & genuine consumables.",
    url: "https://www.saharaprinter.com/bravo-card-printers-uae/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "https://www.saharaprinter.com/images/og-bravo-card-printers.jpg",
        width: 1200,
        height: 630,
        alt: "Bravo RTAI and DC 3300 card printers — UAE exclusive distributor Sahara",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bravo Card Printers UAE | Sole Authorized Dealer",
    description: "Exclusive Bravo Global distributor in UAE — RTAI retransfer & DC 3300 direct-to-card printers.",
  },
  alternates: {
    canonical: "https://www.saharaprinter.com/bravo-card-printers-uae/",
  },
};

export default function BravoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
