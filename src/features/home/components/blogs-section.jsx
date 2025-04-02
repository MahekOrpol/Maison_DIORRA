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

export default function BlogsSection() {
  return (
    <section>
      <Heading
        title='Blogs and Articles'
        subtitle='Affordable luxury for everyday wear'
      />
      <div className='container'>
        <Carousel
          className='w-full'
          opts={{
            align: 'start',
            loop: true
          }}
        >
          <CarouselContent className='-ml-2 flex md:ml-0'>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className='pl-2 md:basis-1/3 md:pl-4'>
                <Link
                  href='#'
                  className='block overflow-hidden rounded-lg shadow-lg'
                >
                  <Image
                    src={`/img/blogs/blog${index + 1}.png`}
                    alt='Blog Image'
                    className='w-full object-cover'
                    width={500}
                    height={400}
                  />
                  <div className='p-4'>
                    <p className='mb-1 text-sm font-medium text-gray-500'>
                      22.DEC.2025 <span className='text-xl'>•</span> BY FERONIA
                    </p>
                    <h3 className='text-xl font-bold text-gray-900'>
                      Blog Post Title {index + 1}
                    </h3>
                    <hr className='my-1 border-gray-300' />
                    <p className='text-gray-700'>
                      A short description of the blog post goes here. It
                      provides a quick overview to the reader...
                    </p>
                    <button className='mt-4 inline-flex items-center rounded-full bg-black px-4 py-[6px] text-sm font-semibold text-white transition hover:bg-black/80'>
                      Read More <MoveRight className='ml-2' />
                    </button>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-white shadow-md' />
          <CarouselNext className='absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-white shadow-md' />
        </Carousel>
      </div>
    </section>
  );
}
