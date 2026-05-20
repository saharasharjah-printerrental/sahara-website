-- Seed FAQs for Bravo card printer page and PaperCut page
-- Idempotent: INSERT OR REPLACE keyed by id

-- Bravo Card Printers UAE FAQs
INSERT OR REPLACE INTO faqs (id, pageSlug, question, answer, isActive, sortOrder)
VALUES
  ('bravo-faq-1', 'bravo-card-printers-uae', 'Who is the authorized Bravo card printer dealer in the UAE?',
   'Sahara Office Equipments is the sole authorized Bravo Global distributor in the UAE for both the Bravo RTAI retransfer printer and the Bravo DC 3300 direct-to-card printer. We provide sales, service, and genuine consumables across Dubai, Sharjah, Abu Dhabi, and all UAE emirates.',
   1, 10),
  ('bravo-faq-2', 'bravo-card-printers-uae', 'What is the print resolution of the Bravo RTAI?',
   'The Bravo RTAI prints at 600 DPI (dots per inch) using colour dye sublimation retransfer technology. It supports over-the-edge printing for borderless card output and features the exclusive HOLO-MET™ technology for metallic lustre effects on ID cards.',
   1, 20),
  ('bravo-faq-3', 'bravo-card-printers-uae', 'Does the Bravo DC 3300 support dual-sided printing?',
   'Yes. The Bravo DC 3300 is available in both Simplex (DC 3300 S) and Duplex (DC 3300 D) models. Duplex printing speed is 170 cards/hour. A dual-side activation key is also available to upgrade a simplex unit on-site.',
   1, 30),
  ('bravo-faq-4', 'bravo-card-printers-uae', 'Which Bravo printer supports holographic retransfer?',
   'The Bravo RTAI supports holographic retransfer film — both standard and customised holograms — directly in the printer without a separate laminator. This makes it ideal for government IDs, banking cards, and access credentials requiring overt security features.',
   1, 40),
  ('bravo-faq-5', 'bravo-card-printers-uae', 'Can I print on wooden or transparent cards with Bravo printers?',
   'Yes — the Bravo RTAI supports PVC, ABSS, PET, PET-G, PC, wooden (specially treated), and translucent cards. This breadth of media support makes it unique in the UAE market for eco-friendly and specialist card applications.',
   1, 50),
  ('bravo-faq-6', 'bravo-card-printers-uae', 'How much do Bravo card printers cost in Dubai / UAE?',
   'Pricing depends on configuration (simplex/duplex, encoding modules, lamination). Contact Sahara Office Equipments for a tailored quote for the UAE market. As the exclusive distributor, we offer competitive pricing, warranty, and after-sales support.',
   1, 60),
  ('bravo-faq-7', 'bravo-card-printers-uae', 'Is technical support and service available in UAE for Bravo printers?',
   'Yes. As the sole UAE distributor, Sahara provides on-site technical support, genuine Bravo consumables (ribbons, retransfer film, cleaning kits), and warranty service for both the RTAI and DC 3300 across all emirates.',
   1, 70),
  ('bravo-faq-8', 'bravo-card-printers-uae', 'What warranty do Bravo card printers carry?',
   'Both the Bravo RTAI and DC 3300 carry a 3-year printer warranty. The RTAI additionally provides a lifetime warranty on the print head. Optional extended warranty is available through Sahara Office Equipments as the authorised UAE service partner.',
   1, 80);

-- PaperCut Print Management FAQs
INSERT OR REPLACE INTO faqs (id, pageSlug, question, answer, isActive, sortOrder)
VALUES
  ('papercut-faq-1', 'papercut-print-management', 'What is PaperCut print management software?',
   'PaperCut is the world''s leading print management software used by 100+ million users across 200 countries. It tracks, controls, and reduces print costs by enforcing print policies, enabling secure print release, and reporting on usage by user, department, or project. Sahara provides PaperCut MF and NG setup, licensing, and support for UAE offices.',
   1, 10),
  ('papercut-faq-2', 'papercut-print-management', 'How much does PaperCut cost for a UAE office?',
   'PaperCut NG (for SMEs) starts from approximately AED 1,800 per year for 10 users. PaperCut MF (for enterprise with MFP integration) is licensed per device. Sahara provides competitive UAE pricing with installation, configuration, and 1-year support included.',
   1, 20),
  ('papercut-faq-3', 'papercut-print-management', 'Which printers does PaperCut work with in UAE?',
   'PaperCut MF works natively with Canon, Kyocera, Ricoh, Xerox, HP, Brother, and Sharp MFPs — all brands Sahara dealers in UAE. Installation integrates directly into the printer''s touch panel for secure print release and copy/scan tracking.',
   1, 30),
  ('papercut-faq-4', 'papercut-print-management', 'Can PaperCut reduce our office printing costs in Dubai?',
   'Yes. Dubai and UAE businesses that implement PaperCut typically see 20–30% reduction in print volume within 3 months — driven by duplex enforcement, colour restrictions, secure print release (reduces uncollected prints), and department quota management.',
   1, 40),
  ('papercut-faq-5', 'papercut-print-management', 'Does Sahara provide PaperCut training and support in UAE?',
   'Yes. Sahara''s PaperCut implementation service includes on-site installation, Active Directory/LDAP integration, user training, and 12-month remote + on-site support across Dubai, Sharjah, and Abu Dhabi.',
   1, 50);
