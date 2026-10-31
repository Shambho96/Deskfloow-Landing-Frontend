"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import {
  BedDouble, CalendarCheck, CheckCheck, Globe2, LayoutDashboard, MessageCircle, RefreshCw, Sparkles, TrendingUp,
  UsersRound, UtensilsCrossed, BellRing, ArrowDownRight, ArrowUpRight,
} from "lucide-react";
import { propertySnapshot } from "@/lib/metrics";
import { demoHistory } from "@/data/demo-properties";
import { guestById } from "@/data/demo-guests";
import { hkMeta } from "@/components/ui/badges";
import { cn, inr } from "@/lib/utils";

const snap = propertySnapshot("grand-palace");
const revenue = demoHistory["grand-palace"].revenue;
const maxRev = Math.max(...revenue);

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const notes = [
  { icon: Globe2, title: "New direct booking received", meta: "RSV-1048 · Suite · 2 nights", tone: "brand" },
  { icon: Sparkles, title: "Room 204 is ready", meta: "Housekeeping marked clean", tone: "green" },
  { icon: CheckCheck, title: "Guest confirmation sent", meta: "WhatsApp template · demo", tone: "gold" },
] as const;

/** Hero product visual — the real interface, not a laptop mockup. */
export function HeroDashboard() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => !document.hidden && setN((x) => (x + 1) % notes.length), 3200);
    return () => clearInterval(id);
  }, []);
  const note = notes[n];

  return (
    <div className="relative">
      {/* gold accent ring behind the most important tile */}
      <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-[radial-gradient(60%_60%_at_50%_40%,rgb(140_92_255/0.25),transparent_70%)] blur-2xl" />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative overflow-hidden rounded-[22px] border border-border bg-card/90 shadow-2xl backdrop-blur-xl text-card-foreground"
        aria-label="DeskFloow dashboard preview"
        role="img"
      >
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-border bg-card/70 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="mx-auto flex items-center gap-2 rounded-md bg-muted px-3 py-1 text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" /> app.deskfloow · {snap.property.name}
          </div>
          <span className="chip bg-primary/10 text-primary font-semibold text-[11px]">Live PMS</span>
        </div>

        <div className="grid grid-cols-[52px_1fr]">
          <aside className="flex flex-col items-center gap-3 border-r border-border bg-muted/20 py-4">
            {[LayoutDashboard, CalendarCheck, BedDouble, UsersRound, MessageCircle, UtensilsCrossed].map((I, i) => (
              <span key={i} className={cn("grid size-8 place-items-center rounded-lg text-muted-foreground", i === 0 && "bg-brand-600 text-white shadow-md")}>
                <I className="size-4" />
              </span>
            ))}
          </aside>

          <div className="grid gap-3 p-3 sm:p-4">
            {/* KPI row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <motion.div variants={item} className="relative rounded-xl border border-gold-300 bg-gradient-to-br from-white to-gold-100/60 p-3 shadow-glow">
                <p className="text-[11px] font-medium text-muted-foreground">Occupancy</p>
                <p className="mt-1 text-[24px] font-semibold tracking-tight text-ink">{snap.occupancy}%</p>
                <div className="mt-2 h-1.5 rounded-full bg-brand-100">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-gold-400" initial={{ width: 0 }} animate={{ width: `${snap.occupancy}%` }} transition={{ delay: 1, duration: 1.2 }} />
                </div>
              </motion.div>
              <Kpi label="Arrivals today" value={String(snap.arrivals.length)} icon={ArrowDownRight} />
              <Kpi label="Departures" value={String(snap.departures.length)} icon={ArrowUpRight} />
              <Kpi label="Revenue today" value={inr(snap.revenueToday)} icon={TrendingUp} />
            </div>

            <div className="grid gap-3 md:grid-cols-[1.25fr_1fr]">
              {/* Revenue + room grid */}
              <motion.div variants={item} className="rounded-xl border border-line bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-semibold text-ink">Revenue · last 7 days</p>
                  <span className="text-[10.5px] text-muted-foreground">INR</span>
                </div>
                <div className="mt-3 flex h-20 items-end gap-1.5">
                  {revenue.map((v, i) => (
                    <motion.div
                      key={i}
                      className={cn("flex-1 rounded-t-md", i === 5 ? "bg-gold-400" : "bg-brand-300/80")}
                      initial={{ height: 0 }}
                      animate={{ height: `${(v / maxRev) * 100}%` }}
                      transition={{ delay: 0.9 + i * 0.06, duration: 0.6, ease: "easeOut" }}
                    />
                  ))}
                </div>
                <p className="mt-3 mb-2 text-[12px] font-semibold text-ink">Room availability</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {snap.rooms.map((r) => {
                    const occ = snap.inHouse.some((x) => x.roomId === r.id);
                    return (
                      <div key={r.id} className={cn("rounded-md border px-1.5 py-1 text-[10.5px]", occ ? "border-brand-200 bg-brand-50" : "border-line bg-white")}>
                        <div className="flex items-center justify-between font-semibold text-ink">
                          {r.number}
                          <span className={cn("size-1.5 rounded-full", hkMeta[r.housekeeping].dot)} />
                        </div>
                        <div className="text-muted-foreground">{occ ? "Occupied" : hkMeta[r.housekeeping].label}</div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <div className="grid gap-3">
                <motion.div variants={item} className="rounded-xl border border-line bg-white p-3">
                  <p className="text-[12px] font-semibold text-ink">Today&apos;s arrivals</p>
                  <ul className="mt-2 space-y-1.5">
                    {snap.arrivals.map((r) => (
                      <li key={r.id} className="flex items-center justify-between text-[11.5px]">
                        <span className="truncate text-ink">{guestById(r.guestId)?.name}</span>
                        <span className="text-muted-foreground">{r.source}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div variants={item} className="rounded-xl border border-line bg-brand-50/50 p-3">
                  <div className="flex items-center justify-between text-[11.5px] font-semibold text-brand-800">
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="size-3.5 text-brand-600" /> Confirmation Campaign
                    </span>
                    <span className="font-mono text-[10.5px] text-emerald-700">200 OK</span>
                  </div>
                  <p className="mt-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[11.5px] text-ink">
                    RSV-1048 · Meera Joshi · Suite 203 · Dispatched
                  </p>
                </motion.div>
                <motion.div variants={item} className="flex items-center justify-between rounded-xl border border-line bg-white p-3 text-[11.5px]">
                  <span className="flex items-center gap-2 font-medium text-ink">
                    <RefreshCw className="size-3.5 animate-spin text-brand-500 [animation-duration:3s]" /> OTA sync
                  </span>
                  <span className="text-muted-foreground">5 channels · demo</span>
                </motion.div>
                <motion.div variants={item} className="flex flex-wrap gap-1.5 rounded-xl border border-line bg-white p-3">
                  {(["clean", "cleaning", "dirty"] as const).map((s) => (
                    <span key={s} className="chip bg-brand-50 text-ink">
                      <span className={cn("size-1.5 rounded-full", hkMeta[s].dot)} />
                      {snap.rooms.filter((r) => r.housekeeping === s).length} {hkMeta[s].label}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating notification */}
      <div className="pointer-events-none absolute -bottom-6 -left-4 z-10 w-[260px] sm:-left-10" aria-live="off">
        <AnimatePresence mode="wait">
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 rounded-2xl border border-line bg-white/95 p-3 shadow-lift backdrop-blur"
          >
            <span
              className={cn(
                "grid size-9 place-items-center rounded-xl",
                note.tone === "brand" && "bg-brand-100 text-brand-700",
                note.tone === "green" && "bg-emerald-100 text-emerald-700",
                note.tone === "gold" && "bg-gold-100 text-gold-600",
              )}
            >
              <note.icon className="size-4" />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-ink">{note.title}</span>
              <span className="block text-[11.5px] text-muted-foreground">{note.meta}</span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6 }}
        className="pointer-events-none absolute -top-5 -right-3 z-10 hidden items-center gap-2 rounded-full border border-line bg-white/95 px-3 py-2 text-[12px] font-medium text-ink shadow-lift sm:flex"
      >
        <BellRing className="size-3.5 text-gold-500" /> {snap.pendingHk.length} rooms need housekeeping
      </motion.div>
    </div>
  );
}

function Kpi({ label, value, icon: Icon }: { label: string; value: string; icon: typeof TrendingUp }) {
  return (
    <motion.div variants={item} className="rounded-xl border border-line bg-white p-3">
      <p className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
        {label} <Icon className="size-3.5 text-brand-400" />
      </p>
      <p className="mt-1 text-[22px] font-semibold tracking-tight text-ink">{value}</p>
    </motion.div>
  );
}
