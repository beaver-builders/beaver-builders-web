import Image from 'next/image';
import { vm, values } from '@/lib/site-data';

export default function Values() {
  return (
    <section id="values" aria-labelledby="values-h">
      <div className="values-shell">
        <Image className="lw-bg" src="/brand/linework-light.svg" alt="" width={1999} height={1048} unoptimized />
        <div className="section-head">
          <h2 className="blocks inv" id="values-h"><span>Build green,</span><span>craft dreams</span></h2>
          <p>Our values come from the traditional virtue of hard work. Long experience, careful planning and a can-do spirit made the brand.</p>
        </div>

        <div className="vm">
          {vm.map(v => (
            <div key={v.label}><h3>{v.label}</h3><p>{v.text}</p></div>
          ))}
        </div>

        <div className="values">
          {values.map(v => (
            <div className="value" key={v.title}><h3>{v.title}</h3><p>{v.text}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}