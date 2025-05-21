'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PreviewCard from '@/components/preview-card';
import { useWishlistStore } from '@/store/wishlist-store';
import { toast } from 'sonner';
import { ProductCardSkeleton } from '@/components/skeleton';

export default function WishlistPage() {
  const { wishlist, refreshWishlist } = useWishlistStore();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [previousWishlistLength, setPreviousWishlistLength] = useState(0);

  useEffect(() => {
    const storedLength = localStorage.getItem('wishlistLength');
    setPreviousWishlistLength(storedLength ? parseInt(storedLength) : 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshWishlist();
        localStorage.setItem('wishlistLength', wishlist.length.toString());
        setIsInitialLoad(false);
      } catch (err) {
        toast.error('Failed to load wishlist. Please try again.');
        setIsInitialLoad(false);
      }
    };

    fetchData();
  }, [refreshWishlist, wishlist.length]);

  if (isInitialLoad) {
    return (
      <div className='sm:wrapper pt-4'>
        <h1 className='mb-4 text-2xl font-bold underline sm:text-3xl md:mb-6'>
          Your Wishlist
        </h1>
        <div className='3xl:grid-cols-4 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3'>
          {Array.from({ length: previousWishlistLength }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='sm:wrapper min-h-[60vh] pt-6 pb-10'>
      {wishlist?.length === 0 ? (
        <div className='flex flex-col items-center justify-center'>
          <div className='w-[120px] sm:w-[170px]'>
            <img src='/img/wishlist.jpg' alt='Empty wishlist' />
          </div>
          <p className='text-muted-foreground text-sm sm:text-xl'>
            YOUR WISHLIST IS EMPTY.
          </p>
          <div className='flex gap-1 pt-3 sm:gap-4'>
            <Link
              href='/products/rings'
              className='hover:bg-primary hover:text-primary-foreground inline-block rounded-md border border-black px-6 py-3 text-xs sm:px-9 sm:py-3 sm:text-lg'
            >
              Continue Shopping
            </Link>
            <Link
              href='/products/rings'
              className='bg-primary text-primary-foreground inline-block rounded-md border border-black px-6 py-3 text-xs sm:px-9 sm:py-3 sm:text-lg'
            >
              Add products to your cart
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h1 className='mb-4 text-2xl font-bold underline sm:text-3xl md:mb-6'>
            Your Wishlist
          </h1>
          <div className='3xl:grid-cols-4 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3'>
            {wishlist.map((item) => (
              <PreviewCard key={item._id} product={item.product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
