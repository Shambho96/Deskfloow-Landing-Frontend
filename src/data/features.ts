import {
  BarChart3,
  BedDouble,
  CalendarRange,
  Globe2,
  MessageCircle,
  Network,
  Sparkles,
  UsersRound,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export type FeatureSlug =
  | "front-desk"
  | "tape-chart"
  | "channels"
  | "booking"
  | "whatsapp"
  | "crm"
  | "housekeeping"
  | "orders"
  | "analytics";

export interface FeaturePageData {
  slug: FeatureSlug;
  label: string;
  shortDesc: string;
  icon: LucideIcon;
  eyebrow: string;
  heroTitle: string;
  heroLead: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  highlights: { title: string; body: string }[];
  faqs: [string, string][];
}

export const featurePages: FeaturePageData[] = [
  {
    slug: "front-desk",
    label: "Front Desk PMS",
    shortDesc: "Arrivals, departures, GST folios, cashier shift handovers, and automated check-in workflows.",
    icon: BedDouble,
    eyebrow: "Cloud Hotel Front Desk Software",
    heroTitle: "Run hotel check-ins, folios and shift handovers in one unified PMS.",
    heroLead:
      "DeskFloow's cloud front desk PMS unifies daily arrivals, departures, VIP alerts, itemized GST guest folios, and cashier shift registers — eliminating reception bottlenecks for hotels, resorts, and homestays.",
    metaTitle: "Hotel Front Desk PMS Software — Check-In, Folios & Shift Audit",
    metaDescription:
      "Streamline hotel reception with DeskFloow Front Desk PMS: live arrivals & departures, automated room verification, GST folios, split billing, and cashier shift handover registers.",
    keywords: [
      "hotel front desk software",
      "hotel PMS software",
      "cloud hotel reception system",
      "hotel check-in check-out software",
      "hotel GST billing and folio software",
      "hotel night audit and shift register",
      "front office management software for hotels",
    ],
    highlights: [
      {
        title: "Zero-Friction Check-In & Room Verification",
        body: "Verify clean room readiness automatically before assigning keys, view VIP & returning guest alerts, and check guests in within seconds.",
      },
      {
        title: "Automated Itemized GST Folios & Billing",
        body: "Room tariffs, extra beds, restaurant POS orders, and taxes roll into accurate guest invoices with instant balance tracking across UPI, card, and cash.",
      },
      {
        title: "Balanced Cashier Drawer & Shift Handovers",
        body: "Track opening cash floats, shift collections, and digital settlements with zero spreadsheet reconciliation during evening and night audits.",
      },
    ],
    faqs: [
      [
        "How does DeskFloow Front Desk PMS prevent assigning dirty rooms?",
        "Housekeeping statuses sync directly with the front desk arrival panel, alerting reception staff if an assigned room is still dirty or under cleaning.",
      ],
      [
        "Does the front desk module include GST invoicing and shift registers?",
        "Yes. Every reservation includes an automated itemized guest folio with configurable GST calculation alongside a dedicated shift cash, card, and UPI register.",
      ],
      [
        "Can receptionists manage walk-in bookings and OTA arrivals together?",
        "Yes. Walk-ins, phone reservations, direct website bookings, and connected OTA arrivals appear in one unified reception queue.",
      ],
    ],
  },
  {
    slug: "tape-chart",
    label: "Visual Tape Chart",
    shortDesc: "Interactive 7-day drag-and-drop room inventory calendar with instant overlap protection.",
    icon: CalendarRange,
    eyebrow: "Interactive Hotel Reservation Calendar",
    heroTitle: "Manage every room and reservation on a visual drag-and-drop tape chart.",
    heroLead:
      "View your entire 7-day hotel room matrix at a glance. Drag reservations across rooms or dates, create walk-in bookings on empty cells, and prevent double bookings automatically.",
    metaTitle: "Visual Hotel Tape Chart & Drag-and-Drop Room Calendar Software",
    metaDescription:
      "Control hotel room inventory with DeskFloow's interactive 7-day visual tape chart. Drag-and-drop room reassignments, keyboard navigation, dirty-room guards, and overlap protection.",
    keywords: [
      "hotel tape chart software",
      "visual hotel room calendar",
      "drag and drop hotel reservation calendar",
      "hotel room inventory matrix",
      "hotel room allocation software",
      "prevent hotel double bookings",
      "interactive PMS calendar",
    ],
    highlights: [
      {
        title: "Instant Drag-and-Drop Room Reassignment",
        body: "Move stays across room categories or shift dates in one motion while automatic tariff recalculation and conflict checks run in the background.",
      },
      {
        title: "Built-In Double-Booking & Overlap Guard",
        body: "Atomic conflict detection blocks overlapping stays and protects out-of-order rooms so front desk teams never overwrite an active booking.",
      },
      {
        title: "One-Click Walk-In & Phone Reservation Creation",
        body: "Click any open date cell on the rack matrix to capture guest details, room rate, and payment deposit without leaving the calendar screen.",
      },
    ],
    faqs: [
      [
        "Can staff reassign rooms using both drag-and-drop and keyboard controls?",
        "Yes. DeskFloow's visual tape chart supports smooth mouse/touch drag-and-drop as well as accessible keyboard reservation reassignment.",
      ],
      [
        "What happens if someone drags a booking onto an occupied room?",
        "Overlap protection automatically blocks conflicting room-date combinations and preserves your existing reservation intact.",
      ],
      [
        "Does the tape chart show live housekeeping status per room?",
        "Yes. Every room row displays its room number, category, and current clean/dirty/cleaning indicator right beside the calendar timeline.",
      ],
    ],
  },
  {
    slug: "channels",
    label: "OTA Channel Manager",
    shortDesc: "Real-time 2-way inventory and rate synchronization across major OTAs with zero overbookings.",
    icon: Network,
    eyebrow: "2-Way Hotel OTA Channel Manager",
    heroTitle: "Sync Booking.com, MakeMyTrip, Airbnb, Expedia & Agoda in real time.",
    heroLead:
      "Connect your hotel room inventory and rate plans across leading online travel agencies and your direct website from a single source of truth — eliminating manual extranet updates and costly overbookings.",
    metaTitle: "Hotel OTA Channel Manager — 2-Way Sync for Booking.com, MMT & Airbnb",
    metaDescription:
      "Eliminate hotel double bookings with DeskFloow's 2-way OTA channel manager. Sync room availability, rates, and stop-sells across Booking.com, MakeMyTrip, Goibibo, Agoda, Expedia, and Airbnb.",
    keywords: [
      "hotel channel manager",
      "2-way OTA channel manager",
      "Booking.com hotel channel manager",
      "MakeMyTrip Goibibo channel manager",
      "Airbnb Expedia Agoda inventory sync",
      "hotel rate parity software",
      "real-time OTA synchronization India",
    ],
    highlights: [
      {
        title: "Sub-Second Availability & Rate Parity",
        body: "Update room tariffs or apply stop-sell restrictions once inside DeskFloow and push changes across all connected OTA channels simultaneously.",
      },
      {
        title: "Idempotent Reservation Ingestion",
        body: "De-duplicated webhook handling ensures incoming OTA reservations, modifications, and cancellations land cleanly on your PMS tape chart.",
      },
      {
        title: "Full Sync Audit Trail & Health Monitoring",
        body: "Every inventory push and booking ingestion is logged with clear channel connection statuses and instant error visibility.",
      },
    ],
    faqs: [
      [
        "Which online travel agencies can connect with DeskFloow?",
        "DeskFloow's channel architecture is built for major global and regional OTAs including Booking.com, MakeMyTrip, Goibibo, Agoda, Expedia, and Airbnb, configured per property.",
      ],
      [
        "How does 2-way OTA sync stop hotel overbookings?",
        "Whenever a room is booked on an OTA or at the front desk, remaining room availability is recalculated centrally and pushed to all connected channels.",
      ],
      [
        "Do OTA bookings automatically create guest profiles and folios?",
        "Yes. Synchronized reservations populate your front desk arrival list, tape chart, guest CRM profile, and billing folio automatically.",
      ],
    ],
  },
  {
    slug: "booking",
    label: "Direct Booking Engine",
    shortDesc: "0% commission mobile-first hotel website booking engine with instant UPI & card payments.",
    icon: Globe2,
    eyebrow: "Commission-Free Hotel Booking Engine",
    heroTitle: "Capture more direct hotel bookings with 0% third-party commission.",
    heroLead:
      "Turn your hotel website and social media visitors into confirmed direct guests. Showcase room photos, transparent rates, add-on packages, and instant UPI, card, and net-banking checkout on your own domain.",
    metaTitle: "Direct Hotel Booking Engine — 0% Commission Website Reservations",
    metaDescription:
      "Grow direct hotel revenue with DeskFloow's mobile-first, commission-free hotel booking engine. Custom domain checkout, UPI & card payments, promo packages, and instant PMS sync.",
    keywords: [
      "direct hotel booking engine",
      "commission-free hotel booking engine",
      "online booking engine for hotel website",
      "hotel booking engine with UPI payment",
      "increase direct hotel bookings",
      "boutique hotel booking engine India",
      "zero commission hotel reservation system",
    ],
    highlights: [
      {
        title: "Zero Commission on Every Direct Stay",
        body: "Keep 100% of your room revenue instead of losing 15%–25% per stay to third-party OTA commissions.",
      },
      {
        title: "Mobile-First Checkout with UPI & Cards",
        body: "Built for travelers booking on smartphones — three fast steps from room selection to instant payment and WhatsApp confirmation.",
      },
      {
        title: "Live PMS Inventory & Exclusive Direct Perks",
        body: "Pull real-time room availability straight from your PMS and highlight direct-only perks like complimentary breakfast or flexible cancellation.",
      },
    ],
    faqs: [
      [
        "Does DeskFloow charge commission on direct website bookings?",
        "No. DeskFloow charges 0% commission on direct reservations captured through your hotel booking link and website.",
      ],
      [
        "Can the booking engine embed into our existing hotel website?",
        "Yes. You can link or embed DeskFloow's booking experience directly on your custom hotel domain without rebuilding your site.",
      ],
      [
        "Are direct bookings synced immediately with the front desk?",
        "Yes. Every direct website booking updates room inventory, creates the reservation on your tape chart, and triggers guest confirmation workflows.",
      ],
    ],
  },
  {
    slug: "whatsapp",
    label: "WhatsApp Confirmations",
    shortDesc: "Automated verified WhatsApp booking confirmations, pre-arrival alerts, and guest messaging.",
    icon: MessageCircle,
    eyebrow: "WhatsApp Automation for Hotels",
    heroTitle: "Send instant automated hotel booking confirmations on WhatsApp.",
    heroLead:
      "Delight guests the moment they book. DeskFloow automatically dispatches verified WhatsApp Business confirmation messages with reservation IDs, check-in dates, room details, Google Maps directions, and delivery read receipts.",
    metaTitle: "WhatsApp for Hotels — Automated Booking Confirmations & Guest Alerts",
    metaDescription:
      "Automate hotel guest communication on WhatsApp with DeskFloow. Send instant verified booking confirmations, pre-arrival check-in details, room updates, and digital invoices.",
    keywords: [
      "WhatsApp for hotels",
      "automated hotel WhatsApp booking confirmation",
      "hotel WhatsApp Business API",
      "WhatsApp guest messaging software",
      "hotel pre-arrival WhatsApp alerts",
      "hospitality WhatsApp automation",
      "digital hotel check-in WhatsApp",
    ],
    highlights: [
      {
        title: "Instant Triggered Booking Confirmations",
        body: "As soon as a stay is confirmed at the front desk or online, guests receive a structured WhatsApp confirmation with booking ID and stay dates.",
      },
      {
        title: "Live Delivery & Read-Receipt Tracking",
        body: "Reception teams see sent, delivered, and read statuses right inside the reservation timeline — no personal staff phones required.",
      },
      {
        title: "Approved Templates on Your Hotel Brand",
        body: "Connect your official WhatsApp Business Platform (WABA) number for pre-arrival instructions, Wi-Fi details, dining links, and checkout invoices.",
      },
    ],
    faqs: [
      [
        "Can we use our hotel's own WhatsApp Business number?",
        "Yes. DeskFloow connects with your authorized WhatsApp Business Platform (WABA) account and approved message templates.",
      ],
      [
        "What details are included in automated WhatsApp confirmations?",
        "Templates dynamically populate guest name, reservation ID, check-in/check-out dates, room category, and property contact details.",
      ],
      [
        "Are WhatsApp messages linked to the guest's reservation record?",
        "Yes. Every dispatched campaign message and status update is logged against the guest profile and reservation ID for full front-desk visibility.",
      ],
    ],
  },
  {
    slug: "crm",
    label: "Guest CRM & Loyalty",
    shortDesc: "360° hospitality guest profiles, verified ID records, dietary preferences, VIP tags, and stay history.",
    icon: UsersRound,
    eyebrow: "Hospitality Guest CRM & Loyalty Directory",
    heroTitle: "Remember every guest preference, stay history and VIP milestone.",
    heroLead:
      "Build lasting guest relationships and repeat direct stays. DeskFloow unifies verified ID details, room preferences, dietary notes, lifetime spend, loyalty tiers, and instant guest messaging in one searchable hotel CRM.",
    metaTitle: "Hotel Guest CRM Software — 360° Guest Profiles, VIP Tags & Loyalty",
    metaDescription:
      "Personalize hospitality with DeskFloow Hotel Guest CRM. Centralize guest stay history, verified IDs, VIP & loyalty tiers, dietary requests, and direct guest communication.",
    keywords: [
      "hotel guest CRM",
      "hospitality CRM software",
      "hotel guest profile management",
      "hotel loyalty program software",
      "VIP hotel guest tracking",
      "repeat hotel guest database",
      "guest experience software for hotels",
    ],
    highlights: [
      {
        title: "Unified 360° Guest Profile Directory",
        body: "Stop re-entering returning guests. Every stay, folio spend, room preference, and special occasion is saved under one clean profile.",
      },
      {
        title: "Automatic VIP & Returning-Guest Alerts",
        body: "Surface dietary needs, pillow or view preferences, and loyalty tiers on the front-desk dashboard before the guest steps into your lobby.",
      },
      {
        title: "One-Click Guest Service Communication",
        body: "Add new guests in seconds and send tailored room-readiness or concierge updates straight from the CRM directory.",
      },
    ],
    faqs: [
      [
        "Does DeskFloow automatically recognize repeat guests?",
        "Yes. Returning guests are matched to their existing profile, automatically displaying past stays, total spend, loyalty tier, and saved preferences.",
      ],
      [
        "Can staff record dietary restrictions and special requests?",
        "Yes. Dietary notes (such as Jain, vegan, or allergy alerts) and room preferences appear directly on front-desk arrival alerts.",
      ],
      [
        "Is guest data controlled by the hotel property?",
        "Yes. Each subscribing hotel retains ownership of its guest directory with role-based staff access and encrypted cloud storage.",
      ],
    ],
  },
  {
    slug: "housekeeping",
    label: "Smart Housekeeping",
    shortDesc: "Interactive 2D hotel floor plan builder, live clean/dirty status, and attendant room assignments.",
    icon: Sparkles,
    eyebrow: "Visual Hotel Floor Plan & Housekeeping Software",
    heroTitle: "Track clean, dirty and ready rooms on a live interactive floor plan.",
    heroLead:
      "Replace walkie-talkie guesswork and paper clipboards. Build custom 2D floor plans, assign housekeeping attendants, track Clean, Cleaning, Dirty, and Out-of-Order rooms in real time, and unlock faster check-ins.",
    metaTitle: "Hotel Housekeeping Software & Interactive 2D Visual Floor Plan",
    metaDescription:
      "Coordinate reception and room attendants in real time with DeskFloow Smart Housekeeping. Interactive drag-and-drop hotel floor plans, live room readiness, and dirty-room check-in guards.",
    keywords: [
      "hotel housekeeping software",
      "visual hotel floor plan software",
      "hotel room status tracking",
      "housekeeping management system",
      "hotel room turnaround tracking",
      "interactive hotel room grid",
      "cloud housekeeping app for hotels",
    ],
    highlights: [
      {
        title: "Drag-and-Drop 2D Hotel Floor Plan",
        body: "Map every floor, wing, and room category visually — assign guests and housekeeping staff directly onto the interactive property grid.",
      },
      {
        title: "Real-Time Reception & Check-In Sync",
        body: "The instant an attendant marks a room Clean, the front desk sees it unlocked and ready for waiting early-arrival guests.",
      },
      {
        title: "Out-of-Order & Maintenance Blocking",
        body: "Flag rooms under engineering maintenance so neither receptionists nor online channels accidentally allocate unavailable inventory.",
      },
    ],
    faqs: [
      [
        "Can we customize the floor plan to match our hotel's rooms and floors?",
        "Yes. DeskFloow lets you add floors, configure room categories, and arrange rooms visually on an interactive grid.",
      ],
      [
        "How does housekeeping status affect front desk check-ins?",
        "Dirty and Out-of-Order statuses automatically warn or block check-in at reception until housekeeping marks the room inspected and clean.",
      ],
      [
        "Can supervisors assign specific attendants to dirty rooms?",
        "Yes. Attendants can be assigned per room with live progress tracking from Dirty to Cleaning to Clean.",
      ],
    ],
  },
  {
    slug: "orders",
    label: "Restaurant & POS Orders",
    shortDesc: "Contactless QR in-room dining menus, live kitchen order board, and automatic room-folio posting.",
    icon: UtensilsCrossed,
    eyebrow: "Hotel Restaurant POS & Room Service Software",
    heroTitle: "Route QR room-service and restaurant POS orders straight to the guest folio.",
    heroLead:
      "Eliminate lost paper KOT chits and unpaid dining bills before checkout. Capture orders from contactless in-room QR menus, restaurant tables, or reception and post charges automatically to the guest's master room folio.",
    metaTitle: "Hotel Restaurant POS & Contactless QR Room Service Billing Software",
    metaDescription:
      "Manage hotel dining and in-room service on one live board with DeskFloow POS Orders. Contactless guest QR menus, kitchen status tracking, and automatic room-folio billing.",
    keywords: [
      "hotel restaurant POS software",
      "hotel room service ordering system",
      "contactless QR menu for hotels",
      "in-room dining software",
      "hotel POS integrated with PMS folio",
      "hotel F&B billing software India",
      "automated room charge posting",
    ],
    highlights: [
      {
        title: "Contactless QR Menu & Multi-Source Orders",
        body: "Accept orders from guest smartphone QR scans, room-service calls, or restaurant staff on one live kitchen and service board.",
      },
      {
        title: "Automatic Master Room-Folio Posting",
        body: "Every in-house dining, spa, or laundry order links directly to the guest's room number and reservation invoice — zero missed charges at checkout.",
      },
      {
        title: "Live Preparation-to-Delivery Status",
        body: "Move orders cleanly from New to Preparing to Delivered so front desk and F&B teams always know exact service turnaround times.",
      },
    ],
    faqs: [
      [
        "Do room-service orders automatically appear on the checkout invoice?",
        "Yes. Any order marked 'Charge to room' is immediately added as an itemized line on the guest's reservation folio with applicable taxes.",
      ],
      [
        "Do guests need to download an app to order room service?",
        "No app download is required. Guests simply scan the room QR code in their mobile browser to browse the menu and place requests.",
      ],
      [
        "Can non-resident restaurant or walk-in dining orders also be tracked?",
        "Yes. Staff can log table, phone, or room orders and settle them via UPI, card, cash, or room posting.",
      ],
    ],
  },
  {
    slug: "analytics",
    label: "Analytics & Revenue",
    shortDesc: "Real-time hotel occupancy, ADR, RevPAR, channel mix, and multi-property portfolio dashboards.",
    icon: BarChart3,
    eyebrow: "Hotel Revenue Management & Portfolio Analytics",
    heroTitle: "Track hotel occupancy, ADR, RevPAR and multi-property revenue live.",
    heroLead:
      "Make smarter pricing and distribution decisions every morning. Monitor 7-day revenue trends, room-category RevPAR, direct vs OTA channel share, and multi-property KPIs from one executive dashboard.",
    metaTitle: "Hotel Revenue Analytics & Multi-Property Occupancy, ADR, RevPAR Software",
    metaDescription:
      "Monitor hotel performance in real time with DeskFloow Analytics. Track daily occupancy, ADR, RevPAR by room category, OTA vs direct booking mix, and multi-property group revenue.",
    keywords: [
      "hotel revenue management software",
      "hotel analytics dashboard",
      "hotel occupancy ADR RevPAR calculator",
      "multi-property hotel PMS analytics",
      "hotel booking source mix report",
      "hospitality business intelligence software",
      "hotel financial reporting system",
    ],
    highlights: [
      {
        title: "Live Occupancy, ADR & Category RevPAR",
        body: "Compare how Deluxe, Premium, and Suite categories perform daily so you know exactly when to adjust tariffs or run promotions.",
      },
      {
        title: "Direct vs OTA Channel Mix Visibility",
        body: "Measure your commission-free direct booking share alongside Booking.com, MakeMyTrip, Agoda, and corporate sources in real time.",
      },
      {
        title: "Single-Login Multi-Property Oversight",
        body: "Switch seamlessly between boutique hotels, resorts, and villas in your portfolio with unified KPI snapshots for owners and GMs.",
      },
    ],
    faqs: [
      [
        "Are analytics calculated from live front-desk and booking data?",
        "Yes. Occupancy, daily revenue, RevPAR, and channel share update automatically from the same reservations and folios your staff manage.",
      ],
      [
        "Can hotel owners view multiple properties from one DeskFloow account?",
        "Yes. Multi-property portfolio switching lets authorized owners and operations directors monitor every property without separate logins.",
      ],
      [
        "Can operational reports and guest records be exported?",
        "Yes. Operational summaries and structured records support clean CSV export for accounting and owner reporting.",
      ],
    ],
  },
];

export function getFeatureBySlug(slug: string): FeaturePageData | undefined {
  return featurePages.find((f) => f.slug === slug);
}
