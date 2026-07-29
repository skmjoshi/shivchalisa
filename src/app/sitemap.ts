import type { MetadataRoute } from "next";
import { ALL_CONTENT, getByCategory, getByDeity } from "@/data";
import { CATEGORY_LABELS, DEITY_LABELS, type Category, type Deity } from "@/lib/types";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://shivchalisa.org";
  const now  = new Date("2026-06-01");

  // Homepage + deity hub index
  const staticPages: MetadataRoute.Sitemap = [
    { url: base,            lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/deity`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  // Category pages — only those that actually have content (avoid thin pages)
  const categoryPages: MetadataRoute.Sitemap = (
    Object.keys(CATEGORY_LABELS) as Category[]
  )
    .filter((cat) => getByCategory(cat).length > 0)
    .map((cat) => ({
      url:             `${base}/${cat}`,
      lastModified:    now,
      changeFrequency: "weekly",
      priority:        0.9,
    }));

  // Deity hub pages — only those that actually have content
  const deityPages: MetadataRoute.Sitemap = (
    Object.keys(DEITY_LABELS) as Deity[]
  )
    .filter((deity) => getByDeity(deity).length > 0)
    .map((deity) => ({
      url:             `${base}/deity/${deity}`,
      lastModified:    now,
      changeFrequency: "monthly",
      priority:        0.8,
    }));

  // One entry per content item (the money pages)
  const contentPages: MetadataRoute.Sitemap = ALL_CONTENT.map((item) => ({
    url:             `${base}/${item.category}/${item.slug}`,
    lastModified:    now,
    changeFrequency: "monthly",
    priority:        0.85,
  }));

  return [...staticPages, ...categoryPages, ...deityPages, ...contentPages];
}
