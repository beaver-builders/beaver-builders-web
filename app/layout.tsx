import type { Metadata, Viewport } from 'next';
import { Oswald, IBM_Plex_Mono, Montserrat } from 'next/font/google';
import './styles/index.css';
import { site } from '../lib/site-data';
import Footer from '@/components/Footer';
import { getProjects } from '@/lib/data';
import type { Project } from '@/lib/types';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-oswald',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.name,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#1A1E18',
};

export const dynamic = 'force-dynamic'; // pages are rendered on request, so the build never needs the database

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let projects: Project[] = [];
  try {
    projects = await getProjects();
  } catch {
  }

  return (
    <html
      lang="en"
      className={`${oswald.variable} ${plexMono.variable} ${montserrat.variable}`}
    >
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>

        <main id="main">{children}</main>
        <Footer projects={projects} />
      </body>
    </html>
  );
}