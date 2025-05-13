import { Outfit, Rozha_One } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import localFont from 'next/font/local';
import NextTopLoader from 'nextjs-toploader';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin']
});
const rozha = Rozha_One({
  variable: '--font-rozha-one',
  subsets: ['latin'],
  weight: ['400']
});
const sandeMore = localFont({
  src: [
    {
      path: '../../public/fonts/SandeMoreDemo-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SandeMoreDemo-Medium.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SandeMoreDemo-SemiBold.otf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SandeMoreDemo-Bold.otf',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-sande-more'
});

export const metadata = {
  title: 'Maison Diorra | Fine Diamond Jewelry',
  description:
    'Maison Diorra offers timeless diamond jewelry designed to captivate. Explore handcrafted rings, earrings, necklaces, and more — elegance redefined.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_LIVE_URL || 'https://maisondiorra.com'
  ),
  openGraph: {
    title: 'Maison Diorra | Fine Diamond Jewelry',
    description:
      'Discover exquisite diamond jewelry crafted with precision. Maison Diorra brings you luxury with a modern twist.',
    url: process.env.NEXT_PUBLIC_LIVE_URL || 'https://maisondiorra.com',
    siteName: 'Maison Diorra',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Maison Diorra Jewelry Showcase'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Maison Diorra | Luxury Diamond Jewelry',
    description:
      'Elegance redefined. Shop handcrafted diamond jewelry at Maison Diorra.',
    images: ['/opengraph-image.jpg'],
    creator: '@maisondiorra'
  },

  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-code',
    yahoo: 'your-yahoo-code'
  },

  generator: 'Next.js',
  applicationName: 'Maison Diorra',
  category: 'jewelry'
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${rozha.variable} ${sandeMore.variable} font-outfit flex min-h-screen flex-col antialiased`}
      >
        <NextTopLoader
          color='#3b82f6'
          shadow='0 0 16px #60a5fa, 0 0 6px #3b82f6, -4px 0 10px #3b82f6'
          height={3}
          showSpinner={false}
        />
        {children}
        <Toaster expand={true} position='top-center' richColors />
      </body>
    </html>
  );
}
