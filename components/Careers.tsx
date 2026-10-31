import Image from 'next/image';
import { careRoles, site } from '@/lib/site-data';

export default function Careers() {
  return (
    <section className="section wrap" id="careers" aria-labelledby="careers-h">
      <div className="careers">
        <div className="careers-copy">
          <h2 className="blocks sm" id="careers-h"><span>Join</span><span>Team Beaver</span></h2>
          <p>
            Our core team brings qualified experience in construction, project management, engineering, logistics,
            trading and real estate. We continue to grow our team by welcoming capable people who bring their skills and energy.
          </p>
          <ul className="disciplines" aria-label="Disciplines we hire for">
            {careRoles.map(r => <li className="chip" key={r}>{r}</li>)}
          </ul>
          <a className="btn btn-ink" href={`mailto:${site.email}?subject=Careers%20at%20Beaver%20Builders`} style={{ justifySelf: 'start' }}>
            Send us your CV
          </a>
        </div>
        <Image src="/optimized/site-team.webp" width={3000} height={2000} sizes="(max-width: 980px) 100vw, 42vw"
               alt="Two engineers in hard hats shaking hands on site" style={{ background: '#70706f' }} />
      </div>
    </section>
  );
}