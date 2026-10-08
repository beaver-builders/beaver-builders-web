import type { Role } from './site-data';

export const roleLabel: Record<Role, string> = { direct: 'Direct award', sub: 'Subcontract', via: 'Via contractor' };

export type Detail = {
  summary: string; scope: string[];
  roleNote: string;           // e.g. 'Awarded by Amin Constructions Pvt Ltd'
  duration?: string; statusText: string; sectorText: string;
  gallery: { src: string; width: number; height: number; bg: string }[]; // first image = cover
};

// Detail content for the project drawer and /projects/[slug] pages, keyed by project slug.
export const details: Record<string, Detail> = {
  'hithadhoo-housing': {
    summary: 'Two hundred durable, modern homes for families in Addu. The site works so far cover sheet-pile retaining, dewatering, excavation and foundations for the residential towers.',
    scope: ['200 apartment units across multi-storey residential blocks', 'Sheet-piled excavation and site dewatering', 'Foundations and superstructure'],
    roleNote: 'Awarded by the Ministry of Finance',
    statusText: 'Ongoing', sectorText: 'Government & public',
    gallery: [
      { src: '/projects/hithadhoo-housing-0.webp', width: 1194, height: 672, bg: '#6d726e' },
      { src: '/projects/hithadhoo-housing-1.webp', width: 732, height: 550, bg: '#918a85' },
      { src: '/projects/hithadhoo-housing-2.webp', width: 732, height: 550, bg: '#a08f82' },
      { src: '/projects/hithadhoo-housing-3.webp', width: 611, height: 459, bg: '#878480' },
      { src: '/projects/hithadhoo-housing-4.webp', width: 611, height: 459, bg: '#958f8f' },
    ],
  },
  'seaplane-terminal': {
    summary: 'An upgrade of the seaplane terminal at Velana International Airport: new arrival and departure lounges, check-in and a waterfront deck, built to raise the terminal’s operating capacity.',
    scope: ['Terminal building upgrade and new facade', 'Passenger lounges and check-in hall fit-out', 'Timber waterfront deck and landscaping'],
    roleNote: 'Awarded by Island Aviation Services Ltd',
    statusText: 'Ongoing', sectorText: 'Aviation · Government & public',
    gallery: [
      { src: '/projects/seaplane-terminal-0.webp', width: 1192, height: 657, bg: '#64676d' },
      { src: '/projects/seaplane-terminal-1.webp', width: 867, height: 491, bg: '#b89c7f' },
      { src: '/projects/seaplane-terminal-2.webp', width: 759, height: 429, bg: '#8e8067' },
      { src: '/projects/seaplane-terminal-3.webp', width: 719, height: 399, bg: '#97826d' },
      { src: '/projects/seaplane-terminal-4.webp', width: 718, height: 396, bg: '#625e52' },
    ],
  },
  'st-regis-maldives': {
    summary: 'Coastal protection and dredging for a luxury resort, carried out by an excavator working from a barge under engineer supervision.',
    scope: ['180 m breakwater', 'About 160 m of beach revetment', 'Dredging of a 70 m × 30 m supply jetty basin', 'Dredging of the dive-school lagoon'],
    roleNote: 'Subcontract to Leo Trading Pvt Ltd', duration: '4 months',
    statusText: 'Completed', sectorText: 'Resorts · Marine works',
    gallery: [
      { src: '/projects/st-regis-maldives-0.webp', width: 1194, height: 632, bg: '#829da2' },
      { src: '/projects/st-regis-maldives-1.webp', width: 732, height: 548, bg: '#6e9db5' },
      { src: '/projects/st-regis-maldives-2.webp', width: 717, height: 405, bg: '#5799b4' },
      { src: '/projects/st-regis-maldives-3.webp', width: 610, height: 457, bg: '#6d8c9b' },
    ],
  },
  'six-senses-laamu': {
    summary: 'Water-villa poles cast on site and 54 villas placed on a lagoon 3.5 metres deep, together with the resort’s main facility. Finished inside the one-year programme.',
    scope: ['Pole casting on site', '54 water villas on a 3.5 m deep lagoon', 'Main facility building'],
    roleNote: 'Subcontract to Coral Gate Pvt Ltd · delivered by the current Beaver team', duration: '1 year',
    statusText: 'Completed', sectorText: 'Resorts · Marine works',
    gallery: [
      { src: '/projects/six-senses-laamu-0.webp', width: 1561, height: 1172, bg: '#71a5ad' },
      { src: '/projects/six-senses-laamu-1.webp', width: 1150, height: 864, bg: '#75909d' },
      { src: '/projects/six-senses-laamu-2.webp', width: 1150, height: 864, bg: '#748a95' },
      { src: '/projects/six-senses-laamu-3.webp', width: 767, height: 576, bg: '#78746b' },
    ],
  },
  'kandima-maldives': {
    summary: 'Fourteen blocks of beach villas, four rooms per block. Reinforced-concrete frame, columns and slabs with blockwork walls, taken through to finishes within the one-year subcontract.',
    scope: ['12 villas 2 story  and 48 rooms', 'RC structure, columns and slabs', 'Blockwork walls and full finishing'],
    roleNote: 'Subcontract to Sas E Construction · delivered by the current Beaver team', duration: '1 year',
    statusText: 'Completed', sectorText: 'Resorts',
    gallery: [
      { src: '/projects/kandima-maldives-0.webp', width: 1532, height: 1149, bg: '#5c6059' },
      { src: '/projects/kandima-maldives-1.webp', width: 864, height: 1151, bg: '#676c71' },
      { src: '/projects/kandima-maldives-2.webp', width: 864, height: 1149, bg: '#5d554e' },
      { src: '/projects/kandima-maldives-3.webp', width: 864, height: 1151, bg: '#7a9193' },
    ],
  },
  'rihiveli-beach-resort': {
    summary: 'A 20-room senior staff accommodation block: aluminium prefabricated units assembled on a cast concrete slab, completed within the agreed four months.',
    scope: ['Concrete ground slab', 'Assembly of aluminium prefabricated structure', '20 staff rooms'],
    roleNote: 'Awarded by Acmes Power Building Services · delivered by the current Beaver team', duration: '4 months',
    statusText: 'Completed', sectorText: 'Resorts',
    gallery: [
      { src: '/projects/rihiveli-beach-resort-0.webp', width: 1518, height: 1141, bg: '#616e66' },
      { src: '/projects/rihiveli-beach-resort-1.webp', width: 877, height: 658, bg: '#8c8d89' },
      { src: '/projects/rihiveli-beach-resort-2.webp', width: 914, height: 685, bg: '#75704e' },
      { src: '/projects/rihiveli-beach-resort-3.webp', width: 665, height: 443, bg: '#5f6054' },
    ],
  },
  'one-and-only-reethi-rah': {
    summary: 'A new main powerhouse for the resort, from raft foundation to steel roof, delivered in six months.',
    scope: ['Reinforced raft foundation', 'Blockwork and RC frame', 'Steel roof structure and cladding'],
    roleNote: 'Awarded by Sas E Construction Pvt Ltd', duration: 'Sep 2018 – Feb 2019',
    statusText: 'Completed', sectorText: 'Resorts · Utilities',
    gallery: [
      { src: '/projects/one-and-only-reethi-rah-0.webp', width: 671, height: 466, bg: '#777b7e' },
      { src: '/projects/one-and-only-reethi-rah-1.webp', width: 953, height: 690, bg: '#5a5552' },
      { src: '/projects/one-and-only-reethi-rah-2.webp', width: 734, height: 413, bg: '#7a8592' },
      { src: '/projects/one-and-only-reethi-rah-3.webp', width: 619, height: 350, bg: '#5a5d51' },
      { src: '/projects/one-and-only-reethi-rah-4.webp', width: 538, height: 340, bg: '#778080' },
    ],
  },
  'fonadhoo-mosque': {
    summary: 'The complete construction of Fonadhoo’s mosque: a concrete frame of columns and slabs, blockwork walls, a domed prayer-hall ceiling and hand-detailed boundary walls.',
    scope: ['RC columns and slabs', 'Blockwork walls', 'Domed ceiling and decorative plasterwork', 'Boundary wall'],
    roleNote: 'Awarded by Amin Constructions Pvt Ltd', duration: '8 months',
    statusText: 'Completed', sectorText: 'Government & public',
    gallery: [
      { src: '/projects/fonadhoo-mosque-0.webp', width: 1532, height: 1151, bg: '#949a89' },
      { src: '/projects/fonadhoo-mosque-1.webp', width: 1150, height: 864, bg: '#80837c' },
      { src: '/projects/fonadhoo-mosque-2.webp', width: 1150, height: 864, bg: '#928f82' },
      { src: '/projects/fonadhoo-mosque-3.webp', width: 1150, height: 864, bg: '#adadac' },
    ],
  },
  'feydhoo-school': {
    summary: 'A four-storey school building with twelve classrooms and a hall.',
    scope: ['Four-storey RC building', '12 classrooms', 'School hall'],
    roleNote: 'Awarded by Amin Construction Pvt Ltd',
    statusText: 'Completed', sectorText: 'Education · Government & public',
    gallery: [
      { src: '/projects/feydhoo-school-0.webp', width: 1198, height: 720, bg: '#7a7b6a' },
      { src: '/projects/feydhoo-school-1.webp', width: 722, height: 434, bg: '#585253' },
      { src: '/projects/feydhoo-school-2.webp', width: 717, height: 405, bg: '#6e7475' },
      { src: '/projects/feydhoo-school-3.webp', width: 914, height: 685, bg: '#81796f' },
      { src: '/projects/feydhoo-school-4.webp', width: 603, height: 361, bg: '#626f6c' },
      { src: '/projects/feydhoo-school-5.webp', width: 717, height: 405, bg: '#7f7772' },
    ],
  },
  'meedhoo-school': {
    summary: 'A three-storey school block with four classrooms, an office, library, staff room, stage and toilets.',
    scope: ['Three-storey RC building', '4 classrooms, office, library and staff room', 'Stage and toilet block'],
    roleNote: 'Awarded by Amin Construction Pvt Ltd',
    statusText: 'Completed', sectorText: 'Education · Government & public',
    gallery: [
      { src: '/projects/meedhoo-school-0.webp', width: 974, height: 731, bg: '#5f6270' },
      { src: '/projects/meedhoo-school-1.webp', width: 717, height: 405, bg: '#7e7b73' },
      { src: '/projects/meedhoo-school-2.webp', width: 610, height: 457, bg: '#646462' },
      { src: '/projects/meedhoo-school-3.webp', width: 610, height: 457, bg: '#4e5d81' },
      { src: '/projects/meedhoo-school-4.webp', width: 610, height: 457, bg: '#64666a' },
      { src: '/projects/meedhoo-school-5.webp', width: 610, height: 457, bg: '#6b6b70' },
    ],
  },
  'eydhafushi-powerhouse': {
    summary: 'An extension to the island powerhouse, with a steel-trussed roof and a sealed generator-hall floor.',
    scope: ['Powerhouse extension building', 'Steel roof trusses', 'Sealed, line-marked generator hall floor'],
    roleNote: 'Awarded by Fenaka Corporation Ltd', duration: 'Oct 2019 – Oct 2020',
    statusText: 'Completed', sectorText: 'Utilities · Government & public',
    gallery: [
      { src: '/projects/eydhafushi-powerhouse-0.webp', width: 1065, height: 751, bg: '#6b7790' },
      { src: '/projects/eydhafushi-powerhouse-1.webp', width: 610, height: 457, bg: '#7e7a79' },
      { src: '/projects/eydhafushi-powerhouse-2.webp', width: 610, height: 457, bg: '#66635d' },
      { src: '/projects/eydhafushi-powerhouse-3.webp', width: 610, height: 430, bg: '#56596a' },
      { src: '/projects/eydhafushi-powerhouse-4.webp', width: 610, height: 457, bg: '#666664' },
      { src: '/projects/eydhafushi-powerhouse-5.webp', width: 761, height: 571, bg: '#68675e' },
    ],
  },
  'veyvah-powerhouse': {
    summary: 'A new utility compound: powerhouse, office block, chimney, boundary wall and fuel tank.',
    scope: ['Powerhouse building', 'Office block', 'Chimney and fuel tank', 'Boundary wall'],
    roleNote: 'Awarded by Fenaka Corporation Ltd', duration: 'Sep 2019 – Aug 2021',
    statusText: 'Completed', sectorText: 'Utilities · Government & public',
    gallery: [
      { src: '/projects/veyvah-powerhouse-0.webp', width: 662, height: 496, bg: '#808a92' },
      { src: '/projects/veyvah-powerhouse-1.webp', width: 760, height: 571, bg: '#7e858c' },
      { src: '/projects/veyvah-powerhouse-2.webp', width: 1194, height: 672, bg: '#787779' },
      { src: '/projects/veyvah-powerhouse-3.webp', width: 610, height: 457, bg: '#618159' },
      { src: '/projects/veyvah-powerhouse-4.webp', width: 458, height: 611, bg: '#76777b' },
    ],
  },
  'kurendhoo-powerhouse': {
    summary: 'A single-storey powerhouse and office building for Fenaka in Kurendhoo.',
    scope: ['Single-storey powerhouse', 'Office building'],
    roleNote: 'Awarded by Fenaka Corporation Ltd',
    statusText: 'Awarded 2020', sectorText: 'Utilities · Government & public',
    gallery: [
      { src: '/projects/kurendhoo-powerhouse-0.webp', width: 1065, height: 799, bg: '#989ea6' },
      { src: '/projects/kurendhoo-powerhouse-1.webp', width: 749, height: 422, bg: '#7f7c75' },
      { src: '/projects/kurendhoo-powerhouse-2.webp', width: 610, height: 457, bg: '#797983' },
      { src: '/projects/kurendhoo-powerhouse-3.webp', width: 898, height: 506, bg: '#7a756f' },
      { src: '/projects/kurendhoo-powerhouse-4.webp', width: 610, height: 457, bg: '#959391' },
    ],
  },
  'kudahuvadhoo-office': {
    summary: 'A single-storey customer office for Fenaka, from foundations to a finished interior.',
    scope: ['Single-storey office building', 'Steel roof structure', 'Interior fit-out'],
    roleNote: 'Awarded by Fenaka Corporation Ltd',
    statusText: 'Started Nov 2021', sectorText: 'Utilities · Government & public',
    gallery: [
      { src: '/projects/kudahuvadhoo-office-0.webp', width: 993, height: 449, bg: '#8f9296' },
      { src: '/projects/kudahuvadhoo-office-1.webp', width: 1065, height: 799, bg: '#918d8a' },
      { src: '/projects/kudahuvadhoo-office-2.webp', width: 760, height: 571, bg: '#787d7e' },
      { src: '/projects/kudahuvadhoo-office-3.webp', width: 610, height: 457, bg: '#969899' },
      { src: '/projects/kudahuvadhoo-office-4.webp', width: 760, height: 571, bg: '#6f716c' },
    ],
  },
  'landhoo-office': {
    summary: 'A single-storey office building for Fenaka in Landhoo.',
    scope: ['Site clearance and foundations', 'Blockwork and RC frame', 'Roof structure'],
    roleNote: 'Awarded by Fenaka Corporation Ltd',
    statusText: 'Started Nov 2022', sectorText: 'Utilities · Government & public',
    gallery: [
      { src: '/projects/landhoo-office-0.webp', width: 876, height: 658, bg: '#a4a6a7' },
      { src: '/projects/landhoo-office-1.webp', width: 732, height: 548, bg: '#979493' },
      { src: '/projects/landhoo-office-2.webp', width: 681, height: 512, bg: '#888480' },
      { src: '/projects/landhoo-office-3.webp', width: 584, height: 439, bg: '#605f5e' },
      { src: '/projects/landhoo-office-4.webp', width: 610, height: 457, bg: '#887f75' },
    ],
  },
};