import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { enquiries } from '@/lib/db/schema';

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const oneLine = (v: string) => v.replace(/[\r\n]+/g, ' ');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Enquiry = { ref: string; name: string; email: string; phone: string; service: string; message: string; company: string; island: string };

/** Emails the enquiry to the office through Resend. Returns true if Resend accepted it. */
async function sendEmail(e: Enquiry): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO;
  if (!key || !to) { console.warn('[contact] email not configured (RESEND_API_KEY / ENQUIRY_TO)'); return false; }

  const fields: [string, string][] = [
    ['Name', e.name], ['Company', e.company], ['Email', e.email], ['Phone', e.phone],
    ['Island / atoll', e.island], ['Service', e.service], ['Reference', e.ref],
  ];
  const text = [...fields.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`), '', e.message].join('\n');

  try {
    const res = await fetch(process.env.RESEND_API_URL ?? 'https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM ?? 'Beaver Builders website <onboarding@resend.dev>',
        to: to.split(',').map(s => s.trim()).filter(Boolean),
        reply_to: EMAIL_RE.test(e.email) ? e.email : undefined,   // "Reply" goes straight to the visitor
        subject: oneLine(`New quote request: ${e.name}${e.service ? ` (${e.service})` : ''}${e.ref ? ` · ${e.ref}` : ''}`),
        text,
      }),
    });
    if (!res.ok) console.error('[contact] Resend error', res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error('[contact] email failed', err);
    return false;
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  if (clean(body.website, 50)) return NextResponse.json({ ok: true }); // honeypot filled: pretend success

  const e: Enquiry = {
    ref: clean(body.ref, 30), name: clean(body.name, 100), email: clean(body.email, 150), phone: clean(body.phone, 40),
    service: clean(body.service, 60), message: clean(body.message, 2000), company: clean(body.company, 120), island: clean(body.site, 120),
  };
  if (!e.name || !e.message || (!e.email && !e.phone) || (e.email && !EMAIL_RE.test(e.email))) {
    return NextResponse.json({ error: 'Please fill in your name, the project details, and an email or phone number.' }, { status: 400 });
  }

  // 1) save to Supabase
  let id: string | undefined;
  try {
    const [row] = await db.insert(enquiries).values({
      ref: e.ref || null, name: e.name, email: e.email || null, phone: e.phone || null, service: e.service || null,
      message: e.message, company: e.company || null, island: e.island || null,
    }).returning({ id: enquiries.id });
    id = row.id;
  } catch (err) {
    console.error('[contact] insert failed', err);
  }

  // 2) email the office
  const emailed = await sendEmail(e);
  if (emailed && id) {
    await db.update(enquiries).set({ notifiedAt: new Date() }).where(eq(enquiries.id, id)).catch(() => {});
  }

  // Fail only if the enquiry reached neither place.
  if (!id && !emailed) {
    return NextResponse.json({ error: 'We could not send your request. Please try again or email us.' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
