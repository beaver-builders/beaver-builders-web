'use client';

import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import { Project, projects, services } from '../../lib/site-data';

const filters = ['All', 'Ongoing', 'Residential', 'Commercial', 'Public', 'Infrastructure'] as const;

function Media({ p, index }: { p: Project; index: number }) {
  if (p.image) return <Image src={p.image} alt={`${p.title}, ${p.place}`} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectFit: 'cover' }} />;
  return <span className="pc-ph" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>;
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const [active, setActive] = useState<Project | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);

  const list = useMemo(() => projects.filter(p => filter === 'All' || p.sector === filter || p.status === filter), [filter]);
  const open = (p: Project) => { setActive(p); dlg.current?.showModal(); };

  return (
    <section className="section section--paper" id="projects">
      <div className="wrap">
        <p className="eyebrow"><b>02</b> Projects</p>
        <div className="sec-head">
          <h2 className="h2">Built by us</h2>
          <div className="chips" role="group" aria-label="Filter projects">
            {filters.map(f => (
              <button key={f} type="button" className={`chip${f === filter ? ' on' : ''}`} aria-pressed={f === filter} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        </div>

        <div className="pc-grid">
          {list.map(p => (
            <button key={p.slug} type="button" className="pc" onClick={() => open(p)} aria-label={`Open project: ${p.title}`}>
              <span className="pc-media">
                <Media p={p} index={projects.indexOf(p)} />
                <span className={`pc-badge${p.status === 'Ongoing' ? ' live' : ''}`}>{p.status}</span>
              </span>
              <span className="pc-body">
                <span className="pc-title">{p.title}</span>
                <span className="pc-meta">{p.place} · {p.year}</span>
                <span className="pc-sector">{p.sector}</span>
              </span>
            </button>
          ))}
        </div>
        {list.length === 0 && <p className="empty">No projects match this filter.</p>}
      </div>

      <dialog ref={dlg} className="pd" onClose={() => setActive(null)} onClick={e => { if (e.target === dlg.current) dlg.current?.close(); }} aria-labelledby="pd-title">
        {active && (
          <div className="pd-box">
            <div className="pd-top">
              <span className="pd-kicker">{active.status} · {active.sector}</span>
              <button type="button" className="pd-close" onClick={() => dlg.current?.close()} aria-label="Close project">✕</button>
            </div>
            {active.image && (
              <div className="pd-img"><Image src={active.image} alt="" fill sizes="720px" style={{ objectFit: 'cover' }} /></div>
            )}
            <h3 id="pd-title" className="pd-title">{active.title}</h3>
            <p className="pd-place">{active.place} · {active.year}</p>
            <p>{active.summary}</p>
            <dl className="pd-facts">
              <div><dt>Client</dt><dd>{active.client}</dd></div>
              <div><dt>Status</dt><dd>{active.status}</dd></div>
            </dl>
            <h4>Scope</h4>
            <ul>{active.scope.map(s => <li key={s}>{s}</li>)}</ul>
            <a className="btn btn-ink" href="#contact" onClick={() => dlg.current?.close()}>Discuss a similar project</a>
          </div>
        )}
      </dialog>
    </section>
  );
}
