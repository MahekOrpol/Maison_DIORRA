import React from 'react';
import Link from 'next/link';
import { cn, repeatProductsV1 } from '@/lib/utils';
import PreviewCard from '@/components/preview-card';

const products = repeatProductsV1(4);

const wishlist = [
  {
    id: 'ORD123456',
    image: '/img/category/pendant.png',
    title: 'Diamond Pendant Necklace',
    price: 12499,
    originalPrice: 14999,
    offer: 'Save ₹2500',
    tag: 'Bestseller'
  },
  {
    id: 'ORD123457',
    image: '/img/category/rings.png',
    title: 'Gold Ring - 18k with Stone',
    price: 8799,
    originalPrice: 10499,
    offer: 'Limited Stock!',
    tag: 'Limited Stock'
  },
  {
    id: 'ORD123458',
    image: '/img/category/bracelet.png',
    title: 'Silver Bracelet',
    price: 2499,
    originalPrice: 2999,
    offer: 'New Arrival',
    tag: 'New'
  },
  {
    id: 'ORD123459',
    image: '/img/category/earrings.png',
    title: 'Earring - 18k with Stone',
    price: 8799,
    originalPrice: 10299,
    offer: 'Save ₹1500',
    tag: 'Hot Deal'
  },
  {
    id: 'ORD123459',
    image: '/img/category/earrings.png',
    title: 'Earring - 18k with Stone',
    price: 8799,
    originalPrice: 10299,
    offer: 'Save ₹1500',
    tag: 'Hot Deal'
  }
];

export default function WishlistPage() {
  const isEmpty = wishlist.length === 0;

  return (
    <div className='sm:wrapper pt-4 pb-10'>
      {/* <h1 className='mb-4 text-3xl font-bold md:mb-6'>Your Wishlist</h1> */}
      {isEmpty ? (
        <div className='flex h-[50vh] flex-col items-center justify-center'>
          <div className='w-[120px] sm:w-[170px]'>
            <img src={'/img/wishlist.jpg'} />
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
        <>
          <h1 className='mb-4 text-2xl sm:text-3xl font-bold md:mb-6 underline'>Your Wishlist</h1>
          <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 lg:gap-6'>
            {products.map((product, i) => (
              <div
                key={i}
                className='keen-slider__slide overflow-hidden rounded-xl'
              >
                <PreviewCard isDraggable={false} product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
