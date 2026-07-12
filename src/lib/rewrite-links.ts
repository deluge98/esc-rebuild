import { CLUB_EMAIL } from "@/lib/constants";

const WP_UPLOADS =
  /https?:\/\/(?:www\.)?edmontonsquashclub\.ca(\/wp-content\/uploads\/[^"'\s)]+)/gi;
const WP_PROTOCOL_RELATIVE = /href=(["'])\/\/edmontonsquashclub\.ca/gi;
const CLUB_INTERCONNECT_HREF =
  /href=(["'])(https?:\/\/[^"']*clubinterconnect\.com[^"']*)\1/gi;
const DEAD_EVENT_PATH = /href=(["'])\/(?:event|events)\/[^"']*\1/gi;

function membershipMailto(): string {
  return `mailto:${CLUB_EMAIL}?subject=${encodeURIComponent("Membership signup")}`;
}

function programMailto(): string {
  return `mailto:${CLUB_EMAIL}?subject=${encodeURIComponent("Program registration")}`;
}

function clubInterconnectReplacement(url: string): string {
  return /reportView\.do/i.test(url) ? programMailto() : membershipMailto();
}

/** Rewrite migrated WordPress / ClubInterconnect links for the Next.js site. */
export function rewriteMigratedLinks(html: string): string {
  let result = html;

  result = result.replace(CLUB_INTERCONNECT_HREF, (_match, quote, url: string) => {
    return `href=${quote}${clubInterconnectReplacement(url)}${quote}`;
  });

  // Point media at locally mirrored files under public/wp-content/uploads.
  result = result.replace(WP_UPLOADS, "$1");

  // Rewrite remaining internal page links (not uploads).
  result = result.replace(
    /href=(["'])https?:\/\/(?:www\.)?edmontonsquashclub\.ca([^"']*)\1/gi,
    (_match, quote, path: string) => `href=${quote}${path || "/"}${quote}`,
  );
  result = result.replace(WP_PROTOCOL_RELATIVE, "href=$1");

  result = result.replace(DEAD_EVENT_PATH, 'href="/events/"');

  return result;
}
