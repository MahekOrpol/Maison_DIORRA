'use client';

import { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { OrderSummary } from './order-summary';
import FloatingInput from '@/components/ui/floatingInput';
import FloatingSelect from '@/components/ui/floatingSelect';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa6';
import { IoCall, IoMail } from 'react-icons/io5';
import { IoLogoWhatsapp } from 'react-icons/io';

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
      <div className='flex flex-col justify-between gap-[3%] md:flex-row 2xl:gap-[7%]'>
        <div className='flex-1 pr-4'>
          <h2 className='mb-4 text-2xl font-semibold'>
            Select Delivery Address
          </h2>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex max-w-4xl flex-wrap items-center justify-start gap-2'
            >
              <div className='flex w-full gap-2'>
                {/* First + Last Name */}
                <FloatingInput
                  label='First Name'
                  name='firstName'
                  rules={{ required: 'First name is required' }}
                  className='h-11'
                />
                <FloatingInput
                  label='Last Name'
                  name='lastName'
                  rules={{ required: 'Last name is required' }}
                  className='h-11'
                />
              </div>

              {/* Phone + Email */}
              <FloatingInput
                label='Phone Number'
                name='phone'
                type='tel'
                rules={{ required: 'Phone number is required' }}
                className='h-11'
              />
              <FloatingInput
                name='email'
                label='Email Address'
                type='email'
                className='h-11'
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: 'Enter a valid email'
                  }
                }}
              />

              {/* Address */}
              <FloatingInput
                label='Street Address'
                name='address'
                rules={{ required: 'Address is required' }}
                className='h-11'
              />

              <FloatingInput
                label='Apartment, Suite, etc. (optional)'
                name='address2'
                className='h-11'
              />
              {/* Country */}
              <FloatingSelect
                name='country'
                placeholder='Select Country'
                rules={{ required: 'Please select a country' }}
                options={Country.getAllCountries().map((c) => ({
                  label: c.name,
                  value: c.isoCode
                }))}
                className=''
              />
              <div className='grid w-full grid-cols-2 gap-2 sm:grid-cols-3'>
                {/* State + City + Zip */}
                <FloatingSelect
                  name='state'
                  placeholder='Select State'
                  rules={{ required: 'Please select a state' }}
                  options={states.map((s) => ({
                    label: s.name,
                    value: s.isoCode
                  }))}
                  className='col-span-1'
                />

                <FloatingSelect
                  name='city'
                  placeholder='Select City'
                  rules={{ required: 'Please select a city' }}
                  options={cities.map((c) => ({
                    label: c.name,
                    value: c.name
                  }))}
                  className='col-span-1'
                />

                <FloatingInput
                  label='ZIP Code'
                  name='zip'
                  rules={{ required: 'ZIP Code is required' }}
                  className='col-span-1'
                />
              </div>
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
                  className='w-full max-w-xs bg-black py-2 text-lg font-light text-white'
                  type='submit'
                >
                  Save Address
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
        <div className='w-full md:max-w-sm lg:max-w-xl'>
          <OrderSummary
            items={orderItems}
            subtotal='90,850'
            shipping='Free'
            taxes='9,085'
            total='99,935'
            onApplyDiscount={handleApplyDiscount}
            onProceedToPay={onNext}
            onEnterShipping={() => console.log('Entering shipping address')}
          />
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
            className='bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110'
          >
            <IoCall size={22} />
          </Link>

          {/* WhatsApp */}
          <Link
            href='https://wa.me/911234567890' // Remove leading 0 or + for wa.me links
            target='_blank'
            rel='noopener noreferrer'
            aria-label='WHATS APP'
            className='bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110'
          >
            <IoLogoWhatsapp size={22} />
          </Link>

          {/* Email */}
          <Link
            href='mailto:hello@example.com'
            aria-label='MESSAGE'
            className='bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110'
          >
            <IoMail size={22} />
          </Link>
        </div>
      </div>
    </>
  );
}
