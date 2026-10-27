import type { Metadata } from "next";
import Image from "next/image";
import { Check, PhoneCall, Sparkles, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { LeadForm } from "@/components/marketing/lead-form";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Book a Personalized DeskFloow Demo",
  description: "Schedule a 1-on-1 walkthrough tailored to your hotel, resort or property group. See reservations, tape charts, 2-way OTA sync, WhatsApp automation, and housekeeping.",
  alternates: { canonical: "/book-demo" },
};

const expect = [
  "A customized walkthrough shaped around your property type, room count and channel mix",
  "Deep dive into front desk tape chart, check-in guards and automatic night audits",
  "How Booking.com, Airbnb, Expedia and WhatsApp Business connect to your account",
  "Zero-loss data migration roadmap for existing guest history, rates and bookings",
  "Transparent commercial proposal tailored to your portfolio size with no hidden fees",
];

export default function BookDemoPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Book a demo" }]}
        eyebrow="Personalized Walkthrough"
        title="See DeskFloow configured for your hotel."
        lead="Share a few details and our hospitality engineering specialists will prepare a live demo tailored to how your property actually operates."
      />
      <section className="container-x grid gap-10 pb-24 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src="/images/frontdesk-tablet-reception.jpg"
              alt="Luxury hotel front desk staff with modern tablet"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-4.5 backdrop-blur dark:bg-[#160a2c]/90 dark:border dark:border-white/10">
              <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300">
                <Sparkles className="size-4 text-gold-500" />
                <p className="text-[13px] font-bold">1-on-1 Hospitality Consultation</p>
              </div>
              <p className="mt-1 text-[12.5px] text-muted dark:text-white/70">
                Prefer immediate answers? Our team is available for quick phone or WhatsApp consultations.
              </p>
              <ButtonLink href="/contact" size="sm" variant="secondary" className="mt-3">
                <PhoneCall className="size-3.5" /> Contact Sales Directly
              </ButtonLink>
            </div>
          </div>

          <h2 className="mt-8 text-[20px] font-bold text-ink dark:text-white">What you will experience</h2>
          <ul className="mt-4 space-y-3">
            {expect.map((e) => (
              <li key={e} className="flex gap-3 text-[14.5px] text-muted dark:text-white/80">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                  <Check className="size-3.5" aria-hidden />
                </span>
                {e}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-line bg-brand-50/60 p-4 text-[13px] text-muted dark:border-white/10 dark:bg-white/5">
            <p className="flex items-center gap-2 font-medium text-ink dark:text-white">
              <ShieldCheck className="size-4 text-brand-600 dark:text-brand-400" /> No commitment required
            </p>
            <p className="mt-1">
              Demos take 25–35 minutes over Google Meet or Zoom. We will show real workflow scenarios matching your current software stack.
            </p>
          </div>
        </div>

        <LeadForm mode="demo" />
      </section>
    </>
  );
}
