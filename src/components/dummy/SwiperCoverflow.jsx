'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const images = [
  '/img/preview/ring1.png',
  '/img/preview/rose1.png',
  '/img/preview/gold1.png',
  '/img/preview/pendant.png'
];

export default function CoverflowCarousel() {
  return (
    <div className='h-fit border border-red-500 pb-8'>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        spaceBetween={30}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 600,
          slideShadows: true
        }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className=''
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className='aspect-[6/4] border border-red-500'>
            <img
              src={img}
              alt={`Slide ${i}`}
              className='h-full w-full rounded-xl object-cover'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
