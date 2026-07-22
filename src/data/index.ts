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
];

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
