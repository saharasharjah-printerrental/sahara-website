// SEO Internal Linking Map — Topical Authority Structure
// Maps each blog post to contextually relevant service, location, and brand pages

export interface InternalLink {
  href: string;
  label: string;
  type: "service" | "location" | "brand" | "blog" | "tool";
}

export interface BlogLinkConfig {
  primaryService: InternalLink;
  relatedLinks: InternalLink[];
  relatedSlugs: string[]; // slugs of related blog posts
}

export const BLOG_LINK_MAP: Record<string, BlogLinkConfig> = {
  "how-to-choose-the-best-printer-rental-dubai-service": {
    primaryService: { href: "/printer-rental-dubai", label: "Printer Rental Dubai", type: "location" },
    relatedLinks: [
      { href: "/services/printer-rental", label: "Printer Rental UAE", type: "service" },
      { href: "/printer-rental-abu-dhabi", label: "Printer Rental Abu Dhabi", type: "location" },
      { href: "/get-quote", label: "Get a Free Quote", type: "tool" },
      { href: "/services/amc", label: "Annual Maintenance (AMC)", type: "service" },
      { href: "/rental-calculator", label: "Rental Price Calculator", type: "tool" },
    ],
    relatedSlugs: [
      "rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business",
      "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025",
      "what-a-copier-rental-service-must-deliver-to-a-client",
    ],
  },
  "the-problem-we-solve": {
    primaryService: { href: "/services/repair", label: "Printer Repair Services", type: "service" },
    relatedLinks: [
      { href: "/services/amc", label: "Annual Maintenance Contract", type: "service" },
      { href: "/services/printer-rental", label: "Printer Rental UAE", type: "service" },
      { href: "/printer-repair-dubai", label: "Printer Repair Dubai", type: "location" },
    ],
    relatedSlugs: [
      "what-a-copier-rental-service-must-deliver-to-a-client",
      "why-a-company-chooses-copier-rental-service-over-buying-a-copier",
      "the-hidden-cost-of-your-office-copier",
    ],
  },
  "what-a-copier-rental-service-must-deliver-to-a-client": {
    primaryService: { href: "/services/photocopier-rental", label: "Photocopier Rental", type: "service" },
    relatedLinks: [
      { href: "/services/amc", label: "Annual Maintenance Contract", type: "service" },
      { href: "/photocopier-rental-sharjah", label: "Photocopier Rental Sharjah", type: "location" },
      { href: "/copier-lease-uae", label: "Copier Lease UAE", type: "location" },
      { href: "/get-quote", label: "Request a Quote", type: "tool" },
    ],
    relatedSlugs: [
      "why-a-company-chooses-copier-rental-service-over-buying-a-copier",
      "the-problem-we-solve",
      "how-to-choose-the-best-printer-rental-dubai-service",
    ],
  },
  "why-a-company-chooses-copier-rental-service-over-buying-a-copier": {
    primaryService: { href: "/printer-rental-abu-dhabi", label: "Printer Rental Abu Dhabi", type: "location" },
    relatedLinks: [
      { href: "/printer-rental-dubai", label: "Printer Rental Dubai", type: "location" },
      { href: "/services/printer-rental", label: "Printer Rental UAE", type: "service" },
      { href: "/rental-calculator", label: "Calculate Rental Cost", type: "tool" },
      { href: "/copier-lease-uae", label: "Copier Lease UAE", type: "location" },
    ],
    relatedSlugs: [
      "total-cost-of-printer-ownership",
      "the-hidden-cost-of-your-office-copier",
      "rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business",
    ],
  },
  "total-cost-of-printer-ownership": {
    primaryService: { href: "/printer-rental-dubai", label: "Printer Rental Dubai", type: "location" },
    relatedLinks: [
      { href: "/printer-rental-abu-dhabi", label: "Printer Rental Abu Dhabi", type: "location" },
      { href: "/services/printer-rental", label: "Printer Rental UAE", type: "service" },
      { href: "/rental-calculator", label: "TCO Calculator", type: "tool" },
      { href: "/get-quote", label: "Get Rental Quote", type: "tool" },
    ],
    relatedSlugs: [
      "the-hidden-cost-of-your-office-copier",
      "why-a-company-chooses-copier-rental-service-over-buying-a-copier",
      "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental",
    ],
  },
  "video-walkthrough-solving-canon-printer-problems": {
    primaryService: { href: "/services/repair", label: "Printer Repair Services", type: "service" },
    relatedLinks: [
      { href: "/brands/canon", label: "Canon Printers UAE", type: "brand" },
      { href: "/canon-printer-dubai", label: "Canon Printer Dubai", type: "location" },
      { href: "/services/amc", label: "Canon Printer AMC", type: "service" },
      { href: "/services/toner", label: "Canon Toner & Spare Parts", type: "service" },
    ],
    relatedSlugs: [
      "the-problem-we-solve",
      "stop-wasting-money-on-printing-your-guide-to-smarter-office-habits",
      "what-a-copier-rental-service-must-deliver-to-a-client",
    ],
  },
  "the-hidden-cost-of-your-office-copier": {
    primaryService: { href: "/services/printer-rental", label: "Printer Rental UAE", type: "service" },
    relatedLinks: [
      { href: "/services/amc", label: "Annual Maintenance (AMC)", type: "service" },
      { href: "/rental-calculator", label: "Cost Comparison Calculator", type: "tool" },
      { href: "/copier-lease-uae", label: "Copier Lease UAE", type: "location" },
    ],
    relatedSlugs: [
      "total-cost-of-printer-ownership",
      "stop-wasting-money-on-printing-your-guide-to-smarter-office-habits",
      "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental",
    ],
  },
  "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental": {
    primaryService: { href: "/printer-rental-dubai", label: "Printer Rental Dubai", type: "location" },
    relatedLinks: [
      { href: "/printer-rental-abu-dhabi", label: "Printer Rental Abu Dhabi", type: "location" },
      { href: "/services/printer-rental", label: "Printer Rental UAE", type: "service" },
      { href: "/get-quote", label: "Get Dubai Quote", type: "tool" },
      { href: "/rental-calculator", label: "Calculate Savings", type: "tool" },
    ],
    relatedSlugs: [
      "the-hidden-cost-of-your-office-copier",
      "total-cost-of-printer-ownership",
      "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025",
    ],
  },
  "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025": {
    primaryService: { href: "/printer-rental-dubai", label: "Printer Rental Dubai", type: "location" },
    relatedLinks: [
      { href: "/printer-rental-abu-dhabi", label: "Printer Rental Abu Dhabi", type: "location" },
      { href: "/services/printer-rental", label: "Printer Rental UAE", type: "service" },
      { href: "/photocopier-rental-sharjah", label: "Photocopier Sharjah", type: "location" },
      { href: "/get-quote", label: "Get a Custom Quote", type: "tool" },
    ],
    relatedSlugs: [
      "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental",
      "why-a-company-chooses-copier-rental-service-over-buying-a-copier",
      "rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business",
    ],
  },
  "rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business": {
    primaryService: { href: "/printer-rental-dubai", label: "Printer Rental Dubai", type: "location" },
    relatedLinks: [
      { href: "/printer-rental-abu-dhabi", label: "Printer Rental Abu Dhabi", type: "location" },
      { href: "/rental-calculator", label: "Rent vs Buy Calculator", type: "tool" },
      { href: "/services/sales", label: "Buy a Printer (Corporate Sales)", type: "service" },
      { href: "/copier-lease-uae", label: "Copier Lease UAE", type: "location" },
    ],
    relatedSlugs: [
      "total-cost-of-printer-ownership",
      "the-hidden-cost-of-your-office-copier",
      "why-a-company-chooses-copier-rental-service-over-buying-a-copier",
    ],
  },
  "stop-wasting-money-on-printing-your-guide-to-smarter-office-habits": {
    primaryService: { href: "/services/amc", label: "Annual Maintenance (AMC)", type: "service" },
    relatedLinks: [
      { href: "/services/toner", label: "Toner & Spare Parts", type: "service" },
      { href: "/services/printer-rental", label: "All-Inclusive Printer Rental", type: "service" },
      { href: "/get-quote", label: "Reduce Printing Costs Now", type: "tool" },
    ],
    relatedSlugs: [
      "the-hidden-cost-of-your-office-copier",
      "total-cost-of-printer-ownership",
      "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental",
    ],
  },
};

