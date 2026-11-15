import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/layout/providers";
import { coreSeoKeywords, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DeskFloow — Cloud Hotel PMS, Channel Manager, Booking Engine & WhatsApp Automation",
    template: "%s · DeskFloow",
  },
  description:
    "DeskFloow is an all-in-one cloud hotel PMS and guest experience platform unifying front desk software, visual 7-day tape charts, 2-way OTA channel manager, 0% commission direct booking engine, automated WhatsApp booking confirmations, smart housekeeping, restaurant POS billing, GST folios, and hotel analytics.",
  applicationName: "DeskFloow",
  category: "Hospitality Software",
  authors: [{ name: "DeskFloow Hospitality Cloud", url: siteUrl }],
  creator: "DeskFloow",
  publisher: "DeskFloow",
  keywords: coreSeoKeywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "DeskFloow",
    title: "DeskFloow — Intelligent Cloud Hotel PMS & Guest Experience Platform",
    description:
      "Unify front desk check-ins, drag-and-drop tape charts, 2-way OTA sync, commission-free direct bookings, WhatsApp confirmations, housekeeping, POS orders, and hotel revenue analytics.",
    images: [{ url: "/images/lobby.jpg", width: 1376, height: 768, alt: "DeskFloow Cloud Hotel Property Management System" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeskFloow — Cloud Hotel PMS, OTA Channel Manager & WhatsApp Automation",
    description:
      "One intelligent hospitality platform for every room, reservation, OTA channel, WhatsApp confirmation, and front desk operation.",
    images: ["/images/lobby.jpg"],
  },
};

const orgAndSoftwareLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DeskFloow",
    url: siteUrl,
    logo: `${siteUrl}/images/deskfloow-logo.png`,
    description:
      "Cloud hotel property management system (PMS), 2-way OTA channel manager, direct booking engine, WhatsApp guest automation, housekeeping, and POS billing platform.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DeskFloow",
    url: siteUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DeskFloow Hotel PMS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Cloud, iOS, Android",
    url: siteUrl,
    description:
      "Intelligent hotel operations platform unifying front desk PMS, 7-day visual tape chart, 2-way OTA channel manager, commission-free direct booking engine, WhatsApp confirmations, guest CRM, housekeeping floor plans, restaurant POS orders, and multi-property analytics.",
    featureList: [
      "Cloud Hotel Front Desk PMS & GST Folios",
      "Interactive 7-Day Drag-and-Drop Tape Chart",
      "2-Way Real-Time OTA Channel Manager",
      "0% Commission Direct Hotel Booking Engine",
      "Automated WhatsApp Booking Confirmations",
      "360° Hospitality Guest CRM & Loyalty",
      "Visual 2D Floor Plan & Smart Housekeeping",
      "Contactless QR Menu & Restaurant POS Billing",
      "Occupancy, ADR, RevPAR & Multi-Property Analytics",
    ],
  },
];

export const viewport: Viewport = {
  themeColor: "#7e2cf6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgAndSoftwareLd) }}
        />
      </body>
    </html>
  );
}
