"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, CheckCheck, Clock, Search, Send, ShieldCheck, BadgeCheck, ArrowRight, FileText, UserRound, Activity } from "lucide-react";
import { useDemo, guestOf } from "@/components/demo/demo-store";
import { messageTemplates, fillTemplate, templateByKey } from "@/data/demo-messages";
import { demoProperties } from "@/data/demo-properties";
import { longDate, shortDate } from "@/lib/dates";
import { cn, initials, inr } from "@/lib/utils";
import type { MessageStatus, TemplateKey } from "@/types";

const replies: Partial<Record<TemplateKey, string>> = {
  "booking-confirmation": "Wonderful, thank you! 🙏",
  "pre-arrival": "We should arrive around 3 PM.",
  "check-in": "Perfect, heading up now!",
  "room-service": "Great, thanks!",
  checkout: "Lovely stay — see you next time!",
};

function Ticks({ status }: { status?: MessageStatus }) {
  if (!status) return null;
  if (status === "sending") return <Clock className="size-3 text-muted" aria-label="Sending" />;
  if (status === "sent") return <Check className="size-3.5 text-muted" aria-label="Sent" />;
  return <CheckCheck className={cn("size-3.5", status === "read" ? "text-sky-500" : "text-muted")} aria-label={status === "read" ? "Read" : "Delivered"} />;
}

