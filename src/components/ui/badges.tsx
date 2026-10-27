import { CheckCircle2, CircleDashed, CircleSlash, Sparkles, Ban, LogIn, LogOut, CalendarCheck } from "lucide-react";
import type { HousekeepingStatus, ReservationStatus } from "@/types";
import { cn } from "@/lib/utils";

export const hkMeta: Record<HousekeepingStatus, { label: string; cls: string; dot: string; Icon: typeof CheckCircle2 }> = {
  clean: { label: "Clean", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200", dot: "bg-emerald-500", Icon: CheckCircle2 },
  cleaning: { label: "Cleaning", cls: "bg-sky-50 text-sky-700 ring-sky-200", dot: "bg-sky-500", Icon: Sparkles },
  dirty: { label: "Dirty", cls: "bg-amber-50 text-amber-800 ring-amber-200", dot: "bg-amber-500", Icon: CircleDashed },
  "out-of-order": { label: "Out of order", cls: "bg-rose-50 text-rose-700 ring-rose-200", dot: "bg-rose-500", Icon: Ban },
};

export const resMeta: Record<ReservationStatus, { label: string; cls: string; block: string; Icon: typeof CheckCircle2 }> = {
  confirmed: { label: "Confirmed", cls: "bg-brand-50 text-brand-700 ring-brand-200", block: "bg-brand-500 text-white", Icon: CalendarCheck },
  "checked-in": { label: "Checked in", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200", block: "bg-emerald-600 text-white", Icon: LogIn },
  "checked-out": { label: "Checked out", cls: "bg-slate-100 text-slate-600 ring-slate-200", block: "bg-slate-300 text-slate-700", Icon: LogOut },
  cancelled: { label: "Cancelled", cls: "bg-rose-50 text-rose-700 ring-rose-200", block: "bg-rose-200 text-rose-800", Icon: CircleSlash },
};

/** Status badge: always text + icon, never colour alone. */
export function HkBadge({ status, className }: { status: HousekeepingStatus; className?: string }) {
  const m = hkMeta[status];
  return (
    <span className={cn("chip ring-1 ring-inset", m.cls, className)}>
      <m.Icon className="size-3" aria-hidden />
      {m.label}
    </span>
  );
}

export function ResBadge({ status, className }: { status: ReservationStatus; className?: string }) {
  const m = resMeta[status];
  return (
    <span className={cn("chip ring-1 ring-inset", m.cls, className)}>
      <m.Icon className="size-3" aria-hidden />
      {m.label}
    </span>
  );
}

export function DemoBadge({ children = "Demo data", className }: { children?: string; className?: string }) {
  return (
    <span className={cn("demo-badge", className)}>
      <span className="size-1.5 rounded-full bg-gold-500" aria-hidden />
      {children}
    </span>
  );
}
