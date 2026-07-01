import type { MetadataRoute } from "next";
import { SITE_DEFAULT_URL } from "@/lib/site";
import { diagnoses } from "@/lib/diagnoses";
import { loveTests } from "@/lib/love-tests";
import { supabase } from "@/lib/supabase";

const base = SITE_DEFAULT_URL.replace(/\/$/, "");

type SitemapEntry = MetadataRoute.Sitemap[number];

const staticRoutes: { path: string; priority: number; changeFrequency: SitemapEntry["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/love-diagnosis", priority: 0.9, changeFrequency: "weekly" },
  { path: "/tests", priority: 0.9, changeFrequency: "weekly" },
  { path: "/compatibility", priority: 0.9, changeFrequency: "weekly" },
  { path: "/koi-mikuji", priority: 0.8, changeFrequency: "daily" },
  { path: "/columns", priority: 0.8, changeFrequency: "daily" },
  { path: "/log", priority: 0.7, changeFrequency: "daily" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/about", priority: 0.4, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/sitemap", priority: 0.3, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    priority,
    changeFrequency,
    lastModified: new Date(),
  }));

  const diagnosisEntries: MetadataRoute.Sitemap = diagnoses
    .filter((d) => d.id !== "compatibility")
    .map((d) => ({
      url: `${base}/diagnosis/${d.id}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    }));

  const testEntries: MetadataRoute.Sitemap = loveTests.map((t) => ({
    url: `${base}/tests/${t.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  let columnEntries: MetadataRoute.Sitemap = [];
  try {
    const { data } = await supabase
      .from("columns")
      .select("slug, updated_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (data) {
      columnEntries = data.map((col) => ({
        url: `${base}/columns/${col.slug}`,
        priority: 0.7,
        changeFrequency: "monthly" as const,
        lastModified: col.updated_at ? new Date(col.updated_at) : undefined,
      }));
    }
  } catch {
    // Supabase unavailable at build time; column entries are skipped
  }

  return [...staticEntries, ...diagnosisEntries, ...testEntries, ...columnEntries];
}
