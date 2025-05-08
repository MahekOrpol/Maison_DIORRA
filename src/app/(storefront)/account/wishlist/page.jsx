import React from 'react';
import PreviewCard3 from '@/components/preview-card';
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
      <div className='flex h-[50vh] flex-col items-center justify-center'>
        <div className='w-[120px] sm:w-[170px]'>
          <img src={'/img/wishlist.jpg'} />
        </div>
        <p className='text-muted-foreground text-sm sm:text-xl'>
          YOUR WISHLIST IS EMPTY.
        </p>
        <div className='flex gap-1 pt-3 sm:gap-4'>
          <Link
            href='/products'
            className='hover:bg-primary hover:text-primary-foreground inline-block rounded-md border border-black px-6 py-3 text-xs sm:px-9 sm:py-3 sm:text-lg'
          >
            Continue Shopping
          </Link>
          <Link
            href='/products'
            className='bg-primary text-primary-foreground inline-block rounded-md border border-black px-6 py-3 text-xs sm:px-9 sm:py-3 sm:text-lg'
          >
            Add products to your cart
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6'>
        {wishlist.map((item, i) => (
          // <div
          //   key={item.id}
          //   className='relative flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row'
          // >
          //   {/* Badge */}
          //   <Badge className='absolute top-3 right-3 z-10 rounded-full text-xs'>
          //     {item.tag}
          //   </Badge>

          //   {/* Image */}
          //   <div className='shrink-0'>
          //     <Image
          //       src={item.image}
          //       alt={item.title}
          //       width={100}
          //       height={100}
          //       className='rounded-md object-cover'
          //     />
          //   </div>

          //   {/* Details */}
          //   <div className='flex flex-1 flex-col justify-between'>
          //     <div>
          //       <h2 className='mb-1 text-lg font-semibold'>{item.title}</h2>
          //       <div className='flex items-center gap-2'>
          //         <span className='text-xl font-semibold'>
          //           ₹{item.price.toLocaleString()}
          //         </span>
          //         <span className='text-muted-foreground text-sm line-through'>
          //           ₹{item.originalPrice.toLocaleString()}
          //         </span>
          //       </div>
          //       <p className='text-sm text-green-600'>{item.offer}</p>
          //     </div>

          //     {/* Actions */}
          //     <div className='mt-4 flex gap-2'>
          //       <Button
          //         size='sm'
          //         variant='outline'
          //         className='gap-1 text-red-600'
          //       >
          //         <Heart className='h-4 w-4' />
          //         Remove
          //       </Button>
          //       <Button size='sm' className='gap-1'>
          //         <ShoppingCart className='h-4 w-4' />
          //         Move to Cart
          //       </Button>
          //     </div>
          //   </div>
          // </div>
          <PreviewCard3 key={i} />
        ))}
      </div>
    </div>
  );
}
