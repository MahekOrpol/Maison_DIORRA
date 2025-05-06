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
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from './ui/drawer';
import ProductGallery, {
  MobileGallery
} from '@/app/(storefront)/products/[category]/components/product-gallery';
import { useRouter } from 'next/navigation';

export default function PreviewCard({
  product,
  className,
  isDraggable = true
}) {
  const [selectedMetal, setSelectedMetal] = useState(product?.variants?.[0]);
  const [isProductClicked, setIsProductClicked] = useState(false);
  const [isClientMobile, setIsClientMobile] = useState(false);
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  // Fix: Reset metal when product changes
  useEffect(() => {
    setSelectedMetal(product?.variants?.[0]);
  }, [product]);

  useEffect(() => {
    const handleResize = () => {
      setIsClientMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleProductClick = () => {
    if (isClientMobile) {
      setIsProductClicked(true);
    } else {
      router.push(
        `/products/${product.category}/${product?.subcategory ? product.subcategory : 'all'}/${product.id}`
      );
    }
  };

  const handleAddToCart = async () => {
    const res = await fetch('/api/check-auth', {
      method: 'GET',
      cache: 'no-store'
    });
    const data = await res.json();
    if (!data.authenticated) {
      return (window.location.href = '/checkout');
    }
    return (window.location.href = '/checkout');
  };

  if (!product || !selectedMetal) return null;

  return (
    <>
      <Card
        className={cn(
          'group relative justify-between gap-0 overflow-hidden rounded-xl border border-gray-200 pt-0 pb-2 shadow transition-transform duration-300 hover:shadow-xl lg:border-2',
          className
        )}
      >
        {/* Wishlist Button */}
        <button
          onClick={() => setLiked(!liked)}
          className='hover:bg-primary/4 absolute top-1 right-1 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow shadow-gray-400 xl:top-2 xl:right-2'
        >
          <Heart
            className={cn(
              'xs:h-5 xs:w-5 h-4 w-4 transition-colors',
              liked ? 'fill-primary text-primary' : 'text-black'
            )}
          />
        </button>
        <Carousel
          key={selectedMetal.metalType}
          opts={{
            align: 'start',
            loop: false,
            watchDrag: isDraggable
          }}
          className='relative w-full'
        >
          <CarouselContent className='ml-0 aspect-[1/1] w-full gap-0'>
            {selectedMetal.media.map((image, index) => (
              <CarouselItem
                key={index}
                onClick={handleProductClick}
                className='h-full w-full basis-full cursor-pointer pl-[0.5px]'
              >
                <Image
                  src={image.mediaUrl}
                  alt={selectedMetal.metalType}
                  width={300}
                  height={300}
                  className='h-full w-full object-cover object-center'
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='3xl:-bottom-[-4.9%] absolute bottom-3.25 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 2xl:bottom-4'>
            <CarouselPrevious className='h-7 w-7 translate-x-4 rounded-full border-none bg-white/80 text-gray-600 transition hover:bg-white 2xl:h-8 2xl:w-8 2xl:translate-x-1' />
            <CarouselNext className='h-7 w-7 -translate-x-4 rounded-full border-none bg-white/80 text-gray-600 transition hover:bg-white 2xl:h-8 2xl:w-8' />
          </div>
        </Carousel>
        <CardContent className='xs:px-2 w-full space-y-1 px-1 sm:space-y-2 xl:px-4 xl:pb-2'>
          <div className='flex items-center justify-between border-t pt-2 xl:pt-5'>
            <div className='flex gap-1 sm:gap-2'>
              <p className='3xl:text-2xl leading-1 font-medium sm:text-[22px] lg:text-xl'>
                ${selectedMetal.price}
              </p>
              <span className='text-xs leading-1 font-normal text-[#958F86] line-through sm:text-base xl:text-lg'>
                ${selectedMetal.originalPrice}
              </span>
            </div>
            <div className='flex gap-0.5'>
              {product.variants.map((variant) => {
                const isSelected =
                  variant.metalType === selectedMetal.metalType;
                return (
                  <button
                    key={variant.metalType}
                    onClick={() => setSelectedMetal(variant)}
                    className={cn(
                      'h-4.5 w-4.5 rounded-full border-2 border-white hover:outline hover:outline-offset-1 sm:h-5.25 sm:w-5.25 md:h-6 md:w-6',
                      isSelected ? 'ring-primary/40 ring-offset-0.5 ring' : ''
                    )}
                    style={{
                      backgroundImage: `url('/img/preview/${variant.metalType}.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                );
              })}
            </div>
          </div>
          <p className='xs:text-base 3xl:text-xl mb-2 block text-left text-sm font-light text-gray-900 sm:text-lg xl:font-normal'>
            <button
              onClick={handleProductClick}
              className='!line-clamp-1 block w-full text-left'
            >
              {product.name}
            </button>
          </p>
          <Button
            className='xs:text-base xs:h-9 3xl:h-12 3xl:text-xl mt-auto h-8 w-full text-sm lg:h-10'
            onClick={handleAddToCart}
          >
            Add to Cart{' '}
            <ShoppingBagIcon size={20} className='ml-2 stroke-1 xl:size-6' />
          </Button>
        </CardContent>
      </Card>

      {/* Mobile Drawer */}
      {/* {isClientMobile && (
        <Drawer
          open={isProductClicked}
          onOpenChange={setIsProductClicked}
          className='overflow-y-auto rounded-t-xl px-4 pb-1'
        >
          <DrawerContent className=''>
            <DrawerHeader className='relative p-0'>
              <DrawerTitle className='wrapper absolute top-3 z-10 flex justify-between border-none'>
                <button
                  onClick={() => setLiked(!liked)}
                  className='group rounded-full transition-all hover:scale-110'
                  aria-label='Add to wishlist'
                >
                  <FaHeart
                    className={`h-5 w-6 transition-colors duration-300 ${liked
                        ? 'fill-primary stroke-[20] text-white'
                        : 'fill-white stroke-[30] text-black'
                      }`}
                  />
                </button>
                <DrawerClose className='flex h-7 w-7 items-center justify-center rounded-full bg-[#D9D9D9] transition focus:scale-105'>
                  <X size={20} />
                </DrawerClose>
              </DrawerTitle>
              <MobileGallery />
            </DrawerHeader>

            <DrawerFooter className='pt-2'>
              <div className=''>
                <div className='mb-1 flex justify-between text-lg font-medium'>
                  <div>
                    <p>{selectedMetal.name}</p>
                    <p>
                      <span className=''>${selectedMetal.amount}</span>{' '}
                      <span className='text-muted-foreground pl-2 text-sm line-through'>
                        ${selectedMetal.wrongAmount}
                      </span>
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
                  <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border border-transparent px-3 pt-4 pb-2 transition focus:border-black'>
                    <Image
                      src={`/icons/shape-pear.svg`}
                      width={40}
                      height={40}
                      alt='diamond shape'
                    />
                    Pear
                  </button>
                  <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border border-transparent px-3 pt-4 pb-2 transition focus:border-black'>
                    <Image
                      src={`/img/gold-theme.png`}
                      width={30}
                      height={30}
                      alt='theme'
                    />
                    Gold
                  </button>
                  <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border border-transparent px-3 pt-4 pb-2 transition focus:border-black'>
                    <Image
                      src={`/icons/ring-style-solitare.svg`}
                      width={50}
                      height={40}
                      alt='shank style'
                    />
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
      )} */}
    </>
  );
}
