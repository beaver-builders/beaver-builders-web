'use client';

import { useState, type FormEvent } from 'react';
import { services, site } from '../../lib/site-data';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending'); setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      form.reset(); setStatus('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.'); setStatus('error');
    }
  }

  return (
    <section className="section section--dark" id="contact">
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow"><b>04</b> Contact</p>
          <h2 className="h2">Request a quote</h2>
          <p className="lead">Tell us about your project and we will get back to you.</p>
          <ul className="contact-list">
            <li><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><span>Phone</span><a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
            <li><span>Address</span>{site.mapsUrl ? <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">{site.address}</a> : <em>{site.address}</em>}</li>
          </ul>
        </div>

        <form className="form" onSubmit={onSubmit} noValidate={false}>
          <label>Name<input name="name" required maxLength={100} autoComplete="name" /></label>
          <label>Email<input name="email" type="email" required maxLength={150} autoComplete="email" /></label>
          <div className="form-row">
            <label>Phone <small>(optional)</small><input name="phone" type="tel" maxLength={40} autoComplete="tel" /></label>
            <label>Service
              <select name="service" defaultValue="">
                <option value="" disabled>Select…</option>
                {services.map(s => <option key={s.title}>{s.title}</option>)}
                <option>Other</option>
              </select>
            </label>
          </div>
          <label>Message<textarea name="message" rows={5} required minLength={10} maxLength={2000} /></label>
          {/* honeypot: real visitors never see or fill this */}
          <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="btn btn-lime" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          </button>
          <p className="form-note" role="status" aria-live="polite">
            {status === 'sent' && 'Thank you. We have received your enquiry.'}
            {status === 'error' && <span className="err">{error}</span>}
          </p>
        </form>
      </div>
    </section>
  );
}
