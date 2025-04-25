'use client';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useRef, useEffect, useState } from 'react';
import Heading from '@/components/heading';

export default function TestimonialSection() {
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
    <section className='wrapper 3xl:mb-24 mb-10 pt-6 md:mb-16 md:pt-7 lg:pt-8 xl:mb-18 xl:pt-10 2xl:mb-22'>
      <Heading
        title='Client Testimonial'
        subtitle='What Clients Say About Us'
      />
      <div
        ref={sliderRef}
        className={`keen-slider py-4 transition-opacity duration-300 ${
          isSliderReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className='keen-slider__slide'>
            <div className='xs:p-6 3xl:aspect-[3/1] aspect-[4.5/2] rounded-xl border-2 border-gray-300 bg-white p-4 sm:px-8 sm:py-6'>
              {/* Author Section */}
              <div className='flex items-center gap-4'>
                <img
                  src={`https://randomuser.me/api/portraits/men/${30 + index}.jpg`}
                  alt='Author Image'
                  className='h-12 w-12 rounded-full border border-gray-300'
                />
                <div>
                  <h4 className='text-lg font-semibold text-gray-900'>
                    John Doe
                  </h4>
                  <p className='text-sm text-gray-500'>CEO, TechCorp</p>
                </div>
              </div>
              {/* Quote */}
              <p className='full mt-2 text-sm font-light whitespace-normal md:mt-4 lg:text-base 2xl:line-clamp-3 2xl:text-lg'>
                "This product has transformed the way we do business. The team
                is amazing, and the support has been outstanding. Highly
                recommend!"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
