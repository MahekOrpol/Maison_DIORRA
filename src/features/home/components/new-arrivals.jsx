'use client';
import Image from 'next/image';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function NewArrivals() {
  return (
    <section className='wrapper pt-10 md:pt-15 lg:pt-20'>
      <div className='flex w-full flex-col items-center justify-between lg:flex-row'>
        <div className='relative z-0 h-[85vh] w-full border-y shadow-lg lg:h-[260px]'>
          <Image
            src={'/img/tree.png'}
            height={200}
            width={200}
            alt='tree image'
            className='absolute top-0 left-0 z-10'
          />
          <p className='absolute top-8 z-20 mb-2 w-full text-center text-2xl text-black underline decoration-[1.5px] underline-offset-4 lg:left-50 lg:w-fit'>
            New Arrivals
          </p>
          <div className='absolute top-1/2 z-20 w-full -translate-y-1/2 lg:top-1/2 lg:right-4 lg:w-[50%] lg:translate-x-0'>
            <ArrivalSwiper />
          </div>

          <div className='absolute bottom-4 z-20 w-full text-center lg:top-20 lg:left-50 lg:w-fit'>
            <p className='font-rozha text-2xl'>
              Timeless <span className='text-[46px]'>Beauty</span>
            </p>
            <p>Crafted for Your Unique Style</p>
          </div>

          <Image
            src={'/img/tree.png'}
            height={200}
            width={200}
            alt='tree image'
            className='absolute right-0 bottom-0 z-10 rotate-180 lg:right-[45%]'
          />
        </div>
      </div>
    </section>
  );
}

export function ArrivalSwiper() {
  return (
    <Swiper
      modules={[EffectCoverflow]}
      effect={'coverflow'}
      loop={true}
      spaceBetween={-160}
      slidesPerView={2.9}
      centeredSlides={true}
      grabCursor={true}
      coverflowEffect={{
        rotate: 0,
        slideShadows: false,
        deep: 100,
        modifier: 6
      }}
      breakpoints={{
        1024: {
          // when window width is >= 320px
          slidesPerView: 3,
          spaceBetween: 10
        }
      }}
      className=''
    >
      {Array.from({ length: 4 }).map((p, index) => {
        return (
          <SwiperSlide key={index}>
            <Image
              src={`/img/arrival${index + 1}.png`}
              height={400}
              width={300}
              alt='img'
              className='h-[350px] w-[300px] lg:h-auto lg:w-[400px]'
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
