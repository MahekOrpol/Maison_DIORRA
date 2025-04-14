'use client';
import React from 'react';
import Heading from './heading';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import PreviewCard from './preview-card';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';

export default function RelatedProducts({ className }) {
  return (
    <section className={cn('mb-4 md:mb-8 lg:mb-12', className)}>
      <Heading
        title='Related Products'
        subtitle='You might also like to buy'
        className='mb-1 sm:mb-3 md:mb-3 lg:mb-3'
      />
      <div className='relative'>
        {/* Left gradient fade */}
        {/* <div className='pointer-events-none absolute top-0 -left-3 z-10 h-full w-6 bg-gradient-to-r from-white to-transparent' /> */}

        {/* Right gradient fade */}
        {/* <div className='pointer-events-none absolute top-0 -right-3 z-10 h-full w-6 bg-gradient-to-l from-white to-transparent' /> */}

        <Carousel
          opts={{
            align: 'start',
            skipSnaps: false,
            slidesToScroll: 1,
            loop: true
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false, // don't stop on drag/touch
              stopOnMouseEnter: false // don't stop on hover
            })
          ]}
        >
          <CarouselContent className='-ml-2 min-[400px]:-ml-3 sm:-ml-6 lg:-ml-8'>
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem
                key={index}
                className='basis-[49%] pl-2 min-[400px]:pl-3 sm:basis-[49.5%] sm:pl-6 lg:basis-[33.30%] lg:pl-8 xl:basis-[24.9%]'
              >
                <PreviewCard />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className='z-20 translate-x-8 border-0 text-black xl:translate-x-6' /> */}
          {/* <CarouselNext className='z-20 -translate-x-8 border-0 text-black xl:-translate-x-6' /> */}
        </Carousel>
      </div>
    </section>
  );
}
