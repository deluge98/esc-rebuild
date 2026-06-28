/**
 * Sanitize HTML migrated from WordPress before storage or render.
 * Strips secrets and replaces embeds that require API keys.
 */
export function sanitizeMigratedHtml(html: string): string {
  let result = html;

  // Google Maps embed iframes include API keys — link out instead.
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

  // Defense in depth: strip any Google API keys that slip through.
  result = result.replace(/AIzaSy[A-Za-z0-9_-]{33}/g, "");

  return result;
}
