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

### Redirect WordPress installation for forms only → `contact.edmontonsquashclub.ca`

**Status:** Not started

- Rebuild currently has no Gravity Forms embeds; newsletter/yoga form pages are content-only placeholders.
- `next.config.ts` redirects shop/cart/checkout/my-account back to the live WP host, but nothing yet points forms traffic at `contact.edmontonsquashclub.ca`.
- Likely approach: keep a slim WP (or form host) on the `contact.` subdomain; point form URLs / embeds there; main site stays on Vercel.

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
| Form routing and integration | Not started | Tied to `contact.` subdomain + form provider choice |
| Email signup & ESP integration | Not started | Same as mail list / newsletter page |

---

## Suggested order (when unblocking launch)

1. DNS ownership + Vercel records for `.ca` / `.org`  
2. Forms host plan (`contact.` subdomain) so cutover doesn’t strand Gravity Forms  
3. Adboard embed URL from Patrick → homepage  
4. Spot-check titles vs live; review meta descriptions on key pages (home + memberships)  
5. After launch: Jegysoft/PlaySight/contact cleanup + Yves membership draft  
