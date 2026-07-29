import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getByDeity, ALL_CONTENT } from "@/data";
import { DEITY_LABELS, CATEGORY_LABELS, type Deity, type Category } from "@/lib/types";
import ContentCard from "@/components/ContentCard";
import Link from "next/link";

interface Props {
  params: Promise<{ deity: string }>;
}

const DEITY_META: Record<string, {
  icon: string;
  banner: string;
  title: string;
  desc: string;
  about: string;
}> = {
  shiva: {
    icon: "🕉️",
    banner: "#b23a00",
    title: "Lord Shiva – Chalisa, Aarti, Stotra & Mantra",
    desc: "Shiv Chalisa, Shiv Aarti, Shiv Tandav, Mahamrityunjaya Mantra and all Shiva devotional texts.",
    about: "Lord Shiva (Mahadeva) is one of the principal deities of Hinduism — the destroyer and transformer within the Trimurti. Known as Bholenath for his easily pleased nature, Shiva is worshipped through Chalisa, Aarti, Stotras, Ashtakams and the powerful Panchakshar mantra 'Om Namah Shivaya'.",
  },
  hanuman: {
    icon: "🐒",
    banner: "#b23a00",
    title: "Lord Hanuman – Chalisa, Aarti, Bajrang Baan & More",
    desc: "Hanuman Chalisa, Hanuman Aarti, Bajrang Baan, Sankat Mochan Ashtak and all Bajrangbali texts.",
    about: "Lord Hanuman — son of the Wind (Pavansuta) — is the embodiment of devotion, strength and selfless service. His Chalisa written by Tulsidas is the most recited prayer in Hinduism. Hanuman is the supreme protector of devotees and is especially powerful on Tuesdays and Saturdays.",
  },
  ganesha: {
    icon: "🐘",
    banner: "#9c3a00",
    title: "Lord Ganesha – Chalisa, Aarti & Stotra",
    desc: "Ganesh Chalisa, Ganesh Aarti, Sankatnashan Stotra and all Ganpati devotional texts.",
    about: "Lord Ganesha — the elephant-headed son of Shiva and Parvati — is the remover of obstacles (Vighnaharta) and deity of all new beginnings. He is always worshipped first before any puja, event or undertaking. His blessings bring intelligence, wisdom and success.",
  },
  durga: {
    icon: "🌺",
    banner: "#7a0000",
    title: "Goddess Durga – Chalisa, Aarti & Stotra",
    desc: "Durga Chalisa, Durga Aarti, Mahishasura Mardini, Devi Kavacham and all Shakti devotional texts.",
    about: "Goddess Durga is the supreme manifestation of Shakti — the cosmic feminine power. She is the warrior goddess who vanquished the buffalo demon Mahishasura when all the gods failed. She is worshipped during Navratri in her nine forms (Navdurga) for protection, courage and victory over evil.",
  },
  lakshmi: {
    icon: "🪷",
    banner: "#8a5200",
    title: "Goddess Lakshmi – Aarti, Chalisa & Stotra",
    desc: "Lakshmi Aarti, Lakshmi Chalisa, Shree Suktam, Kanakadhara Stotram and all prosperity prayers.",
    about: "Goddess Lakshmi is the goddess of wealth, beauty, fortune and auspiciousness — the divine consort of Vishnu. She is worshipped every Friday and especially on Diwali when she is welcomed into the home. Her blessings bring material and spiritual prosperity.",
  },
  krishna: {
    icon: "🦚",
    banner: "#1a4a8a",
    title: "Lord Krishna – Chalisa, Aarti & Bhajan",
    desc: "Krishna Chalisa, Krishna Aarti, Madhurashtakam, Bhagavad Gita and all Krishna devotional texts.",
    about: "Lord Krishna — the eighth avatar of Vishnu — is the deity of love, wisdom and divine joy. His Bhagavad Gita teachings are the supreme scripture of Hindu philosophy. Devotees worship him through joyful bhajans, the Hare Krishna Mahamantra and the Madhurashtakam.",
  },
  rama: {
    icon: "🏹",
    banner: "#1a5e2a",
    title: "Lord Rama – Chalisa, Aarti & Ram Raksha Stotra",
    desc: "Ram Chalisa, Ram Aarti, Ram Raksha Stotra, Sundarkand and all Shri Ram devotional texts.",
    about: "Lord Rama — the seventh avatar of Vishnu and prince of Ayodhya — is the embodiment of dharma, righteousness and ideal conduct. His story told in the Ramayana is the foundation of Hindu ethics. The Ram Raksha Stotra and Sundarkand are among the most powerful protective prayers.",
  },
  vishnu: {
    icon: "💙",
    banner: "#1a3a6a",
    title: "Lord Vishnu – Sahasranama, Aarti & Stotra",
    desc: "Vishnu Sahasranama, Vishnu Aarti, Om Namo Bhagavate and all Vaishnava devotional texts.",
    about: "Lord Vishnu — the preserver of the universe — is one of the Trimurti. He incarnates as avatars whenever dharma is threatened. The Vishnu Sahasranama (1000 names) is one of the most sacred texts in Hinduism. His devotees are known as Vaishnavas.",
  },
  saraswati: {
    icon: "🎶",
    banner: "#2a5a8a",
    title: "Goddess Saraswati – Chalisa, Aarti & Vandana",
    desc: "Saraswati Chalisa, Saraswati Aarti, Saraswati Vandana and all knowledge-goddess prayers.",
    about: "Goddess Saraswati is the goddess of knowledge, learning, music and the arts. She is the consort of Brahma. Students worship her before examinations and at the start of any new learning. Basant Panchami is the most important day for her worship.",
  },
  surya: {
    icon: "☀️",
    banner: "#8a5a00",
    title: "Surya Dev – Gayatri Mantra, Aditya Hridayam & More",
    desc: "Gayatri Mantra, Aditya Hridayam, Surya Chalisa, Surya Aarti and all Sun-god prayers.",
    about: "Surya (the Sun) is one of the Adityas and a principal Vedic deity. The Gayatri Mantra is a prayer to Savitur (the Sun). The Aditya Hridayam — taught by Sage Agastya to Rama — is a powerful hymn that grants victory, health and inner strength.",
  },
  shani: {
    icon: "🪐",
    banner: "#2a2a4a",
    title: "Shani Dev – Chalisa, Aarti & Stotra",
    desc: "Shani Chalisa, Shani Aarti, Dashrath Krit Shani Stotra and all Saturn-deity prayers.",
    about: "Shani Dev (Saturn) is one of the Navagrahas and is regarded as a stern but just deity who gives results according to one's karma. Saturday is his day. Reciting Shani Chalisa and Hanuman Chalisa on Saturdays is believed to mitigate Shani's difficult influence.",
  },
};

