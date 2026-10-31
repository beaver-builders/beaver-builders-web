export const site = {
  name: 'Beaver Builders',
  tagline: 'Build better, shape tomorrow.',
  description: 'Beaver Builders: building with purpose, precision and quality.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  email: 'info@beaver.mv',
  phone: '+960 778 3137',
  addressLines: ['7th Floor', 'Fusthulhaamaage Ameer Ahmed Magu 20030', 'Malé City', 'Maldives'],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Fusthulhaamaage%2C+Ameer+Ahmed+Magu%2C+Mal%C3%A9',
  logo: '/optimized/brand/logo.webp',
};

export const nav = [
  { href: '/#services', label: 'Services' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

// Ticker under the hero
export const clients = [
  'Ministry of Finance', 'Island Aviation Services', 'Fenaka Corporation', 'Six Senses Laamu', 'St. Regis Maldives',
  'One & Only Reethi Rah', 'Kandima Maldives', 'Rihiveli Beach Resort', 'Amin Construction',
];

// "We are Beaver Builders" fact sheet
export const facts = [
  { label: 'Company reg.', value: 'C-0629', note: 'Incorporated 2016' },
  { label: 'Team experience', value: '34 years', note: 'On site since 1992' },
  { label: 'Head office', value: 'Malé', note: 'Ameer Ahmed Magu' },
  { label: 'Disciplines', value: '5', note: 'Under one roof' },
  { label: 'Project register', value: '15', note: 'Addu to Noonu' },
  { label: 'Largest live contract', value: 'MVR 214.8m', note: 'Social housing' },
];

// "Our history" timeline. `at` positions an event on the tape (1990 to 2027);
export type TimelineEvent = { year: string; at?: number; side: 'up' | 'down'; text: string; now?: boolean };

export const timeline: TimelineEvent[] = [
  { year: '1992', at: 1992, side: 'up', text: 'Our core team starts work in Maldivian construction.' },
  { year: '2008', at: 2008, side: 'down', text: 'Informal operations begin, taking on specialist work.' },
  { year: '2009', at: 2009, side: 'up', text: 'The team places 94 water villas at Six Senses Laamu.' },
  { year: '2016', at: 2016, side: 'down', text: 'Beaver Builders Pvt Ltd is incorporated (C-0629/2016).' },
  { year: '2019', at: 2019, side: 'up', text: 'First direct awards from Fenaka; a sustainability policy follows in 2020.' },
  { year: 'Today', side: 'down', now: true, text: 'Social housing in Hithadhoo under way.' },
];

// "Build green, craft dreams" panel
export const vm = [
  { label: 'Vision', text: 'To lead innovation in Maldivian construction and set the standard for sustainable excellence.' },
  { label: 'Mission', text: 'We craft exceptional construction solutions while championing integrity and innovation.' },
];

export const values = [
  { title: 'Integrity', text: 'We hold honesty and transparency in the highest regard. Trust is the cornerstone of every partnership we build.' },
  { title: 'Esteem', text: 'We build a real sense of accomplishment in every team member, for every task, whatever their role.' },
  { title: 'Well-being', text: 'We aim to make every task one people can enjoy. Joy in work leads to healthier lives and more achievement.' },
];

// "Join Team Beaver" chips
export const careRoles = ['Site engineering', 'Project management', 'Quantity surveying', 'Logistics', 'Plant operation', 'Skilled trades'];

// Service dropdown in the quote form
export const serviceOptions = ['Not sure yet', 'Construction', 'Consultancy', 'Real estate', 'Equipment rental', 'Trading'];

