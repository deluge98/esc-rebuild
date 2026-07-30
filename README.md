# Edmonton Squash Club — Website Rebuild

Mobile-first Next.js rebuild of [edmontonsquashclub.ca](https://edmontonsquashclub.ca/).

## Docs

- **[docs/plan.md](./docs/plan.md)** — rebuild plan (phases, launch criteria, decisions)
- **[docs/launch-checklist.md](./docs/launch-checklist.md)** — club launch / post-launch / long-term list with status

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test
```

## Current status

**Phase 1** — full site clone on preview. 30 pages + 202 blog posts migrated. Preview: [esc-rebuild.vercel.app](https://esc-rebuild.vercel.app/)

Refresh content from WordPress: `npm run migrate-content`

Re-download curated assets (logo, heroes, sponsors, staff): `npm run download-images`

Mirror migrated content images into `public/wp-content/uploads/`: `npm run download-content-images`

## Contact forms (Resend)

Program and ambassador inquiry forms POST to `/api/contact` and send email via [Resend](https://resend.com).

**Hardcoded for now** (in [`src/lib/constants.ts`](src/lib/constants.ts)):

- To: `drewlefe@gmail.com`, `info@edmontonsquashclub.ca`, `tyler@edmontonsquashclub.org`
- Bcc: `jimdawson@live.ca`, `jeff.williams@edmontonsquashclub.ca`
- From: `Edmonton Squash Club <hello@edmontonsquashclub.ca>` (domain verified in Resend)

**Secret (env only):** `RESEND_API_KEY`

Locally it lives in **`.env.local`** at the repo root (gitignored):

```bash
RESEND_API_KEY=re_...
```

On Vercel: Project → **Settings → Environment Variables** → add `RESEND_API_KEY` for Preview + Production, then redeploy.

- Forms: `/adult-programs/`, `/junior-programs-2/`, `/junior-programs-2-copy/`, `/become-an-esc-club-ambassador/`.
- The API validates input, drops bot submissions via a honeypot, rejects cross-site origins, and applies a best-effort per-IP rate limit.
- Later: none for recipients — To/Bcc are set in `constants.ts`. Ensure `RESEND_API_KEY` is on Vercel for Preview + Production.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- TypeScript
- Resend (contact form email)
