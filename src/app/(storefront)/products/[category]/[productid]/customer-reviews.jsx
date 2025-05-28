'use client';
import ReviewModal from '@/components/modals/review-model';
import { baseApiUrl, cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaUserCircle
} from 'react-icons/fa';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { MdStarRate, MdVerified } from 'react-icons/md';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useUserStore } from '@/store/user-store';
import { Button } from '@/components/ui/button';

export const CustomerReviews = ({ className, productId }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openNotAllowedModal, setOpenNotAllowedModal] = useState(false);

  const { isLoggedIn } = useUserStore();

  const reviewsPerPage = 3;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${baseApiUrl}/api/v1/review/get/product/${productId}`
        );
        if (!response.ok) {
          throw new Error(response.message);
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleAddReview = () => {
    if (!isLoggedIn) {
      setOpenNotAllowedModal(true);
      return;
    }
    setShowModal(true);
  };

  // Calculate page count
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  if (loading) {
    return <div className={cn('mt-8', className)}>Loading reviews...</div>;
  }

  if (error) {
    return <div className={cn('mt-8', className)}>Error: {error}</div>;
  }

  return (
    <>
      <div className={cn('mt-8', className)}>
        <h2 className='max-w-4xl text-2xl font-medium md:text-3xl md:font-medium lg:text-4xl'>
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
            <div className='flex items-center justify-between pt-6 pb-3 sm:justify-start sm:gap-20'>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className='flex items-center gap-1.5 bg-gray-200 px-4 py-2 disabled:opacity-50'
              >
                <FaLongArrowAltLeft />
                Previous
              </button>
              <span className='text-sm'>
                Review {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className='flex items-center gap-1.5 bg-gray-200 px-4 py-2 disabled:opacity-50'
              >
                Next
                <FaLongArrowAltRight />
              </button>
            </div>
          </>
        )}

        <div className='pt-5'>
          <button
            onClick={handleAddReview}
            className='w-44 bg-black p-2 text-xl font-medium text-white'
          >
            Add a Review
          </button>
          {/* <p className='mb-4'>
            You must be{' '}
            <Link href='/login' className='pe-2 font-semibold hover:underline'>
              logged in
            </Link>
            to post a review.
          </p> */}
        </div>
      </div>
      <Dialog open={openNotAllowedModal} onOpenChange={setOpenNotAllowedModal}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className='text-lg'>Login Required</DialogTitle>
            <DialogDescription className={'py-4'}>
              You must be logged in to post a product review.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='mt-4'>
            <Button
              variant='outline'
              onClick={() => setOpenNotAllowedModal(false)}
            >
              Cancel
            </Button>
            <Link
              className='bg-primary text-primary-foreground rounded-md px-8 py-1'
              href='/login'
            >
              {' '}
              Login{' '}
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ReviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        productId={productId}
        onReviewSubmitted={() => {
          // Refresh reviews after submission
          setCurrentPage(1);
          fetchReviews();
        }}
      />
    </>
  );
};

export function TestimonialCard({
  userId,
  msg: content,
  rating,
  createdAt,
  image
}) {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const openCarousel = (index) => {
    setSelectedImageIndex(index);
    setIsCarouselOpen(true);
  };

  return (
    <>
      <div className='xs:pb-3 flex max-w-4xl items-center gap-2 border-b pb-2.5 md:gap-4 md:pb-6'>
        {/* User avatar section */}
        <div className='flex w-fit items-center justify-center self-start rounded-full border'>
          <div className='rounded-full bg-white'>
            <FaUserCircle className='h-14 w-14 rounded-full object-cover' />
          </div>
        </div>

        {/* Review content section */}
        <div className='flex-1'>
          <div className='flex items-center gap-3'>
            <span className='xs:text-xl inline-flex items-center gap-1 text-sm'>
              {userId?.name || 'Anonymous'}
              <MdVerified className='inline fill-green-700' size={20} />
            </span>
            <span className='xs:text-sm text-xs'>VERIFIED PURCHASE</span>
          </div>

          <div className='flex items-center gap-3 pt-1 text-sm font-semibold sm:text-base'>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <MdStarRate
                  key={i}
                  className={`h-5 w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
                />
              ))}
            </div>
            <p className='text-sm'>{formattedDate}</p>
          </div>
          <p className='pt-3 text-xs leading-4 font-light sm:text-base lg:text-[18px]'>
            {content}
          </p>
          {/* Image gallery */}
          {Array.isArray(image) && image.length >= 1 && (
            <div className='my-3 flex flex-wrap gap-2'>
              {image.map((img, index) => (
                <div
                  key={index}
                  className='relative h-24 w-24 cursor-pointer overflow-hidden rounded-md border transition-opacity hover:opacity-80'
                  onClick={() => openCarousel(index)}
                >
                  <Image
                    src={baseApiUrl + img}
                    alt={`Review image ${index + 1}`}
                    fill
                    className='object-cover'
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Carousel Modal */}
      <Dialog open={isCarouselOpen} onOpenChange={setIsCarouselOpen}>
        <DialogTitle className='sr-only'>Review Images</DialogTitle>
        <DialogContent
          className='flex h-full max-h-[60vh] w-[95%] flex-col overflow-hidden border-0 p-0 text-white sm:max-w-2xl md:w-full md:flex-row md:text-black lg:max-w-4xl'
          onInteractOutside={(e) => e.preventDefault(setIsCarouselOpen(false))} // Prevent closing when clicking outside
        >
          {/* Main image display */}
          <div className='relative h-full flex-1 bg-black'>
            <Image
              src={baseApiUrl + image[selectedImageIndex]}
              alt={`Review image ${selectedImageIndex + 1}`}
              fill
              className='object-contain'
            />

            {/* Navigation arrows */}
            {image.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(
                      (prev) => (prev - 1 + image.length) % image.length
                    );
                  }}
                  className='bg-opacity-50 hover:bg-opacity-70 absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white/50 p-1 text-black'
                >
                  <IoMdArrowDropleft size={28} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) => (prev + 1) % image.length);
                  }}
                  className='bg-opacity-50 hover:bg-opacity-70 absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white/50 p-1 text-black'
                >
                  <IoMdArrowDropright size={28} />
                </button>
              </>
            )}
          </div>

          {/* Side content */}
          <div className='w-full overflow-y-auto bg-white p-6 md:w-80'>
            <div className='mb-4 flex items-center gap-3'>
              <div className='h-12 w-12 overflow-hidden rounded-full'>
                <FaUserCircle className='h-full w-full text-gray-400' />
              </div>
              <div>
                <h3 className='text-lg font-medium text-black sm:text-xl'>
                  {userId?.name || ''}
                </h3>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <MdStarRate
                      key={i}
                      className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className='mb-3 text-gray-700'>{content}</p>
            <p className='text-sm text-gray-500'>{formattedDate}</p>

            {image.length > 1 && (
              <div className='mt-6'>
                <h4 className='mb-2 text-sm font-medium text-black'>
                  Images ({selectedImageIndex + 1}/{image.length})
                </h4>
                <div className='flex gap-2 overflow-x-auto px-2 py-2'>
                  {image.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded border ${index === selectedImageIndex ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <Image
                        src={baseApiUrl + img}
                        alt={`Thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
