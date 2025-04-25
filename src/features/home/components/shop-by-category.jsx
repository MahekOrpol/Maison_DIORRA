import Heading from '@/components/heading';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const categories = [
  { name: 'Rings', image: '/img/category/rings2.jpg' },
  { name: 'Earrings', image: '/img/category/earrings2.jpg' },
  { name: 'Pendant', image: '/img/category/pendant-4.jpg' },
  { name: 'Bracelet', image: '/img/category/bracelet2.jpg' }
];

export default function ShopByCategory() {
  return (
    <section className='wrapper pt-6 md:pt-7 lg:pt-8 xl:pt-10'>
      <Heading
        title='Shop by Category'
        subtitle='Your Imagination, Our Craftsmanship'
      />
      <div className='xs:gap-6 grid grid-cols-2 gap-4 sm:flex-row md:grid-cols-4 md:gap-4 lg:gap-5'>
        {categories.map(({ name, image }) => (
          <Link
            key={name}
            href='#'
            className='flex flex-col items-center text-center text-lg font-medium transition-all duration-200'
          >
            <div className='w-full overflow-hidden rounded-2xl 2xl:rounded-[20px]'>
              <Image
                src={image}
                alt={`${name} category`}
                width={250}
                height={100}
                className='w-full rounded-md object-cover transition-transform duration-300 hover:scale-110'
              />
            </div>
            <p className='3xl:text-3xl text-lg md:text-xl lg:my-2 lg:text-2xl'>
              {name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
