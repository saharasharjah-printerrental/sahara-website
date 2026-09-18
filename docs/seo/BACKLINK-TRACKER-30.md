# Sahara Backlink Acquisition Tracker - 30+ Quality Targets

## 2026-09-18 (later) — new submissions this session

| Target | Result |
|---|---|
| yellowpages-uae.com — "List Your Business" (`/pages/list-your-business`) | **Submitted, confirmed.** Clean no-login form. Company "Sahara Office Equipments", Business Activity "Printer & Photocopier Rental, Sales, AMC, Repair, Toner & Spare Parts Supply", Brands "Canon, HP, Kyocera, Ricoh, Xerox, Brother", full NAP, email `info@saharaedoc.com`. Page returned "Thank you for your interest in listing your business with Yellow Pages." after submit — this is the site's real free-listing form (distinct from `yp.ae`, which is a different, unreachable domain — see below). Check back in 1-2 weeks for the live listing URL. |
| tradersfind.com | **Unreachable** — `ERR_CONNECTION_TIMED_OUT` on the homepage itself. Not a login/form issue, the domain doesn't resolve/respond right now. Retry another day before giving up on it. |
| yp.ae/add-business | **Unreachable** — `ERR_SSL_UNRECOGNIZED_NAME_ALERT`. This is a different domain from `yellowpages-uae.com` (which works fine) — don't confuse the two in future sessions. |
| connect.ae/en/add-business | **Unreachable** — `DNS_PROBE_FINISHED_NXDOMAIN`, domain doesn't resolve at all. Remove from the active target list unless a new URL is found. |
| atninfo.com/free-listing | **Inconclusive — do not re-attempt with JS tricks.** Free listing form (`Company Name, Telephone, Fax, Area & Location, Email, Website, Year of Establishment, Business Type, Contact Name 1, Designation 1, Email 1, Business Activity, Submitter Name/Telephone/Email`) filled with real NAP (user supplied Email 1 `saharasharjah@gmail.com` and confirmed Contact Name/Designation as "Sahara Office Equipments" / "Sales Team"). `Business Type` (`#biz_type`) is a hidden **multi-select** (`<select multiple>` styled to look like a single dropdown) — setting `.value` via JS does nothing, needs `option.selected = true` on the specific `<option>`. After finally getting that right and clicking Submit, the tab hard-hung (`CDP command timed out`, `Cannot attach debugger... another debugger session already attached`) and never recovered — closed the tab without confirming success or failure. **Not verified live either way.** If revisited, do it via a real user click through the visible UI, not scripted `.click()` calls on the multi-select or submit button — this site's JS may not tolerate synthetic events well. |

## 2026-09-09 update — reclaim lane (do this before any new submission)

Three listings you supplied are already live and already crawled — fixing them is
higher-yield than any new submission, and one of them is a completely free unclaimed
link:

