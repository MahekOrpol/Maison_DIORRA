import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import PreviewCard3 from '@/components/preview-card';
import { BsHandbagFill } from 'react-icons/bs';
import Link from 'next/link';

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
  return (
    <div className='wrapper pt-4 pb-10'>
      {/* <h1 className='mb-4 text-3xl font-bold md:mb-6'>Your Wishlist</h1> */}
      <div className='flex flex-col items-center justify-center h-[50vh]'>
        <div className='w-[150px]'>
          <img src={'/img/wishlist.jpg'} />
        </div>
        <p className='text-muted-foreground text-lg'>YOUR CART IS EMPTY.</p>
        <div className='flex gap-4 pt-3'>
          <Link
            href='/products'
            className='hover:bg-primary hover:text-primary-foreground inline-block rounded-md border border-black px-9 py-3'
          >
            Continue Shopping
          </Link>
          <Link
            href='/products'
            className='bg-primary text-primary-foreground inline-block rounded-md border border-black px-9 py-3'
          >
            Add products to your cart
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6'>
        {/* {wishlist.map((item, i) => (
          <div
            key={item.id}
            className='relative flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row'
          >
            {/* Badge */}
        {/* <Badge className='absolute top-3 right-3 z-10 rounded-full text-xs'>
              {item.tag}
            </Badge> */}

        {/* Image */}
        {/* <div className='shrink-0'>
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
                className='rounded-md object-cover'
              />
            </div> */}

        {/* Details */}
        {/* <div className='flex flex-1 flex-col justify-between'>
              <div>
                <h2 className='mb-1 text-lg font-semibold'>{item.title}</h2>
                <div className='flex items-center gap-2'>
                  <span className='text-xl font-semibold'>
                    ₹{item.price.toLocaleString()}
                  </span>
                  <span className='text-muted-foreground text-sm line-through'>
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                </div>
                <p className='text-sm text-green-600'>{item.offer}</p>
              </div> */}

        {/* Actions */}
        {/* <div className='mt-4 flex gap-2'>
                <Button
                  size='sm'
                  variant='outline'
                  className='gap-1 text-red-600'
                >
                  <Heart className='h-4 w-4' />
                  Remove
                </Button>
                <Button size='sm' className='gap-1'>
                  <ShoppingCart className='h-4 w-4' />
                  Move to Cart
                </Button>
              </div>
            </div>
          </div>
          <PreviewCard3 key={i} /> */}
        {/* ))}  */}
      </div>
    </div>
  );
}
