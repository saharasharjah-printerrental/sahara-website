# AEO Q&A Corpus — August 2026

Candidate question inventory for the AnswerBlock / FaqSection rollout.
Questions are **sourced**, not invented: every row traces to GSC query data,
a PAA/SERP harvest, or a competitor page that answers something Sahara does not.

**Format contract** every answer written from this corpus must satisfy:
first sentence answers directly in **under 15 words**; whole paragraph is
**40–60 words** and stands alone as an AI-search snippet; 2–4 supporting
bullets carry concrete facts (AED, hours, coverage, page yield) — no marketing
adjectives.

**Verifiable Sahara facts** (the only numbers answers may assert):
zero deposit · unlimited genuine OEM toner included in rental · ~4-hour
emergency response target (60-min Sharjah, 2-hour priority Dubai CBD) ·
rental from AED 250/mo (A4) / AED 500/mo (A3 MFD) / AED 1,000–2,000/mo
(enterprise) · AMC from AED 299/mo · repair from AED 150 · shredder rental
from AED 150 · 30-day workmanship warranty · coverage Dubai, Sharjah,
Abu Dhabi, Ajman, RAK, Fujairah, Al Ain · HQ Al Arabi Building, Industrial
Area 11, Sharjah · trading since 2012. Anything outside this list is phrased
generically ("current rates confirmed same working day by phone").

---

## Source 1 — Google Search Console (`sc-domain:saharaprinter.com`)

**Tool status: `mcp__gscServer__get_search_by_page_query` worked.** Window
2026-05-15 → 2026-08-13 (90 days), top 30 queries per page.

The pattern across all four pages is identical and confirms the HANDOFF.md
diagnosis: high impressions, near-zero clicks, average position deep in the
40–70 range. Google is *matching* these pages to the query but neither the
snippet nor the SERP position converts. These are answer-extraction
opportunities, not ranking-only problems.

### `/services/photocopier-rental/` — 327 impressions, **0 clicks**, 0.00% CTR

| Query | Impr. | Pos. | Read |
|---|---|---|---|
| copier rental | 63 | 58.2 | head term, page not competitive on generic |
| copier on rent | 26 | 35.5 | Indian/Gulf phrasing variant |
| copier rental in dubai | 26 | 64.3 | overlaps `/printer-rental-dubai/` |
| a3 photocopier uae | 21 | **4.0** | **top-5 already, still 0 clicks — pure snippet failure** |
| copier leasing dubai | 21 | 52.4 | lease-intent leaking onto rental page |
| a3 printer lease | 15 | 26.1 | lease-vs-rent confusion |
| copier lease dubai | 14 | 41.1 | → belongs to `/copier-lease-uae/` |
| copiers rental / copier for rental | 13 / 13 | 36.7 / 34.7 | |
| copier machine on rent | 11 | 19.6 | |
| copier rental services in sharjah | 11 | 48.3 | → `/photocopier-rental-sharjah/` |
| copier lease in uae / copier lease uae | 9 / 9 | 43.8 / 69.3 | → `/copier-lease-uae/` |
| a3 printer rental | 9 | 52.6 | |

**Extracted questions:** *"What is A3 photocopier rental in the UAE?"* ·
*"How much does a copier on rent cost per month in the UAE?"* ·
*"What is the difference between A3 and A4 copier rental?"*

### `/printer-rental-dubai/` — 291 impressions, 2 clicks, 0.69% CTR

| Query | Impr. | Pos. | Read |
|---|---|---|---|
| copier rental | 51 | 57.3 | |
| copier rental in dubai | 29 | 33.1 | |
| printer rental near me | 23 | 34.1 | **local/proximity intent — 1 click** |
| copier on rent | 17 | 58.2 | |
| a3 printer rental | 15 | 17.5 | |
| brother printer rental | 13 | 43.7 | brand-specific |
| copier lease dubai / copier lease in dubai | 13 / 13 | 66.2 / 46.4 | |
| color printer rental | 11 | 45.0 | |
| printer on rent | 9 | 42.6 | 1 click |
| a3 printer lease / copier leasing dubai | 9 / 9 | 24.1 / 70.2 | |
| best printer rental companies in dubai | 8 | 37.4 | **comparison intent, unanswered** |
| copier lease uae | 8 | 82.5 | |
| best printer leasing companies in dubai | 7 | 49.7 | |
| canon printer rental | 5 | 26.2 | |

**Extracted questions:** *"How fast can I get a rented printer delivered in
Dubai?"* (the "near me" + proximity cluster) · *"How do I choose a printer
rental company in Dubai?"* · *"Which Dubai districts do you deliver to?"*

