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

const inputClass =
  "w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-500 focus:border-[#f5be53] focus:outline-none";
const labelClass = "block text-sm font-medium text-slate-300 mb-2";

export default function AdminSEO() {
  const [config, setConfig] = useState<SEOConfig>(defaultConfig);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/settings?key=seo_config");
        const data = await res.json();
        if (data.setting?.value) {
          const parsed = JSON.parse(data.setting.value);
          if (parsed && typeof parsed === "object") {
            setConfig({ ...defaultConfig, ...parsed });
            localStorage.setItem("sahara_seo_config", data.setting.value);
            return;
          }
        }
      } catch {
        // fall through to localStorage
      }
      try {
        const stored = localStorage.getItem("sahara_seo_config");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === "object") {
            setConfig({ ...defaultConfig, ...parsed });
          }
        }
      } catch {
        // ignore
      }
    };
    load();
  }, []);

  const set = (key: keyof SEOConfig, value: string | boolean) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const json = JSON.stringify(config);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "seo_config", value: json }),
      });
      if (!res.ok) throw new Error("API error");
      localStorage.setItem("sahara_seo_config", json);
      window.dispatchEvent(new Event("seo-config-updated"));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save to database. Changes saved locally only.");
      localStorage.setItem("sahara_seo_config", json);
      window.dispatchEvent(new Event("seo-config-updated"));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071325]">
      <main className="pt-8 pb-16 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">SEO &amp; Analytics</h1>
            <p className="text-slate-400 mt-1">
              Configure tracking scripts and analytics integrations
            </p>
          </div>

          {saved && (
            <div className="mb-6 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl">
              SEO config saved successfully!
            </div>
          )}
          {error && (
            <div className="mb-6 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Google Analytics */}
            <section className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">Google Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>GA Universal ID (UA-...)</label>
                  <input
                    type="text"
                    value={config.googleAnalyticsId}
                    onChange={(e) => set("googleAnalyticsId", e.target.value)}
                    placeholder="UA-XXXXXXXXX-X"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>GA4 Measurement ID (G-...)</label>
                  <input
                    type="text"
                    value={config.googleAnalytics4Id}
                    onChange={(e) => set("googleAnalytics4Id", e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* Tag Manager & Pixels */}
            <section className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">Tag Manager &amp; Pixels</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Google Tag Manager ID (GTM-...)</label>
                  <input
                    type="text"
                    value={config.googleTagManagerId}
                    onChange={(e) => set("googleTagManagerId", e.target.value)}
                    placeholder="GTM-XXXXXXX"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Meta Pixel ID</label>
                  <input
                    type="text"
                    value={config.metaPixelId}
                    onChange={(e) => set("metaPixelId", e.target.value)}
                    placeholder="XXXXXXXXXXXXXXXX"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="metaAdvanced"
                  checked={config.metaPixelAdvancedMatching}
                  onChange={(e) => set("metaPixelAdvancedMatching", e.target.checked)}
                  className="w-4 h-4 accent-[#f5be53]"
                />
                <label htmlFor="metaAdvanced" className="text-sm text-slate-300 cursor-pointer">
                  Enable Meta Pixel Advanced Matching
                </label>
              </div>
            </section>

            {/* Heatmaps & Session Recording */}
            <section className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">Heatmaps &amp; Session Recording</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Microsoft Clarity ID</label>
                  <input
                    type="text"
                    value={config.microsoftClarityId}
                    onChange={(e) => set("microsoftClarityId", e.target.value)}
                    placeholder="xxxxxxxxxx"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Hotjar Site ID</label>
                  <input
                    type="text"
                    value={config.hotjarId}
                    onChange={(e) => set("hotjarId", e.target.value)}
                    placeholder="1234567"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* SEO Tools */}
            <section className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">SEO Tools Verification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>SEMrush Domain ID</label>
                  <input
                    type="text"
                    value={config.semrushDomainId}
                    onChange={(e) => set("semrushDomainId", e.target.value)}
                    placeholder="xxxxxxxxxx"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Ahrefs Domain ID</label>
                  <input
                    type="text"
                    value={config.ahrefsDomainId}
                    onChange={(e) => set("ahrefsDomainId", e.target.value)}
                    placeholder="xxxxxxxxxx"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* Custom Scripts */}
            <section className="glass-card rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">Custom Scripts</h2>
              <div>
                <label className={labelClass}>
                  Custom &lt;head&gt; Scripts{" "}
                  <span className="text-slate-500 font-normal">(injected before &lt;/head&gt;)</span>
                </label>
                <textarea
                  rows={4}
                  value={config.customHeadScripts}
                  onChange={(e) => set("customHeadScripts", e.target.value)}
                  placeholder={'<script>/* your script */</script>'}
                  className={`${inputClass} font-mono text-sm resize-y`}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Custom Body Scripts{" "}
                  <span className="text-slate-500 font-normal">(injected before &lt;/body&gt;)</span>
                </label>
                <textarea
                  rows={4}
                  value={config.customBodyScripts}
                  onChange={(e) => set("customBodyScripts", e.target.value)}
                  placeholder={'<script>/* your script */</script>'}
                  className={`${inputClass} font-mono text-sm resize-y`}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Custom Schema Markup{" "}
                  <span className="text-slate-500 font-normal">(JSON-LD, injected as application/ld+json)</span>
                </label>
                <textarea
                  rows={6}
                  value={config.schemaMarkup}
                  onChange={(e) => set("schemaMarkup", e.target.value)}
                  placeholder={'{"@context": "https://schema.org", "@type": "Organization", ...}'}
                  className={`${inputClass} font-mono text-sm resize-y`}
                />
              </div>
            </section>

            {/* Dev Mode */}
            <section className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Developer Mode</h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Log analytics events to console for debugging
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.enableDevMode}
                    onChange={(e) => set("enableDevMode", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f5be53]"></div>
                </label>
              </div>
            </section>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            >
              {saving ? "Saving..." : "Save SEO Config"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
