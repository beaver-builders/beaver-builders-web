import Image from 'next/image';
import QuoteForm from '../QuoteForm';
import { site } from '@/lib/site-data';

const Ico = ({ id }: { id: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><use href={`/icons.svg#${id}`} /></svg>
);

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h">
      <div className="shell contact-shell dark">
        <Image className="lw-bg" src="/brand/linework-light.svg" alt="" width={1999} height={1048} unoptimized />
        <div className="contact-info">
          <h2 className="blocks inv" id="contact-h"><span>Reach us</span><span>to begin</span></h2>
          <address>
            {site.name} Pvt Ltd
            {site.addressLines.map(l => <span key={l}><br />{l}</span>)}
          </address>
          <ul className="contact-list">
            <li><a href={`tel:${site.phone.replace(/\s/g, '')}`}><Ico id="phone" />{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`}><Ico id="mail" />{site.email}</a></li>
            <li><a href={site.mapsUrl} target="_blank" rel="noopener noreferrer"><Ico id="pin" />Open in Maps</a></li>
          </ul>
          <p className="tender-note">
            Tendering or pricing from drawings? Email the documents or BOQ to{' '}
            <a href={`mailto:${site.email}?subject=Tender%20documents`}>{site.email}</a>.
          </p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}