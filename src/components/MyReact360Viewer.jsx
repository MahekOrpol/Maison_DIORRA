'use client';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

const images = Array.from(
  { length: 99 },
  (_, i) => `/img/360v1/383Q-ER-PR-WG_${String(i + 1)}.jpg`
);

export default function MyReact360Viewer({
  width = 465,
  height = 465,
  autoRotate = true,
  className
}) {
  const canvasRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const resumeTimeout = useRef(null); // ⏳ Track resume delay timeout

  // Load images
  useEffect(() => {
    const imgs = [];
    let loadedCount = 0;

    images.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setLoadedImages(imgs);
        }
      };
      imgs[i] = img;
    });
  }, []);

  // Draw current frame
  useEffect(() => {
    if (!loadedImages.length) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(loadedImages[currentFrame], 0, 0, width, height);
  }, [currentFrame, loadedImages]);

  // Responsive resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      const { width, height } = canvas.parentElement.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      if (loadedImages.length) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, width, height);
        ctx?.drawImage(loadedImages[currentFrame], 0, 0, width, height);
      }
    };

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(canvas.parentElement);

    return () => observer.disconnect();
  }, [loadedImages, currentFrame]);

  // Drag logic
  const handleDragStart = (x) => {
    isDragging.current = true;
    startX.current = x;
    pauseAutoplay(); // pause on drag
  };

  const handleDragMove = (x) => {
    if (!isDragging.current) return;
    const deltaX = x - startX.current;
    const frameChange = Math.floor(deltaX / 5);
    const nextFrame =
      (currentFrame - frameChange + images.length) % images.length;
    setCurrentFrame(nextFrame);
    startX.current = x;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    resumeAutoplayWithDelay();
  };

  // Autoplay
  useEffect(() => {
    if (!autoRotate || !loadedImages.length || isPaused) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % images.length);
    }, 100);

    return () => clearInterval(interval);
  }, [autoRotate, loadedImages, isPaused]);

  // Pause + Resume Helpers
  const pauseAutoplay = () => {
    clearTimeout(resumeTimeout.current);
    setIsPaused(true);
  };

  const resumeAutoplayWithDelay = () => {
    clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      setIsPaused(false);
    }, 1500); //  1 seconds delay
  };

  return (
    <div
      className={cn(
        'relative mx-auto aspect-square w-full max-w-xl cursor-grab active:cursor-grabbing',
        className
      )}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplayWithDelay}
    >
      <canvas
        ref={canvasRef}
        className='absolute inset-0 h-full w-full touch-none'
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => {
          handleDragStart(e.touches[0].clientX);
          pauseAutoplay();
        }}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      />
    </div>
  );
}
