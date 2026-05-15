-- Migration 003: Add SEO columns to blogs + seed 11 published posts
-- Run: npx wrangler d1 execute sahara-db --remote --file=database/migrations/003_seed_blogs.sql

-- Add new SEO columns (safe to run even if already present via OR IGNORE workaround)
ALTER TABLE blogs ADD COLUMN meta_title TEXT DEFAULT '';
ALTER TABLE blogs ADD COLUMN meta_description TEXT DEFAULT '';
ALTER TABLE blogs ADD COLUMN meta_keywords TEXT DEFAULT '';
ALTER TABLE blogs ADD COLUMN internal_links TEXT DEFAULT '';
ALTER TABLE blogs ADD COLUMN schema_jsonld TEXT DEFAULT '';

-- Seed 11 published blog posts
-- NOTE: content is omitted here (too large for SQL); use admin editor to add/update content.
-- The app falls back to BLOG_CONTENT lib for localhost content rendering.

INSERT OR REPLACE INTO blogs (id, title, slug, excerpt, content, image, author, category, isActive, publishedAt, createdAt, meta_title, meta_description, meta_keywords) VALUES
(
  '1',
  'How to Choose the Best Printer Rental Dubai Service?',
  'how-to-choose-the-best-printer-rental-dubai-service',
  'Start your search for printer rental Dubai with a quick audit you can finish this afternoon',
  '',
  'https://res.cloudinary.com/dhmsnelcl/image/upload/v1771224373/blogs/ai73xmapai8rb1z1u7qg.webp',
  'Sahara Printer',
  'Guide',
  1,
  '2026-02-16',
  '2026-02-16',
  'How to Choose the Best Printer Rental Dubai Service? | Sahara',
  'Start your search for printer rental Dubai with a quick audit you can finish this afternoon. Expert tips on evaluating rental providers, equipment quality, and service SLAs.',
  'printer rental dubai, best printer rental service, office printer rental uae, photocopier rental dubai'
),
(
  '2',
  'The Problem We Solve',
  'the-problem-we-solve',
  'In any office, the sudden breakdown of a document printer or copier creates a cascade of problems.',
  '',
  'https://res.cloudinary.com/dhmsnelcl/image/upload/v1758721285/blogs/iblcpt0jm18wwey7nm41.jpg',
  'Sahara Printer',
  'Insights',
  1,
  '2025-09-24',
  '2025-09-24',
  'The Problem We Solve | Printer Rental UAE',
  'In any office, the sudden breakdown of a document printer or copier creates a cascade of problems. Learn how Sahara Office Equipments solves these pain points.',
  'printer breakdown office, copier problems uae, printer downtime business, office printing issues'
),
(
  '3',
  'What a Copier Rental Service Must Deliver to a Client',
  'what-a-copier-rental-service-must-deliver-to-a-client',
  'A successful copier rental service is defined not just by the equipment it provides, but by the quality of service it delivers.',
  '',
  'https://res.cloudinary.com/dhmsnelcl/image/upload/v1758723167/blogs/gifymghto0ykchvzrjyt.jpg',
  'Sahara Printer',
  'Guide',
  1,
  '2025-09-24',
  '2025-09-24',
  'What a Copier Rental Service Must Deliver to a Client | Sahara',
  'A successful copier rental service is defined not just by the equipment it provides, but by the quality of service it delivers. Know what to look for.',
  'copier rental service uae, photocopier rental quality, copier service delivery, office equipment rental'
),
(
  '4',
  'Why a Company Chooses Copier Rental Service Over Buying a Copier',
  'why-a-company-chooses-copier-rental-service-over-buying-a-copier',
  'A company''s decision to rent a copier instead of buying one is about far more than just the initial investment.',
  '',
  'https://res.cloudinary.com/dhmsnelcl/image/upload/v1758617392/blogs/icz06yszynxpk624dmox.jpg',
  'Sahara Printer',
  'Guide',
  1,
  '2025-08-23',
  '2025-08-23',
  'Why a Company Chooses Copier Rental Over Buying | Sahara',
  'A company''s decision to rent a copier instead of buying one is about far more than just the initial investment. Discover the financial and operational benefits.',
  'copier rental vs buying, rent photocopier uae, copier lease benefits, office equipment finance'
),
(
  '5',
  'Total Cost of Printer Ownership',
  'total-cost-of-printer-ownership',
  'While the initial purchase price of a copier may seem affordable, the true cost of ownership is often much higher than a rental agreement.',
  '',
  'https://res.cloudinary.com/dhmsnelcl/image/upload/v1758623726/blogs/rm2ptjektgnlq5hyoeyl.jpg',
  'Sahara Printer',
  'Finance',
  1,
  '2025-08-23',
  '2025-08-23',
  'Total Cost of Printer Ownership vs Rental | Sahara UAE',
  'While the initial purchase price of a copier may seem affordable, the true cost of ownership is often much higher than a rental agreement. Read the analysis.',
  'total cost printer ownership, printer tco uae, printer rental cost benefit, office printing expenses'
),
(
  '6',
  'Video Walkthrough: Solving Canon Printer Problems',
  'video-walkthrough-solving-canon-printer-problems',
  'This video tutorial guides you through practical steps to troubleshoot common Canon printer issues such as paper jams, connection errors, and ink problems.',
  '',
  'https://res.cloudinary.com/dhmsnelcl/image/upload/v1754304132/blogs/mmmyp3kxrfsp1aryzule.png',
  'Sahara Printer',
  'Troubleshooting',
  1,
  '2025-08-04',
  '2025-08-04',
  'Video Walkthrough: Solving Canon Printer Problems | Sahara',
  'This video tutorial guides you through practical steps to troubleshoot common Canon printer issues such as paper jams, connection errors, and ink problems.',
  'canon printer troubleshooting, canon printer problems, canon printer fix, canon error solutions'
),
(
  '7',
  'The Hidden Cost of Your Office Copier',
  'the-hidden-cost-of-your-office-copier',
  'Our competitors may offer a cheaper initial price, but this often comes at the expense of hidden costs.',
  '',
  'https://res.cloudinary.com/dhmsnelcl/image/upload/v1758285328/blogs/mukam5nzst3o6lvhac5m.jpg',
  'Sahara Printer',
  'Finance',
  1,
  '2025-08-04',
  '2025-08-04',
  'The Hidden Cost of Your Office Copier | Sahara UAE',
  'Our competitors may offer a cheaper initial price, but this often comes at the expense of hidden costs. Learn what to watch out for when choosing a provider.',
  'hidden copier costs, copier pricing trap, office copier expense, photocopier total cost'
),
(
  '8',
  'How Dubai Companies Save Budget by Choosing Value-Driven Printer Rental',
  'how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental',
  'Dubai''s dynamic business environment demands efficiency and cost-effectiveness.',
  '',
  'https://res.cloudinary.com/dhmsnelcl/image/upload/v1752651510/blogs/l3byyc7o8a8f1lddujis.jpg',
  'Sahara Printer',
  'Finance',
  1,
  '2025-07-16',
  '2025-07-16',
  'How Dubai Companies Save Budget with Printer Rental | Sahara',
  'Dubai''s dynamic business environment demands efficiency and cost-effectiveness. Companies are optimizing operations by choosing value-driven printer rental.',
  'dubai printer rental budget, save money printer dubai, office printing cost uae, printer rental value'
),
(
  '9',
  'Real Estate to Clinics: Why Every UAE Business is Renting Printers in 2025',
  'real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025',
  'Even the most glamorous Dubai real estate offices and high-tech clinics have one thing in common—no one actually owns their printers anymore.',
  '',
  'https://res.cloudinary.com/dhmsnelcl/image/upload/v1751102332/blogs/dqusdi9d0tonfoa0ggx6.jpg',
  'Sahara Printer',
  'Trends',
  1,
  '2025-06-28',
  '2025-06-28',
  'Why Every UAE Business is Renting Printers in 2025 | Sahara',
  'Even the most glamorous Dubai real estate offices and high-tech clinics have one thing in common—no one actually owns their printers anymore. Here''s why.',
  'printer rental uae 2025, business printing trends uae, flexible office printing, printers as a service uae'
),
(
  '10',
  'Rent or Buy Your Office Printer? Let''s Talk Smart Choices for Your Business',
  'rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business',
  'Every business owner knows that big decisions, and even the seemingly small ones, can really impact your wallet.',
  '',
  'https://res.cloudinary.com/dhmsnelcl/image/upload/v1749630742/blogs/ue4jwdxdlp655oeoylsq.png',
  'Sahara Printer',
  'Guide',
  1,
  '2025-06-11',
  '2025-06-11',
  'Rent or Buy Your Office Printer? Smart Choices | Sahara UAE',
  'Every business owner knows that big decisions, and even the seemingly small ones, can really impact your wallet. Here''s how to decide between rental and purchase.',
  'rent or buy printer, office printer decision, printer purchase vs rental, business printer choice'
),
(
  '11',
  'Stop Wasting Money on Printing: Your Guide to Smarter Office Habits',
  'stop-wasting-money-on-printing-your-guide-to-smarter-office-habits',
  'Does your business constantly track every penny, yet somehow printing costs just fly under the radar?',
  '',
  'https://res.cloudinary.com/dhmsnelcl/image/upload/v1749638040/blogs/ldevdfienoa4ibffpix0.png',
  'Sahara Printer',
  'Tips',
  1,
  '2025-06-11',
  '2025-06-11',
  'Stop Wasting Money on Printing | Smarter Office Habits | Sahara',
  'Does your business constantly track every penny, yet somehow printing costs just fly under the radar? You''re not alone. Learn how to reduce printing waste.',
  'reduce printing costs, office printing waste, save money printing, printing efficiency office'
);
