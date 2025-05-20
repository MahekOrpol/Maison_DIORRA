'use client';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useRef, useEffect, useState } from 'react';
import Heading from '@/components/heading';
import { Quote } from 'lucide-react';

export default function S10TestimonialSection({ data }) {
  const timer = useRef();
  const [isSliderReady, setIsSliderReady] = useState(false);
  const [sliderRef, slider] = useKeenSlider({
    loop: true, // Ensures the slider will loop
    mode: 'snap',
    slides: {
      perView: 1,
      spacing: 12
    },
    created: () => {
      setIsSliderReady(true);
    },
    breakpoints: {
      '(min-width: 550px)': {
        slides: {
          perView: 2,
          spacing: 12
        }
      },
      '(min-width: 768px)': {
        slides: {
          perView: 2,
          spacing: 20
        }
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 3,
          spacing: 30
        }
      }
    }
  });

  useEffect(() => {
    if (!slider.current) return;

    let timeout;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }

    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.current?.next();
        nextTimeout();
      }, 20000);
    }

    function handleMouseOver() {
      mouseOver = true;
      clearNextTimeout();
    }

    function handleMouseOut() {
      mouseOver = false;
      nextTimeout();
    }

    slider.current.container.addEventListener('mouseover', handleMouseOver);
    slider.current.container.addEventListener('mouseout', handleMouseOut);

    nextTimeout();

    return () => {
      slider.current?.container.removeEventListener(
        'mouseover',
        handleMouseOver
      );
      slider.current?.container.removeEventListener('mouseout', handleMouseOut);
      clearTimeout(timeout);
    };
  }, [slider]);

  return (
    <section className='wrapper 3xl:mb-22 mb-8 pt-6 md:mb-16 md:pt-7 lg:pt-8 xl:mb-14 xl:pt-14'>
      <Heading
        title='Client Testimonial'
        subtitle='What Clients Say About Us'
      />
      <div
        ref={sliderRef}
        className={`keen-slider transition-opacity duration-300 ${
          isSliderReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          // <div key={index} className='keen-slider__slide'>
          //   <div className='xs:p-6 3xl:aspect-[3/1] aspect-[4.5/2] rounded-xl border-2 border-gray-300 bg-white p-4 sm:px-8 sm:py-6'>
          //     {/* Author Section */}
          //     <div className='flex items-center gap-4'>
          //       <img
          //         src={`https://randomuser.me/api/portraits/men/${30 + index}.jpg`}
          //         alt='Author Image'
          //         className='h-14 w-14 rounded-full border border-gray-300 2xl:h-16 2xl:w-16'
          //       />
          //       <div>
          //         <h4 className='text-lg font-semibold text-gray-900 md:text-xl xl:text-2xl'>
          //           John Doe
          //         </h4>
          //         <p className='text-xs font-light xl:text-sm'>CEO, TechCorp</p>
          //       </div>
          //     </div>
          //     {/* Quote */}
          //     <p className='full mt-2 text-sm font-light whitespace-normal md:mt-4 lg:text-base 2xl:line-clamp-3 2xl:text-lg'>
          //       "This product has transformed the way we do business. The team
          //       is amazing, and the support has been outstanding. Highly
          //       recommend!"
          //     </p>
          //   </div>
          // </div>
          <div key={index} className='keen-slider__slide'>
            <div className='xs:p-6 3xl:aspect-[3/1] aspect-[4.5/2] rounded-xl border-2 border-gray-300 bg-white px-5 py-4 sm:px-8 sm:py-6'>
              <div className='flex items-center gap-4'>
                <img
                  src={`https://randomuser.me/api/portraits/women/${40 + index}.jpg`}
                  alt='Author Image'
                  className='h-14 w-14 rounded-full border border-gray-300 2xl:h-16 2xl:w-16'
                />
                <div>
                  <h4 className='text-lg font-semibold text-gray-900 md:text-xl xl:text-2xl'>
                    Sarah Johnson
                  </h4>
                  <p className='text-xs font-light xl:text-sm'>
                    Marketing Director, BrandCo
                  </p>
                </div>
              </div>
              <div className='relative mt-2 md:mt-4'>
                <Quote className='absolute -top-1 -left-3 h-4 w-4 rotate-180 stroke-1' />
                <p className='full px-3 text-justify text-xs font-light whitespace-normal md:text-sm lg:text-base 2xl:line-clamp-3 2xl:text-lg'>
                  The service exceeded all our expectations. Their attention to
                  detail and creative approach solved problems we didn't even
                  know we had!
                </p>
                <Quote className='absolute -right-4 bottom-3 h-4 w-4 stroke-1' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
