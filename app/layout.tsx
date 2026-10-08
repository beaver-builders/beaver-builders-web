import type { Metadata, Viewport } from 'next';
import { Oswald, IBM_Plex_Mono, Montserrat } from 'next/font/google';
import './globals.css';
import { site } from '../lib/site-data';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      </body>
    </html>
  );
}