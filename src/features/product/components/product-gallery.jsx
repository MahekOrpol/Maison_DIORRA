import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const images = [
  'https://picsum.photos/id/237/800/600', // Dog image
  'https://picsum.photos/id/1020/800/600', // Nature
  'https://picsum.photos/id/1000/800/600', // Cityscape
  'https://picsum.photos/id/1039/800/600', // Forest
  'https://picsum.photos/id/1041/800/600', // Mountain
  'https://picsum.photos/id/1043/800/600' // Beach
];

export default function ProductGallery({ className }) {
  return (
    <>
      {/* Mobile View */}
      <div className={cn('block md:hidden', className)}>
        <MobileGallery />
      </div>

      {/* Desktop View */}
      <div className={cn('hidden md:block', className)}>
        <DesktopGallery />
      </div>
    </>
  );
}

function MobileGallery() {
  return (
    <div className='grid grid-cols-2 gap-4'>
      {Array.from({ length: 1 }).map((item, i) => (
        <div
          className='flex h-[200px] w-[200px] items-center justify-center rounded-lg bg-gray-300'
          key={i}
        ></div>
      ))}
      <div className='col-span-2 text-center'>
        mobile tabs | images | 360 view | video
      </div>
    </div>
  );
}

function DesktopGallery() {
  return (
    <div className='grid grid-cols-2 gap-4'>
      {images.map((image, index) => (
        <div
          className='flex items-center justify-center rounded-lg bg-gray-100'
          key={index}
        >
          <img
            src={image}
            alt={`Product ${index}`}
            className='h-full w-full object-cover'
          />
        </div>
      ))}
      desktop | Lorem ipsum dolor sit amet.
    </div>
  );
}
