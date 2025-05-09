'use client';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Heart, Share2, ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { TbVideoPlus } from 'react-icons/tb';
import { GiBigDiamondRing } from 'react-icons/gi';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function DiamondDetails({ className }) {
  const [selectedSize, setSelectedSize] = useState();
  const [selectedMetal, setSelectedMetal] = useState('rose');
  const [selectedShape, setSelectedShape] = useState('Round');
  const [selectedPurity, setSelectedPurity] = useState('22K');
  const [selectedShank, setSelectedShank] = useState('Solitare');

  const router = useRouter();

  const metalTypes = [
    { name: 'rose', url: '/img/rose-theme.png' },
    { name: 'gold', url: '/img/gold-theme.png' },
    { name: 'white', url: '/img/white-theme.png' }
  ];
  const diamondShapes = ['Round', 'Pear', 'Emerald', 'Princess'];
  const metalPurities = ['14K', '18K', '22K'];
  const ringSizes = Array.from({ length: 10 }, (_, i) => (i + 3).toString());
  const shapes = [
    { name: 'Round', imgUrl: '/icons/shape-round.svg' },
    { name: 'Pear', imgUrl: '/icons/shape-pear.svg' },
    { name: 'Emerald', imgUrl: '/icons/shape-emerlad.svg' },
    { name: 'Princess', imgUrl: '/icons/shape-princess.svg' }
  ];
  const shanks = [
    { name: 'Solitare', imgUrl: '/img/shapes/shank1.png' },
    { name: 'French Pave', imgUrl: '/img/shapes/shank2.png' }
  ];
  const icons = [
    { src: '/icons/badge.svg', label: 'Lifetime Warranty' },
    { src: '/icons/dollar-inhand.svg', label: '30 Days Free Return' },
    { src: '/icons/certificate.svg', label: 'Certificate & Appraisal' }
  ];
  const characteristics = [
    { propety: 'Carat', value: '0.5' },
    { propety: 'Color', value: 'I' },
    { propety: 'Clarity', value: 'IF' },
    { propety: 'Ratio', value: '1.4' },
    { propety: 'L/W (mm)', value: '5.23/3.73' }
  ];

  const handleAddToCart = async () => {
    const res = await fetch('/api/check-auth', {
      method: 'GET',
      cache: 'no-store'
    });
    const data = await res.json();
    if (!data.authenticated) {
      return (window.location.href = '/login');
    }
    return (window.location.href = '/checkout');
  };
  const handleAddToWishlist = async () => {
    const res = await fetch('/api/check-auth', {
      method: 'GET',
      cache: 'no-store'
    });
    const data = await res.json();
    if (!data.authenticated) {
      return (window.location.href = '/login');
    }
    return (window.location.href = '/account/wishlist');
  };
  return (
    <section className={cn(className)}>
      <div>
        {/* Product Title */}
        <h1 className='mb-2 text-lg xs:text-xl leading-6 font-medium sm:text-2xl sm:leading-8 md:text-3xl md:leading-10'>
          0.5 Carat I IF Emerald Natural Diamond <br /> $ 420
        </h1>
        <div className='bg-secondary grid grid-cols-5 py-2'>
          {/* MAP DETAILS HERE */}
          {characteristics.map((item, i) => (
            <div
              key={i}
              className='border-black text-center text-xs not-last:border-r xl:text-xl font-medium'
            >
              <p>{item.value}</p>
              <p className='text-muted-foreground text-sm xl:text-base'>{item.propety}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Installment Option */}
      <div className='xs:text-sm mb-6 border-b py-4 text-xs md:text-sm pt-4'>
        <h3 className='mb-2 text-lg font-medium underline underline-offset-3 md:mb-4 md:text-xl xl:text-2xl md:underline-offset-10'>
          Buy Jewelry on Interest Free Installment
        </h3>
        <p className='mt-1 text-sm xl:text-base'>
          Installments starting at ₹5,000 per month
          <Link
            href='#'
            className='h-auto p-0 ps-2 font-semibold text-black underline underline-offset-3 transition-all duration-300 hover:no-underline'
          >
            Prequalify now
          </Link>
        </p>

        <p className='mt-1 text-base'>
          Earn 5% cashback on this purchase.{' '}
          <Link
            href='#'
            className='h-auto p-0 ps-2 font-semibold text-black underline underline-offset-3 transition-all duration-300 hover:no-underline'
          >
            Learn more
          </Link>
        </p>
      </div>{' '}
      <div className=''>
        {/* See It Live Section */}
        <div className='bg-secondary mb-6 flex items-center gap-2 rounded-lg p-1 sm:gap-6 sm:p-4 md:items-start'>
          <Image
            src='/img/live-consultation.png'
            alt='Live Consultant'
            width={120}
            height={80}
            className='h-[80px] w-[120px] rounded-sm md:h-[120px] md:w-[180px]'
          />
          <div className='flex-1'>
          <h3 className='text-base font-medium xl:text-2xl'>
              See it before you Buy it
            </h3>
            <p className='mb-2 text-sm font-light sm:mb-3 md:text-sm xl:text-lg'>
              Join live video call with our consultants to see the designs up
              close
            </p>
            <Button className='h-[30px] w-[130px] rounded-full text-xs md:h-auto md:text-sm'>
              See it Live <TbVideoPlus />
            </Button>
          </div>
          <hr />
        </div>
        <div className='xs:gap-2 mb-4 flex w-full items-center gap-1 md:w-1/2 lg:w-full'>
          <Button
            className='h-10 flex-1 gap-4 rounded-lg text-base lg:h-12 lg:text-lg'
            onClick={handleAddToCart}
          >
            Complete Your Ring
          </Button>

          {/* Add to Wishlist */}
          <button
            onClick={handleAddToWishlist}
            className='hover:bg-muted flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white transition md:h-10 md:w-10'
          >
            <Heart className='h-4 w-4 md:h-5 md:w-5' strokeWidth={1.6} />
          </button>

          {/* Share */}
          <button
            onClick={handleAddToWishlist}
            className='hover:bg-muted flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white transition md:h-10 md:w-10'
          >
            <Share2 className='h-4 w-4 md:h-5 md:w-5' strokeWidth={1.6} />
          </button>
        </div>
      </div>
      <div className='bg-secondary grid grid-cols-3 rounded-md p-2 text-sm sm:p-4 md:gap-4 md:text-lg'>
        {icons.map((icon) => (
          <div
            key={icon.label}
            className='flex flex-col items-center justify-center gap-2 border-black px-2 not-last:border-r'
          >
            <Image
              src={icon.src}
              width={40}
              height={40}
              alt={icon.label}
              className='h-[60px]'
            />
            <p className='w-full text-center leading-4 md:leading-6 xl:w-2/3'>
              {icon.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
