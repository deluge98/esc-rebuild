import assert from "node:assert/strict";
import { describe, test } from "vitest";
import { CLUB_EMAIL } from "@/lib/constants";
import { rewriteMigratedLinks } from "@/lib/rewrite-links";

describe("rewriteMigratedLinks", () => {
  test("rewrites absolute WP hrefs to site-relative paths", () => {
    const html = rewriteMigratedLinks(
      `<a href="https://edmontonsquashclub.ca/premium-membership/">Premium</a>
<a href="http://www.edmontonsquashclub.ca/">Home</a>`,
    );

    assert.match(html, /href="\/premium-membership\/"/);
    assert.match(html, /href="\/"/);
    assert.doesNotMatch(html, /edmontonsquashclub\.ca/);
  });

  test("rewrites WP upload media to local public paths", () => {
    const html = rewriteMigratedLinks(
      `<img src="https://edmontonsquashclub.ca/wp-content/uploads/2018/03/x.jpg" srcset="https://edmontonsquashclub.ca/wp-content/uploads/2018/03/x-300.jpg 300w" />`,
    );

    assert.match(html, /src="\/wp-content\/uploads\/2018\/03\/x\.jpg"/);
    assert.match(
      html,
      /srcset="\/wp-content\/uploads\/2018\/03\/x-300\.jpg 300w"/,
    );
    assert.doesNotMatch(html, /edmontonsquashclub\.ca/);
  });

  test("rewrites protocol-relative WP hrefs", () => {
    const html = rewriteMigratedLinks(
      `<a href="//edmontonsquashclub.ca/blog/">Blog</a>`,
    );

    assert.equal(html, `<a href="/blog/">Blog</a>`);
  });

  test("rewrites ClubInterconnect membership links to mailto", () => {
    const html = rewriteMigratedLinks(
      `<a href="https://book.clubinterconnect.com/foo">Join</a>`,
    );

    assert.match(
      html,
      new RegExp(
        `href="mailto:${CLUB_EMAIL}\\?subject=${encodeURIComponent("Membership signup")}"`,
      ),
    );
  });

  test("rewrites ClubInterconnect reportView links to program mailto", () => {
    const html = rewriteMigratedLinks(
      `<a href="https://book.clubinterconnect.com/reportView.do?x=1">Register</a>`,
    );

    assert.match(
      html,
      new RegExp(
        `href="mailto:${CLUB_EMAIL}\\?subject=${encodeURIComponent("Program registration")}"`,
      ),
    );
  });

  test("rewrites dead event paths to /events/", () => {
    const html = rewriteMigratedLinks(
      `<a href="/event/some-match/">Event</a><a href="/events/2024-01/foo/">Archive</a>`,
    );

    assert.equal(
      html,
      `<a href="/events/">Event</a><a href="/events/">Archive</a>`,
    );
  });
});
