import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { ValueStrip } from "@/components/marketing/value-strip";
import { BookingJourney } from "@/components/marketing/booking-journey";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Comparison } from "@/components/marketing/comparison";
import { Testimonials } from "@/components/marketing/testimonials";
import { FinalCta } from "@/components/marketing/final-cta";
import { Faq } from "@/components/marketing/faq";
import { coreSeoKeywords, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "DeskFloow — Best Cloud Hotel PMS, Channel Manager, Booking Engine & WhatsApp Software",
  description:
    "Run your hotel, resort, homestay or hotel group in one connected cloud PMS. Unify front desk check-ins, 7-day visual tape charts, 2-way OTA sync (Booking.com, MakeMyTrip, Airbnb, Agoda), 0% commission direct bookings, WhatsApp confirmations, housekeeping, GST billing & analytics.",
  keywords: coreSeoKeywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "DeskFloow",
    title: "DeskFloow — Intelligent Cloud Hotel PMS & Guest Experience Platform",
    description:
      "All-in-one hotel management software for independent hotels, boutique resorts, homestays, and multi-property groups.",
    images: [{ url: "/images/lobby.jpg", width: 1376, height: 768, alt: "DeskFloow Hotel PMS Dashboard" }],
  },
};

const homeFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    [
      "What is DeskFloow?",
      "DeskFloow is an intelligent cloud hotel property management system (PMS) that brings front-desk operations, reservations, 2-way OTA sync, direct bookings, housekeeping, guest CRM, GST billing, and WhatsApp confirmations into one connected workspace.",
    ],
    [
      "Can DeskFloow manage reservations from multiple OTAs?",
      "Yes. DeskFloow centralizes reservations from connected online travel agencies such as Booking.com, MakeMyTrip, Goibibo, Agoda, Expedia, and Airbnb alongside direct website bookings.",
    ],
    [
      "Does DeskFloow support commission-free direct hotel bookings?",
      "Yes. DeskFloow includes a mobile-first direct booking engine that helps hotels capture 0% commission reservations directly on their own website.",
    ],
    [
      "Can I send automated hotel booking confirmations through WhatsApp?",
      "Yes. DeskFloow supports automated WhatsApp Business booking confirmations, pre-arrival instructions, check-in details, and guest service updates.",
    ],
    [
      "Is DeskFloow suitable for independent hotels, resorts, homestays, and groups?",
      "Yes. DeskFloow scales from boutique inns, homestays, and serviced apartments to full-service resorts and multi-property hospitality groups.",
    ],
  ].map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <BookingJourney />
      <HowItWorks />
      <Comparison />
      <Testimonials />
      <FinalCta />
      <Faq />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqLd) }}
      />
    </>
  );
}
