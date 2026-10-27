import type { Metadata } from "next";
import { CalendarCheck, Clock, MessagesSquare, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { LeadForm } from "@/components/marketing/lead-form";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact the DeskFloow team",
  description: "Questions about DeskFloow for your hotel, resort, homestay or hotel group? Send the team a message.",
  alternates: { canonical: "/contact" },
};

const info = [
  { Icon: MessagesSquare, title: "Sales & product questions", body: "Tell us about your property, current tools and what you want to fix first." },
  { Icon: Clock, title: "Response time", body: "The team replies on business days once the contact inbox is connected." },
  { Icon: ShieldCheck, title: "Your data", body: "This form currently validates in the browser only. Nothing is stored or emailed yet." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        title="Let's talk about your property."
        lead="Whether you run eight rooms or eight hotels, share a little context and the team will follow up."
      />
      <section className="container-x grid gap-10 pb-24 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          {info.map(({ Icon, title, body }) => (
            <div key={title} className="card flex gap-4 p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700"><Icon className="size-5" aria-hidden /></span>
              <div>
                <h2 className="text-[15px] font-semibold">{title}</h2>
                <p className="mt-1 text-[14px] leading-relaxed text-muted">{body}</p>
              </div>
            </div>
          ))}
          <div className="rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-6 text-white">
            <CalendarCheck className="size-6 text-gold-300" aria-hidden />
            <h2 className="mt-3 text-[18px] font-semibold">Prefer a guided walkthrough?</h2>
            <p className="mt-1 text-[14px] text-white/75">Book a demo tailored to your property type and room count.</p>
            <ButtonLink href="/book-demo" variant="gold" size="sm" className="mt-4">Book a demo</ButtonLink>
          </div>
        </div>
        <LeadForm mode="contact" />
      </section>
    </>
  );
}
