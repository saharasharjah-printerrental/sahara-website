import { SocialMedia } from "./types";

const DEFAULT_SOCIAL_MEDIA: SocialMedia = {
  facebook: "",
  instagram: "",
  linkedin: "",
  twitter: "",
  youtube: "",
  whatsapp: "",
};

export function getSocialMediaFromConfig(): SocialMedia {
  if (typeof window === "undefined") {
    return DEFAULT_SOCIAL_MEDIA;
  }

  try {
    const stored = localStorage.getItem("sahara_seo_config");
    if (stored) {
      const config = JSON.parse(stored);
      return config.socialMedia || DEFAULT_SOCIAL_MEDIA;
    }
  } catch (e) {
    console.error("Failed to parse SEO config:", e);
  }

  return DEFAULT_SOCIAL_MEDIA;
}

export function isSocialMediaConfigured(): boolean {
  const social = getSocialMediaFromConfig();
  return Object.values(social).some((v) => v && v.trim() !== "");
}

export function getConfiguredSocialLinks(): { platform: string; url: string }[] {
  const social = getSocialMediaFromConfig();
  const links: { platform: string; url: string }[] = [];

  if (social.facebook) links.push({ platform: "facebook", url: social.facebook });
  if (social.instagram) links.push({ platform: "instagram", url: social.instagram });
  if (social.linkedin) links.push({ platform: "linkedin", url: social.linkedin });
  if (social.twitter) links.push({ platform: "twitter", url: social.twitter });
  if (social.youtube) links.push({ platform: "youtube", url: social.youtube });
  if (social.whatsapp) links.push({ platform: "whatsapp", url: social.whatsapp });

  return links;
}