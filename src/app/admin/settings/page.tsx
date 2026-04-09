"use client";

import { useState, useEffect } from "react";

interface Settings {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  whatsappNumber: string;
  workingHours: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
}

const defaultSettings: Settings = {
  companyName: "Sahara Office Equipments",
  companyEmail: "info@saharaprinter.com",
  companyPhone: "+971 4 505 5000",
  companyAddress: "Sharjah, UAE",
  whatsappNumber: "+971 50 382 3969",
  workingHours: "Sat - Thu: 9AM - 7PM",
  heroTitle: "Rent, Buy, or Repair",
  heroSubtitle: "All Under One Roof",
  ctaText: "Get a Quote",
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sahara_settings");
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("sahara_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#071325]">
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-slate-400 mt-1">Manage your website settings</p>
          </div>

          {saved && (
            <div className="mb-6 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined">check_circle</span>
              Settings saved successfully!
            </div>
          )}

          <div className="glass-card rounded-2xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                  <input type="text" value={settings.companyName} onChange={(e) => setSettings({ ...settings, companyName: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input type="email" value={settings.companyEmail} onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                  <input type="text" value={settings.companyPhone} onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp</label>
                  <input type="text" value={settings.whatsappNumber} onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Address</label>
                  <input type="text" value={settings.companyAddress} onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Working Hours</label>
                  <input type="text" value={settings.workingHours} onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h2 className="text-lg font-bold text-white mb-4">Homepage Hero</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Hero Title</label>
                  <input type="text" value={settings.heroTitle} onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Hero Subtitle (Gold)</label>
                  <input type="text" value={settings.heroSubtitle} onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">CTA Button Text</label>
                  <input type="text" value={settings.ctaText} onChange={(e) => setSettings({ ...settings, ctaText: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <button onClick={handleSave} className="w-full bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}