'use client';

import { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { OrderSummary } from './order-summary';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa6';
import { IoCall, IoMail } from 'react-icons/io5';
import { IoLogoWhatsapp } from 'react-icons/io';
import AddressFields from './address-fileds';

const orderItems = [
  {
    id: '1',
    name: 'Two Stone Diamond Ring',
    variant: '18k Silver / Round diamond',
    size: '3',
    price: '30,000',
    imgUrl: '/img/preview/ring1.png'
  },
  {
    id: '2',
    name: 'Two Stone Diamond Ring 2',
    variant: '22k Silver / Round diamond',
    size: '4',
    price: '30,000',
    imgUrl: '/img/preview/rose3.png'
  },
  {
    id: '3',
    name: 'Two Stone Diamond Ring lorem lorem lorem',
    variant: '18k Gold / Herald diamond',
    size: '16',
    price: '30,850',
    imgUrl: '/img/preview/gold1.png'
  }
];

export default function DeliveryForm({ onNext }) {
  const methods = useForm();
  const { control, handleSubmit, watch, setValue } = methods;

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const selectedCountry = watch('country');
  const selectedState = watch('state');

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1000;

  // Update states when country changes
  useEffect(() => {
    if (selectedCountry) {
      const result = State.getStatesOfCountry(selectedCountry);
      setStates(result);
      setValue('state', '');
      setValue('city', '');
      setCities([]);
    }
  }, [selectedCountry]);

  // Update cities when state changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const result = City.getCitiesOfState(selectedCountry, selectedState);
      setCities(result);
      setValue('city', '');
    }
  }, [selectedState]);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    onNext?.();
  };

  const handleApplyDiscount = (code) => {
    console.log('Applying discount code:', code);
    // Add your discount logic here
  };

  return (
    <>
      <div className='flex flex-col justify-between gap-[3%] min-[1000px]:flex-row 2xl:gap-[4%]'>
        {/* Order Summary - FIRST on mobile, LAST on desktop */}
        <div className='order-1 mb-4 w-full min-[1000px]:order-2 min-[1000px]:max-w-md xl:max-w-xl'>
          <OrderSummary
            items={orderItems}
            subtotal='90,850'
            shipping='Free'
            taxes='9,085'
            total='99,935'
            onApplyDiscount={handleApplyDiscount}
            onProceedToPay={isMobile ? false : onNext}
            onEnterShipping={() => console.log('Entering shipping address')}
          />
        </div>
        {/* Address Form - SECOND on mobile, FIRST on desktop */}
        <div className='order-2 mt-4 flex-1 min-[1000px]:order-1 min-[1000px]:mt-0'>
          <h2 className='mb-4 text-xl xl:text-3xl font-semibold'>
            Select Delivery Address
          </h2>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-wrap items-center justify-start gap-2 lg:max-w-4xl'
            >
              {/* shipping addrress ------------------------------ */}
              <AddressFields namePrefix='shipping' />
              <div className='w-full space-y-4'>
                {/* Save Address Buttons */}
                <div className='my-3'>
                  <input
                    type='hidden'
                    {...methods.register('addressType', {
                      required: 'Please select address type'
                    })}
                  />
                  <p className='mb-2'>Save Address as</p>
                  <div className='flex gap-4'>
                    <Button
                      type='button'
                      variant='outline'
                      className={`bg-secondary px-8 ${watch('addressType') === 'Home' ? 'border-black' : ''}`}
                      onClick={() => methods.setValue('addressType', 'Home')}
                    >
                      Home
                    </Button>
                    <Button
                      type='button'
                      variant='outline'
                      className={`bg-secondary px-8 ${watch('addressType') === 'Office' ? 'border-black' : ''}`}
                      onClick={() => methods.setValue('addressType', 'Office')}
                    >
                      Office
                    </Button>
                  </div>
                  {methods.formState.errors.addressType && (
                    <p className='mt-1 text-sm text-red-500'>
                      {methods.formState.errors.addressType.message}
                    </p>
                  )}
                </div>

                {/* Save for future */}
                <div className='flex items-center gap-2'>
                  <Input
                    type='checkbox'
                    name='saveAddress'
                    className='h-5 w-5 rounded-sm accent-black'
                    {...methods.register('saveAddress')}
                  />
                  <label htmlFor='saveAddress' className='text-sm font-medium'>
                    Save this address for future reference
                  </label>
                </div>

                {/* Submit */}
                <Button
                  variant={'secondary'}
                  className='h-10 w-full lg:w-64 bg-secondary lg:bg-black text-black lg:text-white border border-gray-400 py-2 text-lg font-light'
                  type='submit'
                >
                  Save Address
                </Button>
              </div>
              <Button
                className='my-2 w-full text-base min-[1000px]:hidden'
                size='lg'
                onClick={onNext}
              >
                Proceed to Pay
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>

      {/* Need help CTA */}
      <div className='mt-10 flex flex-col items-center justify-center text-center md:mt-16'>
        <div>
          <p className='mb-4 text-3xl font-medium md:text-5xl'>Need Help?</p>
          <p>
            We’re available by phone{' '}
            <Link
              href='telto:+91-44-66075200'
              className='font-medium hover:underline'
            >
              +91-44-66075200
            </Link>{' '}
            (Toll Free)
          </p>
          <p> every day, 9 A.M to 1 A.M IST (Mon - Sun)</p>
        </div>
        <div className='mt-4 inline-flex gap-4'>
          <Link
            href='tel:+911234567890'
            aria-label='PHONE'
            className='bg-primary text-primary-foreground flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-110'
          >
            <IoCall size={22} />
          </Link>

          {/* WhatsApp */}
          <Link
            href='https://wa.me/911234567890' // Remove leading 0 or + for wa.me links
            target='_blank'
            rel='noopener noreferrer'
            aria-label='WHATS APP'
            className='bg-primary text-primary-foreground flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-110'
          >
            <IoLogoWhatsapp size={22} />
          </Link>

          {/* Email */}
          <Link
            href='mailto:hello@example.com'
            aria-label='MESSAGE'
            className='bg-primary text-primary-foreground flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-110'
          >
            <IoMail size={22} />
          </Link>
        </div>
      </div>
    </>
  );
}
