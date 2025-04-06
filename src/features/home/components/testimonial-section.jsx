import Heading from '@/components/heading';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import React from 'react';

export default function TestimonialSection() {
  return (
    <section className='wrapper py-6'>
      <Heading
        title='Client Testimonial'
        subtitle='What Clients Say About Us'
      />
      <Carousel
        className='mt-6'
        opts={{
          align: 'start',
          loop: true
        }}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
              <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-lg'>
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
                <p className='mt-4 w-full whitespace-normal text-gray-700'>
                  "This product has transformed the way we do business. The team
                  is amazing, and the support has been outstanding. Highly
                  recommend!"
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-white shadow-md' />
        <CarouselNext className='absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-white shadow-md' />
      </Carousel>
    </section>
  );
}
