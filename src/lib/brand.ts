// Single source of truth for the business entity Google needs to consolidate
// into one Knowledge Graph node. Before this file existed, 49 files hand-typed
// the Organization/LocalBusiness/ProfessionalService block independently and
// drifted: ~26 distinct `name` strings, two `legalName` spellings, and a dozen
// files asserting addresses/geo for branches that don't exist. That drift is
// why Gemini and Google AI Overviews (both Knowledge-Graph-grounded) never cite
// the site while ChatGPT (which reads page text directly) does — Google can't
// tell all these pages describe the same business.
//
// Every page outside src/app/layout.tsx should reference the organization by
// @id (see orgRef()) rather than re-declaring the node. The one exception is
// src/components/OrganizationRating.tsx, which intentionally repeats @type and
// name on its aggregateRating fragment — see that file's comment for why
// (GSC's review-snippet validator rejects an un-typed/un-named node even when
// it merges into a typed Organization elsewhere via @id).
//
// Values below are sourced from the canonical node in layout.tsx — do not
// hand-edit them independently there and here.

export const ORG_ID = "https://www.saharaprinter.com/#organization";

// The trade-licence spelling, as used in the canonical layout.tsx node. The
// fuller "Sahara Office Equipment Trading LLC" spelling that had spread to 16
// files is kept as an alternate name below, not as legalName.
export const ORG_NAME = "Sahara Office Equipments";
export const LEGAL_NAME = "Sahara Office Equip Tr LLC";
export const ALTERNATE_NAMES = [
  "Sahara Printer",
  "Sahara Printers UAE",
  "Sahara Office Equipment Trading LLC",
];

export const NAP = {
  streetAddress: "Al Arabi Building, Industrial Center Road, Industrial Area 11",
  addressLocality: "Sharjah",
  addressCountry: "AE",
  addressRegion: "Sharjah",
  postalCode: "47373",
} as const;

export const GEO = {
  latitude: 25.2942534,
  longitude: 55.4260483,
} as const;

export const TELEPHONE = "+971503823969";
export const EMAIL = "info@saharaprinter.com";
export const LOGO = "https://www.saharaprinter.com/images/sahara-navbar-logo.webp";
export const GBP_MAP_URL = "https://maps.google.com/?cid=11820725793384191512";

export const SAME_AS = [
  "https://www.wikidata.org/wiki/Q137021158",
  GBP_MAP_URL,
  "https://www.facebook.com/share/1GM5UxFLTq/",
  "https://www.instagram.com/sahara_office_equipments/",
  "https://www.linkedin.com/company/sahara-office-equipment-trading-llc--sharjah/",
  "https://www.youtube.com/@saharaprinter",
  "https://www.reddit.com/user/Weekly_Drawing_8562/",
  "https://www.quora.com/profile/Sahara-Printer-Printer-Rental-Expert-for-Businesses-UAE",
];

/** Reference to the single canonical Organization node, for use as `provider`, `publisher`, `seller`, etc. */
export function orgRef(): { "@id": string } {
  return { "@id": ORG_ID };
}
