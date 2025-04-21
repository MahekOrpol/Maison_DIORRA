'use client';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useRef, useEffect } from 'react';
import Heading from '@/components/heading';
import BlogCard from '@/app/blogs/components/blog-card';

const blogPosts = [
  {
    image: '/img/blogs/blog1.png',
    title: 'Crafting Beauty from Nature',
    href: '/blogs/1',
    date: '12.FEB.2025',
    author: 'BY TEAM FERONIA',
    excerpt:
      'Discover how our artisans blend nature and art to create timeless pieces...'
  },
  {
    image: '/img/blogs/blog2.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog3.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog4.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog5.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog6.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog7.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog8.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog5.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog6.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog7.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog8.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog8.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog5.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog6.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog7.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  },
  {
    image: '/img/blogs/blog8.png',
    title: 'Sustainable Jewelry Practices',
    href: '/blogs/2'
  }
];

export default function BlogsSection() {
  const timer = useRef();
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 8
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
    <section className='wrapper pt-6 md:pt-7 lg:pt-8 xl:pt-10'>
      <Heading
        title='Blogs and Articles'
        subtitle='Affordable luxury for everyday wear'
      />
      <div ref={sliderRef} className='keen-slider relative py-4'>
        {/* Left Gradient */}
        {/* <div className='absolute inset-y-0 left-0 z-10 w-1.5 bg-gradient-to-r from-white to-transparent'></div> */}

        {/* Right Gradient */}
        {/* <div className='absolute inset-y-0 right-0 z-10 w-1.5 bg-gradient-to-l from-white to-transparent'></div> */}

        {blogPosts.map((post, index) => (
          <div key={index} className='keen-slider__slide'>
            <BlogCard {...post} />
          </div>
        ))}
      </div>
    </section>
  );
}
