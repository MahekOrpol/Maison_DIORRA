'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PreviewCard from '@/components/preview-card';
import axios from 'axios';
import { toast } from 'sonner';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          toast.error('Please login to view your wishlist');
          setWishlistItems([]);
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        // Make sure we're working with an array
        const items = response.data?.data || response.data || [];
        setWishlistItems(items);
        console.log(items);
      } catch (error) {
        // console.error('Error fetching wishlist:', error);
        toast.error(
          error.response?.data?.message ||
            'Failed to load wishlist. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (isLoading) {
    return (
      <div className='sm:wrapper pt-4 pb-10'>
        <div className='flex h-[50vh] items-center justify-center'>
          <p>Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='sm:wrapper min-h-[60vh] pt-4 pb-10'>
      {wishlistItems?.length == 0 ? (
        <div className='flex flex-col items-center justify-center'>
          <div className='w-[120px] sm:w-[170px]'>
            <img src={'/img/wishlist.jpg'} alt='Empty wishlist' />
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
            {wishlistItems.map((item) => (
              <PreviewCard key={item._id} product={item.product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
