import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Prose } from "@/components/layout/prose";

export const metadata: Metadata = {
  title: "Terms of Service · DeskFloow",
  description: "Terms governing use of the DeskFloow website and platform services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Terms" }]}
        eyebrow="Legal"
        title="Terms of Service"
        lead="Terms and conditions governing the use of the DeskFloow marketing website and software services."
      />
      <Prose updated="October 2026">
        <p>
          Welcome to DeskFloow. These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of DeskFloow&apos;s website, software solutions, and related hospitality tools.
        </p>

        <h2>Platform Services &amp; SaaS Subscriptions</h2>
        <p>
          DeskFloow provides hotel property management, OTA channel distribution, guest messaging automation, and front-desk software. Formal service level agreements (SLAs), subscription fees, and commercial terms are executed in individual Master Services Agreements with our hotelier clients.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All trademarks, software designs, user interfaces, proprietary algorithms, and brand assets (including the DeskFloow name and logo) are the exclusive property of DeskFloow. Unauthorized reproduction or reverse engineering is strictly prohibited.
        </p>

        <h2>Third-Party Trademarks &amp; Channel Integrations</h2>
        <p>
          Channel partner names including Booking.com, Airbnb, Expedia, Agoda, MakeMyTrip, and WhatsApp are trademarks of their respective owners. DeskFloow connects to third-party APIs pursuant to their respective developer guidelines and authorized property credentials.
        </p>

        <h2>Acceptable Use</h2>
        <p>
          You agree not to misuse our website or attempt unauthorized access to our servers, infrastructure, or connected client databases.
        </p>

        <h2>Contact</h2>
        <p>
          For inquiries regarding these Terms, please contact our team via the{" "}
          <Link href="/contact" className="text-brand-600 underline dark:text-brand-400">
            contact page
          </Link>.
        </p>
      </Prose>
    </>
  );
}
