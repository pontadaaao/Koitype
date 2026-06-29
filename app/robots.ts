import type { MetadataRoute } from "next";
import { SITE_DEFAULT_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = SITE_DEFAULT_URL.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
