import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Printer Repair Dubai | 4-Hr Response | Sahara Office",
  description: "Fast printer & photocopier repair in Dubai — 4-hour emergency response. Canon, HP, Kyocera, Xerox, Ricoh specialists. On-site repair, same-day service, free diagnosis. ☎ +971503823969",
  alternates: { canonical: "https://www.saharaprinter.com/printer-repair-dubai/" },
  openGraph: {
    title: "Printer Repair Dubai | 4-Hr Response | Sahara",
    description: "Same-day printer repair in Dubai — Canon, HP, Kyocera, Xerox. 4-hour emergency response, free diagnosis.",
    url: "https://www.saharaprinter.com/printer-repair-dubai/",
    images: [
      {
        url: "/images/heroPrntr1.webp",
        width: 1200,
        height: 630,
        alt: "Printer Repair Dubai — Sahara Office Equipments",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
