import Image from 'next/image';
import Link from 'next/link';
import { facts } from '@/lib/site-data';

export default function Intro() {
  return (
    <section className="section wrap" id="about" aria-labelledby="profile-h">
      <div className="intro">
        <div className="intro-copy">
          <h2 className="blocks" id="profile-h"><span>We are</span><span><em>Beaver</em> Builders</span></h2>
          <p className="lede">
            The beaver is nature’s most industrious builder. We bring the same commitment to every project we take on:
            precise, dedicated and finished on time.
          </p>
          <p>
            Our core team has worked in Maldivian construction since 1992. We began taking work in 2008, incorporated as
            Beaver Builders Pvt Ltd in 2016, and have grown from a specialist subcontractor into a turnkey contractor
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
        </div>

        <div className="intro-media">
          <dl className="titleblock">
            {facts.map(f => (
              <div key={f.label}><dt>{f.label}</dt><dd>{f.value}<small>{f.note}</small></dd></div>
            ))}
          </dl>
          <Image
            src="/we-are-beaver-builders.jpg" width={1150} height={864} sizes="(max-width: 980px) 100vw, 45vw"
            alt="Water villa frames rising over the lagoon at Six Senses Laamu" style={{ background: '#748a95' }}
          />
        </div>
      </div>
    </section>
  );
}