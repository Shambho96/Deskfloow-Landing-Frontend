import type { BookingSource, PropertyId, Reservation, ReservationStatus } from "@/types";
import { demoDay, nightsBetween } from "@/lib/dates";
import { demoRooms } from "./demo-properties";

type Seed = [id: string, property: PropertyId, room: string, guest: string, inOff: number, outOff: number, status: ReservationStatus, source: BookingSource, paidRatio: number, notes?: string];

const seeds: Seed[] = [
  // Grand Palace — demo day: 5 in-house, 3 arrivals, 1 departure
  ["RSV-1041", "grand-palace", "101", "g1", -2, 1, "checked-in", "Booking.com", 1],
  ["RSV-1042", "grand-palace", "102", "g2", -1, 2, "checked-in", "Direct Website", 0.5],
  ["RSV-1038", "grand-palace", "103", "g3", -3, 0, "checked-out", "Agoda", 1],
  ["RSV-1047", "grand-palace", "103", "g4", 0, 3, "confirmed", "MakeMyTrip", 0, "Late arrival"],
  ["RSV-1043", "grand-palace", "104", "g5", -1, 3, "checked-in", "Corporate", 1],
  ["RSV-1036", "grand-palace", "201", "g6", -4, 1, "checked-in", "Expedia", 1],
  ["RSV-1039", "grand-palace", "202", "g7", -2, 4, "checked-in", "Airbnb", 0.6],
  ["RSV-1048", "grand-palace", "203", "g8", 0, 2, "confirmed", "Direct Website", 0.5, "Anniversary"],
  ["RSV-1049", "grand-palace", "204", "g9", 0, 1, "confirmed", "Goibibo", 0],
  ["RSV-1051", "grand-palace", "101", "g10", 2, 4, "confirmed", "Booking.com", 0],
  ["RSV-1052", "grand-palace", "204", "g11", 2, 5, "confirmed", "Agoda", 0],
  ["RSV-1053", "grand-palace", "102", "g14", 3, 5, "confirmed", "Direct Website", 0.3],
  // Lakeside Boutique
  ["RSV-2011", "lakeside-boutique", "101", "g12", -1, 2, "checked-in", "Direct Website", 1],
  ["RSV-2012", "lakeside-boutique", "103", "g13", -2, 1, "checked-in", "Airbnb", 1],
  ["RSV-2014", "lakeside-boutique", "201", "g6", 0, 3, "confirmed", "Booking.com", 0],
  ["RSV-2015", "lakeside-boutique", "203", "g2", 1, 4, "confirmed", "MakeMyTrip", 0],
  ["RSV-2016", "lakeside-boutique", "101", "g7", 3, 5, "confirmed", "Expedia", 0],
  // City Centre Suites
  ["RSV-3101", "city-centre-suites", "101", "g11", -1, 1, "checked-in", "Corporate", 1],
  ["RSV-3102", "city-centre-suites", "102", "g14", -2, 2, "checked-in", "Corporate", 1],
  ["RSV-3103", "city-centre-suites", "201", "g5", 0, 2, "confirmed", "Direct Website", 0.5],
  ["RSV-3104", "city-centre-suites", "203", "g10", -3, 0, "checked-out", "Goibibo", 1],
  ["RSV-3105", "city-centre-suites", "301", "g12", -1, 3, "checked-in", "Booking.com", 0.4],
  ["RSV-3106", "city-centre-suites", "302", "g1", 0, 1, "confirmed", "Walk-in", 0],
  ["RSV-3107", "city-centre-suites", "203", "g3", 1, 3, "confirmed", "Agoda", 0],
];

export const demoReservations: Reservation[] = seeds.map(
  ([id, propertyId, number, guestId, inOff, outOff, status, source, paidRatio, notes]) => {
    const room = demoRooms.find((r) => r.propertyId === propertyId && r.number === number)!;
    const checkIn = demoDay(inOff);
    const checkOut = demoDay(outOff);
    const total = room.rate * nightsBetween(checkIn, checkOut);
    return {
      id,
      propertyId,
      roomId: room.id,
      guestId,
      checkIn,
      checkOut,
      status,
      source,
      adults: room.maxGuests > 2 ? 2 : 1 + (Number(number) % 2),
      children: room.category === "Suite" ? 1 : 0,
      total,
      paid: Math.round(total * paidRatio),
      notes,
    };
  },
);
