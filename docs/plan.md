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

#### Beaver Builder & content gaps

The WP REST API exports text, not Beaver Builder / Ultimate Addons layout (pricing tables, tabs, accordions, etc.). Pages like these need custom components or manual fixes before club approval.

- [x] `/membership-info/` — pricing comparison table (`MembershipPricingTable`)
- [x] `/court-booking-calendar/` — anonymized ClubInterconnect embed
- [x] `/sponsors/` — sponsor grid + sponsorship CTA
- [x] `/blog/` — post listing (WP page body was empty)
- [ ] `/programs/` — rebuild tabs + accordions (BB layout does not migrate; page is currently a broken wall of HTML)
- [ ] Individual membership pages (`/premium-membership/`, `/junior-membership/`, `/off-peak-membership/`, `/doubles-fitness-membership/`, `/basic-membership/`) — spot-check prose, photos, and Sign Up CTAs
- [ ] `/yoga/` — Gravity Form will not submit after cutover; content is stale (2017) — replace form or link to external flow
- [ ] `/subscribe-to-newsletter/` — fix broken demo assets; wire real newsletter signup
- [ ] `/events/` — empty placeholder on live site too — decide keep, remove, or rebuild
- [ ] Spot-check iframe embed pages (e.g. `/doubles-squash/`, sponsor CPT pages)

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
