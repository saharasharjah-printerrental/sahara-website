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
  paymentGatewayEnabled: boolean;
  paymentGatewayUrl: string;
  paymentGatewayLabel: string;
  calculatorPrices: {
    a4BasePrice: number;
    a3BasePrice: number;
    plotterBasePrice: number;
    colorMultiplier: number;
    volumeThreshold1: number;
    volumeThreshold2: number;
    volumeMultiplier1: number;
    volumeMultiplier2: number;
    volumeMultiplier3: number;
    discount36Months: number;
    discount24Months: number;
    discount12Months: number;
  };
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
  paymentGatewayEnabled: false,
  paymentGatewayUrl: "",
  paymentGatewayLabel: "Buy Now",
  calculatorPrices: {
    a4BasePrice: 600,
    a3BasePrice: 1200,
    plotterBasePrice: 2500,
    colorMultiplier: 1.4,
    volumeThreshold1: 5000,
    volumeThreshold2: 10000,
    volumeMultiplier1: 1,
    volumeMultiplier2: 1.1,
    volumeMultiplier3: 1.25,
    discount36Months: 0.8,
    discount24Months: 0.85,
    discount12Months: 0.9,
  },
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  const mergeWithDefaults = (stored: Partial<Settings>): Settings => {
    return {
      ...defaultSettings,
      ...stored,
      calculatorPrices: {
        ...defaultSettings.calculatorPrices,
        ...(stored.calculatorPrices || {}),
      },
    };
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sahara_settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          setSettings(mergeWithDefaults(parsed));
        }
      }
    } catch (e) {
      console.error("Error loading settings:", e);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("sahara_settings", JSON.stringify(settings));
    window.dispatchEvent(new Event("sahara-settings-updated"));
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
              <h2 className="text-lg font-bold text-white mb-4">Payment Gateway</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#101c2e] rounded-xl border border-white/10">
                  <div>
                    <h3 className="text-white font-medium">Enable Payment Link</h3>
                    <p className="text-sm text-slate-400">Show "Buy Now" button on supplies & parts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings.paymentGatewayEnabled}
                      onChange={(e) => setSettings({ ...settings, paymentGatewayEnabled: e.target.checked })}
                      className="sr-0 peer" 
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f5be53]"></div>
                  </label>
                </div>
                
                {settings.paymentGatewayEnabled && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Payment Link URL</label>
                      <input 
                        type="url" 
                        value={settings.paymentGatewayUrl}
                        onChange={(e) => setSettings({ ...settings, paymentGatewayUrl: e.target.value })}
                        placeholder="https://your-payment-gateway.com/pay/..."
                        className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                      />
                      <p className="text-xs text-slate-500 mt-1">Enter your payment gateway URL (e.g., Stripe, PayPal, Telr)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Button Label</label>
                      <input 
                        type="text" 
                        value={settings.paymentGatewayLabel}
                        onChange={(e) => setSettings({ ...settings, paymentGatewayLabel: e.target.value })}
                        placeholder="Buy Now"
                        className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                      />
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-blue-400">info</span>
                        <div>
                          <h4 className="font-medium text-white">How to set up</h4>
                          <ul className="text-sm text-slate-400 mt-2 space-y-1">
                            <li>• Get your payment link from your payment provider</li>
                            <li>• Paste the payment link URL above</li>
                            <li>• Customize the button label as needed</li>
                            <li>• "Buy Now" buttons will appear on Supplies & Parts page</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h2 className="text-lg font-bold text-white mb-4">Rental Calculator Pricing</h2>
              <div className="space-y-4">
                <p className="text-sm text-slate-400 mb-4">Configure the base prices and multipliers for the rental calculator</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">A4 Base Price (AED)</label>
                    <input 
                      type="number" 
                      value={settings.calculatorPrices.a4BasePrice}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, a4BasePrice: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">A3 Base Price (AED)</label>
                    <input 
                      type="number" 
                      value={settings.calculatorPrices.a3BasePrice}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, a3BasePrice: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Plotter Base Price (AED)</label>
                    <input 
                      type="number" 
                      value={settings.calculatorPrices.plotterBasePrice}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, plotterBasePrice: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Color Multiplier (1.4 = 40% extra)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={settings.calculatorPrices.colorMultiplier}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, colorMultiplier: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Volume Thresholds (pages)</label>
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        placeholder="5000"
                        value={settings.calculatorPrices.volumeThreshold1}
                        onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, volumeThreshold1: Number(e.target.value) } })}
                        className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                      />
                      <input 
                        type="number" 
                        placeholder="10000"
                        value={settings.calculatorPrices.volumeThreshold2}
                        onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, volumeThreshold2: Number(e.target.value) } })}
                        className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Multiplier at {settings.calculatorPrices.volumeThreshold1}+</label>
                    <input 
                      type="number" 
                      step="0.05"
                      value={settings.calculatorPrices.volumeMultiplier2}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, volumeMultiplier2: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Multiplier at {settings.calculatorPrices.volumeThreshold2}+</label>
                    <input 
                      type="number" 
                      step="0.05"
                      value={settings.calculatorPrices.volumeMultiplier3}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, volumeMultiplier3: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Multiplier at 20K+</label>
                    <input 
                      type="number" 
                      step="0.05"
                      value={settings.calculatorPrices.volumeMultiplier3 > 1.25 ? 1.5 : settings.calculatorPrices.volumeMultiplier3}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, volumeMultiplier3: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">12 Month Discount (%)</label>
                    <input 
                      type="number" 
                      step="5"
                      value={Math.round((1 - settings.calculatorPrices.discount12Months) * 100)}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, discount12Months: 1 - Number(e.target.value) / 100 } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">24 Month Discount (%)</label>
                    <input 
                      type="number" 
                      step="5"
                      value={Math.round((1 - settings.calculatorPrices.discount24Months) * 100)}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, discount24Months: 1 - Number(e.target.value) / 100 } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">36 Month Discount (%)</label>
                    <input 
                      type="number" 
                      step="5"
                      value={Math.round((1 - settings.calculatorPrices.discount36Months) * 100)}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, discount36Months: 1 - Number(e.target.value) / 100 } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
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