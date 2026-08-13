-- Migration 017: AEO supporting bullets for FAQs
--
-- The AEO Q&A format contract (H2 question -> <15 word direct-answer opener
-- -> 40-60 word standalone paragraph -> supporting bullet list) needs a place
-- to store the bullets. Stored as a JSON string array so the existing
-- getFaqsForPage()/buildFaqSchema() consumers keep working untouched; only
-- callers that ask for supportingPoints see them (src/lib/faqs.ts).

ALTER TABLE faqs ADD COLUMN supportingPoints TEXT DEFAULT '';
