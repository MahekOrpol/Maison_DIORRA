'use client';

import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Heading from '@/components/heading';
import { useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Image from 'next/image';

export default function GiftingSection() {
  const [coverflowConfig, setCoverflowConfig] = useState({
    depth: 450,
    scale: 0.9,
    spaceBetween: -240
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 767) {
        setCoverflowConfig({ depth: 800, scale: 1.25, spaceBetween: 30 });
        console.log('desktop');
      }
      // } else {
      //   setCoverflowConfig({ depth: 450, scale: 0.9, spaceBetween: -160 });
      //   console.log('mobile');
      // }
    };

    handleResize(); // on mount
    window.addEventListener('resize', handleResize); // on resize
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  console.log(coverflowConfig);
  return (
    <section className='wrapper pt-6 md:pt-7 lg:pt-8 xl:pt-10'>
      <Heading
        title='Gifting Guide'
        subtitle='Statement pieces fit for royalty'
      />
      <div className=''>
        <div className='mx-auto h-fit overflow-hidden'>
          <Swiper
            key={JSON.stringify(coverflowConfig)} // <- force re-init on config change
            modules={[EffectCoverflow, Autoplay]}
            effect={'coverflow'}
            loop={true}
            spaceBetween={coverflowConfig.spaceBetween}
            slidesPerView={2.3}
            centeredSlides={true}
            grabCursor={true}
            coverflowEffect={{
              rotate: 0,
              slideShadows: true,
              depth: coverflowConfig.depth,
              scale: coverflowConfig.scale
            }}
            className='coverflow'
            // autoplay={{
            //   delay: 3000, // 2.5 seconds between slides
            //   disableOnInteraction: false, // keeps autoplay even after user interaction
            //   pauseOnMouseEnter: true // optional: pause when hovered
            // }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide key={index} className=''>
                <div className='relative aspect-[240/170] w-auto rounded-sm'>
                  <Image
                    src={`/img/gifting/guide${index + 1}.png`}
                    fill={true}
                    className='rounded-xl object-cover'
                    alt='Guide image'
                  />
                  <p className='absolute inset-x-0 bottom-0 mx-4 border-t border-white pt-1 pb-2 text-sm text-white sm:text-sm md:text-lg md:font-medium lg:pt-2 lg:pb-4 lg:text-2xl'>
                    Eternal Rings (400 Items)
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* mobile & desktop */}
      {/* <div className='wrapper'>
        <div className='mx-auto my-10 h-fit w-full max-w-lg overflow-hidden border border-black'>
          <Swiper
            modules={[EffectCoverflow]}
            effect={'coverflow'}
            loop={true}
            spaceBetween={0}
            slidesPerView={2.3}
            centeredSlides={true}
            grabCursor={true}
            coverflowEffect={{
              rotate: 0,
              slideShadows: true,
              depth: 200
              // scale:
            }}
            className='coverflow'
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide key={index} className='border border-red-500'>
                <div className='flex h-[140px] items-center justify-center rounded-sm bg-green-200 text-xl'>
                  mobile
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div> */}
      {/* <div className='wrapper'>
        <div className='mx-auto my-10 h-fit overflow-hidden border border-black'>
          <Swiper
            modules={[EffectCoverflow]}
            effect={'coverflow'}
            loop={true}
            spaceBetween={30}
            slidesPerView={2.3}
            centeredSlides={true}
            grabCursor={true}
            coverflowEffect={{
              rotate: 0,
              slideShadows: true,
              depth: 800,
              scale: 1.25
            }}
            className='coverflow'
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide key={index} className='border border-red-500'>
                <div className='flex h-[350px] items-center justify-center rounded-sm bg-green-200 text-xl'>
                  desktop
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div> */}
      {/* desktop */}
      {/* <div className='wrapper mx-auto my-10 h-fit overflow-hidden border border-black max-[440px]:px-[6px]'>
        <div>scale: {coverflowConfig.scale} </div>
        <Swiper
          modules={[EffectCoverflow]}
          effect={'coverflow'}
          loop={true}
          spaceBetween={30}
          slidesPerView={2.3}
          centeredSlides={true}
          grabCursor={true}
          coverflowEffect={{
            rotate: 0,
            slideShadows: true,
            depth: 800,
            scale: 1.25
          }}
          className='coverflow'
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index} className='border border-red-500'>
              <div className='relative aspect-[240/170] w-auto rounded-sm bg-green-200'>
                <Image
                  src={`/img/gifting/guide${index + 1}.png`}
                  fill={true}
                  className='rounded-xl object-cover'
                  alt='Guide image'
                />
                <p className='absolute inset-x-0 bottom-0 mx-4 border-t border-white pt-1 pb-2 text-sm text-white sm:text-sm md:text-lg md:font-medium lg:pt-2 lg:pb-4 lg:text-2xl'>
                  Eternal Rings (400 Items)
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
    </section>
  );
}
