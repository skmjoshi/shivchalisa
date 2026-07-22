"use client";
import { useState } from "react";
import Link from "next/link";
import type { ContentItem, Lang } from "@/lib/types";
import AudioPlayer from "./AudioPlayer";

interface Props {
  item: ContentItem;
  related: ContentItem[];
}

const LANG_OPTIONS: { key: Lang; label: string }[] = [
  { key: "hindi",    label: "हिंदी"   },
  { key: "english",  label: "English"  },
  { key: "sanskrit", label: "Sanskrit" },
];

export default function ContentPage({ item, related }: Props) {
  const [lang, setLang]           = useState<Lang>("hindi");
  const [showMeaning, setMeaning] = useState(true);

  return (
    <article className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      {/* ── Breadcrumb ─────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="text-sm mb-4" style={{ color:"var(--muted)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        {" › "}
        <Link href={`/${item.category}`} className="hover:underline capitalize">
          {item.category}
        </Link>
        {" › "}
        <span style={{ color:"var(--deep)" }} className="font-medium">
          {item.title.english}
        </span>
      </nav>

      {/* ── Title ──────────────────────────────────────────── */}
      <h1 className="font-extrabold leading-tight mb-1"
          style={{ fontSize:"clamp(1.5rem,4vw,2rem)", color:"var(--deep)" }}>
        {item.title.english}
      </h1>
      <p className="deva mb-2" style={{ color:"var(--muted)", fontSize:"1.1rem" }}>
        {item.title.hindi}
      </p>

      {/* ── Meta chips ─────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 my-4">
        <span className="chip">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
        <span className="chip capitalize">{item.deity}</span>
        <span className="chip">🔊 Audio</span>
        <span className="chip">📄 PDF</span>
        {item.bestTime && <span className="chip">🕐 {item.bestTime}</span>}
      </div>

      {/* ── Intro ──────────────────────────────────────────── */}
      <p className="text-base leading-relaxed mb-6" style={{ color:"var(--ink)" }}>
        {item.intro}
      </p>

      {/* ── Audio player ───────────────────────────────────── */}
      <AudioPlayer title={item.title.english} audioUrl={item.audioUrl} />

      {/* ── Language + meaning toggles ─────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {LANG_OPTIONS.map((o) => (
          <button
            key={o.key}
            className={`chip ${lang === o.key ? "active" : ""}`}
            onClick={() => setLang(o.key)}
          >
            {o.label}
          </button>
        ))}
        <button
          className={`chip ml-auto ${showMeaning ? "active" : ""}`}
          onClick={() => setMeaning((v) => !v)}
        >
          💡 Meaning
        </button>
      </div>

      {/* ── Verses ─────────────────────────────────────────── */}
      <section aria-label="Verses">
        {item.verses.map((verse, i) => {
          const text =
            lang === "hindi"    ? verse.hindi    :
            lang === "english"  ? verse.english  :
            lang === "sanskrit" ? (verse.sanskrit ?? verse.hindi) :
            verse.hindi;

          return (
            <div key={i} className="verse-card">
              {/* Section label */}
              {verse.label && (
                <p className="text-xs font-bold uppercase tracking-widest mb-2"
                   style={{ color:"var(--gold)" }}>
                  {verse.label}
                </p>
              )}
              {verse.number && (
                <p className="text-xs font-semibold mb-1" style={{ color:"var(--muted)" }}>
                  ॥ {verse.number} ॥
                </p>
              )}

              {/* Verse text */}
              <p className={lang === "hindi" || lang === "sanskrit" ? "deva" : "leading-relaxed"}
                 style={{ color:"var(--ink)", whiteSpace:"pre-line" }}>
                {text}
              </p>

              {/* Transliteration (when Hindi shown) */}
              {lang === "hindi" && verse.english && (
                <p className="mt-2 text-sm italic" style={{ color:"var(--muted)" }}>
                  {verse.english}
                </p>
              )}

              {/* Meaning */}
              {showMeaning && verse.meaning && (
                <p className="verse-meaning mt-2 pt-2 border-t"
                   style={{ borderColor:"var(--line)" }}>
                  💡 {verse.meaning}
                </p>
              )}
            </div>
          );
        })}
      </section>

      {/* ── Benefits ───────────────────────────────────────── */}
      {item.benefits.length > 0 && (
        <>
          <h2 className="sec-heading">Benefits of {item.title.english}</h2>
          <ul className="space-y-2 pl-4">
            {item.benefits.map((b, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span style={{ color:"var(--saffron)" }}>✦</span>
                <span style={{ color:"var(--ink)" }}>{b}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* ── How to chant ───────────────────────────────────── */}
      {item.howToChant && (
        <>
          <h2 className="sec-heading">How to Recite</h2>
          <p style={{ color:"var(--ink)" }}>{item.howToChant}</p>
        </>
      )}

      {/* ── FAQ ────────────────────────────────────────────── */}
      {item.faqs && item.faqs.length > 0 && (
        <>
          <h2 className="sec-heading">Frequently Asked Questions</h2>
          <dl className="space-y-4">
            {item.faqs.map((faq, i) => (
              <div key={i} className="rounded-xl p-4"
                   style={{ background:"white", border:"1px solid var(--line)" }}>
                <dt className="font-bold mb-1" style={{ color:"var(--deep)" }}>
                  {faq.q}
                </dt>
                <dd style={{ color:"var(--ink)" }}>{faq.a}</dd>
              </div>
            ))}
          </dl>
        </>
      )}

      {/* ── Related ────────────────────────────────────────── */}
      {related.length > 0 && (
        <>
          <h2 className="sec-heading">Related</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/${r.category}/${r.slug}`}
                className="chip"
              >
                {r.title.english}
              </Link>
            ))}
          </div>
        </>
      )}

      {/* ── PDF download ───────────────────────────────────── */}
      <div className="mt-8 p-4 rounded-2xl text-center"
           style={{ background:"var(--cream-2)", border:"1px solid var(--line)" }}>
        <p className="font-semibold mb-3" style={{ color:"var(--deep)" }}>
          Download {item.title.english} PDF
        </p>
        <button
          className="px-6 py-2.5 rounded-full text-white font-bold text-sm transition-transform active:scale-95"
          style={{ background:"linear-gradient(135deg,#ff7a18,#b23a00)" }}
        >
          📥 Download Free PDF
        </button>
      </div>
    </article>
  );
}
