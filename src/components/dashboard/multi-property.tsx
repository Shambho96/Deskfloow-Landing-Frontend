"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Check, Lock, ShieldAlert } from "lucide-react";
import { useDemo } from "@/components/demo/demo-store";
import { CountUp } from "@/components/animations/count-up";
import { demoProperties } from "@/data/demo-properties";
import { cn, inr } from "@/lib/utils";
import type { StaffRole } from "@/types";

const ROLES: StaffRole[] = ["Owner", "Manager", "Front Desk", "Housekeeping"];

export const permissions: { feature: string; roles: StaffRole[]; sensitive?: boolean }[] = [
  { feature: "View reservations & tape chart", roles: ["Owner", "Manager", "Front Desk"] },
  { feature: "Check-in / check-out", roles: ["Owner", "Manager", "Front Desk"] },
  { feature: "Update room status", roles: ["Owner", "Manager", "Front Desk", "Housekeeping"] },
  { feature: "Send guest messages", roles: ["Owner", "Manager", "Front Desk"] },
  { feature: "Override dirty-room check-in", roles: ["Owner", "Manager"], sensitive: true },
  { feature: "Revenue reports & exports", roles: ["Owner", "Manager"], sensitive: true },
  { feature: "Shift cash register", roles: ["Owner", "Manager", "Front Desk"], sensitive: true },
  { feature: "Rates, channels & settings", roles: ["Owner"], sensitive: true },
];

export const can = (role: StaffRole, feature: string) => permissions.find((p) => p.feature === feature)?.roles.includes(role) ?? false;

export function PropertySwitcher() {
  const { state, setProperty, occupancy, arrivals, rooms, revenueToday, inHouse, reservations } = useDemo();
  const sources = new Map<string, number>();
  reservations.forEach((r) => sources.set(r.source, (sources.get(r.source) ?? 0) + 1));
  const top = [...sources].sort((a, b) => b[1] - a[1]).slice(0, 3);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Active property">
        {demoProperties.map((p) => {
          const active = p.id === state.propertyId;
          return (
            <button
              key={p.id}
              role="radio"
              aria-checked={active}
              onClick={() => setProperty(p.id)}
              className={cn("group relative overflow-hidden rounded-2xl text-left transition", active ? "ring-2 ring-gold-400 ring-offset-2" : "opacity-80 hover:opacity-100")}
            >
              <div className="relative aspect-[4/3]">
                <Image src={p.image} alt={`${p.name} (fictional demo property)`} fill sizes="(min-width: 1024px) 220px, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                <p className="text-[14px] font-semibold">{p.name}</p>
                <p className="text-[11.5px] text-white/70">{p.city} · {p.tagline}</p>
              </div>
              {active && <span className="absolute top-2 right-2 grid size-6 place-items-center rounded-full bg-gold-400 text-brand-950"><Check className="size-3.5" /></span>}
            </button>
          );
        })}
      </div>
      <motion.div key={state.propertyId} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card grid grid-cols-2 gap-3 p-4">
        <Metric label="Occupancy" value={occupancy} fmt={(n) => `${Math.round(n)}%`} />
        <Metric label="Arrivals today" value={arrivals.length} />
        <Metric label="Rooms available tonight" value={rooms.filter((r) => r.housekeeping !== "out-of-order").length - inHouse.length} />
        <Metric label="Revenue today" value={revenueToday} fmt={inr} />
        <div className="col-span-2 rounded-xl bg-brand-50 p-3 dark:bg-white/5">
          <p className="text-[11.5px] text-muted">Top booking sources</p>
          <p className="mt-1 text-[13px] font-medium">{top.map(([s, n]) => `${s} (${n})`).join(" · ")}</p>
        </div>
      </motion.div>
    </div>
  );
}

function Metric({ label, value, fmt }: { label: string; value: number; fmt?: (n: number) => string }) {
  return (
    <div className="rounded-xl border border-line p-3 dark:border-white/10">
      <p className="text-[11.5px] text-muted">{label}</p>
      <CountUp value={value} format={fmt} className="mt-1 block text-[22px] font-semibold tracking-tight" />
    </div>
  );
}

export function RolePermissions() {
  const { state, setRole } = useDemo();
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4 dark:border-white/10">
        <p className="text-[13.5px] font-semibold">Preview as role</p>
        <div className="flex flex-wrap gap-1 rounded-full bg-brand-50 p-1 dark:bg-white/5" role="radiogroup" aria-label="Staff role">
          {ROLES.map((r) => (
            <button key={r} role="radio" aria-checked={state.role === r} onClick={() => setRole(r)} className={cn("rounded-full px-3 py-1.5 text-[12.5px] font-medium transition", state.role === r ? "bg-brand-600 text-white" : "text-muted hover:text-ink")}>
              {r}
            </button>
          ))}
        </div>
      </div>
      <ul className="divide-y divide-line dark:divide-white/10">
        {permissions.map((p) => {
          const ok = p.roles.includes(state.role);
          return (
            <li key={p.feature} className="flex items-center justify-between gap-3 px-4 py-2.5 text-[13.5px]">
              <span className={cn("flex items-center gap-2", !ok && "text-muted")}>
                {p.feature}
                {p.sensitive && <span className="chip bg-gold-100 text-gold-600">Sensitive</span>}
              </span>
              {ok ? (
                <span className="chip bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"><Check className="size-3" /> Allowed</span>
              ) : (
                <span className="chip bg-slate-100 text-slate-600 ring-1 ring-slate-200"><Lock className="size-3" /> Restricted</span>
              )}
            </li>
          );
        })}
      </ul>
      <p className="flex items-start gap-2 border-t border-line bg-brand-50/50 px-4 py-3 text-[11.5px] text-muted dark:border-white/10 dark:bg-white/[0.02]">
        <ShieldAlert className="mt-0.5 size-3.5 shrink-0 text-gold-500" />
        Preview only. In production every permission must be enforced server-side — hiding a button in the interface is not security.
      </p>
    </div>
  );
}
