"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Illustrative scenarios — NOT customer testimonials. Replace with verified,
 * attributed quotes once they are supplied.
 */
const scenarios = [
  { role: "Front-desk manager", property: "Boutique hotel · 24 rooms", text: "A guest arriving at 11 PM shouldn't mean a phone call to housekeeping. With room status on the same screen as arrivals, the late check-in is ready before they land." },
  { role: "Owner", property: "Hotel group · 3 properties", text: "Switching between properties from one login, with the same dashboard layout everywhere, is how a small group stays on top of occupancy without three different systems." },
  { role: "Restaurant lead", property: "Resort · 60 rooms", text: "Room-service orders that land on a board with the guest name and room number — and post to the folio — remove a whole class of checkout disputes." },
  { role: "Reservations executive", property: "City hotel · 40 rooms", text: "When an OTA booking arrives, it should appear on the tape chart and close availability elsewhere without anyone re-typing it." },
  { role: "Homestay host", property: "Serviced apartments · 8 units", text: "Sending check-in instructions from a template, tied to the booking, beats copy-pasting from my notes app for every guest." },
];

/** Signature animation 04 — auto-shuffling cards; pauses on hover/focus. */
export function Testimonials() {
  const [order, setOrder] = useState(scenarios.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const rotate = (dir: 1 | -1) => setOrder((o) => (dir === 1 ? [...o.slice(1), o[0]] : [o[o.length - 1], ...o.slice(0, -1)]));

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => !document.hidden && rotate(1), 5000);
    return () => clearInterval(id);
  }, [paused, reduce]);

  return (
    <section className="overflow-hidden bg-brand-50/60 py-24 sm:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <SectionHeading eyebrow="Illustrative scenarios" title="The everyday moments DeskFloow is built for." lead="These are anonymised, illustrative scenarios written to show typical hotel workflows — not quotes from named customers.">
          <div className="mt-8 flex gap-2">
            <button aria-label="Previous scenario" onClick={() => (setPaused(true), rotate(-1))} className="rounded-full border border-line bg-white p-2.5 hover:bg-brand-50"><ChevronLeft className="size-4" /></button>
            <button aria-label="Next scenario" onClick={() => (setPaused(true), rotate(1))} className="rounded-full border border-line bg-white p-2.5 hover:bg-brand-50"><ChevronRight className="size-4" /></button>
          </div>
        </SectionHeading>
        <div className="relative h-[340px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <AnimatePresence initial={false}>
            {order.slice(0, 3).map((idx, depth) => {
              const s = scenarios[idx];
              return (
                <motion.figure
                  key={idx}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1 - depth * 0.25, y: depth * 22, scale: 1 - depth * 0.05, rotate: depth === 0 ? 0 : depth % 2 ? 2 : -2, zIndex: 10 - depth }}
                  exit={{ opacity: 0, x: -80, rotate: -6, transition: { duration: 0.35 } }}
                  transition={{ type: "spring", stiffness: 180, damping: 24 }}
                  className={cn("absolute inset-x-0 top-0 rounded-3xl border border-line bg-white p-7 shadow-lift", depth > 0 && "pointer-events-none")}
                  aria-hidden={depth > 0}
                >
                  <Quote className="size-7 text-gold-400" />
                  <blockquote className="mt-4 text-[18px] leading-relaxed text-ink">{s.text}</blockquote>
                  <figcaption className="mt-6 flex items-center justify-between gap-3 text-[13px]">
                    <span><span className="font-semibold text-ink">{s.role}</span><span className="text-muted"> · {s.property}</span></span>
                    <span className="demo-badge">Illustrative</span>
                  </figcaption>
                </motion.figure>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
