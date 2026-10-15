import Image from 'next/image';
import Link from 'next/link';
import { facts } from '@/lib/site-data';

export default function Intro({ projectCount }: { projectCount?: number }) {
  // "Project register" follows the number of published projects in Supabase; the other facts stay as written in site-data.ts
  const items = facts.map(f =>
    f.label === 'Project register' && projectCount !== undefined ? { ...f, value: String(projectCount) } : f,
  );
  return (
    <section className="section wrap" aria-labelledby="profile-h">
      <div className="intro">
        <div className="intro-copy">
          <h2 className="blocks" id="profile-h"><span>We are</span><span><em>Beaver</em> Builders</span></h2>
          <p className="lede">
            The beaver is nature’s most industrious builder. We bring the same commitment to every project we take on:
            precise, dedicated and finished on time.
          </p>
          <p>
            Our core team has worked in Maldivian construction since 1992. We began taking work in 2008, incorporated as
            Beaver Builders Pvt Ltd in 2016, and have grown from a specialist subcontractor into a established contractor
            trusted with government tenders, utility infrastructure and resort development.
          </p>
          {/* point this at your history page/section when you have one */}
          <Link className="chev" href="/#about">
            Our history
            <svg viewBox="0 0 22 12" aria-hidden="true">
              <path d="M1 1l7 5-7 5z" fill="currentColor" />
              <path d="M12.5 1.5l6 4.5-6 4.5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
                    </Link>

          <dl className="titleblock">
            {items.map(f => (
              <div key={f.label}><dt>{f.label}</dt><dd>{f.value}<small>{f.note}</small></dd></div>
            ))}
          </dl>
        </div>

        <div className="intro-media">
          <Image
            src="/we-are -beaver-builders updated.jpg" width={2016} height={2118} sizes="(max-width: 980px) 100vw, 45vw"
            alt="Beaver Builders hard hat held by a site worker in hi-vis" style={{ background: '#748a95' }}
          />
        </div>
      </div>
    </section>
  );
}