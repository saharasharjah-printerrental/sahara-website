-- Restore the exclusive-reseller claim for Bravo card printers, scoped to the
-- two specific models Sahara is appointed for (RTAI and DC 3300).
--
-- Migration 008 downgraded the original "sole authorized Bravo Global
-- distributor" wording to "authorised UAE retail partner" as an accuracy fix,
-- because the unscoped "sole distributor" claim overreached — Bravo Global
-- may have other UAE partners for other models. This migration restores the
-- stronger "exclusive reseller" language but keeps it scoped to the RTAI and
-- DC 3300 specifically, per user confirmation (2026-09-04), so it stays
-- defensible even if Bravo appoints other UAE partners for other models.
--
-- D1 rows override the TSX DEFAULT_FAQS fallback in
-- src/app/bravo-card-printers-uae/page.tsx, so without this migration the
-- rendered FAQ answers would keep serving the migration-008 wording while the
-- page's own JSON-LD and visible copy say "exclusive reseller" — a visible
-- mismatch. Idempotent: UPDATE by id.

UPDATE faqs
SET question = 'Who is the authorised exclusive Bravo card printer reseller in the UAE?',
    answer = 'Sahara Office Equipments is the authorised exclusive reseller in the UAE for the Bravo RTAI retransfer printer and the Bravo DC 3300 direct-to-card printer — the two Bravo Global models we stock, sell, and support. We provide sales, genuine consumables, and on-site service across Dubai, Sharjah, Abu Dhabi, and all UAE emirates.'
WHERE id = 'bravo-faq-1';

UPDATE faqs
SET answer = 'Pricing depends on configuration (simplex/duplex, encoding modules, lamination). Contact Sahara Office Equipments for a tailored quote for the UAE market. As the authorised exclusive UAE reseller for the RTAI and DC 3300, we offer competitive pricing, warranty, and after-sales support.'
WHERE id = 'bravo-faq-6';

UPDATE faqs
SET answer = 'Yes. As the authorised exclusive UAE reseller for these two Bravo models, Sahara provides on-site technical support, genuine Bravo consumables (ribbons, retransfer film, cleaning kits), and warranty service for both the RTAI and DC 3300 across all emirates.'
WHERE id = 'bravo-faq-7';
