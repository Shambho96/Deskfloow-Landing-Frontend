import Link from "next/link";
import { Hero } from "@/components/marketing/hero";
import { ValueStrip } from "@/components/marketing/value-strip";
import { HospitalityExperience } from "@/components/marketing/hospitality-experience";
import { FeatureBento } from "@/components/marketing/feature-bento";
import { RoiCalculator } from "@/components/marketing/roi-calculator";
import { HomePillars } from "@/components/marketing/pillars";
import { BookingJourney } from "@/components/marketing/booking-journey";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Comparison } from "@/components/marketing/comparison";
import { Testimonials } from "@/components/marketing/testimonials";
import { PricingCards } from "@/components/marketing/pricing";
import { FinalCta } from "@/components/marketing/final-cta";
import { SectionHeading } from "@/components/ui/reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <HospitalityExperience />
      <FeatureBento />
      <RoiCalculator />
      <HomePillars />
      <BookingJourney />
      <HowItWorks />
      <Comparison />
      <Testimonials />
      <section className="py-24 sm:py-32" id="pricing">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Transparent Pricing"
            title="Plans engineered for every property size."
            lead="Simple, transparent packaging per room per month. No hidden setup fees, no lock-in contracts."
          />
          <div className="mt-12">
            <PricingCards />
          </div>
          <p className="mt-8 text-center text-[14px]">
            <Link href="/pricing" className="font-semibold text-brand-600 hover:text-brand-700 hover:underline">
              Compare complete feature breakdown across all tiers →
            </Link>
          </p>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
