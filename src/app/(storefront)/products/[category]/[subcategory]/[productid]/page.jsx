import ProductGallery from '@/app/(storefront)/products/[category]/components/product-gallery';
import ProductDetails from '@/app/(storefront)/products/[category]/components/product-details';
import { MdStarRate, MdVerified } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
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
import Link from 'next/link';
import { cn } from '@/lib/utils';
import RelatedProducts from '@/components/related-products';
import CustomTagWrapper from '@/components/custom-tag-wrapper';
import { LiaBalanceScaleSolid } from 'react-icons/lia';
import { AiOutlineGold } from 'react-icons/ai';
import { IoDiamondOutline } from 'react-icons/io5';
import { RiWeightLine } from 'react-icons/ri';
import { PiDiamondsFour } from 'react-icons/pi';
export default async function ProductDetailsPage() {
  const data = await fetch('http://localhost:5000/productDetails/1');
  const product = await data.json();
  return (
    <>
      <div className='wrapper'>
        <Breadcrumb className='pt-4 lg:pt-5'>
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
                Components
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className='3xl:text-lg lg:text-base'>
                Breadcrumb
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CustomTagWrapper className='xs:my-[20px] 3xl:my-[60px] my-[15px] lg:my-[30px] xl:mb-[40px] 2xl:mb-[50px]' />
      </div>
      <div className='mx-auto mb-8 flex w-full max-w-[2100px] flex-col gap-3 md:gap-4 lg:flex-row xl:gap-6'>
        <ProductGallery className='lg:sticky lg:top-10 lg:h-fit lg:w-[45%]' />
        <ProductDetails
          className='3xl:pr-14 4xl:pr-20 px-3 sm:px-6 lg:w-[55%] lg:pr-8 2xl:pr-12'
          data={product}
        />
      </div>
      <RingDetails className='wrapper' data={product.finalProductDetails} />
      <CustomerReviews
        className='wrapper'
        data={product?.reviews?.reviews ?? []}
      />
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

function RingDetails({ data, className }) {
  const details = [
    {
      category: 'Know your Setting',
      icon: '/icons/ring-fv.svg',
      items: [
        {
          icon: <AiOutlineColumnHeight size={20} />,
          label: 'RING DIAMETER',
          value: data.ringDetails.diameter,
          desc: 'Measured at the base of the ring.'
        },
        {
          icon: <LiaBalanceScaleSolid size={22} />,
          label: 'APPROX CTW',
          value: data.ringDetails.ctw,
          desc: 'Measured at the base of the ring.'
        },
        {
          icon: <AiOutlineGold size={20} />,
          label: 'METAL',
          value: data.ringDetails.metal,
          desc: 'It comes with the authenticity and guarantee certificate of 925 Silver with lifetime exchange guarantee.',
          fullWidth: true
        }
      ]
    },
    {
      category: 'Diamond Details',
      icon: '/icons/ring-top-fv.svg',
      items: [
        {
          icon: <IoDiamondOutline size={20} />,
          label: 'DIAMOND SHAPE',
          value: data.diamondDetails.shape
        },
        {
          icon: <AiOutlineColumnHeight size={20} />,
          label: 'DIAMOND SIZE',
          value: data.diamondDetails.size
        },
        {
          icon: <RiWeightLine size={20} />,
          label: 'DIAMOND WEIGHT',
          value: '0.18 Ct Approx'
        },
        {
          icon: <PiDiamondsFour size={20} />,
          label: 'DIAMOND CLARITY',
          value: data.diamondDetails.clarity
        }
      ]
    }
  ];
  return (
    <section className={cn(className)}>
      <h2 className='border-b pb-4 text-2xl font-medium md:font-medium lg:text-3xl xl:pt-4 2xl:text-4xl'>
        Ring and Stone Details:
        <hr className='mb-2' />
      </h2>
      <div className='bg-secondary grid grid-cols-1 gap-4 px-2 pt-2 pb-8 sm:px-4 sm:pt-4 md:grid-cols-2 md:gap-8 md:px-8'>
        {details.map(({ category, icon, items }) => (
          <div key={category}>
            <div className='mb-2 flex items-center gap-4 text-lg font-medium md:mb-4 lg:text-2xl'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white'>
                <Image
                  src={icon}
                  alt={category}
                  width={20}
                  height={20}
                  className='h-5 w-5 md:h-6 md:w-6'
                />
              </div>
              {category}
            </div>
            <div className='grid grid-cols-2 gap-2 md:gap-4'>
              {items.map(({ icon, label, value, desc, fullWidth }, index) => (
                <div
                  key={index}
                  className={`flex min-h-[142px] flex-col gap-2 rounded-md bg-white p-2 md:p-4 ${
                    fullWidth ? 'col-span-2' : ''
                  }`}
                >
                  <div className='inline-flex gap-2 text-xs font-light sm:text-sm'>
                    {icon}
                    {label}
                  </div>
                  <div className='xs:text-xl text-lg leading-6 font-semibold lg:text-2xl'>
                    {value}
                  </div>
                  {desc && <p className='text-xs'>{desc}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const CustomerReviews = ({ className, data }) => {
  const reviews = [
    {
      id: 1,
      author: 'Rosalina Kelin',
      date: '19th June, 2024',
      authorImg: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5,
      content:
        'I recently purchased a ring from your store, and I am extremely happy with my purchase'
    },
    {
      id: 2,
      author: 'Jonathan Kale',
      date: '19th June, 2024',
      authorImg: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 4,
      content:
        'I recently purchased a ring from your store, and I am extremely happy with my purchase'
    },
    {
      id: 3,
      author: 'Jonathan Kaleo',
      date: '19th June, 2024',
      authorImg: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 2,
      content:
        'I recently purchased a ring from your store, and I am extremely happy with my purchase'
    }
  ];
  console.log(data); //null
  return (
    <div className={cn('mt-8', className)}>
      <h2 className='text-2xl font-medium md:text-3xl md:font-medium lg:text-4xl'>
        Customer Reviews :
        <hr className='mt-4 mb-4' />
      </h2>
      {data.length === 0 ? (
        <p className='text-gray-500'>No customer reviews yet.</p>
      ) : (
        <div className='space-y-6 md:space-y-3'>
          {data.map((review) => (
            <TestimonialCard key={review.id} {...review} />
          ))}
        </div>
      )}
      <div className=''>
        <h3 className='pt-4 text-xl font-medium md:text-xl md:font-medium lg:text-2xl'>
          Add a Review
        </h3>
        <p className='mb-4'>
          You must be{' '}
          <Link href='/sign-in' className='pe-2 font-semibold hover:underline'>
            logged in
          </Link>
          to post a review.
        </p>
      </div>
    </div>
  );
};

function TestimonialCard({ author, authorImg, date, content, rating = 5 }) {
  return (
    <div className='xs:pb-3 flex items-center gap-2 border-b pb-2.5 md:gap-4 md:pb-6'>
      {/* Responsive Image Wrapper */}
      <div className='flex w-fit items-center justify-center self-start rounded-full border'>
        <div className='rounded-full bg-white'>
          {authorImg ? (
            <Image
              src={authorImg}
              alt='Testimonial Author'
              width={56}
              height={56}
              className='h-14 w-14 rounded-full object-cover'
            />
          ) : (
            <FaUserCircle className='h-14 w-14 rounded-full object-cover' />
          )}
        </div>
      </div>

      {/* Author Details */}
      <div className='flex-1'>
        <div className='flex items-center gap-3'>
          <span className='xs:text-xl inline-flex items-center gap-1 text-sm'>
            {author}
            <MdVerified className='inline fill-green-700' size={20} />
          </span>
          <span className='xs:text-sm text-xs'> VERIFIED PURCHASE</span>
        </div>
        <div className='flex items-center gap-3 pt-1 text-sm font-semibold sm:text-base'>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <MdStarRate
                key={i}
                className={`h-5 w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'} transition-colors duration-300`}
              />
            ))}{' '}
          </div>
          <p> {date}</p>
        </div>
        <p className='pt-3 text-xs leading-4 font-light sm:text-sm xl:text-[15px]'>
          {content}
        </p>
      </div>
    </div>
  );
}
