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
      <div className=' '>
        <div className='flex w-full justify-between gap-2 sm:gap-4 xl:flex-col'>
          {Array.from({ length: 2 }).map((_, index) => (
            <PreviewCard key={index} />
          ))}
        </div>
        {/* Model image */}
        <div className='relative'>
          <Image
            src='/img/model-img.svg'
            height={1000}
            width={600}
            alt='modal image'
            className='h-full w-full rounded-md object-cover'
          />
          <div className='absolute bottom-[18%] left-[26%] flex h-[15px] w-[15px] items-center justify-center rounded-full border border-white md:h-7 md:w-7'>
            <CustomTooltip />
          </div>
          <div className='absolute top-[32%] left-[22%] flex h-[15px] w-[15px] items-center justify-center rounded-full border border-white md:h-7 md:w-7'>
            <CustomTooltip />
          </div>
          <div className='absolute right-[26%] bottom-[32%] flex h-[15px] w-[15px] items-center justify-center rounded-full border border-white md:h-7 md:w-7'>
            <CustomTooltip />
          </div>
          <div className='absolute top-[23%] right-[18%] flex h-[15px] w-[15px] items-center justify-center rounded-full border border-white md:h-7 md:w-7'>
            <CustomTooltip />
          </div>
        </div>
        <div className='flex w-full justify-between gap-2 xl:flex-col'>
          {Array.from({ length: 2 }).map((_, index) => (
            <PreviewCard key={index} />
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
