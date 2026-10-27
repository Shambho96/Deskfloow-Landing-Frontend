import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CurrencyCode, Guest, LoyaltyTier } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatters = new Map<string, Intl.NumberFormat>();

/** Currency formatter. INR is the default; the model supports other currencies. */
export function formatMoney(value: number, currency: CurrencyCode = "INR", compact = false) {
  const key = `${currency}-${compact}`;
  let f = formatters.get(key);
  if (!f) {
    f = new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: compact ? 1 : 0,
      notation: compact ? "compact" : "standard",
    });
    formatters.set(key, f);
  }
  return f.format(value);
}

export const inr = (v: number) => formatMoney(v, "INR");

/** Loyalty tier thresholds. Highest tier is checked first so it takes precedence. */
export const LOYALTY_THRESHOLDS: { tier: LoyaltyTier; min: number }[] = [
  { tier: "Platinum", min: 50000 },
  { tier: "Gold", min: 25000 },
  { tier: "Silver", min: 10000 },
  { tier: "Bronze", min: 0 },
];

export function loyaltyTier(spend: Guest["lifetimeSpend"]): LoyaltyTier {
  return LOYALTY_THRESHOLDS.find((t) => spend >= t.min)!.tier;
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function demoRef(prefix = "DF") {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${s}`;
}

export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
