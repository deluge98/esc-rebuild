import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, test, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function ResendMock() {
    return { emails: { send: sendMock } };
  }),
}));

import { POST } from "./route";

const VALID_BODY = {
  formId: "contact-inquiry",
  pageSlug: "adult-programs",
  website: "",
  fields: {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    phone: "",
    message: "Hello",
  },
};

let ipCounter = 0;

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  ipCounter += 1;
  return new Request("https://esc-rebuild.vercel.app/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      // Unique IP per request so the in-memory rate limiter doesn't bleed
      // across tests.
      "x-forwarded-for": `10.0.0.${ipCounter}`,
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: "email_1" }, error: null });
    process.env.RESEND_API_KEY = "re_test";
  });

  afterEach(() => {
    delete process.env.RESEND_API_KEY;
  });

  test("sends email and returns ok for a valid submission", async () => {
    const response = await POST(makeRequest(VALID_BODY));
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.ok, true);
    assert.equal(sendMock.mock.calls.length, 1);
    assert.equal(sendMock.mock.calls[0][0].replyTo, "jane@example.com");
    assert.deepEqual(sendMock.mock.calls[0][0].to, [
      "drewlefe@gmail.com",
      "info@edmontonsquashclub.ca",
      "tyler@edmontonsquashclub.org",
    ]);
    assert.deepEqual(sendMock.mock.calls[0][0].bcc, [
      "jimdawson@live.ca",
      "jeff.williams@edmontonsquashclub.ca",
    ]);
    assert.equal(
      sendMock.mock.calls[0][0].from,
      "Edmonton Squash Club <hello@edmontonsquashclub.ca>",
    );
  });

  test("honeypot submissions return ok without sending", async () => {
    const response = await POST(
      makeRequest({ ...VALID_BODY, website: "http://spam.example" }),
    );
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.ok, true);
    assert.equal(sendMock.mock.calls.length, 0);
  });

  test("returns 503 when email env is not configured", async () => {
    delete process.env.RESEND_API_KEY;

    const response = await POST(makeRequest(VALID_BODY));
    const data = await response.json();

    assert.equal(response.status, 503);
    assert.equal(data.ok, false);
    assert.equal(sendMock.mock.calls.length, 0);
  });

  test("returns 502 when Resend reports an error", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "boom" } });

    const response = await POST(makeRequest(VALID_BODY));
    const data = await response.json();

    assert.equal(response.status, 502);
    assert.equal(data.ok, false);
  });

  test("rejects a cross-site origin", async () => {
    const response = await POST(
      makeRequest(VALID_BODY, { origin: "https://evil.example" }),
    );
    const data = await response.json();

    assert.equal(response.status, 403);
    assert.equal(data.ok, false);
    assert.equal(sendMock.mock.calls.length, 0);
  });

  test("rejects invalid payloads with 400", async () => {
    const response = await POST(
      makeRequest({
        ...VALID_BODY,
        fields: { ...VALID_BODY.fields, email: "not-an-email" },
      }),
    );
    const data = await response.json();

    assert.equal(response.status, 400);
    assert.equal(data.ok, false);
    assert.equal(sendMock.mock.calls.length, 0);
  });

  test("does not rate-limit invalid payloads", async () => {
    const ip = "203.0.113.50";
    for (let i = 0; i < 8; i += 1) {
      const response = await POST(
        makeRequest(
          {
            ...VALID_BODY,
            fields: { ...VALID_BODY.fields, email: "not-an-email" },
          },
          { "x-forwarded-for": ip },
        ),
      );
      assert.equal(response.status, 400);
    }

    const okResponse = await POST(
      makeRequest(VALID_BODY, { "x-forwarded-for": ip }),
    );
    assert.equal(okResponse.status, 200);
  });

  test("rate limits repeated submissions from the same IP", async () => {
    const ip = "203.0.113.7";
    const statuses: number[] = [];
    for (let i = 0; i < 6; i += 1) {
      const response = await POST(
        makeRequest(VALID_BODY, { "x-forwarded-for": ip }),
      );
      statuses.push(response.status);
    }

    assert.equal(statuses.filter((s) => s === 200).length, 5);
    assert.equal(statuses[5], 429);
  });

  test("rate limits by the rightmost X-Forwarded-For hop", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 6; i += 1) {
      // Spoofed leftmost IPs should not bypass the limit — Vercel appends the real IP last.
      const response = await POST(
        makeRequest(VALID_BODY, {
          "x-forwarded-for": `${10 + i}.0.0.1, 203.0.113.9`,
        }),
      );
      statuses.push(response.status);
    }

    assert.equal(statuses.filter((s) => s === 200).length, 5);
    assert.equal(statuses[5], 429);
  });

  test("prefers X-Real-IP over X-Forwarded-For", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 6; i += 1) {
      const response = await POST(
        makeRequest(VALID_BODY, {
          "x-real-ip": "198.51.100.2",
          "x-forwarded-for": `${i}.0.0.1, 203.0.113.10`,
        }),
      );
      statuses.push(response.status);
    }

    assert.equal(statuses.filter((s) => s === 200).length, 5);
    assert.equal(statuses[5], 429);
  });
});