### `/services/printer-rental/` — 201 impressions, 3 clicks, 1.49% CTR

| Query | Impr. | Pos. | Read |
|---|---|---|---|
| printer rental in uae | 28 | 38.0 | 2 clicks — best converter on the page |
| canon printer rental | 25 | **8.1** | **page 1, 0 clicks — snippet failure** |
| copier rental | 24 | 43.2 | |
| copier on rent | 14 | 62.7 | |
| printer lease in uae | 12 | 22.6 | 1 click |
| brother printer rental | 11 | 22.6 | |
| canon printer lease | 8 | 30.4 | |
| color printer rental | 9 | 71.3 | |
| copier lease uae / copier lease dubai | 7 / 7 | 47.4 / 59.9 | |
| copier lease in abu dhabi | 7 | 59.6 | |
| commercial printer rental | 5 | 24.0 | |
| best printer leasing companies in uae | 3 | 14.0 | comparison intent |

**Extracted questions:** *"What does printer rental in the UAE actually
include?"* (the definitional gap behind pos-8-zero-clicks on "canon printer
rental") · *"Which printer brands can I rent in the UAE?"*

### `/services/repair/` — 158 impressions, 1 click, 0.63% CTR

| Query | Impr. | Pos. | Read |
|---|---|---|---|
| canon printer service center dubai | 24 | 35.0 | authorised-centre intent |
| **emergency office printer repair service in dubai** | 24 | 30.0 | **response-time intent** |
| best photocopier repair service in dubai | 23 | 49.6 | comparison |
| affordable photocopier maintenance company in uae | 15 | 42.7 | price intent |
| affordable printer services in dubai | 9 | 61.0 | price intent |
| best place to service printers in dubai | 9 | 30.6 | |
| affordable typewriter maintenance service uae | 8 | 41.0 | off-topic drift |
| high quality printing equipment maintenance service uae | 8 | 46.9 | |
| canon printer repair / brother printer repair | 5 / 2 | 45.6 / 52.0 | |
| fax repair service near me | 5 | 23.8 | |
| how much does it cost to service a printer | 1 | **1.0** | **price question, position 1** |
| printer technician dubai | 1 | 17.0 | the page's only click |

**Extracted questions:** *"How much does it cost to repair a printer in the
UAE?"* (position-1 query, zero volume captured) · *"How fast can a technician
reach my office in an emergency?"* · *"Which printer brands do you repair?"*

---

## Source 2 — PAA / SERP harvest (WebSearch, UAE-qualified)

| Seed query | Harvested question | Target page | Intent |
|---|---|---|---|
| printer rental dubai cost | How much does printer rental cost per month in Dubai? | `/printer-rental-dubai/` | commercial |
| printer rental dubai cost | What's included in a printer rental plan? | `/services/printer-rental/` | informational |
| printer rental dubai cost | Are short-term / daily printer rentals available? | `/printer-rental-dubai/` | commercial |
| printer rental dubai cost | Can I upgrade during my rental? | `/services/printer-rental/` | commercial |
| printer rental dubai cost | Who handles maintenance on a rented printer? | `/services/printer-rental/` | informational |
| printer rental dubai cost | Does rental include toner and consumables? | `/services/photocopier-rental/` | commercial |
| printer AMC uae | What is included in a printer AMC? | `/services/amc/` | informational |
| printer AMC uae | What is *not* included in an AMC (parts vs consumables)? | `/services/amc/` | informational |
| printer AMC uae | How often does an engineer visit under AMC? | `/services/amc/` | informational |
| printer AMC uae | How much does printer AMC cost per year in the UAE? | `/services/amc/` | commercial |
| printer repair response time dubai | How fast is emergency printer repair in Dubai? | `/printer-repair-dubai/` | local |
| printer repair response time dubai | How much does it cost to service a printer? | `/services/repair/` | commercial |
| photocopier rental sharjah | How much does it cost to rent a photocopier in Sharjah? | `/photocopier-rental-sharjah/` | local |
| photocopier rental sharjah | How quickly can you deliver and install in Sharjah? | `/photocopier-rental-sharjah/` | local |
| copier lease vs rental uae | What is the difference between leasing and renting a copier? | `/copier-lease-uae/` | informational |
| copier lease vs rental uae | Do I own the copier at the end of a lease? | `/copier-lease-uae/` | informational |
| paper shredder rental uae | Can I rent a shredder for a single event? | `/services/paper-shredder-rental/` | commercial |
| paper shredder rental uae | Is rental cheaper than buying a shredder? | `/services/paper-shredder-rental/` | commercial |
| papercut print management uae | How much does PaperCut cost for a UAE office? | `/services/papercut-print-management/` | commercial |
| papercut print management uae | Which printers does PaperCut work with? | `/services/papercut-print-management/` | informational |
| plotter maintenance uae | How much does a plotter service plan cost? | `/services/plotter-maintenance/` | commercial |
| plotter maintenance uae | How often should a wide-format plotter be serviced? | `/services/plotter-maintenance/` | informational |

