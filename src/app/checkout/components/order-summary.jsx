'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import Image from 'next/image';
import { CircleHelp } from 'lucide-react';

export function OrderSummary({
  items,
  subtotal,
  shipping,
  taxes,
  total,
  onApplyDiscount,
  onProceedToPay,
  onEnterShipping
}) {
  const [discountCode, setDiscountCode] = useState('');

  return (
    <div className='bg-card rounded-lg border p-2 shadow-sm md:p-6'>
      <h2 className='xs:mb-4 mb-2 text-xl font-bold md:text-2xl'>Your Order</h2>

      {/* Order Items */}
      <div className='sapce-y-3 mb-6 md:space-y-6'>
        {items.map((item) => (
          <div key={item.id} className='mb-2 space-y-2'>
            <div className='flex justify-between gap-2 xl:gap-4'>
              <Image
                src={item.imgUrl}
                alt={item.name}
                width={140}
                height={140}
                className='h-26 w-26 rounded-md shadow-[0px_0px_3px_1px_rgba(0,_0,_0,_0.1)]'
              />
              <div className='flex-1'>
                <h3 className='line-clamp-1 leading-5 font-medium'>
                  {item.name}
                </h3>
                <p className='text-muted-foreground text-sm'>{item.variant}</p>
                {item.size && (
                  <p className='text-muted-foreground text-sm'>
                    {' '}
                    Ring Size: {item.size}
                  </p>
                )}
                <p className='text-right font-medium sm:hidden'>
                  ${item.price}
                </p>
              </div>
              <p className='hidden font-medium sm:block'>${item.price}</p>
            </div>
            <hr />
          </div>
        ))}
      </div>

      {/* Discount Code */}
      <div className='flex gap-2'>
        <Input
          placeholder='Discount code'
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className='flex-1'
        />
        <Button
          variant='outline'
          onClick={() => onApplyDiscount?.(discountCode)}
        >
          Apply
        </Button>
      </div>

      {/* Order Totals */}
      <div className='mt-6 mb-2 space-y-1 sm:my-10 sm:space-y-2'>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>
            Subtotal • {items.length} Items
          </span>
          <span>${subtotal}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>
            Shipping{' '}
            <button onClick={onEnterShipping}>
              <CircleHelp className='inline h-5 w-5' />
            </button>
          </span>
          <span className='text-green-600'>${shipping}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>GST and Taxes 10 %</span>
          <span>${taxes}</span>
        </div>
        <hr className='my-2 border-b-[0.5px] border-black/50' />
        <div className='flex justify-between text-xl font-semibold sm:text-2xl'>
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      {/* Payment Button */}
      {onProceedToPay && (
        <Button
          className='my-2 w-full text-base hidden lg:flex'
          size='lg'
          onClick={onProceedToPay}
        >
          Proceed to Pay
        </Button>
      )}
    </div>
  );
}
