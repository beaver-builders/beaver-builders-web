import Icon from '../Icon';
import { stats, values } from '../../lib/site-data';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <p className="eyebrow"><b>03</b> About</p>
        <div className="about-grid">
          <div>
            <h2 className="h2">Building with purpose, precision and quality</h2>
            <p className="lead">
              Beaver Builders is a construction company. Replace this paragraph with your company story: when you
              started, what you build, and what makes your team different.
            </p>
          </div>
          <dl className="stats">
            {stats.map(s => (
              <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
            ))}
          </dl>
        </div>
        <div className="values">
          {values.map(v => (
            <div className="value" key={v.title}>
              <span className="svc-ico"><Icon name={v.icon} size={24} /></span>
              <div><h3>{v.title}</h3><p>{v.text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
