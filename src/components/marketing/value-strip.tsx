import { BedDouble, CalendarClock, DoorOpen, Sparkles } from "lucide-react";
import { RotatingWords } from "@/components/animations/rotating-words";
import { CountUp } from "@/components/animations/count-up";
import { Reveal } from "@/components/ui/reveal";
import { propertySnapshot } from "@/lib/metrics";

const types = ["Independent hotels", "Boutique inns", "Luxury resorts", "Homestays", "Serviced apartments", "Hotel groups", "Heritage properties", "Business hotels"];

export function ValueStrip() {
  const s = propertySnapshot("grand-palace");
  const metrics = [
    { label: "Demo rooms", value: s.rooms.length, icon: BedDouble },
    { label: "Occupied tonight", value: s.inHouse.length, icon: DoorOpen },
    { label: "Arrivals today", value: s.arrivals.length, icon: CalendarClock },
    { label: "Housekeeping tasks", value: s.pendingHk.length, icon: Sparkles },
  ];

  return (
    <section className="relative border-y border-line bg-white py-20">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <h2 className="text-[34px] leading-[1.05] font-semibold tracking-[-0.03em] text-ink sm:text-[48px]">
            One workspace to
            <br />
            <RotatingWords
              className="bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent"
              words={["Manage Every Room.", "Sync Every Booking.", "Delight Every Guest.", "Grow Every Stay."]}
            />
          </h2>
          <p className="lead mt-5 max-w-lg">
            Reservations, room readiness, guest conversations and revenue stay connected — so your team works from one
            clear picture instead of five disconnected tools.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-card/60 p-2">
            <div className="flex items-center justify-between px-3 pt-2 pb-3">
              <p className="text-[13px] font-semibold text-foreground">{s.property.name} · Operations Overview</p>
              <span className="chip bg-primary/10 text-primary font-semibold">Live Metrics</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-border/70 bg-card p-5 shadow-sm">
                  <m.icon className="size-5 text-primary" />
                  <CountUp value={m.value} className="mt-3 block text-[40px] leading-none font-bold tracking-tight text-foreground" />
                  <p className="mt-2 text-[13px] text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <p className="mb-5 text-center text-[12px] font-medium tracking-widest text-muted-foreground uppercase">Designed for every kind of stay</p>
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...types, ...types].map((t, i) => (
            <span key={i} className="rounded-full border border-line bg-brand-50/50 px-5 py-2 text-[14px] text-ink/70" aria-hidden={i >= types.length}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
