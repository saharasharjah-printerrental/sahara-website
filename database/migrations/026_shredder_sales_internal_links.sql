-- P1.1 follow-through: /services/paper-shredder-sales/ sat "unknown to Google"
-- for 8+ days after shipping because it had no inbound link from the
-- homepage or any of the three existing shredder blog posts (only from
-- Header/Footer nav and the rental page). The /products/ 500 fix (P0.1,
-- 2026-09-15) already removed the main crawl-budget drain; this adds the
-- contextual link paths HANDOFF.md's P1.1 called for.
--
-- Verified against production content (not just the 015 migration source)
-- immediately before writing this file, via:
--   npx wrangler d1 execute sahara-printer-db --remote --env production \
--     --command "SELECT slug, substr(content, instr(content,'<h2>Related Resources</h2>'), 500) ..."
-- so each REPLACE anchor below is a byte-exact match of what's actually
-- stored, not a guess from the source file.

-- buying-a-paper-shredder-in-dubai-sizing-and-cost-guide — a buying guide
-- that never linked to the actual page to buy from.
UPDATE blogs SET content = REPLACE(
  content,
  '<ul><li><a href="/services/paper-shredder-rental/">Paper Shredder Rental &amp; Sales Dubai &amp; UAE</a></li><li><a href="/blogs/paper-shredder-rental-uae-when-it-beats-buying/">Paper Shredder Rental vs Buying — When Renting Wins</a></li>',
  '<ul><li><a href="/services/paper-shredder-sales/">Buy a Paper Shredder — UAE Pricing</a></li><li><a href="/services/paper-shredder-rental/">Paper Shredder Rental &amp; Sales Dubai &amp; UAE</a></li><li><a href="/blogs/paper-shredder-rental-uae-when-it-beats-buying/">Paper Shredder Rental vs Buying — When Renting Wins</a></li>'
) WHERE slug = 'buying-a-paper-shredder-in-dubai-sizing-and-cost-guide';

-- din-p4-vs-p5-vs-p6-shredder-security-levels-uae — same gap.
UPDATE blogs SET content = REPLACE(
  content,
  '<ul><li><a href="/blogs/uae-pdpl-document-destruction-compliance-guide/">UAE PDPL Document Destruction — What Compliance Requires</a></li>',
  '<ul><li><a href="/services/paper-shredder-sales/">Buy a Paper Shredder — UAE Pricing</a></li><li><a href="/blogs/uae-pdpl-document-destruction-compliance-guide/">UAE PDPL Document Destruction — What Compliance Requires</a></li>'
) WHERE slug = 'din-p4-vs-p5-vs-p6-shredder-security-levels-uae';

-- paper-shredder-rental-uae-when-it-beats-buying — add the in-body link
-- right where the post itself says buying makes more sense, plus the
-- Related Resources entry.
UPDATE blogs SET content = REPLACE(
  content,
  '<li><strong>Security-critical environments</strong> — some classified government facilities require owned, audited equipment</li></ul>',
  '<li><strong>Security-critical environments</strong> — some classified government facilities require owned, audited equipment</li></ul>
<p>Ready to buy instead? See <a href="/services/paper-shredder-sales/">current Fellowes shredder models and UAE pricing</a>.</p>'
) WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';

UPDATE blogs SET content = REPLACE(
  content,
  '<ul><li><a href="/services/paper-shredder-rental/">Paper Shredder Rental Dubai &amp; UAE</a></li>',
  '<ul><li><a href="/services/paper-shredder-sales/">Buy a Paper Shredder — UAE Pricing</a></li><li><a href="/services/paper-shredder-rental/">Paper Shredder Rental Dubai &amp; UAE</a></li>'
) WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';
