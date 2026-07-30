import { Resend } from "resend";
import {
  formatContactEmail,
  isHoneypotTriggered,
  validateContactPayload,
} from "@/data/contact-forms";
import { CONTACT_FORM_BCC, CONTACT_FORM_FROM, CONTACT_FORM_TO } from "@/lib/constants";

export const runtime = "nodejs";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Best-effort in-memory limiter. Per serverless instance only; pairs with the
// honeypot + Origin check to blunt casual abuse, not a hard guarantee.
const rateLimitHits = new Map<string, number[]>();

/**
 * Prefer platform-provided IP over client-spoofable leftmost X-Forwarded-For.
 * On Vercel, X-Real-IP / the rightmost XFF hop is the connection IP the edge saw.
 */
function getClientIp(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    if (hops.length > 0) return hops[hops.length - 1]!;
  }

  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (rateLimitHits.get(ip) ?? []).filter((t) => t > windowStart);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitHits.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitHits.set(ip, recent);
  return false;
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  // Non-browser clients (curl, server-to-server) omit Origin; allow those.
  // Browsers always send Origin on cross-origin POST, so a mismatch is CSRF.
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ ok: false, error: "Invalid origin." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  if (isHoneypotTriggered(body)) {
    return Response.json({ ok: true });
  }

  const validated = validateContactPayload(body);
  if (!validated.ok) {
    return Response.json(
      { ok: false, error: validated.error },
      { status: 400 },
    );
  }

  // Count only validated submissions toward the limit (not typos / honeypot).
  if (isRateLimited(getClientIp(request))) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("Contact form missing RESEND_API_KEY");
    return Response.json(
      { ok: false, error: "Email is not configured." },
      { status: 503 },
    );
  }

  const { subject, text } = formatContactEmail(validated.data);
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: CONTACT_FORM_FROM,
    to: [...CONTACT_FORM_TO],
    ...(CONTACT_FORM_BCC.length > 0 ? { bcc: [...CONTACT_FORM_BCC] } : {}),
    subject,
    text,
    ...(validated.data.replyTo ? { replyTo: validated.data.replyTo } : {}),
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json(
      { ok: false, error: "Unable to send message right now." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
