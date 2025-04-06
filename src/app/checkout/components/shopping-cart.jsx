'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCheckoutStore } from '@/lib/checkout-store';
import { BadgePercent, MoveRight, Trash } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { TbVideoPlus } from 'react-icons/tb';

const ShoppingCart = ({ onNext }) => {
  const { cart, setCart } = useCheckoutStore();

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

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
    <section className='wrapper flex flex-col gap-4 lg:flex-row'>
      <div>
        <div className='bg-secondary mb-6 flex items-center gap-2 rounded-lg p-1 sm:gap-6 sm:p-4'>
          <div className='flex-1'>
            <h3 className='text-sm font-medium md:text-xl'>
              See it before you Buy it
            </h3>
            <p className='mb-2 text-xs font-light sm:mb-3 md:text-sm'>
              Join live video call with our consultants to see the designs up
              close
            </p>
          </div>
          <Button
            variant='outline'
            className='h-[30px] w-[130px] rounded-lg bg-black text-xs text-white md:h-auto md:text-sm'
          >
            See it Live <TbVideoPlus />
          </Button>
        </div>

        <div>
          <div className='flex justify-between'>
            <div className='pl-[118px]'>PRODUCTS</div>
            <div>
              <span>QUANTITY</span> <span>SUBTOTAL</span>
            </div>
          </div>
          {cart.length === 0 ? (
            <p className='text-gray-500'>Your cart is empty.</p>
          ) : (
            <div className='space-y-4'>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center justify-between border-b pb-4'
                >
                  <div className='flex items-center gap-4'>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className='rounded-md'
                    />
                    <div>
                      <p className='font-semibold'>{item.name}</p>
                    </div>
                  </div>

                  <div className='flex items-center gap-4'>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className='rounded-md border px-2 py-1'
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className='rounded-md border px-2 py-1'
                    >
                      +
                    </button>
                    <span className='text-gray-500'>
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className='text-red-500'
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='bg-secondary flex items-center gap-4 rounded-lg px-4 py-2'>
          <BadgePercent />
          <p>Apply Coupon</p>
          <button
            type='button'
            className='ml-auto rounded-full bg-black p-1.5 text-white'
          >
            <MoveRight size={20} />
          </button>
        </div>
        <PricingDetails
          items={pricingItems}
          total='40,000'
          onCouponApply={handleCouponApply}
        />
        {/* Navigation Buttons */}

        <button
          onClick={onNext}
          disabled={cart.length === 0}
          className='w-full rounded-md bg-black px-6 py-3 text-white disabled:bg-gray-400'
        >
          Select Address
        </button>
      </div>
    </section>
  );
};

export default ShoppingCart;

export function PricingDetails({
  items,
  total,
  currency = '$',
  onCouponApply
}) {
  const [couponCode, setCouponCode] = useState('');

  return (
    <div className='w-full rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-900'>
      <h3 className='mb-4 text-lg font-semibold'>Pricing Details</h3>

      <div className='space-y-3'>
        {items.map((item, index) => (
          <div key={index} className='flex justify-between'>
            <span className='text-sm text-gray-600 dark:text-gray-400'>
              {item.label}
            </span>

            {item.isEditable ? (
              <div className='flex gap-2'>
                <Input
                  type='text'
                  placeholder='Coupon code'
                  className='h-8 w-32 text-sm'
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => onCouponApply?.(couponCode)}
                >
                  Apply
                </Button>
              </div>
            ) : (
              <span
                className={`text-sm font-medium ${
                  item.isDiscount ? 'text-green-600 dark:text-green-400' : ''
                }`}
              >
                {item.isDiscount && '-'}
                {currency}
                {item.value}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className='my-4 border-t pt-4'>
        <div className='flex justify-between'>
          <span className='font-medium'>Total Cost</span>
          <span className='text-lg font-bold'>
            {currency}
            {total}
          </span>
        </div>
      </div>
    </div>
  );
}
