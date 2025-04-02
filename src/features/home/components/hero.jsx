import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { IoCopy } from 'react-icons/io5';

export default function Hero() {
  return (
    <section className="h-[400px] w-full bg-[url('/img/home-m-hero.png')] bg-cover bg-right bg-no-repeat sm:h-[500px] md:h-[83vh] md:bg-[url('/img/home-hero.png')] md:bg-center">
      {/* <div className='bg-opacity-50 absolute inset-0 bg-black/10'></div> */}
      <div className='relative container h-full'>
        {/* Inside container */}
        <div className='absolute inset-x-0 bottom-[14%] flex w-full flex-col items-center justify-end text-center text-white md:bottom-[25%] md:left-[15%] md:w-fit md:translate-x-[-15%]'>
          <p className='mb-8 text-base tracking-widest underline underline-offset-6 md:text-[21px]'>
            VALENTINE'S DAY
          </p>
          <h1 className='font-rozha mb-6 text-[26px] leading-[110%] font-medium tracking-wide md:mb-3 md:text-[40px]'>
            GET 20% OFF ON YOUR <div>FIRST ORDER</div>
          </h1>
          <p className='mb-6 hidden max-w-2xl text-lg md:block'>
            Use code{' '}
            <button className='underline underline-offset-4'>
              FIRST20 <IoCopy className='mx-1 inline' />
            </button>{' '}
            at Checkout
          </p>
          <Link
            href='#'
            className='relative rounded-full bg-black px-8 py-2.5 text-sm font-semibold text-white transition-all duration-300 before:absolute before:top-1 before:left-1 before:-z-10 before:h-full before:w-full before:rounded-full before:bg-white hover:before:opacity-0 md:py-3 md:text-base'
          >
            SHOP NOW <MoveRight className='ml-2 inline' />
          </Link>
        </div>
      </div>
    </section>
  );
}
