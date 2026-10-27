"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowDownRight, ArrowUpRight, Percent, IndianRupee, Wallet, Banknote, Crown, RotateCcw, Moon, Salad, CreditCard, ShieldAlert,
} from "lucide-react";
import { useDemo, guestOf } from "@/components/demo/demo-store";
import { CountUp } from "@/components/animations/count-up";
import { RevenueChart, OccupancyChart, SourceDonut, CategoryChart } from "@/components/charts/analytics-charts";
import { Dialog } from "@/components/ui/dialog";
import { HkBadge, ResBadge, hkMeta } from "@/components/ui/badges";
import { Button } from "@/components/ui/button";
import { demoShift } from "@/data/demo-properties";
import { shortDate } from "@/lib/dates";
import { cn, inr } from "@/lib/utils";
import type { HousekeepingStatus, Reservation } from "@/types";

export function KpiCards() {
  const { arrivals, departures, occupancy, revenueToday, outstanding, state } = useDemo();
  const kpis = [
    { label: "Arrivals today", value: arrivals.length, icon: ArrowDownRight },
    { label: "Departures today", value: departures.length, icon: ArrowUpRight },
    { label: "Occupancy", value: occupancy, icon: Percent, fmt: (n: number) => `${Math.round(n)}%`, accent: true },
    { label: "Revenue today", value: revenueToday, icon: IndianRupee, fmt: (n: number) => inr(n) },
    { label: "Outstanding balances", value: outstanding, icon: Wallet, fmt: (n: number) => inr(n) },
    { label: "Shift cash float", value: demoShift[state.propertyId].float, icon: Banknote, fmt: (n: number) => inr(n) },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {kpis.map((k) => (
        <div key={k.label} className={cn("card p-4", k.accent && "border-gold-300 shadow-glow")}>
          <p className="flex items-center justify-between text-[12px] font-medium text-muted">
            {k.label}
            <k.icon className={cn("size-4", k.accent ? "text-gold-500" : "text-brand-400")} />
          </p>
          <CountUp value={k.value} format={k.fmt} className="mt-2 block text-[22px] font-semibold tracking-tight text-ink dark:text-white" />
        </div>
      ))}
    </div>
  );
}

type Alert = { id: string; kind: string; icon: typeof Crown; tone: string; res: Reservation; text: string };

