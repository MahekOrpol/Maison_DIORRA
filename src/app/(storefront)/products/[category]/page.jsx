import CustomTagWrapper from '@/components/custom-tag-wrapper';
// import { use, useMemo } from 'react';
// import { useFilterStore } from '@/store/use-filter-store';
// import { useFetch } from '@/hooks/useFetch';
import ProductFilters from './product-filters';
import ProductGrid from './product-grid';
import { baseApiUrl } from '@/lib/utils';

// export const dynamic = 'force-dynamic';

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

// utils/api.ts or inside this component file

async function fetchProducts(queryParams) {
  // const query = buildQueryString(queryParams);
  // console.log(queryParams);
  const res = await fetch(`${baseApiUrl}/api/v1/product/get${queryParams}`);

  if (res.status !== 200) throw new Error('Failed to fetch products');
  return res.json();
}

async function fetchFilters() {
  const [metalRes, shapeRes, categoryRes] = await Promise.all([
    fetch(`${baseApiUrl}/api/v1/metal/get`),
    fetch(`${baseApiUrl}/api/v1/diamond-shape/get`),
    fetch(`${baseApiUrl}/api/v1/category/get`)
  ]);

  const [availableMetals, availableShapes, allCategories] = await Promise.all([
    metalRes.json(),
    shapeRes.json(),
    categoryRes.json()
  ]);

  return { availableMetals, availableShapes, allCategories };
}

export default async function ProductListingPage({ params, searchParams }) {
  const { category } = await params;
  const { metal, style, shape, sort } = await searchParams;

  const queryParams = {
    categoryName: category || '',
    metal: metal || '',
    style: style || '',
    diamondShape: shape || ''
  };
  const fullQuery = buildQueryString(queryParams);

  const [products, filters] = await Promise.all([
    fetchProducts(fullQuery),
    fetchFilters()
  ]);

  // console.log('products', products);

  const availableStyles = (filters.allCategories || []).find(
    (item) => item.categoryName.toLowerCase() === category
  )?.style;

  // console.log('availableStyles', availableStyles);
  // console.log('allCategories', allCategories);
  // console.log('availableShapes', availableShapes);
  // console.log('availableMetals', availableMetals);
  // console.log('data', data);
  // const sortedData = useMemo(() => {
  //   if (!data || !Array.isArray(data)) return [];

  //   const extractPrice = (product) => {
  //     // Extract price from "$numberDecimal" field and convert to float
  //     return parseFloat(product.regularPrice?.$numberDecimal || 0);
  //   };

  //   if (sortByPrice === 'low') {
  //     return [...data].sort((a, b) => extractPrice(a) - extractPrice(b));
  //   }

  //   if (sortByPrice === 'high') {
  //     return [...data].sort((a, b) => extractPrice(b) - extractPrice(a));
  //   }

  //   return data;
  // }, [data, sortByPrice]);

  return (
    <div className='wrapper'>
      {category === 'rings' && (
        <CustomTagWrapper className='xs:mt-[25px] mt-[20px] sm:mt-[30px] lg:mt-[35px] xl:mt-[45px] 2xl:mt-[65px]' />
      )}
      <ProductFilters
        category={category.toLowerCase()}
        availableMetals={filters.availableMetals}
        availableShapes={filters.availableShapes}
        availableStyles={availableStyles}
        className='mt-3 lg:mt-8 2xl:mt-10'
      />
      <ProductGrid
        advertisements={advertisements}
        isLoading={false}
        error={null}
        products={products || []}
      />
    </div>
  );
}

function buildQueryString(params) {
  const query = Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== '' && value !== null
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  return query ? `?${query}` : '';
}
