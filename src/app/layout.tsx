import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Manrope } from 'next/font/google';
import './globals.css';
import { getStructuredData } from '@/lib/structuredData';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FlexLab | Movement-Driven Physical Therapy & Rehabilitation',
  description:
    'FlexLab is a premium physical therapy clinic focused on restoring natural movement, biomechanical precision, and long-term functional recovery through personalized clinical care.',
  keywords: [
    'Physical therapy',
    'Orthopedic rehab',
    'Sports injury rehabilitation',
    'Spine care',
    'Manual therapy',
    'Exercise therapy',
    'Balance and fall prevention',
    'Whiplash treatment',
    'Biomechanics'
  ],
  authors: [{ name: 'FlexLab Physical Therapy' }],
  openGraph: {
    title: 'FlexLab | Movement-Driven Physical Therapy',
    description: 'Your body is built to move. We help you move with confidence again.',
    type: 'website',
    locale: 'en_US',
    siteName: 'FlexLab'
  }
};

export const viewport: Viewport = {
  themeColor: '#fff5e8',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = getStructuredData();

  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero-anatomy.webp"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--cream)] text-[var(--ink)] antialiased font-sans flex flex-col selection:bg-[var(--rose)] selection:text-[var(--crimson-dark)]">
        {children}
      </body>
    </html>
  );
}
