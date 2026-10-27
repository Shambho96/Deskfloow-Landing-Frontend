"use client";

import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react";
import type {
  ActivityEvent, Conversation, HousekeepingStatus, Message, MessageStatus, Order, OrderItem, OrderStatus,
  PropertyId, Reservation, ReservationStatus, Room, StaffRole,
} from "@/types";
import { demoRooms } from "@/data/demo-properties";
import { demoReservations } from "@/data/demo-reservations";
import { demoOrders } from "@/data/demo-orders";
import { demoConversations } from "@/data/demo-messages";
import { demoGuests } from "@/data/demo-guests";
import { DEMO_TODAY, rangesOverlap } from "@/lib/dates";

/**
 * Local, in-memory demo state. Nothing here is persisted or sent to a
 * server — swap these reducers for API-backed services in production.
 */
export interface DemoState {
  propertyId: PropertyId;
  role: StaffRole;
  rooms: Room[];
  reservations: Reservation[];
  orders: Order[];
  conversations: Conversation[];
  activity: ActivityEvent[];
}

type Action =
  | { type: "property"; id: PropertyId }
  | { type: "role"; role: StaffRole }
  | { type: "housekeeping"; roomId: string; status: HousekeepingStatus }
  | { type: "moveReservation"; id: string; roomId: string; checkIn: string; checkOut: string }
  | { type: "addReservation"; reservation: Reservation }
  | { type: "reservationStatus"; id: string; status: ReservationStatus }
  | { type: "orderStatus"; id: string; status: OrderStatus }
  | { type: "orderItem"; id: string; item: OrderItem }
  | { type: "sendMessage"; conversationId: string; message: Message }
  | { type: "messageStatus"; conversationId: string; messageId: string; status: MessageStatus }
  | { type: "read"; conversationId: string }
  | { type: "log"; event: ActivityEvent }
  | { type: "addRooms"; rooms: Room[] }
  | { type: "moveRoom"; roomId: string; x: number; y: number };

const initial: DemoState = {
  propertyId: "grand-palace",
  role: "Manager",
  rooms: demoRooms,
  reservations: demoReservations,
  orders: demoOrders,
  conversations: demoConversations,
  activity: [
    { id: "a1", time: "13:40", text: "Order ORD-506 created at front desk for Room 203", kind: "order" },
    { id: "a2", time: "13:22", text: "Booking.com reservation RSV-1051 synchronised (demo)", kind: "sync" },
    { id: "a3", time: "12:58", text: "Room 204 marked as cleaning", kind: "room" },
    { id: "a4", time: "11:47", text: "New WhatsApp message from Meera Joshi", kind: "message" },
  ],
};

function reducer(s: DemoState, a: Action): DemoState {
  switch (a.type) {
    case "property":
      return { ...s, propertyId: a.id };
    case "role":
      return { ...s, role: a.role };
    case "housekeeping":
      return { ...s, rooms: s.rooms.map((r) => (r.id === a.roomId ? { ...r, housekeeping: a.status } : r)) };
    case "moveReservation":
      return {
        ...s,
        reservations: s.reservations.map((r) =>
          r.id === a.id ? { ...r, roomId: a.roomId, checkIn: a.checkIn, checkOut: a.checkOut } : r,
        ),
      };
    case "addReservation":
      return { ...s, reservations: [...s.reservations, a.reservation] };
    case "reservationStatus":
      return { ...s, reservations: s.reservations.map((r) => (r.id === a.id ? { ...r, status: a.status } : r)) };
    case "orderStatus":
      return { ...s, orders: s.orders.map((o) => (o.id === a.id ? { ...o, status: a.status } : o)) };
    case "orderItem":
      return {
        ...s,
        orders: s.orders.map((o) => {
          if (o.id !== a.id) return o;
          const existing = o.items.find((i) => i.itemId === a.item.itemId);
          const items = existing
            ? o.items.map((i) => (i.itemId === a.item.itemId ? { ...i, qty: i.qty + a.item.qty } : i))
            : [...o.items, a.item];
          return { ...o, items };
        }),
      };
    case "sendMessage":
      return {
        ...s,
        conversations: s.conversations.map((c) =>
          c.id === a.conversationId ? { ...c, messages: [...c.messages, a.message] } : c,
        ),
      };
    case "messageStatus":
      return {
        ...s,
        conversations: s.conversations.map((c) =>
          c.id === a.conversationId
            ? { ...c, messages: c.messages.map((m) => (m.id === a.messageId ? { ...m, status: a.status } : m)) }
            : c,
        ),
      };
    case "read":
      return { ...s, conversations: s.conversations.map((c) => (c.id === a.conversationId ? { ...c, unread: 0 } : c)) };
    case "log":
      return { ...s, activity: [a.event, ...s.activity].slice(0, 40) };
    case "addRooms":
      return { ...s, rooms: [...s.rooms, ...a.rooms] };
    case "moveRoom":
      return { ...s, rooms: s.rooms.map((r) => (r.id === a.roomId ? { ...r, x: a.x, y: a.y } : r)) };
  }
}

