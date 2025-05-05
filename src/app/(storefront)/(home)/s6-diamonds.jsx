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
  { name: 'Cushion', url: '/img/shapes/cushion.png' },
  { name: 'Emerald', url: '/img/shapes/emerald.png' },
  { name: 'Marquise', url: '/img/shapes/marquise.png' },
  { name: 'Oval', url: '/img/shapes/oval.png' },
  { name: 'Pear', url: '/img/shapes/pear.png' },
  { name: 'Princess', url: '/img/shapes/princess.png' },
  { name: 'Round', url: '/img/shapes/round.png' }
];

export default function S6DiamondSection() {
  return (
    <section className='pt-6 md:pt-8 lg:pt-10'>
      <Heading
        title='Shop by Diamond Shapes'
        subtitle='Find Your Perfect Shape, Shine Your Way'
      />

      <div className='relative min-[2100px]:mx-auto min-[2100px]:max-w-[2100px]'>
        {/* Left gradient fade */}
        {/* <div className='pointer-events-none absolute top-0 -left-3 z-10 h-full w-6 bg-gradient-to-r from-white to-transparent' /> */}

        {/* Right gradient fade */}
        {/* <div className='pointer-events-none absolute top-0 -right-3 z-10 h-full w-6 bg-gradient-to-l from-white to-transparent' /> */}

        <Carousel
          className='mb-4 lg:mt-6'
          opts={{
            align: 'start',
            loop: true,
            dragFree: false, // Enables momentum scrolling
            dragEnabled: true
          }}
          plugins={[
            Autoplay({
              delay: 3000,
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
                className='basis-1/4 pl-2 sm:basis-1/5 md:basis-1/7 lg:basis-1/7'
              >
                <Link href='/diamonds'>
                  <div className='flex flex-col items-center text-center'>
                    <div className='xs:h-[110px] 3xl:h-[200px] mt-auto h-[90px] lg:h-[120px] 2xl:h-[160px]'>
                      <Image
                        src={item.url}
                        alt={item.name}
                        width={100}
                        height={120}
                        className='h-full w-auto object-contain'
                      />
                    </div>
                    <p className='xs:text-base 4xl:text-2xl -mt-4 text-sm font-medium md:font-normal lg:text-xl'>
                      {item.name}
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
