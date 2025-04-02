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
  'https://picsum.photos/id/1025/800/600', // Nature
  'https://picsum.photos/id/1000/800/600', // Cityscape
  'https://picsum.photos/id/1039/800/600', // Forest
  'https://picsum.photos/id/1041/800/600', // Mountain
  'https://picsum.photos/id/1043/800/600' // Beach
];

export default function ProductGallery({ className }) {
  return (
    <>
      <div className={cn('grid w-auto grid-cols-2 gap-4', className)}>
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
      </div>
    </>
  );
}
