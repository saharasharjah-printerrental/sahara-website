"use client";

import { useState, useEffect } from "react";

interface SEOConfig {
  googleAnalyticsId: string;
  googleAnalytics4Id: string;
  googleTagManagerId: string;
  microsoftClarityId: string;
  metaPixelId: string;
  metaPixelAdvancedMatching: boolean;
  hotjarId: string;
  semrushDomainId: string;
  ahrefsDomainId: string;
  customHeadScripts: string;
  customBodyScripts: string;
  schemaMarkup: string;
  enableDevMode: boolean;
}

const defaultConfig: SEOConfig = {
  googleAnalyticsId: "",
  googleAnalytics4Id: "",
  googleTagManagerId: "",
  microsoftClarityId: "",
  metaPixelId: "",
  metaPixelAdvancedMatching: false,
  hotjarId: "",
  semrushDomainId: "",
  ahrefsDomainId: "",
  customHeadScripts: "",
  customBodyScripts: "",
  schemaMarkup: "",
  enableDevMode: false,
};

export default function AdminSEO() {
  const [config, setConfig] = useState<SEOConfig>(defaultConfig);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("google");

  useEffect(() => {
    const stored = localStorage.getItem("sahara_seo_config");
    if (stored) {
      setConfig(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("sahara_seo_config", JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "google", label: "Google", icon: "Google" },
    { id: "meta", label: "Meta (Facebook)", icon: "Meta" },
    { id: "microsoft", label: "Microsoft", icon: "Microsoft" },
    { id: "other", label: "Other Tools", icon: "More" },
    { id: "custom", label: "Custom Scripts", icon: "Code" },
    { id: "schema", label: "Schema Markup", icon: "Data" },
  ];

  return (
    <div className="min-h-screen bg-[#071325]">
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">SEO & Analytics</h1>
            <p className="text-slate-400 mt-1">Configure tracking, analytics, and SEO scripts</p>
          </div>

          {saved && (
            <div className="mb-6 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined">check_circle</span>
              SEO configuration saved successfully!
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={config.enableDevMode}
                onChange={(e) => setConfig({ ...config, enableDevMode: e.target.checked })}
                className="w-5 h-5 rounded border-white/20 bg-[#101c2e]"
              />
              <span className="material-symbols-outlined text-sm">bug_report</span>
              Enable Debug Mode (logs to console)
            </label>
          </div>

          <div className="glass-card rounded-2xl p-1">
            <div className="flex gap-1 p-1 bg-[#030e20] rounded-xl overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-[#f5be53] text-[#412d00]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-6">
              {activeTab === "google" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Google Analytics</h3>
                    <p className="text-sm text-slate-400 mb-4">Connect Google Analytics to track website traffic</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <span className="material-symbols-outlined text-sm align-middle mr-1">tag</span>
                          Google Analytics ID (UA)
                        </label>
                        <input
                          type="text"
                          placeholder="UA-XXXXX-X"
                          value={config.googleAnalyticsId}
                          onChange={(e) => setConfig({ ...config, googleAnalyticsId: e.target.value })}
                          className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <span className="material-symbols-outlined text-sm align-middle mr-1">tag</span>
                          Google Analytics 4 ID
                        </label>
                        <input
                          type="text"
                          placeholder="G-XXXXXXXXXX"
                          value={config.googleAnalytics4Id}
                          onChange={(e) => setConfig({ ...config, googleAnalytics4Id: e.target.value })}
                          className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-lg font-bold text-white mb-1">Google Tag Manager</h3>
                    <p className="text-sm text-slate-400 mb-4">Container implementation for advanced tracking</p>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <span className="material-symbols-outlined text-sm align-middle mr-1">hub</span>
                        GTM Container ID
                      </label>
                      <input
                        type="text"
                        placeholder="GTM-XXXXXXX"
                        value={config.googleTagManagerId}
                        onChange={(e) => setConfig({ ...config, googleTagManagerId: e.target.value })}
                        className="w-full md:w-1/2 bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-blue-400">info</span>
                      <div>
                        <h4 className="font-medium text-white">Configuration Tips</h4>
                        <ul className="text-sm text-slate-400 mt-2 space-y-1">
                          <li>• Use GA4 for modern tracking with events</li>
                          <li>• GTM lets you manage all tags in one place</li>
                          <li>• Link GTM to GA4 for unified tracking</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "meta" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Meta Pixel (Facebook)</h3>
                    <p className="text-sm text-slate-400 mb-4">Track conversions and build audiences</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <span className="material-symbols-outlined text-sm align-middle mr-1">pixel</span>
                          Meta Pixel ID
                        </label>
                        <input
                          type="text"
                          placeholder="1234567890"
                          value={config.metaPixelId}
                          onChange={(e) => setConfig({ ...config, metaPixelId: e.target.value })}
                          className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-600"
                        />
                      </div>
                      <div className="flex items-end">
                        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.metaPixelAdvancedMatching}
                            onChange={(e) => setConfig({ ...config, metaPixelAdvancedMatching: e.target.checked })}
                            className="w-5 h-5 rounded border-white/20 bg-[#101c2e]"
                          />
                          <span>Enable Advanced Matching</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-blue-400">info</span>
                      <div>
                        <h4 className="font-medium text-white">Meta Pixel Events</h4>
                        <p className="text-sm text-slate-400 mt-1">The following events are automatically tracked:</p>
                        <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                          <span className="text-slate-300">• PageView</span>
                          <span className="text-slate-300">• Lead</span>
                          <span className="text-slate-300">• Contact</span>
                          <span className="text-slate-300">• Schedule</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "microsoft" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Microsoft Clarity</h3>
                    <p className="text-sm text-slate-400 mb-4">Heatmaps, session recordings, and user insights</p>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <span className="material-symbols-outlined text-sm align-middle mr-1">visibility</span>
                        Clarity Project ID
                      </label>
                      <input
                        type="text"
                        placeholder="xxxxxxxxx"
                        value={config.microsoftClarityId}
                        onChange={(e) => setConfig({ ...config, microsoftClarityId: e.target.value })}
                        className="w-full md:w-1/2 bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-purple-400">auto_awesome</span>
                      <div>
                        <h4 className="font-medium text-white">Why Microsoft Clarity?</h4>
                        <ul className="text-sm text-slate-400 mt-2 space-y-1">
                          <li>• Free heatmaps and session recordings</li>
                          <li>• User behavior analytics</li>
                          <li>• Integrates with Azure AD</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "other" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Other Analytics Tools</h3>
                    <p className="text-sm text-slate-400 mb-4">Additional tracking and SEO tools</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <span className="material-symbols-outlined text-sm align-middle mr-1">insights</span>
                          Hotjar ID
                        </label>
                        <input
                          type="text"
                          placeholder="1234567"
                          value={config.hotjarId}
                          onChange={(e) => setConfig({ ...config, hotjarId: e.target.value })}
                          className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <span className="material-symbols-outlined text-sm align-middle mr-1">search</span>
                          SEMrush Domain ID
                        </label>
                        <input
                          type="text"
                          value={config.semrushDomainId}
                          onChange={(e) => setConfig({ ...config, semrushDomainId: e.target.value })}
                          className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <span className="material-symbols-outlined text-sm align-middle mr-1">leaderboard</span>
                          Ahrefs Domain
                        </label>
                        <input
                          type="text"
                          value={config.ahrefsDomainId}
                          onChange={(e) => setConfig({ ...config, ahrefsDomainId: e.target.value })}
                          className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "custom" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Custom Scripts</h3>
                    <p className="text-sm text-slate-400 mb-4">Add custom JavaScript to your site</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <span className="material-symbols-outlined text-sm align-middle mr-1">code</span>
                          Scripts to add in &lt;head&gt;
                        </label>
                        <textarea
                          value={config.customHeadScripts}
                          onChange={(e) => setConfig({ ...config, customHeadScripts: e.target.value })}
                          placeholder="<!-- Example: Custom meta tags, preconnect, etc. -->"
                          rows={6}
                          className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white font-mono text-sm placeholder:text-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <span className="material-symbols-outlined text-sm align-middle mr-1">code</span>
                          Scripts to add before &lt;/body&gt;
                        </label>
                        <textarea
                          value={config.customBodyScripts}
                          onChange={(e) => setConfig({ ...config, customBodyScripts: e.target.value })}
                          placeholder="<!-- Example: Chat widgets, popups, etc. -->"
                          rows={6}
                          className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white font-mono text-sm placeholder:text-slate-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "schema" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Schema Markup</h3>
                    <p className="text-sm text-slate-400 mb-4">JSON-LD structured data for rich search results</p>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <span className="material-symbols-outlined text-sm align-middle mr-1">data_object</span>
                        Custom Schema JSON-LD
                      </label>
                      <textarea
                        value={config.schemaMarkup}
                        onChange={(e) => setConfig({ ...config, schemaMarkup: e.target.value })}
                        placeholder={`{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sahara Office Equipments",
  ...
}`}
                        rows={12}
                        className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white font-mono text-sm placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-400">check_circle</span>
                      <div>
                        <h4 className="font-medium text-white">Auto-Generated Schema</h4>
                        <p className="text-sm text-slate-400 mt-1">The following schemas are automatically generated:</p>
                        <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                          <span className="text-slate-300">• Organization</span>
                          <span className="text-slate-300">• LocalBusiness</span>
                          <span className="text-slate-300">• Product</span>
                          <span className="text-slate-300">• BreadcrumbList</span>
                          <span className="text-slate-300">• FAQPage</span>
                          <span className="text-slate-300">• Article</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-white/10 pt-6">
                <button
                  onClick={handleSave}
                  className="w-full md:w-auto bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-4 px-8 rounded-xl font-bold hover:scale-[1.02] transition-transform"
                >
                  Save SEO Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}