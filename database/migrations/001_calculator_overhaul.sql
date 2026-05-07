-- ============================================
-- MIGRATION: Calculator Overhaul
-- Date: 2026-05-06
-- Run: wrangler d1 execute sahara-printer-db --file=database/migrations/001_calculator_overhaul.sql
-- ============================================
-- Replaces old calculator_prices JSON blob with
-- granular per-key settings for the new pricing model:
--   Base AED 350 includes 3,000 B&W + 1,000 colour free prints.
--   Overage charged per page at actual print rates.
-- ============================================

DELETE FROM settings WHERE key = 'calculator_prices';

INSERT OR REPLACE INTO settings (key, value) VALUES
  ('calc_base_rent',         '350'),
  ('calc_bw_price',          '0.06'),
  ('calc_color_price',       '0.20'),
  ('calc_free_bw',           '3000'),
  ('calc_free_color',        '1000'),
  ('calc_a3_surcharge',      '80'),
  ('calc_a3_both_surcharge', '50'),
  ('calc_discount_24mo',     '0.95'),
  ('calc_discount_36mo',     '0.90');

-- Verify
SELECT key, value FROM settings WHERE key LIKE 'calc_%' ORDER BY key;
