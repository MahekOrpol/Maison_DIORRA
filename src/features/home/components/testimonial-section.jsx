'use client';
import Heading from '@/components/heading';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';

export default function TestimonialSection() {
  return (
    <section className='wrapper mb-10 pt-9 md:mb-16 md:pt-12 lg:pt-16 xl:mb-20 xl:pt-20'>
      <Heading
        title='Client Testimonial'
        subtitle='What Clients Say About Us'
      />
      <div className='relative'>
        {/* Left gradient fade */}
        <div className='pointer-events-none absolute top-0 -left-4 z-10 h-full w-6 bg-gradient-to-r from-white to-transparent' />

        {/* Right gradient fade */}
        <div className='pointer-events-none absolute top-0 -right-4 z-10 h-full w-6 bg-gradient-to-l from-white to-transparent' />
        <Carousel
          className=''
          opts={{
            align: 'start',
            loop: true
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false, // keeps autoplay running
              stopOnMouseEnter: true, // pause when hovered (optional)
              resetProgress: false
            })
          ]}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className='md:basis-1/2 xl:basis-1/3'>
                <div className='rounded-lg border border-gray-200 bg-white p-3 shadow-lg md:p-6'>
                  {/* Author Section */}
                  <div className='flex items-center gap-4'>
                    <img
                      src={`https://randomuser.me/api/portraits/men/${30 + index}.jpg`}
                      alt='Author Image'
                      className='h-12 w-12 rounded-full border border-gray-300'
                    />
                    <div>
                      <h4 className='text-lg font-semibold text-gray-900'>
                        John Doe
                      </h4>
                      <p className='text-sm text-gray-500'>CEO, TechCorp</p>
                    </div>
                  </div>
                  {/* Quote */}
                  <p className='full mt-2 text-sm font-light whitespace-normal md:mt-4 lg:text-base'>
                    "This product has transformed the way we do business. The
                    team is amazing, and the support has been outstanding.
                    Highly recommend!"
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='z-20 translate-x-6 border-none xl:translate-x-4' />
          <CarouselNext className='z-20 -translate-x-7 border-none xl:-translate-x-4' />
        </Carousel>
      </div>
    </section>
  );
}
