import type { Conversation, MessageTemplate, TemplateKey } from "@/types";

export const messageTemplates: MessageTemplate[] = [
  { key: "booking-confirmation", label: "Booking confirmation", body: "Hi {{guest}}, your stay at {{hotel}} is confirmed ✨ Booking {{code}} · Check-in {{checkin}} · Room {{room}}. Reply here for anything you need." },
  { key: "payment-reminder", label: "Payment reminder", body: "Hi {{guest}}, a gentle reminder that a balance of {{balance}} is pending for booking {{code}}. You can settle it at the front desk on arrival." },
  { key: "pre-arrival", label: "Pre-arrival welcome", body: "Hello {{guest}}! We're looking forward to welcoming you on {{checkin}}. Let us know your arrival time and any special requests." },
  { key: "check-in", label: "Check-in instructions", body: "Welcome to {{hotel}}, {{guest}} 🗝️ Room {{room}} is ready. Wi-Fi: DeskFloow-Guest · Breakfast 7–10:30 AM in the Courtyard." },
  { key: "room-service", label: "Room-service confirmation", body: "Thanks {{guest}}! Your order for Room {{room}} has been received and is being prepared. Estimated delivery: 25 minutes." },
  { key: "housekeeping", label: "Housekeeping acknowledgment", body: "Hi {{guest}}, housekeeping has been notified and will be at Room {{room}} shortly." },
  { key: "checkout", label: "Checkout thank-you", body: "Thank you for staying with us, {{guest}} 💜 We hope to welcome you back to {{hotel}} soon. Safe travels!" },
  { key: "review-request", label: "Review request", body: "Hi {{guest}}, we'd love to hear about your stay in Room {{room}}. Your feedback helps our team improve." },
];

export const templateByKey = (k: TemplateKey) => messageTemplates.find((t) => t.key === k)!;

export function fillTemplate(body: string, vars: Record<string, string>) {
  return body.replace(/\{\{(\w+)\}\}/g, (_, k: string) => vars[k] ?? `{{${k}}}`);
}

export const demoConversations: Conversation[] = [
  {
    id: "c1", propertyId: "grand-palace", guestId: "g8", reservationId: "RSV-1048", unread: 2,
    messages: [
      { id: "c1m1", from: "hotel", text: "Hi Meera, your stay at Grand Palace is confirmed ✨ Booking RSV-1048 · Check-in 12 Nov · Room 203.", time: "09:02", status: "read" },
      { id: "c1m2", from: "guest", text: "Thank you! Could we have the cake delivered at 8 PM?", time: "11:47" },
      { id: "c1m3", from: "guest", text: "Also, we'll arrive around 3 PM.", time: "11:48" },
    ],
  },
  {
    id: "c2", propertyId: "grand-palace", guestId: "g4", reservationId: "RSV-1047", unread: 1,
    messages: [
      { id: "c2m1", from: "guest", text: "Hello, my flight lands at 10 PM. Is late check-in okay?", time: "10:15" },
    ],
  },
  {
    id: "c3", propertyId: "grand-palace", guestId: "g7", reservationId: "RSV-1039", unread: 0,
    messages: [
      { id: "c3m1", from: "guest", text: "Can I get extra towels in 202?", time: "08:30" },
      { id: "c3m2", from: "hotel", text: "Hi James, housekeeping has been notified and will be at Room 202 shortly.", time: "08:31", status: "read" },
    ],
  },
  {
    id: "c4", propertyId: "grand-palace", guestId: "g6", reservationId: "RSV-1036", unread: 0,
    messages: [
      { id: "c4m1", from: "hotel", text: "Thanks Ananya! Your order for Room 201 has been received and is being prepared.", time: "08:16", status: "delivered" },
    ],
  },
  {
    id: "c5", propertyId: "lakeside-boutique", guestId: "g12", reservationId: "RSV-2011", unread: 1,
    messages: [{ id: "c5m1", from: "guest", text: "Is the lake-view terrace open for dinner tonight?", time: "12:05" }],
  },
  {
    id: "c6", propertyId: "city-centre-suites", guestId: "g5", reservationId: "RSV-3103", unread: 0,
    messages: [{ id: "c6m1", from: "hotel", text: "Hello Vikram! We're looking forward to welcoming you on 12 Nov.", time: "09:30", status: "read" }],
  },
];
