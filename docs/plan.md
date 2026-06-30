# Edmonton Squash Club — Website Rebuild

**Canonical plan for this repo.** Update as scope and progress change.

**Preview:** [esc-rebuild.vercel.app](https://esc-rebuild.vercel.app/)

---

## Goal

Clone [edmontonsquashclub.ca](https://edmontonsquashclub.ca/) as a mobile-first marketing site (**Next.js + Tailwind**, on **Vercel**) with updated visuals. Same pages and content for v1 — editorial cleanup comes later. Member login and court booking stay on external systems.

| Feature | Service |
|---------|---------|
| Member login | [CourtReserve](https://app.courtreserve.com/) |
| Non-member court booking | [CatchCorner](https://www.catchcorner.com/facility-page/embedded/rental/889) |
| Court booking calendar | Anonymized embed (same as current site) |
| Membership signup (for now) | Gravity Forms embed or link to current flows |

---

## Must work at launch

- [ ] All public pages from the current site, same URL paths
- [ ] Member login → CourtReserve
- [ ] Court booking → CatchCorner
- [ ] 301 redirects for any URL that changes; no broken bookmarks or SEO cliff

---

## Decisions

- **Content** — Drew maintains the repo for v1. Club sends text/image changes; Drew ships via PR. Volunteers can get GitHub access + Claude Code later; CMS (Decap/Sanity) only if that becomes painful.
- **SEO** — Clone with same URL paths wherever possible. 301s in `next.config.ts` only for removed or renamed pages. Export WP URLs via `/wp-json/wp/v2/pages` to verify nothing is missed.
- **Rollback** — Keep WordPress host alive 2–4 weeks after launch. Rollback = point DNS back to the old host (minutes to a few hours). Don't delete WP until Search Console looks clean.
- **Ownership** — Personal GitHub repo is fine through preview and launch. Transfer to a club org (or add club admins) when practical so the asset isn't tied to one person.

---

## Phases

### Phase 0 — Demo homepage ✅

- ✅ Next.js + Tailwind scaffold, compact mobile header, hero, intro, sponsors, footer
- ✅ Deployed to Vercel — [esc-rebuild.vercel.app](https://esc-rebuild.vercel.app/)
- ✅ Member Login / Book Court CTAs wired (CourtReserve, CatchCorner)

---

### Phase 1 — Full site clone on preview *(in progress)*

**Goal:** Clone all public pages onto the Vercel preview URL for club approval before DNS cutover.

- [x] Wire nav to real routes (Memberships, About, Programs + subpages)
- [x] Scrape all public WP pages → JSON (`scripts/migrate-wp-content.mjs`, `npm run migrate-content`)
- [x] Skip WP drafts and unpublished pages only
- [x] Image optimization (`next/image`) — homepage + sponsor logos; WP images via remote patterns
- [x] Per-page metadata from WP; match existing URL slugs
- [ ] Club reviews and approves at [esc-rebuild.vercel.app](https://esc-rebuild.vercel.app/)
- [ ] **Ask with the approval request:** who can edit DNS for `edmontonsquashclub.ca`? (registrar, WordPress host, Cloudflare, etc. — we need edit access, not a domain transfer.) Launch = they approve the preview, then that person points the site records to Vercel. Leave MX (email) records unchanged unless we intentionally migrate mail.

#### Beaver Builder & Ultimate Addons — replicate in React

**Goal:** Every public page should visually match the live WordPress site. Beaver Builder (BB) and Ultimate Addons (UABB) layouts are **not** portable via the WP REST API — we rebuild them as React + Tailwind components, using migrated HTML as the content source where helpful.

**Why this is manual work:** BB stores layout in post meta; the API `content.rendered` field is often plain prose or a partial dump, not something we can drop in with BB’s CSS. Embedding BB plugin styles would be brittle and bad on mobile. The sustainable path is a small internal component library that mirrors the modules ESC actually uses.

**Shared layout (all inner pages):**

- [x] `PageHero` — featured-image banners (membership pages each have a unique hero graphic from WP media)
- [x] Inner page shell — gray page background, white content card (GeneratePress `separate-containers` look)
- [x] Typography — Bebas Neue headings + Roboto body to match live (membership pages)

**Reusable module components** (build once, reuse across pages):

| BB / UABB module | React component | Used on |
|------------------|-----------------|---------|
| Rich text, heading, photo, button | `PageContent` + `PageHero` | Most pages |
| Pricing table (`fl-module-pricing-box`) | `MembershipPricingTable` ✅ | `/membership-info/` |
| Advanced tabs + accordion | `ProgramsPage` / `ProgramsPageClient` ✅ (finish polish) | `/programs/` |
| Post grid | `SponsorsPage` ✅ | `/sponsors/` |
| Info box / callout / info banner | `InfoBox`, `Callout` | Homepage, coaches, yoga, sponsors |
| Separator / spacer | Tailwind utilities | Various |
| Video / iframe embed | `EmbedBlock` | Doubles squash, etc. |
| Map (`fl-module-map`) | Static map image or Maps embed (club-rotated key) | Sponsor CPT pages |
| Gravity Form (`fl-module-pp-gravity-form`) | External form link or new provider | `/yoga/`, `/subscribe-to-newsletter/` |

**Per-page checklist** (~25 public pages; shop/cart/checkout/my-account excluded):

- [x] `/membership-info/` — pricing table
- [x] `/court-booking-calendar/` — ClubInterconnect embed
- [x] `/sponsors/` — post grid + CTA
- [x] `/blog/` — post listing
- [ ] `/programs/` — tabs + accordions (component exists; match live styling)
- [x] Membership detail pages — hero banner + prose layout (`/premium-membership/`, `/junior-membership/`, `/off-peak-membership/`, `/doubles-fitness-membership/`, `/basic-membership/`, `/basic-legacy-membership/`)
- [ ] About / facilities pages — multi-column photo + heading layouts (`/facilities/`, `/coaches-and-club-pros/`, `/jobs/`, `/pro-shop/`, etc.)
- [ ] Program subpages — prose + any BB widgets (`/adult-programs/`, `/junior-programs-2/`, `/fitness-programs/`, `/women-programs/`, `/doubles-squash/`)
- [ ] `/yoga/` — info boxes + replace Gravity Form
- [ ] `/subscribe-to-newsletter/` — replace broken form embed
- [ ] Sponsor CPT pages — prose + map (`/bdo-sponsor/`, `/video-game-repairs-sponsor/`, etc.)
- [ ] `/events/` — empty on live too; decide keep, remove, or rebuild
- [ ] Homepage — refine to match live BB layout (callouts, info banners, icon group) beyond current Phase 0 demo

#### Security

- [x] Strip Google Maps API keys from migrated content; sanitize on `migrate-content` and render (`src/lib/sanitize-content.ts`)
- [ ] **Tell the club** (not sponsors) — old WP sponsor pages used the **club’s** Google Maps embed key; it was briefly in this repo (GitHub secret scan) and is still on the live WordPress site and in git history (`c1b9914`). Whoever manages ESC’s Google Cloud should **rotate and restrict** that key (HTTP referrer limits, etc.) and resolve the alert in GitHub once rotated.

### Phase 2 — Launch

**Cutover** = after club approval, whoever manages DNS points `edmontonsquashclub.ca` from the WordPress host to Vercel.

- [ ] Export all live WP URLs; confirm new site matches paths (or document exceptions)
- [ ] Redirect map → `next.config.ts` + `docs/redirects.md` (only for changed/removed paths)
- [ ] `sitemap.ts`, `robots.ts`, per-page metadata
- [ ] QA on real devices
- [ ] DNS cutover; verify Google Search Console
- [ ] Keep WordPress up until indexing is clean; then decommission
- [ ] All launch requirements above checked off

### Phase 3 — Optional (post-launch)

- [ ] Content cleanup (stale pages, pricing, programs)
- [ ] CMS for club staff (Sanity / Decap)
- [ ] Analytics (GA4)
- [ ] Forms migration off Gravity Forms
