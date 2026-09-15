// Shared with src/app/products/page.tsx (server) and src/components/ProductsClient.tsx
// (client) so both can build from one source without a server component importing a
// data export off a "use client" module — that throws at render time in the App
// Router (a bare property read forces the client reference proxy to resolve), which
// is what caused /products/ to 500 in production until this file was split out.
export const PRODUCTS_FAQS = [
  { q: "Can I rent or buy printers and photocopiers from this page?", a: "Both. Every product listed can be rented monthly (zero deposit, free toner and maintenance included) or purchased outright — request a quote for either option." },
  { q: "What printer brands does Sahara sell in the UAE?", a: "Canon, HP, Kyocera, Xerox, Brother, Ricoh, Samsung, Lexmark, Sharp, and Epson — covering A4 desktop printers, A3 multifunction copiers, and wide-format plotters." },
  { q: "What is the price range for printers and photocopiers?", a: "Rental starts from AED 300/month for an A4 desktop printer, rising to AED 1,200/month for enterprise A3 colour MFPs and wide-format plotters. Outright purchase pricing is available on request." },
  { q: "Is there a difference between new and refurbished products?", a: "Yes — refurbished units are fully serviced and tested Sahara stock at a lower price point, while new units carry full manufacturer warranty. Condition is marked on every product." },
];
