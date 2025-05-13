// components/common/ScrollToTop.tsx
'use client';

import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

export default function ScrollToTop() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    // Set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!showScrollToTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className='fixed right-6 bottom-6 z-50 rounded-full border border-white bg-black p-3 text-white shadow-md transition-all hover:bg-gray-800'
      aria-label='Scroll to top'
    >
      <FaArrowUp className='h-5 w-5' />
    </button>
  );
}
