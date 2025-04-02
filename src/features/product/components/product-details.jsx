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
import { Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { TbVideoPlus } from 'react-icons/tb';

export default function ProductDetails({ className }) {
  const [selectedSize, setSelectedSize] = useState();
  const [selectedMetal, setSelectedMetal] = useState('14K');
  const [selectedShape, setSelectedShape] = useState('Round');

  const diamondShapes = ['Round', 'Pear', 'Emerald', 'Princess'];
  const metalPurities = ['14K', '18K', '22K'];
  const ringSizes = Array.from({ length: 15 }, (_, i) => (i + 3).toString());
  return (
    <section className={cn(className)}>
      {/* Sale Badge */}
      <span className='mb-2 inline-block rounded-full bg-black px-4 py-1.5 text-sm text-white'>
        SALE 20%
      </span>

      {/* Product Title */}
      <h1 className='mb-2 text-xl leading-6 font-medium sm:text-2xl sm:leading-8 md:text-3xl lg:text-4xl'>
        Solitaire Engagement Ring Embellished With a Falling Edge Pave Halo Head
      </h1>

      {/* Reviews */}
      <div className='my-2 flex items-center justify-between md:my-4'>
        <div className='flex'>
          {[...Array(5)].map((_, i) => (
            <Star key={i} className='h-3 w-3 fill-yellow-400 text-yellow-400' />
          ))}
        </div>
        <span className='ml-1 text-sm'>24 Reviews</span>
        <span className='mx-1'>|</span>
        <span className='text-sm'>SKU : KD-566498</span>
        <Badge variant='outline' className='ml-2 rounded-full border-black'>
          IN STOCK
        </Badge>
      </div>

      {/* Pricing */}
      <div className='mb-6'>
        <span className='text-xl font-bold text-gray-900'>$ 40,000</span>
        <span className='text-muted-foreground ml-2 line-through'>
          $ 48,000
        </span>
      </div>

      {/* Product Description */}
      <p className='mb-6 text-gray-700'>
        A halo diamond ring is a classic and sophisticated choice, renowned for
        its dazzling design and ability to elevate the brilliance of the center
        stone. This style has become a favorite for engagement rings and
        statement jewelry due to its captivating charm and versatility.
      </p>

      {/* See It Live Section */}
      <div className='bg-secondary mb-6 flex gap-6 rounded-lg p-4'>
        <Image
          src='/img/live-consultation.png'
          height={200}
          width={160}
          alt='Live Consultant object-cover'
        />
        <div className='flex-1'>
          <h3 className='text-lg font-medium md:text-xl'>
            See it before you Buy it
          </h3>
          <p className='text-muted-foreground mb-3 text-lg font-light'>
            Join live video call with our consultants to see the designs up
            close
          </p>
          <Button
            variant='outline'
            className='rounded-full bg-black text-white'
          >
            See it Live <TbVideoPlus />
          </Button>
        </div>
      </div>

      {/* Installment Option */}
      <div className='mb-6'>
        <h3 className='mb-2 text-lg font-medium'>
          Buy Jewelry on Interest Free Installment
        </h3>
        <p className='mb-2 text-gray-700'>
          Installments starting at ¥5,000 per month
        </p>
        <Button variant='link' className='h-auto p-0 text-blue-600'>
          Prequalify now
        </Button>
        <p className='mt-1 text-sm text-gray-600'>
          Earn 5% cashback on this purchase.{' '}
          <Button variant='link' className='h-auto p-0 text-sm text-blue-600'>
            Learn more
          </Button>
        </p>
      </div>

      {/* Product Options */}
      <div className='space-y-6'>
        {/* Ring Size */}
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Select Ring Size
          </label>
          <Select onValueChange={setSelectedSize}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select your ring size' />
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
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Metal Type
          </label>
          <div className='flex gap-2'>
            {metalPurities.map((purity) => (
              <Button
                key={purity}
                variant={selectedMetal === purity ? 'default' : 'outline'}
                onClick={() => setSelectedMetal(purity)}
                className='flex-1'
              >
                {purity}
              </Button>
            ))}
          </div>
        </div>

        {/* Diamond Shape */}
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Diamond Shape
          </label>
          <div className='grid grid-cols-2 gap-2'>
            {diamondShapes.map((shape) => (
              <Button
                key={shape}
                variant={selectedShape === shape ? 'default' : 'outline'}
                onClick={() => setSelectedShape(shape)}
              >
                {shape}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Add to Cart */}
      <Button className='mt-8 w-full py-6 text-lg'>Add to Cart</Button>

      {/* Product Details Accordion */}
      <Accordion type='single' collapsible className='mt-8 w-full'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Product Details</AccordionTrigger>
          <AccordionContent>
            <div className='space-y-2'>
              <p>
                <strong>Material:</strong> 14K White Gold
              </p>
              <p>
                <strong>Center Stone:</strong> 1.00ct Round Brilliant Diamond
              </p>
              <p>
                <strong>Halo Diamonds:</strong> 0.25ct total weight
              </p>
              <p>
                <strong>Setting:</strong> Pave-set micro diamonds
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Shipping & Returns</AccordionTrigger>
          <AccordionContent>
            Free shipping on all orders. 30-day return policy.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
