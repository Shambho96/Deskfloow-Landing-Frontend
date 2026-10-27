"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { BedDouble, LayoutGrid, Move, Plus, UserRound, Wand2 } from "lucide-react";
import { useDemo, guestOf } from "@/components/demo/demo-store";
import { HkBadge, hkMeta } from "@/components/ui/badges";
import { Button } from "@/components/ui/button";
import { categoryGuests, categoryRates } from "@/data/demo-properties";
import { shortDate } from "@/lib/dates";
import { cn, inr } from "@/lib/utils";
import type { HousekeepingStatus, Room, RoomCategory } from "@/types";

const COLS = 5;
const ROWS = 3;
const flow: Record<HousekeepingStatus, { next?: HousekeepingStatus; action?: string }> = {
  dirty: { next: "cleaning", action: "Start cleaning" },
  cleaning: { next: "clean", action: "Mark clean" },
  clean: {},
  "out-of-order": {},
};

export function FloorPlan() {
  const { rooms, inHouse, reservations, setHousekeeping, addRooms, moveRoom, state } = useDemo();
  const floors = [...new Set(rooms.map((r) => r.floor))].sort((a, b) => a - b);
  const [floorSel, setFloor] = useState(floors[0] ?? 1);
  const floor = floors.includes(floorSel) ? floorSel : (floors[0] ?? 1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [gen, setGen] = useState({ floor: Math.max(...floors, 0) + 1, count: 4, category: "Deluxe" as RoomCategory });

  const floorRooms = rooms.filter((r) => r.floor === floor);
  const selected = rooms.find((r) => r.id === selectedId) ?? null;
  const occupant = (r: Room) => inHouse.find((x) => x.roomId === r.id);
  const nextArrival = selected && reservations.filter((x) => x.roomId === selected.id && x.status === "confirmed").sort((a, b) => a.checkIn.localeCompare(b.checkIn))[0];

  const occupiedCells = new Set<string>();
  floorRooms.forEach((r) => { for (let i = 0; i < r.w; i++) occupiedCells.add(`${r.x + i},${r.y}`); });

  const generate = () => {
    const existing = rooms.filter((r) => r.floor === gen.floor);
    if (existing.length + gen.count > COLS * ROWS) return toast.error(`Floor ${gen.floor} fits ${COLS * ROWS} rooms in this demo grid.`);
    const taken = new Set(existing.flatMap((r) => Array.from({ length: r.w }, (_, i) => `${r.x + i},${r.y}`)));
    const used = new Set(existing.map((r) => r.number));
    const created: Room[] = [];
    let n = 1;
    for (let y = 0; y < ROWS && created.length < gen.count; y++)
      for (let x = 0; x < COLS && created.length < gen.count; x++) {
        if (taken.has(`${x},${y}`)) continue;
        while (used.has(`${gen.floor}${String(n).padStart(2, "0")}`)) n++;
        const number = `${gen.floor}${String(n++).padStart(2, "0")}`;
        created.push({ id: `${state.propertyId}-${number}-${Math.random().toString(36).slice(2, 6)}`, propertyId: state.propertyId, number, floor: gen.floor, category: gen.category, housekeeping: "clean", rate: categoryRates[gen.category], maxGuests: categoryGuests[gen.category], x, y, w: 1, h: 1 });
      }
    addRooms(created);
    setFloor(gen.floor);
    toast.success(`${created.length} demo rooms added to floor ${gen.floor}`);
  };

  const place = (x: number, y: number) => {
    if (!selected || !editing) return;
    for (let i = 0; i < selected.w; i++) {
      const k = `${x + i},${y}`;
      const blocker = floorRooms.find((r) => r.id !== selected.id && r.y === y && x + i >= r.x && x + i < r.x + r.w);
      if (x + i >= COLS || blocker) return toast.error(`Cell ${k} is not free for Room ${selected.number}.`);
    }
    moveRoom(selected.id, x, y);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="card p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 rounded-full bg-brand-50 p-1 dark:bg-white/5" role="tablist" aria-label="Floor">
            {floors.map((f) => (
              <button key={f} role="tab" aria-selected={floor === f} onClick={() => setFloor(f)} className={cn("rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition", floor === f ? "bg-white text-ink shadow-sm dark:bg-white/15 dark:text-white" : "text-muted")}>
                Floor {f}
              </button>
            ))}
          </div>
          <button onClick={() => setEditing((e) => !e)} aria-pressed={editing} className={cn("flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-medium ring-1 transition", editing ? "bg-gold-100 text-gold-600 ring-gold-300" : "ring-line hover:bg-brand-50 dark:ring-white/10")}>
            <Move className="size-3.5" /> {editing ? "Editing layout — select a room, then a free cell" : "Edit layout"}
          </button>
        </div>

        <div className="relative rounded-2xl border border-dashed border-brand-200 bg-[linear-gradient(to_right,rgb(140_92_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(140_92_255/0.06)_1px,transparent_1px)] bg-[size:20%_33.33%] p-2 dark:border-white/10">
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0,1fr))`, gridTemplateRows: `repeat(${ROWS}, 92px)` }}>
            {editing && Array.from({ length: COLS * ROWS }, (_, i) => {
              const x = i % COLS, y = Math.floor(i / COLS);
              if (occupiedCells.has(`${x},${y}`)) return null;
              return <button key={`c${i}`} onClick={() => place(x, y)} style={{ gridColumn: x + 1, gridRow: y + 1 }} aria-label={`Move selected room to column ${x + 1}, row ${y + 1}`} className="rounded-xl border border-dashed border-gold-300 text-[11px] text-gold-600 opacity-70 hover:bg-gold-100">Place here</button>;
            })}
            {floorRooms.map((r) => {
              const occ = occupant(r);
              const m = hkMeta[r.housekeeping];
              return (
                <motion.button
                  layout
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  style={{ gridColumn: `${r.x + 1} / span ${r.w}`, gridRow: r.y + 1 }}
                  aria-pressed={selectedId === r.id}
                  aria-label={`Room ${r.number}, ${r.category}, ${m.label}, ${occ ? "occupied" : "vacant"}`}
                  className={cn(
                    "relative flex flex-col justify-between overflow-hidden rounded-xl border bg-white p-2.5 text-left shadow-sm transition hover:shadow-lift dark:bg-white/5",
                    selectedId === r.id ? "border-brand-500 ring-2 ring-brand-300" : "border-line dark:border-white/10",
                    r.housekeeping === "out-of-order" && "bg-[repeating-linear-gradient(45deg,#fff1f3_0_8px,#fff_8px_16px)]",
                  )}
                >
                  <span className={cn("absolute inset-x-0 top-0 h-1", m.dot)} />
                  <span className="flex items-center justify-between">
                    <span className="text-[15px] font-semibold">{r.number}</span>
                    <m.Icon className="size-3.5 text-muted" aria-hidden />
                  </span>
                  <span className="text-[11px] text-muted">{r.category}</span>
                  <span className="flex items-center justify-between text-[11px]">
                    <span className={cn("font-medium", occ ? "text-brand-700" : "text-muted")}>{occ ? "Occupied" : "Vacant"}</span>
                    <span>{m.label}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-[11.5px] text-muted">
          {(Object.keys(hkMeta) as HousekeepingStatus[]).map((s) => <span key={s} className="flex items-center gap-1.5"><span className={cn("size-2.5 rounded-full", hkMeta[s].dot)} />{hkMeta[s].label}</span>)}
        </div>
      </div>

      <div className="space-y-4">
        <div className="card p-4">
          <h4 className="mb-3 flex items-center gap-2 text-[13.5px] font-semibold"><BedDouble className="size-4 text-brand-500" /> Room inspector</h4>
          {!selected ? (
            <p className="py-6 text-center text-[13px] text-muted">Select a room on the floor plan.</p>
          ) : (
            <div className="space-y-3 text-[13.5px]">
              <div className="flex items-center justify-between">
                <p className="text-[20px] font-semibold">Room {selected.number}</p>
                <HkBadge status={selected.housekeeping} />
              </div>
              <dl className="grid grid-cols-2 gap-2 text-[12.5px]">
                <div className="rounded-lg bg-brand-50 p-2 dark:bg-white/5"><dt className="text-muted">Category</dt><dd className="font-medium">{selected.category}</dd></div>
                <div className="rounded-lg bg-brand-50 p-2 dark:bg-white/5"><dt className="text-muted">Rate</dt><dd className="font-medium">{inr(selected.rate)}</dd></div>
                <div className="rounded-lg bg-brand-50 p-2 dark:bg-white/5"><dt className="text-muted">Sleeps</dt><dd className="font-medium">{selected.maxGuests}</dd></div>
                <div className="rounded-lg bg-brand-50 p-2 dark:bg-white/5"><dt className="text-muted">Ready for arrival</dt><dd className={cn("font-medium", selected.housekeeping === "clean" ? "text-success" : "text-danger")}>{selected.housekeeping === "clean" ? "Yes" : "No"}</dd></div>
              </dl>
              {occupant(selected) && <p className="flex items-center gap-2 text-[12.5px]"><UserRound className="size-3.5 text-brand-500" /> In-house: {guestOf(occupant(selected)!.guestId).name}</p>}
              {nextArrival && <p className="text-[12.5px] text-muted">Next arrival: {guestOf(nextArrival.guestId).name} · {shortDate(nextArrival.checkIn)}</p>}
              <div className="flex flex-wrap gap-2">
                {flow[selected.housekeeping].next && (
                  <Button size="sm" onClick={() => setHousekeeping(selected.id, flow[selected.housekeeping].next!)}>{flow[selected.housekeeping].action}</Button>
                )}
                {selected.housekeeping === "clean" && <Button size="sm" variant="secondary" onClick={() => setHousekeeping(selected.id, "dirty")}>Mark dirty</Button>}
                {selected.housekeeping !== "out-of-order" ? (
                  <Button size="sm" variant="secondary" onClick={() => setHousekeeping(selected.id, "out-of-order")}>Set out of order</Button>
                ) : (
                  <Button size="sm" onClick={() => setHousekeeping(selected.id, "dirty")}>Return to service</Button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="card p-4">
          <h4 className="mb-3 flex items-center gap-2 text-[13.5px] font-semibold"><Wand2 className="size-4 text-gold-500" /> Bulk room generator</h4>
          <div className="grid grid-cols-3 gap-2">
            <label><span className="label">Floor</span><input type="number" min={1} max={9} className="field" value={gen.floor} onChange={(e) => setGen({ ...gen, floor: Math.min(9, Math.max(1, Number(e.target.value))) })} /></label>
            <label><span className="label">Rooms</span><input type="number" min={1} max={15} className="field" value={gen.count} onChange={(e) => setGen({ ...gen, count: Math.min(15, Math.max(1, Number(e.target.value))) })} /></label>
            <label><span className="label">Type</span>
              <select className="field px-2" value={gen.category} onChange={(e) => setGen({ ...gen, category: e.target.value as RoomCategory })}>
                {(["Standard", "Deluxe", "Premium", "Suite"] as const).map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>
          <Button size="sm" className="mt-3 w-full" onClick={generate}><Plus className="size-4" /> Generate rooms</Button>
          <p className="mt-2 flex items-center gap-1 text-[11px] text-muted"><LayoutGrid className="size-3" /> Rooms are placed on the next free grid cells.</p>
        </div>
      </div>
    </div>
  );
}
