'use client';

import { useForm, FormProvider, useWatch } from 'react-hook-form';
import FloatingInput from '@/components/ui/floatingInput';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import AddressFields from '../address-fileds';

export default function CreditCardForm() {
  const methods = useForm({
    defaultValues: {
      billingSameAsShipping: true
    }
  });

  const billingSameAsShipping = useWatch({
    control: methods.control,
    name: 'billingSameAsShipping'
  });

  return (
    <FormProvider {...methods}>
      <form className='grid gap-3'>
        <FloatingInput
          name='cardNumber'
          label='Card Number'
          rules={{ required: 'Card number is required' }}
          className='h-12.5 bg-white'
        />

        <div className='grid grid-cols-2 gap-3'>
          <FloatingInput
            name='expiry'
            label='Expiry Date (MM/YY)'
            rules={{ required: 'Expiry date is required' }}
            className='h-12.5 bg-white'
          />
          <FloatingInput
            name='cvc'
            label='Security Code'
            rules={{ required: 'CVC is required' }}
            className='h-12.5 bg-white'
          />
        </div>

        <FloatingInput
          name='cardName'
          label='Name on Card'
          rules={{ required: 'Cardholder name is required' }}
          className='h-12.5 bg-white'
        />

        <div className='flex items-center space-x-2 pt-2'>
          <Input
            id='billingSameAsShipping'
            type='checkbox'
            {...methods.register('billingSameAsShipping')}
            className='inline h-4 w-4 rounded-sm text-white accent-black'
          />
          <label htmlFor='billingSameAsShipping' className='text-sm'>
            Use Shipping Address as Billing Address
          </label>
        </div>

        {!billingSameAsShipping && (
          <div className='mt-2 border-t pt-2'>
            <h3 className='mb-2 font-medium'>Billing Address</h3>
            <div className='space-y-3'>
              <AddressFields namePrefix='billing' bgcolor='bg-white' />
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}

// function BillingAddressForm() {
//   return (
//     <div className='mt-4 space-y-4 border-t pt-4'>
//       <h3 className='text-sm font-medium'>Billing Address</h3>
//       <FloatingInput
//         name='billingStreet'
//         label='Street Address'
//         rules={{ required: true }}
//       />
//       <div className='grid grid-cols-2 gap-4'>
//         <FloatingInput
//           name='billingCity'
//           label='City'
//           rules={{ required: true }}
//         />
//         <FloatingInput
//           name='billingZip'
//           label='ZIP Code'
//           rules={{ required: true }}
//         />
//       </div>
//     </div>
//   );
// }
