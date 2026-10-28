"use client";

import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/reveal";
import { Logo } from "@/components/ui/logo";

const fragmented = ["Multiple disconnected tools", "Manual reservation updates", "Repeated guest data entry", "Separate housekeeping coordination", "Scattered guest conversations"];
const unified = ["Unified operations workspace", "Centralised reservation visibility", "Connected guest profiles", "Coordinated room readiness", "Centralised guest communication"];

const rows = [
  ["Reservation visibility", "Spread across channel extranets, spreadsheets and paper", "One reservation list and tape chart for every source"],
  ["Room assignment", "Manual, checked against a separate status board", "Drag-and-drop with overlap and room-status validation"],
  ["OTA distribution", "Availability updated channel by channel", "One inventory designed to propagate to connected channels"],
  ["Guest communication", "Personal phones and separate chat apps", "Template-based messages attached to the reservation"],
  ["Housekeeping coordination", "Calls, radios or paper lists", "Shared room status visible to the front desk"],
  ["Guest profiles", "Re-entered for every stay", "One profile with history, preferences and loyalty tier"],
  ["Restaurant & room service", "Separate POS or handwritten chits", "Orders linked to guest, room and folio"],
  ["Reporting", "Compiled manually from several exports", "Dashboards built from the same operational data"],
  ["Multi-property oversight", "Separate logins per property", "Switch properties from one account"],
];

/** Signature animation 10 — fragmented workflow vs DeskFloow. */
export function Comparison() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading align="center" eyebrow="Why unified matters" title="Fewer tools. Fewer handoffs. One source of truth." lead="A neutral look at the difference between running a hotel on disconnected tools and running it from one connected workspace." />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="rounded-3xl border border-line bg-white p-7">
            <p className="text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">Traditional fragmented workflow</p>
            <ul className="mt-6 space-y-3.5">
              {fragmented.map((t, i) => (
                <motion.li key={t} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.07 }} className="flex items-center gap-3 text-[15px] text-ink/70">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-rose-50 text-danger"><X className="size-3.5" strokeWidth={3} aria-label="No" /></span>
                  {t}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-3xl bg-brand-900 p-7 text-white shadow-lift">
            <div className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-brand-500/40 blur-3xl" />
            <div className="relative flex items-center gap-3"><Logo tone="light" height={26} /><span className="text-[13px] font-semibold tracking-wide text-white/60 uppercase">workflow</span></div>
            <ul className="relative mt-6 space-y-3.5">
              {unified.map((t, i) => (
                <motion.li key={t} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 + i * 0.07 }} className="flex items-center gap-3 text-[15px]">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-300"><Check className="size-3.5" strokeWidth={3} aria-label="Yes" /></span>
                  {t}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl border border-line bg-white scrollbar-thin">
          <table className="w-full min-w-[720px] text-left text-[14px]">
            <caption className="sr-only">Fragmented workflows compared with DeskFloow</caption>
            <thead>
              <tr className="border-b border-line bg-brand-50/60">
                <th scope="col" className="px-5 py-4 font-semibold">Area</th>
                <th scope="col" className="px-5 py-4 font-semibold text-muted-foreground">Fragmented workflow</th>
                <th scope="col" className="px-5 py-4 font-semibold text-brand-700">DeskFloow</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([a, b, c]) => (
                <tr key={a} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-3.5 font-medium">{a}</th>
                  <td className="px-5 py-3.5 text-muted-foreground"><span className="flex gap-2"><X className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />{b}</span></td>
                  <td className="px-5 py-3.5"><span className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />{c}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
