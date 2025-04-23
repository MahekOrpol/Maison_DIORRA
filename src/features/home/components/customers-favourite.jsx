'use client';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useRef, useEffect } from 'react';
import Heading from '@/components/heading';
import PreviewCard from '@/components/preview-card';
import { repeatProducts } from '@/lib/utils';

const customersFavourite = repeatProducts(20);

export default function CustomersFavourite() {
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
      }, 3000); // Autoplay interval
    }

    autoplay();

    return () => {
      clear = true;
      clearTimeout(timer.current);
    };
  }, [slider]);

  return (
    <section className='wrapper pt-6 md:pt-7 lg:pt-8 xl:pt-10'>
      <Heading
        title='Customer’s Favourite'
        subtitle='New Styles, Endless Elegance'
      />
      <div ref={sliderRef} className='keen-slider'>
        {customersFavourite.map((product, i) => (
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
