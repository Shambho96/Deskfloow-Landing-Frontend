"use client";

import { useState } from "react";
import { Printer, Receipt, Wallet } from "lucide-react";
import { useDemo, guestOf } from "@/components/demo/demo-store";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { demoProperties, demoShift } from "@/data/demo-properties";
import { orderTotal } from "@/data/demo-orders";
import { nightsBetween, shortDate } from "@/lib/dates";
import { cn, formatMoney } from "@/lib/utils";
import type { CurrencyCode } from "@/types";

/** Illustrative tax rate for the demo only — not a compliant GST computation. */
const DEMO_TAX_RATE = 0.12;

export function useFolio(reservationId: string | null) {
  const { state } = useDemo();
  const res = state.reservations.find((r) => r.id === reservationId);
  if (!res) return null;
  const room = state.rooms.find((r) => r.id === res.roomId)!;
  const property = demoProperties.find((p) => p.id === res.propertyId)!;
  const nights = nightsBetween(res.checkIn, res.checkOut);
  const roomNumber = room.number;
  const orders = state.orders.filter((o) => o.propertyId === res.propertyId && o.guestId === res.guestId && o.roomNumber === roomNumber && o.payment === "Charged to room");
  const lines = [
    { label: `Room ${roomNumber} · ${room.category} · ${nights} night${nights > 1 ? "s" : ""} × ${formatMoney(room.rate, property.currency)}`, amount: room.rate * nights },
    ...(res.children ? [{ label: "Extra bed (child)", amount: 800 * nights }] : []),
    ...orders.map((o) => ({ label: `${o.id} · ${o.channel} · ${o.items.map((i) => i.name).join(", ")}`, amount: orderTotal(o) })),
  ];
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const tax = Math.round(subtotal * DEMO_TAX_RATE);
  const total = subtotal + tax;
  return { res, room, property, guest: guestOf(res.guestId), nights, lines, subtotal, tax, total, paid: res.paid, balance: total - res.paid, currency: property.currency as CurrencyCode };
}

export function FolioView({ reservationId }: { reservationId: string }) {
  const f = useFolio(reservationId);
  if (!f) return null;
  const m = (v: number) => formatMoney(v, f.currency);
  return (
    <div className="print-area space-y-4 text-[13.5px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-gold-600 uppercase">Demo invoice · not a tax document</p>
          <p className="mt-1 text-[17px] font-semibold">{f.property.name}</p>
          <p className="text-muted">{f.property.city}</p>
        </div>
        <div className="text-right text-[12.5px]">
          <p className="font-semibold">INV-{f.res.id.slice(4)}</p>
          <p className="text-muted">{f.res.id}</p>
        </div>
      </div>
      <div className="rounded-xl bg-brand-50 p-3 text-[12.5px] dark:bg-white/5">
        <p className="font-medium">{f.guest.name}</p>
        <p className="text-muted">{shortDate(f.res.checkIn)} → {shortDate(f.res.checkOut)} · {f.guest.email}</p>
      </div>
      <table className="w-full">
        <tbody>
          {f.lines.map((l) => (
            <tr key={l.label} className="border-b border-line align-top dark:border-white/10"><td className="py-2 pr-4">{l.label}</td><td className="py-2 text-right whitespace-nowrap">{m(l.amount)}</td></tr>
          ))}
          <tr><td className="pt-3 text-muted">Subtotal</td><td className="pt-3 text-right">{m(f.subtotal)}</td></tr>
          <tr><td className="text-muted">Taxes (illustrative {DEMO_TAX_RATE * 100}%)</td><td className="text-right">{m(f.tax)}</td></tr>
          <tr className="font-semibold"><td className="pt-2">Total</td><td className="pt-2 text-right">{m(f.total)}</td></tr>
          <tr className="text-success"><td>Payments received</td><td className="text-right">− {m(f.paid)}</td></tr>
          <tr className={cn("text-[15px] font-semibold", f.balance > 0 ? "text-danger" : "text-success")}><td className="pt-2">Outstanding balance</td><td className="pt-2 text-right">{m(Math.max(0, f.balance))}</td></tr>
        </tbody>
      </table>
      <p className="text-[11px] text-muted">Demonstration record. Tax treatment, GST filing and legal invoice requirements need a reviewed production workflow.</p>
    </div>
  );
}

