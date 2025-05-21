import React from 'react';
import { ProductListingSkeleton } from '@/components/skeleton';
import Advertisement from './ads';
import PreviewCard from '@/components/preview-card';

export default function ProductGrid({
  products,
  isLoading,
  error,
  advertisements
}) {
  if (isLoading) {
    return (
      <section className='mt-8 mb-10 grid grid-cols-2 gap-2 md:mb-20 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5 xl:gap-6'>
        <ProductListingSkeleton />
      </section>
    );
  }

  if (error) {
    return (
      <div className='py-10 text-center'>
        <h2 className='text-lg font-medium text-red-600'>
          Something went wrong.
        </h2>
        <p className='mt-2 text-sm text-gray-500'>
          Please try again later or adjust your filters.
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className='py-10 text-center'>
        <h2 className='text-lg font-semibold text-gray-700'>
          No products found
        </h2>
        <p className='mt-2 text-sm text-gray-500'>
          Try changing your filters or explore other categories.
        </p>
      </div>
    );
  }

  return (
    <section className='mt-8 mb-10 grid grid-cols-2 gap-2 md:mb-20 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5 xl:gap-6'>
      {products.map((product, index) => {
        // Define breakpoints
        const mobileAdIndex = Math.floor(index / 2) % advertisements.length;
        const mediumAdIndex = Math.floor(index / 6) % advertisements.length;
        const largeAdIndex = Math.floor(index / 8) % advertisements.length;

        const mobileAd = advertisements[mobileAdIndex];
        const mediumAd = advertisements[mediumAdIndex];
        const largeAd = advertisements[largeAdIndex];

        const adsAfterMobile = [];
        let adPosition = 5;
        for (let i = 0; i < 10; i++) {
          adsAfterMobile.push(adPosition);
          adPosition += i % 2 === 0 ? 6 : 4;
        }
        const showMobileAd = adsAfterMobile.includes(index + 1);

        return (
          <React.Fragment key={index}>
            {/* Mobile Ad */}
            {showMobileAd && (
              <Advertisement
                title={mobileAd.title}
                subtitle={mobileAd.subtitle}
                buttonLabel={mobileAd.buttonLabel}
                buttonLink={mobileAd.buttonLink}
                backgroundImage={mobileAd.backgroundImage}
                align={mobileAd.align}
                className='col-span-2 md:hidden'
              />
            )}

            {/* Medium Ad */}
            {index > 0 && index % 6 === 0 && (
              <Advertisement
                title={mediumAd.title}
                subtitle={mediumAd.subtitle}
                buttonLabel={mediumAd.buttonLabel}
                buttonLink={mediumAd.buttonLink}
                backgroundImage={mediumAd.backgroundImage}
                align={mediumAd.align}
                className='hidden md:col-span-3 md:block lg:hidden'
              />
            )}

            {/* Large Ad */}
            {index > 0 && index % 8 === 0 && (
              <Advertisement
                title={largeAd.title}
                subtitle={largeAd.subtitle}
                buttonLabel={largeAd.buttonLabel}
                buttonLink={largeAd.buttonLink}
                backgroundImage={largeAd.backgroundImage}
                align={largeAd.align}
                className='col-span-2 hidden lg:block'
              />
            )}

            {/* Product card */}
            <PreviewCard product={product} />
          </React.Fragment>
        );
      })}
    </section>
  );
}
