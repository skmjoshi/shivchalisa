# Handover — Shiv Chalisa (shivchalisa.org)

**For: Codex-1, joining as co-owner.**
**Last updated:** 2026-11-24
**Repo:** https://github.com/skmjoshi/shivchalisa — ⚠️ **PUBLIC**
**Live:** https://shivchalisa.org (and https://www.shivchalisa.org)

Read this file end to end before your first commit. Sections 1, 5, 6 and 7 are the ones that
will bite you if you skip them.

---

## 1. Read this first — the two rules that matter most

### 1.1 This is a PUBLIC repo. Never commit a secret.
No API tokens, no `.env` files, no credentials in code, comments, commit messages or docs —
including this one. `.gitignore` already excludes `.env*`. Keep it that way.

### 1.2 This site publishes religious scripture. Never invent a verse.
People recite these texts in daily worship. A wrong or fabricated line corrupts a living
religious practice. This is not a style preference — it is the single hard rule of the project.

- Never write, complete, reconstruct, "fill in" or paraphrase a verse from your own knowledge.
- Never extend a hymn to reach a round number because the pattern looks obvious.
- If you cannot source a verse, leave it out and say so. **An honestly missing verse is a good
  outcome. A fabricated verse is a catastrophic one.**
- Any verse you add must be cross-checked against multiple independent sources, and ideally a
  printed edition, before it ships.

This is not hypothetical. See §6 — the live site currently contains a couplet that exists in
no Durga Chalisa edition anywhere.

---

## 2. What this project is

A free, ad-free library of Hindu devotional texts — Chalisa, Aarti, Stotra and Mantra — each
with the Devanagari original, a Roman transliteration, and a plain-English meaning per verse.

- **Brand:** "Shiv Chalisa" (renamed from "BhaktiSagar" on 2026-11-24).
- **Publisher:** Rocket Internet.
- **Contact:** reach@shivchalisa.org.
- **Goal:** rank for Shiva/Hanuman devotional queries. See §8 for the honest assessment.

> The folder and repo are still named `bhaktisagar` / `shivchalisa`. The **folder** name is
> cosmetic and deliberately left alone — renaming it breaks the git remote and the Cloudflare
> Pages link for no user-facing benefit. Nothing public references it.

---

## 3. Stack and architecture

| Thing | Value |
|---|---|
| Framework | Next.js 16.2.7 (App Router, Turbopack) |
| Language | TypeScript, React |
| Styling | Tailwind + CSS variables in `src/app/globals.css` |
| Output | **Static export** (`output: "export"` in `next.config.ts`) → `out/` |
| Hosting | Cloudflare Pages, project `shivchalisa` |
| Analytics | GA4, `G-8X21XGHYN0` |

### Content model
All content is data, not pages. One file per text in `src/data/`, each default-exporting a
`ContentItem` (shape defined in `src/lib/types.ts`), registered in `src/data/index.ts`.

Adding a text to `ALL_CONTENT` automatically creates its page, adds it to the category and
deity hubs, and adds it to the sitemap. **There is no per-page file to write.**

### Routes
```
/                          src/app/page.tsx
/[category]                category hubs (chalisa, aarti, stotra, mantra)
/[category]/[slug]         the money pages — one per ContentItem
/deity                     deity index
/deity/[deity]             deity hubs
/about /contact /privacy   trust pages
/search                    client-side only (static export cannot do server search)
/sitemap.xml /robots.txt   generated from src/app/sitemap.ts and robots.ts
```

### Static-export constraints (these have already bitten us once)
- `robots.ts` and `sitemap.ts` **must** keep `export const dynamic = "force-static"`.
- `/search` **must** stay a client component reading `window.location.search`. It cannot use
  `searchParams`, which requires a server render.
- `images.unoptimized: true` is required; do not remove it.

---

## 4. Current state (verified live)

- **31 pages built**, 13 content items, 29 sitemap URLs.
- Apex and `www` both 200. HTTPS + brotli. GA4 firing.
- Schema: WebSite + Organization + Article + BreadcrumbList + FAQPage. All valid.
- Social cards: real 1200×630 PNG (`/og-image.png`).
- Static assets served `Cache-Control: public, max-age=31536000, immutable` via `public/_headers`.

**Content inventory (13):** Shiv / Hanuman / Ganesh / Durga Chalisa · Shiv / Hanuman / Ganesh /
Durga / Lakshmi / Vishnu Aarti · Shiv Tandav Stotram · Mahamrityunjaya / Gayatri Mantra.

**Zero texts currently have audio or PDF.** That is correct and intentional — see §7.

