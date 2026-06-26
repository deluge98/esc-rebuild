# Edmonton Squash Club — Website Rebuild

Mobile-first Next.js rebuild of [edmontonsquashclub.ca](https://edmontonsquashclub.ca/).

## Docs

- **[docs/plan.md](./docs/plan.md)** — rebuild plan (phases, SEO, scope)
- **[docs/stakeholder-questions.md](./docs/stakeholder-questions.md)** — questions for club members before full migration

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Current status

**Phase 0** — demo homepage with local images, working login/booking links, and skip navigation. Additional nav pages coming in Phase 1.

Re-download images: `bash scripts/download-images.sh`

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- TypeScript
