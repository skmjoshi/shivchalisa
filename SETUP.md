# BhaktiSagar – Setup Guide

## Run locally (2 commands)
```bash
npm install
npm run dev
```
Then open http://localhost:3000

## Build for production
```bash
npm run build
npm start
```

## Deploy (Vercel – recommended)
1. Push this folder to GitHub.
2. Go to vercel.com → New Project → import the repo.
3. Zero config needed – Vercel detects Next.js automatically.
4. Set your custom domain (bhaktisagar.com) in Vercel settings.

## Project structure
```
src/
  app/
    page.tsx                  ← Homepage
    layout.tsx                ← Root layout (Header, Footer, SEO)
    [category]/[slug]/page.tsx ← Dynamic content pages (SEO engine)
    search/page.tsx            ← Search results
    sitemap.ts                 ← Auto-generated sitemap.xml
    robots.ts                  ← robots.txt
  components/
    Header.tsx                ← Sticky header, mobile hamburger
    Footer.tsx                ← Footer link grid
    ContentPage.tsx           ← Reusable verse display + FAQ + related
    AudioPlayer.tsx           ← Play/pause/seek audio player
  data/
    index.ts                  ← Master registry – add items here
    shiv-chalisa.ts           ← Full content + verses + FAQs
    shiv-aarti.ts
    hanuman-chalisa.ts
    ganesh-chalisa.ts
  lib/
    types.ts                  ← TypeScript types (ContentItem, Verse…)
```

## Adding a new page (e.g. Durga Chalisa)
1. Create `src/data/durga-chalisa.ts` – copy any existing file as template.
2. Fill in all fields: slug, category, deity, title, verses, faqs, etc.
3. Import it in `src/data/index.ts` and add to `ALL_CONTENT`.
4. Done – the page auto-generates at `/chalisa/durga-chalisa` with full SEO.

## SEO checklist per page
- [x] Unique `<title>` with exact keyword
- [x] Meta description with keyword
- [x] Canonical URL
- [x] hreflang hi/en
- [x] Article + Breadcrumb + FAQ structured data (JSON-LD)
- [x] Static generation (HTML at build time – fastest possible load)
- [x] Auto sitemap.xml
- [x] robots.txt

## Current content (4 pages live)
| URL | Title |
|-----|-------|
| /chalisa/shiv-chalisa    | Shiv Chalisa    |
| /aarti/shiv-aarti        | Shiv Aarti      |
| /chalisa/hanuman-chalisa | Hanuman Chalisa |
| /chalisa/ganesh-chalisa  | Ganesh Chalisa  |

Next to add: Durga Chalisa, Durga Aarti, Lakshmi Aarti, Shiv Tandav, Mahamrityunjaya Mantra…
See /content-catalog.md for the full 130+ page plan.
