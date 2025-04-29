'use client';
import { cn } from '@/lib/utils';
import { ReactImageTurntable } from 'react-image-turntable';
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PiArrowBendDoubleUpLeftThin } from 'react-icons/pi';

export default function Jewelry360Viewer({ images, className }) {
  return (
    <div className={cn('relative cursor-grab', className)}>
      <div className='h-full w-full'>
        <ReactImageTurntable
          autoRotate={{ disabled: true }}
          images={images}
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
