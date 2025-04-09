import React from 'react';
import CustomTag from './custom-tag';
import { cn } from '@/lib/utils';

export default function CustomTagWrapper({ className }) {
  return (
    <div
      className={cn(
        'my-[5%] flex w-full items-center justify-between gap-3 md:flex-row md:gap-6 xl:my-10',
        className
      )}
    >
      <CustomTag
        no='1.'
        text='Select Your'
        bold='METAL'
        imgUrl='/icons/metal.svg'
        href='/products'
      />
      <CustomTag
        no='2.'
        text='Select Your'
        bold='SHANK'
        imgUrl='/icons/shank.svg'
        href='/products'
      />
      <CustomTag
        no='3.'
        text='Select Your'
        bold='DIAMOND'
        imgUrl='/icons/diamond1.svg'
        href='/products'
      />
    </div>
  );
}
