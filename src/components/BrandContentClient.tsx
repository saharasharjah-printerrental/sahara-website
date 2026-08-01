"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

const brandData: Record<string, any> = {
  kyocera: { name: "Kyocera", tagline: "Document Solutions", color: "#E3000E", heroImg: "/images/printer-kyocera.webp", description: "Kyocera ECOSYS technology delivers industry-leading reliability with long-life components that reduce waste and total cost of ownership.", features: [{ icon: "settings_suggest", title: "ECOSYS Technology", desc: "Long-life components reduce waste and total cost of ownership." }, { icon: "savings", title: "Cost Efficiency", desc: "Industry-low cost per page with exceptional durability." }, { icon: "eco", title: "Eco-Friendly", desc: "Zero waste laser technology with minimal environmental footprint." }, { icon: "precision_manufacturing", title: "Japanese Engineering", desc: "Decades of reliability built into every component." }], products: [{ name: "ECOSYS P6230cdn", specs: ["30 PPM", "1200 DPI"], desc: "Color laser for demanding workgroups." }, { name: "ECOSYS M6235cidn", specs: ["35 PPM", "1200 DPI"], desc: "Advanced color MFP with dual scanning." }, { name: "TASKalfa 3253ci", specs: ["32 PPM", "1200 DPI"], desc: "High-performance color MFP for professionals." }] },
  brother: { name: "Brother", tagline: "At Your Side", color: "#000000", heroImg: "/images/printer-brother.webp", description: "Brother delivers award-winning reliability with advanced wireless connectivity, cloud integration, and enterprise-grade security features.", features: [{ icon: "wifi", title: "Wireless Freedom", desc: "Industry-leading wireless connectivity for flexible office deployment." }, { icon: "security", title: "Secure by Design", desc: "Advanced security features including biometric authentication." }, { icon: "cloud", title: "Cloud Integration", desc: "Seamless connectivity with major cloud platforms." }, { icon: "support_agent", title: "Reliable Support", desc: "Award-winning customer service and warranty programs." }], products: [{ name: "HL-L6400DW", specs: ["48 PPM", "1200 DPI"], desc: "High-volume monochrome laser for enterprise." }, { name: "MFC-L8900CDW", specs: ["32 PPM", "1200 DPI", "Duplex"], desc: "Color laser all-in-one for busy offices." }, { name: "ADS-2700W", specs: ["40 SPM", "Duplex ADF"], desc: "Professional desktop scanner with wireless." }] },
  sharp: { name: "Sharp", tagline: "Be Original", color: "#000000", heroImg: "/images/printer-ricoh.webp", description: "Sharp multifunction printers combine intuitive touch-screen operation with enterprise security and seamless third-party integrations.", features: [{ icon: "touch_app", title: "Smart Operation", desc: "Intuitive touch-screen interface with customizable workflow." }, { icon: "security", title: "Enterprise Security", desc: "Multiple layers of security protection for sensitive documents." }, { icon: "integration_instructions", title: "Sharp OSA", desc: "Open System Architecture for third-party integrations." }, { icon: "energy_savings", title: "Energy Efficient", desc: "Eco-friendly features that reduce power consumption." }], products: [{ name: "MX-B426P", specs: ["42 PPM", "1200 DPI"], desc: "High-speed monochrome production printer." }, { name: "MX-C358F", specs: ["35 PPM", "1200 DPI", "Color"], desc: "Color MFP with advanced finishing options." }, { name: "MX-6070F", specs: ["60 PPM", "1200 DPI"], desc: "Production-class color multifunctional system." }] },
  epson: { name: "Epson", tagline: "Exceed Your Vision", color: "#0033A0", heroImg: "/images/printer-lexmark.webp", description: "Epson PrecisionCore and Heat-Free technology delivers exceptional print quality with faster first-page output and lower energy consumption.", features: [{ icon: "palette", title: "PrecisionCore", desc: "Revolutionary inkjet technology for exceptional print quality." }, { icon: "water_drop", title: "Heat-Free Printing", desc: "No heat means faster first-page-out and lower energy use." }, { icon: "format_size", title: "Wide Format", desc: "Industry-leading large-format printers for CAD and graphics." }, { icon: "print", title: "Business Inkjet", desc: "High-speed business printers with pigment inks for durability." }], products: [{ name: "WorkForce Pro WF-C8690", specs: ["35 PPM", "4800 DPI", "Color"], desc: "Enterprise color inkjet MFP." }, { name: "SureColor T3170", specs: ["24\" Wide", "A1/13s"], desc: "Compact wide-format plotter for CAD/GIS." }, { name: "Expression Photo XP-970", specs: ["11x17", "6-Color"], desc: "Wide-format photo printer for creatives." }] },
  "konica-minolta": { name: "Konica Minolta", tagline: "Giving Shape to Ideas", color: "#0033A0", heroImg: "/images/heroPrntr1.webp", description: "Konica Minolta bizhub multifunction printers combine award-winning colour quality with enterprise security and intelligent workflow automation.", features: [{ icon: "palette", title: "bizhub Colour", desc: "Award-winning colour accuracy for professional document output." }, { icon: "security", title: "bizSecure", desc: "Enterprise-grade security with user authentication and data encryption." }, { icon: "hub", title: "Workflow Automation", desc: "Intelligent capture and routing for streamlined document workflows." }, { icon: "speed", title: "High-Volume Ready", desc: "Built for 20,000–50,000 pages/month in demanding office environments." }], products: [{ name: "bizhub C300i", specs: ["30 PPM", "1200 DPI", "Color"], desc: "Versatile A3 colour MFP for busy workgroups." }, { name: "bizhub C450i", specs: ["45 PPM", "1200 DPI", "Color"], desc: "High-performance colour MFP with advanced finishing." }, { name: "bizhub 4750i", specs: ["47 PPM", "1200 DPI", "Mono"], desc: "Compact A4 monochrome MFP for productive teams." }] },
};

