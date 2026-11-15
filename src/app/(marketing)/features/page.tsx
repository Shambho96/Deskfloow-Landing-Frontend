import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck, MessageSquare } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/marketing/final-cta";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/reveal";
import { featurePages } from "@/data/features";
import { coreSeoKeywords, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hotel PMS Features — Front Desk, Tape Chart, OTA Channel Manager, WhatsApp & POS",
  description:
    "Explore DeskFloow's dedicated hotel PMS modules: cloud front desk software, visual 7-day tape chart, 2-way OTA channel manager, 0% commission direct booking engine, WhatsApp confirmations, guest CRM, housekeeping floor plans, POS orders, and revenue analytics.",
  keywords: coreSeoKeywords,
  alternates: { canonical: "/features" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/features`,
    siteName: "DeskFloow",
    title: "Hotel PMS Features — All-in-One Cloud Hotel Management Software · DeskFloow",
    description:
      "Dedicated modules for front desk PMS, drag-and-drop tape charts, 2-way OTA sync, direct bookings, WhatsApp alerts, housekeeping, POS billing, and hotel analytics.",
    images: [{ url: "/images/lobby.jpg", width: 1376, height: 768, alt: "DeskFloow Hotel PMS Features" }],
  },
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "DeskFloow Hotel Property Management System Modules",
  itemListElement: featurePages.map((f, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: f.label,
    description: f.metaDescription,
    url: `${siteUrl}/features/${f.slug}`,
  })),
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Features" }]}
        eyebrow="All Hotel PMS Modules"
        title="Every hotel operation, on its own dedicated workspace."
        lead="Explore each DeskFloow module in detail — from cloud front desk check-ins, visual 7-day tape charts, and 2-way OTA channel sync to commission-free direct bookings, automated WhatsApp confirmations, smart housekeeping, POS room billing, and multi-property analytics."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/book-demo">
            <CalendarCheck className="size-4" /> Book a Guided Demo <ArrowRight className="size-4" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            <MessageSquare className="size-4" /> Contact Us
          </ButtonLink>
        </div>
      </PageHero>

      {/* Dedicated Feature Pages Directory Grid */}
      <section className="py-16 sm:py-24 bg-white border-b border-line">
        <div className="container-x">
          <SectionHeading
            eyebrow="Dedicated Module Pages"
            title="Choose a module to explore its live interactive workflow."
            lead="Click any capability below to open its dedicated feature page with interactive product previews, hospitality workflows, and FAQs."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featurePages.map((f) => {
              const Icon = f.icon;
              return (
                <Link
                  key={f.slug}
                  id={f.slug}
                  href={`/features/${f.slug}`}
                  className="group scroll-mt-24 flex flex-col justify-between rounded-3xl border border-brand-200/80 bg-gradient-to-b from-white via-white to-brand-50/40 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-lift"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-700 transition duration-300 group-hover:bg-brand-600 group-hover:text-white">
                        <Icon className="size-5.5" aria-hidden />
                      </span>
                      <span className="rounded-full border border-gold-300/70 bg-gold-100/70 px-3 py-1 text-[11px] font-semibold text-brand-950">
                        Dedicated Page
                      </span>
                    </div>
                    <h2 className="mt-5 text-[20px] font-bold tracking-tight text-ink group-hover:text-brand-700">
                      {f.label}
                    </h2>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{f.shortDesc}</p>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-700">
                    Open {f.label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </>
  );
}
