import type { MetadataRoute } from "next";
import { ALL_CONTENT } from "@/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://shivchalisa.org";
  const now  = new Date("2026-06-01");

  // Static pages
  const static_: MetadataRoute.Sitemap = [
    { url: base,             lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/chalisa`,lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/aarti`,  lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/stotra`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/mantra`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // One entry per content item
  const dynamic: MetadataRoute.Sitemap = ALL_CONTENT.map((item) => ({
    url:             `${base}/${item.category}/${item.slug}`,
    lastModified:    now,
    changeFrequency: "monthly",
    priority:        0.85,
    alternates: {
      languages: {
        hi: `${base}/hi/${item.category}/${item.slug}`,
        en: `${base}/${item.category}/${item.slug}`,
      },
    },
  }));

  return [...static_, ...dynamic];
}
