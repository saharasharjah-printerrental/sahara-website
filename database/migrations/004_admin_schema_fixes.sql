-- Migration 004: Admin schema fixes
-- Add SEO image fields to supplies + notes to inquiries

-- Supplies: add alt_text, image_width, image_height
ALTER TABLE supplies ADD COLUMN alt_text TEXT DEFAULT '';
ALTER TABLE supplies ADD COLUMN image_width INTEGER DEFAULT 800;
ALTER TABLE supplies ADD COLUMN image_height INTEGER DEFAULT 800;

-- Inquiries: add notes column (status updates now persist via PATCH /api/inquiries)
ALTER TABLE inquiries ADD COLUMN notes TEXT DEFAULT '';
