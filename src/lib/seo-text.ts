const SITE_TITLE_SUFFIX = " – Edmonton Squash Club";

/** Strip tags to plain text (whitespace-normalized later). */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ");
}

/** Decode numeric and common named HTML entities from WP content. */
export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec: string) =>
      String.fromCodePoint(Number(dec)),
    )
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&rsquo;/gi, "\u2019")
    .replace(/&lsquo;/gi, "\u2018")
    .replace(/&rdquo;/gi, "\u201D")
    .replace(/&ldquo;/gi, "\u201C")
    .replace(/&ndash;/gi, "\u2013")
    .replace(/&mdash;/gi, "\u2014")
    .replace(/&hellip;/gi, "\u2026");
}

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** Page/post title for metadata (tags + entities cleaned). */
export function plainTitle(raw: string): string {
  return collapseWhitespace(decodeHtmlEntities(stripHtml(raw)));
}

/**
 * Full document / OG title matching the live WP en-dash pattern.
 * Strips an existing site suffix first so we never double it.
 */
export function fullPageTitle(rawTitle: string): string {
  const base = plainTitle(rawTitle).replace(
    / [–|] Edmonton Squash Club$/u,
    "",
  );
  return `${base}${SITE_TITLE_SUFFIX}`;
}

/**
 * Meta description from Yoast / excerpt / fallback.
 * Decodes entities, drops WP “Read more” trailers, truncates on a word boundary.
 */
export function plainMetaDescription(raw: string, maxLength = 160): string {
  let text = collapseWhitespace(decodeHtmlEntities(stripHtml(raw)));

  text = text.replace(/\s*(?:\[\s*)?(?:\u2026|\.{3})?\s*Read more\.?\s*$/iu, "");
  text = text.replace(/\s*(?:\u2026|\.{3})\s*$/u, "");

  if (text.length <= maxLength) return text;

  const sliced = text.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(" ");
  const cut =
    lastSpace > Math.floor(maxLength * 0.6) ? sliced.slice(0, lastSpace) : sliced;
  return `${cut.trimEnd().replace(/[.,;:]+$/u, "")}\u2026`;
}
