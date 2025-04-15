'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBagIcon, X } from 'lucide-react';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from './ui/drawer';
import ProductGallery from '@/features/product/components/product-gallery';
import { useRouter } from 'next/navigation';

const data = {
  category: 'ring',
  metals: [
    {
      metal: 'silver',
      name: 'Silver Ring Lorem Ipsum',
      images: [
        '/img/preview/ring1.png',
        '/img/preview/nacklace.png',
        '/img/preview/pendant.png'
      ],
      amount: 125,
      wrongAmount: 200
    },
    {
      metal: 'gold',
      name: 'Gold Item Lorem Ipsum',
      images: [
        '/img/preview/gold1.png',
        '/img/preview/gold2.png',
        '/img/preview/gold3.png'
      ],
      amount: 728,
      wrongAmount: 800
    },
    {
      metal: 'rose',
      name: 'Rose Gold Ipsum',
      images: [
        '/img/preview/rose1.png',
        '/img/preview/rose2.png',
        '/img/preview/rose3.png'
      ],
      amount: 600,
      wrongAmount: 650
    }
  ]
};

export default function PreviewCard3({ className }) {
  const [selectedMetal, setSelectedMetal] = useState(data.metals[0]);
  const [isProductClicked, setIsProductClicked] = useState(false);
  const [isClientMobile, setIsClientMobile] = useState(false);
  const [liked, setLiked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsClientMobile(window.innerWidth < 768);
    };

    handleResize(); // Run on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleProductClick = () => {
    if (isClientMobile) {
      setIsProductClicked(true);
    } else {
      router.push(`/products/productid`);
    }
  };
  const handleAddToCart = async () => {
    const res = await fetch('/api/check-auth', {
      method: 'GET',
      cache: 'no-store'
    });
    const data = await res.json();
    if (!data.authenticated) {
      return (window.location.href = '/sign-in');
    }
    return (window.location.href = '/checkout');
  };

  return (
    <>
      <Card
        className={cn(
          'group relative justify-between gap-0 overflow-hidden rounded-xl border-black/50 pt-0 pb-2 shadow transition-transform duration-300 hover:border-black hover:shadow-xl',
          className
        )}
      >
        {/* Wish Button */}
        <button
          onClick={() => setLiked(!liked)}
          className='hover:bg-primary/10 xs:w-7 xs:h-7 absolute top-1 right-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white'
        >
          <Heart
            className={cn(
              'xs:h-5 xs:w-5 h-4 w-4 transition-colors',
              liked ? 'fill-primary text-primary' : 'text-muted-foreground'
            )}
          />
        </button>
        <Carousel
          opts={{ align: 'start', loop: false }}
          className='relative w-full'
        >
          <CarouselContent className='ml-0 aspect-[1/1] w-full gap-0'>
            {selectedMetal.images.map((image, index) => (
              <CarouselItem
                key={index}
                onClick={handleProductClick}
                className='m-0 h-full w-full basis-full p-0'
              >
                <Image
                  src={image}
                  alt={selectedMetal.name}
                  width={300}
                  height={300}
                  className='h-full w-full object-contain object-center'
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Bottom-center navigation arrows, close together */}
          <div className='absolute bottom-3.25 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1'>
            <CarouselPrevious className='h-7 w-7 translate-x-4 rounded-full border-none bg-white/80 transition hover:bg-white' />
            <CarouselNext className='h-7 w-7 -translate-x-4 rounded-full border-none bg-white/80 transition hover:bg-white' />
          </div>
        </Carousel>

        <CardContent className='xs:px-2 w-full space-y-1 px-1 sm:space-y-2'>
          <div className='flex items-center justify-between border-t pt-2'>
            <div className='flex gap-1'>
              <p className='leading-1 font-medium sm:text-[22px] lg:text-xl'>
                ${selectedMetal.amount}
              </p>
              <span className='text-sm leading-1 font-normal text-[#958F86] line-through sm:text-lg'>
                ${selectedMetal.wrongAmount}
              </span>
            </div>
            <div className='flex gap-0.5'>
              {data.metals.map((metalOption) => {
                const isSelected = metalOption.metal === selectedMetal.metal;
                return (
                  <button
                    key={metalOption.metal}
                    onClick={() => setSelectedMetal(metalOption)}
                    className={cn(
                      'h-4.5 w-4.5 rounded-full border-2 border-white hover:outline hover:outline-offset-1 sm:h-5.25 sm:w-5.25 md:h-6 md:w-6',
                      isSelected ? 'ring-primary/40 ring-offset-0.5 ring' : ''
                    )}
                    style={{
                      backgroundImage: `url('/img/preview/${metalOption.metal}.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                );
              })}
            </div>
          </div>
          <p className='xs:text-base line-clamp-2 block min-h-[2.2em] text-left text-sm leading-4 font-light text-gray-900 sm:text-lg'>
            <button
              onClick={handleProductClick}
              className='block w-full text-left'
            >
              {selectedMetal.name}
            </button>
          </p>

          <Button
            className='xs:text-base xs:h-9 mt-auto h-8 w-full text-sm lg:h-10'
            onClick={handleAddToCart}
          >
            Add to Cart <ShoppingBagIcon size={20} />
          </Button>
        </CardContent>
      </Card>

      {isClientMobile && (
        <Drawer
          open={isProductClicked}
          onOpenChange={setIsProductClicked}
          className='!h-auto !max-h-[90vh] overflow-y-auto rounded-t-xl px-4 pt-10 pb-6'
        >
          <DrawerContent className='!max-h-[90vh]'>
            <DrawerHeader className='relative p-0'>
              <DrawerTitle className='wrapper absolute top-3 z-10 flex justify-between border-none'>
                <button
                  onClick={() => setLiked(!liked)}
                  className='group rounded-full transition-all hover:scale-110'
                  aria-label='Add to wishlist'
                >
                  <FaHeart
                    className={`h-6 w-7 transition-colors duration-300 ${
                      liked
                        ? 'fill-red-600 stroke-[20] text-white'
                        : 'fill-white stroke-[30] text-black'
                    }`}
                  />
                </button>
                <DrawerClose className='flex h-7 w-7 items-center justify-center rounded-full bg-[#D9D9D9] transition focus:scale-105'>
                  <X size={20} />
                </DrawerClose>
              </DrawerTitle>
              <ProductGallery />
            </DrawerHeader>
            <DrawerFooter>
              <div className=''>
                <div className='mb-1 flex justify-between text-lg font-medium'>
                  <div>
                    <p>Solitaire Engagement Ring</p>
                    <p>
                      <span>$22.00</span>{' '}
                      <span className='text-muted-foreground'>$82.00</span>
                    </p>
                  </div>
                  <Image
                    src='/icons/hand.svg'
                    alt='hand icon'
                    height={30}
                    width={30}
                  />
                </div>
                <div className='grid grid-cols-3 gap-3 text-sm'>
                  <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border border-transparent p-3 transition focus:border-black'>
                    <div className='flex flex-1 items-center justify-center'>
                      <Image
                        src={`/icons/shape-pear.svg`}
                        width={40}
                        height={40}
                        alt='diamond shape'
                        className=''
                      />
                    </div>
                    Pear
                  </button>
                  <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border border-transparent px-3 py-2 transition focus:border-black'>
                    <div className='flex flex-1 items-center justify-center'>
                      <Image
                        src={`/img/gold-theme.png`}
                        width={30}
                        height={30}
                        alt={'theme'}
                        className='h-[]'
                      />
                    </div>
                    Gold
                  </button>
                  <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border border-transparent px-3 py-2 transition focus:border-black'>
                    <div className='flex flex-1 items-center justify-center'>
                      <Image
                        src={`/icons/ring-style-solitare.svg`}
                        width={50}
                        height={40}
                        alt={'Shank style'}
                        className=''
                      />
                    </div>
                    Solitaire
                  </button>
                </div>
                <div className='mt-4 mb-1 flex items-stretch gap-3'>
                  <Link
                    href='/products/productid'
                    onClick={() => setIsProductClicked(true)}
                    className='relative inline-block h-[40px] overflow-hidden rounded-md border border-black bg-white px-4 py-2 text-base text-black transition-colors duration-400'
                  >
                    More info
                  </Link>
                  <Button
                    size='lg'
                    className='flex-1 border border-black'
                    onClick={handleAddToCart}
                  >
                    Add to Cart <ShoppingBagIcon size={20} />
                  </Button>
                </div>
                <p className='text-center text-xs'>
                  Installments starting at ₹5,000 per month.{' '}
                  <Link href='#' className='font-medium underline'>
                    Prequalify now
                  </Link>
                </p>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
