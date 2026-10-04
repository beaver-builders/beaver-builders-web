'use client';

import { useEffect, useRef, useState, type FocusEvent, type FormEvent, type ReactNode } from 'react';
import { serviceOptions, site } from '@/lib/site-data';

type Field = 'name' | 'email' | 'phone' | 'message';
const ID: Record<Field, string> = { name: 'f-name', email: 'f-email', phone: 'f-phone', message: 'f-msg' };
const LABEL: Record<Field, string> = { name: 'Your name', email: 'Email', phone: 'Phone', message: 'About the project' };
type Errors = Partial<Record<Field, string>>;
type Control = HTMLInputElement | HTMLTextAreaElement;

const msgFor = (el: Control): string => {
  if (el.validity.valueMissing) return 'Please fill this in.';
  if (el.type === 'email' && el.validity.typeMismatch) return 'Enter an email address like name@company.mv.';
  if (el.validity.patternMismatch) return 'Enter a phone number, e.g. +960 778 3137.';
  return '';
};

const makeRef = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `BB-${String(d.getFullYear()).slice(2)}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
};

export default function QuoteForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState<Field[]>([]);
  const [status, setStatus] = useState<{ kind: 'ok' | 'bad'; text: ReactNode } | null>(null);
  const [sending, setSending] = useState(false);

  // Links with data-service (the service rows) preselect the Service dropdown.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLElement>('[data-service]');
      const sel = formRef.current?.elements.namedItem('service');
      if (a?.dataset.service && sel instanceof HTMLSelectElement) sel.value = a.dataset.service;
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const onBlur = (e: FocusEvent<HTMLFormElement>) => {
    const t = e.target as unknown as Control;
    const f = t.name as Field;
    if (t.value && f in ID) setErrors(p => ({ ...p, [f]: msgFor(t) }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (n: Field) => form.elements.namedItem(n) as Control;
    const next: Errors = {};
    const bad: Field[] = [];
    const fail = (f: Field, m: string) => { next[f] = m; bad.push(f); };

    const nameMsg = msgFor(get('name')); if (nameMsg) fail('name', nameMsg);
    if (!get('email').value.trim() && !get('phone').value.trim()) {
      fail('email', 'Add an email or a phone number so we can reply.');
    } else {
      const em = msgFor(get('email')); if (em) fail('email', em);
      const pm = msgFor(get('phone')); if (pm) fail('phone', pm);
    }
    const msgMsg = msgFor(get('message')); if (msgMsg) fail('message', msgMsg);

    setErrors(next); setSummary(bad); setStatus(null);
    if (bad.length) { setTimeout(() => summaryRef.current?.focus(), 0); return; }

    const fd = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (fd.website) return; // honeypot
    const ref = makeRef();
    setSending(true);
    try {
      const r = await fetch('/api/contact', {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...fd, ref }),
      });
      if (!r.ok) throw new Error(String(r.status));
      form.reset();
      setStatus({ kind: 'ok', text: <>Thank you, {(fd.name || '').trim().split(' ')[0]}. We have your request. Your reference is <strong>{ref}</strong>; quote it if you call us.</> });
    } catch {
      setStatus({ kind: 'bad', text: <>We could not send your request. Nothing you typed was lost. Email <a href={`mailto:${site.email}`}>{site.email}</a> or call <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>.</> });
    } finally { setSending(false); }
  }

  const inv = (f: Field) => (errors[f] ? true : undefined);

  return (
    <form ref={formRef} className="form" noValidate onSubmit={onSubmit} onBlur={onBlur}>
      <h3>Request a quote</h3>

      <div className="form-summary" ref={summaryRef} tabIndex={-1} hidden={summary.length === 0}>
        {summary.length === 1 ? 'One field needs' : `${summary.length} fields need`} attention:
        <ul>
          {summary.map(f => (
            <li key={f}>
              <a href={`#${ID[f]}`} onClick={e => { e.preventDefault(); document.getElementById(ID[f])?.focus(); }}>{LABEL[f]}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="field full">
        <label htmlFor="f-name">Your name</label>
        <input id="f-name" name="name" autoComplete="name" required maxLength={100} aria-invalid={inv('name')} aria-describedby="f-name-err" />
        <span className="err" id="f-name-err">{errors.name}</span>
      </div>
      <div className="field">
        <label htmlFor="f-email">Email</label>
        <input id="f-email" name="email" type="email" autoComplete="email" maxLength={150} aria-invalid={inv('email')} aria-describedby="f-contact-hint f-email-err" />
        <span className="err" id="f-email-err">{errors.email}</span>
      </div>
      <div className="field">
        <label htmlFor="f-phone">Phone</label>
        <input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={40} pattern="[+0-9 \(\)\-]{7,20}" placeholder="+960"
               aria-invalid={inv('phone')} aria-describedby="f-contact-hint f-phone-err" />
        <span className="err" id="f-phone-err">{errors.phone}</span>
      </div>
      <p className="hint full" id="f-contact-hint">Email or phone: one is enough.</p>

      <div className="field full">
        <label htmlFor="f-service">Service</label>
        <select id="f-service" name="service" defaultValue="Not sure yet">
          {serviceOptions.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div className="field full">
        <label htmlFor="f-msg">About the project</label>
        <textarea id="f-msg" name="message" required maxLength={2000} placeholder="Scope, size, location and timing."
                  aria-invalid={inv('message')} aria-describedby="f-msg-err" />
        <span className="err" id="f-msg-err">{errors.message}</span>
      </div>

      <details className="more full">
        <summary>Add company and island <i>(optional)</i></summary>
        <div className="more-grid">
          <div className="field"><label htmlFor="f-company">Company</label><input id="f-company" name="company" autoComplete="organization" maxLength={120} /></div>
          <div className="field"><label htmlFor="f-site">Island / atoll</label><input id="f-site" name="site" maxLength={120} placeholder="e.g. Hithadhoo, Addu City" /></div>
        </div>
      </details>

      {/* honeypot: real visitors never see or fill this */}
      <div className="hp" aria-hidden="true"><label htmlFor="f-website">Website</label><input id="f-website" name="website" tabIndex={-1} autoComplete="off" /></div>

      {status && <p className={`form-status ${status.kind}`} role="status">{status.text}</p>}
      <div className="form-foot">
        <small>Your request goes straight to our office in Malé. We use your details only to reply.</small>
        <button className="btn btn-lime" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send request'}</button>
      </div>
    </form>
  );
}