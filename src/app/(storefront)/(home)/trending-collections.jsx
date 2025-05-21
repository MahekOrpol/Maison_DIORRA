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
    name: 'Braclets',
    image: '/img/preview/bracelet-gold1.png',
    salePrice: 500,
    originialPrice: 800
  },
  {
    name: 'Rings',
    image: '/img/preview/ring1.png',
    salePrice: 500,
    originialPrice: 800
  },
  {
    name: 'Necklace',
    image: '/img/preview/necklace-gold1.png',
    salePrice: 500,
    originialPrice: 800
  },
  {
    name: 'Earrings',
    image: '/img/preview/earring-gold1.png',
    salePrice: 500,
    originialPrice: 800
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
    <div className='xs:gap-3 3xl:max-h-[840px] flex flex-col gap-2 sm:gap-6 lg:max-h-[700px] lg:flex-row lg:items-stretch lg:justify-center lg:gap-4 xl:max-h-[760px] 2xl:gap-6'>
      {/* Left cards - first 2 products */}
      {isLoading ? (
        <></>
      ) : (
        <div className='xl:grid-row-2 grid grid-cols-2 gap-4 sm:gap-4 lg:w-[22%] lg:grid-cols-1 2xl:gap-6'>
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
      <div className='relative aspect-[10/9] w-full overflow-hidden rounded-xl border lg:w-[54%] xl:aspect-[9/10]'>
        <Image
          src='/img/model-img.svg'
          height={1000}
          width={600}
          alt='model image'
          className='h-full w-full object-cover'
          priority
        />
        <MarkerButton
          onClick={() => setSelectedCategory('bracelets')}
          tooltipContent={tooltipContent[0]}
          className='3xl:bottom-[6%] absolute bottom-[12%] left-[40%] lg:bottom-[18%] lg:left-[30%] xl:bottom-[8%]'
        />
        <MarkerButton
          onClick={() => setSelectedCategory('rings')}
          tooltipContent={tooltipContent[1]}
          className='3xl:top-[30%] absolute top-[25%] left-[20%] md:top-[26%] lg:top-[34%] lg:left-[14%] xl:top-[32%]'
        />
        <MarkerButton
          onClick={() => setSelectedCategory('pendants')}
          tooltipContent={tooltipContent[2]}
          className='absolute right-[23%] bottom-[28%] lg:right-[22%] lg:bottom-[33%]'
        />
        <MarkerButton
          onClick={() => setSelectedCategory('earrings')}
          tooltipContent={tooltipContent[3]}
          className='3xl:top-[16%] absolute top-[14%] right-[17%] md:top-[15%] md:right-[18%] lg:top-[24%] lg:right-[16%] xl:top-[20%] xl:right-[17%]'
        />
      </div>

      {/* Right cards - next 2 products */}
      {isLoading ? (
        <></>
      ) : (
        <div className='xl:grid-row-2 grid grid-cols-2 gap-4 sm:gap-4 lg:w-[22%] lg:grid-cols-1 2xl:gap-6'>
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
            <div className='relative z-60 flex items-center'>
              <Image
                src={tooltipContent.image}
                height={90}
                alt={'df'}
                width={90}
                className='h-[70px] w-[70px] sm:h-[80px] sm:w-[80px]'
              />
              <div className='ml-2'>
                <div className='flex items-baseline gap-2'>
                  <p className='text-lg font-semibold sm:text-xl'>
                    ${tooltipContent.salePrice}
                  </p>
                  <span className='text-muted-foreground text-base font-normal line-through sm:text-lg'>
                    ${tooltipContent.originialPrice}
                  </span>
                </div>
                <div className='flex items-center'>
                  <p className='w-25 text-sm leading-5 sm:text-base'>
                    {tooltipContent.name}
                  </p>
                  <ShoppingBag className='ml-2 h-6 w-6' />
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
