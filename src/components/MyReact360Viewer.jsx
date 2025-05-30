'use client';
import { baseApiUrl, cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { TbView360Number } from 'react-icons/tb';
//static testing
// const imagePaths = Array.from(
//   { length: 99 },
//   (_, i) => `/img/360v1/383Q-ER-PR-WG_${String(i + 1)}.jpg`
// );

export default function MyReact360Viewer({
  media360 = [],
  autoRotate = true,
  className,
  dragOnHoverOnly = true
}) {
  const canvasRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPrompt, setShowPrompt] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const resumeTimeout = useRef(null);

  const imagePaths = media360.map((item) => baseApiUrl + item);

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => setShowPrompt(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  useEffect(() => {
    const firstImage = new Image();
    firstImage.src = imagePaths[0];
    firstImage.onload = () => {
      drawFrame(firstImage);
      const arr = [];
      arr[0] = firstImage;
      setLoadedImages(arr);
    };
  }, []);

  useEffect(() => {
    if (!loadedImages[0]) return;

    const imgs = [...loadedImages];
    let loadedCount = 1;

    imagePaths.forEach((src, i) => {
      if (i === 0) return;
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imgs[i] = img;
        loadedCount++;
        if (loadedCount === imagePaths.length) {
          setLoadedImages(imgs);
          4;
          setIsLoading(false);
        }
      };
    });
  }, [loadedImages[0]]);

  const drawFrame = (image) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !image) return;

    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas.parentElement.getBoundingClientRect();
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
  };

  useEffect(() => {
    if (loadedImages[currentFrame]) {
      drawFrame(loadedImages[currentFrame]);
    }
  }, [currentFrame, loadedImages]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      if (loadedImages[currentFrame]) {
        drawFrame(loadedImages[currentFrame]);
      }
    };
    const observer = new ResizeObserver(resizeCanvas);
    if (canvas?.parentElement) observer.observe(canvas.parentElement);
    return () => observer.disconnect();
  }, [loadedImages, currentFrame]);

  useEffect(() => {
    if (!autoRotate || !loadedImages.length || isPaused || isLoading) return;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % imagePaths.length);
    }, 100);
    return () => clearInterval(interval);
  }, [autoRotate, loadedImages, isPaused, isLoading]);

  const handleDragStart = (x) => {
    isDragging.current = true;
    startX.current = x;
    pauseAutoplay();
  };

  const handleDragMove = (x) => {
    if (!isDragging.current) return;
    const deltaX = x - startX.current;
    const frameChange = Math.floor(deltaX / 5);
    const nextFrame =
      (currentFrame - frameChange + imagePaths.length) % imagePaths.length;
    setCurrentFrame(nextFrame);
    startX.current = x;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    resumeAutoplayWithDelay();
  };

  const pauseAutoplay = () => {
    clearTimeout(resumeTimeout.current);
    setIsPaused(true);
  };

  const resumeAutoplayWithDelay = () => {
    clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      setIsPaused(false);
    }, 1500);
  };

  return (
    <div
      className={cn(
        'relative mx-auto aspect-square w-full max-w-xl cursor-grab active:cursor-grabbing',
        className
      )}
      onMouseEnter={() => {
        pauseAutoplay();
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        resumeAutoplayWithDelay();
        setIsHovering(false);
      }}
    >
      <canvas
        ref={canvasRef}
        className='absolute inset-0 h-full w-full touch-none'
        onMouseDown={(e) => {
          if (!dragOnHoverOnly) handleDragStart(e.clientX);
        }}
        onMouseMove={(e) => {
          if (dragOnHoverOnly && isHovering) {
            handleDragStart(startX.current || e.clientX); // start if not dragging yet
            handleDragMove(e.clientX);
          } else if (!dragOnHoverOnly) {
            handleDragMove(e.clientX);
          }
        }}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => {
          handleDragStart(e.touches[0].clientX);
          pauseAutoplay();
        }}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      />
      {isLoading && (
        <div className='absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-sm'>
          <div className='relative flex h-30 w-30 items-center justify-center rounded-full border-3 border-gray-300'>
            <span className='text-center text-gray-700'>
              360° Viewer
              <br />
              Loading...
            </span>
          </div>
        </div>
      )}

      <div className='pointer-events-none absolute right-0 bottom-2 left-0 z-10 mb-2 flex items-center justify-center bg-gradient-to-t from-white/80 via-white/60 to-transparent py-2 text-gray-600 backdrop-blur-sm'>
        <div className='rounded-full border bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 shadow-2xl'>
          <TbView360Number className='inline' size={20} /> Interactive Viewer
        </div>
      </div>
    </div>
  );
}