---

## 5. How to build and deploy

### 5.1 ⚠️ THE GA TRAP — read before your first build
`src/app/layout.tsx` does `process.env.NEXT_PUBLIC_GA_ID ?? ""` and gates the entire analytics
block on it. **There is no `.env` file in this repo.** So:

> A plain `npm run build` produces a green, error-free build that has silently deleted all
> analytics from the site.

Always set the variable. Either create a local `.env.local` (git-ignored):
```
NEXT_PUBLIC_GA_ID=G-8X21XGHYN0
```
…or set it inline every single time. **Then grep the built HTML for the ID before deploying.**

### 5.2 Build (PowerShell — see §7.1 on why)
```powershell
cd "D:\Rocket Internet-2\Sanskrit\bhaktisagar"
$env:NEXT_PUBLIC_GA_ID = "G-8X21XGHYN0"
npm run build
```

### 5.3 Deploy to production
```powershell
$env:CLOUDFLARE_API_TOKEN = "<token — see §9, never commit this>"
$env:CLOUDFLARE_ACCOUNT_ID = "<account id — ask the owner>"
npx wrangler pages deploy out --project-name shivchalisa --branch main --commit-dirty=true
```
`--branch main` is what makes it a **production** deploy. Any other branch name publishes to a
preview URL only and will not update shivchalisa.org.

### 5.4 Verify after every deploy — do not skip
```powershell
function ReadUrl($u) { $wc = New-Object System.Net.WebClient; [System.Text.Encoding]::UTF8.GetString($wc.DownloadData($u)) }
$hp = ReadUrl "https://shivchalisa.org/?cb=$(Get-Random)"
"GA4 present : " + ($hp -match 'G-8X21XGHYN0')
"og:image    : " + ($hp -match 'og-image\.png')
"no mojibake : " + (-not ($hp -match 'â€|ðŸ'))
foreach ($p in @("/","/about","/contact","/privacy","/og-image.png","/sitemap.xml")) {
  try { $r = Invoke-WebRequest "https://shivchalisa.org$p" -UseBasicParsing -TimeoutSec 15; "$p => $($r.StatusCode)" }
  catch { "$p => FAIL" }
}
```
Cloudflare's edge cache can serve a stale copy for a minute or two after deploy. If something
looks wrong immediately after deploying, re-check with a cache-busting query before debugging.

---

## 6. 🔴 CRITICAL OPEN ISSUE — unattested scripture is live right now

**`src/data/durga-chalisa.ts` contains a couplet that exists in no Durga Chalisa edition.**

The file's opening block:
```
चंद्र विदर वदन पंकज राजै। चतुर्भुज दुर्गा देवी विराजे॥
कर में खड्ग खपर खप डारे। चहुँ दिस सेन शत्रु संहारे॥
```
Three independent sourcing agents ran exact-phrase searches across ~12 devotional sites plus
Kali Chalisa and Vindhyeshwari Chalisa, and this was then independently re-verified. Findings:

- The first line returns **only Chandra Dev Chalisa** — a hymn to the **Moon God**, a different
  deity entirely.
- The second line appears to be a conflation of canonical chaupais 18, 21 and 23.
- **Zero attestation anywhere.** Do not try to "fix" or reconstruct it. Delete it.

It gets worse structurally:

| Claim in the file | Reality |
|---|---|
| Opens with a "doha" | That couplet is canonical **chaupai 1**. The whole numbering is offset. |
| 15 blocks | Each block holds **two** chaupais (4 dandas) = 30 chaupais, not 15. |
| "40 verses" | Canonical Durga Chalisa = **40 chaupais, NO dohas**, + 1 unnumbered bhanita naming the poet **Devidas** (not Tulsidas). |

⚠️ **Do NOT append `number: 16..40` to this file.** Because each block holds two chaupais, that
would produce an invented 80-chaupai hymn. Count **dandas** (॥), never blocks. Note the repo
uses two different conventions: Ganesh Chalisa is one chaupai per block, Durga is two.

Because block 1 is wholly non-canonical, **the remaining 28 lines come from the same suspect
source** and must be diffed against canonical before being trusted.

### Ganesh Chalisa is 38 chaupais, not 40
All three sourcing passes agree (Wikisource, BhaktiBharat and others): 1 opening doha + **38
chaupais** + 2 closing dohas. **Chaupais 39 and 40 do not exist in any recension.** The file has
20. The target is 21–38, not 21–40.

