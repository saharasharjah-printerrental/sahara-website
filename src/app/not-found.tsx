"use client";

export const runtime = "edge";

import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .motion-video { display: none !important; }
          .motion-poster { display: block !important; }
        }
        .motion-poster { display: none; }
      `}</style>

      <main
        style={{
          minHeight: "100vh",
          background: "#071325",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          fontFamily: "inherit",
        }}
      >
        {/* Animation */}
        <div style={{ width: "100%", maxWidth: 560, marginBottom: "2.5rem", borderRadius: "1.5rem", overflow: "hidden" }}>
          <video
            className="motion-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/animations/404/coder-loop-poster.webp"
            style={{ width: "100%", height: "auto", display: "block" }}
            aria-label="Animated illustration of a developer coding"
          >
            <source src="/animations/404/coder-loop.webm" type="video/webm" />
            <source src="/animations/404/coder-loop.mp4" type="video/mp4" />
          </video>
          {/* Static fallback for prefers-reduced-motion */}
          <img
            className="motion-poster"
            src="/animations/404/coder-loop-poster.webp"
            alt="Developer illustration"
            width={560}
            height={315}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Heading */}
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#f5be53",
            marginBottom: "0.75rem",
          }}
        >
          Error 404
        </p>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: "1rem",
            lineHeight: 1.15,
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            color: "#8fa3bc",
            fontSize: "1.05rem",
            maxWidth: 440,
            marginBottom: "2.5rem",
            lineHeight: 1.6,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/"
            style={{
              background: "linear-gradient(135deg, #f5be53, #c8962e)",
              color: "#412d00",
              padding: "0.85rem 2.25rem",
              borderRadius: "9999px",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Back to Home
          </Link>
          <Link
            href="/contact/"
            style={{
              background: "transparent",
              color: "#ffffff",
              padding: "0.85rem 2.25rem",
              borderRadius: "9999px",
              fontWeight: 600,
              fontSize: "1rem",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              display: "inline-block",
            }}
          >
            Contact Us
          </Link>
        </div>
      </main>
    </>
  );
}
