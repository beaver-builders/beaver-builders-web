import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="nf">
      <p className="eyebrow">404</p>
      <h1 className="h2">Page not found</h1>
      <p>That page is not on our site plan.</p>
      <Link className="btn btn-lime" href="/">Back to home</Link>
    </section>
  );
}
