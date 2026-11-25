import type { ContentItem } from "@/lib/types";

// ── Chalisa ──────────────────────────────────────────────────
import shivChalisa      from "./shiv-chalisa";
import hanumanChalisa   from "./hanuman-chalisa";
import ganeshChalisa    from "./ganesh-chalisa";
import durgaChalisa     from "./durga-chalisa";

// ── Aarti ─────────────────────────────────────────────────────
import shivAarti        from "./shiv-aarti";
import hanumanAarti     from "./hanuman-aarti";
import ganeshAarti      from "./ganesh-aarti";
import durgaAarti       from "./durga-aarti";
import lakshmiAarti     from "./lakshmi-aarti";
import vishnuAarti      from "./vishnu-aarti";

// ── Stotra ────────────────────────────────────────────────────
import shivTandavStotram from "./shiv-tandav-stotram";

// ── Mantra ────────────────────────────────────────────────────
import mahamrityunjayaMantra from "./mahamrityunjaya-mantra";
import gayatriMantra         from "./gayatri-mantra";

// Dates are derived from the repository history. All current texts were first
// published in the initial content commit and last changed before this SEO pass.
const CONTENT_DATES: Record<string, Pick<ContentItem, "datePublished" | "dateModified">> = {
  "shiv-chalisa":          { datePublished: "2026-07-22", dateModified: "2026-11-24" },
  "hanuman-chalisa":       { datePublished: "2026-07-22", dateModified: "2026-11-25" },
  "ganesh-chalisa":        { datePublished: "2026-07-22", dateModified: "2026-11-24" },
  "durga-chalisa":         { datePublished: "2026-07-22", dateModified: "2026-11-24" },
  "shiv-aarti":            { datePublished: "2026-07-22", dateModified: "2026-11-25" },
  "hanuman-aarti":         { datePublished: "2026-07-22", dateModified: "2026-11-25" },
  "ganesh-aarti":          { datePublished: "2026-07-22", dateModified: "2026-11-25" },
  "durga-aarti":           { datePublished: "2026-07-22", dateModified: "2026-11-25" },
  "lakshmi-aarti":         { datePublished: "2026-07-22", dateModified: "2026-07-29" },
  "vishnu-aarti":          { datePublished: "2026-07-22", dateModified: "2026-11-25" },
  "shiv-tandav-stotram":   { datePublished: "2026-07-22", dateModified: "2026-11-24" },
  "mahamrityunjaya-mantra": { datePublished: "2026-07-22", dateModified: "2026-11-25" },
  "gayatri-mantra":        { datePublished: "2026-07-22", dateModified: "2026-11-25" },
};

// ── Master registry ───────────────────────────────────────────
// Order = priority on homepage "Most Popular" section
export const ALL_CONTENT: ContentItem[] = [
  // Chalisa (highest search volume)
  shivChalisa,
  hanumanChalisa,
  ganeshChalisa,
  durgaChalisa,

  // Aarti
  shivAarti,
  hanumanAarti,
  ganeshAarti,
  durgaAarti,
  lakshmiAarti,
  vishnuAarti,

  // Stotra
  shivTandavStotram,

  // Mantra
  mahamrityunjayaMantra,
  gayatriMantra,
].map((item) => ({ ...item, ...CONTENT_DATES[item.slug] }));

// ── Lookup helpers ────────────────────────────────────────────
export function getBySlug(slug: string): ContentItem | undefined {
  return ALL_CONTENT.find((c) => c.slug === slug);
}

export function getByCategory(cat: string): ContentItem[] {
  return ALL_CONTENT.filter((c) => c.category === cat);
}

export function getByDeity(deity: string): ContentItem[] {
  return ALL_CONTENT.filter((c) => c.deity === deity);
}

export function getRelated(item: ContentItem): ContentItem[] {
  if (!item.relatedSlugs) return [];
  return item.relatedSlugs
    .map((s) => getBySlug(s))
    .filter(Boolean) as ContentItem[];
}
