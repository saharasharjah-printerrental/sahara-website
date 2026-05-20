-- Seed product catalog into D1 products table
-- Source: defaultProducts from ProductsClient.tsx (12 items)
-- Idempotent: INSERT OR REPLACE keyed by id
-- price_rental stored as numeric (AED/month); specifications and image_urls as JSON arrays

INSERT OR REPLACE INTO products
  (id, slug, name, brand, category, condition, price_rental, specifications, image_urls, is_active, is_featured, sort_order)
VALUES
  ('prod-1', 'imagerunner-advance-c5500', 'imageRUNNER ADVANCE C5500', 'Canon', 'MFP', 'New',
   800, '["55 PPM","Full Color","A3 Support","Network Ready"]', '["/images/printer-canon-1.webp"]', 1, 1, 10),

  ('prod-2', 'laserjet-managed-e82560', 'LaserJet Managed E82560', 'HP', 'A3 Printers', 'New',
   750, '["Wolf Security","Energy Star","56 PPM","Duplex"]', '["/images/printer-hp.svg"]', 1, 1, 20),

  ('prod-3', 'taskalfa-6003i-series', 'TASKalfa 6003i Series', 'Kyocera', 'MFP', 'New',
   950, '["60 PPM","Monochrome","HyPAS Platform","1200 DPI"]', '["/images/printer-kyocera.webp"]', 1, 1, 30),

  ('prod-4', 'altalink-c8170', 'AltaLink C8170', 'Xerox', 'MFP', 'New',
   1100, '["10\" UI Tablet","ConnectKey","Color","70 PPM"]', '["/images/printer-xerox.webp"]', 1, 0, 40),

  ('prod-5', 'hl-l6400dw-enterprise', 'HL-L6400DW Enterprise', 'Brother', 'A4 Printers', 'New',
   400, '["50 PPM","Duplex","Wi-Fi Direct","250-sheet Tray"]', '["/images/printer-brother.webp"]', 1, 0, 50),

  ('prod-6', 'mp-2555sp', 'MP 2555SP', 'Ricoh', 'MFP', 'New',
   500, '["25 PPM","Copy/Print/Scan","600 DPI","Network Ready"]', '["/images/printer-ricoh.webp"]', 1, 0, 60),

  ('prod-7', 'proxpress-m4580fx', 'ProXpress M4580FX', 'Samsung', 'MFP', 'Refurbished',
   350, '["43 PPM","Fax Ready","Duplex","Auto Sort"]', '["/images/printer-samsung.webp"]', 1, 0, 70),

  ('prod-8', 'ms431dn-laser', 'MS431dn Laser', 'Lexmark', 'A4 Printers', 'Refurbished',
   300, '["42 PPM","1200 DPI","512MB RAM","USB 3.0"]', '["/images/printer-lexmark.webp"]', 1, 0, 80),

  ('prod-9', 'm6635cidn-color-mfp', 'M6635cidn Color MFP', 'Kyocera', 'MFP', 'New',
   700, '["35 PPM","Full Color","Duplex","Gigabit Ethernet"]', '["/images/printer-kyocera.webp"]', 1, 0, 90),

  ('prod-10', 'color-laserjet-pro-m479fdw', 'Color LaserJet Pro M479fdw', 'HP', 'MFP', 'New',
   450, '["27 PPM Color","Wi-Fi","Fax","Touch Display"]', '["/images/printer-hp.svg"]', 1, 0, 100),

  ('prod-11', 'imageprograf-pro-4100', 'imagePROGRAF PRO-4100', 'Canon', 'Plotters', 'New',
   1200, '["12-Color Ink","44-inch Roll","2400 DPI","Data Encrypt"]', '["/images/printer-canon-1.webp"]', 1, 0, 110),

  ('prod-12', 'designjet-z9-postscript', 'DesignJet Z9+ PostScript', 'HP', 'Plotters', 'Refurbished',
   600, '["44-inch Roll","2400 DPI","PostScript","HP Stitch"]', '["/images/printer-hp.svg"]', 1, 0, 120);
