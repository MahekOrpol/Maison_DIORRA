'use client';
import Image from 'next/image';
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function DiamondFilters() {
  const colors = ['J', 'I', 'H', 'G', 'F', 'E', 'D'];
  const clarities = ['S1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL'];
  const [priceRange, setPriceRange] = React.useState([20, 400]);
  const [caratRange, setCaratRange] = React.useState([1, 8]);
  return (
    <div className='mb-6'>
      <h2 className='text-center text-xl font-medium md:text-3xl'>
        Select your Stone Shape and Quality
      </h2>
      {/* shape */}
      <div className='my-4 flex justify-center gap-4'>
        <button className='w-[80px] rounded-lg border border-transparent hover:border-black'>
          <div className='flex items-center justify-center'>
            <Image
              src='/icons/shape-round.svg'
              height={60}
              width={60}
              alt='Icon'
              className=''
            />
          </div>
          Round
        </button>
        <button className='w-[80px] rounded-lg border border-transparent hover:border-black'>
          <div className='flex items-center justify-center'>
            <Image
              src='/icons/shape-pear.svg'
              height={60}
              width={60}
              alt='Icon'
              className=''
            />
          </div>
          Pear
        </button>
        <button className='w-[80px] rounded-lg border border-transparent hover:border-black'>
          <div className='flex items-center justify-center'>
            <Image
              src='/icons/shape-emerlad.svg'
              height={60}
              width={60}
              alt='Icon'
              className=''
            />
          </div>
          Emerlad
        </button>
        <button className='w-[80px] rounded-lg border border-transparent hover:border-black'>
          <div className='flex items-center justify-center'>
            <Image
              src='/icons/shape-princess.svg'
              height={60}
              width={60}
              alt='Icon'
              className=''
            />
          </div>
          Princess
        </button>
      </div>
      {/* quality */}

      <div className='w-full space-y-6 p-4'>
        <div className='grid grid-cols-1 place-items-center md:grid-cols-3'>
          {/* Color Filter */}
          <div>
            <h3 className='font-medium'>Color</h3>
            <div className='inline-flex rounded-md border border-black'>
              {colors.map((color) => (
                <button
                  key={color}
                  className='inline-flex h-10 w-12 items-center justify-center border-r border-l border-l-transparent hover:border-l hover:border-black'
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Clarity Filter */}
          <div>
            <h3 className='font-medium'>Clarity</h3>
            <div className='inline-flex rounded-md border border-black'>
              {clarities.map((clarity) => (
                <button
                  key={clarity}
                  className='inline-flex h-10 w-12 items-center justify-center border-r border-l border-l-transparent hover:border-l hover:border-black'
                >
                  {clarity}
                </button>
              ))}
            </div>
          </div>

          {/* Carat Filter */}
          <div className='w-full'>
            <h3 className='mb-2 text-sm font-medium'>Carat</h3>
            <Slider
              defaultValue={[1, 8]}
              min={1}
              max={8}
              step={0.1}
              onValueChange={(value) => setCaratRange(value)}
              className='my-4'
            />
            <div className='flex justify-between text-sm text-gray-500'>
              <span>{caratRange[0]} ct</span>
              <span>{caratRange[1]} ct</span>
            </div>
          </div>
        </div>
        {/* Price Filter */}
        <div>
          <h3 className='mb-2 text-sm font-medium'>Price</h3>
          <Slider
            defaultValue={[20, 400]}
            min={20}
            max={400}
            step={10}
            onValueChange={(value) => setPriceRange(value)}
            className='my-4'
          />
          <div className='flex justify-between text-sm text-gray-500'>
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
      <Button>Filter</Button>
    </div>
  );
}
