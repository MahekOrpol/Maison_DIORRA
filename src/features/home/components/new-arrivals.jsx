'use client';
import Image from 'next/image';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { cn } from '@/lib/utils';

export default function NewArrivals() {
  return (
    <section className='pt-9 md:pt-12 lg:pt-16 xl:pt-20'>
      <div className='relative flex w-full flex-col items-center justify-between lg:flex-row'>
        <div className='z-0 h-[85vh] w-full border-y shadow-lg lg:h-[320px] xl:h-[360px]'>
          <Image
            src={'/img/tree.png'}
            height={200}
            width={200}
            alt='tree image'
            className='absolute top-0 left-0 z-10'
          />
          <div className='wrapper relative h-full'>
            <p className='absolute top-1/5 z-20 mb-2 w-full text-center text-2xl text-black underline decoration-[1.5px] underline-offset-4 lg:left-40 lg:w-fit lg:text-4xl'>
              New Arrivals
            </p>
            <div
              className={cn(
                'pr-[1.125rem] sm:pr-6 lg:pr-8 xl:pr-12',
                'absolute top-1/2 z-20 w-full -translate-y-1/2 lg:top-1/2 lg:right-0 lg:w-[60%]'
              )}
            >
              <ArrivalSwiper className='h-full w-full' />
            </div>

            <div className='absolute bottom-4 z-20 w-full text-left lg:top-2/5 lg:left-40 lg:w-fit'>
              <p className='font-rozha text-4xl font-extralight'>
                Timeless <span className='text-6xl font-medium'>Beauty</span>
              </p>
              <p className='mt-2 text-xl'>Crafted for Your Unique Style</p>
            </div>
          </div>
          <Image
            src={'/img/tree.png'}
            height={200}
            width={200}
            alt='tree image'
            className='absolute right-0 bottom-0 z-10 rotate-180 lg:right-[60%]'
          />
        </div>
      </div>
    </section>
  );
}

export function ArrivalSwiper({ className }) {
  return (
    <Swiper
      modules={[EffectCoverflow]}
      effect={'coverflow'}
      loop={true}
      spaceBetween={20}
      slidesPerView={2.5}
      centeredSlides={true}
      grabCursor={true}
      coverflowEffect={{
        rotate: 0,
        slideShadows: false,
        deep: 50,
        modifier: 2
      }}
      breakpoints={{
        1024: {
          // when window width is >= 320px
          slidesPerView: 2.5,
          spaceBetween: 45
        }
      }}
      className={cn(className, '!mx-2 -translate-x-2')}
    >
      <div className=''>
        {Array.from({ length: 4 }).map((p, index) => {
          return (
            <SwiperSlide key={index}>
              <div className='flex items-center justify-center'>
                <Image
                  src={`/img/arrival${index + 1}.png`}
                  height={500}
                  width={340}
                  alt='img'
                  className='h-[500px] w-[340px]'
                />
              </div>
            </SwiperSlide>
          );
        })}
      </div>
    </Swiper>
  );
}
