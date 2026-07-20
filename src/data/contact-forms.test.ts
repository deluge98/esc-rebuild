import assert from "node:assert/strict";
import { describe, test } from "vitest";
import {
  formatContactEmail,
  isHoneypotTriggered,
  validateContactPayload,
} from "@/data/contact-forms";

describe("contact-forms validation", () => {
  test("accepts a valid contact-inquiry payload", () => {
    const result = validateContactPayload({
      formId: "contact-inquiry",
      pageSlug: "adult-programs",
      fields: {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        phone: "780-555-0100",
        message: "Interested in Learn to Play",
      },
    });

    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.data.replyTo, "jane@example.com");
  });

  test("rejects contact-inquiry without required name/email", () => {
    const result = validateContactPayload({
      formId: "contact-inquiry",
      pageSlug: "junior-programs-2-copy",
      fields: {
        firstName: "",
        lastName: "Doe",
        email: "not-an-email",
        phone: "",
        message: "",
      },
    });

    assert.equal(result.ok, false);
  });

  test("rejects mismatched form and page", () => {
    const result = validateContactPayload({
      formId: "junior-inquiry",
      pageSlug: "adult-programs",
      fields: {
        firstName: "Pat",
        lastName: "Lee",
        email: "pat@example.com",
      },
    });

    assert.equal(result.ok, false);
  });

  test("accepts a valid ambassador payload", () => {
    const result = validateContactPayload({
      formId: "ambassador",
      pageSlug: "become-an-esc-club-ambassador",
      fields: {
        name: "Alex Member",
        email: "alex@example.com",
        phone: "780-555-0123",
        levelOfPlay: "C",
        availabilityDays: ["Monday", "Wednesday"],
        timeOfDay: ["Early Evenings"],
        preferredContact: "Email",
        comments: "Happy to help newcomers",
      },
    });

    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.data.replyTo, "alex@example.com");
  });

  test("requires a valid ambassador email", () => {
    const result = validateContactPayload({
      formId: "ambassador",
      pageSlug: "become-an-esc-club-ambassador",
      fields: {
        name: "Alex Member",
        email: "",
        phone: "",
        levelOfPlay: "C",
        availabilityDays: ["Monday"],
        timeOfDay: ["Early Evenings"],
        preferredContact: "Email",
        comments: "",
      },
    });

    assert.equal(result.ok, false);
  });

  test("requires ambassador days, times, and preferred contact", () => {
    const result = validateContactPayload({
      formId: "ambassador",
      pageSlug: "become-an-esc-club-ambassador",
      fields: {
        name: "Alex Member",
        email: "alex@example.com",
        phone: "",
        levelOfPlay: "",
        availabilityDays: [],
        timeOfDay: [],
        preferredContact: "",
        comments: "",
      },
    });

    assert.equal(result.ok, false);
  });

  test("rejects an over-long message", () => {
    const result = validateContactPayload({
      formId: "contact-inquiry",
      pageSlug: "adult-programs",
      fields: {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        phone: "",
        message: "x".repeat(5001),
      },
    });

    assert.equal(result.ok, false);
  });

  test("detects honeypot fills", () => {
    assert.equal(isHoneypotTriggered({ website: "https://spam.example" }), true);
    assert.equal(isHoneypotTriggered({ website: "" }), false);
  });
});

describe("contact-forms email formatting", () => {
  test("formats adult programs inquiry", () => {
    const validated = validateContactPayload({
      formId: "contact-inquiry",
      pageSlug: "adult-programs",
      fields: {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        phone: "",
        message: "Need more details",
      },
    });
    assert.equal(validated.ok, true);
    if (!validated.ok) return;

    const email = formatContactEmail(validated.data);
    assert.equal(email.subject, "[ESC Adult Programs] Jane Doe");
    assert.match(email.text, /Email: jane@example.com/);
    assert.match(email.text, /Phone: \(not provided\)/);
    assert.match(email.text, /Need more details/);
  });

  test("formats lesson packages with matching prefix", () => {
    const validated = validateContactPayload({
      formId: "contact-inquiry",
      pageSlug: "junior-programs-2-copy",
      fields: {
        firstName: "Sam",
        lastName: "Nguyen",
        email: "sam@example.com",
        phone: "780-555-0199",
        message: "",
      },
    });
    assert.equal(validated.ok, true);
    if (!validated.ok) return;

    const email = formatContactEmail(validated.data);
    assert.equal(email.subject, "[ESC Lesson Packages] Sam Nguyen");
  });

  test("formats junior inquiry", () => {
    const validated = validateContactPayload({
      formId: "junior-inquiry",
      pageSlug: "junior-programs-2",
      fields: {
        firstName: "Chris",
        lastName: "Park",
        email: "chris@example.com",
      },
    });
    assert.equal(validated.ok, true);
    if (!validated.ok) return;

    const email = formatContactEmail(validated.data);
    assert.equal(email.subject, "[ESC Junior Programs] Chris Park");
    assert.match(email.text, /Page: \/junior-programs-2\//);
  });

  test("formats ambassador inquiry", () => {
    const validated = validateContactPayload({
      formId: "ambassador",
      pageSlug: "become-an-esc-club-ambassador",
      fields: {
        name: "Taylor Brooks",
        email: "taylor@example.com",
        phone: "",
        levelOfPlay: "Open",
        availabilityDays: ["Saturday", "Sunday"],
        timeOfDay: ["Later Morning", "Afternoons"],
        preferredContact: "Text",
        comments: "",
      },
    });
    assert.equal(validated.ok, true);
    if (!validated.ok) return;

    const email = formatContactEmail(validated.data);
    assert.equal(email.subject, "[ESC Ambassador] Taylor Brooks");
    assert.match(email.text, /Email: taylor@example.com/);
    assert.match(email.text, /Availability – days: Saturday, Sunday/);
    assert.match(email.text, /Preferred contact: Text/);
    assert.match(email.text, /Comments:\n\(not provided\)/);
  });

  test("strips newlines from the subject line", () => {
    const validated = validateContactPayload({
      formId: "ambassador",
      pageSlug: "become-an-esc-club-ambassador",
      fields: {
        name: "Bad\r\nName: injected",
        email: "bad@example.com",
        phone: "",
        levelOfPlay: "",
        availabilityDays: ["Monday"],
        timeOfDay: ["Afternoons"],
        preferredContact: "Email",
        comments: "",
      },
    });
    assert.equal(validated.ok, true);
    if (!validated.ok) return;

    const email = formatContactEmail(validated.data);
    assert.ok(!email.subject.includes("\n"));
    assert.ok(!email.subject.includes("\r"));
  });
});