### What exists already
A cross-verified set of all 40 Durga chaupais was produced, with per-verse variant notes, source
URLs, and 9 verses flagged where the recommended reading differs from the naive majority. It is
in the session workflow output, not in the repo. **Ask the owner for it rather than re-deriving.**

Known genuine recension fork: **chaupai 36** exists as two completely different lines, both
actively recited. That is an editorial/religious decision for the owner, not a technical one.

### Status
**Blocked pending the owner's decision** between: (1) publish the cross-verified text with
variant footnotes, (2) remove the unattested block now and hold the rest, or (3) wait for a
printed Gita Press / Manoj Pocket Books edition. Recommendation on the table was **(2)**.

**Until this is resolved, do not add new content pages.** Fixing live scripture outranks growth.

---

## 7. Traps this project has already fallen into

### 7.1 PowerShell silently corrupts UTF-8 — this already happened
`Set-Content` / `Out-File` default to the ANSI codepage. A previous tool wrote source files that
way and **double-encoded every non-ASCII character** in `page.tsx` and `deity/page.tsx`: every
emoji became `ðŸ“¿`, every dash became `â€"`. It shipped to production and was visible on the
homepage.

**Rules:**
- Use the `Write`/`Edit` tools, or `[System.IO.File]::WriteAllText($p, $text, (New-Object System.Text.UTF8Encoding($false)))`.
- Never `Set-Content` a source file without `-Encoding utf8`.
- `Invoke-WebRequest` **mis-decodes UTF-8 as Latin-1**, which fabricates phantom mojibake. To
  inspect live pages use:
  ```powershell
  $wc = New-Object System.Net.WebClient
  $html = [System.Text.Encoding]::UTF8.GetString($wc.DownloadData($url))
  ```
- Before committing, sanity check: `rg "ðŸ|â€|â”|Ã¢|à¤" src` must return nothing.

> If you ever need to reverse this corruption: decode the file as UTF-8, re-encode that string
> as **CP1252**, then decode as UTF-8 again. It round-trips exactly. Watch for a leading BOM
> turning into a literal `?` at byte 0.

### 7.2 Shell choice
Bash in this environment has an `npm` that is broken (bad nvm shim) and `gh` is not always on
PATH. **Use the PowerShell tool for `npm`, `npx` and builds.** Bash works fine for `git`.

PowerShell 5.1 specifics: no `&&`, no `||`, no ternary. `$HOME` is read-only — don't assign to
it. Paths containing `[category]` / `[slug]` are treated as **wildcards** by `Get-Content` etc.;
use `[System.IO.File]::ReadAllText()` for those.

### 7.3 GitHub multi-account
The machine has ~8 authenticated `gh` accounts. The default active one (`santxlab`) **cannot
push to this repo** — it 403s. You must switch:
```powershell
gh auth switch --user skmjoshi
gh auth setup-git
git push origin main
gh auth switch --user santxlab   # restore the user's default afterwards
```

### 7.4 Cloudflare rewrites robots.txt at the edge
`shivchalisa.org/robots.txt` does **not** match what we deploy. A zone-level Cloudflare feature
(Content Signals / AI Crawl Control) injects its own managed block and also serves a stale copy
of old rules. The origin (`shivchalisa.pages.dev/robots.txt`) is correct.

**This is a Cloudflare dashboard setting, not a code bug.** It also makes a policy call —
blocking GPTBot, ClaudeBot, Google-Extended etc. from AI training. Leave it alone; it is the
owner's decision. Don't "fix" it in `robots.ts`.

### 7.5 Don't trust the two prior AI audits in this project's history
Two earlier AI audits exist ("Grok", "OpenCode"). Both are partly wrong:
- Grok's headline finding ("domain is a parking page") was stale — the site was live.
- OpenCode self-graded 86/100 and listed 12 issues as "FIXED". Several were not: `relatedSlugs`
  was only partly fixed, and its hreflang "fix" was **actively harmful** — it pointed at `/hi/`
  URLs that 404'd, then was replaced with `hi` and `en` both pointing at the same URL (invalid).
- Its keyword search-volume table is **fabricated** — the numbers descend in perfect order
  matching list position, with no tool, date or match type given.

**Verify against the live site, never against a checklist that says "done".**

---

## 8. Honest position on SEO

The goal is ranking for "Shiv Chalisa" / "Hanuman Chalisa". The truthful assessment:

**Top-3 for those head terms is not achievable within 24 months.** Those SERPs are held by
national news portals and decade-old devotional properties with thousands of referring domains.
This site has effectively zero. Treat head terms as a byproduct, not a target.

