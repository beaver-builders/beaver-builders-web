import Image from 'next/image';
import Link from 'next/link';
import { services, type Service } from '@/lib/site-data';

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
        {s.image ? (
          <Image src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} sizes="160px" />
        ) : (
          <div className="svc-tile"><Ico id={s.icon} className="" /></div>
        )}
      </div>
      <div className="svc-text">
        <h3><Ico id={s.icon} />{s.title}</h3>
        <p>{s.text}</p>
     <Link className="chev" href={s.href} data-service={s.service}>{s.cta} <Chev /></Link>
      </div>
    </article>
  );
}

export default function Services() {
  const [feature, ...rows] = services;
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
            {feature.image && (
              <Image src={feature.image.src} alt={feature.image.alt} width={feature.image.width} height={feature.image.height}
                     sizes="(max-width: 980px) 100vw, 46vw" />
            )}
            <div className="svc-feature-body">
              <h3><Ico id={feature.icon} />{feature.title}</h3>
              <p>{feature.text}</p>
              <ul>{feature.points?.map(p => <li key={p}>{p}</li>)}</ul>
              <Link className="chev" href={feature.href}>{feature.cta} <Chev /></Link>
            </div>
          </article>
          <div className="svc-list">{rows.map(s => <Row key={s.title} s={s} />)}</div>
        </div>
      </div>
    </section>
  );
}