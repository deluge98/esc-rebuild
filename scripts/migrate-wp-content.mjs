#!/usr/bin/env node
/**
 * Fetches published pages and posts from edmontonsquashclub.ca
 * and writes them to src/content/ for static generation.
 *
 * Usage: node scripts/migrate-wp-content.mjs
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const WP_BASE = "https://edmontonsquashclub.ca/wp-json/wp/v2";
const OUT_DIR = join(import.meta.dirname, "..", "src", "content");

/** WP pages we intentionally skip (drafts, duplicates, WooCommerce). */
const SKIP_PAGE_SLUGS = new Set([
  "facilities-draft",
  "sample-beaver-builder-page",
  "home-copy",
  "cart",
  "checkout",
  "shop",
  "my-account",
]);

async function fetchAll(endpoint) {
  const items = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const res = await fetch(`${WP_BASE}/${endpoint}?per_page=100&page=${page}&status=publish`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint} page ${page}: ${res.status}`);
    }
    totalPages = Number(res.headers.get("x-wp-totalpages") ?? 1);
    const batch = await res.json();
    items.push(...batch);
    page++;
  }

  return items;
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Keep in sync with src/lib/sanitize-content.ts */
function sanitizeContent(html) {
  let result = html;

  result = result.replace(
    /<iframe\b[^>]*\bsrc=["']https?:\/\/www\.google\.com\/maps\/embed\/v1\/place\?[^"']*?\bq=([^"'&]+)[^"']*["'][^>]*>\s*<\/iframe>/gi,
    (_match, query) => {
      const address = decodeURIComponent(
        query.replace(/&#0*38;/g, "").replace(/&amp;/g, "&"),
      ).replace(/\+/g, " ");
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      return `<p><a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">View on Google Maps</a></p>`;
    },
  );

  result = result.replace(/AIzaSy[A-Za-z0-9_-]{33}/g, "");

  return result;
}

function toPageRecord(item) {
  return {
    slug: item.slug,
    title: item.title.rendered,
    excerpt: stripHtml(item.excerpt.rendered),
    content: sanitizeContent(item.content.rendered),
    modified: item.modified,
    yoastTitle: item.yoast_head_json?.title ?? null,
    yoastDescription: item.yoast_head_json?.description ?? null,
  };
}

function toPostRecord(item) {
  return {
    slug: item.slug,
    title: item.title.rendered,
    excerpt: stripHtml(item.excerpt.rendered),
    content: sanitizeContent(item.content.rendered),
    date: item.date,
    modified: item.modified,
    yoastTitle: item.yoast_head_json?.title ?? null,
    yoastDescription: item.yoast_head_json?.description ?? null,
  };
}

async function writeJson(path, data) {
  await writeFile(path, JSON.stringify(data, null, 2) + "\n", "utf8");
}

async function main() {
  const pagesDir = join(OUT_DIR, "pages");
  const postsDir = join(OUT_DIR, "posts");
  await mkdir(pagesDir, { recursive: true });
  await mkdir(postsDir, { recursive: true });

  console.log("Fetching pages...");
  const pages = await fetchAll("pages");
  const pageManifest = [];

  for (const page of pages) {
    if (SKIP_PAGE_SLUGS.has(page.slug)) {
      console.log(`  skip page: ${page.slug}`);
      continue;
    }
    const record = toPageRecord(page);
    await writeJson(join(pagesDir, `${page.slug}.json`), record);
    pageManifest.push({ slug: page.slug, title: record.title });
    console.log(`  page: ${page.slug}`);
  }

  console.log("Fetching posts...");
  const posts = await fetchAll("posts");
  const postManifest = [];

  for (const post of posts) {
    const record = toPostRecord(post);
    await writeJson(join(postsDir, `${post.slug}.json`), record);
    postManifest.push({
      slug: post.slug,
      title: record.title,
      excerpt: record.excerpt,
      date: record.date,
    });
    console.log(`  post: ${post.slug}`);
  }

  pageManifest.sort((a, b) => a.slug.localeCompare(b.slug));
  postManifest.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  await writeJson(join(OUT_DIR, "pages-manifest.json"), pageManifest);
  await writeJson(join(OUT_DIR, "posts-manifest.json"), postManifest);

  console.log(`\nDone: ${pageManifest.length} pages, ${postManifest.length} posts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
