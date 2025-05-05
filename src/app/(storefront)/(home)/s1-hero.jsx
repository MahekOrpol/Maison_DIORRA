'use client';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoCopy } from 'react-icons/io5';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function S1HeroSection() {
  const { copy } = useCopyToClipboard();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = () => {
    copy('FIRST20');
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 4000);
  };

  return (
    <section className="relative w-full">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {[1, 2].map((_, index) => (
            <CarouselItem key={index}>
              <div className="3xl:h-[65vh] h-[400px] sm:h-[450px] md:h-[500px] xl:h-[80vh] w-full bg-cover md:bg-left -right bg-right bg-no-repeat" style={{
                backgroundImage: `url(${index === 0
                  ? "/img/home-hero2.jpg"
                  : "/img/home-hero2.jpg"
                  })`,
                backgroundPosition: index === 0 ? "right" : "left"
              }}>
                <div className='wrapper relative h-full'>
                  <div className='absolute inset-x-0 bottom-[14%] flex w-full flex-col items-center justify-end text-center text-white md:bottom-[25%] md:left-[12%] md:w-fit md:translate-x-[-15%]'>
                    <p className='mb-4 text-base tracking-widest underline underline-offset-6 sm:mb-6 md:text-[21px]'>
                      VALENTINE'S DAY
                    </p>
                    <h1 className='font-rozha hero-font mb-5 leading-[110%] font-medium tracking-wide'>
                      GET 20% OFF ON YOUR <div>FIRST ORDER</div>
                    </h1>
                    <div className='relative mb-3 max-w-2xl sm:text-lg lg:mb-6'>
                      <p>
                        Use code{' '}
                        <button
                          onClick={handleCopy}
                          className='inline-flex items-center gap-1 underline underline-offset-4'
                        >
                          FIRST20 <IoCopy className='inline h-4 w-4' />
                        </button>{' '}
                        at Checkout
                      </p>
                    </div>
                    <Link
                      href='/products/rings/engagement-rings'
                      className='relative flex items-center rounded-full bg-black px-8 py-2.5 text-sm font-semibold text-white transition-all duration-300 before:absolute before:top-1 before:left-1 before:-z-10 before:h-full before:w-full before:rounded-full before:bg-white hover:before:opacity-0 md:py-3 md:text-base'
                    >
                      SHOP NOW <MoveRight className='ml-2 inline' />
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-2 text-black shadow-lg hover:bg-transparent hover:text-white">
          <ChevronLeft className="h-5 w-5" />
        </CarouselPrevious>

        <CarouselNext className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-2 text-black shadow-lg hover:bg-transparent hover:text-white">
          <ChevronRight className="h-5 w-5" />
        </CarouselNext>

      </Carousel>

      {showTooltip && (
        <div className="animate-in slide-in-from-bottom zoom-in-105 fixed bottom-10 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-xl border border-white/20 bg-black/90 px-5 py-4 text-center text-sm text-white shadow-xl ring-1 ring-white/10">
          <p className="text-lg">Promo code copied!</p>
          Apply at checkout for your exclusive discount.
        </div>
      )}
    </section>
  );
}
