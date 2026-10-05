import { z } from "zod";

const shortText = z.string().trim().max(200).optional().default("");
const breakdown = z.string().trim().max(100).optional();

// Strip unrecognised fields, including client-supplied notification recipients.
export const quoteInputSchema = z.object({
  customerName: z.string().trim().min(1).max(100).refine((value) => !/[\r\n]/.test(value)),
  customerEmail: z.string().trim().email().max(254),
  customerPhone: z.string().trim().max(24).optional().default(""),
  customerCompany: shortText,
  configuration: shortText,
  message: z.string().trim().max(6000).optional().default(""),
  estimatedRange: shortText,
  website: z.string().max(200).optional().default(""),
  source: z.string().max(200).optional(),
  baseRent: breakdown,
  extraBwCost: breakdown,
  extraColorCost: breakdown,
  a3Surcharge: breakdown,
  durationDiscount: breakdown,
  totalContractValue: breakdown,
  printType: breakdown,
  paperFormat: breakdown,
  bwVolume: breakdown,
  colorVolume: breakdown,
});
