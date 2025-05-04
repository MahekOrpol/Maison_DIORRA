import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function DiamondPreviewCard({ href }) {
  const characteristics = [
    { propety: 'Carat', value: '0.5' },
    { propety: 'Color', value: 'I' },
    { propety: 'Clarity', value: 'IF' },
    { propety: 'Ratio', value: '1.4' }
  ];
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
      <div className='xs:p-2 space-y-2 p-1 md:p-4'>
        <div className='flex justify-between md:text-xl'>
          <span className='font-medium'>Emerlad</span>
          <span className='text-muted-foreground'>$ 5000</span>
        </div>
        <div className='grid grid-cols-4'>
          {/* MAP DETAILS HERE */}
          {characteristics.map((item, i) => (
            <div key={i} className='text-center text-xs not-last:border-r'>
              <p>{item.value}</p>
              <p className='text-muted-foreground text-xs'>{item.propety}</p>
            </div>
          ))}
        </div>
        <Link
          href={href}
          className='flex w-full items-center justify-center rounded-md bg-black py-2 text-xs text-nowrap text-white md:text-lg'
        >
          Complete Your Ring <ChevronRight size={18} />
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
