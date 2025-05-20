'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const shapes = [
  { name: 'Cushion', url: '/img/shapes/cushion.png' },
  { name: 'Emerald', url: '/img/shapes/emerald.png' },
  { name: 'Marquise', url: '/img/shapes/marquise.png' },
  { name: 'Oval', url: '/img/shapes/oval.png' },
  { name: 'Pear', url: '/img/shapes/pear.png' },
  { name: 'Princess', url: '/img/shapes/princess.png' },
  { name: 'Round', url: '/img/shapes/round.png' },
  { name: 'Oval', url: '/img/shapes/oval.png' },
  { name: 'Cushion', url: '/img/shapes/cushion.png' },
  { name: 'Emerald', url: '/img/shapes/emerald.png' }
];

export default function DiamondSlider() {
  return (
    <Carousel
      className='mb-4 lg:mt-6'
      opts={{
        align: 'start',
        loop: true,
        dragFree: false,
        dragEnabled: true
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
          resetProgress: false
        })
      ]}
    >
      <CarouselContent className='-ml-2 lg:-ml-4'>
        {shapes.map((shape, i) => (
          <CarouselItem
            key={i}
            className='basis-1/4 pl-2 sm:basis-1/5 md:basis-1/7 lg:basis-1/7'
          >
            <Link href='/diamonds'>
              <div className='flex flex-col items-center text-center'>
                <div className='xs:h-[110px] 3xl:h-[200px] mt-auto h-[90px] lg:h-[120px] 2xl:h-[160px]'>
                  <Image
                    src={shape.url}
                    alt={shape.name}
                    width={100}
                    height={120}
                    className='h-full w-auto object-contain'
                  />
                </div>
                <p className='xs:text-base 4xl:text-2xl -mt-4 text-sm font-medium md:font-normal lg:text-xl'>
                  {shape.name}
                </p>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
