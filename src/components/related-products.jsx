'use client';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useRef, useEffect, useState } from 'react';
import Heading from '@/components/heading';
import PreviewCard from '@/components/preview-card';
import { cn, repeatProducts, repeatProductsV1 } from '@/lib/utils';

const products = repeatProductsV1(20);

export default function RelatedProducts({ className }) {
  const timer = useRef();
  const [isSliderReady, setIsSliderReady] = useState(false);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: 'snap',
    slides: {
      perView: 2,
      spacing: 8
    },
    created: () => {
      setIsSliderReady(true);
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
      }, 4000);
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
    <section className={cn('mb-6 sm:mb-8 md:mb-10 lg:mb-12', className)}>
      <Heading
        title='Related Products'
        subtitle='You might also like to buy'
        className='mb-3 sm:mb-4 md:mb-5'
      />
      <div
        ref={sliderRef}
        className={`keen-slider transition-opacity duration-300 ${
          isSliderReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {products.map((product, i) => (
          <div
            key={i}
            className='keen-slider__slide overflow-hidden rounded-xl'
          >
            <PreviewCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
