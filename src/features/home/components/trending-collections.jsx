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

export default function TrendingCollections() {
  return (
    <section className='wrapper pt-10 md:pt-15 lg:pt-20'>
      <Heading
        title='Trending Collection'
        subtitle='Affordable luxury for everyday wear'
      />
      <div className='flex flex-col gap-4 lg:max-h-screen lg:flex-row lg:items-stretch xl:justify-evenly'>
        {/* Left side cards */}
        <div className='flex w-full items-center justify-between gap-2 lg:w-[22%] lg:flex-col xl:w-[25%]'>
          {Array.from({ length: 2 }).map((_, index) => (
            <PreviewCard key={`left-${index}`} className={''} />
          ))}
        </div>

        {/* Center model image with tooltips */}
        <div className='relative h-auto w-full overflow-hidden rounded-md border border-red-500 lg:w-[60%]'>
          <Image
            src='/img/model-img.svg'
            height={1000}
            width={600}
            alt='model image'
            className='h-full w-full object-cover'
          />

          {/* Tooltip markers */}
          <div className='absolute bottom-[18%] left-[26%] flex h-4 w-4 items-center justify-center rounded-full border border-white md:h-7 md:w-7'>
            <CustomTooltip />
          </div>
          <div className='absolute top-[32%] left-[22%] flex h-4 w-4 items-center justify-center rounded-full border border-white md:h-7 md:w-7 lg:left-[20%]'>
            <CustomTooltip />
          </div>
          <div className='2xl absolute right-[26%] bottom-[32%] flex h-4 w-4 items-center justify-center rounded-full border border-white md:h-7 md:w-7 lg:right-[22%]'>
            <CustomTooltip />
          </div>
          <div className='absolute top-[23%] right-[18%] flex h-4 w-4 items-center justify-center rounded-full border border-white md:h-7 md:w-7 lg:top-[22%] lg:right-[14%]'>
            <CustomTooltip />
          </div>
        </div>

        {/* Right side cards */}
        <div className='flex w-full items-center justify-between gap-2 lg:w-[22%] lg:flex-col xl:w-[25%]'>
          {Array.from({ length: 2 }).map((_, index) => (
            <PreviewCard key={`left-${index}`} className={''} />
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
        <TooltipTrigger className='h-[10px] w-[10px] rounded-full bg-white md:h-5 md:w-5'></TooltipTrigger>
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
