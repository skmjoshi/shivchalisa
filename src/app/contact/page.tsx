import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Contact Shiv Chalisa – Report a Correction or Get in Touch" },
  description:
    "Contact Shiv Chalisa to report an error in a Chalisa, Aarti or Mantra text, suggest a hymn to add, or ask about reuse and permissions.",
  alternates: { canonical: "https://shivchalisa.org/contact" },
};

const EMAIL = "reach@shivchalisa.org";

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <nav className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        {" › "}
        <span style={{ color: "var(--deep)" }} className="font-medium">Contact</span>
      </nav>

      <h1
        className="font-extrabold mb-4"
        style={{ fontSize: "clamp(1.5rem,4vw,2rem)", color: "var(--deep)" }}
      >
        Contact Us
      </h1>

      <p className="text-base leading-relaxed mb-6" style={{ color: "var(--ink)" }}>
        Shiv Chalisa is published by Rocket Internet. You can reach us by email at:
      </p>

      <div
        className="rounded-2xl p-5 text-center mb-8"
        style={{ background: "var(--cream-2)", border: "1px solid var(--line)" }}
      >
        <a
          href={`mailto:${EMAIL}`}
          className="font-bold text-lg no-underline hover:underline"
          style={{ color: "var(--deep)" }}
        >
          {EMAIL}
        </a>
      </div>

      <h2 className="sec-heading">Reporting an error in a text</h2>
      <p className="mb-6" style={{ color: "var(--ink)" }}>
        This is the message we most want to receive. If a verse on this site differs from the
        version you know, please tell us which page, which verse number, and what the correct
        reading should be. If you can point to the printed edition or tradition you are following,
        that helps a great deal — several of these hymns genuinely differ between recensions, and
        knowing your source lets us record the variant properly rather than simply overwriting one
        reading with another.
      </p>

      <h2 className="sec-heading">Suggesting a text</h2>
      <p className="mb-6" style={{ color: "var(--ink)" }}>
        If a hymn you recite is missing, tell us. We prioritise by what readers actually ask for.
      </p>

      <h2 className="sec-heading">Reuse and permissions</h2>
      <p className="mb-6" style={{ color: "var(--ink)" }}>
        The devotional verses themselves are traditional and in the public domain — you do not need
        our permission to recite, print or share them. The English verse meanings and the site
        design are our own work; if you would like to reuse those, please ask first.
      </p>

      <h2 className="sec-heading">Response time</h2>
      <p style={{ color: "var(--ink)" }}>
        This is a small project maintained alongside other work, so replies may take a few days.
        Corrections to the texts are always read first.
      </p>
    </div>
  );
}
