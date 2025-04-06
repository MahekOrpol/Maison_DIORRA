import CustomTag from '@/components/custom-tag';
import CustomTagWrapper from '@/components/custom-tag-wrapper';
import React from 'react';
import DiamondFilters from './components/diamond-filters';
import DiamondPreviewCard from './components/diamond-preview-card';

export default function Page() {
  return (
    <div className='wrapper'>
      {/* arrowed label */}
      <CustomTagWrapper />
      <DiamondFilters />
      {/* Diamond listing section */}
      <section className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {Array.from({ length: 50 }).map((item, i) => (
          <DiamondPreviewCard key={i} />
        ))}
      </section>
    </div>
  );
}