export function GuestAlerts() {
  const { reservations, rooms } = useDemo();
  const [open, setOpen] = useState<Alert | null>(null);
  const alerts: Alert[] = [];
  reservations.forEach((r) => {
    if (r.status === "cancelled" || r.status === "checked-out") return;
    const g = guestOf(r.guestId);
    if (g.vip && r.status === "confirmed") alerts.push({ id: r.id + "vip", kind: "VIP arrival", icon: Crown, tone: "text-gold-600 bg-gold-100", res: r, text: `${g.name} arrives ${shortDate(r.checkIn)}` });
    else if (g.returning && r.status === "confirmed") alerts.push({ id: r.id + "ret", kind: "Returning guest", icon: RotateCcw, tone: "text-brand-700 bg-brand-100", res: r, text: `${g.name} · stay #${g.stays + 1}` });
    if (r.notes?.toLowerCase().includes("late")) alerts.push({ id: r.id + "late", kind: "Late check-in", icon: Moon, tone: "text-sky-700 bg-sky-100", res: r, text: g.specialRequests ?? "Arriving late" });
    if (g.dietary && r.status === "checked-in") alerts.push({ id: r.id + "diet", kind: "Dietary request", icon: Salad, tone: "text-emerald-700 bg-emerald-100", res: r, text: `${g.name} · ${g.dietary}` });
    if (r.total - r.paid > 0 && r.status === "checked-in") alerts.push({ id: r.id + "pay", kind: "Outstanding payment", icon: CreditCard, tone: "text-rose-700 bg-rose-100", res: r, text: `${g.name} · ${inr(r.total - r.paid)} due` });
  });

  const g = open && guestOf(open.res.guestId);
  const room = open && rooms.find((x) => x.id === open.res.roomId);

  return (
    <div className="card p-4">
      <h4 className="mb-3 text-[13.5px] font-semibold">Guest alerts</h4>
      <ul className="space-y-1.5">
        {alerts.slice(0, 7).map((a) => (
          <li key={a.id}>
            <button onClick={() => setOpen(a)} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-brand-50 dark:hover:bg-white/5">
              <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg", a.tone)}><a.icon className="size-4" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium">{a.kind}</span>
                <span className="block truncate text-[12px] text-muted">{a.text}</span>
              </span>
              <span className="text-[11px] text-muted">{a.res.id}</span>
            </button>
          </li>
        ))}
      </ul>
      <Dialog open={!!open} onClose={() => setOpen(null)} title={open?.kind ?? ""} description={open ? `${open.res.id} · demo record` : undefined}>
        {open && g && room && (
          <div className="space-y-4 text-[14px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[16px] font-semibold">{g.name}</p>
                <p className="text-muted">{g.phone} · {g.city}</p>
              </div>
              <ResBadge status={open.res.status} />
            </div>
            <dl className="grid grid-cols-2 gap-3 rounded-xl bg-brand-50 p-3 text-[13px] dark:bg-white/5">
              <div><dt className="text-muted">Room</dt><dd className="font-medium">{room.number} · {room.category}</dd></div>
              <div><dt className="text-muted">Stay</dt><dd className="font-medium">{shortDate(open.res.checkIn)} → {shortDate(open.res.checkOut)}</dd></div>
              <div><dt className="text-muted">Source</dt><dd className="font-medium">{open.res.source}</dd></div>
              <div><dt className="text-muted">Balance</dt><dd className="font-medium">{inr(open.res.total - open.res.paid)}</dd></div>
            </dl>
            {(g.preferences.length > 0 || g.dietary || g.specialRequests) && (
              <div>
                <p className="mb-1.5 text-[12px] font-semibold text-muted uppercase">Preferences & requests</p>
                <div className="flex flex-wrap gap-1.5">
                  {g.preferences.map((p) => <span key={p} className="chip bg-brand-100 text-brand-800">{p}</span>)}
                  {g.dietary && <span className="chip bg-emerald-100 text-emerald-800">{g.dietary}</span>}
                </div>
                {g.specialRequests && <p className="mt-2 text-[13px]">“{g.specialRequests}”</p>}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => (toast.success("Alert acknowledged (demo)"), setOpen(null))}>Acknowledge</Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}

export function HousekeepingOverview() {
  const { rooms } = useDemo();
  const statuses: HousekeepingStatus[] = ["clean", "cleaning", "dirty", "out-of-order"];
  return (
    <div className="card p-4">
      <h4 className="mb-3 text-[13.5px] font-semibold">Housekeeping overview</h4>
      <div className="grid grid-cols-2 gap-2">
        {statuses.map((s) => {
          const n = rooms.filter((r) => r.housekeeping === s).length;
          return (
            <div key={s} className="rounded-xl border border-line p-3 dark:border-white/10">
              <HkBadge status={s} />
              <p className="mt-2 text-[22px] font-semibold">{n}</p>
              <p className="text-[11.5px] text-muted">{rooms.filter((r) => r.housekeeping === s).map((r) => r.number).join(", ") || "—"}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex h-2 overflow-hidden rounded-full" aria-hidden>
        {statuses.map((s) => (
          <div key={s} className={hkMeta[s].dot} style={{ width: `${(rooms.filter((r) => r.housekeeping === s).length / rooms.length) * 100}%` }} />
        ))}
      </div>
    </div>
  );
}

/** Today's arrivals with the dirty-room check-in guard. */
export function ArrivalsPanel() {
  const { arrivals, rooms, checkIn, state, setHousekeeping } = useDemo();
  const [blocked, setBlocked] = useState<{ id: string; msg: string } | null>(null);

  const tryCheckIn = (id: string, override = false) => {
    const err = checkIn(id, override);
    if (err) {
      if (override) toast.error(err);
      else setBlocked({ id, msg: err });
    } else {
      toast.success(`${id} checked in${override ? " with manager override" : ""} (demo)`);
      setBlocked(null);
    }
  };

  return (
    <div className="card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-[13.5px] font-semibold">Today&apos;s arrivals</h4>
        <span className="flex items-center gap-1 text-[11px] text-muted"><ShieldAlert className="size-3.5 text-gold-500" /> Dirty-room guard active</span>
      </div>
      <ul className="space-y-2">
        {arrivals.length === 0 && <li className="py-4 text-center text-[13px] text-muted">No arrivals today.</li>}
        {arrivals.map((r) => {
          const g = guestOf(r.guestId);
          const room = rooms.find((x) => x.id === r.roomId)!;
          return (
            <li key={r.id} className="rounded-xl border border-line p-3 dark:border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-[13.5px] font-medium">{g.name}</p>
                  <p className="text-[12px] text-muted">{r.id} · Room {room.number} · {r.source}</p>
                </div>
                <div className="flex items-center gap-2">
                  <HkBadge status={room.housekeeping} />
                  {r.status === "checked-in" ? (
                    <ResBadge status="checked-in" />
                  ) : (
                    <Button size="sm" onClick={() => tryCheckIn(r.id)}>Check in</Button>
                  )}
                </div>
              </div>
              {blocked?.id === r.id && r.status !== "checked-in" && (
                <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-[12.5px] text-amber-900" role="alert">
                  <p className="font-medium">Check-in blocked</p>
                  <p>{blocked.msg}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {room.housekeeping !== "out-of-order" && (
                      <button onClick={() => (setHousekeeping(room.id, "clean"), setBlocked(null), toast.success(`Room ${room.number} marked clean`))} className="rounded-full bg-white px-3 py-1 font-medium ring-1 ring-amber-300 hover:bg-amber-100">
                        Mark room clean
                      </button>
                    )}
                    <button onClick={() => tryCheckIn(r.id, true)} className="rounded-full bg-amber-600 px-3 py-1 font-medium text-white hover:bg-amber-700">
                      Override as {state.role}
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function FrontDeskDashboard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-4">
      <KpiCards />
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <RevenueChart />
        <SourceDonut />
      </div>
      {!compact && (
        <div className="grid gap-4 lg:grid-cols-2">
          <OccupancyChart />
          <CategoryChart />
        </div>
      )}
      <div className="grid gap-4 lg:grid-cols-3">
        <ArrivalsPanel />
        <GuestAlerts />
        <HousekeepingOverview />
      </div>
    </div>
  );
}
