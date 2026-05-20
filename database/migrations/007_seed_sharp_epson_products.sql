-- Seed Sharp and Epson products into D1 products table
-- Brings total catalog to 14 products
-- Idempotent: INSERT OR REPLACE keyed by id

INSERT OR REPLACE INTO products
  (id, slug, name, brand, category, condition, price_rental, specifications, image_urls, is_active, is_featured, sort_order)
VALUES
  ('prod-13', 'bp-70c31-color-mfp', 'BP-70C31 Color MFP', 'Sharp', 'MFP', 'New',
   650, '["31 PPM Color","A3 Support","Cloud Connect","Duplex"]', '["/images/printer-sharp.webp"]', 1, 0, 130),

  ('prod-14', 'ecotank-l15150-wide-format', 'EcoTank L15150 Wide-Format', 'Epson', 'A3 Printers', 'New',
   480, '["25 PPM Color","A3+ Support","Wi-Fi Direct","Low Cost/Page"]', '["/images/printer-epson.webp"]', 1, 0, 140);
