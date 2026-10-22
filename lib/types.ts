// Shapes used by the UI. The data itself comes from Supabase (see lib/data.ts).

export type Role = 'direct' | 'sub' | 'via';
export const roleLabel: Record<Role, string> = { direct: 'Direct award', sub: 'Subcontract', via: 'Via contractor' };

export type Img = { src: string; width: number; height: number; bg: string };

export type Project = {
  slug: string; title: string; place: string;
  when: string;               // year shown on the card: 'Ongoing', '2016', '2018–2019'
  client: string; role: Role; 
  tags: string[];             // register filters: resort | public | utilities (+ aviation, marine, education)
  status: 'ongoing' | 'complete' | 'started'; statusLabel: string;
  value?: string;
  image: Img;                 // card image
  summary: string; scope: string[]; roleNote: string;
  duration?: string; statusText: string; sectorText: string;
  gallery: Img[];             // first image = cover on the project page
};

export type ServiceItem = { code: string; name: string; covers: string; projects: string[] };

export type Catalog = {
  title: string[];
  note?: { lead: string; text: string };
  columns: string[];
  rows: { item: string; example?: boolean; cells: string[] }[];
};

export type Service = {
  slug: string; title: string;
  icon: string;               // symbol id in /public/icons.svg
  formService: string;        // value preselected in the contact form's Service select
  enquiry: string;            // button label on the sign board
  scope: string; forWho: string; delivered: string; intro: string;
  // card on the home page
  homeText: string; homeCta: string; homePoints: string[];
  homeImage?: { src: string; alt: string; width: number; height: number };
  // sections on /services/<slug>
  items: ServiceItem[];
  catalog?: Catalog;
  steps: string[];
  built: { title: string[]; intro: string; slugs: string[]; more?: string };
};
