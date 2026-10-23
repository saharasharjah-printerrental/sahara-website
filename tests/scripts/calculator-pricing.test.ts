// Run: npx tsx tests/scripts/calculator-pricing.test.ts
import assert from "node:assert/strict";
import { computeQuote, DEFAULT_CALCULATOR_PRICING as P, normalizeCalculatorPricing, tierFor, freeValue } from "../../src/lib/calculator-pricing";

const q = (o: Partial<Parameters<typeof computeQuote>[1]>) =>
  computeQuote(P, { printType: "both", paperFormat: "a4", bwVolume: 0, colourVolume: 0, duration: 12, ...o });

// A4 tier: AED 250 minimum, 2,000 B&W + 750 colour included
let r = q({ bwVolume: 2000, colourVolume: 750 });
assert.equal(r.baseRent, 250); assert.equal(r.freeBw, 2000); assert.equal(r.freeColour, 750);
assert.equal(r.monthlyPrice, 250);
r = q({ bwVolume: 0, colourVolume: 0 });
assert.equal(r.monthlyPrice, 250, "never below the A4 minimum");
// A4: 500 extra B&W pages = AED 30
r = q({ bwVolume: 2500, colourVolume: 750 });
assert.equal(r.extraBw, 500); assert.equal(r.extraBwCost, 30); assert.equal(r.monthlyPrice, 280);
// A4: 100 extra colour pages = AED 20
r = q({ bwVolume: 2000, colourVolume: 850 });
assert.equal(r.extraColour, 100); assert.equal(r.monthlyPrice, 270);
// A4 B&W-only gets the whole pool as B&W: 270 / 0.06 = 4,500 pages; colour-only 270 / 0.20 = 1,350
assert.equal(q({ printType: "bw", bwVolume: 4500 }).freeBw, 4500);
assert.equal(q({ printType: "color", colourVolume: 1350 }).freeColour, 1350);

// Standard tier (A3 / A4+A3): AED 350 base, 3,000 B&W + 1,000 colour, surcharges 80 / 50
r = q({ paperFormat: "a3", bwVolume: 3000, colourVolume: 1000 });
assert.equal(r.baseRent, 350); assert.equal(r.surcharge, 80); assert.equal(r.monthlyPrice, 430);
r = q({ paperFormat: "both", bwVolume: 3000, colourVolume: 1000 });
assert.equal(r.surcharge, 50); assert.equal(r.monthlyPrice, 400);
// The agency's example: 3,000 -> 3,500 B&W pages adds AED 30
const before = q({ paperFormat: "a3", bwVolume: 3000, colourVolume: 1000 }).monthlyPrice;
const after = q({ paperFormat: "a3", bwVolume: 3500, colourVolume: 1000 }).monthlyPrice;
assert.equal(after - before, 30);

// Contract discounts (5% at 24 months, 10% at 36), Math.round like the original
assert.equal(q({ bwVolume: 2500, colourVolume: 750, duration: 24 }).monthlyPrice, Math.round(280 * 0.95));
assert.equal(q({ bwVolume: 2500, colourVolume: 750, duration: 36 }).monthlyPrice, Math.round(280 * 0.9));
assert.equal(q({ duration: 36 }).monthlyPrice, 250, "discount can't push below the minimum");

// Pool value
assert.equal(freeValue(P, tierFor(P, "a4")), 270);
assert.equal(freeValue(P, tierFor(P, "a3")), 380);

// Validation: legacy / junk input falls back to defaults, bad fields fall back per field
assert.deepEqual(normalizeCalculatorPricing({ a4BasePrice: 600 }), P);
assert.deepEqual(normalizeCalculatorPricing(null), P);
const n = normalizeCalculatorPricing({ version: 2, a4: { baseRent: -5, freeBw: "x", freeColour: 800 }, bwPrice: 0.07 });
assert.equal(n.a4.baseRent, 250); assert.equal(n.a4.freeBw, 2000); assert.equal(n.a4.freeColour, 800); assert.equal(n.bwPrice, 0.07);
assert.equal(n.standard.baseRent, 350);

// A3 label printer rent: separate from the tiers, default 549, editable, validated
assert.equal(P.a3LabelRent, 549);
assert.equal(normalizeCalculatorPricing({ version: 2, a3LabelRent: 620 }).a3LabelRent, 620);
assert.equal(normalizeCalculatorPricing({ version: 2, a3LabelRent: -1 }).a3LabelRent, 549);
assert.equal(normalizeCalculatorPricing({ version: 2, a3LabelRent: "abc" }).a3LabelRent, 549);
assert.equal(q({ paperFormat: "a3", bwVolume: 3000, colourVolume: 1000 }).baseRent, 350, "label rent must not affect the calculator");

// Enterprise: from 10,000 B&W or 5,000 colour pages, no online price
assert.equal(P.enterpriseBw, 10000); assert.equal(P.enterpriseColour, 5000);
assert.equal(q({ paperFormat: "a3", bwVolume: 9500, colourVolume: 4500 }).enterprise, false);
assert.equal(q({ paperFormat: "a3", bwVolume: 10000, colourVolume: 0 }).enterprise, true);
assert.equal(q({ paperFormat: "a3", bwVolume: 3000, colourVolume: 5000 }).enterprise, true);
assert.equal(normalizeCalculatorPricing({ version: 2, enterpriseBw: 12000 }).enterpriseBw, 12000);
assert.equal(normalizeCalculatorPricing({ version: 2, enterpriseBw: 5 }).enterpriseBw, 10000);

console.log("calculator-pricing: all assertions passed");
