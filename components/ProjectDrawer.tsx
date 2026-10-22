'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { roleLabel, type Project } from '@/lib/types';

const Chev = () => <svg viewBox="0 0 22 12" aria-hidden="true"><use href="/icons.svg#chev" /></svg>;

type Props = { projects: Project[]; slug: string | null; onSelect: (slug: string) => void; onClose: () => void };

export default function ProjectDrawer({ projects, slug, onSelect, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const pushed = useRef(false); // did we add a history entry for the open drawer?

  // Open / switch / close in response to `slug`; keep the URL hash (#p-<slug>) in sync.
  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (slug) {
      if (!dlg.open) dlg.showModal();
      const hash = `#p-${slug}`;
      if (!pushed.current) { history.pushState(null, '', hash); pushed.current = true; } else history.replaceState(null, '', hash);
      dlg.scrollTop = 0;
      dlg.querySelector<HTMLElement>('.dr-top .icon-btn')?.focus();
    } else if (dlg.open) dlg.close();
  }, [slug]);

  // Browser Back closes the drawer.
  useEffect(() => {
    const onPop = () => {
      const dlg = ref.current;
      if (dlg?.open && !location.hash.startsWith('#p-')) { pushed.current = false; dlg.close(); }
    };
    addEventListener('popstate', onPop);
    return () => removeEventListener('popstate', onPop);
  }, []);

  const handleClose = () => {
    if (pushed.current) { pushed.current = false; history.back(); } // drop the drawer's history entry
    else if (location.hash.startsWith('#p-')) history.replaceState(null, '', '#projects');
    onClose();
  };

  const p = slug ? projects.find(x => x.slug === slug) : undefined;
  const idx = p ? projects.indexOf(p) : 0;

  return (
    <dialog
      ref={ref} className="drawer" aria-labelledby="drawer-title" onClose={handleClose}
      onClick={e => { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left) e.currentTarget.close(); }}
    >
      <div className="dr-top">
        <span className="mono dr-title" id="drawer-title">{p ? `Project ${idx + 1} of ${projects.length}` : 'Project'}</span>
        <button className="icon-btn" type="button" aria-label="Close project" onClick={() => ref.current?.close()}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" /></svg>
        </button>
      </div>
      {p && <DrawerBody key={p.slug} p={p} next={projects[(idx + 1) % projects.length]} onSelect={onSelect}
                        onDiscuss={(e: MouseEvent) => { e.preventDefault(); ref.current?.close(); setTimeout(() => document.getElementById('contact')?.scrollIntoView(), 80); }} />}
    </dialog>
  );
}

function DrawerBody({ p, next, onSelect, onDiscuss }: { p: Project; next: Project; onSelect: (s: string) => void; onDiscuss: (e: MouseEvent) => void }) {
    const photos = [...p.gallery.slice(1), p.gallery[0]];
  const [n, setN] = useState(photos.length - 1);
  const facts: [string, string | undefined][] = [
    ['Client', p.client], ['Role', roleLabel[p.role]], ['Location', p.place], ['Year', p.when],
    ['Duration', p.duration], ['Status', p.statusText], ['Contract value', p.value],
  ];
     const g = photos[n];
  const last = photos.length - 1;
  const isDone = n === last;
  const label = isDone ? 'Completed' : `Step ${n + 1} of ${last}`;
  const go = (d: number) => setN(i => Math.min(last, Math.max(0, i + d)));
  return (
    <div className="dr-body">
      <div className="gallery">
        <div className="main">
                   <Image key={g.src} src={g.src} width={g.width} height={g.height} alt={`${p.title}, ${label}`}
                 sizes="(max-width: 820px) 100vw, 780px" style={{ background: g.bg }} priority />
          {photos.length > 1 && (
            <>
        {isDone && <span className="step-badge done">Completed ✓</span>}
              <button type="button" className="g-arrow prev" aria-label="Previous step" disabled={n === 0} onClick={() => go(-1)}>
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
              </button>
              <button type="button" className="g-arrow next" aria-label="Next step" disabled={isDone} onClick={() => go(1)}>
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
              </button>
            </>
          )}
        </div>
                {photos.length > 1 && (
          <div className="thumbs" role="group" aria-label="Photos">
            {photos.map((im, i) => (
              <button key={im.src} type="button" aria-label={i === photos.length - 1 ? 'Completed photo' : `Step ${i + 1} of ${photos.length - 1}`} aria-current={i === n} onClick={() => setN(i)}>
                <Image src={im.src} width={im.width} height={im.height} alt="" sizes="92px" style={{ background: im.bg }} />
                <span className="tn" aria-hidden="true">{i === last ? '✓' : i + 1}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="blocks sm"><span>{p.title}</span></h2>
        <p className="dr-sub">{p.sectorText} · {p.place}</p>
      </div>
      <p className="lede">{p.summary}</p>
      <dl className="titleblock facts">
        {facts.filter(([, v]) => v).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
      <div>
        <h3 className="minor">Scope</h3>
        <ul className="scope">{p.scope.map(s => <li key={s}>{s}</li>)}</ul>
      </div>
      <p className="role-note">{p.roleNote}</p>
      <div className="dr-actions">
        <Link className="btn btn-ink" href={`/projects/${p.slug}`}>Open project page</Link>
        <a className="chev" href="/#contact" onClick={onDiscuss}>Discuss a similar project <Chev /></a>
        <button className="chev next" type="button" onClick={() => onSelect(next.slug)}>Next: {next.title} <Chev /></button>
      </div>
    </div>
  );
}
