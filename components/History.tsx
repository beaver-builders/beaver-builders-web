import Image from 'next/image';
import { timeline } from '@/lib/site-data';

const START = 1990, SPAN = 37;
const pct = (year: number) => `${(((year - START) / SPAN) * 100).toFixed(2)}%`;
const years = Array.from({ length: SPAN + 1 }, (_, i) => START + i);

export default function History() {
  return (
    <section className="section wrap history-sec" id="about" aria-labelledby="about-h">
      <div className="history">
        <Image
          src="/site-history.webp" width={1500} height={967} sizes="(max-width: 980px) 100vw, 45vw"
          alt="An island workshop with a thatched roof, from the early years" style={{ background: '#808080' }}
        />
        <div className="history-copy">
          <h2 className="blocks" id="about-h"><span>Our</span><span>history</span></h2>
          <p>Our core team has been in the construction industry since 1992, and we began taking on work informally in 2008.</p>
          <p>
            Since incorporating Beaver Builders Pvt Ltd in 2016, we have grown from a humble subcontractor into a established
            contractor working to modern practice, and we now compete for major government tenders.
          </p>
          <p>In 2020 we committed to sustainable construction, and we kept every project moving through the challenges of the COVID years.</p>
        </div>
      </div>

      <div className="tape" role="group" aria-label="Timeline, 1992 to today">
        <div className="tape-scroll" tabIndex={0}>
          <div className="tape-inner">
            {timeline.map(e => (
              <div key={e.year} className={`ev ${e.side}${e.now ? ' now' : ''}`}
                   style={e.at ? { left: pct(e.at) } : { right: '2.70%' }}>
                <b>{e.year}</b>{e.text}
              </div>
            ))}
            <div className="tape-bar" aria-hidden="true">
              <div className="ticks">
                {years.map(y => {
                  const major = y === START || y % 5 === 0;
                  return (
                    <span key={y}>
                      <span className={`t${major ? ' major' : ''}`} style={{ left: pct(y) }} />
                      {major && y !== START && <span className="lbl" style={{ left: pct(y) }}>{y}</span>}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}