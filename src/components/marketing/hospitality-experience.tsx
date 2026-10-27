"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2, MessageCircle, Sparkles,
  UsersRound, ArrowRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const experiences = [
  {
    id: "frontdesk",
    tag: "Front Desk & Guest Arrival",
    title: "Cut check-in queues by 75% with intelligent reception tools.",
    description:
      "Empower your front desk staff with lightning-fast guest check-in, instant reservation lookup, and automatic room assignment. Prevent check-ins into dirty rooms with built-in status guards, and process keycards or ID scans effortlessly.",
    image: "/images/frontdesk-tablet-reception.jpg",
    metrics: [
      { label: "Check-in time", val: "< 45s", sub: "per arrival" },
      { label: "Front desk queues", val: "-75%", sub: "during peak hours" },
      { label: "Billing errors", val: "0.0%", sub: "automated folios" },
    ],
    features: [
      "Instant guest lookup by name, phone or reservation code",
      "Dirty-room check-in guard prevents assigning uninspected rooms",
      "One-click folio balance settlement & multi-tender split payments",
      "Single-screen view of today's arrivals, departures & VIP alerts",
    ],
  },
  {
    id: "concierge",
    tag: "Contactless WhatsApp Concierge",
    title: "Turn WhatsApp into your highest-converting guest concierge.",
    description:
      "Guests don't want to download another app. DeskFloow connects directly to WhatsApp Business API to deliver automated booking confirmations, pre-arrival registration forms, digital keys, and room service menus straight to their chat.",
    image: "/images/guest-mobile-experience.jpg",
    metrics: [
      { label: "Message open rate", val: "98.4%", sub: "via WhatsApp" },
      { label: "F&B room upsell", val: "+28%", sub: "via chat menus" },
      { label: "Guest satisfaction", val: "4.9/5", sub: "average review" },
    ],
    features: [
      "Automated WhatsApp confirmation with room type & check-in dates",
      "Digital keycode & contactless mobile check-in registration",
      "Interactive QR room service ordering billed directly to stay folio",
      "Automated post-checkout review invitations to Google & TripAdvisor",
    ],
  },
  {
    id: "operations",
    tag: "Smart Housekeeping & Operations",
    title: "Clean rooms ready 45 minutes faster with real-time floor plans.",
    description:
      "Eliminate walkie-talkie chaos and paper clipboards. Housekeeping staff update room statuses (Cleaning, Clean, Inspected, Out of Order) on mobile tablets in real time, instantly unlocking ready rooms for front desk check-in.",
    image: "/images/housekeeping-ops-tablet.jpg",
    metrics: [
      { label: "Room turnaround", val: "45m", sub: "faster daily" },
      { label: "Front desk calls", val: "-80%", sub: "for room readiness" },
      { label: "Inspection accuracy", val: "99.8%", sub: "digital checklist" },
    ],
    features: [
      "Visual interactive floor plan showing room status across all levels",
      "Mobile-friendly housekeeping checklist for room attendants",
      "Automatic priority sorting for arriving guest rooms",
      "Maintenance & out-of-order flagging with photo attachments",
    ],
  },
];

export function HospitalityExperience() {
  const [activeTab, setActiveTab] = useState(0);
  const active = experiences[activeTab];

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-white via-brand-50/50 to-white dark:from-[#0d0420] dark:via-[#140827] dark:to-[#0d0420]">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="The Hospitality Experience"
          title="Engineered for every hotel touchpoint."
          lead="From the lobby reception to the guest room and housekeeping floor, DeskFloow orchestrates flawless stays."
        />

        {/* Interactive Tab Selector */}
        <div className="mt-12 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-line bg-white/80 p-1.5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
            {experiences.map((exp, idx) => (
              <button
                key={exp.id}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13.5px] font-semibold transition-all duration-200",
                  activeTab === idx
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/25"
                    : "text-muted hover:text-ink hover:bg-brand-50/70 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/5"
                )}
              >
                {exp.id === "frontdesk" && <UsersRound className="size-4" />}
                {exp.id === "concierge" && <MessageCircle className="size-4" />}
                {exp.id === "operations" && <Sparkles className="size-4" />}
                {exp.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Card */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="card grid overflow-hidden lg:grid-cols-[1.1fr_1fr] shadow-lift"
            >
              {/* Left Column: Details & Benefits */}
              <div className="flex flex-col justify-between p-8 sm:p-12">
                <div>
                  <span className="inline-block text-[12px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {active.tag}
                  </span>
                  <h3 className="mt-2 text-[26px] font-bold leading-tight tracking-tight text-ink sm:text-[34px] dark:text-white">
                    {active.title}
                  </h3>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-muted dark:text-white/70">
                    {active.description}
                  </p>

                  <div className="mt-6 space-y-3">
                    {active.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-[14.5px] text-ink dark:text-white/90">
                        <CheckCircle2 className="size-5 shrink-0 text-success mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-line dark:border-white/10">
                  <div className="grid grid-cols-3 gap-4">
                    {active.metrics.map((m) => (
                      <div key={m.label} className="rounded-xl bg-brand-50/80 p-3.5 dark:bg-white/5">
                        <p className="text-[24px] font-bold tracking-tight text-brand-700 dark:text-brand-300">{m.val}</p>
                        <p className="text-[12px] font-semibold text-ink dark:text-white">{m.label}</p>
                        <p className="text-[11px] text-muted">{m.sub}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-3">
                    <ButtonLink href="/book-demo" size="md">
                      See This in Action <ArrowRight className="size-4" />
                    </ButtonLink>
                    <ButtonLink href="/features" variant="secondary" size="md">
                      View Technical Specs
                    </ButtonLink>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Res Image Showcase */}
              <div className="relative min-h-[380px] bg-brand-950 lg:min-h-full">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent lg:hidden" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
