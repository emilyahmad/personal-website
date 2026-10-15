/**
 * Contact form handling. Runs on the server only (the `.server` suffix keeps it out of the browser
 * bundle), so the destination address and API key are never sent to visitors.
 *
 * Environment variables:
 *   RESEND_API_KEY      API key from https://resend.com
 *   CONTACT_TO_EMAIL    where messages are delivered (your inbox)
 *   CONTACT_FROM_EMAIL  verified sender, e.g. "Portfolio <contact@emilyahmad.org>"
 *                       (defaults to Resend's test sender, which can only deliver to your own account email)
 */

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<"name" | "email" | "message", string>> };

const LIMITS = { name: 100, email: 254, message: 5000, minMessage: 10, maxLinks: 3 };
const MIN_FILL_MS = 3000; // Humans take longer than this to fill out the form.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3; // Messages per IP per window.
const MAX_BODY_BYTES = 20_000;

// In-memory rate limit on delivered messages. Resets when the server restarts, which is fine for a
// personal site. Only successful sends count, so a temporary outage doesn't lock anyone out.
const recent = new Map<string, number[]>();

function sentRecently(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.set(ip, hits);
  return hits.length;
}

function recordSend(ip: string) {
  recent.set(ip, [...(recent.get(ip) ?? []), Date.now()]);
  // Keep the map from growing forever.
  if (recent.size > 5000) recent.delete(recent.keys().next().value!);
}

function clientIp(request: Request) {
  return (
    // Set by Netlify and can't be spoofed by the visitor; the others cover other hosts and local dev.
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Collapse whitespace and remove line breaks, so values can't inject extra email headers. */
const singleLine = (s: string) => s.replace(/[\r\n\t]+/g, " ").trim();

export async function handleContact(request: Request): Promise<ContactResult> {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return { ok: false, error: "That message is too long." };

  const form = await request.formData();
  const name = singleLine(String(form.get("name") ?? ""));
  const email = singleLine(String(form.get("email") ?? ""));
  const message = String(form.get("message") ?? "").trim();
  const honeypot = String(form.get("website") ?? "");
  const startedAt = Number(form.get("startedAt") ?? 0);

  // Bots fill hidden fields and submit instantly. Pretend it worked so they don't adapt.
  if (honeypot || !startedAt || Date.now() - startedAt < MIN_FILL_MS) return { ok: true };

  const fieldErrors: NonNullable<Extract<ContactResult, { ok: false }>["fieldErrors"]> = {};
  if (!name) fieldErrors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) fieldErrors.name = `Please keep your name under ${LIMITS.name} characters.`;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > LIMITS.email)
    fieldErrors.email = "Please enter a valid email address.";
  if (message.length < LIMITS.minMessage)
    fieldErrors.message = `Please write at least ${LIMITS.minMessage} characters.`;
  else if (message.length > LIMITS.message)
    fieldErrors.message = `Please keep your message under ${LIMITS.message} characters.`;
  else if ((message.match(/https?:\/\/|www\./gi) ?? []).length > LIMITS.maxLinks)
    fieldErrors.message = "Please include fewer links.";
  if (Object.keys(fieldErrors).length) {
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  const ip = clientIp(request);
  if (sentRecently(ip) >= RATE_MAX) {
    return { ok: false, error: "You've sent a few messages already. Please try again later." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.");
    return { ok: false, error: "The contact form isn't set up yet. Please reach out on LinkedIn instead." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Portfolio message from ${name}`.slice(0, 150),
      // Plain text only, so nothing in the message is rendered as HTML.
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!response.ok) {
    console.error("Resend error", response.status, await response.text());
    return { ok: false, error: "Something went wrong sending your message. Please try again later." };
  }
  recordSend(ip);
  return { ok: true };
}
