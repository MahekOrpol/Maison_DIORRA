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
import { baseApiUrl, cn } from '@/lib/utils';
import { useFilterStore } from '@/store/use-filter-store';
import { Funnel, RotateCcw, RotateCcwIcon, X } from 'lucide-react';
import Image from 'next/image';

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

const metalPurityOptions = [
  { label: '14K Gold', swatch: '#d4af37' },
  { label: '18K Gold', swatch: '#d4af37' },
  { label: '14K Rose Gold', swatch: '#e4a0a1' },
  { label: '18K Rose Gold', swatch: '#e4a0a1' },
  { label: '14K White Gold', swatch: '#e0e0e0' },
  { label: '18K White Gold', swatch: '#e0e0e0' },
  { label: 'Platinum', swatch: '#e0e0e0' }
];

export default function ProductFilters({
  category,
  subCategory,
  className,
  availableMetals,
  availableShapes,
  availableStyles
}) {
  const {
    metalPurity,
    style,
    shape,
    sortByPrice,
    setMetalPurity,
    setStyle,
    setShape,
    setSortByPrice,
    resetFilters
  } = useFilterStore();

  const isRing = category === 'rings';
  const isDiamondBased = subCategory?.toLowerCase().includes('diamond');
  const showRingStyle = isRing;
  const showDiamondShapes = isDiamondBased || isRing;
  const showCommonFilters = [
    'rings',
    'pendants',
    'bracelets',
    'earrings'
  ].includes(category.toLowerCase());

  const modifiedMetals = Array.isArray(availableMetals)
    ? metalPurityOptions.filter((option) =>
        availableMetals.some(
          (m) => m.metal.toLowerCase() === option.label.toLowerCase()
        )
      )
    : [];
  console.log('style', availableStyles);
  return (
    <>
      {/* heading + product styles  */}
      <div className='mt-[16px] text-center sm:mt-[25px] md:block lg:mt-[30px] xl:mt-[35px] 2xl:mt-[50px]'>
        <h2 className='3xl:text-5xl xs mb-1 text-lg font-medium sm:text-2xl lg:text-3xl xl:text-4xl'>
          Choose Perfect{' '}
          {category
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}{' '}
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
        {category === 'rings' && (
          <div className='hidden justify-center gap-4 pt-3 lg:flex'>
            {availableStyles &&
              availableStyles.length > 0 &&
              availableStyles.map((item) => {
                const isSelected = style === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() =>
                      // setStyle(item.name.toLowerCase().replace(/\s+/g, '-'))
                      setStyle(item.name)
                    }
                    className={`inline-flex w-[112px] flex-col items-center rounded-2xl border p-3 pt-4 text-xs transition-all ${isSelected ? 'border-secondary shadow-md' : 'border-secondary shadow-md hover:border-black/60 hover:bg-gray-100'} `}
                  >
                    <div className='mb-4 flex h-[30px] w-[70px] items-center justify-center 2xl:h-[35px]'>
                      <Image
                        src={baseApiUrl + item.image}
                        height={30}
                        width={70}
                        alt={item.name}
                        className='h-full w-full object-contain'
                      />
                    </div>
                    <p className='3xl:text-lg mt-auto text-[15px] leading-4 text-nowrap xl:text-base'>
                      {item.name}
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
                onClick={resetFilters}
              >
                <RotateCcwIcon /> Reset Filters
              </Button>
              <DrawerClose className='flex h-7 w-7 items-center justify-center rounded-full bg-[#D9D9D9] transition hover:bg-gray-300'>
                <X size={20} />
              </DrawerClose>
            </div>

            <div className='space-y-3 overflow-y-auto px-4 pt-2 pb-4'>
              {/* Metal + Purity Combined Section */}
              <div>
                <p>
                  <strong className='font-medium'>Metal & Purity : </strong>
                  <span className='text-secondary-foreground'>
                    {metalPurity || 'Not Selected'}
                  </span>
                </p>
                <div className='xxs:grid-cols-3 mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4'>
                  {modifiedMetals.map((item) => {
                    const [purity, ...metalName] = item.label.split(' ');
                    const isSelected = metalPurity === item.label;

                    return (
                      <button
                        key={item.label}
                        onClick={() => setMetalPurity(item.label)}
                        className={`bg-secondary flex items-center gap-2 rounded-md border px-3 py-3 text-left transition ${
                          isSelected
                            ? 'border-black'
                            : 'border-transparent hover:border-black'
                        }`}
                      >
                        <div
                          className='h-4 w-4 shrink-0 rounded-full border border-gray-300'
                          style={{ backgroundColor: item.swatch }}
                        />
                        <div className='flex flex-col text-[11px] leading-tight'>
                          <span className='font-semibold'>{purity}</span>
                          <span className=''>{metalName.join(' ')}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ring Style Section */}
              <div>
                <p>
                  <strong className='font-medium'>Ring Style : </strong>
                  <span className='text-secondary-foreground'>Halo</span>
                </p>
                <div className='mt-2 grid grid-cols-5 gap-2 text-xs sm:grid-cols-8'>
                  {availableStyles &&
                    availableStyles.length > 0 &&
                    availableStyles.map((item, idx) => {
                      const isSelected = style === item.name;
                      return (
                        <button
                          key={idx}
                          onClick={() => setStyle(item.name)}
                          className={`bg-secondary flex h-full flex-col items-center rounded-md border px-2 pb-2 text-[10px] transition-all ${
                            isSelected
                              ? 'border-black'
                              : 'border-transparent hover:border-black'
                          }`}
                        >
                          <Image
                            src={baseApiUrl + item.image}
                            width={50}
                            height={25}
                            alt={item.name}
                            className='my-2 h-[25px] w-[50px] object-contain'
                          />
                          <p className='mt-2 text-center'>{item.name}</p>
                        </button>
                      );
                    })}
                </div>
              </div>
              {/* Diamond Shape Section */}
              {(isDiamondBased || isRing) && (
                <div>
                  <p>
                    <strong className='font-medium'>Diamond Shape : </strong>
                    <span className='text-secondary-foreground'>Round</span>
                  </p>
                  <div className='mt-2 grid grid-cols-5 gap-2 text-xs sm:grid-cols-8'>
                    {availableShapes &&
                      availableShapes.length > 0 &&
                      availableShapes.map((item, idx) => {
                        const isSelected =
                          shape.toLowerCase() ===
                          item.diamondShape.toLowerCase();
                        return (
                          <button
                            key={idx}
                            onClick={() => setShape(item.diamondShape)}
                            className={`bg-secondary flex flex-col items-center rounded-md border border-transparent px-1 pb-2 text-[10px] transition hover:border-black ${
                              isSelected
                                ? 'border-black'
                                : 'border-transparent hover:border-black'
                            }`}
                          >
                            <Image
                              src={baseApiUrl + item.diamondImage}
                              width={48}
                              height={48}
                              alt={item.diamondShape}
                              className='h-12 w-12'
                            />
                            {item.diamondShape}
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
        {/* desktop - unchanged */}
        <div className='hidden gap-4 lg:flex'>
          {showCommonFilters && (
            <Select value={metalPurity} onValueChange={setMetalPurity}>
              <SelectTrigger className='data-[placeholder]:text-foreground flex w-[200px] items-center justify-between rounded-md border-black px-3 py-2'>
                {metalPurity ? (
                  <div className='flex items-center gap-2 truncate'>
                    <div
                      className='h-3 w-3 shrink-0 rounded-full border border-gray-300'
                      style={{
                        backgroundColor: modifiedMetals.find(
                          (m) => m.label === metalPurity
                        )?.swatch
                      }}
                    />
                    <span className='text-sm font-semibold'>
                      {metalPurity.split(' ')[0]}
                    </span>
                    <span className='truncate text-sm'>
                      {metalPurity.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                ) : (
                  <span className='text-sm'>Select Metal & Purity</span>
                )}
              </SelectTrigger>
              <SelectContent className='w-[270px]'>
                <div className='grid grid-cols-2 gap-3 p-3'>
                  {modifiedMetals.map((item) => {
                    const [purity, ...metalName] = item.label.split(' ');
                    const metalLabel = metalName.join(' ');
                    return (
                      <SelectItem
                        key={item.label}
                        value={item.label}
                        className='flex items-center gap-3 rounded-lg border border-gray-200 px-2 py-2.5 transition hover:border-black focus:bg-gray-100'
                      >
                        <div
                          className='h-4 w-4 rounded-full border border-gray-300'
                          style={{ backgroundColor: item.swatch }}
                        />
                        <div className='flex flex-col leading-tight'>
                          <span className='text-sm font-semibold'>
                            {purity}
                          </span>
                          <span className='text-muted-foreground text-xs'>
                            {metalLabel}
                          </span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </div>
              </SelectContent>
            </Select>
          )}

          {showCommonFilters && (
            <Select value={sortByPrice} onValueChange={setSortByPrice}>
              <SelectTrigger className='data-[placeholder]:text-foreground w-[130px] border-black'>
                <SelectValue placeholder='Sort By Price' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='asc' className='py-2'>
                  Low to high
                </SelectItem>
                <SelectItem value='desc' className='py-2'>
                  High to low
                </SelectItem>
              </SelectContent>
            </Select>
          )}
          {/* {showRingStyle && (
            <Select value={style} onValueChange={setStyle}>
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
          )} */}
          {showDiamondShapes && (
            <Select value={shape} onValueChange={setShape}>
              <SelectTrigger className='data-[placeholder]:text-foreground w-[150px] border-black'>
                <SelectValue placeholder='Diamond Shape' />
              </SelectTrigger>
              <SelectContent>
                {availableShapes &&
                  availableShapes.map((shape) => (
                    <SelectItem value={shape.diamondShape} key={shape.id}>
                      <Image
                        src={baseApiUrl + shape.diamondImage}
                        width={26}
                        height={26}
                        alt='metal'
                      />
                      {shape.diamondShape}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
          <Button
            variant='outline'
            className='border-black font-normal'
            onClick={resetFilters}
          >
            <RotateCcw />
            Reset Filters
          </Button>
        </div>
      </div>
    </>
  );
}
