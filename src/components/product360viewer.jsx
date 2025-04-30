'use client';
import { cn } from '@/lib/utils';
import { ReactImageTurntable } from 'react-image-turntable';
import { PiArrowBendDoubleUpLeftThin } from 'react-icons/pi';
import { useState } from 'react';
export default function Jewelry360Viewer({ images, className }) {
  const [rotationDisabled, setRotationDisabled] = useState(false);
  const handleKeyDown = (ev) => {
    if (rotationDisabled) return;

    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
      setRotationDisabled(true);
    }
  };
  return (
    <div className={cn('relative cursor-grab', className)}>
      <div className='h-full w-full'>
        <ReactImageTurntable
          images={images}
          autoRotate={{ disabled: rotationDisabled, interval: 150 }}
          onKeyDown={handleKeyDown}
          onKeyUp={() => setRotationDisabled(false)}
          movementSensitivity={-0.5}
          className='h-full w-full'
          style={{ display: 'block' }}
        />
      </div>
      <div className='absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/50 px-3 py-1 text-sm text-white'>
        <PiArrowBendDoubleUpLeftThin className='h-6 w-6 scale-x-[-1] rotate-240 stroke-3' />
        <span className='mx-1'>360 view</span>
        <PiArrowBendDoubleUpLeftThin className='h-6 w-6 rotate-120 stroke-3' />
      </div>
    </div>
  );
}

// export function Jewelry360Viewer2({ images }) {
//   // Extract base URL and count from your array
//   const baseUrl = images[0].substring(0, images[0].lastIndexOf('/') + '/');
//   const fileName = images[0].substring(images[0].lastIndexOf('/') + 1);
//   const fileType = fileName.split('.').pop();
//   const baseName = fileName.split('_')[0]; // Assumes "product_01.jpg" format
//   return (
//     <React360Viewer
//       imagesBaseUrl={baseUrl}
//       imagesPrefix={baseName + '_'} // e.g., "product_"
//       imagesCount={images.length}
//       imagesFiletype={fileType}
//       mouseDragSpeed={10}
//     />
//   );
// }
