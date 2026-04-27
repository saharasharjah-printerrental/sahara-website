"use client";

import { useEffect, useState } from "react";

type ParsedScript = { src: string; isAsync: boolean } | { inline: string };

function parseScripts(html: string): ParsedScript[] {
  if (!html?.trim()) return [];
  const out: ParsedScript[] = [];
  const re = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  let hasTag = false;
  while ((m = re.exec(html)) !== null) {
    hasTag = true;
    const srcMatch = m[1].match(/src=["']([^"']+)["']/i);
    const body = m[2].trim();
    if (srcMatch) out.push({ src: srcMatch[1], isAsync: /\basync\b/i.test(m[1]) });
    else if (body) out.push({ inline: body });
  }
  if (!hasTag && html.trim()) out.push({ inline: html.trim() });
  return out;
}

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

export default function SEOInjector() {
  const [config, setConfig] = useState<SEOConfig | null>(null);

  useEffect(() => {
    const applyConfig = (parsed: SEOConfig) => {
      setConfig(parsed);
      if (parsed.enableDevMode) {
        console.log("[SEO Config] Loaded:", parsed);
      }
    };

    const loadFromAPI = async () => {
      try {
        const res = await fetch("/api/settings?key=seo_config");
        const data = await res.json();
        if (data.setting?.value) {
          const parsed = JSON.parse(data.setting.value);
          if (parsed && typeof parsed === "object") {
            localStorage.setItem("sahara_seo_config", data.setting.value);
            applyConfig(parsed);
            return;
          }
        }
      } catch {
        // fall through to localStorage
      }
      const stored = localStorage.getItem("sahara_seo_config");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          applyConfig(parsed);
        } catch {
          // ignore
        }
      }
    };

    loadFromAPI();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sahara_seo_config" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          applyConfig(parsed);
        } catch {
          // ignore
        }
      }
    };

    const handleCustomEvent = () => {
      loadFromAPI();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("seo-config-updated", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("seo-config-updated", handleCustomEvent);
    };
  }, []);

  // Inject custom body scripts via DOM — handles both raw JS and full <script> HTML snippets
  useEffect(() => {
    if (!config?.customBodyScripts) return;
    const injected: HTMLScriptElement[] = [];
    for (const s of parseScripts(config.customBodyScripts)) {
      const el = document.createElement("script");
      if ("src" in s) { el.src = s.src; el.async = s.isAsync; }
      else { el.textContent = s.inline; }
      document.body.appendChild(el);
      injected.push(el);
    }
    return () => injected.forEach((el) => el.remove());
  }, [config?.customBodyScripts]);

  if (!config) return null;

  return (
    <>
      {/* Google Analytics */}
      {config.googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.googleAnalyticsId}');
                ${config.enableDevMode ? `console.log('[GA] Initialized with ID: ${config.googleAnalyticsId}');` : ''}
              `,
            }}
          />
        </>
      )}

      {/* Google Analytics 4 — only load if not already loaded by the UA block */}
      {config.googleAnalytics4Id && !config.googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalytics4Id}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.googleAnalytics4Id}');
                ${config.enableDevMode ? `console.log('[GA4] Initialized with ID: ${config.googleAnalytics4Id}');` : ''}
              `,
            }}
          />
        </>
      )}
      {/* GA4 alongside UA — reuse the existing dataLayer */}
      {config.googleAnalytics4Id && config.googleAnalyticsId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('config', '${config.googleAnalytics4Id}');
              ${config.enableDevMode ? `console.log('[GA4] Added config: ${config.googleAnalytics4Id}');` : ''}
            `,
          }}
        />
      )}

      {/* Meta Pixel */}
      {config.metaPixelId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${config.metaPixelId}'${config.metaPixelAdvancedMatching ? ", {'advanced_matching': true}" : ''});
              fbq('track', 'PageView');
              ${config.enableDevMode ? `console.log('[Meta Pixel] Initialized with ID: ${config.metaPixelId}');` : ''}
            `,
          }}
        />
      )}

      {/* Microsoft Clarity */}
      {config.microsoftClarityId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${config.microsoftClarityId}");
              ${config.enableDevMode ? `console.log('[Clarity] Initialized with ID: ${config.microsoftClarityId}');` : ''}
            `,
          }}
        />
      )}

      {/* Hotjar */}
      {config.hotjarId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${config.hotjarId},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              ${config.enableDevMode ? `console.log('[Hotjar] Initialized with ID: ${config.hotjarId}');` : ''}
            `,
          }}
        />
      )}

      {/* Custom Schema Markup */}
      {config.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: config.schemaMarkup,
          }}
        />
      )}
    </>
  );
}