// Content for /services/<slug>. Every page: the signboard hero + tab strip, then these optional sections.
//   items    -> "Scope of works" table (rows with `projects` add a "Delivered on" column)
//   catalog  -> "Product lines" / "Equipment" / "Developments" table with Example tags and a dashed note
//   steps    -> "How a job runs" tape (titles only)
//   built    -> project cards from the register

export type ServiceItem = {
  code: string; name: string; covers: string;
  projects?: string[];   // project slugs (lib/site-data.ts), shown as links in a "Delivered on" column
};

export type Catalog = {
  title: string[];                          // heading lines, e.g. ['Product lines']
  note?: { lead: string; text: string };    // dashed box beside the heading
  columns: string[];                        // first column = item name
  rows: { item: string; example?: boolean; cells: string[] }[];
};

export type ServicePage = {
  slug: string; title: string;
  icon: string;          // symbol id in /public/icons.svg
  formService: string;   // value preselected in the contact form's Service select
  enquiry: string;       // button label on the sign
  scope: string; for: string; delivered: string;
  intro: string;         // paragraph beside "Scope of works"
  items: ServiceItem[];
  catalog?: Catalog;
  steps: string[];
  built: { title: string[]; intro: string; slugs: string[]; more?: string };
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
    steps: ['Survey and setting out', 'Piling and foundations', 'Structural frame', 'Envelope and services', 'Finishes and handover'],
    built: {
      title: ['Construction', 'projects'], intro: 'From our project register, with the client and our role on each.',
      slugs: ['hithadhoo-housing', 'seaplane-terminal', 'st-regis-maldives', 'six-senses-laamu', 'kandima-maldives', 'rihiveli-beach-resort'],
      more: 'See all 15 in the project register',
    },
  },
  {
    slug: 'consultancy', title: 'Consultancy', icon: 'i-pen-tool', formService: 'Consultancy', enquiry: 'Request a consultancy quote',
    scope: 'Project management consultancy: one clear view of cost, programme and quality.',
    for: 'Developers, resort owners and public clients running a build',
    delivered: '7 contracts awarded directly to us',
    intro: 'Our qualified engineers manage projects on the client’s side: planning the work, keeping cost and programme in view, and supervising quality on site. It is the same discipline we apply to our own contracts, offered to clients who want an experienced team in their corner.',
    items: [
      { code: 'P-01', name: 'Planning and cost', covers: 'Scope review and cost planning' },
      { code: 'P-02', name: 'Programme', covers: 'Construction programmes, sequencing for island logistics, progress tracking' },
      { code: 'P-03', name: 'Site supervision', covers: 'Quality inspection, contractor coordination, progress reporting' },
      { code: 'P-04', name: 'Handover', covers: 'Snagging, completion records and handover documentation' },
    ],
    steps: ['Brief and scope', 'Cost plan', 'Programme', 'Site supervision', 'Handover report'],
    built: {
      title: ['Delivered by', 'the same team'],
      intro: 'These are contracts awarded directly to Beaver Builders, run by the engineers who lead our consultancy work.',
      slugs: ['hithadhoo-housing', 'seaplane-terminal', 'eydhafushi-powerhouse', 'veyvah-powerhouse', 'kurendhoo-powerhouse', 'kudahuvadhoo-office'],
      more: 'See all 7 in the project register',
    },
  },
  {
    slug: 'real-estate', title: 'Real estate', icon: 'i-houses', formService: 'Real estate', enquiry: 'Request a real estate quote',
    scope: 'Development and management of real-estate projects that add lasting value.',
    for: 'Landowners, investors and island communities',
    delivered: 'Developments to be published',
    intro: 'We develop and manage key real-estate projects that add lasting value for local communities, bringing our construction team to the whole life of a property: from the site and the design brief through to building and management.',
    items: [
      { code: 'R-01', name: 'Development', covers: 'Site appraisal, design brief and delivery by our own construction team' },
      { code: 'R-02', name: 'Management', covers: 'Ongoing management of completed property' },
    ],
    catalog: {
      title: ['Developments'],
      note: { lead: 'Examples.', text: 'These rows show how the list will read. Beaver Builders will replace them with the real developments.' },
      columns: ['Development', 'Location', 'Status', 'Note'],
      rows: [
        { item: 'Residential development', example: true, cells: ['Island to be confirmed', 'Planning', 'Replace with a real Beaver development'] },
        { item: 'Commercial building', example: true, cells: ['Malé region', 'Planning', 'Replace with a real Beaver development'] },
      ],
    },
    steps: ['Site and appraisal', 'Design brief', 'Approvals', 'Construction', 'Management'],
    built: {
      title: ['Housing we', 'are building'],
      intro: 'Our 200 social housing units in Hithadhoo are a construction contract for the Ministry of Finance, shown here as the scale of housing our team delivers.',
      slugs: ['hithadhoo-housing'],
    },
  },
  {
    slug: 'rentals', title: 'Rentals', icon: 'i-crane-small', formService: 'Equipment rental', enquiry: 'Request a rentals quote',
    scope: 'Rental and servicing of construction equipment.',
    for: 'Contractors and resort teams working in the atolls',
    delivered: 'Equipment to be published',
    intro: 'We rent and service the construction equipment island projects depend on, so the work keeps moving. Tell us the job, the island and the dates, and we will confirm what is available.',
    items: [
      { code: 'H-01', name: 'Earthmoving', covers: 'Excavators for site clearance, trenching and foundations' },
      { code: 'H-02', name: 'Concrete', covers: 'Concrete pumping for slabs and frames' },
      { code: 'H-03', name: 'Lifting and access', covers: 'Lifting and scaffolding for building works' },
    ],
    catalog: {
      title: ['Equipment'],
      note: { lead: 'Examples.', text: 'These rows show how the list will read. Beaver Builders will replace them with the real equipment.' },
      columns: ['Item', 'Category', 'Status', 'Note'],
      rows: [
        { item: 'Crawler excavator', example: true, cells: ['Earthmoving', 'Ask for availability', 'Model and class to be confirmed'] },
        { item: 'Trailer concrete pump', example: true, cells: ['Concrete', 'Ask for availability', 'Model and output to be confirmed'] },
        { item: 'Scaffolding', example: true, cells: ['Access', 'Ask for availability', 'Quantity to be confirmed'] },
      ],
    },
    steps: ['Enquiry', 'Availability', 'Mobilisation', 'On hire', 'Return'],
    built: {
      title: ['Our own', 'sites'],
      intro: 'These are our own construction contracts, not rental hires. The rental equipment list is still to be published.',
      slugs: ['hithadhoo-housing', 'kudahuvadhoo-office', 'landhoo-office'],
    },
  },
  {
    slug: 'trading', title: 'Trading', icon: 'i-truck', formService: 'Trading', enquiry: 'Request a trading quote',
    scope: 'Sourcing and logistics for construction and engineering supplies.',
    for: 'Our own sites and other contractors across the Maldives',
    delivered: 'Product lines to be published',
    intro: 'We trade construction and engineering supplies and handle their logistics, for our own projects and for other contractors, so materials arrive when the programme needs them.',
    items: [
      { code: 'T-01', name: 'Sourcing', covers: 'Specification checks and supplier selection' },
      { code: 'T-02', name: 'Logistics', covers: 'Freight and delivery to site' },
    ],
    catalog: {
      title: ['Product lines'],
      note: { lead: 'Examples.', text: 'These rows show how the list will read. Beaver Builders will replace them with the real product lines.' },
      columns: ['Item', 'Category', 'Status', 'Note'],
      rows: [
        { item: 'HDPE pipe', example: true, cells: ['Water and drainage', 'Ask for a quote', 'Sizes and grades to be confirmed'] },
        { item: 'Power cable', example: true, cells: ['Electrical', 'Ask for a quote', 'Range to be confirmed'] },
        { item: 'Transformers', example: true, cells: ['Electrical', 'Ask for a quote', 'Range to be confirmed'] },
      ],
    },
    steps: ['Specification', 'Sourcing', 'Shipping', 'Delivery to site', 'Handover of goods'],
    built: {
      title: ['Utility projects', 'we built'],
      intro: 'Utility compounds we delivered as main contractor. They are construction contracts, not supply orders.',
      slugs: ['one-and-only-reethi-rah', 'eydhafushi-powerhouse', 'veyvah-powerhouse', 'kurendhoo-powerhouse', 'kudahuvadhoo-office', 'landhoo-office'],
    },
  },
];