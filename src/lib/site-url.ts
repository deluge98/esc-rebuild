/** Canonical site origin for SEO (sitemap, robots, metadata). */
export const SITE_URL = "https://edmontonsquashclub.ca";

/** Build an absolute URL with trailing slash (matches `trailingSlash: true`). */
export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") {
    return `${SITE_URL}/`;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}
