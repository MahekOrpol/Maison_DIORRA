'use client'
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import  { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

export default function MainLayout({ children }) {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-[85px] min-[1023px]:pt-[118px]">
        {children}
      </main>
      <Footer />

      {/* Scroll to top button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black text-white shadow-md hover:bg-gray-800 transition-all border border-white"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
