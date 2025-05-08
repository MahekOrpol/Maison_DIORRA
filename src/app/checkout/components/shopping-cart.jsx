'use client';

import CallToAction from '@/components/call-to-action';
import { ScheduleCallDialog } from '@/components/modals/schedule-meeting-modal';
import RelatedProducts from '@/components/related-products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCheckoutStore } from '@/lib/checkout-store';
import { cn } from '@/lib/utils';
import { BadgePercent, MoveRight, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiVideoPlus } from 'react-icons/bi';
import { BsHandbagFill } from 'react-icons/bs';

const ShoppingCart = ({ onNext }) => {
  const { cart, setCart } = useCheckoutStore();
  const [openMeeting, setOpenMeeting] = useState(false);

  const pricingItems = [
    { label: 'Subtotal', value: '40,000' },
    { label: 'You saved', value: '8,000', isDiscount: true },
    { label: 'Coupon Discount', value: 'Apply Coupon', isEditable: true },
    { label: 'Shipping (Standard)', value: 'Free' }
  ];

  const handleCouponApply = (code) => {
    console.log('Applying coupon:', code);
    // Add your coupon logic here
  };

  return (
    <>
      <section className='flex w-full flex-col justify-between gap-4 lg:flex-row'>
        {/* form */}
        <div className='w-full flex-1 lg:max-w-[70%]'>
          <div className='bg-secondary xs:flex-row xs:gap-2 mb-6 flex flex-col items-center justify-center rounded-lg px-2 py-4 text-center sm:gap-6 sm:p-6 sm:text-left'>
            <div className='flex-1'>
              <h3 className='font-medium sm:text-lg md:text-xl'>
                See it before you Buy it
              </h3>
              <p className='mb-2 text-sm font-light sm:mb-3 md:text-sm'>
                Join live video call with our consultants to see the designs up
                close
              </p>
            </div>
            <button className='bg-primary text-primary-foreground inline-flex items-center justify-center gap-2 rounded-md px-4 py-[6px] sm:py-2' onClick={() => setOpenMeeting(true)}>
              See it Live
              <BiVideoPlus className='h-6 w-6' strokeWidth={0.1} />
            </button>
          </div>
          {/* Cart section */}
          <CartContainer cart={cart} setCart={setCart} />
        </div>
        <ScheduleCallDialog open={openMeeting} setOpen={setOpenMeeting} />
        {/* order amount */}
        <div className='flex w-full flex-col gap-4 py-4 lg:max-w-sm lg:py-0'>
          <div className='bg-secondary flex items-center gap-4 rounded-lg px-4 py-2'>
            <BadgePercent />
            <p>Apply Coupon</p>
            <button
              type='button'
              className='ml-auto rounded-full bg-black p-1.5 text-white'
            >
              <MoveRight className='h-5 w-5' />
            </button>
          </div>
          {cart.length > 0 && (
            <PricingDetails
              items={pricingItems}
              total='40,000'
              onCouponApply={handleCouponApply}
              className='px-4'
            />
          )}
          {/* Navigation Buttons */}

          <button
            onClick={onNext}
            disabled={cart.length === 0}
            className='py-disabled:bg-gray-400 bg-primary text-primary-foreground w-full rounded-md px-6 py-2'
          >
            Select Address
          </button>
        </div>
      </section>
      {/* other content */}
      <RelatedProducts className='mt-2 md:mt-6 xl:mt-8' />
      <CallToAction />
    </>
  );
};

export default ShoppingCart;

export function PricingDetails({
  items,
  total,
  currency = '$',
  onCouponApply,
  className
}) {
  return (
    <div
      className={cn(
        'w-full rounded-lg border-[0.2px] border-black/60 p-3 xs:p-6',
        className
      )}
    >
      <h3 className='mb-4 text-lg lg:text-xl font-semibold underline underline-offset-6'>
        Pricing Details
      </h3>

      <div className='space-y-3'>
        {items.map((item, index) => (
          <div key={index} className='flex justify-between'>
            <span className='text-base'>{item.label}</span>
            <span
              className={`text-base font-medium ${item.isDiscount ? '' : ''
                }`}
            >
              {item.isDiscount && '-'}
              {currency}
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className='my-4 border-t pt-4'>
        <div className='flex justify-between'>
          <span className='font-medium text-lg'>Total Cost</span>
          <span className='text-lg font-bold'>
            {currency}
            {total}
          </span>
        </div>
      </div>
    </div>
  );
}

function CartContainer({ cart, setCart }) {
  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  return (
    <div>
      {cart.length > 0 && (
        <div className='hidden justify-between border-b pb-2 xl:font-bold text-sm xl:text-lg sm:flex'>
          <div className='w-[60%] pl-[118px]'>PRODUCTS</div>
          <div className='grid w-[38%] grid-cols-3 gap-2'>
            <p>QUANTITY</p>
            <p className='col-span-2'>SUBTOTAL</p>
          </div>
        </div>
      )}
      <div className='mb-4 w-full text-center text-2xl font-semibold sm:hidden'>
        Cart Products
      </div>
      {cart.length === 0 ? (
        <div className='mt-4 flex flex-col items-center justify-center gap-4 pt-4'>
          <div className='rounded-full bg-gray-200 p-3'>
            <BsHandbagFill size={20} />
          </div>
          <p className='text-muted-foreground text-lg'>Your cart is empty.</p>
          <div className='flex gap-2 sm:gap-4'>
            <Link
              href='/products'
              className='hover:bg-primary hover:text-primary-foreground inline-block rounded-md border border-black px-6 py-3 text-xs sm:px-9 sm:py-3 sm:text-lg'
            >
              Continue Shopping
            </Link>
            <Link
              href='/products'
              className='bg-primary text-primary-foreground inline-block rounded-md border border-black px-6 py-3 text-xs sm:px-9 sm:py-3 sm:text-lg'
            >
              Add products to your cart
            </Link>
          </div>
        </div>
      ) : (
        <div className='space-y-4 border sm:border-none p-3'>
          {cart.map((item) => (
            <div
              key={item.id}
              className='xs:p-2 flex flex-col justify-between rounded-md not-last:border-b sm:flex-row sm:p-4 md:items-center'
            >
              <div className='mb-2 flex gap-2 sm:w-[60%] md:gap-4'>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className='h-20 w-20 lg:h-24 lgw-24 rounded-md shadow-[0px_0px_3px_1px_rgba(0,_0,_0,_0.1)]'
                />
                <div className='flex flex-col justify-between'>
                  <span className='text-muted-foreground text-sm md:text-base font-medium'>
                    {item.category}
                  </span>
                  <p className='line-clamp-1 font-medium text-base md:text-xl'>
                    {item.name}
                  </p>
                  <span className=''>$ {item.price}</span>
                </div>
              </div>

              <div className='grid grid-cols-3 gap-2 border-t pt-3 sm:w-[38%] sm:border-none sm:pt-0'>
                <div className='col-span-1 flex items-center'>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className='bg-primary text-primary-foreground inline-flex h-5 w-5 items-center justify-center rounded-full text-xl leading-4'
                  >
                    -
                  </button>
                  <span className='inline-block w-[40px] text-center'>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className='bg-primary text-primary-foreground inline-flex h-5 w-5 items-center justify-center rounded-full text-xl leading-4'
                  >
                    +
                  </button>
                </div>
                <div className='col-span-2 flex items-center justify-between gap-2'>
                  <span className='text-lg text-nowrap'>
                    $ {item.price.toFixed(2)}
                  </span>
                  <button onClick={() => removeItem(item.id)} className=''>
                    <Trash size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
