-- Apply with the October 2026 service-page release. Exact replacements leave
-- unrelated purchase prices, specifications and article copy untouched.
UPDATE blogs SET content = replace(content,
  'Paper shredder rental in Dubai starts from AED 150 (Fellowes Powershred LX65) with contract terms customised to your usage, including delivery, setup, and maintenance.',
  'Paper shredder rental in Dubai costs AED 450/month for the smaller Fellowes Powershred LX65 or AED 900/month for the larger 325Ci. Delivery, installation, transport and maintenance are included at no extra charge.')
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';

UPDATE blogs SET content = replace(content,
  'Rent shredder (2-week contract): AED 300–600 all-inclusive',
  'Rent shredder: LX65 AED 450/month or 325Ci AED 900/month; request a quote for shorter terms')
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';

UPDATE blogs SET content = replace(content,
  'Winner: Rental — saves AED 1,200–2,400 per year.',
  'Compare the total cost for your required rental duration with the purchase price and maintenance costs.')
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';

UPDATE blogs SET content = replace(content,
  'From 150, customised to your contract term',
  'LX65: 450/month; 325Ci: 900/month')
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';

UPDATE blogs SET content = replace(content,
  'Typically 900–2,400',
  '2,700 (LX65) or 5,400 (325Ci), based on six total rental months')
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';

UPDATE blogs SET content = replace(content,
  'All available for delivery and setup across Dubai, Sharjah, and Abu Dhabi from AED 150, with contract terms customised to your requirement.',
  'The LX65 is AED 450/month and the 325Ci is AED 900/month across Dubai, Sharjah and Abu Dhabi, with free delivery, installation, transport and maintenance.')
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';

UPDATE blogs SET content = replace(content,
  '<a href="/rental-calculator/">Get a Free Quote</a>',
  '<a href="/quote/paper-shredder-rental/">Get a Shredder Rental Quote</a>'),
  meta_description = 'Compare shredder rental and buying in UAE. LX65 AED 450/month or 325Ci AED 900/month, including delivery, installation, transport and maintenance.'
WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';
