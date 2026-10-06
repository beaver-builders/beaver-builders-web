export const site = {
  name: 'Beaver Builders',
  tagline: 'Build better, shape tomorrow.',
  description: 'Beaver Builders: building with purpose, precision and quality.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  email: 'info@beaver.mv',
  phone: '+960 778 3137',
  addressLines: ['H. Fusthulhaamaage, 7th Floor', 'Ameeru Ahmed Magu', 'Malé 20030, Maldives'],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Fusthulhaamaage%2C+Ameer+Ahmed+Magu%2C+Mal%C3%A9',
  logo: '/brand/logo.png',
};

export const nav = [
  { href: '/#services', label: 'Services' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export type IconName = 'building' | 'ruler' | 'house' | 'crane' | 'leaf' | 'shield' | 'people';

export type Service = {
  title: string; icon: string; text: string; cta: string; href: string;
  image?: { src: string; alt: string; width: number; height: number };
  service?: string;
  points?: string[];
};


export const services: Service[] = [
  { title: 'Construction', icon: 'i-trowel', cta: 'Construction services', href: '/services/construction',
    text: 'From complex island resorts to single-storey utility buildings: structure, finishes and marine works, delivered to programme.',
    points: ['Resort and hospitality', 'Government and public buildings', 'Powerhouses and utility compounds', 'Breakwaters, revetments and dredging'],
    image: { src: '/consultancy.jpeg', alt: 'Construction work on site', width: 1150, height: 864 } },
  { title: 'Consultancy', icon: 'i-pen-tool', cta: 'Consultancy services', href: '/services/consultancy',
    text: 'Project management consultancy from qualified engineers: one clear view of cost, programme and quality.',
    image: { src: '/services 1.jpeg', alt: 'Project management consultancy on site', width: 722, height: 434 } },
  { title: 'Real estate', icon: 'i-houses', cta: 'Real estate', href: '/services/real-estate',
    text: 'Development and management of key real-estate projects that add lasting value for local communities.',
    image: { src: '/services 3.jpg', alt: 'Real-estate development project', width: 1200, height: 800 } },
  { title: 'Rentals', icon: 'i-crane-small', cta: 'Equipment rentals', href: '/services/rentals',
    text: 'Rental and servicing of the construction equipment island projects depend on.',
    image: { src: '/services 2.JPG', alt: 'Construction equipment on site', width: 732, height: 548 } },
  { title: 'Trading', icon: 'i-truck', cta: 'Trading and supply', href: '/services/trading',
    text: 'Sourcing and logistics for construction and engineering supplies, for our own sites and for other contractors.',
    image: { src: '/services 4.jpg', alt: 'Construction and engineering supplies', width: 1200, height: 800 } },
    
];

export type Role = 'direct' | 'sub' | 'via';
export type Project = {
  slug: string; title: string; place: string;
  when: string;               // year shown on the card: 'Ongoing', '2016', '2018–2019'
  client: string; role: Role;
  tags: string[];            
  status: 'ongoing' | 'complete' | 'started'; statusLabel: string; // statusLabel is the text on the badge
  value?: string;
  image: { src: string; width: number; height: number; bg: string }; // bg = placeholder colour while loading
};

export const projects: Project[] = [
  { slug: 'hithadhoo-housing', title: '200 Social Housing Units', place: 'S. Hithadhoo, Addu City', when: 'Ongoing', client: 'Ministry of Finance', role: 'direct',
    tags: ['public'], status: 'ongoing', statusLabel: 'Ongoing', value: 'MVR 214.8 million',
    image: { src: '/hithadhoo-housing.webp', width: 1194, height: 672, bg: '#6d726e' } },
  { slug: 'seaplane-terminal', title: 'Seaplane Terminal Upgrade', place: 'Velana International Airport, Hulhulé', when: 'Ongoing', client: 'Island Aviation Services Ltd', role: 'direct',
    tags: ['aviation', 'public'], status: 'ongoing', statusLabel: 'Ongoing',
    image: { src: '/seaplane-terminal.webp', width: 1192, height: 657, bg: '#64676d' } },
  { slug: 'st-regis-maldives', title: 'St. Regis Maldives', place: 'Vommuli Island, Dhaalu Atoll', when: '2016', client: 'Leo Trading Pvt Ltd (main contractor)', role: 'sub',
    tags: ['resort', 'marine'], status: 'complete', statusLabel: 'Completed',
    image: { src: '/st-regis-maldives.webp', width: 1194, height: 632, bg: '#829da2' } },
  { slug: 'six-senses-laamu', title: 'Six Senses Laamu', place: 'Olhuveli Island, Laamu Atoll', when: '2009', client: 'Coral Gate Pvt Ltd (main contractor)', role: 'sub',
    tags: ['resort', 'marine'], status: 'complete', statusLabel: 'Completed',
    image: { src: '/six-senses-laamu.webp', width: 1561, height: 1172, bg: '#71a5ad' } },
  { slug: 'kandima-maldives', title: 'Kandima Maldives', place: 'Kudavillingili, Dhaalu Atoll', when: '2015', client: 'Sas E Construction Pvt Ltd (main contractor)', role: 'sub',
    tags: ['resort'], status: 'complete', statusLabel: 'Completed',
    image: { src: '/kandima-maldives.webp', width: 1532, height: 1149, bg: '#5c6059' } },
  { slug: 'rihiveli-beach-resort', title: 'Rihiveli Beach Resort', place: 'South Malé Atoll', when: '2012', client: 'Acmes Power Building Services, Singapore', role: 'via',
    tags: ['resort'], status: 'complete', statusLabel: 'Completed',
    image: { src: '/rihiveli-beach-resort.webp', width: 1518, height: 1141, bg: '#616e66' } },
  { slug: 'one-and-only-reethi-rah', title: 'One & Only Reethi Rah', place: 'North Malé Atoll', when: '2018–2019', client: 'Sas E Construction Pvt Ltd', role: 'via',
    tags: ['resort', 'utilities'], status: 'complete', statusLabel: 'Completed',
    image: { src: '/one-and-only-reethi-rah.webp', width: 671, height: 466, bg: '#777b7e' } },
  { slug: 'fonadhoo-mosque', title: 'L. Fonadhoo Mosque', place: 'Fonadhoo, Laamu Atoll', when: '2016', client: 'Amin Constructions Pvt Ltd (main contractor)', role: 'sub',
    tags: ['public'], status: 'complete', statusLabel: 'Completed',
    image: { src: '/fonadhoo-mosque.webp', width: 1532, height: 1151, bg: '#949a89' } },
  { slug: 'feydhoo-school', title: 'S. Feydhoo School', place: 'Feydhoo, Addu City', when: '2018', client: 'Amin Construction Pvt Ltd (main contractor)', role: 'sub',
    tags: ['education', 'public'], status: 'complete', statusLabel: 'Completed',
    image: { src: '/feydhoo-school.webp', width: 1198, height: 720, bg: '#7a7b6a' } },
  { slug: 'meedhoo-school', title: 'S. Meedhoo School', place: 'Meedhoo, Addu City', when: '2018', client: 'Amin Construction Pvt Ltd (main contractor)', role: 'sub',
    tags: ['education', 'public'], status: 'complete', statusLabel: 'Completed',
    image: { src: '/meedhoo-school.webp', width: 974, height: 731, bg: '#5f6270' } },
  { slug: 'eydhafushi-powerhouse', title: 'B. Eydhafushi Powerhouse', place: 'Eydhafushi, Baa Atoll', when: '2019–2020', client: 'Fenaka Corporation Ltd', role: 'direct',
    tags: ['utilities', 'public'], status: 'complete', statusLabel: 'Completed',
    image: { src: '/eydhafushi-powerhouse.webp', width: 1065, height: 751, bg: '#6b7790' } },
  { slug: 'veyvah-powerhouse', title: 'M. Veyvah Office & Powerhouse', place: 'Veyvah, Meemu Atoll', when: '2019–2021', client: 'Fenaka Corporation Ltd', role: 'direct',
    tags: ['utilities', 'public'], status: 'complete', statusLabel: 'Completed',
    image: { src: '/veyvah-powerhouse.webp', width: 662, height: 496, bg: '#808a92' } },
  { slug: 'kurendhoo-powerhouse', title: 'Lh. Kurendhoo Office & Powerhouse', place: 'Kurendhoo, Lhaviyani Atoll', when: '2020', client: 'Fenaka Corporation Ltd', role: 'direct',
    tags: ['utilities', 'public'], status: 'started', statusLabel: 'Awarded 2020',
    image: { src: '/kurendhoo-powerhouse.webp', width: 1065, height: 799, bg: '#989ea6' } },
  { slug: 'kudahuvadhoo-office', title: 'Dh. Kudahuvadhoo Office', place: 'Kudahuvadhoo, Dhaalu Atoll', when: '2021', client: 'Fenaka Corporation Ltd', role: 'direct',
    tags: ['utilities', 'public'], status: 'started', statusLabel: 'Started Nov 2021',
    image: { src: '/kudahuvadhoo-office.webp', width: 993, height: 449, bg: '#8f9296' } },
  { slug: 'landhoo-office', title: 'N. Landhoo Office', place: 'Landhoo, Noonu Atoll', when: '2022', client: 'Fenaka Corporation Ltd', role: 'direct',
    tags: ['utilities', 'public'], status: 'started', statusLabel: 'Started Nov 2022',
    image: { src: '/landhoo-office.webp', width: 876, height: 658, bg: '#a4a6a7' } },
];


export const stats = [ 
  { value: '00+', label: 'Years in business' },
  { value: '00', label: 'Projects delivered' },
  { value: '00', label: 'Team members' },
  { value: '00', label: 'Sites worked on' },
];


export const vm = [
  { label: 'Vision', text: 'To lead innovation in Maldivian construction and set the standard for sustainable excellence.' },
  { label: 'Mission', text: 'We craft exceptional construction solutions while championing integrity and innovation.' },
];

export const values = [
  { title: 'Integrity', text: 'We hold honesty and transparency in the highest regard. Trust is the cornerstone of every partnership we build.' },
  { title: 'Esteem', text: 'We build a real sense of accomplishment in every team member, for every task, whatever their role.' },
  { title: 'Well-being', text: 'We aim to make every task one people can enjoy. Joy in work leads to healthier lives and more achievement.' },
];


export const clients = [
  'Ministry of Finance', 'Island Aviation Services', 'Fenaka Corporation', 'Six Senses Laamu', 'St. Regis Maldives',
  'One & Only Reethi Rah', 'Kandima Maldives', 'Rihiveli Beach Resort', 'Amin Construction',
];


export const facts = [
  { label: 'Company reg.', value: 'C-0629', note: 'Incorporated 2016' },
  { label: 'Team experience', value: '34 years', note: 'On site since 1992' },
  { label: 'Head office', value: 'Malé', note: 'Ameeru Ahmed Magu' },
  { label: 'Disciplines', value: '5', note: 'Under one roof' },
  { label: 'Project register', value: '15', note: 'Addu to Noonu' },
  { label: 'Largest live contract', value: 'MVR 214.8m', note: 'Social housing' },
];

export type TimelineEvent = { year: string; at?: number; side: 'up' | 'down'; text: string; now?: boolean };

// `at` positions the event on the tape (the tape runs 1990 to 2027). The "Today" event is pinned to the right edge.
export const timeline: TimelineEvent[] = [
  { year: '1992', at: 1992, side: 'up', text: 'Our core team starts work in Maldivian construction.' },
  { year: '2008', at: 2008, side: 'down', text: 'Informal operations begin, taking on specialist work.' },
  { year: '2009', at: 2009, side: 'up', text: 'The team places 54 water villas at Six Senses Laamu.' },
  { year: '2016', at: 2016, side: 'down', text: 'Beaver Builders Pvt Ltd is incorporated (C-0629/2016).' },
  { year: '2019', at: 2019, side: 'up', text: 'First direct awards from Fenaka; a sustainability policy follows in 2020.' },
  { year: 'Today', side: 'down', now: true, text: 'Social housing in Hithadhoo and the Velana seaplane terminal under way.' },
];


export const careRoles = ['Site engineering', 'Project management', 'Quantity surveying', 'Logistics', 'Plant operation', 'Skilled trades'];
export const serviceOptions = ['Not sure yet', 'Construction', 'Consultancy', 'Real estate', 'Equipment rental', 'Trading'];