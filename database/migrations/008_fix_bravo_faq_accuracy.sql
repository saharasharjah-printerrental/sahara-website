-- Fix Bravo FAQ accuracy: replace "sole authorized Bravo Global distributor" with
-- correct wording: "authorised UAE retail partner for the Bravo RTAI and DC 3300"
-- Idempotent: UPDATE by id

UPDATE faqs
SET answer = 'Sahara Office Equipments is the authorised UAE retail partner for the Bravo RTAI retransfer printer and the Bravo DC 3300 direct-to-card printer — the two Bravo Global models we stock, sell, and support. We provide sales, genuine consumables, and on-site service across Dubai, Sharjah, Abu Dhabi, and all UAE emirates.'
WHERE id = 'bravo-faq-1';

UPDATE faqs
SET answer = 'Pricing depends on configuration (simplex/duplex, encoding modules, lamination). Contact Sahara Office Equipments for a tailored quote for the UAE market. As the authorised UAE retail partner for the RTAI and DC 3300, we offer competitive pricing, warranty, and after-sales support.'
WHERE id = 'bravo-faq-6';

UPDATE faqs
SET answer = 'Yes. As the authorised UAE retail partner for these two Bravo models, Sahara provides on-site technical support, genuine Bravo consumables (ribbons, retransfer film, cleaning kits), and warranty service for both the RTAI and DC 3300 across all emirates.'
WHERE id = 'bravo-faq-7';

UPDATE faqs
SET question = 'Who is the authorised Bravo card printer retail partner in the UAE?'
WHERE id = 'bravo-faq-1';
