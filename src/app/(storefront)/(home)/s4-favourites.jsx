'use client';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useRef, useEffect, useState } from 'react';
import Heading from '@/components/heading';
import { repeatProducts, repeatProductsV1 } from '@/lib/utils';
import PreviewCard from '@/components/preview-card';

const customersFavourite = repeatProductsV1(20);

export default function S4FavouriteSection({ data }) {
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
      '(min-width: 1000px)': {
        slides: {
          perView: 4,
          spacing: 20
        }
      },
      '(min-width: 1800px)': {
        slides: {
          perView: 5,
          spacing: 24
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
    <section className='wrapper pt-6 md:pt-7 lg:pt-8 xl:pt-10'>
      <Heading
        title='Customer’s Favourite'
        subtitle='New Styles, Endless Elegance'
      />
      <div
        ref={sliderRef}
        className={`keen-slider transition-opacity duration-300 ${
          isSliderReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {customersFavourite.map((product, i) => (
          <div
            key={i}
            className='keen-slider__slide overflow-hidden rounded-xl'
          >
            <PreviewCard isDraggable={false} product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