Notable competitor pricing context found in the SERP (**not** to be quoted as
Sahara pricing): market range AED 200–800/mo for printer rental in Dubai;
AMC commonly quoted "from AED 299/month"; HP DesignJet service plans priced
per-square-foot in US markets, no reliable UAE figure → plotter answers must
stay generic on price.

---

## Source 3 — Competitor question inventory

| Competitor | Access | Questions they answer that Sahara did not |
|---|---|---|
| `alphatecuae.com/printer-rental-sharjah/` | fetched OK | "How much does it cost to rent a photocopier in Sharjah?" · "Do I have to pay for toner or maintenance separately?" · "How quickly can you deliver and install?" · "Can I upgrade my printer later if my business grows?" |
| `sosauh.com/printer-amc-services-uae` | **fetch failed** (ECONNREFUSED) — covered via SERP snippet instead | AMC engineer visit cadence (bi-monthly / quarterly); explicit *exclusions* list (drum, fuser, developer, toner); "AMC with parts" vs labour-only tiers |
| `officeequipments.ae` printer-rental page | **fetch failed** (HTTP 403) — covered via SERP snippet | "free machines, toner and service" bundling framing; daily-rate entry point (AED 10/day) |
| `printone.ae` | **fetch failed** (bot-verification interstitial) | n/a |
| `npc-me.com` (SERP) | snippet only | "unlimited service calls with response within 4 working hours"; preventive visits every two months |
| `printerservice.ae` / `digitalcopier.ae` (SERP) | snippet only | full emirate-by-emirate coverage lists including Ruwais, Barakah, Beda Zayed — Sahara lists 7 emirates but not sub-locality coverage on every page |

**Biggest genuine gaps vs. Sahara's current pages:**

1. **AMC exclusions.** Every competitor states what an AMC does *not* cover.
   Sahara's `/services/amc/` did not answer this in an extractable Q&A form.
2. **Lease-vs-rent ownership.** Competitors explicitly answer "do you own it
   at the end?". This is the correct differentiating angle for
   `/copier-lease-uae/` and resolves the rental-vs-lease cannibalisation the
   GSC data shows.
3. **Delivery/install speed as a distinct question**, separate from price —
   the `/printer-rental-dubai/` "near me" cluster.
4. **Plotter service cadence.** No UAE competitor answers "how often" for
   wide-format; open field for `/services/plotter-maintenance/`.

---

## Cannibalisation map — one angle per page

GSC shows `copier lease *` and `copier rental *` queries firing on **three**
pages simultaneously. Each page therefore gets a distinct question angle:

| Page | Assigned angle | Must NOT answer |
|---|---|---|
| `/services/printer-rental/` | what a rental plan *includes* (scope of service) | price-by-city, lease ownership |
| `/services/photocopier-rental/` | A3 multifunction copier specifics (A3 vs A4) | generic "what is rental" |
| `/copier-lease-uae/` | lease **vs** rent — ownership & contract length | monthly price as headline |
| `/printer-rental-dubai/` | Dubai delivery timing & district coverage | "what is printer rental" |
| `/printer-rental-abu-dhabi/` | Abu Dhabi coverage + maintenance cadence | delivery timing (Dubai's angle) |
| `/photocopier-rental-sharjah/` | Sharjah 60-min response (HQ proximity) | generic copier definition |
| `/printer-rental-al-ain/` | sector fit (healthcare, education, government) | price |
| `/printer-rental-fujairah/` | east-coast reach: Dibba, Kalba, FFTZ | price |
| `/printer-rental-rak/` | RAK FTZ / free-zone billing | price |
| `/services/repair/` | repair cost & what a callout buys | response time (Dubai repair page's angle) |
| `/printer-repair-dubai/` | Dubai emergency response time | repair cost basics |
| `/services/amc/` | AMC inclusions **and exclusions** | repair pricing |
| `/services/plotter-maintenance/` | service cadence for wide-format | generic AMC definition |
