import Heading from '@/components/heading';
import { baseApiUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// const categories = [
//   {
//     label: 'Rings',
//     image: '/img/category/rings2.jpg',
//     href: '/products/rings'
//   },
//   {
//     label: 'Earrings',
//     image: '/img/category/earrings2.jpg',
//     href: '/products/earrings/diamond-earrings'
//   },
//   {
//     label: 'Pendant',
//     image: '/img/category/pendant-4.jpg',
//     href: '/products/necklaces/diamond-pendants'
//   },
//   {
//     label: 'Bracelet',
//     image: '/img/category/bracelet2.jpg',
//     href: '/products/bracelets'
//   }
// ];

export default function S3CategorySection({ data }) {
  return (
    <section className='wrapper pt-6 md:pt-7 lg:pt-8 xl:pt-14'>
      <Heading
        title='Shop by Category'
        subtitle='Your Imagination, Our Craftsmanship'
      />
      <div className='grid grid-cols-2 gap-x-4 gap-y-3.5 sm:flex-row sm:gap-x-6 sm:gap-y-4 md:grid-cols-4 md:gap-4 lg:gap-5'>
        {data.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.categoryName.toLowerCase()}`}
            className='flex flex-col items-center text-center text-lg font-medium transition-all duration-200'
          >
            <div className='w-full overflow-hidden rounded-2xl 2xl:rounded-[20px]'>
              <Image
                src={baseApiUrl + item.categoryImage}
                // src={item.categoryImage}
                alt={`${item.categoryName} category`}
                width={250}
                height={100}
                className='w-full rounded-md object-cover transition-transform duration-300 hover:scale-110'
              />
            </div>
            <p className='3xl:text-3xl text-lg leading-5 md:text-xl lg:my-2 lg:text-2xl'>
              {item.categoryName}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