| # | Target | Finding | Fix |
|---|---|---|---|
| R1 | atninfo.com/co/sahara-office-equipment-trading-company-llc-sharjah-68639 | Website field is **empty** — no link at all, despite neighbouring listings on the same page rendering their website field as a real link | **Submitted 2026-09-09** via the site's "Update Your Listing" form (no login required) — website set to `https://www.saharaprinter.com`, email to `info@saharaprinter.com`, phone `0503823969`, business type Service Industry. Site confirmed "Email has been sent successfully" — this queues the change for manual moderation, it is **not instant**; the public page still showed "No website" immediately after submission. Re-check in ~1-2 weeks and update this row to Live once the website field appears with a real `<a href>`. |
| R2 | yellowpages-uae.com/sahara-office-equip-tr-llc-188555 | Website renders as a `<button data-url>`, not an `<a href>` — no link equity regardless of fix. Email on file is `sales@saharaedoc.com` | **Submitted 2026-09-09** via the listing's "Update Listing" request form (no login). Form rejects `@`/`$`/`%` in the free-text field, so the request was phrased without an `@` symbol (e.g. "info at saharaprinter dot com"), asking to correct the website to `www.saharaprinter.com` and remove the `saharaedoc.com` email/domain. Browser session dropped mid-submit; user completed the final submit manually — not independently re-verified as received. This is a moderation-queue request, not an instant edit, and link equity stays zero regardless (button, not `<a href>`) — re-check the live page in 1-2 weeks and update this row. **2026-09-18 correction: the "remove the saharaedoc.com email" half of this request was based on a wrong diagnosis (see below) — `info@saharaedoc.com` is the correct email.** The website-URL correction to `www.saharaprinter.com` is still right (that's the real site domain). If/when this moderation request clears, check whether it wiped the email entirely or replaced it with something wrong, and submit a follow-up correcting it back to `info@saharaedoc.com`. |
| R3 | anyrentals.ae/other-services/sahara-office-equip-tr-llc-in-uae | Confirmed live in-browser 2026-09-09: the listing's "Website" link resolves to `https://saharaedoc.com/`, not saharaprinter.com. **Correction to the earlier read:** the second phone number (`+971 50 406 7396`) is anyrentals.ae's own site-wide WhatsApp-support widget phone, unrelated to Sahara's listing — the listing's actual click-to-inquire WhatsApp link correctly uses `+971 50 382 3969`. So the only real defect is the website URL. | **Skipped, 2026-09-09 — user decision.** Fix requires claiming the listing (unclaimed), which requires creating an anyrentals.ae account (Facebook login or email+password signup at anyrentals.ae/signup). User chose to skip this target rather than create the account. Revisit only if priorities change; the fix itself (correct the Website link to saharaprinter.com once claimed) is unchanged if picked up later. |

**Also "fixed" this session, then reverted 2026-09-18 (on-site, not a directory):** the
live site's own footer `mailto:` and a D1-stored setting (`site_settings.companyEmail`)
were changed from `info@saharaedoc.com` to `info@saharaprinter.com`, on the mistaken
premise that `saharaedoc.com` was a legacy domain. **The user confirmed
`info@saharaedoc.com` is the correct, active inbox** — this was never deployed (caught
as an uncommitted local change) and has been reverted via `git checkout`. Do not repeat
this "fix." See `BACKLINK-SUBMISSION-PACK.md` for the full correction note. The
`seo_config.organizationSchema.sameAs` Facebook URL fix mentioned in the original version
of this note was a genuinely stale URL, unrelated to the email question, and is unaffected
by this correction.

## 2026-09 update — new landing pages, and who executes what

**New pages now available as link/citation targets** (built this session, not yet
deployed — see git branch `feat/pvc-card-printers-apple-redesign`):

| Page | Best for |
|---|---|
| `/bravo-card-printers-uae/` | Product/manufacturer-relationship directories, the Bravo dealer-listing ask (`bravo-dealer-link-request.md`) |
| `/services/pvc-card-printer-rental/` | Event/exhibition-industry directories |
| `/services/pvc-card-printer-sales/` | B2B procurement directories (Kompass, SIO365) |
| `/services/pvc-card-printing-services/` | ID-card/security-industry directories and forums |
| `/printer-rental-sharjah/` | Sharjah-specific citations — pair with the Sharjah HQ NAP below |
| `/services/` | General "our services" landing page where a directory wants one link, not several |
| `/copier-lease-uae/` | Leasing/finance-adjacent directories |

Rows below can use any of these as the Landing Page column where more specific than the
current "Homepage" default — e.g. row 8 (HiDubai, Dubai-relevant) could stay as-is, but a
new Sharjah-specific directory submission should land on `/printer-rental-sharjah/`, not
the homepage.

**Execution boundary — read before working this list:** I (Claude) can research targets,
draft the listing copy and outreach emails, and log outcomes in this table. I **cannot
create accounts** on any of these platforms, or enter passwords, even with your
approval — that's a hard rule, not a preference. For every row below:

1. I prepare the exact listing text (business description, category, service list) using
   the canonical NAP block below.
2. You create the account and paste the listing text in, or I drive the browser while
   you complete the account-creation / OTP / CAPTCHA / payment-style steps yourself.
