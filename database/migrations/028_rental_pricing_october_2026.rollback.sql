-- ROLLBACK for 028_rental_pricing_october_2026.sql
--
-- Scope: reverts ONLY the row blogs.slug = 'paper-shredder-rental-uae-when-it-beats-buying'.
-- Original values below were captured byte-exact from the production row via a read-only
-- SELECT on 2026-10-05 (before 028 ran anywhere) and verified against an isolated local
-- SQLite fixture. The reverse replacements restore every string 028 changed;
-- meta_description is restored to its pre-028 value (''). Each statement is
-- idempotent: if 028 was never applied, the post-028 substrings are absent and
-- replace() is a no-op.

UPDATE blogs SET content = replace(content,
  'Paper shredder rental in Dubai costs AED 450/month for the smaller Fellowes Powershred LX65 or AED 900/month for the larger 325Ci. Delivery, installation, transport and maintenance are included at no extra charge.',
  'Paper shredder rental in Dubai starts from AED 150 (Fellowes Powershred LX65) with contract terms customised to your usage, including delivery, setup, and maintenance.')
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';

UPDATE blogs SET content = replace(content,
  'Rent shredder: LX65 AED 450/month or 325Ci AED 900/month; request a quote for shorter terms',
  'Rent shredder (2-week contract): AED 300–600 all-inclusive')
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';

UPDATE blogs SET content = replace(content,
  'Compare the total cost for your required rental duration with the purchase price and maintenance costs.',
  'Winner: Rental — saves AED 1,200–2,400 per year.')
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';

UPDATE blogs SET content = replace(content,
  'LX65: 450/month; 325Ci: 900/month',
  'From 150, customised to your contract term')
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';

UPDATE blogs SET content = replace(content,
  '2,700 (LX65) or 5,400 (325Ci), based on six total rental months',
  'Typically 900–2,400')
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';

UPDATE blogs SET content = replace(content,
  'The LX65 is AED 450/month and the 325Ci is AED 900/month across Dubai, Sharjah and Abu Dhabi, with free delivery, installation, transport and maintenance.',
  'All available for delivery and setup across Dubai, Sharjah, and Abu Dhabi from AED 150, with contract terms customised to your requirement.')
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';

UPDATE blogs SET content = replace(content,
  '<a href="/quote/paper-shredder-rental/">Get a Shredder Rental Quote</a>',
  '<a href="/rental-calculator/">Get a Free Quote</a>')
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';

UPDATE blogs SET meta_description = ''
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';
