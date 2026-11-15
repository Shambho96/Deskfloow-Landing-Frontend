import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight, CalendarCheck, CheckCircle2, ChevronDown, ChevronRight, MessageSquare } from "lucide-react";
import {
  AnalyticsPillar,
  BookingPillar,
  ChannelsPillar,
  CrmPillar,
  FoliosPillar,
  FrontDeskPillar,
  HousekeepingPillar,
  MultiPropertyPillar,
  OrdersPillar,
  TapeChartPillar,
  TourPillar,
  WhatsAppPillar,
} from "@/components/marketing/pillars";
import { FinalCta } from "@/components/marketing/final-cta";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/reveal";
import { featurePages, getFeatureBySlug, type FeatureSlug } from "@/data/features";
import { coreSeoKeywords, siteUrl } from "@/lib/site";

type RouteParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return featurePages.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) return {};

  const canonical = `/features/${feature.slug}`;
  return {
    title: feature.metaTitle,
    description: feature.metaDescription,
    keywords: [...feature.keywords, ...coreSeoKeywords.slice(0, 12)],
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: `${siteUrl}${canonical}`,
      siteName: "DeskFloow",
      title: `${feature.metaTitle} · DeskFloow`,
      description: feature.metaDescription,
      images: [{ url: "/images/lobby.jpg", width: 1376, height: 768, alt: `${feature.label} — DeskFloow Hotel PMS` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${feature.metaTitle} · DeskFloow`,
      description: feature.metaDescription,
    },
  };
}

function FeatureShowcase({ slug }: { slug: FeatureSlug }) {
  switch (slug) {
    case "front-desk":
      return (
        <>
          <FrontDeskPillar />
          <FoliosPillar />
          <TourPillar />
        </>
      );
    case "tape-chart":
      return <TapeChartPillar />;
    case "channels":
      return <ChannelsPillar />;
    case "booking":
      return <BookingPillar />;
    case "whatsapp":
      return <WhatsAppPillar />;
    case "crm":
      return <CrmPillar />;
    case "housekeeping":
      return <HousekeepingPillar />;
    case "orders":
      return (
        <>
          <OrdersPillar />
          <FoliosPillar />
        </>
      );
    case "analytics":
      return (
        <>
          <AnalyticsPillar />
          <MultiPropertyPillar />
        </>
      );
  }
}

async function FeatureBreadcrumbLeaf({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) notFound();

  return (
    <li className="flex items-center gap-1">
      <ChevronRight className="size-3.5" aria-hidden />
      <span aria-current="page" className="text-ink">{feature.label}</span>
    </li>
  );
}

function FeatureHeroSkeleton() {
  return (
    <div aria-hidden className="space-y-4">
      <div className="h-7 w-52 animate-pulse rounded-full bg-brand-200/60" />
      <div className="space-y-2.5">
        <div className="h-10 w-full max-w-2xl animate-pulse rounded-2xl bg-brand-200/60 sm:h-14" />
        <div className="h-10 w-4/5 max-w-xl animate-pulse rounded-2xl bg-brand-200/50 sm:h-14" />
      </div>
      <div className="space-y-2 pt-1">
        <div className="h-5 w-full max-w-xl animate-pulse rounded-lg bg-brand-200/45" />
        <div className="h-5 w-3/4 max-w-md animate-pulse rounded-lg bg-brand-200/40" />
      </div>
    </div>
  );
}

async function FeatureHeroCopy({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) notFound();

  return (
    <>
      <p className="eyebrow [animation:wr_0.6s_ease_both]">
        <span className="size-1.5 rounded-full bg-gold-400" />
        {feature.eyebrow}
      </p>
      <h1 className="mt-3.5 sm:mt-4 text-[30px] leading-[1.08] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-[58px] [animation:wr_0.8s_0.1s_cubic-bezier(0.22,1,0.36,1)_both]">
        {feature.heroTitle}
      </h1>
      <p className="lead mt-4 sm:mt-5 max-w-2xl [animation:wr_0.8s_0.25s_cubic-bezier(0.22,1,0.36,1)_both]">
        {feature.heroLead}
      </p>
    </>
  );
}

function FeatureDetailsSkeleton() {
  return (
    <section aria-hidden className="py-14 sm:py-24">
      <div className="container-x space-y-8">
        <div className="space-y-3">
          <div className="h-6 w-44 animate-pulse rounded-full bg-brand-100" />
          <div className="h-9 w-80 max-w-full animate-pulse rounded-xl bg-brand-100" />
        </div>
        <div className="h-[460px] w-full animate-pulse rounded-[28px] border border-brand-200/60 bg-brand-50/50" />
        <div className="grid gap-5 pt-6 md:grid-cols-3">
          <div className="h-44 animate-pulse rounded-3xl border border-brand-200/60 bg-brand-50/40" />
          <div className="h-44 animate-pulse rounded-3xl border border-brand-200/60 bg-brand-50/40" />
          <div className="h-44 animate-pulse rounded-3xl border border-brand-200/60 bg-brand-50/40" />
        </div>
      </div>
    </section>
  );
}

async function FeatureDetails({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) notFound();

  const otherFeatures = featurePages.filter((f) => f.slug !== feature.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Features", item: `${siteUrl}/features` },
        { "@type": "ListItem", position: 3, name: feature.label, item: `${siteUrl}/features/${feature.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `DeskFloow — ${feature.label}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Cloud, iOS, Android",
      url: `${siteUrl}/features/${feature.slug}`,
      description: feature.metaDescription,
      brand: { "@type": "Brand", name: "DeskFloow" },
      featureList: feature.highlights.map((h) => h.title),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: feature.faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];

  return (
    <>
      <FeatureShowcase slug={feature.slug} />

      <section className="border-t border-line bg-white py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={`Why Hoteliers Choose DeskFloow ${feature.label}`}
            title="Built for speed, accuracy and connected hotel operations."
            lead={`Every action inside ${feature.label} updates your central DeskFloow PMS record in real time across reception, housekeeping, billing, and guest profiles.`}
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {feature.highlights.map((h) => (
              <article
                key={h.title}
                className="rounded-3xl border border-brand-200/80 bg-gradient-to-b from-white via-white to-brand-50/45 p-6 shadow-card"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <CheckCircle2 className="size-4.5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[18px] font-bold tracking-tight text-ink">{h.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{h.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-brand-50/30 py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow={`${feature.label} FAQs`}
            title={`Common questions about ${feature.label}`}
          />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-line rounded-3xl border border-line bg-white shadow-sm">
            {feature.faqs.map(([q, a]) => (
              <details key={q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-ink">
                  {q}
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Connected Hospitality Suite"
            title="Explore more DeskFloow PMS modules"
            lead="Each module works seamlessly on its own and shares a single live reservation, room, and guest database."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.slug}
                  href={`/features/${item.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-brand-200/75 bg-white p-5 shadow-2xs transition hover:-translate-y-1 hover:border-brand-400 hover:shadow-lift"
                >
                  <div>
                    <span className="grid size-10 place-items-center rounded-xl bg-brand-100 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-[16px] font-bold tracking-tight text-ink group-hover:text-brand-700">
                      {item.label}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{item.shortDesc}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700">
                    Explore {item.label} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

export default function FeatureDetailPage({
  params,
}: {
  params: RouteParams;
}) {
  return (
    <>
      <section className="relative -mt-[72px] overflow-hidden pt-[72px]">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-100 via-brand-50 to-brand-50" />
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className="pointer-events-none absolute top-[-160px] left-1/2 -z-10 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-brand-400/20 blur-[110px]" />
        <div className="container-x pt-7 pb-10 sm:pt-14 sm:pb-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-[12.5px] sm:text-[13px] text-muted-foreground">
              <li><Link href="/" className="hover:text-ink">Home</Link></li>
              <li className="flex items-center gap-1">
                <ChevronRight className="size-3.5" aria-hidden />
                <Link href="/features" className="hover:text-ink">Features</Link>
              </li>
              <Suspense
                fallback={
                  <li aria-hidden className="flex items-center gap-1">
                    <ChevronRight className="size-3.5" />
                    <span className="h-4 w-28 animate-pulse rounded bg-brand-200/60" />
                  </li>
                }
              >
                <FeatureBreadcrumbLeaf params={params} />
              </Suspense>
            </ol>
          </nav>
          <div className="mt-5 sm:mt-8 max-w-3xl">
            <Suspense fallback={<FeatureHeroSkeleton />}>
              <FeatureHeroCopy params={params} />
            </Suspense>
            <div className="mt-6 sm:mt-8 [animation:wr_0.8s_0.4s_cubic-bezier(0.22,1,0.36,1)_both]">
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/book-demo">
                  <CalendarCheck className="size-4" /> Book a Guided Demo <ArrowRight className="size-4" />
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  <MessageSquare className="size-4" /> Contact Us
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<FeatureDetailsSkeleton />}>
        <FeatureDetails params={params} />
      </Suspense>

      <FinalCta />
    </>
  );
}
