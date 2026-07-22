export type Lang = "hindi" | "english" | "sanskrit";

export interface Verse {
  number?: number;
  label?: string;         // e.g. "दोहा", "॥ चौपाई ॥", "Chorus"
  hindi?: string;
  sanskrit?: string;
  english?: string;       // transliteration or translation
  meaning?: string;       // English meaning / explanation
}

export interface ContentItem {
  slug: string;           // URL slug e.g. "shiv-chalisa"
  category: Category;     // "chalisa" | "aarti" | ...
  deity: Deity;
  title: {
    hindi: string;        // "श्री शिव चालीसा"
    english: string;      // "Shiv Chalisa"
  };
  metaTitle: string;      // Full SEO title tag
  metaDescription: string;
  keywords: string[];
  intro: string;          // Opening paragraph shown under the title
  benefits: string[];
  howToChant?: string;
  bestTime?: string;
  verses: Verse[];
  audioUrl?: string;
  pdfUrl?: string;
  relatedSlugs?: string[];
  faqs?: { q: string; a: string }[];
}

export type Category =
  | "chalisa"
  | "aarti"
  | "stotra"
  | "mantra"
  | "ashtakam"
  | "kavacham"
  | "sahasranama"
  | "bhajan"
  | "vrat-katha";

export type Deity =
  | "shiva"
  | "hanuman"
  | "rama"
  | "krishna"
  | "vishnu"
  | "durga"
  | "lakshmi"
  | "saraswati"
  | "ganesha"
  | "surya"
  | "shani"
  | "sai-baba"
  | "other";

export const CATEGORY_LABELS: Record<Category, string> = {
  chalisa:      "Chalisa",
  aarti:        "Aarti",
  stotra:       "Stotra",
  mantra:       "Mantra",
  ashtakam:     "Ashtakam",
  kavacham:     "Kavacham",
  sahasranama:  "Sahasranama",
  bhajan:       "Bhajan",
  "vrat-katha": "Vrat Katha",
};

export const DEITY_LABELS: Record<Deity, string> = {
  shiva:     "Shiva",
  hanuman:   "Hanuman",
  rama:      "Rama",
  krishna:   "Krishna",
  vishnu:    "Vishnu",
  durga:     "Durga",
  lakshmi:   "Lakshmi",
  saraswati: "Saraswati",
  ganesha:   "Ganesha",
  surya:     "Surya",
  shani:     "Shani",
  "sai-baba":"Sai Baba",
  other:     "Other",
};
