import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/lib/types';

const Chev = () => (
  <svg viewBox="0 0 22 12" aria-hidden="true"><use href="/icons.svg#chev" /></svg>
);
const Ico = ({ id, className = 'svc-ico' }: { id: string; className?: string }) => (
  <svg className={className} aria-hidden="true"><use href={`/icons.svg#${id}`} /></svg>
);

function Row({ s }: { s: Service }) {
  return (
    <article className="svc-row">
      <div className="svc-media">
        {s.homeImage ? (
          <Image src={s.homeImage.src} alt={s.homeImage.alt} width={s.homeImage.width} height={s.homeImage.height} sizes="160px" />
        ) : (
          <div className="svc-tile"><Ico id={s.icon} className="" /></div>
        )}
      </div>
      <div className="svc-text">
        <h3><Ico id={s.icon} /><Link href={`/services/${s.slug}`}>{s.title}</Link></h3>
        <p>{s.homeText}</p>
        <Link className="chev" href={`/services/${s.slug}`}>{s.homeCta} <Chev /></Link>
      </div>
    </article>
  );
}

export default function Services({ services }: { services: Service[] }) {
  const [feature, ...rows] = services;
  if (!feature) return null;
  return (
    <section id="services" aria-labelledby="services-h">
      <div className="shell services-shell dark">
        <Image className="lw-bg" src="/brand/linework-light.svg" alt="" width={1999} height={1048} unoptimized />
        <div className="section-head">
          <h2 className="blocks inv" id="services-h"><span>Five disciplines,</span><span>one contractor</span></h2>
          <p>
            Island projects need more than a builder. We keep construction, project management, property, plant and
            supplies under one roof, so a job in the atolls has fewer hand-offs and one team answerable for it.
          </p>
        </div>

        <div className="svc-layout">
          <article className="svc-feature">
            {feature.homeImage && (
              <Image src={feature.homeImage.src} alt={feature.homeImage.alt} width={feature.homeImage.width} height={feature.homeImage.height}
                     sizes="(max-width: 980px) 100vw, 46vw" />
            )}
            <div className="svc-feature-body">
              <h3><Ico id={feature.icon} /><Link href={`/services/${feature.slug}`}>{feature.title}</Link></h3>
              <p>{feature.homeText}</p>
              <ul>{feature.homePoints.map(p => <li key={p}>{p}</li>)}</ul>
              <Link className="chev" href={`/services/${feature.slug}`}>{feature.homeCta} <Chev /></Link>
            </div>
          </article>
          <div className="svc-list">{rows.map(s => <Row key={s.slug} s={s} />)}</div>
        </div>
      </div>
    </section>
  );
}
