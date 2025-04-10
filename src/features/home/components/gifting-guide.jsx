'use client';

import { EffectCoverflow, Mousewheel, Autoplay } from 'swiper/modules';
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
      <div className='md:my-10'>
        <Swiper
          modules={[EffectCoverflow, Mousewheel, Autoplay]}
          effect='coverflow'
          loop={true}
          spaceBetween={-50} // Adjust spacing for proper centering
          slidesPerView={5} // Dynamically sizes slides
          centeredSlides={true} // Centers the active slide
          grabCursor={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 20,
            depth: 100, // Makes side slides more visible
            modifier: 1.2, // Controls scale intensity
            slideShadows: false
          }}
          autoplay={{
            delay: 3000, // 2.5 seconds between slides
            disableOnInteraction: false, // keeps autoplay even after user interaction
            pauseOnMouseEnter: true // optional: pause when hovered
          }}
          mousewheel={{ invert: true }}
          breakpoints={{
            320: {
              // when window width is >= 320px
              slidesPerView: 2,
              spaceBetween: -20
            },
            425: {
              slidesPerView: 3,
              spaceBetween: -20
            },
            768: {
              slidesPerView: 3,
              spaceBetween: -40
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: -50
            }
          }}
          className='coverflow relative w-full'
        >
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide key={index} className='-mx-[10px] pb-6 lg:mx-[60px]'>
                {/* Container maintains a specific aspect ratio */}
                <div className='w xs:h-[160px] xs:w-[260px] xl2:h-[490px] relative aspect-[4/3] h-[140px] w-[208px] overflow-hidden rounded-sm sm:h-[180px] sm:w-[310] md:h-[300px] md:w-[400px] lg:h-[360px] lg:w-[480px] xl:h-[400px] xl:w-[610px]'>
                  <Image
                    src={`/img/gifting/guide${index + 1}.png`}
                    layout='fill'
                    className='object-cover'
                    alt='Guide image'
                  />
                  <div className='bg-opacity-50 absolute right-0 bottom-0 left-0 p-1 text-center text-xs font-medium text-white sm:text-sm lg:text-xl'>
                    Eternal Rings (400 items)
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
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
