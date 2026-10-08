import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getProjects } from '@/lib/data';
import { roleLabel } from '@/lib/types';

type Params = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = (await getProjects()).find(x => x.slug === slug);
  if (!p) return {};
  return { title: `${p.title}, ${p.place}`, description: p.summary };
}

const Chev = ({ flip }: { flip?: boolean }) => (
  <svg viewBox="0 0 22 12" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}><use href="/icons.svg#chev" /></svg>
);

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const projects = await getProjects();
  const idx = projects.findIndex(x => x.slug === slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const facts: [string, string | undefined][] = [
    ['Client', p.client], ['Role', roleLabel[p.role]], ['Location', p.place], ['Year', p.when],
    ['Duration', p.duration], ['Status', p.statusText], ['Contract value', p.value],
  ];

  return (
    <>
      <header className="page-hero">
        <div className="shell">
          <div className="cover">
            <Image src={p.gallery[0].src} alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
          </div>
          <Navbar variant="hero" />
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/#projects">Project register</Link> / <Link href="/#projects">{p.sectorText}</Link>
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
            {p.gallery.map((g, i) => (
              <Image key={g.src} src={g.src} width={g.width} height={g.height} alt={`${p.title}, photo ${i + 1}`}
                     sizes={i === 0 ? '(max-width: 980px) 100vw, 60vw' : '(max-width: 980px) 50vw, 30vw'} style={{ background: g.bg }} />
            ))}
          </div>
          <aside className="page-side">
            <p className="lede">{p.summary}</p>
            <dl className="titleblock facts">
              {facts.filter(([, v]) => v).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
            <div>
              <h2 className="minor">Scope</h2>
              <ul className="scope">{p.scope.map(s => <li key={s}>{s}</li>)}</ul>
            </div>
            <p className="role-note">{p.roleNote}</p>
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
