'use client';
import Image from 'next/image';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function S7NewArrivals() {
  return (
    <section className='3xl:mt-[7vw] 3xl:mb-[5vw] pt-4 md:pt-10 lg:mt-[6%] lg:mb-[5%] xl:my-[5vw]'>
      <div className='relative flex w-full flex-col items-center justify-between lg:flex-row'>
        <div className='xs:aspect-[9/8] 4xl:h-[420px] aspect-[1/1] w-full border-y shadow-[2px_2px_6px_6px_rgba(0,_0,_0,_0.1)] sm:aspect-[5/4] lg:aspect-auto lg:h-[240px] xl:h-[314px] 2xl:h-[360px]'>
          <Image
            src={'/img/tree.png'}
            height={200}
            width={200}
            alt='tree image'
            className='4xl:w-[13vw] absolute top-0 left-0 z-10 max-h-[430px] object-cover md:w-[160px] lg:w-[130px] xl:w-[190px] 2xl:w-[230px]'
          />
          <div className='wrapper relative h-full'>
            <p className='absolute top-5 left-0 z-20 mb-2 w-full text-center text-[1.40rem] text-black underline decoration-[1.5px] underline-offset-4 md:text-3xl lg:top-[14%] lg:left-20 lg:w-fit lg:text-2xl lg:font-medium xl:left-30 xl:text-3xl 2xl:left-[9%] 2xl:text-4xl'>
              New Arrivals
            </p>
            <div
              className={cn(
                '3xl:pr-14 4xl:pr-20 px-3 sm:px-6 lg:pr-8 2xl:pr-12',
                'absolute top-[45%] left-0 z-20 w-full -translate-y-1/2 lg:top-1/2 lg:right-0 lg:left-auto lg:w-[60%] xl:w-[60%]'
              )}
            >
              <ArrivalSwiper className='h-full w-full' />
            </div>

            <div className='absolute bottom-[5%] left-0 z-20 w-full text-center lg:top-2/5 lg:left-20 lg:w-fit lg:text-left xl:left-30 2xl:left-[9%]'>
              <p className='font-sande text-2xl font-bold md:text-3xl xl:text-4xl 2xl:text-5xl'>
                Timeless{' '}
                <span className='text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl'>
                  Beauty
                </span>
              </p>
              <p className='text-lg md:mt-1 md:text-xl lg:font-light 2xl:text-2xl'>
                Crafted for Your Unique Style
              </p>
            </div>
          </div>
          <Image
            src={'/img/tree.png'}
            height={200}
            width={200}
            alt='tree image'
            className='4xl:w-[14vw] absolute right-0 bottom-0 z-10 max-h-[430px] rotate-180 md:w-[160px] lg:right-[55%] lg:w-[150px] xl:right-[56%] xl:w-[210px] 2xl:w-[240px]'
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
            slidesPerView: 2.485
          };
        } else if (width >= 1130 && width < 1350) {
          return {
            spaceBetween: 35,
            slidesPerView: 2.485
          };
        } else if (width >= 1350 && width < 1537) {
          return {
            spaceBetween: 45,
            slidesPerView: 2.49
          };
        } else if (width >= 1537) {
          return {
            spaceBetween: 55,
            slidesPerView: 2.5
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
        depth: 100,
        modifier: 2,
        scale: 1
      }}
      className={cn(className, 'xs:!px-[5px] px-0 lg:!px-1.5')}
    >
      {/* Side gradients */}
      {/* <div className='pointer-events-none absolute top-0 left-0 z-30 hidden h-full w-[2px] bg-gradient-to-r from-white to-transparent xl:block 2xl:-left-0.5 2xl:w-1' /> */}
      {/* <div className='pointer-events-none absolute top-0 right-0 z-30 hidden h-full w-[2px] bg-gradient-to-l from-white to-transparent xl:block 2xl:-right-0.5 2xl:w-1' /> */}
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
