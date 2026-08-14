"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  type: "success" | "error" | "info";
  message: string;
  onClose: () => void;
}

export function Toast({ type, message, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const styles = {
    success: "bg-[#0d2b1a] border-green-500/40 text-green-400",
    error:   "bg-[#2b0d0d] border-red-500/40 text-red-400",
    info:    "bg-[#0d1b2e] border-[#f5be53]/40 text-[#f5be53]",
  };

  const icons = {
    success: "check_circle",
    error:   "error",
    info:    "info",
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-2xl backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-300 ${styles[type]}`}
      style={{ minWidth: 260, maxWidth: 380 }}
    >
      <span className="material-symbols-outlined text-xl shrink-0">{icons[type]}</span>
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        onClick={onClose}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity ml-2"
        aria-label="Dismiss"
      >
        <span className="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  const showToast = (type: "success" | "error" | "info", message: string) => {
    setToast({ type, message });
  };

  const hideToast = () => setToast(null);

  const ToastElement = toast ? (
    <Toast type={toast.type} message={toast.message} onClose={hideToast} />
  ) : null;

  return { showToast, ToastElement };
}
