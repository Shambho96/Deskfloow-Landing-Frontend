import type { Metadata } from "next";
import Image from "next/image";
import { Check, ArrowRight, CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/marketing/final-cta";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Solutions — Hotels, resorts, homestays and hotel groups",
  description: "How DeskFloow fits independent hotels, boutique inns, luxury resorts, homestays, serviced apartments and multi-property hotel groups.",
  alternates: { canonical: "/solutions" },
};

const segments = [
  {
    id: "independent",
    title: "Independent hotels & boutique inns",
    image: "/images/frontdesk-tablet-reception.jpg",
    alt: "Boutique hotel reception desk with modern tablet",
    lead: "Run the front desk, housekeeping and guest messages from one screen — without needing an expensive dedicated IT team.",
    points: [
      "Visual tape chart for lightning-fast room moves and split stays",
      "Direct booking engine with 0% commission on your domain",
      "Official WhatsApp templates for automatic confirmations & contactless check-in",
      "Automated shift register for clean cash, card and UPI handovers",
    ],
    who: "Boutique Hoteliers",
  },
  {
    id: "resorts",
    title: "Luxury hotels & destination resorts",
    image: "/images/resort.jpg",
    alt: "Resort infinity pool at golden hour",
    lead: "Recognise returning VIPs, coordinate luxury villas and suites, and bill restaurant, spa and room-service orders to the room folio.",
    points: [
      "Centralized Guest CRM with VIP preferences, dietary notes and loyalty tiers",
      "Automatic arrival alerts for high-value and repeat guests",
      "Unified F&B and room-service ordering board",
      "Visual floor plans for multiple wings, cottages and resort villas",
    ],
    who: "Resort Operators",
  },
  {
    id: "homestays",
    title: "Homestays & serviced apartments",
    image: "/images/guest-mobile-experience.jpg",
    alt: "Guest using contactless mobile concierge in serviced suite",
    lead: "Keep a growing portfolio of units organized with automated self-check-in instructions sent directly to guest WhatsApp.",
    points: [
      "Instant unit inventory setup and automatic calendar blocking",
      "Contactless WhatsApp messaging for keycodes, directions and house rules",
      "Unified booking overview across Airbnb, Booking.com and direct website",
      "Mobile-optimized guest experience without app downloads",
    ],
    who: "Serviced Apartment Hosts",
  },
  {
    id: "chains",
    title: "Hotel groups & multi-property chains",
    image: "/images/housekeeping-ops-tablet.jpg",
    alt: "Operations manager reviewing multi-property floor plans",
    lead: "Switch between properties from one master account, with centralized revenue reporting and unified portfolio operations.",
    points: [
      "Multi-property switcher with portfolio-wide ADR, RevPAR and occupancy",
      "Cross-property guest profiles and enterprise VIP recognition",
      "Centralized OTA distribution and stop-sell controls",
      "Consolidated daily revenue and channel performance reports",
    ],
    who: "Hotel Group Executives",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions" }]}
        eyebrow="Solutions by Property Type"
        title="Built around how your property actually runs."
        lead="Whether you operate a 12-room heritage inn or a 5-property luxury resort collection, DeskFloow brings your entire operation into one effortless flow."
      />
      <div className="container-x space-y-24 py-20 sm:py-28">
        {segments.map((s, i) => (
          <section key={s.id} id={s.id} className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2">
            <Reveal className={i % 2 ? "lg:order-2" : ""}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-lift">
                <Image src={s.image} alt={s.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-950/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3.5 py-1 text-[12px] font-semibold text-brand-800 backdrop-blur shadow-sm">
                  Tailored for {s.who}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="h-section">{s.title}</h2>
              <p className="lead mt-4">{s.lead}</p>
              <ul className="mt-6 space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px]">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className="text-ink">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/book-demo">
                  <CalendarCheck className="size-4" /> Book a Demo for {s.who}
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Contact Sales <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
            </Reveal>
          </section>
        ))}
      </div>
      <FinalCta />
    </>
  );
}
