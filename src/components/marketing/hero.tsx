"use client";

import { WordReveal } from "@/components/animations/word-reveal";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight, CalendarCheck, Check,
  Clock,
  Laptop,
  MessageCircle,
  MonitorPlay,
  Network,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { HeroDashboard } from "./hero-dashboard";

export function Hero() {
  const [viewMode, setViewMode] = useState<"interactive" | "mockup">("interactive");

  return (
    <section className="relative -mt-[68px] overflow-hidden pt-[68px]">
      {/* Background gradients matching brand ultraviolet and warm gold */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-100 via-brand-50/70 to-white" />
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_35%,transparent_75%)]" />
      <div className="pointer-events-none absolute top-[-220px] left-1/2 -z-10 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-brand-500/25 blur-[130px]" />
      <div className="pointer-events-none absolute top-[140px] right-[10%] -z-10 size-60 rounded-full bg-gold-400/25 blur-[100px]" />
      <div className="pointer-events-none absolute top-[300px] left-[6%] -z-10 size-52 rounded-full bg-brand-400/20 blur-[100px]" />

      <div className="container-x pt-16 pb-24 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200/90 bg-white/80 px-4 py-1.5 text-[12.5px] font-semibold text-brand-800 shadow-sm backdrop-blur [animation:wr_0.7s_ease_both]">
            <span className="size-2 animate-pulse-soft rounded-full bg-gold-500" />
            The Next-Generation Hotel PMS &amp; Guest Experience Platform
          </div>

          <h1 className="h-display mt-6 text-ink">
            <WordReveal
              lines={["An Intelligent Hotel", "Operations Platform"]}
              highlight={["Intelligent", "Operations"]}
              baseDelay={0.15}
            />
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-muted-foreground sm:text-[20px] [animation:wr_0.8s_0.75s_cubic-bezier(0.22,1,0.36,1)_both]">
            One intelligent cloud platform for every room, reservation, guest, and operation. Connect your front desk,
            interactive tape chart, 2-way OTA channels, automated WhatsApp booking confirmations, and revenue in one unified workspace.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row [animation:wr_0.8s_0.9s_cubic-bezier(0.22,1,0.36,1)_both]">
            <ButtonLink href="/book-demo" size="lg" className="shadow-brand-glow">
              <CalendarCheck className="size-4.5" /> Book a Guided Demo <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/features" variant="secondary" size="lg">
              <Sparkles className="size-4 text-brand-600" /> Explore Features &amp; Tour
            </ButtonLink>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-black [animation:wr_0.8s_1s_cubic-bezier(0.22,1,0.36,1)_both]">
            <span className="flex items-center gap-1.5">
              <Check className="size-4 text-success" /> 2-Way Instant OTA Sync
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-4 text-success" /> Automated WhatsApp Confirmations
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-4 text-success" /> Multi-Property Ready
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-4 text-success" /> 99.9% Uptime SLA
            </span>
          </div>
        </div>

        {/* View mode switcher */}
        <div className="mt-14 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card/90 p-1 shadow-sm backdrop-blur">
            <button
              type="button"
              onClick={() => setViewMode("interactive")}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition",
                viewMode === "interactive"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <MonitorPlay className="size-4" /> Live System Dashboard
            </button>
            <button
              type="button"
              onClick={() => setViewMode("mockup")}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition",
                viewMode === "mockup"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Laptop className="size-4" /> Hotel Front Desk View
            </button>
          </div>
        </div>

        {/* Hero showcase display */}
        <div className="relative mx-auto mt-8 max-w-[1100px] [perspective:1800px]">
          <AnimatePresence mode="wait">
            {viewMode === "interactive" ? (
              <motion.div
                key="interactive"
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.4 }}
                className="[animation:tilt_1.2s_0.2s_cubic-bezier(0.22,1,0.36,1)_both]"
              >
                <HeroDashboard />
              </motion.div>
            ) : (
              <motion.div
                key="mockup"
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-[26px] border border-white/80 bg-white shadow-lift ring-1 ring-brand-200/50"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/images/pms-laptop-mockup.jpg"
                    alt="DeskFloow Hotel PMS running on a laptop at a luxury hotel reception desk"
                    fill
                    sizes="(min-width: 1200px) 1100px, 100vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-black/20" />

                  {/* Floating interactive Hotspots */}
                  <div className="absolute bottom-6 left-6 right-6 hidden gap-4 sm:flex">
                    <div className="flex-1 rounded-2xl border border-white/20 bg-brand-950/80 p-4 text-white backdrop-blur-md">
                      <div className="flex items-center gap-2 text-gold-300">
                        <Network className="size-4" />
                        <span className="text-[12px] font-bold uppercase tracking-wider">Instant 2-Way Sync</span>
                      </div>
                      <p className="mt-1 text-[13.5px] font-medium text-white/90">
                        Rates and room availability synced to Booking.com, Airbnb &amp; Expedia in under 1 second.
                      </p>
                    </div>

                    <div className="flex-1 rounded-2xl border border-white/20 bg-brand-950/80 p-4 text-white backdrop-blur-md">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <MessageCircle className="size-4" />
                        <span className="text-[12px] font-bold uppercase tracking-wider">WhatsApp Confirmations</span>
                      </div>
                      <p className="mt-1 text-[13.5px] font-medium text-white/90">
                        Automated hotel booking confirmation campaigns dispatched instantly when a reservation is created.
                      </p>
                    </div>

                    <div className="flex-1 rounded-2xl border border-white/20 bg-brand-950/80 p-4 text-white backdrop-blur-md">
                      <div className="flex items-center gap-2 text-brand-300">
                        <Clock className="size-4" />
                        <span className="text-[12px] font-bold uppercase tracking-wider">4.2x Faster Turnaround</span>
                      </div>
                      <p className="mt-1 text-[13.5px] font-medium text-white/90">
                        Housekeeping floor plans instantly notify front desk when rooms are inspected and clean.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
