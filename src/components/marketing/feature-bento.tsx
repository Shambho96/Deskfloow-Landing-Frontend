"use client";

import { motion, type Variants } from "motion/react";
import { useState } from "react";
import {
  BedDouble, CalendarRange, Network, MessageCircle, Sparkles, UsersRound, Globe2, BarChart3, RefreshCw, Check, Minus, Plus,
  ChevronLeft, ChevronRight, Crown,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/reveal";
import { HkBadge } from "@/components/ui/badges";
import { cn, inr } from "@/lib/utils";
import type { HousekeepingStatus } from "@/types";

const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const cell: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function Card({ className, icon: Icon, title, text, children }: { className?: string; icon: typeof BedDouble; title: string; text: string; children?: React.ReactNode }) {
  return (
    <motion.article
      variants={cell}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn("group card relative flex flex-col overflow-hidden p-6 transition-shadow duration-300 hover:shadow-lift", className)}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-xl bg-brand-100 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
          <Icon className="size-4.5" />
        </span>
        <h3 className="text-[17px] font-semibold tracking-tight text-ink">{title}</h3>
      </div>
      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{text}</p>
      {children && <div className="mt-5 flex-1">{children}</div>}
    </motion.article>
  );
}

/** Interactive mini: front-desk check-in. */
function FrontDeskMini() {
  const [done, setDone] = useState<string[]>([]);
  const rows = [
    { id: "a", name: "Meera Joshi", room: "203 · Suite" },
    { id: "b", name: "Kabir Rao", room: "204 · Deluxe" },
    { id: "c", name: "Sara Thomas", room: "103 · Deluxe" },
  ];
  return (
    <ul className="space-y-2">
      {rows.map((r) => {
        const ok = done.includes(r.id);
        return (
          <li key={r.id} className="flex items-center justify-between rounded-xl border border-line bg-brand-50/40 px-3 py-2.5">
            <span>
              <span className="block text-[13.5px] font-medium text-ink">{r.name}</span>
              <span className="block text-[12px] text-muted-foreground">Room {r.room}</span>
            </span>
            <button
              onClick={() => setDone((d) => (ok ? d.filter((x) => x !== r.id) : [...d, r.id]))}
              className={cn(
                "flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-medium transition",
                ok ? "bg-emerald-100 text-emerald-700" : "bg-brand-600 text-white hover:bg-brand-700",
              )}
              aria-pressed={ok}
            >
              {ok ? (<><Check className="size-3.5" /> Checked in</>) : "Check in"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Interactive mini: tape chart with day navigation. */
function TapeMini() {
  const [offset, setOffset] = useState(0);
  const bars = [
    { row: 0, start: 0, len: 3, name: "Mehta" },
    { row: 1, start: 1, len: 4, name: "Nair" },
    { row: 2, start: 3, len: 3, name: "Thomas" },
    { row: 3, start: 0, len: 2, name: "Iyer" },
    { row: 3, start: 4, len: 3, name: "Gupta" },
  ];
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[12px] text-muted-foreground">
        <span>{offset === 0 ? "This week" : `+${offset} days`}</span>
        <span className="flex gap-1">
          <button aria-label="Previous days" onClick={() => setOffset((o) => Math.max(0, o - 1))} className="rounded-md border border-line p-1 hover:bg-brand-50"><ChevronLeft className="size-3.5" /></button>
          <button aria-label="Next days" onClick={() => setOffset((o) => Math.min(3, o + 1))} className="rounded-md border border-line p-1 hover:bg-brand-50"><ChevronRight className="size-3.5" /></button>
        </span>
      </div>
      <div className="relative grid grid-rows-4 gap-1.5 overflow-hidden rounded-xl border border-line bg-[repeating-linear-gradient(90deg,transparent_0_calc(100%/7-1px),var(--color-line)_calc(100%/7-1px)_calc(100%/7))] p-1.5">
        {[0, 1, 2, 3].map((r) => (
          <div key={r} className="relative h-7">
            {bars.filter((b) => b.row === r).map((b) => (
              <motion.div
                key={b.name}
                animate={{ left: `${((b.start - offset) / 7) * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
                style={{ width: `${(b.len / 7) * 100}%` }}
                className={cn("absolute inset-y-0 truncate rounded-md px-2 text-[11px] leading-7 font-medium text-white", r === 2 ? "bg-gold-500" : "bg-brand-500")}
              >
                {b.name}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Interactive mini: OTA sync. */
function OtaMini() {
  const [state, setState] = useState<"idle" | "sync" | "done">("idle");
  const sync = () => {
    setState("sync");
    setTimeout(() => setState("done"), 1400);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1.5">
        {["Direct", "Booking.com", "Agoda", "Expedia", "MakeMyTrip"].map((c, i) => (
          <motion.span
            key={c}
            animate={state === "sync" ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
            transition={{ duration: 0.8, repeat: state === "sync" ? Infinity : 0, delay: i * 0.1 }}
            className="chip border border-white/15 bg-white/10 text-white"
          >
            <span className={cn("size-1.5 rounded-full", state === "done" ? "bg-emerald-400" : "bg-gold-300")} /> {c}
          </motion.span>
        ))}
      </div>
      <button onClick={sync} disabled={state === "sync"} className="flex w-fit items-center gap-2 rounded-full bg-gold-400 px-4 py-2 text-[13px] font-medium text-brand-950 transition hover:bg-gold-300 disabled:opacity-70">
        <RefreshCw className={cn("size-3.5", state === "sync" && "animate-spin")} />
        {state === "sync" ? "Synchronising…" : state === "done" ? "Synced · run again" : "Simulate inventory sync"}
      </button>
      <p className="text-[11.5px] text-white/55">Demo simulation — no live OTA connection.</p>
    </div>
  );
}

/** Interactive mini: WhatsApp booking confirmation campaign preview. */
function WhatsMini() {
  const [sent, setSent] = useState(true);
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-[11.5px]">
        <span className="chip bg-brand-100 text-brand-800 font-semibold">Template: BOOKING_CONFIRM</span>
        <span className="font-semibold text-emerald-700">{sent ? "Dispatched · 200 OK" : "Dispatching…"}</span>
      </div>
      <motion.div
        key={String(sent)}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-line bg-brand-50/40 p-3 text-[12px]"
      >
        <div className="flex items-center justify-between font-semibold text-ink">
          <span>Meera Joshi · Suite 203</span>
          <span className="font-mono text-[11px] text-brand-700">RSV-1048</span>
        </div>
        <p className="mt-1 text-[11.5px] text-muted-foreground">
          Check-in 12 Nov · Auto-triggered via confirmation campaign API
        </p>
      </motion.div>
      <button
        type="button"
        onClick={() => {
          setSent(false);
          setTimeout(() => setSent(true), 600);
        }}
        className="w-full rounded-lg bg-brand-600 px-3 py-1.5 text-[12px] font-medium text-white transition hover:bg-brand-700"
      >
        Simulate Campaign Dispatch
      </button>
    </div>
  );
}

/** Interactive mini: housekeeping status cycle. */
function HkMini() {
  const order: HousekeepingStatus[] = ["dirty", "cleaning", "clean"];
  const [rooms, setRooms] = useState<Record<string, HousekeepingStatus>>({ "103": "dirty", "204": "cleaning", "201": "clean" });
  return (
    <div className="grid grid-cols-3 gap-2">
      {Object.entries(rooms).map(([n, s]) => (
        <button
          key={n}
          onClick={() => setRooms((r) => ({ ...r, [n]: order[(order.indexOf(s) + 1) % order.length] }))}
          className="flex flex-col items-start gap-1.5 rounded-xl border border-line p-2.5 text-left transition hover:border-brand-300"
          aria-label={`Room ${n}: ${s}. Click to advance status`}
        >
          <span className="text-[14px] font-semibold text-ink">{n}</span>
          <HkBadge status={s} />
        </button>
      ))}
    </div>
  );
}

/** Interactive mini: booking engine total. */
function BookingMini() {
  const [nights, setNights] = useState(2);
  const rate = 6900;
  return (
    <div className="rounded-xl border border-line p-3">
      <div className="flex items-center justify-between text-[13px]">
        <span className="text-muted-foreground">Premium room · {inr(rate)}/night</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button aria-label="Fewer nights" onClick={() => setNights((n) => Math.max(1, n - 1))} className="grid size-7 place-items-center rounded-full border border-line hover:bg-brand-50"><Minus className="size-3" /></button>
          <span className="w-16 text-center text-[13px] font-medium">{nights} night{nights > 1 && "s"}</span>
          <button aria-label="More nights" onClick={() => setNights((n) => Math.min(14, n + 1))} className="grid size-7 place-items-center rounded-full border border-line hover:bg-brand-50"><Plus className="size-3" /></button>
        </div>
        <motion.span key={nights} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-[18px] font-semibold text-ink">
          {inr(rate * nights)}
        </motion.span>
      </div>
    </div>
  );
}

export function FeatureBento() {
  return (
    <section id="platform" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="The platform"
          title={<>Everything your hotel runs on, <span className="text-brand-600">connected.</span></>}
          lead="Eight modules that share one reservation record, one guest profile and one room status — so a change in one place is reflected everywhere."
        />
        <motion.div
          variants={grid}
          initial="hidden"
          animate="show"
          className="mt-14 grid gap-4 md:grid-cols-6"
        >
          <Card className="md:col-span-3 md:row-span-2" icon={BedDouble} title="Front Desk & PMS" text="Arrivals, departures, room assignments, folios and shift handovers on one screen. Try checking in a guest.">
            <FrontDeskMini />
          </Card>
          <Card className="md:col-span-3" icon={CalendarRange} title="Visual Tape Chart" text="A seven-day room matrix with drag-and-drop reassignment and overlap protection.">
            <TapeMini />
          </Card>
          <motion.article
            variants={cell}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl bg-brand-900 p-6 text-white shadow-lift md:col-span-3"
          >
            <div className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-brand-500/40 blur-3xl" />
            <div className="relative flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-white/10 text-gold-300"><Network className="size-4.5" /></span>
              <h3 className="text-[17px] font-semibold tracking-tight">OTA Channel Manager</h3>
            </div>
            <p className="relative mt-2 mb-5 text-[14px] text-white/70">Keep availability aligned across your direct site and connected channels from one inventory.</p>
            <div className="relative"><OtaMini /></div>
          </motion.article>
          <Card className="md:col-span-2" icon={MessageCircle} title="WhatsApp Booking Confirmations" text="Automated one-way booking confirmation campaign dispatch on every reservation.">
            <WhatsMini />
          </Card>
          <Card className="md:col-span-2" icon={Sparkles} title="Housekeeping" text="Tap a room to move it through the cleaning flow.">
            <HkMini />
          </Card>
          <Card className="md:col-span-2" icon={UsersRound} title="Guest CRM" text="Preferences, stay history and loyalty tier at a glance.">
            <div className="flex items-center gap-3 rounded-xl border border-line p-3">
              <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-[13px] font-semibold text-white">AI</span>
              <div className="flex-1">
                <p className="text-[13.5px] font-medium text-ink">Ananya Iyer</p>
                <p className="text-[12px] text-muted-foreground">9 stays · Gluten-free · Lake view</p>
              </div>
              <span className="chip bg-gold-100 text-gold-600"><Crown className="size-3" /> Platinum</span>
            </div>
          </Card>
          <Card className="md:col-span-3" icon={Globe2} title="Direct Booking Engine" text="A mobile-first booking page with transparent totals and instant confirmation previews.">
            <BookingMini />
          </Card>
          <Card className="md:col-span-3" icon={BarChart3} title="Revenue & Analytics" text="Occupancy, revenue trend and booking-source mix, ready each morning.">
            <svg viewBox="0 0 300 70" className="h-[70px] w-full" aria-label="Sample revenue trend line">
              <defs>
                <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#8C5CFF" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#8C5CFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 52 L50 44 L100 48 L150 34 L200 26 L250 10 L300 30 L300 70 L0 70Z" fill="url(#spark)" />
              <motion.path d="M0 52 L50 44 L100 48 L150 34 L200 26 L250 10 L300 30" fill="none" stroke="#7340eb" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: "easeOut" }} />
              <circle cx="250" cy="10" r="4.5" fill="#FFC95C" stroke="white" strokeWidth="2" />
            </svg>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
