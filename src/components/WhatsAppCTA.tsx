"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppCTA() {
  const [whatsapp, setWhatsapp] = useState("971503823969");

  useEffect(() => {
    const stored = localStorage.getItem("sahara_settings");
    if (stored) {
      const settings = JSON.parse(stored);
      if (settings.whatsappNumber) {
        setWhatsapp(settings.whatsappNumber.replace(/[^0-9]/g, ""));
      }
    }
  }, []);

  return (
    <motion.a
      href={`https://wa.me/${whatsapp}?text=Hi! I'm interested in Sahara Office Equipments services.`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#1da851] shadow-lg cursor-pointer"
      style={{
        boxShadow: '6px 6px 16px rgba(0,0,0,0.3), -2px -2px 8px rgba(255,255,255,0.1)',
      }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </motion.a>
  );
}
