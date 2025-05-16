'use client';
import ProductGallery from '@/app/(storefront)/products/[category]/components/product-gallery';
import ProductDetails from '@/app/(storefront)/products/[category]/components/product-details';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { AiOutlineColumnHeight } from 'react-icons/ai';
import Image from 'next/image';
import { baseUrl, cn, getProductDetaisByCategory } from '@/lib/utils';
import RelatedProducts from '@/components/related-products';
import CustomTagWrapper from '@/components/custom-tag-wrapper';
import { LiaBalanceScaleSolid } from 'react-icons/lia';
import { AiOutlineGold } from 'react-icons/ai';
import { IoDiamondOutline } from 'react-icons/io5';
import { RiWeightLine } from 'react-icons/ri';
import { PiDiamondsFour } from 'react-icons/pi';
import { CustomerReviews } from './customer-reviews';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import FinalDetails from './final-details';
import { useSearchParams } from 'next/navigation';
import { useFetch } from '@/hooks/useFetch';

export default function ProductDetailsPage({ params }) {
  const [selectedMetal, setSelectedMetal] = useState('');
  const { category, subcategory, productid } = use(params);
  const searchParams = useSearchParams();
  const metal = searchParams.get('metal');
  const metalVariation = searchParams.get('metalVariation');

  console.log(metal, metalVariation);

  const { data, isLoading, error } = useFetch(
    `${baseUrl}/api/v1/product/get-product-id/${productid}`,
    { id: 'jdf' }
  );

  console.log('data :>> ', data);

  return (
    <>
      <div className='wrapper'>
        <Breadcrumb className='pt-4 lg:pt-8'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/' className='3xl:text-lg lg:text-base'>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href='/components'
                className='3xl:text-lg lg:text-base'
              >
                {category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className='3xl:text-lg lg:text-base'>
                {subcategory}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CustomTagWrapper className='xs:my-[10px] 3xl:my-[10px] 3xl:mb-[40px] my-[8px] lg:my-[10px] lg:mb-[30px] xl:mb-[40px]' />
      </div>
      <div className='mx-auto mb-8 flex w-full max-w-[2100px] flex-col gap-3 md:gap-4 lg:flex-row xl:gap-6'>
        {/* <ProductGallery
          className='lg:sticky lg:top-10 lg:h-fit lg:w-[45%]'
          media={product.media[selectedMetal]}
        /> */}
        {/* <ProductDetails
          className='3xl:pr-14 4xl:pr-20 px-3 sm:px-6 lg:w-[55%] lg:pr-8 2xl:pr-12'
          data={product}
          category={category}
          subcategory={subcategory}
          selectedMetal={selectedMetal}
          setSelectedMetal={setSelectedMetal}
        /> */}
      </div>
      {/* <FinalDetails className='wrapper' data={product.finalProductDetails} /> */}
      {/* <CustomerReviews
        className='wrapper'
        data={product?.reviews?.reviews ?? []}
      /> */}
      <RelatedProducts className='wrapper' />
    </>
  );
}

export const PriceDisplay = ({ price, originalPrice, className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className='text-3xl font-bold text-gray-900'>
        ¥{price.toLocaleString()}
      </span>
      {originalPrice && (
        <span className='ml-2 text-xl text-gray-500 line-through'>
          ¥{originalPrice.toLocaleString()}
        </span>
      )}
    </div>
  );
};
