'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import PreviewCardMd from '@/components/preview-card-md';

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

const categories = {
  ring: ring01,
  bracelet: bracelet01,
  necklace: necklace01,
  earring: earring01
};

export default function TrendingCollections() {
  const [selected, setSelected] = useState('ring');

  return (
    <div className='xs:gap-3 3xl:max-h-[840px] flex flex-col gap-2 sm:gap-6 lg:max-h-[700px] lg:flex-row lg:items-stretch lg:justify-center lg:gap-4 xl:max-h-[760px] 2xl:gap-6'>
      {/* Left cards */}
      <div className='xl:grid-row-2 grid grid-cols-2 gap-4 sm:gap-4 lg:w-[22%] lg:grid-cols-1 2xl:gap-6'>
        <PreviewCardMd product={{ ...categories[selected] }} />
        <PreviewCardMd product={{ ...categories[selected] }} />
      </div>

      {/* Center image + markers */}
      <div className='relative aspect-[10/9] w-full overflow-hidden rounded-xl border lg:w-[54%] xl:aspect-[9/10]'>
        <Image
          src='/img/model-img.svg'
          height={1000}
          width={600}
          alt='model image'
          className='h-full w-full object-cover'
        />

        <MarkerButton
          onClick={() => setSelected('bracelet')}
          tooltipContent={braceletData.metals[0]}
          className='3xl:bottom-[6%] absolute bottom-[12%] left-[40%] lg:bottom-[18%] lg:left-[30%] xl:bottom-[8%]'
        />
        <MarkerButton
          onClick={() => setSelected('ring')}
          tooltipContent={ringData.metals[0]}
          className='3xl:top-[30%] absolute top-[25%] left-[20%] md:top-[26%] lg:top-[34%] lg:left-[14%] xl:top-[32%]'
        />
        <MarkerButton
          onClick={() => setSelected('necklace')}
          tooltipContent={necklaceData.metals[0]}
          className='absolute right-[23%] bottom-[28%] lg:right-[22%] lg:bottom-[33%]'
        />
        <MarkerButton
          onClick={() => setSelected('earring')}
          tooltipContent={earringData.metals[0]}
          className='3xl:top-[16%] absolute top-[14%] right-[17%] md:top-[15%] md:right-[18%] lg:top-[24%] lg:right-[16%] xl:top-[20%] xl:right-[17%]'
        />
      </div>

      {/* Right cards */}
      <div className='xl:grid-row-2 grid grid-cols-2 gap-4 sm:gap-4 lg:w-[22%] lg:grid-cols-1 2xl:gap-6'>
        <PreviewCardMd product={{ ...categories[selected] }} />
        <PreviewCardMd product={{ ...categories[selected] }} />
      </div>
    </div>
  );
}

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
                width={90}
                alt={tooltipContent.name}
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
                <p className='flex w-25 items-center text-sm leading-5 sm:text-base'>
                  {tooltipContent.name}
                  <ShoppingBag className='ml-2 h-6 w-6' />
                </p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
