import ProductGallery from '@/features/product/components/product-gallery';
import ProductDetails from '@/features/product/components/product-details';
import CustomTag from '@/components/CustomTag';

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
import { Star } from 'lucide-react';
import Link from 'next/link';
export default function Page() {
  return (
    <div className='container'>
      <Breadcrumb className='my-2'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/components'>Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* arrowed label */}
      <div className='my-[3%] flex w-full items-center justify-between gap-3 md:flex-row md:gap-6 xl:my-15'>
        <CustomTag
          no='1.'
          text='Select Your'
          bold='METAL'
          imgUrl='/icons/metal.svg'
          href='/products'
        />
        <CustomTag
          no='2.'
          text='Select Your'
          bold='SHANK'
          imgUrl='/icons/shank.svg'
          href='/products'
        />
        <CustomTag
          no='3.'
          text='Select Your'
          bold='DIAMOND'
          imgUrl='/icons/diamond1.svg'
          href='/products'
        />
      </div>
      <div className='mb-8 flex w-full flex-col gap-6 lg:flex-row'>
        <ProductGallery className='lg:w-[45%]' />
        <ProductDetails className='lg:w-[55%]' />
      </div>
      <RingDetails />
      {/* <ProductDetailsAfterSelection /> */}
      <CustomerReviews />
    </div>
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

function RingDetails() {
  const details = [
    {
      category: 'Know your Setting',
      icon: '/icons/ring-fv.svg',
      items: [
        {
          label: 'RING DIAMETER',
          value: '1.62 cm',
          desc: 'Measured at the base of the ring.'
        },
        {
          label: 'APPROX CTW',
          value: '0.2 ct ',
          desc: 'Measured at the base of the ring.'
        },
        {
          label: 'METAL',
          value: '925 Silver',
          desc: 'It comes with the authenticity and guarantee certificate of 925 Silver with lifetime exchange guarantee.',
          fullWidth: true
        }
      ]
    },
    {
      category: 'Ring Details',
      icon: '/icons/ring-top-fv.svg',
      items: [
        { label: 'DIAMOND SHAPE', value: 'Circle' },
        { label: 'DIAMOND SIZE', value: 'Moissanite Diamond 0.18 ctw' },
        { label: 'DIAMOND WEIGHT', value: '0.18 Ct Approx' },
        { label: 'DIAMOND PURITY', value: '4 ctw' }
      ]
    }
  ];
  return (
    <section>
      <h2 className='border-b py-4 text-2xl font-medium md:text-3xl md:font-semibold lg:text-4xl'>
        Ring and Stone Details:
        <hr className='my-2' />
      </h2>
      <div className='bg-secondary grid grid-cols-1 gap-8 px-2 pt-2 pb-8 sm:px-4 sm:pt-4 md:grid-cols-2 md:px-8'>
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
              {items.map(({ label, value, desc, fullWidth }, index) => (
                <div
                  key={index}
                  className={`flex min-h-[142px] flex-col gap-2 rounded-md bg-white p-2 md:p-4 ${
                    fullWidth ? 'col-span-2' : ''
                  }`}
                >
                  <div className='inline-flex gap-2 text-xs font-light sm:text-sm'>
                    <AiOutlineColumnHeight size={20} />
                    {label}
                  </div>
                  <div className='leading-6 font-semibold sm:text-2xl'>
                    {value}
                  </div>
                  {desc && <p className='text-sm'>{desc}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const CustomerReviews = () => {
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
  return (
    <div className='mt-8'>
      <h2 className='py-4 text-2xl font-medium md:text-3xl md:font-semibold lg:text-4xl'>
        Customer Reviews
        <hr className='my-2' />
      </h2>

      <div className='space-y-6'>
        {reviews.map((review) => (
          <TestimonialCard key={review.id} {...review} />
        ))}
      </div>

      <div className=''>
        <h3 className='py-4 text-xl font-medium md:text-2xl md:font-semibold lg:text-3xl'>
          Add a Review
        </h3>
        <p className='mb-4'>
          You must be{' '}
          <Link href='/login' className='pe-2 font-semibold hover:underline'>
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
    <div className='flex items-center gap-2 md:gap-4'>
      {/* Responsive Image Wrapper */}
      <div className='w-[100px]'>
        <img
          src={authorImg}
          alt='img'
          className='aspect-square h-full w-full rounded-full object-cover md:max-w-[90px]'
        />
      </div>

      {/* Author Details */}
      <div>
        <div className='mb-[6px] flex'>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'} transition-colors duration-300`}
            />
          ))}
        </div>
        <div className='mb-1 flex items-center gap-4 text-sm font-semibold md:text-lg'>
          {author} | {date}
        </div>
        <p className='text-sm leading-4 font-light md:text-base'>{content}</p>
      </div>
    </div>
  );
}