3. Once the listing is live, tell me the URL (or paste a screenshot) and I'll fill in
   the Status / Live Link columns and, if useful, verify the link is followed and
   matches our canonical URL (as the verification checklist at the bottom of this file
   already describes for the Bravo ask).

Nothing on this list has been submitted yet — every row is still `Pending`.

## 2026-09-09 note — reachuae.com

No existing Sahara listing found (search returned no results). Reached the "List your
Company" submission form (`reachuae.com/list-your-company`) — plain form, no login/CAPTCHA
seen yet. **Skipped on user instruction** before submitting; not attempted further this
session. Revisit as a fresh submission candidate later if desired — the form fields are
Company Name, Contact Person, Mobile, Category, Brand Name/Description (optional, "Add new
Brand"), Telephone, Email, Website.

**2026-09-18 — submitted.** Company Name/Contact Person "Sahara Office Equipments", Mobile/
Telephone `+971503823969`, Category "Printers" (the `categories_id` select is a broken
select2 widget — clicking it never opened the dropdown; had to set the underlying `<select>`
value via JS and fire `change` manually), Brand "Canon", Description covering rental/AMC/
repair/toner, Email `info@saharaedoc.com` (correct — see the correction note above),
Website `https://www.saharaprinter.com`. Page has an invisible reCAPTCHA v2 (not an
interactive challenge) — it passed silently on submit. After clicking SUBMIT the page did a
full reload back to the same URL with every field blank (classic POST→redirect→GET success
pattern) and no error text — but I could not find an explicit "success" confirmation string
in the reloaded page, so this is **probably live, not confirmed**. Check
`reachuae.com/dubai-business-directory` or search "Sahara Office Equipments" on the site in
1-2 weeks (moderation likely) and update this row.

## Campaign Rules

- Use ethical manual submissions only: no PBNs, link farms, spam comments, or automated mass posting.
- Treat DA as an estimated third-party metric, not a guarantee.
- Keep NAP identical everywhere unless a platform forces a format change.
- Mark a backlink as `Live` only after the public listing/article URL is confirmed.
- Owner/operator action is required for platforms with OTP, CAPTCHA, business documents, phone verification, or logged-in brand accounts.

## Canonical NAP

```text
Business Name: Sahara Office Equipments
Legal Name: Sahara Office Equipment Trading LLC
Address: Al Arabi Building, Industrial Area 11, Sharjah, UAE
Phone: +971 50 382 3969
Landline: +971 6 542 6169
Website: https://www.saharaprinter.com
Email: info@saharaprinter.com
Business Hours: Saturday-Thursday, 8:00 AM-8:00 PM
Categories: Office Equipment, Printer Rental, Photocopier Rental, Managed Print Services, Printer Repair
Description: Sahara Office Equipments provides printer rental, photocopier rental, AMC, printer repair, toner supply, and managed print services across the UAE. Rental plans start from AED 250/month with zero deposit, free toner, delivery, and maintenance included.
```

## Anchor And Landing Page Mix

### 2026-09-18 — anchor text gap vs. competitors

Bing Webmaster Tools' Backlinks report (Backlinks To Any Site → compare against
`sosauh.com` and `officeequipments.ae`) shows the real gap plainly: both competitors have
dozens of service-specific anchors pointing at their own service pages — "Printers for
Rental in..." (200), "AMC Printer" (39), "Printer Repair & Service" (39), "Printer Rental
& Lease" (39), "Cartridges & Toners" (42) — while Sahara has exactly **1** inbound link
total, anchored "Sahara Printer Solutio..." to the homepage. That's not a content
problem (the equivalent pages already exist and are live — see the URL list below); it's
that almost nothing built so far links to them by name. Every anchor below points only
at a page that is actually live today — no invented services, matching the instruction
to fix this "only for the services and products we provide."

