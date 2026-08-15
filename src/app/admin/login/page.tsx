"use client";

export const runtime = 'edge';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("expired") === "1") {
      setSessionExpired(true);
    }
  }, []);

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        localStorage.setItem("sahara_admin_auth", "true");
        router.push("/admin");
      } else {
        const data = await res.json() as { error?: string };
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    try {
      await fetch("/api/admin/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
    } catch {
      // always show success — don't leak info
    }
    setForgotLoading(false);
    setForgotSent(true);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sahara Admin</h1>
          <p className="text-slate-400">Enter your credentials to access the dashboard</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          {!showForgot ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {sessionExpired && !error && (
                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-3 rounded-xl text-sm">
                  Your session expired. Please sign in again.
                </div>
              )}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
                  placeholder="admin@sahara.ae"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 px-4 pr-12 text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl select-none">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-amber-600 text-amber-950 py-3 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => { setShowForgot(true); setForgotEmail(email); setForgotSent(false); }}
                  className="text-sm text-slate-400 hover:text-primary transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-lg font-bold text-white mb-1">Password Recovery</h2>
                <p className="text-slate-400 text-sm">
                  Enter your admin email and we'll send recovery instructions.
                </p>
              </div>

              {forgotSent ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-4 rounded-xl text-sm text-center space-y-1">
                  <span className="material-symbols-outlined text-2xl block">mark_email_read</span>
                  <p className="font-semibold">Recovery email sent</p>
                  <p className="text-xs text-slate-400">If that email is registered, you'll receive instructions shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <input
                    required
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Admin email address"
                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full bg-gradient-to-r from-primary to-amber-600 text-amber-950 py-3 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50"
                  >
                    {forgotLoading ? "Sending…" : "Send Recovery Email"}
                  </button>
                </form>
              )}

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowForgot(false)}
                  className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1 mx-auto"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  Back to sign in
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
