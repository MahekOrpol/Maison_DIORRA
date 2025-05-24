import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function CustomTag({
  no,
  text,
  bold,
  imgUrl,
  className,
  onClick
}) {
  return (
    <div
      className='relative inline-block transition-all duration-300 hover:scale-105'
      onClick={onClick}
    >
      {/* Arrowed label image */}
      <Image
        src='/img/arrowed-label.png'
        width={420}
        height={60}
        alt='tag label'
        className={cn(
          'xs:h-[38px] 3xl:!h-[100px] z-0 h-[31px] !w-full min-[500px]:!h-[46px] sm:!h-[55px] md:!h-[60px] lg:!h-[70px] xl:!h-[85px]',
          className
        )}
      />

      {/* Content for the label image */}
      <div className='xs:px-2 absolute inset-0 z-10 flex items-center justify-center px-1 py-2 md:p-2'>
        <div className='relative flex w-full items-center gap-0.5 md:gap-2'>
          {/* Number */}
          <div className='shrink-0 leading-none max-[350px]:text-base min-[340px]:text-lg sm:pl-1 sm:text-2xl md:pl-1 md:text-3xl xl:pl-2 xl:text-[46px] 2xl:pl-5'>
            {no}
          </div>
          {/* Text & Bold */}
          <div className='flex flex-col gap-[2px] md:gap-1 lg:flex-row lg:gap-2'>
            <div className='3xl:text-3xl xs:text-[11px] overflow-hidden text-[9px] leading-none min-[500px]:!text-sm sm:!text-[15px] md:!text-lg lg:!text-lg xl:!text-2xl'>
              {text}
            </div>
            <div className='xs:text-[11px] 3xl:text-3xl text-left text-[9px] leading-none font-semibold text-black uppercase min-[500px]:!text-sm sm:!text-[15px] md:!text-lg lg:!text-lg xl:!text-2xl'>
              {bold}
            </div>
          </div>
          <div className='xs:right-[2%] xs:h-[22px] xs:w-[22px] bg-secondary absolute right-[5px] flex h-4.5 w-4.5 items-center justify-center rounded-full sm:right-2 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:right-3 xl:h-14 xl:w-14 2xl:right-4'>
            <Image
              src={imgUrl}
              height={30}
              width={30}
              alt='Icon'
              className='xs:h-4 xs:w-4 h-[12px] w-[12px] min-[550px]:max-md:!h-5 min-[550px]:max-md:!w-5 md:h-6 md:w-6 xl:h-8 xl:w-8'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
