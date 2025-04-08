'use client';

import { EffectCoverflow, Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Heading from '@/components/heading';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Image from 'next/image';

export default function GiftingSection() {
  return (
    <section className='wrapper pt-10 md:pt-15 lg:pt-20'>
      <Heading
        title='Gifting Guide'
        subtitle='Statement pieces fit for royalty'
      />
      <div className=''>
        <Swiper
          modules={[EffectCoverflow, Pagination, Mousewheel]}
          effect='coverflow'
          loop={true}
          spaceBetween={-80} // Adjust spacing for proper centering
          slidesPerView={3} // Dynamically sizes slides
          centeredSlides={true} // Centers the active slide
          grabCursor={true}
          pagination={{ clickable: true }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200, // Makes side slides more visible
            modifier: 2, // Controls scale intensity
            slideShadows: false
          }}
          mousewheel={{ invert: true }}
          breakpoints={{
            320: {
              // when window width is >= 320px
              slidesPerView: 2,
              spaceBetween: -20
            },
            600: {
              slidesPerView: 3,
              spaceBetween: -20
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: -80
            }
          }}
          className='coverflow relative w-full'
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index} className='-mx-[10px] pb-6 lg:mx-[60px]'>
              <div className='h-[190px] w-[250px] rounded-sm sm:h-[220px] sm:w-[340px] lg:h-[350px] lg:w-[525px]'>
                <Image
                  src={`/img/gifting/guide${index + 1}.png`}
                  height={400}
                  width={700}
                  className='h-full w-full rounded-sm bg-cover'
                  alt='Guide image'
                />
                <div className='mx-4 mb-6 -translate-y-7 border-t-1 border-t-white text-sm font-medium text-white md:-translate-y-10 md:border-t-[1.5px] md:p-1 md:text-xl lg:-translate-y-14 lg:text-[22px]'>
                  Eternal Rings (400 items)
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// ------------------------------------------ rough work ------------------------------------------
// <img
//   src={`/img/gifting/guide${index + 1}.png`}
//   alt='Gifting guide img'
//   className='h-[400px] w-[700px] rounded-sm bg-cover'
// />

{
  /* <Swiper
modules={[EffectCoverflow, Pagination]}
effect={'coverflow'}
loop={true}
spaceBetween={10}
slidesPerView={5}
pagination={{
  clickable: true
}}
centeredSlides={true}
grabCursor={true}
coverflowEffect={{
  rotate: 0,
  slideShadows: false
}}
className='coverflow border border-red-500'
>
{Array.from({ length: 5 }).map((_, index) => {
  return (
    <SwiperSlide key={index} className='border border-red-500'>
      <div className='h-[350px] w-[600px] rounded-sm'>
        <Image
          src={`/img/gifting/guide${index + 1}.png`}
          height={400}
          width={700}
          className='h-full w-full rounded-sm bg-cover'
          alt='Guide image'
        />
        <div className='mx-4 -translate-y-16 border-t-2 border-t-white p-4 text-2xl font-semibold text-white'>
          Eternal Rings (400 items)
        </div>
      </div>
    </SwiperSlide>
  );
})}
</Swiper> */
}

// import Image from 'next/image';

// export default function GiftingGuide() {
//   return (
//     <section className='wrapper pt-10'>
//       <Heading
//         title='Gifting Guide'
//         subtitle='Statement pieces fit for royalty'
//       />
//       <div>
//         <div className='border'>
//           <Image
//             src='/img/gifting/guide1.png'
//             height={420}
//             width={700}
//             className='h-full w-full'
//             alt='Guide image'
//           />
//           <div className='mx-4 -translate-y-16 border-t-2 border-t-white p-4 text-2xl font-semibold text-white'>
//             Eternal Rings (400 items)
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
