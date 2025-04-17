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
import BlogCard from '@/app/blogs/components/blog-card';

const blogPosts = [
  {
    image: '/img/blogs/blog1.png',
    title: 'Crafting Beauty from Nature',
    href: '/blogs/1',
    date: '12.FEB.2025',
    author: 'BY TEAM FERONIA',
    excerpt:
      'Discover how our artisans blend nature and art to create timeless pieces...'
  },
  {
    image: '/img/blogs/blog2.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog3.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog4.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog5.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog6.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog7.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog8.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  }
];

export default function BlogsSection() {
  return (
    <section className='wrapper pt-6 md:pt-7 lg:pt-8 xl:pt-10'>
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
            {blogPosts.map((post, index) => (
              <CarouselItem
                key={index}
                className='py-2 pl-4 sm:basis-1/2 md:pl-4 xl:basis-1/3'
              >
                <BlogCard {...post} />
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
