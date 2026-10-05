import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { projects } from '@/lib/site-data';
import { details, roleLabel } from '../../../../lib/project-details';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find(x => x.slug === slug);
  if (!p) return {};
  return { title: `${p.title}, ${p.place}`, description: details[slug].summary };
}

const Chev = ({ flip }: { flip?: boolean }) => (
  <svg viewBox="0 0 22 12" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}><use href="/icons.svg#chev" /></svg>
);

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const idx = projects.findIndex(x => x.slug === slug);
  if (idx < 0) notFound();
  const p = projects[idx], d = details[slug];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const facts: [string, string | undefined][] = [
    ['Client', p.client], ['Role', roleLabel[p.role]], ['Location', p.place], ['Year', p.when],
    ['Duration', d.duration], ['Status', d.statusText], ['Contract value', p.value],
  ];

  return (
    <>
      <header className="page-hero">
        <div className="shell">
          <div className="cover">
            <Image src={d.gallery[0].src} alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
          </div>
          <Navbar variant="hero" />
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/#projects">Project register</Link> / <Link href="/#projects">{d.sectorText}</Link>
          </nav>
          <h1 className="blocks"><span>{p.title}</span></h1>
          <div className="page-meta">
            <span className={`chip ${p.status}`}>{p.statusLabel} <i /></span>
            <span>{p.place} · {p.when}</span>
          </div>
        </div>
      </header>

      <section className="section wrap page">
        <div className="page-grid">
          <div className="gallery-grid">
            {d.gallery.map((g, i) => (
              <Image key={g.src} src={g.src} width={g.width} height={g.height} alt={`${p.title}, photo ${i + 1}`}
                     sizes={i === 0 ? '(max-width: 980px) 100vw, 60vw' : '(max-width: 980px) 50vw, 30vw'} style={{ background: g.bg }} />
            ))}
          </div>
          <aside className="page-side">
            <p className="lede">{d.summary}</p>
            <dl className="titleblock facts">
              {facts.filter(([, v]) => v).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
            <div>
              <h2 className="minor">Scope</h2>
              <ul className="scope">{d.scope.map(s => <li key={s}>{s}</li>)}</ul>
            </div>
            <p className="role-note">{d.roleNote}</p>
            <Link className="btn btn-ink" href="/#contact" style={{ justifySelf: 'start' }}>Discuss a similar project</Link>
          </aside>
        </div>

        <nav className="next-proj" aria-label="More projects">
          <Link className="chev" href={`/projects/${prev.slug}`}><Chev flip /> {prev.title}</Link>
          <Link className="chev" href={`/projects/${next.slug}`}>{next.title} <Chev /></Link>
        </nav>
      </section>
    </>
  );
}