export function FolioDialog({ reservationId, onClose }: { reservationId: string | null; onClose: () => void }) {
  return (
    <Dialog open={!!reservationId} onClose={onClose} title="Guest folio" description="Demo data · INR">
      {reservationId && (
        <>
          <FolioView reservationId={reservationId} />
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => window.print()}><Printer className="size-4" /> Print preview</Button>
          </div>
        </>
      )}
    </Dialog>
  );
}

export function FolioList() {
  const { reservations } = useDemo();
  const active = reservations.filter((r) => r.status !== "cancelled");
  const [id, setId] = useState(active.find((r) => r.status === "checked-in")?.id ?? active[0]?.id ?? "");
  const current = active.some((r) => r.id === id) ? id : active[0]?.id;
  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <ul className="card max-h-[560px] overflow-y-auto p-2 scrollbar-thin">
        {active.map((r) => (
          <li key={r.id}>
            <button onClick={() => setId(r.id)} aria-pressed={current === r.id} className={cn("flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] hover:bg-brand-50 dark:hover:bg-white/5", current === r.id && "bg-brand-50 dark:bg-white/5")}>
              <span><span className="font-medium">{r.id}</span><span className="block text-[12px] text-muted">{guestOf(r.guestId).name}</span></span>
              <Receipt className="size-4 text-brand-400" />
            </button>
          </li>
        ))}
      </ul>
      <div className="card p-5">
        {current && <FolioView reservationId={current} />}
        <div className="mt-4 flex justify-end"><Button variant="secondary" size="sm" onClick={() => window.print()}><Printer className="size-4" /> Print preview</Button></div>
      </div>
    </div>
  );
}

export function ShiftRegister() {
  const { state } = useDemo();
  const s = demoShift[state.propertyId];
  const [counted, setCounted] = useState<number | null>(null);
  const [notes, setNotes] = useState("Two late arrivals expected. Cake order for Room 203 at 8 PM.");
  const actual = counted ?? s.counted;
  const expected = s.float + s.cash;
  const variance = actual - expected;
  const rows = [
    { label: "Opening cash float", v: s.float },
    { label: "Cash collected", v: s.cash },
    { label: "Card payments", v: s.card, muted: true },
    { label: "UPI receipts", v: s.upi, muted: true },
  ];
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-[14px] font-semibold"><Wallet className="size-4 text-brand-500" /> Shift register · Evening shift</h4>
        <span className="demo-badge">Demo payments</span>
      </div>
      <dl className="space-y-2 text-[13.5px]">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between"><dt className={cn(r.muted && "text-muted")}>{r.label}</dt><dd className="font-medium">{formatMoney(r.v)}</dd></div>
        ))}
        <div className="flex justify-between border-t border-line pt-2 font-semibold dark:border-white/10"><dt>Expected cash in drawer</dt><dd>{formatMoney(expected)}</dd></div>
      </dl>
      <label className="mt-4 block"><span className="label">Actual cash counted</span>
        <input type="number" min={0} className="field" value={actual} onChange={(e) => setCounted(Math.max(0, Number(e.target.value)))} />
      </label>
      <p className={cn("mt-2 rounded-lg px-3 py-2 text-[13px] font-medium", variance === 0 ? "bg-emerald-50 text-emerald-700" : variance > 0 ? "bg-sky-50 text-sky-700" : "bg-rose-50 text-rose-700")} role="status">
        Variance: {variance > 0 ? "+" : ""}{formatMoney(variance)} {variance === 0 ? "· balanced" : variance > 0 ? "· over" : "· short"}
      </p>
      <label className="mt-4 block"><span className="label">Shift handover notes</span>
        <textarea className="field resize-none" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
    </div>
  );
}
