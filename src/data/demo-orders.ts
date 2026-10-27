import type { MenuItem, Order } from "@/types";

export const demoMenu: MenuItem[] = [
  { id: "m1", name: "Masala Omelette", price: 320, category: "Breakfast" },
  { id: "m2", name: "Continental Breakfast", price: 540, category: "Breakfast" },
  { id: "m3", name: "Paneer Tikka", price: 460, category: "Mains" },
  { id: "m4", name: "Dal Makhani & Naan", price: 420, category: "Mains" },
  { id: "m5", name: "Club Sandwich", price: 380, category: "Mains" },
  { id: "m6", name: "Masala Chai (pot)", price: 180, category: "Beverages" },
  { id: "m7", name: "Fresh Lime Soda", price: 160, category: "Beverages" },
  { id: "m8", name: "Cold Coffee", price: 220, category: "Beverages" },
  { id: "m9", name: "Gulab Jamun", price: 190, category: "Desserts" },
  { id: "m10", name: "Anniversary Cake", price: 1200, category: "Desserts" },
];

const item = (id: string, qty: number) => {
  const m = demoMenu.find((x) => x.id === id)!;
  return { itemId: m.id, name: m.name, qty, price: m.price };
};

export const demoOrders: Order[] = [
  { id: "ORD-501", propertyId: "grand-palace", guestId: "g5", roomNumber: "104", items: [item("m2", 1), item("m6", 1)], channel: "Room Service", payment: "Charged to room", status: "delivered", time: "07:42" },
  { id: "ORD-502", propertyId: "grand-palace", guestId: "g6", roomNumber: "201", items: [item("m1", 2), item("m8", 2)], channel: "Guest QR", payment: "Charged to room", status: "ready", time: "08:15" },
  { id: "ORD-503", propertyId: "grand-palace", guestId: "g7", roomNumber: "202", items: [item("m5", 1), item("m7", 1)], channel: "Room Service", payment: "Unpaid", status: "preparing", time: "12:31" },
  { id: "ORD-504", propertyId: "grand-palace", guestId: "g1", roomNumber: "101", items: [item("m3", 1), item("m4", 1)], channel: "Restaurant POS", payment: "Paid", status: "accepted", time: "13:05" },
  { id: "ORD-505", propertyId: "grand-palace", guestId: "g2", roomNumber: "102", items: [item("m6", 2), item("m9", 2)], channel: "Front Desk", payment: "Charged to room", status: "new", time: "13:22" },
  { id: "ORD-506", propertyId: "grand-palace", guestId: "g8", roomNumber: "203", items: [item("m10", 1)], channel: "Front Desk", payment: "Charged to room", status: "new", time: "13:40" },
  { id: "ORD-601", propertyId: "lakeside-boutique", guestId: "g12", roomNumber: "101", items: [item("m4", 2)], channel: "Guest QR", payment: "Charged to room", status: "preparing", time: "12:50" },
  { id: "ORD-602", propertyId: "lakeside-boutique", guestId: "g13", roomNumber: "103", items: [item("m7", 2), item("m5", 1)], channel: "Room Service", payment: "Unpaid", status: "new", time: "13:10" },
  { id: "ORD-701", propertyId: "city-centre-suites", guestId: "g11", roomNumber: "101", items: [item("m8", 1), item("m5", 1)], channel: "Restaurant POS", payment: "Paid", status: "ready", time: "12:12" },
  { id: "ORD-702", propertyId: "city-centre-suites", guestId: "g12", roomNumber: "301", items: [item("m3", 1), item("m6", 1)], channel: "Room Service", payment: "Charged to room", status: "new", time: "13:30" },
];

export const orderFlow = ["new", "accepted", "preparing", "ready", "delivered"] as const;

export const orderTotal = (o: Pick<Order, "items">) => o.items.reduce((s, i) => s + i.qty * i.price, 0);
