"use client";

import { useEffect } from "react";

/** Invisible component — include once in layout.tsx.
 *  Pings /api/analytics/ping every 30s so the admin dashboard
 *  can show a live online-user count. */
export default function VisitorTracker() {
  useEffect(() => {
    // Stable session ID per browser tab session
    let sid = sessionStorage.getItem("sahara_sid");
    if (!sid) {
      sid = typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("sahara_sid", sid);
    }

    const ping = () =>
      fetch("/api/analytics/ping/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sid, page: window.location.pathname }),
        keepalive: true,
      }).catch(() => {/* silently ignore — non-critical */});

    ping(); // immediate on mount
    const id = setInterval(ping, 30_000);
    return () => clearInterval(id);
  }, []);

  return null;
}
