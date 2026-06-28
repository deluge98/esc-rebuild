import { readFileSync } from "node:fs";
import { join } from "node:path";

export type ContentRecord = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  modified: string;
  yoastTitle: string | null;
  yoastDescription: string | null;
};

export type PostRecord = ContentRecord & {
  date: string;
};

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

const contentDir = join(process.cwd(), "src", "content");

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

export function getAllPageSlugs(): string[] {
  return readJson<{ slug: string }[]>(
    join(contentDir, "pages-manifest.json"),
  ).map((p) => p.slug);
}

export function getAllPostSlugs(): string[] {
  return readJson<PostSummary[]>(join(contentDir, "posts-manifest.json")).map(
    (p) => p.slug,
  );
}

export function getAllContentSlugs(): string[] {
  return [...getAllPageSlugs(), ...getAllPostSlugs()];
}

export function getPage(slug: string): ContentRecord | null {
  try {
    return readJson<ContentRecord>(join(contentDir, "pages", `${slug}.json`));
  } catch {
    return null;
  }
}

export function getPost(slug: string): PostRecord | null {
  try {
    return readJson<PostRecord>(join(contentDir, "posts", `${slug}.json`));
  } catch {
    return null;
  }
}

export function getContentBySlug(
  slug: string,
): { type: "page"; data: ContentRecord } | { type: "post"; data: PostRecord } | null {
  const page = getPage(slug);
  if (page) return { type: "page", data: page };

  const post = getPost(slug);
  if (post) return { type: "post", data: post };

  return null;
}

export function getAllPosts(): PostSummary[] {
  return readJson<PostSummary[]>(join(contentDir, "posts-manifest.json"));
}

export function getRecentPosts(limit = 12): PostSummary[] {
  return getAllPosts().slice(0, limit);
}
