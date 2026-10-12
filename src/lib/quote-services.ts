export interface QuoteService {
  slug: string;
  name: string;
  page: string;
  summary: string;
  question: string;
  options: string[];
  detailLabel: string;
  detailPlaceholder: string;
}

export const quoteServices: QuoteService[] = [
  { slug: "printer-rental", name: "Printer Rental", page: "/services/printer-rental/", summary: "Office printers from AED 250/month. Get a recommendation based on your print volume and paper size.", question: "What will you print?", options: ["A4 office documents", "A3 colour documents", "High-volume office printing", "Help me choose"], detailLabel: "Approximate monthly pages", detailPlaceholder: "For example, 2,000 pages or not sure" },
  { slug: "label-printer-rental", name: "A3 Label Printer Rental", page: "/services/printer-rental/#label-printing", summary: "AED 549/month for a customised printer for labels up to A3 and compatible paper up to 300 gsm. Media compatibility is checked before setup.", question: "What material will you print on?", options: ["Self-adhesive label sheets", "Heavy paper / card up to 300 gsm", "Labels and heavy paper", "Help me choose"], detailLabel: "Paper size, weight and monthly volume", detailPlaceholder: "For example, A3 labels, 200 gsm, 500 sheets" },
  { slug: "paper-shredder-rental", name: "Paper Shredder Rental", page: "/services/paper-shredder-rental/", summary: "LX65: AED 450/month. 325Ci: AED 900/month. Delivery, installation, transport and maintenance included.", question: "Choose your shredder", options: ["LX65 - AED 450/month", "325Ci - AED 900/month", "Help me choose"], detailLabel: "Rental duration and start date", detailPlaceholder: "For example, 3 months, starting next week" },
  { slug: "pvc-card-printer-rental", name: "PVC Card Printer Rental", page: "/services/pvc-card-printer-rental/", summary: "Hire an ID card printer for an event, onboarding or ongoing in-house printing. Pricing depends on duration and card requirements.", question: "Rental duration", options: ["Event / short term", "Monthly", "Annual", "Help me choose"], detailLabel: "Number of cards and required date", detailPlaceholder: "For example, 500 double-sided staff cards in November" },
  { slug: "pvc-card-printer-sales", name: "PVC Card Printer Sales", page: "/bravo-card-printers-uae/", summary: "Compare card printers for staff IDs, membership and access cards, with suitable ribbons and local support.", question: "Printing requirement", options: ["Single-sided cards", "Double-sided cards", "Security / encoding requirements", "Help me choose"], detailLabel: "Monthly card volume and preferred model", detailPlaceholder: "For example, 300 cards/month, recommend a model" },
  { slug: "pvc-card-printing", name: "PVC Card Printing Services", page: "/services/pvc-card-printing-services/", summary: "Order finished printed cards without buying or renting a printer. Tell us the quantity, finish and deadline.", question: "Card type", options: ["Employee / student ID", "Membership / loyalty cards", "Access / security cards", "Custom printed cards"], detailLabel: "Quantity and delivery deadline", detailPlaceholder: "For example, 200 double-sided cards by 15 November" },
  { slug: "paper-shredder-sales", name: "Paper Shredder Sales", page: "/services/paper-shredder-sales/", summary: "Find a shredder suited to your document volume and security requirements.", question: "Usage", options: ["Personal / small office", "Department / shared office", "Bulk document clear-out", "Help me choose"], detailLabel: "Document volume or preferred model", detailPlaceholder: "For example, 10 users, confidential office records" },
  { slug: "printer-repair", name: "Printer Repair", page: "/services/repair/", summary: "Request a repair assessment for your printer or photocopier.", question: "Main issue", options: ["Paper jams / feeding", "Print quality", "Error code / not printing", "Other / diagnosis needed"], detailLabel: "Brand, model and fault", detailPlaceholder: "For example, Canon C3520, paper jams in tray 1" },
  { slug: "printer-amc", name: "Printer Maintenance Contract", page: "/services/amc/", summary: "Get maintenance cover matched to your equipment and usage.", question: "Fleet size", options: ["1 printer", "2-5 printers", "6 or more printers", "Multiple locations"], detailLabel: "Printer models and monthly usage", detailPlaceholder: "For example, 3 Kyocera printers, 10,000 pages/month" },
  { slug: "printer-sales", name: "Printer Sales", page: "/products/", summary: "Get a printer recommendation and purchase quote for your office.", question: "Printer type", options: ["A4 printer", "A3 multifunction printer", "Colour printer", "Help me choose"], detailLabel: "Volume and preferred brand or model", detailPlaceholder: "For example, 5,000 pages/month, colour A3" },
  { slug: "plotter-maintenance", name: "Plotter Maintenance", page: "/services/plotter-maintenance/", summary: "Request servicing or fault diagnosis for your large-format printer.", question: "Service needed", options: ["Repair / fault diagnosis", "Routine servicing", "Maintenance contract"], detailLabel: "Plotter model and issue", detailPlaceholder: "Brand, model, error code or symptoms" },
  { slug: "print-management", name: "PaperCut Print Management", page: "/services/papercut-print-management/", summary: "Discuss print tracking, access controls and fleet management for your organisation.", question: "Main requirement", options: ["Track printing costs", "Secure print release", "Manage multiple sites", "Help me choose"], detailLabel: "Number of printers and users", detailPlaceholder: "For example, 10 printers, 150 users, 2 offices" },
];

export function getQuoteService(slug: string) {
  return quoteServices.find((service) => service.slug === slug);
}

export function quoteHrefForPath(pathname: string): string {
  const path = pathname.replace(/\/$/, "");
  if (path.startsWith("/quote/")) return `${path}/`;
  const exact = quoteServices.find((service) => service.page.split("#")[0].replace(/\/$/, "") === path);
  if (exact) return `/quote/${exact.slug}/`;
  if (/printer-spare-parts|\/cart|\/request-quote/.test(path)) return "/request-quote/";
  if (/printer-repair|\/services\/repair/.test(path)) return "/quote/printer-repair/";
  if (/printer-amc/.test(path)) return "/quote/printer-amc/";
  if (/printer-rental|photocopier-rental|rental-calculator/.test(path)) return "/quote/printer-rental/";
  return "/quote/";
}
