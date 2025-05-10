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
    <div className="px-4 sm:px-6 lg:px-8 pt-10 bg-">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative h-full rounded-lg flex items-center justify-center">
            {/* Static Ring */}
            <img src="/img/diamond3.jpg" className="h-56 md:h-full z-0" alt="Ring" />

            {/* Ultra-Smooth Floating Diamond */}
            <img
              ref={diamondRef}
              src="/img/diamondsec1.webp"
              alt="Diamond"
              className="absolute left-1/2 h-14 w-14 top-[-2%] md:top-[1.5%] md:h-40 md:w-40 z-10 pointer-events-none"
              style={{
                // top: '1.5%',
                willChange: 'transform', // Optimizes animation performance
              }}
            />
          </div>

          {/* Text Section */}
          <div className="grid gap-10">
            <h2 className=" text-3xl xl:text-5xl font-bold text-gray-900">
              DESIGN YOUR OWN ENGAGEMENT RING
            </h2>

            <p className="text-lg text-gray-700">
              Your love story is one of a kind—your ring should be too. With our interactive design experience, you have the freedom to craft a ring that truly reflects your personal style and relationship.
            </p>

            <p className="text-lg text-gray-700">
              Start with a carefully crafted setting or select your perfect diamond first. Choose from a wide range of shapes, sizes, metals, and styles. Whether you're drawn to timeless classics or modern elegance, the possibilities are endless.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button className="bg-black text-white px-8 py-4 rounded-md font-medium hover:bg-gray-800 transition">
                START WITH A SETTING
              </button>
              <button className="bg-white text-black border border-black px-8 py-4 rounded-md font-medium hover:bg-gray-100 transition">
                START WITH A DIAMOND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}