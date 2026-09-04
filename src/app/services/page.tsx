export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import CtaBand from "@/components/ui/CtaBand";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  IdCardIcon,
  ShieldCheckIcon,
  SettingsIcon,
  ClockIcon,
  TruckIcon,
  HeadsetIcon,
  AwardIcon,
  LayersIcon,
} from "@/components/icons";

// Previously a permanentRedirect to /services/printer-rental/ — this URL is
// linked from the header, footer, and every service page's breadcrumb, and
// carried 108 impressions on Google (GSC Aug 2026 export) that could never
// convert because the redirect target wasn't a services index. This is now a
// real page rather than routing all of that traffic and link equity into one
// sibling service.
export const metadata: Metadata = {
  title: "Printer & Office Equipment Services UAE | Sahara Office Equipments",
  description: "All Sahara Office Equipments services in one place — printer & photocopier rental, AMC, repair, PVC card printers, toner & spare parts, paper shredder rental, and PaperCut print management. Dubai, Sharjah & Abu Dhabi.",
  keywords: "printer services uae, office equipment services dubai, printer rental amc repair uae",
  openGraph: {
    title: "Printer & Office Equipment Services UAE | Sahara Office Equipments",
    description: "All Sahara services in one place — rental, AMC, repair, PVC card printers, toner & spare parts, and more across the UAE.",
    url: "https://www.saharaprinter.com/services/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/" },
};

const services = [
  { icon: TruckIcon, title: "Printer Rental", body: "A4 and A3 printers from AED 250/month — zero deposit, unlimited toner, maintenance included.", href: "/services/printer-rental/" },
  { icon: TruckIcon, title: "Photocopier Rental", body: "Multifunction photocopiers on flexible monthly terms across the UAE.", href: "/services/photocopier-rental/" },
  { icon: SettingsIcon, title: "Annual Maintenance (AMC)", body: "Fixed monthly plans from AED 299 covering parts, labour, and preventive servicing.", href: "/services/amc/" },
  { icon: HeadsetIcon, title: "Printer Repair", body: "4-hour emergency response, OEM parts, certified technicians across all emirates.", href: "/services/repair/" },
  { icon: IdCardIcon, title: "PVC Card Printers", body: "Bravo RTAI & DC 3300 — authorised exclusive UAE reseller. Rent, buy, or have cards printed.", href: "/bravo-card-printers-uae/" },
  { icon: LayersIcon, title: "Toner & Spare Parts", body: "Genuine OEM toner, drums, and spare parts in stock for same-day dispatch.", href: "/services/printer-spare-parts/" },
  { icon: ShieldCheckIcon, title: "Paper Shredder Rental", body: "Secure document destruction equipment on flexible rental terms.", href: "/services/paper-shredder-rental/" },
  { icon: SettingsIcon, title: "PaperCut Print Management", body: "Track, control, and reduce print costs across your organisation.", href: "/services/papercut-print-management/" },
  { icon: ClockIcon, title: "Plotter Maintenance", body: "Servicing and support for wide-format plotters and large-format printers.", href: "/services/plotter-maintenance/" },
];

const cardServices = [
  { icon: ClockIcon, title: "PVC Card Printer Rental", body: "Short and long-term rental of the Bravo RTAI and DC 3300.", href: "/services/pvc-card-printer-rental/" },
  { icon: AwardIcon, title: "PVC Card Printer Sales", body: "Buy the RTAI or DC 3300 with a 3-year warranty.", href: "/services/pvc-card-printer-sales/" },
  { icon: IdCardIcon, title: "PVC Card Printing Services", body: "ID, security, hologram, wooden and transparent cards — printed and delivered.", href: "/services/pvc-card-printing-services/" },
];

const trail = [{ label: "Home", href: "/" }, { label: "Services" }];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services/" },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Sahara Office Equipments Services",
  "itemListElement": [...services, ...cardServices].map((s, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": s.title,
    "url": `https://www.saharaprinter.com${s.href}`,
  })),
};

export default function ServicesHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <main className="min-h-screen bg-surface">
        <Header />

        <section className="px-6 pt-32 pb-16">
          <div className="max-w-content mx-auto">
            <Breadcrumbs trail={trail} />
            <h1 className="font-sora text-display-xl font-extrabold text-white">Services</h1>
            <p className="mt-5 max-w-2xl text-body text-muted">
              Everything Sahara Office Equipments offers, in one place — printer and photocopier
              rental, maintenance, repair, PVC card printers, and consumables, across Dubai, Sharjah,
              Abu Dhabi, and all UAE emirates.
            </p>
          </div>
        </section>

        <Section flush eyebrow="Core Services" title="Printers, photocopiers & maintenance">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <FeatureCard key={s.href} icon={s.icon} title={s.title} body={s.body} href={s.href} delay={(i % 3) * 0.05} />
            ))}
          </div>
        </Section>

        <Section eyebrow="PVC Card Printers" title="Bravo RTAI & DC 3300 — rent, buy, or have cards printed" tone="raised">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cardServices.map((s, i) => (
              <FeatureCard key={s.href} icon={s.icon} title={s.title} body={s.body} href={s.href} delay={(i % 3) * 0.05} />
            ))}
          </div>
        </Section>

        <CtaBand
          title="Not Sure Which Service You Need?"
          body="Tell us what you're trying to solve and we'll point you to the right plan — no obligation."
          primary={{ label: "Get a Quote", href: "/rental-calculator/" }}
          secondary={{ label: "Call: +971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Footer />
        <WhatsAppCTA />
        <JumpToTop />
      </main>
    </>
  );
}
