export type ServiceItem = {
  code: string;        // e.g. 'C-01'
  name: string;        // e.g. 'Resort and hospitality'
  covers: string;
  projects: string[];  // project slugs from lib/site-data.ts, shown as links
};

export type ServicePage = {
  slug: string; title: string;
  icon: string;          // symbol id in /public/icons.svg
  formService: string;   // value preselected in the contact form's Service select
  enquiry: string;       // button label on the sign
  scope: string;         // one-line scope shown on the sign
  for?: string; delivered?: string;
  intro?: string;        // paragraph beside "Scope of works"
  items?: ServiceItem[];
  steps?: { title: string; text: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: 'construction', title: 'Construction', icon: 'i-trowel', formService: 'Construction', enquiry: 'Request a construction quote',
    scope: 'Resorts, public buildings, utility compounds and marine works, from piling to handover.',
    for: 'Ministries, state companies, resort owners and main contractors',
    delivered: '15 projects, 2009 to today',
    intro: 'From complex island resorts to single-storey utility buildings, we deliver structure, finishes and marine works to programme. Our crews have cast water-villa poles in a 3.5-metre lagoon, built breakwaters from a barge and raised powerhouses on outer islands.',
    items: [
      { code: 'C-01', name: 'Resort and hospitality', covers: 'Water villas, beach villas, staff accommodation, main facilities',
        projects: ['six-senses-laamu', 'kandima-maldives', 'rihiveli-beach-resort', 'one-and-only-reethi-rah'] },
      { code: 'C-02', name: 'Government and public buildings', covers: 'Social housing, schools, mosques, an airport terminal',
        projects: ['hithadhoo-housing', 'seaplane-terminal', 'feydhoo-school', 'meedhoo-school', 'fonadhoo-mosque'] },
      { code: 'C-03', name: 'Powerhouses and utility compounds', covers: 'Powerhouses, offices, chimneys, fuel tanks, boundary walls',
        projects: ['eydhafushi-powerhouse', 'veyvah-powerhouse', 'kurendhoo-powerhouse', 'kudahuvadhoo-office', 'landhoo-office'] },
      { code: 'C-04', name: 'Marine works', covers: 'Breakwaters, revetments, dredging, lagoon foundations',
        projects: ['st-regis-maldives', 'six-senses-laamu'] },
    ],
    // Edit these descriptions to match how your jobs really run.
    steps: [
      { title: 'Survey and setting out', text: 'Site survey, levels and setting out from the drawings, before any ground is broken.' },
      { title: 'Piling and foundations', text: 'Piles, pile caps and ground beams, with dewatering and shoring where the lagoon or water table demands it.' },
      { title: 'Structural frame', text: 'Columns, slabs and walls cast and erected level by level.' },
      { title: 'Envelope and services', text: 'Walls, roofing and facades closed in, with mechanical, electrical and plumbing first-fix.' },
      { title: 'Finishes and handover', text: 'Finishes, testing and snagging, then handover with as-built records.' },
    ],
  },
  {
    slug: 'consultancy', title: 'Consultancy', icon: 'i-pen-tool', formService: 'Consultancy', enquiry: 'Ask about consultancy',
    scope: 'Project management consultancy from qualified engineers: one clear view of cost, programme and quality.',
    // TODO: add `for`, `delivered`, `intro`, `items`, `steps` from your consultancy page.
  },
  {
    slug: 'real-estate', title: 'Real estate', icon: 'i-houses', formService: 'Real estate', enquiry: 'Talk to us',
    scope: 'Development and management of key real-estate projects that add lasting value for local communities.',
    // TODO: add `for`, `delivered`, `intro`, `items`, `steps` from your real estate page.
  },
  {
    slug: 'rentals', title: 'Rentals', icon: 'i-crane-small', formService: 'Equipment rental', enquiry: 'Enquire about equipment',
    scope: 'Construction equipment for hire, serviced and maintained, to keep island projects moving.',
    // TODO: add `for`, `delivered`, `intro`, `items`, `steps` from your rentals page.
  },
  {
    slug: 'trading', title: 'Trading', icon: 'i-truck', formService: 'Trading', enquiry: 'Request supplies',
    scope: 'Sourcing and logistics for construction and engineering supplies, for our own sites and for other contractors.',
    // TODO: add `for`, `delivered`, `intro`, `items`, `steps` from your trading page.
  },
];