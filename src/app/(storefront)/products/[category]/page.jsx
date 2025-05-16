'use client';
import CustomTagWrapper from '@/components/custom-tag-wrapper';
import ProductGrid from './components/product-grid';
import { use } from 'react';
import ProductFilters from './components/product-filters';
import { useFilterStore } from '@/store/use-filter-store';
import { useFetch } from '@/hooks/useFetch';

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

export default function ProductListingPage({ params }) {
  const { category } = use(params);
  console.log('category :>> ', category);
  // const data = await fetchProductsByCategory(category);
  const { metalPurity, style, shape, sortByPrice } = useFilterStore();

  const { data, isLoading, error } = useFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product/get`,
    {
      categoryName: category
      // metal: metalPurity,
      // shank: style,
      // diamondShape: shape
      // sortByPrice
    },
    [category, metalPurity, style, shape, sortByPrice]
  );

  return (
    <div className='wrapper'>
      {category === 'rings' && (
        <CustomTagWrapper className='xs:mt-[25px] mt-[20px] sm:mt-[30px] lg:mt-[35px] xl:mt-[45px] 2xl:mt-[65px]' />
      )}
      <ProductFilters
        category={category.toLowerCase()}
        // subCategory={''}
        className='mt-3 lg:mt-8 2xl:mt-10'
      />
      <ProductGrid
        advertisements={advertisements}
        isLoading={isLoading}
        error={error}
        products={data}
      />
    </div>
  );
}
