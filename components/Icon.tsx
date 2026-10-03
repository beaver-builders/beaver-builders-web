import type { IconName } from '@/lib/site-data';

const paths: Record<IconName, string> = {
  building: 'M4 21V4h11v17M15 9h5v12M4 21h16M8 8h3M8 12h3M8 16h3',
  ruler: 'M3 17 17 3l4 4L7 21l-4-4zM7 13l2 2M10 10l2 2M13 7l2 2',
  house: 'M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6',
  crane: 'M6 21V6M6 6h15M6 6 3 9M6 9l6-3M18 6v6M16 12h4v3h-4zM4 21h4',
  leaf: 'M5 19c0-8 4-13 14-14 0 10-5 14-13 14M5 19c3-5 6-8 10-10',
  shield: 'M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3zM9 12l2 2 4-4',
  people: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M16 5.5a3 3 0 0 1 0 5.5M18 14.5c1.8.8 3 2.7 3 5.5',
};

export default function Icon({ name, size = 28 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
