import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Brand from '@/components/Brand';
import ProjectCard from '@/components/ProjectCard';
import { site } from '@/lib/site-data';
import { getProjects, getServices } from '@/lib/data';

type Params = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const runtime = "nodejs";

export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;

  const s = (await getServices()).find(
    x => x.slug === slug
  );

  return s
    ? {
        title: `${s.title} | Services`,
        description: s.scope,
      }
    : {};
}

const Chev = () => (
  <svg viewBox="0 0 22 12" aria-hidden="true">
    <use href="/icons.svg#chev" />
  </svg>
);

const Icon = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => (
  <svg className={className} aria-hidden="true">
    <use href={`/icons.svg#${id}`} />
  </svg>
);

export default async function ServicePage({
  params,
}: Params) {
  const { slug } = await params;

  const [servicePages, projects] = await Promise.all([
    getServices(),
    getProjects(),
  ]);

  const idx = servicePages.findIndex(
    x => x.slug === slug
  );

  if (idx < 0) {
    notFound();
  }

  const s = servicePages[idx];

  const tel = `tel:${site.phone.replace(/\s/g, '')}`;

  const hasDelivered = s.items.some(
    it => it.projects?.length
  );

  const built = s.built.slugs
    .map(sl =>
      projects.find(p => p.slug === sl)
    )
    .filter(
      (
        p
      ): p is NonNullable<typeof p> => !!p
    );

  const rows: {
    k: string;
    v: string;
    short?: boolean;
  }[] = [
    {
      k: 'Scope',
      v: s.scope,
    },
    {
      k: 'For',
      v: s.forWho,
    },
    {
      k: 'Delivered',
      v: s.delivered,
    },
    {
      k: 'Contractor',
      v: `${site.name} Pvt Ltd`,
      short: true,
    },
    {
      k: 'Registration',
      v: 'C-0629/2016',
      short: true,
    },
  ];

  return (
    <>
      <header className="svc-hero">
        <div className="shell svc-shell dark">
          <Image
            className="lw-bg"
            src="/brand/linework-light.svg"
            alt=""
            width={1999}
            height={1048}
            unoptimized
            priority
          />

          <Navbar variant="hero" />

          <div className="svc-in">
            <nav
              className="crumbs"
              aria-label="Breadcrumb"
            >
              <Link href="/#services">
                Services
              </Link>{' '}
              / {s.title}
            </nav>

            <div
              className="sign"
              key={s.slug}
            >
              <div className="signboard">
                <div className="sb-head">
                  <span className="sb-logo">
                    <Brand />
                  </span>

                  <span className="sb-num">
                    <Icon
                      id={s.icon}
                      className="sb-head-icon"
                    />
                    Discipline {idx + 1} of{' '}
                    {servicePages.length}
                  </span>
                </div>

                <div className="sb-body">
                  <div className="sb-title">
                    <span className="sb-label">
                      Service
                    </span>

                    <h1>{s.title}</h1>
                  </div>

                  <span className="sb-icon">
                    <Icon id={s.icon} />
                  </span>

                  <dl className="sb-rows">
                    {rows.map((r, i) => (
                      <div
                        key={r.k}
                        style={
                          {
                            '--n': i,
                          } as CSSProperties
                        }
                      >
                        <dt>{r.k}</dt>

                        <dd
                          className={
                            r.short
                              ? 'short'
                              : undefined
                          }
                        >
                          {r.v}
                        </dd>
                      </div>
                    ))}

                    <div
                      className="sb-enq"
                      style={
                        {
                          '--n': rows.length,
                        } as CSSProperties
                      }
                    >
                      <dt>Enquiries</dt>

                      <dd>
                        <Link
                          className="btn btn-lime"
                          href="/#contact"
                          data-service={
                            s.formService
                          }
                        >
                          {s.enquiry}
                        </Link>

                        <a
                          className="sb-tel"
                          href={tel}
                        >
                          {site.phone}
                        </a>

                        <a
                          className="sb-tel"
                          href={`mailto:${site.email}`}
                        >
                          {site.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div
                className="sb-posts"
                aria-hidden="true"
              >
                <i />
                <i />
              </div>
            </div>
          </div>

          <nav
            className="svc-tabs"
            aria-label="Disciplines"
          >
            {servicePages.map((t, i) => (
              <Link
                key={t.slug}
                href={`/services/${t.slug}`}
                aria-current={
                  t.slug === s.slug
                    ? 'page'
                    : undefined
                }
              >
                <b>
                  {String(i + 1).padStart(2, '0')}
                </b>
                {t.title}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="svc-page">
        <section
          className="section wrap svc-scope"
          aria-labelledby="scope-h"
        >
          <div className="svc-scope-head">
            <h2
              className="blocks sm"
              id="scope-h"
            >
              <span>Scope of</span>
              <span>works</span>
            </h2>

            <p className="lede">
              {s.intro}
            </p>
          </div>

          <div className="ledger-wrap">
            <table className="ledger schedule">
              <caption className="sr-only">
                {s.title}: scope of works
              </caption>

              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Scope</th>
                  <th scope="col">
                    What it covers
                  </th>

                  {hasDelivered && (
                    <th scope="col">
                      Delivered on
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {s.items.map(it => (
                  <tr key={it.code}>
                    <td className="num">
                      {it.code}
                    </td>

                    <th scope="row">
                      {it.name}
                    </th>

                    <td>{it.covers}</td>

                    {hasDelivered && (
                      <td className="refs">
                        <div className="refs-in">
                          {(it.projects ?? []).map(
                            ps => {
                              const p =
                                projects.find(
                                  x =>
                                    x.slug === ps
                                );

                              return p ? (
                                <Link
                                  key={ps}
                                  href={`/projects/${ps}`}
                                >
                                  {p.title}
                                </Link>
                              ) : null;
                            }
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {s.catalog && (
          <section
            className="section wrap svc-listings"
            aria-labelledby="list-h"
          >
            <div className="svc-scope-head">
              <h2
                className="blocks sm"
                id="list-h"
              >
                {s.catalog.title.map(l => (
                  <span key={l}>
                    {l}
                  </span>
                ))}
              </h2>

              {s.catalog.note && (
                <p className="example-note">
                  <b>
                    {s.catalog.note.lead}
                  </b>{' '}
                  {s.catalog.note.text}
                </p>
              )}
            </div>

            <div className="ledger-wrap">
              <table className="ledger listings">
                <caption className="sr-only">
                  {s.catalog.title.join(' ')}{' '}
                  (examples)
                </caption>

                <thead>
                  <tr>
                    {s.catalog.columns.map(
                      c => (
                        <th
                          scope="col"
                          key={c}
                        >
                          {c}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {s.catalog.rows.map(r => (
                    <tr
                      key={r.item}
                      className={
                        r.example
                          ? 'is-example'
                          : undefined
                      }
                    >
                      <th scope="row">
                        {r.item}

                        {r.example && (
                          <>
                            {' '}
                            <span className="ex-tag">
                              Example
                            </span>
                          </>
                        )}
                      </th>

                      {r.cells.map((c, i) => (
                        <td key={i}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section
          className="section wrap svc-method"
          aria-labelledby="method-h"
        >
          <h2
            className="blocks sm"
            id="method-h"
          >
            <span>How a job</span>
            <span>runs</span>
          </h2>

          <ol className="method">
            {s.steps.map((t, i) => (
              <li key={t}>
                <span className="m-n">
                  {String(i + 1).padStart(
                    2,
                    '0'
                  )}
                </span>

                <span className="m-t">
                  {t}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {built.length > 0 && (
          <section
            className="section wrap svc-related"
            aria-labelledby="rel-h"
          >
            <div className="svc-scope-head">
              <h2
                className="blocks sm"
                id="rel-h"
              >
                {s.built.title.map(l => (
                  <span key={l}>
                    {l}
                  </span>
                ))}
              </h2>

              <p>
                {s.built.intro}
              </p>
            </div>

            <div className="reg-grid">
              {built.map(p => (
                <ProjectCard
                  key={p.slug}
                  p={p}
                />
              ))}
            </div>

            {s.built.more && (
              <p className="svc-more">
                <Link
                  className="chev"
                  href="/#projects"
                >
                  {s.built.more}{' '}
                  <Chev />
                </Link>
              </p>
            )}
          </section>
        )}
      </div>
    </>
  );
}
