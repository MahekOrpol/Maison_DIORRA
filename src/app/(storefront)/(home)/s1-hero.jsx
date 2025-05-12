'use client';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { IoCopy } from 'react-icons/io5';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function S1HeroSection() {
  const { copy } = useCopyToClipboard();
  const [showTooltip, setShowTooltip] = useState(false);
  const [api, setApi] = React.useState(null);
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    // Call once initially to sync current dot
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleCopy = () => {
    copy('FIRST20');
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 4000);
  };

  // Array of different hero images
  const heroImages = [
    '/img/home-hero2.jpg',
    '/img/hero2.jpg',
    '/img/hero3.jpg'
  ];

  return (
    <section className='relative w-full'>
      <Carousel className='w-full' opts={{ loop: true }} setApi={setApi}>
        <CarouselContent className='ml-0'>
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className='pl-0'>
              <div
                className='3xl:h-[70vh] h-[530px] w-full bg-cover bg-center bg-no-repeat sm:h-[450px] md:h-[500px] md:bg-left xl:h-[84vh]'
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className='wrapper relative h-full bg-black/30'>
                  {index === 0 && (
                    <div className='absolute inset-x-0 bottom-[6%] flex w-full flex-col items-center justify-end text-center text-white md:bottom-[25%] md:left-[12%] md:w-fit md:translate-x-[-15%]'>
                      <p className='mb-4 text-base tracking-widest underline underline-offset-6 sm:mb-6 md:text-[21px]'>
                        VALENTINE'S DAY
                      </p>
                      <h1 className='font-rozha hero-font mb-5 leading-[110%] font-medium tracking-wide'>
                        GET 20% OFF ON YOUR <div>FIRST ORDER</div>
                      </h1>
                      <div className='relative mb-3 max-w-2xl text-sm xs:text-sm lg:mb-6'>
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
                        href='/products/rings'
                        className='relative flex items-center rounded-full bg-black py-2 px-3.5 text-xs xs:px-8 xs:py-2.5 xs:text-sm font-semibold text-white transition-all duration-300 before:absolute before:top-1 before:left-1 before:-z-10 before:h-full before:w-full before:rounded-full before:bg-white hover:before:opacity-0 md:py-3 md:text-base'
                      >
                        SHOP NOW <MoveRight className='ml-2 inline' />
                      </Link>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="absolute left-4 bottom-10 sm:left-10 sm:bottom-16 lg:bottom-32 text-left text-white px-4 sm:px-0 max-w-xl w-full">
                      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-4 leading-tight">
                        Discover the Summer Collection
                      </h2>
                      <p className="mb-3 sm:mb-5 text-xs sm:text-base md:text-lg max-w-md">
                        Celebrate with bright gemstones and radiant styles.
                      </p>
                      <Link
                        href="/"
                        className="inline-block bg-white text-black px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full text-sm sm:text-base font-medium hover:bg-opacity-90 transition"
                      >
                        Explore Now
                      </Link>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="absolute left-0 sm:left-10 top-23 sm:top-50 text-left text-white w-full px-4 sm:px-0">
                      <h1 className="text-lg sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-3 leading-snug font-sans">
                        For the Moments That Matter Most
                      </h1>
                      <h2 className="text-sm sm:text-xl md:text-2xl font-medium mb-4 sm:mb-5 max-w-sm leading-snug font-sans">
                        Timeless Jewelry for Your Forever
                      </h2>
                      {/* Optional paragraph can be re-enabled here if needed */}
                      {/* <p className="mb-4 text-xs sm:text-base md:text-lg max-w-md">
      Graceful pieces to complete your wedding story.
    </p> */}
                      <Link
                        href="/collections/bridal"
                        className="inline-block border border-white font-sans px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full text-sm sm:text-base font-medium hover:bg-white hover:text-black transition"
                      >
                        View Collection
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {[0, 1, 2].map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${current === index ? 'bg-white w-6' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>

      {showTooltip && (
        <div className='animate-in slide-in-from-bottom zoom-in-105 fixed bottom-8 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-xl border border-white/20 bg-black/90 px-5 py-4 text-center text-sm text-white shadow-xl ring-1 ring-white/10'>
          <p className='text-lg'>Promo code copied!</p>
          Apply at checkout for your exclusive discount.
        </div>
      )}
    </section>
  );
}
