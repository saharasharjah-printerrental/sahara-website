"use client";

import { useState, useEffect } from "react";
import { SocialMedia } from "@/lib/types";

const DEFAULT_SOCIAL: SocialMedia = {
  facebook: "",
  instagram: "",
  linkedin: "",
  twitter: "",
  youtube: "",
  whatsapp: "",
};

export function useSocialMedia() {
  const [socialMedia, setSocialMedia] = useState<SocialMedia>(DEFAULT_SOCIAL);

  useEffect(() => {
    const loadConfig = () => {
      try {
        const stored = localStorage.getItem("sahara_seo_config");
        if (stored) {
          const config = JSON.parse(stored);
          setSocialMedia(config.socialMedia || DEFAULT_SOCIAL);
        }
      } catch (e) {
        console.error("Failed to load social media config:", e);
      }
    };

    loadConfig();

    const handleUpdate = () => loadConfig();
    window.addEventListener("seo-config-updated", handleUpdate);

    return () => {
      window.removeEventListener("seo-config-updated", handleUpdate);
    };
  }, []);

  const isConfigured = Object.values(socialMedia).some((v) => v && v.trim() !== "");

  return { socialMedia, isConfigured };
}

export const PLATFORM_ICONS: Record<string, string> = {
  facebook: "facebook",
  instagram: "photo_camera",
  linkedin: "work",
  twitter: "tag",
  youtube: "play_circle",
  whatsapp: "call",
};

export function getSocialLinks(): SocialMedia {
  const { socialMedia } = useSocialMedia();
  return socialMedia;
}