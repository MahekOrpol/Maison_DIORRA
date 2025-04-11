'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

const product = {
  id: '6',
  name: 'Classic Diamond Ring',
  description: 'Elegant solitaire diamond ring with white gold band.',
  price: '68999',
  images: [
    '/img/preview/rose1.png',
    '/img/preview/rose2.png',
    '/img/preview/rose3.png'
  ]
};

export default function ProductCard2() {
  const [liked, setLiked] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false
  });

  return (
    <Card className='group relative gap-0 overflow-hidden rounded-xl py-0 shadow transition-shadow duration-300 hover:shadow-lg'>
      {/* Wish Button */}
      <Button
        variant='ghost'
        className='absolute top-2 right-2 z-10 rounded-full bg-white p-2 hover:bg-red-100'
        onClick={() => setLiked(!liked)}
      >
        <Heart
          className={`h-5 w-5 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
        />
      </Button>

      {/* Carousel */}
      <div className='relative h-60 w-full sm:h-72 md:h-80'>
        <div ref={sliderRef} className='keen-slider h-full'>
          {product.images.map((img, idx) => (
            <div
              className='keen-slider__slide relative h-full w-full'
              key={idx}
            >
              <Image
                src={img}
                alt={`${product.name} ${idx + 1}`}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 33vw'
              />
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className='absolute inset-0 z-10 flex items-center justify-between px-2'>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => instanceRef.current?.prev()}
            className='rounded-full bg-white/70 hover:bg-white'
          >
            <ChevronLeft />
          </Button>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => instanceRef.current?.next()}
            className='rounded-full bg-white/70 hover:bg-white'
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      {/* Product Details */}
      <CardContent className='p-4'>
        <h3 className='line-clamp-1 text-lg font-semibold'>{product.name}</h3>
        <p className='line-clamp-2 text-sm text-gray-500'>
          {product.description}
        </p>
        <div className='text-primary mt-2 text-base font-bold'>
          ₹{product.price}
        </div>
      </CardContent>
    </Card>
  );
}
