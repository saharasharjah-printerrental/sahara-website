import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Copier Lease UAE | Long-Term Photocopier Rental | Sahara",
  description: "Flexible photocopier leasing across UAE — 12 to 60-month terms. Canon & Kyocera multifunction copiers from AED 300/mo. Zero deposit, all-inclusive AMC, free toner. ☎ +971503823969",
  alternates: { canonical: "https://www.saharaprinter.com/copier-lease-uae/" },
  openGraph: {
    title: "Copier Lease UAE | Photocopier Rental | Sahara Office",
    description: "Flexible copier leasing in UAE. Canon & Kyocera multifunction copiers from AED 300/mo. Zero deposit, AMC included.",
    url: "https://www.saharaprinter.com/copier-lease-uae/",
    images: [
      {
        url: "/images/heroPrntr1.webp",
        width: 1200,
        height: 630,
        alt: "Copier Lease UAE — Sahara Office Equipments",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
