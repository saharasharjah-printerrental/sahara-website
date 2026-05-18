import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Sahara | Printer Rental Dubai | +971503823969",
  description: "Contact Sahara Office Equipments for printer rental, repair, AMC & toner in Dubai & UAE. Call +971503823969 or WhatsApp — 4-hr response. Office: Sahara Centre, Sharjah.",
  openGraph: {
    title: "Contact Sahara | Printer Rental Dubai | +971503823969",
    description: "Reach Sahara Office Equipments for printer rental, repair & AMC in Dubai & UAE. Call or WhatsApp +971503823969.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
