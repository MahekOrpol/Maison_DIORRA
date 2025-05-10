// app/(storefront)/_components/HeroSliderClient.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { IoCopy } from 'react-icons/io5';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';

export default function HeroSliderClient({ slides }) {
  const { copy } = useCopyToClipboard();
  const [showTooltip, setShowTooltip] = useState(false);
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect(); // sync initially
    return () => api.off('select', onSelect);
  }, [api]);

  const handleCopy = () => {
    copy('FIRST20');
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 4000);
  };

  return (
    <>
      <Carousel className='w-full' opts={{ loop: true }} setApi={setApi}>
        <CarouselContent className='ml-0'>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className='pl-0'>
              <div
                className={`3xl:h-[70vh] h-[400px] w-full bg-cover bg-center bg-no-repeat sm:h-[450px] md:h-[500px] md:bg-left xl:h-[84vh]`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className='wrapper relative h-full bg-black/20'>
                  <div className='absolute inset-x-0 bottom-[14%] flex w-full flex-col items-center justify-end text-center text-white md:bottom-[25%] md:left-[12%] md:w-fit md:translate-x-[-15%] 2xl:left-[6%]'>
                    <p className='mb-4 text-base tracking-widest underline underline-offset-6 sm:mb-6 md:text-[21px]'>
                      {slide.subtitle}
                    </p>
                    <h1 className='font-rozha hero-font mb-5 w-3/4 leading-[110%] font-medium tracking-wide lg:w-2/3'>
                      {slide.title}
                    </h1>
                    <div className='xs:text-lg relative mb-3 max-w-2xl text-sm lg:mb-6'>
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
                      href={slide.ctaLink}
                      className='xs:px-8 xs:py-2.5 xs:text-sm relative flex items-center rounded-full bg-black px-3.5 py-2 text-xs font-semibold text-white transition-all duration-300 before:absolute before:top-1 before:left-1 before:-z-10 before:h-full before:w-full before:rounded-full before:bg-white hover:before:opacity-0 md:py-3 md:text-base'
                    >
                      {slide.ctaText} <MoveRight className='ml-2 inline' />
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots */}
        <div className='absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2'>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                current === index ? 'w-6 bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>

      {/* Toast */}
      {showTooltip && (
        <div className='animate-in slide-in-from-bottom zoom-in-105 fixed bottom-8 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-xl border border-white/20 bg-black/90 px-5 py-4 text-center text-sm text-white shadow-xl ring-1 ring-white/10'>
          <p className='text-lg'>Promo code copied!</p>
          Apply at checkout for your exclusive discount.
        </div>
      )}
    </>
  );
}
