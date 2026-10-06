import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/site-data';
import { roleLabel } from '@/lib/project-details';

/** Same card as the project register, as a plain link to /projects/<slug>. */
export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link className="pcard" href={`/projects/${p.slug}`}>
      <div className="ph">
        <Image src={p.image.src} alt={p.title} width={p.image.width} height={p.image.height}
               sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" style={{ background: p.image.bg }} />
        <span className={`chip ${p.status}`}>{p.statusLabel} <i /></span>
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
  );
}