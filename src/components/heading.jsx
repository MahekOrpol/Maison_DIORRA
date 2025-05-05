import { cn } from '@/lib/utils';
import React from 'react';

export default function Heading({ title, subtitle, className }) {
  return (
    <div className={cn('mb-2 text-center sm:mb-3 md:mb-4 lg:mb-5', className)}>
      <h2 className='mb-1 text-[22px] font-medium text-black underline decoration-1 underline-offset-8 sm:mb-2 sm:text-2xl md:text-3xl md:decoration-2 md:underline-offset-10 lg:mb-3 lg:text-4xl xl:mb-4 xl:text-5xl xl:underline-offset-12'>
        {title}
      </h2>
      <p className='text-xs font-light sm:text-base xl:text-xl'>{subtitle}</p>
    </div>
  );
}
