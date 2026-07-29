import type { Metadata } from "next";
import Link from "next/link";
import { ALL_CONTENT, getByCategory, getByDeity } from "@/data";
import type { Category, Deity } from "@/lib/types";
import ContentCard from "@/components/ContentCard";

export const metadata: Metadata = {
  title: {
    absolute: "Shiv Chalisa, Hanuman Chalisa & Aarti – Lyrics & Meaning",
  },
  description:
    "Read Shiv Chalisa, Hanuman Chalisa, Durga Aarti and other Hindu devotional texts with lyrics and meaning in Hindi, English & Sanskrit.",
  alternates: { canonical: "https://shivchalisa.org" },
  openGraph: {
    title: "Shiv Chalisa, Hanuman Chalisa & Aarti – Lyrics & Meaning",
    description: "Read Shiv Chalisa, Hanuman Chalisa, Durga Aarti and other Hindu devotional texts with lyrics and meaning in Hindi, English & Sanskrit.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shiv Chalisa - Devotional Texts in Hindi, English & Sanskrit",
      },
    ],
  },
};

/* ── Static category data ─────────────────────────────────────── */
/* Only categories/deities with real content are surfaced — linking an empty
   "coming soon" hub wastes a reader's click and dilutes site quality. Entries
   reappear automatically as content is added. */
const ALL_CATEGORIES = [
  { slug: "chalisa",      icon: "📿", label: "Chalisa",     desc: "40-verse devotional hymns" },
  { slug: "aarti",        icon: "🪔", label: "Aarti",       desc: "Lamp-offering prayers" },
  { slug: "stotra",       icon: "📖", label: "Stotra",      desc: "Sanskrit praise hymns" },
  { slug: "mantra",       icon: "🕉️", label: "Mantra",      desc: "Sacred sound formulas" },
  { slug: "ashtakam",     icon: "🌺", label: "Ashtakam",    desc: "Eight-verse hymns" },
  { slug: "sahasranama",  icon: "📜", label: "Sahasranama", desc: "1000 divine names" },
  { slug: "bhajan",       icon: "🎵", label: "Bhajan",      desc: "Devotional songs" },
  { slug: "vrat-katha",   icon: "✨", label: "Vrat Katha",  desc: "Sacred fasting stories" },
];
const CATEGORIES = ALL_CATEGORIES.filter((c) => getByCategory(c.slug as Category).length > 0);

const ALL_DEITIES = [
  { slug: "shiva",     icon: "🕉️",  label: "Shiva"     },
  { slug: "hanuman",   icon: "🐒",  label: "Hanuman"   },
  { slug: "ganesha",   icon: "🐘",  label: "Ganesha"   },
  { slug: "krishna",   icon: "🦚",  label: "Krishna"   },
  { slug: "rama",      icon: "🏹",  label: "Rama"      },
  { slug: "durga",     icon: "🌺",  label: "Durga"     },
  { slug: "lakshmi",   icon: "🪷",  label: "Lakshmi"   },
  { slug: "vishnu",    icon: "💙",  label: "Vishnu"    },
  { slug: "saraswati", icon: "🎶",  label: "Saraswati" },
  { slug: "surya",     icon: "☀️",  label: "Surya"     },
];
const DEITIES = ALL_DEITIES.filter((d) => getByDeity(d.slug as Deity).length > 0);

/* Only suggest searches that actually return a result. */
const CANDIDATE_SEARCHES = [
  "Shiv Chalisa", "Shiv Aarti", "Hanuman Chalisa", "Hanuman Aarti",
  "Ganesh Chalisa", "Durga Aarti", "Gayatri Mantra", "Vishnu Aarti",
  "Mahamrityunjaya Mantra", "Shiv Tandav", "Lakshmi Aarti", "Durga Chalisa",
];
const POPULAR_SEARCHES = CANDIDATE_SEARCHES.filter((q) => {
  const lower = q.toLowerCase();
  return ALL_CONTENT.some(
    (item) =>
      item.title.english.toLowerCase().includes(lower) ||
      item.keywords.some((k) => k.toLowerCase().includes(lower))
  );
});

export default function HomePage() {
  const featured = ALL_CONTENT.slice(0, 6);


  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero-bg py-10 md:py-16 text-center px-4">
        <h1
          className="font-extrabold mb-3"
          style={{
            fontSize: "clamp(1.7rem, 5vw, 2.6rem)",
            color: "var(--deep)",
            lineHeight: 1.2,
          }}
        >
          🕉️ Shiv Chalisa, Hanuman Chalisa & Aarti
          <br className="hidden sm:block" /> — Lyrics & Meaning
        </h1>
        <p className="text-base md:text-lg max-w-xl mx-auto mb-6" style={{ color: "var(--muted)" }}>
          Chalisa · Aarti · Stotra · Mantra in Hindi, English &amp; Sanskrit
          with word-by-word meaning
        </p>

        {/* Popular search chips */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {POPULAR_SEARCHES.map((s) => (
            <Link
              key={s}
              href={`/search?q=${encodeURIComponent(s)}`}
              className="chip text-xs"
            >
              {s}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured content ─────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-10">
          <h2
            className="font-bold mb-5"
            style={{ fontSize: "1.35rem", color: "var(--deep)" }}
          >
            🔥 Most Popular
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* ── Category grid ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2
          className="font-bold mb-5"
          style={{ fontSize: "1.35rem", color: "var(--deep)" }}
        >
          Browse by Type
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="card-lift rounded-2xl p-4 text-center no-underline"
              style={{ background: "white", border: "1px solid var(--line)" }}
            >
              <div className="text-3xl mb-2">{c.icon}</div>
              <h3 className="font-bold text-sm" style={{ color: "var(--deep)" }}>
                {c.label}
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                {c.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Deity grid ───────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2
          className="font-bold mb-5"
          style={{ fontSize: "1.35rem", color: "var(--deep)" }}
        >
          Browse by Deity
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {DEITIES.map((d) => (
            <Link
              key={d.slug}
              href={`/deity/${d.slug}`}
              className="card-lift rounded-2xl p-4 text-center no-underline"
              style={{ background: "white", border: "1px solid var(--line)" }}
            >
              <div className="text-3xl mb-1">{d.icon}</div>
              <p className="font-semibold text-sm" style={{ color: "var(--deep)" }}>
                {d.label}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Why Shiv Chalisa ──────────────────────────────────── */}
      <section
        className="max-w-6xl mx-auto px-4 mt-14 mb-4 rounded-3xl py-10 text-center"
        style={{ background: "var(--cream-2)" }}
      >
        <h2
          className="font-bold mb-8"
          style={{ fontSize: "1.35rem", color: "var(--deep)" }}
        >
          Why Shiv Chalisa?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { icon: "📖", label: "Full Lyrics",   desc: "Hindi · English · Sanskrit" },
            { icon: "💡", label: "Meaning",        desc: "Verse-by-verse explanation" },
            { icon: "🙏", label: "Benefits & FAQ",  desc: "How to chant & why it matters" },
            { icon: "📱", label: "Mobile-first",   desc: "Perfect on any device" },
          ].map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-2">
              <span className="text-4xl">{f.icon}</span>
              <strong className="text-sm" style={{ color: "var(--deep)" }}>{f.label}</strong>
              <span className="text-xs" style={{ color: "var(--muted)" }}>{f.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
