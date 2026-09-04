/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Existing tokens — kept as-is so current usage keeps working.
        surface: "#071325",
        primary: "#f5be53",
        // Elevation ramp (mirrors the CSS custom properties in globals.css).
        "surface-low": "#101c2e",
        "surface-mid": "#142032",
        "surface-high": "#1f2a3d",
        "surface-max": "#2a3548",
        ink: "#050d1a",
        "primary-deep": "#c8962e",
        "on-primary": "#412d00",
        "on-surface": "#d7e3fc",
        "on-surface-variant": "#d3c5b0",
        muted: "#7a94ad",
        outline: "#9c8f7c",
      },
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
      // Display sizes carry negative tracking; body sizes stay neutral.
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        display: ["clamp(2.25rem, 4.5vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        title: ["clamp(1.75rem, 3vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        headline: ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        body: ["1.0625rem", { lineHeight: "1.7" }],
        caption: ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
      },
      spacing: {
        section: "clamp(5rem, 10vw, 9rem)",
      },
      maxWidth: {
        content: "1120px",
      },
      borderRadius: {
        card: "20px",
        panel: "28px",
        pill: "999px",
      },
    },
  },
  plugins: [],
}
