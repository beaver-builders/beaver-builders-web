import Image from 'next/image';
import { site } from '@/lib/site-data';
export default function Brand({ onDark = true }: { onDark?: boolean }) {
  return (
    <span className={`brand-lockup ${onDark ? 'on-dark' : 'on-light'}`}>
      <Image src={site.logo} alt="" width={64} height={64} unoptimized />
      <span className="brand-name"><span>Beaver</span><span>Builders</span></span>
    </span>
  );
}