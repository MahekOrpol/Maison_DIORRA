'use client';

import { useEffect, useState } from 'react';
import { ProductSelectionStepsForDiamonds } from '@/components/custom-tag-wrapper';
import DiamondFilters from './components/diamond-filters';
import DiamondPreviewCard from './components/diamond-preview-card';
import { ProductListingSkeleton } from '@/components/skeleton';

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='wrapper'>
      <ProductSelectionStepsForDiamonds className='xs:my-[25px] my-[20px] sm:my-[30px] lg:my-[35px] xl:mt-[50px] xl:mb-[45px] 2xl:mt-[65px] 2xl:mb-[60px]' />
      <DiamondFilters />
      <section className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4'>
        {loading ? (
          <ProductListingSkeleton count={12} />
        ) : (
          Array.from({ length: 50 }).map((item, i) => (
            <DiamondPreviewCard key={i} href='/diamonds/slug' />
          ))
        )}
      </section>
    </div>
  );
}
