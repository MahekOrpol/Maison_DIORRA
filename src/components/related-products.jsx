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
    <section className={cn('mb-12', className)}>
      <Heading title='Related Products' subtitle='You might also like to buy' />
      <div className='relative'>
        {/* Left gradient fade */}
        <div className='pointer-events-none absolute top-0 -left-3 z-10 h-full w-6 bg-gradient-to-r from-white to-transparent' />

        {/* Right gradient fade */}
        <div className='pointer-events-none absolute top-0 -right-3 z-10 h-full w-6 bg-gradient-to-l from-white to-transparent' />

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
              stopOnInteraction: true
            })
          ]}
        >
          <CarouselContent className='my-2 -ml-2 lg:-ml-4'>
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem
                key={index}
                className='basis-1/2 pl-2 lg:basis-1/3 lg:pl-4 xl:basis-1/4'
              >
                <PreviewCard />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='z-20 translate-x-8 border-0 text-black xl:translate-x-6' />
          <CarouselNext className='z-20 -translate-x-8 border-0 text-black xl:-translate-x-6' />
        </Carousel>
      </div>
    </section>
  );
}
