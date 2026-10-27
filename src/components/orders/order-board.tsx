"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronRight, Plus, QrCode, BellRing, Monitor, ConciergeBell, MessageCircle, Clock } from "lucide-react";
import { useDemo, guestOf } from "@/components/demo/demo-store";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { demoMenu, orderFlow, orderTotal } from "@/data/demo-orders";
import { cn, inr } from "@/lib/utils";
import type { Order, OrderChannel, OrderStatus } from "@/types";

const statusMeta: Record<OrderStatus, { label: string; cls: string }> = {
  new: { label: "New", cls: "bg-gold-100 text-gold-600 ring-gold-300" },
  accepted: { label: "Accepted", cls: "bg-brand-100 text-brand-700 ring-brand-200" },
  preparing: { label: "Preparing", cls: "bg-sky-50 text-sky-700 ring-sky-200" },
  ready: { label: "Ready", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  delivered: { label: "Delivered", cls: "bg-slate-100 text-slate-600 ring-slate-200" },
};

const channelIcon: Record<OrderChannel, typeof QrCode> = {
  "Guest QR": QrCode,
  "Room Service": BellRing,
  "Restaurant POS": Monitor,
  "Front Desk": ConciergeBell,
};

export function OrderBoard({ initialQuery = "" }: { initialQuery?: string }) {
  const { orders, setOrderStatus } = useDemo();
  const [openId, setOpenId] = useState<string | null>(initialQuery || null);
  const [channel, setChannel] = useState<OrderChannel | "All">("All");
  const shown = orders.filter((o) => channel === "All" || o.channel === channel);
  const open = orders.find((o) => o.id === openId);

  const advance = (o: Order) => {
    const next = orderFlow[orderFlow.indexOf(o.status) + 1];
    if (!next) return;
    setOrderStatus(o.id, next);
    toast.success(`${o.id} → ${statusMeta[next].label}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by order channel">
        {(["All", "Guest QR", "Room Service", "Restaurant POS", "Front Desk"] as const).map((c) => (
          <button key={c} onClick={() => setChannel(c)} aria-pressed={channel === c} className={cn("rounded-full px-3 py-1 text-[12px] font-medium transition", channel === c ? "bg-brand-600 text-white" : "bg-white text-ink/70 ring-1 ring-line hover:bg-brand-50 dark:bg-white/5 dark:text-white/70 dark:ring-white/10")}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-flow-col auto-cols-[minmax(230px,1fr)] gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {orderFlow.map((s) => {
          const col = shown.filter((o) => o.status === s);
          return (
            <div key={s} className="rounded-2xl bg-brand-50/70 p-2.5 dark:bg-white/[0.03]">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className={cn("chip ring-1 ring-inset", statusMeta[s].cls)}>{statusMeta[s].label}</span>
                <span className="text-[12px] text-muted">{col.length}</span>
              </div>
              <ul className="min-h-[120px] space-y-2">
                <AnimatePresence>
                  {col.map((o) => {
                    const g = guestOf(o.guestId);
                    const Icon = channelIcon[o.channel];
                    return (
                      <motion.li key={o.id} layout layoutId={`order-${o.id}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={cn("card p-3", initialQuery === o.id && "ring-2 ring-gold-400")}>
                        <button onClick={() => setOpenId(o.id)} className="block w-full text-left">
                          <div className="flex items-center justify-between text-[12px]">
                            <span className="font-semibold">{o.id}</span>
                            <span className="flex items-center gap-1 text-muted"><Clock className="size-3" />{o.time}</span>
                          </div>
                          <p className="mt-1 text-[13px] font-medium">{g.name} · Room {o.roomNumber}</p>
                          <p className="truncate text-[12px] text-muted">{o.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}</p>
                          <div className="mt-2 flex items-center justify-between text-[12px]">
                            <span className="flex items-center gap-1 text-muted"><Icon className="size-3.5" />{o.channel}</span>
                            <span className="font-semibold">{inr(orderTotal(o))}</span>
                          </div>
                        </button>
                        {s !== "delivered" && (
                          <button onClick={() => advance(o)} className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-white py-1.5 text-[12px] font-medium text-brand-700 ring-1 ring-brand-200 transition hover:bg-brand-600 hover:text-white dark:bg-white/5">
                            Move to {statusMeta[orderFlow[orderFlow.indexOf(s) + 1]].label} <ChevronRight className="size-3.5" />
                          </button>
                        )}
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            </div>
          );
        })}
      </div>
      <OrderDialog order={open ?? null} onClose={() => setOpenId(null)} onAdvance={advance} />
    </div>
  );
}

