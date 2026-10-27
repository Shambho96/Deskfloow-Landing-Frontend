"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Check, Lock } from "lucide-react";
import { CountUp } from "@/components/animations/count-up";
import { demoProperties } from "@/data/demo-properties";
import { propertySnapshot } from "@/lib/metrics";
import { cn, inr } from "@/lib/utils";
import type { PropertyId, StaffRole } from "@/types";

const ROLES: StaffRole[] = ["Owner", "Manager", "Front Desk", "Housekeeping"];

export const permissions: { feature: string; roles: StaffRole[]; sensitive?: boolean }[] = [
  { feature: "View reservations & tape chart", roles: ["Owner", "Manager", "Front Desk"] },
  { feature: "Automated check-in & keycard release", roles: ["Owner", "Manager", "Front Desk"] },
  { feature: "Update room status & housekeeping", roles: ["Owner", "Manager", "Front Desk", "Housekeeping"] },
  { feature: "Send guest WhatsApp messages", roles: ["Owner", "Manager", "Front Desk"] },
  { feature: "Manager check-in override", roles: ["Owner", "Manager"], sensitive: true },
  { feature: "Financial revenue reports & exports", roles: ["Owner", "Manager"], sensitive: true },
  { feature: "Shift cash register & drawer audit", roles: ["Owner", "Manager", "Front Desk"], sensitive: true },
  { feature: "OTA rates, channels & inventory settings", roles: ["Owner"], sensitive: true },
];

export function PropertySwitcher() {
  const [activeProperty, setActiveProperty] = useState<PropertyId>("grand-palace");
  const snap = propertySnapshot(activeProperty);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Active property preview">
        {demoProperties.map((p) => {
          const active = p.id === activeProperty;
          return (
            <button
              type="button"
              key={p.id}
              role="radio"
              aria-checked={active}
              onClick={() => setActiveProperty(p.id)}
              className={cn(
                "group relative overflow-hidden rounded-2xl text-left transition",
                active ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "opacity-80 hover:opacity-100",
              )}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 220px, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                <p className="text-[14px] font-semibold">{p.name}</p>
                <p className="text-[11.5px] text-white/80">{p.city} · {p.tagline}</p>
              </div>
              {active && (
                <span className="absolute top-2 right-2 grid size-6 place-items-center rounded-full bg-primary text-primary-foreground shadow">
                  <Check className="size-3.5" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeProperty}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="card grid grid-cols-2 gap-3 p-4"
      >
        <Metric label="Occupancy" value={snap.occupancy} fmt={(n) => `${Math.round(n)}%`} />
        <Metric label="Arrivals today" value={snap.arrivals.length} />
        <Metric label="Available rooms" value={snap.rooms.length - snap.inHouse.length} />
        <Metric label="Revenue today" value={snap.revenueToday} fmt={inr} />
        <div className="col-span-2 rounded-xl bg-muted/40 p-3">
          <p className="text-[11.5px] font-medium text-muted-foreground">Top Booking Channels</p>
          <p className="mt-1 text-[13px] font-semibold text-foreground">
            Direct Engine (52%) · Booking.com (26%) · MakeMyTrip (14%)
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function Metric({ label, value, fmt }: { label: string; value: number; fmt?: (n: number) => string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/60 p-3">
      <p className="text-[11.5px] text-muted-foreground">{label}</p>
      <CountUp value={value} format={fmt} className="mt-1 block text-[22px] font-bold tracking-tight text-foreground" />
    </div>
  );
}

export function RolePermissions() {
  const [role, setRole] = useState<StaffRole>("Owner");

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card/60 p-4">
        <p className="text-[13.5px] font-bold text-foreground">Role-Based Access Control</p>
        <div className="flex flex-wrap gap-1 rounded-full bg-muted p-1" role="radiogroup" aria-label="Staff role">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              role="radio"
              aria-checked={role === r}
              onClick={() => setRole(r)}
              className={cn(
                "rounded-full px-3 py-1.5 text-[12.5px] font-medium transition",
                role === r
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <ul className="divide-y divide-border/60">
        {permissions.map((p) => {
          const ok = p.roles.includes(role);
          return (
            <li key={p.feature} className="flex items-center justify-between gap-3 px-4 py-2.5 text-[13px]">
              <span className="flex items-center gap-2 text-foreground">
                {ok ? (
                  <span className="grid size-5 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <Check className="size-3" />
                  </span>
                ) : (
                  <span className="grid size-5 place-items-center rounded-full bg-muted text-muted-foreground">
                    <Lock className="size-3" />
                  </span>
                )}
                {p.feature}
              </span>
              <span className="flex items-center gap-2">
                {p.sensitive && (
                  <span className="chip bg-amber-500/10 text-amber-500 font-medium">Restricted</span>
                )}
                <span className={cn("text-[12px] font-semibold", ok ? "text-emerald-500" : "text-muted-foreground")}>
                  {ok ? "Granted" : "Blocked"}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
