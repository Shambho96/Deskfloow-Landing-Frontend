"use client";

import { useState } from "react";
import { UserRound, ShieldCheck } from "lucide-react";
import { HkBadge, hkMeta } from "@/components/ui/badges";
import { demoRooms } from "@/data/demo-properties";
import { demoReservations } from "@/data/demo-reservations";
import { guestOf } from "@/data/demo-guests";
import { shortDate } from "@/lib/dates";
import { cn, inr } from "@/lib/utils";
import type { Room } from "@/types";

const COLS = 5;
const ROWS = 3;

export function FloorPlan() {
  const rooms = demoRooms.filter((r) => r.propertyId === "grand-palace");
  const reservations = demoReservations.filter((r) => r.propertyId === "grand-palace");

  const floors = [...new Set(rooms.map((r) => r.floor))].sort((a, b) => a - b);
  const [floor, setFloor] = useState(floors[0] ?? 1);
  const [selectedId, setSelectedId] = useState<string>(() => rooms.find((r) => r.floor === (floors[0] ?? 1))?.id ?? rooms[0]?.id ?? "");

  const floorRooms = rooms.filter((r) => r.floor === floor);
  const selected = rooms.find((r) => r.id === selectedId) ?? floorRooms[0] ?? rooms[0];

  const inHouse = reservations.filter((r) => r.status === "checked-in");
  const occupant = (r: Room) => inHouse.find((x) => x.roomId === r.id);
  const nextArrival = selected && reservations.filter((x) => x.roomId === selected.id && x.status === "confirmed").sort((a, b) => a.checkIn.localeCompare(b.checkIn))[0];
  const occ = selected && occupant(selected);
  const guest = occ ? guestOf(occ.guestId) : nextArrival ? guestOf(nextArrival.guestId) : null;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="card p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 rounded-full bg-muted p-1" role="tablist" aria-label="Floor selection">
            {floors.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={floor === f}
                onClick={() => {
                  setFloor(f);
                  const firstOnFloor = rooms.find((r) => r.floor === f);
                  if (firstOnFloor) setSelectedId(firstOnFloor.id);
                }}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition",
                  floor === f
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Floor {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" /> Clean
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-amber-500" /> Cleaning
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-rose-500" /> Dirty
            </span>
          </div>
        </div>

        {/* Floor Grid Layout */}
        <div className="relative rounded-2xl border border-border/70 bg-muted/20 p-3">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${COLS}, minmax(0,1fr))`,
              gridTemplateRows: `repeat(${ROWS}, 92px)`,
            }}
          >
            {floorRooms.map((r) => {
              const curOcc = occupant(r);
              const m = hkMeta[r.housekeeping];
              const isSelected = r.id === selected?.id;

              return (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  style={{
                    gridColumn: `${r.x + 1} / span ${r.w}`,
                    gridRow: `${r.y + 1} / span ${r.h}`,
                  }}
                  className={cn(
                    "group relative flex flex-col justify-between rounded-xl border p-2.5 text-left transition",
                    isSelected
                      ? "border-primary bg-card shadow-md ring-2 ring-primary/40"
                      : "border-border/70 bg-card/80 hover:border-primary/50 hover:bg-card",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[14px] font-bold text-foreground">{r.number}</span>
                      <span className="ml-1 text-[11px] text-muted-foreground">· {r.category}</span>
                    </div>
                    <span className={cn("size-2 rounded-full", m.dot)} />
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    {curOcc ? (
                      <span className="flex items-center gap-1 truncate font-medium text-primary">
                        <UserRound className="size-3" /> {guestOf(curOcc.guestId).name}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Vacant</span>
                    )}
                    <span className="font-mono text-muted-foreground">{inr(r.rate)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Room Details Sidebar */}
      {selected && (
        <aside className="card flex flex-col justify-between p-5">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[20px] font-bold text-foreground">Room {selected.number}</p>
                <p className="text-[13px] text-muted-foreground">
                  Floor {selected.floor} · {selected.category}
                </p>
              </div>
              <HkBadge status={selected.housekeeping} />
            </div>

            <dl className="grid grid-cols-2 gap-3 rounded-xl bg-muted/30 p-3 text-[13px]">
              <div>
                <dt className="text-muted-foreground">Nightly rate</dt>
                <dd className="font-semibold text-foreground">{inr(selected.rate)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Max occupancy</dt>
                <dd className="font-semibold text-foreground">{selected.maxGuests} guests</dd>
              </div>
            </dl>

            <div>
              <p className="text-[12px] font-semibold tracking-wider text-muted-foreground uppercase">
                Stay status
              </p>
              {occ ? (
                <div className="mt-2 rounded-xl border border-primary/20 bg-primary/5 p-3 text-[13px]">
                  <p className="font-semibold text-foreground flex items-center gap-1.5">
                    <UserRound className="size-3.5 text-primary" /> In-house: {guest?.name}
                  </p>
                  <p className="mt-1 text-[12px] text-muted-foreground">
                    Check-out: {shortDate(occ.checkOut)} · {occ.id}
                  </p>
                </div>
              ) : nextArrival ? (
                <div className="mt-2 rounded-xl border border-border/80 bg-muted/30 p-3 text-[13px]">
                  <p className="font-semibold text-foreground">Next arrival: {guest?.name}</p>
                  <p className="mt-1 text-[12px] text-muted-foreground">
                    Arrives: {shortDate(nextArrival.checkIn)} · {nextArrival.source}
                  </p>
                </div>
              ) : (
                <p className="mt-2 text-[13px] text-muted-foreground">
                  Vacant and ready for incoming reservations.
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 border-t border-border pt-4 text-[12px] text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-emerald-500" />
            Synchronized with housekeeping tablets &amp; tape chart
          </div>
        </aside>
      )}
    </div>
  );
}
