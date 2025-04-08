import CustomTag from '@/components/custom-tag';
import Heading from '@/components/heading';
import Image from 'next/image';
import React from 'react';

export default function YourDesign() {
  return (
    <section className='wrapper pt-10 md:pt-15 lg:pt-20'>
      <Heading
        title='Design Your Ring'
        subtitle='Your Vision, Your Ring, Your Forever.'
      />
      <div className='flex justify-center overflow-x-hidden'>
        <Image
          src='/img/home-design.png'
          alt='logo'
          width={500}
          height={100}
          className='aspect-ratio h-[60vw] w-[90vw] object-cover object-[20%] sm:w-[100vw] md:h-[40vw] md:w-[90%] md:-translate-x-8 lg:h-[37vw] lg:w-full lg:-translate-x-15 lg:object-[50%] xl:h-auto'
        />
      </div>
      <div className='-mt-6 flex w-full items-center justify-between gap-2 md:flex-row md:gap-3 lg:-mt-10 lg:gap-8'>
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
    </section>
  );
}
