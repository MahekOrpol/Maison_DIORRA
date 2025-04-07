'use client';

import { useCheckoutStore } from '@/lib/checkout-store';
import { useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FloatingSelect } from '@/components/ui/floatingSelect';
import FloatingInput from '@/components/ui/floatingInput';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { OrderSummary } from './order-summary';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa6';

const orderItems = [
  {
    id: '1',
    name: 'Two Stone Diamond Ring',
    variant: '18k Silver / Round diamond',
    size: '3',
    price: '30,000'
  },
  {
    id: '2',
    name: 'Two Stone Diamond Ring',
    variant: '18k Silver / Round diamond',
    size: '3',
    price: '30,000'
  }
];

const DeliveryForm = ({ onNext, onPrev }) => {
  const { address, setAddress } = useCheckoutStore();
  const [formData, setFormData] = useState(
    address || { name: '', street: '', city: '' }
  );

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  const countries = Country.getAllCountries();
  const handleCountryChange = (code) => {
    setSelectedCountry(code);
    console.log(code);
    const stateList = State.getStatesOfCountry(code);
    console.log(stateList);
    setStates(stateList);
  };
  const handleStateChange = (stateCode) => {
    setSelectedState(stateCode);
    const cities = City.getCitiesOfState(selectedCountry, stateCode);
    console.log(cities);
    setCities(cities);
  };
  const handleCityChange = (value) => {
    setSelectedCity(value);
  };
  const handleSubmit = () => {
    setAddress(formData);
    onNext(); // Move to payment step
  };

  const handleApplyDiscount = (code) => {
    console.log('Applying discount code:', code);
    // Add your discount logic here
  };

  return (
    <>
      <div className='flex flex-col justify-between gap-4 md:flex-row'>
        <div className='flex-1 pr-4'>
          <h2 className='mb-4 text-2xl font-semibold'>
            Select Delivery Address
          </h2>
          <form className='grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2'>
            {/* Country Select */}
            <div className='col-span-2'>
              <FloatingSelect
                placeholder='Country/Region'
                value={selectedCountry}
                onChange={handleCountryChange}
                options={countries.map((c) => ({
                  label: c.name,
                  value: c.isoCode
                }))}
                className=''
              />
            </div>
            <FloatingInput
              label='First Name'
              name='firstName'
              //   value={phone}
              //   onChange={setPhone}
            />
            <FloatingInput
              label='Last Name'
              name='lastName'
              //   value={phone}
              //   onChange={setPhone}
            />
            <FloatingInput
              label='Phone Number'
              name='lastName'
              //   value={phone}
              //   onChange={setPhone}
            />
            <FloatingInput
              label='Email Id'
              name='lastName'
              //   value={phone}
              //   onChange={setPhone}
            />
            <div className='col-span-2'>
              <FloatingInput
                label='Address'
                name='address'
                //   value={phone}
                //   onChange={setPhone}
              />
            </div>
            <div className='col-span-2'>
              <FloatingInput
                label='Apartment, suite,etc. (optional)'
                name='address2'
                //   value={phone}
                //   onChange={setPhone}
              />
            </div>
            {/* State Select (based on country) */}
            <div className='col-span-2 flex gap-4'>
              <FloatingSelect
                placeholder='State'
                value={selectedState}
                onChange={handleStateChange}
                options={states.map((s) => ({
                  label: s.name,
                  value: s.isoCode
                }))}
                className=''
              />
              <FloatingSelect
                placeholder='City'
                value={selectedCity}
                onChange={handleCityChange}
                options={cities.map((c) => ({
                  label: c.name,
                  value: c.name
                }))}
                className=''
              />
              <FloatingInput
                label='ZIP Code'
                name='zip'
                //   value={phone}
                //   onChange={setPhone}
              />
            </div>
            <div className='col-span-2 my-3'>
              <p className='mb-2'>Save Address as</p>
              <Button variant='outline' className='bg-secondary mr-4 px-8'>
                Home
              </Button>
              <Button variant='outline' className='bg-secondary px-8'>
                Office
              </Button>
            </div>
            <div className='col-span-2'>
              <Checkbox id='terms' className='mr-2' />
              <label
                htmlFor='terms'
                className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Save this address for the future reference
              </label>
            </div>
            <Button className='bg-black py-2 text-white'>Save Address</Button>
          </form>
        </div>
        <div className='w-full md:max-w-sm lg:max-w-md'>
          <OrderSummary
            items={orderItems}
            subtotal='60,000'
            shipping='Free'
            taxes='0'
            total='60,000'
            onApplyDiscount={handleApplyDiscount}
            onProceedToPay={() => console.log('Proceeding to payment')}
            onEnterShipping={() => console.log('Entering shipping address')}
          />
        </div>
      </div>
      <div>
        <button onClick={onPrev} className='bg-gray-400 px-4 py-2'>
          Back
        </button>
        <button
          onClick={handleSubmit}
          className='bg-black px-4 py-2 text-white'
        >
          Next
        </button>
      </div>
      {/* Need help CTA */}
      <div className='flex flex-col items-center justify-center text-center'>
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
        <div className='mt-4 inline-flex gap-6'>
          <Link
            href='#'
            aria-label='instagram'
            className={`bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110`}
          >
            <FaInstagram size={22} />
          </Link>
          <Link
            href='#'
            aria-label='instagram'
            className={`bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110`}
          >
            <FaInstagram size={22} />
          </Link>
          <Link
            href='#'
            aria-label='instagram'
            className={`bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110`}
          >
            <FaInstagram size={22} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default DeliveryForm;
