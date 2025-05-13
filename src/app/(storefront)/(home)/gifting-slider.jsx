'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { baseUrl } from '@/lib/utils';

export default function GiftingSlider({ cards }) {
  const [config, setConfig] = useState({
    depth: 450,
    scale: 0.9,
    spaceBetween: -240,
    slidesPerView: 2
  });

  useEffect(() => {
    const updateConfig = () => {
      const width = window.innerWidth;
      let updated;
      if (width > 600 && width < 767) {
        updated = {
          depth: 1140,
          scale: 0.9,
          spaceBetween: -20,
          slidesPerView: 1.5
        };
      } else if (width >= 767 && width < 1024) {
        updated = {
          depth: 750,
          scale: 0.9,
          spaceBetween: -20,
          slidesPerView: 1.8
        };
      } else if (width >= 1024 && width < 1280) {
        updated = {
          depth: 855,
          scale: 0.9,
          spaceBetween: -20,
          slidesPerView: 2
        };
      } else if (width >= 1280 && width < 1500) {
        updated = {
          depth: 604,
          scale: 0.95,
          spaceBetween: 30,
          slidesPerView: 2.4
        };
      } else if (width >= 1500 && width < 1700) {
        updated = {
          depth: 606,
          scale: 0.95,
          spaceBetween: 30,
          slidesPerView: 2.4
        };
      } else if (width >= 1700) {
        updated = {
          depth: 610,
          scale: 0.95,
          spaceBetween: 30,
          slidesPerView: 2.4
        };
      } else {
        updated = {
          depth: 1150,
          scale: 0.9,
          spaceBetween: -20,
          slidesPerView: 1.5
        };
      }
      setConfig(updated);
    };

    updateConfig();
    window.addEventListener('resize', updateConfig);
    return () => window.removeEventListener('resize', updateConfig);
  }, []);

  return (
    <div className='mx-auto h-fit overflow-hidden'>
      <Swiper
        key={JSON.stringify(config)}
        modules={[EffectCoverflow, Autoplay]}
        effect='coverflow'
        loop
        grabCursor
        centeredSlides
        loopAdditionalSlides={2}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false
        }}
        spaceBetween={config.spaceBetween}
        slidesPerView={config.slidesPerView}
        coverflowEffect={{
          rotate: 0,
          slideShadows: true,
          depth: config.depth,
          scale: config.scale
        }}
        className='coverflow'
      >
        {cards.map((card, i) => (
          <SwiperSlide key={card.id} id='gifting-slider'>
            <div className='relative aspect-[320/220] overflow-hidden rounded-2xl xl:aspect-[240/170]'>
              <Image
                src={baseUrl + card.image}
                // fill
                width={300}
                height={600}
                className='h-full w-full rounded-2xl object-cover'
                alt={card.name}
              />
              <Link
                href={'#gifting-slider'}
                className='absolute inset-x-0 bottom-0 mx-4 border-t border-white pt-1 pb-2 text-sm font-medium text-white transition-all duration-300 hover:border-t-2 hover:font-light min-[500px]:text-lg md:text-lg md:font-medium lg:pt-2 lg:pb-4 lg:text-xl'
              >
                {card.name} ( {card.items} )
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
