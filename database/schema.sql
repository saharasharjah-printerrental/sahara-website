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
  price_sale TEXT DEFAULT '',
  price_rental TEXT DEFAULT '',
  specs TEXT DEFAULT '',
  image TEXT DEFAULT '',
  is_active INTEGER DEFAULT 1,
  is_featured INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- BRANDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  logo_url TEXT DEFAULT '',
  description TEXT DEFAULT '',
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
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
-- CALCULATOR SETTINGS SEED
-- New pricing model: AED 350 base, per-page overage
-- Run this after schema creation to set defaults
-- ============================================
INSERT OR IGNORE INTO settings (key, value) VALUES
  ('calc_base_rent',        '350'),
  ('calc_bw_price',         '0.06'),
  ('calc_color_price',      '0.20'),
  ('calc_free_bw',          '3000'),
  ('calc_free_color',       '1000'),
  ('calc_a3_surcharge',     '80'),
  ('calc_a3_both_surcharge','50'),
  ('calc_discount_24mo',    '0.95'),
  ('calc_discount_36mo',    '0.90');

-- ============================================
-- LOGOS TABLE (Client Logos / Brand Carousel)
-- ============================================
CREATE TABLE IF NOT EXISTS logos (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  imageUrl TEXT DEFAULT '',
  imageAlt TEXT DEFAULT '',
  link TEXT DEFAULT '',
  isActive INTEGER DEFAULT 1,
  sortOrder INTEGER DEFAULT 0
);

-- ============================================
-- CLIENTS TABLE (Trusted clients list in admin)
-- ============================================
CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logoUrl TEXT DEFAULT '',
  website TEXT DEFAULT '',
  isActive INTEGER DEFAULT 1,
  sortOrder INTEGER DEFAULT 0
);

-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id          TEXT    PRIMARY KEY,
  name        TEXT    NOT NULL,
  role        TEXT,
  company     TEXT,
  text        TEXT    NOT NULL,
  rating      INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  image_url   TEXT,
  is_active   INTEGER NOT NULL DEFAULT 1,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_testimonials_active_sort
  ON testimonials(is_active, sort_order);

-- ============================================
-- SEED DATA - TESTIMONIALS
-- ============================================
INSERT OR REPLACE INTO testimonials (id, name, role, company, text, rating, image_url, is_active, sort_order) VALUES
('1', 'Marcus Thorne', 'Architectural Lead', 'Studio 91', 'Exceptional service. They repaired our office plotter within 4 hours. Absolute lifesavers!', 5, '', 1, 1),
('2', 'Sarah Jenkins', 'Operations Manager', 'TechFlow Solutions', 'The printer rental program saved us 40% on operational costs this quarter. Professional and reliable.', 5, '', 1, 2),
('3', 'David Chen', 'IT Director', 'DataCore Systems', 'Prompt toner delivery. Never had to wait more than a day. Highly recommend Sahara.', 5, '', 1, 3);

-- ============================================
-- SEED DATA - BRANDS
-- ============================================
INSERT OR REPLACE INTO brands (id, name, slug, logo_url, description, is_active, sort_order) VALUES
('1', 'HP', 'hp', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/HP_logo.svg', 'HP printers and MFPs', 1, 1),
('2', 'Canon', 'canon', 'https://upload.wikimedia.org/wikipedia/commons/2/28/Canon_logo.svg', 'Canon imageRUNNER series', 1, 2),
('3', 'Xerox', 'xerox', 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Xerox_logo.svg', 'Xerox AltaLink and VersaLink', 1, 3),
('4', 'Ricoh', 'ricoh', 'https://upload.wikimedia.org/wikipedia/commons/4/44/Ricoh_logo.svg', 'Ricoh IM and MP series', 1, 4),
('5', 'Kyocera', 'kyocera', 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Kyocera_logo.svg', 'Kyocera TASKalfa series', 1, 5),
('6', 'Brother', 'brother', 'https://upload.wikimedia.org/wikipedia/commons/4/44/Brother_Logo.svg', 'Brother laser and inkjet', 1, 6),
('7', 'Sharp', 'sharp', 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Sharp_logo.svg', 'Sharp BP series', 1, 7),
('8', 'Epson', 'epson', 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Epson_logo.svg', 'Epson business printers', 1, 8);


-- ============================================
-- SEED DATA - SAMPLE FAQS
-- ============================================
INSERT OR REPLACE INTO faqs (id, pageSlug, question, answer, sortOrder, isActive) VALUES
('1', 'printer-rental', 'Do you offer zero deposit rental?', 'Yes! We offer zero deposit rental options for all UAE clients. Pay only your monthly rental with no upfront security deposit.', 1, 1),
('2', 'printer-rental', 'What is your response time?', 'We provide 4-6 hour emergency response across UAE. For Abu Dhabi and Al Ain, we offer next-day service with emergency response available within 4-6 hours.', 2, 1),
('3', 'printer-rental', 'Do you provide AMC services?', 'Yes, we offer Annual Maintenance Contracts covering toner, parts, labor, and preventive maintenance. AMC clients get priority scheduling and faster response times.', 3, 1),
('4', 'printer-rental', 'What areas do you serve?', 'We serve all across UAE including Dubai, Abu Dhabi, Sharjah, Al Ain, Fujairah, RAK, and all major cities.', 4, 1);

-- Banners seed removed — live D1 table uses snake_case columns and has position NOT NULL