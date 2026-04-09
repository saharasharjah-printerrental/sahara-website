"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export default function ChooseRightOfficePrinter() {
  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      <article className="pt-32 pb-24">
        {/* Hero */}
        <section className="px-8 lg:px-24 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Guide</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              How to Choose the Right Printer for Your Office
            </h1>
            <p className="text-lg text-[#d3c5b0]">
              A step-by-step decision guide for UAE businesses to find their perfect match.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-8 lg:px-24">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <p className="text-[#d3c5b0] text-lg leading-relaxed mb-8">
              Selecting the wrong printer can cost your business thousands in wasted resources. 
              Use this guide to match your needs to the right machine—whether you're renting or buying.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">1. Assess Your Monthly Print Volume</h2>
            <p className="text-[#d3c5b0] mb-4">
              The first question to ask: <strong>How much do you print?</strong>
            </p>
            <ul className="list-disc list-inside text-[#d3c5b0] space-y-2 mb-8">
              <li><strong>Under 1,000 pages/month</strong> - Entry-level A4 laser or inkjet</li>
              <li><strong>1,000-5,000 pages/month</strong> - Mid-range MFP (multifunction)</li>
              <li><strong>5,000-15,000 pages/month</strong> - High-volume A3 copier</li>
              <li><strong>15,000+ pages/month</strong> - Enterprise production devices</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">2. Color vs. Black & White</h2>
            <p className="text-[#d3c5b0] mb-6">
              Color printers cost 30-50% more to run. Ask yourself: Does your business really need color printing on a daily basis?
            </p>
            <div className="glass-card rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-white mb-3">Choose Color If:</h3>
              <ul className="list-disc list-inside text-[#d3c5b0] space-y-1">
                <li>Marketing materials, presentations</li>
                <li>Client-facing documents</li>
                <li>Design, architecture work</li>
              </ul>
              <h3 className="font-bold text-white mt-4 mb-3">Stick to B&W If:</h3>
              <ul className="list-disc list-inside text-[#d3c5b0] space-y-1">
                <li>Invoices, contracts, internal docs</li>
                <li>Cost savings are priority</li>
                <li>High-volume monochrome work</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">3. Paper Size Requirements</h2>
            <p className="text-[#d3c5b0] mb-6">
              <strong>A4 only</strong> - Most small offices need nothing more.<br/>
              <strong>A3 required</strong> - Legal, architectural, design work needs larger format.<br/>
              <strong>Specialty</strong> - Booklets, banners need specialized finishing.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">4. Network & Connectivity</h2>
            <p className="text-[#d3c5b0] mb-6">
              Modern offices need more than USB. Consider:
            </p>
            <ul className="list-disc list-inside text-[#d3c5b0] space-y-2 mb-8">
              <li><strong>Ethernet</strong> - Essential for shared office printers</li>
              <li><strong>WiFi</strong> - Flexible placement, no cables</li>
              <li><strong>Cloud printing</strong> - Print from anywhere, any device</li>
              <li><strong>Mobile printing</strong> - AirPrint, Google Cloud Print</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">5. Key Features to Consider</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="glass-card p-4 rounded-xl">
                <h4 className="font-bold text-white mb-2">Must-Have</h4>
                <ul className="text-[#d3c5b0] text-sm space-y-1">
                  <li>Print/Copy/Scan (at minimum)</li>
                  <li>Automatic document feeder</li>
                  <li>Duplex (double-sided) printing</li>
                </ul>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <h4 className="font-bold text-white mb-2">Nice-to-Have</h4>
                <ul className="text-[#d3c5b0] text-sm space-y-1">
                  <li>Fax (if still needed)</li>
                  <li>Stapling/finishing</li>
                  <li>Large paper capacity</li>
                </ul>
              </div>
            </div>

            {/* Decision Matrix */}
            <div className="glass-card rounded-3xl p-8 my-12">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Quick Decision Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#2a3548]">
                      <th className="text-left py-3 px-3 text-white">Your Need</th>
                      <th className="text-left py-3 px-3 text-white">Recommended Type</th>
                      <th className="text-left py-3 px-3 text-white">Monthly Rental</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#2a3548]/50">
                      <td className="py-3 px-3 text-[#d3c5b0]">Small office, basic needs</td>
                      <td className="py-3 px-3 text-[#f5be53]">A4 Desktop Laser</td>
                      <td className="py-3 px-3 text-[#d3c5b0]">AED 250-400</td>
                    </tr>
                    <tr className="border-b border-[#2a3548]/50">
                      <td className="py-3 px-3 text-[#d3c5b0]">Medium office, shared</td>
                      <td className="py-3 px-3 text-[#f5be53]">A3 Mid-Range MFP</td>
                      <td className="py-3 px-3 text-[#d3c5b0]">AED 500-800</td>
                    </tr>
                    <tr className="border-b border-[#2a3548]/50">
                      <td className="py-3 px-3 text-[#d3c5b0]">High volume, color needed</td>
                      <td className="py-3 px-3 text-[#f5be53]">A3 Color Enterprise</td>
                      <td className="py-3 px-3 text-[#d3c5b0]">AED 1000-2000</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 text-[#d3c5b0]">Enterprise, full features</td>
                      <td className="py-3 px-3 text-[#f5be53]">Production/High-End</td>
                      <td className="py-3 px-3 text-[#d3c5b0]">AED 2000+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Still Uncertain?</h2>
            <p className="text-[#d3c5b0] mb-6">
              Our experts can help you make the right choice with a free consultation. We offer all major brands 
              with flexible rental plans so you can change if your needs evolve.
            </p>

            {/* CTA */}
            <div className="text-center glass-card rounded-3xl p-8 mt-12">
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
