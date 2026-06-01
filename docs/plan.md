# Edmonton Squash Club — Website Rebuild Plan

**Canonical plan for this repo.** Update this file as scope and progress change.

Related: [stakeholder-questions.md](./stakeholder-questions.md) — open questions for club members before full migration.

---

## Goal

Rebuild [edmontonsquashclub.ca](https://edmontonsquashclub.ca/) as a modern, mobile-first marketing site using **Next.js (App Router) + Tailwind**, deployed on **Vercel**.

Booking, login, and member tools stay on external systems — we link/embed, not rebuild:

| Feature | Service |
|---------|---------|
| Member login | [CourtReserve](https://app.courtreserve.com/) |
| Non-member court booking | [CatchCorner](https://www.catchcorner.com/facility-page/embedded/rental/889) |
| Court booking calendar | Anonymized embed (TBD — verify with club) |
| Membership signup (for now) | Gravity Forms embed or link to current flows |

---

## Why rebuild

The current site is **WordPress + Beaver Builder** with a heavy plugin stack. It’s slow on mobile, hard to maintain, and several pages look stale.

- Header eats too much vertical space on phones
- Membership cards break on small screens
- ~25 public pages + inactive blog; empty shop; draft/sample pages
- Sponsor section relies on a third-party iframe

---

## Stack & conventions

- **Next.js 16** — Server Components by default; `'use client'` only for nav drawer, etc.
- **Tailwind CSS 4** — ESC red/black/white design tokens in `globals.css`
- **Content (post–Phase 0):** MDX/markdown in `content/`, loaded at build time
- **Hosting:** Vercel (~$0 for static/marketing traffic)
- **Future CMS (optional):** Sanity or Decap for club staff — no frontend rewrite needed

---

## SEO preservation (required)

**Do not launch until SEO from the current site is accounted for.** A cutover without this will hurt Google rankings and break bookmarks.

### Before launch

1. **Export all live URLs** from WordPress (`/wp-json/wp/v2/pages`, `/posts`, sponsor slugs, etc.).
2. **Map every indexed URL** → new URL (same path preferred where possible).
3. **Implement 301 redirects** in `next.config.ts` for any URL that changes or is removed.
4. **Preserve or improve metadata** per route via Next.js `metadata` API:
   - `<title>` and meta description (match or improve current copy)
   - Open Graph / social preview tags
   - Canonical URLs
5. **Submit updated sitemap** (`app/sitemap.ts`) and verify in Google Search Console after DNS cutover.
6. **Keep old site running** (or redirects active) until Search Console shows clean indexing — don’t delete WordPress until redirects are verified.

### URL strategy

- **Prefer keeping the same paths** where content still exists (e.g. `/membership-info/`, `/facilities/`).
- **Redirect removed pages** (empty shop, drafts) to the closest live page or homepage — confirm with club via [stakeholder-questions.md](./stakeholder-questions.md).
- **Document every redirect** in `docs/redirects.md` (create at Phase 3).

### If analytics exist

Ask the club for **Google Analytics / Search Console** access before launch to see which pages drive traffic — prioritize those in migration and redirect testing.

---

## Phases & status

### Phase 0 — Demo homepage ✅ (in progress / largely done)

**Purpose:** Pitch the revamp to stakeholders; validate mobile-first design.

| Done | Item |
|------|------|
| ✅ | Next.js + Tailwind scaffold |
| ✅ | Compact mobile header (logo, phone, side-by-side CTAs) |
| ✅ | Hero (correct image: `GaultiervsGawad-header.jpg`) |
| ✅ | Intro section + feature cards |
| ✅ | Sponsors grid (8 gold sponsors → external homepages / Facebook) |
| ✅ | Footer (contact, hours) |
| ⬜ | Deploy to Vercel for shareable preview URL |

**Still visual-only (no internal nav):** Memberships, About, Programs links; Member Login / Book Court CTAs.

**Time:** ~4–8 hours focused work.

---

### Phase 1 — MVP

**Purpose:** Usable multi-page site with working nav and membership flow.

- [ ] Refactor `DemoHeader` → `Header` + `MobileNav` with real routes
- [ ] Wire CTAs: CourtReserve, CatchCorner, tel/mailto
- [ ] Membership Info page (stacked mobile cards, current pricing — **confirm with club**)
- [ ] Shared layout, metadata on all Phase 1 routes
- [ ] Begin SEO: titles/descriptions for shipped pages; match existing URLs where possible

**Time:** ~3–5 days part-time.

---

### Phase 2 — Full content migration

**Purpose:** Replace WordPress content for all pages the club wants to keep.

Resolve open items in [stakeholder-questions.md](./stakeholder-questions.md) first (blog, ambassador program, fitness programs, pricing, etc.).

| Section | Pages |
|---------|-------|
| Core | Home, Membership Info, membership tiers, Programs hub |
| Programs | Junior, Adult, Lesson Packages, Doubles, Fitness, Women's, Yoga |
| About | Coaches, Facilities, Jobs, Pro Shop, Sponsors, Ambassador, Events |
| Utility | Blog (if kept), Court Booking Calendar, Newsletter |

**Skip unless club asks:** Cart, Checkout, My Account, empty Shop, drafts.

- [ ] WP → MDX scraper script (`scripts/migrate-wp-content.ts`)
- [ ] Image optimization (WebP, `next/image`)
- [ ] Per-page metadata from WP or rewritten copy

**Time:** ~1–2 weeks part-time.

---

### Phase 3 — Launch

- [ ] Complete redirect map → `next.config.ts` + `docs/redirects.md`
- [ ] `app/sitemap.ts` + `robots.ts`
- [ ] QA on real devices; Lighthouse mobile 90+
- [ ] DNS cutover to Vercel; verify Search Console
- [ ] Keep WordPress redirects live or decommission only after verification

**Time:** ~2–3 days.

---

### Phase 4 — Optional

- [ ] CMS for club staff (Sanity / Decap)
- [ ] Analytics (GA4) if club wants it
- [ ] Custom domain email/forms migration off Gravity Forms

---

## Time estimate (total)

| Pace | Duration |
|------|----------|
| Part-time (~10–15 hrs/week) | ~3–4 weeks after Phase 0 |
| Full-time focused | ~1.5–2 weeks after Phase 0 |

---

## Project structure (target)

```
esc-rebuild/
├── app/                    # Routes
├── components/             # Header, Hero, Footer, Sponsors, …
├── content/                # MDX pages & blog (Phase 2+)
├── data/                   # sponsors.ts, etc.
├── docs/
│   ├── plan.md             # this file
│   ├── stakeholder-questions.md
│   └── redirects.md        # Phase 3
├── scripts/                # WP migration
└── next.config.ts          # redirects, image domains
```

---

## Risks

| Risk | Mitigation |
|------|------------|
| **SEO loss on cutover** | Same URLs where possible; 301s for everything else; Search Console check |
| Stale content migrated | Stakeholder questions doc + club sign-off before Phase 2 |
| Gravity Forms dependency | Embed or link until replaced |
| Club can’t edit content | Phase 4 CMS; document MDX editing for MVP |
| Out-of-date membership prices | Confirm with club before publishing Membership page |

---

## Recommendation

1. **Finish Phase 0** — deploy demo to Vercel; get stakeholder buy-in on mobile design.
2. **Answer stakeholder questions** — especially blog, pricing, and which programs/pages to keep.
3. **Phase 1** — membership + nav; preserve URL slugs from day one for SEO.
4. **Phase 2–3** — migrate only approved content; launch only with redirects and metadata complete.
