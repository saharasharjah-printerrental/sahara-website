-- Migration 010: Seed the supplies (toners / drums / spare parts) catalog
-- The supplies table was never seeded on the remote D1. The admin page only
-- showed a hardcoded client-side fallback list, so editing one item and saving
-- persisted ONLY that item and made every other item "vanish" on next fetch.
-- INSERT OR IGNORE preserves any row already saved by the admin (e.g. id 1).

INSERT OR IGNORE INTO supplies
  (id, name, brand, category, compatibleModels, color, yield, price, stock, image, isActive, alt_text, image_width, image_height)
VALUES
  ('1',  'Canon C5045/5051/5250/5255 Toner Premium Black',  'Canon', 'Toner',           'C5045, C5051, C5250, C5255',                       'Black',   '25,000 pages',  'Contact for Pricing', 50, '', 1, '', 800, 800),
  ('2',  'Canon C5045/5051/5250/5255 Toner Premium Cyan',   'Canon', 'Toner',           'C5045, C5051, C5250, C5255',                       'Cyan',    '25,000 pages',  'Contact for Pricing', 50, '', 1, '', 800, 800),
  ('3',  'Canon C5045/5051/5250/5255 Toner Premium Yellow', 'Canon', 'Toner',           'C5045, C5051, C5250, C5255',                       'Yellow',  '25,000 pages',  'Contact for Pricing', 50, '', 1, '', 800, 800),
  ('4',  'Canon C5045/5051/5250/5255 Toner Premium Magenta','Canon', 'Toner',           'C5045, C5051, C5250, C5255',                       'Magenta', '25,000 pages',  'Contact for Pricing', 50, '', 1, '', 800, 800),
  ('5',  'Canon C5035/5040/5235/5240 Toner Premium Black',  'Canon', 'Toner',           'C5035, C5040, C5235, C5240',                       'Black',   '23,000 pages',  'Contact for Pricing', 30, '', 1, '', 800, 800),
  ('6',  'Canon C5035/5040/5235/5240 Toner Premium Cyan',   'Canon', 'Toner',           'C5035, C5040, C5235, C5240',                       'Cyan',    '23,000 pages',  'Contact for Pricing', 30, '', 1, '', 800, 800),
  ('7',  'Canon C5035/5040/5235/5240 Toner Premium Yellow', 'Canon', 'Toner',           'C5035, C5040, C5235, C5240',                       'Yellow',  '23,000 pages',  'Contact for Pricing', 30, '', 1, '', 800, 800),
  ('8',  'Canon C5035/5040/5235/5240 Toner Premium Magenta','Canon', 'Toner',           'C5035, C5040, C5235, C5240',                       'Magenta', '23,000 pages',  'Contact for Pricing', 30, '', 1, '', 800, 800),
  ('9',  'Compatible C-EXV51 Toner Cartridge',              'Canon', 'Toner',           'imageRUNNER Advance C5535, C5540, C5550, C5560',   'Black',   '36,000 pages',  'Contact for Pricing', 25, '', 1, '', 800, 800),
  ('10', 'Long Life OPC Drum for Canon IR ADVANCE C5535 C5540 C5550 C5560', 'Canon', 'Drum', 'C5535, C5540, C5550, C5560, IRC 5535, 5540, 5550', '', '150,000 pages', 'Contact for Pricing', 15, '', 1, '', 800, 800),
  ('11', 'Long Life OPC Drum for Canon IR ADVANCE C5235 C5240 C5250 C5255', 'Canon', 'Drum', 'C5235, C5240, C5250, C5255',                       '', '120,000 pages', 'Contact for Pricing', 15, '', 1, '', 800, 800),
  ('12', 'Canon C5045/C5250/C5550 Paper Pickup Rollers',    'Canon', 'Spare Part',      'C5045, C5250, C5550',                              '', 'N/A',           'Contact for Pricing', 20, '', 1, '', 800, 800),
  ('13', 'Canon iR ADVANCE C5030, 5035, 5045, 5051, 5235, 5240, 5250, 5255 Maintenance Kit', 'Canon', 'Maintenance Kit', 'C5030, C5035, C5045, C5051, C5235, C5240, C5250, C5255', '', '300,000 pages', 'Contact for Pricing', 10, '', 1, '', 800, 800);
