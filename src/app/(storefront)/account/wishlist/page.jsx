'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PreviewCard from '@/components/preview-card';
import axios from 'axios';
import { toast } from 'sonner';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          toast.error('Please login to view your wishlist');
          setWishlistItems([]);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/wishlist/68222813af0c3e6e042a5b06`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        setWishlistItems(response.data?.data || []);
        console.log(response.data.data)
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        toast.error(error.response?.data?.message || 'Failed to load wishlist. Please try again.');
        setWishlistItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const transformProductData = (item) => {
    // Find the matching variation based on selected metal and size
    const matchingVariation = item.product?.variations?.[0]?.metalVariations?.find(
      metalVar => metalVar.metal === item.selectedMetal
    );
    
    const matchingSize = matchingVariation?.ringSizes?.find(
      size => size.productSize === item.selectedSize
    );

    return {
      id: item._id,
      productId: item.product?._id,
      image: item.product?.thumbnail || '/img/default-product.jpg',
      title: item.product?.productName || 'Unknown Product',
      price: item.price?.$numberDecimal || matchingSize?.salePrice?.$numberDecimal || '0',
      originalPrice: matchingSize?.regularPrice?.$numberDecimal || '0',
      offer: item.product?.discount ? `${item.product.discount.$numberDecimal}% off` : 'No offer',
      tag: 'In Wishlist',
      selectedMetal: item.selectedMetal,
      selectedSize: item.selectedSize,
      selectedDiamondShape: item.selectedDiamondShape?.name,
      selectedShank: item.selectedShank?.name,
      productData: item
    };
  };

  const removeFromWishlist = async (itemId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/wishlist/${itemId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setWishlistItems(prev => prev.filter(item => item._id !== itemId));
      toast.success('Item removed from wishlist');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item from wishlist');
    }
  };

  if (isLoading) {
    return (
      <div className="sm:wrapper pt-4 pb-10">
        <div className="flex h-[50vh] items-center justify-center">
          <p>Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='sm:wrapper pt-4 pb-10'>
      {wishlistItems.length === 0 ? (
        <div className='flex h-[50vh] flex-col items-center justify-center'>
          <div className='w-[120px] sm:w-[170px]'>
            <img src={'/img/wishlist.jpg'} alt="Empty wishlist" />
          </div>
          <p className='text-muted-foreground text-sm sm:text-xl'>
            YOUR WISHLIST IS EMPTY.
          </p>
          <div className='flex gap-1 pt-3 sm:gap-4'>
            <Link
              href='/products/rings'
              className='hover:bg-primary hover:text-primary-foreground inline-block rounded-md border border-black px-6 py-3 text-xs sm:px-9 sm:py-3 sm:text-lg'
            >
              Continue Shopping
            </Link>
            <Link
              href='/products/rings'
              className='bg-primary text-primary-foreground inline-block rounded-md border border-black px-6 py-3 text-xs sm:px-9 sm:py-3 sm:text-lg'
            >
              Add products to your cart
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h1 className='mb-4 text-2xl sm:text-3xl font-bold md:mb-6 underline'>Your Wishlist</h1>
          <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 lg:gap-6'>
            {wishlistItems.map((item) => {
              const product = transformProductData(item);
              return (
                <div
                  key={item._id}
                  className='keen-slider__slide overflow-hidden rounded-xl'
                >
                  <PreviewCard 
                    isDraggable={false} 
                    product={product} 
                    isWishlistItem={true}
                    onRemoveFromWishlist={() => removeFromWishlist(item._id)}
                    customFields={[
                      { label: 'Metal', value: product.selectedMetal },
                      { label: 'Size', value: product.selectedSize },
                      { label: 'Diamond Shape', value: product.selectedDiamondShape },
                      { label: 'Shank', value: product.selectedShank }
                    ]}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}