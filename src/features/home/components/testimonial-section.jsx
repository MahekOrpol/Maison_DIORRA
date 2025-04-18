'use client';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useRef, useEffect } from 'react';
import Heading from '@/components/heading';

export default function TestimonialSection() {
  const timer = useRef();
  const [sliderRef, slider] = useKeenSlider({
    loop: true, // Ensures the slider will loop
    slides: {
      perView: 1,
      spacing: 12
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
    let clear = false;

    function autoplay() {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        if (!clear && slider.current) {
          slider.current.next();
          autoplay();
        }
      }, 3000); // Autoplay interval
    }

    autoplay();

    return () => {
      clear = true;
      clearTimeout(timer.current);
    };
  }, [slider]);

  return (
    <section className='wrapper mb-10 pt-6 md:mb-16 md:pt-7 lg:pt-8 xl:mb-20 xl:pt-10 2xl:mb-24'>
      <Heading
        title='Client Testimonial'
        subtitle='What Clients Say About Us'
      />
      <div ref={sliderRef} className='keen-slider'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='keen-slider__slide'>
            <div className='rounded-xl border border-gray-200 bg-white p-4'>
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
              <p className='full mt-2 text-sm font-light whitespace-normal md:mt-4 lg:text-base'>
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
