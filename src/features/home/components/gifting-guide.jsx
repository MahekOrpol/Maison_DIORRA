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
    <section className='pt-9 md:pt-12 lg:pt-16 xl:pt-20'>
      <Heading
        title='Gifting Guide'
        subtitle='Statement pieces fit for royalty'
      />
      <div className='mx-auto my-10 h-fit w-full max-w-[1640px] overflow-hidden border border-black'>
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
            slideShadows: false,
            depth: 800,
            scale: 1
          }}
          className='coverflow'
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index} className='border border-red-500'>
              <div className='h-[400px] rounded-sm bg-green-200'>
                <Image
                  src={`/img/gifting/guide${index + 1}.png`}
                  fill={true}
                  className='rounded-2xl object-cover'
                  alt='Guide image'
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='wrapper'>
        <div className='mx-auto my-10 h-fit w-[70%] overflow-hidden border border-black lg:w-full'>
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
                  {/* <Image
                  src={`/img/gifting/guide${index + 1}.png`}
                  height={400}
                  width={700}
                  className='h-full w-full rounded-sm bg-cover'
                  alt='Guide image'
                /> */}
                  desktop
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className=''>
        <div className='mx-auto my-10 h-fit w-full max-w-lg overflow-hidden border border-black px-2'>
          <Swiper
            modules={[EffectCoverflow]}
            effect={'coverflow'}
            loop={true}
            spaceBetween={-160}
            slidesPerView={2.3}
            centeredSlides={true}
            grabCursor={true}
            coverflowEffect={{
              rotate: 0,
              slideShadows: true,
              depth: 500,
              scale: 0.9
            }}
            className='coverflow'
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide key={index} className='border border-red-500'>
                <div className='flex h-[170px] w-auto items-center justify-center rounded-sm bg-green-200 text-xl'>
                  <Image
                    src={`/img/gifting/guide${index + 1}.png`}
                    fill={true}
                    className='h-full w-full rounded-xl object-cover'
                    alt='Guide image'
                  />
                  <p className='absolute inset-x-0 bottom-0 border-t border-white p-1 text-center text-sm font-medium text-white sm:text-sm lg:text-xl'>
                    Eternal Rings (400 Items)
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className='wrapper'>
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
                  {/* <Image
                  src={`/img/gifting/guide${index + 1}.png`}
                  height={400}
                  width={700}
                  className='h-full w-full rounded-sm bg-cover'
                  alt='Guide image'
                /> */}
                  mobile
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------ rough work ------------------------------------------
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

/* ------------------------------------------ rough work ------------------------------------------
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
*/
