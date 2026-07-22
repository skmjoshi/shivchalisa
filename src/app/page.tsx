import type { Metadata } from "next";
import Link from "next/link";
import { ALL_CONTENT } from "@/data";
import ContentCard from "@/components/ContentCard";

export const metadata: Metadata = {
  title: "BhaktiSagar â€“ Chalisa, Aarti, Stotra & Mantra | Hindu Devotional Texts",
  description:
    "Read and listen to Shiv Chalisa, Hanuman Chalisa, Durga Aarti, Ganesh Chalisa and 1000+ devotional texts with lyrics, meaning and audio in Hindi, English and Sanskrit.",
  alternates: { canonical: "https://shivchalisa.org" },
};

/* â”€â”€ Static category data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const CATEGORIES = [
  { slug: "chalisa",      icon: "ðŸ“¿", label: "Chalisa",     desc: "40-verse devotional hymns" },
  { slug: "aarti",        icon: "ðŸª”", label: "Aarti",       desc: "Lamp-offering prayers" },
  { slug: "stotra",       icon: "ðŸ“–", label: "Stotra",      desc: "Sanskrit praise hymns" },
  { slug: "mantra",       icon: "ðŸ•‰ï¸", label: "Mantra",      desc: "Sacred sound formulas" },
  { slug: "ashtakam",     icon: "ðŸŒº", label: "Ashtakam",    desc: "Eight-verse hymns" },
  { slug: "sahasranama",  icon: "ðŸ“œ", label: "Sahasranama", desc: "1000 divine names" },
  { slug: "bhajan",       icon: "ðŸŽµ", label: "Bhajan",      desc: "Devotional songs" },
  { slug: "vrat-katha",   icon: "âœ¨", label: "Vrat Katha",  desc: "Sacred fasting stories" },
];

const DEITIES = [
  { slug: "shiva",     icon: "ðŸ•‰ï¸",  label: "Shiva"     },
  { slug: "hanuman",   icon: "ðŸ’",  label: "Hanuman"   },
  { slug: "ganesha",   icon: "ðŸ˜",  label: "Ganesha"   },
  { slug: "krishna",   icon: "ðŸ¦š",  label: "Krishna"   },
  { slug: "rama",      icon: "ðŸ¹",  label: "Rama"      },
  { slug: "durga",     icon: "ðŸŒº",  label: "Durga"     },
  { slug: "lakshmi",   icon: "ðŸª·",  label: "Lakshmi"   },
  { slug: "vishnu",    icon: "ðŸ’™",  label: "Vishnu"    },
  { slug: "saraswati", icon: "ðŸŽ¶",  label: "Saraswati" },
  { slug: "surya",     icon: "â˜€ï¸",  label: "Surya"     },
];

const POPULAR_SEARCHES = [
  "Shiv Chalisa", "Shiv Aarti", "Hanuman Chalisa", "Hanuman Aarti",
  "Ganesh Chalisa", "Durga Aarti", "Gayatri Mantra", "Vishnu Sahasranama",
  "Mahamrityunjaya Mantra", "Shiv Tandav", "Bajrang Baan", "Om Namah Shivaya",
];

export default function HomePage() {
  const featured = ALL_CONTENT.slice(0, 6);


  return (
    <>
      {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="hero-bg py-10 md:py-16 text-center px-4">
        <h1
          className="font-extrabold mb-3"
          style={{
            fontSize: "clamp(1.7rem, 5vw, 2.6rem)",
            color: "var(--deep)",
            lineHeight: 1.2,
          }}
        >
          ðŸ•‰ï¸ Devotional Texts, Lyrics & Audio
          <br className="hidden sm:block" /> â€” All in One Place
        </h1>
        <p className="text-base md:text-lg max-w-xl mx-auto mb-6" style={{ color: "var(--muted)" }}>
          Chalisa Â· Aarti Â· Stotra Â· Mantra in Hindi, English &amp; Sanskrit
          with word-by-word meaning and audio
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

      {/* â”€â”€ Featured content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-10">
          <h2
            className="font-bold mb-5"
            style={{ fontSize: "1.35rem", color: "var(--deep)" }}
          >
            ðŸ”¥ Most Popular
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* â”€â”€ Category grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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

      {/* â”€â”€ Deity grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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

      {/* â”€â”€ Why BhaktiSagar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        className="max-w-6xl mx-auto px-4 mt-14 mb-4 rounded-3xl py-10 text-center"
        style={{ background: "var(--cream-2)" }}
      >
        <h2
          className="font-bold mb-8"
          style={{ fontSize: "1.35rem", color: "var(--deep)" }}
        >
          Why BhaktiSagar?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { icon: "ðŸ“–", label: "Full Lyrics",   desc: "Hindi Â· English Â· Sanskrit" },
            { icon: "ðŸ’¡", label: "Meaning",        desc: "Verse-by-verse explanation" },
            { icon: "ðŸ”Š", label: "Audio",          desc: "Listen while you read" },
            { icon: "ðŸ“±", label: "Mobile-first",   desc: "Perfect on any device" },
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
