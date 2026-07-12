# Club launch checklist

Source list from the club (launch / post-launch / long-term). Status reflects this repo as of July 2026 — update checkboxes as work lands.

**Related:** [plan.md](./plan.md) (rebuild phases), preview at [esc-rebuild.vercel.app](https://esc-rebuild.vercel.app/).

---

## Launch items

### Get IP for Vercel app to update A records (`.ca` & `.org`)

**Status:** Not started (ops / DNS — outside the app)

- Apex domains on Vercel usually use either Vercel nameservers or A/ALIAS records Vercel documents for the project.
- Confirm who can edit DNS for `edmontonsquashclub.ca` and `.org` (registrar / host / Cloudflare) before cutover.
- Leave MX (email) records alone unless mail is intentionally migrated.
- See also Phase 2 cutover notes in [plan.md](./plan.md).

### Decide what to do about live Gravity Forms (launch blocker)

**Status:** Not started — needs a decision before DNS cutover

The Next.js clone has page **copy** for these routes but **no working forms**. Live WordPress embeds Gravity Forms on pages linked from the main nav; cutover without a plan strands them.

**Working forms on live (main nav):**

| Nav path | Page | Gravity Form |
|----------|------|--------------|
| Programs → Adult Programs | `/adult-programs/` | `#87` |
| Programs → Junior Programs | `/junior-programs-2/` | `#86` |
| Programs → Lesson Packages | `/junior-programs-2-copy/` | `#87` (same as adult) |
| About → Club Ambassador | `/become-an-esc-club-ambassador/` | `#23` |

**Also form-adjacent (not in live main nav):** `/subscribe-to-newsletter/` (Beaver Builder subscribe widget); `/yoga/` (GF module present but empty/broken on live).

**Options to decide (pick one or combine):**

1. Keep a slim WordPress (or form host) on `contact.edmontonsquashclub.ca` and send form traffic there
2. Replace with a new provider / native forms on the Next.js site
3. Soften to mailto / external links for v1 launch

Until decided: do not treat “full site clone” as including working form submit.

### Page Title and Meta description fields on pages

**Status:** Titles match live; descriptions/OG filled even when live is blank; no CMS UI yet

**Policy:**
- **Titles** — one-to-one with live WordPress (en dash suffix, homepage tagline title).
- **Meta description + Open Graph** — always emit them. If live is missing these, fill from `yoastDescription` → cleaned `excerpt` → short fallback (homepage copy in `src/app/layout.tsx`). Cleaning lives in `src/lib/seo-text.ts` (decode entities, drop “Read more”, word-boundary truncate). `og:title` matches the full document title.

- Homepage: title matches live; description/OG set in layout  
- Inner pages: `generateMetadata` in `src/app/(site)/[slug]/page.tsx`  
- Edit titles/descriptions in `src/content/pages/<slug>.json` (`title` / `yoastTitle` / `yoastDescription` / `excerpt`)  

**Not done:** a non-dev UI (CMS) to edit SEO fields without touching the repo.

### Add Adboard iframe from Patrick on homepage

**Status:** Not started

Homepage (`src/app/(site)/page.tsx`) is Hero → Intro → FeatureCards → Sponsors. No adboard / digital board iframe yet. Needs the embed URL (or snippet) from Patrick, then an embed component on the home page (we already use iframe-style embeds elsewhere, e.g. court calendar / `EmbedBlock`).

### Media mirroring (do not hotlink WordPress after cutover)

**Status:** In progress / tooling in place

- Curated assets (logo, heroes, sponsors, staff): `npm run download-images` → `public/images/`
- Migrated page/post uploads: `npm run download-content-images` → `public/wp-content/uploads/`
- Render rewrites absolute WP upload URLs to local `/wp-content/uploads/...` paths (`src/lib/rewrite-links.ts`)

---

## Post-launch — short term

### Review content; remove deprecated references (old contacts, Jegysoft, PlaySight)

**Status:** Not started (known debt in migrated content)

Still present on live membership/content pages, including:

- **Jegysoft** — e.g. premium / doubles-fitness booking copy (“logging into Jegysoft…”)
- **PlaySight** — membership benefit lists and pricing table (`src/data/membership-pricing.ts` includes a PlaySight row)
- Stale contacts / old booking flows likely elsewhere in pages + historical blog posts

Editorial pass after (or as part of) launch; plan Phase 3 already lists content cleanup.

### Draft page for new membership structure, pricing & benefits (Yves)

**Status:** Not started — waiting on Yves’s content

Current membership pages and pricing table still reflect the migrated WP structure. Add a draft route/page (unpublished or flagged) once Yves supplies structure, pricing, and benefits copy.

---

## Long term

| Item | Status | Notes |
|------|--------|--------|
| Mail list integration | Not started | `/subscribe-to-newsletter/` has copy only; no working form/ESP |
| SEO for React apps (metadata, dynamic URLs, redirects, char counts, internal linking) | Partial | Titles match live; descriptions/OG always emitted (fill gaps live left blank). Sitemap, robots, some redirects exist; CMS + richer tooling still open |
| Update workflow for BOD & staff | Not started | v1 = Drew + PRs; CMS / GitHub access for volunteers is Phase 3 optional |
| Instagram feed on homepage | Not started | Footer links to Instagram only (`src/lib/constants.ts`) |
| Content review | Not started | Overlaps short-term cleanup; ongoing |
| WhatsApp signup requests | Not started | No WhatsApp CTA / form flow in the rebuild |
| Form routing and integration | Not started | See launch item: decide WP subdomain vs new provider vs mailto |
| Email signup & ESP integration | Not started | Same as mail list / newsletter page |

---

## Suggested order (when unblocking launch)

1. DNS ownership + Vercel records for `.ca` / `.org`  
2. **Forms decision** (Adult / Junior / Lesson Packages / Ambassador — see above)  
3. Adboard embed URL from Patrick → homepage  
4. Spot-check titles vs live; review meta descriptions on key pages (home + memberships)  
5. After launch: Jegysoft/PlaySight/contact cleanup + Yves membership draft  
