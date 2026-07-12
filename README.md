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

Re-download images: `bash scripts/download-images.sh`

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- TypeScript
