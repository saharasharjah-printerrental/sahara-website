"use client";

export const runtime = 'edge';

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Smartphone, Phone, Headphones, Email, LocationOn, AccessTime } from "@mui/icons-material";

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

const SocialIcon = ({ icon }: { icon: string }) => {
  const icons: Record<string, React.ReactElement> = {
    facebook: <FacebookIcon />,
    instagram: <InstagramIcon />,
    linkedin: <LinkedinIcon />,
    youtube: <YoutubeIcon />,
  };
  return icons[icon] || null;
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [socialLinks, setSocialLinks] = useState<{ name: string; url: string; icon: string }[]>([]);

  useEffect(() => {
    // Load settings from D1 API first (takes precedence)
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.settings && Object.keys(data.settings).length > 0) {
          setSettings(prev => ({ ...prev, ...data.settings }));
          // Also cache to localStorage for offline use
          localStorage.setItem("sahara_settings", JSON.stringify(data.settings));
        }
      })
      .catch(console.error);

    // Fallback to localStorage
    const stored = localStorage.getItem("sahara_settings");
    if (stored) {
      setSettings(JSON.parse(stored));
    }

    const loadSocialLinks = () => {
      try {
        const stored = localStorage.getItem("sahara_seo_config");
        if (stored) {
          const config = JSON.parse(stored);
          const sm = config.socialMedia || {};
          const links: { name: string; url: string; icon: string }[] = [];
          if (sm.facebook) links.push({ name: "Facebook", url: sm.facebook, icon: "facebook" });
          if (sm.instagram) links.push({ name: "Instagram", url: sm.instagram, icon: "instagram" });
          if (sm.linkedin) links.push({ name: "LinkedIn", url: sm.linkedin, icon: "linkedin" });
          if (sm.twitter) links.push({ name: "Twitter", url: sm.twitter, icon: "twitter" });
          if (sm.youtube) links.push({ name: "YouTube", url: sm.youtube, icon: "youtube" });
          if (links.length > 0) {
            setSocialLinks(links);
          } else {
            setSocialLinks([
              { name: "Facebook", url: "https://www.facebook.com/share/1GM5UxFLTq/?mibextid=wwXIfr", icon: "facebook" },
              { name: "Instagram", url: "https://www.instagram.com/sahara_office_equipments", icon: "instagram" },
              { name: "LinkedIn", url: "https://www.linkedin.com/company/sahara-office-equipment-trading-llc--sharjah/", icon: "linkedin" },
              { name: "YouTube", url: "https://www.youtube.com/@saharaprinter", icon: "youtube" },
            ]);
          }
        } else {
          setSocialLinks([
            { name: "Facebook", url: "https://www.facebook.com/share/1GM5UxFLTq/?mibextid=wwXIfr", icon: "facebook" },
            { name: "Instagram", url: "https://www.instagram.com/sahara_office_equipments", icon: "instagram" },
            { name: "LinkedIn", url: "https://www.linkedin.com/company/sahara-office-equipment-trading-llc--sharjah/", icon: "linkedin" },
            { name: "YouTube", url: "https://www.youtube.com/@saharaprinter", icon: "youtube" },
          ]);
        }
      } catch (e) {
        console.error("Failed to load social links:", e);
        setSocialLinks([
          { name: "Facebook", url: "https://www.facebook.com/share/1GM5UxFLTq/?mibextid=wwXIfr", icon: "facebook" },
          { name: "Instagram", url: "https://www.instagram.com/sahara_office_equipments", icon: "instagram" },
          { name: "LinkedIn", url: "https://www.linkedin.com/company/sahara-office-equipment-trading-llc--sharjah/", icon: "linkedin" },
          { name: "YouTube", url: "https://www.youtube.com/@saharaprinter", icon: "youtube" },
        ]);
      }
    };

    loadSocialLinks();

    const handleUpdate = () => loadSocialLinks();
    window.addEventListener("seo-config-updated", handleUpdate);

    return () => {
      window.removeEventListener("seo-config-updated", handleUpdate);
    };
  }, []);

  const contactNumbers = [
    { label: "Mobile (Sales & Support)", phone: settings?.companyPhone || "+971 50 382 3969", icon: Smartphone },
    { label: "Landline (Sharjah)", phone: settings?.companyLandline || "+971 6 542 6169", icon: Phone },
    { label: "Customer Service", phone: settings?.companyCustomerService || "+971 6 527 6444", icon: Headphones },
  ];

  const locations = [
    { city: "Dubai", phone: settings?.locationDubaiPhone || "+971 50 382 3969", address: settings?.locationDubaiAddress || "Business Bay, Dubai" },
    { city: "Abu Dhabi", phone: settings?.locationAbuDhabiPhone || "+971 50 382 3969", address: settings?.locationAbuDhabiAddress || "Mussafah, Abu Dhabi" },
    { city: "Sharjah", phone: settings?.locationSharjahPhone || "+971 6 542 6169", address: settings?.locationSharjahAddress || "Al Arabi Building, Industrial Area 11" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const inquiry = {
      id: Date.now().toString(),
      ...formData,
      status: "pending",
      notes: "",
      createdAt: new Date().toLocaleDateString(),
    };

    const existing = JSON.parse(localStorage.getItem("sahara_inquiries") || "[]");
    localStorage.setItem("sahara_inquiries", JSON.stringify([inquiry, ...existing]));
    
    setSubmitted(true);
    setFormData({ name: "", company: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-[#071325]">
      <link rel="canonical" href="https://www.saharaprinter.com/contact/" />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Contact <span className="text-[#f5be53]">Us</span>
          </h1>
          <p className="text-lg text-[#d3c5b0] max-w-2xl">
            Get in touch with our team for sales inquiries, technical support, or service requests. We're here to help!
          </p>
        </div>
      </section>

      {/* Send us a Message - Upper Section */}
      <section className="px-8 lg:px-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-[#f5be53] rounded-full"></span>
            Send us a Message
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-card rounded-[2rem] p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="text-5xl text-green-400 mb-4" sx={{ fontSize: 60 }} />
                  <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-slate-400">Your inquiry has been submitted. We'll get back to you within 30 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Your Name *" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-[#101c2e] border-none rounded-xl py-4 px-6 text-white placeholder:text-[#d3c5b0]/50" 
                    />
                    <input 
                      type="text" 
                      placeholder="Company Name" 
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#101c2e] border-none rounded-xl py-4 px-6 text-white placeholder:text-[#d3c5b0]/50" 
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input 
                      type="email" 
                      placeholder="Email Address *" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-[#101c2e] border-none rounded-xl py-4 px-6 text-white placeholder:text-[#d3c5b0]/50" 
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number *" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full bg-[#101c2e] border-none rounded-xl py-4 px-6 text-white placeholder:text-[#d3c5b0]/50" 
                    />
                  </div>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    required
                    className="w-full bg-[#101c2e] border-none rounded-xl py-4 px-6 text-white"
                  >
                    <option value="">Select Service</option>
                    <option>Printer Rental</option>
                    <option>Equipment Sales</option>
                    <option>Repair Service</option>
                    <option>AMC/Maintenance</option>
                    <option>Toner & Supplies</option>
                  </select>
                  <textarea 
                    placeholder="Your Message" 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5} 
                    className="w-full bg-[#101c2e] border-none rounded-xl py-4 px-6 text-white placeholder:text-[#d3c5b0]/50"
                  ></textarea>
                  <button type="submit" className="w-full bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-5 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card rounded-[2rem] p-8">
                <div className="space-y-6">
                  {contactNumbers.map((contact, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <contact.icon className="text-3xl text-[#f5be53]" sx={{ fontSize: 36 }} />
                      <div>
                        <h3 className="font-bold text-white">{contact.label}</h3>
                        <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-[#d3c5b0] hover:text-[#f5be53] transition-colors">
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-4">
                    <Email className="text-3xl text-[#f5be53]" sx={{ fontSize: 36 }} />
                    <div>
                      <h3 className="font-bold text-white">Email</h3>
                      <a href={`mailto:${settings?.companyEmail || 'info@saharaedoc.com'}`} className="text-[#d3c5b0] hover:text-[#f5be53] transition-colors">
                        {settings?.companyEmail || 'info@saharaedoc.com'}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <LocationOn className="text-3xl text-[#f5be53]" sx={{ fontSize: 36 }} />
                    <div>
                      <h3 className="font-bold text-white">Headquarters</h3>
                      <p className="text-[#d3c5b0]">{settings?.companyAddress || 'Al Arabi Building, Industrial Area 11'}</p>
                      <p className="text-[#d3c5b0]">Sharjah, UAE</p>
                      <p className="text-[#d3c5b0] text-sm mt-1">{settings?.companyPOBox || 'PO Box 47373, Sharjah'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <AccessTime className="text-3xl text-[#f5be53]" sx={{ fontSize: 36 }} />
                    <div>
                      <h3 className="font-bold text-white">Business Hours</h3>
                      <p className="text-[#d3c5b0]">Sat - Thu: {settings?.workingHours || '8:00 AM - 8:00 PM'}</p>
                      <p className="text-[#f5be53] text-sm">{settings?.emergencySupport || '24/7 Emergency Support Available'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="glass-card rounded-[2rem] p-8">
                <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1a2a3a] to-[#0d1520] flex items-center justify-center text-[#f5be53] transition-all duration-300 cursor-pointer shadow-lg"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <SocialIcon icon={social.icon} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map View - Lower Section */}
      <section className="py-16 px-8 lg:px-24 bg-[#0a1425]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-[#f5be53] rounded-full"></span>
            Map View
          </h2>
          
          <div className="glass-card rounded-[2rem] overflow-hidden">
            <div className="relative w-full h-[450px] bg-[#0a1425]">
              <iframe 
                src={settings?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57709.04655847797!2d55.37228622257977!3d25.310405175118643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f62e0d0595f%3A0xa40ba77aedf65618!2sSAHARA%20office%20equipments!5e0!3m2!1sen!2sin!4v1768635734168!5m2!1sen!2sin"}
                width="100%" 
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sahara Office Equipment Location Map"
              />
            </div>
          </div>
          
          <div className="mt-6 p-6 bg-[#0d1b2e] rounded-2xl border border-[#f5be53]/20">
            <p className="text-[#d3c5b0] text-center">
              <span className="text-[#f5be53] font-semibold">Location:</span> {settings?.companyAddress || 'Al Arabi Building, Industrial Area 11, Sharjah, UAE'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {locations.map((loc, i) => (
              <div key={i} className="glass-card rounded-2xl p-6">
                <h3 className="font-bold text-white text-lg mb-2">{loc.city}</h3>
                <p className="text-[#d3c5b0] text-sm mb-2">{loc.address}</p>
                <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="text-[#f5be53] font-bold">{loc.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
      <MobileNav />
    </main>
  );
}