import BlogsSection from '@/features/home/components/blogs-section';
import React from 'react';
import BlogCard from './components/blog-card';
import Image from 'next/image';
import Link from 'next/link';
import { Banner } from '../about/page';
import { BlogsBanner } from './components/blogs-banner';

const blogPosts = [
  {
    image: '/img/blogs/blog1.png',
    title: 'Crafting Beauty from Nature',
    href: '/blog/1',
    date: '12.FEB.2025',
    author: 'BY TEAM FERONIA',
    excerpt:
      'Discover how our artisans blend nature and art to create timeless pieces...'
  },
  {
    image: '/img/blogs/blog2.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blog/2'
  },
  {
    image: '/img/blogs/blog3.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blog/2'
  },
  {
    image: '/img/blogs/blog4.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blog/2'
  },
  {
    image: '/img/blogs/blog5.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blog/2'
  },
  {
    image: '/img/blogs/blog6.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blog/2'
  },
  {
    image: '/img/blogs/blog7.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blog/2'
  },
  {
    image: '/img/blogs/blog8.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blog/2'
  },
  {
    image: '/img/blogs/blog9.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blog/2'
  },
  {
    image: '/img/blogs/blog1.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blog/2'
  },
  {
    image: '/img/blogs/blog2.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blog/2'
  }
];

export default function Page() {
  return (
    <>
      <BlogsBanner
        imgUrl='/img/banner/banner3.jpg'
        title='Blogs and Articles'
        subtitle='Home - Blogs and Articles'
      />
      <div className='wrapper flex w-full flex-col gap-4 py-18 lg:flex-row lg:justify-between'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
        <BlogsFilter className='' />
      </div>
    </>
  );
}

export function BlogsFilter({ className }) {
  return (
    <div className='flex w-full flex-col flex-wrap gap-4 md:flex-row lg:w-1/2 lg:flex-col'>
      <div className='rounded-md border p-4 shadow-md md:flex-1 lg:flex-0'>
        <h2 className='mb-4 text-xl font-medium underline underline-offset-4'>
          Popular posts
        </h2>
        <div className='flex flex-col gap-2'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div className='flex gap-2 border-black not-last:border-b' key={i}>
              <Image
                src='/img/blogs/blog10.png'
                width={100}
                height={100}
                alt='Blog image'
                className=''
              />
              <div>
                <p className='text-lg font-medium'>The North Earings Bronze</p>
                <p className='text-sm font-medium'>Mar 09 2024</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='rounded-md border p-4 shadow-md md:w-[45%] lg:w-full'>
        <h2 className='mb-4 border-b-2 border-black/20 pb-[1px] text-xl leading-8 font-medium underline underline-offset-10'>
          Category{' '}
        </h2>
        <ul className='flex flex-col gap-1 font-light'>
          <li>
            <Link href='#' className='inline-block hover:font-medium'>
              News
            </Link>
          </li>
          <li>
            <Link href='#' className='inline-block hover:font-medium'>
              Accessories
            </Link>
          </li>
          <li>
            <Link href='#' className='inline-block hover:font-medium'>
              Collection
            </Link>
          </li>
          <li>
            <Link href='#' className='inline-block hover:font-medium'>
              Fashion
            </Link>
          </li>
          <li>
            <Link href='#' className='inline-block hover:font-medium'>
              Jewellery
            </Link>
          </li>
          <li>
            <Link href='#' className='inline-block hover:font-medium'>
              Trends
            </Link>
          </li>
        </ul>
      </div>
      <div className='rounded-md border p-4 shadow-md md:w-full'>
        <h2 className='mb-4 border-b-2 border-black/20 pb-[1px] text-xl leading-8 font-medium underline underline-offset-10'>
          Tags{' '}
        </h2>
        <div className='flex flex-wrap gap-2'>
          <Link
            href='#'
            className='border border-black px-3 py-[2px] font-light transition-all duration-200 hover:bg-black hover:text-white'
          >
            Accessories
          </Link>
          <Link
            href='#'
            className='border border-black px-3 py-[2px] font-light transition-all duration-200 hover:bg-black hover:text-white'
          >
            Jewellery Collection
          </Link>
          <Link
            href='#'
            className='border border-black px-3 py-[2px] font-light transition-all duration-200 hover:bg-black hover:text-white'
          >
            Trends
          </Link>
          <Link
            href='#'
            className='border border-black px-3 py-[2px] font-light transition-all duration-200 hover:bg-black hover:text-white'
          >
            Fashion
          </Link>
          <Link
            href='#'
            className='border border-black px-3 py-[2px] font-light transition-all duration-200 hover:bg-black hover:text-white'
          >
            Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
