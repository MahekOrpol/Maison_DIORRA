'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { baseApiUrl, cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Md360 } from 'react-icons/md';
import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';
// import Jewelry360Viewer from '@/components/product360viewer';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Jewelry360Viewer2 from '@/components/product360viewer2';
import Jewelry360Viewer from '@/components/product360viewer';

const images = [
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-YG_0_6ed69b33-41f1-45a6-a66a-4b959b6fb034.jpg?v=1695166772&width=1200&height=1200&crop=center',
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/files/0139cda002df913152089c957a4774f6.jpg?v=1693933865&width=800&height=800&crop=center',
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-C1-YG-DIA-2Ks_0.jpg?v=1695166754&width=800&height=800&crop=center',
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-C125-YG-DIA-2ks_0.jpg?v=1695166754&width=800&height=800&crop=center'
];

// rings
const images2 = [
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-WG_0.jpg?v=1695166735&width=1200&height=1200&crop=center',
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-A19-WG_0_439d1b74-7b6e-439f-8f61-936dd2c8f331.jpg?v=1695166735&width=1200&height=1200&crop=center',
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/files/405QS-ER-R-WG_attGdLS1s2lDdmysX_d6d2aef0-4b02-4d2b-adfd-c37cceed29d4.jpg?v=1714946503&width=800&height=800&crop=center',
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/files/405QS-ER-R-WG_attORTuXHyMGar1zF_1a07ab42-9c8a-4056-98b6-cc8507f53bf0.jpg?v=1714946504&width=1200&height=1200&crop=center',
  // gold
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-YG_0_6ed69b33-41f1-45a6-a66a-4b959b6fb034.jpg?v=1695166772&width=1200&height=1200&crop=center',
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-YG_0_6ed69b33-41f1-45a6-a66a-4b959b6fb034.jpg?v=1695166772&width=1200&height=1200&crop=center',
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-C1-YG-DIA-2Ks_0.jpg?v=1695166754&width=800&height=800&crop=center',
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-C125-YG-DIA-2ks_0.jpg?v=1695166754&width=800&height=800&crop=center',
  // rose
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-RG_0_3480720d-c5a2-4887-be46-41cbf009bac0.jpg?v=1695166763&width=1200&height=1200&crop=center',
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-RG_0_3480720d-c5a2-4887-be46-41cbf009bac0.jpg?v=1695166763&width=1200&height=1200&crop=center',
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-C125-RG-DIA-2ks_0.jpg?v=1695166744&width=800&height=800&crop=center',
  'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-C1-RG-DIA-2Ks_0.jpg?v=1695166744&width=800&height=800&crop=center',
  // videos
  'https://checkout.keyzarjewelry.com/cdn/shop/videos/c/vp/a23cfeccd86a4dd8bee5f19192ff2f55/a23cfeccd86a4dd8bee5f19192ff2f55.HD-1080p-7.2Mbps-33725443.mp4'
];

const ZoomableImage = ({ src, alt }) => {
  const [backgroundPos, setBackgroundPos] = useState('50% 50%');
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef(null);
  // console.log(src);

  const handleMouseMove = (e) => {
    if (!isZoomed) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    if (isZoomed) {
      setIsZoomed(false);
      setBackgroundPos('100% 100%');
    }
  };

  const handleClick = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setBackgroundPos('50% 50%');
    }
  };

  return (
    <div
      ref={containerRef}
      className={`zoom-container relative h-full w-full cursor-zoom-in overflow-hidden ${
        isZoomed ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={600}
        className={`zoom-image h-full w-full object-cover transition-transform duration-300 ${
          isZoomed ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transformOrigin: backgroundPos
        }}
      />
    </div>
  );
};
export default function ProductGallery({ className, media }) {
  // console.log(media);
  return (
    <>
      {/* Mobile View */}
      <div className={cn('block lg:hidden', className)}>
        <MobileGallery media={media} />
      </div>
      {/* Desktop View */}
      <div
        className={cn(
          '3xl:pl-14 4xl:pl-20 hidden md:px-6 lg:block lg:pr-0 lg:pl-8 2xl:pl-12',
          className
        )}
      >
        <DesktopGallery media={media} />
      </div>
    </>
  );
}