**What is winnable in 3–6 months:** long-tail and featured snippets — "shiv chalisa meaning
verse by verse", "how to recite mahamrityunjaya mantra", "shiv chalisa benefits". The schema
coverage here is genuinely better than most competitors, which is a real CTR edge.

**Leading indicators to watch (before rankings move):** indexed page count in GSC Page Indexing
(not `site:`), unique queries with ≥1 impression, impressions rising while average position
*worsens* (normal and healthy), "Crawled – currently not indexed" shrinking.

**Red flag:** 20+ pages indexed at day 90 with negligible impressions = Google has classified the
content as duplicate. Stop publishing and fix differentiation.

---

## 9. Access and credentials

**Nothing here is a secret. Secrets are handed over out of band.**

| Resource | Detail |
|---|---|
| GitHub repo | `skmjoshi/shivchalisa`, branch `main`, **public** |
| GitHub access | Owner adds Codex-1 as a collaborator, or use the `skmjoshi` `gh` account (§7.3) |
| Cloudflare Pages | Account: `Skmjoshi@gmail.com`. Project: `shivchalisa`. Production branch: `main` |
| Cloudflare account ID | Ask the owner — set as `CLOUDFLARE_ACCOUNT_ID` |
| Cloudflare API token | **Ask the owner — set as `CLOUDFLARE_API_TOKEN`. Never commit.** |
| GA4 | `G-8X21XGHYN0` (not secret; it ships in the HTML) |
| Custom domains | `shivchalisa.org` + `www.shivchalisa.org`, both registered in the Pages project |

### ⚠️ Recommended before Codex-1 starts deploying
The existing Cloudflare API token has been pasted through chat logs and used by multiple agents.
**Rotate it**, then move deployment to CI so no long-lived token sits on anyone's laptop:

1. Create a fresh Cloudflare token scoped to **Cloudflare Pages: Edit** only.
2. Revoke the old one at `dash.cloudflare.com/profile/api-tokens`.
3. Add the new token + account ID as **GitHub Actions secrets**.
4. Add a workflow deploying on push to `main` (`cloudflare/wrangler-action@v3`,
   `pages deploy out --project-name=shivchalisa`), with `NEXT_PUBLIC_GA_ID` in the env.

> **Do NOT** create a second Git-connected Pages project and move the custom domains over. The
> existing project cannot be converted, and moving domains takes the site down for certificate
> re-provisioning and discards deploy history. Use GitHub Actions against the **existing**
> project.

---

## 10. Roadmap

### Immediate
1. Resolve §6 (Durga Chalisa). Blocks everything else.
2. Rotate the Cloudflare token; move deploys to GitHub Actions (§9).
3. Enable Cloudflare Email Routing so `reach@shivchalisa.org` actually delivers — it is
   published on `/contact` and `/privacy` and is currently a dead address.
4. Google Search Console: add a **Domain property** (DNS TXT, survives deploys), submit
   `sitemap.xml`, request indexing on `/`, `/chalisa/shiv-chalisa`, `/chalisa/hanuman-chalisa`.
   Add Bing Webmaster Tools too.

### Phase 1 — foundation
- Complete **Ganesh Chalisa 20 → 38** chaupais (not 40). ~6h, source-verified.
- Rebuild **Durga Chalisa** properly: one chaupai per entry, renumbered 1–40, per §6.
- Real dates: `[category]/[slug]/page.tsx` hardcodes `datePublished: "2026-06-01"` for all 13,
  and `sitemap.ts` stamps the same date on every URL. Add real `datePublished`/`dateModified` to
  `ContentItem`. Never use `new Date()` at build time.
- `/search` currently returns 200 with the homepage's title and canonical. Give it its own
  server `page.tsx` exporting `robots: { index: false, follow: true }`.
- A `scripts/validate-content.mjs` wired as `prebuild`, failing on: dead `relatedSlugs`, any
  codepoint outside Latin/Devanagari/punctuation, a `metaDescription` claiming audio/PDF/Sanskrit
  the file cannot back, and an author-declared `expectedChaupaiCount` vs actual danda count.
  (A number-sequence check catches nothing — `1..11`, `1..15`, `1..20` are all contiguous.)

### Phase 2 — content
**16 `relatedSlugs` references point at pages that don't exist.** They are silently dropped by
`.filter(Boolean)` in `src/data/index.ts`, so they cause no 404s — but each is a link already
written that can't be cashed. That is the build queue, ordered by internal demand × production cost:

