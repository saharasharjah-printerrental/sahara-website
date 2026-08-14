export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatsClay from "@/components/StatsClay";
import ClientsList from "@/components/ClientsClient";

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

export default function OurClientsPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <main className="min-h-screen bg-[#030e20]">
        <Header />
        
        <div className="pt-20">
          <section className="relative py-16 px-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f5be53]/10 via-transparent to-transparent" />
            <div className="max-w-7xl mx-auto relative">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our Happy <span className="text-[#f5be53]">Clients</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl">
                Trusted by 1500+ businesses across the UAE. We take pride in building lasting partnerships with companies that value quality and reliability.
              </p>
            </div>
          </section>

          <section className="py-12 px-4 pb-20">
            <div className="max-w-7xl mx-auto">
              <ClientsList />
            </div>
          </section>

          <section className="py-16 px-4 bg-[#071325]">
            <div className="max-w-4xl mx-auto space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Who we work with</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Sahara Office Equipments has supplied and serviced office print equipment across the UAE since 2012,
                  working from our own workshop in Sharjah Industrial Area 11. Our client base ranges from
                  single-device professional offices to multi-site organisations running fleets of colour
                  multifunction devices across several emirates.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Most arrive with one of two problems: an ageing device that keeps failing at the worst moment, or a
                  print bill nobody can properly account for. Both are solved the same way — the right device for the
                  actual volume, on an all-inclusive contract where toner, servicing and parts are our responsibility
                  rather than a series of unpredictable invoices.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Sectors we serve</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    ["Real estate and property", "High-volume contract, tenancy and brochure printing, often across several branch offices that need identical devices and one consolidated bill."],
                    ["Clinics and healthcare", "Reliable document handling for patient records and insurance paperwork, where a device being down for a day is not an option."],
                    ["Education", "Schools and training institutes with heavy term-time peaks, where per-department print tracking keeps budgets under control."],
                    ["Manufacturing and logistics", "Industrial environments in Sharjah, Mussafah and the free zones where devices face dust and heat and need servicing schedules to match."],
                    ["Professional services", "Law firms, consultancies and accountancies needing secure print release and confidential document handling."],
                    ["Hospitality and retail", "Front-desk and back-office printing with predictable monthly costs and rapid on-site response."],
                  ].map(([title, desc]) => (
                    <div key={title} className="glass-card rounded-2xl p-5">
                      <h3 className="text-white font-bold mb-2">{title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Where our clients are</h2>
                <p className="text-slate-300 leading-relaxed">
                  We deliver, install and service across all seven emirates. Clients are concentrated in{" "}
                  <a href="/photocopier-rental-sharjah/" className="text-[#f5be53] hover:underline">Sharjah</a>,
                  particularly the Industrial Areas and SAIF Zone, and in{" "}
                  <a href="/printer-rental-dubai/" className="text-[#f5be53] hover:underline">Dubai</a> across Business
                  Bay, Deira and the Jebel Ali and Airport free zones. We also support organisations in{" "}
                  <a href="/printer-rental-abu-dhabi/" className="text-[#f5be53] hover:underline">Abu Dhabi</a> and
                  Mussafah,{" "}
                  <a href="/printer-rental-al-ain/" className="text-[#f5be53] hover:underline">Al Ain</a>,{" "}
                  <a href="/printer-rental-fujairah/" className="text-[#f5be53] hover:underline">Fujairah</a>,{" "}
                  <a href="/printer-rental-rak/" className="text-[#f5be53] hover:underline">Ras Al Khaimah</a>, Ajman
                  and Umm Al Quwain. Because parts inventory is held at our own Sharjah workshop rather than ordered
                  in per job, most common faults are resolved on the first visit.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Why clients stay</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Our contracts are all-inclusive by default: unlimited genuine OEM toner, all preventive and
                  corrective maintenance, replacement parts, delivery and installation, with no deposit and no separate
                  consumables billing. Toner levels are monitored remotely and replenished before a device runs out.
                  Our target response time for a device-down call anywhere in the UAE is four hours.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  If a device turns out to be wrong for the volume, we swap it rather than leaving a client stuck with
                  an asset that does not fit — which is the practical advantage of{" "}
                  <a href="/services/printer-rental/" className="text-[#f5be53] hover:underline">renting over buying</a>.
                  For organisations that already own their equipment, the same engineering cover is available as an{" "}
                  <a href="/services/amc/" className="text-[#f5be53] hover:underline">annual maintenance contract</a>.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-8 text-center">
                <h2 className="text-xl font-bold text-white mb-3">Join them</h2>
                <p className="text-slate-300 mb-6">
                  Tell us your monthly print volume and we will size the right device and quote the current rate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/rental-calculator/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                    Request a Quote
                  </a>
                  <a href="/contact/" className="border border-[#f5be53]/40 text-[#f5be53] px-8 py-3 rounded-full font-bold hover:bg-[#f5be53]/10 transition-colors">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </section>

          <StatsClay />
        </div>

        <Footer />
      </main>
    </>
  );
}