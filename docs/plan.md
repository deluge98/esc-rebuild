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

- [ ] Wire nav to real routes (Memberships, About, Programs + subpages)
- [ ] Scrape all public WP pages → MDX (`scripts/migrate-wp-content.ts`)
- [ ] Skip WP drafts and unpublished pages only
- [ ] Image optimization (`next/image`)
- [ ] Per-page metadata from WP; match existing URL slugs
- [ ] Club reviews and approves at [esc-rebuild.vercel.app](https://esc-rebuild.vercel.app/)

### Phase 2 — Launch

**Cutover** = point `edmontonsquashclub.ca` DNS from the WordPress host to Vercel.

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
