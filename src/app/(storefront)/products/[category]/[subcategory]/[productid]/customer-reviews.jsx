"use client"
import ReviewModal from '@/components/modals/review-model';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaLongArrowAltLeft, FaLongArrowAltRight, FaUserCircle } from 'react-icons/fa';
import { MdStarRate, MdVerified } from 'react-icons/md';

export const CustomerReviews = ({ className, data }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const reviews = data || []; // fallback to empty array

  // Calculate page count
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  return (
    <>
      <div className={cn('mt-8', className)}>
        <h2 className='text-2xl font-medium md:text-3xl md:font-medium lg:text-4xl max-w-4xl'>
          Customer Reviews :
          <hr className='mt-4 mb-4' />
        </h2>

        {reviews.length === 0 ? (
          <p className='text-gray-500'>No customer reviews yet.</p>
        ) : (
          <>
            <div className='space-y-6 md:space-y-3'>
              {currentReviews.map((review) => (
                <TestimonialCard key={review.id} {...review} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className='flex justify-between sm:justify-start sm:gap-20 items-center pt-6 pb-3'>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className='px-4 py-2 bg-gray-200 disabled:opacity-50 flex gap-1.5 items-center'
              >
                <FaLongArrowAltLeft />
                Previous
              </button>
              <span className='text-sm'>
                Review {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className='px-4 py-2 bg-gray-200 disabled:opacity-50 flex gap-1.5 items-center'
              >
                Next
                <FaLongArrowAltRight />
              </button>
            </div>
          </>
        )}

        <div className='pt-5'>
          <button
            onClick={() => setShowModal(true)}
            className='text-xl font-medium bg-black w-44 p-2 text-white'
          >
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
    <div className='xs:pb-3 flex items-center gap-2 border-b pb-2.5 md:gap-4 md:pb-6 max-w-4xl'>
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
            ))}
          </div>
          <p>{date}</p>
        </div>
        <p className='pt-3 text-xs leading-4 font-light sm:text-sm xl:text-[15px]'>
          {content}
        </p>
      </div>
    </div>
  );
}
