"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";
import {
  ShieldCheckIcon,
  LeafIcon,
  AwardIcon,
  SettingsIcon,
  HeadsetIcon,
  TruckIcon,
  LayersIcon,
  LayerStackIcon,
} from "@/components/icons";
import type { AnimatedIconProps } from "@/components/icons/types";
import type { ComponentType } from "react";

// Material-symbol name -> animated icon component. Covers every icon key used
// across the brandData table and the default fallback below.
const iconMap: Record<string, ComponentType<AnimatedIconProps>> = {
  settings_suggest: SettingsIcon,
  savings: AwardIcon,
  eco: LeafIcon,
  precision_manufacturing: SettingsIcon,
  wifi: LayersIcon,
  security: ShieldCheckIcon,
  cloud: LayerStackIcon,
  support_agent: HeadsetIcon,
  touch_app: SettingsIcon,
  integration_instructions: LayersIcon,
  energy_savings: LeafIcon,
  palette: AwardIcon,
  water_drop: LeafIcon,
  format_size: LayersIcon,
  print: SettingsIcon,
  hub: LayersIcon,
  speed: TruckIcon,
  verified: ShieldCheckIcon,
  local_shipping: TruckIcon,
  build_circle: SettingsIcon,
};

const brandData: Record<string, any> = {
  kyocera: { name: "Kyocera", tagline: "Document Solutions", heroImg: "/images/printer-kyocera.webp", description: "Kyocera ECOSYS technology delivers industry-leading reliability with long-life components that reduce waste and total cost of ownership.", features: [{ icon: "settings_suggest", title: "ECOSYS Technology", desc: "Long-life components reduce waste and total cost of ownership." }, { icon: "savings", title: "Cost Efficiency", desc: "Industry-low cost per page with exceptional durability." }, { icon: "eco", title: "Eco-Friendly", desc: "Zero waste laser technology with minimal environmental footprint." }, { icon: "precision_manufacturing", title: "Japanese Engineering", desc: "Decades of reliability built into every component." }], products: [{ name: "ECOSYS P6230cdn", specs: ["30 PPM", "1200 DPI"], desc: "Color laser for demanding workgroups." }, { name: "ECOSYS M6235cidn", specs: ["35 PPM", "1200 DPI"], desc: "Advanced color MFP with dual scanning." }, { name: "TASKalfa 3253ci", specs: ["32 PPM", "1200 DPI"], desc: "High-performance color MFP for professionals." }] },
  brother: { name: "Brother", tagline: "At Your Side", heroImg: "/images/printer-brother.webp", description: "Brother delivers award-winning reliability with advanced wireless connectivity, cloud integration, and enterprise-grade security features.", features: [{ icon: "wifi", title: "Wireless Freedom", desc: "Industry-leading wireless connectivity for flexible office deployment." }, { icon: "security", title: "Secure by Design", desc: "Advanced security features including biometric authentication." }, { icon: "cloud", title: "Cloud Integration", desc: "Seamless connectivity with major cloud platforms." }, { icon: "support_agent", title: "Reliable Support", desc: "Award-winning customer service and warranty programs." }], products: [{ name: "HL-L6400DW", specs: ["48 PPM", "1200 DPI"], desc: "High-volume monochrome laser for enterprise." }, { name: "MFC-L8900CDW", specs: ["32 PPM", "1200 DPI", "Duplex"], desc: "Color laser all-in-one for busy offices." }, { name: "ADS-2700W", specs: ["40 SPM", "Duplex ADF"], desc: "Professional desktop scanner with wireless." }] },
  sharp: { name: "Sharp", tagline: "Be Original", heroImg: "/images/printer-ricoh.webp", description: "Sharp multifunction printers combine intuitive touch-screen operation with enterprise security and seamless third-party integrations.", features: [{ icon: "touch_app", title: "Smart Operation", desc: "Intuitive touch-screen interface with customizable workflow." }, { icon: "security", title: "Enterprise Security", desc: "Multiple layers of security protection for sensitive documents." }, { icon: "integration_instructions", title: "Sharp OSA", desc: "Open System Architecture for third-party integrations." }, { icon: "energy_savings", title: "Energy Efficient", desc: "Eco-friendly features that reduce power consumption." }], products: [{ name: "MX-B426P", specs: ["42 PPM", "1200 DPI"], desc: "High-speed monochrome production printer." }, { name: "MX-C358F", specs: ["35 PPM", "1200 DPI", "Color"], desc: "Color MFP with advanced finishing options." }, { name: "MX-6070F", specs: ["60 PPM", "1200 DPI"], desc: "Production-class color multifunctional system." }] },
  epson: { name: "Epson", tagline: "Exceed Your Vision", heroImg: "/images/printer-lexmark.webp", description: "Epson PrecisionCore and Heat-Free technology delivers exceptional print quality with faster first-page output and lower energy consumption.", features: [{ icon: "palette", title: "PrecisionCore", desc: "Revolutionary inkjet technology for exceptional print quality." }, { icon: "water_drop", title: "Heat-Free Printing", desc: "No heat means faster first-page-out and lower energy use." }, { icon: "format_size", title: "Wide Format", desc: "Industry-leading large-format printers for CAD and graphics." }, { icon: "print", title: "Business Inkjet", desc: "High-speed business printers with pigment inks for durability." }], products: [{ name: "WorkForce Pro WF-C8690", specs: ["35 PPM", "4800 DPI", "Color"], desc: "Enterprise color inkjet MFP." }, { name: "SureColor T3170", specs: ["24\" Wide", "A1/13s"], desc: "Compact wide-format plotter for CAD/GIS." }, { name: "Expression Photo XP-970", specs: ["11x17", "6-Color"], desc: "Wide-format photo printer for creatives." }] },
  "konica-minolta": { name: "Konica Minolta", tagline: "Giving Shape to Ideas", heroImg: "/images/heroPrntr1.webp", description: "Konica Minolta bizhub multifunction printers combine award-winning colour quality with enterprise security and intelligent workflow automation.", features: [{ icon: "palette", title: "bizhub Colour", desc: "Award-winning colour accuracy for professional document output." }, { icon: "security", title: "bizSecure", desc: "Enterprise-grade security with user authentication and data encryption." }, { icon: "hub", title: "Workflow Automation", desc: "Intelligent capture and routing for streamlined document workflows." }, { icon: "speed", title: "High-Volume Ready", desc: "Built for 20,000–50,000 pages/month in demanding office environments." }], products: [{ name: "bizhub C300i", specs: ["30 PPM", "1200 DPI", "Color"], desc: "Versatile A3 colour MFP for busy workgroups." }, { name: "bizhub C450i", specs: ["45 PPM", "1200 DPI", "Color"], desc: "High-performance colour MFP with advanced finishing." }, { name: "bizhub 4750i", specs: ["47 PPM", "1200 DPI", "Mono"], desc: "Compact A4 monochrome MFP for productive teams." }] },
};

