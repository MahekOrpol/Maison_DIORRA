'use client';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { IoStarSharp } from 'react-icons/io5';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { TbVideoPlus } from 'react-icons/tb';
import { GiBigDiamondRing } from 'react-icons/gi';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';
import { ScheduleCallDialog } from '@/components/modals/schedule-meeting-modal';
import ShareButton from '@/app/checkout/components/share-button';

const metalTypes = [
  { name: 'rose', url: '/img/rose-theme.png' },
  { name: 'gold', url: '/img/gold-theme.png' },
  { name: 'white', url: '/img/white-theme.png' }
];
const metalPurities = ['14K', '18K', '22K'];
const ringSizes = [
  { us: '3', mm: '44.2' },
  { us: '4', mm: '45.0' },
  { us: '5', mm: '45.8' },
  { us: '6', mm: '46.5' },
  { us: '7', mm: '47.3' },
  { us: '8', mm: '48.1' },
  { us: '9', mm: '48.9' },
  { us: '10', mm: '49.7' },
  { us: '11', mm: '50.5' },
  { us: '12', mm: '51.3' },
  { us: '13', mm: '52.1' },
  { us: '14', mm: '52.9' },
  { us: '15', mm: '53.7' }
];
const shapes = [
  { name: 'round', imgUrl: '/icons/shape-round.svg' },
  { name: 'pear', imgUrl: '/icons/shape-pear.svg' },
  { name: 'emerald', imgUrl: '/icons/shape-emerlad.svg' },
  { name: 'princess', imgUrl: '/icons/shape-princess.svg' }
];
const shanks = [
  { name: 'solitare', imgUrl: '/img/shapes/shank1.png' },
  { name: 'french pave', imgUrl: '/img/shapes/shank2.png' }
];
const icons = [
  { src: '/icons/badge.svg', label: 'Lifetime Warranty' },
  { src: '/icons/dollar-inhand.svg', label: '30 Days Free Return' },
  { src: '/icons/certificate.svg', label: 'Certificate & Appraisal' }
];
export default function ProductDetails({
  className,
  data,
  category,
  subcategory,
  selectedMetal,
  setSelectedMetal
}) {
  const [selectedSize, setSelectedSize] = useState();
  const [selectedShape, setSelectedShape] = useState(
    data?.selectedVariants?.diamondShape || ' '
  );
  const [selectedPurity, setSelectedPurity] = useState(
    data?.selectedVariants?.purity || ' '
  );
  const [selectedShank, setSelectedShank] = useState(
    data?.selectedVariants?.shank || ' '
  );
  const [openMeeting, setOpenMeeting] = useState(false);

  const router = useRouter();

  const isRing = category === 'rings';
  const isDiamondBased = subcategory?.toLowerCase().includes('diamond');

  console.log(data);

  const handleAddToCart = async () => {
    const res = await fetch('/api/check-auth', {
      method: 'GET',
      cache: 'no-store'
    });
    const data = await res.json();
    if (!data.authenticated) {
      router.push('/login');
    }
    router.push('/checkout');
  };
  const handleAddToWishlist = async () => {
    const res = await fetch('/api/check-auth', {
      method: 'GET',
      cache: 'no-store'
    });
    const data = await res.json();
    if (!data.authenticated) {
      router.push('/login');
    }
    router.push('/account/wishlist');
  };
  return (
    <section className={cn(className)}>
      <div>
        {/* Sale Badge */}
        <span className='bg-primary text-primary-foreground mb-2 inline-block rounded-full px-3 py-1 text-xs'>
          SAVE 20%
        </span>
        {/* Product Title */}
        <div className='xs:pt-0 mb-2 flex gap-4 pt-2 md:mb-3'>
          <h1 className='mb-2 flex-1 text-xl leading-6 font-medium sm:text-2xl sm:leading-8 md:text-3xl md:leading-10'>
            {data?.name || 'Product name'}
          </h1>
          <Image src='/icons/hand.svg' alt='hand icon' height={40} width={40} />
          {/* <GiBigDiamondRing className='h-5 w-5 sm:h-7 sm:w-7 lg:h-14 lg:w-14' /> */}
        </div>
        {/* Reviews */}
        <div className='xs:text-sm xs:gap-6 mb-1 flex items-center gap-2 text-xs text-nowrap min-[350px]:gap-5 sm:mb-2 md:gap-4 xl:gap-12'>
          <span className='flex items-center'>
            {/* Star Rating Display */}
            <span className='flex items-center'>
              {[...Array(5)].map((_, i) => (
                <IoStarSharp
                  key={i}
                  className={cn(
                    'h-4 w-4 xl:h-5 xl:w-5',
                    i < Math.ceil(data?.reviews?.avgRating || 0)
                      ? 'fill-yellow-400'
                      : 'fill-gray-300'
                  )}
                />
              ))}
            </span>

            {/* Review Count or Add Review Button */}
            <span className='xs:ml-2 ml-1 md:text-base xl:text-lg'>
              {!data?.reviews?.reviews?.length ? (
                <button
                  className='underline underline-offset-2 hover:no-underline'
                  onClick={() => {}}
                >
                  Add a review
                </button>
              ) : (
                <span>
                  {data?.reviews?.avgRating || 0}/5
                  {/* {data?.reviews?.reviews?.length} Reviews */}
                </span>
              )}
            </span>
          </span>
          <span className='xs:text-sm md:text-base xl:text-lg'>
            SKU: {data?.sku}
          </span>
          <Badge
            variant='outline'
            className={cn(
              'xs:text-xs absolute right-0 rounded-full text-[10px] uppercase sm:relative xl:text-sm',
              data?.inStock
                ? 'me-2 border border-green-400 bg-green-100 px-2.5 py-0.5 text-green-800'
                : 'me-2 border border-gray-500 bg-gray-100 px-2.5 py-0.5 text-gray-800'
            )}
          >
            {data?.inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>

        {/* Pricing */}
        <div className='mb-1 md:mb-2'>
          <span className='text-2xl font-semibold text-gray-900 lg:text-3xl'>
            $ {data?.price}
          </span>
          <span className='text-muted-foreground ml-2 text-xl line-through'>
            $ {data?.originalPrice}
          </span>
        </div>
        {/* Product Description */}
        <p className='xs:p-0 mb-3 pt-3 text-justify text-xs text-gray-700 md:mb-6 md:text-sm lg:text-base'>
          {data?.description}
        </p>
      </div>

      {/* Installment Option */}
      <div className='xs:text-sm mb-6 border-b py-4 text-xs md:text-sm'>
        <h3 className='mb-2 text-xl font-medium underline underline-offset-5 md:mb-4 md:text-2xl md:underline-offset-8'>
          Buy Jewelry on Interest Free Installment
        </h3>
        <p className='mt-1'>
          Installments starting at ₹5,000 per month
          <Link
            href='#'
            className='h-auto p-0 ps-2 font-semibold text-black underline underline-offset-3 transition-all duration-300 hover:no-underline'
          >
            Prequalify now
          </Link>
        </p>

        <p className='mt-1'>
          Earn 5% cashback on this purchase.{' '}
          <Link
            href='#'
            className='h-auto p-0 ps-2 font-semibold text-black underline underline-offset-3 transition-all duration-300 hover:no-underline'
          >
            Learn more
          </Link>
        </p>
      </div>

      {/* Product Options */}
      <div className='space-y-6'>
        {/* Ring Size */}
        <div>
          <Select onValueChange={setSelectedSize}>
            <SelectTrigger className='bg-secondary md:tex-lg data-[placeholder]:text-foreground w-[200px] font-medium'>
              <SelectValue placeholder='Select Ring Size' />
            </SelectTrigger>
            <SelectContent>
              {ringSizes.map((size) => (
                <SelectItem key={size.us} value={size.us}>
                  US {size.us} - {size.mm}mm
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Metal Type */}
        <div className='flex items-center'>
          <label className='inline-block w-[140px] text-lg font-medium'>
            Metal Type :
          </label>
          <div className='inline-flex items-center gap-2'>
            {metalTypes.map((metal) => (
              <button
                key={metal.name}
                type='button'
                onClick={() => setSelectedMetal(metal.name)}
                className={cn(
                  'inline-flex items-center justify-center rounded-full border transition-all', // Base styles
                  selectedMetal === metal.name
                    ? 'border-gray-400'
                    : 'border-transparent' // Hide border when not selected
                )}
              >
                <Image
                  src={metal.url}
                  alt={metal.name}
                  width={20}
                  height={20}
                  className='m-1 h-[20px] w-[20px] rounded-full'
                />
              </button>
            ))}
          </div>
        </div>

        {/* Metal purity */}
        <div className='flex items-center'>
          <label className='inline-block w-[140px] text-lg font-medium'>
            Metal Purity :
          </label>
          <div className='flex gap-2'>
            {metalPurities.map((purity) => (
              <button
                key={purity}
                onClick={() => setSelectedPurity(purity)}
                className={cn(
                  selectedPurity === purity ? 'border-black' : '',
                  'rounded-sm border px-4 py-1 text-base'
                )}
              >
                {purity}
              </button>
            ))}
          </div>
        </div>
        <hr />
      </div>

      {/* Diamond Shape */}
      {(isRing === true || isDiamondBased === true) &&
        Array.isArray(shapes) &&
        shapes.length > 0 && (
          <div className='border-b pt-2 pb-4'>
            <p className='text-lg font-medium'>Diamond Shape</p>
            <div className='mt-2 flex gap-2 text-[0.8rem]'>
              {shapes.map((shape) => (
                <button
                  key={shape.name}
                  className={cn(
                    'bg-secondary flex aspect-square w-[80px] flex-col items-center justify-center rounded-md border border-transparent transition',
                    selectedShape === shape.name ? 'border-black' : ''
                  )}
                  onClick={() => setSelectedShape(shape.name)}
                >
                  <Image
                    src={shape.imgUrl}
                    width={60}
                    height={60}
                    alt={shape.name}
                    className='h-3/4 w-3/4 object-contain'
                  />
                  <span className='mt-1 capitalize'>{shape.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

      {/* Shank */}
      {isRing && (
        <div className='pt-2 pb-6'>
          <p className='text-lg font-medium'>Shank</p>
          <div className='flex gap-2 text-[0.8rem]'>
            {shanks.map((shank) => (
              <button
                key={shank.name}
                className={cn(
                  'bg-secondary flex aspect-square w-[80px] flex-col items-center justify-center rounded-md border border-transparent transition',
                  selectedShank === shank.name ? 'border-black' : ''
                )}
                onClick={() => setSelectedShank(shank.name)}
              >
                <Image
                  src={shank.imgUrl}
                  width={30}
                  height={30}
                  alt={shank.name}
                  className='h-[30px] w-[30px] object-contain'
                />
                <span className='mt-1'>
                  {shank.name
                    ? shank.name.charAt(0).toUpperCase() + shank.name.slice(1)
                    : ''}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className='xs:p-0 pt-3'>
        {/* See It Live Section */}
        <div className='bg-secondary xs:pb-0 mb-6 flex items-center gap-2 rounded-lg p-1 pb-3 sm:gap-6 sm:p-4 md:items-start'>
          <Image
            src='/img/live-consultation.png'
            alt='Live Consultant'
            width={120}
            height={80}
            className='h-[80px] w-[120px] rounded-sm md:h-[120px] md:w-[180px]'
          />
          <div className='flex-1'>
            <h3 className='text-sm font-medium md:text-xl'>
              See it before you Buy it
            </h3>
            <p className='mb-2 text-xs font-light sm:mb-3 md:text-sm'>
              Join live video call with our consultants to see the designs up
              close
            </p>
            <Button
              className='h-[30px] w-[130px] rounded-full text-xs md:h-auto md:text-sm'
              onClick={() => setOpenMeeting(true)}
            >
              See it Live <TbVideoPlus />
            </Button>
          </div>
          <hr />
        </div>
        <ScheduleCallDialog open={openMeeting} setOpen={setOpenMeeting} />
        <div className='mb-6 flex flex-col gap-3 sm:items-center md:flex-row lg:flex-col'>
          {/* Add to Cart */}
          <div className='grid w-full grid-cols-2 gap-2 md:w-1/2 lg:w-full'>
            <Button
              variant='outline'
              className='h-10 gap-4 rounded-lg border border-black text-base lg:h-12 lg:text-lg'
              onClick={handleAddToCart}
            >
              <AiOutlineShoppingCart className='size-6' />
              Add to Cart
            </Button>
            <Button
              className='h-10 gap-4 rounded-lg text-base lg:h-12 lg:text-lg'
              onClick={handleAddToCart}
            >
              <ShoppingBag className='size-6' /> Buy Now
            </Button>
          </div>
          <div className='xs:gap-2 flex w-full items-center gap-1 md:w-1/2 lg:w-full'>
            <Button
              className='h-10 flex-1 gap-4 rounded-lg text-base lg:h-12 lg:text-lg'
              onClick={handleAddToCart}
            >
              <FaWhatsapp className='mr- size-6' /> Chat With Experts
            </Button>

            {/* <button
              className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 flex-1 items-center justify-center rounded-lg px-3 text-base text-nowrap lg:h-12 lg:text-lg'
              onClick={handleAddToCart}
            >
              <FaWhatsapp className='mr- size-6' /> Chat With Experts
            </button> */}

            {/* Add to Wishlist */}
            <button
              onClick={handleAddToWishlist}
              className='hover:bg-muted flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white transition md:h-10 md:w-10'
            >
              <Heart className='h-4 w-4 md:h-5 md:w-5' strokeWidth={1.6} />
            </button>
            <ShareButton url={window.location.href} />
          </div>
        </div>
      </div>
      {/* warranty details grid */}
      <div className='bg-secondary grid grid-cols-3 rounded-md p-2 text-sm sm:p-4 md:gap-4 md:text-lg'>
        {icons.map((icon) => (
          <div
            key={icon.label}
            className='flex flex-col items-center justify-center gap-2 border-black px-2 not-last:border-r'
          >
            <Image
              src={icon.src}
              width={40}
              height={40}
              alt={icon.label}
              className='h-[60px]'
            />
            <p className='w-full text-center leading-4 md:leading-6 xl:w-2/3'>
              {icon.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
