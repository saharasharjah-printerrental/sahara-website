"use client";

export const runtime = 'edge';

import { useState, useEffect } from "react";
import { useToast } from "@/components/admin/Toast";

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
  organizationSchema: string;
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
  organizationSchema: "",
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
  const { showToast, ToastElement } = useToast();

  // Schema Inspector state
  const [schemaUrl, setSchemaUrl] = useState("https://www.saharaprinter.com/");
  const [fetchedSchemas, setFetchedSchemas] = useState<object[]>([]);
  const [schemaFetching, setSchemaFetching] = useState(false);
  const [schemaFetchedAt, setSchemaFetchedAt] = useState("");
  const [schemaFetchError, setSchemaFetchError] = useState("");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const handleFetchSchema = async () => {
    setSchemaFetching(true);
    setSchemaFetchError("");
    setFetchedSchemas([]);
    setExpandedIdx(null);
    try {
      const res = await fetch(`/api/admin/fetch-schema/?url=${encodeURIComponent(schemaUrl)}`);
      const data = await res.json() as { schemas?: object[]; fetchedAt?: string; error?: string };
      if (data.error) throw new Error(data.error);
      setFetchedSchemas(data.schemas ?? []);
      setSchemaFetchedAt(data.fetchedAt ? new Date(data.fetchedAt).toLocaleString() : "");
      if ((data.schemas ?? []).length === 0) setSchemaFetchError("No JSON-LD schemas found on this page.");
    } catch (e) {
      setSchemaFetchError(e instanceof Error ? e.message : "Fetch failed");
    } finally {
      setSchemaFetching(false);
    }
  };

  const loadIntoOrgEditor = (schema: object) => {
    set("organizationSchema", JSON.stringify(schema, null, 2));
    document.getElementById("org-schema-editor")?.scrollIntoView({ behavior: "smooth" });
  };

  const schemaTypeLabel = (s: object): string => {
    const t = (s as any)["@type"];
    if (!t) return "Unknown type";
    if (t === "FAQPage") return `FAQPage — ${((s as any).mainEntity?.length ?? 0)} questions`;
    if (Array.isArray(t)) return t.join(", ");
    return t;
  };

  const isOrgSchema = (s: object): boolean => {
    const t = (s as any)["@type"];
    const orgTypes = ["Organization", "LocalBusiness", "ProfessionalService"];
    if (Array.isArray(t)) return t.some((x: string) => orgTypes.includes(x));
    return orgTypes.includes(t);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/settings/?key=seo_config");
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

    // Trim all string inputs
    const trimmed = {
      ...config,
      googleAnalyticsId: config.googleAnalyticsId.trim(),
      googleAnalytics4Id: config.googleAnalytics4Id.trim(),
      googleTagManagerId: config.googleTagManagerId.trim(),
      microsoftClarityId: config.microsoftClarityId.trim(),
      metaPixelId: config.metaPixelId.trim(),
      hotjarId: config.hotjarId.trim(),
      semrushDomainId: config.semrushDomainId.trim(),
      ahrefsDomainId: config.ahrefsDomainId.trim(),
      customHeadScripts: config.customHeadScripts.trim(),
      customBodyScripts: config.customBodyScripts.trim(),
      schemaMarkup: config.schemaMarkup.trim(),
      organizationSchema: config.organizationSchema.trim(),
    };

    // Validate organizationSchema if provided
    if (trimmed.organizationSchema) {
      try {
        const parsed = JSON.parse(trimmed.organizationSchema);
        if (!parsed['@context'] || !parsed['@type']) {
          setError('Organization schema must have "@context" and "@type" fields');
          setSaving(false);
          return;
        }
      } catch {
        setError('Organization schema is not valid JSON. Fix it before saving.');
        setSaving(false);
        return;
      }
    }

    // Validate GA4 ID format if provided
    if (trimmed.googleAnalytics4Id && !/^G-[A-Z0-9]{10,}$/.test(trimmed.googleAnalytics4Id)) {
      setError("GA4 Measurement ID must start with 'G-' followed by at least 10 alphanumeric characters (e.g., G-XXXXXXXXXX)");
      setSaving(false);
      return;
    }

    const json = JSON.stringify(trimmed);
    try {
      const res = await fetch("/api/settings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "seo_config", value: json }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: string; details?: string };
        throw new Error(body.details || body.error || `HTTP ${res.status}`);
      }
      localStorage.setItem("sahara_seo_config", json);
      window.dispatchEvent(new Event("seo-config-updated"));
      setConfig(trimmed);
      showToast('success', 'SEO config saved successfully!');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(`DB save failed (${msg}). Config saved locally only.`);
      showToast('error', `DB save failed. Config saved locally only.`);
      localStorage.setItem("sahara_seo_config", json);
      window.dispatchEvent(new Event("seo-config-updated"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071325]">
      {ToastElement}
      <main className="pt-8 pb-16 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">SEO &amp; Analytics</h1>
            <p className="text-slate-400 mt-1">
              Configure tracking scripts and analytics integrations
            </p>
          </div>

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

            {/* Schema Inspector */}
            <section className="glass-card rounded-2xl p-6 space-y-4">
              <div>
                <h2 className="text-lg font-bold text-white">Live Schema Inspector</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Fetch and inspect the JSON-LD schemas currently on any saharaprinter.com page
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={schemaUrl}
                  onChange={(e) => setSchemaUrl(e.target.value)}
                  placeholder="https://www.saharaprinter.com/"
                  className={`${inputClass} flex-1`}
                />
                <button
                  type="button"
                  onClick={handleFetchSchema}
                  disabled={schemaFetching}
                  className="px-4 py-2 bg-[#f5be53] text-[#412d00] font-bold rounded-xl hover:bg-[#c8962e] transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {schemaFetching ? "Fetching..." : "Fetch Schema"}
                </button>
              </div>

              {schemaFetchError && (
                <p className="text-red-400 text-sm">{schemaFetchError}</p>
              )}

              {fetchedSchemas.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-500">
                    Found {fetchedSchemas.length} schema{fetchedSchemas.length !== 1 ? "s" : ""} — fetched at {schemaFetchedAt}
                  </p>
                  {fetchedSchemas.map((schema, i) => (
                    <div key={i} className="bg-[#101c2e] rounded-xl border border-white/10 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-white font-medium text-sm">{schemaTypeLabel(schema)}</span>
                        <div className="flex items-center gap-2">
                          {isOrgSchema(schema) && (
                            <button
                              type="button"
                              onClick={() => loadIntoOrgEditor(schema)}
                              className="text-xs px-2 py-1 rounded bg-[#f5be53]/20 text-[#f5be53] hover:bg-[#f5be53]/40 transition-colors"
                            >
                              Load into Org Editor
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => navigator.clipboard.writeText(JSON.stringify(schema, null, 2))}
                            className="text-xs px-2 py-1 rounded bg-white/10 text-slate-300 hover:text-white transition-colors"
                          >
                            Copy
                          </button>
                          <button
                            type="button"
                            onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                            className="text-xs px-2 py-1 rounded bg-white/10 text-slate-300 hover:text-white transition-colors"
                          >
                            {expandedIdx === i ? "Collapse" : "Expand"}
                          </button>
                        </div>
                      </div>
                      {expandedIdx === i && (
                        <pre className="px-4 pb-4 text-xs text-slate-300 font-mono overflow-x-auto max-h-64 overflow-y-auto">
                          {JSON.stringify(schema, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Site-Wide Organization Schema */}
            <section id="org-schema-editor" className="glass-card rounded-2xl p-6">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-white">Site-Wide Organization Schema</h2>
                <p className="text-sm text-slate-400 mt-1">
                  This JSON-LD appears on every page. Leave empty to use the built-in default. Edit here to override.
                </p>
              </div>
              <OrgSchemaEditor value={config.organizationSchema} onChange={(v) => set("organizationSchema", v)} />
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

function OrgSchemaEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [valid, setValid] = useState<boolean | null>(null);

  const validate = (text: string) => {
    if (!text.trim()) { setValid(null); return; }
    try {
      const p = JSON.parse(text);
      setValid(!!(p['@context'] && p['@type']));
    } catch {
      setValid(false);
    }
  };

  const format = () => {
    try {
      const pretty = JSON.stringify(JSON.parse(value), null, 2);
      onChange(pretty);
      setValid(true);
    } catch {
      setValid(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <button
          type="button"
          onClick={format}
          className="px-3 py-1.5 rounded-lg bg-[#101c2e] text-slate-400 hover:text-white text-sm transition-colors"
        >
          Format JSON
        </button>
        {valid === true && <span className="text-green-400 text-sm">Valid JSON-LD</span>}
        {valid === false && <span className="text-red-400 text-sm">Invalid JSON or missing @context/@type</span>}
        {value.trim() === '' && <span className="text-slate-500 text-sm">Using built-in default</span>}
      </div>
      <textarea
        rows={12}
        value={value}
        onChange={(e) => { onChange(e.target.value); validate(e.target.value); }}
        placeholder={'Leave empty to use built-in default schema.\n\nPaste your custom Organization JSON-LD here to override it.'}
        className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white font-mono text-sm resize-y focus:border-[#f5be53] focus:outline-none placeholder:text-slate-500"
      />
    </div>
  );
}
