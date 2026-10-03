import Link from 'next/link';
import Icon from '../Icon';
import { services } from '../../lib/site-data';

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <p className="eyebrow"><b>01</b> Services</p>
        <h2 className="h2">What we do</h2>
        <div className="svc-grid">
          {services.map(s => (
            <article className="svc" key={s.title}>
              <span className="svc-ico"><Icon name={s.icon} /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <Link className="chev" href={s.title === 'Construction' ? '/#projects' : '/#contact'}>{s.cta} <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