const defaultBrand = (slug: string) => ({
  name: slug.charAt(0).toUpperCase() + slug.slice(1),
  tagline: "Premium Partner",
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
  // Resolve synchronously so the brand copy is present in the server-rendered
  // HTML. Crawlers never run useEffect, so deferring this hid the entire page
  // body from Google. Unknown slugs are already rejected by notFound() in
  // brands/[slug]/page.tsx.
  const [brand, setBrand] = useState<any>(() =>
    brandData[slug] ? { ...brandData[slug], slug } : { ...defaultBrand(slug), slug }
  );

  // CMS overrides from the admin dashboard are layered on after hydration.
  useEffect(() => {
    const stored = localStorage.getItem("sahara_brands");
    if (!stored) return;
    try {
      const found = JSON.parse(stored).find((b: any) => b.slug === slug && b.isActive);
      if (found) setBrand({ ...found, slug });
    } catch {
      /* corrupt cache — keep the server-rendered brand data */
    }
  }, [slug]);

  const data = brand;
  const trail = [{ label: "Home", href: "/" }, { label: "Products", href: "/products/" }, { label: `${data.name} Printers UAE` }];

  return (
    <main className="min-h-screen bg-surface">
      <Header />

      <section className="relative overflow-hidden px-6 pb-20 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface to-surface-low" />
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="relative mx-auto max-w-content">
          <Breadcrumbs trail={trail} />
          <div className="grid items-center gap-14 md:grid-cols-2">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-3 rounded-pill border border-primary/20 bg-surface-mid/60 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-caption font-medium uppercase tracking-widest text-primary">Authorized {data.name} Partner</span>
              </div>
              <h1 className="font-sora text-display-xl font-extrabold tracking-tight text-white">
                {data.name} Printers <span className="text-primary">UAE</span>
              </h1>
              <div className="mt-6 rounded-panel border border-primary/20 bg-surface-low p-5">
                <p className="mb-2 text-caption font-bold uppercase tracking-widest text-primary">Authorized {data.name} Dealer in UAE</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Sahara Office Equipments is an authorized {data.name} dealer in UAE — sales, rental from AED
                  250/month, AMC contracts, and on-site repair across Dubai, Sharjah, and Abu Dhabi. Call
                  +971503823969.
                </p>
              </div>
              <p className="mt-6 max-w-xl text-body leading-relaxed text-muted">
                As an authorized Sahara partner, we deliver {data.name}&apos;s enterprise solutions with expert
                support, competitive pricing, and full warranty coverage.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href={`/rental-calculator/?brand=${slug}`} className="btn-primary">Enquire for {data.name} Models</a>
                <a href="#products" className="btn-secondary">View Products</a>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative">
              <div className="absolute -inset-10 rounded-full bg-primary/10 blur-[120px]" />
              <div className="relative overflow-hidden rounded-panel shadow-2xl">
                <img src={data.heroImg} alt={`${data.name} Printer`} className="h-full w-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section title={`Why Choose ${data.name}`} subtitle="Premium technology backed by Sahara's expert support and maintenance services." align="center" flush>
        <div className="grid gap-8 md:grid-cols-4">
          {data.features.map((f: any) => {
            const Icon = iconMap[f.icon] ?? SettingsIcon;
            return (
              <div key={f.title} className="p-2 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-surface-mid/60 text-primary">
                  <Icon size={28} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{f.title}</h3>
                <p className="text-sm text-on-surface-variant">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {data.products.length > 0 && (
        <Section id="products" title={`Popular ${data.name} Models`}>
          <div className="grid gap-8 md:grid-cols-3">
            {data.products.map((p: any) => (
              <Reveal key={p.name} className="h-full">
                <div className="glass-card group h-full rounded-panel p-8 transition-transform duration-500 hover:-translate-y-2">
                  <div className="mb-8 flex aspect-square items-center justify-center overflow-hidden rounded-card bg-surface-low">
                    <span className="text-6xl font-bold text-outline">{data.name.charAt(0)}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{p.name}</h3>
                  <p className="mb-4 text-sm text-on-surface-variant">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 border-t border-white/5 py-4">
                    {p.specs.map((s: string) => (
                      <span key={s} className="rounded-pill bg-surface-mid px-2 py-1 text-xs text-primary">{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {brandFaqs && brandFaqs.length > 0 && (
        <Section title={`${data.name} Printers — FAQ`} align="center" tone="ink" className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {brandFaqs.map((faq) => (
              <Reveal key={faq.q}>
                <div className="glass-card rounded-card p-6">
                  <h3 className="mb-2 font-semibold text-white">{faq.q}</h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CtaBand
        title={`Explore ${data.name} Solutions?`}
        body={`Contact our ${data.name} specialists for a customized quote and demonstration.`}
        primary={{ label: `Get ${data.name} Quote`, href: `/rental-calculator/?brand=${slug}` }}
      />

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
