'use client';
import Image from 'next/image';
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function DiamondFilters() {
  const colors = ['J', 'I', 'H', 'G', 'F', 'E', 'D'];
  const clarities = ['S1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL'];
  
  const [filters, setFilters] = React.useState({
    shape: 'Round', // default shape
    color: null,
    clarity: null,
    priceRange: [20, 400],
    caratRange: [1, 8]
  });

  const handleFilterClick = () => {
    console.log('Current filters:', filters);
  };

  return (
    <div className='mb-6'>
      <h2 className='text-center text-xl font-medium md:text-3xl'>
        Select your Stone Shape and Quality
      </h2>
      {/* shape */}
      <div className='my-4 flex justify-center gap-2'>
        {['Round', 'Pear', 'Emerlad', 'Princess'].map((shape) => (
          <button
            key={shape}
            className={`w-[95px] rounded-lg border border-secondary shadow-md hover:border-black/60 hover:bg-gray-100 ${
              filters.shape === shape ? 'bg-gray-100 border-black/60' : ''
            }`}
            onClick={() => setFilters({...filters, shape})}
          >
            <div className='flex items-center justify-center'>
              <Image
                src={`/icons/shape-${shape.toLowerCase()}.svg`}
                height={60}
                width={60}
                alt={shape}
              />
            </div>
            {shape}
          </button>
        ))}
      </div>
      {/* quality */}
      <div className='w-full space-y-6 p-0 md:p-4'>
        <div className='grid grid-cols-1 justify-center xl:gap-30 3xl:gap-30 place-items-center xl:place-items-stretch sm:grid-cols-2 lg:grid-cols-3'>
          {/* Color Filter */}
          <div className=''>
            <h3 className='mb-1 font-medium'>Color</h3>
            <div className='inline-flex rounded-md border border-black'>
              {colors.map((color) => (
                <button
                  key={color}
                  className={`inline-flex h-12 w-10 3xl:w-20 items-center justify-center border-r border-l border-l-transparent text-sm hover:border-l hover:border-black ${
                    filters.color === color ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => setFilters({...filters, color})}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          {/* Clarity Filter */}
          <div>
            <h3 className='mb-1 font-medium'>Clarity</h3>
            <div className='inline-flex rounded-md border border-black'>
              {clarities.map((clarity) => (
                <button
                  key={clarity}
                  className={`inline-flex h-12 w-10 3xl:w-20 items-center justify-center border-r border-l border-l-transparent text-sm hover:border-l hover:border-black ${
                    filters.clarity === clarity ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => setFilters({...filters, clarity})}
                >
                  {clarity}
                </button>
              ))}
            </div>
          </div>
          {/* Carat Filter */}
          <div className='w-full max-w-sm 3xl:max-w-lg sm:col-span-2 lg:col-span-1'>
            <h3 className='font-medium'>Carat</h3>
            <Slider
              value={filters.caratRange}
              min={1}
              max={8}
              step={0.1}
              onValueChange={(value) => setFilters({...filters, caratRange: value})}
              className='my-2'
            />
            <div className='flex justify-between text-sm text-gray-500'>
              <span>{filters.caratRange[0]} ct</span>
              <span>{filters.caratRange[1]} ct</span>
            </div>
          </div>
        </div>
        {/* Price Filter */}
        <div>
          <h3 className='font-medium'>Price</h3>
          <Slider
            value={filters.priceRange}
            min={20}
            max={400}
            step={10}
            onValueChange={(value) => setFilters({...filters, priceRange: value})}
            className='my-2'
          />
          <div className='flex justify-between text-sm text-gray-500'>
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>    
      <Button onClick={handleFilterClick}>Filter</Button>
    </div>
  );
}
