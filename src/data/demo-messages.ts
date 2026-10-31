import type { Conversation, MessageTemplate, TemplateKey } from "@/types";

export const messageTemplates: MessageTemplate[] = [
  {
    key: "booking-confirmation",
    label: "Instant Booking Confirmation",
    body: "Hi {{guest}}, your hotel booking at {{hotel}} is confirmed! Booking ID: {{code}} · Check-in: {{checkin}} · Room: {{room}}. Thank you for choosing {{hotel}}.",
  },
];

export const templateByKey = (k: TemplateKey) => messageTemplates.find((t) => t.key === k) ?? messageTemplates[0];

export function fillTemplate(body: string, vars: Record<string, string>) {
  return body.replace(/\{\{(\w+)\}\}/g, (_, k: string) => vars[k] ?? `{{${k}}}`);
}

export const demoConversations: Conversation[] = [
  {
    id: "c1",
    propertyId: "grand-palace",
    guestId: "g8",
    reservationId: "RSV-1048",
    unread: 0,
    messages: [
      {
        id: "c1m1",
        from: "hotel",
        text: "✅ BOOKING CONFIRMED — Grand Palace Hotel\n\nHello Meera Joshi,\nYour hotel reservation is confirmed.\n\n• Booking ID: RSV-1048\n• Room: 203 · Royal Heritage Suite\n• Check-in: 12 Nov 2026 (2:00 PM)\n• Check-out: 14 Nov 2026 (11:00 AM)\n• Status: Confirmed\n\nThis is an automated booking confirmation from DeskFloow Notification Service.",
        time: "09:02 AM",
        status: "read",
      },
    ],
  },
  {
    id: "c2",
    propertyId: "grand-palace",
    guestId: "g4",
    reservationId: "RSV-1047",
    unread: 0,
    messages: [
      {
        id: "c2m1",
        from: "hotel",
        text: "✅ BOOKING CONFIRMED — Grand Palace Hotel\n\nHello Kabir Rao,\nYour hotel reservation is confirmed.\n\n• Booking ID: RSV-1047\n• Room: 204 · Deluxe Room\n• Check-in: 12 Nov 2026 (2:00 PM)\n• Check-out: 15 Nov 2026 (11:00 AM)\n• Status: Confirmed\n\nThis is an automated booking confirmation from DeskFloow Notification Service.",
        time: "10:15 AM",
        status: "read",
      },
    ],
  },
  {
    id: "c3",
    propertyId: "grand-palace",
    guestId: "g7",
    reservationId: "RSV-1039",
    unread: 0,
    messages: [
      {
        id: "c3m1",
        from: "hotel",
        text: "✅ BOOKING CONFIRMED — Grand Palace Hotel\n\nHello James Wilson,\nYour hotel reservation is confirmed.\n\n• Booking ID: RSV-1039\n• Room: 202 · Premium Room\n• Check-in: 11 Nov 2026 (2:00 PM)\n• Check-out: 14 Nov 2026 (11:00 AM)\n• Status: Confirmed\n\nThis is an automated booking confirmation from DeskFloow Notification Service.",
        time: "08:30 AM",
        status: "read",
      },
    ],
  },
  {
    id: "c4",
    propertyId: "grand-palace",
    guestId: "g6",
    reservationId: "RSV-1036",
    unread: 0,
    messages: [
      {
        id: "c4m1",
        from: "hotel",
        text: "✅ BOOKING CONFIRMED — Grand Palace Hotel\n\nHello Ananya Iyer,\nYour hotel reservation is confirmed.\n\n• Booking ID: RSV-1036\n• Room: 201 · Heritage Suite\n• Check-in: 10 Nov 2026 (2:00 PM)\n• Check-out: 13 Nov 2026 (11:00 AM)\n• Status: Confirmed\n\nThis is an automated booking confirmation from DeskFloow Notification Service.",
        time: "08:16 AM",
        status: "delivered",
      },
    ],
  },
  {
    id: "c5",
    propertyId: "lakeside-boutique",
    guestId: "g12",
    reservationId: "RSV-2011",
    unread: 0,
    messages: [
      {
        id: "c5m1",
        from: "hotel",
        text: "✅ BOOKING CONFIRMED — Lakeside Boutique Retreat\n\nHello Siddharth Verma,\nYour hotel reservation is confirmed.\n\n• Booking ID: RSV-2011\n• Room: 102 · Lake View Deluxe\n• Check-in: 12 Nov 2026 (2:00 PM)\n• Check-out: 15 Nov 2026 (11:00 AM)\n• Status: Confirmed\n\nThis is an automated booking confirmation from DeskFloow Notification Service.",
        time: "12:05 PM",
        status: "read",
      },
    ],
  },
  {
    id: "c6",
    propertyId: "city-centre-suites",
    guestId: "g5",
    reservationId: "RSV-3103",
    unread: 0,
    messages: [
      {
        id: "c6m1",
        from: "hotel",
        text: "✅ BOOKING CONFIRMED — City Centre Suites\n\nHello Vikram Singh,\nYour hotel reservation is confirmed.\n\n• Booking ID: RSV-3103\n• Room: 104 · Executive Suite\n• Check-in: 12 Nov 2026 (2:00 PM)\n• Check-out: 14 Nov 2026 (11:00 AM)\n• Status: Confirmed\n\nThis is an automated booking confirmation from DeskFloow Notification Service.",
        time: "09:30 AM",
        status: "read",
      },
    ],
  },
];
