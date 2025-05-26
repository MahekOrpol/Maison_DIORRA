'use client';

import { useState, useRef, useEffect } from 'react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { IoCopy } from 'react-icons/io5';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import Image from 'next/image';
// const slides = [
//   {
//     image: '/img/home-hero2.jpg',
//     subtitle: "VALENTINE'S DAY",
//     title: 'GET 20% OFF ON YOUR \n FIRST ORDER',
//     ctaText: 'SHOP NOW',
//     ctaLink: '/products/rings'
//   },
//   {
//     image: '/img/hero2.jpg',
//     subtitle: "VALENTINE'S DAY",
//     title: 'GET 20% OFF ON YOUR \n FIRST ORDER 02',
//     ctaText: 'SHOP NOW',
//     ctaLink: '/products/rings'
//   },
//   {
//     image: '/img/hero3.jpg',
//     subtitle: "VALENTINE'S DAY",
//     title: 'GET 20% OFF ON YOUR \n FIRST ORDER 03',
//     ctaText: 'SHOP NOW',
//     ctaLink: '/products/rings'
//   }
// ];
export default function S1HeroSection({ data }) {
  const { copy } = useCopyToClipboard();
  const [showTooltip, setShowTooltip] = useState(false);
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect(); // sync initially
    return () => api.off('select', onSelect);
  }, [api]);

  const handleCopy = () => {
    copy('FIRST20');
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 4000);
  };

  const heroImages = ['/img/home-hero2.jpg'];
  return (
    <section className='relative w-full'>
      {/* <Carousel className='w-full' opts={{ loop: true }} setApi={setApi}>
        <CarouselContent className='ml-0'>
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className='pl-0'> */}
      <div
        className='3xl:h-[70vh] h-[500px] w-full bg-cover bg-center bg-no-repeat sm:h-[450px] md:h-[500px] md:bg-left xl:h-[84vh]'
        // style={{ backgroundImage: `url(${image})` }}
      >
        <div className='relative h-full'>
          {
            // <div className='flex h-full flex-col'>
            //   <div className='flex-1 bg-red-200'>
            //     <Image
            //       src={image}
            //       alt='hero'
            //       width={1920}
            //       height={1080}
            //       className='h-full w-full object-cover'
            //     />
            //   </div>
            //   <div className='absolute inset-x-0 bottom-[0] z-20 flex w-full flex-col items-center justify-end bg-black py-4 text-center text-white md:bottom-[25%] md:left-[12%] md:w-fit md:translate-x-[-15%]'>
            //     <p className='mb-4 text-sm tracking-widest underline underline-offset-6 sm:mb-6 md:text-[20px]'>
            //       VALENTINE'S DAY
            //     </p>
            //     <h1 className='font-rozha hero-font mb-3 hidden leading-[110%] font-medium tracking-wide sm:block'>
            //       GET 20% OFF ON YOUR <div>FIRST ORDER</div>
            //     </h1>
            //     <h1 className='font-rozha mb-3 text-xl leading-[110%] font-medium sm:hidden'>
            //       GET 20% OFF ON YOUR FIRST ORDER
            //     </h1>
            //     <div className='xs:text-xl relative mb-3 max-w-2xl text-sm lg:mb-6'>
            //       <p>
            //         Use code{' '}
            //         <button
            //           onClick={handleCopy}
            //           className='inline-flex items-center gap-1 underline underline-offset-4'
            //         >
            //           FIRST20 <IoCopy className='inline h-4 w-4' />
            //         </button>{' '}
            //         at Checkout
            //       </p>
            //     </div>
            //     {/* <Link
            //     href='/products/rings'
            //     className='xs:px-8 xs:py-2.5 xs:text-sm relative flex items-center rounded-full border border-white bg-black px-3.5 py-2 text-xs font-semibold text-white transition-all duration-300 before:absolute before:top-1 before:left-1 before:-z-10 before:h-full before:w-full before:rounded-full before:bg-white hover:before:opacity-0 md:py-3 md:text-base'
            //   >
            //     SHOP NOW <MoveRight className='ml-2 inline' />
            //   </Link> */}
            //     <Link
            //       href='/products/rings'
            //       className='xs:px-8 xs:py-2.5 xs:text-sm relative flex items-center rounded-full border border-white bg-white px-3.5 py-1.5 text-xs font-semibold text-black transition-all duration-300 md:py-3 md:text-base md:before:absolute md:before:top-1 md:before:left-1 md:before:-z-10 md:before:h-full md:before:w-full md:before:rounded-full md:before:bg-white hover:md:before:opacity-0'
            //     >
            //       SHOP NOW <MoveRight className='ml-2 inline' />
            //     </Link>
            //   </div>
            // </div>
            <div className='flex h-full flex-col'>
              <div className='relative flex-1 sm:h-full'>
                {/* Mobile Image (shown below sm) */}
                <Image
                  // src='/img/home-m-hero2.png'
                  src='/img/hero-model-4x.png'
                  alt='hero mobile'
                  fill
                  className='block object-cover object-right sm:hidden'
                />

                {/* Desktop Image (shown sm and up) */}
                <Image
                  // src='/img/home-hero2.jpg'
                  src='/img/hero-model-4x.png'
                  alt='hero desktop'
                  fill
                  className='hidden object-cover object-right sm:block'
                />
              </div>
              {/* Bottom content */}
              <div className='xs:h-[37%] relative z-20 flex h-[35%] w-full flex-col items-center justify-center gap-1 bg-black py-4 text-center text-white sm:-top-[60%] sm:h-0 sm:translate-x-[-20%] sm:bg-transparent sm:py-0 md:-top-[50%] md:left-[12%] md:w-fit md:translate-x-[-15%] xl:left-[15%]'>
                <p className='mb-3 text-xs xs2:text-sm tracking-widest underline underline-offset-6 sm:mb-6 md:text-[20px]'>
                  VALENTINE'S DAY
                </p>
                <h1 className='font-rozha hero-font mb-3 hidden leading-[110%] font-medium tracking-wide sm:block'>
                  GET 20% OFF ON YOUR <div>FIRST ORDER</div>
                </h1>
                <h1 className='font-rozha xs2:text-[22px] text-lg xs2:text-xl leading-[110%] font-medium sm:hidden'>
                  GET 20% OFF ON YOUR FIRST ORDER
                </h1>
                <div className='xs:text-lg relative mb-3 max-w-2xl text-sm sm:text-xl lg:mb-6'>
                  <p>
                    Use code{' '}
                    <button
                      onClick={handleCopy}
                      className='inline-flex items-center gap-1 underline underline-offset-4'
                    >
                      FIRST20 <IoCopy className='inline h-4 w-4' />
                    </button>{' '}
                    at Checkout
                  </p>
                </div>
                <Link
                  href='/products/rings'
                  className='xs:px-6 xs:text-sm relative flex items-center rounded-full bg-white px-2 py-1 xs2:px-3.5 xs2:py-1.5 text-xs font-semibold text-black transition-all duration-300 md:py-3 md:text-base'
                >
                  SHOP NOW <MoveRight className='ml-2 inline' />
                </Link>
              </div>
            </div>
          }
          {/* {index === 1 && (
            <div className='absolute bottom-10 left-4 z-20 w-full max-w-xl px-4 text-left text-white sm:bottom-16 sm:left-10 sm:px-0 lg:bottom-32'>
              <h2 className='mb-2 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl md:text-4xl'>
                Discover the Summer Collection
              </h2>
              <p className='mb-3 max-w-md text-xs sm:mb-5 sm:text-base md:text-lg'>
                Celebrate with bright gemstones and radiant styles.
              </p>
              <Link
                href='/'
                className='hover:bg-opacity-90 inline-block rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition sm:px-6 sm:py-2.5 sm:text-base md:px-8 md:py-3'
              >
                Explore Now
              </Link>
            </div>
          )} */}
          {/* {index === 2 && (
                    <div className='absolute top-23 left-0 w-full px-4 text-left text-black sm:top-50 sm:left-10 sm:px-0'>
                      <h1 className='mb-2 font-sans text-lg leading-snug font-bold sm:mb-3 sm:text-2xl md:text-5xl'>
                        For the Moments That Matter Most
                      </h1>
                      <h2 className='mb-4 max-w-sm font-sans text-sm leading-snug font-medium sm:mb-5 sm:text-xl md:text-3xl'>
                        Timeless Jewelry for Your Forever
                      </h2>
                      {/* Optional paragraph can be re-enabled here if needed */}
          {/* <p className="mb-4 text-xs sm:text-base md:text-lg max-w-md">
      Graceful pieces to complete your wedding story.
    </p> */}
          {/* <Link
                        href='/collections/bridal'
                        className='inline-block rounded-full border border-black bg-black text-white px-5 py-2 font-sans text-sm font-medium transition hover:bg-white hover:text-black sm:px-6 sm:py-2.5 sm:text-base md:px-8 md:py-3'
                      >
                        View Collection
                      </Link>
                    </div>
                  )}  */}
        </div>
      </div>
      {/* </CarouselItem>
          ))}
        </CarouselContent> */}

      {/* Custom Pagination Dots */}
      {/* <div className='absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2'>
          {[0, 1].map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${current === index ? 'w-6 bg-white' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div> */}
      {/* </Carousel> */}

      {/* Toast */}
      {showTooltip && (
        <div className='animate-in slide-in-from-bottom zoom-in-105 fixed bottom-8 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-xl border border-white/20 bg-black/90 px-5 py-4 text-center text-sm text-white shadow-xl ring-1 ring-white/10'>
          <p className='text-lg'>Promo code copied!</p>
          Apply at checkout for your exclusive discount.
        </div>
      )}
    </section>
  );
}
