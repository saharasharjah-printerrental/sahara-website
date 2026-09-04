-- Seed FAQs for copier-lease-uae, rebuilt in Phase 6b from a client-only page
-- that had no metadata and shipped an empty FAQPage schema pre-hydration.
-- Mirrors the DEFAULT_FAQS fallback array in
-- src/app/copier-lease-uae/page.tsx. Idempotent: INSERT OR REPLACE by id.

INSERT OR REPLACE INTO faqs (id, pageSlug, question, answer, isActive, sortOrder) VALUES
('lease-faq-1', 'copier-lease-uae', 'What is the difference between copier lease and rental in the UAE?', 'Both are operating expenses with no ownership transfer at Sahara — the difference is term length. A lease typically runs 12-60 months for a lower monthly rate and stable long-term budgeting; a rental runs 3-36 months with more flexibility to return or upgrade sooner. Both include toner, maintenance, and repairs.', 1, 10),
('lease-faq-2', 'copier-lease-uae', 'What are the tax advantages of leasing a copier in the UAE?', 'Lease payments are treated as an operating expense (OPEX) rather than a capital purchase, which is deductible under UAE Corporate Tax. This improves cash flow compared to an outright purchase, which is capitalised and depreciated instead.', 1, 20),
('lease-faq-3', 'copier-lease-uae', 'Can I upgrade my leased copier during the term?', 'Yes. Sahara''s lease agreements include upgrade options — you can move to a newer model during the lease period, typically without penalty, as equipment needs change.', 1, 30),
('lease-faq-4', 'copier-lease-uae', 'What happens at the end of a copier lease term?', 'You can renew the same plan, upgrade to newer equipment, or return the machine — Sahara collects it at no charge. There are no disposal costs and no exit fees on standard terms.', 1, 40),
('lease-faq-5', 'copier-lease-uae', 'Do you offer zero deposit leasing in the UAE?', 'Yes — zero or minimal deposit leasing is available for qualified businesses, on the same terms as our rental plans.', 1, 50),
('lease-faq-6', 'copier-lease-uae', 'Which brands are available for lease?', 'All major brands: Canon, Kyocera, HP, Xerox, Ricoh, Sharp, Brother, and Konica Minolta — the same fleet available for rental or purchase.', 1, 60),
('lease-faq-7', 'copier-lease-uae', 'How long are typical lease agreements in the UAE?', 'Lease terms typically run 12-60 months (1-5 years), longer than our 3-36 month rental terms, in exchange for a lower monthly rate.', 1, 70),
('lease-faq-8', 'copier-lease-uae', 'Is maintenance included in a copier lease?', 'Yes — every lease includes comprehensive maintenance, unlimited genuine toner, and technical support at no additional cost, identical to our rental plans.', 1, 80);
