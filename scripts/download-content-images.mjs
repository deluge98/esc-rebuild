#!/usr/bin/env node
/**
 * Download WordPress upload URLs referenced in migrated content into
 * public/wp-content/uploads/... so the site does not hotlink the old host.
 *
 * Usage:
 *   node scripts/download-content-images.mjs           # pages + posts
 *   node scripts/download-content-images.mjs --pages   # pages only
 */
import { createWriteStream } from "node:fs";
import { mkdir, readFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";

const ROOT = join(import.meta.dirname, "..");
const CONTENT = join(ROOT, "src", "content");
const PUBLIC = join(ROOT, "public");
const ORIGIN = "https://edmontonsquashclub.ca";
const pagesOnly = process.argv.includes("--pages");

const UPLOAD_RE =
  /https?:\/\/(?:www\.)?edmontonsquashclub\.ca(\/wp-content\/uploads\/[^"'\\\s>]+)/gi;

async function collectPaths() {
  const { readdir } = await import("node:fs/promises");
  const dirs = pagesOnly ? ["pages"] : ["pages", "posts"];
  const paths = new Set();

  for (const dir of dirs) {
    const folder = join(CONTENT, dir);
    for (const name of await readdir(folder)) {
      if (!name.endsWith(".json") || name.includes("manifest")) continue;
      const text = await readFile(join(folder, name), "utf8");
      for (const match of text.matchAll(UPLOAD_RE)) {
        const path = match[1].split("?")[0].replace(/\\+$/, "");
        paths.add(path);
      }
    }
  }

  return [...paths].sort();
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function download(path) {
  const dest = join(PUBLIC, path);
  if (await exists(dest)) return "skip";

  await mkdir(dirname(dest), { recursive: true });
  const url = `${ORIGIN}${path}`;
  const res = await fetch(url, {
    headers: {
      Referer: `${ORIGIN}/`,
      "User-Agent":
        "Mozilla/5.0 (compatible; esc-rebuild-image-mirror/1.0)",
    },
  });
  if (!res.ok || !res.body) {
    throw new Error(`${res.status} ${url}`);
  }

  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  return "ok";
}

const paths = await collectPaths();
console.log(`Found ${paths.length} unique upload paths`);

let ok = 0;
let skip = 0;
let fail = 0;

for (const path of paths) {
  try {
    const result = await download(path);
    if (result === "skip") {
      skip += 1;
      continue;
    }
    ok += 1;
    if (ok % 25 === 0) console.log(`Downloaded ${ok}...`);
  } catch (err) {
    fail += 1;
    console.error(`FAIL ${path}: ${err.message}`);
  }
}

console.log(`Done. downloaded=${ok} skipped=${skip} failed=${fail}`);
if (fail > 0) process.exitCode = 1;
