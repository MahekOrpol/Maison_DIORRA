"use client"
import ReviewModal from '@/components/modals/review-model';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { MdStarRate, MdVerified } from 'react-icons/md';

export const CustomerReviews = ({ className, data }) => {
    const [showModal, setShowModal] = useState(false);
    const reviews = [
      {
        id: 1,
        author: 'Rosalina Kelin',
        date: '19th June, 2024',
        authorImg: 'https://randomuser.me/api/portraits/women/1.jpg',
        rating: 5,
        content:
          'I recently purchased a ring from your store, and I am extremely happy with my purchase'
      },
      {
        id: 2,
        author: 'Jonathan Kale',
        date: '19th June, 2024',
        authorImg: 'https://randomuser.me/api/portraits/women/2.jpg',
        rating: 4,
        content:
          'I recently purchased a ring from your store, and I am extremely happy with my purchase'
      },
      {
        id: 3,
        author: 'Jonathan Kaleo',
        date: '19th June, 2024',
        authorImg: 'https://randomuser.me/api/portraits/men/1.jpg',
        rating: 2,
        content:
          'I recently purchased a ring from your store, and I am extremely happy with my purchase'
      }
    ];
    console.log(data); //null
    return (<>
      <div className={cn('mt-8', className)}>
        <h2 className='text-2xl font-medium md:text-3xl md:font-medium lg:text-4xl'>
          Customer Reviews :
          <hr className='mt-4 mb-4' />
        </h2>
        {data.length === 0 ? (
          <p className='text-gray-500'>No customer reviews yet.</p>
        ) : (
          <div className='space-y-6 md:space-y-3'>
            {data.map((review) => (
              <TestimonialCard key={review.id} {...review} />
            ))}
          </div>
        )}
        <div className='pt-5'>
          <button onClick={() => setShowModal(true)}
            className='text-xl font-medium md:text-xl md:font-medium bg-black w-44 p-2 text-white'>
            Add a Review
          </button>
          <p className='mb-4'>
            You must be{' '}
            <Link href='/login' className='pe-2 font-semibold hover:underline'>
              logged in
            </Link>
            to post a review.
          </p>
        </div>
      </div>
      <ReviewModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  };

  export function TestimonialCard({ author, authorImg, date, content, rating = 5 }) {
    return (
      <div className='xs:pb-3 flex items-center gap-2 border-b pb-2.5 md:gap-4 md:pb-6'>
        {/* Responsive Image Wrapper */}
        <div className='flex w-fit items-center justify-center self-start rounded-full border'>
          <div className='rounded-full bg-white'>
            {authorImg ? (
              <Image
                src={authorImg}
                alt='Testimonial Author'
                width={56}
                height={56}
                className='h-14 w-14 rounded-full object-cover'
              />
            ) : (
              <FaUserCircle className='h-14 w-14 rounded-full object-cover' />
            )}
          </div>
        </div>
  
        {/* Author Details */}
        <div className='flex-1'>
          <div className='flex items-center gap-3'>
            <span className='xs:text-xl inline-flex items-center gap-1 text-sm'>
              {author}
              <MdVerified className='inline fill-green-700' size={20} />
            </span>
            <span className='xs:text-sm text-xs'> VERIFIED PURCHASE</span>
          </div>
          <div className='flex items-center gap-3 pt-1 text-sm font-semibold sm:text-base'>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <MdStarRate
                  key={i}
                  className={`h-5 w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'} transition-colors duration-300`}
                />
              ))}{' '}
            </div>
            <p> {date}</p>
          </div>
          <p className='pt-3 text-xs leading-4 font-light sm:text-sm xl:text-[15px]'>
            {content}
          </p>
        </div>
      </div>
    );
  }
