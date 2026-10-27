/** Set NEXT_PUBLIC_SITE_URL once the production domain is known (used for canonical URLs, sitemap, OG). */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
