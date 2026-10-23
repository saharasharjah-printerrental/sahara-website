# Meta prompt: rental pricing consistency (page vs calculator)

Standing rules: `.claude/rules/seo-operating-law.md`. Template: `META_PROMPT.md`.

## Trigger
An external agency (Growthaiq, Hasan Badruk, email of 2026-10-18) noticed that the rental page says there is no metered per-page charge, while the linked calculator adds AED 30 when B&W volume goes from 3,000 to 3,500 pages. They asked whether these are two different offers or one tariff described two ways. Verified in code on 2026-10-23:
- `src/app/services/printer-rental/page.tsx:270` (AEO answer block) and the FAQ at line 51: "one fixed monthly fee ... unlimited genuine OEM toner ... no deposit, no metered page charge, and no exit fee".
- `src/components/CalculatorClient.tsx:16-18, 347-353`: BASE_RENT + extra pages beyond a free pool (3,000 B&W + 1,000 colour, AED 380 included value) charged at AED 0.06 per B&W page and AED 0.20 per colour page, plus an A3 surcharge. 500 extra B&W pages = AED 30.

## Prompt

Work in C:\Users\DK\Documents\GitHub\sahara-website on https://www.saharaprinter.com. Read `.claude/rules/seo-operating-law.md`, the top of `HANDOFF.md`, and `docs/seo/meta-prompt-rental-pricing-consistency-2026-10-23.md`.

**Goal:** make every public statement about rental charges describe one tariff, and make the calculator compute exactly that tariff. Pricing is a business decision: do not choose it, do not assume which side is right, and do not edit prices until the owner has approved the tariff in writing in this conversation.

**Phase 1 - Read-only audit (no edits)**
1. Inventory every place the site states or implies how rentals are charged. Search source, FAQ defaults, JSON-LD (Service/Offer/FAQPage/HowTo schema), blog posts under `src/app/blogs` and `content/`, metadata (title, description, OG), `llms.txt`, the `/rental-calculator/` page, quote and email templates, and the admin-stored FAQ/settings in D1 (a DB FAQ row overrides the code default, so query it read-only or list which slugs may be overridden). Terms to search include: no metered, per-page, per page, unlimited toner, free pages, included pages, click charge, overage, fair use, fixed monthly fee, all-inclusive, AED per page, fils.
2. For each statement record: file and line (or slug), exact wording, and which tariff it implies (A: flat fee, no page charges; B: base rent plus included pages plus per-page overage; unclear).
3. Extract the calculator's full formula and constants (BASE_RENT, free pool, BW/colour price per page, A3 surcharge, contract-length discount if any) and run 5 to 8 worked examples, including the agency's (B&W 3,000 vs 3,500 pages) and a colour-heavy case. Show inputs and output.
4. Report which statements conflict with the calculator. Separate confirmed conflicts from wording that is merely ambiguous.

**Phase 2 - Decision (owner)**
Ask the owner, with AskUserQuestion, which is the approved tariff:
- Option A: flat monthly fee with no per-page charges (then the calculator must stop adding per-page cost, or become a device-and-term configurator only).
- Option B: base rent plus an included page allowance with per-page overage (then the "no metered page charge" and "unlimited toner" style claims must be reworded to say what is unlimited and what is not).
- Option C: two named plans (for example a flat-fee plan and a volume plan) with their own conditions.
Also collect the exact numbers if B or C: included pages, per-page rates, A3 surcharge, any fair-use cap, and which devices/contract lengths each applies to. Record the answer verbatim in the audit file.

**Phase 3 - Implementation (only after approval of the tariff, and of the edits list)**
1. Update the calculator constants and copy so its output equals the approved tariff for all worked examples. Keep one source of truth for rates (a shared constant or config) so the page, schema, FAQ and calculator cannot drift again.
2. Rewrite every conflicting statement found in Phase 1, including FAQ defaults, AEO block, JSON-LD, metadata, blog copy and the DB-stored FAQ rows (propose the DB changes as SQL for the owner to apply, do not write to production).
3. Add a visible one-line "how charges work" note next to the calculator result and on the rental page, in the same words.
4. Keep price points that appear in schema (`price`, `priceSpecification`) consistent with the approved tariff.
5. Add a test (for example under `tests/`) that asserts the calculator output for the agreed worked examples, so a future change that breaks the tariff fails.

**Phase 4 - Verify**
Run `npx tsc --noEmit` and `npm run build`. Re-run the worked examples against the built calculator. Re-grep the repo for the old wording. Open the rental page and calculator in a browser and compare what a customer sees. List remaining places that may still carry the old wording (DB rows, external listings such as GBP, directory citations the agency is building) for the owner.

**Boundaries**
- Read-only until Phase 3 is approved. No commit, push, deploy, or database writes without a separate explicit instruction.
- Do not reply to or engage the agency. Optionally draft a short reply for the owner to send (thank them, say the tariff is being reviewed, ask for nothing yet). Do not accept the agency's offer to "reconcile" on the owner's behalf.
- Do not invent prices, allowances, or conditions. Unknown values stay "to confirm with owner".
- Do not claim the issue is fixed until Phase 4 evidence is shown.

**Deliverables**
- `docs/seo/rental-pricing-audit-<date>.md`: inventory table, calculator formula, worked examples, owner decision, change list, verification results.
- Code changes (uncommitted) and, if needed, SQL for DB FAQ rows.
- A short dated resume point in `HANDOFF.md`.
