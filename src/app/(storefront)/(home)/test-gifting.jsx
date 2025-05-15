// older version of gifting section
'use client';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const slides = [
  {
    id: 1,
    src: 'https://picsum.photos/400/400?random=1&grayscale',
    title: 'Eternal Rings (400 Items)'
  },
  {
    id: 2,
    src: 'https://picsum.photos/400/400?random=2&grayscale',
    title: 'Eternal Rings (400 Items)'
  },
  {
    id: 3,
    src: 'https://picsum.photos/400/400?random=3&grayscale',
    title: 'Eternal Rings (400 Items)'
  },
  {
    id: 4,
    src: 'https://picsum.photos/400/400?random=4&grayscale',
    title: 'Eternal Rings (400 Items)'
  },
  {
    id: 5,
    src: 'https://picsum.photos/400/400?random=5&grayscale',
    title: 'Eternal Rings (400 Items)'
  }
];

export default function CoverflowSlider() {
  const sliderRef = useRef(null);
  const [sliderInstanceRef, slider] = useKeenSlider({
    loop: true,
    centered: true,
    slides: {
      perView: 3,
      spacing: 15
    },
    breakpoints: {
      '(min-width: 1024px)': {
        slides: {
          perView: 5,
          spacing: 30
        }
      }
    },
    slideChanged: (slider) => {
      const current = slider.track.details.rel;
      const slideEls = sliderRef.current?.querySelectorAll(
        '.keen-slider__slide'
      );

      if (!slideEls) return;

      slideEls.forEach((slide, idx) => {
        const offset = idx - current;

        let visualOffset = offset;
        const total = slideEls.length;

        // Handle looping offset for correct positioning
        if (visualOffset > total / 2) visualOffset -= total;
        if (visualOffset < -total / 2) visualOffset += total;

        const absOffset = Math.abs(visualOffset);
        const scale = absOffset === 0 ? 1 : absOffset === 1 ? 0.8 : 0.6;
        const rotate = visualOffset * -30;

        slide.style.transform = `perspective(1000px) rotateY(${rotate}deg) scale(${scale})`;
        slide.style.zIndex = `${100 - absOffset}`;
        slide.style.transition = 'transform 0.5s ease';
      });
    }
  });
  //   // Initialize styles on first load
  //   useEffect(() => {
  //     if (slider) {
  //       slider.update();
  //     }
  //   }, [slider]);

  return (
    <section className='px-8 py-10'>
      {/* <div>hello sir {process.env.NEXTAUTH_URL}</div> */}
      <div
        ref={(ref) => {
          sliderRef.current = ref;
          sliderInstanceRef(ref);
        }}
        className='keen-slider'
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className='keen-slider__slide relative h-[350px] w-full transform-gpu overflow-hidden rounded-xl bg-white shadow-xl'
          >
            <Image
              src={slide.src}
              alt={slide.title}
              width={400}
              height={400}
              className='h-full w-full object-cover'
            />
            <div className='absolute bottom-0 left-0 w-full bg-black/50 px-4 py-2 text-sm font-semibold text-white'>
              {slide.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
