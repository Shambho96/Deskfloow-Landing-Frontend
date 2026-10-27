import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";

/**
 * The PMS demo runs on a fixed "demo day" so that server and client render
 * identical data (no hydration mismatch) and the dataset stays coherent.
 */
export const DEMO_TODAY = "2026-11-12";

export const iso = (d: Date) => format(d, "yyyy-MM-dd");
export const fromIso = (s: string) => parseISO(s);

export const demoDay = (offset: number) => iso(addDays(parseISO(DEMO_TODAY), offset));

export const nightsBetween = (checkIn: string, checkOut: string) =>
  differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn));

export const shortDate = (s: string) => format(parseISO(s), "d MMM");
export const longDate = (s: string) => format(parseISO(s), "EEE, d MMM yyyy");

export function weekFrom(start: string, days = 7) {
  return Array.from({ length: days }, (_, i) => iso(addDays(parseISO(start), i)));
}

/** Half-open interval overlap: [aIn, aOut) vs [bIn, bOut) */
export function rangesOverlap(aIn: string, aOut: string, bIn: string, bOut: string) {
  return aIn < bOut && bIn < aOut;
}

export const shiftIso = (s: string, days: number) => iso(addDays(parseISO(s), days));
