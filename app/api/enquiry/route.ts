import { NextResponse } from 'next/server';

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  if (clean(body.company, 50)) return NextResponse.json({ ok: true }); // honeypot filled: pretend success

  const name = clean(body.name, 100);
  const email = clean(body.email, 150);
  const phone = clean(body.phone, 40);
  const service = clean(body.service, 60);
  const message = clean(body.message, 2000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return NextResponse.json({ error: 'Please fill in your name, a valid email and a message.' }, { status: 400 });
  }

  // TODO: deliver the enquiry. Options: email it (Resend / Nodemailer) or insert it into Postgres with Drizzle.
  console.log('[contact enquiry]', { name, email, phone, service, message });

  return NextResponse.json({ ok: true });
}
