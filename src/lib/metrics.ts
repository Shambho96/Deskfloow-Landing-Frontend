import type { PropertyId } from "@/types";
import { demoRooms, demoProperties } from "@/data/demo-properties";
import { demoReservations } from "@/data/demo-reservations";
import { demoOrders, orderTotal } from "@/data/demo-orders";
import { DEMO_TODAY } from "@/lib/dates";

/** Static snapshot of a demo property — every marketing number is derived from demo data. */
export function propertySnapshot(pid: PropertyId = "grand-palace") {
  const property = demoProperties.find((p) => p.id === pid)!;
  const rooms = demoRooms.filter((r) => r.propertyId === pid);
  const res = demoReservations.filter((r) => r.propertyId === pid && r.status !== "cancelled");
  const inHouse = res.filter((r) => r.status === "checked-in" && r.checkIn <= DEMO_TODAY && DEMO_TODAY < r.checkOut);
  const arrivals = res.filter((r) => r.checkIn === DEMO_TODAY);
  const departures = res.filter((r) => r.checkOut === DEMO_TODAY);
  const pendingHk = rooms.filter((r) => r.housekeeping === "dirty" || r.housekeeping === "cleaning");
  const orders = demoOrders.filter((o) => o.propertyId === pid);
  const roomRevenue = inHouse.reduce((s, r) => s + rooms.find((x) => x.id === r.roomId)!.rate, 0);
  const fnb = orders.reduce((s, o) => s + orderTotal(o), 0);
  return {
    property,
    rooms,
    reservations: res,
    inHouse,
    arrivals,
    departures,
    pendingHk,
    orders,
    revenueToday: roomRevenue + fnb,
    occupancy: Math.round((inHouse.length / rooms.length) * 100),
  };
}