// Service page to blog post mapping — for "From Our Blog" sections
export const SERVICE_BLOG_MAP: Record<string, string[]> = {
  "printer-rental": [
    "how-to-choose-the-best-printer-rental-dubai-service",
    "printer-rental-vs-buying-uae-2026-cost-breakdown",
    "why-a-company-chooses-copier-rental-service-over-buying-a-copier",
    "rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business",
    "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025",
  ],
  "photocopier-rental": [
    "what-a-copier-rental-service-must-deliver-to-a-client",
    "how-to-choose-photocopier-small-office-sharjah",
    "why-a-company-chooses-copier-rental-service-over-buying-a-copier",
    "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental",
  ],
  "amc": [
    "printer-amc-dubai-whats-included",
    "total-cost-of-printer-ownership",
    "stop-wasting-money-on-printing-your-guide-to-smarter-office-habits",
    "the-hidden-cost-of-your-office-copier",
  ],
  "repair": [
    "video-walkthrough-solving-canon-printer-problems",
    "the-problem-we-solve",
    "what-a-copier-rental-service-must-deliver-to-a-client",
  ],
  "printer-spare-parts": [
    "toner-vs-ink-cartridge-uae-buyers-guide",
  ],
  "paper-shredder-rental": [
    "paper-shredder-rental-uae-when-it-beats-buying",
  ],
  "papercut-print-management": [
    "papercut-print-management-uae-offices",
  ],
};

