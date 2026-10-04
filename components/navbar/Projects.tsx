'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { projects, type Role } from '@/lib/site-data';

const roleLabel: Record<Role, string> = { direct: 'Direct award', sub: 'Subcontract', via: 'Via contractor' };
const filters = [
  { key: 'all', label: 'All projects' },
  { key: 'resort', label: 'Resorts' },
  { key: 'public', label: 'Government & public' },
  { key: 'utilities', label: 'Utilities' },
] as const;
type Filter = (typeof filters)[number]['key'];

const Chip = ({ status, label }: { status: string; label: string }) => (
  <span className={`chip ${status}`}>{label} <i /></span>
);

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all');
  const [ongoingOnly, setOngoingOnly] = useState(false);
  const [view, setView] = useState<'cards' | 'table'>('cards');

  const countOf = (f: Filter) => projects.filter(p => f === 'all' || p.tags.includes(f)).length;
  const ongoingCount = projects.filter(p => p.status === 'ongoing').length;
  const list = projects.filter(p => (filter === 'all' || p.tags.includes(filter)) && (!ongoingOnly || p.status === 'ongoing'));

  return (
    <section className="section wrap" id="projects" aria-labelledby="projects-h">
      <div className="section-head">
        <h2 className="blocks" id="projects-h"><span>Project</span><span>register</span></h2>
        <p>
          Fifteen projects, from resort lagoons to island powerhouses. Work before 2016 was delivered by our current team
          before incorporation, and every entry says whether we held the contract or worked under a main contractor.
        </p>
      </div>

      <div className="reg-controls">
        <div className="filters" role="group" aria-label="Filter by sector">
          {filters.map(f => (
            <button key={f.key} type="button" className="filter" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
              {f.label} <small>{countOf(f.key)}</small>
            </button>
          ))}
        </div>
        <button type="button" className="switch" aria-pressed={ongoingOnly} onClick={() => setOngoingOnly(o => !o)}>
          <i aria-hidden="true" />Ongoing only <small>{ongoingCount}</small>
        </button>
        <div className="view-toggle" role="group" aria-label="View">
          <button type="button" aria-pressed={view === 'cards'} onClick={() => setView('cards')}>Cards</button>
          <button type="button" aria-pressed={view === 'table'} onClick={() => setView('table')}>Table</button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{list.length} project{list.length === 1 ? '' : 's'} shown</p>

      {view === 'cards' ? (
        <div className="reg-grid">
          {list.map(p => (
            <Link key={p.slug} className="pcard" href={`/projects/${p.slug}`}>
              <div className="ph">
                <Image src={p.image.src} alt={p.title} width={p.image.width} height={p.image.height}
                       sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" style={{ background: p.image.bg }} />
                <Chip status={p.status} label={p.statusLabel} />
              </div>
              <div className="pc-body">
                <span className="pc-meta">{p.place} · {p.when}</span>
                <h3>{p.title}</h3>
                <p>{p.client}</p>
                <div className="pc-foot">
                  <span className={`role ${p.role}`}>{roleLabel[p.role]}</span>
                  {p.value && <span className="val">{p.value}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="ledger-wrap">
          <table className="ledger">
            <caption className="sr-only">Project register</caption>
            <thead>
              <tr>
                <th scope="col">Project</th><th scope="col">Location</th><th scope="col">Client / main contractor</th>
                <th scope="col">Role</th><th scope="col">Year</th><th scope="col">Value</th><th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map(p => (
                <tr key={p.slug}>
                  <th scope="row"><Link href={`/projects/${p.slug}`}>{p.title}</Link></th>
                  <td>{p.place}</td>
                  <td>{p.client}</td>
                  <td><span className={`role ${p.role}`}>{roleLabel[p.role]}</span></td>
                  <td className="num">{p.when}</td>
                  <td className="num">{p.value ?? '—'}</td>
                  <td><Chip status={p.status} label={p.statusLabel} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}