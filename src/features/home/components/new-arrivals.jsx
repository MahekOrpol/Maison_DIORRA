'use client';
import Image from 'next/image';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function NewArrivals() {
  return (
    <section className='pt-9 md:pt-12 lg:pt-16 xl:pt-20'>
      <div className='relative flex w-full flex-col items-center justify-between lg:flex-row'>
        <div className='z-0 h-[85vh] w-full border-y shadow-lg lg:h-[320px]'>
          <Image
            src={'/img/tree.png'}
            height={200}
            width={200}
            alt='tree image'
            className='absolute top-0 left-0 z-10'
          />
          <div className='wrapper relative'>
            <p className='absolute top-8 z-20 mb-2 w-full text-center text-2xl text-black underline decoration-[1.5px] underline-offset-4 lg:left-50 lg:w-fit'>
              New Arrivals
            </p>
            <div className='absolute top-1/2 z-20 w-full -translate-y-1/2 border border-red-500 lg:top-1/2 lg:right-4 lg:w-[50%]'>
              <ArrivalSwiper />
            </div>

            <div className='absolute bottom-4 z-20 w-full text-center lg:top-20 lg:left-50 lg:w-fit'>
              <p className='font-rozha text-2xl'>
                Timeless <span className='text-[46px]'>Beauty</span>
              </p>
              <p>Crafted for Your Unique Style</p>
            </div>
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
      spaceBetween={10}
      slidesPerView={2.7}
      centeredSlides={true}
      grabCursor={true}
      coverflowEffect={{
        rotate: 0,
        slideShadows: false,
        deep: 100,
        modifier: 1
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
      <div className='grid grid-cols-3 gap-4'>
        {Array.from({ length: 4 }).map((p, index) => {
          return (
            <SwiperSlide key={index}>
              <div className='flex items-center justify-center border p-2'>
                <Image
                  src={`/img/arrival${index + 1}.png`}
                  height={400}
                  width={325}
                  alt='img'
                  className='h-[400px] w-[325px]'
                />
              </div>
            </SwiperSlide>
          );
        })}
      </div>
    </Swiper>
  );
}
