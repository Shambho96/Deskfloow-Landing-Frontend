"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Search,
  ShieldCheck,
  Send,
  CheckCircle2,
  Sparkles,
  FileCheck2,
  BarChart3,
  Zap,
  Clock,
  RefreshCw,
  Code2,
} from "lucide-react";
import { demoConversations } from "@/data/demo-messages";
import { guestOf } from "@/data/demo-guests";
import { demoProperties } from "@/data/demo-properties";
import { cn } from "@/lib/utils";

export function WhatsAppInbox() {
  const [activeConvId, setActiveConvId] = useState<string>(demoConversations[0]?.id ?? "c1");
  const [search, setSearch] = useState("");
  const [resentId, setResentId] = useState<string | null>(null);

  const filtered = demoConversations.filter((c) => {
    const g = guestOf(c.guestId);
    const q = search.toLowerCase();
    return !q || g.name.toLowerCase().includes(q) || c.reservationId.toLowerCase().includes(q);
  });

  const active = demoConversations.find((c) => c.id === activeConvId) ?? demoConversations[0];
  const guest = active ? guestOf(active.guestId) : null;
  const property = active ? demoProperties.find((p) => p.id === active.propertyId) : null;
  const confirmationMsg = active?.messages[0];

  const handleResend = (id: string) => {
    setResentId(id);
    setTimeout(() => setResentId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Top Campaign Telemetry KPI Strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="card p-4">
          <p className="text-[11.5px] font-medium text-muted-foreground">Active Campaign Rule</p>
          <p className="mt-1 flex items-center gap-2 text-[15px] font-bold text-foreground">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse-soft" />
            On Booking Confirmed
          </p>
          <p className="mt-1 text-[11.5px] text-muted-foreground">One-way transactional dispatch</p>
        </div>
        <div className="card p-4">
          <p className="text-[11.5px] font-medium text-muted-foreground">Template Identifier</p>
          <p className="mt-1 font-mono text-[13.5px] font-bold text-primary truncate">
            HOTEL_BOOKING_CONFIRM
          </p>
          <p className="mt-1 text-[11.5px] text-muted-foreground">Pre-approved Meta Cloud API</p>
        </div>
        <div className="card p-4">
          <p className="text-[11.5px] font-medium text-muted-foreground">Delivery Success Rate</p>
          <p className="mt-1 text-[20px] font-bold tracking-tight text-foreground">99.8%</p>
          <p className="mt-0.5 text-[11.5px] text-emerald-600 font-medium">Verified delivery telemetry</p>
        </div>
        <div className="card p-4">
          <p className="text-[11.5px] font-medium text-muted-foreground">Avg. Trigger Latency</p>
          <p className="mt-1 text-[20px] font-bold tracking-tight text-foreground">0.8s</p>
          <p className="mt-0.5 text-[11.5px] text-muted-foreground">Instant PMS &amp; OTA webhook</p>
        </div>
      </div>

      {/* Campaign Dispatch Console & Payload Inspector */}
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-brand-50/50 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <Send className="size-4" />
            </span>
            <div>
              <p className="text-[14px] font-bold text-foreground">
                Outbound Booking Confirmation Dispatch Log
              </p>
              <p className="text-[12px] text-muted-foreground">
                Automated campaign broadcast ledger · Select any reservation to inspect rendered variables
              </p>
            </div>
          </div>

          <label className="relative w-full sm:w-64">
            <span className="sr-only">Filter dispatch log</span>
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by guest or RSV ID..."
              className="field py-1.5 pl-9 text-[12.5px]"
            />
          </label>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          {/* Left: Structured Transactional Dispatch Audit Table */}
          <div className="border-b border-border lg:border-r lg:border-b-0">
            <div className="grid grid-cols-[100px_1fr_95px_100px] gap-2 border-b border-border/70 bg-muted/40 px-4 py-2.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              <span>Booking ID</span>
              <span>Recipient &amp; Property</span>
              <span>Dispatched</span>
              <span className="text-right">Status</span>
            </div>

            <div className="divide-y divide-border/60">
              {filtered.map((c) => {
                const g = guestOf(c.guestId);
                const prop = demoProperties.find((p) => p.id === c.propertyId);
                const last = c.messages[0];
                const isSelected = c.id === activeConvId;

                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveConvId(c.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "grid w-full grid-cols-[100px_1fr_95px_100px] items-center gap-2 px-4 py-3 text-left text-[13px] transition",
                      isSelected
                        ? "bg-primary/8 font-medium text-foreground"
                        : "hover:bg-muted/40 text-foreground",
                    )}
                  >
                    <span className="font-mono text-[12.5px] font-semibold text-primary">
                      {c.reservationId}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-foreground">{g.name}</span>
                      <span className="block truncate text-[11.5px] text-muted-foreground">
                        {prop?.name ?? "Grand Palace"} · {g.phone}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-[11.5px] text-muted-foreground">
                      <Clock className="size-3" /> {last?.time}
                    </span>
                    <span className="flex justify-end">
                      <span
                        className={cn(
                          "chip text-[10.5px] font-semibold",
                          last?.status === "read"
                            ? "bg-primary/10 text-primary"
                            : "bg-emerald-500/10 text-emerald-700",
                        )}
                      >
                        <CheckCircle2 className="size-3" />
                        {last?.status === "read" ? "Opened" : "Delivered"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Transactional Payload & Variable Inspector */}
          <div className="flex flex-col justify-between bg-muted/15 p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active?.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                  <div>
                    <p className="text-[11px] font-bold tracking-wider text-primary uppercase">
                      Dispatch Payload Inspector
                    </p>
                    <p className="mt-0.5 text-[15px] font-bold text-foreground">
                      {guest?.name} · <span className="font-mono text-primary">{active?.reservationId}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => active && handleResend(active.id)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-[12px] font-semibold text-primary-foreground shadow-xs transition hover:opacity-95"
                  >
                    <RefreshCw className={cn("size-3.5", resentId === active?.id && "animate-spin")} />
                    {resentId === active?.id ? "Re-Dispatched ✓" : "Trigger Re-Dispatch"}
                  </button>
                </div>

                {/* Dynamic Template Variables Mapped from PMS */}
                <div className="rounded-xl border border-border bg-card p-3.5">
                  <p className="flex items-center gap-1.5 text-[11.5px] font-semibold text-muted-foreground">
                    <Code2 className="size-3.5 text-primary" /> Auto-Populated PMS Template Variables
                  </p>
                  <div className="mt-2.5 grid grid-cols-2 gap-2 text-[12px]">
                    <div className="rounded-lg bg-muted/50 px-2.5 py-1.5">
                      <span className="font-mono text-[10.5px] text-muted-foreground">{"{{guest_name}}"}</span>
                      <p className="font-semibold text-foreground">{guest?.name}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 px-2.5 py-1.5">
                      <span className="font-mono text-[10.5px] text-muted-foreground">{"{{booking_ref}}"}</span>
                      <p className="font-mono font-semibold text-primary">{active?.reservationId}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 px-2.5 py-1.5">
                      <span className="font-mono text-[10.5px] text-muted-foreground">{"{{property}}"}</span>
                      <p className="font-semibold text-foreground truncate">{property?.name ?? "Grand Palace"}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 px-2.5 py-1.5">
                      <span className="font-mono text-[10.5px] text-muted-foreground">{"{{recipient}}"}</span>
                      <p className="font-semibold text-foreground">{guest?.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Rendered Outbound Notification Payload (Enterprise Card — NOT Chat Bubble) */}
                <div className="rounded-xl border border-primary/20 bg-card p-4 shadow-2xs">
                  <div className="mb-2.5 flex items-center justify-between border-b border-border pb-2 text-[11px] font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5 text-foreground">
                      <Sparkles className="size-3.5 text-primary" /> Rendered Confirmation Document
                    </span>
                    <span className="chip bg-emerald-500/10 text-emerald-700">Verified Template</span>
                  </div>
                  <pre className="whitespace-pre-line font-sans text-[12.5px] leading-relaxed text-foreground">
                    {confirmationMsg?.text}
                  </pre>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11.5px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-500" />
                One-way automated booking confirmation service
              </span>
              <span className="font-mono text-[11px]">Webhook: 200 OK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const campaignFeatures = [
  {
    icon: Zap,
    title: "Instant Booking Trigger",
    subtitle: "Automated Campaign Dispatch",
    body: "As soon as a reservation is logged at the front desk or synced from an OTA, DeskFloow automatically dispatches the guest's booking confirmation message.",
  },
  {
    icon: FileCheck2,
    title: "Dynamic Booking Variables",
    subtitle: "Pre-Approved Confirmation Template",
    body: "Automatically populates guest name, booking reference ID, room category, check-in/check-out dates, and hotel details without manual typing.",
  },
  {
    icon: Send,
    title: "Campaign-Style Broadcast Log",
    subtitle: "One-Way Notification Service",
    body: "Works just like an enterprise email campaign platform — dedicated strictly to outbound hotel booking confirmation messages with zero chat clutter.",
  },
  {
    icon: BarChart3,
    title: "Live Delivery & Open Receipts",
    subtitle: "Real-Time Dispatch Telemetry",
    body: "Track sent, delivered, and read timestamps for every booking confirmation directly from your reservation audit log.",
  },
];

export function WhatsAppWorkflow() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {campaignFeatures.map((f) => (
        <div key={f.title} className="card p-4">
          <div className="flex items-center gap-2 text-[13.5px] font-bold text-foreground">
            <f.icon className="size-4 text-primary" />
            {f.title}
          </div>
          <p className="mt-1 text-[11px] text-primary font-semibold">
            {f.subtitle}
          </p>
          <p className="mt-2 text-[12.5px] text-muted-foreground leading-relaxed">
            {f.body}
          </p>
        </div>
      ))}
    </div>
  );
}
