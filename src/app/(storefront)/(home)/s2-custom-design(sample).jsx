'use client';

import React, { useEffect, useRef } from 'react';

export default function RingSection() {
  const diamondRef = useRef(null);
  const animationRef = useRef(null);

  // Animation parameters
  const basePosition = -7; // Starting position (% from top)
  const floatDistance = 24; // Total up/down travel distance (px)
  const floatSpeed = 0.003; // Speed of float cycle
  const smoothness = 0.01; // Smoothing factor (0-1)

  useEffect(() => {
    let animationFrame;
    let currentPos = 0;
    let targetPos = 0;
    let time = 0;

    const animate = () => {
      time += floatSpeed;

      // Calculate target position using sine wave for smooth oscillation
      targetPos = Math.sin(time * Math.PI * 2) * floatDistance;

      // Apply smoothing with linear interpolation
      currentPos += (targetPos - currentPos) * smoothness;

      // Apply the position
      if (diamondRef.current) {
        diamondRef.current.style.transform = `translateX(-50%) translateY(calc(${basePosition}% + ${currentPos}px))`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className='bg- px-4 pt-10 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-2'>
          {/* Image Section */}
          <div className='relative flex h-full items-center justify-center rounded-lg'>
            {/* Static Ring */}
            <img
              src='/img/diamond3.jpg'
              className='z-0 h-56 md:h-full'
              alt='Ring'
            />

            {/* Ultra-Smooth Floating Diamond */}
            <img
              ref={diamondRef}
              src='/img/diamondsec1.webp'
              alt='Diamond'
              className='pointer-events-none absolute top-[-2%] left-1/2 z-10 h-14 w-14 md:top-[0%] md:h-40 md:w-40'
              style={{
                willChange: 'transform' // Optimizes animation performance
              }}
            />
          </div>

          {/* Text Section */}
          <div className='grid gap-10'>
            <h2 className='text-3xl font-bold text-gray-900 xl:text-5xl'>
              DESIGN YOUR OWN ENGAGEMENT RING
            </h2>

            <p className='text-lg text-gray-700'>
              Your love story is one of a kind—your ring should be too. With our
              interactive design experience, you have the freedom to craft a
              ring that truly reflects your personal style and relationship.
            </p>

            <p className='text-lg text-gray-700'>
              Start with a carefully crafted setting or select your perfect
              diamond first. Choose from a wide range of shapes, sizes, metals,
              and styles. Whether you're drawn to timeless classics or modern
              elegance, the possibilities are endless.
            </p>

            <div className='mt-4 flex flex-col gap-4 sm:flex-row'>
              <button className='rounded-md bg-black px-8 py-4 font-medium text-white transition hover:bg-gray-800'>
                START WITH A SETTING
              </button>
              <button className='rounded-md border border-black bg-white px-8 py-4 font-medium text-black transition hover:bg-gray-100'>
                START WITH A DIAMOND
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
