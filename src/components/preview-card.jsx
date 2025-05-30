'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBagIcon, X } from 'lucide-react';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { baseApiUrl, cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from './ui/drawer';
import ProductGallery, {
  MobileGallery
} from '@/app/(storefront)/products/[category]/[productid]/product-gallery';
import { useRouter } from 'nextjs-toploader/app';
import { useModalStore } from '@/store/modal-stote';
import { toast } from 'sonner';
import { useUserStore } from '@/store/user-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { useWindowWidth, truncateText } from '@/hooks/useWindowWidth';
export default function PreviewCard({
  product,
  className,
  isDraggable = true
}) {
  const [selectedMetal, setSelectedMetal] = useState(
    product?.variations?.[0].metalVariations?.[0]
  );
  const [isProductClicked, setIsProductClicked] = useState(false);
  const [isClientMobile, setIsClientMobile] = useState(false);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const openModal = useModalStore((state) => state.openModal);
  const router = useRouter();
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [liked, setLiked] = useState(
    wishlist?.some((item) => item.product._id === product._id)
  );
  const BASE_URL = baseApiUrl || 'http://153.92.222.195:5000';
  // console.log('product', product);
  // console.log('wishlist', wishlist);
  // Fix: Reset metal when product changes
  useEffect(() => {
    setSelectedMetal(product?.variations?.[0].metalVariations?.[0]);
  }, [product]);
  useEffect(() => {
    const handleResize = () => {
      setIsClientMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleProductClick = () => {
    if (isClientMobile) {
      setIsProductClicked(true);
    } else {
      console.log(selectedMetal);
      router.push(
        `/products/${product?.categoryName}/${product._id}?metal=${selectedMetal.metal}&mv=${selectedMetal._id}`
        // `/products/${product?.categoryName}/${product._id}`
      );
    }
  };
  const handleAddToCart = async () => {
    const accessToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;
    if (accessToken) {
      router.push('/checkout');
    } else {
      openModal('cartNotAllowed');
    }
  };
  if (!product || !selectedMetal) return null;
  const handleFavoriteClick = async () => {
    const { isLoggedIn, authUser } = useUserStore.getState();
    const { wishlist } = useWishlistStore.getState();
    if (!isLoggedIn || !authUser) {
      openModal('wishlistNotAllowed');
      return;
    }
    const userId = authUser.id;
    const productId = product._id;
    const isWishlisted = wishlist.some(
      (item) => item.product?._id === productId
    );
    const wishlistItem = wishlist.find(
      (item) => item.product?._id === productId
    );
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
          selectedMetal: selectedMetal?.metal || null
        })
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('Wishlist API error:', data.message);
        toast.error(data.message || 'Failed to update wishlist');
        return;
      }
      setLiked(!isWishlisted);
      // Re-hydrate wishlist from backend after update
      await useWishlistStore.getState().fetchWishlist();
      // UI toggle only
    } catch (err) {
      console.error('Wishlist error:', err);
      toast.error('Something went wrong while updating wishlist');
    } finally {
      setIsWishlistLoading(false);
    }
  };
  const getMetalColor = (metal) => {
    if (!metal) return '#ccc';
    const name = metal.toLowerCase();
    if (name.includes('rose'))
      return 'linear-gradient(135deg, #b76e79, #e5a3a3)';
    if (name.includes('white'))
      return 'linear-gradient(135deg, #e0e0e0, #f8f8f8)';
    if (name.includes('gold'))
      return 'linear-gradient(135deg, #d4af37, #f5d76e)';
    return '#ccc'; // fallback gray
  };

  const width = useWindowWidth();
  const maxChars =
    width < 360
      ? 17
      : width < 500
        ? 20
        : width < 640
          ? 22
          : width < 1024
            ? 30
            : width < 1440
              ? 50
              : 60; // Default for large screens

  return (
    <>
      <Card
        className={cn(
          'group relative justify-between gap-0 overflow-hidden rounded-xl border border-black pt-0 pb-2 shadow transition-transform duration-300 hover:border-black hover:shadow-xl sm:border-2 sm:border-gray-400',
          className
        )}
      >
        {/* Wishlist Button */}
        <button
          onClick={handleFavoriteClick}
          disabled={isWishlistLoading}
          className='hover:bg-primary/4 group/heart absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow shadow-gray-400 xl:top-3 xl:right-3'
        >
          <Heart
            className={cn(
              'xs:h-5 xs:w-5 h-4 w-4 transition-colors group-hover/heart:fill-white',
              liked
                ? 'fill-primary text-primary group-hover/heart:fill-primary'
                : 'text-black'
            )}
          />
        </button>
        <Carousel
          key={selectedMetal.metal}
          opts={{
            align: 'start',
            loop: false,
            watchDrag: isDraggable
          }}
          className='relative w-full border-b'
        >
          <CarouselContent className='ml-0 aspect-[1/1] w-full gap-0'>
            {selectedMetal.images
              .filter((img) => !img.match(/\.(mp4|webm|mov)$/i)) // exclude video files
              .map((image, index) => (
                <CarouselItem
                  key={index}
                  onClick={handleProductClick}
                  className='h-full w-full basis-full cursor-pointer pl-0'
                >
                  <Image
                    src={baseApiUrl + image}
                    alt={'Product image'}
                    width={300}
                    height={300}
                    className='h-full w-full object-cover object-center'
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          <div className='3xl:-bottom-[-4.9%] absolute bottom-3.25 left-[50%] z-10 flex -translate-x-1/2 items-center gap-1 2xl:bottom-4'>
            <CarouselPrevious className='h-7 w-7 translate-x-4 rounded-full border-none bg-white/80 text-gray-600 transition hover:bg-white 2xl:h-8 2xl:w-8 2xl:translate-x-4' />
            <CarouselNext className='h-7 w-7 -translate-x-4 rounded-full border-none bg-white/80 text-gray-600 transition hover:bg-white 2xl:h-8 2xl:w-8' />
          </div>
        </Carousel>
        <CardContent className='xs:px-2 w-full space-y-1 px-1 sm:space-y-2 xl:px-4 xl:pb-2'>
          <div className='flex items-center justify-between pt-2 xl:pt-5'>
            <div className='flex gap-1 sm:gap-2'>
              <p className='3xl:text-2xl leading-1 font-medium sm:text-[22px] lg:text-xl'>
                ${parseFloat(product.salePrice.$numberDecimal)}
              </p>
              <span className='xs2:block hidden text-xs leading-1 font-normal text-[#958F86] line-through sm:text-base xl:text-lg'>
                ${parseFloat(product.regularPrice.$numberDecimal)}
              </span>
            </div>
            <div className='flex gap-0.5 lg:gap-1'>
              {product?.variations?.[0].metalVariations.map((variant) => {
                const isSelected = variant.metal === selectedMetal.metal;
                return (
                  <button
                    key={variant.metal}
                    onClick={() => setSelectedMetal(variant)}
                    className={cn(
                      'h-4.5 w-4.5 rounded-full border border-white hover:outline hover:outline-offset-2 sm:h-5.25 sm:w-5.25',
                      isSelected ? 'ring-primary/40 ring-offset-0.5 ring' : ''
                    )}
                    style={{
                      background: getMetalColor(variant.metal)
                    }}
                  />
                );
              })}
            </div>
          </div>
          <p className='xs:text-base 3xl:text-xl mb-2 block text-left text-sm font-light text-gray-900 sm:text-lg xl:font-normal'>
            <button
              onClick={handleProductClick}
              className='!line-clamp-1 block w-full text-left'
            >
              {truncateText(product.productName || '', maxChars)}
            </button>
          </p>
          <Button
            className='xs:text-base xs:h-9 3xl:h-12 3xl:text-xl mt-auto h-8 w-full text-sm lg:h-10'
            onClick={handleAddToCart}
          >
            Add to Cart{' '}
            <ShoppingBagIcon size={20} className='ml-2 stroke-1 xl:size-6' />
          </Button>
        </CardContent>
      </Card>
      {/* Mobile Drawer */}
      {isClientMobile && (
        <Drawer
          open={isProductClicked}
          onOpenChange={setIsProductClicked}
          className='overflow-y-auto rounded-t-xl px-4 pb-1'
        >
          <DrawerContent className=''>
            <DrawerHeader className='relative p-0'>
              <DrawerTitle className='wrapper absolute top-3 z-10 flex justify-between border-none'>
                <button
                  onClick={() => setLiked(!liked)}
                  className='group hover:bg-secondary h-8 rounded-full bg-white p-1 shadow shadow-gray-400 transition-all hover:scale-110'
                  aria-label='Add to wishlist'
                >
                  <FaHeart
                    className={`h-4 w-6 transition-colors duration-300 ${
                      liked
                        ? 'fill-primary stroke-[20] text-white'
                        : 'fill-white stroke-[30] text-black'
                    }`}
                  />
                </button>
                <DrawerClose className='flex h-7 w-7 items-center justify-center rounded-full bg-[#D9D9D9] transition focus:scale-105'>
                  <X size={20} />
                </DrawerClose>
              </DrawerTitle>
              <MobileGallery
                media={selectedMetal.images}
                media360={selectedMetal.view360}
              />
            </DrawerHeader>
            <DrawerFooter className='pt-2'>
              <div className=''>
                <div className='mb-1 flex justify-between text-lg font-medium'>
                  <div>
                    <p>{product.productName}</p>
                    <p>
                      <span className=''>
                        ${parseFloat(product.salePrice.$numberDecimal)}
                      </span>{' '}
                      <span className='text-muted-foreground pl-2 text-sm line-through'>
                        ${parseFloat(product.regularPrice.$numberDecimal)}
                      </span>
                    </p>
                  </div>
                  <Image
                    src='/icons/hand.svg'
                    alt='hand icon'
                    height={30}
                    width={30}
                  />
                </div>
                <div className='grid grid-cols-3 gap-3 text-sm'>
                  <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border border-transparent px-3 pt-4 pb-2 transition focus:border-black'>
                    <Image
                      src={`/icons/shape-pear.svg`}
                      width={40}
                      height={40}
                      alt='diamond shape'
                    />
                    Pear
                  </button>
                  <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border border-transparent px-3 pt-4 pb-2 transition focus:border-black'>
                    <Image
                      src={`/img/gold-theme.png`}
                      width={30}
                      height={30}
                      alt='theme'
                    />
                    {selectedMetal.metal}
                  </button>
                  <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border border-transparent px-3 pt-4 pb-2 transition focus:border-black'>
                    <Image
                      src={`/icons/ring-style-solitare.svg`}
                      width={50}
                      height={40}
                      alt='shank style'
                    />
                    Solitaire
                  </button>
                </div>
                <div className='mt-4 mb-1 flex items-stretch gap-3'>
                  <Link
                    href={`/products/${product?.categoryName}/${product._id}?metal=${selectedMetal.metal}&metalVariation=${selectedMetal._id}`}
                    onClick={() => setIsProductClicked(false)}
                    className='relative inline-block h-[40px] overflow-hidden rounded-md border border-black bg-white px-4 py-2 text-base text-black transition-colors duration-400'
                  >
                    More info
                  </Link>
                  <Button
                    size='lg'
                    className='flex-1 border border-black'
                    onClick={handleAddToCart}
                  >
                    Add to Cart <ShoppingBagIcon size={20} />
                  </Button>
                </div>
                <p className='text-center text-xs'>
                  Installments starting at ₹5,000 per month.{' '}
                  <Link href='#' className='font-medium underline'>
                    Prequalify now
                  </Link>
                </p>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
