import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function CustomTag({ no, text, bold, imgUrl, className, href }) {
  return (
    <Link
      href={href}
      className='relative inline-block transition-all duration-300 hover:scale-105'
    >
      {/* Arrowed label image */}
      <Image
        src='/img/arrowed-label.png'
        width={420}
        height={60}
        alt='tag label'
        className={cn(
          'xxs:h-[28px] xs:h-[32px] z-0 sm:h-[50px] md:h-[60px] lg:h-[70px]',
          className
        )}
      />

      {/* Content for the label image */}
      <div className='absolute inset-0 z-10 flex items-center justify-center p-1 md:p-2'>
        <div className='relative flex w-full items-center gap-1 md:gap-2'>
          {/* Number */}
          <div className='shrink-0 text-[16px] leading-none sm:pl-1 sm:text-2xl md:pl-1 md:text-3xl xl:pl-4 xl:text-[46px]'>
            {no}
          </div>

          {/* Text & Bold */}
          <div className='flex flex-col gap-[2px] md:gap-1 lg:flex-row'>
            <div className='xs:text-[12px] overflow-hidden text-[9px] leading-none sm:text-[15px] md:text-lg lg:text-lg xl:text-2xl'>
              {text}
            </div>
            <div className='xs:text-[12px] text-left text-[9px] leading-none font-semibold text-black uppercase sm:text-[15px] md:text-lg lg:text-lg xl:text-2xl'>
              {bold}
            </div>
          </div>
          <div className='xs:right-[2%] xs:h-[20px] xs:w-[20px] absolute right-[1%] flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#bebebe] sm:right-2 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:right-4'>
            <Image
              src={imgUrl}
              height={30}
              width={30}
              alt='Icon'
              className='xs:h-4 xs:w-4 h-[10px] w-[10px] md:h-6 md:w-6'
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
