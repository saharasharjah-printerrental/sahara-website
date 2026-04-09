-- ============================================
-- SAHARA PRINTER WEBSITE - DATABASE SCHEMA
-- ============================================
-- D1 Database: sahara-printer-db
-- Run these SQL commands in Cloudflare D1
-- ============================================

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT DEFAULT '',
  category TEXT DEFAULT '',
  condition TEXT DEFAULT 'New',
  priceSale TEXT DEFAULT '',
  priceRental TEXT DEFAULT '',
  specs TEXT DEFAULT '',
  image TEXT DEFAULT '',
  isActive INTEGER DEFAULT 1,
  isFeatured INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- BRANDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  logoUrl TEXT DEFAULT '',
  description TEXT DEFAULT '',
  isActive INTEGER DEFAULT 1,
  sortOrder INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SUPPLIES TABLE (Toner, Drum, Parts)
-- ============================================
CREATE TABLE IF NOT EXISTS supplies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT DEFAULT '',
  category TEXT DEFAULT '',
  compatibleModels TEXT DEFAULT '',
  color TEXT DEFAULT '',
  yield TEXT DEFAULT '',
  price TEXT DEFAULT '',
  stock INTEGER DEFAULT 0,
  image TEXT DEFAULT '',
  isActive INTEGER DEFAULT 1,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- FAQS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  pageSlug TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sortOrder INTEGER DEFAULT 0,
  isActive INTEGER DEFAULT 1,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- BLOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  image TEXT DEFAULT '',
  author TEXT DEFAULT 'Sahara Printer',
  category TEXT DEFAULT '',
  isActive INTEGER DEFAULT 1,
  publishedAt TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- BANNERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS banners (
  id TEXT PRIMARY KEY,
  title TEXT DEFAULT '',
  subtitle TEXT DEFAULT '',
  ctaText TEXT DEFAULT 'Learn More',
  ctaLink TEXT DEFAULT '#',
  imageUrl TEXT DEFAULT '',
  isActive INTEGER DEFAULT 1,
  sortOrder INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INQUIRIES TABLE (Contact Form Submissions)
-- ============================================
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  company TEXT DEFAULT '',
  service TEXT DEFAULT '',
  message TEXT DEFAULT '',
  status TEXT DEFAULT 'new',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- ============================================
-- SEED DATA - BRANDS
-- ============================================
INSERT OR REPLACE INTO brands (id, name, slug, logoUrl, description, isActive, sortOrder) VALUES
('1', 'HP', 'hp', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/HP_logo.svg', 'HP printers and MFPs', 1, 1),
('2', 'Canon', 'canon', 'https://upload.wikimedia.org/wikipedia/commons/2/28/Canon_logo.svg', 'Canon imageRUNNER series', 1, 2),
('3', 'Xerox', 'xerox', 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Xerox_logo.svg', 'Xerox AltaLink and VersaLink', 1, 3),
('4', 'Ricoh', 'ricoh', 'https://upload.wikimedia.org/wikipedia/commons/4/44/Ricoh_logo.svg', 'Ricoh IM and MP series', 1, 4),
('5', 'Kyocera', 'kyocera', 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Kyocera_logo.svg', 'Kyocera TASKalfa series', 1, 5),
('6', 'Brother', 'brother', 'https://upload.wikimedia.org/wikipedia/commons/4/44/Brother_Logo.svg', 'Brother laser and inkjet', 1, 6),
('7', 'Sharp', 'sharp', 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Sharp_logo.svg', 'Sharp BP series', 1, 7),
('8', 'Epson', 'epson', 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Epson_logo.svg', 'Epson business printers', 1, 8);

-- ============================================
-- SEED DATA - SAMPLE PRODUCTS
-- ============================================
INSERT OR REPLACE INTO products (id, name, brand, category, condition, priceSale, priceRental, specs, image, isActive, isFeatured) VALUES
('1', 'imageRUNNER ADVANCE C5500', 'Canon', 'MFP', 'New', 'Contact for Pricing', 'AED 800/mo', '55 PPM|Full Color|A3', '', 1, 1),
('2', 'DesignJet Z9+ PostScript', 'HP', 'Plotters', 'Refurbished', 'AED 12,000', 'AED 600/mo', '44-inch Roll|2400 DPI', '', 1, 0),
('3', 'TASKalfa 6003i Series', 'Kyocera', 'MFP', 'New', 'Contact for Pricing', 'AED 950/mo', '60 PPM|Monochrome', '', 1, 0),
('4', 'Xerox AltaLink C8170', 'Xerox', 'MFP', 'New', 'Contact for Pricing', 'AED 1,100/mo', '10" UI Tablet|ConnectKey', '', 1, 1),
('5', 'LaserJet Managed E82560', 'HP', 'A3 Printers', 'New', 'Contact for Pricing', 'AED 750/mo', 'Wolf Security|Energy Star', '', 1, 1);

-- ============================================
-- SEED DATA - SAMPLE FAQS
-- ============================================
INSERT OR REPLACE INTO faqs (id, pageSlug, question, answer, sortOrder, isActive) VALUES
('1', 'printer-rental', 'Do you offer zero deposit rental?', 'Yes! We offer zero deposit rental options for all UAE clients. Pay only your monthly rental with no upfront security deposit.', 1, 1),
('2', 'printer-rental', 'What is your response time?', 'We provide 4-6 hour emergency response across UAE. For Abu Dhabi and Al Ain, we offer next-day service with emergency response available within 4-6 hours.', 2, 1),
('3', 'printer-rental', 'Do you provide AMC services?', 'Yes, we offer Annual Maintenance Contracts covering toner, parts, labor, and preventive maintenance. AMC clients get priority scheduling and faster response times.', 3, 1),
('4', 'printer-rental', 'What areas do you serve?', 'We serve all across UAE including Dubai, Abu Dhabi, Sharjah, Al Ain, Fujairah, RAK, and all major cities.', 4, 1);

-- ============================================
-- SEED DATA - SAMPLE BANNERS
-- ============================================
INSERT OR REPLACE INTO banners (id, title, subtitle, ctaText, ctaLink, imageUrl, isActive, sortOrder) VALUES
('1', 'Professional Printer Rental', 'Reliable copiers & printers for your business with zero deposit options', 'Get Quote', '/get-quote', '', 1, 1),
('2', 'Expert Repair Services', 'Fast turnaround and genuine parts for all major brands', 'Book Repair', '/services/repair', '', 1, 2),
('3', 'Quality Supplies & Toner', 'Original and compatible toners for all printer models', 'View Products', '/products', '', 1, 3);