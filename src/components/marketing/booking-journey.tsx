"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { CalendarPlus, RefreshCw, MessageCircle, Sparkles, KeyRound } from "lucide-react";
import { SectionHeading } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const stages = [
  { icon: CalendarPlus, title: "Booking received", text: "Direct site, OTA, phone or walk-in." },
  { icon: RefreshCw, title: "Reservation synchronised", text: "Inventory updates in one place." },
  { icon: MessageCircle, title: "Guest contacted", text: "Confirmation and pre-arrival messages." },
  { icon: Sparkles, title: "Room prepared", text: "Housekeeping marks it ready." },
  { icon: KeyRound, title: "Guest checked in", text: "Profile, folio and room all linked." },
];

/** Signature animation 08 — process line drawn as the section scrolls into view. */
export function BookingJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setActive(Math.min(stages.length - 1, Math.floor(v * stages.length))));
  const width = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading align="center" eyebrow="The guest journey" title="From booking to check-in, in one flow." lead="Every step updates the same reservation — nobody re-types guest details or chases room status." />
        <div ref={ref} className="relative mt-16">
          {/* Desktop horizontal line */}
          <div className="absolute top-7 right-[10%] left-[10%] hidden h-[3px] rounded-full bg-brand-100 md:block" aria-hidden>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700" style={{ width }} />
          </div>
          {/* Mobile vertical line */}
          <div className="absolute top-7 bottom-7 left-7 w-[3px] rounded-full bg-brand-100 md:hidden" aria-hidden>
            <motion.div className="w-full origin-top rounded-full bg-gradient-to-b from-brand-500 to-brand-700" style={{ height: width }} />
          </div>
          <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
            {stages.map((s, i) => {
              const reached = i <= active;
              const isActive = i === active;
              return (
                <li key={s.title} className="flex items-start gap-4 md:flex-col md:items-center md:text-center">
                  <span
                    className={cn(
                      "relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border-2 bg-white transition-all duration-500",
                      isActive ? "border-gold-400 text-gold-600 shadow-glow" : reached ? "border-brand-500 text-brand-600" : "border-brand-100 text-brand-300",
                    )}
                  >
                    <s.icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">Step {i + 1}</span>
                    <span className={cn("mt-1 block text-[16px] font-semibold tracking-tight transition-colors", reached ? "text-ink" : "text-ink/50")}>{s.title}</span>
                    <span className="mt-1 block text-[13.5px] text-muted-foreground">{s.text}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