/** Validates a reservation placement. Returns an error message or null. */
export function validatePlacement(
  state: Pick<DemoState, "reservations" | "rooms">,
  p: { id?: string; roomId: string; checkIn: string; checkOut: string; guests?: number },
): string | null {
  if (!p.checkIn || !p.checkOut) return "Select both check-in and check-out dates.";
  if (p.checkOut <= p.checkIn) return "Check-out must be after check-in.";
  const room = state.rooms.find((r) => r.id === p.roomId);
  if (!room) return "Room not found.";
  if (room.housekeeping === "out-of-order") return `Room ${room.number} is out of order.`;
  if (p.guests && p.guests > room.maxGuests) return `Room ${room.number} fits up to ${room.maxGuests} guests.`;
  const clash = state.reservations.find(
    (r) =>
      r.id !== p.id &&
      r.roomId === p.roomId &&
      r.status !== "cancelled" &&
      r.status !== "checked-out" &&
      rangesOverlap(p.checkIn, p.checkOut, r.checkIn, r.checkOut),
  );
  if (clash) return `Room ${room.number} already has ${clash.id} on those dates.`;
  return null;
}

const nowTime = () => new Date().toTimeString().slice(0, 5);
const uid = () => Math.random().toString(36).slice(2, 9);

function useDemoStore() {
  const [state, dispatch] = useReducer(reducer, initial);

  const log = useCallback(
    (text: string, kind: ActivityEvent["kind"]) =>
      dispatch({ type: "log", event: { id: uid(), time: nowTime(), text, kind } }),
    [],
  );

  const derived = useMemo(() => {
    const pid = state.propertyId;
    const rooms = state.rooms.filter((r) => r.propertyId === pid);
    const reservations = state.reservations.filter((r) => r.propertyId === pid);
    const orders = state.orders.filter((o) => o.propertyId === pid);
    const conversations = state.conversations.filter((c) => c.propertyId === pid);
    const live = reservations.filter((r) => r.status !== "cancelled");
    const inHouse = live.filter((r) => r.status === "checked-in" && r.checkIn <= DEMO_TODAY && DEMO_TODAY < r.checkOut);
    const arrivals = live.filter((r) => r.checkIn === DEMO_TODAY);
    const departures = live.filter((r) => r.checkOut === DEMO_TODAY);
    const pendingHk = rooms.filter((r) => r.housekeeping === "dirty" || r.housekeeping === "cleaning");
    const revenueToday =
      inHouse.reduce((s, r) => s + (rooms.find((x) => x.id === r.roomId)?.rate ?? 0), 0) +
      orders.reduce((s, o) => s + o.items.reduce((t, i) => t + i.qty * i.price, 0), 0);
    const outstanding = live
      .filter((r) => r.status !== "checked-out" && r.checkIn <= DEMO_TODAY)
      .reduce((s, r) => s + (r.total - r.paid), 0);
    return {
      rooms, reservations, orders, conversations, inHouse, arrivals, departures, pendingHk, revenueToday, outstanding,
      occupancy: rooms.length ? Math.round((inHouse.length / rooms.length) * 100) : 0,
    };
  }, [state]);

  const api = useMemo(
    () => ({
      setProperty: (id: PropertyId) => dispatch({ type: "property", id }),
      setRole: (role: StaffRole) => dispatch({ type: "role", role }),
      setHousekeeping: (roomId: string, status: HousekeepingStatus) => {
        dispatch({ type: "housekeeping", roomId, status });
        const room = state.rooms.find((r) => r.id === roomId);
        log(`Room ${room?.number} marked as ${status.replace(/-/g, " ")}`, "room");
      },
      moveReservation: (id: string, roomId: string, checkIn: string, checkOut: string) => {
        const err = validatePlacement(state, { id, roomId, checkIn, checkOut });
        if (err) return err;
        dispatch({ type: "moveReservation", id, roomId, checkIn, checkOut });
        const room = state.rooms.find((r) => r.id === roomId);
        log(`${id} moved to Room ${room?.number}`, "booking");
        return null;
      },
      addReservation: (r: Omit<Reservation, "id">) => {
        const err = validatePlacement(state, { ...r, guests: r.adults + r.children });
        if (err) return { error: err };
        const id = `RSV-${Math.floor(2000 + Math.random() * 7000)}`;
        dispatch({ type: "addReservation", reservation: { ...r, id } });
        log(`Reservation ${id} created (${r.source})`, "booking");
        return { id };
      },
      /** Check-in guard: blocks dirty / out-of-order rooms unless an authorised override is given. */
      checkIn: (id: string, override = false) => {
        const res = state.reservations.find((r) => r.id === id);
        const room = state.rooms.find((r) => r.id === res?.roomId);
        if (!res || !room) return "Reservation not found.";
        if (!override && (room.housekeeping === "dirty" || room.housekeeping === "cleaning" || room.housekeeping === "out-of-order"))
          return `Room ${room.number} is ${room.housekeeping.replace(/-/g, " ")}. Check-in requires a manager override.`;
        if (override && !(state.role === "Owner" || state.role === "Manager"))
          return `Only an Owner or Manager can override. Current role: ${state.role}.`;
        dispatch({ type: "reservationStatus", id, status: "checked-in" });
        log(`${id} checked in to Room ${room.number}${override ? " (manager override)" : ""}`, "booking");
        return null;
      },
      setReservationStatus: (id: string, status: ReservationStatus) => dispatch({ type: "reservationStatus", id, status }),
      setOrderStatus: (id: string, status: OrderStatus) => {
        dispatch({ type: "orderStatus", id, status });
        log(`Order ${id} → ${status}`, "order");
      },
      addOrderItem: (id: string, item: OrderItem) => {
        dispatch({ type: "orderItem", id, item });
        log(`${item.name} added to ${id}`, "order");
      },
      /** Simulates send → sent → delivered → read locally. No real message leaves the browser. */
      sendMessage: (conversationId: string, text: string) => {
        const id = uid();
        dispatch({ type: "sendMessage", conversationId, message: { id, from: "hotel", text, time: nowTime(), status: "sending" } });
        const step = (status: MessageStatus, ms: number) =>
          setTimeout(() => dispatch({ type: "messageStatus", conversationId, messageId: id, status }), ms);
        step("sent", 500);
        step("delivered", 1300);
        step("read", 2600);
        const conv = state.conversations.find((c) => c.id === conversationId);
        const guest = demoGuests.find((g) => g.id === conv?.guestId);
        log(`Demo WhatsApp message to ${guest?.name ?? "guest"}`, "message");
        return id;
      },
      markRead: (conversationId: string) => dispatch({ type: "read", conversationId }),
      /** Simulated guest reply (demo only). */
      receiveMessage: (conversationId: string, text: string) =>
        dispatch({ type: "sendMessage", conversationId, message: { id: uid(), from: "guest", text, time: nowTime() } }),
      addRooms: (rooms: Room[]) => {
        dispatch({ type: "addRooms", rooms });
        log(`${rooms.length} rooms generated`, "room");
      },
      moveRoom: (roomId: string, x: number, y: number) => dispatch({ type: "moveRoom", roomId, x, y }),
      log,
    }),
    [state, log],
  );

  return { state, ...derived, ...api };
}

type DemoContextValue = ReturnType<typeof useDemoStore>;
const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const value = useDemoStore();
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside <DemoProvider>");
  return ctx;
}

export const guestOf = (id: string) => demoGuests.find((g) => g.id === id)!;
