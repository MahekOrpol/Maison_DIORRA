'use client';

import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Heading from '@/components/heading';
import { useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';

const giftingCollectionCards = [
  {
    img: '/img/gifting/guide1.jpeg',
    label: 'Diamond Solitaire Ring',
    href: '/products/rings/engagement-rings'
  },
  {
    img: '/img/gifting/guide2.jpeg',
    label: 'Platinum Couple Bands',
    href: '/products/rings/couple-bands'
  },
  {
    img: '/img/gifting/guide3.jpeg',
    label: 'Emerald Pendant Necklace',
    href: '/products/necklaces/diamond-emerald-pendants'
  },
  {
    img: '/img/gifting/guide4.jpeg',
    label: 'Gold Hoop Earrings',
    href: '/products/earrings/gold-hoops'
  },
  {
    img: '/img/gifting/guide5.jpeg',
    label: 'Diamond Stud Earrings',
    href: '/products/earrings/diamond-studs'
  },
  {
    img: '/img/gifting/guide6.jpeg',
    label: 'Pearl Drop Earrings',
    href: '/products/earrings/diaomond-pearl-drops'
  },
  {
    img: '/img/gifting/guide7.jpeg',
    label: 'Sapphire Tennis Bracelet',
    href: '/products/bracelets/sapphire-tennis'
  },
  {
    img: '/img/gifting/guide8.jpeg',
    label: 'Custom Name Pendant',
    href: '/products/necklaces/diamond-custom-name'
  }
];
export default function S5GiftingCollections({ data }) {
  const [coverflowConfig, setCoverflowConfig] = useState({
    depth: 450,
    scale: 0.9,
    spaceBetween: -240,
    slidesPerView: 2
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setCoverflowConfig((prev) => {
        if (width > 600 && width < 767) {
          return {
            depth: 1140,
            scale: 0.9,
            spaceBetween: -20,
            slidesPerView: 1.5
          };
        } else if (width >= 767 && width < 1024) {
          return {
            depth: 750,
            scale: 0.9,
            spaceBetween: -20,
            slidesPerView: 1.8
          };
        } else if (width >= 1024 && width < 1280) {
          return {
            depth: 855,
            scale: 0.9,
            spaceBetween: -20,
            slidesPerView: 2
          };
        } else if (width >= 1280 && width < 1500) {
          return {
            depth: 604,
            scale: 0.95,
            spaceBetween: 30,
            slidesPerView: 2.4
          };
        } else if (width >= 1500 && width < 1700) {
          return {
            depth: 606,
            scale: 0.95,
            spaceBetween: 30,
            slidesPerView: 2.4
          };
        } else if (width >= 1700) {
          return {
            depth: 610,
            scale: 0.95,
            spaceBetween: 30,
            slidesPerView: 2.4
          };
        } else {
          return {
            depth: 1150,
            scale: 0.9,
            spaceBetween: -20,
            slidesPerView: 1.5
          };
        }
      });
    };
    handleResize(); // on mount
    window.addEventListener('resize', handleResize); // on resize
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className='wrapper pt-6 md:pt-7 lg:pt-8 xl:pt-10'>
      <Heading
        title='Gifting Collections'
        subtitle='Statement pieces fit for royalty'
      />
      <div className=''>
        <div className='mx-auto h-fit overflow-hidden'>
          {/* my old buggy  one ---- */}
          <Swiper
            key={JSON.stringify(coverflowConfig)} // <- force re-init on config change
            modules={[EffectCoverflow, Autoplay]}
            effect={'coverflow'}
            loop={true}
            spaceBetween={coverflowConfig.spaceBetween}
            slidesPerView={coverflowConfig.slidesPerView}
            centeredSlides={true}
            loopAdditionalSlides={2}
            grabCursor={true}
            coverflowEffect={{
              rotate: 0,
              slideShadows: true,
              depth: coverflowConfig.depth,
              scale: coverflowConfig.scale
            }}
            className='coverflow'
            autoplay={{
              delay: 4000,
              disableOnInteraction: false, // keeps autoplay even after user interaction
              pauseOnMouseEnter: false // optional: pause when hovered
            }}
          >
            {giftingCollectionCards.map((data, index) => (
              <SwiperSlide key={index} className=''>
                <div className='relative aspect-[320/220] overflow-hidden rounded-2xl xl:aspect-[240/170]'>
                  <Image
                    src={data.img}
                    fill={true}
                    className='rounded-2xl object-cover'
                    alt='Gifting collection image'
                  />
                  <Link
                    href={data.href}
                    className='absolute inset-x-0 bottom-0 mx-4 border-t border-white pt-1 pb-2 text-sm font-medium text-white transition-all duration-300 hover:border-t-2 hover:font-light min-[500px]:text-lg md:text-lg md:font-medium lg:pt-2 lg:pb-4 lg:text-xl'
                  >
                    {data.label}
                  </Link>
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
