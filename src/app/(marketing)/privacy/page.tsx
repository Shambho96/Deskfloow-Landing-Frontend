import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Prose } from "@/components/layout/prose";

export const metadata: Metadata = {
  title: "Privacy Policy · DeskFloow",
  description: "How DeskFloow handles visitor information and platform security.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Privacy" }]}
        eyebrow="Legal"
        title="Privacy Policy"
        lead="A transparent summary of how DeskFloow collects, protects and manages information."
      />
      <Prose updated="October 2026">
        <p>
          DeskFloow (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy and ensuring the security of your hotel and guest data. This Privacy Policy outlines our practices regarding information collection, usage, and safeguarding.
        </p>

        <h2>Information Collected on this Website</h2>
        <p>
          When you request a demo or contact our sales team, we collect your name, business email address, phone number, property name, room count, and operational requirements to provide you with relevant product information and consultation.
        </p>

        <h2>Data Security &amp; Hospitality Protection</h2>
        <p>
          We employ enterprise-grade security protocols, including AES-256 encryption at rest, TLS 1.3 encryption in transit, and role-based staff access controls. We adhere to industry best practices to ensure that hotel reservations, guest profiles, and financial transaction records remain confidential and secure.
        </p>

        <h2>Third-Party Integrations</h2>
        <p>
          DeskFloow integrates with certified third-party service providers (such as OTA channel partners, official WhatsApp Business API gateways, and licensed payment processors) solely to facilitate automated hotel operations as authorized by the property manager.
        </p>

        <h2>Cookies and Preferences</h2>
        <p>
          We store minimal preferences (such as your light/dark theme selection) locally in your browser. We do not sell your personal or hotel operational data to third parties.
        </p>

        <h2>Contact Our Privacy Team</h2>
        <p>
          If you have questions regarding this Privacy Policy or your data protection rights, please contact our team via the{" "}
          <Link href="/contact" className="text-brand-600 underline dark:text-brand-400">
            contact page
          </Link>.
        </p>
      </Prose>
    </>
  );
}
