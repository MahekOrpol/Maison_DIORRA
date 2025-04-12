'use client';
import Image from 'next/image';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { cn } from '@/lib/utils';

export default function NewArrivals() {
  return (
    <section className='pt-9 pb-8 md:pt-12 lg:mt-20 lg:mb-14 lg:pt-16 xl:pt-20'>
      <div className='relative flex w-full flex-col items-center justify-between lg:flex-row'>
        <div className='z-0 h-[115vw] w-full border-y shadow-lg min-[475px]:h-[95vw] md:h-[85vw] lg:h-[250px] xl:h-[400px]'>
          <Image
            src={'/img/tree.png'}
            height={200}
            width={200}
            alt='tree image'
            className='lg:w-[180px absolute top-0 left-0 z-10 object-cover md:w-[160px]'
          />
          <div className='wrapper relative h-full'>
            <p className='absolute top-10 left-0 z-20 mb-2 w-full text-center text-3xl text-black underline decoration-[1.5px] underline-offset-4 lg:top-1/5 lg:left-30 lg:w-fit lg:text-4xl xl:left-40 2xl:left-[7%]'>
              New Arrivals
            </p>
            <div
              className={cn(
                'sm:pr-6 lg:pr-8 xl:pr-12',
                'absolute top-1/2 left-0 z-20 w-full -translate-y-1/2 !px-1 lg:top-1/2 lg:right-0 lg:left-auto lg:w-[55%] xl:w-[60%]'
              )}
            >
              <ArrivalSwiper className='xs:!px-2 h-full w-full' />
            </div>

            <div className='absolute bottom-4 left-0 z-20 w-full text-center lg:top-2/5 lg:left-30 lg:w-fit lg:text-left xl:left-40 2xl:left-[7%]'>
              <p className='font-rozha text-3xl !font-thin xl:text-4xl 2xl:text-5xl'>
                Timeless <span className='text-5xl xl:text-6xl'>Beauty</span>
              </p>
              <p className='mt-2 text-xl'>Crafted for Your Unique Style</p>
            </div>
          </div>
          <Image
            src={'/img/tree.png'}
            height={200}
            width={200}
            alt='tree image'
            className='absolute right-0 bottom-0 z-10 rotate-180 md:w-[160px] lg:right-[55%] lg:w-[180px] xl:right-[58%]'
          />
        </div>
      </div>
    </section>
  );
}

export function ArrivalSwiper({ className }) {
  return (
    <Swiper
      modules={[EffectCoverflow, Autoplay]}
      effect={'coverflow'}
      loop={true}
      spaceBetween={20}
      slidesPerView={2.5}
      centeredSlides={true}
      grabCursor={true}
      autoplay={{
        delay: 3000, // 2.5 seconds between slides
        disableOnInteraction: false, // keeps autoplay even after user interaction
        pauseOnMouseEnter: true // optional: pause when hovered
      }}
      coverflowEffect={{
        rotate: 0,
        slideShadows: false,
        deep: 100,
        modifier: 2
      }}
      breakpoints={{
        1024: {
          // when window width is >= 320px
          slidesPerView: 2.5,
          spaceBetween: 40
        }
      }}
      className={cn(className, 'xs:!px-[5px] -translate-x-2 px-0')}
    >
      <div className=''>
        {Array.from({ length: 4 }).map((_, index) => (
          <SwiperSlide key={index}>
            <div className='aspect-[325/500] w-full overflow-hidden rounded-md'>
              <Image
                src={`/img/arrival${index + 1}.png`}
                alt='img'
                fill
                className='object-cover'
              />
            </div>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
}
