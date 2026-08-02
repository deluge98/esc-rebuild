import type { MetadataRoute } from "next";
import { isMembershipDetailSlug } from "@/data/membership-pages";
import { getAllContentSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  // Detail membership URLs 301 to /membership-info/ — keep them out of the sitemap.
  const slugs = getAllContentSlugs().filter(
    (slug) => !isMembershipDetailSlug(slug),
  );

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...slugs.map((slug) => ({
      url: absoluteUrl(slug),
      changeFrequency: "monthly" as const,
      priority: slug.includes("membership") ? 0.9 : 0.7,
    })),
  ];
}
