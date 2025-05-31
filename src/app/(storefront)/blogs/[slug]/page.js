import React from 'react';
import { BlogsFilter } from '../page';
import { BlogsBanner } from '../blogs-banner';
import Image from 'next/image';
// import { ReviewForm } from '../review-form';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import { baseApiUrl } from '@/lib/utils';
import { RichTextRenderer } from '@/components/rich-text-renderer';

const BASE_URL = 'http://192.168.1.6:5000';

async function getBlogCategories() {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/blog-categories`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Failed to fetch blog categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
}

async function getBlogTags() {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/tags`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Failed to fetch blog tags');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    return [];
  }
}

export default async function Page({ params, searchParams }) {
  const { slug } = params;
  const categoryId = searchParams?.category || null;
  const tagId = searchParams?.tags || null;

  // Fetch data in parallel
  const [blogRes, categories, tags, popularPostsRes] = await Promise.all([
    fetch(`${BASE_URL}/api/v1/blogs/${slug}`, { cache: 'no-cache' }),
    getBlogCategories(),
    getBlogTags(),
    fetch(`${BASE_URL}/api/v1/blogs?isPopular=true&limit=4`, {
      cache: 'no-store'
    })
  ]);

  const { blog, previous, next } = await blogRes.json();
  const popularPostsData = await popularPostsRes.json();
  const popularPosts = popularPostsData.results || [];

  return (
    <div className='mb-8 md:mb-10'>
      <BlogsBanner
        imgUrl='/img/banner2.png'
        title='Blogs and Articles'
        subtitle='Home - Blogs and Articles'
        className='h-[210px]'
      />
      <section className='wrapper flex w-full flex-col gap-4 py-3 md:my-8 lg:gap-[4%] xl:flex-row xl:justify-between'>
        {/* blog details - takes about 70% width on desktop */}
        <article className='flex-1 xl:w-[66%]'>
          {/* hero */}
          <div className='mb-3 border-b-2 pb-2'>
            <div>
              <img
                src={`${BASE_URL}${blog.coverImage}`}
                alt='Blog Image'
                className='h-full w-full rounded-md'
              />
            </div>
            <p className='my-1 text-sm font-light md:my-2 lg:text-base'>
              Posted by {blog.authorName || 'Feronia'} -{' '}
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              })}
            </p>
            <h2 className='pt-0.5 sm:pt-1.5 text-xl leading-6 font-semibold md:text-3xl lg:text-3xl'>
              {blog.title}
            </h2>
          </div>

          {/* blog content */}
          <div className='space-y-4 text-sm md:text-base'>
            <div key={blog.id} className='space-y-4'>
              <p className='text-justify'>{blog.teaser}</p>
              <div>
                <ImQuotesLeft className='h-10 w-10' />
                <RichTextRenderer html={blog.body} />
                <ImQuotesRight className='ml-auto h-10 w-10' />
                <p className='font-medium'>- {blog.authorName || 'Feronia'}</p>
              </div>
              <div className='prose max-w-none'></div>
            </div>
          </div>
        </article>

        {/* Sticky sidebar - takes about 30% width on desktop */}
        <div className='xl:w-[30%]'>
          <div className='xl:sticky xl:top-10 xl:h-fit xl:self-start'>
            <BlogsFilter
              className='w-full xl:max-w-md'
              categories={categories}
              tags={tags}
              selectedCategoryId={categoryId}
              selectedTagId={tagId}
              popularPosts={popularPosts}
            />
          </div>
        </div>
      </section>

      {/* prev - next */}
      <div className='wrapper my-6 grid grid-cols-1 justify-between border-y py-2 sm:grid-cols-2'>
        {previous ? (
          <Link
            href={`/blogs/${previous.slug}`}
            className='inline-flex items-center gap-4 p-2 sm:border-r'
          >
            <img
              src={`${BASE_URL}${previous.coverImage}`}
              width={90}
              height={90}
              alt='article thumbnail'
              className='h-[80px] w-[100px] rounded-lg object-cover sm:h-[100px]'
            />
            <div className='space-y-1'>
              <p className='xs:text-xs inline-flex items-center text-[10px] font-medium tracking-widest'>
                <ChevronLeft size={18} className='-ml-1 inline' />
                PREVIOUS BLOG
              </p>
              <p className='xs:text-base text-sm leading-4 font-medium lg:text-lg'>
                {previous.title}
              </p>
              <p className='text-sm font-medium'>
                Read More <MoveRight className='inline' size={16} />
              </p>
            </div>
          </Link>
        ) : (
          <div className='inline-flex items-center gap-4 border-r p-2 text-gray-400'>
            <Image
              src='/img/blogs/blog11.png'
              width={90}
              height={90}
              alt='article thumbnail'
              className='h-[80px] w-[100px] rounded-lg object-cover opacity-50 sm:h-[100px]'
            />
            <div className='space-y-1'>
              <p className='xs:text-xs inline-flex items-center text-[10px] font-medium tracking-widest'>
                <ChevronLeft size={18} className='-ml-1 inline' />
                PREVIOUS BLOG
              </p>
              <p className='xs:text-base text-sm leading-4 font-medium lg:text-lg'>
                No older posts
              </p>
              <p className='mt-1 text-sm'>
                You've reached the beginning of our blog
              </p>
            </div>
          </div>
        )}
        {next ? (
          <Link
            href={`/blogs/${next.slug}`}
            className='inline-flex items-center gap-4 justify-self-end p-2'
          >
            <div className='space-y-1 text-right'>
              <p className='xs:text-xs inline-flex items-center text-[10px] font-medium tracking-widest'>
                NEXT BLOG
                <ChevronRight size={18} className='inline' />
              </p>
              <p className='xs:text-base text-sm leading-4 font-medium lg:text-lg'>
                {next.title}
              </p>
              <p className='text-sm font-medium'>
                Read More <MoveRight className='inline' size={16} />
              </p>
            </div>
            <img
              src={`${BASE_URL}${next.coverImage}`}
              width={90}
              height={90}
              alt='article thumbnail'
              className='h-[80px] w-[100px] rounded-lg object-cover sm:h-[100px]'
            />
          </Link>
        ) : (
          <div className='inline-flex items-center gap-4 justify-self-end p-2 text-gray-400'>
            <div className='space-y-1 text-right'>
              <p className='xs:text-xs inline-flex items-center text-[10px] font-medium tracking-widest'>
                NEXT BLOG
                <ChevronRight size={18} className='-ml-1 inline' />
              </p>
              <p className='xs:text-base text-sm leading-4 font-medium lg:text-lg'>
                No newer posts available
              </p>
              <p className='mt-1 text-sm'>
                You're viewing our most recent content
              </p>
            </div>
            <Image
              src='/img/blogs/blog11.png'
              width={90}
              height={90}
              alt='article thumbnail'
              className='h-[80px] w-[100px] rounded-lg object-cover opacity-50 sm:h-[100px]'
            />
          </div>
        )}
      </div>
      {/* <ReviewForm /> */}
    </div>
  );
}
