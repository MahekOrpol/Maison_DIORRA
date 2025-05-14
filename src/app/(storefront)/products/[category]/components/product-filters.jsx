'use client';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Funnel, RotateCcw, RotateCcwIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

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
export default function ProductsFilter({ category, subCategory, className }) {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedPurity, setSelectedPurity] = useState('14 K');

  const isRing = category === 'Rings';
  const isDiamondBased = subCategory?.toLowerCase().includes('diamond');
  const showRingStyle = isRing;
  const showDiamondShapes = isDiamondBased || isRing;
  const showCommonFilters = [
    'rings',
    'necklaces',
    'bracelets',
    'earrings'
  ].includes(category);

  return (
    <>
      {/* heading + product styles  */}
      <div className='mt-[16px] text-center sm:mt-[25px] md:block lg:mt-[30px] xl:mt-[35px] 2xl:mt-[50px]'>
        <h2 className='3xl:text-5xl xs mb-1 text-lg font-medium sm:text-2xl lg:text-3xl xl:text-4xl'>
          Choose Perfect{' '}
          {category &&
            `${category.charAt(0).toUpperCase() + category.slice(1, -1)}`}{' '}
          Style for You
        </h2>
        <p
          className={cn(
            'text-muted-foreground 3xl:text-2xl text-xs sm:text-base 2xl:text-lg',
            category === 'rings' && 'lg:hidden'
          )}
        >
          Find Your Statement Piece – Crafted to Elevate Your Style
        </p>
        {category === 'Rings' && (
          <div className='hidden justify-center gap-4 pt-3 lg:flex'>
            {ringStyles.map((style) => {
              const isSelected = selectedStyle === style.styleType;
              return (
                <button
                  key={style.styleType}
                  onClick={() => setSelectedStyle(style.styleType)}
                  className={`inline-flex w-[112px] flex-col items-center rounded-2xl border p-3 pt-4 text-xs transition-all ${isSelected ? 'border-secondary shadow-md' : 'border-secondary shadow-md hover:border-black/60 hover:bg-gray-100'} `}
                >
                  <div className='mb-4 flex h-[30px] w-[70px] items-center justify-center 2xl:h-[35px]'>
                    <Image
                      src={style.imgUrl}
                      height={30}
                      width={70}
                      alt={style.styleType}
                      className='h-full w-full object-contain'
                    />
                  </div>
                  <p className='3xl:text-lg mt-auto text-[15px] leading-4 text-nowrap xl:text-base'>
                    {style.styleType}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
      {/* product filters */}
      <div className={cn(className)}>
        {/* mobile */}
        <Drawer>
          <DrawerTrigger
            asChild
            className='flex items-center rounded-xs border border-black px-2 py-[4px] shadow-none lg:hidden'
          >
            <button>
              <Funnel className='mr-1 h-4 w-4' /> Filter
            </button>
          </DrawerTrigger>
          <DrawerContent className='no-drag-handle max-h-[90vh] rounded-t-lg p-0 lg:hidden [data-radix-drawer-handle]:hidden'>
            <DrawerTitle className='sr-only'>Filter drawer</DrawerTitle>
            <div className='bg-secondary flex items-center justify-between gap-2 px-4 py-2'>
              <Button className='w-fit rounded-sm text-xs' variant='outline'>
                Filters Selected (2)
              </Button>
              <Button
                className='mr-auto w-fit rounded-sm text-xs'
                variant='outline'
              >
                <RotateCcwIcon /> Reset Filters
              </Button>
              <DrawerClose className='flex h-7 w-7 items-center justify-center rounded-full bg-[#D9D9D9] transition hover:bg-gray-300'>
                <X size={20} />
              </DrawerClose>
            </div>

            <div className='space-y-3 overflow-y-auto px-4 pt-2 pb-4'>
              {/* Metal Section */}
              <div>
                <p>
                  <strong className='font-medium'>Metal : </strong>
                  <span className='text-secondary-foreground'>White Gold</span>
                </p>
                <div className='xs:grid-cols-5 mt-2 grid grid-cols-4 gap-2 text-[11px] sm:w-2/3'>
                  {['gold', 'rose', 'white'].map((metal, idx) => (
                    <button
                      key={idx}
                      className='bg-secondary flex flex-col items-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm transition hover:border-black focus:border-black'
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
                <div className='xs:grid-cols-5 mt-2 grid grid-cols-4 gap-2 text-[11px] sm:w-2/3'>
                  {['14 K', '18 K', '20 K'].map((karat) => {
                    const isSelected = selectedPurity === karat;
                    return (
                      <Button
                        key={karat}
                        variant='outline'
                        onClick={() => setSelectedPurity(karat)}
                        className={`bg-secondary rounded-md transition ${
                          isSelected
                            ? 'border-black'
                            : 'border-transparent hover:border-black'
                        }`}
                      >
                        {karat}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Ring Style Section - Now using grid instead of carousel */}
              <div>
                <p>
                  <strong className='font-medium'>Ring Style : </strong>
                  <span className='text-secondary-foreground'>Halo</span>
                </p>
                <div className='mt-2 grid grid-cols-5 gap-2 text-xs sm:grid-cols-8'>
                  {ringStyles.map((style, idx) => {
                    const isSelected = selectedStyle === style.styleType;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedStyle(style.styleType)}
                        className={`bg-secondary flex h-full flex-col items-center rounded-md border px-2 pb-2 text-[10px] transition-all ${
                          isSelected
                            ? 'border-black'
                            : 'border-transparent hover:border-black'
                        }`}
                      >
                        <Image
                          src={style.imgUrl}
                          width={50}
                          height={25}
                          alt={style.styleType}
                          className='my-2 h-[25px] w-[50px] object-contain'
                        />
                        <p className='mt-2 text-center'>{style.styleType}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* Diamond Shape Section */}
              <div>
                <p>
                  <strong className='font-medium'>Diamond Shape : </strong>
                  <span className='text-secondary-foreground'>Round</span>
                </p>
                <div className='mt-2 grid grid-cols-5 gap-2 text-xs sm:grid-cols-8'>
                  {['round', 'pear', 'emerlad', 'princess'].map(
                    (shape, idx) => (
                      <button
                        key={idx}
                        className='bg-secondary flex flex-col items-center rounded-md border border-transparent px-1 pb-2 text-[10px] transition hover:border-black'
                      >
                        <Image
                          src={`/icons/shape-${shape}.svg`}
                          width={48}
                          height={48}
                          alt={shape}
                          className='h-12 w-12'
                        />
                        {shape.charAt(0).toUpperCase() + shape.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        {/* desktop - unchanged */}
        <div className='hidden gap-4 lg:flex'>
          {showCommonFilters && (
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
          )}
          {showCommonFilters && (
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
                <SelectItem value='22k' className='py-2'>
                  22K Pure
                </SelectItem>
              </SelectContent>
            </Select>
          )}
          {showCommonFilters && (
            <Select>
              <SelectTrigger className='data-[placeholder]:text-foreground w-[120px] border-black'>
                <SelectValue placeholder='Price' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='14k' className='py-2'>
                  Price low to high
                </SelectItem>
                <SelectItem value='18k' className='py-2'>
                  Price high to low
                </SelectItem>
              </SelectContent>
            </Select>
          )}
          {showRingStyle && (
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
          )}
          {showDiamondShapes && (
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
          )}
          <Button variant='outline' className='border-black font-normal'>
            <RotateCcw />
            Reset Filters
          </Button>
        </div>
      </div>
    </>
  );
}
