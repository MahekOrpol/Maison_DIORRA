import ProductGallery from './product-gallery';
import ProductDetails from './product-details';
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

export default async function ProductDetailsPage({ params, searchParams }) {
  const { category, productid } = await params;
  const { metal, mv, style, shank, shape, sort } = await searchParams;

  const filters = {
    metal: metal || '',
    metalVariation: mv || '',
    style: style || '',
    shank: shank || '',
    diamondShape: shape || '',
    sortByPrice: sort || ''
  };
  const query = buildQueryString({
    categoryName: category,
    ...filters
  });
  // availableMetals
  const res1 = await fetch(
    `${baseUrl}/api/v1/product/get-product-id/${productid}`
  );
  const data = await res1.json();
  const availableMetals = data.variations[0].metalVariations.map((item) => ({
    metal: item.metal,
    metalId: item._id
  }));
  // fetch product detials
  const res = await fetch(
    `${baseUrl}/api/v1/product/get-product-id/${productid}${query}`
  );
  const product = await res.json();

  // const [availableMetals, setAvailableMetals] = useState([]);

  // const [filters, setFilters] = useState({
  //   metal: searchParams.get('metal') || '',
  //   style: searchParams.get('style') || '',
  //   diamondShape: searchParams.get('diamondShape') || '',
  //   sortByPrice: searchParams.get('sortByPrice') || ''
  // });

  // useEffect(() => {
  //   async function fetchMetals() {
  //     try {
  //       const res = await axios.get(
  //         `${baseUrl}/api/v1/product/get-product-id/${productid}`
  //       );
  //       const data2 = await res.data;
  //       console.log('data2:', data2);
  //       const fetchedMetals = data2.variations[0].metalVariations.map(
  //         (item) => ({
  //           metal: item.metal,
  //           metalId: item._id
  //         })
  //       );
  //       setAvailableMetals(fetchedMetals);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }

  //   fetchMetals();
  // }, []);

  //  Build query string for API
  // const query = buildQueryString({
  //   categoryName: category,
  //   ...filters
  // });
  // const {
  //   data: product,
  //   isLoading,
  //   error
  // } = useFetch(`${baseUrl}/api/v1/product/get-product-id/${productid}`, {
  //   // } = useFetch(
  //   //   `${baseUrl}/api/v1/product/get-product-id/68270f15dfb489aef4b062b8`
  //   metal: metal,
  //   metalVariation: metalVariation
  // });
  // const {
  //   data: product,
  //   isLoading,
  //   error
  // } = useFetch(
  //   `${baseUrl}/api/v1/product/get-product-id/${productid}?${query}`,
  //   {},
  //   [query]
  // );

  // console.log('product data :>> ', product);

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
              <BreadcrumbLink href='#' className='3xl:text-lg lg:text-base'>
                {category
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className='3xl:text-lg lg:text-base'>
                {product?.productName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CustomTagWrapper className='xs:my-[10px] 3xl:my-[10px] 3xl:mb-[40px] my-[8px] lg:my-[10px] lg:mb-[30px] xl:mb-[40px]' />
      </div>
      <div className='mx-auto mb-8 flex w-full max-w-[2100px] flex-col gap-3 md:gap-4 lg:flex-row xl:gap-6'>
        <ProductGallery
          className='lg:sticky lg:top-10 lg:h-fit lg:w-[45%]'
          media={product?.variations[0].metalVariations[0].images}
        />
        <ProductDetails
          className='3xl:pr-14 4xl:pr-20 px-3 sm:px-6 lg:w-[55%] lg:pr-8 2xl:pr-12'
          data={product}
          category={category}
          availableMetals={availableMetals}
          // subcategory={subcategory}
          // selectedMetal={selectedMetal}
          // setSelectedMetal={setSelectedMetal}
        />
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

function buildQueryString(params) {
  const query = Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== '' && value !== null
    )
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key).replace(/%20/g, '+');
      const encodedValue = encodeURIComponent(value).replace(/%20/g, '+');
      return `${encodedKey}=${encodedValue}`;
    })
    .join('&');

  return query ? `?${query}` : '';
}
