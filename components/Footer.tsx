import Link from 'next/link';
import { Logo } from './Navbar';
import { nav, services, site } from '../lib/site-data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Logo />
          <p className="footer-tag">{site.tagline}</p>
        </div>
        <ul>{nav.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
        <ul>
          <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          <li><a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
        </ul>
      </div>
      <p className="wrap footer-copy">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
    </footer>
  );
}
