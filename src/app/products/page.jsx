'use client';
import CustomTag from '@/components/CustomTag';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import PreviewCard from '@/components/preview-card';
import { Funnel, ListFilter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogClose,
  DialogDescription
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const advertisements = [
  {
    title: 'Luxury Redefined',
    subtitle:
      'Discover timeless elegance with our exclusive diamond collection.',
    buttonLabel: 'Shop Diamonds',
    buttonLink: '/collections/diamonds',
    backgroundImage: '/images/diamond-banner.jpg',
    align: 'left'
  },
  {
    title: 'Gold That Shines Forever',
    subtitle: 'Explore our handcrafted gold jewelry, made for every occasion.',
    buttonLabel: 'Explore Gold',
    buttonLink: '/collections/gold',
    backgroundImage: '/images/gold-banner.jpg',
    align: 'right'
  },
  {
    title: 'Exclusive Bridal Collection',
    subtitle:
      'Make your special day shine with our stunning bridal jewelry sets.',
    buttonLabel: 'View Collection',
    buttonLink: '/collections/bridal',
    backgroundImage: '/images/bridal-banner.jpg',
    align: 'left'
  }
];

export default function Page() {
  return (
    <div className='container'>
      {/* arrowed label */}
      <div className='my-[5%] flex w-full items-center justify-between gap-3 md:flex-row md:gap-6 xl:my-15'>
        <CustomTag
          no='1.'
          text='Select Your'
          bold='METAL'
          imgUrl='/icons/metal.svg'
          href='/products'
        />
        <CustomTag
          no='2.'
          text='Select Your'
          bold='SHANK'
          imgUrl='/icons/shank.svg'
          href='/products'
        />
        <CustomTag
          no='3.'
          text='Select Your'
          bold='DIAMOND'
          imgUrl='/icons/diamond1.svg'
          href='/products'
        />
      </div>
      {/* select ring style */}
      <div className='text-center'>
        <h2 className='mb-3 sm:text-xl md:text-2xl lg:text-3xl'>
          Choose Perfect Ring Style for You
        </h2>
        <div className='hidden justify-center gap-3 transition-all duration-800 md:flex'>
          <Link href='#' className=''>
            <Image
              src='/img/ring-style-halo.svg'
              width={150}
              height={150}
              className='w-[130px] transition-all duration-200 hover:scale-105 lg:w-[140px]'
              alt='Image diamond'
            />
          </Link>
          <Link href='#'>
            <Image
              src='/img/ring-style-pave.svg'
              width={150}
              height={150}
              className='w-[130px] transition-all duration-200 hover:scale-105 lg:w-[140px]'
              alt='Image diamond'
            />
          </Link>
          <Link href='#'>
            <Image
              src='/img/ring-style-solitaire.svg'
              width={150}
              height={150}
              className='w-[130px] transition-all duration-200 hover:scale-105 lg:w-[140px]'
              alt='Image diamond'
            />
          </Link>
          <Link href='#'>
            <Image
              src='/img/ring-style-stone.svg'
              width={150}
              height={150}
              className='w-[130px] transition-all duration-200 hover:scale-105 lg:w-[140px]'
              alt='Image diamond'
            />
          </Link>
          <Link href='#'>
            <Image
              src='/img/ring-style-hidden.svg'
              width={150}
              height={150}
              className='w-[130px] transition-all duration-200 hover:scale-105 lg:w-[140px]'
              alt='Image diamond'
            />
          </Link>
        </div>
      </div>
      {/* filters */}
      <ProductsFilter />
      {/* listing components */}
      <div className='my-6 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4'>
        {Array.from({ length: 30 }).map((_, index) => {
          // Mobile: Ad appears after 4th, then 6th item, repeating the pattern
          const adsAfterMobile = [];
          let adIndex = 5;
          for (let i = 0; i < 10; i++) {
            adsAfterMobile.push(adIndex);
            adIndex += i % 2 === 0 ? 6 : 4;
          }
          const showMobileAd = adsAfterMobile.includes(index + 1);

          // Medium Screens Ad Pattern: 6, then 8, then 6, then 8, etc.
          const adsAfterMd = [];
          let mdAdIndex = 7; // First ad after 6 items (index 7 in 1-based)
          for (let i = 0; i < 10; i++) {
            adsAfterMd.push(mdAdIndex);
            mdAdIndex += i % 2 === 0 ? 8 : 6;
          }
          const showMdAd = adsAfterMd.includes(index + 1);

          return (
            <React.Fragment key={index}>
              {/* Mobile View: Show ad after 4th, then 6th, then 4th, then 6th... */}
              {showMobileAd && (
                <Advertisement
                  title='Exclusive Deals!'
                  subtitle='Shop the finest jewelry collections now.'
                  buttonLabel='Shop Now'
                  buttonLink='/shop'
                  backgroundImage='/img/ads/add1.png'
                  align='left'
                  className='col-span-2 md:hidden' // Visible only on mobile
                />
              )}
              {/* Medium Screens: Show ad after every 6th, then 8th item */}
              {index > 0 && index % 6 === 0 && (
                <Advertisement
                  title='Exclusive Jewelry Deals!'
                  subtitle='Timeless pieces at unbeatable prices.'
                  buttonLabel='Shop Now'
                  buttonLink='/shop'
                  backgroundImage='/img/ads/add2.png'
                  align='center'
                  className='hidden md:col-span-3 md:block lg:hidden' // Ensures full row width
                />
              )}

              {/* Large Screens: Show ad after every 8th item */}
              {index > 0 && index % 8 === 0 && (
                <Advertisement
                  title='Luxury Awaits!'
                  subtitle='Limited-time offers on exquisite jewelry.'
                  buttonLabel='Discover More'
                  buttonLink='/collections'
                  backgroundImage='/img/ads/add1.png'
                  align='right'
                  className='col-span-2 hidden lg:block' // Visible only on large screens
                />
              )}

              {/* Render Listing Item */}
              <PreviewCard />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function ProductsFilter() {
  return (
    <div>
      {/* mobile */}
      <Dialog>
        <DialogTrigger className='flex items-center rounded-xs border border-black px-2 py-[4px] shadow-none md:hidden'>
          <Funnel className='mr-1 h-4 w-4' /> Filter
        </DialogTrigger>

        <DialogContent
          className='max-w-screen overflow-hidden rounded-lg p-0 sm:max-w-screen'
          animateSide='bottom'
          hideClose={true}
        >
          <DialogTitle className='bg-secondary flex items-center justify-between px-4 py-2'>
            <Button className='w-fit rounded-sm text-sm' variant='outline'>
              Filters Selected (2)
            </Button>
            <DialogClose className='flex h-8 w-8 items-center justify-center rounded-full bg-[#D9D9D9] text-gray-600 transition hover:bg-gray-300'>
              <X size={20} />
            </DialogClose>
          </DialogTitle>

          <div className='space-y-3 py-6'>
            <div>
              <p>
                <strong className='font-medium'>Metal : </strong>
                <span className='text-secondary-foreground'>White Gold </span>
              </p>
              <div className='xs:gap-4 mt-2 grid grid-cols-4 gap-3 text-xs text-nowrap'>
                {/* Rose Gold */}
                <button className='bg-secondary flex flex-col items-center justify-between gap-2 rounded-sm border-1 border-transparent px-4 py-2 text-sm transition focus:border-black'>
                  <Image
                    src='/img/gold-theme.png'
                    width={32}
                    height={32}
                    alt='metal'
                    className='h-8 w-8'
                  />
                  Gold
                </button>

                {/* Gold */}
                <button className='bg-secondary flex flex-col items-center justify-between gap-2 rounded-sm border-1 border-transparent px-4 py-2 text-sm transition focus:border-black'>
                  <Image
                    src='/img/rose-theme.png'
                    width={32}
                    height={32}
                    alt='metal'
                    className='h-8 w-8'
                  />
                  Rose Gold
                </button>

                {/* Silver */}
                <button className='bg-secondary flex flex-col items-center justify-between gap-2 rounded-sm border-1 border-transparent px-4 py-2 text-sm transition focus:border-black'>
                  <Image
                    src='/img/white-theme.png'
                    width={32}
                    height={32}
                    alt='metal'
                    className='h-8 w-8'
                  />
                  Silver
                </button>
              </div>
            </div>
            <div>
              <p>
                <strong className='font-medium'>Purity : </strong>
                <span className='text-secondary-foreground'>14 K</span>
              </p>
              <div className='xs:gap-4 mt-2 grid grid-cols-4 gap-3 text-xs text-nowrap'>
                <Button
                  variant='outline'
                  className='bg-secondary rounded-sm border-none'
                >
                  14 K
                </Button>
                <Button
                  variant='outline'
                  className='bg-secondary rounded-sm border-none'
                >
                  18 K
                </Button>
                <Button
                  variant='outline'
                  className='bg-secondary rounded-sm border-none'
                >
                  20 K
                </Button>
              </div>
            </div>
            <div>
              <p>
                <strong className='font-medium'>Ring Style : </strong>
                <span className='text-secondary-foreground'>Halo</span>
              </p>
              <div className='xs:gap-4 mt-2 grid grid-cols-4 gap-3 text-[0.8rem] text-nowrap'>
                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 text-sm transition focus:border-black'>
                  <Image
                    src='/icons/ring-style-solitare.png'
                    width={80}
                    height={80}
                    alt='metal'
                  />
                  Solitare
                </button>
                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 text-sm transition focus:border-black'>
                  <Image
                    src='/icons/ring-style-pave.png'
                    width={80}
                    height={80}
                    alt='metal'
                  />
                  Pave
                </button>
                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 text-sm transition focus:border-black'>
                  <Image
                    src='/icons/ring-style-halo.png'
                    width={80}
                    height={80}
                    alt='metal'
                  />
                  Halo
                </button>
                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 transition focus:border-black'>
                  <Image
                    src='/icons/ring-style-hidden.png'
                    width={80}
                    height={80}
                    alt='metal'
                  />
                  Hidden halo
                </button>
              </div>
            </div>
            <div>
              <p>
                <strong className='font-medium'>Diamond Shape : </strong>
                <span className='text-secondary-foreground'>Round</span>
              </p>
              <div className='xs:gap-4 mt-2 grid grid-cols-4 gap-3 text-[0.8rem] text-nowrap'>
                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 transition focus:border-black'>
                  <Image
                    src='/icons/shape-round.svg'
                    width={32}
                    height={32}
                    alt='metal'
                    className='w-[80px]'
                  />
                  Round
                </button>

                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 transition focus:border-black'>
                  <Image
                    src='/icons/shape-pear.svg'
                    width={80}
                    height={80}
                    alt='metal'
                  />
                  Pear
                </button>
                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 transition focus:border-black'>
                  <Image
                    src='/icons/shape-emerlad.svg'
                    width={80}
                    height={80}
                    alt='metal'
                  />
                  Emerlad
                </button>
                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 transition focus:border-black'>
                  <Image
                    src='/icons/shape-princess.svg'
                    width={80}
                    height={80}
                    alt='metal'
                  />
                  Princess
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* desktop */}
      <div className='mt-8 hidden gap-4 md:flex'>
        <Select>
          <SelectTrigger className='data-[placeholder]:text-foreground w-[150px] border-black'>
            <SelectValue placeholder='Select Metal' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='gold'>
              <Image
                src='/img/gold-theme.png'
                width={18}
                height={18}
                alt='metal'
              />
              Gold
            </SelectItem>
            <SelectItem value='rose'>
              <Image
                src='/img/rose-theme.png'
                width={18}
                height={18}
                alt='metal'
              />
              Rose Gold
            </SelectItem>
            <SelectItem value='white'>
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
            <SelectItem value='14k'>14K Pure</SelectItem>
            <SelectItem value='18k'>18K Pure</SelectItem>
            <SelectItem value='20k'>20K Pure</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className='data-[placeholder]:text-foreground w-[170px] border-black'>
            <SelectValue placeholder='Ring Style' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='solitare'>
              <Image
                src='/icons/ring-style-solitare.png'
                width={40}
                height={30}
                alt='metal'
              />
              Solitare
            </SelectItem>
            <SelectItem value='pave'>
              <Image
                src='/icons/ring-style-pave.png'
                width={40}
                height={30}
                alt='metal'
              />
              Pave
            </SelectItem>
            <SelectItem value='halo'>
              <Image
                src='/icons/ring-style-halo.png'
                width={40}
                height={30}
                alt='metal'
              />
              Halo
            </SelectItem>
            <SelectItem value='hidden-halo '>
              <Image
                src='/icons/ring-style-hidden.png'
                width={30}
                height={30}
                alt='metal'
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
function Advertisement({
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
        'relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-lg shadow-md',
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
      {/* Content Container */}
      <div
        className={cn(
          'relative z-10 max-w-2xl rounded-md bg-black/50 p-6 text-white',
          align === 'right' ? 'ml-auto text-right' : 'mr-auto text-left'
        )}
      >
        <h2 className='text-3xl font-bold'>{title}</h2>
        <p className='mt-2 text-lg opacity-80'>{subtitle}</p>
        <a href={buttonLink}>
          <Button className='bg-primary hover:bg-primary/80 mt-4'>
            {buttonLabel}
          </Button>
        </a>
      </div>
    </div>
  );
}
