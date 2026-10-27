"use client";

import { useState } from "react";
import { CheckCheck, Search, ShieldCheck, BadgeCheck, FileText, CheckCircle2 } from "lucide-react";
import { demoConversations, messageTemplates } from "@/data/demo-messages";
import { guestOf } from "@/data/demo-guests";
import { cn, initials } from "@/lib/utils";

export function WhatsAppInbox() {
  const [activeConvId, setActiveConvId] = useState<string>(demoConversations[0]?.id ?? "c1");
  const [search, setSearch] = useState("");

  const filtered = demoConversations.filter((c) => {
    const g = guestOf(c.guestId);
    const q = search.toLowerCase();
    return !q || g.name.toLowerCase().includes(q) || c.reservationId.toLowerCase().includes(q);
  });

  const active = demoConversations.find((c) => c.id === activeConvId) ?? demoConversations[0];
  const guest = active ? guestOf(active.guestId) : null;

  return (
    <div className="card grid overflow-hidden md:grid-cols-[300px_1fr]">
      {/* Left: Guest Conversations List */}
      <aside className="border-b border-border md:border-r md:border-b-0">
        <div className="border-b border-border bg-card/60 p-3">
          <label className="relative block">
            <span className="sr-only">Search conversations</span>
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guest or booking ID"
              className="field pl-9 text-[13px]"
            />
          </label>
        </div>

        <ul className="max-h-[260px] overflow-y-auto md:max-h-[500px] scrollbar-thin">
          {filtered.map((c) => {
            const g = guestOf(c.guestId);
            const last = c.messages[c.messages.length - 1];
            const isSelected = c.id === activeConvId;

            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setActiveConvId(c.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex w-full items-center gap-3 border-b border-border/50 p-3 text-left transition",
                    isSelected
                      ? "bg-primary/10 text-foreground"
                      : "hover:bg-muted/40 text-foreground",
                  )}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-500/15 font-bold text-emerald-600">
                    {initials(g.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-[13.5px] font-semibold">{g.name}</span>
                      <span className="text-[11px] text-muted-foreground">{last?.time}</span>
                    </div>
                    <p className="truncate text-[12px] text-muted-foreground mt-0.5">{last?.text}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Right: Authentic WhatsApp Chat View */}
      <main className="flex flex-col bg-muted/20">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-border bg-card p-3">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-emerald-500/15 font-bold text-emerald-600">
              {guest ? initials(guest.name) : "G"}
            </span>
            <div>
              <p className="flex items-center gap-1.5 text-[14px] font-bold text-foreground">
                {guest?.name}
                <BadgeCheck className="size-4 text-emerald-500" />
              </p>
              <p className="text-[12px] text-muted-foreground">
                {guest?.phone} · Verified WhatsApp Session
              </p>
            </div>
          </div>
          <span className="chip bg-emerald-500/10 text-emerald-500 font-semibold text-[11px]">
            <CheckCircle2 className="size-3" /> 2-Way Sync Active
          </span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 space-y-3 p-4 overflow-y-auto max-h-[380px] scrollbar-thin">
          {active?.messages.map((m) => {
            const isGuest = m.from === "guest";
            return (
              <div
                key={m.id}
                className={cn("flex flex-col", isGuest ? "items-start" : "items-end")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl p-3 text-[13.5px] shadow-sm leading-relaxed",
                    isGuest
                      ? "rounded-tl-xs bg-card border border-border text-foreground"
                      : "rounded-tr-xs bg-emerald-600 text-white font-normal",
                  )}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <div
                    className={cn(
                      "mt-1.5 flex items-center justify-end gap-1 text-[10.5px]",
                      isGuest ? "text-muted-foreground" : "text-white/80",
                    )}
                  >
                    <span>{m.time}</span>
                    {!isGuest && <CheckCheck className="size-3.5 text-sky-200" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Business API Footer Note */}
        <div className="border-t border-border bg-card/80 p-3 text-center text-[12px] text-muted-foreground flex items-center justify-center gap-2">
          <ShieldCheck className="size-4 text-emerald-500" />
          Official Meta WhatsApp Business Cloud API Integration · End-to-end encrypted
        </div>
      </main>
    </div>
  );
}

export function WhatsAppWorkflow() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {messageTemplates.map((t) => (
        <div key={t.key} className="card p-4">
          <div className="flex items-center gap-2 text-[13px] font-bold text-foreground">
            <FileText className="size-4 text-primary" />
            {t.label}
          </div>
          <p className="mt-1 text-[11px] text-emerald-600 font-medium">
            Meta Pre-Approved Template
          </p>
          <p className="mt-2 text-[12.5px] text-muted-foreground line-clamp-3 leading-relaxed">
            {t.body}
          </p>
        </div>
      ))}
    </div>
  );
}
