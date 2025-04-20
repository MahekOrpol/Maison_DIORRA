'use client';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useRef, useEffect } from 'react';
import Heading from './heading';
import PreviewCard3 from './preview-card';
import { cn } from '@/lib/utils';

export default function RelatedProducts({ className }) {
  const timer = useRef();
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2,
      spacing: 8
    },
    breakpoints: {
      '(min-width: 425px)': {
        slides: {
          perView: 2,
          spacing: 12
        }
      },
      '(min-width: 768px)': {
        slides: {
          perView: 3,
          spacing: 20
        }
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 4,
          spacing: 26
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
      }, 3000);
    }

    autoplay();

    return () => {
      clear = true;
      clearTimeout(timer.current);
    };
  }, [slider]);

  return (
    <section className={cn('mb-6 sm:mb-8 md:mb-10 lg:mb-12', className)}>
      <Heading
        title='Related Products'
        subtitle='You might also like to buy'
        className='mb-3 sm:mb-4 md:mb-5'
      />

      <div ref={sliderRef} className='keen-slider'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className='keen-slider__slide overflow-hidden rounded-xl'
          >
            <PreviewCard3 />
          </div>
        ))}
      </div>
    </section>
  );
}