| # | Slug | Dead links in | Why here |
|---|---|---|---|
| 1 | `rudrashtakam` | 3 | Most-linked, cheapest (8 verses), Shiva |
| 2 | `bajrang-baan` | 2 | Hanuman, high demand, tractable (~20 verses) |
| 3 | `sankat-mochan-hanuman-ashtak` | 1 | Hanuman, 8 verses |
| 4 | `om-namah-shivaya` | 1 | Cheap **only if written properly** — japa method, 108, variants |
| 5 | `sankatnashan-ganesh-stotra` | 1 | 8 verses |
| 6 | `ganpati-atharvashirsha` | 1 | Ganesh |
| 7–11 | `lakshmi-chalisa`, `saraswati-chalisa`, `ram-chalisa`, `surya-chalisa`, `aditya-hridayam` | 1 each | Activate thin deity hubs |
| last | `vishnu-sahasranama` | 2 | **1,000 names. Most expensive page on the list. Do it last, not first.** |

Go **deep on Shiva + Hanuman** before going broad across deities — that is where the domain
name points, where both complete pages already are, and where 7 of the 16 dead links point.

**Cadence: 2–3 genuinely finished pages per week.** ~30 solid pages by month 3 beats 100
adequate ones — mass-publishing thin pages is exactly the pattern helpful-content systems demote.

### Phase 3 — authority
Backlinks (library LibGuides, diaspora temple sites, Sanskrit repositories), original audio,
printable PDFs, Hindi-language prose **on the same URLs** (not a `/hi/` duplicate).

⚠️ **Audio licensing:** devotional recordings in this catalogue are among the most aggressively
enforced in Indian music. Never rip from YouTube/Gaana/JioSaavn, never re-host because a file
"has no copyright notice", never AI-clone a reciter. Commission originals **with a written
copyright assignment agreed before payment**. The same applies to scanning a modern printed
edition — the verses are public domain, but a modern edition's translation, commentary and
typesetting are not.

**Only restore the audio chip, the `audioUrl` and the word "audio" in the metaDescription in the
same commit that actually ships the audio file.** Never separately.

---

## 11. Things deliberately decided — do not undo

| Decision | Why |
|---|---|
| Brand = "Shiv Chalisa", no `\| brand` suffix in titles | Suffix would make the flagship page read "Shiv Chalisa – … \| Shiv Chalisa". Titles are now keyword-first and under ~60 chars. |
| No hreflang anywhere | Two previous attempts were both broken. The site is one English shell with Devanagari content. Don't re-add it without building real localised routes. |
| Empty hubs not built or linked | 11 "coming soon" pages removed (42 → 31). They reappear automatically when content lands — the filters are on `getByCategory().length > 0`. |
| `robots.ts` allows `/_next/` | Blocking it stopped Google fetching CSS/JS to render pages. |
| Root `alternates.canonical` kept | Harmless fallback for `/search`, which has no metadata of its own yet. |
| og:image is PNG, not SVG | SVG does not render as a social card on WhatsApp, Facebook, X, LinkedIn or Slack. |
| `keywords` arrays left untouched | `<meta name="keywords">` has been ignored by Google since 2009. Editing them is busywork. |
| Folder still named `bhaktisagar` | Renaming breaks the git remote and Pages link for zero user benefit. |

---

## 12. Commit history worth knowing

```
e58a445  Rebrand BhaktiSagar -> Shiv Chalisa; drop brand suffix from page titles
beb711c  Add trust pages, PNG social images; stop building empty hubs
0d586ab  Remove false audio/PDF/1000+/Sanskrit claims; fix invalid hreflang and robots.txt
f526fdd  Fix mojibake, sitemap, hreflang, fonts, mobile; add Organization schema, favicon, og:image
d0f6c54  Fix layout encoding, add GA4 support, static export config for Cloudflare Pages
```

Everything through `e58a445` is pushed. Working tree clean.

---

## 13. Honesty invariants — assert nothing the data cannot back

The site previously claimed "1000+ devotional texts" (13 exist), showed audio and PDF chips on
every card (zero exist), offered a Sanskrit toggle on 10 texts with no Sanskrit, and described
two half-written Chalisas as "full 40 verses". All of that is now fixed. Keep it fixed.

Before any commit, ask: **can every claim on the page be backed by the data in the repo?**

- Counts must be computed from `ALL_CONTENT.length`, never hardcoded.
- Feature chips must be gated on the field existing (`{item.audioUrl && …}`).
- Language claims must be derived (`item.verses.some(v => v.sanskrit)`).
- Verse-count claims must match the actual verses.

---

**Questions, or anything ambiguous about scripture content: ask the owner. Do not guess.**
