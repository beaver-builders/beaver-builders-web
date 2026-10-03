export const site = {
  name: 'Beaver Builders',
  tagline: 'Build better, shape tomorrow.',
  description: 'Beaver Builders: building with purpose, precision and quality.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  email: 'info@beaver.mv',          
  phone: '+960 778 3137',             
  address: 'Your street, City',       
  mapsUrl: '',                        
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
  points?: string[];
};


export const services: Service[] = [
  { title: 'Construction', icon: 'i-trowel', cta: 'See the project register', href: '/#projects',
    text: 'From complex island resorts to single-storey utility buildings: structure, finishes and marine works, delivered to programme.',
    points: ['Resort and hospitality', 'Government and public buildings', 'Powerhouses and utility compounds', 'Breakwaters, revetments and dredging'],
    image: { src: '/consultancy.jpeg', alt: 'Timber water-villa frame on cast poles in the Laamu lagoon', width: 1150, height: 864 } },
  { title: 'Consultancy', icon: 'i-pen-tool', cta: 'Ask about consultancy', href: '/#contact',
    text: 'Project management consultancy from qualified engineers: one clear view of cost, programme and quality.',
    image: { src: '/images/feydhoo-school-1.webp', alt: 'Reinforcement laid out for a slab pour at Feydhoo School', width: 722, height: 434 } },
  { title: 'Real estate', icon: 'i-houses', cta: 'Talk to us', href: '/#contact',
    text: 'Development and management of key real-estate projects that add lasting value for local communities.' },
  { title: 'Rentals', icon: 'i-crane-small', cta: 'Enquire about equipment', href: '/#contact',
    text: 'Construction equipment for hire, serviced and maintained, to keep island projects moving.',
    image: { src: '/images/landhoo-office-1.webp', alt: 'Beaver excavator clearing the Landhoo office site', width: 732, height: 548 } },
  { title: 'Trading', icon: 'i-truck', cta: 'Request supplies', href: '/#contact',
    text: 'Sourcing and logistics for construction and engineering supplies, for our own sites and for other contractors.' },
];

export type Project = {
  slug: string; title: string; place: string; sector: 'Residential' | 'Commercial' | 'Public' | 'Infrastructure';
  status: 'Ongoing' | 'Completed'; year: string; client: string; summary: string; scope: string[];
  image?: string;
};


export const projects: Project[] = [
  { slug: 'residential-block-a', title: '200 Social Housing Units', place: ' S. Hithadhoo, Addu City', sector: 'Residential', status: 'Ongoing', year: '2025',
    client: 'Client name', summary: 'The block above is drawn after this project, under construction now for the Ministry of Finance.',
    scope: ['Scope item one', 'Scope item two', 'Scope item three'] },
    
  { slug: 'office-building', title: 'Office Building', place: 'Location, Country', sector: 'Commercial', status: 'Completed', year: '2024',
    client: 'Client name', summary: 'A commercial office building delivered on time. Replace with real project details.',
    scope: ['Scope item one', 'Scope item two'] },
  { slug: 'community-school', title: 'Community School', place: 'Location, Country', sector: 'Public', status: 'Completed', year: '2023',
    client: 'Client name', summary: 'A multi-classroom school with a hall and sports court. Replace with real project details.',
    scope: ['Scope item one', 'Scope item two', 'Scope item three'] },
  { slug: 'harbour-works', title: 'Harbour Works', place: 'Location, Country', sector: 'Infrastructure', status: 'Completed', year: '2023',
    client: 'Client name', summary: 'Coastal protection and dredging works. Replace with real project details.',
    scope: ['Scope item one', 'Scope item two'] },
  { slug: 'staff-housing', title: 'Staff Housing', place: 'Location, Country', sector: 'Residential', status: 'Completed', year: '2022',
    client: 'Client name', summary: 'Accommodation blocks built to a tight schedule. Replace with real project details.',
    scope: ['Scope item one', 'Scope item two'] },
  { slug: 'power-station', title: 'Power Station Extension', place: 'Location, Country', sector: 'Infrastructure', status: 'Ongoing', year: '2025',
    client: 'Client name', summary: 'An extension to an existing powerhouse. Replace with real project details.',
    scope: ['Scope item one', 'Scope item two'] },
];


export const stats = [ 
  { value: '00+', label: 'Years in business' },
  { value: '00', label: 'Projects delivered' },
  { value: '00', label: 'Team members' },
  { value: '00', label: 'Sites worked on' },
];


export const values: { title: string; text: string; icon: IconName }[] = [
  { title: 'Sustainability', icon: 'leaf', text: 'Site processes that cut waste, favour clean energy and use resources efficiently.' },
  { title: 'Safety first', icon: 'shield', text: 'Every site briefed, equipped and supervised. Nobody gets hurt building our work.' },
  { title: 'Community', icon: 'people', text: 'We hire locally where we can and support the communities we build in.' },
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