function OrderDialog({ order, onClose, onAdvance }: { order: Order | null; onClose: () => void; onAdvance: (o: Order) => void }) {
  const { addOrderItem, state } = useDemo();
  const [itemId, setItemId] = useState(demoMenu[0].id);
  const [qty, setQty] = useState(1);
  if (!order) return <Dialog open={false} onClose={onClose} title="">{null}</Dialog>;
  const g = guestOf(order.guestId);
  const log = state.activity.filter((a) => a.text.includes(order.id));

  return (
    <Dialog open onClose={onClose} title={`${order.id} · Room ${order.roomNumber}`} description={`${g.name} · ${order.channel} · ${order.payment}`}>
      <div className="space-y-4 text-[14px]">
        <div className="flex flex-wrap items-center gap-1.5" aria-label="Order progress">
          {orderFlow.map((s, i) => {
            const reached = orderFlow.indexOf(order.status) >= i;
            return (
              <span key={s} className="flex items-center gap-1.5">
                <span className={cn("chip ring-1 ring-inset", reached ? statusMeta[s].cls : "bg-white text-muted ring-line")}>{statusMeta[s].label}</span>
                {i < orderFlow.length - 1 && <ChevronRight className="size-3 text-muted" aria-hidden />}
              </span>
            );
          })}
        </div>

        <table className="w-full text-[13px]">
          <thead><tr className="text-left text-muted"><th className="pb-1 font-medium">Item</th><th className="pb-1 font-medium">Qty</th><th className="pb-1 text-right font-medium">Amount</th></tr></thead>
          <tbody>
            {order.items.map((i) => (
              <tr key={i.itemId} className="border-t border-line dark:border-white/10"><td className="py-1.5">{i.name}</td><td>{i.qty}</td><td className="text-right">{inr(i.qty * i.price)}</td></tr>
            ))}
          </tbody>
          <tfoot><tr className="border-t border-line font-semibold dark:border-white/10"><td className="pt-2" colSpan={2}>Total</td><td className="pt-2 text-right">{inr(orderTotal(order))}</td></tr></tfoot>
        </table>

        {order.status !== "delivered" && (
          <form
            className="flex flex-wrap items-end gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const m = demoMenu.find((x) => x.id === itemId)!;
              addOrderItem(order.id, { itemId: m.id, name: m.name, qty, price: m.price });
              toast.success(`${qty}× ${m.name} added`);
            }}
          >
            <label className="min-w-[180px] flex-1"><span className="label">Add item</span>
              <select className="field" value={itemId} onChange={(e) => setItemId(e.target.value)}>
                {demoMenu.map((m) => <option key={m.id} value={m.id}>{m.name} · {inr(m.price)}</option>)}
              </select>
            </label>
            <label className="w-20"><span className="label">Qty</span><input type="number" min={1} max={10} className="field" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} /></label>
            <Button type="submit" variant="secondary" size="md"><Plus className="size-4" /> Add</Button>
          </form>
        )}

        <div className="rounded-xl bg-[#EFEAE2] p-3">
          <p className="mb-1.5 flex items-center gap-1.5 text-[11.5px] font-medium text-[#54656F]"><MessageCircle className="size-3.5" /> WhatsApp confirmation preview (not sent)</p>
          <p className="ml-auto w-fit max-w-[90%] rounded-lg rounded-tr-sm bg-[#D9FDD3] px-3 py-2 text-[13px] text-[#111B21]">
            Thanks {g.name.split(" ")[0]}! Your order {order.id} for Room {order.roomNumber} ({inr(orderTotal(order))}) is {statusMeta[order.status].label.toLowerCase()}.
          </p>
        </div>

        {log.length > 0 && (
          <div>
            <p className="mb-1 text-[12px] font-semibold text-muted uppercase">Activity</p>
            <ul className="space-y-1 text-[12.5px]">{log.map((a) => <li key={a.id}><span className="text-muted">{a.time}</span> · {a.text}</li>)}</ul>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onClose}>Close</Button>
          {order.status !== "delivered" && <Button size="sm" onClick={() => onAdvance(order)}>Advance status</Button>}
        </div>
      </div>
    </Dialog>
  );
}
