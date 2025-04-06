import React from 'react';
import { BlogsFilter } from '../page';
import { BlogsBanner } from '../components/blogs-banner';
import Image from 'next/image';
import { ReviewForm } from '../components/review-form';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, MoveRight } from 'lucide-react';

export default function Page({ params }) {
  const { slug } = params;
  return (
    <>
      <BlogsBanner
        imgUrl='/img/banner/banner3.jpg'
        title='Blogs and Articles'
        subtitle='Home - Blogs and Articles'
      />
      <div className='wrapper flex gap-4'>
        {/* blog details */}
        <article className='flex-1'>
          {/* hero */}
          <div>
            <Image
              src='/img/blogs/blog2.png'
              width={800}
              height={400}
              alt='Blog header'
            />
            <p>Posted by Feronia - Mar 09 2024</p>
            <h2>The North Earings Bronze</h2>
          </div>
          {/* details */}
          <div>
            <p>
              Explore the history behind vintage pieces, how to style them, and
              tips for caring for them. Share stories of famous vintage pieces
              and their significance. Offer a guide on selecting an engagement
              ring that reflects personal style. Discuss different styles,
              settings, and stones, and include tips for budget considerations.
              Provide tips on how to successfully layer necklaces for a trendy
              look.{' '}
            </p>
            <div>
              <blockquote>
                “Learn how to keep your jewelry shining bright! From cleaning
                techniques to storage solutions, our blog offers expert advice.
                Each item is handcrafted with love and precision, using
                ethically sourced materials to ensure beauty that you feel good
                about. Learn how to keep your jewelry shining bright! From
                cleaning techniques to storage solutions, our blog offers expert
                advice.”
              </blockquote>
              -- Jasmin Rosie
            </div>
            <div>
              <h3>Trends to Watch in the Jewelry World</h3>
              <ul>
                {Array.from({ length: 8 }).map((item, i) => (
                  <li key={i}>
                    Jewellery Care 101: Keeping Your Pieces Sparkling
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
        <BlogsFilter className='' />
      </div>
      {/* prev - nextt */}
      <div className='p grid grid-cols-2 border-y py-2'>
        <Link href='#' className='inline-flex items-center gap-2 border-r p-2'>
          <Image
            src='/img/blogs/blog11.png'
            width={100}
            height={100}
            alt='article thumbnail'
          />
          <div>
            <p className='tracking-widest'>
              <ChevronLeft />
              PREVIOUS BLOG
            </p>
            <p>Redefining Elegance through Unique Charms</p>
            <p>
              Read More <MoveRight />
            </p>
          </div>
        </Link>
        <Link href='#' className='inline-flex items-center gap-2 p-6'>
          <Image
            src='/img/blogs/blog11.png'
            width={80}
            height={80}
            alt='article thumbnail'
          />
          <div>
            <p className='tracking-widest'>
              <ChevronLeft />
              PREVIOUS BLOG
            </p>
            <p>Redefining Elegance through Unique Charms</p>
            <p>
              Read More <MoveRight />
            </p>
          </div>
        </Link>
      </div>
      {/* review */}
      <ReviewForm />
    </>
  );
}
