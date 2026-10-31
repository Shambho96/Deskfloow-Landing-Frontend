import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Prose } from "@/components/layout/prose";

export const metadata: Metadata = {
  title: "Privacy Policy · DeskFloow",
  description:
    "Master Privacy Policy governing hospitality data processing, system telemetry, and guest record handling at DeskFloow.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Privacy" }]}
        eyebrow="Legal"
        title="Master Privacy Policy"
        lead="Governing Hospitality Data Processing, System Telemetry, and Guest Record Handling"
      />
      <Prose updated="October 28, 2026">
        <h2>1. Introduction &amp; Operational Scope</h2>
        <p>
          DeskFloow (&ldquo;DeskFloow&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the
          cloud-based hospitality operational intelligence platform accessible at deskfloow.in. This Privacy Policy
          outlines our procedures concerning the collection, storage, and processing of property management logs,
          administrative records, and hotel guest data processed through our platform.
        </p>

        <h2>2. Data Protection Roles &amp; Responsibilities</h2>
        <p>
          <strong>Data Controller (Hotel Partner):</strong> The subscribing hotel or hospitality operator determines the
          purpose and legal basis for collecting guest data, including names, room allocations, service orders, and
          check-in dates.
        </p>
        <p>
          <strong>Data Processor (DeskFloow):</strong> DeskFloow acts strictly as a data processor / intermediary. We
          handle guest records and task logs solely pursuant to the documented operational instructions of the
          subscribing hotel.
        </p>

        <h2>3. Categories of Information Collected</h2>
        <ul>
          <li>
            <strong>Subscriber Account &amp; Administrative Profiles:</strong> Full name, authorized corporate email,
            phone contact, property identification, operational designation, and tax/billing identifiers (e.g., GSTIN).
          </li>
          <li>
            <strong>Property Operational Data:</strong> Room status configurations, digital checklists, housekeeping
            logs, task assignments, shift handover briefings, and internal engineering audit tickets.
          </li>
          <li>
            <strong>Guest Information (Client-Controlled):</strong> Information fed via PMS integrations or manual
            front-desk input, including guest name, allocated room, stay dates, and specific operational service
            requests.
          </li>
          <li>
            <strong>System Telemetry &amp; Audit Logs:</strong> IP addresses, browser specifications, login timestamps,
            and immutable activity logs documenting room state modifications.
          </li>
        </ul>

        <h2>4. Purpose of Data Processing</h2>
        <p>
          Information collected is processed strictly to: (a) coordinate real-time room readiness between reception and
          housekeeping; (b) compute turnaround metrics and operational bottlenecks; (c) verify user authorization; and
          (d) fulfill statutory billing and security obligations under applicable law.
        </p>

        <h2>5. Sub-Processors &amp; Data Disclosures</h2>
        <p>
          DeskFloow does not sell, lease, or monetize client or guest data. Data is shared exclusively with certified
          infrastructure partners: cloud hosting providers (e.g., AWS/GCP regions in India), SMS/transactional
          notification gateways, and judicial or regulatory authorities upon receipt of a lawful compliance order.
        </p>

        <h2>6. Information Security Standards</h2>
        <p>
          DeskFloow implements industry-grade technical and organizational safeguards to ensure confidentiality,
          integrity, and operational availability across all hotel systems:
        </p>
        <ul>
          <li>
            <strong>Cryptographic Controls:</strong> Transport Layer Security (TLS 1.3) encryption for data in transit;
            AES-256 bit encryption for persistent data at rest.
          </li>
          <li>
            <strong>Session Auditing:</strong> Anomaly detection, multi-factor administrative protections, and complete
            traceability of all operational modifications.
          </li>
        </ul>

        <h2>7. Data Retention &amp; Lifecycle Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-border text-foreground">
                <th className="py-2.5 pr-4 font-semibold">Data Category</th>
                <th className="py-2.5 pr-4 font-semibold">Retention Window</th>
                <th className="py-2.5 font-semibold">Disposition Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2.5 pr-4 font-medium text-foreground">Shift &amp; Housekeeping Logs</td>
                <td className="py-2.5 pr-4">Active subscription + 90 days</td>
                <td className="py-2.5">Exportable in CSV/JSON; purged afterward.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-foreground">Guest Operational Records</td>
                <td className="py-2.5 pr-4">Controlled by Hotel Partner policy</td>
                <td className="py-2.5">Automated purge upon hotel request / checkout.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-foreground">Audit &amp; Security Trails</td>
                <td className="py-2.5 pr-4">12 calendar months</td>
                <td className="py-2.5">Aggregated &amp; permanently scrubbed.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-foreground">Billing &amp; Invoicing Data</td>
                <td className="py-2.5 pr-4">7 statutory fiscal years</td>
                <td className="py-2.5">Retained for tax and legal compliance.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>8. Subscriber &amp; Guest Legal Warranties</h2>
        <p>
          Because DeskFloow processes data entered by property staff, the Hotel Partner represents and warrants that it
          maintains lawful authority, transparent guest notices, and required consents under the Digital Personal Data
          Protection Act (DPDPA), 2023 and applicable privacy laws before entering guest personal identifiers into the
          platform.
        </p>

        <h2>9. Rights &amp; Data Subject Requests</h2>
        <p>
          Authorized staff may review, correct, or request deletion of their administrative profiles via their property
          portal. Hotel guests seeking to exercise privacy rights regarding records held in DeskFloow must contact the
          hotel management directly, as DeskFloow cannot unilaterally alter client records without hotel authorization.
        </p>

        <div className="rounded-2xl border border-border bg-muted/40 p-5">
          <p className="font-semibold text-foreground">PRIVACY GOVERNANCE &amp; INQUIRIES</p>
          <p className="mt-1">
            DeskFloow Data Governance Office • Email:{" "}
            <a href="mailto:privacy@deskfloow.in" className="text-brand-600 underline">
              privacy@deskfloow.in
            </a>
          </p>
          <p>Administrative Operations: Maharashtra, Republic of India.</p>
        </div>

        <hr className="my-10 border-border" />

        <div>
          <p className="text-xs font-semibold tracking-widest text-foreground uppercase">
            DeskFloow TERMS OF SERVICE · HOTEL INTELLIGENT OPERATIONS PLATFORM
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Domain: deskfloow.in • Effective: October 28, 2026</p>
          <h2 className="!mt-3">Master Software-as-a-Service Agreement</h2>
          <p className="text-sm text-muted-foreground">
            Commercial Terms, Intellectual Property, and Platform Usage Guidelines
          </p>
        </div>

        <h2>1. Acceptance of Terms &amp; Legal Authority</h2>
        <p>
          By accessing, registering for, or using the DeskFloow platform at deskfloow.in (the &ldquo;Service&rdquo;),
          the commercial customer (&ldquo;Subscriber&rdquo;, &ldquo;Hotel Partner&rdquo;, or &ldquo;Client&rdquo;)
          agrees to be bound by these Terms of Service (&ldquo;Agreement&rdquo;). The individual accepting these terms
          represents that they have full corporate authority to bind the hotel entity.
        </p>

        <h2>2. Platform Services &amp; Licensing</h2>
        <p>
          DeskFloow grants the Subscriber a non-exclusive, non-transferable, revocable right during the subscription
          term to access and utilize our operational intelligence platform for hotel room monitoring, housekeeping
          tracking, duty management, and operational analytics across authorized properties.
        </p>

        <h2>3. Account Security &amp; User Conduct</h2>
        <ul>
          <li>
            <strong>Credential Protection:</strong> The Subscriber is solely responsible for maintaining the
            confidentiality of staff login accounts and all operational actions performed under its property IDs.
          </li>
          <li>
            <strong>Acceptable Use:</strong> Subscriber shall not decompile, reverse-engineer, mirror, or harvest
            platform modules, nor introduce malicious scripts, viruses, or automated scraping bots.
          </li>
          <li>
            <strong>Immediate Notice:</strong> Subscriber must immediately inform DeskFloow of any unauthorized
            credential access or security breach affecting their property dashboard.
          </li>
        </ul>

        <h2>4. Subscription Tiers, Billing &amp; Taxes</h2>
        <p>
          Platform fees are determined by the selected tier (e.g., active room inventory, module selections, and
          properties connected). Fees are billed in advance on a recurring monthly or annual basis. All fees are
          exclusive of statutory taxes (including Goods and Services Tax / GST), which will be applied to invoices at
          prevailing statutory rates. Failure to settle invoices within fifteen (15) days of due date may result in
          account suspension.
        </p>
        <div className="rounded-2xl border border-border bg-muted/40 p-5">
          <p className="font-semibold text-foreground">IMPORTANT OPERATIONAL NOTICE</p>
          <p className="mt-1">
            DeskFloow is a coordination and operational tracking SaaS. It does not replace physical on-site security,
            life safety audits, or guest verification required by municipal hospitality regulations.
          </p>
        </div>

        <h2>5. Proprietary Rights &amp; Data Ownership</h2>
        <ul>
          <li>
            <strong>DeskFloow Intellectual Property:</strong> All software architecture, algorithmic logic, user
            interfaces, documentation, logos, and platform analytics remain the exclusive intellectual property of
            DeskFloow.
          </li>
          <li>
            <strong>Client Data Ownership:</strong> The Subscriber retains full ownership of all proprietary hotel
            operational data, shift records, room layouts, and guest details uploaded. Subscriber grants DeskFloow a
            limited license solely to host, compute, and transmit this data for operational delivery.
          </li>
        </ul>

        <h2>6. Service Availability &amp; Scheduled Maintenance</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-border text-foreground">
                <th className="py-2.5 pr-4 font-semibold">Uptime Objective</th>
                <th className="py-2.5 pr-4 font-semibold">Maintenance Windows</th>
                <th className="py-2.5 font-semibold">Support Escalation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-foreground">99.5% Monthly Uptime</td>
                <td className="py-2.5 pr-4">Off-peak night hours with 48h advance notice</td>
                <td className="py-2.5">support@deskfloow.in (Priority response)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>7. Limitation of Liability &amp; Warranty Disclaimers</h2>
        <p>
          The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. DeskFloow disclaims
          all implied warranties of merchantability or fitness for a particular hospitality purpose. DeskFloow shall not
          be liable for missed housekeeping cleans, delayed room check-ins, lost guest belongings, or lost hotel
          revenue. In no event shall DeskFloow&apos;s total aggregate liability exceed the total subscription fees paid
          by Subscriber in the preceding twelve (12) months.
        </p>

        <h2>8. Term, Suspension &amp; Termination</h2>
        <p>
          Either party may terminate this Agreement upon thirty (30) days&apos; written notice prior to subscription
          renewal. DeskFloow reserves the right to immediately suspend access in the event of non-payment or serious
          security violation. Upon termination, the Subscriber will have a thirty (30) day window to request an export
          of their operational logs.
        </p>

        <h2>9. Governing Law &amp; Dispute Jurisdiction</h2>
        <p>
          This Agreement shall be governed and interpreted under the laws of the Republic of India. All disputes arising
          out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the competent
          courts in Maharashtra, India.
        </p>

        <div className="rounded-2xl border border-border bg-muted/40 p-5">
          <p className="font-semibold text-foreground">CORPORATE &amp; LEGAL CONTACT</p>
          <p className="mt-1">DeskFloow Technologies • Legal Department</p>
          <p>
            Website:{" "}
            <a href="https://deskfloow.in" className="text-brand-600 underline">
              https://deskfloow.in
            </a>{" "}
            • Email:{" "}
            <a href="mailto:legal@deskfloow.in" className="text-brand-600 underline">
              legal@deskfloow.in
            </a>
          </p>
        </div>
      </Prose>
    </>
  );
}
