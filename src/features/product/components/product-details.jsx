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
import { Heart, Share2, ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { TbVideoPlus } from 'react-icons/tb';
import { GiBigDiamondRing } from 'react-icons/gi';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';

export default function ProductDetails({ className }) {
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
  const handleAddToWishlist = async () => {
    const res = await fetch('/api/check-auth', {
      method: 'GET',
      cache: 'no-store'
    });
    const data = await res.json();
    if (!data.authenticated) {
      return (window.location.href = '/sign-in');
    }
    return (window.location.href = '/account/wishlist');
  };
  return (
    <section className={cn(className)}>
      <div>
        {/* Sale Badge */}
        <span className='mb-2 inline-block rounded-full bg-black px-4 py-1.5 text-sm text-white'>
          SALE 20%
        </span>

        {/* Product Title */}
        <div className='flex items-center gap-4'>
          <h1 className='mb-2 flex-1 text-xl leading-6 font-medium sm:text-2xl sm:leading-8 md:text-3xl md:leading-10'>
            Solitaire Engagement Ring Embellished With a Falling Edge Pave Halo
            Head
          </h1>
          <GiBigDiamondRing className='h-12 w-12' />
        </div>

        {/* Reviews */}
        <div className='xs:text-sm xs:justify-start my-2 flex items-center justify-between gap-4 text-xs md:my-3'>
          <span className='flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2'>
            <span className='flex'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className='h-3 w-3 fill-yellow-400 text-yellow-400'
                />
              ))}
            </span>
            <span className='ml-1 md:text-base'>24 Reviews</span>
          </span>
          <span className='text-sm md:text-base'>SKU : KD-566498</span>
          <Badge variant='outline' className='ml-2 rounded-full border-black'>
            IN STOCK
          </Badge>
        </div>

        {/* Pricing */}
        <div className='mb-3 md:mb-4'>
          <span className='text-xl font-semibold text-gray-900 lg:text-3xl'>
            $ 40,000
          </span>
          <span className='text-muted-foreground ml-2 line-through'>
            $ 48,000
          </span>
        </div>

        {/* Product Description */}
        <p className='mb-3 text-justify text-xs text-gray-700 md:mb-6 md:text-sm'>
          A halo diamond ring is a classic and sophisticated choice, renowned
          for its dazzling design and ability to elevate the brilliance of the
          center stone. This style has become a favorite for engagement rings
          and statement jewelry due to its captivating charm and versatility.
        </p>
      </div>

      {/* Installment Option */}
      <div className='xs:text-sm mb-6 border-b py-4 text-xs md:text-sm'>
        <h3 className='mb-2 text-lg font-medium underline underline-offset-3 md:mb-4 md:text-2xl md:underline-offset-10'>
          Buy Jewelry on Interest Free Installment
        </h3>
        <p className='mt-1'>
          Installments starting at ₹5,000 per month
          <Link
            href='#'
            className='h-auto p-0 ps-2 font-semibold text-black underline underline-offset-3 transition-all duration-300 hover:no-underline'
          >
            Prequalify now
          </Link>
        </p>

        <p className='mt-1'>
          Earn 5% cashback on this purchase.{' '}
          <Link
            href='#'
            className='h-auto p-0 ps-2 font-semibold text-black underline underline-offset-3 transition-all duration-300 hover:no-underline'
          >
            Learn more
          </Link>
        </p>
      </div>

      {/* Product Options */}
      <div className='space-y-6'>
        {/* Ring Size */}
        <div>
          <Select onValueChange={setSelectedSize}>
            <SelectTrigger className='bg-secondary md:tex-lg data-[placeholder]:text-foreground w-[200px] font-medium'>
              <SelectValue placeholder='Select Ring Size' />
            </SelectTrigger>
            <SelectContent>
              {ringSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  Size {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Metal Type */}
        <div className='flex items-center'>
          <label className='inline-block w-[140px] text-lg font-medium'>
            Metal Type :
          </label>
          <div className='inline-flex items-center gap-2'>
            {metalTypes.map((metal) => (
              <button
                key={metal.name}
                type='button'
                onClick={() => setSelectedMetal(metal.name)}
                className={cn(
                  'inline-flex items-center justify-center rounded-full border p-[2px] transition-all', // Base styles
                  selectedMetal === metal.name
                    ? 'border-gray-400'
                    : 'border-transparent' // Hide border when not selected
                )}
              >
                <Image
                  src={metal.url}
                  alt={metal.name}
                  width={20}
                  height={20}
                  className='h-[20px] w-[20px]'
                />
              </button>
            ))}
          </div>
        </div>

        {/* Metal purity */}
        <div className='flex items-center'>
          <label className='inline-block w-[140px] text-lg font-medium'>
            Metal Purity :
          </label>
          <div className='flex gap-2'>
            {metalPurities.map((purity) => (
              <button
                key={purity}
                onClick={() => setSelectedPurity(purity)}
                className={cn(
                  selectedPurity === purity ? 'border-black' : '',
                  'rounded-sm border px-4 py-1 text-base'
                )}
              >
                {purity}
              </button>
            ))}
          </div>
        </div>
        <hr />
      </div>
      {/* Diamond Shape */}
      <div className='border-b pt-2 pb-4'>
        <p className='text-lg font-medium'> Diamond Shape</p>
        <div className='mt-2 flex gap-2 text-[0.8rem]'>
          {shapes.map((shape) => (
            <button
              key={shape.name}
              className={cn(
                'bg-secondary flex aspect-square w-[80px] flex-col items-center justify-center rounded-md border border-transparent transition',
                selectedShape === shape.name ? 'border-black' : ''
              )}
              onClick={() => setSelectedShape(shape.name)}
            >
              <Image
                src={shape.imgUrl}
                width={60}
                height={60}
                alt={shape.name}
                className='h-3/4 w-3/4 object-contain'
              />
              <span className='mt-1'>{shape.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Shank */}
      <div className='pt-2 pb-6'>
        <p className='text-lg font-medium'>Shank</p>
        <div className='flex gap-2 text-[0.8rem]'>
          {shanks.map((shank) => (
            <button
              key={shank.name}
              className={cn(
                'bg-secondary flex aspect-square w-[80px] flex-col items-center justify-center rounded-md border border-transparent transition',
                selectedShank === shank.name ? 'border-black' : ''
              )}
              onClick={() => setSelectedShank(shank.name)}
            >
              <Image
                src={shank.imgUrl}
                width={30}
                height={30}
                alt={shank.name}
                className='h-[30px] w-[30px] object-contain'
              />
              <span className='mt-1'>{shank.name}</span>
            </button>
          ))}
        </div>
      </div>

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
            <h3 className='text-sm font-medium md:text-xl'>
              See it before you Buy it
            </h3>
            <p className='mb-2 text-xs font-light sm:mb-3 md:text-sm'>
              Join live video call with our consultants to see the designs up
              close
            </p>
            <Button className='h-[30px] w-[130px] rounded-full text-xs md:h-auto md:text-sm'>
              See it Live <TbVideoPlus />
            </Button>
          </div>
          <hr />
        </div>
        <div className='mb-6 flex flex-col gap-3 sm:items-center md:flex-row lg:flex-col'>
          {/* Add to Cart */}
          <div className='grid w-full grid-cols-2 gap-2 md:w-1/2 lg:w-full'>
            <Button
              variant='outline'
              className='h-10 border border-black text-base lg:h-11 lg:text-lg'
              onClick={handleAddToCart}
            >
              Add to Cart <ShoppingBag className='ml-2 h-7 w-7' />
            </Button>
            <Button
              className='h-10 text-base lg:h-11 lg:text-lg'
              onClick={handleAddToCart}
            >
              Buy Now
            </Button>
          </div>
          <div className='xs:gap-2 flex w-full items-center gap-1 md:w-1/2 lg:w-full'>
            <button
              className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 flex-1 items-center justify-center rounded-md px-3 text-base text-nowrap lg:h-11 lg:text-lg'
              onClick={handleAddToCart}
            >
              Order on Whatsapp <FaWhatsapp className='ml-1 h-6 w-6' />
            </button>

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
