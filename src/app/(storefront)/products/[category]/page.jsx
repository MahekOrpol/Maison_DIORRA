import CustomTagWrapper from '@/components/custom-tag-wrapper';
import ProductFilters from './product-filters';
import ProductGrid from './product-grid';
import { baseApiUrl } from '@/lib/utils';

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

async function fetchProducts(queryParams) {
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

function sortProducts(products, sortOrder) {
  if (!products || !Array.isArray(products)) return products;

  return [...products].sort((a, b) => {
    const priceA = parseFloat(a.regularPrice?.$numberDecimal || 0);
    const priceB = parseFloat(b.regularPrice?.$numberDecimal || 0);

    return sortOrder === 'high' ? priceB - priceA : priceA - priceB;
  });
}

export default async function ProductListingPage({ params, searchParams }) {
  const { category } = params;
  const { metal, style, shape, sort } = searchParams;

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

  const availableStyles = (filters.allCategories || []).find(
    (item) => item.categoryName.toLowerCase() === category
  )?.style;

  // Sort products based on the sort parameter
  const sortedProducts = sortProducts(products, sort);

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
        products={sortedProducts || []}
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
