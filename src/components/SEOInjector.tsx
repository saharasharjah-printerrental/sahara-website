"use client";

import { useEffect, useState } from "react";

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
    const stored = localStorage.getItem("sahara_seo_config");
    if (stored) {
      const parsed = JSON.parse(stored);
      setConfig(parsed);

      if (parsed.enableDevMode) {
        console.log("[SEO Config] Loaded:", parsed);
      }
    }
  }, []);

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

      {/* Google Analytics 4 */}
      {config.googleAnalytics4Id && (
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
      )}

      {/* Google Tag Manager */}
      {config.googleTagManagerId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${config.googleTagManagerId}');
              ${config.enableDevMode ? `console.log('[GTM] Initialized with ID: ${config.googleTagManagerId}');` : ''}
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

      {/* Custom Head Scripts */}
      {config.customHeadScripts && (
        <script
          dangerouslySetInnerHTML={{
            __html: config.customHeadScripts,
          }}
        />
      )}

      {/* Custom Body Scripts - injected before closing body */}
      {config.customBodyScripts && (
        <script
          dangerouslySetInnerHTML={{
            __html: config.customBodyScripts,
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