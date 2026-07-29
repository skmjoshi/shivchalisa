import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy – What We Collect and What We Don't | BhaktiSagar" },
  description:
    "BhaktiSagar privacy policy: what analytics we run, what cookies are set, what we do not collect, and how to opt out.",
  alternates: { canonical: "https://shivchalisa.org/privacy" },
};

const EMAIL = "reach@shivchalisa.org";

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <nav className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        {" › "}
        <span style={{ color: "var(--deep)" }} className="font-medium">Privacy</span>
      </nav>

      <h1
        className="font-extrabold mb-4"
        style={{ fontSize: "clamp(1.5rem,4vw,2rem)", color: "var(--deep)" }}
      >
        Privacy Policy
      </h1>

      <p className="text-base leading-relaxed mb-6" style={{ color: "var(--ink)" }}>
        BhaktiSagar is published by Rocket Internet. This page describes, in plain language, what
        happens to data when you visit this site.
      </p>

      <h2 className="sec-heading">What we do not do</h2>
      <ul className="space-y-2 pl-4 mb-6">
        {[
          "We have no accounts, logins or registration — there is nothing to sign up for.",
          "We do not ask for your name, email address or phone number to read anything.",
          "We do not run advertising, and we do not sell or share data with advertisers or data brokers.",
          "We do not host comments, trackers from social networks, or third-party ad pixels.",
        ].map((t) => (
          <li key={t} className="flex gap-2 items-start">
            <span style={{ color: "var(--saffron)" }}>✦</span>
            <span style={{ color: "var(--ink)" }}>{t}</span>
          </li>
        ))}
      </ul>

      <h2 className="sec-heading">Analytics</h2>
      <p className="mb-4" style={{ color: "var(--ink)" }}>
        We use Google Analytics 4 (measurement ID <code>G-8X21XGHYN0</code>) to understand which
        texts people read, so we know what to work on next. It records things like the page visited,
        approximate location derived from IP address, referring site, and device and browser type.
        Google Analytics sets cookies in your browser to do this.
      </p>
      <p className="mb-6" style={{ color: "var(--ink)" }}>
        We look at this only in aggregate. We do not attempt to identify individual visitors, and we
        have no way to connect this data to a real person. Google processes this data under its own
        terms — see{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: "var(--deep)" }}
        >
          Google&rsquo;s privacy policy
        </a>
        .
      </p>

      <h2 className="sec-heading">How to opt out</h2>
      <p className="mb-6" style={{ color: "var(--ink)" }}>
        You can block analytics with any content blocker, by using your browser&rsquo;s
        &ldquo;do not track&rdquo; or cookie settings, or with{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: "var(--deep)" }}
        >
          Google&rsquo;s official opt-out add-on
        </a>
        . The site works completely normally with analytics blocked — nothing on this site depends
        on it.
      </p>

      <h2 className="sec-heading">Hosting and fonts</h2>
      <p className="mb-6" style={{ color: "var(--ink)" }}>
        The site is hosted on Cloudflare Pages, so Cloudflare processes requests and may keep
        standard server logs for security and abuse prevention. We load typefaces from Google Fonts,
        which means your browser makes a request to Google&rsquo;s font servers when a page loads.
      </p>

      <h2 className="sec-heading">Children</h2>
      <p className="mb-6" style={{ color: "var(--ink)" }}>
        This site collects nothing that identifies anyone, and is suitable for readers of any age.
      </p>

      <h2 className="sec-heading">Changes and questions</h2>
      <p style={{ color: "var(--ink)" }}>
        If this policy changes we will update this page. If you have a question about privacy, or
        want to ask what data we hold, write to{" "}
        <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "var(--deep)" }}>
          {EMAIL}
        </a>
        .
      </p>
    </div>
  );
}