export function MobileGallery({ media = [] }) {
  const isVideo = (file) =>
    file.toLowerCase().endsWith('.mp4') ||
    file.toLowerCase().endsWith('.webm') ||
    file.toLowerCase().endsWith('.mov');

  // Separate media into images and videos
  const imageMedia = media.filter((item) => !isVideo(item));
  const videoMedia = media.find((item) => isVideo(item)); // Get first video if exists
  const defaultTab = videoMedia ? '360' : '360';

  return (
    <div className=''>
      <Tabs
        defaultValue={defaultTab}
        className='aspect-[9.7/10] sm:aspect-[5/4]'
      >
        {/* 360 View */}
        <TabsContent
          value='360'
          className='flex h-full w-full items-center justify-center overflow-hidden rounded-md'
        >
          {/* <Image
            src='/img/dummy/360view.gif'
            alt='360 view'
            width={400}
            height={300}
            className='max-h-full max-w-full object-contain'
          /> */}
          {/* <Jewelry360Viewer2 /> */}
          <Jewelry360Viewer />
        </TabsContent>
        {/* Image Carousel */}
        <TabsContent value='images' className='h-full w-full overflow-hidden'>
          <Carousel className='h-full w-full'>
            <CarouselContent className='ml-0 !h-full'>
              {imageMedia.slice(0, 4).map((item, index) => (
                <CarouselItem key={index} className='h-full p-0'>
                  <ZoomableImage
                    src={baseApiUrl + item}
                    alt={'Product Image'}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='translate-x-12 border-none' />
            <CarouselNext className='-translate-x-12 border-none' />
          </Carousel>
        </TabsContent>
        {/* Video */}
        <TabsContent value='video' className='h-full w-full overflow-hidden'>
          {videoMedia && (
            <div className='h-full w-full'>
              <video
                src={baseApiUrl + videoMedia}
                className='h-full w-full object-cover'
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          )}
        </TabsContent>
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
          {videoMedia && (
            <TabsTrigger
              value='video'
              className='border-b-2 border-b-transparent font-medium data-[state=active]:border-b-black'
            >
              <IoVideocamOutline />
              Videos
            </TabsTrigger>
          )}
        </TabsList>
      </Tabs>
    </div>
  );
}

function DesktopGallery({ media = [] }) {
  const isVideo = (file) =>
    file.toLowerCase().endsWith('.mp4') ||
    file.toLowerCase().endsWith('.webm') ||
    file.toLowerCase().endsWith('.mov');

  const imageMedia = media.filter((item) => !isVideo(item));
  const videoMedia = media.find((item) => isVideo(item)); // Only one video expected

  return (
    <div className='grid grid-cols-2 gap-4 overflow-hidden'>
      {/* 360 Viewer First */}
      {/* {viewer360 && ( */}
      {/* <Jewelry360Viewer images={images360} className='col-span-1' /> */}
      <Jewelry360Viewer2 className='col-span-1' />
      {/* )} */}

      {/* Render all images */}
      {imageMedia.slice(0, 6).map((item, index) => (
        <div
          key={index}
          className='flex aspect-square items-center justify-center overflow-hidden border border-black/20 bg-gray-100'
        >
          <ZoomableImage src={baseApiUrl + item} alt={`Product ${index}`} />
        </div>
      ))}

      {/* Render video if available */}
      {videoMedia && (
        <div className='col-span-1'>
          <div className='aspect-square h-full overflow-hidden border border-black/20 bg-gray-100'>
            <video
              src={baseApiUrl + videoMedia}
              className='h-full w-full object-cover'
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      )}
    </div>
  );
}
