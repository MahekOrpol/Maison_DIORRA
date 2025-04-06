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

export default function RelatedProducts() {
  return (
    <section className='mb-12'>
      <Heading title='Related Products' subtitle='You might also like to buy' />
      <Carousel className=''>
        <CarouselContent className=''>
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem
              key={index}
              className='basis-1/2 lg:basis-1/3 xl:basis-1/4'
            >
              <PreviewCard key={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='translate-x-8' />
        <CarouselNext className='-translate-x-8' />
      </Carousel>
    </section>
  );
}
