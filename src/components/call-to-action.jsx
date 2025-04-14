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
      className={cn('mb-18 flex flex-col items-center gap-4', className)}
    >
      <Image
        src='/icons/logo-diorra2.svg'
        alt='logo'
        width={350}
        height={150}
        className=''
      />
      <p className='max-w-5xl text-center text-xs leading-4 lg:text-sm lg:leading-5 xl:text-base xl:leading-6'>
        Discover exquisite craftsmanship and timeless elegance with our stunning
        collection of jewelry. From everyday wear to special occasion pieces, we
        have something for everyone. Choose your metals, stones, and styles to
        create a piece that is uniquely yours.
      </p>
      <form className='mx-auto mt-2 flex w-full max-w-lg items-center rounded-md border bg-white p-1 text-black shadow-[0_1px_8px_rgba(0,0,0,0.15)] lg:mt-0'>
        <Input
          placeholder='Enter Your Email'
          required
          type='email'
          className='w-full border-0 text-base shadow-none outline-none focus-visible:ring-0'
        />
        <button
          type='submit'
          className='ml-2 flex w-[120px] justify-center rounded bg-black px-4 py-1 text-white'
        >
          Subscribe
        </button>
      </form>
      <div className='mt-4 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row md:justify-around md:text-left'>
        {cardData.map((card, index) => (
          <div
            key={index}
            className='flex max-w-[250px] flex-col items-center gap-2 md:w-[23%] md:items-start lg:max-w-[300px]'
          >
            <Image
              src={card.iconUrl}
              alt={card.title}
              width={35}
              height={35}
              className='block h-[35px]'
            />
            <div>
              <h3 className='mb-1 text-lg md:mb-2 lg:text-2xl'>{card.title}</h3>
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
