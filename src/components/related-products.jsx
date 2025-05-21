'use client';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useRef, useEffect, useState } from 'react';
import Heading from '@/components/heading';
import PreviewCard from '@/components/preview-card';
import { cn } from '@/lib/utils';
import { useFetch } from '@/hooks/useFetch';

// const products = repeatProductsV1(20);
const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://153.92.222.195:5000'}/api/v1`;
export default function RelatedProducts({ className, cart, categoryName }) {
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

  const {
    data: trendingProducts,
    isLoading,
    error
  } = useFetch(`${BASE_URL}/product/get-trending`, {
    limit: 10,
    categoryName: categoryName
  });

  // console.log('trending :>>', trendingProducts);

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

      {isLoading && (
        <div className='py-8 text-center text-gray-500'>Loading...</div>
      )}

      {error && (
        <div className='py-8 text-center text-red-500'>
          Failed to load products. Please try again later.
        </div>
      )}
      {!isLoading && !error && trendingProducts?.products?.length > 0 && (
        <div
          ref={sliderRef}
          className={`keen-slider transition-opacity duration-300 ${
            isSliderReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {trendingProducts.products.map((product, i) => (
            <div
              key={i}
              className='keen-slider__slide overflow-hidden rounded-xl'
            >
              <PreviewCard isDraggable={false} product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
