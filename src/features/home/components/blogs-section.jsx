'use client';
import Heading from '@/components/heading';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function BlogsSection() {
  return (
    <section className='wrapper pt-6 md:pt-7 lg:pt-10 xl:pt-13 2xl:pt-16'>
      <Heading
        title='Blogs and Articles'
        subtitle='Affordable luxury for everyday wear'
      />
      <div className='= relative'>
        {/* Left gradient fade */}
        {/* <div className='pointer-events-none absolute top-0 -left-4 z-10 h-full w-6 bg-gradient-to-r from-white to-transparent' /> */}
        {/* Right gradient fade */}
        {/* <div className='pointer-events-none absolute top-0 -right-4 z-10 h-full w-6 bg-gradient-to-l from-white to-transparent' /> */}
        <Carousel
          className='w-full'
          opts={{
            align: 'start',
            loop: true
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false, // keeps autoplay running
              stopOnMouseEnter: false, // dont pause when hovered (optional)
              resetProgress: false
            })
          ]}
        >
          <CarouselContent className='-ml-4 md:-ml-4'>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className='pl-4 sm:basis-1/2 md:pl-4 xl:basis-1/3'
              >
                <Link
                  href='/blogs/slug'
                  className='flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-md transition duration-300 ease-in-out hover:border-black/50'
                >
                  {/* Image with fixed aspect ratio */}
                  <div className='aspect-[16/9] w-full overflow-hidden rounded-lg'>
                    <Image
                      src={`/img/blogs/blog${index + 1}.png`}
                      alt='Blog Image'
                      className='h-full w-full object-cover transition duration-300 ease-in-out hover:scale-108 hover:rotate-2'
                      width={380}
                      height={210}
                    />
                  </div>

                  {/* Content */}
                  <div className='flex flex-1 flex-col px-4 pb-4'>
                    <p className='text-sm lg:text-base'>
                      22.DEC.2025 <span className='text-xl'>•</span> BY FERONIA
                    </p>
                    <h3 className='text-xl font-medium lg:text-2xl'>
                      Blog Post Title {index + 1}
                    </h3>
                    <hr className='my-1 border-black/50' />
                    <p className='flex-1 text-sm font-light lg:text-base'>
                      A short description of the blog post goes here. It
                      provides a quick overview to the reader...
                    </p>
                    <button className='mt-2 inline-flex w-fit items-center rounded-full bg-black px-4 py-1 text-sm font-semibold text-white transition hover:bg-black/80'>
                      Read More <MoveRight className='ml-2' />
                    </button>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* <CarouselPrevious className='z-20 translate-x-6 border-none xl:translate-x-4' />
          <CarouselNext className='z-20 -translate-x-6 border-none xl:-translate-x-4' /> */}
        </Carousel>
      </div>
    </section>
  );
}
