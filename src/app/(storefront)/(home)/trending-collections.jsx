'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import PreviewCardMd from '@/components/preview-card-md';
import { baseUrl } from '@/lib/utils';

export default function TrendingCollections({ data }) {
  const [selectedCategory, setSelectedCategory] = useState('Rings');
  const products = data?.products || [];

  console.log('Selected Category:', selectedCategory);
  console.log('All Products:', products);
  console.log('Filtered Products:', products.filter(p => p.categoryName === selectedCategory));
  
  const displayProducts = useMemo(() => {
    // First try to get 4 products from selected category
    let mainProducts = products
      .filter(p => p.categoryName === selectedCategory)
      .slice(0, 4);

    // If not enough, fill with other products
    if (mainProducts.length < 4) {
      const remaining = 4 - mainProducts.length;
      const otherProducts = products
        .filter(p => p.categoryName !== selectedCategory)
        .slice(0, remaining);
      mainProducts = [...mainProducts, ...otherProducts];
    }

    return mainProducts;
  }, [selectedCategory, products]);

  const getTooltipProduct = (category) => {
    return (
      products.find((p) => p.categoryName === category) || {
        productName: `${category} Collection`,
        variations: [
          {
            metalVariations: [
              {
                metal: category,
                images: [`/img/preview/${category.toLowerCase()}.png`]
              }
            ]
          }
        ],
        salePrice: { $numberDecimal: '1000' },
        regularPrice: { $numberDecimal: '1500' }
      }
    );
  };

  return (
    <div className='xs:gap-3 3xl:max-h-[840px] flex flex-col gap-2 sm:gap-6 lg:max-h-[700px] lg:flex-row lg:items-stretch lg:justify-center lg:gap-4 xl:max-h-[760px] 2xl:gap-6'>
      {/* Left cards - first 2 products */}
      <div className='xl:grid-row-2 grid grid-cols-2 gap-4 sm:gap-4 lg:w-[22%] lg:grid-cols-1 2xl:gap-6'>
        {displayProducts[0] && (
          <PreviewCardMd key={displayProducts[0]._id} product={displayProducts[0]} />
        )}
        {displayProducts[1] && (
          <PreviewCardMd key={displayProducts[1]._id} product={displayProducts[1]} />
        )}
      </div>

      {/* Center image + markers */}
      <div className='relative aspect-[10/9] w-full overflow-hidden rounded-xl border lg:w-[54%] xl:aspect-[9/10]'>
        <Image
          src='/img/model-img.svg'
          height={1000}
          width={600}
          alt='model image'
          className='h-full w-full object-cover'
          priority
        />
        <MarkerButton
          onClick={() => setSelectedCategory('Bracelets')}
          tooltipContent={getTooltipProduct('Bracelets')}
          className='3xl:bottom-[6%] absolute bottom-[12%] left-[40%] lg:bottom-[18%] lg:left-[30%] xl:bottom-[8%]'
        />
        <MarkerButton
          onClick={() => setSelectedCategory('Rings')}
          tooltipContent={getTooltipProduct('Rings')}
          className='3xl:top-[30%] absolute top-[25%] left-[20%] md:top-[26%] lg:top-[34%] lg:left-[14%] xl:top-[32%]'
        />
        <MarkerButton
          onClick={() => setSelectedCategory('Necklaces')}
          tooltipContent={getTooltipProduct('Necklaces')}
          className='absolute right-[23%] bottom-[28%] lg:right-[22%] lg:bottom-[33%]'
        />
        <MarkerButton
          onClick={() => setSelectedCategory('Earrings')}
          tooltipContent={getTooltipProduct('Earrings')}
          className='3xl:top-[16%] absolute top-[14%] right-[17%] md:top-[15%] md:right-[18%] lg:top-[24%] lg:right-[16%] xl:top-[20%] xl:right-[17%]'
        />
      </div>

      {/* Right cards - next 2 products */}
      <div className='xl:grid-row-2 grid grid-cols-2 gap-4 sm:gap-4 lg:w-[22%] lg:grid-cols-1 2xl:gap-6'>
        {displayProducts[2] && (
          <PreviewCardMd key={displayProducts[2]._id} product={displayProducts[2]} />
        )}
        {displayProducts[3] && (
          <PreviewCardMd key={displayProducts[3]._id} product={displayProducts[3]} />
        )}
      </div>
    </div>
  );
}

function MarkerButton({ onClick, tooltipContent, className }) {
  const firstVariation = tooltipContent.variations?.[0]?.metalVariations?.[0];
  const firstImage = firstVariation?.images?.[0];
  const productName = tooltipContent.productName || firstVariation?.metal || 'Product';
  const salePrice = tooltipContent.salePrice?.$numberDecimal || '1000';
  const regularPrice = tooltipContent.regularPrice?.$numberDecimal || '1500';

  // State to control when to actually load the image
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <TooltipProvider>
      <div
        onClick={onClick}
        className={`group ${className} flex h-5.5 w-5.5 cursor-pointer items-center justify-center rounded-full border border-white sm:h-7 sm:w-7 md:border-2 xl:h-8 xl:w-8`}
      >
        <Tooltip
          onOpenChange={(open) => setIsTooltipOpen(open)}
        >
          <TooltipTrigger
            className='h-4 w-4 rounded-full bg-white hover:bg-white/90 sm:h-5 sm:w-5 xl:h-6 xl:w-6'
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent onClick from firing
              onClick();
            }}
          />
          {isTooltipOpen && (
            <TooltipContent className='overflow-hidden rounded-md bg-white py-0 pr-4 pl-0 text-black'>
              <div className='relative z-60 flex items-center'>
                {firstImage && (
                  <img
                    src={baseUrl + firstImage}
                    height={90}
                    width={90}
                    alt={productName}
                    className='h-[70px] w-[70px] sm:h-[80px] sm:w-[80px]'
                    loading='lazy'
                  />
                )}
                <div className='ml-2'>
                  <div className='flex items-baseline gap-2'>
                    <p className='text-lg font-semibold sm:text-xl'>
                      ${salePrice}
                    </p>
                    <span className='text-muted-foreground text-base font-normal line-through sm:text-lg'>
                      ${regularPrice}
                    </span>
                  </div>
                  <p className='flex w-25 items-center text-sm leading-5 sm:text-base'>
                    {productName}
                    <ShoppingBag className='ml-2 h-6 w-6' />
                  </p>
                </div>
              </div>
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}