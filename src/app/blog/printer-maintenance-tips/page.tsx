"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";

export default function PrinterMaintenanceTips() {
  const tips = [
    {
      num: "01",
      title: "Keep It Clean",
      desc: "Dust and debris are printer enemies. Wipe down the exterior weekly. Use a soft, dry cloth for the scanner glass. Never use harsh chemicals.",
      icon: "cleaning_services"
    },
    {
      num: "02",
      title: "Use Quality Paper",
      desc: "Cheap paper causes jams and debris buildup. In the UAE's humidity, store paper in a cool, dry place. Use paper within 6 months of opening.",
      icon: "description"
    },
    {
      num: "03",
      title: "Print Regularly",
      desc: "Inkjet printers can clog if sitting idle. Print at least a few pages weekly to keep ink flowing. This is especially important in hot UAE climates.",
      icon: "print"
    },
    {
      num: "04",
      title: "Replace Toner Promptly",
      desc: "Don't wait for print quality to degrade. Replace toner when low to avoid damage to the imaging drum. Use only genuine OEM toners.",
      icon: "inventory_2"
    },
    {
      num: "05",
      title: "Avoid Overloading",
      desc: "Follow the paper tray capacity limits. Overloading causes paper jams and misfeeds. Allow proper airflow around the printer.",
      icon: "stack"
    },
    {
      num: "06",
      title: "Update Firmware",
      desc: "Manufacturers release updates to fix bugs and improve performance. Check for updates monthly or enable automatic updates.",
      icon: "system_update"
    },
    {
      num: "07",
      title: "Monitor Usage",
      desc: "Track page counts and monitor for unusual patterns. Early detection of issues saves costly repairs. Most MFPs have built-in counters.",
      icon: "monitoring"
    },
    {
      num: "08",
      title: "Proper Power Cycling",
      desc: "Turn off the printer fully at least once a week. This clears memory and prevents software glitches. Use surge protectors.",
      icon: "power"
    },
    {
      num: "09",
      title: "Professional Servicing",
      desc: "Schedule professional maintenance annually. Technicians clean internal components, replace worn parts, and calibrate for optimal performance.",
      icon: "engineering"
    },
    {
      num: "10",
      title: "Know When to Call Experts",
      desc: "Persistent jams, unusual noises, error codes, or degraded print quality mean it's time to call a professional. Don't attempt major repairs yourself.",
      icon: "support_agent"
    }
  ];

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      <article className="pt-32 pb-24">
        {/* Hero */}
        <section className="px-8 lg:px-24 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Tips</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              10 Printer Maintenance Tips to Extend Machine Life
            </h1>
            <p className="text-lg text-[#d3c5b0]">
              Keep your office printer running smoothly with these essential maintenance practices.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-8 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#d3c5b0] text-lg leading-relaxed mb-12">
              A well-maintained printer can last 5-10 years or more. In the UAE's demanding environment—with high temperatures, 
              humidity, and dust—proper maintenance is even more critical. Follow these 10 tips to maximize your printer's lifespan 
              and minimize downtime.
            </p>

            {/* Tips Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="glass-card p-6 rounded-3xl hover:scale-[1.02] transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#f5be53]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#f5be53] font-bold">{tip.num}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
                      <p className="text-[#d3c5b0] text-sm leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pro Tip */}
            <div className="glass-card rounded-3xl p-8 my-12 border-2 border-[#f5be53]/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f5be53]">lightbulb</span>
                Pro Tip: Consider AMC
              </h3>
              <p className="text-[#d3c5b0]">
                The best way to ensure your printer lasts is an Annual Maintenance Contract (AMC). For a fixed yearly fee, 
                you get regular professional servicing, priority support, and all parts/repairs included. It costs less 
                than emergency repairs and keeps your machine in top condition.
              </p>
            </div>

            {/* CTA */}
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-white mb-4">Need Professional Maintenance?</h3>
              <p className="text-[#d3c5b0] mb-6">We offer printer AMC plans covering all brands with full service.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/services/amc" className="inline-block bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                  View AMC Plans
                </a>
                <a href="/get-quote" className="inline-block glass-card px-8 py-4 rounded-full font-bold text-white hover:bg-[#2a3548] transition-colors">
                  Get Free Quote
                </a>
              </div>
            </div>
          </div>
        </section>
      </article>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
