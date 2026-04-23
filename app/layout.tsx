import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LenisProvider from '@/components/LenisProvider';
import CookieConsent from '@/components/CookieConsent';

const SITE_URL = 'https://www.jazdene.eu';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Jazdené – Autobazár Brezno',
    template: '%s | Jazdené',
  },
  description: 'Kúpte si auto bez starostí. Široká ponuka overených vozidiel za najlepšie ceny so zárukou kvality v Brezne.',
  keywords: ['autobazár', 'Brezno', 'ojazdené autá', 'predaj áut', 'výkup áut', 'Jazdené', 'autá Brezno'],
  authors: [{ name: 'JAZDENÉ s.r.o.' }],
  creator: 'JAZDENÉ s.r.o.',
  publisher: 'JAZDENÉ s.r.o.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    url: SITE_URL,
    siteName: 'Jazdené',
    title: 'Jazdené – Autobazár Brezno',
    description: 'Kúpte si auto bez starostí. Široká ponuka overených vozidiel za najlepšie ceny so zárukou kvality v Brezne.',
    images: [{ url: '/hero.jpg', width: 1200, height: 630, alt: 'Jazdené – Autobazár Brezno' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jazdené – Autobazár Brezno',
    description: 'Kúpte si auto bez starostí. Overené vozidlá za najlepšie ceny v Brezne.',
    images: ['/hero.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-gray-950">
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
        </LenisProvider>
      </body>
    </html>
  );
}
