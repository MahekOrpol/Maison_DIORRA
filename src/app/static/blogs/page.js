import BlogCard from './components/blog-card';
import Image from 'next/image';
import Link from 'next/link';
import { BlogsBanner } from './components/blogs-banner';

export const blogPosts = [
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
  },
  {
    image: '/img/blogs/blog9.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog1.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog2.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  }
];

export default function BlogsPage() {
  return (
    <div>
      <BlogsBanner
        imgUrl='/img/banner/banner2.png'
        title='Blogs and Articles'
        subtitle='Home - Blogs and Articles'
      />
      <div className='wrapper flex w-full flex-col gap-4 pt-6 pb-10 sm:gap-6 md:pt-8 xl:flex-row xl:justify-between xl:gap-[4%]'>
        {/* Blog posts container - takes full width on mobile, 2/3 on desktop */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:w-[66%]'>
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>

        {/* Sticky filter sidebar - full width on mobile, 1/3 on desktop */}
        <div className='xl:sticky xl:-top-1/4 xl:h-fit xl:w-[30%] xl:self-start'>
          <BlogsFilter />
        </div>
      </div>
    </div>
  );
}

export function BlogsFilter({ className }) {
  function TitleText({ text }) {
    return (
      <div className='mb-2 md:mb-4'>
        <h2 className='border-b-2 border-black/20 pb-2 text-2xl leading-8 font-medium md:pb-3 md:text-3xl'>
          {text}
        </h2>
        <hr className='-mt-[1px] w-[100px] border border-black' />
      </div>
    );
  }
  return (
    <div className={`${className} flex flex-col gap-4 sm:flex-row xl:flex-col`}>
      <div className='rounded-md border p-4 shadow-md sm:flex-1 xl:flex-0'>
        <TitleText text='Popular Posts' />
        <div className='flex flex-col'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              className='flex gap-2 border-black/40 py-3 not-last:border-b'
              key={i}
            >
              <Image
                src='/img/blogs/blog10.png'
                width={100}
                height={100}
                alt='Blog image'
                className=''
              />
              <div>
                <p className='mb-1 text-lg leading-5 font-medium'>
                  The North Earings Bronze
                </p>
                <p className='text-sm font-medium'>Mar 09 2024</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='sm:w-[45%] xl:w-full'>
        <div className='rounded-md border p-4 shadow-md'>
          <TitleText text='Category' />
          <ul className='flex flex-col gap-[10px] font-light'>
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
        <div className='mt-4 rounded-md border p-4 shadow-md'>
          <TitleText text='Tags' />
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
    </div>
  );
}
