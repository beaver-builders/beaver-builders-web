import { NextResponse } from 'next/server';

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  if (clean(body.website, 50)) return NextResponse.json({ ok: true }); // honeypot filled: pretend success

  const name = clean(body.name, 100);
  const email = clean(body.email, 150);
  const phone = clean(body.phone, 40);
  const service = clean(body.service, 60);
  const message = clean(body.message, 2000);
  const company = clean(body.company, 120);
  const island = clean(body.site, 120);
  const ref = clean(body.ref, 30);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !message || (!email && !phone) || (email && !emailOk)) {
    return NextResponse.json({ error: 'Please fill in your name, the project details, and an email or phone number.' }, { status: 400 });
  }

  // TODO: deliver the enquiry. Options: email it (Resend / Nodemailer) or insert it into Postgres with Drizzle.
  console.log('[contact enquiry]', { ref, name, email, phone, service, company, island, message });

  return NextResponse.json({ ok: true });
}