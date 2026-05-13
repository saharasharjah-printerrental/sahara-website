"use client";

export const runtime = 'edge';

import { useState, useEffect } from "react";
import { useToast } from "@/components/admin/Toast";

interface SmtpSettings {
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPass: string;
  smtpFromName: string;
  smtpFromEmail: string;
  smtpToEmail: string;
}

interface Settings {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyLandline: string;
  companyCustomerService: string;
  companyAddress: string;
  companyPOBox: string;
  whatsappNumber: string;
  workingHours: string;
  emergencySupport: string;
  mapEmbedUrl: string;
  hasMapUrl: string;
  locationDubaiAddress: string;
  locationDubaiPhone: string;
  locationAbuDhabiAddress: string;
  locationAbuDhabiPhone: string;
  locationSharjahAddress: string;
  locationSharjahPhone: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  notificationEmail: string;
  smtp: SmtpSettings;
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

const defaultSmtp: SmtpSettings = {
  smtpHost: "smtp.gmail.com",
  smtpPort: "587",
  smtpUser: "",
  smtpPass: "",
  smtpFromName: "Sahara Printers",
  smtpFromEmail: "",
  smtpToEmail: "",
};

const defaultSettings: Settings = {
  companyName: "Sahara Office Equipments",
  companyEmail: "info@saharaedoc.com",
  companyPhone: "+971 50 382 3969",
  companyLandline: "+971 6 542 6169",
  companyCustomerService: "+971 6 527 6444",
  companyAddress: "Al Arabi Building, Industrial Area 11, Sharjah, UAE",
  companyPOBox: "PO Box 47373, Sharjah",
  whatsappNumber: "+971 50 382 3969",
  workingHours: "Sat - Thu: 8:00 AM - 8:00 PM",
  emergencySupport: "24/7 Emergency Support Available",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57709.04655847797!2d55.37228622257977!3d25.310405175118643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f62e0d0595f%3A0xa40ba77aedf65618!2sSAHARA%20office%20equipments!5e0!3m2!1sen!2sin!4v1768635734168!5m2!1sen!2sin",
  hasMapUrl: "https://www.google.com/maps/place/SAHARA+office+equipments/@25.3187,55.4196,17z",
  locationDubaiAddress: "Business Bay, Dubai",
  locationDubaiPhone: "+971 50 382 3969",
  locationAbuDhabiAddress: "Mussafah, Abu Dhabi",
  locationAbuDhabiPhone: "+971 50 382 3969",
  locationSharjahAddress: "Al Arabi Building, Industrial Area 11",
  locationSharjahPhone: "+971 6 542 6169",
  heroTitle: "Rent, Buy, or Repair",
  heroSubtitle: "All Under One Roof",
  ctaText: "Get a Quote",
  notificationEmail: "info@saharaprinter.com",
  smtp: defaultSmtp,
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
  const { showToast, ToastElement } = useToast();

  const mergeWithDefaults = (stored: Partial<Settings>): Settings => {
    return {
      ...defaultSettings,
      ...stored,
      smtp: {
        ...defaultSmtp,
        ...(stored.smtp || {}),
      },
      calculatorPrices: {
        ...defaultSettings.calculatorPrices,
        ...(stored.calculatorPrices || {}),
      },
    };
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/settings?key=site_settings');
        const data = await res.json();
        if (data.setting?.value) {
          const parsed = JSON.parse(data.setting.value);
          if (parsed && typeof parsed === "object") {
            setSettings(mergeWithDefaults(parsed));
            localStorage.setItem("sahara_settings", data.setting.value);
            return;
          }
        }
      } catch { /* fall through to localStorage */ }
      try {
        const stored = localStorage.getItem("sahara_settings");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === "object") setSettings(mergeWithDefaults(parsed));
        }
      } catch (e) {
        console.error("Error loading settings:", e);
      }
    })();
  }, []);

  const handleSave = async () => {
    const json = JSON.stringify(settings);
    localStorage.setItem("sahara_settings", json);
    window.dispatchEvent(new Event("sahara-settings-updated"));

    const d1Entries = [
      { key: "site_settings", value: json },
      { key: "smtp_host", value: settings.smtp.smtpHost },
      { key: "smtp_port", value: settings.smtp.smtpPort },
      { key: "smtp_user", value: settings.smtp.smtpUser },
      { key: "smtp_pass", value: settings.smtp.smtpPass },
      { key: "smtp_from_name", value: settings.smtp.smtpFromName },
      { key: "smtp_from_email", value: settings.smtp.smtpFromEmail },
      { key: "smtp_to_email", value: settings.smtp.smtpToEmail },
      { key: "notification_email", value: settings.smtp.smtpToEmail },
      { key: "calculator_prices", value: JSON.stringify(settings.calculatorPrices) },
    ];

    try {
      await Promise.all(
        d1Entries.map(({ key, value }) =>
          fetch("/api/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key, value }),
          })
        )
      );
      showToast('success', 'Settings saved to database!');
    } catch {
      showToast('success', 'Settings saved locally (database unavailable)');
    }
  };

  return (
    <div className="min-h-screen bg-[#071325]">
      {ToastElement}
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-slate-400 mt-1">Manage your website settings</p>
          </div>

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
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone (Mobile / Sales)</label>
                  <input type="text" value={settings.companyPhone} onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Landline (Sharjah)</label>
                  <input type="text" value={settings.companyLandline} onChange={(e) => setSettings({ ...settings, companyLandline: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Customer Service Number</label>
                  <input type="text" value={settings.companyCustomerService} onChange={(e) => setSettings({ ...settings, companyCustomerService: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
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
                  <label className="block text-sm font-medium text-slate-300 mb-2">PO Box</label>
                  <input type="text" value={settings.companyPOBox} onChange={(e) => setSettings({ ...settings, companyPOBox: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Working Hours</label>
                  <input type="text" value={settings.workingHours} onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Emergency Support Text</label>
                  <input type="text" value={settings.emergencySupport} onChange={(e) => setSettings({ ...settings, emergencySupport: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h2 className="text-lg font-bold text-white mb-1">Gmail SMTP — Email Notifications</h2>
              <p className="text-sm text-slate-400 mb-4">When a visitor submits the quote form, two emails are sent: one to your sales inbox and one confirmation to the customer.</p>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-5">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-amber-400 text-lg mt-0.5">key</span>
                  <div>
                    <h4 className="font-medium text-white text-sm">Gmail App Password required</h4>
                    <ol className="text-xs text-slate-400 mt-2 space-y-1 list-decimal list-inside">
                      <li>Enable 2-Step Verification on your Google account</li>
                      <li>Go to <strong className="text-white">myaccount.google.com → Security → App passwords</strong></li>
                      <li>Create an app password for "Mail" — copy the 16-character code</li>
                      <li>Paste that code (without spaces) into the App Password field below</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">SMTP Host</label>
                    <input
                      type="text"
                      value={settings.smtp.smtpHost}
                      onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, smtpHost: e.target.value } })}
                      placeholder="smtp.gmail.com"
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">SMTP Port</label>
                    <input
                      type="text"
                      value={settings.smtp.smtpPort}
                      onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, smtpPort: e.target.value } })}
                      placeholder="587"
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Gmail Address</label>
                    <input
                      type="email"
                      value={settings.smtp.smtpUser}
                      onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, smtpUser: e.target.value } })}
                      placeholder="yourname@gmail.com"
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">App Password</label>
                    <input
                      type="password"
                      value={settings.smtp.smtpPass}
                      onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, smtpPass: e.target.value } })}
                      placeholder="16-character app password"
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white font-mono tracking-widest"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">From Name</label>
                    <input
                      type="text"
                      value={settings.smtp.smtpFromName}
                      onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, smtpFromName: e.target.value } })}
                      placeholder="Sahara Printers"
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">From Email</label>
                    <input
                      type="email"
                      value={settings.smtp.smtpFromEmail}
                      onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, smtpFromEmail: e.target.value } })}
                      placeholder="noreply@saharaprinter.com"
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                    />
                    <p className="text-xs text-slate-500 mt-1">Leave blank to use the Gmail address above</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Sales Notification Email</label>
                  <input
                    type="email"
                    value={settings.smtp.smtpToEmail}
                    onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, smtpToEmail: e.target.value } })}
                    placeholder="sales@saharaprinter.com"
                    className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                  />
                  <p className="text-xs text-slate-500 mt-1">New quote requests will be delivered here</p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-400 text-lg mt-0.5">check_circle</span>
                    <div>
                      <h4 className="font-medium text-white text-sm">How it works</h4>
                      <ul className="text-xs text-slate-400 mt-2 space-y-1">
                        <li>• Every quote submission triggers two emails via Gmail SMTP</li>
                        <li>• <strong className="text-white">Admin email</strong> → sent to the Sales Notification Email above</li>
                        <li>• <strong className="text-white">Customer email</strong> → confirmation sent to the visitor's address</li>
                        <li>• Works on Cloudflare Workers thanks to <code className="text-amber-400">nodejs_compat</code> flag</li>
                      </ul>
                    </div>
                  </div>
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
              <h2 className="text-lg font-bold text-white mb-1">Rental Calculator Pricing</h2>
              <p className="text-sm text-slate-400 mb-4">New model: AED 350 base includes free print pool. Overage charged per page.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Base Rent (AED/mo)</label>
                    <input type="number" value={settings.calculatorPrices.a4BasePrice}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, a4BasePrice: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                    <p className="text-xs text-slate-500 mt-1">Minimum monthly rental (default 350)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">B&W Price (AED/page)</label>
                    <input type="number" step="0.01" value={settings.calculatorPrices.colorMultiplier}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, colorMultiplier: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                    <p className="text-xs text-slate-500 mt-1">Per-page overage rate (default 0.06)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Colour Price (AED/page)</label>
                    <input type="number" step="0.01" value={settings.calculatorPrices.volumeMultiplier1}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, volumeMultiplier1: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                    <p className="text-xs text-slate-500 mt-1">Per-page overage rate (default 0.20)</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Free B&W Prints Included</label>
                    <input type="number" step="100" value={settings.calculatorPrices.volumeThreshold1}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, volumeThreshold1: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                    <p className="text-xs text-slate-500 mt-1">Default 3,000 pages free</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Free Colour Prints Included</label>
                    <input type="number" step="100" value={settings.calculatorPrices.volumeThreshold2}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, volumeThreshold2: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                    <p className="text-xs text-slate-500 mt-1">Default 1,000 pages free</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">A3-Only Surcharge (AED)</label>
                    <input type="number" value={settings.calculatorPrices.volumeMultiplier2}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, volumeMultiplier2: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                    <p className="text-xs text-slate-500 mt-1">Default 80</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">24-Month Discount (%)</label>
                    <input type="number" step="1"
                      value={Math.round((1 - settings.calculatorPrices.discount24Months) * 100)}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, discount24Months: 1 - Number(e.target.value) / 100 } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                    <p className="text-xs text-slate-500 mt-1">Default 5%</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">36-Month Discount (%)</label>
                    <input type="number" step="1"
                      value={Math.round((1 - settings.calculatorPrices.discount36Months) * 100)}
                      onChange={(e) => setSettings({ ...settings, calculatorPrices: { ...settings.calculatorPrices, discount36Months: 1 - Number(e.target.value) / 100 } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                    <p className="text-xs text-slate-500 mt-1">Default 10%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h2 className="text-lg font-bold text-white mb-4">Contact Page — Location Cards</h2>
              <div className="space-y-4">
                {([
                  { city: 'Dubai', addrKey: 'locationDubaiAddress', phoneKey: 'locationDubaiPhone' },
                  { city: 'Abu Dhabi', addrKey: 'locationAbuDhabiAddress', phoneKey: 'locationAbuDhabiPhone' },
                  { city: 'Sharjah', addrKey: 'locationSharjahAddress', phoneKey: 'locationSharjahPhone' },
                ] as const).map(({ city, addrKey, phoneKey }) => (
                  <div key={city} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">{city} — Address</label>
                      <input type="text" value={settings[addrKey]} onChange={(e) => setSettings({ ...settings, [addrKey]: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">{city} — Phone</label>
                      <input type="text" value={settings[phoneKey]} onChange={(e) => setSettings({ ...settings, [phoneKey]: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h2 className="text-lg font-bold text-white mb-4">Contact Page — Google Maps</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Map Embed URL</label>
                  <textarea
                    value={settings.mapEmbedUrl}
                    onChange={(e) => setSettings({ ...settings, mapEmbedUrl: e.target.value })}
                    rows={3}
                    placeholder="Paste Google Maps embed src URL here"
                    className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white text-xs font-mono"
                  />
                  <p className="text-xs text-slate-500 mt-1">Get from Google Maps → Share → Embed a map → copy the src URL only</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Google Maps Direct Link <span className="text-slate-500 font-normal">(used in schema hasMap + admin panel)</span></label>
                  <input
                    type="url"
                    value={settings.hasMapUrl}
                    onChange={(e) => setSettings({ ...settings, hasMapUrl: e.target.value })}
                    placeholder="https://www.google.com/maps/place/..."
                    className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white text-xs font-mono"
                  />
                  <p className="text-xs text-slate-500 mt-1">Get from Google Maps → Share → Copy link. This is injected into the Organization schema as <code className="text-amber-400">hasMap</code>.</p>
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