'use client';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { IoCopy } from 'react-icons/io5';
import { toast } from 'sonner';

export default function Hero() {
  const { copy, isCopied } = useCopyToClipboard();

  const handleCopy = () => {
    copy('FIRST20');
    toast.success('Promo code copied to clipboard!');
  };

  return (
    <section className="h-[400px] w-full bg-[url('/img/home-m-hero.png')] bg-cover bg-right bg-no-repeat sm:h-[550px] md:bg-[url('/img/home-hero.png')] md:bg-left lg:h-[700px]">
      <div className='wrapper relative h-full'>
        <div className='absolute inset-x-0 bottom-[14%] flex w-full flex-col items-center justify-end text-center text-white md:bottom-[30%] md:left-[12%] md:w-fit md:translate-x-[-15%]'>
          <p className='mb-8 text-base tracking-widest underline underline-offset-6 md:text-[21px]'>
            VALENTINE'S DAY
          </p>
          <h1 className='font-rozha hero-font mb-6 leading-[110%] font-medium tracking-wide md:mb-3'>
            GET 20% OFF ON YOUR <div>FIRST ORDER</div>
          </h1>
          <p className='mb-6 max-w-2xl text-lg'>
            Use code{' '}
            <button
              onClick={handleCopy}
              className='inline-flex items-center gap-1 underline underline-offset-4'
            >
              FIRST20 <IoCopy className='inline h-4 w-4' />
            </button>{' '}
            at Checkout
          </p>
          <Link
            href='/products'
            className='relative flex items-center rounded-full bg-black px-8 py-2.5 text-sm font-semibold text-white transition-all duration-300 before:absolute before:top-1 before:left-1 before:-z-10 before:h-full before:w-full before:rounded-full before:bg-white hover:before:opacity-0 md:py-3 md:text-base'
          >
            SHOP NOW <MoveRight className='ml-2 inline' />
          </Link>
        </div>
      </div>
    </section>
  );
}
