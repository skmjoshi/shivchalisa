import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://shivchalisa.org"),
  title: {
    default: "BhaktiSagar â€“ Chalisa, Aarti, Stotra & Mantra in Hindi, English & Sanskrit",
    template: "%s | BhaktiSagar",
  },
  description:
    "BhaktiSagar â€“ Read & listen to Shiv Chalisa, Hanuman Chalisa, Durga Aarti, Vishnu Sahasranama and 1000+ devotional texts with lyrics, meaning and audio in Hindi, English and Sanskrit.",
  keywords: [
    "bhaktisagar", "chalisa", "aarti", "stotra", "mantra", "shiv chalisa",
    "hanuman chalisa", "devotional", "bhakti", "hindu prayer", "puja",
  ],
  openGraph: {
    type: "website",
    siteName: "BhaktiSagar",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://shivchalisa.org" },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? “”;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang=”en” data-scroll-behavior=”smooth”>
      <head>
        {/* WebSite schema — enables Google sitelinks search box */}
        <script
          type=”application/ld+json”
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              “@context”: “https://schema.org”,
              “@type”: “WebSite”,
              name: “BhaktiSagar”,
              url: “https://shivchalisa.org/”,
              potentialAction: {
                “@type”: “SearchAction”,
                target: “https://shivchalisa.org/search?q={search_term_string}”,
                “query-input”: “required name=search_term_string”,
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
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className=”min-h-screen flex flex-col”>
        <Header />
        <main className=”flex-1”>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
