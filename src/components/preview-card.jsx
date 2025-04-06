'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBagIcon } from 'lucide-react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn, isMobile } from '@/lib/utils';
import Link from 'next/link';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from './ui/drawer';
import ProductGallery from '@/features/product/components/product-gallery';

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

export default function PreviewCard({ className }) {
  const [selectedMetal, setSelectedMetal] = useState(data.metals[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Card
        className={cn(
          'group/card relative w-auto max-w-[370px] gap-0 rounded-lg bg-white p-0 shadow-lg transition-transform duration-300 hover:border hover:border-black/40',
          !isMobile() && 'hover:scale-[1.03]',
          className
        )}
      >
        <Button
          variant='favourite button'
          className='absolute top-[2%] right-[2%] z-20 flex h-6 w-6 items-center justify-center rounded-full border text-black hover:bg-gray-100 sm:top-4 sm:right-4 sm:h-8 sm:w-8'
        >
          <Heart className='h-4 w-4 md:h-5 md:w-5' />
        </Button>
        <Carousel opts={{ align: 'start', loop: false }}>
          <CarouselContent className='pt-1'>
            {selectedMetal.images.map((image, index) => (
              <CarouselItem
                key={index}
                onClick={() => {
                  if (isMobile()) setDrawerOpen(true);
                }}
              >
                <Image
                  src={image}
                  alt={selectedMetal.name}
                  width={300}
                  height={300}
                  className='mx-auto h-32 max-w-full object-contain sm:h-[250px]'
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute bottom-0 left-1/2 h-5 w-5 -translate-x-6 translate-y-[55px] transform bg-[#EAEAEA] sm:translate-y-[112px] md:h-6 md:w-6' />
          <CarouselNext className='absolute right-1/2 h-5 w-5 translate-x-8 translate-y-[55px] transform bg-[#EAEAEA] sm:translate-y-[112px] md:h-6 md:w-6' />
        </Carousel>
        <CardContent className='xs:px-4 px-2'>
          <div className='mb-3 flex justify-center gap-2 sm:order-last'>
            <div className='mt-2 flex w-full flex-col justify-between border-t pt-2 sm:flex-row sm:items-center md:justify-between'>
              <div className='mb-3 flex justify-center gap-2 sm:order-last sm:mb-0'>
                {data.metals.map((metalOption) => (
                  <button
                    key={metalOption.metal}
                    className='h-[22px] w-[22px] rounded-full border-2 border-white hover:outline hover:outline-offset-1 md:h-6 md:w-6'
                    style={{
                      backgroundImage: `url('/img/preview/${metalOption.metal}.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    onClick={() => setSelectedMetal(metalOption)}
                  />
                ))}
              </div>
              <div className='flex items-baseline gap-2'>
                <p className='text-lg leading-1 font-semibold sm:text-[22px]'>
                  ${selectedMetal.amount}
                </p>
                <span className='text-base leading-1 font-normal text-[#958F86] line-through sm:text-lg'>
                  ${selectedMetal.wrongAmount}
                </span>
              </div>
            </div>
          </div>

          <p className='my-3 block text-left text-base leading-5 text-gray-900 md:text-lg lg:text-xl'>
            {selectedMetal.name}
          </p>
          <div className='flex gap-3'>
            <div className='group hidden lg:inline-block'>
              <Link
                href='/products/products'
                onClick={() => setDrawerOpen(true)}
                className='relative inline-block h-[42px] overflow-hidden rounded-md border border-black bg-white px-4 py-2 text-base text-black transition-colors duration-400'
              >
                <span className='relative z-10 transition-colors duration-400 group-hover:text-black'>
                  More info
                </span>
                <span className='bg-secondary absolute bottom-[-100%] left-[-100%] z-0 h-[300%] w-[300%] rotate-45 transition-transform duration-400 ease-[cubic-bezier(0.3,1,0.8,1)] group-hover:translate-x-[100%] group-hover:translate-y-[-100%]'></span>
              </Link>
            </div>

            <Button className='mb-3 flex h-[36px] flex-1 items-center justify-center gap-2 bg-black text-sm font-medium text-white transition hover:bg-black/80 md:h-[42px] md:text-base'>
              Add to Bag <ShoppingBagIcon size='20' />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className='flex justify-between'>
              {selectedMetal.name}
              <Button onClick={() => setDrawerOpen(false)}>Close</Button>
            </DrawerTitle>
            <DrawerDescription>
              <ProductGallery />
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className='flex gap-3'>
              <div className='group'>
                <Link
                  href='/products/productid'
                  onClick={() => setDrawerOpen(true)}
                  className='relative inline-block h-[42px] overflow-hidden rounded-md border border-black bg-white px-4 py-2 text-base text-black transition-colors duration-400'
                >
                  <span className='relative z-10 transition-colors duration-400 group-hover:text-black'>
                    More info
                  </span>
                  <span className='bg-secondary absolute bottom-[-100%] left-[-100%] z-0 h-[300%] w-[300%] rotate-45 transition-transform duration-400 ease-[cubic-bezier(0.3,1,0.8,1)] group-hover:translate-x-[100%] group-hover:translate-y-[-100%]'></span>
                </Link>
              </div>

              <Button className='mb-3 flex h-[36px] flex-1 items-center justify-center gap-2 bg-black text-sm font-medium text-white transition hover:bg-black/80 md:h-[42px] md:text-base'>
                Add to Bag <ShoppingBagIcon size='20' />
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
