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

          <StatsClay />
        </div>

        <Footer />
      </main>
    </>
  );
}