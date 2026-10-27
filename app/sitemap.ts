import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/app/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable) return [];

  return [
    {
      url: new URL("/", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/certifications", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
