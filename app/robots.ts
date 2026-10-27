import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/app/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isIndexable ? { allow: "/" } : { disallow: "/" }),
    },
    ...(isIndexable ? { sitemap: new URL("/sitemap.xml", siteUrl).toString() } : {}),
  };
}
