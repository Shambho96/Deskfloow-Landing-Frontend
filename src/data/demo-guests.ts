import type { Guest } from "@/types";

/** Synthetic guests only — no real people, IDs or documents. */
export const demoGuests: Guest[] = [
  { id: "g1", name: "Aarav Mehta", phone: "+91 98200 11234", email: "aarav.mehta@example.com", city: "Mumbai", preferences: ["High floor", "Extra pillows"], lifetimeSpend: 31200, stays: 4, returning: true },
  { id: "g2", name: "Priya Nair", phone: "+91 98450 22871", email: "priya.nair@example.com", city: "Kochi", preferences: ["Quiet room"], dietary: "Vegetarian", lifetimeSpend: 12800, stays: 2, returning: true },
  { id: "g3", name: "Rohan Kapoor", phone: "+91 99100 45512", email: "rohan.k@example.com", city: "Delhi", preferences: ["Late checkout"], lifetimeSpend: 8600, stays: 1 },
  { id: "g4", name: "Sara Thomas", phone: "+91 97400 66120", email: "sara.thomas@example.com", city: "Bengaluru", preferences: ["Twin beds"], specialRequests: "Arriving late, around 11 PM", lifetimeSpend: 5400, stays: 1 },
  { id: "g5", name: "Vikram Singh", phone: "+91 98110 78345", email: "vikram.singh@example.com", city: "Gurugram", preferences: ["Workspace", "Early breakfast"], lifetimeSpend: 58900, stays: 11, vip: true, returning: true },
  { id: "g6", name: "Ananya Iyer", phone: "+91 98840 12093", email: "ananya.iyer@example.com", city: "Chennai", preferences: ["Lake view", "Feather-free pillows"], dietary: "Gluten-free", lifetimeSpend: 72400, stays: 9, vip: true, returning: true },
  { id: "g7", name: "James Carter", phone: "+44 7700 900123", email: "james.carter@example.com", city: "London", preferences: ["Airport transfer"], lifetimeSpend: 19600, stays: 2, returning: true },
  { id: "g8", name: "Meera Joshi", phone: "+91 98230 55401", email: "meera.joshi@example.com", city: "Pune", preferences: ["Suite", "Welcome flowers"], dietary: "Jain", specialRequests: "Anniversary celebration — cake at 8 PM", lifetimeSpend: 54300, stays: 6, vip: true, returning: true },
  { id: "g9", name: "Kabir Rao", phone: "+91 90080 33218", email: "kabir.rao@example.com", city: "Hyderabad", preferences: [], lifetimeSpend: 4100, stays: 1 },
  { id: "g10", name: "Neha Gupta", phone: "+91 98990 41276", email: "neha.gupta@example.com", city: "Lucknow", preferences: ["Ground floor"], lifetimeSpend: 26700, stays: 3, returning: true },
  { id: "g11", name: "Arjun Malhotra", phone: "+91 98150 90012", email: "arjun.m@example.com", city: "Chandigarh", preferences: ["Gym access"], lifetimeSpend: 9800, stays: 2, returning: true },
  { id: "g12", name: "Fatima Sheikh", phone: "+971 50 123 4567", email: "fatima.s@example.com", city: "Dubai", preferences: ["Halal dining"], dietary: "Halal", lifetimeSpend: 41500, stays: 5, returning: true },
  { id: "g13", name: "Lena Fischer", phone: "+49 1512 3456789", email: "lena.fischer@example.com", city: "Munich", preferences: ["Yoga mat"], dietary: "Vegan", lifetimeSpend: 15200, stays: 1 },
  { id: "g14", name: "Dev Patel", phone: "+91 98250 77310", email: "dev.patel@example.com", city: "Ahmedabad", preferences: ["Connecting rooms"], lifetimeSpend: 22900, stays: 3, returning: true },
];

export const guestById = (id: string) => demoGuests.find((g) => g.id === id);
export const guestOf = (id: string) => guestById(id) ?? { id, name: "Guest", phone: "", email: "", city: "", preferences: [], lifetimeSpend: 0, stays: 1 };
