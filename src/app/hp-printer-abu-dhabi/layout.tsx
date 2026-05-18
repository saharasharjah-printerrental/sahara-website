import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "HP Printer Abu Dhabi | Rental & Service | Sahara Office",
  description: "HP LaserJet & PageWide printers in Abu Dhabi from AED 250/mo. Rent or buy — includes free toner, maintenance & 4-hr emergency response. Serving Khalifa City, Al Reem & all Abu Dhabi. ☎ +971503823969",
  openGraph: {
    title: "HP Printer Abu Dhabi | Rental & Service | Sahara",
    description: "HP LaserJet & PageWide printers in Abu Dhabi from AED 250/mo. Zero deposit, free toner, 4-hr response.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
