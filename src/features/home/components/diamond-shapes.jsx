'use client';
import Heading from '@/components/heading';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
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
  { name: 'Pear', url: '/img/shapes/pear.png' },
  { name: 'Princess', url: '/img/shapes/princess.png' },
  { name: 'Round', url: '/img/shapes/round.png' }
];

export default function DiamondShapes() {
  return (
    <section className='wrapper pt-9 md:pt-12 lg:pt-16 xl:pt-20'>
      <Heading
        title='Shop by Diamond Shapes'
        subtitle='Find Your Perfect Shape, Shine Your Way'
      />

      <div className='relative my-10'>
        {/* Left gradient fade */}
        <div className='pointer-events-none absolute top-0 -left-3 z-10 h-full w-6 bg-gradient-to-r from-white to-transparent' />

        {/* Right gradient fade */}
        <div className='pointer-events-none absolute top-0 -right-3 z-10 h-full w-6 bg-gradient-to-l from-white to-transparent' />

        <Carousel
          className='mt-6'
          opts={{
            align: 'start',
            loop: true
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false, // keeps autoplay running
              stopOnMouseEnter: true, // pause when hovered (optional)
              resetProgress: false
            })
          ]}
        >
          <CarouselContent className='-ml-2 lg:-ml-4'>
            {shapes.map((item, i) => (
              <CarouselItem
                key={i}
                className='basis-1/4 pl-2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 lg:pl-4 xl:basis-1/7'
              >
                <Link href='#'>
                  <div className='flex flex-col items-center text-center'>
                    <div className='h-[150px]'>
                      <Image
                        src={item.url}
                        alt={item.name}
                        width={100}
                        height={100}
                        className='h-full w-auto object-contain'
                      />
                    </div>
                    <p className='mt-2 text-sm font-semibold md:text-base'>
                      {item.name}
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='z-20 translate-x-8 border-none text-black xl:translate-x-6' />
          <CarouselNext className='z-20 -translate-x-8 border-none text-black xl:-translate-x-6' />
        </Carousel>
      </div>
    </section>
  );
}
