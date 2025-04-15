import Heading from '@/components/heading';
import PreviewCard from '@/components/preview-card';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { ShoppingBag } from 'lucide-react';
import ProductCard2 from '@/components/preview-card2';
import PreviewCard3 from '@/components/preview-card3';

export default function TrendingCollections() {
  return (
    <section className='wrapper pt-6 md:pt-7 lg:pt-10 xl:pt-14'>
      <Heading
        title='Trending Collection'
        subtitle='Affordable luxury for everyday wear'
      />
      <div className='flex flex-col gap-2 sm:gap-4 lg:flex-row lg:items-stretch lg:gap-6 xl:gap-8'>
        {/* Left side cards */}
        <div className='xl:grid-row-2 grid grid-cols-2 gap-4 sm:gap-6 lg:w-[22%] lg:grid-cols-1 lg:gap-8 xl:w-[25%]'>
          {Array.from({ length: 2 }).map((_, index) => (
            // <PreviewCard key={`left-${index}`} className={''} />
            <PreviewCard3 key={`left-${index}`} />
          ))}
        </div>

        {/* Center model image with tooltips */}
        <div className='relative aspect-[766/980] w-full overflow-hidden rounded-md border lg:w-[60%]'>
          <Image
            src='/img/model-img.svg'
            height={1000}
            width={600}
            alt='model image'
            className='h-full w-full object-cover'
          />

          {/* Tooltip markers */}
          <div className='absolute bottom-[18%] left-[26%] flex h-5.5 w-5.5 items-center justify-center rounded-full border border-white sm:h-7 sm:w-7 md:border-2 xl:h-8 xl:w-8'>
            <CustomTooltip />
          </div>
          <div className='absolute top-[32%] left-[22%] flex h-5.5 w-5.5 items-center justify-center rounded-full border border-white sm:h-7 sm:w-7 md:border-2 lg:left-[20%] xl:left-[18%] xl:h-8 xl:w-8'>
            <CustomTooltip />
          </div>
          <div className='absolute right-[26%] bottom-[32%] flex h-5.5 w-5.5 items-center justify-center rounded-full border border-white sm:h-7 sm:w-7 md:border-2 lg:right-[22%] xl:h-8 xl:w-8 2xl:right-[24%]'>
            <CustomTooltip />
          </div>
          <div className='absolute top-[23%] right-[17%] flex h-5.5 w-5.5 items-center justify-center rounded-full border border-white sm:h-7 sm:w-7 md:top-[24%] md:right-[18%] md:border-2 lg:top-[24%] lg:right-[17%] xl:top-[24%] xl:right-[11%] xl:h-8 xl:w-8 2xl:right-[18%]'>
            <CustomTooltip />
          </div>
        </div>

        {/* Right side cards */}
        <div className='xl:grid-row-2 grid grid-cols-2 gap-4 sm:gap-6 lg:w-[22%] lg:grid-cols-1 lg:gap-8 xl:w-[25%]'>
          {Array.from({ length: 2 }).map((_, index) => (
            // <PreviewCard key={`left-${index}`} className={''} />
            // <ProductCard2 key={`left-${index}`} />
            <PreviewCard3 key={`left-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomTooltip() {
  return (
    <TooltipProvider>
      <Tooltip className=''>
        <TooltipTrigger className='h-4 w-4 rounded-full bg-white sm:h-5 sm:w-5 xl:h-6 xl:w-6'></TooltipTrigger>
        <TooltipContent className='text-balck rounded-xs bg-white pr-8 pl-0'>
          <div className='flex items-center'>
            <Image
              src='/img/preview/ring1.png'
              height={90}
              alt='Ring image'
              width={90}
              className='w-[80px]'
            />
            <div className=''>
              <div className='flex items-baseline gap-2'>
                <p className='text-[20px] font-semibold'>$29.99</p>
                <span className='text-base font-normal text-[#958F86] line-through'>
                  $39.99
                </span>
              </div>
              <div className='flex items-center'>
                <p className='w-25 text-sm'>Stirling Silver Band Ring</p>
                <ShoppingBag />
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
