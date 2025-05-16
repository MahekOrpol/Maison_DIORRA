import CustomTagWrapper from '@/components/custom-tag-wrapper';
import PreviewCard from '@/components/preview-card';
import { ProductListingSkeleton } from '@/components/skeleton';
import Advertisement from './components/ads';
import ProductsFilter from './components/product-filters';
import { fetchProductsByCategory } from '@/lib/api/products';
import React from 'react';
const advertisements = [
  {
    title: '40 % Off',
    subtitle: ' On The Diamond Earings',
    buttonLabel: 'Shop Diamonds',
    buttonLink: '#',
    backgroundImage: '/img/ads/add1.png',
    align: 'left'
  },
  {
    title: 'Gold That Shines Forever',
    subtitle: 'Explore our handcrafted gold jewelry, made for every occasion.',
    buttonLabel: 'Explore Gold',
    buttonLink: '#',
    backgroundImage: '/img/ads/add2.png',
    align: 'right'
  },
  {
    title: 'Exclusive Bridal Collection',
    subtitle:
      'Make your special day shine with our stunning bridal jewelry sets.',
    buttonLabel: 'View Collection',
    buttonLink: '#',
    backgroundImage: '/img/ads/add3.png',
    align: 'left'
  },
  {
    title: '4th Advertisement',
    subtitle:
      'Make your special day shine with our stunning bridal jewelry sets.',
    buttonLabel: 'View Collection',
    buttonLink: '#',
    backgroundImage: '/img/ads/add3.png',
    align: 'left'
  }
];

// export async function generateMetadata({ params }) {
//   // const product = await getProductBySlug(params.slug);
//   const product = {
//     title: 'Product Name',
//     description: 'Product description comming soon',
//     image:
//       'https://cdn.shopify.com/s/files/1/0039/6994/1568/products/405QS-ER-R-WG_0.jpg?v=1695166735&width=1200&height=1200&crop=center'
//   };

//   if (!product) return { title: 'Product Not Found' };

//   return {
//     title: `${product.title} | Maison Diorra`,
//     description: product.description,
//     openGraph: {
//       title: product.title,
//       description: product.description,
//       images: [
//         {
//           url: product.image, // Should be full URL
//           width: 100,
//           height: 63
//         }
//       ],
//       locale: 'en_US'
//     }
//   };
// }

export default async function ProductListingPage({ params }) {
  const { category } = await params;
  console.log('category :>> ', category);
  const data = await fetchProductsByCategory(category);
  // console.log('data :>> ', data);

  return (
    <div className='wrapper'>
      {category === 'rings' && (
        <CustomTagWrapper className='xs:mt-[25px] mt-[20px] sm:mt-[30px] lg:mt-[35px] xl:mt-[45px] 2xl:mt-[65px]' />
      )}
      <ProductsFilter
        category={category.toLowerCase()}
        subCategory={''}
        className='mt-3 lg:mt-8 2xl:mt-10'
      />
      {/* listing components */}
      <section className='mt-8 mb-10 grid grid-cols-2 gap-2 md:mb-20 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5 xl:gap-6'>
        {data.map((product, index) => {
          // Separate ad indices for different breakpoints
          const mobileAdIndex = Math.floor(index / 2) % advertisements.length;
          const mediumAdIndex = Math.floor(index / 6) % advertisements.length;
          const largeAdIndex = Math.floor(index / 8) % advertisements.length;

          // Get the correct ad based on the breakpoint
          const mobileAd = advertisements[mobileAdIndex];
          const mediumAd = advertisements[mediumAdIndex];
          const largeAd = advertisements[largeAdIndex];

          // Mobile: Ad appears after 4th, then 6th item, repeating
          const adsAfterMobile = [];
          let adPosition = 5;
          for (let i = 0; i < 10; i++) {
            adsAfterMobile.push(adPosition);
            adPosition += i % 2 === 0 ? 6 : 4;
          }
          const showMobileAd = adsAfterMobile.includes(index + 1);
          return (
            <React.Fragment key={index}>
              {/* Mobile View: Show ad after 4th, then 6th, then repeat */}
              {showMobileAd && (
                <Advertisement
                  title={mobileAd.title}
                  subtitle={mobileAd.subtitle}
                  buttonLabel={mobileAd.buttonLabel}
                  buttonLink={mobileAd.buttonLink}
                  backgroundImage={mobileAd.backgroundImage}
                  align={mobileAd.align}
                  className='col-span-2 md:hidden' // Visible only on mobile
                />
              )}

              {/* Medium Screens: Show ad after every 6th item*/}
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

              {/* Large Screens: Show ad after every 8th item */}
              {index > 0 && index % 8 === 0 && (
                <Advertisement
                  title={largeAd.title}
                  subtitle={largeAd.subtitle}
                  buttonLabel={largeAd.buttonLabel}
                  buttonLink={largeAd.buttonLink}
                  backgroundImage={largeAd.backgroundImage}
                  align={largeAd.align}
                  className='col-span-2 hidden lg:block' // Visible only on large screens
                />
              )}
              {/* Render Listing Item */}
              <PreviewCard product={product} />
            </React.Fragment>
          );
        })}
      </section>
    </div>
  );
}
