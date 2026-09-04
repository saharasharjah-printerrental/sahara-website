export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatsClay from "@/components/StatsClay";
import ClientsList from "@/components/ClientsClient";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Our Clients | Trusted by 1500+ UAE Businesses | Sahara Office",
  description: "Sahara Office Equipments serves 1500+ businesses across the UAE including Dubai, Abu Dhabi, Sharjah, RAK, and Fujairah. View our client portfolio of enterprise printer and photocopier deployments. ☎ +971503823969",
  keywords: "sahara office clients, uae businesses printer service, dubai printer clients, photocopier customers uae, office equipment clients dubai",
  openGraph: {
    title: "Our Clients | Sahara Office Equipments UAE",
    description: "Trusted by 1500+ businesses across the UAE. Enterprise printer and photocopier deployments for leading organizations.",
    url: "https://www.saharaprinter.com/our-clients/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/heroPrntr1.webp",
        width: 1200,
        height: 630,
        alt: "Our Clients — Sahara Office Equipments UAE",
      },
    ],
  },
  alternates: { canonical: "https://www.saharaprinter.com/our-clients/" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sahara Office Equipments",
  "alternateName": "Sahara Office Equipment Trading LLC",
  "url": "https://www.saharaprinter.com",
  "logo": "https://www.saharaprinter.com/favicon.ico",
  "telephone": "+971503823969",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Al Arabi Building, Industrial Area 11",
    "addressLocality": "Sharjah",
    "addressCountry": "AE",
    "postalCode": "47373"
  },
  "areaServed": ["UAE", "Dubai", "Abu Dhabi", "Sharjah", "RAK", "Fujairah", "Al Ain", "Ajman"],
  "sameAs": [],
};

const sectors: [string, string][] = [
  ["Real estate and property", "High-volume contract, tenancy and brochure printing, often across several branch offices that need identical devices and one consolidated bill."],
  ["Clinics and healthcare", "Reliable document handling for patient records and insurance paperwork, where a device being down for a day is not an option."],
  ["Education", "Schools and training institutes with heavy term-time peaks, where per-department print tracking keeps budgets under control."],
  ["Manufacturing and logistics", "Industrial environments in Sharjah, Mussafah and the free zones where devices face dust and heat and need servicing schedules to match."],
  ["Professional services", "Law firms, consultancies and accountancies needing secure print release and confidential document handling."],
  ["Hospitality and retail", "Front-desk and back-office printing with predictable monthly costs and rapid on-site response."],
];

const trail = [{ label: "Home", href: "/" }, { label: "Our Clients" }];

export default function OurClientsPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <main className="min-h-screen bg-surface">
        <Header />

        <section className="relative overflow-hidden px-6 py-16 pt-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-content">
            <Breadcrumbs trail={trail} />
            <Reveal>
              <h1 className="mb-4 font-sora text-display-xl font-bold text-white">
                Our Happy <span className="text-primary">Clients</span>
              </h1>
              <p className="max-w-2xl text-xl text-on-surface-variant">
                Trusted by 1500+ businesses across the UAE. We take pride in building lasting partnerships with
                companies that value quality and reliability.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-20 pt-12">
          <div className="mx-auto max-w-content">
            <ClientsList />
          </div>
        </section>

        <Section flush tone="raised" className="max-w-4xl mx-auto">
          <div className="space-y-10">
            <Reveal>
              <h2 className="mb-4 text-2xl font-bold text-white">Who we work with</h2>
              <p className="mb-4 leading-relaxed text-on-surface-variant">
                Sahara Office Equipments has supplied and serviced office print equipment across the UAE since
                2012, working from our own workshop in Sharjah Industrial Area 11. Our client base ranges from
                single-device professional offices to multi-site organisations running fleets of colour
                multifunction devices across several emirates.
              </p>
              <p className="leading-relaxed text-on-surface-variant">
                Most arrive with one of two problems: an ageing device that keeps failing at the worst moment, or
                a print bill nobody can properly account for. Both are solved the same way — the right device for
                the actual volume, on an all-inclusive contract where toner, servicing and parts are our
                responsibility rather than a series of unpredictable invoices.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="mb-6 text-2xl font-bold text-white">Sectors we serve</h2>
              <div className="grid gap-5 md:grid-cols-2">
                {sectors.map(([title, desc]) => (
                  <div key={title} className="glass-card rounded-card p-5">
                    <h3 className="mb-2 font-bold text-white">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h2 className="mb-4 text-2xl font-bold text-white">Where our clients are</h2>
              <p className="leading-relaxed text-on-surface-variant">
                We deliver, install and service across all seven emirates. Clients are concentrated in{" "}
                <a href="/photocopier-rental-sharjah/" className="text-primary hover:underline">Sharjah</a>,
                particularly the Industrial Areas and SAIF Zone, and in{" "}
                <a href="/printer-rental-dubai/" className="text-primary hover:underline">Dubai</a> across Business
                Bay, Deira and the Jebel Ali and Airport free zones. We also support organisations in{" "}
                <a href="/printer-rental-abu-dhabi/" className="text-primary hover:underline">Abu Dhabi</a> and
                Mussafah,{" "}
                <a href="/printer-rental-al-ain/" className="text-primary hover:underline">Al Ain</a>,{" "}
                <a href="/printer-rental-fujairah/" className="text-primary hover:underline">Fujairah</a>,{" "}
                <a href="/printer-rental-rak/" className="text-primary hover:underline">Ras Al Khaimah</a>, Ajman
                and Umm Al Quwain. Because parts inventory is held at our own Sharjah workshop rather than ordered
                in per job, most common faults are resolved on the first visit.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="mb-4 text-2xl font-bold text-white">Why clients stay</h2>
              <p className="mb-4 leading-relaxed text-on-surface-variant">
                Our contracts are all-inclusive by default: unlimited genuine OEM toner, all preventive and
                corrective maintenance, replacement parts, delivery and installation, with no deposit and no
                separate consumables billing. Toner levels are monitored remotely and replenished before a device
                runs out. Our target response time for a device-down call anywhere in the UAE is four hours.
              </p>
              <p className="leading-relaxed text-on-surface-variant">
                If a device turns out to be wrong for the volume, we swap it rather than leaving a client stuck
                with an asset that does not fit — which is the practical advantage of{" "}
                <a href="/services/printer-rental/" className="text-primary hover:underline">renting over buying</a>.
                For organisations that already own their equipment, the same engineering cover is available as an{" "}
                <a href="/services/amc/" className="text-primary hover:underline">annual maintenance contract</a>.
              </p>
            </Reveal>

            <Reveal className="glass-card rounded-panel p-8 text-center">
              <h2 className="mb-3 text-xl font-bold text-white">Join them</h2>
              <p className="mb-6 text-on-surface-variant">
                Tell us your monthly print volume and we will size the right device and quote the current rate.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a href="/rental-calculator/" className="btn-primary">Request a Quote</a>
                <a href="/contact/" className="rounded-pill border border-primary/40 px-8 py-3 font-bold text-primary transition-colors hover:bg-primary/10">
                  Contact Us
                </a>
              </div>
            </Reveal>
          </div>
        </Section>

        <StatsClay />

        <Footer />
      </main>
    </>
  );
}
