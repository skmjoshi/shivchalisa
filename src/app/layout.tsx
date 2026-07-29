import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://shivchalisa.org"),
  title: {
    default: "Shiv Chalisa – Chalisa, Aarti, Stotra & Mantra Lyrics with Meaning",
    template: "%s",
  },
  description:
    "Read Shiv Chalisa, Hanuman Chalisa, Durga Aarti and other Hindu devotional texts with lyrics and meaning in Hindi, English and Sanskrit.",
  keywords: [
    "shiv chalisa", "chalisa", "aarti", "stotra", "mantra",
    "hanuman chalisa", "devotional", "bhakti", "hindu prayer", "puja",
    "shiv chalisa lyrics", "hanuman chalisa lyrics", "aarti sangrah",
    "hindu devotional songs", "sanskrit stotra", "hindu mantra",
    "shree shiv chalisa", "शिव चालीसा", "हनुमान चालीसा",
  ],
  authors: [{ name: "Shiv Chalisa", url: "https://shivchalisa.org" }],
  publisher: "Shiv Chalisa",
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    siteName: "Shiv Chalisa",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shiv Chalisa - Devotional Texts in Hindi, English & Sanskrit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: {
    canonical: "https://shivchalisa.org",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
  category: "religion",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff7a18" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Fonts: warm the connections, then load non-render-blocking with swap */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
        />

        {/* WebSite schema - enables Google sitelinks search box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Shiv Chalisa",
              url: "https://shivchalisa.org/",
              description: "Read Shiv Chalisa, Hanuman Chalisa, Durga Aarti and other Hindu devotional texts with lyrics and meaning in Hindi, English and Sanskrit.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://shivchalisa.org/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              inLanguage: ["hi", "en", "sa"],
            }),
          }}
        />

        {/* Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Shiv Chalisa",
              url: "https://shivchalisa.org",
              logo: "https://shivchalisa.org/favicon.svg",
              description: "Shiv Chalisa - Read Shiv Chalisa, Hanuman Chalisa, Durga Aarti and other Hindu devotional texts with lyrics and meaning in Hindi, English and Sanskrit.",
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                availableLanguage: ["Hindi", "English", "Sanskrit"],
              },
            }),
          }}
        />

        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
