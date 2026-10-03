'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site-data';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label={`${site.name}, home`}>
       <Image
        src="/brand/logo.png"
        alt="Beaver Builders"
        width={50}
        height={50}
        priority
      />
      <span>Beaver<b>Builders</b></span>
    </Link>
  );
}

/** variant "hero": sits on top of the hero. variant "bar": fixed bar that appears once the hero is done. */
export default function Navbar({ variant }: { variant: 'hero' | 'bar' }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(variant === 'hero');

  useEffect(() => {
    if (variant !== 'bar') return;
    const check = () => {
      const after = document.getElementById('after');
      setShown(!!after && after.getBoundingClientRect().top <= 0);
    };
    check();
    addEventListener('scroll', check, { passive: true });
    return () => removeEventListener('scroll', check);
  }, [variant]);

  useEffect(() => { if (!shown) setOpen(false); }, [shown]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  const menuId = `menu-${variant}`;
  return (
    <nav className={`nav nav--${variant}${shown ? ' is-shown' : ''}`} aria-label="Main" aria-hidden={!shown}>
      <Logo />
      <ul className="nav-links">
        {nav.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
      </ul>
      <Link className="btn btn-lime nav-cta" href="/#contact">Request a quote</Link>
      <button className="nav-toggle" type="button" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(o => !o)}>
        {open ? 'Close' : 'Menu'}
      </button>
      <div className="nav-menu" id={menuId} hidden={!open}>
        {nav.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>)}
        <Link href="/#contact" onClick={() => setOpen(false)}>Request a quote →</Link>
      </div>
    </nav>
  );
}
