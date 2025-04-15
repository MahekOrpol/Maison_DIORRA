import CustomTag from '@/components/custom-tag';
import CustomTagWrapper from '@/components/custom-tag-wrapper';
import Heading from '@/components/heading';
import Image from 'next/image';
import React from 'react';

export default function YourDesign() {
  return (
    <section className='wrapper pt-4 md:pt-7 lg:pt-8'>
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
      <CustomTagWrapper className='-mt-6 mb-0' />
    </section>
  );
}
