import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#4169FF',
};

export const metadata: Metadata = {
  title: 'SkipQ — Skip the Queue. Save Your Time.',
  description:
    'SkipQ is an on-demand queue assistance platform that helps you reclaim your time with verified local assistants at busy offices, stores, and service counters in Bhimavaram, India.',
  keywords: [
    'queue assistance',
    'skip the queue',
    'Bhimavaram on-demand',
    'line sitting service',
    'time saving startup',
    'SkipQ India'
  ],
  authors: [{ name: 'SkipQ Team' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'SkipQ — Skip the Queue. Save Your Time.',
    description:
      'Skip long physical queues at shops, service centers, and municipal offices with trusted local assistants.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'SkipQ',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#F7F9FF] text-[#10152E]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
