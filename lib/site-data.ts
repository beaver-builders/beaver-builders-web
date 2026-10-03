export const site = {
  name: 'Beaver Builders',
  tagline: 'Build better, shape tomorrow.',
  description: 'Beaver Builders: building with purpose, precision and quality.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  email: 'info@example.com',          // PLACEHOLDER
  phone: '+000 000 0000',             // PLACEHOLDER
  address: 'Your street, City',       // PLACEHOLDER
  mapsUrl: '',                        // PLACEHOLDER: Google Maps link (optional)
};

export const nav = [
  { href: '/#services', label: 'Services' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export type IconName = 'building' | 'ruler' | 'house' | 'crane' | 'leaf' | 'shield' | 'people';

export const services: { title: string; text: string; icon: IconName; cta: string }[] = [
  { title: 'Construction', icon: 'building', cta: 'See our projects',
    text: 'Residential, commercial and public buildings, delivered on programme from foundations to handover.' },
  { title: 'Consultancy', icon: 'ruler', cta: 'Ask about consultancy',
    text: 'Project management from qualified engineers: one clear view of cost, programme and quality.' },
  { title: 'Real estate', icon: 'house', cta: 'Talk to us',
    text: 'Development and management of projects that add lasting value for the communities around them.' },
  { title: 'Equipment & supply', icon: 'crane', cta: 'Enquire about equipment',
    text: 'Serviced construction equipment for hire, plus sourcing and logistics for materials.' },
];

export type Project = {
  slug: string; title: string; place: string; sector: 'Residential' | 'Commercial' | 'Public' | 'Infrastructure';
  status: 'Ongoing' | 'Completed'; year: string; client: string; summary: string; scope: string[];
  image?: string; // e.g. '/projects/tower-a.webp' (file in /public)
};

// PLACEHOLDER projects: replace with real ones.
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

export const stats = [ // PLACEHOLDER figures
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