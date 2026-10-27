"use client";

import { useMemo, useRef, useState } from "react";
import {
  DndContext, KeyboardSensor, PointerSensor, TouchSensor, useDraggable, useDroppable, useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, CalendarDays, GripVertical, Plus, Ban } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useDemo, guestOf, validatePlacement } from "@/components/demo/demo-store";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HkBadge, ResBadge, resMeta } from "@/components/ui/badges";
import { demoGuests } from "@/data/demo-guests";
import { DEMO_TODAY, nightsBetween, shiftIso, shortDate, weekFrom } from "@/lib/dates";
import { cn, inr } from "@/lib/utils";
import type { BookingSource, Reservation, RoomCategory } from "@/types";

const SOURCES: BookingSource[] = ["Direct Website", "Walk-in", "Corporate", "Booking.com", "Agoda", "MakeMyTrip", "Expedia", "Airbnb", "Goibibo"];

export function TapeChart() {
  const demo = useDemo();
  const { rooms, reservations, moveReservation } = demo;
  const [start, setStart] = useState(shiftIso(DEMO_TODAY, -1));
  const [category, setCategory] = useState<RoomCategory | "All">("All");
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [quick, setQuick] = useState<{ roomId: string; date: string } | null>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const days = weekFrom(start);
  const end = shiftIso(start, 7);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
    useSensor(KeyboardSensor),
  );

  const categories = useMemo(() => ["All", ...new Set(rooms.map((r) => r.category))] as (RoomCategory | "All")[], [rooms]);
  const visibleRooms = rooms.filter((r) => category === "All" || r.category === category);
  const floors = [...new Set(visibleRooms.map((r) => r.floor))].sort();

  const onDragEnd = (e: DragEndEvent) => {
    const res = reservations.find((r) => r.id === e.active.id);
    if (!res || !e.over) return;
    const roomId = String(e.over.id).split("|")[0];
    const colW = colRef.current?.getBoundingClientRect().width ?? 100;
    let dayShift = Math.round(e.delta.x / colW);
    if (res.status === "checked-in" && dayShift !== 0) {
      toast.info("Guest is already in-house — only the room can change, dates were kept.");
      dayShift = 0;
    }
    if (roomId === res.roomId && dayShift === 0) return;
    const err = moveReservation(res.id, roomId, shiftIso(res.checkIn, dayShift), shiftIso(res.checkOut, dayShift));
    if (err) toast.error("Move not allowed", { description: err });
    else toast.success(`${res.id} updated`, { description: `Room ${rooms.find((r) => r.id === roomId)?.number} · ${shortDate(shiftIso(res.checkIn, dayShift))} → ${shortDate(shiftIso(res.checkOut, dayShift))}` });
  };

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-3 dark:border-white/10">
        <div className="flex items-center gap-1.5">
          <button aria-label="Previous week" onClick={() => setStart(shiftIso(start, -7))} className="rounded-lg border border-line p-1.5 hover:bg-brand-50 dark:border-white/10 dark:hover:bg-white/5"><ChevronLeft className="size-4" /></button>
          <button onClick={() => setStart(shiftIso(DEMO_TODAY, -1))} className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[12.5px] font-medium hover:bg-brand-50 dark:border-white/10 dark:hover:bg-white/5"><CalendarDays className="size-3.5" /> Demo today</button>
          <button aria-label="Next week" onClick={() => setStart(shiftIso(start, 7))} className="rounded-lg border border-line p-1.5 hover:bg-brand-50 dark:border-white/10 dark:hover:bg-white/5"><ChevronRight className="size-4" /></button>
          <span className="ml-2 text-[13px] font-medium">{shortDate(start)} – {shortDate(shiftIso(end, -1))}</span>
        </div>
        <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by room category">
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c} className={cn("rounded-full px-3 py-1 text-[12px] font-medium transition", category === c ? "bg-brand-600 text-white" : "bg-brand-50 text-ink/70 hover:bg-brand-100 dark:bg-white/5 dark:text-white/70")}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="overflow-x-auto scrollbar-thin">
          <div className="min-w-[820px]">
            {/* Header */}
            <div className="grid grid-cols-[120px_repeat(7,minmax(96px,1fr))] border-b border-line bg-brand-50/50 text-[12px] dark:border-white/10 dark:bg-white/5">
              <div className="px-3 py-2 font-medium text-muted">Room</div>
              {days.map((d, i) => (
                <div key={d} ref={i === 0 ? colRef : undefined} className={cn("border-l border-line px-2 py-2 dark:border-white/10", d === DEMO_TODAY && "bg-gold-100/70 dark:bg-gold-400/10")}>
                  <span className="block font-semibold">{format(parseISO(d), "EEE")}</span>
                  <span className="text-muted">{format(parseISO(d), "d MMM")}</span>
                </div>
              ))}
            </div>

            {floors.map((floor) => (
              <div key={floor}>
                <div className="bg-brand-50/30 px-3 py-1 text-[11px] font-semibold tracking-wider text-muted uppercase dark:bg-white/[0.02]">Floor {floor}</div>
                {visibleRooms.filter((r) => r.floor === floor).map((room) => {
                  const rowRes = reservations.filter((r) => r.roomId === room.id && r.status !== "cancelled" && r.checkIn < end && r.checkOut > start);
                  return (
                    <div key={room.id} className="grid grid-cols-[120px_repeat(7,minmax(96px,1fr))] border-b border-line dark:border-white/10">
                      <div className="flex flex-col justify-center px-3 py-2">
                        <span className="text-[13px] font-semibold">{room.number} <span className="font-normal text-muted">· {room.category}</span></span>
                        <HkBadge status={room.housekeeping} className="mt-1 w-fit" />
                      </div>
                      <div className="relative col-span-7 grid grid-cols-7">
                        {days.map((d, i) => (
                          <DropCell key={d} id={`${room.id}|${d}`} col={i} today={d === DEMO_TODAY} disabled={room.housekeeping === "out-of-order"} onClick={() => setQuick({ roomId: room.id, date: d })} label={`Room ${room.number}, ${format(parseISO(d), "d MMM")}: available — create booking`} />
                        ))}
                        {room.housekeeping === "out-of-order" && (
                          <div className="pointer-events-none absolute inset-1 flex items-center justify-center gap-1.5 rounded-lg bg-[repeating-linear-gradient(45deg,#fde2e6_0_8px,#fff1f3_8px_16px)] text-[12px] font-medium text-rose-700">
                            <Ban className="size-3.5" /> Out of order
                          </div>
                        )}
                        {rowRes.map((r) => {
                          const s = Math.max(0, nightsBetween(start, r.checkIn));
                          const e = Math.min(7, nightsBetween(start, r.checkOut));
                          return <Block key={r.id} res={r} colStart={s} span={Math.max(1, e - s)} clippedLeft={r.checkIn < start} onOpen={() => setSelected(r)} />;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </DndContext>

      <div className="flex flex-wrap items-center gap-3 border-t border-line px-3 py-2.5 text-[11.5px] text-muted dark:border-white/10">
        {(["confirmed", "checked-in", "checked-out"] as const).map((s) => (
          <span key={s} className="flex items-center gap-1.5"><span className={cn("size-2.5 rounded-sm", resMeta[s].block)} />{resMeta[s].label}</span>
        ))}
        <span className="ml-auto">Drag to move · click a booking to edit with keyboard · click an empty cell to book</span>
      </div>

      <ReservationDrawer res={selected && reservations.find((r) => r.id === selected.id)} onClose={() => setSelected(null)} />
      <QuickBooking slot={quick} onClose={() => setQuick(null)} />
    </div>
  );
}

function DropCell({ id, col, today, disabled, onClick, label }: { id: string; col: number; today: boolean; disabled: boolean; onClick: () => void; label: string }) {
  const { setNodeRef, isOver } = useDroppable({ id, disabled });
  return (
    <button
      ref={setNodeRef}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      style={{ gridColumn: col + 1, gridRow: 1 }}
      className={cn(
        "group h-[58px] border-l border-line transition-colors dark:border-white/10",
        today && "bg-gold-100/40 dark:bg-gold-400/5",
        isOver && "bg-brand-100 dark:bg-brand-500/20",
        !disabled && "hover:bg-brand-50 dark:hover:bg-white/5",
      )}
    >
      {!disabled && <Plus className="mx-auto size-3.5 text-brand-400 opacity-0 transition group-hover:opacity-100" aria-hidden />}
    </button>
  );
}

function Block({ res, colStart, span, clippedLeft, onOpen }: { res: Reservation; colStart: number; span: number; clippedLeft: boolean; onOpen: () => void }) {
  const draggable = res.status !== "checked-out";
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: res.id, disabled: !draggable });
  const g = guestOf(res.guestId);
  return (
    <div
      ref={setNodeRef}
      style={{
        gridColumn: `${colStart + 1} / span ${span}`,
        gridRow: 1,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
      className={cn(
        "relative z-[1] mx-[3px] my-[7px] flex items-center gap-1 overflow-hidden rounded-lg px-1.5 text-left text-[12px] shadow-sm transition-shadow",
        resMeta[res.status].block,
        clippedLeft && "rounded-l-none",
        isDragging && "z-20 scale-[1.02] opacity-90 shadow-lift ring-2 ring-gold-400",
      )}
    >
      {draggable && (
        <span {...listeners} {...attributes} aria-label={`Drag ${res.id}`} className="cursor-grab touch-none rounded p-0.5 hover:bg-white/20 active:cursor-grabbing">
          <GripVertical className="size-3.5 opacity-70" />
        </span>
      )}
      <button onClick={onOpen} className="min-w-0 flex-1 truncate py-1 text-left" aria-label={`${res.id} ${g.name}, ${resMeta[res.status].label}. Open details`}>
        <span className="font-semibold">{g.name}</span>
        <span className="opacity-80"> · {res.id}</span>
      </button>
    </div>
  );
}

function ReservationDrawer({ res, onClose }: { res: Reservation | null | undefined; onClose: () => void }) {
  const { rooms, moveReservation, checkIn, setReservationStatus, state } = useDemo();
  const [draft, setDraft] = useState<{ roomId: string; checkIn: string; checkOut: string } | null>(null);
  const [guardMsg, setGuardMsg] = useState<string | null>(null);
  const current = res && (draft ?? { roomId: res.roomId, checkIn: res.checkIn, checkOut: res.checkOut });
  const close = () => (setDraft(null), setGuardMsg(null), onClose());

  if (!res || !current) return <Dialog open={false} onClose={close} title="" side="right">{null}</Dialog>;
  const g = guestOf(res.guestId);
  const room = rooms.find((r) => r.id === res.roomId)!;
  const error = draft ? validatePlacement(state, { id: res.id, ...draft }) : null;

  const save = () => {
    const err = moveReservation(res.id, current.roomId, current.checkIn, current.checkOut);
    if (err) toast.error(err);
    else {
      toast.success(`${res.id} saved`);
      setDraft(null);
    }
  };

  return (
    <Dialog open onClose={close} title={`${res.id} · ${g.name}`} description="Demo reservation — changes stay in this browser" side="right">
      <div className="space-y-5 text-[14px]">
        <div className="flex items-center justify-between">
          <ResBadge status={res.status} />
          <span className="text-[13px] text-muted">{res.source}</span>
        </div>
        <dl className="grid grid-cols-2 gap-3 rounded-xl bg-brand-50 p-3 text-[13px] dark:bg-white/5">
          <div><dt className="text-muted">Guests</dt><dd className="font-medium">{res.adults} adults{res.children ? `, ${res.children} child` : ""}</dd></div>
          <div><dt className="text-muted">Nights</dt><dd className="font-medium">{nightsBetween(res.checkIn, res.checkOut)}</dd></div>
          <div><dt className="text-muted">Total</dt><dd className="font-medium">{inr(res.total)}</dd></div>
          <div><dt className="text-muted">Balance</dt><dd className="font-medium">{inr(res.total - res.paid)}</dd></div>
        </dl>

        {res.status !== "checked-out" && (
          <fieldset className="space-y-3">
            <legend className="mb-2 text-[12px] font-semibold text-muted uppercase">Reassign (keyboard-friendly)</legend>
            <label className="block">
              <span className="label">Room</span>
              <select className="field" value={current.roomId} onChange={(e) => setDraft({ ...current, roomId: e.target.value })}>
                {rooms.map((r) => <option key={r.id} value={r.id}>{r.number} · {r.category}{r.housekeeping === "out-of-order" ? " (out of order)" : ""}</option>)}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label><span className="label">Check-in</span><input type="date" className="field" value={current.checkIn} disabled={res.status === "checked-in"} onChange={(e) => setDraft({ ...current, checkIn: e.target.value })} /></label>
              <label><span className="label">Check-out</span><input type="date" className="field" value={current.checkOut} min={shiftIso(current.checkIn, 1)} onChange={(e) => setDraft({ ...current, checkOut: e.target.value })} /></label>
            </div>
            {error && <p className="text-[12.5px] text-danger" role="alert">{error}</p>}
            <Button size="sm" disabled={!draft || !!error} onClick={save}>Save changes</Button>
          </fieldset>
        )}

        {res.status === "confirmed" && res.checkIn === DEMO_TODAY && (
          <div className="rounded-xl border border-gold-300 bg-gold-100/50 p-3">
            <p className="text-[12px] font-semibold text-gold-600 uppercase">Dirty-room check-in guard · demo</p>
            <p className="mt-1 flex items-center gap-2 text-[13px]">Room {room.number} is <HkBadge status={room.housekeeping} /></p>
            {guardMsg && <p className="mt-2 text-[12.5px] text-amber-900" role="alert">{guardMsg}</p>}
            <div className="mt-3 flex gap-2">
              <Button size="sm" onClick={() => { const e = checkIn(res.id); if (e) setGuardMsg(e); else toast.success("Checked in (demo)"); }}>Check in</Button>
              {guardMsg && <Button size="sm" variant="secondary" onClick={() => { const e = checkIn(res.id, true); if (e) toast.error(e); else { toast.success("Checked in with override (demo)"); setGuardMsg(null); } }}>Override as {state.role}</Button>}
            </div>
          </div>
        )}
        {res.status === "checked-in" && (
          <Button size="sm" variant="secondary" onClick={() => (setReservationStatus(res.id, "checked-out"), toast.success(`${res.id} checked out (demo)`))}>Check out</Button>
        )}
      </div>
    </Dialog>
  );
}

function QuickBooking({ slot, onClose }: { slot: { roomId: string; date: string } | null; onClose: () => void }) {
  const { rooms, addReservation, state } = useDemo();
  const [form, setForm] = useState({ guestId: "g13", nights: 2, source: "Direct Website" as BookingSource, adults: 2 });
  const room = slot && rooms.find((r) => r.id === slot.roomId);
  const checkOut = slot ? shiftIso(slot.date, form.nights) : "";
  const err = slot ? validatePlacement(state, { roomId: slot.roomId, checkIn: slot.date, checkOut, guests: form.adults }) : null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot || !room) return;
    const res = addReservation({
      propertyId: state.propertyId, roomId: slot.roomId, guestId: form.guestId, checkIn: slot.date, checkOut, status: "confirmed",
      source: form.source, adults: form.adults, children: 0, total: room.rate * form.nights, paid: 0,
    });
    if ("error" in res) toast.error(res.error);
    else {
      toast.success(`Demo reservation ${res.id} created`, { description: "Stored only in this browser session." });
      onClose();
    }
  };

  return (
    <Dialog open={!!slot} onClose={onClose} title="Quick booking" description={room && slot ? `Room ${room.number} · ${room.category} · from ${shortDate(slot.date)}` : undefined}>
      {slot && room && (
        <form onSubmit={submit} className="space-y-4">
          <label className="block"><span className="label">Guest (synthetic profiles)</span>
            <select className="field" value={form.guestId} onChange={(e) => setForm({ ...form, guestId: e.target.value })}>
              {demoGuests.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </label>
          <div className="grid grid-cols-3 gap-3">
            <label><span className="label">Nights</span><input type="number" min={1} max={14} className="field" value={form.nights} onChange={(e) => setForm({ ...form, nights: Math.max(1, Number(e.target.value)) })} /></label>
            <label><span className="label">Adults</span><input type="number" min={1} max={6} className="field" value={form.adults} onChange={(e) => setForm({ ...form, adults: Math.max(1, Number(e.target.value)) })} /></label>
            <label><span className="label">Source</span>
              <select className="field" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value as BookingSource })}>
                {SOURCES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-brand-50 p-3 text-[13.5px] dark:bg-white/5">
            <span>{shortDate(slot.date)} → {shortDate(checkOut)} · {form.nights} × {inr(room.rate)}</span>
            <span className="font-semibold">{inr(room.rate * form.nights)}</span>
          </div>
          {err && <p className="text-[12.5px] text-danger" role="alert">{err}</p>}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
            <Button type="submit" size="sm" disabled={!!err}>Create demo booking</Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
