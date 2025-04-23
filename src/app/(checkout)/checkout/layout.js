import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';

export default function CheckoutLayout({ children }) {
  return (
    // <html lang='en' suppressHydrationWarning>
    //   <body className={`flex min-h-screen flex-col antialiased`}>
    //     <NextTopLoader
    //       color='#3b82f6'
    //       shadow='0 0 16px #60a5fa, 0 0 6px #3b82f6, -4px 0 10px #3b82f6'
    //       height={3}
    //       showSpinner={false}
    //     />
    <main className='flex-1'>{children}</main>
    //     <Toaster expand={true} position='top-center' richColors />
    //     <Footer />
    //   </body>
    // </html>
  );
}
