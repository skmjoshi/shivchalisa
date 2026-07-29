import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_CONTENT, getBySlug, getRelated } from "@/data";
import ContentPage from "@/components/ContentPage";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

/* ── Static generation — builds one page per content item ──── */
export async function generateStaticParams() {
  return ALL_CONTENT.map((item) => ({
    category: item.category,
    slug:     item.slug,
  }));
}

/* ── Per-page SEO metadata ──────────────────────────────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, category } = await params;
  const item = getBySlug(slug);
  if (!item) return { title: "Not found" };

  return {
    title:       { absolute: item.metaTitle },
    description: item.metaDescription,
    keywords:    item.keywords,
    alternates: {
      canonical: `https://shivchalisa.org/${category}/${slug}`,
    },
    openGraph: {
      title:       item.metaTitle,
      description: item.metaDescription,
      type:        "article",
      url:         `https://shivchalisa.org/${category}/${slug}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${item.title.english} - ${item.title.hindi}`,
        },
      ],
    },
    twitter: {
      card:        "summary_large_image",
      title:       item.metaTitle,
      description: item.metaDescription,
      images:      ["/og-image.png"],
    },
  };
}

/* ── Page component ─────────────────────────────────────────── */
export default async function ContentRoute({ params }: Props) {
  const { slug, category } = await params;
  const item = getBySlug(slug);
  if (!item || item.category !== category) notFound();

  const related = getRelated(item);
  const hasSanskrit = item.verses.some((v) => v.sanskrit);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:      item.metaTitle,
    description:   item.metaDescription,
    inLanguage:    hasSanskrit ? ["hi", "en", "sa"] : ["hi", "en"],
    author:    { "@type": "Organization", name: "Shiv Chalisa" },
    publisher: { "@type": "Organization", name: "Shiv Chalisa", url: "https://shivchalisa.org" },
    datePublished: "2026-06-01",
    mainEntityOfPage: `https://shivchalisa.org/${category}/${slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",             item: "https://shivchalisa.org/" },
      { "@type": "ListItem", position: 2, name: category,           item: `https://shivchalisa.org/${category}` },
      { "@type": "ListItem", position: 3, name: item.title.english, item: `https://shivchalisa.org/${category}/${slug}` },
    ],
  };

  const faqSchema = item.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: item.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <ContentPage item={item} related={related} />
    </>
  );
}
