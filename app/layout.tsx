import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Builder',
  description: 'Build and deploy AI applications with ease',
  keywords: ['AI', 'builder', 'application', 'deployment'],
  authors: [{ name: 'AI Builder Team' }],
  creator: 'AI Builder',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-builder.dev',
    siteName: 'AI Builder',
    title: 'AI Builder',
    description: 'Build and deploy AI applications with ease',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Builder',
    description: 'Build and deploy AI applications with ease',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
