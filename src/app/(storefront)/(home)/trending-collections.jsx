'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import PreviewCardMd from '@/components/preview-card-md';
import { baseApiUrl } from '@/lib/utils';
import { useFetch } from '@/hooks/useFetch';

const tooltipContent = [
  {
    name: 'Bracelets',
    image: '/img/preview/bracelet-gold1.png',
    description: 'Elegant gold bracelets for any occasion',
    availability: 'Limited stock available'
  },
  {
    name: 'Rings',
    image: '/img/preview/ring1.png',
    description: 'Exquisite rings with premium craftsmanship',
    availability: 'Available in all sizes'
  },
  {
    name: 'Necklace',
    image: '/img/preview/necklace-gold1.png',
    description: 'Statement necklaces for elegant looks',
    availability: 'New collection'
  },
  {
    name: 'Earrings',
    image: '/img/preview/earring-gold1.png',
    description: 'Lightweight gold earrings for daily wear',
    availability: 'Bestseller'
  }
];

export default function TrendingCollections() {
  const [selectedCategory, setSelectedCategory] = useState('rings');
  const { data, isLoading } = useFetch(
    `${baseApiUrl}/api/v1/product/get-trending?categoryName=${selectedCategory}&limit=4`,
    {},
    []
  );

  return (
    <div className='xs:gap-3 3xl:max-h-[840px] 3xl:px-28 3xl:gap-8 2xl:max-h-[990px] flex flex-col gap-2 sm:gap-6 lg:max-h-[700px] lg:flex-row lg:items-stretch lg:justify-center lg:gap-4 xl:max-h-[900px] 2xl:gap-6'>
      {/* Left cards - first 2 products */}
      {isLoading || !data?.products ? (
        <></>
      ) : (
        <div className='xl:grid-row-2 grid grid-cols-2 gap-2.5 sm:gap-4 lg:w-[22%] lg:grid-cols-1 2xl:gap-6'>
          {data.products[0] && (
            <PreviewCardMd
              key={data.products[0]._id}
              product={data.products[0]}
            />
          )}
          {data.products[1] && (
            <PreviewCardMd
              key={data.products[1]._id}
              product={data.products[1]}
            />
          )}
        </div>
      )}

      {/* Center image + markers */}
      <div className='relative aspect-[10/11] w-full overflow-hidden rounded-xl border lg:w-[54%] xl:aspect-[9/10]'>
        <Image
          src='/img/model-img1.png'
          height={1000}
          width={600}
          alt='model image'
          className='h-full w-full object-cover'
          priority
        />
        <MarkerButton
          onClick={() => setSelectedCategory('bracelets')}
          tooltipContent={tooltipContent[0]}
          className='absolute bottom-[6%] left-[67%] 3xl:bottom-[7%] lg:left-[68%] lg:bottom-[8%]'
        />
        <MarkerButton
          onClick={() => setSelectedCategory('rings')}
          tooltipContent={tooltipContent[1]}
          className='top-[50%] left-[38%] xl:top-[51%] absolute md:left-[39%] lg:left-[38%] xl:left-[39%]'
        />
        <MarkerButton
          onClick={() => setSelectedCategory('pendants')}
          tooltipContent={tooltipContent[2]}
          className='absolute right-[33%] top-[47%] sm:top-[45%] sm:right-[32%] lg:top-[47%]'
        />
        <MarkerButton
          onClick={() => setSelectedCategory('earrings')}
          tooltipContent={tooltipContent[3]}
          className='absolute top-[6%] right-[30%] xs:right-[31%] xs:top-[5%] md:top-[6%] md:right-[32%] lg:top-[6%] lg:right-[29%] xl:right-[31%] 2xl:top-[6.5%] 2xl:right-[32%] 3xl:top-[3%]'
        />
      </div>

      {/* Right cards - next 2 products */}
      {isLoading || !data?.products ? (
        <></>
      ) : (
        <div className='xl:grid-row-2 grid grid-cols-2 gap-2.5 sm:gap-4 lg:w-[22%] lg:grid-cols-1 2xl:gap-6'>
          {data.products[2] && (
            <PreviewCardMd
              key={data.products[2]._id}
              product={data.products[2]}
            />
          )}
          {data.products[3] && (
            <PreviewCardMd
              key={data.products[3]._id}
              product={data.products[3]}
            />
          )}
        </div>
      )}
    </div>
  );
}

function MarkerButton({ onClick, className, tooltipContent }) {
  return (
    <TooltipProvider>
      <div
        onClick={onClick}
        className={`group ${className} flex h-5.5 w-5.5 cursor-pointer items-center justify-center rounded-full border border-white sm:h-7 sm:w-7 md:border-2 xl:h-8 xl:w-8`}
      >
        <Tooltip>
          <TooltipTrigger className='h-4 w-4 rounded-full bg-white hover:bg-white/90 sm:h-5 sm:w-5 xl:h-6 xl:w-6' />
          <TooltipContent className='overflow-hidden rounded-md bg-white py-0 pr-4 pl-0 text-black'>
            <div className='relative z-60 flex'>
              <Image
                src={tooltipContent.image}
                height={90}
                alt={tooltipContent.name || 'Product image'}
                width={90}
                className='h-[70px] w-[70px] sm:h-[80px] sm:w-[80px]'
              />
              <div className='ml-2 mt-1 pb-2'>
                <p className='text-sm font-semibold sm:text-base'>
                  {tooltipContent.name}
                </p>
                {/* New content added below the category name */}
                <div className='mt-1 text-xs text-gray-600 sm:text-sm'>
                  <p>{tooltipContent.description || 'Product description'}</p>
                  <p className='mt-1'>{tooltipContent.availability || 'In stock'}</p>
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
