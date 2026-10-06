import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { projects, site } from '@/lib/site-data';
import { servicePages } from '@/lib/service-pages';
import Brand from '@/components/Brand';


type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicePages.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = servicePages.find(x => x.slug === slug);
  return s ? { title: `${s.title} | Services`, description: s.scope } : {};
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const idx = servicePages.findIndex(x => x.slug === slug);
  if (idx < 0) notFound();
  const s = servicePages[idx];
  const tel = `tel:${site.phone.replace(/\s/g, '')}`;
  const rows: [string, string][] = [['Scope', s.scope]];
  if (s.for) rows.push(['For', s.for]);
  if (s.delivered) rows.push(['Delivered', s.delivered]);

  return (
    <>
      <header className="svc-hero shell dark">
        <Image className="lw-bg" src="/brand/linework-light.svg" alt="" width={1999} height={1048} unoptimized priority />
        <Navbar variant="hero" />

        <div className="svc-hero-in">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/#services">Services</Link> / {s.title}</nav>

          <div className="sign">
            <div className="sign-bar">
                <Brand />
              <span>Discipline {idx + 1} of {servicePages.length}</span>
            </div>
            <div className="sign-body">
              <div className="sign-row sign-main">
                <span className="sign-k">Service</span>
                <h1>{s.title}</h1>
                <svg className="sign-ico" aria-hidden="true"><use href={`/icons.svg#${s.icon}`} /></svg>
              </div>
              {rows.map(([k, v]) => (
                <div className="sign-row" key={k}><span className="sign-k">{k}</span><p>{v}</p></div>
              ))}
              <div className="sign-row"><span className="sign-k">Contractor</span><p className="strong">{site.name} Pvt Ltd</p></div>
              <div className="sign-row"><span className="sign-k">Registration</span><p className="strong">C-0629/2016</p></div>
              <div className="sign-row sign-enq">
                <span className="sign-k">Enquiries</span>
                <div>
                  <Link className="btn btn-lime" href="/#contact" data-service={s.formService}>{s.enquiry}</Link>
                  <a href={tel}>{site.phone}</a>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="posts" aria-hidden="true"><i /><i /></div>
        </div>

        <nav className="svc-tabs" aria-label="Services">
          {servicePages.map((t, i) => (
            <Link key={t.slug} href={`/services/${t.slug}`} aria-current={t.slug === s.slug ? 'page' : undefined}>
              <b>{String(i + 1).padStart(2, '0')}</b> {t.title}
            </Link>
          ))}
        </nav>
      </header>

      {s.items && (
        <section className="section wrap" aria-labelledby="scope-h">
          <div className="section-head">
            <h2 className="blocks" id="scope-h"><span>Scope of</span><span>works</span></h2>
            {s.intro && <p>{s.intro}</p>}
          </div>
          <div className="ledger-wrap">
            <table className="ledger scope-table">
              <caption className="sr-only">Scope of works for {s.title}</caption>
              <thead>
                <tr><th scope="col">Item</th><th scope="col">Scope</th><th scope="col">What it covers</th><th scope="col">Delivered on</th></tr>
              </thead>
              <tbody>
                {s.items.map(it => (
                  <tr key={it.code}>
                    <td className="code">{it.code}</td>
                    <th scope="row">{it.name}</th>
                    <td>{it.covers}</td>
                    <td>
                      <ul className="chips">
                        {it.projects.map(ps => {
                          const p = projects.find(x => x.slug === ps);
                          return p ? <li key={ps}><Link className="chip" href={`/projects/${ps}`}>{p.title}</Link></li> : null;
                        })}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {s.steps && (
        <section className="section wrap job-sec" aria-labelledby="job-h">
          <div className="section-head">
            <h2 className="blocks" id="job-h"><span>How a job</span><span>runs</span></h2>
          </div>
          <div className="job-tape" aria-hidden="true" />
          <ol className="job-steps">
            {s.steps.map((st, i) => (
              <li key={st.title}><b>{String(i + 1).padStart(2, '0')}</b><h3>{st.title}</h3><p>{st.text}</p></li>
            ))}
          </ol>
        </section>
      )}
    </>
  );
}