export function WhatsAppInbox({ initialQuery = "" }: { initialQuery?: string }) {
  const { conversations, reservations, rooms, sendMessage, receiveMessage, markRead, state } = useDemo();
  const [query, setQuery] = useState(initialQuery);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [template, setTemplate] = useState<TemplateKey>("booking-confirmation");
  const [edited, setEdited] = useState<{ key: string; text: string } | null>(null);
  const [typing, setTyping] = useState(false);
  const [confirmed, setConfirmed] = useState<string[]>([]);
  const scroller = useRef<HTMLDivElement>(null);
  const hotel = demoProperties.find((p) => p.id === state.propertyId)!;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return conversations.filter((c) => {
      const g = guestOf(c.guestId);
      return !q || g.name.toLowerCase().includes(q) || c.reservationId.toLowerCase().includes(q) || g.phone.replace(/\s/g, "").includes(q.replace(/\s/g, ""));
    });
  }, [conversations, query]);

  const active = conversations.find((c) => c.id === activeId) ?? filtered[0] ?? conversations[0];
  const guest = active && guestOf(active.guestId);
  const res = active && reservations.find((r) => r.id === active.reservationId);
  const room = res && rooms.find((r) => r.id === res.roomId);

  const vars = useMemo(
    () => ({
      guest: guest?.name.split(" ")[0] ?? "",
      hotel: hotel.name,
      code: res?.id ?? "",
      checkin: res ? shortDate(res.checkIn) : "",
      room: room?.number ?? "",
      balance: res ? inr(res.total - res.paid) : "",
    }),
    [guest, hotel, res, room],
  );

  // The composer shows the personalised template until the user edits it;
  // switching template or conversation resets it.
  const draftKey = `${template}|${active?.id}`;
  const text = edited?.key === draftKey ? edited.text : fillTemplate(templateByKey(template).body, vars);
  const setText = (t: string) => setEdited({ key: draftKey, text: t });

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [active?.messages.length, typing]);

  if (!active || !guest) return <div className="card p-8 text-center text-muted">No conversations for this property.</div>;

  const send = () => {
    if (!text.trim()) return;
    sendMessage(active.id, text.trim());
    if (template === "booking-confirmation") setConfirmed((c) => [...c, active.id]);
    const reply = replies[template];
    if (reply) {
      const convId = active.id;
      setTimeout(() => setTyping(true), 2800);
      setTimeout(() => (setTyping(false), receiveMessage(convId, reply)), 4400);
    }
  };

  return (
    <div className="card grid overflow-hidden md:grid-cols-[300px_1fr]">
      {/* Conversation list */}
      <aside className="border-b border-line md:border-r md:border-b-0 dark:border-white/10">
        <div className="border-b border-line p-3 dark:border-white/10">
          <label className="relative block">
            <span className="sr-only">Search conversations</span>
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search guest, phone or booking" className="field pl-9 text-[13.5px]" />
          </label>
        </div>
        <ul className="max-h-[220px] overflow-y-auto md:max-h-[520px] scrollbar-thin">
          {filtered.map((c) => {
            const g = guestOf(c.guestId);
            const r = reservations.find((x) => x.id === c.reservationId);
            const rm = r && rooms.find((x) => x.id === r.roomId);
            const last = c.messages[c.messages.length - 1];
            return (
              <li key={c.id}>
                <button
                  onClick={() => (setActiveId(c.id), markRead(c.id))}
                  className={cn("flex w-full gap-3 px-3 py-3 text-left transition hover:bg-brand-50 dark:hover:bg-white/5", c.id === active.id && "bg-brand-50 dark:bg-white/5")}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-[13px] font-semibold text-white">{initials(g.name)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-[13.5px] font-medium">{g.name}</span>
                      <span className="text-[11px] text-muted">{last?.time}</span>
                    </span>
                    <span className="block text-[11.5px] text-muted">Room {rm?.number} · {c.reservationId}</span>
                    <span className="flex items-center gap-1 text-[12px] text-muted">
                      {last?.from === "hotel" && <Ticks status={last.status} />}
                      <span className="truncate">{last?.text}</span>
                    </span>
                  </span>
                  {c.unread > 0 && <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-[10.5px] font-semibold text-white" aria-label={`${c.unread} unread`}>{c.unread}</span>}
                </button>
              </li>
            );
          })}
          {filtered.length === 0 && <li className="p-6 text-center text-[13px] text-muted">No matches.</li>}
        </ul>
      </aside>

      {/* Chat */}
      <section className="flex min-h-[520px] flex-col" aria-label={`Conversation with ${guest.name}`}>
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-emerald-500 text-[12px] font-semibold text-white">{initials(guest.name)}</span>
            <div>
              <p className="text-[14px] font-semibold">{guest.name}</p>
              <p className="text-[11.5px] text-muted">{typing ? <span className="text-emerald-600">typing…</span> : `${guest.phone} · Room ${room?.number}`}</p>
            </div>
          </div>
          <span className="demo-badge">Demo mode · not sent</span>
        </header>

        <AnimatePresence>
          {confirmed.includes(active.id) && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden">
              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 text-[12.5px] text-emerald-800">
                <BadgeCheck className="size-4" /> Booking confirmed · {active.reservationId} · {res && longDate(res.checkIn)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={scroller} className="flex-1 space-y-2 overflow-y-auto bg-[#EFEAE2] bg-[radial-gradient(rgb(0_0_0/0.035)_1px,transparent_1px)] [background-size:14px_14px] p-4 dark:bg-[#0d0a16] scrollbar-thin">
          <AnimatePresence initial={false}>
            {active.messages.map((m) => (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className={cn("flex", m.from === "hotel" ? "justify-end" : "justify-start")}
              >
                <div className={cn("max-w-[78%] rounded-xl px-3 py-2 text-[13.5px] leading-snug shadow-sm", m.from === "hotel" ? "rounded-tr-sm bg-[#D9FDD3] text-[#111B21]" : "rounded-tl-sm bg-white text-[#111B21]")}>
                  {m.text}
                  <span className="mt-0.5 flex items-center justify-end gap-1 text-[10.5px] text-[#667781]">
                    {m.time} {m.from === "hotel" && <Ticks status={m.status} />}
                  </span>
                </div>
              </motion.div>
            ))}
            {typing && (
              <motion.div key="typing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex">
                <div className="flex gap-1 rounded-xl rounded-tl-sm bg-white px-3 py-3 shadow-sm" aria-label="Guest is typing">
                  {[0, 1, 2].map((i) => (
                    <motion.span key={i} className="size-1.5 rounded-full bg-[#667781]" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-2 border-t border-line p-3 dark:border-white/10">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin" role="tablist" aria-label="Approved templates">
            {messageTemplates.map((t) => (
              <button key={t.key} role="tab" aria-selected={template === t.key} onClick={() => setTemplate(t.key)} className={cn("shrink-0 rounded-full px-3 py-1 text-[12px] font-medium transition", template === t.key ? "bg-emerald-600 text-white" : "bg-brand-50 text-ink/70 hover:bg-brand-100 dark:bg-white/5 dark:text-white/70")}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-end gap-2">
            <label className="flex-1">
              <span className="sr-only">Message</span>
              <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} className="field resize-none text-[13.5px]" />
            </label>
            <button onClick={send} disabled={!text.trim()} className="flex h-11 items-center gap-2 rounded-full bg-emerald-600 px-4 text-[13px] font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50">
              <Send className="size-4" /> Send demo message
            </button>
          </div>
          <p className="flex items-center gap-1.5 text-[11px] text-muted"><ShieldCheck className="size-3.5" /> Simulation only. Live sending requires a configured WhatsApp Business Platform account, approved templates and guest opt-in.</p>
        </div>
      </section>
    </div>
  );
}

export function WhatsAppWorkflow() {
  const steps = [
    { icon: FileText, label: "Reservation created" },
    { icon: BadgeCheck, label: "Approved template selected" },
    { icon: Send, label: "WhatsApp message sent" },
    { icon: Activity, label: "Delivery status recorded" },
    { icon: UserRound, label: "Attached to guest profile" },
  ];
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <li key={s.label} className="flex items-center gap-2">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] font-medium shadow-card"
          >
            <s.icon className="size-3.5 text-emerald-600" /> {s.label}
          </motion.span>
          {i < steps.length - 1 && <ArrowRight className="size-3.5 text-brand-300" aria-hidden />}
        </li>
      ))}
    </ol>
  );
}
