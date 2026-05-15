"use client";

export const runtime = 'edge';

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BLOG_CONTENT } from "@/lib/blogContent";
import { BLOG_LINK_MAP } from "@/lib/internalLinks";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  status: string;
  coverImage: string;
  publishedAt: string;
  createdAt: string;
}

// Minimal fallback when both D1 and localStorage are unavailable (localhost first run)
const samplePosts: BlogPost[] = [
  { id: "1", title: "How to Choose the Best Printer Rental Dubai Service?", slug: "how-to-choose-the-best-printer-rental-dubai-service", excerpt: "Start your search for printer rental Dubai with a quick audit you can finish this afternoon", content: BLOG_CONTENT["how-to-choose-the-best-printer-rental-dubai-service"] ?? "", category: "Guide", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1771224373/blogs/ai73xmapai8rb1z1u7qg.webp", publishedAt: "2/16/2026", createdAt: "2026-02-16" },
  { id: "2", title: "The Problem We Solve", slug: "the-problem-we-solve", excerpt: "In any office, the sudden breakdown of a document printer or copier creates a cascade of problems.", content: BLOG_CONTENT["the-problem-we-solve"] ?? "", category: "Insights", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758721285/blogs/iblcpt0jm18wwey7nm41.jpg", publishedAt: "9/24/2025", createdAt: "2025-09-24" },
  { id: "3", title: "What a Copier Rental Service Must Deliver to a Client", slug: "what-a-copier-rental-service-must-deliver-to-a-client", excerpt: "A successful copier rental service is defined not just by the equipment it provides, but by the quality of the service.", content: BLOG_CONTENT["what-a-copier-rental-service-must-deliver-to-a-client"] ?? "", category: "Guide", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758723167/blogs/gifymghto0ykchvzrjyt.jpg", publishedAt: "9/24/2025", createdAt: "2025-09-24" },
  { id: "4", title: "Why a Company Chooses Copier Rental Service Over Buying a Copier", slug: "why-a-company-chooses-copier-rental-service-over-buying-a-copier", excerpt: "A company's decision to rent a copier instead of buying one is about far more than just the initial investment.", content: BLOG_CONTENT["why-a-company-chooses-copier-rental-service-over-buying-a-copier"] ?? "", category: "Guide", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758617392/blogs/icz06yszynxpk624dmox.jpg", publishedAt: "8/23/2025", createdAt: "2025-08-23" },
  { id: "5", title: "Total Cost of Printer Ownership", slug: "total-cost-of-printer-ownership", excerpt: "While the initial purchase price of a copier may seem affordable, the true cost is often much higher.", content: BLOG_CONTENT["total-cost-of-printer-ownership"] ?? "", category: "Finance", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758623726/blogs/rm2ptjektgnlq5hyoeyl.jpg", publishedAt: "8/23/2025", createdAt: "2025-08-23" },
  { id: "6", title: "Video Walkthrough: Solving Canon Printer Problems", slug: "video-walkthrough-solving-canon-printer-problems", excerpt: "This video tutorial guides you through practical steps to troubleshoot common Canon printer issues.", content: BLOG_CONTENT["video-walkthrough-solving-canon-printer-problems"] ?? "", category: "Troubleshooting", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1754304132/blogs/mmmyp3kxrfsp1aryzule.png", publishedAt: "8/4/2025", createdAt: "2025-08-04" },
  { id: "7", title: "The Hidden Cost of Your Office Copier", slug: "the-hidden-cost-of-your-office-copier", excerpt: "Our competitors may offer a cheaper initial price, but this often comes at the expense of hidden costs.", content: BLOG_CONTENT["the-hidden-cost-of-your-office-copier"] ?? "", category: "Finance", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758285328/blogs/mukam5nzst3o6lvhac5m.jpg", publishedAt: "8/4/2025", createdAt: "2025-08-04" },
  { id: "8", title: "How Dubai Companies Save Budget by Choosing Value-Driven Printer Rental", slug: "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental", excerpt: "Dubai's dynamic business environment demands efficiency and cost-effectiveness.", content: BLOG_CONTENT["how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental"] ?? "", category: "Finance", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1752651510/blogs/l3byyc7o8a8f1lddujis.jpg", publishedAt: "7/16/2025", createdAt: "2025-07-16" },
  { id: "9", title: "Real Estate to Clinics: Why Every UAE Business is Renting Printers in 2025", slug: "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025", excerpt: "It's 2025, and even the most glamorous offices have one thing in common—no one actually owns their printers.", content: BLOG_CONTENT["real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025"] ?? "", category: "Trends", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1751102332/blogs/dqusdi9d0tonfoa0ggx6.jpg", publishedAt: "6/28/2025", createdAt: "2025-06-28" },
  { id: "10", title: "Rent or Buy Your Office Printer? Let's Talk Smart Choices for Your Business", slug: "rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business", excerpt: "Every business owner knows that big decisions can really impact your wallet and your team.", content: BLOG_CONTENT["rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business"] ?? "", category: "Guide", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1749630742/blogs/ue4jwdxdlp655oeoylsq.png", publishedAt: "6/11/2025", createdAt: "2025-06-11" },
  { id: "11", title: "Stop Wasting Money on Printing: Your Guide to Smarter Office Habits", slug: "stop-wasting-money-on-printing-your-guide-to-smarter-office-habits", excerpt: "Does your business constantly track every penny, yet somehow printing costs just fly under the radar?", content: BLOG_CONTENT["stop-wasting-money-on-printing-your-guide-to-smarter-office-habits"] ?? "", category: "Tips", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1749638040/blogs/ldevdfienoa4ibffpix0.png", publishedAt: "6/11/2025", createdAt: "2025-06-11" },
  {
    id: "12",
    title: "Kyocera vs Canon vs Ricoh: Best Copier for UAE Office in 2025",
    slug: "kyocera-vs-canon-vs-ricoh-best-copier-uae-2025",
    excerpt: "After servicing 1,500+ units across the UAE since 2012, here's hands-on data on how Kyocera, Canon, and Ricoh perform in real Gulf office environments.",
    category: "Buying Guide",
    status: "draft",
    coverImage: "",
    publishedAt: "",
    createdAt: "2026-04-27",
    content: `<h2>Kyocera vs Canon vs Ricoh: Which Copier Brand is Best for Your UAE Office?</h2><p>Choosing the right office copier brand in Dubai or Sharjah affects your daily productivity and 3–5 year budget. After servicing and renting <strong>1,500+ units across the UAE since 2012</strong>, Sahara Office Equipments has hands-on data on how Kyocera, Canon, and Ricoh perform in real Gulf office environments — not just spec sheets.</p><h2>Quick Answer: Kyocera, Canon, or Ricoh?</h2><p><strong>Kyocera leads on total cost of ownership</strong> due to its long-life drum system, which reduces consumable waste by up to 30% vs Canon or Ricoh. Canon excels in colour accuracy, preferred by real estate and creative firms. Ricoh leads in high-volume monochrome environments (legal, government, logistics). All three are available in the UAE with local parts support — but Kyocera and Canon have the strongest authorised service networks in Dubai and Sharjah.</p><h2>Kyocera: Best for Cost-Efficiency</h2><p>Kyocera's proprietary <strong>long-life drum technology</strong> is its biggest advantage. A standard Canon or Ricoh toner needs replacement every 10,000–15,000 pages, while Kyocera's drum lasts up to 500,000 pages on select models. In a Dubai office printing 3,000–5,000 pages/month, that's a major consumable cost reduction over a 3-year <a href="/services/printer-rental">rental</a> or <a href="/services/amc">AMC period</a>.</p><ul><li><strong>Best for:</strong> SMEs, JLT offices, Sharjah industrial companies</li><li><strong>Popular model:</strong> Kyocera ECOSYS M3145dn</li><li><strong>Weakness:</strong> Slower colour saturation than Canon on photo-heavy printing</li></ul><h2>Canon: Best for Colour and Document Quality</h2><p>Canon's imageRUNNER ADVANCE series dominates UAE real estate, architecture, and marketing offices because of its <strong>superior colour reproduction</strong>. Canon UAE has one of the widest service networks across Dubai, Abu Dhabi, and Sharjah. If your office prints property brochures, A3 colour documents, or marketing materials, Canon is the clear choice.</p><ul><li><strong>Best for:</strong> Real estate, design firms, DIFC companies, hospitals</li><li><strong>Popular model:</strong> Canon imageRUNNER ADVANCE C3520i</li><li><strong>Weakness:</strong> Higher per-page cost than Kyocera in monochrome-heavy environments</li></ul><h2>Ricoh: Best for High-Volume Workflow</h2><p>Ricoh's IM Series excels in legal, government, and logistics environments where <strong>high-volume monochrome printing</strong> (10,000+ pages/month) is the norm. Ricoh scanners are renowned for OCR accuracy, ideal for document digitisation. Ricoh has strong presence in Abu Dhabi government contracts and JAFZA-based companies.</p><ul><li><strong>Best for:</strong> Legal firms, government offices, logistics (JAFZA, SAIF Zone)</li><li><strong>Popular model:</strong> Ricoh IM C3000</li><li><strong>Weakness:</strong> Fewer authorised service points in Sharjah vs Canon/Kyocera</li></ul><h2>Why Renting Makes Brand Choice Easier</h2><p>One underrated advantage of <a href="/services/printer-rental">printer rental in Dubai</a> is that you can switch brands without capital loss. Our rental clients regularly upgrade from Kyocera to Canon when business needs shift — no depreciation, no disposal cost. Start with a 12-month <a href="/services/printer-rental">rental plan from AED 250/month</a> and test your preferred brand. Explore our brand pages: <a href="/brands/kyocera">Kyocera UAE</a>, <a href="/brands/canon">Canon UAE</a>, <a href="/brands/ricoh">Ricoh UAE</a>. Or <a href="/get-quote">get a free quote</a> and our team will recommend the right fit.</p><h2>FAQ</h2><p><strong>Which brand has the best service network in Dubai?</strong><br>Canon and Kyocera both have strong authorised networks in Dubai and Sharjah. Sahara services all three brands with a <strong>4-hour response time SLA</strong>.</p><p><strong>Which copier brand is most reliable in UAE heat?</strong><br>All three are designed for UAE's climate, but Kyocera's simpler drum mechanism tends to perform better in dusty industrial environments like SAIF Zone or DIP.</p>`
  },
  {
    id: "13",
    title: "What is a Printer AMC? Complete Guide for UAE Businesses in 2025",
    slug: "what-is-printer-amc-uae-guide-2025",
    excerpt: "What exactly does a Printer AMC cover, what does it cost in UAE, and is it worth it compared to paying for repairs as needed? Everything explained.",
    category: "Guide",
    status: "draft",
    coverImage: "",
    publishedAt: "",
    createdAt: "2026-04-27",
    content: `<h2>What is a Printer AMC? Annual Maintenance Contract Explained for UAE Businesses</h2><p>If you manage more than two printers or copiers in a UAE office, you've likely heard the term <strong>Printer AMC</strong> (Annual Maintenance Contract). But what exactly does it cover, what does it cost, and is it worth it compared to paying for repairs as needed? This guide explains everything — based on <strong>13+ years serving offices across Dubai, Sharjah, Abu Dhabi, and JAFZA</strong>.</p><h2>What is a Printer AMC in UAE?</h2><p>A <strong>Printer AMC (Annual Maintenance Contract)</strong> is a fixed annual agreement where a service company like Sahara Office Equipments maintains your printers, copiers, and MFDs throughout the year for a predetermined fee — typically <strong>AED 800–2,500/year per device</strong> depending on model and usage. The AMC covers preventive maintenance, labour for breakdowns, and often parts, eliminating unpredictable repair bills.</p><h2>What Does a Printer AMC Cover?</h2><ul><li><strong>Preventive maintenance visits</strong> (quarterly or biannual)</li><li><strong>Breakdown response within 4 hours</strong> across Dubai, Sharjah, and Abu Dhabi</li><li><strong>Labour costs for all repairs</strong> during the contract period</li><li><strong>Drum and fuser unit replacements</strong> (on comprehensive plans)</li><li><strong>30-day workmanship guarantee</strong> on all repaired parts</li></ul><p>Toner/ink cartridges are typically billed separately unless you opt for a cost-per-copy (CPC) plan that bundles consumables into a per-page rate.</p><h2>Printer AMC vs. Ad-Hoc Repair: Which Saves More?</h2><p>A single <strong>fuser unit replacement</strong> for a mid-range Canon or Kyocera copier in Dubai costs AED 450–850 including labour. A drum kit for a Ricoh IM series runs AED 600–1,200. Two unplanned repairs per year — common in high-usage offices — puts you at AED 900–2,000 in unbudgeted costs, without any preventive maintenance. An AMC consolidates this into one predictable annual payment.</p><h2>Types of Printer AMC Plans in UAE</h2><h3>Labour-Only AMC</h3><p>Covers technician visits and labour. Parts billed at cost. Best for newer devices (under 3 years). <strong>From AED 800/year per device.</strong></p><h3>Comprehensive AMC (Labour + Parts)</h3><p>Covers labour <em>and</em> most mechanical parts including drums, fusers, rollers. Best for devices over 3 years or high-volume environments. <strong>Typically AED 1,500–2,500/year per device.</strong></p><h3>Cost-Per-Copy (CPC) AMC</h3><p>Pay a fixed per-page rate (e.g. AED 0.015/monochrome page). All maintenance, parts, <em>and toner</em> included. Popular with JAFZA logistics companies and Sharjah manufacturing firms.</p><h2>Is Your Office Ready for an AMC?</h2><p>You likely need a printer AMC if your office prints <strong>more than 3,000 pages/month</strong>, has had two or more unplanned repairs in the last 12 months, or operates multiple branches across UAE. Explore our <a href="/services/amc">Printer AMC plans in Dubai and UAE</a>, or use our <a href="/get-quote">free quote form</a> for a tailored recommendation. If your device needs immediate repair first, visit our <a href="/services/repair">printer repair page</a> — we offer a 30-day workmanship warranty on all repairs before transitioning to an AMC.</p><h2>FAQ</h2><p><strong>What is the typical cost of a printer AMC in Dubai?</strong><br>Printer AMC costs range from <strong>AED 800–2,500/year per device</strong>. Multi-device contracts receive discounted rates.</p><p><strong>Does printer AMC cover toner?</strong><br>Standard plans do not. Our CPC (Cost-Per-Copy) plan includes toner within the per-page rate.</p><p><strong>How fast is the response time under AMC?</strong><br>Sahara guarantees a <strong>4-hour response time</strong> across Dubai, Sharjah, Abu Dhabi, and Ajman.</p><p><strong>Can I get an AMC for a printer I didn't buy from you?</strong><br>Yes. We service Canon, Kyocera, Ricoh, HP, and Xerox devices regardless of purchase origin. <a href="/get-quote">Contact us</a> with your device model for a quote.</p>`
  },
  {
    id: "14",
    title: "Printer Rental for Real Estate Offices in Dubai: 2025 Complete Guide",
    slug: "printer-rental-real-estate-offices-dubai-2025",
    excerpt: "Property transactions, tenancy contracts, A3 brochures — Dubai real estate offices are paper-intensive. Here's how to choose the right printer rental solution.",
    category: "Case Study",
    status: "draft",
    coverImage: "",
    publishedAt: "",
    createdAt: "2026-04-27",
    content: `<h2>Printer Rental for Real Estate Offices in Dubai: Everything You Need in 2025</h2><p>Dubai's real estate sector is one of the world's most paper-intensive industries. Property listings, tenancy contracts, title deed copies, NOC letters, SPA agreements — a single property transaction can generate 50+ printed pages. With transaction volumes at record highs in 2025, choosing the right printing solution for your real estate office is a serious operational decision.</p><h2>Best Printer Rental Option for Real Estate Offices in Dubai</h2><p>For Dubai real estate offices, the optimal solution is a <strong>colour A3 multifunction copier (Canon imageRUNNER or Kyocera TASKalfa series) on a monthly rental from AED 350–650/month</strong>, including maintenance. This gives agents the ability to print A3 property brochures, colour floor plans, and legal contracts without the AED 15,000–25,000 capital outlay of buying outright. Sahara Office Equipments serves <strong>200+ real estate firms</strong> across DIFC, Business Bay, JLT, and Jumeirah.</p><h2>Why Real Estate Offices Have Unique Printer Requirements</h2><ul><li><strong>A3 colour printing</strong> — property brochures, floor plans, site maps</li><li><strong>High-speed output</strong> — 30–45 ppm minimum for busy front-desk operations</li><li><strong>Scan-to-email</strong> — sending signed contracts instantly to clients or DLD</li><li><strong>High-volume capacity</strong> — busy agencies print 5,000–15,000 pages/month</li><li><strong>Reliability</strong> — a jammed printer during contract signing is unacceptable</li></ul><h2>Colour vs Monochrome: Which Does Your Agency Need?</h2><p>If your office prints only tenancy contracts and internal documents — a <strong>monochrome A4 MFD (AED 250–350/month)</strong> is sufficient. But if you print property listings, marketing one-pagers, or brochures for projects like Dubai Hills or Marina Gate — you need a <strong>colour A3 copier</strong>. Most established agencies in Business Bay and DIFC run one colour A3 device plus one fast monochrome A4 unit for contracts.</p><h2>Renting vs. Buying: The Real Estate Office Calculation</h2><p>A quality colour A3 copier (Canon iR ADV C3520i) costs <strong>AED 18,000–22,000 to buy outright</strong>. With maintenance, toner, and breakdown risk, the 3-year total cost typically reaches AED 28,000–35,000. Renting the same device at AED 550/month for 36 months = <strong>AED 19,800 total</strong>, with all maintenance, toner delivery, and breakdown support included — no hidden costs. See our <a href="/services/printer-rental">printer rental plans</a> or try our <a href="/rental-calculator">rental cost calculator</a>.</p><h2>Which Brands Work Best for Real Estate Offices?</h2><p><a href="/brands/canon">Canon imageRUNNER ADVANCE</a> is the #1 choice among Dubai real estate firms for colour accuracy. <a href="/brands/kyocera">Kyocera TASKalfa</a> offers better cost-per-page for agencies doing mixed colour and monochrome. Both are serviced by Sahara with a <strong>4-hour response time</strong> across DIFC, JLT, Business Bay, and Downtown Dubai.</p><h2>How to Get Started</h2><ol><li>Estimate your monthly page volume (check your last toner bill)</li><li>Decide: colour A3, colour A4, or monochrome A4</li><li>Choose a 12, 24, or 36-month rental term (longer = lower monthly rate)</li><li><a href="/get-quote">Request a free quote</a> — we deliver and install within 24–48 hours across Dubai</li></ol><p>We cover real estate agencies in DIFC, JLT, Business Bay, Jumeirah, Al Quoz, and JAFZA. For Sharjah agencies, see our <a href="/photocopier-rental-sharjah">photocopier rental Sharjah</a> page. Multi-branch agencies can explore our <a href="/services/photocopier-rental">photocopier rental service</a> for fleet pricing.</p><h2>FAQ</h2><p><strong>What is the minimum rental period for a printer in Dubai?</strong><br>Sahara offers minimum <strong>12-month rental contracts</strong>, with 24 and 36-month options at lower monthly rates. Short-term (1–3 month) rentals are available for project needs.</p><p><strong>Does the rental include toner and maintenance?</strong><br>Yes. All standard rental plans include scheduled maintenance, <strong>4-hour breakdown support</strong>, and toner delivery.</p><p><strong>Can I rent a printer for a new office that hasn't opened yet?</strong><br>Yes. We handle new office setups including installation, network configuration, and driver setup within 48 hours of contract signing.</p>`
  },
  {
    id: "15",
    title: "Printer Repair vs. Replacement: How Dubai Businesses Should Decide in 2025",
    slug: "printer-repair-vs-replacement-dubai-guide-2025",
    excerpt: "Your office printer broke down — again. Is it worth repairing or time to replace? Based on 50,000+ repairs in the UAE, here's how to make the right call.",
    category: "Guide",
    status: "draft",
    coverImage: "",
    publishedAt: "",
    createdAt: "2026-04-27",
    content: `<h2>Printer Repair vs. Replacement: How Dubai Businesses Should Decide in 2025</h2><p>Your office printer just broke down — again. Every UAE office manager faces this question: is it worth repairing, or is it time to replace it? The wrong answer either wastes money on a dying machine or needlessly discards a device that still has years of productive life. Based on <strong>50,000+ repairs across Dubai, Sharjah, and Abu Dhabi since 2012</strong>, here's how to decide correctly.</p><h2>The 50% Rule: Repair or Replace?</h2><p>The industry benchmark is the <strong>50% rule</strong>: if the repair cost exceeds 50% of the current market value of the device, replace it. For a 5-year-old Canon iR2530 with a market value of AED 1,500, a repair quote above AED 750 makes replacement smarter. However, for a 2-year-old Kyocera ECOSYS under <a href="/services/amc">AMC coverage</a>, almost all repairs are covered — making repair the obvious answer.</p><h2>UAE Printer Market Values (2025)</h2><ul><li><strong>Entry-level A4 MFD (0–2 years):</strong> AED 800–1,500 → repair if under AED 400–750</li><li><strong>Mid-range A4 MFD (2–4 years):</strong> AED 2,000–4,000 → repair if under AED 1,000–2,000</li><li><strong>A3 Colour Copier (3–5 years):</strong> AED 5,000–12,000 → repair if under AED 2,500–6,000</li><li><strong>High-volume production copier (5+ years):</strong> AED 3,000–8,000 → repair only if parts are readily available</li></ul><h2>When Repair is the Right Choice</h2><ul><li>Device is under 3 years old and failure is isolated (fuser, rollers, toner sensor)</li><li>You have an active <a href="/services/amc">AMC plan</a> that covers the repair</li><li>Replacement parts are readily available in UAE (Canon, Kyocera, Ricoh stock)</li><li>Device has features not easily replicated in a new entry-level device (A3 colour, high-speed duplex)</li></ul><h2>When Replacement (or Rental) Makes More Sense</h2><ul><li>Repair cost exceeds the 50% threshold</li><li>Device has required <strong>3+ repairs in the past 12 months</strong></li><li>Parts are difficult to source (discontinued models, grey-market imports)</li><li>Your print volume has grown beyond the device's rated monthly duty cycle</li><li>Device is over 7 years old</li></ul><p>In many cases, the smartest "replacement" is switching to a <a href="/services/printer-rental">printer rental plan</a>. At AED 250–650/month, you get a new or low-usage device with full maintenance included, eliminating both capital cost and future repair risk.</p><h2>Common Printer Repair Costs in Dubai (Parts + Labour)</h2><ul><li><strong>Fuser unit replacement (Canon/Kyocera):</strong> AED 450–850</li><li><strong>Drum kit replacement:</strong> AED 400–700</li><li><strong>Paper feed roller kit:</strong> AED 250–450</li><li><strong>Formatter board:</strong> AED 600–1,200</li><li><strong>Laser scanner unit:</strong> AED 500–900</li></ul><p>All Sahara repairs include a <strong>30-day workmanship guarantee</strong> — the only printer repair company in UAE to publicly offer this. Visit our <a href="/printer-repair-dubai">printer repair Dubai page</a> to book a same-day assessment.</p><h2>The Third Option: Rent While You Decide</h2><p>If your main printer breaks down and you're unsure about repair vs replacement, a short-term rental keeps your office running without commitment. We offer <a href="/services/printer-rental">monthly rental options</a> across Dubai and Sharjah while your device is assessed. <a href="/get-quote">Get a quote</a> in 30 minutes.</p><h2>FAQ</h2><p><strong>How long does printer repair take in Dubai?</strong><br>Most common repairs (fuser, drum, rollers) are completed <strong>same-day or within 24 hours</strong>. Major repairs take 2–3 business days depending on parts availability.</p><p><strong>Is it worth repairing an HP printer that's 5 years old?</strong><br>Depends on the fault. A roller kit or toner sensor (AED 250–350) — yes. A laser scanner or formatter board at that age — usually no, replace or rent instead.</p><p><strong>Do you repair Xerox and Ricoh printers in Dubai?</strong><br>Yes. We service Canon, Kyocera, Ricoh, HP, Xerox, Lexmark, and Samsung/Brother devices across Dubai, Sharjah, Abu Dhabi, and Ajman with a <strong>4-hour response time</strong>.</p>`
  },
];

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // 1. Fetch from D1 API
        const res = await fetch('/api/blogs/?includeDrafts=1');
        const data = await res.json();
        let merged: BlogPost[] = [];

        if (data.blogs && data.blogs.length > 0) {
          const apiPosts = data.blogs.map((b: any) => ({
            id: b.id,
            title: b.title,
            slug: b.slug,
            excerpt: b.excerpt,
            content: b.content,
            category: b.category,
            status: b.isActive === 1 ? 'published' : 'draft',
            coverImage: b.image,
            publishedAt: b.publishedAt,
            createdAt: b.createdAt,
          }));
          merged = apiPosts;
        }

        // 2. Check localStorage for drafts not in API
        const stored = localStorage.getItem("sahara_blogs");
        if (stored) {
          const localPosts = JSON.parse(stored) as BlogPost[];
          const apiIds = new Set(merged.map(p => p.id));
          const localOnly = localPosts.filter(p => !apiIds.has(p.id));
          if (localOnly.length > 0) merged = [...merged, ...localOnly];
        }

        // Migrate stale placeholder content
        const migrated = merged.map(p => {
          const isPlaceholder = !p.content || p.content.trim() === "" || p.content === "Full content here...";
          if (isPlaceholder && BLOG_CONTENT[p.slug]) return { ...p, content: BLOG_CONTENT[p.slug] };
          return p;
        });

        localStorage.setItem("sahara_blogs", JSON.stringify(migrated));
        setPosts(migrated);
      } catch (e) {
        console.error("Error loading blog posts:", e);
        const stored = localStorage.getItem("sahara_blogs");
        if (stored) setPosts(JSON.parse(stored));
        else setPosts(samplePosts);
      }
    };
    loadPosts();
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem("sahara_blogs", JSON.stringify(newPosts));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this blog post?")) {
      try {
        await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
      } catch { /* continue with local */ }
      savePosts(posts.filter(p => p.id !== id));
    }
  };

  const handleStatus = async (id: string, status: string) => {
    const updated = posts.map(p => p.id === id ? { ...p, status, publishedAt: status === "published" ? new Date().toISOString().split("T")[0] : "" } : p);
    const post = updated.find(p => p.id === id);
    if (post) {
      try {
        await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: post.id, title: post.title, slug: post.slug,
            excerpt: post.excerpt, content: post.content,
            image: post.coverImage, author: 'Sahara Printer',
            category: post.category,
            isActive: status === 'published' ? 1 : 0,
            publishedAt: post.publishedAt,
          }),
        });
      } catch { /* continue with local */ }
    }
    savePosts(updated);
  };

  const filteredPosts = posts.filter(p => {
    if (filter === "published") return p.status === "published";
    if (filter === "draft") return p.status === "draft";
    return true;
  });

  const linkAnalysis = useMemo(() => {
    const linkedSlugs = new Set(Object.keys(BLOG_LINK_MAP));
    const orphans = posts.filter(p => p.status === "published" && !linkedSlugs.has(p.slug));
    const typeCounts: Record<string, number> = {};
    Object.values(BLOG_LINK_MAP).forEach(cfg => {
      cfg.relatedLinks.forEach(l => { typeCounts[l.type] = (typeCounts[l.type] || 0) + 1; });
    });
    const outboundCounts = posts.map(p => ({
      slug: p.slug,
      title: p.title,
      outbound: (BLOG_LINK_MAP[p.slug]?.relatedLinks.length ?? 0) + (BLOG_LINK_MAP[p.slug]?.relatedSlugs.length ?? 0),
      hasConfig: linkedSlugs.has(p.slug),
    }));
    return { orphans, typeCounts, outboundCounts };
  }, [posts]);

  return (
    <div className="min-h-screen bg-[#071325]">
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
              <p className="text-slate-400 mt-1">Create and manage blog content</p>
            </div>
            <button onClick={() => router.push("/admin/blog/editor")} className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              New Post
            </button>
          </div>

          {/* Internal Linking Analysis */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">Internal Linking Analysis</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#101c2e] rounded-xl p-4">
                <p className="text-2xl font-bold text-white">{posts.filter(p => p.status === "published").length}</p>
                <p className="text-xs text-slate-400 mt-1">Published posts</p>
              </div>
              <div className="bg-[#101c2e] rounded-xl p-4">
                <p className="text-2xl font-bold text-[#f5be53]">{Object.keys(BLOG_LINK_MAP).length}</p>
                <p className="text-xs text-slate-400 mt-1">Posts with link config</p>
              </div>
              <div className="bg-[#101c2e] rounded-xl p-4">
                <p className="text-2xl font-bold text-red-400">{linkAnalysis.orphans.length}</p>
                <p className="text-xs text-slate-400 mt-1">Orphan posts (no links)</p>
              </div>
              <div className="bg-[#101c2e] rounded-xl p-4">
                <p className="text-2xl font-bold text-green-400">{Object.values(linkAnalysis.typeCounts).reduce((a, b) => a + b, 0)}</p>
                <p className="text-xs text-slate-400 mt-1">Total internal links</p>
              </div>
            </div>
            {linkAnalysis.orphans.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-red-400 mb-2">Missing link config:</p>
                <div className="flex flex-wrap gap-2">
                  {linkAnalysis.orphans.map(p => (
                    <span key={p.id} className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs">{p.slug}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {Object.entries(linkAnalysis.typeCounts).map(([type, count]) => (
                <span key={type} className="px-3 py-1 rounded-full bg-[#142032] border border-white/10 text-slate-300 text-xs">{type}: {count}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            {["all", "published", "draft"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? "bg-[#f5be53] text-[#412d00]" : "bg-[#101c2e] text-slate-400 hover:text-white"}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Title</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Category</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Status</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Date</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="border-b border-white/5">
                      <td className="p-4">
                        <p className="font-medium text-white">{post.title}</p>
                        <p className="text-sm text-slate-400">{post.slug}</p>
                      </td>
                      <td className="p-4 text-slate-300">{post.category}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.status === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 text-sm">{post.publishedAt || post.createdAt}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => router.push(`/admin/blog/editor?id=${post.id}`)} className="p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-white">
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button onClick={() => handleStatus(post.id, post.status === "published" ? "draft" : "published")} className={`p-2 rounded-lg transition-colors ${post.status === "published" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}`}>
                            <span className="material-symbols-outlined text-sm">{post.status === "published" ? "unpublished" : "publish"}</span>
                          </button>
                          <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-red-400">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}