const VALID_DEITIES = Object.keys(DEITY_LABELS) as Deity[];

export async function generateStaticParams() {
  // Only build hubs that have content — an empty "coming soon" page is worthless
  // to readers and dilutes site quality. Hubs reappear automatically as content lands.
  return VALID_DEITIES.filter((deity) => getByDeity(deity).length > 0).map((deity) => ({ deity }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { deity } = await params;
  if (!VALID_DEITIES.includes(deity as Deity)) return { title: "Not Found" };

  const meta  = DEITY_META[deity];
  const label = DEITY_LABELS[deity as Deity];
  const items = getByDeity(deity);

  return {
    title: { absolute: `${meta?.title ?? label} | BhaktiSagar` },
    description: meta?.desc ?? `All ${label} devotional texts with lyrics and meaning.`,
    alternates: { canonical: `https://shivchalisa.org/deity/${deity}` },
    openGraph: {
      title: `${label} – Chalisa, Aarti, Stotra & Mantra | BhaktiSagar`,
      description: meta?.desc,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${label} - Devotional Texts on BhaktiSagar`,
        },
      ],
    },
  };
}

export default async function DeityPage({ params }: Props) {
  const { deity } = await params;
  if (!VALID_DEITIES.includes(deity as Deity)) notFound();

  const label = DEITY_LABELS[deity as Deity];
  const meta  = DEITY_META[deity] ?? { icon: "🕉️", banner: "#b23a00", title: label, desc: "", about: "" };
  const items = getByDeity(deity);

  // Group items by category
  const byCategory = items.reduce<Record<string, typeof items>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Other deities
  const otherDeities = VALID_DEITIES
    .filter((d) => d !== deity && getByDeity(d).length > 0)
    .slice(0, 8);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",  item: "https://shivchalisa.org/" },
      { "@type": "ListItem", position: 2, name: label,   item: `https://shivchalisa.org/deity/${deity}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Hero banner ────────────────────────────────────── */}
      <section
        className="py-10 px-4 text-center text-white"
        style={{ background: `linear-gradient(135deg, ${meta.banner}, #2a1c12)` }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-3">{meta.icon}</div>
          <h1
            className="font-extrabold mb-2"
            style={{ fontSize: "clamp(1.5rem,4vw,2.1rem)" }}
          >
            {label}
          </h1>
          <p className="text-sm text-white/80 mb-2">{meta.desc}</p>
          <p className="text-sm font-semibold text-orange-200">
            {items.length} devotional text{items.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm mt-4 mb-4" style={{ color: "var(--muted)" }} aria-label="Breadcrumb">
          <Link href="/" className="hover:underline">Home</Link>
          {" › "}
          <Link href="/deity" className="hover:underline">Deities</Link>
          {" › "}
          <span style={{ color: "var(--deep)" }} className="font-medium">{label}</span>
        </nav>

        {/* About */}
        {meta.about && (
          <p
            className="text-sm leading-relaxed p-4 rounded-2xl mb-8"
            style={{ background: "var(--cream-2)", color: "var(--muted)", border: "1px solid var(--line)" }}
          >
            {meta.about}
          </p>
        )}

        {/* Content grouped by category */}
        {items.length > 0 ? (
          Object.entries(byCategory).map(([cat, catItems]) => (
            <section key={cat} className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="font-bold capitalize"
                  style={{ fontSize: "1.2rem", color: "var(--deep)" }}
                >
                  {CATEGORY_LABELS[cat as Category] ?? cat}
                </h2>
                <Link
                  href={`/${cat}`}
                  className="text-sm font-semibold hover:underline"
                  style={{ color: "var(--saffron)" }}
                >
                  View all {CATEGORY_LABELS[cat as Category]}s →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catItems.map((item) => (
                  <ContentCard key={item.slug} item={item} showDeity={false} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div
            className="text-center py-16 rounded-2xl my-8"
            style={{ background: "var(--cream-2)", color: "var(--muted)" }}
          >
            <p className="text-4xl mb-3">{meta.icon}</p>
            <p className="font-semibold">More {label} texts coming soon</p>
            <p className="text-sm mt-1">We are adding new content every week.</p>
          </div>
        )}

        {/* Other deities */}
        {otherDeities.length > 0 && (
          <section className="mb-12">
            <h2
              className="font-bold mb-4"
              style={{ fontSize: "1.1rem", color: "var(--deep)" }}
            >
              Other Deities
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3">
              {otherDeities.map((d) => {
                const dm = DEITY_META[d];
                return (
                  <Link
                    key={d}
                    href={`/deity/${d}`}
                    className="card-lift rounded-2xl p-3 text-center no-underline"
                    style={{ background: "white", border: "1px solid var(--line)" }}
                  >
                    <div className="text-2xl mb-1">{dm?.icon ?? "🕉️"}</div>
                    <p className="text-xs font-semibold" style={{ color: "var(--deep)" }}>
                      {DEITY_LABELS[d as Deity]}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
