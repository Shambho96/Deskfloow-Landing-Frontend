import type { Property, Room, PropertyId, RoomCategory, HousekeepingStatus } from "@/types";

/** Clearly fictional demonstration properties. */
export const demoProperties: Property[] = [
  {
    id: "grand-palace",
    name: "Grand Palace",
    city: "Jaipur",
    tagline: "Heritage luxury hotel",
    image: "/images/lobby.jpg",
    currency: "INR",
  },
  {
    id: "lakeside-boutique",
    name: "Lakeside Boutique Hotel",
    city: "Udaipur",
    tagline: "Boutique lakefront retreat",
    image: "/images/resort.jpg",
    currency: "INR",
  },
  {
    id: "city-centre-suites",
    name: "City Centre Suites",
    city: "Bengaluru",
    tagline: "Business & serviced suites",
    image: "/images/city-hotel.jpg",
    currency: "INR",
  },
];

export const categoryRates: Record<RoomCategory, number> = {
  Standard: 3800,
  Deluxe: 5200,
  Premium: 6900,
  Suite: 11500,
};

export const categoryGuests: Record<RoomCategory, number> = {
  Standard: 2,
  Deluxe: 3,
  Premium: 3,
  Suite: 4,
};

type RoomSeed = [number: string, category: RoomCategory, hk: HousekeepingStatus, x: number, y: number, w?: number];

function rooms(propertyId: PropertyId, seeds: RoomSeed[]): Room[] {
  return seeds.map(([number, category, housekeeping, x, y, w = 1]) => ({
    id: `${propertyId}-${number}`,
    propertyId,
    number,
    floor: Number(number[0]),
    category,
    housekeeping,
    rate: categoryRates[category],
    maxGuests: categoryGuests[category],
    x,
    y,
    w,
    h: 1,
  }));
}

export const demoRooms: Room[] = [
  ...rooms("grand-palace", [
    ["101", "Standard", "clean", 0, 0],
    ["102", "Standard", "clean", 1, 0],
    ["103", "Deluxe", "dirty", 2, 0],
    ["104", "Deluxe", "clean", 3, 0],
    ["201", "Premium", "clean", 0, 0],
    ["202", "Premium", "clean", 1, 0],
    ["203", "Suite", "clean", 2, 0, 2],
    ["204", "Deluxe", "cleaning", 0, 1],
  ]),
  ...rooms("lakeside-boutique", [
    ["101", "Deluxe", "clean", 0, 0],
    ["102", "Deluxe", "dirty", 1, 0],
    ["103", "Premium", "clean", 2, 0],
    ["201", "Premium", "clean", 0, 0],
    ["202", "Suite", "out-of-order", 1, 0, 2],
    ["203", "Deluxe", "clean", 0, 1],
  ]),
  ...rooms("city-centre-suites", [
    ["101", "Standard", "clean", 0, 0],
    ["102", "Standard", "clean", 1, 0],
    ["103", "Standard", "cleaning", 2, 0],
    ["201", "Deluxe", "clean", 0, 0],
    ["202", "Deluxe", "dirty", 1, 0],
    ["203", "Deluxe", "clean", 2, 0],
    ["301", "Suite", "clean", 0, 0, 2],
    ["302", "Premium", "clean", 2, 0],
    ["303", "Premium", "out-of-order", 3, 0],
  ]),
];

/** Seven-day demo history used by the analytics charts. */
export const demoHistory: Record<PropertyId, { revenue: number[]; occupancy: number[] }> = {
  "grand-palace": {
    revenue: [38400, 42100, 39800, 47600, 52300, 61200, 44900],
    occupancy: [62, 68, 64, 74, 81, 92, 75],
  },
  "lakeside-boutique": {
    revenue: [24200, 26800, 22100, 29400, 33700, 38900, 31500],
    occupancy: [50, 58, 47, 63, 71, 86, 67],
  },
  "city-centre-suites": {
    revenue: [51200, 54800, 57300, 55100, 49600, 36200, 41800],
    occupancy: [78, 82, 85, 81, 72, 51, 60],
  },
};

/** Opening float and today's register entries per property (demo). */
export const demoShift: Record<PropertyId, { float: number; cash: number; card: number; upi: number; counted: number }> = {
  "grand-palace": { float: 10000, cash: 18400, card: 42600, upi: 23900, counted: 28250 },
  "lakeside-boutique": { float: 8000, cash: 9600, card: 21800, upi: 14200, counted: 17600 },
  "city-centre-suites": { float: 12000, cash: 7200, card: 51300, upi: 19800, counted: 19200 },
};
