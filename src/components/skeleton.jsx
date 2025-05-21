'use client';

import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className='animate-pulse space-y-3'>
      {/* Image placeholder */}
      <div className='xs:h-[200px] h-[150px] rounded-md bg-gray-200 sm:h-[250px] lg:h-[350px] xl:h-[400px]'></div>

      {/* Text placeholders */}
      <div className='space-y-2'>
        <div className='h-4 w-20 rounded-md bg-gray-200 md:w-40'></div>
        <div className='h-4 w-3/4 rounded-md bg-gray-200'></div>
      </div>
      {/* Button placeholder */}
      <div className='mt-2'>
        <div className='h-8 w-full rounded-md border border-gray-300 bg-gray-200 sm:h-10'></div>
      </div>
    </div>
  );
};

export const ProductListingSkeleton = ({ count = 8 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  );
};
