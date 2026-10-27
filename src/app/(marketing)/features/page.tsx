import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { FeaturePillars } from "@/components/marketing/pillars";
import { FinalCta } from "@/components/marketing/final-cta";
import { ButtonLink } from "@/components/ui/button";
import { platformNav } from "@/data/nav";

export const metadata: Metadata = {
  title: "Features — Front desk, tape chart, channel manager, WhatsApp & more",
  description: "Explore DeskFloow's hotel PMS modules: front desk dashboard, drag-and-drop tape chart, OTA channel manager, WhatsApp guest messaging, housekeeping floor plan, guest CRM, room-service orders and folios.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Features" }]}
        eyebrow="Platform"
        title="Every hotel operation, on one connected record."
        lead="Explore DeskFloow's unified platform capabilities: front desk operations, visual tape charts, 2-way OTA distribution, automated WhatsApp concierge, smart housekeeping, and revenue analytics."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/book-demo">Book a Personalized Demo</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">Speak with a Specialist</ButtonLink>
        </div>
      </PageHero>
      <nav aria-label="Modules" className="sticky top-[68px] z-30 border-y border-border bg-card/85 text-card-foreground backdrop-blur-xl">
        <ul className="container-x flex gap-1 overflow-x-auto py-2 scrollbar-thin">
          {platformNav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] whitespace-nowrap text-foreground/75 hover:bg-muted hover:text-foreground">
                <n.icon className="size-3.5 text-primary" /> {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <FeaturePillars />
      <FinalCta />
    </>
  );
}
