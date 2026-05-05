"use client";

import { useState, useEffect } from "react";

interface SmtpSettingsIcon {
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPass: string;
  smtpFromName: string;
  smtpFromEmailIcon: string;
  smtpToEmailIcon: string;
}

interface SettingsIcon {
  companyName: string;
  companyEmailIcon: string;
  companyPhoneIcon: string;
  companyAddress: string;
  whatsappNumber: string;
  workingHours: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  notificationEmailIcon: string;
  smtp: SmtpSettingsIcon;
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

const defaultSmtp: SmtpSettingsIcon = {
  smtpHost: "smtp.gmail.com",
  smtpPort: "587",
  smtpUser: "",
  smtpPass: "",
  smtpFromName: "Sahara Printers",
  smtpFromEmailIcon: "",
  smtpToEmailIcon: "",
};

const defaultSettingsIcon: SettingsIcon = {
  companyName: "Sahara Office Equipments",
  companyEmailIcon: "info@saharaPrinter.com",
  companyPhoneIcon: "+971 4 505 5000",
  companyAddress: "Sharjah, UAE",
  whatsappNumber: "+971 50 382 3969",
  workingHours: "Sat - Thu: 9AM - 7PM",
  heroTitle: "Rent, Buy, or Repair",
  heroSubtitle: "All Under One Roof",
  ctaText: "Get a Quote",
  notificationEmailIcon: "info@saharaPrinter.com",
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

export default function AdminSettingsIcon() {
  const [SettingsIcon, setSettingsIcon] = useState<SettingsIcon>(defaultSettingsIcon);
  const [saved, setSaved] = useState(false);

  const mergeWithDefaults = (stored: Partial<SettingsIcon>): SettingsIcon => {
    return {
      ...defaultSettingsIcon,
      ...stored,
      smtp: {
        ...defaultSmtp,
        ...(stored.smtp || {}),
      },
      calculatorPrices: {
        ...defaultSettingsIcon.calculatorPrices,
        ...(stored.calculatorPrices || {}),
      },
    };
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sahara_SettingsIcon");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          setSettingsIcon(mergeWithDefaults(parsed));
        }
      }
    } catch (e) {
      console.error("Error loading SettingsIcon:", e);
    }
  }, []);

  const handleSave = async () => {
    localStorage.setItem("sahara_SettingsIcon", JSON.stringify(SettingsIcon));
    window.dispatchEvent(new Event("sahara-SettingsIcon-updated"));

    const d1Entries = [
      { key: "smtp_host", value: SettingsIcon.smtp.smtpHost },
      { key: "smtp_port", value: SettingsIcon.smtp.smtpPort },
      { key: "smtp_user", value: SettingsIcon.smtp.smtpUser },
      { key: "smtp_pass", value: SettingsIcon.smtp.smtpPass },
      { key: "smtp_from_name", value: SettingsIcon.smtp.smtpFromName },
      { key: "smtp_from_EmailIcon", value: SettingsIcon.smtp.smtpFromEmailIcon },
      { key: "smtp_to_EmailIcon", value: SettingsIcon.smtp.smtpToEmailIcon },
      { key: "notification_EmailIcon", value: SettingsIcon.smtp.smtpToEmailIcon },
    ];

    try {
      await Promise.all(
        d1Entries.map(({ key, value }) =>
          fetch("/api/SettingsIcon", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key, value }),
          })
        )
      );
    } catch {
      // D1 may not be configured in dev — localStorage is the fallback
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#071325]">
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">SettingsIcon</h1>
            <p className="text-slate-400 mt-1">Manage your website SettingsIcon</p>
          </div>

          {saved && (
            <div className="mb-6 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined">check_circle</span>
              SettingsIcon saved successfully!
            </div>
          )}

          <div className="glass-card rounded-2xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                  <input type="text" value={SettingsIcon.companyName} onChange={(e) => setSettingsIcon({ ...SettingsIcon, companyName: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">EmailIcon</label>
                  <input type="EmailIcon" value={SettingsIcon.companyEmailIcon} onChange={(e) => setSettingsIcon({ ...SettingsIcon, companyEmailIcon: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">PhoneIcon</label>
                  <input type="text" value={SettingsIcon.companyPhoneIcon} onChange={(e) => setSettingsIcon({ ...SettingsIcon, companyPhoneIcon: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp</label>
                  <input type="text" value={SettingsIcon.whatsappNumber} onChange={(e) => setSettingsIcon({ ...SettingsIcon, whatsappNumber: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Address</label>
                  <input type="text" value={SettingsIcon.companyAddress} onChange={(e) => setSettingsIcon({ ...SettingsIcon, companyAddress: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Working Hours</label>
                  <input type="text" value={SettingsIcon.workingHours} onChange={(e) => setSettingsIcon({ ...SettingsIcon, workingHours: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h2 className="text-lg font-bold text-white mb-1">Gmail SMTP — EmailIcon Notifications</h2>
              <p className="text-sm text-slate-400 mb-4">When a visitor submits the quote form, two EmailIcons are sent: one to your sales inbox and one confirmation to the customer.</p>

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
                      value={SettingsIcon.smtp.smtpHost}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, smtp: { ...SettingsIcon.smtp, smtpHost: e.target.value } })}
                      placeholder="smtp.gmail.com"
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">SMTP Port</label>
                    <input
                      type="text"
                      value={SettingsIcon.smtp.smtpPort}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, smtp: { ...SettingsIcon.smtp, smtpPort: e.target.value } })}
                      placeholder="587"
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Gmail Address</label>
                    <input
                      type="EmailIcon"
                      value={SettingsIcon.smtp.smtpUser}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, smtp: { ...SettingsIcon.smtp, smtpUser: e.target.value } })}
                      placeholder="yourname@gmail.com"
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">App Password</label>
                    <input
                      type="password"
                      value={SettingsIcon.smtp.smtpPass}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, smtp: { ...SettingsIcon.smtp, smtpPass: e.target.value } })}
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
                      value={SettingsIcon.smtp.smtpFromName}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, smtp: { ...SettingsIcon.smtp, smtpFromName: e.target.value } })}
                      placeholder="Sahara Printers"
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">From EmailIcon</label>
                    <input
                      type="EmailIcon"
                      value={SettingsIcon.smtp.smtpFromEmailIcon}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, smtp: { ...SettingsIcon.smtp, smtpFromEmailIcon: e.target.value } })}
                      placeholder="noreply@saharaPrinter.com"
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                    />
                    <p className="text-xs text-slate-500 mt-1">Leave blank to use the Gmail address above</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Sales Notification EmailIcon</label>
                  <input
                    type="EmailIcon"
                    value={SettingsIcon.smtp.smtpToEmailIcon}
                    onChange={(e) => setSettingsIcon({ ...SettingsIcon, smtp: { ...SettingsIcon.smtp, smtpToEmailIcon: e.target.value } })}
                    placeholder="sales@saharaPrinter.com"
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
                        <li>• Every quote submission triggers two EmailIcons via Gmail SMTP</li>
                        <li>• <strong className="text-white">Admin EmailIcon</strong> → sent to the Sales Notification EmailIcon above</li>
                        <li>• <strong className="text-white">Customer EmailIcon</strong> → confirmation sent to the visitor's address</li>
                        <li>• Works on CloudIconflare Workers thanks to <code className="text-amber-400">nodejs_compat</code> flag</li>
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
                  <input type="text" value={SettingsIcon.heroTitle} onChange={(e) => setSettingsIcon({ ...SettingsIcon, heroTitle: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Hero Subtitle (Gold)</label>
                  <input type="text" value={SettingsIcon.heroSubtitle} onChange={(e) => setSettingsIcon({ ...SettingsIcon, heroSubtitle: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">CTA Button Text</label>
                  <input type="text" value={SettingsIcon.ctaText} onChange={(e) => setSettingsIcon({ ...SettingsIcon, ctaText: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
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
                      checked={SettingsIcon.paymentGatewayEnabled}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, paymentGatewayEnabled: e.target.checked })}
                      className="sr-0 peer" 
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f5be53]"></div>
                  </label>
                </div>
                
                {SettingsIcon.paymentGatewayEnabled && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Payment Link URL</label>
                      <input 
                        type="url" 
                        value={SettingsIcon.paymentGatewayUrl}
                        onChange={(e) => setSettingsIcon({ ...SettingsIcon, paymentGatewayUrl: e.target.value })}
                        placeholder="https://your-payment-gateway.com/pay/..."
                        className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                      />
                      <p className="text-xs text-slate-500 mt-1">Enter your payment gateway URL (e.g., Stripe, PayPal, Telr)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Button Label</label>
                      <input 
                        type="text" 
                        value={SettingsIcon.paymentGatewayLabel}
                        onChange={(e) => setSettingsIcon({ ...SettingsIcon, paymentGatewayLabel: e.target.value })}
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
                      value={SettingsIcon.calculatorPrices.a4BasePrice}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, calculatorPrices: { ...SettingsIcon.calculatorPrices, a4BasePrice: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">A3 Base Price (AED)</label>
                    <input 
                      type="number" 
                      value={SettingsIcon.calculatorPrices.a3BasePrice}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, calculatorPrices: { ...SettingsIcon.calculatorPrices, a3BasePrice: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Plotter Base Price (AED)</label>
                    <input 
                      type="number" 
                      value={SettingsIcon.calculatorPrices.plotterBasePrice}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, calculatorPrices: { ...SettingsIcon.calculatorPrices, plotterBasePrice: Number(e.target.value) } })}
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
                      value={SettingsIcon.calculatorPrices.colorMultiplier}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, calculatorPrices: { ...SettingsIcon.calculatorPrices, colorMultiplier: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Volume Thresholds (pages)</label>
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        placeholder="5000"
                        value={SettingsIcon.calculatorPrices.volumeThreshold1}
                        onChange={(e) => setSettingsIcon({ ...SettingsIcon, calculatorPrices: { ...SettingsIcon.calculatorPrices, volumeThreshold1: Number(e.target.value) } })}
                        className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                      />
                      <input 
                        type="number" 
                        placeholder="10000"
                        value={SettingsIcon.calculatorPrices.volumeThreshold2}
                        onChange={(e) => setSettingsIcon({ ...SettingsIcon, calculatorPrices: { ...SettingsIcon.calculatorPrices, volumeThreshold2: Number(e.target.value) } })}
                        className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Multiplier at {SettingsIcon.calculatorPrices.volumeThreshold1}+</label>
                    <input 
                      type="number" 
                      step="0.05"
                      value={SettingsIcon.calculatorPrices.volumeMultiplier2}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, calculatorPrices: { ...SettingsIcon.calculatorPrices, volumeMultiplier2: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Multiplier at {SettingsIcon.calculatorPrices.volumeThreshold2}+</label>
                    <input 
                      type="number" 
                      step="0.05"
                      value={SettingsIcon.calculatorPrices.volumeMultiplier3}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, calculatorPrices: { ...SettingsIcon.calculatorPrices, volumeMultiplier3: Number(e.target.value) } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Multiplier at 20K+</label>
                    <input 
                      type="number" 
                      step="0.05"
                      value={SettingsIcon.calculatorPrices.volumeMultiplier3 > 1.25 ? 1.5 : SettingsIcon.calculatorPrices.volumeMultiplier3}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, calculatorPrices: { ...SettingsIcon.calculatorPrices, volumeMultiplier3: Number(e.target.value) } })}
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
                      value={Math.round((1 - SettingsIcon.calculatorPrices.discount12Months) * 100)}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, calculatorPrices: { ...SettingsIcon.calculatorPrices, discount12Months: 1 - Number(e.target.value) / 100 } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">24 Month Discount (%)</label>
                    <input 
                      type="number" 
                      step="5"
                      value={Math.round((1 - SettingsIcon.calculatorPrices.discount24Months) * 100)}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, calculatorPrices: { ...SettingsIcon.calculatorPrices, discount24Months: 1 - Number(e.target.value) / 100 } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">36 Month Discount (%)</label>
                    <input 
                      type="number" 
                      step="5"
                      value={Math.round((1 - SettingsIcon.calculatorPrices.discount36Months) * 100)}
                      onChange={(e) => setSettingsIcon({ ...SettingsIcon, calculatorPrices: { ...SettingsIcon.calculatorPrices, discount36Months: 1 - Number(e.target.value) / 100 } })}
                      className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <button onClick={handleSave} className="w-full bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform">
                Save SettingsIcon
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
