import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function DiamondPreviewCard() {
  return (
    <div className='w-full max-w-sm overflow-hidden rounded-lg border'>
      <div className='bg-[#d4d4d4] md:h-[300px]'>
        <Image
          src='/img/daimonds.png'
          width={200}
          height={260}
          alt='diamond'
          className='mx-auto h-full w-full object-contain'
        />
      </div>
      <div className='space-y-2 px-4 pt-2 pb-4'>
        <div className='flex justify-between text-xl'>
          <span className='font-medium'>Emerlad</span>
          <span className='text-muted-foreground'>$ 5000</span>
        </div>
        <div className='grid grid-cols-4'>
          {/* MAP DETAILS HERE */}
          {Array.from({ length: 4 }).map((item, i) => (
            <div key={i} className='text-center not-last:border-r'>
              <p>0.5</p>
              <p className='text-muted-foreground text-xs'>Carat</p>
            </div>
          ))}
        </div>
        <Link
          href='#'
          className='flex w-full items-center justify-center rounded-md bg-black py-2 text-lg text-white'
        >
          Complete your ring <ChevronRight />
        </Link>
      </div>
    </div>
  );
}
const data = {
  imgUrl: '/img/diamonds.png',
  name: 'Emerald',
  price: 1234,
  details: {
    color: 'J',
    carat: 'FD',
    clarity: 'FL',
    ratio: 1.4
  }
};
