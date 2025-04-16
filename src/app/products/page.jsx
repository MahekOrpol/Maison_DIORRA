'use client';
import CustomTag from '@/components/custom-tag';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import PreviewCard from '@/components/preview-card';
import { Funnel, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerTitle
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import CustomTagWrapper from '@/components/custom-tag-wrapper';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import ProductCard2 from '@/components/preview-card2';
import PreviewCard3 from '@/components/preview-card3';

const advertisements = [
  {
    title: '40 % Off',
    subtitle: ' On The Diamond Earings',
    buttonLabel: 'Shop Diamonds',
    buttonLink: '#',
    backgroundImage: '/img/ads/add1.png',
    align: 'left'
  },
  {
    title: 'Gold That Shines Forever',
    subtitle: 'Explore our handcrafted gold jewelry, made for every occasion.',
    buttonLabel: 'Explore Gold',
    buttonLink: '#',
    backgroundImage: '/img/ads/add2.png',
    align: 'right'
  },
  {
    title: 'Exclusive Bridal Collection',
    subtitle:
      'Make your special day shine with our stunning bridal jewelry sets.',
    buttonLabel: 'View Collection',
    buttonLink: '#',
    backgroundImage: '/img/ads/add3.png',
    align: 'left'
  }
];

const ringStyles = [
  {
    styleType: 'Solitaire',
    imgUrl: '/img/ring-style-solitaire.svg'
  },
  {
    styleType: 'Pave',
    imgUrl: '/img/ring-style-pave.svg'
  },
  {
    styleType: 'Halo',
    imgUrl: '/img/ring-style-halo.svg'
  },
  {
    styleType: 'Hidden Halo',
    imgUrl: '/img/ring-style-hidden.svg'
  },
  {
    styleType: 'Stone',
    imgUrl: '/img/ring-style-stone.svg'
  }
];

export default function Page() {
  const [selectedStyle, setSelectedStyle] = useState(null);
  return (
    <div className='wrapper2'>
      {/* arrowed label */}
      <CustomTagWrapper />
      {/* select ring style */}
      <div className='hidden text-center md:block'>
        <h2 className='mb-3 sm:text-xl md:text-2xl lg:text-3xl'>
          Choose Perfect Ring Style for You
        </h2>
        <div className='my-4 flex justify-center gap-4'>
          {ringStyles.map((style) => {
            const isSelected = selectedStyle === style.styleType;

            return (
              <button
                key={style.styleType}
                onClick={() => setSelectedStyle(style.styleType)}
                className={`inline-flex w-[100px] flex-col items-center rounded-lg border p-2 pt-4 text-xs transition-all ${isSelected ? 'bg-muted border-black' : 'border-transparent hover:border-gray-300'} `}
              >
                <div className='mb-4 flex h-[30px] w-[70px] items-center justify-center'>
                  <Image
                    src={style.imgUrl}
                    height={30}
                    width={70}
                    alt={style.styleType}
                    className='h-full w-full object-contain'
                  />
                </div>
                <p className='mt-auto text-[15px] text-nowrap'>
                  {style.styleType}
                </p>
              </button>
            );
          })}
        </div>
      </div>
      {/* filters */}
      <ProductsFilter />
      {/* listing components */}
      <div className='mt-6 mb-10 grid grid-cols-2 gap-2 md:mb-20 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5 xl:gap-6'>
        {Array.from({ length: 50 }).map((_, index) => {
          // Separate ad indices for different breakpoints
          const mobileAdIndex = Math.floor(index / 2) % advertisements.length;
          const mediumAdIndex = Math.floor(index / 6) % advertisements.length;
          const largeAdIndex = Math.floor(index / 8) % advertisements.length;

          // Get the correct ad based on the breakpoint
          const mobileAd = advertisements[mobileAdIndex];
          const mediumAd = advertisements[mediumAdIndex];
          const largeAd = advertisements[largeAdIndex];

          // Mobile: Ad appears after 4th, then 6th item, repeating
          const adsAfterMobile = [];
          let adPosition = 5;
          for (let i = 0; i < 10; i++) {
            adsAfterMobile.push(adPosition);
            adPosition += i % 2 === 0 ? 6 : 4;
          }
          const showMobileAd = adsAfterMobile.includes(index + 1);

          return (
            <React.Fragment key={index}>
              {/* Mobile View: Show ad after 4th, then 6th, then repeat */}
              {showMobileAd && (
                <Advertisement
                  title={mobileAd.title}
                  subtitle={mobileAd.subtitle}
                  buttonLabel={mobileAd.buttonLabel}
                  buttonLink={mobileAd.buttonLink}
                  backgroundImage={mobileAd.backgroundImage}
                  align={mobileAd.align}
                  className='col-span-2 md:hidden' // Visible only on mobile
                />
              )}

              {/* Medium Screens: Show ad after every 6th item*/}
              {index > 0 && index % 6 === 0 && (
                <Advertisement
                  title={mediumAd.title}
                  subtitle={mediumAd.subtitle}
                  buttonLabel={mediumAd.buttonLabel}
                  buttonLink={mediumAd.buttonLink}
                  backgroundImage={mediumAd.backgroundImage}
                  align={mediumAd.align}
                  className='hidden md:col-span-3 md:block lg:hidden'
                />
              )}

              {/* Large Screens: Show ad after every 8th item */}
              {index > 0 && index % 8 === 0 && (
                <Advertisement
                  title={largeAd.title}
                  subtitle={largeAd.subtitle}
                  buttonLabel={largeAd.buttonLabel}
                  buttonLink={largeAd.buttonLink}
                  backgroundImage={largeAd.backgroundImage}
                  align={largeAd.align}
                  className='col-span-2 hidden lg:block' // Visible only on large screens
                />
              )}
              {/* Render Listing Item */}
              {/* <PreviewCard /> */}
              <PreviewCard3 />
              {/* <ProductCard2 /> */}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function ProductsFilter() {
  const [selectedStyle, setSelectedStyle] = useState(null);
  return (
    <div>
      {/* mobile */}
      <Drawer>
        <DrawerTrigger
          asChild
          className='flex items-center rounded-xs border border-black px-2 py-[4px] shadow-none md:hidden'
        >
          <button>
            {' '}
            <Funnel className='mr-1 h-4 w-4' /> Filter
          </button>
        </DrawerTrigger>
        <DrawerContent className='no-drag-handle max-h-[90vh] rounded-t-lg p-0 [data-radix-drawer-handle]:hidden'>
          <DrawerTitle className='sr-only'>Filter drawer</DrawerTitle>
          <div className='bg-secondary flex items-center justify-between px-4 py-2'>
            <Button className='w-fit rounded-sm text-sm' variant='outline'>
              Filters Selected (2)
            </Button>
            <DrawerClose className='flex h-7 w-7 items-center justify-center rounded-full bg-[#D9D9D9] transition hover:bg-gray-300'>
              <X size={20} />
            </DrawerClose>
          </div>

          <div className='space-y-3 overflow-y-auto px-4 py-6'>
            {/* Metal Section */}
            <div>
              <p>
                <strong className='font-medium'>Metal : </strong>
                <span className='text-secondary-foreground'>White Gold</span>
              </p>
              <div className='xs:gap-4 mt-2 grid grid-cols-4 gap-3 text-xs'>
                {['gold', 'rose', 'white'].map((metal, idx) => (
                  <button
                    key={idx}
                    className='bg-secondary flex flex-col items-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm transition focus:border-black'
                  >
                    <Image
                      src={`/img/${metal}-theme.png`}
                      width={32}
                      height={32}
                      alt={metal}
                      className='h-8 w-8'
                    />
                    {metal.charAt(0).toUpperCase() + metal.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Purity Section */}
            <div>
              <p>
                <strong className='font-medium'>Purity : </strong>
                <span className='text-secondary-foreground'>14 K</span>
              </p>
              <div className='xs:gap-4 mt-2 grid grid-cols-4 gap-3 text-xs'>
                {['14 K', '18 K', '20 K'].map((karat) => (
                  <Button
                    key={karat}
                    variant='outline'
                    className='bg-secondary rounded-md border-none'
                  >
                    {karat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Ring Style Section */}
            <div>
              <p>
                <strong className='font-medium'>Ring Style : </strong>
                <span className='text-secondary-foreground'>Halo</span>
              </p>
              <Carousel
                opts={{
                  align: 'start'
                }}
                className='w-full'
              >
                <CarouselContent className=''>
                  {ringStyles.map((style, idx) => {
                    const isSelected = selectedStyle === style.styleType;

                    return (
                      <CarouselItem
                        key={idx}
                        className='xs:pl-4 basis-1/4 pl-3' // 4 items per row
                      >
                        <button
                          onClick={() => setSelectedStyle(style.styleType)}
                          className={`bg-secondary flex h-full w-full flex-col items-center rounded-md border px-3 py-2 text-xs transition-all ${
                            isSelected ? 'border-black' : 'hover:border-black'
                          }`}
                        >
                          <Image
                            src={style.imgUrl}
                            width={50}
                            height={25}
                            alt={style.styleType}
                            className='my-2 h-[25px] w-[50px] object-contain'
                          />
                          <p className='mt-2 text-center text-nowrap'>
                            {style.styleType}
                          </p>
                        </button>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Diamond Shape Section */}
            <div>
              <p>
                <strong className='font-medium'>Diamond Shape : </strong>
                <span className='text-secondary-foreground'>Round</span>
              </p>
              <div className='xs:gap-4 mt-2 grid grid-cols-4 gap-3 text-xs'>
                {['round', 'pear', 'emerlad', 'princess'].map((shape, idx) => (
                  <button
                    key={idx}
                    className='bg-secondary flex flex-col items-center rounded-md border border-transparent px-3 py-2 transition focus:border-black'
                  >
                    <Image
                      src={`/icons/shape-${shape}.svg`}
                      width={80}
                      height={80}
                      alt={shape}
                    />
                    {shape.charAt(0).toUpperCase() + shape.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      {/* desktop */}
      <div className='mt-8 hidden gap-4 md:flex'>
        <Select>
          <SelectTrigger className='data-[placeholder]:text-foreground w-[150px] border-black'>
            <SelectValue placeholder='Select Metal' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='gold' className='py-2'>
              <Image
                src='/img/gold-theme.png'
                width={18}
                height={18}
                alt='metal'
              />
              Gold
            </SelectItem>
            <SelectItem value='rose' className='py-2'>
              <Image
                src='/img/rose-theme.png'
                width={18}
                height={18}
                alt='metal'
              />
              Rose Gold
            </SelectItem>
            <SelectItem value='white' className='py-2'>
              <Image
                src='/img/white-theme.png'
                width={18}
                height={18}
                alt='metal'
              />
              White Gold
            </SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className='data-[placeholder]:text-foreground w-[120px] border-black'>
            <SelectValue placeholder='Purity' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='14k' className='py-2'>
              14K Pure
            </SelectItem>
            <SelectItem value='18k' className='py-2'>
              18K Pure
            </SelectItem>
            <SelectItem value='20k' className='py-2'>
              20K Pure
            </SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className='data-[placeholder]:text-foreground w-[170px] border-black'>
            <SelectValue placeholder='Ring Style' />
          </SelectTrigger>
          <SelectContent className=''>
            <SelectItem value='solitare' className='py-2'>
              <Image
                src='/img/ring-style-solitaire.svg'
                width={35}
                height={30}
                alt='metal'
              />
              Solitare
            </SelectItem>
            <SelectItem value='pave' className='py-2'>
              <Image
                src='/img/ring-style-pave.svg'
                width={35}
                height={30}
                alt='metal'
              />
              Pave
            </SelectItem>
            <SelectItem value='halo' className='py-2'>
              <Image
                src='/img/ring-style-halo.svg'
                width={35}
                height={30}
                alt='metal'
              />
              Halo
            </SelectItem>
            <SelectItem value='hidden-halo' className='py-2'>
              <Image
                src='/img/ring-style-hidden.svg'
                width={25}
                height={18}
                alt='metal'
                className='h-[18px] w-[25px] object-contain'
              />
              Hidden Halo
            </SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className='data-[placeholder]:text-foreground w-[150px] border-black'>
            <SelectValue placeholder='Diamond Shape' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='round'>
              <Image
                src='/icons/shape-round.svg'
                width={26}
                height={26}
                alt='metal'
              />
              Round
            </SelectItem>
            <SelectItem value='pear'>
              <Image
                src='/icons/shape-pear.svg'
                width={26}
                height={26}
                alt='metal'
              />
              Pear
            </SelectItem>
            <SelectItem value='emerlad'>
              <Image
                src='/icons/shape-emerlad.svg'
                width={26}
                height={26}
                alt='metal'
              />
              Emerlad
            </SelectItem>
            <SelectItem value='princess'>
              <Image
                src='/icons/shape-princess.svg'
                width={26}
                height={26}
                alt='metal'
              />
              Princess
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
export function Advertisement({
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  backgroundImage,
  className,
  align = 'left' // Default alignment to left
}) {
  return (
    <div
      className={cn(
        'xs:min-h-[300px] relative -mx-3 flex min-h-[280px] w-screen items-center justify-center overflow-hidden rounded-none shadow-md sm:-mx-4 lg:w-full lg:rounded-lg',
        className
      )}
    >
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt='Advertisement Background'
        layout='fill'
        objectFit='cover'
        className='absolute inset-0 z-0'
      />
      {/* Content wrapper */}
      <div
        className={cn(
          'relative z-10 flex h-full w-xs max-w-2xl flex-col items-center justify-center rounded-md p-6 text-left text-white',
          align === 'right'
            ? 'ml-auto bg-gradient-to-l from-black/70 via-black/30 to-transparent sm:pr-10'
            : 'mr-auto bg-gradient-to-r from-black/70 via-black/30 to-transparent sm:pl-16'
        )}
      >
        <h2 className='text-2xl font-bold md:text-3xl'>{title}</h2>
        <p className='mt-2 text-lg opacity-90'>{subtitle}</p>
        <Link href={buttonLink}>
          <Button className='bg-primary hover:bg-primary/80 mt-4 py-2 text-lg'>
            {buttonLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}
