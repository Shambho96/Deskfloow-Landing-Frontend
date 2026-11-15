import type { Metadata } from "next";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { AboutShowcase } from "@/components/marketing/about-showcase";
import { FinalCta } from "@/components/marketing/final-cta";
import { ButtonLink } from "@/components/ui/button";
import { coreSeoKeywords, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About DeskFloow — Modern Cloud Hospitality & Hotel Operations Platform",
  description:
    "Discover how DeskFloow unifies cloud hotel front-desk PMS, visual tape charts, 2-way OTA distribution, commission-free direct bookings, automated WhatsApp confirmations, housekeeping, and revenue analytics.",
  keywords: [
    "about DeskFloow",
    "modern hospitality technology",
    "cloud hotel software company",
    "intelligent hotel operations platform",
    ...coreSeoKeywords.slice(0, 12),
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/about`,
    siteName: "DeskFloow",
    title: "About Us — Built for Modern Hospitality · DeskFloow",
    description:
      "Learn how DeskFloow connects reservations, front desk, OTA channels, housekeeping, and guest communication in one hotel workspace.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About Us" }]}
        eyebrow="About DeskFloow"
        title="Built to bring every part of your hotel into effortless flow."
        lead="We started DeskFloow with a simple conviction: hotel teams should spend their time welcoming guests, not reconciling five disconnected software tools."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/book-demo">
            <CalendarCheck className="size-4" /> Book a Guided Demo <ArrowRight className="size-4" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact Us
          </ButtonLink>
        </div>
      </PageHero>

      <AboutShowcase />
      <FinalCta />
    </>
  );
}
