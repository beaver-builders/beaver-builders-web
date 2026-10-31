import Image from 'next/image';

const Ico = ({ id }: { id: string }) => (
  <svg viewBox="0 0 40 40" aria-hidden="true"><use href={`/icons.svg#${id}`} /></svg>
);

export default function Care() {
  return (
    <section className="wrap" id="care" aria-labelledby="care-h">
      <div className="section-head">
        <h2 className="blocks" id="care-h"><span>We</span><span>care</span></h2>
        <p>
          We are committed to environmental stewardship and social inclusion: building in ways that shrink our
          footprint and leave the communities we work in better off.
        </p>
      </div>
      <div className="care">
        <div className="care-media">
          <Image src="/optimized/site-care.webp" width={2400} height={1600} sizes="(max-width: 980px) 100vw, 50vw"
                 alt="Hands holding a seedling" style={{ background: '#9a987a' }} />
        </div>
        <div className="care-panel">
          <div className="care-item">
            <Ico id="leaf" />
            <div>
              <h3>Sustainability</h3>
              <p>Our policies and site processes cut waste, favour clean energy and use resources efficiently.</p>
            </div>
          </div>
          <div className="care-item">
            <Ico id="access" />
            <div>
              <h3>PWD support</h3>
              <p>We support persons with disabilities through the Maldives Association of Disability, working for inclusion and empowerment.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}