-- Seed FAQs for the new printer-rental-sharjah page (Phase 6a — new page
-- targeting the Sharjah query cluster that GSC showed as zero-click despite
-- strong impressions and position, Aug 2026 export). Mirrors the DEFAULT_FAQS
-- fallback array in src/app/printer-rental-sharjah/page.tsx.
-- Idempotent: INSERT OR REPLACE by id.

INSERT OR REPLACE INTO faqs (id, pageSlug, question, answer, isActive, sortOrder) VALUES
('sharjah-rental-faq-1', 'printer-rental-sharjah', 'How much does printer rental cost in Sharjah?', 'Printer rental in Sharjah starts from AED 250/month for an A4 desktop printer. A3 multifunction photocopiers start from AED 500/month, and enterprise-grade colour MFPs range AED 1,000-2,000/month. All plans include zero deposit, unlimited OEM toner, maintenance, and free delivery.', 1, 10),
('sharjah-rental-faq-2', 'printer-rental-sharjah', 'Is printer lease and printer rental the same thing in Sharjah?', 'Yes — "printer lease," "printer rental," and "copier rental" describe the same all-inclusive monthly service from Sahara: the machine, unlimited toner, maintenance, and repairs bundled into one predictable fee, with no ownership transfer.', 1, 20),
('sharjah-rental-faq-3', 'printer-rental-sharjah', 'Do you offer same-day printer delivery in Sharjah?', 'Yes — as our head office is based in Sharjah Industrial Area, same-day delivery and setup is available across Sharjah city, including Al Nahda, Al Majaz, Al Qasimia, Muweilah, and the industrial areas, subject to stock and order time.', 1, 30),
('sharjah-rental-faq-4', 'printer-rental-sharjah', 'Can I rent printers for a SAIF Zone or Hamriyah Free Zone business?', 'Yes. We regularly supply and service printers and photocopiers for businesses in SAIF Zone, Hamriyah Free Zone, and Sharjah Publishing City, with the same zero-deposit, all-inclusive rental terms as mainland Sharjah.', 1, 40),
('sharjah-rental-faq-5', 'printer-rental-sharjah', 'Do you sell copiers outright in Sharjah, or only rent?', 'Both. Most Sharjah businesses choose rental for the included maintenance and toner, but outright purchase is available for Canon, Kyocera, HP, Ricoh, and other brands — ask for a sales quote alongside your rental options.', 1, 50),
('sharjah-rental-faq-6', 'printer-rental-sharjah', 'What is the response time for printer repairs in Sharjah?', 'As our headquarters and main technician base are in Sharjah, response times here are typically the fastest in our coverage area — under 4 hours for standard call-outs, often same-day.', 1, 60);
