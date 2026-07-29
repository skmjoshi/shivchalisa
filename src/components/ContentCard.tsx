import Link from "next/link";
import type { ContentItem } from "@/lib/types";

const DEITY_ICONS: Record<string, string> = {
  shiva:     "🕉️",
  hanuman:   "🐒",
  ganesha:   "🐘",
  krishna:   "🦚",
  rama:      "🏹",
  durga:     "🌺",
  lakshmi:   "🪷",
  saraswati: "🎶",
  vishnu:    "💙",
  surya:     "☀️",
  shani:     "🪐",
  "sai-baba":"🙏",
  other:     "✨",
};

const CATEGORY_COLORS: Record<string, string> = {
  chalisa:      "#ff7a18",
  aarti:        "#e05c00",
  stotra:       "#9c3a00",
  mantra:       "#c47a00",
  ashtakam:     "#6b2f8f",
  kavacham:     "#1a5e8a",
  sahasranama:  "#1a7a4a",
  bhajan:       "#c43060",
  "vrat-katha": "#5c4a00",
};

interface Props {
  item: ContentItem;
  showDeity?: boolean;
}

export default function ContentCard({ item, showDeity = true }: Props) {
  const icon  = DEITY_ICONS[item.deity] ?? "✨";
  const color = CATEGORY_COLORS[item.category] ?? "#ff7a18";

  return (
    <Link
      href={`/${item.category}/${item.slug}`}
      className="card-lift flex flex-col gap-3 rounded-2xl p-5 no-underline"
      style={{ background: "white", border: "1px solid var(--line)" }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ background: `${color}18`, color }}
        >
          {item.category}
        </span>
        {showDeity && (
          <span className="text-lg">{icon}</span>
        )}
      </div>

      {/* Title */}
      <div>
        <h3
          className="font-bold text-base leading-snug"
          style={{ color: "var(--ink)" }}
        >
          {item.title.english}
        </h3>
        <p className="deva text-sm mt-0.5" style={{ color: "var(--muted)" }}>
          {item.title.hindi}
        </p>
      </div>

      {/* Intro snippet */}
      <p
        className="text-xs leading-relaxed line-clamp-2"
        style={{ color: "var(--muted)" }}
      >
        {item.intro.slice(0, 110)}…
      </p>

      {/* Footer chips */}
      <div className="flex items-center gap-2 mt-auto pt-2"
           style={{ borderTop: "1px solid var(--line)" }}>
        {item.audioUrl && (
          <span className="text-xs" style={{ color: "var(--muted)" }}>🔊 Audio</span>
        )}
        {item.pdfUrl && (
          <span className="text-xs" style={{ color: "var(--muted)" }}>📄 PDF</span>
        )}
        <span
          className="ml-auto text-xs font-semibold"
          style={{ color }}
        >
          Read →
        </span>
      </div>
    </Link>
  );
}
