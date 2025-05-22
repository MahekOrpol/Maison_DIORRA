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
import { Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { TbVideoPlus } from 'react-icons/tb';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';
import { ScheduleCallDialog } from '@/components/modals/schedule-meeting-modal';
import ShareButton from '@/app/checkout/components/share-button';
import { toast } from 'sonner';
import { useUserStore } from '@/store/user-store';
import { useWishlistStore } from '@/store/wishlist-store';

const shapes = [
  { name: 'Round', imgUrl: '/icons/shape-round.svg' },
  { name: 'Pear', imgUrl: '/icons/shape-pear.svg' },
  { name: 'Emerald', imgUrl: '/icons/shape-emerald.svg' },
  { name: 'Princess', imgUrl: '/icons/shape-princess.svg' }
];
const shanks = [
  { name: 'Solitare', imgUrl: '/img/shapes/shank1.png' },
  { name: 'French pave', imgUrl: '/img/shapes/shank2.png' }
];
const icons = [
  { src: '/icons/badge.svg', label: 'Lifetime Warranty' },
  { src: '/icons/dollar-inhand.svg', label: '30 Days Free Return' },
  { src: '/icons/certificate.svg', label: 'Certificate & Appraisal' }
];
const metalPurityOptions = [
  { label: '14K White Gold', swatch: '#e0e0e0' },
  { label: '14K Gold', swatch: '#d4af37' },
  { label: '14K Rose Gold', swatch: '#e4a0a1' },
  { label: '18K White Gold', swatch: '#e0e0e0' },
  { label: '18K Gold', swatch: '#d4af37' },
  { label: '18K Rose Gold', swatch: '#e4a0a1' }
];
export default function ProductDetails({
  className,
  data,
  category,
  subcategory,
  availableMetals = []
}) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    metal: searchParams.get('metal') || '',
    style: searchParams.get('style') || '',
    diamondShape: searchParams.get('diamondShape') || '',
    sortByPrice: searchParams.get('sortByPrice') || ''
  });
  const [selectedSize, setSelectedSize] = useState(null);

  const [selectedShape, setSelectedShape] = useState(
    data?.selectedVariants?.diamondShape || ' '
  );
  const [selectedMetal, setSelectedMetal] = useState(
    data?.variations[0].metalVariations[0].metal
  );
  const [selectedShank, setSelectedShank] = useState(
    data?.selectedVariants?.shank || ' '
  );
  const [openMeeting, setOpenMeeting] = useState(false);

  const router = useRouter();
  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [liked, setLiked] = useState(
    wishlist?.some((item) => item.product._id === data._id)
  );

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    // Toggle logic: if value is already selected, remove it
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Update URL without full reload
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // const isRing = category === 'rings';
  const isRing = true;

  // const isDiamondBased = subcategory?.toLowerCase().includes('diamond');
  const isDiamondBased = true;

  // available filters --------------------------------------------
  const availableRingSizes =
    data?.variations[0].metalVariations[0].ringSizes || [];
  // const availableMetalPurities =
  //   data?.variations[0].metalVariations[0].metal || []; //dynamic
  const availableMetalPurities = metalPurityOptions.filter(
    (option) => availableMetals.some((m) => m.metal === option.label) //using available metals from parent
  );
  const availableDiamondShapes =
    data?.variations[0].metalVariations[0].diamondShape || [];
  const availableShanks = data?.variations[0].metalVariations[0].shank || [];
  const availableStyles = data?.variations[0].metalVariations[0].style || [];

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

  // Replace the existing handleFavoriteClick with this one:
  const handleFavoriteClick = async () => {
    const { isLoggedIn, authUser } = useUserStore.getState();
    const { wishlist } = useWishlistStore.getState();

    if (!isLoggedIn || !authUser) {
      openModal('wishlistNotAllowed');
      return;
    }

    const userId = authUser.id;
    const productId = data._id; // Changed from product._id to data.
    console.log(data._id)
    const isWishlisted = wishlist.some((item) => item.product?._id === productId);
    const wishlistItem = wishlist.find((item) => item.product?._id === productId);
    const wishlistItemId = wishlistItem?._id;

    setIsWishlistLoading(true);
    try {
      const res = await fetch(`/api/wishlist/${userId}`, {
        method: isWishlisted ? 'DELETE' : 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          productId,
          wishlistItemId,
          selectedMetal: selectedMetal || null // Changed from selectedMetal?.metal to selectedMetal
        })
      });

      const responseData = await res.json(); // Renamed to avoid conflict with the data prop
      if (!res.ok) {
        console.error('Wishlist API error:', responseData.message);
        toast.error(responseData.message || 'Failed to update wishlist');
        return;
      }

      setLiked(!isWishlisted);
      await useWishlistStore.getState().fetchWishlist();
      toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (err) {
      console.error('Wishlist error:', err);
      toast.error('Something went wrong while updating wishlist');
    } finally {
      setIsWishlistLoading(false);
    }
  };

  return (
    <section className={cn(className)}>
      <div>
        {/* Sale Badge */}
        <span className='bg-primary text-primary-foreground mb-2 inline-block rounded-full px-3 py-1 text-xs'>
          SAVE <span className='pl-1'>{parseFloat(data?.discount.$numberDecimal)}</span> %
        </span>
        {/* Product Title */}
        <div className='xs:pt-0 mb-3 flex gap-4 pt-2 relative'>
          <h1 className='flex-1 text-xl leading-6 font-medium sm:text-2xl sm:leading-8 md:text-3xl md:leading-10'>
            {data?.productName || 'Product name'}
          </h1>
          <Image src='/icons/hand.svg' alt='hand icon' height={36} width={36} className=' absolute sm:relative right-1.5 bottom-1' />
          {/* <GiBigDiamondRing className='h-5 w-5 sm:h-7 sm:w-7 lg:h-14 lg:w-14' /> */}
        </div>
        {/* Reviews */}
        <div className='xs:text-sm xs:gap-6 mb-2 flex items-center gap-2 text-xs text-nowrap min-[350px]:gap-5 sm:mb-2 md:gap-4 xl:gap-12 mt-2 sm:mt-0'>
          <span className='flex items-center'>
            {/* Star Rating Display */}
            <span className='flex items-center'>
              {[...Array(5)].map((_, i) => (
                <IoStarSharp
                  key={i}
                  className={cn(
                    'h-4 w-4 xl:h-5 xl:w-5',
                    i < Math.ceil(4) ? 'fill-yellow-400' : 'fill-gray-300'
                  )}
                />
              ))}
            </span>

            {/* Review Count or Add Review Button */}
            <span className='xs:ml-2 ml-1 md:text-base xl:text-lg'>
              {/* {!data?.reviews?.reviews?.length ? (
                <button
                  className='underline underline-offset-2 hover:no-underline'
                  onClick={() => {}}
                >
                  Add a review
                </button>
              ) : (
                <span>
                  {data?.reviews?.avgRating || 0}/5
                </span>
              )} */}
              4 / 5
            </span>
          </span>
          <span className='xs:text-sm md:text-base xl:text-lg'>
            SKU: {data?.sku}
          </span>
          <Badge
            variant='outline'
            className={cn(
              'xs:text-xs absolute right-0 rounded-full text-[10px] uppercase sm:relative xl:text-sm',
              selectedSize
                ? selectedSize.quantity > 0
                  ? 'me-2 border border-green-400 bg-green-100 px-2.5 py-0.5 text-green-800'
                  : 'me-2 border border-red-600 bg-red-100 px-2.5 py-0.5 text-red-800'
                : data?.stock.includes('In Stock')
                  ? 'me-2 border border-green-400 bg-green-100 px-2.5 py-0.5 text-green-800'
                  : 'me-2 border border-red-600 bg-red-100 px-2.5 py-0.5 text-red-800'
            )}
          >
            {selectedSize
              ? selectedSize.quantity > 0
                ? 'In Stock'
                : 'Out of Stock'
              : data?.stock}
          </Badge>
        </div>

        {/* Pricing */}
        <div className='mb-1 md:mb-2'>
          <span className='text-2xl font-semibold text-gray-900 lg:text-3xl'>
            ${' '}
            {parseFloat(
              selectedSize
                ? parseFloat(selectedSize?.salePrice.$numberDecimal)
                : data?.salePrice.$numberDecimal
            )}
          </span>
          <span className='text-muted-foreground ml-2 text-xl line-through'>
            ${' '}
            {parseFloat(
              selectedSize
                ? parseFloat(selectedSize?.regularPrice.$numberDecimal)
                : data?.regularPrice.$numberDecimal
            )}
          </span>
        </div>
        {/* Product Description */}
        <p className='xs:p-0 mb-3 pt-3 text-justify text-xs text-gray-700 sm:text-sm md:mb-6 lg:text-base'>
          {data?.productsDescription}
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
      <div className='pb-2 sm:pb-4'>
        <Select
          value={selectedSize?.productSize || ''}
          onValueChange={(value) => {
            const sizeObj = availableRingSizes.find(
              (size) => size.productSize === value
            );
            setSelectedSize(sizeObj || null);
          }}
        >
          <div className='flex gap-3 items-center'>
          <span className='text-xl font-medium'>Size:</span>
          <SelectTrigger className='bg-secondary data-[placeholder]:text-foreground w-[200px] font-light md:text-sm'>
            <SelectValue placeholder='Select Ring Size' />
          </SelectTrigger>
          </div>
          <SelectContent>
            {availableRingSizes.map((size) => (
              <SelectItem key={size._id} value={size.productSize}>
                {size.productSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* metal purity */}
      <div className='border-b pb-4 pt-2'>
        <p className='text-lg font-medium pb-1'>Metal & Purity :</p>
        <div className='xxs:grid-cols-3 xxs:max-w-[345px] mt-2 grid w-full grid-cols-2 gap-2'>
          {availableMetalPurities.map((item) => {
            const [purity, ...metalName] = item.label.split(' ');
            const isSelected = searchParams.get('metal') === item.label;

            return (
              <button
                key={item.label}
                onClick={() => {
                  handleFilterChange('metal', item.label);
                }}
                className={`bg-secondary flex items-center gap-2 rounded-md border px-3 py-3 text-left transition ${isSelected
                    ? 'border-black'
                    : 'border-transparent hover:border-black'
                  }`}
              >
                <div
                  className='h-4 w-4 shrink-0 rounded-full border border-gray-300'
                  style={{ backgroundColor: item.swatch }}
                />
                <div className='flex flex-col text-[11px] leading-tight'>
                  <span className='font-semibold'>{purity}</span>
                  <span className=''>{metalName.join(' ')}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Diamond Shape */}
      {(isRing === true || isDiamondBased === true) &&
        Array.isArray(shapes) &&
        shapes.length > 0 && (
          <div className='border-b pt-3 pb-4'>
            <p className='text-lg font-medium'>Diamond Shape :</p>
            <div className='mt-2 flex gap-2 text-[0.8rem]'>
              {availableDiamondShapes.map((shape) => (
                <button
                  key={shape.name}
                  className={cn(
                    'bg-secondary flex aspect-square w-[80px] flex-col items-center justify-center rounded-md border border-transparent transition hover:border-black',
                    searchParams.get('shape') === shape.name
                      ? 'border-black'
                      : ''
                  )}
                  onClick={() => handleFilterChange('shape', shape.name)}
                >
                  <Image
                    src={shape.image}
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
        <div className='pt-3 pb-6'>
          <p className='text-lg font-medium pb-1'>Shank :</p>
          <div className='flex gap-2 text-[0.8rem]'>
            {availableShanks.map((shank) => (
              <button
                key={shank.name}
                className={cn(
                  'bg-secondary flex aspect-square w-[80px] flex-col items-center justify-center rounded-md border border-transparent transition hover:border-black',
                  searchParams.get('shank') === shank.name ? 'border-black' : ''
                )}
                onClick={() => handleFilterChange('shank', shank.name)}
              >
                <Image
                  src={shank.image || '/img/shapes/shank1.png'}
                  width={30}
                  height={30}
                  alt={'Shank Icon'}
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

      <div className='pt-2 pb-6'>
        <p className='text-lg font-medium'>Styles</p>
        <div className='flex gap-2 text-[0.8rem]'>
          {availableStyles.map((style) => (
            <button
              key={style.name}
              className={cn(
                'bg-secondary flex aspect-square w-[80px] flex-col items-center justify-center rounded-md border border-transparent transition hover:border-black',
                searchParams.get('style') === style.name ? 'border-black' : ''
              )}
              onClick={() => handleFilterChange('style', style.name)}
            >
              <Image
                src={style.image}
                width={60}
                height={60}
                alt={'Shank Icon'}
                className='h-3/4 w-3/4 object-contain'
              />
              <span className='mt-1'>
                {style.name
                  ? style.name.charAt(0).toUpperCase() + style.name.slice(1)
                  : ''}
              </span>
            </button>
          ))}
        </div>
      </div>

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
              <FaWhatsapp className='mr- size-6' /> Order On Whatsapp
            </Button>

            {/* <button
              className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 flex-1 items-center justify-center rounded-lg px-3 text-base text-nowrap lg:h-12 lg:text-lg'
              onClick={handleAddToCart}
            >
              <FaWhatsapp className='mr- size-6' /> Chat With Experts
            </button> */}

            {/* Add to Wishlist */}
            <button
              onClick={handleFavoriteClick}
              disabled={isWishlistLoading}
              className='hover:bg-muted flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white transition md:h-10 md:w-10'
            >
              <Heart className={`h-4 w-4 md:h-5 md:w-5 transition-colors ${liked ? 'fill-primary text-primary' : 'text-black'
                }`}
                strokeWidth={1.6} />
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
