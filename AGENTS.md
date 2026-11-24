# AGENTS.md — Shiv Chalisa (shivchalisa.org)

**Read [`HANDOVER.md`](./HANDOVER.md) before your first commit.** It is the full brief:
architecture, deploy procedure, open issues, roadmap and the traps this project has already
fallen into. This file is only the part you must never get wrong.

---

## Four non-negotiable rules

### 1. Never invent scripture
This site publishes Hindu devotional texts that people recite in daily worship. Never write,
complete, reconstruct or paraphrase a verse from your own knowledge — not one line, not even
when the metre makes the next line obvious, not to reach a round number like "40 verses".

Any verse you add must come from multiple independent sources checked in that session. If you
cannot source it, leave it out and say so. **A missing verse is fine. A fabricated verse is not.**

⚠️ `src/data/durga-chalisa.ts` currently contains a couplet that exists in **no** Durga Chalisa
edition (it is actually from Chandra Dev Chalisa, a different deity). See HANDOVER.md §6 before
touching any Chalisa file. **Do not add new content pages until that is resolved.**

### 2. This repo is PUBLIC — never commit a secret
No API tokens, no `.env` files, no credentials in code, comments, commit messages or docs.
Cloudflare and GitHub credentials are handed over out of band. See HANDOVER.md §9.

### 3. Never claim what the data cannot back
The site previously claimed "1000+ texts" (13 exist), showed audio/PDF chips on every card
(zero exist), and offered a Sanskrit toggle on texts with no Sanskrit. All fixed — keep it fixed.

Counts come from `ALL_CONTENT.length`. Feature chips are gated on the field existing
(`{item.audioUrl && …}`). Language claims are derived (`item.verses.some(v => v.sanskrit)`).

### 4. Set `NEXT_PUBLIC_GA_ID` on every build
There is no `.env` file. A plain `npm run build` produces a **green, error-free build that has
silently deleted all analytics**. Always:

```powershell
$env:NEXT_PUBLIC_GA_ID = "G-8X21XGHYN0"
npm run build
```
Then grep the built HTML for `G-8X21XGHYN0` before deploying.

---

## Quick reference

```powershell
# Build
cd "D:\Rocket Internet-2\Sanskrit\bhaktisagar"
$env:NEXT_PUBLIC_GA_ID = "G-8X21XGHYN0"
npm run build

# Deploy to production (--branch main is what makes it production)
$env:CLOUDFLARE_API_TOKEN  = "<ask owner — never commit>"
$env:CLOUDFLARE_ACCOUNT_ID = "<ask owner>"
npx wrangler pages deploy out --project-name shivchalisa --branch main --commit-dirty=true
```

**Push to GitHub** — the default `gh` account cannot push here; you must switch:
```powershell
gh auth switch --user skmjoshi
gh auth setup-git
git push origin main
gh auth switch --user santxlab   # restore the owner's default
```

## Environment gotchas
- Use **PowerShell** for `npm`/`npx` — the Bash `npm` here is broken.
- PowerShell 5.1: no `&&`, no `||`, no ternary. `$HOME` is read-only.
- **Never** `Set-Content` a source file without `-Encoding utf8` — it double-encodes UTF-8 and
  has already corrupted every emoji and dash in this repo once. Use the Write/Edit tools.
- `Invoke-WebRequest` mis-decodes UTF-8 and invents phantom mojibake. Read live pages with
  `System.Net.WebClient` + `Encoding.UTF8.GetString`.
- Paths containing `[category]`/`[slug]` are treated as wildcards by PowerShell cmdlets.

## Before committing
```powershell
rg "ðŸ|â€|â”|Ã¢|à¤" src    # must return nothing
rg "1000\+" src public      # must return nothing
```

## Content model
One file per text in `src/data/`, default-exporting a `ContentItem` (`src/lib/types.ts`),
registered in `src/data/index.ts`. Adding it there creates the page, hubs and sitemap entry
automatically — there is no per-page file to write.