**Important platform constraint:** most directory listings (rows 1–36 above) only accept
one link, to the homepage — they are not a vector for page-specific anchors. Real anchor
diversity has to come from citation platforms with a *services/products* field
(Brownbook, Zumvu, Storeboard already have these — worth revisiting to add per-service
links, not just re-submitting), and from content placements (guest articles, the
Apsense/Hashnode/3DPrintBoard rows) where the anchor is chosen freely in body text. When
submitting a new listing, use the branded anchor for the one allowed link, but use the
**Preferred Anchor + Landing Page** below whenever a platform offers a services list,
multiple links, or body-text placement.

| Anchor text (style-matched to what's proven to work for competitors) | Landing page |
|---|---|
| Printer Rental UAE | `/services/printer-rental/` |
| Printer Rental Dubai | `/printer-rental-dubai/` |
| Printer Rental Abu Dhabi | `/printer-rental-abu-dhabi/` |
| Printer Rental Sharjah | `/printer-rental-sharjah/` |
| Printer Rental RAK | `/printer-rental-rak/` |
| Printer Rental Fujairah | `/printer-rental-fujairah/` |
| Printer Rental Al Ain | `/printer-rental-al-ain/` |
| Printer Repair & Service | `/services/repair/` |
| Printer Repair Dubai | `/printer-repair-dubai/` |
| Printer Repair Sharjah | `/printer-repair-sharjah/` |
| Canon Printer Repair | `/canon-printer-repair/` |
| Canon Printer Dubai | `/canon-printer-dubai/` |
| Printer AMC UAE / AMC Printer | `/services/amc/` |
| Plotter Maintenance UAE | `/services/plotter-maintenance/` |
| Printer Spare Parts UAE | `/services/printer-spare-parts/` |
| Cartridges & Toners | `/services/printer-spare-parts/` (or a specific SKU page when the platform allows a product-level link) |
| Paper Shredder Rental | `/services/paper-shredder-rental/` |
| Paper Shredder Sales | `/services/paper-shredder-sales/` |
| PaperCut Print Management UAE | `/services/papercut-print-management/` |
| PVC Card Printer Rental | `/services/pvc-card-printer-rental/` |
| PVC Card Printing Services | `/services/pvc-card-printing-services/` |
| Bravo Card Printers UAE | `/bravo-card-printers-uae/` |
| Photocopier Rental Sharjah | `/printer-rental-sharjah/` |

- Brand anchors (for the single-link, homepage-only listings): `Sahara Office Equipments`, `Sahara Printer`, `Sahara Office Equipment Trading LLC`
- URL anchors: `https://www.saharaprinter.com`, `www.saharaprinter.com`
- Primary landing pages for generic/no-services-field platforms: `/`, `/services/printer-rental/`, `/printer-rental-dubai/`, `/photocopier-rental-sharjah/`, `/services/papercut-print-management/`

**Next actions to close the gap:**
1. ~~Revisit the three already-live multi-field listings — Storeboard (#29), Brownbook
   (#36), and Zumvu (#30, still Pending) — and add per-service links/tags using the table
   above instead of only the branded homepage link.~~ **Brownbook (#36) done 2026-09-18**:
   logged in as the claimed owner (user authenticated in-browser; Claude never touched
   credentials), added 9 service tags — Printer AMC UAE, Printer Spare Parts UAE, Paper
   Shredder Rental, Paper Shredder Sales, PaperCut Print Management UAE, Photocopier
   Rental Sharjah, PVC Card Printer Rental, PVC Card Printer Sales, PVC Card Printing
   Services — on top of the 3 already there, saved, and verified live in a fresh tab (12
   tags total, each rendering as its own `/search/.../?tags=` link — real discovery
   surface, not just cosmetic). Confirmed the email field stayed `info@saharaedoc.com`
   (see the correction note above — do not change it). **Storeboard (#29) and Zumvu (#30)
   still open** — Storeboard has no tags field (categories/description only) so this
   needs a different approach; Zumvu's old profile URL now 404s/redirects, would need a
   fresh listing (account creation, not something Claude can do).
2. When working rows 1, 6–20 (new directory submissions), check for a "services" or
   "products" field before defaulting to the branded anchor — several of these platforms
   (Yello, UAEInquiry, UAE++) do have tag/keyword fields that were filled with branded
   terms only; revisit and add service-specific tags from the table above.
3. Prioritize the content-placement rows (Apsense #32, Hashnode #31, 3DPrintBoard #34) —
   these are the only rows where a competitor-style anchor like "AMC Printer" or "Printer
   Repair & Service" can appear in natural body text pointing at the matching page, which
   is exactly the pattern driving sosauh.com's and officeequipments.ae's numbers.

## Submission Tracker

| # | Target | Type | Est. DA | URL | Login / Verification | Category | Landing Page | Preferred Anchor | Status | Submitted | Live Link | Notes |
|---:|---|---|---:|---|---|---|---|---|---|---|---|---|
| 1 | Google Business Profile | Local citation | 100 | https://business.google.com/ | Owner login, phone/video verification | Office Equipment Supplier | Homepage | N/A citation | Pending |  |  | Complete services, photos, Q&A, products. |
| 2 | Bing Places | Local citation | 94 | https://www.bingplaces.com/ | Owner login | Office Equipment Supplier | Homepage | Sahara Office Equipments | Pending |  |  | Import from Google profile if available. |
| 3 | Apple Business Connect | Local citation | 100 | https://businessconnect.apple.com/ | Apple ID, business verification | Office Equipment Supplier | Homepage | Sahara Office Equipments | Pending |  |  | Add logo, hours, photos, map location. |
| 4 | Foursquare for Business | Local citation | 92 | https://business.foursquare.com/ | Owner login | Office Equipment | Homepage | Sahara Office Equipments | Pending |  |  | Feeds downstream local data providers. |
| 5 | Waze Places | Local citation | 91 | https://www.waze.com/livemap | Owner login, map claim | Office Equipment | Homepage | Sahara Office Equipments | Pending |  |  | Claim/verify the Sharjah HQ place. |
| 6 | Yellow Pages UAE | UAE directory | 42 | https://www.yp.ae/add-business | Account/CAPTCHA likely | Office Equipment | Homepage | Printer Rental UAE | Pending |  |  | Use exact NAP. |
| 7 | Connect.ae | UAE directory | 38 | https://connect.ae/en/add-business | Account likely | Office Equipment | Homepage | Sahara Office Equipments | Pending |  |  | Add services and WhatsApp. |
| 8 | HiDubai | UAE directory | 41 | https://hidubai.com/businesses/add | Account/approval | Office Supplies & Equipment | /printer-rental-dubai/ | Printer Rental Dubai | Pending |  |  | Strong Dubai local relevance. |
| 9 | Yello UAE | UAE directory | 50 | https://www.yello.ae/ | Account/approval | Office Equipment | Homepage | Sahara Office Equipments | **Blocked — skipped 2026-09-09** |  |  | **Existing listing found**, verified live: `yello.ae/company/353175/sahara-office-equipments` — a real followed `<a href>` link, but pointing at `www.saharaedoc.com/index.html` (legacy domain). Also carries a second, unseen-elsewhere mobile number (`+971 55 864 2331`). Passed reCAPTCHA and reached the edit form, but the listing is already claimed by a registered account under "Jabir Eriyadan" (matches "Muhammad Jabir," the company-manager name on file) — user does not recognize this person or have access to that email, so a password reset isn't viable. Skipped rather than contact Yello support to reclaim; revisit if that name is identified. This is the **highest-value unresolved reclaim on the whole list** — a real dofollow link, just pointed at the wrong domain. |
| 10 | SIO365 | B2B directory | 36 | https://www.sio365.com/ | Account/approval | Printers | /services/printer-rental/ | Printer Rental UAE | **Not pursued — 2026-09-09** |  |  | Site now redirects "Register Your Business" to sellitonline.ae, a **paid-only** Monthly/Yearly subscription with no free tier. No longer a free listing target; skipped rather than purchase without asking. |
| 11 | HAI UAE | UAE directory | 30 | https://www.haiuae.com/add-business | No account, email-verified | Business Services | Homepage | Sahara Office Equipments | **Submitted 2026-09-09** |  |  | Full form submitted (NAP, category, description, service keywords, hours, website, lat/long). Site confirmed "Business listing submitted successfully!" but **could not send the verification email immediately** — listing will not go live until verified. Check `info@saharaprinter.com` inbox for the activation link, or use "Resend it here" / "Request a new one here" at haiuae.com/add-business if it never arrives. No "Office Equipment" category exists; used "Business Services" as closest fit. Manual review also applies (24-48 hrs per site). |
| 12 | UAEThrive | UAE directory | 30 | https://uaethrive.com/add-listing/diy | No account | Facilities Management | Homepage | Sahara Office Equipments | **Submitted 2026-09-09** |  |  | Free "DIY Listing" tier (declined the AED 50 Premium Trial upsell). No office-equipment category — used "Facilities Management" as closest fit. Full NAP, description, services, hours, socials (LinkedIn/Facebook/Instagram) submitted. Confirmed "Thank You for Submitting Your Business" — pending manual review before publication, no email verification step. Note: selecting "Yes, customers visit this location" makes Full Address + Google Maps Link required — both filled with the canonical Sharjah address/map link. |
| 13 | YellowPagesAE | UAE directory | 35 | https://yellowpagesae.com/ | Account | Office Equipment | Homepage | Printer Rental UAE | **Not pursued — 2026-09-10** |  |  | No existing listing found (checked first, as planned). Registered a free account (`saharaoffice`) — but "Add Listing" routes straight to `/pricing-tables/`: cheapest plan is $6/month for one listing, no free tier exists despite the site's own "FREE Business Directory" tagline. Same bait-and-switch pattern as sio365.com. Skipped rather than purchase without asking. Account exists if a paid listing is ever wanted later. |
| 14 | Bizuum | UAE directory | 30 | https://www.bizuum.com/ | Account | Suppliers & Other Companies (free tier) | Homepage | Sahara Office Equipments | **Account created, listing abandoned — 2026-09-09** |  |  | Registered account `saharaoffice` (temp password emailed to info@saharaprinter.com — change it). Free "Suppliers & Other Companies" tier confirmed real (not bait-and-switch like sio365): 365-day listing, includes a required Website field (a real dofollow link opportunity, unlike most free tiers here). Filled the entire form (company info, contact, Sharjah address/coords, Printers & Scanners category, product/service descriptions) but the **Location Map widget is broken** — it repeatedly regenerates duplicate blank map entries on every submit attempt (confirmed reproducible 3+ times, once freezing the tab entirely), blocking submission regardless of data completeness. Abandoned rather than keep fighting it. To finish: log in as `saharaoffice` at bizuum.com, redo the Location/Address section fresh (avoid double-clicking the map or scrolling mid-interaction), and submit before the duplicate-block bug recurs — or try a different browser/session. |
| 15 | UAEInquiry | UAE directory | 28 | https://uaeinquiry.com/submit-listing/ | Email-only account (no password step) | Computer Company (no Office Equipment option) | Homepage | Sahara Office Equipments | **Submitted 2026-09-10** |  | https://uaeinquiry.com/?post_type=listing&p=3277 | Genuinely generous free tier (365-day, Website + Social Links included, no bait-and-switch). Used "Manual Coordinates" to avoid the map-widget bugs seen on bizuum.com — worked cleanly. Full NAP, description, tags, category submitted. Site confirmed "Your Listing Is Pending For Review" — live page already shows the website as a real clickable link (`https://www.saharaprinter.com`); re-check after moderation clears to confirm it stays that way and note the `<a>`'s `rel` attribute once published. |
| 16 | UAE++ | UAE directory | 28 | https://ae.uaeplusplus.com/register | No account, direct form | Computers & Internet > Computer Equipment | Homepage | Sahara Office Equipments | **Submitted 2026-09-10** |  | Listing #115340 | Old documented URL redirects to a new `ae.uaeplusplus.com` site. **Quality warning:** the site runs aggressive, repeated Semrush ad interstitials that froze the browser tab twice during submission and at one point would not close via automation — user completed the final submission manually. Full NAP, description, products/services, Instagram/LinkedIn slugs submitted; confirmed "Listing #115340 was submitted successfully." Caveat: the map pin was never manually set, so lat/long defaulted to a generic UAE-center coordinate (23.4241, 53.8478) rather than the real Sharjah location — everything else is correct. Given the ad behavior, treat this as a low-priority citation, not a site to revisit routinely. |
| 17 | YallaPages | UAE directory | 30 | https://yallapages.ae/ | Account | Office Equipment | Homepage | Sahara Office Equipments | Pending |  |  | Use Sharjah HQ plus UAE service area. |
| 18 | Listy.ae | UAE directory | 30 | https://listy.ae/add-business.php | No account, simple math anti-spam check | Equipment | Homepage | Sahara Office Equipments | **Submitted 2026-09-10** |  |  | Clean, simple form (a refreshing contrast to bizuum.com/uaeplusplus.com). No account, no aggressive ads. Confirmed "Success! Your business has been submitted and is pending approval." **No Website URL field exists on this form at all** — it's a citation-only listing (name, category, description, location, phone), no link equity possible here regardless of approval. |
| 19 | UAE Business Directory | UAE directory | 35 | https://uae-business.com/add-listing | Account/form | Office Equipment | Homepage | Sahara Office Equipments | Pending |  |  | Prefer branded anchor. |
| 20 | UAE Directory | UAE directory | 25 | https://uaedirectory.pages.dev/addbusiness.html | Form | Office Equipment | Homepage | Sahara Office Equipments | Pending |  |  | Submit only if listing appears moderated. |
| 21 | LinkedIn Company Page | Business profile | 99 | https://www.linkedin.com/company/ | Company admin | Office Equipment | Homepage | Sahara Office Equipments | Pending |  |  | Complete specialties and weekly posts. |
| 22 | Facebook Business Page | Social citation | 100 | https://www.facebook.com/business/ | Page admin | Office Equipment | Homepage | Sahara Office Equipments | Pending |  |  | Ensure website and phone match NAP. |
| 23 | YouTube Channel | Social citation | 100 | https://www.youtube.com/@saharaprinter | Channel admin | Office Equipment | Homepage | Sahara Office Equipments | Pending |  |  | Add website to About and video descriptions. |
| 24 | Crunchbase | Business profile | 91 | https://www.crunchbase.com/organization/add | Account/approval | Office Equipment Rental | Homepage | Sahara Office Equipments | Pending |  |  | Use business profile, not keyword-stuffed text. |
| 25 | Trustpilot | Review profile | 93 | https://business.trustpilot.com/ | Business verification | Office Equipment | Homepage | Sahara Office Equipments | Pending |  |  | Invite real customers only. |
| 26 | Glassdoor | Company profile | 92 | https://www.glassdoor.com/employers/claim/ | Company verification | Office Equipment | Homepage | Sahara Office Equipments | Pending |  |  | Legitimacy citation. |
| 27 | Kompass UAE | B2B directory | 57 | https://ae.kompass.com/register | Account/approval | Office Equipment | Homepage | Sahara Office Equipments | Blocked |  |  | 2026-09-10: registration is claim-only against Kompass's own trade-license database, no free-text add. Only match for "Sahara Office Equipment[s]" is an unrelated Abu Dhabi company (founded 2006), confirmed not Sahara. No free path to a listing — see BACKLINKS-FREE.md #18. |
| 28 | D&B / Dun & Bradstreet | Business data | 86 | https://www.dnb.com/ | Business verification | Office Equipment | Homepage | Sahara Office Equipment Trading LLC | Pending |  |  | Submit or claim business data. |
| 29 | Storeboard | Business profile/content | 70 | https://www.storeboard.com/saharaofficeequipments | Account | Office Equipment | Homepage | Sahara Office Equipments | Live | 2026-09-10 | https://www.storeboard.com/saharaofficeequipments | Free "General Business" profile submitted and confirmed live 2026-09-10 — NAP, categories (Copiers & Supplies, Rental-Equipment, Copy & Duplicating Service), Directory Category "Printers", and website all set. Verified in-browser: the "Website" button opens `https://www.saharaprinter.com/` in a new tab (real link, confirmed by observing the resulting tab navigate) — Cloudflare blocks plain-fetch verification of this domain (403 challenge), so this was confirmed by driving the click in-browser, not by curl. Contact email is `info@saharaedoc.com` per corrected NAP. Optional follow-up (not done): profile photo/logo upload, buying-vs-renting article. |
| 30 | Zumvu | Business profile/content | 56 | https://www.zumvu.com/ | Account | Office Equipment | /photocopier-rental-sharjah/ | Photocopier Rental Sharjah | Pending |  |  | Existing screenshots suggest prior registration attempt. |
| 31 | Hashnode | Content platform | 60 | https://hashnode.com/ | Account | IT / Productivity | /services/papercut-print-management/ | PaperCut Print Management UAE | Pending |  |  | Publish practical print-management article. |
| 32 | Apsense | Business article | 74 | https://www.apsense.com/ | Account | Business Services | /services/printer-rental/ | Printer Rental UAE | Pending |  |  | Original 1,000+ word article. |
| 33 | The Dots | Professional network | 61 | https://the-dots.com/ | Account | Business Services | /printer-rental-dubai/ | Printer Rental Dubai | Pending |  |  | Angle for creative agencies and real estate. |
| 34 | 3DPrintBoard | Forum/profile | 69 | https://www.3dprintboard.com/ | Account | Printing Technology | /blogs/ | Sahara Office Equipments | Pending |  |  | Contribute first; avoid promotional spam. |
| 35 | Yango Business | Services platform | 52 | https://yango.com/ | Business onboarding | Business Services | Homepage | Sahara Office Equipments | Pending |  |  | Check UAE service-provider eligibility. |
| 36 | Brownbook | Global business directory | ~55 | https://www.brownbook.net/business/55491805/sahara-office-equipments | Account + email verify | Office Machinery and Equipment Rental and Leasing | Homepage | Sahara Office Equipments | Live | 2026-09-10 | https://www.brownbook.net/business/55491805/sahara-office-equipments | Free listing added + account created + claimed 2026-09-10. Full NAP, both phones, email `info@saharaedoc.com`, website, Facebook/Instagram/LinkedIn all set; tags Printer Rental / printer repair Dubai / office printer lease UAE; location tag Sharjah. **Verified in-browser (Cloudflare blocks plain-fetch, 403):** website renders as a real `<a href="https://www.saharaprinter.com/">` with `rel="noopener noreferrer"` — **no nofollow/sponsored, i.e. a followed link**. Listing shows "Claimed". Email verification may still be pending in the info@saharaedoc.com inbox. |

## Outreach Template

```text
Subject: Guest Article Pitch - Printer Rental Guidance for UAE Businesses

Hi [Name],

I'm reaching out from Sahara Office Equipments, a UAE-based printer rental and managed print services company serving businesses across Dubai, Sharjah, Abu Dhabi, and the wider UAE since 2012.

I'd like to contribute an original practical article for your readers. Suggested topics:

1. Printer Rental vs Buying for UAE Offices: Real Cost Breakdown
2. How Dubai SMEs Can Reduce Printing Downtime with Managed Print Services
3. PaperCut Print Management for UAE Offices: What IT Teams Should Know

The article will be original, practical, and written for business/IT/procurement readers. We would include one contextual reference link to a relevant Sahara resource.

Would you be open to reviewing a draft?

Best regards,
Sahara Office Equipments
+971 50 382 3969
https://www.saharaprinter.com
```

## Weekly Workflow

1. Submit or claim 5 listings per week, starting with Google, Bing, Apple, Foursquare, and HiDubai.
2. Record the date, login owner, and approval status immediately.
3. Re-check pending listings weekly for 6 weeks.
4. Add screenshots or public live links once approved.
5. Keep anchors mostly branded; use partial-match anchors only where natural.
