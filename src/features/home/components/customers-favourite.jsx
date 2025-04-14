'use client';
import Heading from '@/components/heading';
import PreviewCard from '@/components/preview-card';
import PreviewCard3 from '@/components/preview-card3';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function CustomersFavourite() {
  return (
    <section className='wrapper pt-5 md:pt-7 lg:pt-10 xl:pt-13 2xl:pt-16'>
      <Heading
        title='Customer’s Favourite'
        subtitle='New Styles, Endless Elegance'
      />
      <div className='relative'>
        {/* Left gradient fade */}
        {/* <div className='pointer-events-none absolute top-0 -left-3 z-10 h-full w-6 bg-gradient-to-r from-white to-transparent' /> */}

        {/* Right gradient fade */}
        {/* <div className='pointer-events-none absolute top-0 -right-3 z-10 h-full w-6 bg-gradient-to-l from-white to-transparent' /> */}
        <div className=''>
          <Carousel
            opts={{
              align: 'start',
              skipSnaps: false,
              slidesToScroll: 1,
              loop: true
            }}
            // plugins={[
            //   Autoplay({
            //     delay: 3000,
            //     stopOnInteraction: false, // don't stop on drag/touch
            //     stopOnMouseEnter: false // don't stop on hover
            //   })
            // ]}
            className=''
          >
            <CarouselContent className='-ml-2 min-[400px]:-ml-3 sm:-ml-6 lg:-ml-8'>
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className='basis-[49%] pl-2 min-[400px]:pl-3 sm:basis-[49.5%] sm:pl-6 lg:basis-[33.30%] lg:pl-8 xl:basis-[24.9%]'
                >
                  {/* <PreviewCard /> */}
                  <PreviewCard3 />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
