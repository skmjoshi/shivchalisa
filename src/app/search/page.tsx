"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ALL_CONTENT } from "@/data";
import type { ContentItem } from "@/lib/types";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<ContentItem[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = (params.get("q") ?? "").trim();
    setQ(query);
  }, []);

  useEffect(() => {
    if (!q) { setResults([]); return; }
    const lower = q.toLowerCase();
    setResults(
      ALL_CONTENT.filter(
        (item) =>
          item.title.english.toLowerCase().includes(lower) ||
          item.title.hindi.includes(q) ||
          item.keywords.some((k) => k.toLowerCase().includes(lower)) ||
          item.deity.toLowerCase().includes(lower) ||
          item.category.toLowerCase().includes(lower) ||
          item.intro.toLowerCase().includes(lower)
      )
    );
  }, [q]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-extrabold mb-2" style={{ fontSize: "1.6rem", color: "var(--deep)" }}>
        Search Results
      </h1>

      <input
        type="search"
        placeholder="Search Chalisa, Aarti, Mantra..."
        defaultValue={q}
        onChange={(e) => setQ(e.target.value.trim())}
        className="w-full rounded-xl border px-4 py-2 mb-6 text-base outline-none"
        style={{ borderColor: "var(--line)", color: "var(--ink)" }}
      />

      {q && (
        <p className="mb-4" style={{ color: "var(--muted)" }}>
          {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
          &ldquo;<strong>{q}</strong>&rdquo;
        </p>
      )}

      {results.length > 0 ? (
        <ul className="space-y-3">
          {results.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/${item.category}/${item.slug}`}
                className="flex flex-col gap-1 rounded-2xl p-4 card-lift no-underline"
                style={{ background: "white", border: "1px solid var(--line)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ background: "var(--cream-2)", color: "var(--deep)" }}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs capitalize" style={{ color: "var(--muted)" }}>
                    {item.deity}
                  </span>
                </div>
                <strong className="text-base" style={{ color: "var(--ink)" }}>
                  {item.title.english}
                </strong>
                <span className="deva text-sm" style={{ color: "var(--muted)" }}>
                  {item.title.hindi}
                </span>
                <span className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                  {item.intro.slice(0, 120)}...
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : q ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">🙏</p>
          <p style={{ color: "var(--muted)" }}>
            No results found for &ldquo;<strong>{q}</strong>&rdquo;. Try &ldquo;Shiv Chalisa&rdquo; or &ldquo;Hanuman Aarti&rdquo;.
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-semibold mb-2" style={{ color: "var(--deep)" }}>
            Search all devotional texts
          </p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Find Chalisa, Aarti, Stotra, Mantra and more with lyrics, meaning and audio.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-lg mx-auto">
            {[
              "Shiv Chalisa", "Hanuman Chalisa", "Ganesh Aarti", "Durga Aarti",
              "Gayatri Mantra", "Mahamrityunjaya", "Shiv Tandav",
            ].map((s) => (
              <Link
                key={s}
                href={`/search?q=${encodeURIComponent(s)}`}
                className="chip text-xs"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}