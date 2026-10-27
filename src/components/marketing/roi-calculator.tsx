"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Calculator, Sparkles, TrendingUp, Clock, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { inr } from "@/lib/utils";

export function RoiCalculator() {
  const [rooms, setRooms] = useState(40);
  const [adr, setAdr] = useState(4800);
  const [occupancy, setOccupancy] = useState(70);
  const [otaShare, setOtaShare] = useState(65);

  const stats = useMemo(() => {
    const daysInYear = 365;
    const occupiedRoomsPerDay = (rooms * occupancy) / 100;
    const totalAnnualRoomNights = occupiedRoomsPerDay * daysInYear;
    const grossAnnualRevenue = totalAnnualRoomNights * adr;

    // OTAs take ~18% commission on their share of bookings
    const otaBookingsRevenue = grossAnnualRevenue * (otaShare / 100);
    const annualOtaCommission = otaBookingsRevenue * 0.18;

    // DeskFloow direct booking engine typically shifts 20-30% of OTA bookings to direct
    const shiftedToDirect = otaBookingsRevenue * 0.25;
    const commissionSaved = shiftedToDirect * 0.18;

    // Staff labor savings: automated WhatsApp checkin, 2-way sync, automated night audit
    // saves ~3.5 hours per day
    const staffHoursSavedAnnual = Math.round(3.5 * 365);
    const laborCostSaved = staffHoursSavedAnnual * 250; // avg approx hourly rate

    // Upsell via WhatsApp concierge (breakfast, room upgrades, early check-in)
    const ancillaryUpsellAnnual = occupiedRoomsPerDay * 365 * 180;

    const totalAnnualGain = Math.round(commissionSaved + laborCostSaved + ancillaryUpsellAnnual);

    return {
      grossAnnualRevenue,
      annualOtaCommission,
      commissionSaved: Math.round(commissionSaved),
      staffHoursSavedAnnual,
      totalAnnualGain,
    };
  }, [rooms, adr, occupancy, otaShare]);

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-[#0f0524] relative overflow-hidden" id="roi-calculator">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/15 blur-[120px]" />

      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Interactive ROI Calculator"
          title="See your hotel's projected revenue uplift."
          lead="Calculate how much you can save in OTA commissions and staff hours by modernizing with DeskFloow."
        />

        <div className="mx-auto mt-14 max-w-5xl card overflow-hidden border border-brand-200/80 dark:border-white/10 shadow-2xl">
          <div className="grid lg:grid-cols-[1.3fr_1fr]">
            {/* Sliders Input Panel */}
            <div className="p-8 sm:p-10 space-y-7 border-b lg:border-b-0 lg:border-r border-line dark:border-white/10">
              <div className="flex items-center gap-2 pb-2 border-b border-line dark:border-white/10">
                <Calculator className="size-5 text-brand-600 dark:text-brand-400" />
                <h3 className="text-[17px] font-bold text-ink dark:text-white">Your Property Parameters</h3>
              </div>

              {/* Slider 1: Rooms */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="roi-rooms" className="text-[14px] font-semibold text-ink dark:text-white">
                    Sellable Rooms:
                  </label>
                  <span className="rounded-lg bg-brand-100/80 dark:bg-white/10 px-3 py-1 text-[15px] font-bold text-brand-700 dark:text-brand-300">
                    {rooms} rooms
                  </span>
                </div>
                <input
                  id="roi-rooms"
                  type="range"
                  min={10}
                  max={200}
                  step={5}
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-brand-100 accent-brand-600 cursor-pointer dark:bg-white/10"
                />
                <div className="flex justify-between text-[11px] text-muted mt-1">
                  <span>10 rooms</span>
                  <span>100 rooms</span>
                  <span>200 rooms</span>
                </div>
              </div>

              {/* Slider 2: ADR */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="roi-adr" className="text-[14px] font-semibold text-ink dark:text-white">
                    Average Daily Rate (ADR):
                  </label>
                  <span className="rounded-lg bg-brand-100/80 dark:bg-white/10 px-3 py-1 text-[15px] font-bold text-brand-700 dark:text-brand-300">
                    {inr(adr)} / night
                  </span>
                </div>
                <input
                  id="roi-adr"
                  type="range"
                  min={1500}
                  max={20000}
                  step={500}
                  value={adr}
                  onChange={(e) => setAdr(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-brand-100 accent-brand-600 cursor-pointer dark:bg-white/10"
                />
                <div className="flex justify-between text-[11px] text-muted mt-1">
                  <span>₹1,500</span>
                  <span>₹10,000</span>
                  <span>₹20,000</span>
                </div>
              </div>

              {/* Slider 3: Occupancy */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="roi-occ" className="text-[14px] font-semibold text-ink dark:text-white">
                    Average Annual Occupancy:
                  </label>
                  <span className="rounded-lg bg-brand-100/80 dark:bg-white/10 px-3 py-1 text-[15px] font-bold text-brand-700 dark:text-brand-300">
                    {occupancy}%
                  </span>
                </div>
                <input
                  id="roi-occ"
                  type="range"
                  min={40}
                  max={95}
                  step={5}
                  value={occupancy}
                  onChange={(e) => setOccupancy(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-brand-100 accent-brand-600 cursor-pointer dark:bg-white/10"
                />
                <div className="flex justify-between text-[11px] text-muted mt-1">
                  <span>40%</span>
                  <span>70%</span>
                  <span>95%</span>
                </div>
              </div>

              {/* Slider 4: OTA Share */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="roi-ota" className="text-[14px] font-semibold text-ink dark:text-white">
                    Share of Bookings from OTAs:
                  </label>
                  <span className="rounded-lg bg-brand-100/80 dark:bg-white/10 px-3 py-1 text-[15px] font-bold text-brand-700 dark:text-brand-300">
                    {otaShare}%
                  </span>
                </div>
                <input
                  id="roi-ota"
                  type="range"
                  min={25}
                  max={90}
                  step={5}
                  value={otaShare}
                  onChange={(e) => setOtaShare(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-brand-100 accent-brand-600 cursor-pointer dark:bg-white/10"
                />
                <div className="flex justify-between text-[11px] text-muted mt-1">
                  <span>25% (Mostly direct)</span>
                  <span>60%</span>
                  <span>90% (Heavy OTA dependency)</span>
                </div>
              </div>
            </div>

            {/* Results Output Panel */}
            <div className="bg-gradient-to-br from-brand-900 via-brand-950 to-brand-950 p-8 sm:p-10 text-white flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/20 px-3 py-1 text-[11px] font-bold tracking-wider text-gold-300 uppercase">
                  <Sparkles className="size-3.5" /> Annual Impact Estimate
                </span>

                <div className="mt-6">
                  <p className="text-[13px] text-white/70">Projected Net Value Created / Year</p>
                  <p className="mt-1 text-[38px] sm:text-[46px] font-extrabold tracking-tight bg-gradient-to-r from-gold-300 via-gold-400 to-amber-300 bg-clip-text text-transparent">
                    +{inr(stats.totalAnnualGain)}
                  </p>
                  <p className="text-[12px] text-white/60">
                    Estimated annual profit boost from commission savings, staff efficiency and guest F&amp;B upsells.
                  </p>
                </div>

                <div className="mt-8 space-y-4 pt-6 border-t border-white/15">
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="text-white/75 flex items-center gap-2">
                      <TrendingUp className="size-4 text-emerald-400" /> OTA Commissions Saved:
                    </span>
                    <span className="font-bold text-emerald-400">+{inr(stats.commissionSaved)}</span>
                  </div>

                  <div className="flex justify-between items-center text-[14px]">
                    <span className="text-white/75 flex items-center gap-2">
                      <Clock className="size-4 text-brand-300" /> Front Desk Hours Reclaimed:
                    </span>
                    <span className="font-bold text-white">{stats.staffHoursSavedAnnual} hrs / yr</span>
                  </div>

                  <div className="flex justify-between items-center text-[14px]">
                    <span className="text-white/75 flex items-center gap-2">
                      <ShieldCheck className="size-4 text-gold-400" /> Double-Booking Risk:
                    </span>
                    <span className="font-bold text-emerald-400">0.0% (Zero)</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/15">
                <ButtonLink href="/book-demo" variant="gold" size="lg" className="w-full justify-center">
                  Claim These Savings · Book Demo <ArrowRight className="size-4" />
                </ButtonLink>
                <p className="mt-3 text-center text-[11.5px] text-white/50">
                  Custom analysis available based on your exact P&amp;L during demo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
