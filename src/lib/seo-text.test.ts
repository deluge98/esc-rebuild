import assert from "node:assert/strict";
import { describe, test } from "vitest";
import {
  fullPageTitle,
  plainMetaDescription,
  plainTitle,
} from "@/lib/seo-text";

describe("seo-text", () => {
  test("plainTitle decodes entities and strips tags", () => {
    assert.equal(
      plainTitle("Premium &#8211; Membership"),
      "Premium – Membership",
    );
  });

  test("fullPageTitle matches live en-dash suffix without doubling", () => {
    assert.equal(
      fullPageTitle("Premium Membership"),
      "Premium Membership – Edmonton Squash Club",
    );
    assert.equal(
      fullPageTitle("Premium Membership | Edmonton Squash Club"),
      "Premium Membership – Edmonton Squash Club",
    );
    assert.equal(
      fullPageTitle("Premium Membership – Edmonton Squash Club"),
      "Premium Membership – Edmonton Squash Club",
    );
  });

  test("plainMetaDescription cleans WP excerpt trailers and entities", () => {
    const raw =
      "Players from October &#8211; April (7 months) enjoy peak booking. More details &#8230; Read more";

    const description = plainMetaDescription(raw);

    assert.equal(
      description,
      "Players from October – April (7 months) enjoy peak booking. More details",
    );
  });

  test("plainMetaDescription truncates on a word boundary", () => {
    const raw = "Alpha beta gamma delta epsilon zeta eta theta iota kappa";
    const description = plainMetaDescription(raw, 20);

    assert.equal(description, "Alpha beta gamma…");
    assert.doesNotMatch(description, /delta/);
  });
});
