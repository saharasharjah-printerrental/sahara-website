-- Migration 016: Numeric AED pricing + Merchant Center identity fields for supplies
--
-- supplies.price was a free-text column and every seeded row is literally the
-- string "Contact for Pricing" (see 010_seed_supplies.sql). That makes it
-- impossible to build a Google Merchant Center feed (needs a clean numeric
-- price + currency) and impossible to gate the "Pay Now" cart flow reliably.
--
-- price_aed / price_on_request become the source of truth. The legacy `price`
-- TEXT column is kept and re-derived on every write (see src/lib/price.ts
-- resolveSupplyPrice + formatAED) so existing consumers (SparePartsCartClient,
-- api/orders price re-validation) keep working unchanged.
--
-- Defaults are deliberately conservative: price_aed = 0, price_on_request = 1
-- for every existing row, so nothing goes live/payable/feed-eligible until an
-- admin enters a real price.

ALTER TABLE supplies ADD COLUMN price_aed REAL DEFAULT 0;
ALTER TABLE supplies ADD COLUMN price_on_request INTEGER DEFAULT 1;
ALTER TABLE supplies ADD COLUMN updatedAt TEXT DEFAULT '';

-- Merchant Center / GTIN identity fields (flagged missing in HANDOFF.md)
ALTER TABLE supplies ADD COLUMN sku TEXT DEFAULT '';
ALTER TABLE supplies ADD COLUMN mpn TEXT DEFAULT '';
ALTER TABLE supplies ADD COLUMN gtin TEXT DEFAULT '';
ALTER TABLE supplies ADD COLUMN condition TEXT DEFAULT 'new';
ALTER TABLE supplies ADD COLUMN slug TEXT DEFAULT '';

-- Backfill updatedAt from createdAt so the realtime cache-bust key is never empty
UPDATE supplies SET updatedAt = createdAt WHERE updatedAt = '' OR updatedAt IS NULL;

-- Backfill slug from name: lowercase, non-alnum -> hyphen, trim/collapse hyphens
UPDATE supplies SET slug = (
  SELECT TRIM(
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
      LOWER(supplies.name),
      ' ', '-'), '/', '-'), ',', ''), '(', ''), ')', ''), '--', '-'
    ), '-'
  )
) WHERE slug = '' OR slug IS NULL;

-- Backfill sku from id where empty (id is already a stable unique key)
UPDATE supplies SET sku = id WHERE sku = '' OR sku IS NULL;
