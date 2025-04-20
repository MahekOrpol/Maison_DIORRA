'use client';

import Heading from '@/components/heading';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { ShoppingBag } from 'lucide-react';
import PreviewCard from '@/components/preview-card';
import {
  braceletData,
  earringData,
  necklaceData,
  ringData
} from '@/constants/data';

const categories = {
  ring: ringData,
  bracelet: braceletData,
  necklace: necklaceData,
  earring: earringData
};

export default function TrendingCollections() {
  const [selected, setSelected] = useState('ring');
  console.log('Selected category:', selected);

  return (
    <section className='wrapper pt-6 md:pt-7 lg:pt-10 xl:pt-14'>
      <Heading
        title='Trending Collection'
        subtitle='Affordable luxury for everyday wear'
      />

      <div className='xs:gap-3 flex flex-col gap-2 sm:gap-6 lg:flex-row lg:items-stretch lg:gap-6 2xl:gap-8'>
        {/* Left side cards */}
        <div className='xl:grid-row-2 grid grid-cols-2 gap-4 sm:gap-6 lg:w-[22%] lg:grid-cols-1 xl:w-[25%] 2xl:gap-8'>
          <PreviewCard key='1' product={{ ...categories[selected] }} />
          <PreviewCard key='2' product={{ ...categories[selected] }} />
        </div>

        {/* Center model image with marker buttons */}
        <div className='relative aspect-[766/980] w-full overflow-hidden rounded-xl border lg:w-[60%]'>
          <Image
            src='/img/model-img.svg'
            height={1000}
            width={600}
            alt='model image'
            className='h-full w-full object-cover'
          />

          {/* Bracelet Button */}
          <MarkerButton
            onClick={() => setSelected('bracelet')}
            tooltipContent={braceletData.metals[0]}
            className='absolute bottom-[18%] left-[26%]'
          />

          {/* Ring Button */}
          <MarkerButton
            onClick={() => setSelected('ring')}
            tooltipContent={ringData.metals[0]}
            className='absolute top-[32%] left-[22%] lg:left-[20%] xl:left-[18%]'
          />

          {/* Necklace Button */}
          <MarkerButton
            onClick={() => setSelected('necklace')}
            tooltipContent={necklaceData.metals[0]}
            className='xs:right-[28%] absolute right-[26%] bottom-[28%] lg:right-[22%] lg:bottom-[33%] 2xl:right-[24%]'
          />

          {/* Earring Button */}
          <MarkerButton
            onClick={() => setSelected('earring')}
            tooltipContent={earringData.metals[0]}
            className='xs:top-[24.5%] xs:right-[17.5%] absolute top-[23%] right-[17%] md:top-[25%] md:right-[18%] lg:top-[24%] lg:right-[16%] xl:top-[24%] xl:right-[18%]'
          />
        </div>

        {/* Right side cards */}
        <div className='xl:grid-row-2 grid grid-cols-2 gap-4 sm:gap-6 lg:w-[22%] lg:grid-cols-1 lg:gap-6 xl:w-[25%] 2xl:gap-8'>
          <PreviewCard key='3' product={{ ...categories[selected] }} />
          <PreviewCard key='4' product={{ ...categories[selected] }} />
        </div>
      </div>
    </section>
  );
}

// Tooltip marker button component
function MarkerButton({ onClick, tooltipContent, className }) {
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
                src={tooltipContent.images[0] || '/img/preview/ring1.png'}
                height={90}
                alt={tooltipContent.name}
                width={90}
                className='h-[80px] w-[80px]'
              />
              <div className='ml-2'>
                <div className='flex items-baseline gap-2'>
                  <p className='text-xl font-semibold'>
                    ${tooltipContent.amount}
                  </p>
                  <span className='text-muted-foreground text-lg font-normal line-through'>
                    ${tooltipContent.wrongAmount}
                  </span>
                </div>
                <div className='flex items-center'>
                  <p className='w-25 text-base leading-5'>
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
