"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a5.473 5.473 0 01-5.492-5.492L.337 5.215a5.483 5.483 0 011.485-5.413c.61-.61 1.462-.94 2.359-.94h.002c.9 0 1.756.327 2.357.94l.214.215c.442.442.69 1.032.69 1.657 0 .625-.167 1.233-.496 1.684l-1.61 1.61c.149.349.247.726.247 1.117 0 1.007-.264 1.97-.768 2.828l-.215.215c.297.744.768 1.432 1.356 1.945l1.061 1.061c.69.69 1.828.966 2.83.768l1.61-1.61c.451-.331.938-.539 1.469-.539.391 0 .775.073 1.123.22l.215.214c.442.443.69 1.032.69 1.657 0 .912-.368 1.768-.985 2.394l-.215.215c-.442.442-1.032.69-1.657.69-.625 0-1.233-.167-1.684-.496l-1.61-1.61c-.349-.149-.726-.247-1.117-.247-.391 0-.775.073-1.123.22l-.214.214c-.442.443-.69 1.032-.69 1.657 0 .912.368 1.768.985 2.394l.215.215c.442.442 1.032.69 1.657.69h.002c.901 0 1.756-.327 2.357-.94l.214-.215c.442-.442.69-1.032.69-1.657V14.382z"/>
    </svg>
  );
}

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
      <WhatsAppIcon />
    </motion.a>
  );
}
