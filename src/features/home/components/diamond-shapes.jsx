import Heading from '@/components/heading';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const shapes = [
  { name: 'Cushion', url: '/img/shapes/cushion.png' },
  { name: 'Emerald', url: '/img/shapes/emerald.png' },
  { name: 'Marquise', url: '/img/shapes/marquise.png' },
  { name: 'Oval', url: '/img/shapes/oval.png' },
  { name: 'Pear', url: '/img/shapes/pear.png' },
  { name: 'Princess', url: '/img/shapes/princess.png' },
  { name: 'Round', url: '/img/shapes/round.png' }
];

export default function DiamondShapes() {
  return (
    <section className='wrapper py-6'>
      <Heading
        title='Shop by Diamond Shapes'
        subtitle='Find Your Perfect Shape, Shine Your Way'
      />
      <Carousel className='mt-6'>
        <CarouselContent className='flex gap-4'>
          {shapes.map((item) => (
            <CarouselItem
              key={item.name}
              className='w-1/3 basis-1/2 text-center sm:basis-1/4 md:flex-1'
            >
              <Link href='#'>
                <Image
                  src={item.url}
                  alt={item.name}
                  width={80}
                  height={80}
                  className='mx-auto h-[100px] w-auto object-contain'
                />
                <p className='mt-2 font-semibold'>{item.name}</p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-0' />
        <CarouselNext className='right-0' />
      </Carousel>
    </section>
  );
}
