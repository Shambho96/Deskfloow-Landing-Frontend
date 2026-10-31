// Core domain types for DeskFloow. The demo uses local mock data that
// implements these shapes, so real services can replace it later.

export type PropertyId = "grand-palace" | "lakeside-boutique" | "city-centre-suites";

export type RoomCategory = "Standard" | "Deluxe" | "Premium" | "Suite";

export type HousekeepingStatus = "clean" | "cleaning" | "dirty" | "out-of-order";

export interface Room {
  id: string;
  propertyId: PropertyId;
  number: string;
  floor: number;
  category: RoomCategory;
  housekeeping: HousekeepingStatus;
  /** Nightly rate in minor-free INR units */
  rate: number;
  maxGuests: number;
  /** Floor-plan grid position (column, row, width, height) */
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Property {
  id: PropertyId;
  name: string;
  city: string;
  tagline: string;
  image: string;
  currency: CurrencyCode;
}

export type CurrencyCode = "INR" | "USD" | "EUR" | "AED";

export type ReservationStatus = "confirmed" | "checked-in" | "checked-out" | "cancelled";

export type BookingSource =
  | "Direct Website"
  | "Booking.com"
  | "Agoda"
  | "MakeMyTrip"
  | "Expedia"
  | "Airbnb"
  | "Goibibo"
  | "Corporate"
  | "Walk-in";

export interface Reservation {
  id: string;
  propertyId: PropertyId;
  roomId: string;
  guestId: string;
  /** ISO date yyyy-MM-dd */
  checkIn: string;
  /** ISO date yyyy-MM-dd (exclusive, the morning the guest leaves) */
  checkOut: string;
  status: ReservationStatus;
  source: BookingSource;
  adults: number;
  children: number;
  total: number;
  paid: number;
  notes?: string;
}

export type LoyaltyTier = "Platinum" | "Gold" | "Silver" | "Bronze";

export interface Guest {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  preferences: string[];
  dietary?: string;
  specialRequests?: string;
  lifetimeSpend: number;
  stays: number;
  vip?: boolean;
  returning?: boolean;
}

export type OrderStatus = "new" | "accepted" | "preparing" | "ready" | "delivered";
export type OrderChannel = "Guest QR" | "Room Service" | "Restaurant POS" | "Front Desk";
export type PaymentStatus = "Paid" | "Unpaid" | "Charged to room";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: "Breakfast" | "Mains" | "Beverages" | "Desserts";
}

export interface OrderItem {
  itemId: string;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  propertyId: PropertyId;
  guestId: string;
  roomNumber: string;
  items: OrderItem[];
  channel: OrderChannel;
  payment: PaymentStatus;
  status: OrderStatus;
  /** HH:mm on the demo day */
  time: string;
}

export type MessageStatus = "sending" | "sent" | "delivered" | "read";

export interface Message {
  id: string;
  from: "guest" | "hotel";
  text: string;
  time: string;
  status?: MessageStatus;
}

export interface Conversation {
  id: string;
  propertyId: PropertyId;
  guestId: string;
  reservationId: string;
  unread: number;
  messages: Message[];
}

export type TemplateKey =
  | "booking-confirmation"
  | "payment-reminder"
  | "pre-arrival"
  | "check-in"
  | "room-service"
  | "housekeeping"
  | "checkout"
  | "review-request";

export interface MessageTemplate {
  key: TemplateKey;
  label: string;
  body: string;
}

export type ChannelState = "connected" | "setup-required" | "demo";

export interface Channel {
  id: string;
  name: BookingSource;
  short: string;
  color: string;
  state: ChannelState;
}

export interface ActivityEvent {
  id: string;
  time: string;
  text: string;
  kind: "booking" | "sync" | "message" | "room" | "order" | "payment";
}
