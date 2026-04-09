"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export default function BestPrinterBrandsUAE() {
  const brands = [
    {
      name: "Canon",
      color: "#000000",
      pros: ["Excellent color quality", "Reliable imageRUNNER series", "Advanced scanning features", "Strong UAE service support"],
      cons: ["Premium pricing", "Higher toner costs"],
      bestFor: "Corporate offices needing color printing and document management",
      models: "imageRUNNER ADVANCE, i-SENSYS"
    },
    {
      name: "HP",
      color: "#0096D1",
      pros: ["Wide availability", "Easy to use", "Strong enterprise support", "Good for small offices"],
      cons: ["Limited color accuracy", "Can be expensive to maintain"],
      bestFor: "Small to medium businesses, retail",
      models: "LaserJet Enterprise, OfficeJet Pro"
    },
    {
      name: "Kyocera",
      color: "#E3000E",
      pros: ["Lowest cost per page", "Extremely durable", "Long-life components", "Eco-friendly"],
      cons: ["Slower color printing", "Complex interface"],
      bestFor: "High-volume offices, cost-conscious businesses",
      models: "ECOSYS, TASKalfa"
    },
    {
      name: "Xerox",
      color: "#E31837",
      pros: ["Best color technology", "Excellent workflow software", "High reliability", "Strong security"],
      cons: ["Premium pricing", "Larger footprint"],
      bestFor: "Enterprise, graphic-intensive workflows",
      models: "VersaLink, AltaLink"
    },
    {
      name: "Ricoh",
      color: "#FF6600",
      pros: ["Fast print speeds", "Great for managed print services", "Robust build quality", "Competitive pricing"],
      cons: ["Smaller dealer network in UAE", "Limited color range"],
      bestFor: "Large offices, managed print services",
      models: "IM C Series, MP Series"
    }
  ];

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      <article className="pt-32 pb-24">
        {/* Hero */}
        <section className="px-8 lg:px-24 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Buying Guide</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Best Printer Brands for UAE Businesses in 2026
            </h1>
            <p className="text-lg text-[#d3c5b0]">
              A comprehensive comparison of Canon, HP, Kyocera, Xerox, and Ricoh to help you choose the perfect printer.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-8 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#d3c5b0] text-lg leading-relaxed mb-12">
              Choosing the right printer brand is crucial for UAE businesses. Each manufacturer offers distinct advantages 
              tailored to different business needs—from cost-effective high-volume printing to premium color output. 
              Here's our expert breakdown of the top 5 printer brands available in the UAE.
            </p>

            {/* Brand Cards */}
            {brands.map((brand, index) => (
              <div key={index} className="glass-card rounded-3xl p-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
                    <span className="text-2xl font-bold" style={{ color: brand.color }}>{brand.name}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{brand.name}</h2>
                    <p className="text-[#f5be53] text-sm">{brand.bestFor}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-white mb-3">✓ Pros</h3>
                    <ul className="space-y-2">
                      {brand.pros.map((pro, i) => (
                        <li key={i} className="text-[#d3c5b0] text-sm flex items-start gap-2">
                          <span className="text-[#f5be53] mt-1">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-3">✗ Cons</h3>
                    <ul className="space-y-2">
                      {brand.cons.map((con, i) => (
                        <li key={i} className="text-[#d3c5b0] text-sm flex items-start gap-2">
                          <span className="text-red-400 mt-1">✗</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-sm text-slate-400">Popular models: <span className="text-white">{brand.models}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Recommendation */}
            <div className="glass-card rounded-3xl p-8 my-12 border-l-4 border-[#f5be53]">
              <h2 className="text-2xl font-bold text-white mb-4">Our Recommendation</h2>
              <p className="text-[#d3c5b0] mb-4">
                For most UAE businesses, we recommend <strong>Kyocera</strong> for cost-effective high-volume printing 
                or <strong>Canon</strong> for businesses requiring excellent color quality and robust document management.
              </p>
              <p className="text-[#d3c5b0]">
                Both brands offer strong UAE support networks, competitive rental options, and proven reliability 
                in the harsh Gulf climate.
              </p>
            </div>

            {/* CTA */}
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-white mb-4">Need Help Choosing?</h3>
              <p className="text-[#d3c5b0] mb-6">Our experts can recommend the best brand for your specific needs.</p>
              <a href="/get-quote" className="inline-block bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                Get Free Consultation
              </a>
            </div>
          </div>
        </section>
      </article>

      <Footer />
      <WhatsAppCTA />
    </main>
  );
}
