import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getByCategory, ALL_CONTENT } from "@/data";
import { CATEGORY_LABELS, type Category } from "@/lib/types";
import ContentCard from "@/components/ContentCard";
import Link from "next/link";

interface Props {
  params: Promise<{ category: string }>;
}

const CATEGORY_META: Record<string, { icon: string; desc: string; longDesc: string }> = {
  chalisa: {
    icon: "📿",
    desc: "40-verse devotional hymns for every Hindu deity",
    longDesc: "Chalisa (from Hindi 'chaalees' = 40) are 40-verse devotional hymns dedicated to various Hindu deities. Each Chalisa praises the deity's glory, recounts their divine deeds, and asks for blessings. They are among the most recited prayers in India.",
  },
  aarti: {
    icon: "🪔",
    desc: "Lamp-offering prayers sung at every puja",
    longDesc: "Aarti is a devotional ritual in which a lamp (diya) is waved before a deity while singing a prayer. Aarti songs praise the divine attributes of each deity and are performed at the end of every puja. The most auspicious time for Aarti is at dawn and dusk.",
  },
  stotra: {
    icon: "📖",
    desc: "Sanskrit praise hymns of great poetic beauty",
    longDesc: "Stotra (Sanskrit: स्तोत्र) are devotional poems of praise composed in Sanskrit. Unlike the folk-language Chalisa, Stotras are classical Sanskrit hymns — often composed by sages, saints and even devotee-kings like Ravana. They are known for their extraordinary literary beauty and spiritual depth.",
  },
  mantra: {
    icon: "🕉️",
    desc: "Sacred sound formulas from the Vedas",
    longDesc: "Mantras are sacred sound formulas from the Vedic tradition. Unlike prayers, mantras work through vibration — the precise sound of the syllables itself creates a spiritual effect. The Gayatri Mantra and Mahamrityunjaya Mantra are among the oldest and most powerful mantras known.",
  },
  ashtakam: {
    icon: "🌺",
    desc: "Eight-verse hymns of intense devotion",
    longDesc: "Ashtakam (from 'ashta' = eight) are eight-verse devotional hymns. Despite their compact form, they are known for their extraordinary poetic and spiritual intensity. The Madhurashtakam and Rudrashtakam are among the most celebrated.",
  },
  kavacham: {
    icon: "🛡️",
    desc: "Protective armour prayers",
    longDesc: "Kavacham (Sanskrit: कवचम् = armour) are prayers that invoke a deity's protection over the devotee's entire body and life. They are recited for spiritual and physical protection, especially during difficult times.",
  },
  sahasranama: {
    icon: "📜",
    desc: "The 1000 divine names",
    longDesc: "Sahasranama (sahasra = thousand, nama = name) are hymns that list 1000 names of a deity. Each name encapsulates a divine attribute. Reciting the Vishnu Sahasranama or Shiva Sahasranama is considered equivalent to performing a full puja.",
  },
  bhajan: {
    icon: "🎵",
    desc: "Devotional songs from saints and poets",
    longDesc: "Bhajans are devotional songs composed by saints and poets across the ages — Mirabai, Kabir, Tukaram, Surdas. Unlike formal Vedic hymns, bhajans express personal longing for the divine in simple, heartfelt language set to melody.",
  },
  "vrat-katha": {
    icon: "✨",
    desc: "Sacred fasting stories and their significance",
    longDesc: "Vrat Katha are sacred stories associated with specific religious vows (vrats) and fasting days. They narrate the origin and significance of the fast and are traditionally read aloud during the vrat. The Satyanarayan Vrat Katha is among the most widely performed.",
  },
};

const VALID_CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((cat) => ({ category: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as Category)) return { title: "Not Found" };

  const label = CATEGORY_LABELS[category as Category];
  const meta  = CATEGORY_META[category];
  const items = getByCategory(category);

  return {
    title: `${label} – All ${label}s with Lyrics, Meaning & Audio | BhaktiSagar`,
    description: `Read all ${label}s — ${meta?.desc ?? ""}. Full lyrics in Hindi, English & Sanskrit with meaning and audio. ${items.length} ${label}s available.`,
    alternates: { canonical: `https://shivchalisa.org/${category}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as Category)) notFound();

  const label = CATEGORY_LABELS[category as Category];
  const meta  = CATEGORY_META[category] ?? { icon: "📿", desc: "", longDesc: "" };
  const items = getByCategory(category);

  // Other categories for "Browse other types" section
  const otherCategories = VALID_CATEGORIES
    .filter((c) => c !== category && getByCategory(c).length > 0)
    .slice(0, 6);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",  item: "https://shivchalisa.org/" },
      { "@type": "ListItem", position: 2, name: label,   item: `https://shivchalisa.org/${category}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="hero-bg py-10 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-3">{meta.icon}</div>
          <h1
            className="font-extrabold mb-2"
            style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", color: "var(--deep)" }}
          >
            {label} Collection
          </h1>
          <p className="text-base mb-1" style={{ color: "var(--muted)" }}>
            {meta.desc}
          </p>
          <p className="text-sm font-semibold" style={{ color: "var(--saffron)" }}>
            {items.length} {label}{items.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </section>

      {/* ── Breadcrumb ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <nav className="text-sm" style={{ color: "var(--muted)" }} aria-label="Breadcrumb">
          <Link href="/" className="hover:underline">Home</Link>
          {" › "}
          <span style={{ color: "var(--deep)" }} className="font-medium">{label}</span>
        </nav>
      </div>

      {/* ── About this category ────────────────────────────── */}
      {meta.longDesc && (
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <p
            className="text-sm leading-relaxed p-4 rounded-2xl"
            style={{ background: "var(--cream-2)", color: "var(--muted)", border: "1px solid var(--line)" }}
          >
            {meta.longDesc}
          </p>
        </div>
      )}

      {/* ── Content grid ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 mt-8 mb-6">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 rounded-2xl"
            style={{ background: "var(--cream-2)", color: "var(--muted)" }}
          >
            <p className="text-4xl mb-3">🙏</p>
            <p className="font-semibold">More {label}s coming soon</p>
            <p className="text-sm mt-1">We are adding new content every week.</p>
          </div>
        )}
      </section>

      {/* ── Browse other types ─────────────────────────────── */}
      {otherCategories.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-4 mb-10">
          <h2
            className="font-bold mb-4"
            style={{ fontSize: "1.1rem", color: "var(--deep)" }}
          >
            Browse Other Types
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherCategories.map((c) => (
              <Link key={c} href={`/${c}`} className="chip capitalize">
                {CATEGORY_META[c]?.icon} {CATEGORY_LABELS[c as Category]}
                <span className="ml-1 opacity-60">({getByCategory(c).length})</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
