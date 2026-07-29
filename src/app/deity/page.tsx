import type { Metadata } from "next";
import Link from "next/link";
import { DEITY_LABELS, type Deity } from "@/lib/types";
import { getByDeity } from "@/data";

export const metadata: Metadata = {
  title: "Browse by Deity – Shiva, Hanuman, Ganesha, Durga & More | BhaktiSagar",
  description: "Browse all devotional texts by deity — Shiv Chalisa, Hanuman Chalisa, Ganesh Aarti, Durga Stotra and more. Find prayers, mantras and hymns for every Hindu deity.",
  alternates: { canonical: "https://shivchalisa.org/deity" },
  openGraph: {
    title: "Browse by Deity – Shiva, Hanuman, Ganesha, Durga & More | BhaktiSagar",
    description: "Browse all devotional texts by deity — Shiv Chalisa, Hanuman Chalisa, Ganesh Aarti, Durga Stotra and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Browse by Deity - BhaktiSagar",
      },
    ],
  },
};

const ALL_DEITIES: { slug: Deity; icon: string; color: string }[] = [
  { slug: "shiva",     icon: "🕉️",  color: "#b23a00" },
  { slug: "hanuman",   icon: "🐒",  color: "#c25000" },
  { slug: "ganesha",   icon: "🐘",  color: "#9c3a00" },
  { slug: "durga",     icon: "🌺",  color: "#7a0000" },
  { slug: "lakshmi",   icon: "🪷",  color: "#8a5200" },
  { slug: "krishna",   icon: "🦚",  color: "#1a4a8a" },
  { slug: "rama",      icon: "🏹",  color: "#1a5e2a" },
  { slug: "vishnu",    icon: "💙",  color: "#1a3a6a" },
  { slug: "saraswati", icon: "🎶",  color: "#2a5a8a" },
  { slug: "surya",     icon: "☀️",  color: "#8a5a00" },
  { slug: "shani",     icon: "🪐",  color: "#2a2a4a" },
  { slug: "sai-baba",  icon: "🙏",  color: "#4a3a00" },
];

// Only surface deities that actually have content — empty "coming soon"
// hubs are worthless to readers and to quality raters.
const DEITIES = ALL_DEITIES.filter((d) => getByDeity(d.slug).length > 0);

export default function DeityIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        {" › "}
        <span style={{ color: "var(--deep)" }} className="font-medium">Deities</span>
      </nav>

      <h1
        className="font-extrabold mb-2"
        style={{ fontSize: "clamp(1.5rem,4vw,2rem)", color: "var(--deep)" }}
      >
        Browse by Deity
      </h1>
      <p className="mb-8" style={{ color: "var(--muted)" }}>
        Find all Chalisa, Aarti, Stotra and Mantra for each deity.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {DEITIES.map(({ slug, icon, color }) => {
          const count = getByDeity(slug).length;
          const label = DEITY_LABELS[slug];
          return (
            <Link
              key={slug}
              href={`/deity/${slug}`}
              className="card-lift rounded-2xl p-5 text-center no-underline"
              style={{ background: "white", border: "1px solid var(--line)" }}
            >
              <div className="text-4xl mb-2">{icon}</div>
              <h2
                className="font-bold text-base"
                style={{ color: "var(--ink)" }}
              >
                {label}
              </h2>
              {count > 0 ? (
                <p className="text-xs mt-1 font-semibold" style={{ color }}>
                  {count} text{count !== 1 ? "s" : ""} available
                </p>
              ) : (
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                  Coming soon
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
