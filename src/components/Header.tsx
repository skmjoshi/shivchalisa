"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Only categories that have content. /bhajan, /ashtakam, /kavacham,
// /sahasranama and /vrat-katha are not built yet — do not link them.
const NAV = [
  { label: "Chalisa", href: "/chalisa" },
  { label: "Aarti",   href: "/aarti"   },
  { label: "Stotra",  href: "/stotra"  },
  { label: "Mantra",  href: "/mantra"  },
  { label: "Deities", href: "/deity"   },
];

export default function Header() {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Subtle shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close nav on route change
  useEffect(() => { setOpen(false); }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow ${
        scrolled ? "shadow-lg" : "shadow-sm"
      }`}
      style={{ background: "linear-gradient(135deg,#ff7a18,#b23a00)" }}
    >
      {/* ── Top bar ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 text-white font-extrabold text-xl tracking-tight"
          aria-label="BhaktiSagar home"
        >
          <span className="text-2xl leading-none">🕉️</span>
          <span>
            Bhakti<span className="text-orange-200">Sagar</span>
          </span>
        </Link>

        {/* Search – grows to fill space on desktop */}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-md mx-auto">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Shiv Chalisa, Hanuman Aarti…"
            aria-label="Search"
            className="flex-1 min-w-0 px-4 py-2 text-base rounded-l-full border-none outline-none text-gray-800 bg-white"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-r-full text-white font-bold text-sm shrink-0"
            style={{ background: "#d4a017" }}
            aria-label="Search"
          >
            🔍
          </button>
        </form>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-white/90 hover:text-white font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden text-white bg-white/20 rounded-lg w-11 h-11 flex items-center justify-center text-xl shrink-0"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* ── Mobile nav drawer ───────────────────────────────── */}
      {open && (
        <nav
          className="md:hidden bg-orange-900/95 backdrop-blur px-4 pb-4"
          aria-label="Mobile navigation"
        >
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block text-white font-semibold py-3 border-b border-white/10 last:border-0"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
