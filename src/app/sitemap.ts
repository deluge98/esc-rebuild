import type { MetadataRoute } from "next";
import { getAllContentSlugs } from "@/lib/content";

const SITE_URL = "https://esc-rebuild.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllContentSlugs();

  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...slugs.map((slug) => ({
      url: `${SITE_URL}/${slug}/`,
      changeFrequency: "monthly" as const,
      priority: slug.includes("membership") ? 0.9 : 0.7,
    })),
  ];
}
