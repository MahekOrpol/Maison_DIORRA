'use client';
import { useEffect, useRef, useState } from 'react';

export default function Canvas360Viewer({
  images,
  width = 500,
  height = 500,
  autoRotate = false
}) {
  const canvasRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

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
  }, [images]);

  useEffect(() => {
    if (!loadedImages.length) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(loadedImages[currentFrame], 0, 0, width, height);
  }, [currentFrame, loadedImages]);

  // Mouse / touch handlers
  const handleDragStart = (x) => {
    isDragging.current = true;
    startX.current = x;
  };

  const handleDragMove = (x) => {
    if (!isDragging.current) return;
    const deltaX = x - startX.current;
    const frameChange = Math.floor(deltaX / 5); // Adjust sensitivity here
    let nextFrame =
      (currentFrame - frameChange + images.length) % images.length;
    setCurrentFrame(nextFrame);
    startX.current = x;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  // Auto-rotation
  useEffect(() => {
    if (!autoRotate || !loadedImages.length) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % images.length);
    }, 100);

    return () => clearInterval(interval);
  }, [autoRotate, loadedImages]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
      className='cursor-grab touch-none active:cursor-grabbing'
    />
  );
}
