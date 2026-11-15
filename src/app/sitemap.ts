import type { MetadataRoute } from "next";
import { featurePages } from "@/data/features";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/features`, changeFrequency: "weekly", priority: 0.95 },
    ...featurePages.map((f) => ({
      url: `${siteUrl}/features/${f.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    { url: `${siteUrl}/book-demo`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/pricing`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.4 },
  ];

  return staticEntries;
}
