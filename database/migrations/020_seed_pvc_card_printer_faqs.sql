-- Adds generic "PVC card printer" / "ID card printer" FAQs to the Bravo page
-- (pageSlug unchanged — this expands the existing canonical page rather than
-- creating a competing URL). Sort order continues after the existing 10-80
-- range from migration 005/008.
INSERT OR REPLACE INTO faqs (id, pageSlug, question, answer, isActive, sortOrder)
VALUES
  ('bravo-faq-9', 'bravo-card-printers-uae', 'What is the difference between a PVC card printer and an ID card printer?',
   'None — they are the same machine. "PVC card printer," "ID card printer," and "plastic card printer" all describe a desktop printer that prints (and optionally encodes) plastic CR-80 cards. The Bravo RTAI and DC 3300 sold by Sahara Office Equipments cover both terms.',
   1, 90),
  ('bravo-faq-10', 'bravo-card-printers-uae', 'Can a PVC card printer encode access control or smart cards in UAE?',
   'Yes. The Bravo DC 3300 supports magnetic stripe (ISO 7811), contact smartcard, and contactless/RFID encoding — combinable and available factory-fitted or as an on-site upgrade. This makes it suitable for access-control and employee badge systems across UAE offices and free zones.',
   1, 100),
  ('bravo-faq-11', 'bravo-card-printers-uae', 'What is a double-sided (duplex) ID card printer and do I need one?',
   'A duplex printer prints both sides of the card in one pass — useful when you need information (terms, barcodes, a second logo) on the back as well as the front. The Bravo DC 3300 D prints duplex at 170 cards/hour; the RTAI has duplex built in. Single-sided (simplex) is sufficient for most basic employee or visitor badges.',
   1, 110),
  ('bravo-faq-12', 'bravo-card-printers-uae', 'Where can I buy PVC card printer ribbons and blank cards in Dubai?',
   'Sahara Office Equipments stocks genuine YMCKO ribbons, retransfer film, HOLO-MET metallic ribbons, and blank PVC/composite cards locally for same-day availability — see our Toner & Spare Parts page. Third-party ribbons can void your printer warranty.',
   1, 120);
