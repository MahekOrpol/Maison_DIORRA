'use client';
import Image from 'next/image';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function NewArrivals() {
  return (
    <section className='3xl:pt-30 3xl:pb-20 4xl:pt-36 4xl:pb-26 pt-4 md:pt-10 lg:mt-8 lg:mb-6 lg:pt-16 xl:pt-20 2xl:pt-22 2xl:pb-8'>
      <div className='relative flex w-full flex-col items-center justify-between lg:flex-row'>
        <div className='xs:aspect-[8/7] aspect-[1/1] w-full border-y shadow-lg min-[550px]:aspect-[9/7] sm:aspect-[4/3] lg:aspect-auto lg:h-[250px] xl:h-[360px]'>
          <Image
            src={'/img/tree.png'}
            height={200}
            width={200}
            alt='tree image'
            className='absolute top-0 left-0 z-10 object-cover md:w-[160px] lg:w-[180px]'
          />
          <div className='wrapper relative h-full'>
            <p className='absolute top-5 left-0 z-20 mb-2 w-full text-center text-2xl text-black underline decoration-[1.5px] underline-offset-4 md:text-3xl lg:top-1/5 lg:left-20 lg:w-fit xl:left-30 xl:text-4xl 2xl:left-[7%]'>
              New Arrivals
            </p>
            <div
              className={cn(
                'px-3 sm:px-6 lg:pr-8 xl:pr-12',
                'absolute top-[45%] left-0 z-20 w-full -translate-y-1/2 lg:top-1/2 lg:right-0 lg:left-auto lg:w-[60%] xl:w-[60%]'
              )}
            >
              <ArrivalSwiper className='h-full w-full' />
            </div>

            <div className='absolute bottom-5 left-0 z-20 w-full text-center md:bottom-6 lg:top-2/5 lg:left-20 lg:w-fit lg:text-left xl:left-40 2xl:left-[7%]'>
              <p className='font-rozha text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl'>
                Timeless{' '}
                <span className='text-5xl md:text-6xl xl:text-7xl'>Beauty</span>
              </p>
              <p className='text-lg md:mt-2 md:text-xl'>
                Crafted for Your Unique Style
              </p>
            </div>
          </div>
          <Image
            src={'/img/tree.png'}
            height={200}
            width={200}
            alt='tree image'
            className='absolute right-0 bottom-0 z-10 rotate-180 md:w-[160px] lg:right-[55%] lg:w-[180px] xl:right-[56%]'
          />
        </div>
      </div>
    </section>
  );
}

export function ArrivalSwiper({ className }) {
  const [coverflowConfig, setCoverflowConfig] = useState({
    spaceBetween: 22,
    slidesPerView: 2.52
  });
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setCoverflowConfig((prev) => {
        if (width >= 400 && width < 500) {
          return {
            spaceBetween: 25,
            slidesPerView: 2.47
          };
        } else if (width >= 500 && width < 600) {
          return {
            spaceBetween: 30,
            slidesPerView: 2.48
          };
        } else if (width >= 600 && width < 767) {
          return {
            spaceBetween: 30,
            slidesPerView: 2.498
          };
        } else if (width >= 767 && width < 1024) {
          return {
            spaceBetween: 40,
            slidesPerView: 2.5
          };
        } else if (width >= 1024 && width < 1120) {
          return {
            spaceBetween: 30,
            slidesPerView: 2.49
          };
        } else if (width >= 1130 && width < 1350) {
          return {
            spaceBetween: 35,
            slidesPerView: 2.49
          };
        } else if (width >= 1350) {
          return {
            spaceBetween: 45,
            slidesPerView: 2.495
          };
        } else {
          return {
            spaceBetween: 22,
            slidesPerView: 2.52
          };
        }
      });
    };
    handleResize(); // on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  console.log(coverflowConfig);

  return (
    <Swiper
      key={JSON.stringify(coverflowConfig)} // <- force re-init on config change
      modules={[EffectCoverflow, Autoplay]}
      effect={'coverflow'}
      loop={true}
      spaceBetween={coverflowConfig.spaceBetween}
      slidesPerView={coverflowConfig.slidesPerView}
      centeredSlides={true}
      grabCursor={true}
      autoplay={{
        delay: 3000, // 2.5 seconds between slides
        disableOnInteraction: false, // keeps autoplay even after user interaction
        pauseOnMouseEnter: false // optional: pause when hovered
      }}
      coverflowEffect={{
        rotate: 0,
        slideShadows: false,
        deep: 100,
        modifier: 2,
        scale: 1
      }}
      className={cn(className, 'xs:!px-[5px] px-0')}
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
