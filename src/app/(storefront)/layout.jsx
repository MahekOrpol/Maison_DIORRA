import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import React from 'react';

export default function MainLayout({ children }) {
  console.log(process.env.BACKEND_URL);
  return (
    <>
      <Header />
      <main className='flex-1 pt-[85px] min-[1023px]:pt-[118px]'>
        {children}
      </main>
      <Footer />
    </>
  );
}
