import type { Metadata } from "next";
import { CircleDashed, FlaskConical, CheckCircle2, MessageCircle, CreditCard, Mail, Webhook, Database, ShieldCheck, Repeat, ScrollText, GitMerge, Network } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/marketing/final-cta";
import { SectionHeading, Reveal } from "@/components/ui/reveal";
import { channels, channelStateLabel } from "@/data/channels";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Integrations — OTA channels, WhatsApp, payments",
  description: "DeskFloow's integration status and architecture for OTA channels, WhatsApp Business Platform, payments and email — with honest connection states.",
  alternates: { canonical: "/integrations" },
};

const stateIcon = { connected: CheckCircle2, "setup-required": CircleDashed, demo: FlaskConical };

const other = [
  { icon: MessageCircle, name: "WhatsApp Business Platform", state: "Not configured", text: "Template messages, delivery status and inbound replies require an approved WhatsApp Business account, opt-in and template approval. The site currently shows simulations only." },
  { icon: CreditCard, name: "Payment provider", state: "Not configured", text: "Deposits and folio payments will use a PCI-compliant provider's hosted checkout. No card data is collected by this site." },
  { icon: Mail, name: "Email notifications", state: "Not configured", text: "Booking confirmations and lead notifications will be sent from a transactional email service once connected." },
];

const architecture = [
  { icon: Network, title: "Channel-specific adapters", text: "Each OTA gets an adapter that maps its API and webhook formats to DeskFloow's model." },
  { icon: Database, title: "Normalised reservation model", text: "One internal shape for reservations, guests, rates and inventory, regardless of source." },
  { icon: Webhook, title: "Webhook ingestion", text: "Signed webhooks are verified server-side before any data is accepted." },
  { icon: Repeat, title: "Idempotent processing & retries", text: "Events carry idempotency keys; failures go to a retry queue with alerting." },
  { icon: GitMerge, title: "Conflict detection & de-duplication", text: "Overlapping or duplicated bookings are flagged instead of silently overwritten." },
  { icon: ScrollText, title: "Audit logs & reconciliation", text: "Every inventory and reservation change is logged and periodically reconciled with each channel." },
  { icon: ShieldCheck, title: "Server-side secrets", text: "API credentials live only in server environment variables — never in the browser." },
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Integrations" }]} eyebrow="Integrations" title="Honest about what's connected." lead="Channel names appear for recognition only. This page shows the real status of each integration in the current prototype, and the architecture behind production connections." />

      <section id="ota" className="container-x scroll-mt-24 py-16">
        <SectionHeading title="OTA & booking channels" lead="Demo simulation: available in the interactive demo with local data. Setup required: needs credentials and certification work before it can be used." />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((c, i) => {
            const Icon = stateIcon[c.state];
            return (
              <Reveal key={c.id} delay={i * 0.04} className="card flex items-center gap-4 p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl text-[13px] font-bold text-white" style={{ background: c.color }}>{c.short}</span>
                <span className="flex-1">
                  <span className="block text-[15px] font-semibold">{c.name}</span>
                  <span className={cn("mt-0.5 inline-flex items-center gap-1 text-[12.5px]", c.state === "setup-required" ? "text-muted" : "text-gold-600")}>
                    <Icon className="size-3.5" /> {channelStateLabel[c.state]}
                  </span>
                </span>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-4 text-[12.5px] text-muted">No official partnership, certification or live connection with any listed OTA is claimed.</p>
      </section>

      <section id="messaging" className="container-x scroll-mt-24 py-16">
        <SectionHeading title="Messaging, payments & email" />
        <div id="payments" className="mt-10 grid scroll-mt-24 gap-4 md:grid-cols-3">
          {other.map((o) => (
            <div key={o.name} className="card p-6">
              <o.icon className="size-6 text-brand-600" />
              <p className="mt-4 text-[16px] font-semibold">{o.name}</p>
              <span className="chip mt-2 bg-slate-100 text-slate-600"><CircleDashed className="size-3" /> {o.state}</span>
              <p className="mt-3 text-[14px] text-muted">{o.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="architecture" className="scroll-mt-24 bg-brand-950 py-20 text-white">
        <div className="container-x">
          <SectionHeading tone="inverted" eyebrow="Architecture" title="How production integrations will work." lead="Designed so mock services in the demo can be replaced by real ones behind the same typed interfaces." />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {architecture.map((a) => (
              <div key={a.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <a.icon className="size-5 text-gold-300" />
                <p className="mt-3 text-[15px] font-semibold">{a.title}</p>
                <p className="mt-1.5 text-[13.5px] text-white/60">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
