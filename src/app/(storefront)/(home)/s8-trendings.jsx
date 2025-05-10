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
  bracelet01,
  braceletData,
  earring01,
  earringData,
  necklace01,
  necklaceData,
  ring01,
  ringData
} from '@/constants/data';
import PreviewCardMd from '@/components/preview-card-md';

const categories = {
  ring: ring01,
  bracelet: bracelet01,
  necklace: necklace01,
  earring: earring01
};

export default function S8TrendingCollections({data}) {
  const [selected, setSelected] = useState('ring');
  console.log('Selected category:', selected);

  return (
    <section className='wrapper pt-6 md:pt-10 lg:pt-12 xl:pt-14'>
      <Heading
        title='Trending Collection'
        subtitle='Affordable luxury for everyday wear'
      />
      <div className='xs:gap-3 3xl:max-h-[840px] flex flex-col gap-2 sm:gap-6 lg:max-h-[700px] lg:flex-row lg:items-stretch lg:justify-center lg:gap-4 xl:max-h-[760px] 2xl:gap-6'>
        {/* Left side cards */}
        <div className='xl:grid-row-2 grid grid-cols-2 gap-4 sm:gap-4 lg:w-[22%] lg:grid-cols-1 2xl:gap-6'>
          <PreviewCardMd key='1' product={{ ...categories[selected] }} />
          <PreviewCardMd key='2' product={{ ...categories[selected] }} />
        </div>

        {/* Center model image with marker buttons */}
        <div className='relative aspect-[10/9] w-full overflow-hidden rounded-xl border lg:w-[54%] xl:aspect-[9/10]'>
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
            className='3xl:bottom-[6%] absolute bottom-[12%] left-[40%] lg:bottom-[18%] lg:left-[30%] xl:bottom-[8%]'
          />

          {/* Ring Button */}
          <MarkerButton
            onClick={() => setSelected('ring')}
            tooltipContent={ringData.metals[0]}
            className='3xl:top-[30%] absolute top-[25%] left-[20%] md:top-[26%] lg:top-[34%] lg:left-[14%] xl:top-[32%]'
          />

          {/* Necklace Button */}
          <MarkerButton
            onClick={() => setSelected('necklace')}
            tooltipContent={necklaceData.metals[0]}
            className='absolute right-[23%] bottom-[28%] lg:right-[22%] lg:bottom-[33%]'
          />

          {/* Earring Button */}
          <MarkerButton
            onClick={() => setSelected('earring')}
            tooltipContent={earringData.metals[0]}
            className='3xl:top-[16%] absolute top-[14%] right-[17%] md:top-[15%] md:right-[18%] lg:top-[24%] lg:right-[16%] xl:top-[20%] xl:right-[17%]'
          />
        </div>

        {/* Right side cards */}
        <div className='xl:grid-row-2 grid grid-cols-2 gap-4 sm:gap-4 lg:w-[22%] lg:grid-cols-1 2xl:gap-6'>
          <PreviewCardMd key='3' product={{ ...categories[selected] }} />
          <PreviewCardMd key='4' product={{ ...categories[selected] }} />
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
                className='h-[70px] w-[70px] sm:h-[80px] sm:w-[80px]'
              />
              <div className='ml-2'>
                <div className='flex items-baseline gap-2'>
                  <p className='text-lg font-semibold sm:text-xl'>
                    ${tooltipContent.amount}
                  </p>
                  <span className='text-muted-foreground text-base font-normal line-through sm:text-lg'>
                    ${tooltipContent.wrongAmount}
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
