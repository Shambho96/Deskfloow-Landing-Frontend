"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, Search, Crown, Mail, Phone, MapPin, UtensilsCrossed } from "lucide-react";
import { demoGuests } from "@/data/demo-guests";
import { demoReservations } from "@/data/demo-reservations";
import { shortDate } from "@/lib/dates";
import { cn, initials, inr, loyaltyTier, LOYALTY_THRESHOLDS } from "@/lib/utils";
import type { LoyaltyTier } from "@/types";

const tierCls: Record<LoyaltyTier, string> = {
  Platinum: "bg-primary text-primary-foreground",
  Gold: "bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/30",
  Silver: "bg-slate-200/60 text-slate-700 ring-1 ring-border",
  Bronze: "bg-orange-500/15 text-orange-700 ring-1 ring-orange-500/30",
};

export function GuestCrm({ initialQuery = "" }: { initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery);
  const [view, setView] = useState<"cards" | "list">("list");
  const [tier, setTier] = useState<LoyaltyTier | "All">("All");
  const [selectedId, setSelectedId] = useState<string>(() => demoGuests.find((g) => initialQuery && g.name.toLowerCase().includes(initialQuery.toLowerCase()))?.id ?? "g6");

  const guests = useMemo(
    () =>
      demoGuests.filter((g) => {
        const s = q.toLowerCase();
        const matches = !s || g.name.toLowerCase().includes(s) || g.phone.replace(/\s/g, "").includes(s.replace(/\s/g, "")) || g.email.includes(s) || g.city.toLowerCase().includes(s);
        return matches && (tier === "All" || loyaltyTier(g.lifetimeSpend) === tier);
      }),
    [q, tier],
  );

  const g = demoGuests.find((x) => x.id === selectedId) ?? demoGuests[0];
  const stays = demoReservations.filter((r) => r.guestId === g.id).sort((a, b) => b.checkIn.localeCompare(a.checkIn));
  const t = loyaltyTier(g.lifetimeSpend);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-card/60 p-3">
          <label className="relative min-w-[200px] flex-1">
            <span className="sr-only">Search guest directory</span>
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, phone, email, city"
              className="field pl-9 text-[13.5px]"
            />
          </label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value as LoyaltyTier | "All")}
            className="field w-auto text-[13px]"
            aria-label="Filter by loyalty tier"
          >
            <option>All</option>
            {LOYALTY_THRESHOLDS.map((x) => (
              <option key={x.tier}>{x.tier}</option>
            ))}
          </select>
          <div className="flex rounded-full bg-muted p-0.5" role="group" aria-label="View switch">
            <button
              aria-pressed={view === "list"}
              aria-label="List view"
              onClick={() => setView("list")}
              className={cn("rounded-full p-1.5 transition", view === "list" && "bg-card shadow-sm text-foreground")}
            >
              <List className="size-4" />
            </button>
            <button
              aria-pressed={view === "cards"}
              aria-label="Card view"
              onClick={() => setView("cards")}
              className={cn("rounded-full p-1.5 transition", view === "cards" && "bg-card shadow-sm text-foreground")}
            >
              <LayoutGrid className="size-4" />
            </button>
          </div>
        </div>

        <div className="max-h-[520px] overflow-y-auto p-2 scrollbar-thin">
          {guests.length === 0 && <p className="p-8 text-center text-[13px] text-muted-foreground">No guests match.</p>}
          <ul className={cn(view === "cards" ? "grid gap-2 sm:grid-cols-2" : "space-y-1")}>
            {guests.map((x) => {
              const xt = loyaltyTier(x.lifetimeSpend);
              const isSelected = x.id === selectedId;
              return (
                <li key={x.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(x.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition",
                      view === "cards" && "flex-col items-start border border-border/70",
                      isSelected
                        ? "bg-primary/10 ring-1 ring-primary/40 text-foreground"
                        : "hover:bg-muted/50 text-foreground",
                    )}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-[13px] font-bold text-primary-foreground">
                      {initials(x.name)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-semibold">{x.name}</span>
                      <span className="block truncate text-[12px] text-muted-foreground">
                        {x.city} · {x.stays} stays · {inr(x.lifetimeSpend)}
                      </span>
                    </span>
                    <span className={cn("chip", tierCls[xt])}>{xt}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Guest Profile Sidebar */}
      <aside className="card p-5" aria-label={`Guest profile: ${g.name}`}>
        <div className="flex items-start gap-4">
          <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-[18px] font-bold text-primary-foreground shadow-sm">
            {initials(g.name)}
          </span>
          <div className="flex-1">
            <p className="text-[18px] font-bold tracking-tight text-foreground">{g.name}</p>
            <span className={cn("chip mt-1 font-semibold", tierCls[t])}>
              <Crown className="size-3" /> {t}{g.vip && " · VIP"}
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-[13px]">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Phone className="size-4 text-primary" /> {g.phone}
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Mail className="size-4 text-primary" /> {g.email}
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <MapPin className="size-4 text-primary" /> {g.city}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-border/80 bg-muted/30 p-3 text-[12.5px]">
          <div>
            <span className="text-muted-foreground block">Completed stays</span>
            <span className="text-[16px] font-bold text-foreground">{g.stays}</span>
          </div>
          <div>
            <span className="text-muted-foreground block">Lifetime revenue</span>
            <span className="text-[16px] font-bold text-primary">{inr(g.lifetimeSpend)}</span>
          </div>
        </div>

        {(g.preferences.length > 0 || g.dietary || g.specialRequests) && (
          <div className="mt-5">
            <p className="text-[12px] font-semibold text-muted-foreground uppercase">Preferences &amp; Notes</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {g.preferences.map((p) => (
                <span key={p} className="chip bg-primary/10 text-primary font-medium">{p}</span>
              ))}
              {g.dietary && (
                <span className="chip bg-emerald-500/10 text-emerald-500 font-medium">
                  <UtensilsCrossed className="size-3" /> {g.dietary}
                </span>
              )}
            </div>
            {g.specialRequests && (
              <p className="mt-2 text-[12.5px] italic text-muted-foreground">“{g.specialRequests}”</p>
            )}
          </div>
        )}

        <div className="mt-5 border-t border-border pt-4">
          <p className="text-[12px] font-semibold text-muted-foreground uppercase">Recent Stays</p>
          <ul className="mt-2 space-y-1.5 text-[12px]">
            {stays.slice(0, 3).map((s) => (
              <li key={s.id} className="flex justify-between text-muted-foreground">
                <span className="font-mono text-foreground">{s.id}</span>
                <span>{shortDate(s.checkIn)} → {shortDate(s.checkOut)}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
