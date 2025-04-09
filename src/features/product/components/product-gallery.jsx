'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { Md360 } from 'react-icons/md';
import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';

const images = [
  '/img/preview/ring1.png',
  '/img/preview/ring2.png',
  '/img/preview/ring3.png',
  '/img/preview/gold1.png',
  '/img/preview/gold2.png',
  '/img/preview/gold3.png'
];

export default function ProductGallery({ className }) {
  return (
    <>
      {/* Mobile View */}
      <div className={cn('block md:hidden', className)}>
        <MobileGallery />
      </div>

      {/* Desktop View */}
      <div
        className={cn(
          'hidden md:block md:px-6 lg:pr-0 lg:pl-8 xl:pl-10',
          className
        )}
      >
        <DesktopGallery />
      </div>
    </>
  );
}

function MobileGallery() {
  return (
    <div className=''>
      <Tabs defaultValue='360' className=''>
        <div className='h-[300px] overflow-hidden'>
          {/* 360 View */}
          <TabsContent
            value='360'
            className='flex h-full w-full items-center justify-center overflow-hidden rounded-md p-4'
          >
            <Image
              src='/img/dummy/360view.gif'
              alt='360 view'
              width={400}
              height={300}
              className='max-h-full max-w-full object-contain'
            />
          </TabsContent>

          {/* Image Carousel */}
          <TabsContent value='images' className='h-full w-full overflow-hidden'>
            <Carousel className='h-full w-full'>
              <CarouselContent className='ml-0'>
                {images.map((img, i) => (
                  <CarouselItem key={i} className='h-[300px] p-0'>
                    <Image
                      src={img}
                      alt={`Dummy ${i}`}
                      width={300}
                      height={300}
                      className='h-full w-full object-cover'
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='translate-x-10' />
              <CarouselNext className='-translate-x-10' />
            </Carousel>
          </TabsContent>

          {/* Video */}
          <TabsContent value='video' className='h-full w-full overflow-hidden'>
            <video
              src='/img/dummy/video.mp4'
              controls
              className='h-full max-w-full rounded-md object-cover'
            />
          </TabsContent>
        </div>

        <TabsList className='flex w-full justify-start gap-2 rounded-none border-b bg-transparent'>
          <TabsTrigger
            value='360'
            className='border-b-2 border-b-transparent font-medium data-[state=active]:border-b-black'
          >
            <Md360 /> 360°
          </TabsTrigger>
          <TabsTrigger
            value='images'
            className='border-b-2 border-b-transparent font-medium data-[state=active]:border-b-black'
          >
            <IoImageOutline /> Images
          </TabsTrigger>
          <TabsTrigger
            value='video'
            className='border-b-2 border-b-transparent font-medium data-[state=active]:border-b-black'
          >
            <IoVideocamOutline />
            Videos
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

function DesktopGallery() {
  return (
    <div className='grid grid-cols-2 gap-4 overflow-hidden rounded-[70px]'>
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
  );
}
