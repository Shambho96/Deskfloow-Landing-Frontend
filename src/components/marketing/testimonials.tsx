"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, CheckCircle2, Building2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Rajesh Sharma",
    role: "General Manager",
    property: "The Heritage Grand Palace · 48 Rooms",
    location: "Udaipur, Rajasthan",
    rating: 5,
    highlight: "Saved 2.5 hours every evening during peak check-in.",
    text: "DeskFloow eliminated our evening front-desk chaos completely. The tape chart is lightning fast, and having housekeeping status directly sync with arrivals prevented all check-in delays during our busiest wedding season.",
  },
  {
    name: "Priya Nair",
    role: "Owner & Host",
    property: "Wayanad Mist Villa & Cottages · 12 Units",
    location: "Wayanad, Kerala",
    rating: 5,
    highlight: "Shifted 38% of our bookings to direct in 90 days.",
    text: "As an independent property owner, paying 18% to 22% OTA commissions was eating our margins. DeskFloow's direct booking engine and automated WhatsApp confirmations shifted 38% of our bookings to direct within 90 days.",
  },
  {
    name: "Vikramaditya Roy",
    role: "Director of Operations",
    property: "Royal Orchid Suites & Resort · 65 Rooms",
    location: "Goa",
    rating: 5,
    highlight: "Unified front desk, restaurant POS and folios in one.",
    text: "Managing multi-property operations used to require three separate software tabs and endless spreadsheet reconciliations. With DeskFloow, our front desk, restaurant POS billing, and shift registers are unified on one single screen.",
  },
  {
    name: "Dr. Ananya Deshmukh",
    role: "Boutique Hotelier",
    property: "The Urban Retreat · 28 Rooms",
    location: "Bengaluru, Karnataka",
    rating: 5,
    highlight: "Guest satisfaction jumped to 4.9/5 on TripAdvisor.",
    text: "The automated WhatsApp guest messaging is a total game changer. Guests receive their check-in details, digital key, and breakfast QR menu directly on WhatsApp. Our guest satisfaction scores jumped to 4.9/5.",
  },
  {
    name: "Capt. Harshvardhan Patel",
    role: "Managing Partner",
    property: "Pineview Heritage Lodge · 22 Rooms",
    location: "Shimla, Himachal Pradesh",
    rating: 5,
    highlight: "Zero double bookings with sub-second OTA sync.",
    text: "The 2-way OTA channel synchronization is instantaneous. Zero double bookings, seamless rate updates across Booking.com, Airbnb, and MakeMyTrip in under a second. Best hospitality tech decision we have made.",
  },
];

export function Testimonials() {
  const [order, setOrder] = useState<number[]>(reviews.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  // Automatic shuffle effect every 4 seconds
  useEffect(() => {
    if (paused || reduce) return;
    const interval = setInterval(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused, reduce]);

  const rotate = (dir: 1 | -1) => {
    setOrder((prev) =>
      dir === 1 ? [...prev.slice(1), prev[0]] : [prev[prev.length - 1], ...prev.slice(0, -1)]
    );
  };

  const currentIdx = order[0];

  return (
    <section className="overflow-hidden bg-muted/30 py-24 sm:py-32 relative" id="reviews">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.25fr]">
        <SectionHeading
          eyebrow="Trusted by 250+ Hoteliers"
          title="Loved by hotel owners, general managers and front desks."
          lead="From boutique heritage properties to luxury resorts and serviced villas, see how hospitality teams transform operations with DeskFloow."
        >
          {/* Controls & Metrics */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous review"
                onClick={() => {
                  setPaused(true);
                  rotate(-1);
                }}
                className="rounded-full border border-border bg-card p-3 text-foreground shadow-sm transition hover:bg-muted hover:border-primary/50"
              >
                <ChevronLeft className="size-4.5" />
              </button>
              <button
                type="button"
                aria-label="Next review"
                onClick={() => {
                  setPaused(true);
                  rotate(1);
                }}
                className="rounded-full border border-border bg-card p-3 text-foreground shadow-sm transition hover:bg-muted hover:border-primary/50"
              >
                <ChevronRight className="size-4.5" />
              </button>
            </div>

            {/* Dots navigation */}
            <div className="flex items-center gap-1.5 ml-2" role="tablist" aria-label="Review indicators">
              {reviews.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  role="tab"
                  aria-selected={i === currentIdx}
                  aria-label={`Jump to review ${i + 1}`}
                  onClick={() => {
                    setPaused(true);
                    const shift = (i - currentIdx + reviews.length) % reviews.length;
                    setOrder((prev) => [...prev.slice(shift), ...prev.slice(0, shift)]);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === currentIdx ? "w-7 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>

            <span className="text-[12px] font-medium text-muted-foreground ml-auto hidden sm:inline-block">
              Auto-shuffling · Hover to pause
            </span>
          </div>
        </SectionHeading>

        {/* Shuffling Card Stack Container */}
        <div
          className="relative h-[380px] sm:h-[350px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <AnimatePresence initial={false}>
            {order.slice(0, 3).map((idx, depth) => {
              const r = reviews[idx];
              return (
                <motion.figure
                  key={idx}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{
                    opacity: 1 - depth * 0.22,
                    y: depth * 22,
                    scale: 1 - depth * 0.05,
                    rotate: depth === 0 ? 0 : depth % 2 ? 2.5 : -2.5,
                    zIndex: 10 - depth,
                  }}
                  exit={{
                    opacity: 0,
                    x: -120,
                    rotate: -8,
                    transition: { duration: 0.35, ease: "easeOut" },
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 26 }}
                  className={cn(
                    "absolute inset-x-0 top-0 rounded-3xl border border-border bg-card p-7 sm:p-8 shadow-xl text-card-foreground backdrop-blur",
                    depth > 0 && "pointer-events-none select-none shadow-md",
                  )}
                  aria-hidden={depth > 0}
                >
                  {/* Card Top: Stars rating & Verified Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1" aria-label={`${r.rating} out of 5 stars`}>
                        {[...Array(r.rating)].map((_, starI) => (
                          <Star key={starI} className="size-4.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[13px] font-bold text-foreground ml-1">5.0</span>
                    </div>

                    <span className="chip bg-emerald-500/10 text-emerald-600 font-semibold text-[11.5px]">
                      <CheckCircle2 className="size-3.5" /> Verified Hotelier
                    </span>
                  </div>

                  {/* Highlight */}
                  <p className="mt-4 text-[14.5px] font-bold text-primary">
                    “{r.highlight}”
                  </p>

                  {/* Main Quote */}
                  <blockquote className="mt-2 text-[15.5px] leading-relaxed text-foreground/90 font-normal">
                    {r.text}
                  </blockquote>

                  {/* Card Footer: Reviewer Info */}
                  <figcaption className="mt-6 flex items-center justify-between border-t border-border/70 pt-4 text-[13px]">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-[14px] font-bold text-primary">
                        {r.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <div>
                        <p className="font-bold text-foreground">{r.name}</p>
                        <p className="text-[12px] text-muted-foreground">
                          {r.role} · {r.property}
                        </p>
                      </div>
                    </div>

                    <span className="hidden sm:flex items-center gap-1 text-[11.5px] text-muted-foreground">
                      <Building2 className="size-3.5 text-primary" /> {r.location}
                    </span>
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
