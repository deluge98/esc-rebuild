import type { MetadataRoute } from "next";
import { getAllContentSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllContentSlugs();

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
