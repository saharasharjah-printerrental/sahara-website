"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Chat } from "@mui/icons-material";

export default function WhatsAppCTA() {
  const [whatsapp, setWhatsapp] = useState("971503823969");
  const [mounted, setMounted] = useState(false);
  const dragged = useRef(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("sahara_settings");
    if (stored) {
      const settings = JSON.parse(stored);
      if (settings.whatsappNumber) {
        setWhatsapp(settings.whatsappNumber.replace(/[^0-9]/g, ""));
      }
    }
  }, []);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragged.current) {
      e.preventDefault();
      return;
    }
    window.open(
      `https://wa.me/${whatsapp}?text=Hi! I'm interested in Sahara Office Equipments services.`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (!mounted) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.08}
      onDragStart={() => { dragged.current = false; }}
      onDrag={() => { dragged.current = true; }}
      onDragEnd={() => { setTimeout(() => { dragged.current = false; }, 150); }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#1da851] cursor-grab active:cursor-grabbing select-none"
      style={{
        boxShadow: "6px 6px 16px rgba(0,0,0,0.3), -2px -2px 8px rgba(255,255,255,0.1)",
        touchAction: "none",
      }}
      aria-label="Chat on WhatsApp"
    >
      <Chat className="w-6 h-6 text-white pointer-events-none" />
    </motion.div>
  );
}
