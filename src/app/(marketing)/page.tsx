import { Hero } from "@/components/marketing/hero";
import { ValueStrip } from "@/components/marketing/value-strip";
import { HospitalityExperience } from "@/components/marketing/hospitality-experience";
import { RoiCalculator } from "@/components/marketing/roi-calculator";
import { BookingJourney } from "@/components/marketing/booking-journey";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Comparison } from "@/components/marketing/comparison";
import { Testimonials } from "@/components/marketing/testimonials";
import { FinalCta } from "@/components/marketing/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <HospitalityExperience />
      <RoiCalculator />
      <BookingJourney />
      <HowItWorks />
      <Comparison />
      <Testimonials />
      <FinalCta />
    </>
  );
}
