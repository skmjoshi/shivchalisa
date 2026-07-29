import type { Metadata } from "next";
import Link from "next/link";
import { ALL_CONTENT } from "@/data";

export const metadata: Metadata = {
  title: { absolute: "About BhaktiSagar – Who We Are & How We Source Our Texts | BhaktiSagar" },
  description:
    "About BhaktiSagar: who maintains the site, where our Chalisa, Aarti, Stotra and Mantra texts come from, and how we check each transcription.",
  alternates: { canonical: "https://shivchalisa.org/about" },
};

export default function AboutPage() {
  const count = ALL_CONTENT.length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <nav className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        {" › "}
        <span style={{ color: "var(--deep)" }} className="font-medium">About</span>
      </nav>

      <h1
        className="font-extrabold mb-4"
        style={{ fontSize: "clamp(1.5rem,4vw,2rem)", color: "var(--deep)" }}
      >
        About BhaktiSagar
      </h1>

      <p className="text-base leading-relaxed mb-6" style={{ color: "var(--ink)" }}>
        BhaktiSagar is an independent devotional-text library published by Rocket Internet.
        We publish Hindu devotional texts — Chalisa, Aarti, Stotra and Mantra — with the full
        original verses in Devanagari, a Roman transliteration, and a plain-English meaning for
        every verse. The site is free, carries no advertising, and needs no account to read.
      </p>

      <h2 className="sec-heading">Where these texts come from</h2>
      <p className="mb-4" style={{ color: "var(--ink)" }}>
        The hymns themselves are traditional and in the public domain — most are centuries old and
        have been passed down through recitation and print for generations. We do not claim
        authorship of any verse. Where a text has a known traditional author, such as Goswami
        Tulsidas for the Hanuman Chalisa, we say so on that page.
      </p>
      <p className="mb-6" style={{ color: "var(--ink)" }}>
        Several of these hymns circulate in more than one recension, with real differences in
        wording between regions and printed editions. Where we know a text is contested, we would
        rather tell you than pretend there is a single official version.
      </p>

      <h2 className="sec-heading">How we check the transcriptions</h2>
      <p className="mb-4" style={{ color: "var(--ink)" }}>
        Devanagari transcription is easy to get subtly wrong, and a wrong syllable in a hymn people
        recite daily matters. We are working through the library re-checking every verse against
        printed editions. That work is genuinely in progress and not yet finished.
      </p>
      <p className="mb-6" style={{ color: "var(--ink)" }}>
        We would rather publish a hymn marked as incomplete than quietly pad it out with invented
        verses to reach a round number. If you spot an error in any text on this site, please{" "}
        <Link href="/contact" className="underline" style={{ color: "var(--deep)" }}>
          tell us
        </Link>{" "}
        — corrections from readers who know these texts well are the most valuable thing we receive.
      </p>

      <h2 className="sec-heading">The English meanings</h2>
      <p className="mb-6" style={{ color: "var(--ink)" }}>
        The verse-by-verse meanings are written by us in plain English. They aim to convey the sense
        of each verse for a reader who does not read Devanagari, not to be a literary translation.
        They are our own words, not copied from any published translation.
      </p>

      <h2 className="sec-heading">What is here right now</h2>
      <p className="mb-6" style={{ color: "var(--ink)" }}>
        {count} texts, and growing. We add new ones steadily rather than in bulk, because each page
        takes real work to transcribe and check properly.
      </p>

      <div
        className="rounded-2xl p-4 mt-8"
        style={{ background: "var(--cream-2)", border: "1px solid var(--line)" }}
      >
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          BhaktiSagar is not affiliated with any temple, religious organisation or commercial
          publisher. Nothing here is a substitute for guidance from a qualified teacher or priest,
          and nothing on this site is medical, legal or financial advice.
        </p>
      </div>
    </div>
  );
}
