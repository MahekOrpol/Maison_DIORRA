'use client';
import Image from 'next/image';
import React from 'react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

export default function CallToAction({ className }) {
  const cardData = [
    {
      iconUrl: '/icons/wallet.svg',
      title: 'Flexible Payment',
      subtitle: 'Enjoy easy, flexible payment options to suit your budget'
    },
    {
      iconUrl: '/icons/money.svg',
      title: 'Money Gaurantee',
      subtitle:
        'Shop with confidence our money-back guarantee ensures your satisfaction'
    },
    {
      iconUrl: '/icons/certificate2.svg',
      title: 'Certifications',
      subtitle:
        'All our jewelry pieces are certified for quality and ethical sourcing.'
    },
    {
      iconUrl: '/icons/support.svg',
      title: 'Online Support',
      subtitle:
        'Need assistance? Our dedicated online support team is here to help you 24/7.'
    }
  ];
  return (
    <section
      className={cn(
        'wrapper mb-18 flex flex-col items-center gap-4',
        className
      )}
    >
      <Image
        src='/icons/logo-diorra2.svg'
        alt='logo'
        width={200}
        height={100}
        className='w-[200px] md:w-[300px] xl:w-[400px]'
      />
      <p className='max-w-5xl text-center text-xs leading-4 lg:text-sm lg:leading-5 xl:text-base xl:leading-6'>
        Discover exquisite craftsmanship and timeless elegance with our stunning
        collection of jewelry. From everyday wear to special occasion pieces, we
        have something for everyone. Choose your metals, stones, and styles to
        create a piece that is uniquely yours.
      </p>
      <form className='mx-auto mt-2 flex w-full max-w-lg items-center rounded-sm border bg-white p-1 text-black shadow-[0_1px_8px_rgba(0,0,0,0.15)] lg:mt-0'>
        <Input
          placeholder='Enter Your Email'
          required
          type='email'
          className='w-full border-0 text-base shadow-none outline-none focus-visible:ring-0'
        />
        <button
          type='submit'
          className='ml-2 flex w-[120px] justify-center rounded-sm bg-black px-4 xs:px-8 py-1 text-white'
        >
          Subscribe
        </button>
      </form>
      <div className='xs:gap-4 mt-4 flex flex-wrap justify-center gap-x-4 gap-y-6 px-2 sm:px-0'>
        {cardData.map((card, index) => (
          <div
            key={index}
            className='flex w-[calc(50%-0.5rem)] flex-col items-start gap-2 sm:w-[calc(32%-0.5rem)] sm:first:self-center md:w-[calc(25%-0.75rem)] lg:max-w-[300px] lg:gap-4'
          >
            <Image
              src={card.iconUrl}
              alt={card.title}
              width={39}
              height={35}
              className='block h-[35px]'
            />
            <div>
              <h3 className='mb-1 pr-2 text-lg leading-5 font-medium sm:mb-2 md:mb-2 lg:text-2xl'>
                {card.title}
              </h3>
              <p className='text-xs leading-4 lg:text-sm lg:leading-5 xl:text-base'>
                {card.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
