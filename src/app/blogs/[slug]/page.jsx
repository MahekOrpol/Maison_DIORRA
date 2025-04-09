import React from 'react';
import { BlogsFilter } from '../page';
import { BlogsBanner } from '../components/blogs-banner';
import Image from 'next/image';
import { ReviewForm } from '../components/review-form';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';

export default async function Page({ params }) {
  const { slug } = await params;
  return (
    <div className='mb-8 md:mb-10'>
      <BlogsBanner
        imgUrl='/img/banner/banner3.jpg'
        title='Blogs and Articles'
        subtitle='Home - Blogs and Articles'
        className='h-[200px]'
      />
      <section className='wrapper flex w-full flex-col gap-4 py-4 lg:gap-8 xl:flex-row xl:justify-between'>
        {/* blog details */}
        <article className='flex-1'>
          {/* hero */}
          <div className='mb-4 border-b-2 pb-2'>
            <div>
              <Image
                src='/img/blogs/blog-details.png'
                width={800}
                height={400}
                alt='Blog header w-full'
                className='w-full'
              />
            </div>
            <p className='mt-2 text-sm font-light lg:text-base xl:text-lg'>
              Posted by Feronia - Mar 09 2024
            </p>
            <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
              The North Earings Bronze
            </h2>
          </div>
          {/* details */}
          <div className='space-y-4 text-sm md:text-base'>
            <p className='text-justify'>
              Explore the history behind vintage pieces, how to style them, and
              tips for caring for them. Share stories of famous vintage pieces
              and their significance. Offer a guide on selecting an engagement
              ring that reflects personal style. Discuss different styles,
              settings, and stones, and include tips for budget considerations.
              Provide tips on how to successfully layer necklaces for a trendy
              look.{' '}
            </p>
            <div>
              <div>
                <ImQuotesLeft className='h-10 w-10' />
                <blockquote className='mx-auto w-4/5'>
                  “Learn how to keep your jewelry shining bright! From cleaning
                  techniques to storage solutions, our blog offers expert
                  advice. Each item is handcrafted with love and precision,
                  using ethically sourced materials to ensure beauty that you
                  feel good about. Learn how to keep your jewelry shining
                  bright! From cleaning techniques to storage solutions, our
                  blog offers expert advice.”
                </blockquote>
                <ImQuotesRight className='ml-auto h-10 w-10' />
              </div>
              <p className='font-medium'>- Jasmin Rosie</p>
            </div>
            <div className=''>
              <h3 className='text-2xl font-medium'>
                Trends to Watch in the Jewelry World
              </h3>
              <ul className='ml-10'>
                {Array.from({ length: 8 }).map((item, i) => (
                  <li className='list-disc' key={i}>
                    Jewellery Care 101: Keeping Your Pieces Sparkling
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
        <BlogsFilter className='max-w-screen sm:w-full xl:max-w-md' />
      </section>
      {/* prev - nextt */}
      <div className='wrapper grid grid-cols-1 justify-between border-y py-2 sm:grid-cols-2'>
        <Link href='#' className='inline-flex items-center gap-4 border-r p-2'>
          <Image
            src='/img/blogs/blog11.png'
            width={90}
            height={90}
            alt='article thumbnail'
            className='w-[90px] rounded-lg lg:w-[100px]'
          />
          <div className='space-y-1'>
            <p className='text-xs font-medium tracking-widest'>
              <ChevronLeft size={18} className='inline' />
              PREVIOUS BLOG
            </p>
            <p className='text-lg leading-5 font-medium'>
              Redefining Elegance through Unique Charms
            </p>
            <p className='text-sm font-medium'>
              Read More <MoveRight className='inline' size={16} />
            </p>
          </div>
        </Link>
        <Link
          href='#'
          className='inline-flex items-center gap-4 justify-self-end p-2'
        >
          <div className='space-y-1 text-right'>
            <p className='text-xs font-medium tracking-widest'>
              NEXT BLOG
              <ChevronRight size={18} className='inline' />
            </p>
            <p className='text-lg leading-5 font-medium'>
              Redefining Elegance through Unique Charms
            </p>
            <p className='text-sm font-medium'>
              Read More <MoveRight className='inline' size={16} />
            </p>
          </div>
          <Image
            src='/img/blogs/blog11.png'
            width={90}
            height={90}
            alt='article thumbnail'
            className='w-[90px] rounded-lg lg:w-[100px]'
          />
        </Link>
      </div>
      {/* review */}
      <ReviewForm />
    </div>
  );
}
