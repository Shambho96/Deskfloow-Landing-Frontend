"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, Search, Crown, Mail, Phone, MapPin, Receipt, MessageCircle, UtensilsCrossed, CalendarCheck } from "lucide-react";
import { useDemo } from "@/components/demo/demo-store";
import { ResBadge } from "@/components/ui/badges";
import { demoGuests } from "@/data/demo-guests";
import { demoProperties, demoRooms } from "@/data/demo-properties";
import { orderTotal } from "@/data/demo-orders";
import { shortDate } from "@/lib/dates";
import { cn, initials, inr, loyaltyTier, LOYALTY_THRESHOLDS } from "@/lib/utils";
import type { LoyaltyTier } from "@/types";
import { FolioDialog } from "./folio";

const tierCls: Record<LoyaltyTier, string> = {
  Platinum: "bg-gradient-to-r from-brand-700 to-brand-500 text-white",
  Gold: "bg-gold-100 text-gold-600 ring-1 ring-gold-300",
  Silver: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
  Bronze: "bg-orange-50 text-orange-800 ring-1 ring-orange-200",
};

export function GuestCrm({ initialQuery = "" }: { initialQuery?: string }) {
  const { state } = useDemo();
  const [q, setQ] = useState(initialQuery);
  const [view, setView] = useState<"cards" | "list">("list");
  const [tier, setTier] = useState<LoyaltyTier | "All">("All");
  const [selectedId, setSelectedId] = useState<string>(() => demoGuests.find((g) => initialQuery && g.name.toLowerCase().includes(initialQuery.toLowerCase()))?.id ?? "g6");
  const [folioFor, setFolioFor] = useState<string | null>(null);

  const guests = useMemo(
    () =>
      demoGuests.filter((g) => {
        const s = q.toLowerCase();
        const matches = !s || g.name.toLowerCase().includes(s) || g.phone.replace(/\s/g, "").includes(s.replace(/\s/g, "")) || g.email.includes(s) || g.city.toLowerCase().includes(s);
        return matches && (tier === "All" || loyaltyTier(g.lifetimeSpend) === tier);
      }),
    [q, tier],
  );
  const g = demoGuests.find((x) => x.id === selectedId)!;
  const stays = state.reservations.filter((r) => r.guestId === g.id).sort((a, b) => b.checkIn.localeCompare(a.checkIn));
  const msgs = state.conversations.filter((c) => c.guestId === g.id).reduce((n, c) => n + c.messages.length, 0);
  const orders = state.orders.filter((o) => o.guestId === g.id);
  const t = loyaltyTier(g.lifetimeSpend);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-line p-3 dark:border-white/10">
          <label className="relative min-w-[200px] flex-1">
            <span className="sr-only">Search guests</span>
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone, email, city" className="field pl-9 text-[13.5px]" />
          </label>
          <select value={tier} onChange={(e) => setTier(e.target.value as LoyaltyTier | "All")} className="field w-auto text-[13px]" aria-label="Filter by loyalty tier">
            <option>All</option>
            {LOYALTY_THRESHOLDS.map((x) => <option key={x.tier}>{x.tier}</option>)}
          </select>
          <div className="flex rounded-full bg-brand-50 p-0.5 dark:bg-white/5" role="group" aria-label="View">
            <button aria-pressed={view === "list"} aria-label="List view" onClick={() => setView("list")} className={cn("rounded-full p-1.5", view === "list" && "bg-white shadow-sm dark:bg-white/15")}><List className="size-4" /></button>
            <button aria-pressed={view === "cards"} aria-label="Card view" onClick={() => setView("cards")} className={cn("rounded-full p-1.5", view === "cards" && "bg-white shadow-sm dark:bg-white/15")}><LayoutGrid className="size-4" /></button>
          </div>
        </div>
        <div className="max-h-[520px] overflow-y-auto p-2 scrollbar-thin">
          {guests.length === 0 && <p className="p-8 text-center text-[13px] text-muted">No guests match.</p>}
          <ul className={cn(view === "cards" ? "grid gap-2 sm:grid-cols-2 xl:grid-cols-3" : "space-y-1")}>
            {guests.map((x) => {
              const xt = loyaltyTier(x.lifetimeSpend);
              return (
                <li key={x.id}>
                  <button
                    onClick={() => setSelectedId(x.id)}
                    aria-pressed={x.id === selectedId}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition hover:bg-brand-50 dark:hover:bg-white/5",
                      view === "cards" && "flex-col items-start border border-line dark:border-white/10",
                      x.id === selectedId && "bg-brand-50 ring-1 ring-brand-200 dark:bg-white/5",
                    )}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-[13px] font-semibold text-white">{initials(x.name)}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-medium">{x.name}</span>
                      <span className="block truncate text-[12px] text-muted">{x.city} · {x.stays} stays · {inr(x.lifetimeSpend)}</span>
                    </span>
                    <span className={cn("chip", tierCls[xt])}>{xt}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <aside className="card p-5" aria-label={`Guest profile: ${g.name}`}>
        <div className="flex items-start gap-4">
          <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 text-[18px] font-semibold text-white">{initials(g.name)}</span>
          <div className="flex-1">
            <p className="text-[18px] font-semibold tracking-tight">{g.name}</p>
            <span className={cn("chip mt-1", tierCls[t])}><Crown className="size-3" /> {t}{g.vip && " · VIP"}</span>
          </div>
        </div>
        <ul className="mt-4 space-y-1.5 text-[13px] text-muted">
          <li className="flex items-center gap-2"><Phone className="size-3.5" /> {g.phone}</li>
          <li className="flex items-center gap-2"><Mail className="size-3.5" /> {g.email}</li>
          <li className="flex items-center gap-2"><MapPin className="size-3.5" /> {g.city}</li>
        </ul>
        <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-brand-50 p-2.5 dark:bg-white/5"><dt className="text-[11px] text-muted">Lifetime spend</dt><dd className="text-[14px] font-semibold">{inr(g.lifetimeSpend)}</dd></div>
          <div className="rounded-xl bg-brand-50 p-2.5 dark:bg-white/5"><dt className="text-[11px] text-muted">Stays</dt><dd className="text-[14px] font-semibold">{g.stays}</dd></div>
          <div className="rounded-xl bg-brand-50 p-2.5 dark:bg-white/5"><dt className="text-[11px] text-muted">Messages</dt><dd className="text-[14px] font-semibold">{msgs}</dd></div>
        </dl>
        <div className="mt-4">
          <p className="mb-1.5 text-[11.5px] font-semibold tracking-wide text-muted uppercase">Preferences</p>
          <div className="flex flex-wrap gap-1.5">
            {g.preferences.length ? g.preferences.map((p) => <span key={p} className="chip bg-brand-100 text-brand-800">{p}</span>) : <span className="text-[12.5px] text-muted">None recorded</span>}
            {g.dietary && <span className="chip bg-emerald-100 text-emerald-800">Diet: {g.dietary}</span>}
          </div>
          {g.specialRequests && <p className="mt-2 rounded-lg bg-gold-100/60 p-2 text-[12.5px]">Request: {g.specialRequests}</p>}
        </div>
        <div className="mt-4">
          <p className="mb-1.5 flex items-center gap-1.5 text-[11.5px] font-semibold tracking-wide text-muted uppercase"><CalendarCheck className="size-3.5" /> Reservation history</p>
          <ul className="space-y-1.5">
            {stays.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-2 rounded-lg border border-line px-2.5 py-2 text-[12.5px] dark:border-white/10">
                <span>
                  <span className="font-medium">{r.id}</span> · {demoProperties.find((p) => p.id === r.propertyId)?.name}
                  <span className="block text-muted">Room {demoRooms.find((x) => x.id === r.roomId)?.number} · {shortDate(r.checkIn)} → {shortDate(r.checkOut)}</span>
                </span>
                <span className="flex flex-col items-end gap-1">
                  <ResBadge status={r.status} />
                  <button onClick={() => setFolioFor(r.id)} className="flex items-center gap-1 text-[11.5px] font-medium text-brand-700 hover:underline"><Receipt className="size-3" /> Folio</button>
                </span>
              </li>
            ))}
            {stays.length === 0 && <li className="text-[12.5px] text-muted">No demo reservations.</li>}
          </ul>
        </div>
        {orders.length > 0 && (
          <p className="mt-3 flex items-center gap-2 text-[12.5px] text-muted"><UtensilsCrossed className="size-3.5" /> {orders.length} orders · {inr(orders.reduce((s, o) => s + orderTotal(o), 0))}</p>
        )}
        {msgs > 0 && <p className="mt-1 flex items-center gap-2 text-[12.5px] text-muted"><MessageCircle className="size-3.5" /> WhatsApp conversation linked</p>}
        <p className="mt-4 text-[11px] text-muted">Synthetic profile. Government IDs are never shown in the public demo.</p>
      </aside>
      <FolioDialog reservationId={folioFor} onClose={() => setFolioFor(null)} />
    </div>
  );
}