const defaultBrand = (slug: string) => ({
  name: slug.charAt(0).toUpperCase() + slug.slice(1),
  tagline: "Premium Partner",
  color: "#f5be53",
  heroImg: "/images/heroPrntr1.webp",
  description: "Certified dealer with full manufacturer warranty, expert support, and maintenance services across the UAE.",
  features: [
    { icon: "verified", title: "Authorized Partner", desc: "Certified dealer with full manufacturer warranty support." },
    { icon: "support_agent", title: "Expert Support", desc: "Trained technicians for installation, maintenance, and repairs." },
    { icon: "local_shipping", title: "Fast Delivery", desc: "Quick delivery and professional setup across all locations." },
    { icon: "build_circle", title: "Maintenance Included", desc: "Comprehensive service plans for worry-free operation." },
  ],
  products: [],
});

export default function BrandContentClient({ slug, brandFaqs }: { slug: string; brandFaqs?: { q: string; a: string }[] }) {
  const router = useRouter();
  const [brand, setBrand] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sahara_brands");
    if (stored) {
      const brands = JSON.parse(stored);
      const found = brands.find((b: any) => b.slug === slug && b.isActive);
      if (found) setBrand(found);
      else if (brandData[slug]) setBrand({ ...brandData[slug], slug });
      else router.push("/products");
    } else {
      if (brandData[slug]) setBrand({ ...brandData[slug], slug });
      else router.push("/products");
    }
  }, [slug, router]);

  if (!brand) {
    return (
      <main className="min-h-screen bg-[#071325]">
        <Header />
        <div className="pt-32 text-center">
          <p className="text-[#f5be53]">Loading...</p>
        </div>
        <Footer />
      </main>
    );
  }

  const data = brandData[slug] || { ...defaultBrand(slug), slug };

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />

      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#f5be53]/10 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#142032]/60 border border-[#f5be53]/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#f5be53] animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-[#f5be53] font-medium">Authorized {data.name} Partner</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                {data.name} <span className="text-[#f5be53]">Partner</span>
              </h1>
              {/* AEO Answer Block */}
              <div className="bg-[#0d1b2e] border border-[#f5be53]/20 rounded-2xl p-4 mb-6">
                <p className="text-xs font-bold text-[#f5be53] uppercase tracking-widest mb-1">Authorized {data.name} Dealer in UAE</p>
                <p className="text-[#d3c5b0] text-sm leading-relaxed">
                  Sahara Office Equipments is an authorized {data.name} dealer in UAE — sales, rental from AED 250/month,
                  AMC contracts, and on-site repair across Dubai, Sharjah, and Abu Dhabi. Call +971503823969.
                </p>
              </div>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl leading-relaxed">
                As an authorized Sahara partner, we deliver {data.name}&apos;s enterprise solutions with expert support, competitive pricing, and full warranty coverage.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={`/rental-calculator/?brand=${slug}`} className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform inline-block shadow-xl shadow-[#f5be53]/20">
                  Enquire for {data.name} Models
                </a>
                <a href="#products" className="glass-card text-white px-8 py-4 rounded-full font-bold hover:bg-[#2a3548] transition-all border border-[#f5be53]/20 inline-block">
                  View Products
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-[#f5be53]/10 blur-[120px] rounded-full" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#030e20]">
                <img src={data.heroImg} alt={`${data.name} Printer`} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose {data.name}</h2>
            <p className="text-[#d3c5b0] max-w-2xl mx-auto">Premium technology backed by Sahara's expert support and maintenance services.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {data.features.map((f: any, i: number) => (
              <div key={i} className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#142032]/60 flex items-center justify-center border border-[#f5be53]/20 mb-4">
                  <span className="material-symbols-outlined text-3xl text-[#f5be53]">{f.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-[#d3c5b0]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {data.products.length > 0 && (
        <section id="products" className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Popular {data.name} Models</h2>
              <div className="h-1 w-20 bg-[#f5be53] rounded-full" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {data.products.map((p: any, i: number) => (
                <div key={i} className="glass-card rounded-[32px] p-8 group hover:-translate-y-2 transition-transform duration-500">
                  <div className="aspect-square mb-8 rounded-2xl overflow-hidden bg-[#101c2e] flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-slate-600">{data.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                  <p className="text-[#d3c5b0] text-sm mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 py-4 border-t border-white/5">
                    {p.specs.map((s: string, j: number) => (
                      <span key={j} className="px-2 py-1 rounded-full bg-[#142032] text-xs text-[#f5be53]">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {brandFaqs && brandFaqs.length > 0 && (
        <section className="py-16 px-8 lg:px-24" style={{ background: '#050d1a' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">{data.name} Printers — FAQ</h2>
            <div className="space-y-4">
              {brandFaqs.map((faq, i) => (
                <div key={i} className="glass-card rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-[#d3c5b0] text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto glass-card rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#f5be53]/5 -z-10" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore {data.name} Solutions?</h2>
          <p className="text-[#d3c5b0] mb-10 max-w-2xl mx-auto text-lg">Contact our {data.name} specialists for a customized quote and demonstration.</p>
          <a href={`/rental-calculator/?brand=${slug}`} className="px-12 py-5 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-[#f5be53]/30 inline-block">
            Get {data.name} Quote
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}