// Brand to related content mapping — for brand page link sections
export const RELATED_BRAND_MAP: Record<string, { services: string[]; blogs: string[]; locations: string[] }> = {
  canon: {
    services: ["/services/printer-rental", "/services/repair"],
    blogs: ["how-to-choose-the-best-printer-rental-dubai-service", "printer-amc-dubai-whats-included"],
    locations: ["/printer-rental-dubai", "/printer-rental-abu-dhabi"],
  },
  hp: {
    services: ["/services/repair", "/services/printer-rental"],
    blogs: ["printer-amc-dubai-whats-included", "printer-rental-vs-buying-uae-2026-cost-breakdown"],
    locations: ["/printer-rental-dubai", "/photocopier-rental-sharjah"],
  },
  kyocera: {
    services: ["/services/printer-rental", "/services/amc"],
    blogs: ["printer-rental-vs-buying-uae-2026-cost-breakdown", "total-cost-of-printer-ownership"],
    locations: ["/printer-rental-dubai", "/printer-rental-abu-dhabi"],
  },
  ricoh: {
    services: ["/services/amc", "/services/printer-rental"],
    blogs: ["printer-amc-dubai-whats-included", "how-to-choose-photocopier-small-office-sharjah"],
    locations: ["/photocopier-rental-sharjah", "/printer-rental-abu-dhabi"],
  },
  xerox: {
    services: ["/services/printer-rental", "/services/repair"],
    blogs: ["printer-rental-vs-buying-uae-2026-cost-breakdown", "how-to-choose-photocopier-small-office-sharjah"],
    locations: ["/printer-rental-dubai", "/copier-lease-uae"],
  },
  brother: {
    services: ["/services/printer-rental", "/services/repair"],
    blogs: ["how-to-choose-the-best-printer-rental-dubai-service"],
    locations: ["/printer-rental-dubai", "/photocopier-rental-sharjah"],
  },
  sharp: {
    services: ["/services/printer-rental", "/services/amc"],
    blogs: ["how-to-choose-photocopier-small-office-sharjah"],
    locations: ["/photocopier-rental-sharjah", "/printer-rental-dubai"],
  },
  epson: {
    services: ["/services/printer-rental", "/services/repair"],
    blogs: ["toner-vs-ink-cartridge-uae-buyers-guide"],
    locations: ["/printer-rental-dubai", "/printer-rental-abu-dhabi"],
  },
  samsung: {
    services: ["/services/printer-rental", "/services/repair"],
    blogs: ["printer-rental-vs-buying-uae-2026-cost-breakdown"],
    locations: ["/printer-rental-dubai", "/photocopier-rental-sharjah"],
  },
  lexmark: {
    services: ["/services/printer-rental", "/services/amc"],
    blogs: ["papercut-print-management-uae-offices", "printer-amc-dubai-whats-included"],
    locations: ["/printer-rental-dubai", "/printer-rental-abu-dhabi"],
  },
};

// Anchor text map for inline contextual links (used in blog content)
export const ANCHOR_TEXT_MAP: Record<string, string> = {
  "/services/printer-rental": "printer rental UAE",
  "/services/photocopier-rental": "photocopier rental",
  "/services/amc": "annual maintenance contract",
  "/services/repair": "printer repair services",
  "/services/toner": "toner and spare parts",
  "/services/sales": "corporate printer sales",
  "/printer-rental-dubai": "printer rental Dubai",
  "/printer-rental-abu-dhabi": "printer rental Abu Dhabi",
  "/photocopier-rental-sharjah": "photocopier rental Sharjah",
  "/copier-lease-uae": "copier lease UAE",
  "/printer-repair-dubai": "printer repair Dubai",
  "/canon-printer-dubai": "Canon printer Dubai",
  "/hp-printer-abu-dhabi": "HP printer Abu Dhabi",
  "/brands/canon": "Canon printers",
  "/brands/hp": "HP printers",
  "/brands/kyocera": "Kyocera printers",
  "/brands/ricoh": "Ricoh printers",
  "/brands/xerox": "Xerox printers",
  "/brands/brother": "Brother printers",
  "/brands/sharp": "Sharp printers",
  "/brands/epson": "Epson printers",
  "/brands/samsung": "Samsung printers",
  "/brands/lexmark": "Lexmark printers",
  "/get-quote": "get a free quote",
  "/rental-calculator": "rental cost calculator",
};

export const LINK_TYPE_COLORS: Record<InternalLink["type"], string> = {
  service: "text-[#f5be53] bg-[#f5be53]/10 border-[#f5be53]/20",
  location: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  brand: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  blog: "text-green-400 bg-green-400/10 border-green-400/20",
  tool: "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

export const LINK_TYPE_LABELS: Record<InternalLink["type"], string> = {
  service: "Service",
  location: "Location",
  brand: "Brand",
  blog: "Article",
  tool: "Tool",
};
