'use client';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useRef, useEffect, useState } from 'react';
import PreviewCard from '@/components/preview-card';

export default function FavouriteSlider({ products }) {
  const timer = useRef();
  const [isSliderReady, setIsSliderReady] = useState(false);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: 'snap',
    slides: {
      perView: 2,
      spacing: 8
    },
    created: () => setIsSliderReady(true),
    breakpoints: {
      '(min-width: 425px)': {
        slides: { perView: 2, spacing: 12 }
      },
      '(min-width: 768px)': {
        slides: { perView: 3, spacing: 20 }
      },
      '(min-width: 1000px)': {
        slides: { perView: 4, spacing: 20 }
      },
      '(min-width: 1800px)': {
        slides: { perView: 5, spacing: 24 }
      }
    }
  });

  useEffect(() => {
    if (!slider.current) return;

    let timeout;
    let mouseOver = false;

    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.current?.next();
        nextTimeout();
      }, 4000);
    }

    const container = slider.current.container;
    const handleMouseOver = () => {
      mouseOver = true;
      clearTimeout(timeout);
    };
    const handleMouseOut = () => {
      mouseOver = false;
      nextTimeout();
    };

    container.addEventListener('mouseover', handleMouseOver);
    container.addEventListener('mouseout', handleMouseOut);
    nextTimeout();

    return () => {
      container.removeEventListener('mouseover', handleMouseOver);
      container.removeEventListener('mouseout', handleMouseOut);
      clearTimeout(timeout);
    };
  }, [slider]);

  return (
    <div
      ref={sliderRef}
      className={`keen-slider transition-opacity duration-300 ${isSliderReady ? 'opacity-100' : 'opacity-0'}`}
    >
      {products.products.map((products, i) => (
        <div key={i} className='keen-slider__slide overflow-hidden rounded-xl'>
          <PreviewCard isDraggable={false} product={products} />
        </div>
      ))}
    </div>
  );
}
